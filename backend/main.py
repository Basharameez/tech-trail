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

# --- NEW: Temporary OTP & Token Storage ---
# In a real production app, use a database like Redis for this.
otp_store = {}
reset_token_store = {}

# --- FastAPI Setup ---
app = FastAPI()

# Enable CORS
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

# --- NEW MODELS FOR OTP FLOW ---
class OtpRequestData(BaseModel):
    email: str

class OtpVerifyData(BaseModel):
    email: str
    otp: str

class ResetPasswordData(BaseModel):
    email: str
    reset_token: str
    new_password: str
# --------------------------------

# --- Register ---
@app.post("/register")
def register(user: RegisterData):
    # (Your existing register code is fine for now)
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}
    
    # CRITICAL WARNING: You must hash passwords in a real app. Storing plain text is very insecure.
    users_collection.insert_one({
        "username": user.username,
        "password": user.password, 
        "email": user.email,
        "progress": {},
        "total_completed": 0
    })
    return {"message": "success"}

# --- Login ---
@app.post("/login")
def login(data: LoginData):
    # (Your existing login code is fine for now)
    user = users_collection.find_one({
        "username": data.username,
        "password": data.password
    })
    if user:
        return {"message": "success", "username": user["username"], "email": user["email"]}
    return {"message": "Invalid username or password."}


# --- NEW PASSWORD RESET FLOW (3 STEPS) ---

# STEP 1: User requests an OTP
@app.post("/request-password-otp")
def request_password_otp(data: OtpRequestData):
    user = users_collection.find_one({"email": data.email})
    generic_response = {"message": "If an account with that email exists, an OTP has been sent."}

    if user:
        otp = str(secrets.randbelow(1000000)).zfill(6) # Generate a 6-digit OTP
        otp_store[data.email] = {"code": otp, "timestamp": time.time()}

        # This is where your email sending logic goes
        # (I've adapted your old forgot-password email code)
        EMAIL_ADDRESS = "techinmystyle@gmail.com"
        EMAIL_PASSWORD = os.getenv("EMAIL_PASS")
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = data.email
        msg["Subject"] = "Your Password Reset Code - Tech In My Style"
        body = f"Hello {user['username']},\n\nYour password reset code is: {otp}\n\nThis code will expire in 10 minutes.\n\nBest regards,\nTech In My Style Team"
        msg.attach(MIMEText(body, "plain"))
        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)
        except Exception as e:
            print(f"Error sending OTP email: {e}")
            # Still return generic success to the user for security
    
    return generic_response

# STEP 2: User sends the OTP back for verification
@app.post("/verify-password-otp")
def verify_password_otp(data: OtpVerifyData):
    stored_data = otp_store.get(data.email)
    if not stored_data or time.time() - stored_data["timestamp"] > 600: # 10 minute expiry
        return {"status": "error", "message": "OTP is invalid or has expired."}

    if stored_data["code"] == data.otp:
        del otp_store[data.email] # OTP is used, so remove it
        reset_token = secrets.token_hex(16)
        reset_token_store[data.email] = {"token": reset_token, "timestamp": time.time()}
        return {"status": "success", "message": "OTP verified.", "reset_token": reset_token}
    else:
        return {"status": "error", "message": "OTP is invalid or has expired."}

# STEP 3: User sends the token and new password
@app.post("/reset-password")
def reset_password(data: ResetPasswordData):
    stored_token_data = reset_token_store.get(data.email)
    if not stored_token_data or time.time() - stored_token_data["timestamp"] > 600: # 10 minute expiry for token
        return {"status": "error", "message": "Reset token is invalid or has expired."}

    if stored_token_data["token"] == data.reset_token:
        del reset_token_store[data.email] # Token is used, so remove it
        
        # In a real app, you would validate the new password (e.g., min length 8)
        
        # CRITICAL WARNING: You must HASH this new password before saving it
        users_collection.update_one(
            {"email": data.email},
            {"$set": {"password": data.new_password}}
        )
        return {"status": "success", "message": "Password has been reset successfully."}
    else:
        return {"status": "error", "message": "Reset token is invalid or has expired."}

# --- OTHER ENDPOINTS (Unchanged) ---
# ... your /task/complete, /leaderboard, /progress, /courses/meta, and home route code ...
# For brevity, I've omitted them, but you should keep them in your file.

# --- Uvicorn entry point ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
