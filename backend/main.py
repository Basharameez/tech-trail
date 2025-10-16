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

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host
    now = time.time()
    requests_list = rate_limit_tracker.get(ip, [])
    requests_list = [r for r in requests_list if now - r < 10]  # 10 sec window
    if len(requests_list) >= 5:
        return JSONResponse(status_code=429, content={"success": False, "error": "Too many requests"})
    requests_list.append(now)
    rate_limit_tracker[ip] = requests_list
    response = await call_next(request)
    return response

# --- Global JSON Error Handler ---
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={"success": False, "error": "Invalid JSON format or missing required fields."}
    )

# --- Utility for Consistent Responses ---
def success_response(message="success", **kwargs):
    return {"success": True, "message": message, **kwargs}

# --- Pydantic Models ---
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

# --- Registration ---
@app.post("/register")
@app.post("/register/")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=409, detail="Username already exists.")
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=409, detail="Email already registered.")

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        "username": user.username,
        "password": hashed_password.decode('utf-8'),
        "email": user.email,
        "progress": {}, "total_completed": 0,
        "unlocked_solutions": [], "failed_attempts": {},
        "theme": "light", "editor_content": {}
    })
    return success_response("User registered successfully.")

# --- Login ---
@app.post("/login")
@app.post("/login/")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username})
    if user and bcrypt.checkpw(data.password.encode('utf-8'), user["password"].encode('utf-8')):
        return success_response(
            "Login successful.",
            username=user["username"],
            progress=user.get("progress", {}),
            total_completed=user.get("total_completed", 0),
            email=user["email"]
        )
    raise HTTPException(status_code=401, detail="Invalid username or password.")

# --- Forgot Password ---
@app.post("/forgot-password")
@app.post("/forgot-password/")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"email": data.email})
    if user:
        token = secrets.token_urlsafe(32)
        expiry_time = datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=1)
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"reset_token": token, "reset_token_expires": expiry_time}}
        )

        EMAIL_ADDRESS = "techinmystyle@gmail.com"
        EMAIL_PASSWORD = os.getenv("EMAIL_PASS")
        reset_link = f"https://techinmystyle.com/auth/reset_password.html?token={token}"

        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = data.email
        msg["Subject"] = "Password Reset Request - Tech In My Style"
        body = f"""
Greetings from TECH IN MY STYLE !!!

You have requested a password reset. Please use the link below:

{reset_link}

Thank you for using TECH IN MY STYLE !!!
"""
        msg.attach(MIMEText(body, "plain"))
        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)
        except Exception as e:
            print(f"Error sending email: {e}")
    return success_response("If your email exists, a reset link was sent.")

# --- Reset Password ---
@app.post("/reset-password")
@app.post("/reset-password/")
def reset_password(data: ResetPasswordData):
    current_time = datetime.datetime.now(timezone.utc)
    user = users_collection.find_one({
        "reset_token": data.token,
        "reset_token_expires": {"$gt": current_time}
    })
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
    new_hashed_password = bcrypt.hashpw(data.new_password.encode('utf-8'), bcrypt.gensalt())
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {"password": new_hashed_password.decode('utf-8')},
            "$unset": {"reset_token": "", "reset_token_expires": ""}
        }
    )
    return success_response("Password reset successfully.")

# --- Task Complete ---
@app.post("/task/complete")
@app.post("/task/complete/")
def complete_task(task: TaskUpdate):
    user = users_collection.find_one({"username": task.username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    progress = user.get("progress", {})
    course = task.course.lower()
    task_list = progress.get(course, [])
    if task.task_id not in task_list:
        task_list.append(task.task_id)
        progress[course] = task_list
        total_completed = sum(len(tasks) for tasks in progress.values())
        users_collection.update_one(
            {"username": task.username},
            {"$set": {"progress": progress, "total_completed": total_completed}}
        )
    return success_response("Task marked as complete.")

# --- Leaderboard ---
@app.get("/leaderboard")
@app.get("/leaderboard/")
def leaderboard():
    users = users_collection.find()
    board = []
    for user in users:
        progress = user.get("progress", {})
        course_progress = {course: len(tasks) for course, tasks in progress.items()}
        board.append({
            "user": user["username"],
            "score": user.get("total_completed", 0),
            "courses": course_progress
        })
    return success_response("Leaderboard fetched.", leaderboard=sorted(board, key=lambda x: x["score"], reverse=True))

# --- Secure Endpoint for Unauthorized Test ---
@app.post("/secure-action")
def secure_action(authorization: str = Header(None)):
    if not authorization or authorization != "Bearer secret-token":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return success_response("Authorized request successful.")

# --- Root ---
@app.get("/", response_class=HTMLResponse)
async def home():
    return HTMLResponse("<h1>Welcome to Tech In My Style API — Service Running ✅</h1>")

# --- Run App ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
