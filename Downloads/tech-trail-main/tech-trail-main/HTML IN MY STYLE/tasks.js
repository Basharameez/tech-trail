// Game State Management
class HTMLLearningGame {
  constructor() {
    this.gameState = {
      exp: 0,
      completedTasks: new Set(),
      unlockedSolutions: new Set(),
      failedAttempts: {},
      theme: 'light',
      editorContent: {}
    };

    this.tasks = {
      // BEGINNER TASKS (10 tasks - 10 EXP each)
      'beginner-1': {
        title: 'Basic HTML Structure',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Create Basic HTML Structure</h4>
          <p><strong>Instructions:</strong> Create a basic HTML document with the following elements:</p>
          <ul>
            <li>An <code>h1</code> heading with the text "Welcome to HTML"</li>
            <li>A paragraph with the text "This is my first HTML page"</li>
            <li>Another paragraph with the text "I'm learning HTML step by step"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<h1>Welcome to HTML</h1>
<p>This is my first HTML page</p>
<p>I'm learning HTML step by step</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<h1>welcome to html</h1> <p>this is my first html page</p> <p>i'm learning html step by step</p>`;
          return normalized === expected;
        }
      },

      'beginner-2': {
        title: 'HTML Headings',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Create HTML Headings</h4>
          <p><strong>Instructions:</strong> Create the following heading structure:</p>
          <ul>
            <li>An <code>h1</code> heading with "Main Title"</li>
            <li>An <code>h2</code> heading with "Subtitle"</li>
            <li>An <code>h3</code> heading with "Section Title"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<h1>Main Title</h1>
<h2>Subtitle</h2>
<h3>Section Title</h3>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<h1>main title</h1> <h2>subtitle</h2> <h3>section title</h3>`;
          return normalized === expected;
        }
      },

      'beginner-3': {
        title: 'Text Formatting',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Text Formatting</h4>
          <p><strong>Instructions:</strong> Create the following formatted text:</p>
          <ul>
            <li>A paragraph with <code>strong</code> text "Important text"</li>
            <li>A paragraph with <code>em</code> text "Emphasized text"</li>
            <li>A paragraph with <code>mark</code> text "Highlighted text"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<p><strong>Important text</strong></p>
<p><em>Emphasized text</em></p>
<p><mark>Highlighted text</mark></p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p><strong>important text</strong></p> <p><em>emphasized text</em></p> <p><mark>highlighted text</mark></p>`;
          return normalized === expected;
        }
      },

      'beginner-4': {
        title: 'Line Breaks and Horizontal Rules',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Line Breaks and Horizontal Rules</h4>
          <p><strong>Instructions:</strong> Create the following structure:</p>
          <ul>
            <li>A paragraph with "First line" followed by a line break and "Second line"</li>
            <li>A horizontal rule</li>
            <li>Another paragraph with "After the rule"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<p>First line<br>Second line</p>
<hr>
<p>After the rule</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>first line<br>second line</p> <hr> <p>after the rule</p>`;
          return normalized === expected;
        }
      },

