# backend/main.py (dedupe + HEAD handling + hardened)
import os
import time
import logging
import secrets
import bcrypt
import smtplib
import datetime
from datetime import timezone
from typing import Optional, Dict, Any
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import FastAPI, Request, HTTPException, Header, BackgroundTasks
from fastapi.responses import JSONResponse, HTMLResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from pymongo import MongoClient, errors
from dotenv import load_dotenv
from starlette.exceptions import HTTPException as StarletteHTTPException
from bson.objectid import ObjectId

# ---------- Configuration ----------
load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")
logger = logging.getLogger("techinmystyle-backend")

MONGO_URL = os.getenv("MONGO_URL")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_ADDR = os.getenv("EMAIL_ADDR", "techinmystyle@gmail.com")
RATE_WINDOW_SECONDS = int(os.getenv("RATE_WINDOW_SECONDS", "10"))
RATE_LIMIT_COUNT = int(os.getenv("RATE_LIMIT_COUNT", "5"))
PLACEHOLDER_TOKEN = os.getenv("PLACEHOLDER_TOKEN", "Bearer secret-token")

if not MONGO_URL:
    logger.critical("MONGO_URL not set")
    raise RuntimeError("MONGO_URL not set")

# ---------- DB Setup ----------
client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
db = client["tech_in_my_style"]
users_collection = db["users"]

# ---------- FastAPI ----------
app = FastAPI(title="Tech In My Style API - Hardened")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Rate Limiter ----------
_rate_tracker: Dict[str, list] = {}

def check_rate_limit(client_id: str) -> Optional[JSONResponse]:
    now = time.time()
    bucket = _rate_tracker.get(client_id, [])
    bucket = [t for t in bucket if now - t < RATE_WINDOW_SECONDS]
    if len(bucket) >= RATE_LIMIT_COUNT:
        return JSONResponse(status_code=429, content={"success": False, "error": "Too many requests"})
    bucket.append(now)
    _rate_tracker[client_id] = bucket
    return None

# ---------- Models ----------
class RegisterData(BaseModel):
    username: str
    password: str
    email: str

class LoginData(BaseModel):
    username: str
    password: str

class TaskUpdate(BaseModel):
    username: str
    course: str
    task_id: str

class ForgotPasswordData(BaseModel):
    email: str

class ResetPasswordData(BaseModel):
    token: str
    new_password: str

# ---------- Responses ----------
def success_response(message: str = "success", **kwargs) -> JSONResponse:
    payload = {"success": True, "message": message, **kwargs}
    return JSONResponse(status_code=200, content=payload)

def error_response(detail: str, code: int = 400) -> JSONResponse:
    return JSONResponse(status_code=code, content={"success": False, "error": detail})

# ---------- Exception Handlers ----------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning("Validation error: %s %s -> %s", request.method, request.url.path, exc)
    return error_response("Invalid JSON format or missing required fields.", 400)

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    msg = exc.detail if exc.detail else "HTTP error"
    logger.info("HTTP exception for %s %s -> %s", request.method, request.url.path, msg)
    return JSONResponse(status_code=exc.status_code, content={"success": False, "error": str(msg)})

@app.exception_handler(errors.DuplicateKeyError)
async def duplicate_key_handler(request: Request, exc: errors.DuplicateKeyError):
    logger.warning("DuplicateKeyError: %s", exc)
    return error_response("Duplicate entry.", 409)

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception during request %s %s: %s", request.method, request.url.path, exc)
    return error_response("Internal server error.", 500)

# ---------- Startup: dedupe then create indexes ----------
def _find_duplicate_values(field_name: str):
    pipeline = [
        {"$group": {"_id": f"${field_name}", "count": {"$sum": 1}, "ids": {"$push": "$_id"}}},
        {"$match": {"_id": {"$ne": None}, "count": {"$gt": 1}}}
    ]
    return list(users_collection.aggregate(pipeline))

def _remove_duplicates_keep_first(field_name: str):
    duplicates = _find_duplicate_values(field_name)
    removed = 0
    for dup in duplicates:
        ids = dup.get("ids", [])
        if not ids or len(ids) <= 1:
            continue
        # sort ObjectIds: keep smallest (oldest), remove the rest
        ids_sorted = sorted(ids, key=lambda oid: (oid.generation_time if hasattr(oid, "generation_time") else oid))
        keep = ids_sorted[0]
        remove_ids = ids_sorted[1:]
        res = users_collection.delete_many({"_id": {"$in": remove_ids}})
        removed += res.deleted_count
        logger.info("Deduped %s: kept %s removed %d docs", field_name, str(keep), res.deleted_count)
    return removed

