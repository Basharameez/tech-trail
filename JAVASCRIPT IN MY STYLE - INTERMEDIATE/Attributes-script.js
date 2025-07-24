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
        <span>The <code class="${randomColor.bg.replace('100', '50')} px-2 py-1 rounded mx-1 inline-block">Attributes</code> in JavaScript represent properties of HTML elements that can be accessed and modified through the DOM. They're commonly used for getting/setting element properties, manipulating HTML attributes, handling data attributes, or dynamically changing element behavior and appearance.</span>
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
    <title>HTML Element Attributes Demo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>JavaScript HTML Attributes Demo</h1>

        <div class="demo-section">
            <p>Explore different ways to interact with HTML element attributes using JavaScript.</p>
            
            <div class="example-box">
                <h2>1. Standard Attributes (id, class, src, href, style, disabled, checked)</h2>
                <input type="text" id="myInput" value="Initial Value" placeholder="Type something...">
                <button id="myButton" class="btn primary" disabled>Click Me (Disabled)</button>
                <a href="https://example.com" id="myLink">Visit Example.com</a>
                <img src="https://via.placeholder.com/100x50/cccccc/000000?text=Placeholder" alt="Placeholder Image" id="myImage">
                <input type="checkbox" id="myCheckbox"> Remember Me

                <div class="button-group">
                    <button id="readAttributesBtn">Read Attributes</button>
                    <button id="modifyAttributesBtn">Modify Attributes</button>
                    <button id="toggleDisabledBtn">Toggle Button Disabled</button>
                    <button id="toggleCheckboxBtn">Toggle Checkbox</button>
                    <button id="changeImageBtn">Change Image</button>
                </div>
            </div>

            <div class="example-box">
                <h2>2. Data Attributes (data-*)</h2>
                <div id="userData" data-user-id="12345" data-user-name="John Doe" data-is-admin="false">
                    User Information
                </div>
                <button id="readDataAttributesBtn">Read Data Attributes</button>
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
    max-width: 800px;
}

h1 {
    color: #2563eb;
    margin-bottom: 30px;
}

.demo-section {
    margin-bottom: 20px;
}

.example-box {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
    text-align: left;
}

.example-box h2 {
    color: #1a73e8;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3em;
}

.example-box input[type="text"],
.example-box button,
.example-box a,
.example-box img,
.example-box input[type="checkbox"] {
    margin-right: 10px;
    margin-bottom: 10px;
    vertical-align: middle;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 15px;
}

button {
    padding: 10px 18px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
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
    max-height: 300px;
    overflow-y: auto;
    text-align: left;
    font-size: 0.9em;
}
`,

  js: `// DOM Elements
const myInput = document.getElementById('myInput');
const myButton = document.getElementById('myButton');
const myLink = document.getElementById('myLink');
const myImage = document.getElementById('myImage');
const myCheckbox = document.getElementById('myCheckbox');
const userDataDiv = document.getElementById('userData');

const readAttributesBtn = document.getElementById('readAttributesBtn');
const modifyAttributesBtn = document.getElementById('modifyAttributesBtn');
const toggleDisabledBtn = document.getElementById('toggleDisabledBtn');
const toggleCheckboxBtn = document.getElementById('toggleCheckboxBtn');
const changeImageBtn = document.getElementById('changeImageBtn');
const readDataAttributesBtn = document.getElementById('readDataAttributesBtn');

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

// --- Demo Functions ---

