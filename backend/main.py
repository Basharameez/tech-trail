from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets # <-- ADDED
import time    # <-- ADDED

# --- MongoDB Connection ---
client = MongoClient(
    "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["tech_in_my_style"]
users_collection = db["users"]

# --- ADDED: Temporary Storage for App's OTP Flow ---
otp_store = {}
reset_token_store = {}
# ---------------------------------------------------

# --- FastAPI Setup ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# --- ADDED: NEW MODELS FOR APP OTP FLOW ---
class OtpRequestData(BaseModel):
    email: str

class OtpVerifyData(BaseModel):
    email: str
    otp: str

class ResetPasswordData(BaseModel):
    email: str
    reset_token: str
    new_password: str
# ----------------------------------------


# --- Register --- (UNCHANGED)
@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}
    users_collection.insert_one({
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "progress": {},
        "total_completed": 0
    })
    return {"message": "success"}

# --- Login --- (UNCHANGED)
@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username, "password": data.password})
    if user:
        return {"message": "success", "username": user["username"], "progress": user.get("progress", {}), "total_completed": user.get("total_completed", 0), "email": user["email"]}
    return {"message": "Invalid username or password."}

# --- Task Complete --- (UNCHANGED)
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
            {"$set": {
                "progress": progress,
                "total_completed": total_completed
            }}
        )
    return {"message": "Task marked as complete."}

# --- Leaderboard --- (UNCHANGED)
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

# --- Progress by username --- (UNCHANGED)
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

# --- Courses Meta --- (UNCHANGED)
@app.get("/courses/meta")
def courses_meta():
    return {"ai": 30, "ml": 30, "dl": 30, "java": 30, "c": 30, "html": 30, "css": 30, "js": 30, "js-intermediate": 30, "python": 30, "dsc": 30}

# --- OLD WEBSITE FORGOT PASSWORD (UNCHANGED) ---
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"email": data.email})
    generic_success = {"message": "success"}
    if not user:
        return generic_success
    user_password = user.get("password")
    if not user_password:
        return generic_success
    
    EMAIL_ADDRESS = "techinmystyle@gmail.com"
    EMAIL_PASSWORD = os.getenv("EMAIL_PASS")
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = data.email
    msg["Subject"] = "Your Password Recovery - Tech In My Style"
    body = f"Hello {user['username']},\n\nYou, or someone using your email, requested to recover your password on Tech In My Style.\n\nYour password is: {user_password}\n\nWe recommend you log in and change your password if you did not initiate this request.\n\nBest regards,\nTech In My Style Team"
    msg.attach(MIMEText(body, "plain"))
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return generic_success
    except Exception as e:
        print("Error sending email:", e)
        return {"message": "Failed to send recovery email. Please try again later."}
# ----------------------------------------------------

# --- START OF NEW CODE ADDED FOR THE APP ---
@app.post("/request-password-otp")
def request_password_otp_for_app(data: OtpRequestData):
    user = users_collection.find_one({"email": data.email})
    if user:
        otp = str(secrets.randbelow(1000000)).zfill(6)
        otp_store[data.email] = {"code": otp, "timestamp": time.time()}
        
        # You would add your email sending logic here as well
        print(f"OTP for app user {data.email} is {otp}") # For testing
        
    return {"message": "If an account with that email exists, an OTP has been sent."}

@app.post("/verify-password-otp")
def verify_password_otp_for_app(data: OtpVerifyData):
    stored_data = otp_store.get(data.email)
    if not stored_data or time.time() - stored_data["timestamp"] > 600:
        return {"status": "error", "message": "OTP is invalid or has expired."}
    if stored_data["code"] == data.otp:
        del otp_store[data.email]
        reset_token = secrets.token_hex(16)
        reset_token_store[data.email] = {"token": reset_token, "timestamp": time.time()}
        return {"status": "success", "message": "OTP verified.", "reset_token": reset_token}
    else:
        return {"status": "error", "message": "OTP is invalid or has expired."}

@app.post("/reset-password")
def reset_password_for_app(data: ResetPasswordData):
    stored_token_data = reset_token_store.get(data.email)
    if not stored_token_data or time.time() - stored_token_data["timestamp"] > 600:
        return {"status": "error", "message": "Reset token is invalid or has expired."}
    if stored_token_data["token"] == data.reset_token:
        del reset_token_store[data.email]
        users_collection.update_one({"email": data.email}, {"$set": {"password": data.new_password}})
        return {"status": "success", "message": "Password has been reset successfully."}
    else:
        return {"status": "error", "message": "Reset token is invalid or has expired."}
# --- END OF NEW CODE ADDED FOR THE APP ---

# --- Frontend protection route --- (UNCHANGED)
@app.get("/", response_class=HTMLResponse)
async def home():
    html_content = """
    <html>
    ...
    </html>
    """
    return HTMLResponse(content=html_content)

# --- Uvicorn entry point for local/dev --- (UNCHANGED)
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
