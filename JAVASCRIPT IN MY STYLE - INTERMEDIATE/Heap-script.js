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
        <span>The <code class="${randomColor.bg.replace('100', '50')} px-2 py-1 rounded mx-1 inline-block">Heap</code> in JavaScript is a memory region where objects, arrays, and functions are stored with dynamic allocation, managed by the JavaScript engine's garbage collector for automatic memory management. It's commonly used for understanding memory allocation, performance optimization, debugging memory leaks, garbage collection behavior, or managing large data structures that require dynamic memory allocation during runtime.</span>
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
  html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Heap Example</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <div class="heap-container">\n    <h1>Max Heap Demo</h1>\n    <input type="number" id="heapInput" placeholder="Enter a number" />\n    <button id="insertBtn">Insert</button>\n    <button id="extractBtn">Extract Max</button>\n    <p><strong>Heap:</strong> <span id="heapArray">[]</span></p>\n    <p id="heapResult"></p>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>',

  css: 'body {\n  font-family: Arial, sans-serif;\n  background-color: #f0f9ff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}\n\n.heap-container {\n  background-color: white;\n  padding: 2rem;\n  border-radius: 10px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n\ninput {\n  padding: 0.5rem;\n  font-size: 1rem;\n  margin-bottom: 1rem;\n  width: 200px;\n}\n\nbutton {\n  padding: 0.6rem 1.2rem;\n  margin: 0.3rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 5px;\n  font-size: 1rem;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background-color: #2563eb;\n}\n\n#heapResult {\n  margin-top: 1rem;\n  color: #1d4ed8;\n  font-weight: bold;\n}',

  js: '// Max Heap Implementation\nconst input = document.getElementById("heapInput");\nconst insertBtn = document.getElementById("insertBtn");\nconst extractBtn = document.getElementById("extractBtn");\nconst result = document.getElementById("heapResult");\nconst heapDisplay = document.getElementById("heapArray");\n\nlet heap = [];\n\nfunction swap(i, j) {\n  [heap[i], heap[j]] = [heap[j], heap[i]];\n}\n\nfunction heapifyUp(index) {\n  let parent = Math.floor((index - 1) / 2);\n  while (index > 0 && heap[index] > heap[parent]) {\n    swap(index, parent);\n    index = parent;\n    parent = Math.floor((index - 1) / 2);\n  }\n}\n\nfunction heapifyDown(index) {\n  const n = heap.length;\n  while (index < n) {\n    let left = 2 * index + 1;\n    let right = 2 * index + 2;\n    let largest = index;\n\n    if (left < n && heap[left] > heap[largest]) largest = left;\n    if (right < n && heap[right] > heap[largest]) largest = right;\n\n    if (largest !== index) {\n      swap(index, largest);\n      index = largest;\n    } else {\n      break;\n    }\n  }\n}\n\nfunction insert(value) {\n  heap.push(value);\n  heapifyUp(heap.length - 1);\n  updateHeapDisplay();\n}\n\nfunction extractMax() {\n  if (heap.length === 0) {\n    result.textContent = "Heap is empty!";\n    return;\n  }\n  const max = heap[0];\n  heap[0] = heap.pop();\n  heapifyDown(0);\n  updateHeapDisplay();\n  result.textContent = "Extracted Max: " + max;\n}\n\nfunction updateHeapDisplay() {\n  heapDisplay.textContent = JSON.stringify(heap);\n  result.textContent = "";\n}\n\ninsertBtn.addEventListener("click", () => {\n  const value = parseInt(input.value);\n  if (isNaN(value)) {\n    result.textContent = "Please enter a valid number.";\n    return;\n  }\n  insert(value);\n  input.value = "";\n});\n\nextractBtn.addEventListener("click", () => {\n  extractMax();\n});'
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