      'beginner-5': {
        title: 'HTML Comments',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: HTML Comments</h4>
          <p><strong>Instructions:</strong> Create the following:</p>
          <ul>
            <li>A comment with text "This is a comment"</li>
            <li>A paragraph with "Visible text"</li>
            <li>Another comment with text "Another comment"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<!-- This is a comment -->
<p>Visible text</p>
<!-- Another comment -->`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<!-- this is a comment --> <p>visible text</p> <!-- another comment -->`;
          return normalized === expected;
        }
      },

      'beginner-6': {
        title: 'Basic Div Elements',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Basic Div Elements</h4>
          <p><strong>Instructions:</strong> Create the following structure:</p>
          <ul>
            <li>A div containing an h2 with "Section 1"</li>
            <li>A div containing a paragraph with "Content for section 1"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<div>
  <h2>Section 1</h2>
</div>
<div>
  <p>Content for section 1</p>
</div>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<div> <h2>section 1</h2> </div> <div> <p>content for section 1</p> </div>`;
          return normalized === expected;
        }
      },

      'beginner-7': {
        title: 'Span Elements',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Span Elements</h4>
          <p><strong>Instructions:</strong> Create a paragraph with:</p>
          <ul>
            <li>Text "This is a paragraph with a "</li>
            <li>A span containing "highlighted word"</li>
            <li>Text " in the middle."</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<p>This is a paragraph with a <span>highlighted word</span> in the middle.</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>this is a paragraph with a <span>highlighted word</span> in the middle.</p>`;
          return normalized === expected;
        }
      },

      'beginner-8': {
        title: 'Preformatted Text',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Preformatted Text</h4>
          <p><strong>Instructions:</strong> Create a pre element with the following code:</p>
          <pre>function hello() {
    console.log("Hello World");
}</pre>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<pre>function hello() {
    console.log("Hello World");
}</pre>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<pre>function hello() { console.log("hello world"); }</pre>`;
          return normalized === expected;
        }
      },

      'beginner-9': {
        title: 'Blockquotes',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Blockquotes</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A blockquote with the text "The best way to learn HTML is by practicing."</li>
            <li>A paragraph with "- Anonymous"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<blockquote>The best way to learn HTML is by practicing.</blockquote>
<p>- Anonymous</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<blockquote>the best way to learn html is by practicing.</blockquote> <p>- anonymous</p>`;
          return normalized === expected;
        }
      },

      'beginner-10': {
        title: 'Address Element',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Address Element</h4>
          <p><strong>Instructions:</strong> Create an address element with:</p>
          <ul>
            <li>Text "Contact us at:"</li>
            <li>Line break</li>
            <li>Text "123 Web Street, HTML City"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<address>Contact us at:<br>123 Web Street, HTML City</address>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<address>contact us at:<br>123 web street, html city</address>`;
          return normalized === expected;
        }
      },

      // INTERMEDIATE TASKS (10 tasks - 20 EXP each)
      'intermediate-1': {
        title: 'Unordered Lists',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Unordered Lists</h4>
          <p><strong>Instructions:</strong> Create an unordered list with:</p>
          <ul>
            <li>List item "HTML"</li>
            <li>List item "CSS"</li>
            <li>List item "JavaScript"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<ul> <li>html</li> <li>css</li> <li>javascript</li> </ul>`;
          return normalized === expected;
        }
      },

      'intermediate-2': {
        title: 'Ordered Lists',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Ordered Lists</h4>
          <p><strong>Instructions:</strong> Create an ordered list with:</p>
          <ol>
            <li>List item "Learn HTML"</li>
            <li>List item "Learn CSS"</li>
            <li>List item "Learn JavaScript"</li>
          </ol>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<ol>
  <li>Learn HTML</li>
  <li>Learn CSS</li>
  <li>Learn JavaScript</li>
</ol>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<ol> <li>learn html</li> <li>learn css</li> <li>learn javascript</li> </ol>`;
          return normalized === expected;
        }
      },

      'intermediate-3': {
        title: 'Basic Links',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Basic Links</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A link to "https://www.google.com" with text "Google"</li>
            <li>A link to "https://www.github.com" with text "GitHub"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<a href="https://www.google.com">Google</a>
<a href="https://www.github.com">GitHub</a>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<a href="https://www.google.com">google</a> <a href="https://www.github.com">github</a>`;
          return normalized === expected;
        }
      },

      'intermediate-4': {
        title: 'Images',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Add Images</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>An image with src "image.jpg" and alt text "Sample Image"</li>
            <li>A paragraph with "This is a sample image"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<img src="image.jpg" alt="Sample Image">
<p>This is a sample image</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<img src="image.jpg" alt="sample image"> <p>this is a sample image</p>`;
          return normalized === expected;
        }
      },

      'intermediate-5': {
        title: 'Nested Lists',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Nested Lists</h4>
          <p><strong>Instructions:</strong> Create an unordered list with:</p>
          <ul>
            <li>"Frontend" with nested list containing "HTML" and "CSS"</li>
            <li>"Backend" with nested list containing "Node.js" and "Python"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<ul> <li>frontend <ul> <li>html</li> <li>css</li> </ul> </li> <li>backend <ul> <li>node.js</li> <li>python</li> </ul> </li> </ul>`;
          return normalized === expected;
        }
      },

      'intermediate-6': {
        title: 'Tables Basic',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Basic Table</h4>
          <p><strong>Instructions:</strong> Create a table with:</p>
          <ul>
            <li>Header row with "Name" and "Age"</li>
            <li>Data row with "John" and "25"</li>
            <li>Data row with "Jane" and "30"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>30</td>
  </tr>
</table>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<table> <tr> <th>name</th> <th>age</th> </tr> <tr> <td>john</td> <td>25</td> </tr> <tr> <td>jane</td> <td>30</td> </tr> </table>`;
          return normalized === expected;
        }
      },

      'intermediate-7': {
        title: 'Description Lists',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Description Lists</h4>
          <p><strong>Instructions:</strong> Create a description list with:</p>
          <ul>
            <li>Term "HTML" with description "HyperText Markup Language"</li>
            <li>Term "CSS" with description "Cascading Style Sheets"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<dl> <dt>html</dt> <dd>hypertext markup language</dd> <dt>css</dt> <dd>cascading style sheets</dd> </dl>`;
          return normalized === expected;
        }
      },

      'intermediate-8': {
        title: 'Abbreviations and Acronyms',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Abbreviations and Acronyms</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A paragraph with "I love <abbr title="HyperText Markup Language">HTML</abbr>"</li>
            <li>A paragraph with "And <abbr title="Cascading Style Sheets">CSS</abbr> too"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<p>I love <abbr title="HyperText Markup Language">HTML</abbr></p>
<p>And <abbr title="Cascading Style Sheets">CSS</abbr> too</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>i love <abbr title="hypertext markup language">html</abbr></p> <p>and <abbr title="cascading style sheets">css</abbr> too</p>`;
          return normalized === expected;
        }
      },

      'intermediate-9': {
        title: 'Code and Keyboard Elements',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Code and Keyboard Elements</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A paragraph with "Use <code>console.log()</code> to debug"</li>
            <li>A paragraph with "Press <kbd>Ctrl+S</kbd> to save"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<p>Use <code>console.log()</code> to debug</p>
<p>Press <kbd>Ctrl+S</kbd> to save</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>use <code>console.log()</code> to debug</p> <p>press <kbd>ctrl+s</kbd> to save</p>`;
          return normalized === expected;
        }
      },

      'intermediate-10': {
        title: 'Time and Date Elements',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Time and Date Elements</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A paragraph with "Published on <time datetime="2024-01-15">January 15, 2024</time>"</li>
            <li>A paragraph with "Updated <time datetime="2024-02-01">February 1, 2024</time>"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
<p>Updated <time datetime="2024-02-01">February 1, 2024</time></p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>published on <time datetime="2024-01-15">january 15, 2024</time></p> <p>updated <time datetime="2024-02-01">february 1, 2024</time></p>`;
          return normalized === expected;
        }
      },

      // ADVANCED TASKS (10 tasks - 30 EXP each)
      'advanced-1': {
        title: 'Contact Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Create a Contact Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Text input for "Name" with placeholder "Your full name"</li>
            <li>Email input for "Email" with placeholder "your@email.com"</li>
            <li>Textarea for "Message" with placeholder "Your message here..."</li>
            <li>Submit button with text "Send Message"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="text" placeholder="Your full name">
  <input type="email" placeholder="your@email.com">
  <textarea placeholder="Your message here..."></textarea>
  <button type="submit">Send Message</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="text" placeholder="your full name"> <input type="email" placeholder="your@email.com"> <textarea placeholder="your message here..."></textarea> <button type="submit">send message</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-2': {
        title: 'Registration Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Create Registration Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Text input for username with placeholder "Username"</li>
            <li>Password input with placeholder "Password"</li>
            <li>Date input for birth date</li>
            <li>Submit button with text "Register"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="text" placeholder="Username">
  <input type="password" placeholder="Password">
  <input type="date">
  <button type="submit">Register</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="text" placeholder="username"> <input type="password" placeholder="password"> <input type="date"> <button type="submit">register</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-3': {
        title: 'Survey Form with Radio Buttons',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Survey Form with Radio Buttons</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "How satisfied are you?"</li>
            <li>Radio button with value "very-satisfied" and label "Very Satisfied"</li>
            <li>Radio button with value "satisfied" and label "Satisfied"</li>
            <li>Radio button with value "neutral" and label "Neutral"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>How satisfied are you?</label>
  <input type="radio" name="satisfaction" value="very-satisfied">
  <label>Very Satisfied</label>
  <input type="radio" name="satisfaction" value="satisfied">
  <label>Satisfied</label>
  <input type="radio" name="satisfaction" value="neutral">
  <label>Neutral</label>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>how satisfied are you?</label> <input type="radio" name="satisfaction" value="very-satisfied"> <label>very satisfied</label> <input type="radio" name="satisfaction" value="satisfied"> <label>satisfied</label> <input type="radio" name="satisfaction" value="neutral"> <label>neutral</label> </form>`;
          return normalized === expected;
        }
      },

      'advanced-4': {
        title: 'Checkbox Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Checkbox Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Select your skills:"</li>
            <li>Checkbox with value "html" and label "HTML"</li>
            <li>Checkbox with value "css" and label "CSS"</li>
            <li>Checkbox with value "js" and label "JavaScript"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Select your skills:</label>
  <input type="checkbox" value="html">
  <label>HTML</label>
  <input type="checkbox" value="css">
  <label>CSS</label>
  <input type="checkbox" value="js">
  <label>JavaScript</label>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>select your skills:</label> <input type="checkbox" value="html"> <label>html</label> <input type="checkbox" value="css"> <label>css</label> <input type="checkbox" value="js"> <label>javascript</label> </form>`;
          return normalized === expected;
        }
      },

      'advanced-5': {
        title: 'Select Dropdown',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Select Dropdown</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Choose your country:"</li>
            <li>Select dropdown with options: "USA", "Canada", "UK", "Australia"</li>
            <li>Submit button with text "Submit"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Choose your country:</label>
  <select>
    <option>USA</option>
    <option>Canada</option>
    <option>UK</option>
    <option>Australia</option>
  </select>
  <button type="submit">Submit</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>choose your country:</label> <select> <option>usa</option> <option>canada</option> <option>uk</option> <option>australia</option> </select> <button type="submit">submit</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-6': {
        title: 'File Upload Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: File Upload Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Upload your resume:"</li>
            <li>File input that accepts ".pdf,.doc,.docx" files</li>
            <li>Submit button with text "Upload"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Upload your resume:</label>
  <input type="file" accept=".pdf,.doc,.docx">
  <button type="submit">Upload</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>upload your resume:</label> <input type="file" accept=".pdf,.doc,.docx"> <button type="submit">upload</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-7': {
        title: 'Form with Fieldset',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Form with Fieldset</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Fieldset with legend "Personal Information"</li>
            <li>Text input with placeholder "First Name"</li>
            <li>Text input with placeholder "Last Name"</li>
            <li>Email input with placeholder "Email"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <fieldset>
    <legend>Personal Information</legend>
    <input type="text" placeholder="First Name">
    <input type="text" placeholder="Last Name">
    <input type="email" placeholder="Email">
  </fieldset>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <fieldset> <legend>personal information</legend> <input type="text" placeholder="first name"> <input type="text" placeholder="last name"> <input type="email" placeholder="email"> </fieldset> </form>`;
          return normalized === expected;
        }
      },

      'advanced-8': {
        title: 'Number and Range Inputs',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Number and Range Inputs</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Age:"</li>
            <li>Number input with min="18" max="100"</li>
            <li>Label "Experience (years):"</li>
            <li>Range input with min="0" max="20"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Age:</label>
  <input type="number" min="18" max="100">
  <label>Experience (years):</label>
  <input type="range" min="0" max="20">
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>age:</label> <input type="number" min="18" max="100"> <label>experience (years):</label> <input type="range" min="0" max="20"> </form>`;
          return normalized === expected;
        }
      },

      'advanced-9': {
        title: 'Search and URL Inputs',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Search and URL Inputs</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Search input with placeholder "Search..."</li>
            <li>URL input with placeholder "https://example.com"</li>
            <li>Submit button with text "Go"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="search" placeholder="Search...">
  <input type="url" placeholder="https://example.com">
  <button type="submit">Go</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="search" placeholder="search..."> <input type="url" placeholder="https://example.com"> <button type="submit">go</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-10': {
        title: 'Complete Registration Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Complete Registration Form</h4>
          <p><strong>Instructions:</strong> Create a comprehensive form with:</p>
          <ul>
            <li>Text input for "Full Name"</li>
            <li>Email input for "Email"</li>
            <li>Password input for "Password"</li>
            <li>Select for "Country" with options: "USA", "Canada", "UK"</li>
            <li>Checkbox with label "I agree to terms"</li>
            <li>Submit button with text "Register"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="text" placeholder="Full Name">
  <input type="email" placeholder="Email">
  <input type="password" placeholder="Password">
  <select>
    <option>USA</option>
    <option>Canada</option>
    <option>UK</option>
  </select>
  <input type="checkbox">
  <label>I agree to terms</label>
  <button type="submit">Register</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="text" placeholder="full name"> <input type="email" placeholder="email"> <input type="password" placeholder="password"> <select> <option>usa</option> <option>canada</option> <option>uk</option> </select> <input type="checkbox"> <label>i agree to terms</label> <button type="submit">register</button> </form>`;
          return normalized === expected;
        }
      }
    };
    
    this.currentTask = null;
    this.init();
  }
  
  init() {
    this.loadGameState();
    this.setupEventListeners();
    this.generateTaskCards();
    this.updateUI();
    this.updateTheme();
  }
  
  // Generate task cards dynamically
  generateTaskCards() {
    const levels = ['beginner', 'intermediate', 'advanced'];
    
    levels.forEach(level => {
      const container = document.getElementById(`${level}Tasks`);
      if (!container) return;
      
      const levelTasks = Object.entries(this.tasks).filter(([taskId, task]) => 
        task.level === level
      );
      
      levelTasks.forEach(([taskId, task]) => {
        const taskCard = this.createTaskCard(taskId, task);
        container.appendChild(taskCard);
      });
    });
  }
  
  createTaskCard(taskId, task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.taskId = taskId;
    
    const icons = {
      'beginner': '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
      'intermediate': '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>',
      'advanced': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline>'
    };
    
    taskCard.innerHTML = `
      <div class="task-glow"></div>
      <div class="task-header">
        <div class="task-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${icons[task.level]}
          </svg>
        </div>
        <div class="task-info">
          <h3 class="task-title">${task.title}</h3>
          <p class="task-description">${this.getTaskDescription(taskId)}</p>
        </div>
        <div class="task-exp">
          <span class="exp-value">+${task.exp}</span>
          <span class="exp-unit">EXP</span>
        </div>
      </div>
      <div class="task-footer">
        <button class="btn btn-primary task-start-btn">
          <span>Start Task</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        <div class="task-status">
          <svg class="icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    `;
    
    return taskCard;
  }
  
  getTaskDescription(taskId) {
    const descriptions = {
      'beginner-1': 'Create your first HTML document with headings and paragraphs',
      'beginner-2': 'Learn to structure content with different heading levels',
      'beginner-3': 'Apply text formatting with strong, em, and mark elements',
      'beginner-4': 'Use line breaks and horizontal rules for content separation',
      'beginner-5': 'Add comments to document your HTML code',
      'beginner-6': 'Organize content using div container elements',
      'beginner-7': 'Apply inline styling with span elements',
      'beginner-8': 'Display preformatted text and code snippets',
      'beginner-9': 'Create quotations using blockquote elements',
      'beginner-10': 'Add contact information with address elements',
      'intermediate-1': 'Create bullet point lists with unordered lists',
      'intermediate-2': 'Create numbered lists with ordered lists',
      'intermediate-3': 'Add navigation with hyperlinks',
      'intermediate-4': 'Embed images with proper alt text',
      'intermediate-5': 'Create complex nested list structures',
      'intermediate-6': 'Display tabular data with table elements',
      'intermediate-7': 'Define terms and descriptions with definition lists',
      'intermediate-8': 'Add abbreviations with explanatory tooltips',
      'intermediate-9': 'Display code snippets and keyboard shortcuts',
      'intermediate-10': 'Add semantic time and date information',
      'advanced-1': 'Build a complete contact form with validation',
      'advanced-2': 'Create user registration with secure inputs',
      'advanced-3': 'Design surveys with radio button selections',
      'advanced-4': 'Allow multiple selections with checkboxes',
      'advanced-5': 'Provide options with dropdown menus',
      'advanced-6': 'Enable file uploads with input restrictions',
      'advanced-7': 'Group form elements with fieldsets',
      'advanced-8': 'Collect numeric data with specialized inputs',
      'advanced-9': 'Create search and URL input fields',
      'advanced-10': 'Build a comprehensive registration system'
    };
    
    return descriptions[taskId] || 'Complete this HTML task to earn EXP';
  }
  
  // Local Storage Management
  saveGameState() {
    const stateToSave = {
      ...this.gameState,
      completedTasks: Array.from(this.gameState.completedTasks),
      unlockedSolutions: Array.from(this.gameState.unlockedSolutions),
      failedAttempts: this.gameState.failedAttempts,
      editorContent: this.gameState.editorContent
    };
    localStorage.setItem('htmlLearningGame', JSON.stringify(stateToSave));
  }
  
  loadGameState() {
    const saved = localStorage.getItem('htmlLearningGame');
    if (saved) {
      const parsedState = JSON.parse(saved);
      this.gameState = {
        ...parsedState,
        completedTasks: new Set(parsedState.completedTasks || []),
        unlockedSolutions: new Set(parsedState.unlockedSolutions || []),
        failedAttempts: parsedState.failedAttempts || {},
        editorContent: parsedState.editorContent || {}
      };
    }
  }
  
  // Event Listeners
  setupEventListeners() {
    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Task start buttons (delegated event listener)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.task-start-btn')) {
        const taskCard = e.target.closest('.task-card');
        const taskId = taskCard.dataset.taskId;
        if (!this.gameState.completedTasks.has(taskId)) {
          this.openTaskModal(taskId);
        }
      }
    });
    
    // Modal close
    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeTaskModal();
    });
    
    // Modal overlay click
    document.getElementById('taskModal').addEventListener('click', (e) => {
      if (e.target.id === 'taskModal') {
        this.closeTaskModal();
      }
    });
    
    // Code editor
    document.getElementById('codeEditor').addEventListener('input', (e) => {
      if (this.currentTask) {
        this.gameState.editorContent[this.currentTask] = e.target.value;
        this.saveGameState();
        this.updateLivePreview();
      }
    });
    
    // Validation and submission
    const validateCodeBtn = document.getElementById('validateCode');
    if (validateCodeBtn) {
        validateCodeBtn.addEventListener('click', () => {
            this.validateCode();
        });
    }

    const submitCodeBtn = document.getElementById('submitCode');
    if (submitCodeBtn) {
        submitCodeBtn.addEventListener('click', () => {
            this.submitTask();
        });
    }

    const showSolutionBtn = document.getElementById('showSolution');
    if (showSolutionBtn) {
        showSolutionBtn.addEventListener('click', () => {
            this.showSolution();
        });
    }
    
    // Certificate download
    document.getElementById('downloadCertificate').addEventListener('click', () => {
      this.downloadCertificate();
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeTaskModal();
      }
    });
  }
  
  // Theme Management
  toggleTheme() {
    this.gameState.theme = this.gameState.theme === 'light' ? 'dark' : 'light';
    this.updateTheme();
    this.saveGameState();
  }
  
  updateTheme() {
    document.documentElement.setAttribute('data-theme', this.gameState.theme);
  }
  
  // UI Updates
  updateUI() {
    this.updateExpCounter();
    this.updateProgressBars();
    this.updateTaskCards();
    this.updateCertificateSection();
  }
  
  updateExpCounter() {
    document.getElementById('expCount').textContent = this.gameState.exp;
  }
  
  updateProgressBars() {
    const levels = ['beginner', 'intermediate', 'advanced'];
    
    levels.forEach(level => {
      const levelTasks = Object.keys(this.tasks).filter(taskId => 
        this.tasks[taskId].level === level
      );
      const completedCount = levelTasks.filter(taskId => 
        this.gameState.completedTasks.has(taskId)
      ).length;
      const totalCount = levelTasks.length;
      const percentage = (completedCount / totalCount) * 100;
      
      const progressText = document.getElementById(`${level}Progress`);
      const progressBar = document.getElementById(`${level}ProgressBar`);
      
      if (progressText) {
        progressText.textContent = `${completedCount}/${totalCount} Completed`;
      }
      if (progressBar) {
        progressBar.style.width = `${percentage}%`;
      }
      
      // Update progress percentage display
      const progressPercentageElement = progressText?.parentElement?.querySelector('.progress-percentage');
      if (progressPercentageElement) {
        progressPercentageElement.textContent = `${Math.round(percentage)}%`;
      }
    });
  }
  
  updateTaskCards() {
    Object.keys(this.tasks).forEach(taskId => {
      const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskCard) {
        const isCompleted = this.gameState.completedTasks.has(taskId);
        const startBtn = taskCard.querySelector('.task-start-btn span');
        
        if (isCompleted) {
          taskCard.classList.add('completed');
          if (startBtn) startBtn.textContent = 'Completed';
        } else {
          taskCard.classList.remove('completed');
          if (startBtn) startBtn.textContent = 'Start Task';
        }
      }
    });
  }
  
  updateCertificateSection() {
    const totalTasks = Object.keys(this.tasks).length;
    const completedCount = this.gameState.completedTasks.size;
    const isUnlocked = completedCount === totalTasks;
    
    const certificateStatus = document.getElementById('certificateStatus');
    const certificateOverlay = document.getElementById('certificateOverlay');
    const certificateActions = document.getElementById('certificateActions');
    
    if (isUnlocked) {
      certificateStatus.innerHTML = `
        <svg class="icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        All Tasks Completed!
      `;
      certificateOverlay.classList.add('hidden');
      certificateActions.classList.add('enabled');
    } else {
      certificateStatus.innerHTML = `
        <svg class="icon lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <circle cx="12" cy="16" r="1"></circle>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>${completedCount}/${totalTasks} Tasks Completed</span>
      `;
      certificateOverlay.classList.remove('hidden');
      certificateActions.classList.remove('enabled');
    }
  }
  
  // Task Modal Management
  openTaskModal(taskId) {
    this.currentTask = taskId;
    const task = this.tasks[taskId];
    
    // Update modal content
    document.getElementById('modalTitle').textContent = task.title;
    document.getElementById('taskInstructions').innerHTML = task.instructions;
    
    // Load saved editor content or set default
    const savedContent = this.gameState.editorContent[taskId] || '';
    document.getElementById('codeEditor').value = savedContent;
    
    // Reset validation state
    this.resetValidationState();
    
    // Update solution button state
    this.updateSolutionButton();
    
    // Show modal
    document.getElementById('taskModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update live preview
    this.updateLivePreview();
  }
  
  closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    document.body.style.overflow = '';
    this.currentTask = null;
  }
  
  resetValidationState() {
    const submitBtn = document.getElementById('submitCode');
    const feedback = document.getElementById('validationFeedback');
    
    if (submitBtn) submitBtn.disabled = true;
    if (feedback) feedback.style.display = 'none';
    if (feedback) feedback.className = 'validation-feedback';
  }
  
  updateSolutionButton() {
    const showSolutionBtn = document.getElementById('showSolution');
    if (!showSolutionBtn) return;

    const taskId = this.currentTask;
    const failedAttempts = this.gameState.failedAttempts[taskId] || 0;
    const isUnlocked = this.gameState.unlockedSolutions.has(taskId);
    
    if (isUnlocked) {
      showSolutionBtn.disabled = false;
      showSolutionBtn.textContent = 'Show Solution';
    } else if (failedAttempts >= 2) {
      showSolutionBtn.disabled = false;
      showSolutionBtn.textContent = 'Show Solution (-5 EXP)';
    } else {
      showSolutionBtn.disabled = true;
      showSolutionBtn.textContent = `Show Solution (${2 - failedAttempts} attempts left)`;
    }
  }
  
  // Code Validation and Submission
  validateCode() {
    if (!this.currentTask) {
      console.warn('No task is currently selected.');
      return;
    }

    const code = document.getElementById('codeEditor').value.trim();
    const task = this.tasks[this.currentTask];
    const feedback = document.getElementById('validationFeedback');
    const submitBtn = document.getElementById('submitCode');
    
    if (!code) {
      this.showValidationFeedback('Please write some HTML code first.', 'error');
      return;
    }
    
    const isValid = task.validate(code);
    
    if (isValid) {
      this.showValidationFeedback('Perfect! Your HTML code is correct. Click Submit to earn EXP!', 'success');
      if (submitBtn) submitBtn.disabled = false;
    } else {
      // Track failed attempts
      const taskId = this.currentTask;
      this.gameState.failedAttempts[taskId] = (this.gameState.failedAttempts[taskId] || 0) + 1;
      this.saveGameState();
      
      this.showValidationFeedback('Your HTML doesn\'t match the expected output. Check the instructions and try again.', 'error');
      if (submitBtn) submitBtn.disabled = true;
      
      // Update solution button
      this.updateSolutionButton();
    }
  }
  
  showValidationFeedback(message, type) {
    const feedback = document.getElementById('validationFeedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.className = `validation-feedback ${type}`;
      feedback.style.display = 'block';
    }
  }
  
  submitTask() {
    const taskId = this.currentTask;
    const task = this.tasks[taskId];
    
    // Add to completed tasks
    this.gameState.completedTasks.add(taskId);
    
    // Award EXP
    this.gameState.exp += task.exp;
    
    // Clear editor content for this task
    delete this.gameState.editorContent[taskId];
    
    // Save state
    this.saveGameState();
    
    // Update UI
    this.updateUI();
    
    // Show the answer after successful completion
    this.showTaskAnswer();
  }
  
  // Show the answer after task completion
  showTaskAnswer() {
    const task = this.tasks[this.currentTask];
    
    // Update the instructions to show the answer
    const instructionsDiv = document.getElementById('taskInstructions');
    if (instructionsDiv) {
      instructionsDiv.innerHTML = `
        <h4>🎉 Task Completed Successfully!</h4>
        <p><strong>Congratulations!</strong> You earned ${task.exp} EXP!</p>
        <p><strong>Here's the correct answer:</strong></p>
        <pre><code>${task.solution.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <p><strong>Great job!</strong> You can now move on to the next task.</p>
      `;
    }
    
    // Disable all buttons since task is completed
    document.getElementById('validateCode').disabled = true;
    document.getElementById('submitCode').disabled = true;
    document.getElementById('showSolution').disabled = true;
    
    // Show completion message in feedback
    this.showValidationFeedback(`Congratulations! You earned ${task.exp} EXP!`, 'success');
    
    // Close modal after delay
    setTimeout(() => {
      this.closeTaskModal();
    }, 3000);
  }
  
  showSolution() {
    const taskId = this.currentTask;
    const task = this.tasks[taskId];
    const isAlreadyUnlocked = this.gameState.unlockedSolutions.has(taskId);
    
    if (!isAlreadyUnlocked) {
      // Deduct EXP
      this.gameState.exp = Math.max(0, this.gameState.exp - 5);
      this.gameState.unlockedSolutions.add(taskId);
      this.updateExpCounter();
    }
    
    // Show solution in editor
    document.getElementById('codeEditor').value = task.solution;
    this.gameState.editorContent[taskId] = task.solution;
    this.saveGameState();
    
    // Update live preview
    this.updateLivePreview();
    
    // Update button
    this.updateSolutionButton();
    
    // Show feedback
    if (!isAlreadyUnlocked) {
      this.showValidationFeedback('Solution revealed! 5 EXP deducted. Study the code and try to understand it.', 'error');
    } else {
      this.showValidationFeedback('Here\'s the solution again. Study it carefully!', 'success');
    }
  }
  
  updateLivePreview() {
    const code = document.getElementById('codeEditor').value;
    const preview = document.getElementById('livePreview');
    
    const previewContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3 { color: #e34c26; }
          a { color: #f16529; text-decoration: none; }
          a:hover { text-decoration: underline; }
          ul { padding-left: 20px; }
          form { max-width: 400px; }
          input, textarea, button, select {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
          }
          button {
            background: #e34c26;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: bold;
          }
          button:hover { background: #d63916; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${code}
      </body>
      </html>
    `;
    
    preview.srcdoc = previewContent;
  }
  
  // Certificate Generation
  async downloadCertificate() {
    const userName = document.getElementById('userName').value.trim();
    
    if (!userName) {
      alert('Please enter your name to generate the certificate.');
      return;
    }
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        try {
          // Set canvas size to match your certificate image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw the certificate background image
          ctx.drawImage(img, 0, 0);
          
          // Calculate positions based on your certificate layout
          const centerX = canvas.width / 2;
          
          // USER NAME POSITIONING
          ctx.fillStyle = '#2d3748';
          ctx.font = 'bold 48px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          const nameY = canvas.height * 0.45;
          ctx.fillText(userName, centerX, nameY);
          
          // CURRENT DATE POSITIONING
          ctx.fillStyle = '#4a5568';
          ctx.font = '28px Arial, sans-serif';
          
          const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          const dateY = canvas.height * 0.85;
          ctx.fillText(currentDate, centerX, dateY);
          
          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `HTML_Certificate_${userName.replace(/\s+/g, '_')}.png`;
              
              document.body.appendChild(a);
              a.click();
              
              setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }, 100);
              
              alert('🎉 Certificate downloaded successfully!');
            } else {
              throw new Error('Failed to create certificate blob');
            }
          }, 'image/png', 1.0);
          
        } catch (error) {
          console.error('Error processing certificate:', error);
          alert('Error generating certificate. Please try again.');
        }
      };
      
      img.onerror = () => {
        console.error('Could not load certificate image (4.png)');
        alert('Certificate template not found. Please ensure 4.png is in the same directory.');
      };
      
      img.crossOrigin = 'anonymous';
      img.src = '4.png';
      
    } catch (error) {
      console.error('Error in downloadCertificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HTMLLearningGame();
});