@app.on_event("startup")
def startup_checks_and_dedupe():
    # check db connectivity
    try:
        client.admin.command("ping")
    except Exception as e:
        logger.critical("MongoDB ping failed: %s", e)
        raise

    # ---- DEDUPE username and email BEFORE creating unique indexes ----
    try:
        total_removed = 0
        removed_usernames = _remove_duplicates_keep_first("username")
        removed_emails = _remove_duplicates_keep_first("email")
        total_removed = removed_usernames + removed_emails
        if total_removed:
            logger.info("Removed %d duplicate documents during startup dedupe.", total_removed)
        else:
            logger.info("No duplicates found for username/email during startup dedupe.")
    except Exception as exc:
        logger.warning("Error during dedupe: %s", exc)

    # ---- Create unique indexes after dedupe ----
    try:
        users_collection.create_index("username", unique=True, name="uq_username")
        users_collection.create_index("email", unique=True, name="uq_email")
        logger.info("Ensured unique indexes on username and email.")
    except errors.DuplicateKeyError as dk:
        logger.warning("Index creation failed due to duplicates even after dedupe: %s", dk)
    except Exception as exc:
        logger.warning("Could not create indexes: %s", exc)

# ---------- Middleware: logging + rate-limiting + content-type enforcement ----------
@app.middleware("http")
async def request_logging_and_rate_limit(request: Request, call_next):
    start = time.time()
    client_host = request.client.host if request.client else "unknown"
    limit_resp = check_rate_limit(client_host)
    if limit_resp:
        return limit_resp

    if request.method.upper() in ("POST", "PUT", "PATCH"):
        ctype = request.headers.get("content-type", "")
        if "application/json" not in ctype and "application/x-www-form-urlencoded" not in ctype and "multipart/form-data" not in ctype:
            if request.method.upper() != "OPTIONS":
                return error_response("Unsupported Content-Type. Use application/json or form-data.", 415)

    response = await call_next(request)
    elapsed = time.time() - start
    logger.info("%s %s %s -> %s in %.3fs", client_host, request.method, request.url.path, response.status_code, elapsed)
    return response

# ---------- Background email ----------
def send_reset_email_background(to_email: str, reset_link: str):
    if not EMAIL_PASS:
        logger.warning("EMAIL_PASS not set; skipping real email send. Reset link: %s", reset_link)
        return
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDR
    msg["To"] = to_email
    msg["Subject"] = "Password Reset Request - Tech In My Style"
    body = f"""Greetings from TECH IN MY STYLE !!!

Use this link (valid 1 hour):
{reset_link}
"""
    msg.attach(MIMEText(body, "plain"))
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDR, EMAIL_PASS)
            smtp.send_message(msg)
    except Exception as e:
        logger.exception("Error sending email: %s", e)

# ---------- Helpers ----------
def find_user_by_username(username: str):
    return users_collection.find_one({"username": username})

def find_user_by_email(email: str):
    return users_collection.find_one({"email": email})

# ---------- Health/root (GET & HEAD) ----------
@app.get("/health")
@app.get("/health/")
def health():
    return JSONResponse(status_code=200, content={"success": True, "message": "ok", "timestamp": datetime.datetime.now(timezone.utc).isoformat()})

# explicit HEAD for health
@app.head("/health")
@app.head("/health/")
def health_head():
    # HEAD returns same headers as GET, but no body
    return Response(status_code=200)

@app.get("/", response_class=HTMLResponse)
def root():
    return "<h1>Tech In My Style API - Running ✅</h1>"

# explicit HEAD for root to prevent 405 on HEAD /
@app.head("/")
@app.head("/")
def root_head():
    return Response(status_code=200)

# ---------- Endpoints (Register, Login, Forgot, Reset, Task Complete, Leaderboard, Progress, etc.) ----------
# (retain previous hardened endpoints - examples follow)

@app.post("/register")
@app.post("/register/")
def register(user: RegisterData):
    hashed = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    doc = {
        "username": user.username,
        "password": hashed,
        "email": user.email,
        "progress": {},
        "total_completed": 0,
    }
    try:
        users_collection.insert_one(doc)
        return success_response("User registered successfully.")
    except errors.DuplicateKeyError:
        if find_user_by_username(user.username):
            return error_response("Username already exists.", 409)
        if find_user_by_email(user.email):
            return error_response("Email already registered.", 409)
        return error_response("Duplicate entry", 409)
    except Exception as e:
        logger.exception("Error registering user: %s", e)
        return error_response("Internal server error", 500)

