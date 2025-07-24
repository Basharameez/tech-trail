// Game State Management
class JSLearningGame {
  constructor() {
    this.gameState = {
      exp: 0,
      completedTasks: new Set(),
      unlockedSolutions: new Set(),
      failedAttempts: {},
      theme: 'dark',
      editorContent: {},
      currentTab: 'html'
    };

    this.tasks = {
      // INTERMEDIATE TASKS (30 tasks - 10 EXP each)
      'beginner-1': {
        title: 'Arrow Functions',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Arrow Functions</h4>
          <p><strong>Instructions:</strong> Convert function expressions to arrow functions:</p>
          <ul>
            <li>HTML: Create button with id "convertBtn" and div with id "result"</li>
            <li>CSS: Style button with padding 10px and background #3b82f6</li>
            <li>JS: Create arrow function to multiply two numbers and display result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="convertBtn">Calculate</button>
<div id="result"></div>`,
        cssSolution: `#convertBtn {
  padding: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
}

#result {
  margin: 10px 0;
  padding: 10px;
  background: #f3f4f6;
  border-radius: 5px;
}`,
        jsSolution: `const multiply = (a, b) => a * b;

document.getElementById('convertBtn').addEventListener('click', () => {
  const result = multiply(5, 8);
  document.getElementById('result').textContent = 'Result: ' + result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('<button id="convertbtn">') && html.toLowerCase().includes('id="result"');
          const cssCheck = css.toLowerCase().includes('background: #3b82f6') && css.toLowerCase().includes('padding: 10px');
          const jsCheck = js.toLowerCase().includes('=>') && js.toLowerCase().includes('const multiply') && js.toLowerCase().includes('a * b');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-2': {
        title: 'Template Literals',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Template Literals</h4>
          <p><strong>Instructions:</strong> Use template literals for string interpolation:</p>
          <ul>
            <li>HTML: Create input for name, input for age, and button to generate greeting</li>
            <li>CSS: Style inputs with padding 8px and button with background #10b981</li>
            <li>JS: Use template literals to create personalized greeting message</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="nameInput" placeholder="Enter name">
<input type="number" id="ageInput" placeholder="Enter age">
<button id="greetBtn">Generate Greeting</button>
<div id="greeting"></div>`,
        cssSolution: `input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#greetBtn {
  padding: 8px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 3px;
}`,
        jsSolution: `document.getElementById('greetBtn').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value;
  const age = document.getElementById('ageInput').value;
  const message = \`Hello \${name}! You are \${age} years old.\`;
  document.getElementById('greeting').textContent = message;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('nameinput') && html.toLowerCase().includes('ageinput');
          const cssCheck = css.toLowerCase().includes('background: #10b981') && css.toLowerCase().includes('padding: 8px');
          const jsCheck = js.toLowerCase().includes('`') && js.toLowerCase().includes('${') && js.toLowerCase().includes('}');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-3': {
        title: 'Destructuring Assignment',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Destructuring Assignment</h4>
          <p><strong>Instructions:</strong> Use destructuring to extract values from arrays and objects:</p>
          <ul>
            <li>HTML: Create div with id "destructureResult"</li>
            <li>CSS: Style div with background #fbbf24 and padding 15px</li>
            <li>JS: Use array and object destructuring to extract and display values</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="destructureResult"></div>`,
        cssSolution: `#destructureResult {
  background: #fbbf24;
  padding: 15px;
  border-radius: 5px;
  color: #000;
}`,
        jsSolution: `const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;

const person = { name: 'Alice', age: 30, city: 'New York' };
const { name, age, city } = person;

const result = \`Colors: \${first}, \${second}, \${third}. Person: \${name}, \${age}, \${city}\`;
document.getElementById('destructureResult').textContent = result;`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('destructureresult');
          const cssCheck = css.toLowerCase().includes('background: #fbbf24') && css.toLowerCase().includes('padding: 15px');
          const jsCheck = js.toLowerCase().includes('[first, second, third]') && js.toLowerCase().includes('{ name, age, city }');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-4': {
        title: 'Spread Operator',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Spread Operator</h4>
          <p><strong>Instructions:</strong> Use spread operator to combine arrays and objects:</p>
          <ul>
            <li>HTML: Create button "Combine Arrays" and div for output</li>
            <li>CSS: Style button with background #8b5cf6 and padding 12px</li>
            <li>JS: Use spread operator to merge arrays and display result</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="combineBtn">Combine Arrays</button>
<div id="spreadResult"></div>`,
        cssSolution: `#combineBtn {
  padding: 12px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 5px;
}

#spreadResult {
  margin: 10px 0;
  padding: 10px;
  background: #e5e7eb;
  border-radius: 5px;
}`,
        jsSolution: `document.getElementById('combineBtn').addEventListener('click', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  const combined = [...arr1, ...arr2];
  
  document.getElementById('spreadResult').textContent = 'Combined: ' + combined.join(', ');
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('combinebtn') && html.toLowerCase().includes('spreadresult');
          const cssCheck = css.toLowerCase().includes('background: #8b5cf6') && css.toLowerCase().includes('padding: 12px');
          const jsCheck = js.toLowerCase().includes('...arr1') && js.toLowerCase().includes('...arr2');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-5': {
        title: 'Rest Parameters',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Rest Parameters</h4>
          <p><strong>Instructions:</strong> Use rest parameters to handle variable number of arguments:</p>
          <ul>
            <li>HTML: Create button "Calculate Sum" and div for result</li>
            <li>CSS: Style button with background #ef4444 and padding 10px</li>
            <li>JS: Create function with rest parameters to sum multiple numbers</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="sumBtn">Calculate Sum</button>
<div id="sumResult"></div>`,
        cssSolution: `#sumBtn {
  padding: 10px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 5px;
}

#sumResult {
  margin: 10px 0;
  padding: 10px;
  background: #fef3c7;
  border-radius: 5px;
}`,
        jsSolution: `const sum = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};

