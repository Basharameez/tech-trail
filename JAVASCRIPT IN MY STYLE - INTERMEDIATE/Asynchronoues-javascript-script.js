// Combined script for info banner and Monaco editor functionality

// First, create and insert the info banner
document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  
  // Function to get a random color for the info banner
  function getRandomColor() {
    const colors = [
      { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-500" },
      { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-500" },
      { bg: "bg-red-100", text: "text-red-600", border: "border-red-500" },
      { bg: "bg-yellow-100", text: "text-yellow-600", border: "border-yellow-500" },
      { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-500" },
      { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-500" },
      { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-500" },
      { bg: "bg-teal-100", text: "text-teal-600", border: "border-teal-500" }
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Get random color for info banner
  const randomColor = getRandomColor();
  
  // Create the info banner with random color
  const infoBanner = document.createElement("div");
  infoBanner.className = `${randomColor.bg} ${randomColor.text} py-3 px-4 md:py-4 md:px-6 border-l-4 ${randomColor.border} text-sm md:text-base`;
  infoBanner.innerHTML = `
<div class="flex items-start">
    <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <p>
        <span>The <code class="${randomColor.bg.replace('100', '50')} px-2 py-1 rounded mx-1 inline-block">Asynchronous JavaScript</code> programming model allows code execution without blocking the main thread using callbacks, promises, and async/await. It's commonly used for handling API requests, timers, file operations, or any long-running tasks that shouldn't freeze the user interface.</span>
    </p>
</div>

  `;
  
  // Create editor main section
  const mainSection = document.createElement("main");
  mainSection.innerHTML = `
    <div class="editor-grid">
      <div class="editor-section">
        <div class="tabs">
          <button class="tab" data-tab="html">HTML</button>
          <button class="tab" data-tab="css">CSS</button>
          <button class="tab active" data-tab="js">JavaScript</button>
        </div>
        <div id="editor" class="code-editor"></div>
      </div>

      <div class="preview-section">
        <div class="preview-header">
          <span>Preview</span>
          <div class="window-controls">
            <div class="control red"></div>
            <div class="control yellow"></div>
            <div class="control green"></div>
          </div>
        </div>
        <iframe id="preview" title="Preview"></iframe>
      </div>
    </div>
  `;
  
  // Insert both elements
  mainContent.appendChild(infoBanner);
  mainContent.appendChild(mainSection);
  
  // Initialize the editor now that the elements are in the DOM
  initializeEditor();
});

// Monaco Editor setup
function initializeEditor() {
  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });

  let editor;
  let currentLanguage = 'js';
const defaultCode = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asynchronous JavaScript Demo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Asynchronous JavaScript Demo</h1>

        <div class="demo-section">
            <p>Explore different asynchronous patterns in JavaScript.</p>
            
            <div class="button-group">
                <button id="callbackDemoBtn">Callbacks Demo</button>
                <button id="promiseDemoBtn">Promises Demo</button>
                <button id="asyncAwaitDemoBtn">Async/Await Demo</button>
            </div>
            
            <p id="statusMessage" class="status-message"></p>
            <pre id="outputLog" class="output-box"></pre>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,

  css: `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f8ff;
    color: #333;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    box-sizing: border-box;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%;
    max-width: 600px;
}

h1 {
    color: #2563eb;
    margin-bottom: 30px;
}

.demo-section {
    margin-bottom: 20px;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
}

button {
    padding: 12px 25px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #1e40af;
    transform: translateY(-2px);
}

button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
}

.status-message {
    font-weight: bold;
    margin-top: 15px;
    padding: 8px 12px;
    border-radius: 5px;
    min-height: 20px;
}

.status-message.loading {
    color: #f39c12;
    background-color: #fff3e0;
}

.status-message.success {
    color: #27ae60;
    background-color: #e6ffee;
}

.status-message.error {
    color: #e74c3c;
    background-color: #ffebee;
}

.status-message.info {
    color: #3498db;
    background-color: #eaf6fd;
}

.output-box {
    background-color: #ecf0f1;
    border: 1px solid #dcdfe1;
    padding: 15px;
    margin-top: 15px;
    border-radius: 5px;
    font-family: 'Consolas', 'Monaco', monospace;
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 250px;
    overflow-y: auto;
    text-align: left;
    font-size: 0.9em;
}
`,

  js: `// Utility function to simulate a delay
function delay(ms, value = null) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// DOM Elements
const callbackDemoBtn = document.getElementById('callbackDemoBtn');
const promiseDemoBtn = document.getElementById('promiseDemoBtn');
const asyncAwaitDemoBtn = document.getElementById('asyncAwaitDemoBtn');
const statusMessage = document.getElementById('statusMessage');
const outputLog = document.getElementById('outputLog');

// Helper functions for UI updates
function setStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = \`status-message \${type}\`;
}

function appendLog(message) {
    outputLog.textContent += message + '\\n';
    outputLog.scrollTop = outputLog.scrollHeight; // Scroll to bottom
}

function clearLog() {
    outputLog.textContent = '';
}

function enableButtons(...buttons) {
    buttons.forEach(button => button.disabled = false);
}

function disableButtons(...buttons) {
    buttons.forEach(button => button.disabled = true);
}

// --- Callback Hell Simulation ---
function fetchDataWithCallback(id, callback) {
    appendLog(\`[Callback] Fetching data for ID: \${id}...\`);
    delay(1000).then(() => {
        if (id === 1) {
            callback(null, { id: 1, name: 'Alice', userId: 101 });
        } else {
            callback(new Error('Data not found for ID: ' + id), null);
        }
    });
}

function fetchPostsWithCallback(userId, callback) {
    appendLog(\`[Callback] Fetching posts for User ID: \${userId}...\`);
    delay(1500).then(() => {
        if (userId === 101) {
            callback(null, [{ postId: 1, title: 'Post A' }, { postId: 2, title: 'Post B' }]);
        } else {
            callback(new Error('Posts not found for User ID: ' + userId), null);
        }
    });
}

function callbackDemo() {
    clearLog();
    disableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
    setStatus('Starting Callbacks Demo...', 'loading');

    fetchDataWithCallback(1, (error, userData) => {
        if (error) {
            appendLog(\`[Callback Error] \${error.message}\`);
            setStatus('Callbacks Demo Failed!', 'error');
            enableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
            return;
        }
        appendLog(\`[Callback] User: \${userData.name}\`);

        fetchPostsWithCallback(userData.userId, (error, postsData) => {
            if (error) {
                appendLog(\`[Callback Error] \${error.message}\`);
                setStatus('Callbacks Demo Failed!', 'error');
                enableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
                return;
            }
            appendLog(\`[Callback] Posts found: \${postsData.length}\`);
            appendLog(\`[Callback] First post: \${postsData[0].title}\`);
            setStatus('Callbacks Demo Completed!', 'success');
            enableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
        });
    });
}

// --- Promises Simulation ---
function fetchDataWithPromise(id) {
    appendLog(\`[Promise] Fetching data for ID: \${id}...\`);
    return delay(1000).then(() => {
        if (id === 2) {
            return { id: 2, name: 'Bob', userId: 102 };
        } else {
            throw new Error('Data not found for ID: ' + id);
        }
    });
}

function fetchPostsWithPromise(userId) {
    appendLog(\`[Promise] Fetching posts for User ID: \${userId}...\`);
    return delay(1500).then(() => {
        if (userId === 102) {
            return [{ postId: 3, title: 'Promise Post X' }, { postId: 4, title: 'Promise Post Y' }];
        } else {
            throw new Error('Posts not found for User ID: ' + userId);
        }
    });
}

function promiseDemo() {
    clearLog();
    disableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
    setStatus('Starting Promises Demo...', 'loading');

    fetchDataWithPromise(2)
        .then(userData => {
            appendLog(\`[Promise] User: \${userData.name}\`);
            return fetchPostsWithPromise(userData.userId);
        })
        .then(postsData => {
            appendLog(\`[Promise] Posts found: \${postsData.length}\`);
            appendLog(\`[Promise] First post: \${postsData[0].title}\`);
            setStatus('Promises Demo Completed!', 'success');
        })
        .catch(error => {
            appendLog(\`[Promise Error] \${error.message}\`);
            setStatus('Promises Demo Failed!', 'error');
        })
        .finally(() => {
            enableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
        });
}

// --- Async/Await Simulation ---
async function fetchDataWithAsyncAwait(id) {
    appendLog(\`[Async/Await] Fetching data for ID: \${id}...\`);
    await delay(1000);
    if (id === 3) {
        return { id: 3, name: 'Charlie', userId: 103 };
    } else {
        throw new Error('Data not found for ID: ' + id);
    }
}

async function fetchPostsWithAsyncAwait(userId) {
    appendLog(\`[Async/Await] Fetching posts for User ID: \${userId}...\`);
    await delay(1500);
    if (userId === 103) {
        return [{ postId: 5, title: 'Async Post Alpha' }, { postId: 6, title: 'Async Post Beta' }];
    } else {
        throw new Error('Posts not found for User ID: ' + userId);
    }
}

async function asyncAwaitDemo() {
    clearLog();
    disableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
    setStatus('Starting Async/Await Demo...', 'loading');

    try {
        const userData = await fetchDataWithAsyncAwait(3);
        appendLog(\`[Async/Await] User: \${userData.name}\`);

        const postsData = await fetchPostsWithAsyncAwait(userData.userId);
        appendLog(\`[Async/Await] Posts found: \${postsData.length}\`);
        appendLog(\`[Async/Await] First post: \${postsData[0].title}\`);
        setStatus('Async/Await Demo Completed!', 'success');
    } catch (error) {
        appendLog(\`[Async/Await Error] \${error.message}\`);
        setStatus('Async/Await Demo Failed!', 'error');
    } finally {
        enableButtons(callbackDemoBtn, promiseDemoBtn, asyncAwaitDemoBtn);
    }
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    callbackDemoBtn.addEventListener('click', callbackDemo);
    promiseDemoBtn.addEventListener('click', promiseDemo);
    asyncAwaitDemoBtn.addEventListener('click', asyncAwaitDemo);
    setStatus('Ready to explore asynchronous JavaScript!', 'info'); // Initial status
});`
};
  let code = { ...defaultCode };

  // Initialize Monaco Editor
  require(['vs/editor/editor.main'], function() {
    // Define custom theme
    monaco.editor.defineTheme('codeTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'regexp', foreground: 'D16969' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'namespace', foreground: '569CD6' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'struct', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0', fontStyle: 'bold' },
        { token: 'interface', foreground: '4EC9B0' },
        { token: 'enum', foreground: '4EC9B0' },
        { token: 'typeParameter', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'member', foreground: '9CDCFE' },
        { token: 'macro', foreground: 'BD63C5' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'parameter', foreground: '9CDCFE' },
        { token: 'property', foreground: '9CDCFE' },
        { token: 'label', foreground: '717171' }
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorLineNumber.foreground': '#858585',
        'editorCursor.foreground': '#A6A6A6',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
        'editorWhitespace.foreground': '#3A3D41'
      }
    });

    editor = monaco.editor.create(document.getElementById('editor'), {
      value: code[currentLanguage],
      language: currentLanguage,
      theme: 'codeTheme',
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: 'JetBrains Mono',
      padding: { top: 16 },
      smoothScrolling: true,
      cursorSmoothCaretAnimation: 'on',
      formatOnPaste: true,
      formatOnType: true,
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      tabSize: 2,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on'
    });

    editor.onDidChangeModelContent(() => {
      code[currentLanguage] = editor.getValue();
      updatePreview();
    });

    // Initial preview
    updatePreview();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      editor.layout();
    });
    
    // Set up tab switching after editor is initialized
    setupTabSwitching();
    
    // Tab switching function
    function setupTabSwitching() {
      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const language = tab.dataset.tab;
          if (language === currentLanguage) return;

          // Save current content
          code[currentLanguage] = editor.getValue();

          // Update active tab
          document.querySelector('.tab.active').classList.remove('active');
          tab.classList.add('active');

          // Update editor language and content
          currentLanguage = language;
          monaco.editor.setModelLanguage(editor.getModel(), language);
          editor.setValue(code[language]);
          
          // Focus editor after switching
          setTimeout(() => editor.focus(), 100);
        });
      });
    }
  });

  // Preview functionality
  function updatePreview() {
    const wrappedJS = `
      try {
        const originalConsole = console.log;
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        const originalConsoleInfo = console.info;
        
        console.log = function(...args) {
          window.parent.postMessage({ type: 'log', content: args.join(' ') }, '*');
          originalConsole.apply(console, args);
        };

        console.error = function(...args) {
          window.parent.postMessage({ type: 'error', content: args.join(' ') }, '*');
          originalConsoleError.apply(console, args);
        };
        
        console.warn = function(...args) {
          window.parent.postMessage({ type: 'warning', content: args.join(' ') }, '*');
          originalConsoleWarn.apply(console, args);
        };
        
        console.info = function(...args) {
          window.parent.postMessage({ type: 'info', content: args.join(' ') }, '*');
          originalConsoleInfo.apply(console, args);
        };

        ${code.js}
      } catch (error) {
        window.parent.postMessage({ type: 'error', content: error.message }, '*');
      }
    `;

    const preview = document.getElementById('preview');
    preview.srcdoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${wrappedJS}</script>
        </body>
      </html>
    `;
  }
}

// Navigation Toggle Function
function toggleNav() {
  const navMenu = document.getElementById('navMenu');
  const overlay = document.getElementById('overlay');

  navMenu.classList.toggle('open');
  overlay.classList.toggle('active');

  // Prevent body scrolling when nav is open
  if (navMenu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Console message handling
window.addEventListener('message', event => {
  if (event.data && typeof event.data === 'object') {
    const { type, content } = event.data;
    console[type.toLowerCase()](content);
  }
});

// Back button functionality
document.addEventListener("DOMContentLoaded", () => {
  // Back button functionality if it exists
  const backBtn = document.getElementById('BackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }
  
});
