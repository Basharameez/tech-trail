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
      currentTab: 'html'
    };

    this.tasks = {
      // BEGINNER TASKS (30 tasks - 10 EXP each)
      'beginner-1': {
        title: 'Hello JavaScript',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Hello JavaScript</h4>
          <p><strong>Instructions:</strong> Create your first JavaScript program:</p>
          <ul>
            <li>HTML: Create a button with id "myButton" and text "Click Me"</li>
            <li>CSS: Style the button with padding 10px and background blue</li>
            <li>JS: Add click event to show alert "Hello JavaScript!"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="myButton">Click Me</button>`,
        cssSolution: `#myButton {
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  border-radius: 5px;
}`,
        jsSolution: `document.getElementById('myButton').addEventListener('click', function() {
  alert('Hello JavaScript!');
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<button id="mybutton">click me</button>');
          const cssCheck = css.toLowerCase().includes('padding: 10px') && css.toLowerCase().includes('background: blue');
          const jsCheck = js.toLowerCase().includes('addeventlistener') && js.toLowerCase().includes('alert');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-2': {
        title: 'Variables and Data Types',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Variables and Data Types</h4>
          <p><strong>Instructions:</strong> Work with JavaScript variables:</p>
          <ul>
            <li>HTML: Create a div with id "output"</li>
            <li>CSS: Style the div with padding 20px and background lightgray</li>
            <li>JS: Create variables name="John", age=25, display them in the div</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="output"></div>`,
        cssSolution: `#output {
  padding: 20px;
  background: lightgray;
  border-radius: 5px;
}`,
        jsSolution: `let name = "John";
let age = 25;
document.getElementById('output').innerHTML = "Name: " + name + ", Age: " + age;`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="output">');
          const cssCheck = css.toLowerCase().includes('padding: 20px') && css.toLowerCase().includes('background: lightgray');
          const jsCheck = js.toLowerCase().includes('let name') && js.toLowerCase().includes('let age') && js.toLowerCase().includes('innerhtml');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-3': {
        title: 'Functions',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Functions</h4>
          <p><strong>Instructions:</strong> Create and use JavaScript functions:</p>
          <ul>
            <li>HTML: Create button with id "calcBtn" text "Calculate"</li>
            <li>CSS: Style button with padding 15px and background green</li>
            <li>JS: Create function addNumbers(a, b) that returns sum, call it on click</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="calcBtn">Calculate</button>`,
        cssSolution: `#calcBtn {
  padding: 15px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px;
}`,
        jsSolution: `function addNumbers(a, b) {
  return a + b;
}

document.getElementById('calcBtn').addEventListener('click', function() {
  let result = addNumbers(5, 3);
  alert('Result: ' + result);
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<button id="calcbtn">calculate</button>');
          const cssCheck = css.toLowerCase().includes('padding: 15px') && css.toLowerCase().includes('background: green');
          const jsCheck = js.toLowerCase().includes('function addnumbers') && js.toLowerCase().includes('return a + b');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-4': {
        title: 'Arrays',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Arrays</h4>
          <p><strong>Instructions:</strong> Work with JavaScript arrays:</p>
          <ul>
            <li>HTML: Create ul with id "fruitList"</li>
            <li>CSS: Style ul with background lightyellow and padding 10px</li>
            <li>JS: Create array of fruits, display each as li element</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<ul id="fruitList"></ul>`,
        cssSolution: `#fruitList {
  background: lightyellow;
  padding: 10px;
  border-radius: 5px;
}`,
        jsSolution: `let fruits = ['apple', 'banana', 'orange'];
let list = document.getElementById('fruitList');
fruits.forEach(function(fruit) {
  let li = document.createElement('li');
  li.textContent = fruit;
  list.appendChild(li);
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<ul id="fruitlist">');
          const cssCheck = css.toLowerCase().includes('background: lightyellow') && css.toLowerCase().includes('padding: 10px');
          const jsCheck = js.toLowerCase().includes('let fruits') && js.toLowerCase().includes('foreach') && js.toLowerCase().includes('createelement');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-5': {
        title: 'Conditionals',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Conditionals</h4>
          <p><strong>Instructions:</strong> Use if/else statements:</p>
          <ul>
            <li>HTML: Create input with id "numberInput" and button "Check"</li>
            <li>CSS: Style input with padding 10px and button with background orange</li>
            <li>JS: Check if number is even or odd, display result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="number" id="numberInput" placeholder="Enter a number">
<button id="checkBtn">Check</button>
<div id="result"></div>`,
        cssSolution: `#numberInput {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#checkBtn {
  padding: 10px;
  background: orange;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('checkBtn').addEventListener('click', function() {
  let number = parseInt(document.getElementById('numberInput').value);
  let result = document.getElementById('result');
  
  if (number % 2 === 0) {
    result.textContent = 'Even number';
  } else {
    result.textContent = 'Odd number';
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('input') && html.toLowerCase().includes('id="numberinput"');
          const cssCheck = css.toLowerCase().includes('padding: 10px') && css.toLowerCase().includes('background: orange');
          const jsCheck = js.toLowerCase().includes('if') && js.toLowerCase().includes('% 2') && js.toLowerCase().includes('else');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-6': {
        title: 'Loops',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Loops</h4>
          <p><strong>Instructions:</strong> Use for loops:</p>
          <ul>
            <li>HTML: Create div with id "numbers"</li>
            <li>CSS: Style div with background lightblue and padding 15px</li>
            <li>JS: Use for loop to display numbers 1 to 5</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="numbers"></div>`,
        cssSolution: `#numbers {
  background: lightblue;
  padding: 15px;
  border-radius: 5px;
}`,
        jsSolution: `let numbersDiv = document.getElementById('numbers');
for (let i = 1; i <= 5; i++) {
  numbersDiv.innerHTML += i + ' ';
}`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="numbers">');
          const cssCheck = css.toLowerCase().includes('background: lightblue') && css.toLowerCase().includes('padding: 15px');
          const jsCheck = js.toLowerCase().includes('for') && js.toLowerCase().includes('i <= 5') && js.toLowerCase().includes('i++');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-7': {
        title: 'Objects',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Objects</h4>
          <p><strong>Instructions:</strong> Create and use JavaScript objects:</p>
          <ul>
            <li>HTML: Create div with id "personInfo"</li>
            <li>CSS: Style div with background lightgreen and padding 20px</li>
            <li>JS: Create person object with name and age properties, display them</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="personInfo"></div>`,
        cssSolution: `#personInfo {
  background: lightgreen;
  padding: 20px;
  border-radius: 5px;
}`,
        jsSolution: `let person = {
  name: 'Alice',
  age: 30
};

document.getElementById('personInfo').innerHTML = 'Name: ' + person.name + ', Age: ' + person.age;`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="personinfo">');
          const cssCheck = css.toLowerCase().includes('background: lightgreen') && css.toLowerCase().includes('padding: 20px');
          const jsCheck = js.toLowerCase().includes('let person = {') && js.toLowerCase().includes('name:') && js.toLowerCase().includes('age:');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-8': {
        title: 'String Methods',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: String Methods</h4>
          <p><strong>Instructions:</strong> Use JavaScript string methods:</p>
          <ul>
            <li>HTML: Create input with id "textInput" and button "Transform"</li>
            <li>CSS: Style input with padding 8px and button with background purple</li>
            <li>JS: Convert input text to uppercase and display result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="textInput" placeholder="Enter text">
<button id="transformBtn">Transform</button>
<div id="output"></div>`,
        cssSolution: `#textInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#transformBtn {
  padding: 8px;
  background: purple;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('transformBtn').addEventListener('click', function() {
  let text = document.getElementById('textInput').value;
  let upperText = text.toUpperCase();
  document.getElementById('output').textContent = upperText;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('input') && html.toLowerCase().includes('id="textinput"');
          const cssCheck = css.toLowerCase().includes('padding: 8px') && css.toLowerCase().includes('background: purple');
          const jsCheck = js.toLowerCase().includes('touppercase') && js.toLowerCase().includes('textcontent');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-9': {
        title: 'Math Object',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Math Object</h4>
          <p><strong>Instructions:</strong> Use JavaScript Math object:</p>
          <ul>
            <li>HTML: Create button with id "randomBtn" text "Generate Random"</li>
            <li>CSS: Style button with padding 12px and background teal</li>
            <li>JS: Generate random number between 1-100, display it</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="randomBtn">Generate Random</button>
<div id="randomNumber"></div>`,
        cssSolution: `#randomBtn {
  padding: 12px;
  background: teal;
  color: white;
  border: none;
  border-radius: 5px;
}`,
        jsSolution: `document.getElementById('randomBtn').addEventListener('click', function() {
  let randomNum = Math.floor(Math.random() * 100) + 1;
  document.getElementById('randomNumber').textContent = 'Random Number: ' + randomNum;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<button id="randombtn">generate random</button>');
          const cssCheck = css.toLowerCase().includes('padding: 12px') && css.toLowerCase().includes('background: teal');
          const jsCheck = js.toLowerCase().includes('math.random') && js.toLowerCase().includes('math.floor');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-10': {
        title: 'Date Object',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Date Object</h4>
          <p><strong>Instructions:</strong> Work with JavaScript Date object:</p>
          <ul>
            <li>HTML: Create div with id "currentDate"</li>
            <li>CSS: Style div with background lightcoral and padding 15px</li>
            <li>JS: Display current date and time</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="currentDate"></div>`,
        cssSolution: `#currentDate {
  background: lightcoral;
  padding: 15px;
  border-radius: 5px;
}`,
        jsSolution: `let now = new Date();
document.getElementById('currentDate').textContent = 'Current Date: ' + now.toDateString();`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="currentdate">');
          const cssCheck = css.toLowerCase().includes('background: lightcoral') && css.toLowerCase().includes('padding: 15px');
          const jsCheck = js.toLowerCase().includes('new date') && js.toLowerCase().includes('todatestring');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-11': {
        title: 'Event Handling',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Event Handling</h4>
          <p><strong>Instructions:</strong> Handle different events:</p>
          <ul>
            <li>HTML: Create input with id "textField" and div with id "output"</li>
            <li>CSS: Style input with padding 10px and output with background yellow</li>
            <li>JS: Display input value in output div on keyup event</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="textField" placeholder="Type something...">
<div id="output"></div>`,
        cssSolution: `#textField {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#output {
  background: yellow;
  padding: 10px;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('textField').addEventListener('keyup', function() {
  let inputValue = this.value;
  document.getElementById('output').textContent = 'You typed: ' + inputValue;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<input') && html.toLowerCase().includes('id="textfield"');
          const cssCheck = css.toLowerCase().includes('padding: 10px') && css.toLowerCase().includes('background: yellow');
          const jsCheck = js.toLowerCase().includes('keyup') && js.toLowerCase().includes('this.value');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-12': {
        title: 'Local Storage',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Local Storage</h4>
          <p><strong>Instructions:</strong> Use localStorage to save data:</p>
          <ul>
            <li>HTML: Create input with id "nameInput", button "Save", button "Load"</li>
            <li>CSS: Style buttons with padding 8px and different background colors</li>
            <li>JS: Save input to localStorage and load it back</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="nameInput" placeholder="Enter your name">
<button id="saveBtn">Save</button>
<button id="loadBtn">Load</button>
<div id="result"></div>`,
        cssSolution: `#nameInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#saveBtn {
  padding: 8px;
  background: green;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}

#loadBtn {
  padding: 8px;
  background: orange;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}`,
        jsSolution: `document.getElementById('saveBtn').addEventListener('click', function() {
  let name = document.getElementById('nameInput').value;
  localStorage.setItem('savedName', name);
  document.getElementById('result').textContent = 'Name saved!';
});

document.getElementById('loadBtn').addEventListener('click', function() {
  let savedName = localStorage.getItem('savedName');
  if (savedName) {
    document.getElementById('result').textContent = 'Loaded: ' + savedName;
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('save') && html.toLowerCase().includes('load');
          const cssCheck = css.toLowerCase().includes('background: green') && css.toLowerCase().includes('background: orange');
          const jsCheck = js.toLowerCase().includes('localstorage.setitem') && js.toLowerCase().includes('localstorage.getitem');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-13': {
        title: 'JSON Handling',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: JSON Handling</h4>
          <p><strong>Instructions:</strong> Work with JSON data:</p>
          <ul>
            <li>HTML: Create div with id "jsonOutput"</li>
            <li>CSS: Style div with background lightgray and padding 15px</li>
            <li>JS: Create object, convert to JSON string, parse it back and display</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="jsonOutput"></div>`,
        cssSolution: `#jsonOutput {
  background: lightgray;
  padding: 15px;
  border-radius: 5px;
  font-family: monospace;
}`,
        jsSolution: `let user = {
  name: 'John',
  age: 25,
  city: 'New York'
};

let jsonString = JSON.stringify(user);
let parsedUser = JSON.parse(jsonString);

document.getElementById('jsonOutput').innerHTML = 
  'JSON String: ' + jsonString + '<br>' +
  'Parsed Name: ' + parsedUser.name;`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="jsonoutput">');
          const cssCheck = css.toLowerCase().includes('background: lightgray') && css.toLowerCase().includes('padding: 15px');
          const jsCheck = js.toLowerCase().includes('json.stringify') && js.toLowerCase().includes('json.parse');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-14': {
        title: 'Array Methods',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Array Methods</h4>
          <p><strong>Instructions:</strong> Use basic array methods:</p>
          <ul>
            <li>HTML: Create div with id "arrayResults"</li>
            <li>CSS: Style div with background lightblue and padding 20px</li>
            <li>JS: Use push, pop, shift, unshift on array and display results</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="arrayResults"></div>`,
        cssSolution: `#arrayResults {
  background: lightblue;
  padding: 20px;
  border-radius: 5px;
}`,
        jsSolution: `let numbers = [1, 2, 3];
numbers.push(4);
numbers.unshift(0);
let popped = numbers.pop();
let shifted = numbers.shift();

document.getElementById('arrayResults').innerHTML = 
  'Final array: ' + numbers.join(', ') + '<br>' +
  'Popped: ' + popped + '<br>' +
  'Shifted: ' + shifted;`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="arrayresults">');
          const cssCheck = css.toLowerCase().includes('background: lightblue') && css.toLowerCase().includes('padding: 20px');
          const jsCheck = js.toLowerCase().includes('.push') && js.toLowerCase().includes('.pop') && js.toLowerCase().includes('.shift');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-15': {
        title: 'DOM Manipulation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: DOM Manipulation</h4>
          <p><strong>Instructions:</strong> Manipulate DOM elements:</p>
          <ul>
            <li>HTML: Create div with id "container" and button "Add Element"</li>
            <li>CSS: Style container with border 1px solid black and padding 10px</li>
            <li>JS: Add new paragraph with text "New Element" when button is clicked</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="container"></div>
<button id="addBtn">Add Element</button>`,
        cssSolution: `#container {
  border: 1px solid black;
  padding: 10px;
  margin: 10px 0;
  min-height: 50px;
}

#addBtn {
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('addBtn').addEventListener('click', function() {
  let container = document.getElementById('container');
  let newParagraph = document.createElement('p');
  newParagraph.textContent = 'New Element';
  container.appendChild(newParagraph);
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="container">') && html.toLowerCase().includes('add element');
          const cssCheck = css.toLowerCase().includes('border: 1px solid black') && css.toLowerCase().includes('padding: 10px');
          const jsCheck = js.toLowerCase().includes('createelement') && js.toLowerCase().includes('appendchild');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-16': {
        title: 'Form Validation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Form Validation</h4>
          <p><strong>Instructions:</strong> Validate form input:</p>
          <ul>
            <li>HTML: Create input with id "emailInput" and button "Validate"</li>
            <li>CSS: Style input with padding 10px and button with background red</li>
            <li>JS: Check if input contains @ symbol, show validation message</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="emailInput" placeholder="Enter email">
<button id="validateBtn">Validate</button>
<div id="validationResult"></div>`,
        cssSolution: `#emailInput {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#validateBtn {
  padding: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('validateBtn').addEventListener('click', function() {
  let email = document.getElementById('emailInput').value;
  let result = document.getElementById('validationResult');
  
  if (email.includes('@')) {
    result.textContent = 'Valid email format!';
    result.style.color = 'green';
  } else {
    result.textContent = 'Invalid email format!';
    result.style.color = 'red';
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('input') && html.toLowerCase().includes('validate');
          const cssCheck = css.toLowerCase().includes('background: red') && css.toLowerCase().includes('padding: 10px');
          const jsCheck = js.toLowerCase().includes('includes(\'@\')') && js.toLowerCase().includes('textcontent');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-17': {
        title: 'CSS Class Manipulation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Class Manipulation</h4>
          <p><strong>Instructions:</strong> Add and remove CSS classes:</p>
          <ul>
            <li>HTML: Create div with id "box" and button "Toggle Color"</li>
            <li>CSS: Create .red-box class with background red and padding 20px</li>
            <li>JS: Toggle the red-box class on button click</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="box">This is a box</div>
<button id="toggleBtn">Toggle Color</button>`,
        cssSolution: `#box {
  padding: 20px;
  border: 1px solid black;
  margin: 10px 0;
}

.red-box {
  background: red;
  color: white;
}

#toggleBtn {
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('toggleBtn').addEventListener('click', function() {
  let box = document.getElementById('box');
  box.classList.toggle('red-box');
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="box">') && html.toLowerCase().includes('toggle color');
          const cssCheck = css.toLowerCase().includes('.red-box') && css.toLowerCase().includes('background: red');
          const jsCheck = js.toLowerCase().includes('classlist.toggle') && js.toLowerCase().includes('red-box');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-18': {
        title: 'Timer Functions',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Timer Functions</h4>
          <p><strong>Instructions:</strong> Use setTimeout and setInterval:</p>
          <ul>
            <li>HTML: Create button with id "startTimer" and div with id "timer"</li>
            <li>CSS: Style button with padding 10px and background green</li>
            <li>JS: Start a timer that updates every second for 5 seconds</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="startTimer">Start Timer</button>
<div id="timer">Timer: 0</div>`,
        cssSolution: `#startTimer {
  padding: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px;
}

#timer {
  margin: 10px 0;
  padding: 10px;
  background: lightgray;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('startTimer').addEventListener('click', function() {
  let seconds = 0;
  let timer = document.getElementById('timer');
  
  let interval = setInterval(function() {
    seconds++;
    timer.textContent = 'Timer: ' + seconds;
    
    if (seconds >= 5) {
      clearInterval(interval);
      timer.textContent = 'Timer finished!';
    }
  }, 1000);
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<button id="starttimer">start timer</button>');
          const cssCheck = css.toLowerCase().includes('background: green') && css.toLowerCase().includes('padding: 10px');
          const jsCheck = js.toLowerCase().includes('setinterval') && js.toLowerCase().includes('clearinterval');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-19': {
        title: 'Mouse Events',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Mouse Events</h4>
          <p><strong>Instructions:</strong> Handle mouse events:</p>
          <ul>
            <li>HTML: Create div with id "mouseBox" and div with id "mouseInfo"</li>
            <li>CSS: Style mouseBox with background lightblue and padding 50px</li>
            <li>JS: Show mouse coordinates when mouse moves over the box</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="mouseBox">Move mouse over me</div>
<div id="mouseInfo">Mouse coordinates will appear here</div>`,
        cssSolution: `#mouseBox {
  background: lightblue;
  padding: 50px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
}

#mouseInfo {
  margin: 10px 0;
  padding: 10px;
  background: lightgray;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('mouseBox').addEventListener('mousemove', function(event) {
  let mouseInfo = document.getElementById('mouseInfo');
  mouseInfo.textContent = 'Mouse X: ' + event.clientX + ', Mouse Y: ' + event.clientY;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<div id="mousebox">') && html.toLowerCase().includes('mouseinfo');
          const cssCheck = css.toLowerCase().includes('background: lightblue') && css.toLowerCase().includes('padding: 50px');
          const jsCheck = js.toLowerCase().includes('mousemove') && js.toLowerCase().includes('event.clientx');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-20': {
        title: 'Form Data',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Form Data</h4>
          <p><strong>Instructions:</strong> Collect form data:</p>
          <ul>
            <li>HTML: Create form with name input, age input, and submit button</li>
            <li>CSS: Style inputs with padding 8px and button with background purple</li>
            <li>JS: Prevent form submission and display collected data</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<form id="userForm">
  <input type="text" id="nameInput" placeholder="Enter name" required>
  <input type="number" id="ageInput" placeholder="Enter age" required>
  <button type="submit">Submit</button>
</form>
<div id="formResult"></div>`,
        cssSolution: `#userForm input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#userForm button {
  padding: 8px;
  background: purple;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}`,
        jsSolution: `document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  let name = document.getElementById('nameInput').value;
  let age = document.getElementById('ageInput').value;
  let result = document.getElementById('formResult');
  
  result.innerHTML = 'Name: ' + name + '<br>Age: ' + age;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<form') && html.toLowerCase().includes('type="submit"');
          const cssCheck = css.toLowerCase().includes('background: purple') && css.toLowerCase().includes('padding: 8px');
          const jsCheck = js.toLowerCase().includes('event.preventdefault') && js.toLowerCase().includes('submit');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-21': {
        title: 'Image Manipulation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Image Manipulation</h4>
          <p><strong>Instructions:</strong> Change image source dynamically:</p>
          <ul>
            <li>HTML: Create img with id "myImage" and button "Change Image"</li>
            <li>CSS: Style image with width 200px and button with background orange</li>
            <li>JS: Change image src between two different URLs on button click</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<img id="myImage" src="https://via.placeholder.com/200x150/blue" alt="Image">
<button id="changeBtn">Change Image</button>`,
        cssSolution: `#myImage {
  width: 200px;
  height: 150px;
  border: 2px solid black;
  margin: 10px 0;
}

#changeBtn {
  padding: 10px;
  background: orange;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `let isBlue = true;

document.getElementById('changeBtn').addEventListener('click', function() {
  let image = document.getElementById('myImage');
  
  if (isBlue) {
    image.src = 'https://via.placeholder.com/200x150/red';
  } else {
    image.src = 'https://via.placeholder.com/200x150/blue';
  }
  
  isBlue = !isBlue;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<img id="myimage"') && html.toLowerCase().includes('change image');
          const cssCheck = css.toLowerCase().includes('width: 200px') && css.toLowerCase().includes('background: orange');
          const jsCheck = js.toLowerCase().includes('image.src') && js.toLowerCase().includes('placeholder');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-22': {
        title: 'Text Content vs innerHTML',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Text Content vs innerHTML</h4>
          <p><strong>Instructions:</strong> Understand the difference between textContent and innerHTML:</p>
          <ul>
            <li>HTML: Create two divs with ids "textDiv" and "htmlDiv", and two buttons</li>
            <li>CSS: Style divs with background lightgray and padding 10px</li>
            <li>JS: Use textContent for one div and innerHTML for another with HTML tags</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="textDiv">Text will appear here</div>
<div id="htmlDiv">HTML will appear here</div>
<button id="textBtn">Set Text</button>
<button id="htmlBtn">Set HTML</button>`,
        cssSolution: `#textDiv, #htmlDiv {
  background: lightgray;
  padding: 10px;
  margin: 5px 0;
  border-radius: 3px;
}

#textBtn, #htmlBtn {
  padding: 8px;
  background: blue;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}`,
        jsSolution: `document.getElementById('textBtn').addEventListener('click', function() {
  document.getElementById('textDiv').textContent = '<strong>This is bold text</strong>';
});

document.getElementById('htmlBtn').addEventListener('click', function() {
  document.getElementById('htmlDiv').innerHTML = '<strong>This is bold text</strong>';
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('textdiv') && html.toLowerCase().includes('htmldiv');
          const cssCheck = css.toLowerCase().includes('background: lightgray') && css.toLowerCase().includes('padding: 10px');
          const jsCheck = js.toLowerCase().includes('textcontent') && js.toLowerCase().includes('innerhtml');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-23': {
        title: 'Number Operations',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Number Operations</h4>
          <p><strong>Instructions:</strong> Perform mathematical operations:</p>
          <ul>
            <li>HTML: Create two number inputs and buttons for +, -, *, / operations</li>
            <li>CSS: Style inputs and buttons with consistent padding and colors</li>
            <li>JS: Perform calculations and display results</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="number" id="num1" placeholder="First number">
<input type="number" id="num2" placeholder="Second number">
<button id="addBtn">+</button>
<button id="subBtn">-</button>
<button id="mulBtn">*</button>
<button id="divBtn">/</button>
<div id="result">Result will appear here</div>`,
        cssSolution: `input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 8px 12px;
  margin: 5px;
  background: blue;
  color: white;
  border: none;
  border-radius: 3px;
}

#result {
  margin: 10px 0;
  padding: 10px;
  background: lightgreen;
  border-radius: 3px;
}`,
        jsSolution: `function calculate(operation) {
  let num1 = parseFloat(document.getElementById('num1').value);
  let num2 = parseFloat(document.getElementById('num2').value);
  let result = document.getElementById('result');
  let answer;
  
  switch(operation) {
    case 'add': answer = num1 + num2; break;
    case 'sub': answer = num1 - num2; break;
    case 'mul': answer = num1 * num2; break;
    case 'div': answer = num1 / num2; break;
  }
  
  result.textContent = 'Result: ' + answer;
}

document.getElementById('addBtn').addEventListener('click', () => calculate('add'));
document.getElementById('subBtn').addEventListener('click', () => calculate('sub'));
document.getElementById('mulBtn').addEventListener('click', () => calculate('mul'));
document.getElementById('divBtn').addEventListener('click', () => calculate('div'));`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('type="number"') && html.toLowerCase().includes('result');
          const cssCheck = css.toLowerCase().includes('padding: 8px') && css.toLowerCase().includes('background: blue');
          const jsCheck = js.toLowerCase().includes('parsefloat') && js.toLowerCase().includes('switch');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-24': {
        title: 'Hide and Show Elements',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Hide and Show Elements</h4>
          <p><strong>Instructions:</strong> Toggle element visibility:</p>
          <ul>
            <li>HTML: Create div with content and button "Toggle Visibility"</li>
            <li>CSS: Style div with background lightblue and padding 20px</li>
            <li>JS: Hide and show the div by changing its display style</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="toggleDiv">This content can be hidden and shown</div>
<button id="toggleBtn">Toggle Visibility</button>`,
        cssSolution: `#toggleDiv {
  background: lightblue;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
}

#toggleBtn {
  padding: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('toggleBtn').addEventListener('click', function() {
  let div = document.getElementById('toggleDiv');
  
  if (div.style.display === 'none') {
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('togglediv') && html.toLowerCase().includes('toggle visibility');
          const cssCheck = css.toLowerCase().includes('background: lightblue') && css.toLowerCase().includes('padding: 20px');
          const jsCheck = js.toLowerCase().includes('style.display') && js.toLowerCase().includes('none');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-25': {
        title: 'List Manipulation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: List Manipulation</h4>
          <p><strong>Instructions:</strong> Add and remove list items:</p>
          <ul>
            <li>HTML: Create ul with id "todoList", input for new items, and two buttons</li>
            <li>CSS: Style list and buttons with appropriate colors</li>
            <li>JS: Add new items to list and remove last item</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<ul id="todoList">
  <li>Sample item 1</li>
  <li>Sample item 2</li>
</ul>
<input type="text" id="newItem" placeholder="Enter new item">
<button id="addBtn">Add Item</button>
<button id="removeBtn">Remove Last</button>`,
        cssSolution: `#todoList {
  background: lightyellow;
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
}

#newItem {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#addBtn {
  padding: 8px;
  background: green;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}

#removeBtn {
  padding: 8px;
  background: red;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}`,
        jsSolution: `document.getElementById('addBtn').addEventListener('click', function() {
  let newItemText = document.getElementById('newItem').value;
  if (newItemText.trim() !== '') {
    let list = document.getElementById('todoList');
    let newLi = document.createElement('li');
    newLi.textContent = newItemText;
    list.appendChild(newLi);
    document.getElementById('newItem').value = '';
  }
});

document.getElementById('removeBtn').addEventListener('click', function() {
  let list = document.getElementById('todoList');
  if (list.children.length > 0) {
    list.removeChild(list.lastElementChild);
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<ul id="todolist">') && html.toLowerCase().includes('add item');
          const cssCheck = css.toLowerCase().includes('background: green') && css.toLowerCase().includes('background: red');
          const jsCheck = js.toLowerCase().includes('createelement') && js.toLowerCase().includes('removechild');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-26': {
        title: 'Input Focus and Blur',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Input Focus and Blur</h4>
          <p><strong>Instructions:</strong> Handle input focus events:</p>
          <ul>
            <li>HTML: Create input with id "focusInput" and div for messages</li>
            <li>CSS: Style input with border changes and message div</li>
            <li>JS: Show different messages when input gains and loses focus</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="focusInput" placeholder="Click here to focus">
<div id="focusMessage">Focus status will appear here</div>`,
        cssSolution: `#focusInput {
  padding: 10px;
  margin: 10px 0;
  border: 2px solid gray;
  border-radius: 3px;
  font-size: 16px;
}

#focusInput:focus {
  border-color: blue;
  outline: none;
}

#focusMessage {
  padding: 10px;
  margin: 10px 0;
  background: lightgray;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('focusInput').addEventListener('focus', function() {
  document.getElementById('focusMessage').textContent = 'Input is focused! Start typing...';
  document.getElementById('focusMessage').style.background = 'lightgreen';
});

document.getElementById('focusInput').addEventListener('blur', function() {
  document.getElementById('focusMessage').textContent = 'Input lost focus.';
  document.getElementById('focusMessage').style.background = 'lightcoral';
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('focusinput') && html.toLowerCase().includes('focusmessage');
          const cssCheck = css.toLowerCase().includes(':focus') && css.toLowerCase().includes('border-color: blue');
          const jsCheck = js.toLowerCase().includes('focus') && js.toLowerCase().includes('blur');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-27': {
        title: 'Simple Animation',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Simple Animation</h4>
          <p><strong>Instructions:</strong> Create a simple moving animation:</p>
          <ul>
            <li>HTML: Create div with id "movingBox" and button "Start Animation"</li>
            <li>CSS: Style box with background red, width/height 50px</li>
            <li>JS: Move the box from left to right using setInterval</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="movingBox"></div>
<button id="animateBtn">Start Animation</button>`,
        cssSolution: `#movingBox {
  width: 50px;
  height: 50px;
  background: red;
  position: relative;
  left: 0px;
  margin: 20px 0;
}

#animateBtn {
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('animateBtn').addEventListener('click', function() {
  let box = document.getElementById('movingBox');
  let position = 0;
  
  let animation = setInterval(function() {
    position += 2;
    box.style.left = position + 'px';
    
    if (position >= 200) {
      clearInterval(animation);
    }
  }, 20);
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('movingbox') && html.toLowerCase().includes('start animation');
          const cssCheck = css.toLowerCase().includes('width: 50px') && css.toLowerCase().includes('position: relative');
          const jsCheck = js.toLowerCase().includes('setinterval') && js.toLowerCase().includes('style.left');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-28': {
        title: 'Color Picker',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Color Picker</h4>
          <p><strong>Instructions:</strong> Create a simple color picker:</p>
          <ul>
            <li>HTML: Create input type="color", div to show selected color</li>
            <li>CSS: Style the color display div with padding and border</li>
            <li>JS: Update div background color when color input changes</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="color" id="colorPicker" value="#ff0000">
<div id="colorDisplay">Selected color will be shown here</div>`,
        cssSolution: `#colorPicker {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 5px;
  margin: 10px 0;
}

#colorDisplay {
  width: 200px;
  height: 100px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 0;
  background: #ff0000;
  color: white;
  text-align: center;
  line-height: 60px;
}`,
        jsSolution: `document.getElementById('colorPicker').addEventListener('change', function() {
  let selectedColor = this.value;
  let display = document.getElementById('colorDisplay');
  
  display.style.background = selectedColor;
  display.textContent = 'Selected color: ' + selectedColor;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('type="color"') && html.toLowerCase().includes('colordisplay');
          const cssCheck = css.toLowerCase().includes('width: 200px') && css.toLowerCase().includes('border: 2px solid black');
          const jsCheck = js.toLowerCase().includes('change') && js.toLowerCase().includes('style.background');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-29': {
        title: 'Simple Calculator',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Simple Calculator</h4>
          <p><strong>Instructions:</strong> Build a basic calculator:</p>
          <ul>
            <li>HTML: Create display div and buttons for numbers 0-9 and basic operations</li>
            <li>CSS: Style calculator with grid layout and button styling</li>
            <li>JS: Handle button clicks to build and evaluate expressions</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="calculator">
  <div id="display">0</div>
  <button onclick="clearDisplay()">C</button>
  <button onclick="appendToDisplay('/')">/</button>
  <button onclick="appendToDisplay('*')">*</button>
  <button onclick="appendToDisplay('-')">-</button>
  <button onclick="appendToDisplay('7')">7</button>
  <button onclick="appendToDisplay('8')">8</button>
  <button onclick="appendToDisplay('9')">9</button>
  <button onclick="appendToDisplay('+')">+</button>
  <button onclick="appendToDisplay('4')">4</button>
  <button onclick="appendToDisplay('5')">5</button>
  <button onclick="appendToDisplay('6')">6</button>
  <button onclick="calculate()" rowspan="2">=</button>
  <button onclick="appendToDisplay('1')">1</button>
  <button onclick="appendToDisplay('2')">2</button>
  <button onclick="appendToDisplay('3')">3</button>
  <button onclick="appendToDisplay('0')">0</button>
</div>`,
        cssSolution: `#calculator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  width: 200px;
  margin: 20px auto;
}

#display {
  grid-column: span 4;
  background: black;
  color: white;
  padding: 10px;
  text-align: right;
  font-size: 18px;
  border-radius: 3px;
}

#calculator button {
  padding: 15px;
  background: lightgray;
  border: 1px solid gray;
  border-radius: 3px;
  cursor: pointer;
}`,
        jsSolution: `let currentInput = '0';

function appendToDisplay(value) {
  let display = document.getElementById('display');
  if (currentInput === '0') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = '0';
  document.getElementById('display').textContent = currentInput;
}

function calculate() {
  try {
    let result = eval(currentInput);
    currentInput = result.toString();
    document.getElementById('display').textContent = currentInput;
  } catch (error) {
    document.getElementById('display').textContent = 'Error';
    currentInput = '0';
  }
}`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('calculator') && html.toLowerCase().includes('onclick');
          const cssCheck = css.toLowerCase().includes('grid-template-columns') && css.toLowerCase().includes('span 4');
          const jsCheck = js.toLowerCase().includes('appendtodisplay') && js.toLowerCase().includes('eval');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-30': {
        title: 'Final Project - Interactive Quiz',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Final Project - Interactive Quiz</h4>
          <p><strong>Instructions:</strong> Create a complete interactive quiz:</p>
          <ul>
            <li>HTML: Create quiz structure with questions, options, and score display</li>
            <li>CSS: Style the quiz with attractive colors and layout</li>
            <li>JS: Implement quiz logic with score tracking and result display</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="quiz">
  <h2>JavaScript Quiz</h2>
  <div id="question">Question will appear here</div>
  <div id="options">
    <button class="option" onclick="selectAnswer(0)">Option A</button>
    <button class="option" onclick="selectAnswer(1)">Option B</button>
    <button class="option" onclick="selectAnswer(2)">Option C</button>
  </div>
  <button id="nextBtn" onclick="nextQuestion()">Next Question</button>
  <div id="score">Score: 0/0</div>
  <div id="result"></div>
</div>`,
        cssSolution: `#quiz {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: lightblue;
  border-radius: 10px;
  text-align: center;
}

#question {
  font-size: 18px;
  margin: 20px 0;
  padding: 15px;
  background: white;
  border-radius: 5px;
}

.option {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  background: lightgray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.option:hover {
  background: gray;
  color: white;
}

#nextBtn {
  margin: 20px 0;
  padding: 10px 20px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px;
}`,
        jsSolution: `const questions = [
  {
    question: "What does JS stand for?",
    options: ["JavaScript", "JavaSource", "JustScript"],
    correct: 0
  },
  {
    question: "Which is used for styling?",
    options: ["HTML", "CSS", "JavaScript"],
    correct: 1
  },
  {
    question: "What is used for interactivity?",
    options: ["CSS", "HTML", "JavaScript"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;

function loadQuestion() {
  if (currentQuestion < questions.length) {
    document.getElementById('question').textContent = questions[currentQuestion].question;
    let options = document.querySelectorAll('.option');
    for (let i = 0; i < options.length; i++) {
      options[i].textContent = questions[currentQuestion].options[i];
      options[i].style.background = 'lightgray';
    }
    selectedAnswer = -1;
  } else {
    showResult();
  }
}

function selectAnswer(index) {
  selectedAnswer = index;
  let options = document.querySelectorAll('.option');
  for (let i = 0; i < options.length; i++) {
    options[i].style.background = 'lightgray';
  }
  options[index].style.background = 'yellow';
}

function nextQuestion() {
  if (selectedAnswer === questions[currentQuestion].correct) {
    score++;
  }
  currentQuestion++;
  document.getElementById('score').textContent = 'Score: ' + score + '/' + currentQuestion;
  loadQuestion();
}

function showResult() {
  document.getElementById('question').textContent = 'Quiz Complete!';
  document.getElementById('options').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('result').textContent = 'Final Score: ' + score + '/' + questions.length;
}

loadQuestion();`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('quiz') && html.toLowerCase().includes('onclick="selectanswer');
          const cssCheck = css.toLowerCase().includes('.option') && css.toLowerCase().includes('cursor: pointer');
          const jsCheck = js.toLowerCase().includes('questions') && js.toLowerCase().includes('loadquestion') && js.toLowerCase().includes('score');
          return htmlCheck && cssCheck && jsCheck;
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
    
    const icon = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 9h6v6H9z"></path>';
    
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
      'beginner-1': 'Learn basic JavaScript syntax and create your first interactive element',
      'beginner-2': 'Work with variables and different data types in JavaScript',
      'beginner-3': 'Create and use functions to organize your code',
      'beginner-4': 'Learn to work with arrays and iterate through data',
      'beginner-5': 'Use conditional statements to control program flow',
      'beginner-6': 'Master loops to repeat code execution',
      'beginner-7': 'Create and manipulate JavaScript objects',
      'beginner-8': 'Learn string methods for text manipulation',
      'beginner-9': 'Use the Math object for mathematical operations',
      'beginner-10': 'Work with dates and times in JavaScript',
      'beginner-11': 'Handle different types of user events',
      'beginner-12': 'Store data locally in the browser',
      'beginner-13': 'Work with JSON data format',
      'beginner-14': 'Master basic array methods like push, pop, shift, unshift',
      'beginner-15': 'Manipulate DOM elements dynamically',
      'beginner-16': 'Validate form input with JavaScript',
      'beginner-17': 'Add and remove CSS classes dynamically',
      'beginner-18': 'Use setTimeout and setInterval for timing',
      'beginner-19': 'Handle mouse events and coordinates',
      'beginner-20': 'Collect and process form data',
      'beginner-21': 'Change image sources dynamically',
      'beginner-22': 'Understand textContent vs innerHTML',
      'beginner-23': 'Perform mathematical operations',
      'beginner-24': 'Hide and show elements with JavaScript',
      'beginner-25': 'Add and remove list items dynamically',
      'beginner-26': 'Handle input focus and blur events',
      'beginner-27': 'Create simple animations with JavaScript',
      'beginner-28': 'Build a color picker interface',
      'beginner-29': 'Create a functional calculator',
      'beginner-30': 'Build a complete interactive quiz application'
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
      editorContent: this.gameState.editorContent
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
    
    // Tab switching
    document.addEventListener('click', (e) => {
      if (e.target.closest('.tab-btn')) {
        const tabBtn = e.target.closest('.tab-btn');
        const tab = tabBtn.dataset.tab;
        this.switchTab(tab);
      }
    });
    
    // Code editors
    document.getElementById('htmlEditor').addEventListener('input', (e) => {
      if (this.currentTask) {
        if (!this.gameState.editorContent[this.currentTask]) {
          this.gameState.editorContent[this.currentTask] = {};
        }
        this.gameState.editorContent[this.currentTask].html = e.target.value;
        this.saveGameState();
        this.updateLivePreview();
      }
    });
    
    document.getElementById('cssEditor').addEventListener('input', (e) => {
      if (this.currentTask) {
        if (!this.gameState.editorContent[this.currentTask]) {
          this.gameState.editorContent[this.currentTask] = {};
        }
        this.gameState.editorContent[this.currentTask].css = e.target.value;
        this.saveGameState();
        this.updateLivePreview();
      }
    });
    
    document.getElementById('jsEditor').addEventListener('input', (e) => {
      if (this.currentTask) {
        if (!this.gameState.editorContent[this.currentTask]) {
          this.gameState.editorContent[this.currentTask] = {};
        }
        this.gameState.editorContent[this.currentTask].js = e.target.value;
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
  
  // Tab Management
  switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // Update editors
    document.querySelectorAll('.code-editor').forEach(editor => {
      editor.classList.remove('active');
    });
    document.getElementById(`${tab}Editor`).classList.add('active');
    
    this.gameState.currentTab = tab;
    this.saveGameState();
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
    
    // Load saved editor content or set default
    const savedContent = this.gameState.editorContent[taskId] || {};
    document.getElementById('htmlEditor').value = savedContent.html || '';
    document.getElementById('cssEditor').value = savedContent.css || '';
    document.getElementById('jsEditor').value = savedContent.js || '';
    
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
      showSolutionBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Show Solution
      `;
    } else if (failedAttempts >= 2) {
      showSolutionBtn.disabled = false;
      showSolutionBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Show Solution (-5 EXP)
      `;
    } else {
      showSolutionBtn.disabled = true;
      showSolutionBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Show Solution (${2 - failedAttempts} attempts left)
      `;
    }
  }
  
  // Code Validation and Submission
  validateCode() {
    if (!this.currentTask) {
      console.warn('No task is currently selected.');
      return;
    }

    const htmlCode = document.getElementById('htmlEditor').value.trim();
    const cssCode = document.getElementById('cssEditor').value.trim();
    const jsCode = document.getElementById('jsEditor').value.trim();
    const task = this.tasks[this.currentTask];
    const feedback = document.getElementById('validationFeedback');
    const submitBtn = document.getElementById('submitCode');
    
    if (!htmlCode && !cssCode && !jsCode) {
      this.showValidationFeedback('Please write some HTML, CSS, and JavaScript code first.', 'error');
      return;
    }
    
    const isValid = task.validate(htmlCode, cssCode, jsCode);
    
    if (isValid) {
      this.showValidationFeedback('Perfect! Your code is correct. Click Submit to earn EXP!', 'success');
      if (submitBtn) submitBtn.disabled = false;
    } else {
      // Track failed attempts
      const taskId = this.currentTask;
      this.gameState.failedAttempts[taskId] = (this.gameState.failedAttempts[taskId] || 0) + 1;
      this.saveGameState();
      
      this.showValidationFeedback('Your code doesn\'t match the expected output. Check the instructions and try again.', 'error');
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
        <p><strong>Here's the correct HTML:</strong></p>
        <pre><code>${task.htmlSolution.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <p><strong>Here's the correct CSS:</strong></p>
        <pre><code>${task.cssSolution.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <p><strong>Here's the correct JavaScript:</strong></p>
        <pre><code>${task.jsSolution.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
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
    
    // Show solution in editors
    document.getElementById('htmlEditor').value = task.htmlSolution;
    document.getElementById('cssEditor').value = task.cssSolution;
    document.getElementById('jsEditor').value = task.jsSolution;
    
    if (!this.gameState.editorContent[taskId]) {
      this.gameState.editorContent[taskId] = {};
    }
    this.gameState.editorContent[taskId].html = task.htmlSolution;
    this.gameState.editorContent[taskId].css = task.cssSolution;
    this.gameState.editorContent[taskId].js = task.jsSolution;
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
    const htmlCode = document.getElementById('htmlEditor').value;
    const cssCode = document.getElementById('cssEditor').value;
    const jsCode = document.getElementById('jsEditor').value;
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
      img.src = '3.png';
      
    } catch (error) {
      console.error('Error in downloadCertificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new JSLearningGame();
});
