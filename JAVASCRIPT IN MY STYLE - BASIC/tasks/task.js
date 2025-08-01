
// API Base URL - Update this to match your FastAPI endpoint
const API_BASE = "https://tech-trail-w2ap.onrender.com"; // your FastAPI endpoint

// Game State Management
class JSLearningGame {
  constructor() {
    this.gameState = {
      exp: 0,
      completedTasks: new Set(),
      unlockedSolutions: new Set(),
      failedAttempts: {},
      theme: 'light',
      editorContent: {},
      htmlContent: {},
      cssContent: {}
    };

    this.currentEditorMode = 'js'; // 'html', 'css', or 'js'

    this.tasks = {
      // BEGINNER TASKS (30 tasks - 10 EXP each)
      'beginner-1': {
        title: 'Variables and Console',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Variables and Console</h4>
          <p><strong>Instructions:</strong> Create JavaScript variables and log them:</p>
          <ul>
            <li>Create a variable named <code>name</code> with your name as a string</li>
            <li>Create a variable named <code>age</code> with a number</li>
            <li>Use <code>console.log()</code> to display both variables</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>JavaScript Output:</h3>
  <p>Check the browser console (F12) to see your output!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let name = "John Doe";
let age = 25;

console.log("Name:", name);
console.log("Age:", age);`,
        validate: (code) => {
          const hasNameVariable = /let\s+name\s*=|var\s+name\s*=|const\s+name\s*=/i.test(code);
          const hasAgeVariable = /let\s+age\s*=|var\s+age\s*=|const\s+age\s*=/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasNameVariable && hasAgeVariable && hasConsoleLog;
        }
      },

      'beginner-2': {
        title: 'Basic Math Operations',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Basic Math Operations</h4>
          <p><strong>Instructions:</strong> Perform basic math operations:</p>
          <ul>
            <li>Create two variables <code>num1</code> and <code>num2</code> with numbers</li>
            <li>Calculate and log their sum, difference, product, and quotient</li>
            <li>Use <code>console.log()</code> to display each result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Math Operations:</h3>
  <p>Check the console to see your calculations!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e8f4fd;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let num1 = 10;
let num2 = 5;

console.log("Sum:", num1 + num2);
console.log("Difference:", num1 - num2);
console.log("Product:", num1 * num2);
console.log("Quotient:", num1 / num2);`,
        validate: (code) => {
          const hasNum1 = /let\s+num1\s*=|var\s+num1\s*=|const\s+num1\s*=/i.test(code);
          const hasNum2 = /let\s+num2\s*=|var\s+num2\s*=|const\s+num2\s*=/i.test(code);
          const hasAddition = /\+/.test(code);
          const hasSubtraction = /-/.test(code);
          const hasMultiplication = /\*/.test(code);
          const hasDivision = /\//.test(code);
          return hasNum1 && hasNum2 && hasAddition && hasSubtraction && hasMultiplication && hasDivision;
        }
      },

      'beginner-3': {
        title: 'String Manipulation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: String Manipulation</h4>
          <p><strong>Instructions:</strong> Work with strings:</p>
          <ul>
            <li>Create a string variable <code>message</code> with "Hello World"</li>
            <li>Use <code>toUpperCase()</code> and <code>toLowerCase()</code> methods</li>
            <li>Use <code>length</code> property to get string length</li>
            <li>Log all results to console</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>String Methods:</h3>
  <p>Open console to see string manipulations!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f0f8e8;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let message = "Hello World";

console.log("Original:", message);
console.log("Uppercase:", message.toUpperCase());
console.log("Lowercase:", message.toLowerCase());
console.log("Length:", message.length);`,
        validate: (code) => {
          const hasMessage = /let\s+message\s*=|var\s+message\s*=|const\s+message\s*=/i.test(code);
          const hasToUpperCase = /\.toUpperCase\(\)/i.test(code);
          const hasToLowerCase = /\.toLowerCase\(\)/i.test(code);
          const hasLength = /\.length/i.test(code);
          return hasMessage && hasToUpperCase && hasToLowerCase && hasLength;
        }
      },

      'beginner-4': {
        title: 'Arrays Basics',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Arrays Basics</h4>
          <p><strong>Instructions:</strong> Create and manipulate arrays:</p>
          <ul>
            <li>Create an array called <code>fruits</code> with 3 fruit names</li>
            <li>Add a new fruit using <code>push()</code></li>
            <li>Remove the first fruit using <code>shift()</code></li>
            <li>Log the array and its length</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Array Operations:</h3>
  <p>Check console for array manipulations!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #fff2e8;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let fruits = ["apple", "banana", "orange"];

console.log("Original array:", fruits);
fruits.push("grape");
console.log("After push:", fruits);
fruits.shift();
console.log("After shift:", fruits);
console.log("Array length:", fruits.length);`,
        validate: (code) => {
          const hasFruitsArray = /let\s+fruits\s*=|var\s+fruits\s*=|const\s+fruits\s*=/i.test(code);
          const hasPush = /\.push\(/i.test(code);
          const hasShift = /\.shift\(/i.test(code);
          const hasLength = /\.length/i.test(code);
          return hasFruitsArray && hasPush && hasShift && hasLength;
        }
      },

      'beginner-5': {
        title: 'If-Else Statements',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: If-Else Statements</h4>
          <p><strong>Instructions:</strong> Use conditional statements:</p>
          <ul>
            <li>Create a variable <code>score</code> with a number</li>
            <li>Use if-else to check if score is >= 90 (A grade)</li>
            <li>Use else if for >= 80 (B grade) and >= 70 (C grade)</li>
            <li>Use else for F grade and log the result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Grade Calculator:</h3>
  <p>Console will show the grade based on score!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f8e8ff;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}`,
        validate: (code) => {
          const hasScore = /let\s+score\s*=|var\s+score\s*=|const\s+score\s*=/i.test(code);
          const hasIf = /if\s*\(/i.test(code);
          const hasElseIf = /else\s+if/i.test(code);
          const hasElse = /else\s*\{/i.test(code);
          return hasScore && hasIf && hasElseIf && hasElse;
        }
      },

      'beginner-6': {
        title: 'For Loops',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: For Loops</h4>
          <p><strong>Instructions:</strong> Create loops:</p>
          <ul>
            <li>Use a for loop to count from 1 to 5</li>
            <li>Log each number with "Count: " prefix</li>
            <li>Create another loop to iterate through an array</li>
            <li>Log each array element</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Loop Examples:</h3>
  <p>Check console for loop outputs!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e8f8f5;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `for (let i = 1; i <= 5; i++) {
    console.log("Count:", i);
}

let colors = ["red", "blue", "green"];
for (let i = 0; i < colors.length; i++) {
    console.log("Color:", colors[i]);
}`,
        validate: (code) => {
          const hasForLoop = /for\s*\(/i.test(code);
          const hasIncrement = /\+\+/i.test(code);
          const hasArrayLoop = /\.length/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasForLoop && hasIncrement && hasArrayLoop && hasConsoleLog;
        }
      },

      'beginner-7': {
        title: 'Functions',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Functions</h4>
          <p><strong>Instructions:</strong> Create and use functions:</p>
          <ul>
            <li>Create a function called <code>greet</code> that takes a name parameter</li>
            <li>Function should return "Hello, [name]!"</li>
            <li>Call the function with your name</li>
            <li>Log the result to console</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Function Example:</h3>
  <p>Console will show function output!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #ffeaa7;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `function greet(name) {
    return "Hello, " + name + "!";
}

let result = greet("John");
console.log(result);`,
        validate: (code) => {
          const hasFunction = /function\s+greet/i.test(code);
          const hasParameter = /greet\s*\(\s*\w+\s*\)/i.test(code);
          const hasReturn = /return/i.test(code);
          const hasFunctionCall = /greet\s*\(/i.test(code);
          return hasFunction && hasParameter && hasReturn && hasFunctionCall;
        }
      },

      'beginner-8': {
        title: 'Objects',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Objects</h4>
          <p><strong>Instructions:</strong> Create and use objects:</p>
          <ul>
            <li>Create an object called <code>person</code> with name, age, and city properties</li>
            <li>Access and log each property using dot notation</li>
            <li>Add a new property <code>hobby</code> to the object</li>
            <li>Log the entire object</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Object Example:</h3>
  <p>Console will show object properties!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #fd79a8;
  color: white;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

console.log("Name:", person.name);
console.log("Age:", person.age);
console.log("City:", person.city);

person.hobby = "reading";
console.log("Full object:", person);`,
        validate: (code) => {
          const hasPersonObject = /let\s+person\s*=|var\s+person\s*=|const\s+person\s*=/i.test(code);
          const hasDotNotation = /person\./i.test(code);
          const hasNewProperty = /person\.\w+\s*=/i.test(code);
          const hasObjectBraces = /\{[\s\S]*\}/i.test(code);
          return hasPersonObject && hasDotNotation && hasNewProperty && hasObjectBraces;
        }
      },

      'beginner-9': {
        title: 'DOM Selection',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: DOM Selection</h4>
          <p><strong>Instructions:</strong> Select and modify DOM elements:</p>
          <ul>
            <li>Use <code>document.getElementById()</code> to select the element with id "demo"</li>
            <li>Change its text content to "Hello from JavaScript!"</li>
            <li>Change its background color to lightblue</li>
            <li>Log a message to console when done</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>DOM Manipulation:</h3>
  <div id="demo">This text will be changed by JavaScript</div>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
  margin: 20px 0;
}

#demo {
  padding: 10px;
  border: 2px solid #333;
  margin: 10px 0;
}`,
        solution: `let element = document.getElementById("demo");
element.textContent = "Hello from JavaScript!";
element.style.backgroundColor = "lightblue";
console.log("DOM element updated!");`,
        validate: (code) => {
          const hasGetElementById = /document\.getElementById/i.test(code);
          const hasTextContent = /\.textContent|\.innerHTML/i.test(code);
          const hasBackgroundColor = /\.backgroundColor|background-color/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasGetElementById && hasTextContent && hasBackgroundColor && hasConsoleLog;
        }
      },

      'beginner-10': {
        title: 'Event Handling',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Event Handling</h4>
          <p><strong>Instructions:</strong> Add event listeners:</p>
          <ul>
            <li>Select the button with id "myButton"</li>
            <li>Add a click event listener to it</li>
            <li>When clicked, change the text of the element with id "message"</li>
            <li>Log "Button clicked!" to console</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Event Handling:</h3>
  <button id="myButton">Click Me!</button>
  <p id="message">Click the button to change this text</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #dff0d8;
  border-radius: 8px;
  margin: 20px 0;
}

#myButton {
  padding: 10px 20px;
  background: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#message {
  margin-top: 10px;
  font-weight: bold;
}`,
        solution: `let button = document.getElementById("myButton");
let message = document.getElementById("message");

button.addEventListener("click", function() {
    message.textContent = "Button was clicked!";
    console.log("Button clicked!");
});`,
        validate: (code) => {
          const hasGetElementById = /document\.getElementById/i.test(code);
          const hasAddEventListener = /\.addEventListener/i.test(code);
          const hasClickEvent = /"click"/i.test(code);
          const hasFunction = /function\s*\(|=>\s*\{/i.test(code);
          return hasGetElementById && hasAddEventListener && hasClickEvent && hasFunction;
        }
      },

      // Continue with more beginner tasks...
      'beginner-11': {
        title: 'While Loops',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: While Loops</h4>
          <p><strong>Instructions:</strong> Use while loops:</p>
          <ul>
            <li>Create a variable <code>count</code> starting at 0</li>
            <li>Use a while loop to increment count until it reaches 3</li>
            <li>Log each count value</li>
            <li>Log "Loop finished!" when done</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>While Loop:</h3>
  <p>Check console for while loop output!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e1f5fe;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let count = 0;

while (count < 3) {
    console.log("Count:", count);
    count++;
}

console.log("Loop finished!");`,
        validate: (code) => {
          const hasWhile = /while\s*\(/i.test(code);
          const hasCount = /let\s+count|var\s+count|const\s+count/i.test(code);
          const hasIncrement = /count\+\+|\+\+count|count\s*\+=\s*1/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasWhile && hasCount && hasIncrement && hasConsoleLog;
        }
      },

      'beginner-12': {
        title: 'Switch Statements',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Switch Statements</h4>
          <p><strong>Instructions:</strong> Use switch statements:</p>
          <ul>
            <li>Create a variable <code>day</code> with a number (1-7)</li>
            <li>Use switch to convert number to day name</li>
            <li>Include cases for Monday (1) through Sunday (7)</li>
            <li>Add a default case and log the result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Switch Statement:</h3>
  <p>Console will show the day name!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f3e5f5;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log("Day:", dayName);`,
        validate: (code) => {
          const hasSwitch = /switch\s*\(/i.test(code);
          const hasCase = /case\s+\d+:/i.test(code);
          const hasBreak = /break;/i.test(code);
          const hasDefault = /default:/i.test(code);
          return hasSwitch && hasCase && hasBreak && hasDefault;
        }
      },

      'beginner-13': {
        title: 'Array Methods',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Array Methods</h4>
          <p><strong>Instructions:</strong> Use array methods:</p>
          <ul>
            <li>Create an array of numbers: [1, 2, 3, 4, 5]</li>
            <li>Use <code>forEach()</code> to log each number</li>
            <li>Use <code>map()</code> to create a new array with doubled values</li>
            <li>Log both original and new arrays</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Array Methods:</h3>
  <p>Console shows forEach and map results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #fff3cd;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let numbers = [1, 2, 3, 4, 5];

console.log("Original array:", numbers);

numbers.forEach(function(num) {
    console.log("Number:", num);
});

let doubled = numbers.map(function(num) {
    return num * 2;
});

console.log("Doubled array:", doubled);`,
        validate: (code) => {
          const hasNumbers = /numbers\s*=\s*\[/i.test(code);
          const hasForEach = /\.forEach/i.test(code);
          const hasMap = /\.map/i.test(code);
          const hasFunction = /function\s*\(/i.test(code);
          return hasNumbers && hasForEach && hasMap && hasFunction;
        }
      },

      'beginner-14': {
        title: 'String Methods',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: String Methods</h4>
          <p><strong>Instructions:</strong> Use string methods:</p>
          <ul>
            <li>Create a string "JavaScript is awesome"</li>
            <li>Use <code>split()</code> to split into words</li>
            <li>Use <code>join()</code> to join with dashes</li>
            <li>Use <code>includes()</code> to check if it contains "Script"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>String Methods:</h3>
  <p>Console shows string method results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #d1ecf1;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let text = "JavaScript is awesome";

console.log("Original:", text);

let words = text.split(" ");
console.log("Split into words:", words);

let joined = words.join("-");
console.log("Joined with dashes:", joined);

let hasScript = text.includes("Script");
console.log("Contains 'Script':", hasScript);`,
        validate: (code) => {
          const hasText = /text\s*=.*JavaScript/i.test(code);
          const hasSplit = /\.split\(/i.test(code);
          const hasJoin = /\.join\(/i.test(code);
          const hasIncludes = /\.includes\(/i.test(code);
          return hasText && hasSplit && hasJoin && hasIncludes;
        }
      },

      'beginner-15': {
        title: 'Math Object',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Math Object</h4>
          <p><strong>Instructions:</strong> Use Math object methods:</p>
          <ul>
            <li>Generate a random number between 1 and 10 using <code>Math.random()</code></li>
            <li>Round it using <code>Math.round()</code></li>
            <li>Find the maximum of 15, 8, 23 using <code>Math.max()</code></li>
            <li>Log all results</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Math Object:</h3>
  <p>Console shows Math method results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f8d7da;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let randomNum = Math.random() * 10 + 1;
console.log("Random number:", randomNum);

let rounded = Math.round(randomNum);
console.log("Rounded:", rounded);

let maximum = Math.max(15, 8, 23);
console.log("Maximum:", maximum);`,
        validate: (code) => {
          const hasMathRandom = /Math\.random\(\)/i.test(code);
          const hasMathRound = /Math\.round\(/i.test(code);
          const hasMathMax = /Math\.max\(/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasMathRandom && hasMathRound && hasMathMax && hasConsoleLog;
        }
      },

      // Continue with remaining tasks...
      'beginner-16': {
        title: 'Date Object',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Date Object</h4>
          <p><strong>Instructions:</strong> Work with Date object:</p>
          <ul>
            <li>Create a new Date object</li>
            <li>Get the current year using <code>getFullYear()</code></li>
            <li>Get the current month using <code>getMonth()</code></li>
            <li>Log the full date and individual components</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Date Object:</h3>
  <p>Console shows current date information!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e2e3e5;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let now = new Date();

console.log("Full date:", now);
console.log("Year:", now.getFullYear());
console.log("Month:", now.getMonth() + 1); // +1 because months are 0-indexed
console.log("Day:", now.getDate());`,
        validate: (code) => {
          const hasNewDate = /new Date\(\)/i.test(code);
          const hasGetFullYear = /\.getFullYear\(\)/i.test(code);
          const hasGetMonth = /\.getMonth\(\)/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasNewDate && hasGetFullYear && hasGetMonth && hasConsoleLog;
        }
      },

      'beginner-17': {
        title: 'Template Literals',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Template Literals</h4>
          <p><strong>Instructions:</strong> Use template literals:</p>
          <ul>
            <li>Create variables for name and age</li>
            <li>Use template literals (backticks) to create a message</li>
            <li>Include both variables in the template</li>
            <li>Log the formatted message</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Template Literals:</h3>
  <p>Console shows formatted message!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #d4edda;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let name = "Sarah";
let age = 28;

let message = \`Hello, my name is \${name} and I am \${age} years old.\`;

console.log(message);`,
        validate: (code) => {
          const hasBackticks = /`.*`/i.test(code);
          const hasInterpolation = /\$\{.*\}/i.test(code);
          const hasName = /name\s*=/i.test(code);
          const hasAge = /age\s*=/i.test(code);
          return hasBackticks && hasInterpolation && hasName && hasAge;
        }
      },

      'beginner-18': {
        title: 'Arrow Functions',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Arrow Functions</h4>
          <p><strong>Instructions:</strong> Create arrow functions:</p>
          <ul>
            <li>Create an arrow function called <code>add</code> that takes two parameters</li>
            <li>Return the sum of the parameters</li>
            <li>Create another arrow function to square a number</li>
            <li>Test both functions and log results</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Arrow Functions:</h3>
  <p>Console shows arrow function results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #fff2cc;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `const add = (a, b) => {
    return a + b;
};

const square = (num) => num * num;

console.log("5 + 3 =", add(5, 3));
console.log("4 squared =", square(4));`,
        validate: (code) => {
          const hasArrowFunction = /=>\s*\{|=>\s*\w/i.test(code);
          const hasAdd = /add\s*=/i.test(code);
          const hasSquare = /square\s*=/i.test(code);
          const hasFunctionCall = /add\s*\(|square\s*\(/i.test(code);
          return hasArrowFunction && hasAdd && hasSquare && hasFunctionCall;
        }
      },

      'beginner-19': {
        title: 'Local Storage',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Local Storage</h4>
          <p><strong>Instructions:</strong> Use localStorage:</p>
          <ul>
            <li>Store a value in localStorage with key "username"</li>
            <li>Retrieve the value from localStorage</li>
            <li>Log the retrieved value</li>
            <li>Remove the item from localStorage</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Local Storage:</h3>
  <p>Console shows localStorage operations!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e7f3ff;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `// Store data
localStorage.setItem("username", "JohnDoe");
console.log("Stored username in localStorage");

// Retrieve data
let storedUsername = localStorage.getItem("username");
console.log("Retrieved username:", storedUsername);

// Remove data
localStorage.removeItem("username");
console.log("Removed username from localStorage");`,
        validate: (code) => {
          const hasSetItem = /localStorage\.setItem/i.test(code);
          const hasGetItem = /localStorage\.getItem/i.test(code);
          const hasRemoveItem = /localStorage\.removeItem/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasSetItem && hasGetItem && hasRemoveItem && hasConsoleLog;
        }
      },

      'beginner-20': {
        title: 'JSON Methods',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: JSON Methods</h4>
          <p><strong>Instructions:</strong> Work with JSON:</p>
          <ul>
            <li>Create an object with name, age, and city properties</li>
            <li>Convert it to JSON string using <code>JSON.stringify()</code></li>
            <li>Parse it back to object using <code>JSON.parse()</code></li>
            <li>Log original object, JSON string, and parsed object</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>JSON Methods:</h3>
  <p>Console shows JSON conversion results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f0f9ff;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

console.log("Original object:", person);

let jsonString = JSON.stringify(person);
console.log("JSON string:", jsonString);

let parsedObject = JSON.parse(jsonString);
console.log("Parsed object:", parsedObject);`,
        validate: (code) => {
          const hasObject = /\{[\s\S]*name[\s\S]*age[\s\S]*\}/i.test(code);
          const hasStringify = /JSON\.stringify/i.test(code);
          const hasParse = /JSON\.parse/i.test(code);
          const hasConsoleLog = /console\.log/i.test(code);
          return hasObject && hasStringify && hasParse && hasConsoleLog;
        }
      },

      // Continue with remaining 10 tasks...
      'beginner-21': {
        title: 'Try-Catch Blocks',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Try-Catch Blocks</h4>
          <p><strong>Instructions:</strong> Handle errors with try-catch:</p>
          <ul>
            <li>Create a try block that attempts to parse invalid JSON</li>
            <li>Add a catch block to handle the error</li>
            <li>Log appropriate messages in both try and catch blocks</li>
            <li>Add a finally block that always executes</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Error Handling:</h3>
  <p>Console shows try-catch-finally execution!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #ffe6e6;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `try {
    let invalidJson = "{ invalid json }";
    let parsed = JSON.parse(invalidJson);
    console.log("Parsed successfully:", parsed);
} catch (error) {
    console.log("Error caught:", error.message);
} finally {
    console.log("Finally block always executes");
}`,
        validate: (code) => {
          const hasTry = /try\s*\{/i.test(code);
          const hasCatch = /catch\s*\(/i.test(code);
          const hasFinally = /finally\s*\{/i.test(code);
          const hasJSONParse = /JSON\.parse/i.test(code);
          return hasTry && hasCatch && hasFinally && hasJSONParse;
        }
      },

      'beginner-22': {
        title: 'SetTimeout and SetInterval',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Timers</h4>
          <p><strong>Instructions:</strong> Use setTimeout and setInterval:</p>
          <ul>
            <li>Use <code>setTimeout</code> to log a message after 2 seconds</li>
            <li>Use <code>setInterval</code> to log a counter every 1 second</li>
            <li>Use <code>clearInterval</code> to stop the interval after 5 counts</li>
            <li>Log when timers start and stop</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Timers:</h3>
  <p>Console shows timer messages over time!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e8f5e8;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `console.log("Timers started");

setTimeout(() => {
    console.log("This message appears after 2 seconds");
}, 2000);

let counter = 0;
let intervalId = setInterval(() => {
    counter++;
    console.log("Counter:", counter);
    
    if (counter >= 5) {
        clearInterval(intervalId);
        console.log("Interval stopped");
    }
}, 1000);`,
        validate: (code) => {
          const hasSetTimeout = /setTimeout/i.test(code);
          const hasSetInterval = /setInterval/i.test(code);
          const hasClearInterval = /clearInterval/i.test(code);
          const hasArrowFunction = /=>/i.test(code);
          return hasSetTimeout && hasSetInterval && hasClearInterval && hasArrowFunction;
        }
      },

      'beginner-23': {
        title: 'Form Validation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Form Validation</h4>
          <p><strong>Instructions:</strong> Validate form input:</p>
          <ul>
            <li>Get the value from input field with id "email"</li>
            <li>Check if it contains "@" symbol</li>
            <li>Check if length is at least 5 characters</li>
            <li>Display validation message in element with id "validation"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Form Validation:</h3>
  <input type="text" id="email" placeholder="Enter email" value="test@example.com">
  <button onclick="validateEmail()">Validate</button>
  <div id="validation"></div>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
}

#email {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#validation {
  margin-top: 10px;
  font-weight: bold;
}`,
        solution: `function validateEmail() {
    let email = document.getElementById("email").value;
    let validationDiv = document.getElementById("validation");
    
    if (email.length < 5) {
        validationDiv.textContent = "Email too short!";
        validationDiv.style.color = "red";
    } else if (!email.includes("@")) {
        validationDiv.textContent = "Email must contain @";
        validationDiv.style.color = "red";
    } else {
        validationDiv.textContent = "Valid email!";
        validationDiv.style.color = "green";
    }
    
    console.log("Email validated:", email);
}`,
        validate: (code) => {
          const hasGetElementById = /document\.getElementById/i.test(code);
          const hasIncludes = /\.includes\s*\(\s*"@"\s*\)/i.test(code);
          const hasLength = /\.length/i.test(code);
          const hasTextContent = /\.textContent/i.test(code);
          return hasGetElementById && hasIncludes && hasLength && hasTextContent;
        }
      },

      'beginner-24': {
        title: 'Array Filter Method',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Array Filter</h4>
          <p><strong>Instructions:</strong> Use array filter method:</p>
          <ul>
            <li>Create an array of numbers from 1 to 10</li>
            <li>Use <code>filter()</code> to get only even numbers</li>
            <li>Use <code>filter()</code> to get numbers greater than 5</li>
            <li>Log original array and both filtered arrays</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Array Filter:</h3>
  <p>Console shows filtered arrays!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e3f2fd;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Original array:", numbers);

let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

let greaterThanFive = numbers.filter(num => num > 5);
console.log("Greater than 5:", greaterThanFive);`,
        validate: (code) => {
          const hasNumbers = /numbers\s*=.*\[.*\]/i.test(code);
          const hasFilter = /\.filter\(/i.test(code);
          const hasModulo = /%\s*2\s*===\s*0/i.test(code);
          const hasGreaterThan = />\s*5/i.test(code);
          return hasNumbers && hasFilter && hasModulo && hasGreaterThan;
        }
      },

      'beginner-25': {
        title: 'Object Methods',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Object Methods</h4>
          <p><strong>Instructions:</strong> Create object with methods:</p>
          <ul>
            <li>Create an object called <code>calculator</code></li>
            <li>Add methods for add, subtract, multiply, divide</li>
            <li>Each method should take two parameters and return result</li>
            <li>Test all methods and log results</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Object Methods:</h3>
  <p>Console shows calculator results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f0f4c3;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
    multiply: function(a, b) {
        return a * b;
    },
    divide: function(a, b) {
        return a / b;
    }
};

console.log("10 + 5 =", calculator.add(10, 5));
console.log("10 - 5 =", calculator.subtract(10, 5));
console.log("10 * 5 =", calculator.multiply(10, 5));
console.log("10 / 5 =", calculator.divide(10, 5));`,
        validate: (code) => {
          const hasCalculator = /calculator\s*=\s*\{/i.test(code);
          const hasAdd = /add\s*:\s*function/i.test(code);
          const hasSubtract = /subtract\s*:\s*function/i.test(code);
          const hasMultiply = /multiply\s*:\s*function/i.test(code);
          const hasDivide = /divide\s*:\s*function/i.test(code);
          return hasCalculator && hasAdd && hasSubtract && hasMultiply && hasDivide;
        }
      },

      'beginner-26': {
        title: 'Classes and Constructors',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Classes</h4>
          <p><strong>Instructions:</strong> Create a class:</p>
          <ul>
            <li>Create a class called <code>Person</code></li>
            <li>Add constructor that takes name and age</li>
            <li>Add a method <code>introduce()</code> that returns introduction</li>
            <li>Create an instance and call the method</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Classes:</h3>
  <p>Console shows class instance results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #fce4ec;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return \`Hi, I'm \${this.name} and I'm \${this.age} years old.\`;
    }
}

let person1 = new Person("Alice", 25);
console.log(person1.introduce());

let person2 = new Person("Bob", 30);
console.log(person2.introduce());`,
        validate: (code) => {
          const hasClass = /class\s+Person/i.test(code);
          const hasConstructor = /constructor\s*\(/i.test(code);
          const hasThis = /this\./i.test(code);
          const hasIntroduce = /introduce\s*\(\s*\)/i.test(code);
          const hasNew = /new\s+Person/i.test(code);
          return hasClass && hasConstructor && hasThis && hasIntroduce && hasNew;
        }
      },

      'beginner-27': {
        title: 'Destructuring Assignment',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Destructuring</h4>
          <p><strong>Instructions:</strong> Use destructuring assignment:</p>
          <ul>
            <li>Create an object with name, age, and city properties</li>
            <li>Use destructuring to extract these values</li>
            <li>Create an array and destructure first two elements</li>
            <li>Log all destructured values</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Destructuring:</h3>
  <p>Console shows destructured values!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #e8f5e8;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `// Object destructuring
let person = {
    name: "John",
    age: 28,
    city: "Boston"
};

let { name, age, city } = person;
console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);

// Array destructuring
let colors = ["red", "green", "blue", "yellow"];
let [first, second] = colors;
console.log("First color:", first);
console.log("Second color:", second);`,
        validate: (code) => {
          const hasObjectDestructuring = /\{\s*name\s*,\s*age\s*,\s*city\s*\}\s*=/i.test(code);
          const hasArrayDestructuring = /\[\s*\w+\s*,\s*\w+\s*\]\s*=/i.test(code);
          const hasPersonObject = /person\s*=\s*\{/i.test(code);
          const hasArray = /\[.*red.*green.*blue.*\]/i.test(code);
          return hasObjectDestructuring && hasArrayDestructuring && hasPersonObject && hasArray;
        }
      },

      'beginner-28': {
        title: 'Async/Await Basics',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Async/Await</h4>
          <p><strong>Instructions:</strong> Use async/await:</p>
          <ul>
            <li>Create an async function called <code>fetchData</code></li>
            <li>Use setTimeout with Promise to simulate async operation</li>
            <li>Use await to wait for the promise</li>
            <li>Call the function and log the result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Async/Await:</h3>
  <p>Console shows async operation results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #fff8e1;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `async function fetchData() {
    console.log("Fetching data...");
    
    let data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched successfully!");
        }, 2000);
    });
    
    return data;
}

fetchData().then(result => {
    console.log(result);
});

console.log("This runs immediately");`,
        validate: (code) => {
          const hasAsync = /async\s+function/i.test(code);
          const hasAwait = /await/i.test(code);
          const hasPromise = /new\s+Promise/i.test(code);
          const hasSetTimeout = /setTimeout/i.test(code);
          return hasAsync && hasAwait && hasPromise && hasSetTimeout;
        }
      },

      'beginner-29': {
        title: 'Regular Expressions',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Regular Expressions</h4>
          <p><strong>Instructions:</strong> Use regular expressions:</p>
          <ul>
            <li>Create a regex to match email patterns</li>
            <li>Test it with valid and invalid emails</li>
            <li>Use <code>test()</code> method to check matches</li>
            <li>Log results for different email formats</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Regular Expressions:</h3>
  <p>Console shows regex test results!</p>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f3e5f5;
  border-radius: 8px;
  margin: 20px 0;
}`,
        solution: `let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let emails = [
    "test@example.com",
    "user.name@domain.co.uk",
    "invalid-email",
    "another@test.org"
];

emails.forEach(email => {
    let isValid = emailRegex.test(email);
    console.log(\`\${email}: \${isValid ? 'Valid' : 'Invalid'}\`);
});`,
        validate: (code) => {
          const hasRegex = /\/.*@.*\//i.test(code);
          const hasTest = /\.test\(/i.test(code);
          const hasForEach = /\.forEach/i.test(code);
          const hasEmailArray = /emails\s*=\s*\[/i.test(code);
          return hasRegex && hasTest && hasForEach && hasEmailArray;
        }
      },

      'beginner-30': {
        title: 'Final Project - Todo List',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Todo List App</h4>
          <p><strong>Instructions:</strong> Create a simple todo list:</p>
          <ul>
            <li>Add functionality to add new todos</li>
            <li>Display todos in a list</li>
            <li>Add ability to mark todos as complete</li>
            <li>Use DOM manipulation and event handling</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div id="output">
  <h3>Todo List App:</h3>
  <input type="text" id="todoInput" placeholder="Enter a todo">
  <button id="addBtn">Add Todo</button>
  <ul id="todoList"></ul>
</div>`,
        cssContent: `#output {
  padding: 20px;
  background: #f0f8ff;
  border-radius: 8px;
  margin: 20px 0;
}

#todoInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

#addBtn {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#todoList {
  margin-top: 10px;
  list-style-type: none;
  padding: 0;
}

.todo-item {
  padding: 8px;
  margin: 5px 0;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}`,
        solution: `let todos = [];

function addTodo() {
    let input = document.getElementById("todoInput");
    let todoText = input.value.trim();
    
    if (todoText === "") return;
    
    let todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };
    
