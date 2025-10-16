from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import bcrypt
import secrets
import datetime
from datetime import timezone
from dotenv import load_dotenv  # ✅ Load environment variables from .env

# --- Load environment variables ---
load_dotenv()

# --- MongoDB Connection ---
MONGO_URL = os.getenv("MONGO_URL")
if not MONGO_URL:
    raise ValueError("❌ MONGO_URL not found in .env file")

client = MongoClient(MONGO_URL)
db = client["tech_in_my_style"]
users_collection = db["users"]

# --- FastAPI Setup ---
app = FastAPI()

# Permissive CORS settings to prevent communication issues between frontend and backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Data Validation ---
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

# --- User Registration Endpoint ---
@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    
    users_collection.insert_one({
        "username": user.username,
        "password": hashed_password.decode('utf-8'),
        "email": user.email,
        "progress": {}, "total_completed": 0, "unlocked_solutions": [],
        "failed_attempts": {}, "theme": "light", "editor_content": {}
    })
    return {"message": "success"}

# --- User Login Endpoint ---
@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username})
    
    if user and bcrypt.checkpw(data.password.encode('utf-8'), user["password"].encode('utf-8')):
        return {
            "message": "success", "username": user["username"],
            "progress": user.get("progress", {}),
            "total_completed": user.get("total_completed", 0), "email": user["email"]
        }
    
    return {"message": "Invalid username or password."}
    
# --- SECURE: Request Password Reset Endpoint ---
@app.post("/forgot-password")
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
        
        body = f"""Greetings from TECH IN MY STYLE !!!

You have requested for a password reset. Please use the link below:

{reset_link}

Thank you for using TECH IN MY STYLE !!!

- If you have any Queries, please visit us at email : techinmystyle@gmail.com
- or visit us at our social media platform.
"""
        msg.attach(MIMEText(body, "plain"))
        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)
        except Exception as e:
            print(f"Error sending email: {e}")
            
    # Always return a generic success message for security
    return {"message": "success"}

# --- SECURE: Perform Password Reset Endpoint ---
@app.post("/reset-password")
def reset_password(data: ResetPasswordData):
    current_time = datetime.datetime.now(timezone.utc)
    user = users_collection.find_one({
        "reset_token": data.token,
        "reset_token_expires": {"$gt": current_time}
    })

    if not user:
        return {"message": "Invalid or expired token."}

    new_hashed_password = bcrypt.hashpw(data.new_password.encode('utf-8'), bcrypt.gensalt())
    
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {"password": new_hashed_password.decode('utf-8')},
            "$unset": {"reset_token": "", "reset_token_expires": ""}
        }
    )
    return {"message": "success"}

# --- Your Other Application Endpoints ---

@app.post("/task/complete")
def complete_task(task: TaskUpdate):
    user = users_collection.find_one({"username": task.username})
    if not user:
        return {"error": "User not found"}

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
    return {"message": "Task marked as complete."}

# --- Leaderboard ---
@app.get("/leaderboard")
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
    return sorted(board, key=lambda x: x["score"], reverse=True)

# --- Progress by username ---
@app.get("/progress/{username}")
def progress(username: str):
    user = users_collection.find_one({"username": username})
    if not user:
        return {}
    return user.get("progress", {})

@app.post("/user/progress")
def get_progress(user: dict):
    username = user.get("username")
    password = user.get("password")
    user_data = users_collection.find_one({"username": username, "password": password})
    if user_data:
        return {"progress": user_data.get("progress", {})}
    return {"message": "unauthorized"}

# --- Courses Meta ---
@app.get("/courses/meta")
def courses_meta():
    return {
        "ai": 30, "ml": 30, "dl": 30, "java": 30, "c": 30,
        "html": 30, "css": 30, "js": 30, "js-intermediate": 30,
        "python": 30, "dsc": 30
    }

@app.get("/", response_class=HTMLResponse)
async def home():
    return HTMLResponse(content="<h1>Welcome to Tech In My Style API. Your service is running.</h1>")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
