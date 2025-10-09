// Game State Management
class CSSLearningGame {
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
      // BEGINNER TASKS (10 tasks - 10 EXP each)
      'beginner-1': {
        title: 'Basic CSS Styling',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Basic CSS Styling</h4>
          <p><strong>Instructions:</strong> Create a simple webpage with CSS styling:</p>
          <ul>
            <li>HTML: Create an h1 with text "Welcome to CSS"</li>
            <li>CSS: Style the h1 with color blue and font-size 24px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<h1>Welcome to CSS</h1>`,
        cssSolution: `h1 {
  color: blue;
  font-size: 24px;
}`,
        validate: (html, css) => {
          const htmlNormalized = html.toLowerCase().replace(/\s+/g, ' ').trim();
          const cssNormalized = css.toLowerCase().replace(/\s+/g, ' ').trim();
          const expectedHtml = `<h1>welcome to css</h1>`;
          const expectedCss = `h1 { color: blue; font-size: 24px; }`;
          return htmlNormalized === expectedHtml && cssNormalized === expectedCss;
        }
      },

      'beginner-2': {
        title: 'Text Colors',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Text Colors</h4>
          <p><strong>Instructions:</strong> Style different text elements with colors:</p>
          <ul>
            <li>HTML: Create h1 "Red Title", h2 "Green Subtitle", p "Blue paragraph"</li>
            <li>CSS: Style h1 red, h2 green, p blue</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<h1>Red Title</h1>
<h2>Green Subtitle</h2>
<p>Blue paragraph</p>`,
        cssSolution: `h1 {
  color: red;
}

h2 {
  color: green;
}

p {
  color: blue;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<h1>red title</h1>') &&
                           html.toLowerCase().includes('<h2>green subtitle</h2>') &&
                           html.toLowerCase().includes('<p>blue paragraph</p>');
          const cssCheck = css.toLowerCase().includes('h1') && css.toLowerCase().includes('color: red') &&
                          css.toLowerCase().includes('h2') && css.toLowerCase().includes('color: green') &&
                          css.toLowerCase().includes('p') && css.toLowerCase().includes('color: blue');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-3': {
        title: 'Font Sizes',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Font Sizes</h4>
          <p><strong>Instructions:</strong> Create text with different font sizes:</p>
          <ul>
            <li>HTML: Create h1 "Large", h2 "Medium", p "Small"</li>
            <li>CSS: Style h1 36px, h2 24px, p 14px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<h1>Large</h1>
<h2>Medium</h2>
<p>Small</p>`,
        cssSolution: `h1 {
  font-size: 36px;
}

h2 {
  font-size: 24px;
}

p {
  font-size: 14px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<h1>large</h1>') &&
                           html.toLowerCase().includes('<h2>medium</h2>') &&
                           html.toLowerCase().includes('<p>small</p>');
          const cssCheck = css.toLowerCase().includes('font-size: 36px') &&
                          css.toLowerCase().includes('font-size: 24px') &&
                          css.toLowerCase().includes('font-size: 14px');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-4': {
        title: 'Background Colors',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Background Colors</h4>
          <p><strong>Instructions:</strong> Add background colors to elements:</p>
          <ul>
            <li>HTML: Create div with class "container" containing h1 "Styled Box"</li>
            <li>CSS: Style .container with background-color yellow and padding 20px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div class="container">
  <h1>Styled Box</h1>
</div>`,
        cssSolution: `.container {
  background-color: yellow;
  padding: 20px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<div class="container">') &&
                           html.toLowerCase().includes('<h1>styled box</h1>');
          const cssCheck = css.toLowerCase().includes('.container') &&
                          css.toLowerCase().includes('background-color: yellow') &&
                          css.toLowerCase().includes('padding: 20px');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-5': {
        title: 'Text Alignment',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Text Alignment</h4>
          <p><strong>Instructions:</strong> Align text in different ways:</p>
          <ul>
            <li>HTML: Create h1 "Center Title", p "Left Text", p "Right Text"</li>
            <li>CSS: Center h1, left-align first p, right-align second p (use classes)</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<h1>Center Title</h1>
<p class="left">Left Text</p>
<p class="right">Right Text</p>`,
        cssSolution: `h1 {
  text-align: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<h1>center title</h1>') &&
                           html.toLowerCase().includes('class="left"') &&
                           html.toLowerCase().includes('class="right"');
          const cssCheck = css.toLowerCase().includes('text-align: center') &&
                          css.toLowerCase().includes('text-align: left') &&
                          css.toLowerCase().includes('text-align: right');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-6': {
        title: 'Margins and Padding',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Margins and Padding</h4>
          <p><strong>Instructions:</strong> Add spacing to elements:</p>
          <ul>
            <li>HTML: Create div with class "box" containing text "Spaced Box"</li>
            <li>CSS: Style .box with margin 10px, padding 15px, background lightgray</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div class="box">Spaced Box</div>`,
        cssSolution: `.box {
  margin: 10px;
  padding: 15px;
  background: lightgray;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<div class="box">') &&
                           html.toLowerCase().includes('spaced box');
          const cssCheck = css.toLowerCase().includes('margin: 10px') &&
                          css.toLowerCase().includes('padding: 15px') &&
                          css.toLowerCase().includes('background: lightgray');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-7': {
        title: 'Borders',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Borders</h4>
          <p><strong>Instructions:</strong> Add borders to elements:</p>
          <ul>
            <li>HTML: Create div with class "bordered" containing text "Bordered Box"</li>
            <li>CSS: Style .bordered with border: 2px solid black, padding 10px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div class="bordered">Bordered Box</div>`,
        cssSolution: `.bordered {
  border: 2px solid black;
  padding: 10px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<div class="bordered">') &&
                           html.toLowerCase().includes('bordered box');
          const cssCheck = css.toLowerCase().includes('border: 2px solid black') &&
                          css.toLowerCase().includes('padding: 10px');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-8': {
        title: 'Width and Height',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Width and Height</h4>
          <p><strong>Instructions:</strong> Set dimensions for elements:</p>
          <ul>
            <li>HTML: Create div with class "sized" containing text "Fixed Size"</li>
            <li>CSS: Style .sized with width 200px, height 100px, background lightblue</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<div class="sized">Fixed Size</div>`,
        cssSolution: `.sized {
  width: 200px;
  height: 100px;
  background: lightblue;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<div class="sized">') &&
                           html.toLowerCase().includes('fixed size');
          const cssCheck = css.toLowerCase().includes('width: 200px') &&
                          css.toLowerCase().includes('height: 100px') &&
                          css.toLowerCase().includes('background: lightblue');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-9': {
        title: 'Font Weight',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Font Weight</h4>
          <p><strong>Instructions:</strong> Style text with different font weights:</p>
          <ul>
            <li>HTML: Create p with class "bold" text "Bold Text", p with class "normal" text "Normal Text"</li>
            <li>CSS: Style .bold with font-weight bold, .normal with font-weight normal</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<p class="bold">Bold Text</p>
<p class="normal">Normal Text</p>`,
        cssSolution: `.bold {
  font-weight: bold;
}

.normal {
  font-weight: normal;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="bold"') &&
                           html.toLowerCase().includes('class="normal"') &&
                           html.toLowerCase().includes('bold text') &&
                           html.toLowerCase().includes('normal text');
          const cssCheck = css.toLowerCase().includes('font-weight: bold') &&
                          css.toLowerCase().includes('font-weight: normal');
          return htmlCheck && cssCheck;
        }
      },

      'beginner-10': {
        title: 'List Styling',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: List Styling</h4>
          <p><strong>Instructions:</strong> Style a list:</p>
          <ul>
            <li>HTML: Create ul with class "styled-list" containing li "Item 1", "Item 2", "Item 3"</li>
            <li>CSS: Style .styled-list with list-style-type none, padding 0</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlSolution: `<ul class="styled-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`,
        cssSolution: `.styled-list {
  list-style-type: none;
  padding: 0;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<ul class="styled-list">') &&
                           html.toLowerCase().includes('<li>item 1</li>') &&
                           html.toLowerCase().includes('<li>item 2</li>') &&
                           html.toLowerCase().includes('<li>item 3</li>');
          const cssCheck = css.toLowerCase().includes('list-style-type: none') &&
                          css.toLowerCase().includes('padding: 0');
          return htmlCheck && cssCheck;
        }
      },

      // INTERMEDIATE TASKS (10 tasks - 20 EXP each)
      'intermediate-1': {
        title: 'CSS Classes and IDs',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Classes and IDs</h4>
          <p><strong>Instructions:</strong> Use classes and IDs for styling:</p>
          <ul>
            <li>HTML: Create div with id "header" containing h1 with class "title" text "Main Title"</li>
            <li>CSS: Style #header with background lightgreen, .title with color white</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div id="header">
  <h1 class="title">Main Title</h1>
</div>`,
        cssSolution: `#header {
  background: lightgreen;
}

.title {
  color: white;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('id="header"') &&
                           html.toLowerCase().includes('class="title"') &&
                           html.toLowerCase().includes('main title');
          const cssCheck = css.toLowerCase().includes('#header') &&
                          css.toLowerCase().includes('background: lightgreen') &&
                          css.toLowerCase().includes('.title') &&
                          css.toLowerCase().includes('color: white');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-2': {
        title: 'Hover Effects',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Hover Effects</h4>
          <p><strong>Instructions:</strong> Create hover effects:</p>
          <ul>
            <li>HTML: Create button with class "hover-btn" text "Hover Me"</li>
            <li>CSS: Style .hover-btn with background blue, color white, and :hover with background red</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<button class="hover-btn">Hover Me</button>`,
        cssSolution: `.hover-btn {
  background: blue;
  color: white;
}

.hover-btn:hover {
  background: red;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<button class="hover-btn">') &&
                           html.toLowerCase().includes('hover me');
          const cssCheck = css.toLowerCase().includes('.hover-btn') &&
                          css.toLowerCase().includes('background: blue') &&
                          css.toLowerCase().includes('color: white') &&
                          css.toLowerCase().includes(':hover') &&
                          css.toLowerCase().includes('background: red');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-3': {
        title: 'Display Properties',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Display Properties</h4>
          <p><strong>Instructions:</strong> Use display properties:</p>
          <ul>
            <li>HTML: Create div with class "inline" text "Inline", div with class "block" text "Block"</li>
            <li>CSS: Style .inline with display inline, .block with display block</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div class="inline">Inline</div>
<div class="block">Block</div>`,
        cssSolution: `.inline {
  display: inline;
}

.block {
  display: block;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="inline"') &&
                           html.toLowerCase().includes('class="block"') &&
                           html.toLowerCase().includes('>inline<') &&
                           html.toLowerCase().includes('>block<');
          const cssCheck = css.toLowerCase().includes('display: inline') &&
                          css.toLowerCase().includes('display: block');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-4': {
        title: 'Position Properties',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Position Properties</h4>
          <p><strong>Instructions:</strong> Use position properties:</p>
          <ul>
            <li>HTML: Create div with class "relative" containing div with class "absolute" text "Positioned"</li>
            <li>CSS: Style .relative with position relative, .absolute with position absolute, top 10px, left 20px</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div class="relative">
  <div class="absolute">Positioned</div>
</div>`,
        cssSolution: `.relative {
  position: relative;
}

.absolute {
  position: absolute;
  top: 10px;
  left: 20px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="relative"') &&
                           html.toLowerCase().includes('class="absolute"') &&
                           html.toLowerCase().includes('positioned');
          const cssCheck = css.toLowerCase().includes('position: relative') &&
                          css.toLowerCase().includes('position: absolute') &&
                          css.toLowerCase().includes('top: 10px') &&
                          css.toLowerCase().includes('left: 20px');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-5': {
        title: 'Flexbox Basics',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Flexbox Basics</h4>
          <p><strong>Instructions:</strong> Create a flex container:</p>
          <ul>
            <li>HTML: Create div with class "flex-container" containing 3 divs with class "flex-item" text "Item 1", "Item 2", "Item 3"</li>
            <li>CSS: Style .flex-container with display flex, .flex-item with background lightcoral, margin 5px</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>`,
        cssSolution: `.flex-container {
  display: flex;
}

.flex-item {
  background: lightcoral;
  margin: 5px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="flex-container"') &&
                           html.toLowerCase().includes('class="flex-item"') &&
                           html.toLowerCase().includes('item 1') &&
                           html.toLowerCase().includes('item 2') &&
                           html.toLowerCase().includes('item 3');
          const cssCheck = css.toLowerCase().includes('display: flex') &&
                          css.toLowerCase().includes('background: lightcoral') &&
                          css.toLowerCase().includes('margin: 5px');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-6': {
        title: 'Border Radius',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Border Radius</h4>
          <p><strong>Instructions:</strong> Create rounded corners:</p>
          <ul>
            <li>HTML: Create div with class "rounded" text "Rounded Box"</li>
            <li>CSS: Style .rounded with background orange, padding 20px, border-radius 15px</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div class="rounded">Rounded Box</div>`,
        cssSolution: `.rounded {
  background: orange;
  padding: 20px;
  border-radius: 15px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="rounded"') &&
                           html.toLowerCase().includes('rounded box');
          const cssCheck = css.toLowerCase().includes('background: orange') &&
                          css.toLowerCase().includes('padding: 20px') &&
                          css.toLowerCase().includes('border-radius: 15px');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-7': {
        title: 'Box Shadow',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Box Shadow</h4>
          <p><strong>Instructions:</strong> Add shadow effects:</p>
          <ul>
            <li>HTML: Create div with class "shadow" text "Shadow Box"</li>
            <li>CSS: Style .shadow with background white, padding 20px, box-shadow 0 4px 8px gray</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div class="shadow">Shadow Box</div>`,
        cssSolution: `.shadow {
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px gray;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="shadow"') &&
                           html.toLowerCase().includes('shadow box');
          const cssCheck = css.toLowerCase().includes('background: white') &&
                          css.toLowerCase().includes('padding: 20px') &&
                          css.toLowerCase().includes('box-shadow: 0 4px 8px gray');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-8': {
        title: 'Text Decoration',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Text Decoration</h4>
          <p><strong>Instructions:</strong> Style text decorations:</p>
          <ul>
            <li>HTML: Create p with class "underline" text "Underlined", p with class "line-through" text "Strike Through"</li>
            <li>CSS: Style .underline with text-decoration underline, .line-through with text-decoration line-through</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<p class="underline">Underlined</p>
<p class="line-through">Strike Through</p>`,
        cssSolution: `.underline {
  text-decoration: underline;
}

.line-through {
  text-decoration: line-through;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="underline"') &&
                           html.toLowerCase().includes('class="line-through"') &&
                           html.toLowerCase().includes('underlined') &&
                           html.toLowerCase().includes('strike through');
          const cssCheck = css.toLowerCase().includes('text-decoration: underline') &&
                          css.toLowerCase().includes('text-decoration: line-through');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-9': {
        title: 'Opacity and Transparency',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Opacity and Transparency</h4>
          <p><strong>Instructions:</strong> Create transparent elements:</p>
          <ul>
            <li>HTML: Create div with class "transparent" text "Semi-transparent"</li>
            <li>CSS: Style .transparent with background blue, color white, opacity 0.5, padding 20px</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div class="transparent">Semi-transparent</div>`,
        cssSolution: `.transparent {
  background: blue;
  color: white;
  opacity: 0.5;
  padding: 20px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="transparent"') &&
                           html.toLowerCase().includes('semi-transparent');
          const cssCheck = css.toLowerCase().includes('background: blue') &&
                          css.toLowerCase().includes('color: white') &&
                          css.toLowerCase().includes('opacity: 0.5') &&
                          css.toLowerCase().includes('padding: 20px');
          return htmlCheck && cssCheck;
        }
      },

      'intermediate-10': {
        title: 'Transform Properties',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Transform Properties</h4>
          <p><strong>Instructions:</strong> Use CSS transforms:</p>
          <ul>
            <li>HTML: Create div with class "rotated" text "Rotated Text"</li>
            <li>CSS: Style .rotated with background yellow, padding 10px, transform rotate(15deg)</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlSolution: `<div class="rotated">Rotated Text</div>`,
        cssSolution: `.rotated {
  background: yellow;
  padding: 10px;
  transform: rotate(15deg);
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="rotated"') &&
                           html.toLowerCase().includes('rotated text');
          const cssCheck = css.toLowerCase().includes('background: yellow') &&
                          css.toLowerCase().includes('padding: 10px') &&
                          css.toLowerCase().includes('transform: rotate(15deg)');
          return htmlCheck && cssCheck;
        }
      },