    todos.push(todo);
    input.value = "";
    renderTodos();
    console.log("Todo added:", todoText);
}

function toggleTodo(id) {
    let todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        console.log("Todo toggled:", todo.text);
    }
}

function renderTodos() {
    let todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    
    todos.forEach(todo => {
        let li = document.createElement("li");
        li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
        li.textContent = todo.text;
        li.onclick = () => toggleTodo(todo.id);
        todoList.appendChild(li);
    });
}

document.getElementById("addBtn").addEventListener("click", addTodo);

document.getElementById("todoInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});`,
        validate: (code) => {
          const hasAddTodo = /function\s+addTodo|addTodo\s*=/i.test(code);
          const hasGetElementById = /document\.getElementById/i.test(code);
          const hasAddEventListener = /\.addEventListener/i.test(code);
          const hasPush = /\.push\(/i.test(code);
          const hasForEach = /\.forEach/i.test(code);
          return hasAddTodo && hasGetElementById && hasAddEventListener && hasPush && hasForEach;
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
    const container = document.getElementById('beginnerTasks');
    if (!container) return;
    
    const levelTasks = Object.entries(this.tasks).filter(([taskId, task]) => 
      task.level === 'beginner'
    );
    
    levelTasks.forEach(([taskId, task]) => {
      const taskCard = this.createTaskCard(taskId, task);
      container.appendChild(taskCard);
    });
  }
  
  createTaskCard(taskId, task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.taskId = taskId;
    
    const icon = '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>';
    
    taskCard.innerHTML = `
      <div class="task-glow"></div>
      <div class="task-header">
        <div class="task-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${icon}
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
      'beginner-1': 'Learn to create variables and use console.log()',
      'beginner-2': 'Practice basic arithmetic operations in JavaScript',
      'beginner-3': 'Work with strings and their built-in methods',
      'beginner-4': 'Create and manipulate arrays with push and shift',
      'beginner-5': 'Use conditional statements to control program flow',
      'beginner-6': 'Master for loops and array iteration',
      'beginner-7': 'Create and call functions with parameters',
      'beginner-8': 'Work with objects and their properties',
      'beginner-9': 'Select and modify DOM elements',
      'beginner-10': 'Add event listeners to handle user interactions',
      'beginner-11': 'Use while loops for repetitive tasks',
      'beginner-12': 'Control program flow with switch statements',
      'beginner-13': 'Use forEach and map methods on arrays',
      'beginner-14': 'Master string manipulation methods',
      'beginner-15': 'Work with the Math object and its methods',
      'beginner-16': 'Handle dates and time with Date object',
      'beginner-17': 'Use template literals for string formatting',
      'beginner-18': 'Create concise functions with arrow syntax',
      'beginner-19': 'Store and retrieve data with localStorage',
      'beginner-20': 'Convert between objects and JSON strings',
      'beginner-21': 'Handle errors gracefully with try-catch',
      'beginner-22': 'Use timers for delayed and repeated execution',
      'beginner-23': 'Validate user input in web forms',
      'beginner-24': 'Filter arrays based on conditions',
      'beginner-25': 'Create objects with methods and functionality',
      'beginner-26': 'Use classes and constructors for object creation',
      'beginner-27': 'Extract values from objects and arrays efficiently',
      'beginner-28': 'Handle asynchronous operations with async/await',
      'beginner-29': 'Use regular expressions for pattern matching',
      'beginner-30': 'Build a complete todo list application'
    };
    
    return descriptions[taskId] || 'Complete this JavaScript task to earn EXP';
  }
  
  // Local Storage Management
  saveGameState() {
    const stateToSave = {
      ...this.gameState,
      completedTasks: Array.from(this.gameState.completedTasks),
      unlockedSolutions: Array.from(this.gameState.unlockedSolutions),
      failedAttempts: this.gameState.failedAttempts,
      editorContent: this.gameState.editorContent,
      htmlContent: this.gameState.htmlContent,
      cssContent: this.gameState.cssContent
    };
    localStorage.setItem('jsLearningGame', JSON.stringify(stateToSave));
  }
  
  loadGameState() {
    const saved = localStorage.getItem('jsLearningGame');
    if (saved) {
      const parsedState = JSON.parse(saved);
      this.gameState = {
        ...parsedState,
        completedTasks: new Set(parsedState.completedTasks || []),
        unlockedSolutions: new Set(parsedState.unlockedSolutions || []),
        failedAttempts: parsedState.failedAttempts || {},
        editorContent: parsedState.editorContent || {},
        htmlContent: parsedState.htmlContent || {},
        cssContent: parsedState.cssContent || {}
      };
    }
  }
  
  // Event Listeners
  setupEventListeners() {
    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
      window.location.href = '../index.html';
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
    
    // Editor mode buttons
    document.getElementById('htmlBtn').addEventListener('click', () => {
      this.switchEditorMode('html');
    });
    
    document.getElementById('cssBtn').addEventListener('click', () => {
      this.switchEditorMode('css');
    });
    
    document.getElementById('jsBtn').addEventListener('click', () => {
      this.switchEditorMode('js');
    });
    
    // Code editor
    document.getElementById('codeEditor').addEventListener('input', (e) => {
      if (this.currentTask) {
        if (this.currentEditorMode === 'html') {
          this.gameState.htmlContent[this.currentTask] = e.target.value;
        } else if (this.currentEditorMode === 'css') {
          this.gameState.cssContent[this.currentTask] = e.target.value;
        } else {
          this.gameState.editorContent[this.currentTask] = e.target.value;
        }
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
  
  // Switch between HTML, CSS, and JS editor modes
  switchEditorMode(mode) {
    this.currentEditorMode = mode;
    const htmlBtn = document.getElementById('htmlBtn');
    const cssBtn = document.getElementById('cssBtn');
    const jsBtn = document.getElementById('jsBtn');
    const editorTitleText = document.getElementById('editorTitleText');
    const codeEditor = document.getElementById('codeEditor');
    
    // Remove active class from all buttons
    htmlBtn.classList.remove('active');
    cssBtn.classList.remove('active');
    jsBtn.classList.remove('active');
    
    if (mode === 'html') {
      htmlBtn.classList.add('active');
      editorTitleText.textContent = 'HTML Editor';
      codeEditor.placeholder = 'HTML code is predefined. Switch to JS to write your JavaScript.';
      codeEditor.readOnly = true;
      codeEditor.value = this.gameState.htmlContent[this.currentTask] || this.tasks[this.currentTask].htmlContent;
    } else if (mode === 'css') {
      cssBtn.classList.add('active');
      editorTitleText.textContent = 'CSS Editor';
      codeEditor.placeholder = 'CSS code is predefined. Switch to JS to write your JavaScript.';
      codeEditor.readOnly = true;
      codeEditor.value = this.gameState.cssContent[this.currentTask] || this.tasks[this.currentTask].cssContent;
    } else {
      jsBtn.classList.add('active');
      editorTitleText.textContent = 'JavaScript Editor';
      codeEditor.placeholder = 'Write your JavaScript code here...';
      codeEditor.readOnly = false;
      codeEditor.value = this.gameState.editorContent[this.currentTask] || '';
    }
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
    const levelTasks = Object.keys(this.tasks).filter(taskId => 
      this.tasks[taskId].level === 'beginner'
    );
    const completedCount = levelTasks.filter(taskId => 
      this.gameState.completedTasks.has(taskId)
    ).length;
    const totalCount = levelTasks.length;
    const percentage = (completedCount / totalCount) * 100;
    
    const progressText = document.getElementById('beginnerProgress');
    const progressBar = document.getElementById('beginnerProgressBar');
    
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
    
    // Initialize content for the task
    if (!this.gameState.htmlContent[taskId]) {
      this.gameState.htmlContent[taskId] = task.htmlContent;
    }
    if (!this.gameState.cssContent[taskId]) {
      this.gameState.cssContent[taskId] = task.cssContent;
    }
    
    // Start in JS mode
    this.switchEditorMode('js');
    
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
  
  // Reset all button states and feedback
  resetValidationState() {
    const validateBtn = document.getElementById('validateCode');
    const submitBtn = document.getElementById('submitCode');
    const showSolutionBtn = document.getElementById('showSolution');
    const feedback = document.getElementById('validationFeedback');
    
    // Reset all buttons to enabled state
    if (validateBtn) {
      validateBtn.disabled = false;
      validateBtn.textContent = 'Validate';
    }
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submit';
    }
    
    if (showSolutionBtn) {
      showSolutionBtn.disabled = true;
    }
    
    // Hide feedback
    if (feedback) {
      feedback.style.display = 'none';
      feedback.className = 'validation-feedback';
      feedback.textContent = '';
    }
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
    const submitBtn = document.getElementById('submitCode');
    
    if (this.currentEditorMode !== 'js') {
      this.showValidationFeedback('Please switch to JavaScript editor to write your JS code.', 'error');
      return;
    }
    
    if (!code) {
      this.showValidationFeedback('Please write some JavaScript code first.', 'error');
      return;
    }
    
    const isValid = task.validate(code);
    
    if (isValid) {
      this.showValidationFeedback('Perfect! Your JavaScript code is correct. Click Submit to earn EXP!', 'success');
      if (submitBtn) submitBtn.disabled = false;
    } else {
      // Track failed attempts
      const taskId = this.currentTask;
      this.gameState.failedAttempts[taskId] = (this.gameState.failedAttempts[taskId] || 0) + 1;
      this.saveGameState();
      
      this.showValidationFeedback('Your JavaScript doesn\'t match the expected output. Check the instructions and try again.', 'error');
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
      
      // Scroll to feedback for better visibility
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  // Submit Task Completion with proper EXP calculation
  async submitTask() {
    const taskId = this.currentTask;
    const task = this.tasks[taskId];
    
    // Check if task is already completed to prevent duplicate EXP
    if (this.gameState.completedTasks.has(taskId)) {
      console.warn('Task already completed, not adding EXP again');
      this.showTaskAnswer();
      return;
    }
    
    // Check if user is logged in
    let username = localStorage.getItem("username");
    if (!username) {
      alert("Please log in first to save your progress!");
      window.location.href = "login.html";
      return;
    }

    // Add to completed tasks and EXP only once
    this.gameState.completedTasks.add(taskId);
    this.gameState.exp += task.exp;
    delete this.gameState.editorContent[taskId];
    delete this.gameState.htmlContent[taskId];
    delete this.gameState.cssContent[taskId];
    
    // Save state immediately
    this.saveGameState();
    this.updateUI();

    // Debug log to track EXP calculation
    console.log(`Task ${taskId} completed. Added ${task.exp} EXP. Total EXP: ${this.gameState.exp}`);

    // Send completion to MongoDB via API
    try {
      const response = await fetch(`${API_BASE}/task/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          course: "javascript",
          task_id: taskId
        })
      });

      const data = await response.json();
      
      if (response.ok && data.message && data.message.toLowerCase().includes("complete")) {
        console.log("Task completion saved to database:", data);
        this.showTaskAnswer();
      } else {
        throw new Error(data.detail || "Unexpected response from server");
      }
    } catch (error) {
      console.error("Error saving task completion:", error);
      // Show success message anyway since local state is updated
      this.showTaskAnswer();
      // Optional: Show a warning that progress wasn't saved to server
      setTimeout(() => {
        alert("Task completed locally! Note: Progress may not be synced to server.");
      }, 2000);
    }
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
        <p><strong>Here's the correct JavaScript solution:</strong></p>
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
    
    // Switch to JS mode and show solution
    this.switchEditorMode('js');
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
    const htmlCode = this.gameState.htmlContent[this.currentTask] || this.tasks[this.currentTask].htmlContent;
    const cssCode = this.gameState.cssContent[this.currentTask] || this.tasks[this.currentTask].cssContent;
    const jsCode = this.gameState.editorContent[this.currentTask] || '';
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
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
        <script>
          // Wrap user code in try-catch to prevent errors from breaking the preview
          try {
            ${jsCode}
          } catch (error) {
            console.error('JavaScript Error:', error);
          }
        </script>
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
              a.download = `JavaScript_Certificate_${userName.replace(/\s+/g, '_')}.png`;
              
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
        console.error('Could not load certificate image (3.png)');
        alert('Certificate template not found. Please ensure 3.png is in the same directory.');
      };
      
      img.crossOrigin = 'anonymous';
      img.src = '1.png';
      
    } catch (error) {
      console.error('Error in downloadCertificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  }

  // Add method to reset all game data (for debugging)
  resetGameData() {
    this.gameState = {
      exp: 0,
      completedTasks: new Set(),
      unlockedSolutions: new Set(),
      failedAttempts: {},
      theme: 'light',
      editorContent: {},
      htmlContent: {},
      cssContent: {}
    };
    this.saveGameState();
    this.updateUI();
    console.log('Game data reset successfully');
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new JSLearningGame();
});

