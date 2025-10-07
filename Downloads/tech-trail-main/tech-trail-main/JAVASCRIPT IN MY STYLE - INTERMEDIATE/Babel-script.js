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
        <span>The <code class="${randomColor.bg.replace('100', '50')} px-2 py-1 rounded mx-1 inline-block">Babel</code> is a JavaScript compiler that transforms modern ES6+ code into backward-compatible versions for older browsers. It's commonly used for transpiling modern syntax, enabling new JavaScript features, polyfilling missing APIs, or ensuring cross-browser compatibility in web applications.</span>
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
    <title>Understanding Babel: The JavaScript Compiler</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Understanding Babel: The JavaScript Compiler</h1>

        <div class="demo-section">
            <p>
                <strong>Babel is a JavaScript compiler (or transpiler).</strong> Its primary role is to transform
                modern JavaScript (ES6+ / ECMAScript 2015 and newer) into backward-compatible versions of JavaScript
                that can be run by older browsers or environments.
            </p>
            <p>
                It's a crucial tool in modern web development, allowing developers to write future-proof JavaScript
                today while ensuring broad compatibility for users.
            </p>

            <div class="example-box">
                <h2>Why is Babel needed?</h2>
                <ul>
                    <li>✨ Write modern, cleaner, and more efficient JavaScript.</li>
                    <li>🚀 Utilize the latest language features immediately without waiting for browser support.</li>
                    <li>🛡️ Ensure broad compatibility across a wide range of user browsers.</li>
                    <li>📦 Integrate with other tools like React (for JSX) or TypeScript.</li>
                </ul>
            </div>

            <div class="example-box">
                <h2>How it conceptually works (not running here!)</h2>
                <p>
                    Below are examples of modern JavaScript code and what Babel would typically transform them into
                    for older environments. <strong>This page does NOT run Babel; it only shows the concept.</strong>
                </p>
                
                <h3>ES6 Arrow Function & Const</h3>
                <p class="code-label">Your Modern Code:</p>
                <pre class="code-block">
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet('World');</pre>
                <p class="code-label">What Babel Might Output (for older browsers):</p>
                <pre class="code-block transpiled">
"use strict";

var greet = function greet(name) {
  console.log("Hello, " + name + "!");
};
greet('World');</pre>

                <h3>ES6 Class Syntax (simplified)</h3>
                <p class="code-label">Your Modern Code:</p>
                <pre class="code-block">
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log(\`Hi, my name is \${this.name}\`);
  }
}
const p = new Person('Alice');
p.sayHello();</pre>
                <p class="code-label">What Babel Might Output (simplified):</p>
                <pre class="code-block transpiled">
"use strict";

function _classCallCheck(instance, Constructor) { /* ... Babel helper ... */ }
function _defineProperties(target, props) { /* ... Babel helper ... */ }
function _createClass(Constructor, protoProps, staticProps) { /* ... Babel helper ... */ }

var Person = /*#__PURE__*/function () {
  function Person(name) {
    _classCallCheck(this, Person);
    this.name = name;
  }
  _createClass(Person, [{
    key: "sayHello",
    value: function sayHello() {
      console.log("Hi, my name is " + this.name);
    }
  }]);
  return Person;
}();

var p = new Person('Alice');
p.sayHello();</pre>
            </div>

            <p>
                To use Babel, you typically set up a build process with tools like Webpack, Rollup, or Parcel,
                which integrate Babel to transpile your source code before it's bundled and served to the browser.
            </p>
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
    max-width: 900px;
}

h1 {
    color: #2563eb;
    margin-bottom: 30px;
}

.demo-section {
    margin-bottom: 20px;
    text-align: left;
}

.example-box {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
}

.example-box h2 {
    color: #1a73e8;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3em;
}

.example-box h3 {
    color: #0056b3;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.1em;
}

.example-box ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 20px;
}

.example-box ul li {
    margin-bottom: 8px;
}

.code-label {
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 5px;
    color: #555;
    font-size: 0.95em;
}

.code-block {
    background-color: #e8f0f3;
    border: 1px solid #cce7ee;
    padding: 15px;
    margin: 0; /* Remove top/bottom margin if using code-label */
    border-radius: 6px;
    font-family: 'Consolas', 'Monaco', monospace;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.9em;
    color: #333;
    overflow-x: auto; /* For very long lines */
}

.code-block.transpiled {
    background-color: #e6ffe6; /* Lighter green for transpiled output */
    border-color: #ccebcc;
}

/* Hide elements not relevant for this conceptual demo */
.status-message, .button-group, .output-box {
    display: none; 
}
`,

  js: `// This JavaScript file serves as a conceptual explanation for Babel.
// It does NOT run Babel in the browser. Babel is a build-time tool.

document.addEventListener('DOMContentLoaded', () => {
    console.log("This page conceptually demonstrates Babel's role.");
    console.log("The JavaScript code examples shown in the HTML illustrate code before and after Babel's transformation.");
    console.log("You typically integrate Babel into your development workflow using tools like Webpack, Rollup, or Parcel.");
});

// Any modern JavaScript you write here (like this comment and the DOMContentLoaded listener)
// would be the 'input' to Babel if this file were part of a Babel-configured project.
// Babel would then transform it into compatible JavaScript, and that transformed code
// is what the browser would ultimately execute.
`
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
