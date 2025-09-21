from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets # <-- NEW IMPORT
import time    # <-- NEW IMPORT

# --- MongoDB Connection ---
client = MongoClient(
    "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["tech_in_my_style"]
users_collection = db["users"]

# --- NEW: Temporary OTP & Token Storage for the App ---
otp_store = {}
reset_token_store = {}

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

# This is for the OLD website method
class ForgotPasswordData(BaseModel):
    email: str

# --- NEW MODELS FOR APP OTP FLOW ---
class OtpRequestData(BaseModel):
    email: str

class OtpVerifyData(BaseModel):
    email: str
    otp: str

class ResetPasswordData(BaseModel):
    email: str
    reset_token: str
    new_password: str

# --- Register and Login (Unchanged) ---
@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}
    users_collection.insert_one({
        "username": user.username,
        "password": user.password, # WARNING: You must hash passwords in a real app.
        "email": user.email,
        "progress": {},
        "total_completed": 0
    })
    return {"message": "success"}

@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username, "password": data.password})
    if user:
        return {"message": "success", "username": user["username"], "email": user["email"]}
    return {"message": "Invalid username or password."}


# --- OLD WEBSITE FORGOT PASSWORD ---
# This endpoint will continue to work for your website.
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"email": data.email})
    generic_success = {"message": "success"}
    generic_error = {"message": "Failed to send recovery email. Please try again later."}
    if not user:
        return generic_success
    user_password = user.get("password")
    if not user_password:
        return generic_error
    
    EMAIL_ADDRESS = "techinmystyle@gmail.com"
    EMAIL_PASSWORD = os.getenv("EMAIL_PASS")
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = data.email
    msg["Subject"] = "Your Password Recovery - Tech In My Style"
    body = f"Hello {user['username']},\n\nYour password is: {user_password}\n\nBest regards,\nTech In My Style Team"
    msg.attach(MIMEText(body, "plain"))
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return generic_success
    except Exception as e:
        print("Error sending email:", e)
        return generic_error
# ------------------------------------


# --- NEW APP OTP PASSWORD RESET ---
# These three endpoints are for the Android app only.
@app.post("/request-password-otp")
def request_password_otp(data: OtpRequestData):
    user = users_collection.find_one({"email": data.email})
    if user:
        otp = str(secrets.randbelow(1000000)).zfill(6)
        otp_store[data.email] = {"code": otp, "timestamp": time.time()}
        # (Email sending logic would go here, as in the previous example)
    return {"message": "If an account with that email exists, an OTP has been sent."}

@app.post("/verify-password-otp")
def verify_password_otp(data: OtpVerifyData):
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
def reset_password(data: ResetPasswordData):
    stored_token_data = reset_token_store.get(data.email)
    if not stored_token_data or time.time() - stored_token_data["timestamp"] > 600:
        return {"status": "error", "message": "Reset token is invalid or has expired."}
    if stored_token_data["token"] == data.reset_token:
        del reset_token_store[data.email]
        users_collection.update_one({"email": data.email}, {"$set": {"password": data.new_password}})
        return {"status": "success", "message": "Password has been reset successfully."}
    else:
        return {"status": "error", "message": "Reset token is invalid or has expired."}
# ---------------------------------

# ... (Keep all your other endpoints like /leaderboard, /, etc. here) ...

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