@app.post("/login")
@app.post("/login/")
def login(data: LoginData):
    user = find_user_by_username(data.username)
    if user and bcrypt.checkpw(data.password.encode("utf-8"), user["password"].encode("utf-8")):
        token = "Bearer " + secrets.token_urlsafe(24)
        return success_response("Login successful.", token=token)
    raise HTTPException(status_code=401, detail="Invalid username or password.")

@app.post("/forgot-password")
@app.post("/forgot-password/")
def forgot_password(data: ForgotPasswordData, background_tasks: BackgroundTasks):
    user = find_user_by_email(data.email)
    if user:
        token = secrets.token_urlsafe(48)
        expiry = datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=1)
        users_collection.update_one({"_id": user["_id"]}, {"$set": {"reset_token": token, "reset_token_expires": expiry}})
        reset_link = f"https://techinmystyle.com/auth/reset_password.html?token={token}"
        background_tasks.add_task(send_reset_email_background, data.email, reset_link)
    return success_response("If your email exists, a reset link was sent.")

@app.post("/reset-password")
@app.post("/reset-password/")
def reset_password(data: ResetPasswordData):
    now = datetime.datetime.now(timezone.utc)
    user = users_collection.find_one({"reset_token": data.token, "reset_token_expires": {"$gt": now}})
    if not user:
        return error_response("Invalid or expired token.", 400)
    new_hashed = bcrypt.hashpw(data.new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    users_collection.update_one({"_id": user["_id"]}, {"$set": {"password": new_hashed}, "$unset": {"reset_token": "", "reset_token_expires": ""}})
    return success_response("Password reset successfully.")

@app.post("/task/complete")
@app.post("/task/complete/")
def complete_task(task: TaskUpdate, authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer"):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user = find_user_by_username(task.username)
    if not user:
        return error_response("User not found.", 404)
    progress = user.get("progress", {}) or {}
    course = task.course.lower()
    course_tasks = progress.get(course, [])
    if task.task_id not in course_tasks:
        course_tasks.append(task.task_id)
        progress[course] = course_tasks
        total_completed = sum(len(v) for v in progress.values())
        users_collection.update_one({"username": task.username}, {"$set": {"progress": progress, "total_completed": total_completed}})
    return success_response("Task marked as complete.", progress=progress)

@app.get("/leaderboard")
@app.get("/leaderboard/")
def leaderboard():
    board = []
    for u in users_collection.find({}, {"username": 1, "total_completed": 1, "progress": 1}):
        progress = u.get("progress", {}) or {}
        board.append({"user": u["username"], "score": u.get("total_completed", 0), "courses": {c: len(lst) for c, lst in progress.items()}})
    board.sort(key=lambda k: k["score"], reverse=True)
    return success_response("Leaderboard fetched.", leaderboard=board)

@app.get("/progress/{username}")
@app.get("/progress/{username}/")
def get_progress(username: str):
    user = find_user_by_username(username)
    if not user:
        return error_response("User not found.", 404)
    return success_response("Progress fetched.", progress=user.get("progress", {}))

@app.post("/user/progress")
@app.post("/user/progress/")
def get_progress_post(body: dict, authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer"):
        raise HTTPException(status_code=401, detail="Unauthorized")
    username = body.get("username")
    password = body.get("password")
    if not username or not password:
        return error_response("username and password required", 400)
    user = find_user_by_username(username)
    if not user:
        raise HTTPException(status_code=401, detail="unauthorized")
    if bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        return success_response("Progress fetched.", progress=user.get("progress", {}))
    raise HTTPException(status_code=401, detail="unauthorized")

@app.post("/secure-action")
@app.post("/secure-action/")
def secure_action(authorization: Optional[str] = Header(None)):
    if not authorization or authorization != PLACEHOLDER_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return success_response("Authorized request successful.")

@app.get("/courses/meta")
@app.get("/courses/meta/")
def courses_meta():
    meta = {"ai":30,"ml":30,"dl":30,"java":30,"c":30,"html":30,"css":30,"js":30,"js-intermediate":30,"python":30,"dsc":30}
    return success_response("Courses meta fetched.", courses=meta)

# ---------- Run ----------
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
