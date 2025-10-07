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
        <span>The <code class="${randomColor.bg.replace('100', '50')} px-2 py-1 rounded mx-1 inline-block">HTML DOM Methods</code> in JavaScript are built-in functions that allow you to interact with and manipulate HTML elements, including methods like <code>createElement()</code>, <code>appendChild()</code>, <code>removeChild()</code>, <code>setAttribute()</code>, and <code>addEventListener()</code>. They're commonly used for dynamic content creation, element manipulation, event handling, DOM traversal, or building interactive web applications that modify the document structure and content programmatically.</span>
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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>HTML DOM Methods Demo</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>HTML DOM Methods Demo</h1>
    <p>Click the buttons below to see different DOM methods in action.</p>

    <div class="demo-section">
      <button id="btnGetElementById">Get Element By ID</button>
      <button id="btnGetElementsByClassName">Get Elements By Class Name</button>
      <button id="btnQuerySelector">Query Selector</button>
      <button id="btnCreateElement">Create Element</button>
      <button id="btnRemoveElement">Remove Element</button>
    </div>

    <div id="outputArea" class="output-box">
      <p><strong>Output will appear here...</strong></p>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,

  css: `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9fafb;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  box-sizing: border-box;
}

.container {
  background: white;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 95%;
  text-align: center;
}

h1 {
  color: #1e40af;
  margin-bottom: 20px;
}

.demo-section button {
  background-color: #3b82f6;
  border: none;
  color: white;
  padding: 10px 16px;
  margin: 8px 6px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.demo-section button:hover {
  background-color: #1e40af;
}

.output-box {
  margin-top: 25px;
  padding: 15px;
  background-color: #e0e7ff;
  border-radius: 6px;
  font-family: 'Consolas', monospace;
  min-height: 140px;
  text-align: left;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.9rem;
}`,

  js: `// DOM Elements
const btnGetElementById = document.getElementById('btnGetElementById');
const btnGetElementsByClassName = document.getElementById('btnGetElementsByClassName');
const btnQuerySelector = document.getElementById('btnQuerySelector');
const btnCreateElement = document.getElementById('btnCreateElement');
const btnRemoveElement = document.getElementById('btnRemoveElement');
const outputArea = document.getElementById('outputArea');

// Clear output helper
function clearOutput() {
  outputArea.textContent = '';
}

// Append output helper
function appendOutput(message) {
  outputArea.textContent += message + '\\n';
}

// Event Handlers
btnGetElementById.addEventListener('click', () => {
  clearOutput();
  const header = document.querySelector('h1');
  const element = document.getElementById('headerTitle') || header; // fallback
  appendOutput(\`Element found by ID: \${element.tagName} - "\${element.textContent}"\`);
});

btnGetElementsByClassName.addEventListener('click', () => {
  clearOutput();
  // For demo, create some dummy elements with class 'demo-item'
  let demoItems = document.getElementsByClassName('demo-item');
  if(demoItems.length === 0) {
    for(let i=1; i<=3; i++) {
      const p = document.createElement('p');
      p.className = 'demo-item';
      p.textContent = 'Demo Item ' + i;
      outputArea.appendChild(p);
    }
    demoItems = document.getElementsByClassName('demo-item');
  }
  appendOutput(\`Found \${demoItems.length} element(s) with class "demo-item".\`);
});

btnQuerySelector.addEventListener('click', () => {
  clearOutput();
  const firstBtn = document.querySelector('button');
  appendOutput(\`First <button> found by querySelector: "\${firstBtn.textContent}"\`);
});

btnCreateElement.addEventListener('click', () => {
  clearOutput();
  const newDiv = document.createElement('div');
  newDiv.textContent = 'This is a new div created by createElement().';
  newDiv.style.padding = '8px';
  newDiv.style.backgroundColor = '#c7d2fe';
  newDiv.style.borderRadius = '5px';
  outputArea.appendChild(newDiv);
  appendOutput('New <div> element created and added.');
});

btnRemoveElement.addEventListener('click', () => {
  clearOutput();
  // Remove last child inside outputArea (if any)
  const lastChild = outputArea.lastElementChild;
  if (lastChild) {
    outputArea.removeChild(lastChild);
    appendOutput('Last child element removed.');
  } else {
    appendOutput('No child elements to remove.');
  }
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
