from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["tech_in_my_style"]
users_collection = db["users"]

# Check if user exists
def user_exists(username):
    return users_collection.find_one({"username": username}) is not None

# Validate credentials
def validate_user(username, password):
    user = users_collection.find_one({"username": username})
    return bool(user and user.get("password") == password)

# Register a new user
def register_user(username, password, email):
    if user_exists(username):
        return False
    users_collection.insert_one({
        "username": username,
        "password": password,
        "email": email,
        "progress": {},
        "total_completed": 0
    })
    return True

# Update task progress
def complete_task(username, course, task_id):
    user = users_collection.find_one({"username": username})
    if not user:
        return False
    progress = user.get("progress", {})
    course = course.lower()
    task_list = progress.get(course, [])
    if task_id not in task_list:
        task_list.append(task_id)
        progress[course] = task_list
        total_completed = sum(len(tasks) for tasks in progress.values())
        users_collection.update_one(
            {"username": username},
            {"$set": {"progress": progress, "total_completed": total_completed}}
        )
    return True

# Get leaderboard for a specific course
def get_course_leaderboard(course):
    course = course.lower()
    users = users_collection.find()
    leaderboard = []
    for user in users:
        score = len(user.get("progress", {}).get(course, []))
        leaderboard.append({"user": user["username"], "score": score})
    return sorted(leaderboard, key=lambda x: x["score"], reverse=True)

# Get global leaderboard
def get_global_leaderboard():
    users = users_collection.find()
    leaderboard = []
    for user in users:
        leaderboard.append({"user": user["username"], "score": user.get("total_completed", 0)})
    return sorted(leaderboard, key=lambda x: x["score"], reverse=True)