document.getElementById('sumBtn').addEventListener('click', () => {
  const result = sum(1, 2, 3, 4, 5);
  document.getElementById('sumResult').textContent = 'Sum: ' + result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('sumbtn') && html.toLowerCase().includes('sumresult');
          const cssCheck = css.toLowerCase().includes('background: #ef4444') && css.toLowerCase().includes('padding: 10px');
          const jsCheck = js.toLowerCase().includes('...numbers') && js.toLowerCase().includes('reduce');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-6': {
        title: 'Array Methods: map()',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Array Methods - map()</h4>
          <p><strong>Instructions:</strong> Use map() to transform array elements:</p>
          <ul>
            <li>HTML: Create button "Double Numbers" and ul for results</li>
            <li>CSS: Style button with background #06b6d4 and list with background #ecfdf5</li>
            <li>JS: Use map() to double each number in array and display as list items</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="mapBtn">Double Numbers</button>
<ul id="mapList"></ul>`,
        cssSolution: `#mapBtn {
  padding: 10px;
  background: #06b6d4;
  color: white;
  border: none;
  border-radius: 5px;
}

#mapList {
  background: #ecfdf5;
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
}`,
        jsSolution: `document.getElementById('mapBtn').addEventListener('click', () => {
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => num * 2);
  
  const list = document.getElementById('mapList');
  list.innerHTML = '';
  doubled.forEach(num => {
    const li = document.createElement('li');
    li.textContent = num;
    list.appendChild(li);
  });
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('mapbtn') && html.toLowerCase().includes('<ul id="maplist">');
          const cssCheck = css.toLowerCase().includes('background: #06b6d4') && css.toLowerCase().includes('background: #ecfdf5');
          const jsCheck = js.toLowerCase().includes('.map(') && js.toLowerCase().includes('num * 2');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-7': {
        title: 'Array Methods: filter()',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Array Methods - filter()</h4>
          <p><strong>Instructions:</strong> Use filter() to find elements that meet criteria:</p>
          <ul>
            <li>HTML: Create button "Filter Even Numbers" and div for results</li>
            <li>CSS: Style button with background #f59e0b and div with background #ddd6fe</li>
            <li>JS: Use filter() to get only even numbers from array</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="filterBtn">Filter Even Numbers</button>
<div id="filterResult"></div>`,
        cssSolution: `#filterBtn {
  padding: 10px;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 5px;
}

#filterResult {
  background: #ddd6fe;
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
}`,
        jsSolution: `document.getElementById('filterBtn').addEventListener('click', () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  
  document.getElementById('filterResult').textContent = 'Even numbers: ' + evenNumbers.join(', ');
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('filterbtn') && html.toLowerCase().includes('filterresult');
          const cssCheck = css.toLowerCase().includes('background: #f59e0b') && css.toLowerCase().includes('background: #ddd6fe');
          const jsCheck = js.toLowerCase().includes('.filter(') && js.toLowerCase().includes('% 2 === 0');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-8': {
        title: 'Array Methods: reduce()',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Array Methods - reduce()</h4>
          <p><strong>Instructions:</strong> Use reduce() to accumulate array values:</p>
          <ul>
            <li>HTML: Create button "Calculate Total" and div for result</li>
            <li>CSS: Style button with background #84cc16 and div with background #fef2f2</li>
            <li>JS: Use reduce() to calculate sum of all numbers in array</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="reduceBtn">Calculate Total</button>
<div id="reduceResult"></div>`,
        cssSolution: `#reduceBtn {
  padding: 10px;
  background: #84cc16;
  color: white;
  border: none;
  border-radius: 5px;
}

