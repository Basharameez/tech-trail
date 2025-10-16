# backend/main.py (FINAL, deploy-safe)
from fastapi import FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from pymongo import MongoClient
import os, smtplib, bcrypt, secrets, datetime, time
from datetime import timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from starlette.exceptions import HTTPException as StarletteHTTPException

# --- Load environment variables ---
load_dotenv()

# --- MongoDB Connection ---
MONGO_URL = os.getenv("MONGO_URL")
if not MONGO_URL:
    raise ValueError("❌ MONGO_URL not found in .env file")

client = MongoClient(MONGO_URL)
db = client["tech_in_my_style"]
users_collection = db["users"]

# --- FastAPI App ---
app = FastAPI()

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Rate Limiting Middleware ---
rate_limit_tracker = {}
RATE_WINDOW = 10
RATE_LIMIT = 5

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    hits = rate_limit_tracker.get(ip, [])
    hits = [h for h in hits if now - h < RATE_WINDOW]
    if len(hits) >= RATE_LIMIT:
        return JSONResponse(status_code=429, content={"success": False, "error": "Too many requests"})
    hits.append(now)
    rate_limit_tracker[ip] = hits
    return await call_next(request)

# --- Global Exception Handlers ---
@app.exception_handler(RequestValidationError)
async def validation_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=400, content={"success": False, "error": "Invalid JSON format or missing required fields."})

@app.exception_handler(StarletteHTTPException)
async def http_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(status_code=exc.status_code, content={"success": False, "error": str(exc.detail)})

@app.exception_handler(Exception)
async def generic_handler(request: Request, exc: Exception):
    print("Server Error:", repr(exc))
    return JSONResponse(status_code=500, content={"success": False, "error": "Internal server error."})

# --- Helper ---
def success_response(message="success", **kwargs):
    return {"success": True, "message": message, **kwargs}

# --- Models ---
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

# --- Endpoints ---

# Register
@app.post("/register")
@app.post("/register/")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=409, detail="Username already exists.")
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=409, detail="Email already registered.")
    hashed = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
    users_collection.insert_one({
        "username": user.username,
        "password": hashed,
        "email": user.email,
        "progress": {}, "total_completed": 0
    })
    return success_response("User registered successfully.")

# Login
@app.post("/login")
@app.post("/login/")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username})
    if user and bcrypt.checkpw(data.password.encode(), user["password"].encode()):
        token = "Bearer " + secrets.token_urlsafe(16)
        return success_response("Login successful.", token=token)
    raise HTTPException(status_code=401, detail="Invalid username or password.")

# Forgot password
@app.post("/forgot-password")
@app.post("/forgot-password/")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"email": data.email})
    if user:
        token = secrets.token_urlsafe(32)
        exp = datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=1)
        users_collection.update_one({"_id": user["_id"]}, {"$set": {"reset_token": token, "reset_expires": exp}})
        EMAIL = "techinmystyle@gmail.com"
        PASS = os.getenv("EMAIL_PASS")
        link = f"https://techinmystyle.com/auth/reset_password.html?token={token}"
        msg = MIMEMultipart()
        msg["From"], msg["To"] = EMAIL, data.email
        msg["Subject"] = "Password Reset Request - Tech In My Style"
        msg.attach(MIMEText(f"Use this link: {link}", "plain"))
        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(EMAIL, PASS)
                smtp.send_message(msg)
        except Exception as e:
            print("Email error:", e)
    return success_response("If your email exists, reset link sent.")

# Reset password
@app.post("/reset-password")
@app.post("/reset-password/")
def reset_password(data: ResetPasswordData):
    now = datetime.datetime.now(timezone.utc)
    user = users_collection.find_one({"reset_token": data.token, "reset_expires": {"$gt": now}})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
    hashed = bcrypt.hashpw(data.new_password.encode(), bcrypt.gensalt()).decode()
    users_collection.update_one({"_id": user["_id"]}, {"$set": {"password": hashed}, "$unset": {"reset_token": "", "reset_expires": ""}})
    return success_response("Password reset successfully.")

# Task complete
@app.post("/task/complete")
@app.post("/task/complete/")
def complete_task(task: TaskUpdate, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")
    user = users_collection.find_one({"username": task.username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    progress = user.get("progress", {})
    course = task.course.lower()
    progress.setdefault(course, [])
    if task.task_id not in progress[course]:
        progress[course].append(task.task_id)
        total = sum(len(v) for v in progress.values())
        users_collection.update_one({"username": task.username}, {"$set": {"progress": progress, "total_completed": total}})
    return success_response("Task marked complete.")

# Leaderboard
@app.get("/leaderboard")
@app.get("/leaderboard/")
def leaderboard():
    board = []
    for u in users_collection.find():
        progress = u.get("progress", {})
        board.append({"user": u["username"], "score": u.get("total_completed", 0), "courses": {k: len(v) for k, v in progress.items()}})
    board.sort(key=lambda x: x["score"], reverse=True)
    return success_response("Leaderboard fetched.", leaderboard=board)

# Secure endpoint
@app.post("/secure-action")
@app.post("/secure-action/")
def secure_action(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return success_response("Authorized request successful.")

# Root
@app.get("/", response_class=HTMLResponse)
def home():
    return "<h1>Tech In My Style API Running ✅</h1>"

# --- Run ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
