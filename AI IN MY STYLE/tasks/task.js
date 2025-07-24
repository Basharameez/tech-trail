// html-tasks.js

const API_BASE = "http://127.0.0.1:8000"; // your FastAPI endpoint

const tasks = [
  {
    id: "html_task_1",
    title: "Task 1: Create a Basic HTML Page",
    instructions: "Create an HTML page with a title 'My First Page' and a heading <h1> with text 'Welcome to HTML'.",
    expected: /<html>[\s\S]*<head>[\s\S]*<title>My First Page<\/title>[\s\S]*<\/head>[\s\S]*<body>[\s\S]*<h1>Welcome to HTML<\/h1>[\s\S]*<\/body>[\s\S]*<\/html>/i
  },
  {
    id: "html_task_2",
    title: "Task 2: Add a Paragraph",
    instructions: "Add a <p> paragraph with any content inside the body section.",
    expected: /<p>.*?<\/p>/i
  },
  {
    id: "html_task_3",
    title: "Task 3: Add an Image",
    instructions: "Insert an image tag <img> with any source URL and alt text.",
    expected: /<img[^>]*src="[^"]+"[^>]*alt="[^"]+"[^>]*>/i
  },
  {
    id: "html_task_4",
    title: "Task 4: Create a List",
    instructions: "Add an unordered list <ul> with at least two <li> items.",
    expected: /<ul>[\s\S]*<li>.*?<\/li>[\s\S]*<li>.*?<\/li>[\s\S]*<\/ul>/i
  },
  {
    id: "html_task_5",
    title: "Task 5: Create a Table",
    instructions: "Create a <table> with one header row and two data rows.",
    expected: /<table>[\s\S]*<tr>[\s\S]*<th>.*?<\/th>[\s\S]*<\/tr>[\s\S]*<tr>[\s\S]*<td>.*?<\/td>[\s\S]*<\/tr>[\s\S]*<tr>[\s\S]*<td>.*?<\/td>[\s\S]*<\/tr>[\s\S]*<\/table>/i
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
  editorSection.style.display = 'block';
  updatePreview("");
}

function updatePreview(htmlCode) {
  const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  previewDoc.open();
  previewDoc.write(htmlCode);
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
        course: "html",
        task_id: task.id
      })
    });
    const data = await res.json();
    if (data.message && data.message.toLowerCase().includes("complete")) {
      markCompleteBtn.innerText = "Completed";
      resultMessage.textContent = "🎉 Task marked as complete!";
    } else {
      throw new Error("Failed to mark complete.");
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

loadTasks();