#reduceResult {
  background: #fef2f2;
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
}`,
        jsSolution: `document.getElementById('reduceBtn').addEventListener('click', () => {
  const numbers = [10, 20, 30, 40, 50];
  const total = numbers.reduce((sum, num) => sum + num, 0);
  
  document.getElementById('reduceResult').textContent = 'Total: ' + total;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('reducebtn') && html.toLowerCase().includes('reduceresult');
          const cssCheck = css.toLowerCase().includes('background: #84cc16') && css.toLowerCase().includes('background: #fef2f2');
          const jsCheck = js.toLowerCase().includes('.reduce(') && js.toLowerCase().includes('sum + num');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-9': {
        title: 'Object Methods',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Object Methods</h4>
          <p><strong>Instructions:</strong> Use Object.keys(), Object.values(), and Object.entries():</p>
          <ul>
            <li>HTML: Create button "Analyze Object" and div for output</li>
            <li>CSS: Style button with background #6366f1 and div with background #f0fdf4</li>
            <li>JS: Use Object methods to extract keys, values, and entries from object</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="objectBtn">Analyze Object</button>
<div id="objectResult"></div>`,
        cssSolution: `#objectBtn {
  padding: 10px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 5px;
}

#objectResult {
  background: #f0fdf4;
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
  font-family: monospace;
}`,
        jsSolution: `document.getElementById('objectBtn').addEventListener('click', () => {
  const person = { name: 'John', age: 25, city: 'Boston' };
  
  const keys = Object.keys(person);
  const values = Object.values(person);
  const entries = Object.entries(person);
  
  const result = \`Keys: \${keys.join(', ')}\\nValues: \${values.join(', ')}\\nEntries: \${entries.map(entry => entry.join(': ')).join(', ')}\`;
  document.getElementById('objectResult').textContent = result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('objectbtn') && html.toLowerCase().includes('objectresult');
          const cssCheck = css.toLowerCase().includes('background: #6366f1') && css.toLowerCase().includes('background: #f0fdf4');
          const jsCheck = js.toLowerCase().includes('object.keys') && js.toLowerCase().includes('object.values') && js.toLowerCase().includes('object.entries');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-10': {
        title: 'Default Parameters',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Default Parameters</h4>
          <p><strong>Instructions:</strong> Create functions with default parameter values:</p>
          <ul>
            <li>HTML: Create input for name, button "Greet", and div for greeting</li>
            <li>CSS: Style input and button with consistent styling</li>
            <li>JS: Create function with default parameter for greeting message</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="nameInput" placeholder="Enter name (optional)">
<button id="greetBtn">Greet</button>
<div id="greetingOutput"></div>`,
        cssSolution: `#nameInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#greetBtn {
  padding: 8px;
  background: #ec4899;
  color: white;
  border: none;
  border-radius: 3px;
}

#greetingOutput {
  margin: 10px 0;
  padding: 10px;
  background: #fef7ff;
  border-radius: 5px;
}`,
        jsSolution: `const greet = (name = 'Friend') => {
  return \`Hello, \${name}! Welcome to our website.\`;
};

document.getElementById('greetBtn').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value.trim();
  const greeting = greet(name || undefined);
  document.getElementById('greetingOutput').textContent = greeting;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('nameinput') && html.toLowerCase().includes('greetingoutput');
          const cssCheck = css.toLowerCase().includes('background: #ec4899') && css.toLowerCase().includes('background: #fef7ff');
          const jsCheck = js.toLowerCase().includes('name = \'friend\'') && js.toLowerCase().includes('greet(');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-11': {
        title: 'Promises Basics',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Promises Basics</h4>
          <p><strong>Instructions:</strong> Create and handle basic promises:</p>
          <ul>
            <li>HTML: Create button "Fetch Data" and div for status</li>
            <li>CSS: Style button with background #14b8a6 and status div</li>
            <li>JS: Create promise that resolves after 2 seconds with success message</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="fetchBtn">Fetch Data</button>
<div id="status">Ready to fetch...</div>`,
        cssSolution: `#fetchBtn {
  padding: 10px;
  background: #14b8a6;
  color: white;
  border: none;
  border-radius: 5px;
}

#status {
  margin: 10px 0;
  padding: 10px;
  background: #f3f4f6;
  border-radius: 5px;
  border-left: 4px solid #14b8a6;
}`,
        jsSolution: `const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 2000);
  });
};

document.getElementById('fetchBtn').addEventListener('click', () => {
  document.getElementById('status').textContent = 'Fetching data...';
  
  fetchData()
    .then(message => {
      document.getElementById('status').textContent = message;
    })
    .catch(error => {
      document.getElementById('status').textContent = 'Error: ' + error;
    });
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('fetchbtn') && html.toLowerCase().includes('status');
          const cssCheck = css.toLowerCase().includes('background: #14b8a6') && css.toLowerCase().includes('border-left');
          const jsCheck = js.toLowerCase().includes('new promise') && js.toLowerCase().includes('.then(') && js.toLowerCase().includes('settimeout');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-12': {
        title: 'Async/Await',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Async/Await</h4>
          <p><strong>Instructions:</strong> Use async/await syntax for handling promises:</p>
          <ul>
            <li>HTML: Create button "Load Data" and div for result</li>
            <li>CSS: Style button with background #7c3aed and result div</li>
            <li>JS: Create async function using await to handle promise</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="loadBtn">Load Data</button>
<div id="loadResult">Click to load data...</div>`,
        cssSolution: `#loadBtn {
  padding: 10px;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 5px;
}

#loadResult {
  margin: 10px 0;
  padding: 10px;
  background: #ede9fe;
  border-radius: 5px;
}`,
        jsSolution: `const loadData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Data loaded with async/await!');
    }, 1500);
  });
};

const handleLoad = async () => {
  try {
    document.getElementById('loadResult').textContent = 'Loading...';
    const result = await loadData();
    document.getElementById('loadResult').textContent = result;
  } catch (error) {
    document.getElementById('loadResult').textContent = 'Error: ' + error;
  }
};

document.getElementById('loadBtn').addEventListener('click', handleLoad);`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('loadbtn') && html.toLowerCase().includes('loadresult');
          const cssCheck = css.toLowerCase().includes('background: #7c3aed') && css.toLowerCase().includes('background: #ede9fe');
          const jsCheck = js.toLowerCase().includes('async') && js.toLowerCase().includes('await') && js.toLowerCase().includes('try');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-13': {
        title: 'Classes and Constructors',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Classes and Constructors</h4>
          <p><strong>Instructions:</strong> Create ES6 class with constructor and methods:</p>
          <ul>
            <li>HTML: Create button "Create Person" and div for person info</li>
            <li>CSS: Style button with background #059669 and info div</li>
            <li>JS: Create Person class with constructor and introduce method</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="createBtn">Create Person</button>
<div id="personInfo"></div>`,
        cssSolution: `#createBtn {
  padding: 10px;
  background: #059669;
  color: white;
  border: none;
  border-radius: 5px;
}

#personInfo {
  margin: 10px 0;
  padding: 15px;
  background: #f0fdfa;
  border-radius: 5px;
  border: 1px solid #059669;
}`,
        jsSolution: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return \`Hi, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
}

document.getElementById('createBtn').addEventListener('click', () => {
  const person = new Person('Alice', 28);
  document.getElementById('personInfo').textContent = person.introduce();
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('createbtn') && html.toLowerCase().includes('personinfo');
          const cssCheck = css.toLowerCase().includes('background: #059669') && css.toLowerCase().includes('background: #f0fdfa');
          const jsCheck = js.toLowerCase().includes('class person') && js.toLowerCase().includes('constructor') && js.toLowerCase().includes('introduce()');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-14': {
        title: 'Class Inheritance',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Class Inheritance</h4>
          <p><strong>Instructions:</strong> Create child class that extends parent class:</p>
          <ul>
            <li>HTML: Create button "Create Student" and div for student info</li>
            <li>CSS: Style button with background #dc2626 and info div</li>
            <li>JS: Create Student class that extends Person with additional properties</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="studentBtn">Create Student</button>
<div id="studentInfo"></div>`,
        cssSolution: `#studentBtn {
  padding: 10px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 5px;
}

#studentInfo {
  margin: 10px 0;
  padding: 15px;
  background: #fef2f2;
  border-radius: 5px;
  border: 1px solid #dc2626;
}`,
        jsSolution: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return \`Hi, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    return \`\${this.name} is studying in grade \${this.grade}.\`;
  }
}

document.getElementById('studentBtn').addEventListener('click', () => {
  const student = new Student('Bob', 16, 10);
  const info = student.introduce() + ' ' + student.study();
  document.getElementById('studentInfo').textContent = info;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('studentbtn') && html.toLowerCase().includes('studentinfo');
          const cssCheck = css.toLowerCase().includes('background: #dc2626') && css.toLowerCase().includes('background: #fef2f2');
          const jsCheck = js.toLowerCase().includes('extends person') && js.toLowerCase().includes('super(') && js.toLowerCase().includes('study()');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-15': {
        title: 'Set Data Structure',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Set Data Structure</h4>
          <p><strong>Instructions:</strong> Use Set to store unique values:</p>
          <ul>
            <li>HTML: Create input for numbers, button "Add to Set", and div for display</li>
            <li>CSS: Style input and button with background #0891b2</li>
            <li>JS: Use Set to store unique numbers and display them</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="number" id="numberInput" placeholder="Enter number">
<button id="addSetBtn">Add to Set</button>
<div id="setDisplay">Set: empty</div>`,
        cssSolution: `#numberInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#addSetBtn {
  padding: 8px;
  background: #0891b2;
  color: white;
  border: none;
  border-radius: 3px;
}

#setDisplay {
  margin: 10px 0;
  padding: 10px;
  background: #cffafe;
  border-radius: 5px;
}`,
        jsSolution: `const numberSet = new Set();

document.getElementById('addSetBtn').addEventListener('click', () => {
  const number = parseInt(document.getElementById('numberInput').value);
  
  if (!isNaN(number)) {
    numberSet.add(number);
    const setArray = Array.from(numberSet);
    document.getElementById('setDisplay').textContent = 'Set: ' + setArray.join(', ');
    document.getElementById('numberInput').value = '';
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('numberinput') && html.toLowerCase().includes('addsetbtn');
          const cssCheck = css.toLowerCase().includes('background: #0891b2') && css.toLowerCase().includes('background: #cffafe');
          const jsCheck = js.toLowerCase().includes('new set()') && js.toLowerCase().includes('.add(') && js.toLowerCase().includes('array.from');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-16': {
        title: 'Map Data Structure',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Map Data Structure</h4>
          <p><strong>Instructions:</strong> Use Map to store key-value pairs:</p>
          <ul>
            <li>HTML: Create inputs for key and value, button "Add to Map", and div for display</li>
            <li>CSS: Style inputs and button with background #7c2d12</li>
            <li>JS: Use Map to store and display key-value pairs</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="keyInput" placeholder="Enter key">
<input type="text" id="valueInput" placeholder="Enter value">
<button id="addMapBtn">Add to Map</button>
<div id="mapDisplay">Map: empty</div>`,
        cssSolution: `input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#addMapBtn {
  padding: 8px;
  background: #7c2d12;
  color: white;
  border: none;
  border-radius: 3px;
}

#mapDisplay {
  margin: 10px 0;
  padding: 10px;
  background: #fef7ed;
  border-radius: 5px;
}`,
        jsSolution: `const dataMap = new Map();

document.getElementById('addMapBtn').addEventListener('click', () => {
  const key = document.getElementById('keyInput').value.trim();
  const value = document.getElementById('valueInput').value.trim();
  
  if (key && value) {
    dataMap.set(key, value);
    const mapEntries = Array.from(dataMap.entries());
    const display = mapEntries.map(([k, v]) => \`\${k}: \${v}\`).join(', ');
    document.getElementById('mapDisplay').textContent = 'Map: ' + display;
    
    document.getElementById('keyInput').value = '';
    document.getElementById('valueInput').value = '';
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('keyinput') && html.toLowerCase().includes('valueinput');
          const cssCheck = css.toLowerCase().includes('background: #7c2d12') && css.toLowerCase().includes('background: #fef7ed');
          const jsCheck = js.toLowerCase().includes('new map()') && js.toLowerCase().includes('.set(') && js.toLowerCase().includes('.entries()');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-17': {
        title: 'WeakMap and WeakSet',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: WeakMap and WeakSet</h4>
          <p><strong>Instructions:</strong> Understand WeakMap for object metadata:</p>
          <ul>
            <li>HTML: Create button "Create Objects" and div for demonstration</li>
            <li>CSS: Style button with background #be185d and demo div</li>
            <li>JS: Use WeakMap to store metadata for objects</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="weakBtn">Create Objects</button>
<div id="weakDemo"></div>`,
        cssSolution: `#weakBtn {
  padding: 10px;
  background: #be185d;
  color: white;
  border: none;
  border-radius: 5px;
}

#weakDemo {
  margin: 10px 0;
  padding: 15px;
  background: #fdf2f8;
  border-radius: 5px;
  font-family: monospace;
}`,
        jsSolution: `const metadata = new WeakMap();

document.getElementById('weakBtn').addEventListener('click', () => {
  const user1 = { name: 'Alice' };
  const user2 = { name: 'Bob' };
  
  metadata.set(user1, { lastLogin: '2024-01-15', visits: 5 });
  metadata.set(user2, { lastLogin: '2024-01-16', visits: 3 });
  
  const info1 = metadata.get(user1);
  const info2 = metadata.get(user2);
  
  const result = \`User 1 metadata: \${JSON.stringify(info1)}\\nUser 2 metadata: \${JSON.stringify(info2)}\`;
  document.getElementById('weakDemo').textContent = result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('weakbtn') && html.toLowerCase().includes('weakdemo');
          const cssCheck = css.toLowerCase().includes('background: #be185d') && css.toLowerCase().includes('background: #fdf2f8');
          const jsCheck = js.toLowerCase().includes('new weakmap()') && js.toLowerCase().includes('metadata.set') && js.toLowerCase().includes('metadata.get');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-18': {
        title: 'Symbol Primitive',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Symbol Primitive</h4>
          <p><strong>Instructions:</strong> Use Symbol for unique property keys:</p>
          <ul>
            <li>HTML: Create button "Create Symbols" and div for output</li>
            <li>CSS: Style button with background #365314 and output div</li>
            <li>JS: Create and use symbols as object property keys</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="symbolBtn">Create Symbols</button>
<div id="symbolOutput"></div>`,
        cssSolution: `#symbolBtn {
  padding: 10px;
  background: #365314;
  color: white;
  border: none;
  border-radius: 5px;
}

#symbolOutput {
  margin: 10px 0;
  padding: 15px;
  background: #f7fee7;
  border-radius: 5px;
  font-family: monospace;
}`,
        jsSolution: `document.getElementById('symbolBtn').addEventListener('click', () => {
  const id = Symbol('id');
  const secret = Symbol('secret');
  
  const user = {
    name: 'John',
    [id]: 12345,
    [secret]: 'hidden-value'
  };
  
  const result = \`Name: \${user.name}\\nID (Symbol): \${user[id]}\\nSecret (Symbol): \${user[secret]}\\nSymbol description: \${id.description}\`;
  document.getElementById('symbolOutput').textContent = result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('symbolbtn') && html.toLowerCase().includes('symboloutput');
          const cssCheck = css.toLowerCase().includes('background: #365314') && css.toLowerCase().includes('background: #f7fee7');
          const jsCheck = js.toLowerCase().includes('symbol(') && js.toLowerCase().includes('[id]') && js.toLowerCase().includes('.description');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-19': {
        title: 'Generators',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Generators</h4>
          <p><strong>Instructions:</strong> Create generator function with yield:</p>
          <ul>
            <li>HTML: Create button "Generate Numbers" and div for sequence</li>
            <li>CSS: Style button with background #4338ca and sequence div</li>
            <li>JS: Create generator function that yields numbers in sequence</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="genBtn">Generate Numbers</button>
<div id="sequence"></div>`,
        cssSolution: `#genBtn {
  padding: 10px;
  background: #4338ca;
  color: white;
  border: none;
  border-radius: 5px;
}

#sequence {
  margin: 10px 0;
  padding: 15px;
  background: #eef2ff;
  border-radius: 5px;
}`,
        jsSolution: `function* numberGenerator() {
  let num = 1;
  while (num <= 5) {
    yield num;
    num++;
  }
}

document.getElementById('genBtn').addEventListener('click', () => {
  const gen = numberGenerator();
  const numbers = [];
  
  for (const num of gen) {
    numbers.push(num);
  }
  
  document.getElementById('sequence').textContent = 'Generated sequence: ' + numbers.join(', ');
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('genbtn') && html.toLowerCase().includes('sequence');
          const cssCheck = css.toLowerCase().includes('background: #4338ca') && css.toLowerCase().includes('background: #eef2ff');
          const jsCheck = js.toLowerCase().includes('function*') && js.toLowerCase().includes('yield') && js.toLowerCase().includes('numbergenerator()');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-20': {
        title: 'Iterators and for...of',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Iterators and for...of</h4>
          <p><strong>Instructions:</strong> Use for...of loop with different iterables:</p>
          <ul>
            <li>HTML: Create button "Iterate Data" and div for results</li>
            <li>CSS: Style button with background #b91c1c and results div</li>
            <li>JS: Use for...of to iterate through array, string, and set</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="iterateBtn">Iterate Data</button>
<div id="iterateResults"></div>`,
        cssSolution: `#iterateBtn {
  padding: 10px;
  background: #b91c1c;
  color: white;
  border: none;
  border-radius: 5px;
}

#iterateResults {
  margin: 10px 0;
  padding: 15px;
  background: #fef2f2;
  border-radius: 5px;
  white-space: pre-line;
}`,
        jsSolution: `document.getElementById('iterateBtn').addEventListener('click', () => {
  const array = [1, 2, 3];
  const string = 'Hello';
  const set = new Set(['a', 'b', 'c']);
  
  let results = 'Array iteration: ';
  for (const item of array) {
    results += item + ' ';
  }
  
  results += '\\nString iteration: ';
  for (const char of string) {
    results += char + ' ';
  }
  
  results += '\\nSet iteration: ';
  for (const item of set) {
    results += item + ' ';
  }
  
  document.getElementById('iterateResults').textContent = results;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('iteratebtn') && html.toLowerCase().includes('iterateresults');
          const cssCheck = css.toLowerCase().includes('background: #b91c1c') && css.toLowerCase().includes('background: #fef2f2');
          const jsCheck = js.toLowerCase().includes('for (const') && js.toLowerCase().includes('of array') && js.toLowerCase().includes('of string');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-21': {
        title: 'Proxy Objects',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Proxy Objects</h4>
          <p><strong>Instructions:</strong> Create proxy to intercept object operations:</p>
          <ul>
            <li>HTML: Create button "Test Proxy" and div for proxy demo</li>
            <li>CSS: Style button with background #0f766e and demo div</li>
            <li>JS: Create proxy with get and set handlers</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="proxyBtn">Test Proxy</button>
<div id="proxyDemo"></div>`,
        cssSolution: `#proxyBtn {
  padding: 10px;
  background: #0f766e;
  color: white;
  border: none;
  border-radius: 5px;
}

#proxyDemo {
  margin: 10px 0;
  padding: 15px;
  background: #f0fdfa;
  border-radius: 5px;
  font-family: monospace;
}`,
        jsSolution: `document.getElementById('proxyBtn').addEventListener('click', () => {
  const target = { name: 'Alice', age: 25 };
  
  const handler = {
    get(obj, prop) {
      return prop in obj ? obj[prop] : 'Property not found';
    },
    set(obj, prop, value) {
      if (prop === 'age' && value < 0) {
        throw new Error('Age cannot be negative');
      }
      obj[prop] = value;
      return true;
    }
  };
  
  const proxy = new Proxy(target, handler);
  
  const result = \`Name: \${proxy.name}\\nAge: \${proxy.age}\\nUnknown: \${proxy.unknown}\`;
  document.getElementById('proxyDemo').textContent = result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('proxybtn') && html.toLowerCase().includes('proxydemo');
          const cssCheck = css.toLowerCase().includes('background: #0f766e') && css.toLowerCase().includes('background: #f0fdfa');
          const jsCheck = js.toLowerCase().includes('new proxy') && js.toLowerCase().includes('get(obj, prop)') && js.toLowerCase().includes('set(obj, prop, value)');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-22': {
        title: 'Modules - Import/Export',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Modules - Import/Export</h4>
          <p><strong>Instructions:</strong> Simulate module system with functions:</p>
          <ul>
            <li>HTML: Create button "Use Modules" and div for module demo</li>
            <li>CSS: Style button with background #a21caf and demo div</li>
            <li>JS: Create utility functions and demonstrate module-like structure</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="moduleBtn">Use Modules</button>
<div id="moduleDemo"></div>`,
        cssSolution: `#moduleBtn {
  padding: 10px;
  background: #a21caf;
  color: white;
  border: none;
  border-radius: 5px;
}

#moduleDemo {
  margin: 10px 0;
  padding: 15px;
  background: #fdf4ff;
  border-radius: 5px;
}`,
        jsSolution: `// Simulating a math module
const MathUtils = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  PI: 3.14159
};

// Simulating a string module
const StringUtils = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  reverse: (str) => str.split('').reverse().join('')
};

document.getElementById('moduleBtn').addEventListener('click', () => {
  const sum = MathUtils.add(5, 3);
  const product = MathUtils.multiply(4, 7);
  const capitalized = StringUtils.capitalize('hello');
  const reversed = StringUtils.reverse('world');
  
  const result = \`Math: \${sum}, \${product}\\nString: \${capitalized}, \${reversed}\\nPI: \${MathUtils.PI}\`;
  document.getElementById('moduleDemo').textContent = result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('modulebtn') && html.toLowerCase().includes('moduledemo');
          const cssCheck = css.toLowerCase().includes('background: #a21caf') && css.toLowerCase().includes('background: #fdf4ff');
          const jsCheck = js.toLowerCase().includes('mathutils') && js.toLowerCase().includes('stringutils') && js.toLowerCase().includes('capitalize');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-23': {
        title: 'Regular Expressions',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Regular Expressions</h4>
          <p><strong>Instructions:</strong> Use regex for pattern matching and validation:</p>
          <ul>
            <li>HTML: Create input for email, button "Validate Email", and div for result</li>
            <li>CSS: Style input and button with background #ea580c</li>
            <li>JS: Use regex to validate email format and extract parts</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="emailInput" placeholder="Enter email address">
<button id="validateBtn">Validate Email</button>
<div id="regexResult"></div>`,
        cssSolution: `#emailInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 200px;
}

#validateBtn {
  padding: 8px;
  background: #ea580c;
  color: white;
  border: none;
  border-radius: 3px;
}

#regexResult {
  margin: 10px 0;
  padding: 10px;
  background: #fff7ed;
  border-radius: 5px;
}`,
        jsSolution: `document.getElementById('validateBtn').addEventListener('click', () => {
  const email = document.getElementById('emailInput').value;
  const emailRegex = /^([a-zA-Z0-9._%-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  
  const match = email.match(emailRegex);
  
  if (match) {
    const [fullMatch, username, domain] = match;
    const result = \`Valid email!\\nUsername: \${username}\\nDomain: \${domain}\`;
    document.getElementById('regexResult').textContent = result;
  } else {
    document.getElementById('regexResult').textContent = 'Invalid email format!';
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('emailinput') && html.toLowerCase().includes('validatebtn');
          const cssCheck = css.toLowerCase().includes('background: #ea580c') && css.toLowerCase().includes('background: #fff7ed');
          const jsCheck = js.toLowerCase().includes('emailregex') && js.toLowerCase().includes('.match(') && js.toLowerCase().includes('/^');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-24': {
        title: 'Error Handling - try/catch',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Error Handling - try/catch</h4>
          <p><strong>Instructions:</strong> Implement proper error handling:</p>
          <ul>
            <li>HTML: Create input for JSON, button "Parse JSON", and div for result</li>
            <li>CSS: Style button with background #991b1b and result div</li>
            <li>JS: Use try/catch to handle JSON parsing errors gracefully</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<textarea id="jsonInput" placeholder='Enter JSON: {"name": "John", "age": 30}' rows="3" cols="40"></textarea>
<button id="parseBtn">Parse JSON</button>
<div id="parseResult"></div>`,
        cssSolution: `#jsonInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: monospace;
}

#parseBtn {
  padding: 8px;
  background: #991b1b;
  color: white;
  border: none;
  border-radius: 3px;
}

#parseResult {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
}

.success {
  background: #f0fdf4;
  border: 1px solid #16a34a;
  color: #16a34a;
}

.error {
  background: #fef2f2;
  border: 1px solid #dc2626;
  color: #dc2626;
}`,
        jsSolution: `document.getElementById('parseBtn').addEventListener('click', () => {
  const jsonString = document.getElementById('jsonInput').value;
  const resultDiv = document.getElementById('parseResult');
  
  try {
    const parsed = JSON.parse(jsonString);
    resultDiv.className = 'success';
    resultDiv.textContent = 'Successfully parsed: ' + JSON.stringify(parsed, null, 2);
  } catch (error) {
    resultDiv.className = 'error';
    resultDiv.textContent = 'Error parsing JSON: ' + error.message;
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('jsoninput') && html.toLowerCase().includes('parsebtn');
          const cssCheck = css.toLowerCase().includes('background: #991b1b') && css.toLowerCase().includes('.success') && css.toLowerCase().includes('.error');
          const jsCheck = js.toLowerCase().includes('try {') && js.toLowerCase().includes('catch (error)') && js.toLowerCase().includes('json.parse');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-25': {
        title: 'Custom Errors',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Custom Errors</h4>
          <p><strong>Instructions:</strong> Create and throw custom error classes:</p>
          <ul>
            <li>HTML: Create input for age, button "Validate Age", and div for result</li>
            <li>CSS: Style button with background #1e40af and result div</li>
            <li>JS: Create custom ValidationError class and throw it for invalid input</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="number" id="ageInput" placeholder="Enter age (18-100)">
<button id="validateAgeBtn">Validate Age</button>
<div id="ageResult"></div>`,
        cssSolution: `#ageInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#validateAgeBtn {
  padding: 8px;
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 3px;
}

#ageResult {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
}`,
        jsSolution: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateAge(age) {
  if (age < 18) {
    throw new ValidationError('Age must be at least 18');
  }
  if (age > 100) {
    throw new ValidationError('Age must be less than 100');
  }
  return true;
}

