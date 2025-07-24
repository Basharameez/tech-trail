// tasks.js

async function submitTask(course, taskId) {
  const username = localStorage.getItem("username");
  const response = document.getElementById("response")?.value || "";

  if (!username) {
    alert("You must login first.");
    return;
  }

  const payload = {
    username: username,
    course: course,
    task_id: taskId
  };

  try {
    const res = await fetch("https://tech-trail-w2ap.onrender.com/task/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Task completed: " + result.message);
      // Optionally update progress bar or checkmark
    } else {
      alert("❌ Error: " + result.error || result.message);
    }
  } catch (err) {
    console.error("❌ Submission error:", err);
    alert("Network error. Try again.");
  }
}
