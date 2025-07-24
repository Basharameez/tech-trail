// js-intermediate-tasks.js

const API_BASE = "http://127.0.0.1:8000"; // your FastAPI endpoint

const tasks = [
  {
    id: "js_intermediate_1",
    title: "Task 1: Object with Method",
    instructions: "Create a JavaScript object named 'student' with properties name, age, and a method 'greet' that returns 'Hello, my name is NAME'.",
    expected: /const\s+student\s*=\s*{[\s\S]*name:\s*['"][^'"]+['"],[\s\S]*age:\s*\d+,[\s\S]*greet:\s*function\s*\(\)\s*{[\s\S]*return\s+[`'"]Hello, my name is\s+\$?{?this\.name}?['"`];[\s\S]*}[\s\S]*}/i
  },
  {
    id: "js_intermediate_2",
    title: "Task 2: Use Array.map",
    instructions: "Create an array of numbers and use .map() to return a new array with each number doubled.",
    expected: /const\s+numbers\s*=\s*\[[^\]]+];[\s\S]*const\s+doubled\s*=\s*numbers\.map\(\s*\w+\s*=>\s*\w+\s*\*\s*2\s*\)/i
  },
  {
    id: "js_intermediate_3",
    title: "Task 3: Array.filter",
    instructions: "Use .filter() to create a new array from an existing one with only numbers greater than 10.",
    expected: /const\s+filtered\s*=\s*\w+\.filter\(\s*\w+\s*=>\s*\w+\s*>\s*10\s*\)/i
  },
  {
    id: "js_intermediate_4",
    title: "Task 4: DOM Manipulation",
    instructions: "Create a button with id 'btn' and use JavaScript to add a click event that logs 'Button clicked!'.",
    expected: /document\.getElementById\(['"]btn['"]\)\.addEventListener\(['"]click['"],\s*\(\)\s*=>\s*{\s*console\.log\(['"]Button clicked!['"]\);\s*}\)/i
  },
  {
    id: "js_intermediate_5",
    title: "Task 5: Fetch API",
    instructions: "Use fetch to get data from 'https://jsonplaceholder.typicode.com/posts' and log the response as JSON.",
    expected: /fetch\(['"]https:\/\/jsonplaceholder.typicode.com\/posts['"]\)\s*\.then\(res\s*=>\s*res\.json\(\)\)\s*\.then\(data\s*=>\s*console\.log\(data\)\)/i
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

function updatePreview(jsCode) {
  const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  previewDoc.open();
  previewDoc.write(`<script>${jsCode}<\/script>`);
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
        course: "js-intermediate",
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