document.getElementById('validateAgeBtn').addEventListener('click', () => {
  const age = parseInt(document.getElementById('ageInput').value);
  const resultDiv = document.getElementById('ageResult');
  
  try {
    validateAge(age);
    resultDiv.style.background = '#f0fdf4';
    resultDiv.style.color = '#16a34a';
    resultDiv.textContent = 'Valid age: ' + age;
  } catch (error) {
    if (error instanceof ValidationError) {
      resultDiv.style.background = '#fef2f2';
      resultDiv.style.color = '#dc2626';
      resultDiv.textContent = 'Validation Error: ' + error.message;
    }
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('ageinput') && html.toLowerCase().includes('validateagebtn');
          const cssCheck = css.toLowerCase().includes('background: #1e40af') && css.toLowerCase().includes('padding: 8px');
          const jsCheck = js.toLowerCase().includes('class validationerror extends error') && js.toLowerCase().includes('throw new validationerror') && js.toLowerCase().includes('instanceof');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-26': {
        title: 'Closures Advanced',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Closures Advanced</h4>
          <p><strong>Instructions:</strong> Create closure for data privacy and state management:</p>
          <ul>
            <li>HTML: Create buttons for increment, decrement, reset and div for counter</li>
            <li>CSS: Style buttons with different colors and counter display</li>
            <li>JS: Use closure to create private counter with public methods</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<button id="incBtn">Increment</button>
<button id="decBtn">Decrement</button>
<button id="resetBtn">Reset</button>
<div id="counterDisplay">Counter: 0</div>`,
        cssSolution: `#incBtn {
  padding: 8px;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}

#decBtn {
  padding: 8px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}

#resetBtn {
  padding: 8px;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
}

