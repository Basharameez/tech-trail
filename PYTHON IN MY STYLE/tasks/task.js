const API_BASE = "https://tech-trail-w2ap.onrender.com"; // your FastAPI endpoint

const tasks = [
  {
    id: "py_task_1",
    title: "Task 1: Print a Message",
    instructions: "Write Python code to print 'Hello, Python!' to the console.",
    expected: /^\s*print\s*\(\s*['"]Hello,\s*Python!['"]\s*\)\s*$/i
  },
  {
    id: "py_task_2",
    title: "Task 2: Variables and Addition",
    instructions: "Declare two variables `a = 5` and `b = 10` and print their sum using `print(a + b)`.",
    expected: /^\s*a\s*=\s*5\s*[\r\n]+b\s*=\s*10\s*[\r\n]+print\s*\(\s*a\s*\+\s*b\s*\)\s*$/i
  },
  {
    id: "py_task_3",
    title: "Task 3: Input from User",
    instructions: "Write code to take input from user using `input()` and print the value.",
    expected: /^\s*user_input\s*=\s*input\s*\(\s*['"].*?['"]\s*\)\s*[\r\n]+print\s*\(\s*user_input\s*\)\s*$/i
  },
  {
    id: "py_task_4",
    title: "Task 4: If-Else Statement",
    instructions: "Write an if-else block that checks if `a = 10` is greater than 5 and prints appropriate message.",
    expected: /^\s*a\s*=\s*10\s*[\r\n]+if\s+a\s*>\s*5\s*:\s*[\r\n]+\s*print\s*\(.*?\)\s*[\r\n]+else\s*:\s*[\r\n]+\s*print\s*\(.*?\)\s*$/i
  },
  {
    id: "py_task_5",
    title: "Task 5: Define and Call Function",
    instructions: "Define a function `greet()` that prints 'Welcome!' and call it.",
    expected: /^\s*def\s+greet\s*\(\s*\)\s*:\s*[\r\n]+\s*print\s*\(\s*['"]Welcome!['"]\s*\)\s*[\r\n]+greet\s*\(\s*\)\s*$/i
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
}

validateBtn.addEventListener('click', () => {
  const code = codeEditor.value.trim();
  const task = tasks[currentTaskIndex];

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
        course: "python",
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

// Initialize
loadTasks();
