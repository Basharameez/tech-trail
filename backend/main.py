from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pymongo import MongoClient
import os

# ------------------ MongoDB Connection ------------------

client = MongoClient(
    "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["tech_in_my_style"]
users_collection = db["users"]

# ------------------ FastAPI Setup ------------------

app = FastAPI()

# Enable CORS for local and production frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain(s) for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Pydantic Models ------------------

class RegisterData(BaseModel):
    username: str
    password: str
    email: str
    securityKey: str = Field(..., min_length=6, max_length=6, regex="^\d{6}$")  # 6 digit numeric string

class LoginData(BaseModel):
    username: str
    password: str

class TaskUpdate(BaseModel):
    username: str
    course: str
    task_id: str

class ForgotPasswordData(BaseModel):
    username: str
    securityKey: str = Field(..., min_length=6, max_length=6, regex="^\d{6}$")

# ------------------ API Endpoints ------------------

@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    users_collection.insert_one({
        "username": user.username,
        "password": user.password,  # In real use, hash passwords instead of storing plain text
        "email": user.email,
        "securityKey": user.securityKey,
        "progress": {},
        "total_completed": 0
    })
    return {"message": "success"}

@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({
        "username": data.username,
        "password": data.password
    })
    if user:
        return {
            "message": "success",
            "username": user["username"],
            "progress": user.get("progress", {}),
            "total_completed": user.get("total_completed", 0),
            "email": user["email"]
        }
    return {"message": "Invalid username or password."}

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

@app.get("/courses/meta")
def courses_meta():
    # Updated course list with 10 tasks each
    return {
        "ai": 30,
        "ml": 30,
        "dl": 30,
        "java": 30,
        "c": 30,
        "html": 30,
        "css": 30,
        "js": 30,
        "js-intermediate": 30,
        "python": 30,
        "dsc": 30
    }

# ------------------ Forgot Password Endpoint ------------------

@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"username": data.username})
    if not user:
        return {"message": "Invalid username or security key."}
    if user.get("securityKey") == data.securityKey:
        # WARNING: Returning password in plaintext is NOT safe for production
        return {
            "message": "success",
            "password": user.get("password", "")
        }
    return {"message": "Invalid username or security key."}

# ------------------ Uvicorn Entry Point ------------------

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))  # Supports Render or similar env var
    uvicorn.run("main:app", host="0.0.0.0", port=port)
