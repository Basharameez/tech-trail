const API_BASE = "http://127.0.0.1:8000"; // your FastAPI endpoint

const tasks = [
  {
    id: "css_task_1",
    title: "Task 1: Style a Heading",
    instructions: "Create a <h1> element and style it using <style> tag to have blue color.",
    expected: /<style>[\s\S]*h1\s*{[^}]*color\s*:\s*blue[^}]*}[\s\S]*<\/style>[\s\S]*<h1>.*?<\/h1>/i
  },
  {
    id: "css_task_2",
    title: "Task 2: Set Background Color",
    instructions: "Set the background color of the body to lightgray using inline or internal CSS.",
    expected: /<style>[\s\S]*body\s*{[^}]*background-color\s*:\s*lightgray[^}]*}[\s\S]*<\/style>/i
  },
  {
    id: "css_task_3",
    title: "Task 3: Add a Class and Style It",
    instructions: "Add a class named 'highlight' to a <p> and give it red text color using CSS.",
    expected: /<style>[\s\S]*\.highlight\s*{[^}]*color\s*:\s*red[^}]*}[\s\S]*<\/style>[\s\S]*<p\s+class="highlight">.*?<\/p>/i
  },
  {
    id: "css_task_4",
    title: "Task 4: Style with ID Selector",
    instructions: "Create a <div> with id 'box' and give it width of 100px and height of 100px.",
    expected: /<style>[\s\S]*#box\s*{[^}]*width\s*:\s*100px[^}]*height\s*:\s*100px[^}]*}[\s\S]*<\/style>[\s\S]*<div\s+id="box"><\/div>/i
  },
  {
    id: "css_task_5",
    title: "Task 5: Use External Font",
    instructions: "Use a Google Font like 'Roboto' in your HTML and apply it to the body.",
    expected: /<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css[^"]*"[^>]*>[\s\S]*<style>[\s\S]*body\s*{[^}]*font-family\s*:\s*['"]?Roboto['"]?[^}]*}[\s\S]*<\/style>/i
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
        course: "css",
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