#counterDisplay {
  margin: 10px 0;
  padding: 15px;
  background: #f3f4f6;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
}`,
        jsSolution: `const createCounter = () => {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => count = 0,
    getValue: () => count
  };
};

const counter = createCounter();

const updateDisplay = () => {
  document.getElementById('counterDisplay').textContent = 'Counter: ' + counter.getValue();
};

document.getElementById('incBtn').addEventListener('click', () => {
  counter.increment();
  updateDisplay();
});

document.getElementById('decBtn').addEventListener('click', () => {
  counter.decrement();
  updateDisplay();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  counter.reset();
  updateDisplay();
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('incbtn') && html.toLowerCase().includes('decbtn') && html.toLowerCase().includes('resetbtn');
          const cssCheck = css.toLowerCase().includes('background: #16a34a') && css.toLowerCase().includes('background: #dc2626');
          const jsCheck = js.toLowerCase().includes('createcounter') && js.toLowerCase().includes('let count = 0') && js.toLowerCase().includes('return {');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-27': {
        title: 'Function Composition',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Function Composition</h4>
          <p><strong>Instructions:</strong> Compose functions to create data transformation pipeline:</p>
          <ul>
            <li>HTML: Create input for numbers, button "Transform", and div for result</li>
            <li>CSS: Style input and button with background #0d9488</li>
            <li>JS: Create compose function and use it to chain transformations</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="text" id="numbersInput" placeholder="Enter numbers: 1,2,3,4,5">
<button id="transformBtn">Transform</button>
<div id="transformResult"></div>`,
        cssSolution: `#numbersInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 200px;
}

#transformBtn {
  padding: 8px;
  background: #0d9488;
  color: white;
  border: none;
  border-radius: 3px;
}