// 1. Reading Standard Attributes
function readStandardAttributes() {
    clearLog();
    setStatus('Reading standard attributes...', 'info');

    appendLog('--- Reading Attributes ---');
    
    // Using .propertyName (DOM properties)
    appendLog(\`Input Value (myInput.value): \${myInput.value}\`);
    appendLog(\`Button Text (myButton.textContent): "\${myButton.textContent}"\`);
    appendLog(\`Button Disabled (myButton.disabled): \${myButton.disabled}\`);
    appendLog(\`Link Href (myLink.href): \${myLink.href}\`); // Returns full URL
    appendLog(\`Image Alt (myImage.alt): "\${myImage.alt}"\`);
    appendLog(\`Checkbox Checked (myCheckbox.checked): \${myCheckbox.checked}\`);
    
    // Using getAttribute() (HTML attributes)
    appendLog('\\n--- Using getAttribute() ---');
    appendLog(\`Input Placeholder (myInput.getAttribute('placeholder')): "\${myInput.getAttribute('placeholder')}"\`);
    appendLog(\`Button Class (myButton.getAttribute('class')): "\${myButton.getAttribute('class')}"\`);
    appendLog(\`Button Disabled (myButton.getAttribute('disabled')): \${myButton.getAttribute('disabled')}\`); // Returns 'disabled' or null
    appendLog(\`Link href (myLink.getAttribute('href')): "\${myLink.getAttribute('href')}"\`); // Returns original attribute value
    appendLog(\`Image src (myImage.getAttribute('src')): "\${myImage.getAttribute('src')}"\`);
    appendLog(\`Checkbox type (myCheckbox.getAttribute('type')): "\${myCheckbox.getAttribute('type')}"\`);

    setStatus('Standard attributes read.', 'success');
}

// 2. Modifying Standard Attributes
function modifyStandardAttributes() {
    clearLog();
    setStatus('Modifying standard attributes...', 'info');

    // Using .propertyName (DOM properties)
    myInput.value = 'New Value Set!';
    myInput.style.backgroundColor = '#e6f7ff'; // Direct style property
    myButton.textContent = 'Modified!';
    myLink.href = 'https://developer.mozilla.org/';
    myLink.textContent = 'Visit MDN Web Docs';
    myImage.alt = 'New Alt Text';

    // Using setAttribute() (HTML attributes)
    myInput.setAttribute('placeholder', 'New Placeholder Text');
    myButton.setAttribute('class', 'btn secondary'); // Change class
    myImage.setAttribute('width', '150'); // Add/change width attribute

    appendLog('Input value changed to: "New Value Set!"');
    appendLog('Button text changed to: "Modified!" and class to "secondary"');
    appendLog('Link href changed to MDN');
    appendLog('Image alt text changed and width set to 150');
    appendLog('Input background color changed via .style');

    setStatus('Standard attributes modified.', 'success');
}

// 3. Toggling Boolean Attributes (disabled)
function toggleButtonDisabled() {
    clearLog();
    setStatus('Toggling button disabled attribute...', 'info');

    if (myButton.disabled) {
        myButton.disabled = false; // DOM property for boolean attributes
        appendLog('Button is now ENABLED.');
    } else {
        myButton.disabled = true;
        appendLog('Button is now DISABLED.');
    }
    setStatus('Button disabled state toggled.', 'success');
}

// 4. Toggling Boolean Attributes (checked)
function toggleCheckboxChecked() {
    clearLog();
    setStatus('Toggling checkbox checked attribute...', 'info');

    myCheckbox.checked = !myCheckbox.checked; // Direct manipulation
    // Or: myCheckbox.toggleAttribute('checked'); // Modern way, but .checked is more common for checkboxes
    appendLog(\`Checkbox is now: \${myCheckbox.checked ? 'CHECKED' : 'UNCHECKED'}\`);
    setStatus('Checkbox checked state toggled.', 'success');
}

// 5. Changing Image Source
function changeImageSource() {
    clearLog();
    setStatus('Changing image source...', 'info');

    const currentSrc = myImage.src;
    const newSrc = currentSrc.includes('100x50')
        ? 'https://via.placeholder.com/150x80/99e699/000000?text=New+Image'
        : 'https://via.placeholder.com/100x50/cccccc/000000?text=Placeholder';

    myImage.src = newSrc; // Using .propertyName
    appendLog(\`Image source changed to: \${newSrc}\`);
    setStatus('Image source changed.', 'success');
}


// 6. Reading Data Attributes
function readDataAttributes() {
    clearLog();
    setStatus('Reading data attributes...', 'info');

    // The dataset property provides a convenient way to access data-* attributes.
    // It returns a DOMStringMap object, where each data attribute (e.g., data-user-id)
    // is converted to a camelCase property (e.g., userId).
    const userId = userDataDiv.dataset.userId;
    const userName = userDataDiv.dataset.userName;
    const isAdmin = userDataDiv.dataset.isAdmin; // Note: This will be a string "true" or "false"

    appendLog('--- Reading Data Attributes (via .dataset) ---');
    appendLog(\`User ID: \${userId} (Type: \${typeof userId})\`);
    appendLog(\`User Name: \${userName} (Type: \${typeof userName})\`);
    appendLog(\`Is Admin: \${isAdmin} (Type: \${typeof isAdmin})\`);

    // You can also access them with getAttribute, but .dataset is preferred for data-*
    appendLog('\\n--- Reading Data Attributes (via getAttribute) ---');
    appendLog(\`User ID (getAttribute): \${userDataDiv.getAttribute('data-user-id')}\`);
    appendLog(\`Is Admin (getAttribute): \${userDataDiv.getAttribute('data-is-admin')}\`);


    // Modifying data attributes
    userDataDiv.dataset.userEmail = 'john.doe@example.com';
    appendLog('\\nAdded new data-user-email attribute.');
    appendLog(\`New User Email: \${userDataDiv.dataset.userEmail}\`);

    // Deleting data attributes
    delete userDataDiv.dataset.isAdmin;
    appendLog('\\nDeleted data-is-admin attribute.');
    appendLog(\`Is Admin after deletion: \${userDataDiv.dataset.isAdmin}\`); // Will be undefined

    setStatus('Data attributes read and manipulated.', 'success');
}


// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    readAttributesBtn.addEventListener('click', readStandardAttributes);
    modifyAttributesBtn.addEventListener('click', modifyStandardAttributes);
    toggleDisabledBtn.addEventListener('click', toggleButtonDisabled);
    toggleCheckboxBtn.addEventListener('click', toggleCheckboxChecked);
    changeImageBtn.addEventListener('click', changeImageSource);
    readDataAttributesBtn.addEventListener('click', readDataAttributes);

    setStatus('Ready to interact with HTML attributes.', 'info');
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