      // ADVANCED TASKS (10 tasks - 30 EXP each)
      'advanced-1': {
        title: 'CSS Grid Layout',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Grid Layout</h4>
          <p><strong>Instructions:</strong> Create a grid layout:</p>
          <ul>
            <li>HTML: Create div with class "grid-container" containing 4 divs with class "grid-item" text "Item 1-4"</li>
            <li>CSS: Style .grid-container with display grid, grid-template-columns 1fr 1fr, gap 10px</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <div class="grid-item">Item 4</div>
</div>`,
        cssSolution: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="grid-container"') &&
                           html.toLowerCase().includes('class="grid-item"') &&
                           html.toLowerCase().includes('item 1') &&
                           html.toLowerCase().includes('item 4');
          const cssCheck = css.toLowerCase().includes('display: grid') &&
                          css.toLowerCase().includes('grid-template-columns: 1fr 1fr') &&
                          css.toLowerCase().includes('gap: 10px');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-2': {
        title: 'Flexbox Advanced',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Flexbox Advanced</h4>
          <p><strong>Instructions:</strong> Create advanced flex layout:</p>
          <ul>
            <li>HTML: Create div with class "flex-advanced" containing 3 divs with class "flex-child" text "Child 1-3"</li>
            <li>CSS: Style .flex-advanced with display flex, justify-content space-between, align-items center, height 200px</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="flex-advanced">
  <div class="flex-child">Child 1</div>
  <div class="flex-child">Child 2</div>
  <div class="flex-child">Child 3</div>
</div>`,
        cssSolution: `.flex-advanced {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="flex-advanced"') &&
                           html.toLowerCase().includes('class="flex-child"') &&
                           html.toLowerCase().includes('child 1') &&
                           html.toLowerCase().includes('child 3');
          const cssCheck = css.toLowerCase().includes('display: flex') &&
                          css.toLowerCase().includes('justify-content: space-between') &&
                          css.toLowerCase().includes('align-items: center') &&
                          css.toLowerCase().includes('height: 200px');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-3': {
        title: 'CSS Animations',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Animations</h4>
          <p><strong>Instructions:</strong> Create CSS animations:</p>
          <ul>
            <li>HTML: Create div with class "animated" text "Animated Box"</li>
            <li>CSS: Style .animated with animation: spin 2s linear infinite, and @keyframes spin with transform rotate(360deg)</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="animated">Animated Box</div>`,
        cssSolution: `.animated {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="animated"') &&
                           html.toLowerCase().includes('animated box');
          const cssCheck = css.toLowerCase().includes('animation: spin 2s linear infinite') &&
                          css.toLowerCase().includes('@keyframes spin') &&
                          css.toLowerCase().includes('transform: rotate(360deg)');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-4': {
        title: 'CSS Transitions',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Transitions</h4>
          <p><strong>Instructions:</strong> Create smooth transitions:</p>
          <ul>
            <li>HTML: Create div with class "transition-box" text "Hover for transition"</li>
            <li>CSS: Style .transition-box with background blue, transition all 0.3s ease, and :hover background red, transform scale(1.1)</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="transition-box">Hover for transition</div>`,
        cssSolution: `.transition-box {
  background: blue;
  transition: all 0.3s ease;
}

.transition-box:hover {
  background: red;
  transform: scale(1.1);
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="transition-box"') &&
                           html.toLowerCase().includes('hover for transition');
          const cssCheck = css.toLowerCase().includes('background: blue') &&
                          css.toLowerCase().includes('transition: all 0.3s ease') &&
                          css.toLowerCase().includes(':hover') &&
                          css.toLowerCase().includes('transform: scale(1.1)');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-5': {
        title: 'Media Queries',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Media Queries</h4>
          <p><strong>Instructions:</strong> Create responsive design:</p>
          <ul>
            <li>HTML: Create div with class "responsive" text "Responsive Box"</li>
            <li>CSS: Style .responsive with background green, and @media (max-width: 600px) background red</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="responsive">Responsive Box</div>`,
        cssSolution: `.responsive {
  background: green;
}

@media (max-width: 600px) {
  .responsive {
    background: red;
  }
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="responsive"') &&
                           html.toLowerCase().includes('responsive box');
          const cssCheck = css.toLowerCase().includes('background: green') &&
                          css.toLowerCase().includes('@media (max-width: 600px)') &&
                          css.toLowerCase().includes('background: red');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-6': {
        title: 'CSS Variables',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Variables</h4>
          <p><strong>Instructions:</strong> Use CSS custom properties:</p>
          <ul>
            <li>HTML: Create div with class "variable-box" text "Variable Colors"</li>
            <li>CSS: Define :root with --main-color: purple, style .variable-box with background var(--main-color)</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="variable-box">Variable Colors</div>`,
        cssSolution: `:root {
  --main-color: purple;
}

.variable-box {
  background: var(--main-color);
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="variable-box"') &&
                           html.toLowerCase().includes('variable colors');
          const cssCheck = css.toLowerCase().includes(':root') &&
                          css.toLowerCase().includes('--main-color: purple') &&
                          css.toLowerCase().includes('background: var(--main-color)');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-7': {
        title: 'CSS Gradients',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Gradients</h4>
          <p><strong>Instructions:</strong> Create gradient backgrounds:</p>
          <ul>
            <li>HTML: Create div with class "gradient" text "Gradient Background"</li>
            <li>CSS: Style .gradient with background linear-gradient(45deg, red, blue), height 100px, color white</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="gradient">Gradient Background</div>`,
        cssSolution: `.gradient {
  background: linear-gradient(45deg, red, blue);
  height: 100px;
  color: white;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="gradient"') &&
                           html.toLowerCase().includes('gradient background');
          const cssCheck = css.toLowerCase().includes('background: linear-gradient(45deg, red, blue)') &&
                          css.toLowerCase().includes('height: 100px') &&
                          css.toLowerCase().includes('color: white');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-8': {
        title: 'CSS Pseudo-elements',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Pseudo-elements</h4>
          <p><strong>Instructions:</strong> Use pseudo-elements:</p>
          <ul>
            <li>HTML: Create p with class "pseudo" text "Styled Text"</li>
            <li>CSS: Style .pseudo::before with content "★", color gold, .pseudo::after with content "★", color gold</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<p class="pseudo">Styled Text</p>`,
        cssSolution: `.pseudo::before {
  content: "★";
  color: gold;
}

.pseudo::after {
  content: "★";
  color: gold;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="pseudo"') &&
                           html.toLowerCase().includes('styled text');
          const cssCheck = css.toLowerCase().includes('::before') &&
                          css.toLowerCase().includes('::after') &&
                          css.toLowerCase().includes('content: "★"') &&
                          css.toLowerCase().includes('color: gold');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-9': {
        title: 'CSS Filters',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Filters</h4>
          <p><strong>Instructions:</strong> Apply CSS filters:</p>
          <ul>
            <li>HTML: Create div with class "filtered" text "Filtered Box"</li>
            <li>CSS: Style .filtered with background orange, filter blur(2px), :hover filter blur(0px)</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<div class="filtered">Filtered Box</div>`,
        cssSolution: `.filtered {
  background: orange;
  filter: blur(2px);
}

.filtered:hover {
  filter: blur(0px);
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('class="filtered"') &&
                           html.toLowerCase().includes('filtered box');
          const cssCheck = css.toLowerCase().includes('background: orange') &&
                          css.toLowerCase().includes('filter: blur(2px)') &&
                          css.toLowerCase().includes(':hover') &&
                          css.toLowerCase().includes('filter: blur(0px)');
          return htmlCheck && cssCheck;
        }
      },

      'advanced-10': {
        title: 'Complete CSS Layout',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Complete CSS Layout</h4>
          <p><strong>Instructions:</strong> Create a complete layout:</p>
          <ul>
            <li>HTML: Create header, main, footer with classes</li>
            <li>CSS: Style header with background navy, color white, main with min-height 400px, footer with background gray</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlSolution: `<header class="header">Header</header>
<main class="main">Main Content</main>
<footer class="footer">Footer</footer>`,
        cssSolution: `.header {
  background: navy;
  color: white;
}

.main {
  min-height: 400px;
}

.footer {
  background: gray;
}`,
        validate: (html, css) => {
          const htmlCheck = html.toLowerCase().includes('<header class="header">') &&
                           html.toLowerCase().includes('<main class="main">') &&
                           html.toLowerCase().includes('<footer class="footer">');
          const cssCheck = css.toLowerCase().includes('background: navy') &&
                          css.toLowerCase().includes('color: white') &&
                          css.toLowerCase().includes('min-height: 400px') &&
                          css.toLowerCase().includes('background: gray');
          return htmlCheck && cssCheck;
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
      'beginner': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 9h6v6H9z"></path>',
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
      'beginner-1': 'Learn basic CSS syntax and apply your first styles',
      'beginner-2': 'Apply different colors to various text elements',
      'beginner-3': 'Control text size using font-size property',
      'beginner-4': 'Add background colors and padding to elements',
      'beginner-5': 'Align text using text-align property',
      'beginner-6': 'Control spacing with margins and padding',
      'beginner-7': 'Add borders to elements for visual separation',
      'beginner-8': 'Set fixed dimensions for elements',
      'beginner-9': 'Control text thickness with font-weight',
      'beginner-10': 'Remove default list styling',
      'intermediate-1': 'Use CSS selectors for classes and IDs',
      'intermediate-2': 'Create interactive hover effects',
      'intermediate-3': 'Control element display behavior',
      'intermediate-4': 'Position elements precisely on the page',
      'intermediate-5': 'Create flexible layouts with flexbox',
      'intermediate-6': 'Round corners with border-radius',
      'intermediate-7': 'Add depth with box shadows',
      'intermediate-8': 'Style text with decorative lines',
      'intermediate-9': 'Create semi-transparent elements',
      'intermediate-10': 'Transform elements with CSS transforms',
      'advanced-1': 'Create complex layouts with CSS Grid',
      'advanced-2': 'Master advanced flexbox properties',
      'advanced-3': 'Animate elements with CSS animations',
      'advanced-4': 'Create smooth transitions between states',
      'advanced-5': 'Make responsive designs with media queries',
      'advanced-6': 'Use CSS custom properties for maintainable code',
      'advanced-7': 'Create beautiful gradient backgrounds',
      'advanced-8': 'Add content with pseudo-elements',
      'advanced-9': 'Apply visual effects with CSS filters',
      'advanced-10': 'Build a complete responsive layout'
    };
    
    return descriptions[taskId] || 'Complete this CSS task to earn EXP';
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
    localStorage.setItem('cssLearningGame', JSON.stringify(stateToSave));
  }
  
  loadGameState() {
    const saved = localStorage.getItem('cssLearningGame');
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
    const savedContent = this.gameState.editorContent[taskId] || {};
    document.getElementById('htmlEditor').value = savedContent.html || '';
    document.getElementById('cssEditor').value = savedContent.css || '';
    
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
    const task = this.tasks[this.currentTask];
    const feedback = document.getElementById('validationFeedback');
    const submitBtn = document.getElementById('submitCode');
    
    if (!htmlCode && !cssCode) {
      this.showValidationFeedback('Please write some HTML and CSS code first.', 'error');
      return;
    }
    
    const isValid = task.validate(htmlCode, cssCode);
    
    if (isValid) {
      this.showValidationFeedback('Perfect! Your HTML and CSS code is correct. Click Submit to earn EXP!', 'success');
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
    
    if (!this.gameState.editorContent[taskId]) {
      this.gameState.editorContent[taskId] = {};
    }
    this.gameState.editorContent[taskId].html = task.htmlSolution;
    this.gameState.editorContent[taskId].css = task.cssSolution;
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
              a.download = `CSS_Certificate_${userName.replace(/\s+/g, '_')}.png`;
              
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
      img.src = '3.png';
      
    } catch (error) {
      console.error('Error in downloadCertificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CSSLearningGame();
});