#transformResult {
  margin: 10px 0;
  padding: 15px;
  background: #f0fdfa;
  border-radius: 5px;
}`,
        jsSolution: `const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

const parseNumbers = (str) => str.split(',').map(Number);
const filterEven = (arr) => arr.filter(n => n % 2 === 0);
const double = (arr) => arr.map(n => n * 2);
const sum = (arr) => arr.reduce((total, n) => total + n, 0);

const pipeline = compose(sum, double, filterEven, parseNumbers);

document.getElementById('transformBtn').addEventListener('click', () => {
  const input = document.getElementById('numbersInput').value;
  
  try {
    const result = pipeline(input);
    document.getElementById('transformResult').textContent = 
      \`Input: \${input}\\nResult: \${result}\\nSteps: Parse → Filter Even → Double → Sum\`;
  } catch (error) {
    document.getElementById('transformResult').textContent = 'Error: ' + error.message;
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('numbersinput') && html.toLowerCase().includes('transformbtn');
          const cssCheck = css.toLowerCase().includes('background: #0d9488') && css.toLowerCase().includes('background: #f0fdfa');
          const jsCheck = js.toLowerCase().includes('const compose') && js.toLowerCase().includes('reduceright') && js.toLowerCase().includes('pipeline');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-28': {
        title: 'Currying Functions',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Currying Functions</h4>
          <p><strong>Instructions:</strong> Transform functions to accept arguments one at a time:</p>
          <ul>
            <li>HTML: Create inputs for three numbers, button "Calculate", and div for result</li>
            <li>CSS: Style inputs and button with background #7c3aed</li>
            <li>JS: Create curried function for mathematical operations</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="number" id="num1" placeholder="First number">
<input type="number" id="num2" placeholder="Second number">
<input type="number" id="num3" placeholder="Third number">
<button id="curryBtn">Calculate</button>
<div id="curryResult"></div>`,
        cssSolution: `input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 120px;
}

#curryBtn {
  padding: 8px;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 3px;
}

#curryResult {
  margin: 10px 0;
  padding: 15px;
  background: #f5f3ff;
  border-radius: 5px;
}`,
        jsSolution: `const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};

const add = (a, b, c) => a + b + c;
const multiply = (a, b, c) => a * b * c;

const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);

document.getElementById('curryBtn').addEventListener('click', () => {
  const a = parseInt(document.getElementById('num1').value) || 0;
  const b = parseInt(document.getElementById('num2').value) || 0;
  const c = parseInt(document.getElementById('num3').value) || 0;
  
  const addResult = curriedAdd(a)(b)(c);
  const multiplyResult = curriedMultiply(a)(b)(c);
  
  const result = \`Numbers: \${a}, \${b}, \${c}\\nCurried Add: \${addResult}\\nCurried Multiply: \${multiplyResult}\`;
  document.getElementById('curryResult').textContent = result;
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('num1') && html.toLowerCase().includes('num2') && html.toLowerCase().includes('num3');
          const cssCheck = css.toLowerCase().includes('background: #7c3aed') && css.toLowerCase().includes('background: #f5f3ff');
          const jsCheck = js.toLowerCase().includes('const curry') && js.toLowerCase().includes('curriedadd') && js.toLowerCase().includes('(a)(b)(c)');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-29': {
        title: 'Memoization',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Memoization</h4>
          <p><strong>Instructions:</strong> Implement memoization for performance optimization:</p>
          <ul>
            <li>HTML: Create input for number, button "Calculate Fibonacci", and div for result</li>
            <li>CSS: Style input and button with background #059669</li>
            <li>JS: Create memoized fibonacci function to cache results</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<input type="number" id="fibInput" placeholder="Enter number (1-40)" max="40">
<button id="fibBtn">Calculate Fibonacci</button>
<div id="fibResult"></div>`,
        cssSolution: `#fibInput {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#fibBtn {
  padding: 8px;
  background: #059669;
  color: white;
  border: none;
  border-radius: 3px;
}

#fibResult {
  margin: 10px 0;
  padding: 15px;
  background: #ecfdf5;
  border-radius: 5px;
  font-family: monospace;
}`,
        jsSolution: `const memoize = (fn) => {
  const cache = {};
  return function(...args) {
    const key = args.toString();
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
};

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

document.getElementById('fibBtn').addEventListener('click', () => {
  const n = parseInt(document.getElementById('fibInput').value);
  
  if (n >= 1 && n <= 40) {
    const startTime = performance.now();
    const result = fibonacci(n);
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    
    document.getElementById('fibResult').textContent = 
      \`Fibonacci(\${n}) = \${result}\\nCalculation time: \${duration}ms\`;
  } else {
    document.getElementById('fibResult').textContent = 'Please enter a number between 1 and 40';
  }
});`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('fibinput') && html.toLowerCase().includes('fibbtn');
          const cssCheck = css.toLowerCase().includes('background: #059669') && css.toLowerCase().includes('background: #ecfdf5');
          const jsCheck = js.toLowerCase().includes('const memoize') && js.toLowerCase().includes('const cache') && js.toLowerCase().includes('fibonacci');
          return htmlCheck && cssCheck && jsCheck;
        }
      },

      'beginner-30': {
        title: 'Final Project - Advanced Todo App',
        level: 'intermediate',
        exp: 10,
        instructions: `
          <h4>Task: Final Project - Advanced Todo App</h4>
          <p><strong>Instructions:</strong> Create a complete todo application with advanced features:</p>
          <ul>
            <li>HTML: Create todo form, filter buttons, and todo list container</li>
            <li>CSS: Style the app with modern design and transitions</li>
            <li>JS: Implement CRUD operations, filtering, local storage, and drag & drop</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div id="todoApp">
  <h2>Advanced Todo App</h2>
  <form id="todoForm">
    <input type="text" id="todoInput" placeholder="Add new todo..." required>
    <select id="prioritySelect">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit">Add Todo</button>
  </form>
  
  <div id="filters">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="active">Active</button>
    <button class="filter-btn" data-filter="completed">Completed</button>
  </div>
  
  <ul id="todoList"></ul>
  
  <div id="stats">
    <span id="totalCount">0 total</span>
    <span id="activeCount">0 active</span>
    <span id="completedCount">0 completed</span>
  </div>
</div>`,
        cssSolution: `#todoApp {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#todoApp h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

#todoForm {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todoInput {
  flex: 1;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 5px;
}

#prioritySelect {
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 5px;
}

#todoForm button {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

#todoList {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  margin-bottom: 10px;
  background: #f8fafc;
  border-radius: 5px;
  border-left: 4px solid #3b82f6;
}

.todo-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.todo-item.high {
  border-left-color: #ef4444;
}

.todo-item.medium {
  border-left-color: #f59e0b;
}

.todo-item.low {
  border-left-color: #10b981;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
}

.todo-text {
  flex: 1;
}

.todo-priority {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  color: white;
}

.priority-high {
  background: #ef4444;
}

.priority-medium {
  background: #f59e0b;
}

.priority-low {
  background: #10b981;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

#stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding: 10px;
  background: #f1f5f9;
  border-radius: 5px;
}`,
        jsSolution: `class TodoApp {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    document.getElementById('todoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });

    document.getElementById('filters').addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        this.setFilter(e.target.dataset.filter);
      }
    });

    document.getElementById('todoList').addEventListener('change', (e) => {
      if (e.target.classList.contains('todo-checkbox')) {
        this.toggleTodo(parseInt(e.target.dataset.id));
      }
    });

    document.getElementById('todoList').addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        this.deleteTodo(parseInt(e.target.dataset.id));
      }
    });
  }

  addTodo() {
    const input = document.getElementById('todoInput');
    const priority = document.getElementById('prioritySelect').value;
    
    if (input.value.trim()) {
      const todo = {
        id: Date.now(),
        text: input.value.trim(),
        completed: false,
        priority: priority
      };
      
      this.todos.push(todo);
      this.saveTodos();
      this.render();
      input.value = '';
    }
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos();
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    this.render();
  }

  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  render() {
    const todoList = document.getElementById('todoList');
    const filteredTodos = this.getFilteredTodos();
    
    todoList.innerHTML = filteredTodos.map(todo => \`
      <li class="todo-item \${todo.completed ? 'completed' : ''} \${todo.priority}">
        <input type="checkbox" class="todo-checkbox" data-id="\${todo.id}" \${todo.completed ? 'checked' : ''}>
        <span class="todo-text">\${todo.text}</span>
        <span class="todo-priority priority-\${todo.priority}">\${todo.priority}</span>
        <button class="delete-btn" data-id="\${todo.id}">Delete</button>
      </li>
    \`).join('');
    
    this.updateStats();
  }

  updateStats() {
    const total = this.todos.length;
    const active = this.todos.filter(todo => !todo.completed).length;
    const completed = this.todos.filter(todo => todo.completed).length;
    
    document.getElementById('totalCount').textContent = \`\${total} total\`;
    document.getElementById('activeCount').textContent = \`\${active} active\`;
    document.getElementById('completedCount').textContent = \`\${completed} completed\`;
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}

new TodoApp();`,
        validate: (html, css, js) => {
          const htmlCheck = html.toLowerCase().includes('todoapp') && html.toLowerCase().includes('todoform') && html.toLowerCase().includes('todolist');
          const cssCheck = css.toLowerCase().includes('#todoapp') && css.toLowerCase().includes('.todo-item') && css.toLowerCase().includes('flex');
          const jsCheck = js.toLowerCase().includes('class todoapp') && js.toLowerCase().includes('localstorage') && js.toLowerCase().includes('addtodo');
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
      task.level === 'intermediate'
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
      'beginner-1': 'Learn modern arrow function syntax and replace traditional functions',
      'beginner-2': 'Master template literals for dynamic string creation with embedded expressions',
      'beginner-3': 'Extract values from arrays and objects using destructuring assignment',
      'beginner-4': 'Use spread operator to combine and expand arrays and objects',
      'beginner-5': 'Handle variable number of function arguments with rest parameters',
      'beginner-6': 'Transform array elements using the powerful map() method',
      'beginner-7': 'Filter array elements based on specific conditions',
      'beginner-8': 'Reduce arrays to single values using accumulator functions',
      'beginner-9': 'Extract keys, values, and entries from objects using Object methods',
      'beginner-10': 'Create functions with default parameter values for better flexibility',
      'beginner-11': 'Handle asynchronous operations with Promise basics',
      'beginner-12': 'Use modern async/await syntax for cleaner asynchronous code',
      'beginner-13': 'Create ES6 classes with constructors and methods',
      'beginner-14': 'Implement inheritance using extends and super keywords',
      'beginner-15': 'Store unique values using the Set data structure',
      'beginner-16': 'Work with key-value pairs using the Map data structure',
      'beginner-17': 'Understand WeakMap and WeakSet for memory-efficient storage',
      'beginner-18': 'Create unique identifiers using Symbol primitive type',
      'beginner-19': 'Build generator functions that can pause and resume execution',
      'beginner-20': 'Iterate through collections using for...of loops and iterators',
      'beginner-21': 'Intercept and customize object operations using Proxy objects',
      'beginner-22': 'Organize code using module patterns and utility functions',
      'beginner-23': 'Validate and extract data using regular expressions',
      'beginner-24': 'Handle errors gracefully with try/catch blocks',
      'beginner-25': 'Create and throw custom error classes for better error handling',
      'beginner-26': 'Use closures for data privacy and state management',
      'beginner-27': 'Compose functions to create data transformation pipelines',
      'beginner-28': 'Transform functions to accept arguments one at a time',
      'beginner-29': 'Optimize performance using memoization techniques',
      'beginner-30': 'Build a complete advanced todo application with modern features'
    };
    
    return descriptions[taskId] || 'Complete this intermediate JavaScript task to earn EXP';
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
      this.tasks[taskId].level === 'intermediate'
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
              a.download = `JavaScript_Intermediate_Certificate_${userName.replace(/\s+/g, '_')}.png`;
              
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
        console.error('Could not load certificate image (1.png)');
        alert('Certificate template not found. Please ensure 1.png is in the same directory.');
      };
      
      img.crossOrigin = 'anonymous';
      img.src = '2.png';
      
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
