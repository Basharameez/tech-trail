const API_BASE = "http://127.0.0.1:8000"; // your FastAPI endpoint

const tasks = [
  {
    id: "js_task_1",
    title: "Task 1: Display Alert",
    instructions: "Write JavaScript code that shows an alert with the message 'Hello, JavaScript!'.",
    expected: /<script>[\s\S]*alert\s*\(\s*['"]Hello,\s*JavaScript!['"]\s*\)[\s\S]*<\/script>/i
  },
  {
    id: "js_task_2",
    title: "Task 2: Log to Console",
    instructions: "Log the message 'Learning JS' to the browser console using console.log().",
    expected: /<script>[\s\S]*console\.log\s*\(\s*['"]Learning JS['"]\s*\)[\s\S]*<\/script>/i
  },
  {
    id: "js_task_3",
    title: "Task 3: Add Two Numbers",
    instructions: "Write JavaScript to declare two variables a and b (e.g., a = 5, b = 10) and log their sum.",
    expected: /<script>[\s\S]*let\s+a\s*=\s*\d+;[\s\S]*let\s+b\s*=\s*\d+;[\s\S]*console\.log\s*\(\s*a\s*\+\s*b\s*\)[\s\S]*<\/script>/i
  },
  {
    id: "js_task_4",
    title: "Task 4: Button Click Alert",
    instructions: "Create a button that shows an alert with 'Button Clicked!' when clicked using onclick.",
    expected: /<button\s+onclick="[^"]*alert\s*\(\s*['"]Button Clicked!['"]\s*\)[^"]*">.*?<\/button>/i
  },
  {
    id: "js_task_5",
    title: "Task 5: Change Text on Click",
    instructions: "Create a <p id='demo'>Hello</p> and a button. When the button is clicked, change the text of the paragraph to 'Changed!'.",
    expected: /<p\s+id="demo">.*?<\/p>[\s\S]*<button\s+onclick="[^"]*document\.getElementById\s*\(\s*['"]demo['"]\s*\)\.innerText\s*=\s*['"]Changed!['"][^"]*">.*?<\/button>/i
  }
];

const taskList = document.getElementById('taskList');
const editorSection = document.getElementById('editorSection');
const codeEditor = document.getElementById('codeEditor');
const validateBtn = document.getElementById('validateBtn');
const markCompleteBtn = document.getElementById('markCompleteBtn');
const resultMessage = document.getElementById('resultMessage');
const taskTitle = document.getElementById('taskTitle');
const taskInstructions = document.getElementById('taskInstructions');
const previewFrame = document.getElementById('previewFrame');

let currentTaskIndex = null;
let validated = false;

// Check login
let username = localStorage.getItem("username");
if (!username) window.location.href = "login.html";

function loadTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.textContent = task.title;
    li.addEventListener('click', () => openTask(i));
    taskList.appendChild(li);
  });
}

function openTask(index) {
  currentTaskIndex = index;
  const task = tasks[index];
  taskTitle.textContent = task.title;
  taskInstructions.textContent = task.instructions;
  codeEditor.value = "";
  resultMessage.textContent = "";
  validated = false;
  markCompleteBtn.disabled = true;
  markCompleteBtn.innerText = "Mark Complete";
  editorSection.style.display = 'block';
  updatePreview("");
}

function updatePreview(htmlCode) {
  const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  previewDoc.open();
  previewDoc.write(htmlCode || "<!-- Live Preview -->");
  previewDoc.close();
}

validateBtn.addEventListener('click', () => {
  const code = codeEditor.value.trim();
  const task = tasks[currentTaskIndex];
  updatePreview(code);

  if (task.expected.test(code)) {
    validated = true;
    resultMessage.textContent = '✅ Task Successful!';
    resultMessage.style.color = 'green';
    markCompleteBtn.disabled = false;
  } else {
    validated = false;
    resultMessage.textContent = '❌ Incorrect code. Try again!';
    resultMessage.style.color = 'red';
    markCompleteBtn.disabled = true;
  }
});

markCompleteBtn.addEventListener('click', async () => {
  if (!validated) return;
  const task = tasks[currentTaskIndex];

  markCompleteBtn.disabled = true;
  markCompleteBtn.innerText = "Sending...";

  try {
    const res = await fetch(`${API_BASE}/task/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        course: "js",
        task_id: task.id
      })
    });

    const data = await res.json();
    if (data.message && data.message.toLowerCase().includes("complete")) {
      markCompleteBtn.innerText = "Completed";
      resultMessage.textContent = "🎉 Task marked as complete!";
    } else {
      throw new Error("Unexpected response");
    }
  } catch (err) {
    resultMessage.textContent = "❌ Could not send completion. Try again.";
    markCompleteBtn.innerText = "Mark Complete";
    markCompleteBtn.disabled = false;
  }
});

codeEditor.addEventListener('input', () => {
  updatePreview(codeEditor.value.trim());
});

// Initialize
loadTasks();
