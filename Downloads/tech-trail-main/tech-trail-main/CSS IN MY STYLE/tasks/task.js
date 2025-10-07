// API Base URL - Update this to match your FastAPI endpoint
const API_BASE = "https://tech-trail-w2ap.onrender.com"; // your FastAPI endpoint

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
      htmlContent: {} // Store HTML content for each task
    };

    this.currentEditorMode = 'html'; // 'html' or 'css'

    this.tasks = {
      // BEGINNER TASKS (10 tasks - 10 EXP each)
      'beginner-1': {
        title: 'Basic CSS Selectors',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Basic CSS Selectors</h4>
          <p><strong>Instructions:</strong> Style the HTML elements with CSS:</p>
          <ul>
            <li>Make the h1 element color red</li>
            <li>Make the paragraph color blue</li>
            <li>Make the span element color green</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<h1>Main Heading</h1>
<p>This is a paragraph with a <span>highlighted word</span>.</p>`,
        solution: `h1 {
  color: red;
}

p {
  color: blue;
}

span {
  color: green;
}`,
        validate: (code) => {
          const hasH1Red = /h1\s*\{[^}]*color\s*:\s*red/i.test(code);
          const hasPBlue = /p\s*\{[^}]*color\s*:\s*blue/i.test(code);
          const hasSpanGreen = /span\s*\{[^}]*color\s*:\s*green/i.test(code);
          return hasH1Red && hasPBlue && hasSpanGreen;
        }
      },

      'beginner-2': {
        title: 'CSS Font Properties',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Font Properties</h4>
          <p><strong>Instructions:</strong> Apply font styling:</p>
          <ul>
            <li>Make the h1 font-size 24px</li>
            <li>Make the h1 font-weight bold</li>
            <li>Make the paragraph font-family Arial</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<h1>Styled Heading</h1>
<p>This paragraph should have Arial font.</p>`,
        solution: `h1 {
  font-size: 24px;
  font-weight: bold;
}

p {
  font-family: Arial;
}`,
        validate: (code) => {
          const hasH1FontSize = /h1\s*\{[^}]*font-size\s*:\s*24px/i.test(code);
          const hasH1FontWeight = /h1\s*\{[^}]*font-weight\s*:\s*bold/i.test(code);
          const hasPFontFamily = /p\s*\{[^}]*font-family\s*:\s*arial/i.test(code);
          return hasH1FontSize && hasH1FontWeight && hasPFontFamily;
        }
      },

      'beginner-3': {
        title: 'CSS Background Colors',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Background Colors</h4>
          <p><strong>Instructions:</strong> Apply background colors:</p>
          <ul>
            <li>Give the div a background-color of lightblue</li>
            <li>Give the paragraph a background-color of lightyellow</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div>
  <p>This paragraph is inside a div.</p>
</div>`,
        solution: `div {
  background-color: lightblue;
}

p {
  background-color: lightyellow;
}`,
        validate: (code) => {
          const hasDivBg = /div\s*\{[^}]*background-color\s*:\s*lightblue/i.test(code);
          const hasPBg = /p\s*\{[^}]*background-color\s*:\s*lightyellow/i.test(code);
          return hasDivBg && hasPBg;
        }
      },

      'beginner-4': {
        title: 'CSS Text Alignment',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Text Alignment</h4>
          <p><strong>Instructions:</strong> Align text elements:</p>
          <ul>
            <li>Center align the h1 element</li>
            <li>Right align the paragraph</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<h1>Centered Title</h1>
<p>This paragraph should be right-aligned.</p>`,
        solution: `h1 {
  text-align: center;
}

p {
  text-align: right;
}`,
        validate: (code) => {
          const hasH1Center = /h1\s*\{[^}]*text-align\s*:\s*center/i.test(code);
          const hasPRight = /p\s*\{[^}]*text-align\s*:\s*right/i.test(code);
          return hasH1Center && hasPRight;
        }
      },

      'beginner-5': {
        title: 'CSS Margins',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Margins</h4>
          <p><strong>Instructions:</strong> Apply margins:</p>
          <ul>
            <li>Give the h1 a margin-top of 20px</li>
            <li>Give the paragraph a margin-left of 30px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<h1>Heading with Top Margin</h1>
<p>Paragraph with Left Margin</p>`,
        solution: `h1 {
  margin-top: 20px;
}

p {
  margin-left: 30px;
}`,
        validate: (code) => {
          const hasH1MarginTop = /h1\s*\{[^}]*margin-top\s*:\s*20px/i.test(code);
          const hasPMarginLeft = /p\s*\{[^}]*margin-left\s*:\s*30px/i.test(code);
          return hasH1MarginTop && hasPMarginLeft;
        }
      },

      'beginner-6': {
        title: 'CSS Padding',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Padding</h4>
          <p><strong>Instructions:</strong> Apply padding:</p>
          <ul>
            <li>Give the div padding of 15px</li>
            <li>Give the paragraph padding-top of 10px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div>
  <p>This paragraph is inside a padded div.</p>
</div>`,
        solution: `div {
  padding: 15px;
}

p {
  padding-top: 10px;
}`,
        validate: (code) => {
          const hasDivPadding = /div\s*\{[^}]*padding\s*:\s*15px/i.test(code);
          const hasPPaddingTop = /p\s*\{[^}]*padding-top\s*:\s*10px/i.test(code);
          return hasDivPadding && hasPPaddingTop;
        }
      },

      'beginner-7': {
        title: 'CSS Borders',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Borders</h4>
          <p><strong>Instructions:</strong> Add borders:</p>
          <ul>
            <li>Give the div a border: 2px solid black</li>
            <li>Give the paragraph a border-bottom: 1px solid red</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div>
  <p>This paragraph has a bottom border.</p>
</div>`,
        solution: `div {
  border: 2px solid black;
}

p {
  border-bottom: 1px solid red;
}`,
        validate: (code) => {
          const hasDivBorder = /div\s*\{[^}]*border\s*:\s*2px\s+solid\s+black/i.test(code);
          const hasPBorderBottom = /p\s*\{[^}]*border-bottom\s*:\s*1px\s+solid\s+red/i.test(code);
          return hasDivBorder && hasPBorderBottom;
        }
      },

      'beginner-8': {
        title: 'CSS Width and Height',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Width and Height</h4>
          <p><strong>Instructions:</strong> Set dimensions:</p>
          <ul>
            <li>Give the div width: 200px and height: 100px</li>
            <li>Give the paragraph width: 150px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<div>
  <p>This paragraph has a specific width.</p>
</div>`,
        solution: `div {
  width: 200px;
  height: 100px;
}

p {
  width: 150px;
}`,
        validate: (code) => {
          const hasDivWidth = /div\s*\{[^}]*width\s*:\s*200px/i.test(code);
          const hasDivHeight = /div\s*\{[^}]*height\s*:\s*100px/i.test(code);
          const hasPWidth = /p\s*\{[^}]*width\s*:\s*150px/i.test(code);
          return hasDivWidth && hasDivHeight && hasPWidth;
        }
      },

      'beginner-9': {
        title: 'CSS List Styling',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS List Styling</h4>
          <p><strong>Instructions:</strong> Style the list:</p>
          <ul>
            <li>Remove bullets from ul (list-style-type: none)</li>
            <li>Make li elements display: inline</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`,
        solution: `ul {
  list-style-type: none;
}

li {
  display: inline;
}`,
        validate: (code) => {
          const hasUlListStyle = /ul\s*\{[^}]*list-style-type\s*:\s*none/i.test(code);
          const hasLiDisplay = /li\s*\{[^}]*display\s*:\s*inline/i.test(code);
          return hasUlListStyle && hasLiDisplay;
        }
      },

      'beginner-10': {
        title: 'CSS Class Selectors',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: CSS Class Selectors</h4>
          <p><strong>Instructions:</strong> Style elements with classes:</p>
          <ul>
            <li>Make elements with class "highlight" background-color yellow</li>
            <li>Make elements with class "large" font-size 18px</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        htmlContent: `<p class="highlight">This paragraph is highlighted.</p>
<p class="large">This paragraph is large.</p>
<p class="highlight large">This paragraph is both.</p>`,
        solution: `.highlight {
  background-color: yellow;
}

.large {
  font-size: 18px;
}`,
        validate: (code) => {
          const hasHighlightBg = /\.highlight\s*\{[^}]*background-color\s*:\s*yellow/i.test(code);
          const hasLargeFontSize = /\.large\s*\{[^}]*font-size\s*:\s*18px/i.test(code);
          return hasHighlightBg && hasLargeFontSize;
        }
      },

      // INTERMEDIATE TASKS (10 tasks - 20 EXP each)
      'intermediate-1': {
        title: 'CSS Flexbox Basics',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Flexbox Basics</h4>
          <p><strong>Instructions:</strong> Create a flex container:</p>
          <ul>
            <li>Make the container display: flex</li>
            <li>Set justify-content: center</li>
            <li>Set align-items: center</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`,
        solution: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
        validate: (code) => {
          const hasDisplayFlex = /\.container\s*\{[^}]*display\s*:\s*flex/i.test(code);
          const hasJustifyCenter = /\.container\s*\{[^}]*justify-content\s*:\s*center/i.test(code);
          const hasAlignCenter = /\.container\s*\{[^}]*align-items\s*:\s*center/i.test(code);
          return hasDisplayFlex && hasJustifyCenter && hasAlignCenter;
        }
      },

      'intermediate-2': {
        title: 'CSS Grid Layout',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Grid Layout</h4>
          <p><strong>Instructions:</strong> Create a grid layout:</p>
          <ul>
            <li>Make the container display: grid</li>
            <li>Set grid-template-columns: 1fr 1fr 1fr</li>
            <li>Set gap: 10px</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>`,
        solution: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}`,
        validate: (code) => {
          const hasDisplayGrid = /\.grid-container\s*\{[^}]*display\s*:\s*grid/i.test(code);
          const hasGridColumns = /\.grid-container\s*\{[^}]*grid-template-columns\s*:\s*1fr\s+1fr\s+1fr/i.test(code);
          const hasGap = /\.grid-container\s*\{[^}]*gap\s*:\s*10px/i.test(code);
          return hasDisplayGrid && hasGridColumns && hasGap;
        }
      },

      'intermediate-3': {
        title: 'CSS Positioning',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Positioning</h4>
          <p><strong>Instructions:</strong> Position elements:</p>
          <ul>
            <li>Make the container position: relative</li>
            <li>Make the box position: absolute</li>
            <li>Set top: 20px and right: 20px for the box</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="container">
  <p>This is the container content.</p>
  <div class="box">Positioned Box</div>
</div>`,
        solution: `.container {
  position: relative;
}

.box {
  position: absolute;
  top: 20px;
  right: 20px;
}`,
        validate: (code) => {
          const hasContainerRelative = /\.container\s*\{[^}]*position\s*:\s*relative/i.test(code);
          const hasBoxAbsolute = /\.box\s*\{[^}]*position\s*:\s*absolute/i.test(code);
          const hasBoxTop = /\.box\s*\{[^}]*top\s*:\s*20px/i.test(code);
          const hasBoxRight = /\.box\s*\{[^}]*right\s*:\s*20px/i.test(code);
          return hasContainerRelative && hasBoxAbsolute && hasBoxTop && hasBoxRight;
        }
      },

      'intermediate-4': {
        title: 'CSS Hover Effects',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Hover Effects</h4>
          <p><strong>Instructions:</strong> Add hover effects:</p>
          <ul>
            <li>Make buttons background-color blue normally</li>
            <li>Make buttons background-color red on hover</li>
            <li>Add transition: background-color 0.3s</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<button class="btn">Hover Me</button>
<button class="btn">Another Button</button>`,
        solution: `.btn {
  background-color: blue;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: red;
}`,
        validate: (code) => {
          const hasBtnBlue = /\.btn\s*\{[^}]*background-color\s*:\s*blue/i.test(code);
          const hasTransition = /\.btn\s*\{[^}]*transition\s*:\s*background-color\s+0\.3s/i.test(code);
          const hasBtnHoverRed = /\.btn:hover\s*\{[^}]*background-color\s*:\s*red/i.test(code);
          return hasBtnBlue && hasTransition && hasBtnHoverRed;
        }
      },

      'intermediate-5': {
        title: 'CSS Responsive Design',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Responsive Design</h4>
          <p><strong>Instructions:</strong> Create responsive layout:</p>
          <ul>
            <li>Make container width: 100% and max-width: 800px</li>
            <li>Add media query for max-width: 600px</li>
            <li>In media query, make container font-size: 14px</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="container">
  <h2>Responsive Container</h2>
  <p>This container adapts to screen size.</p>
</div>`,
        solution: `.container {
  width: 100%;
  max-width: 800px;
}

@media (max-width: 600px) {
  .container {
    font-size: 14px;
  }
}`,
        validate: (code) => {
          const hasContainerWidth = /\.container\s*\{[^}]*width\s*:\s*100%/i.test(code);
          const hasContainerMaxWidth = /\.container\s*\{[^}]*max-width\s*:\s*800px/i.test(code);
          const hasMediaQuery = /@media\s*$\s*max-width\s*:\s*600px\s*$/i.test(code);
          const hasMediaFontSize = /@media\s*$[^}]+$\s*\{[^}]*\.container\s*\{[^}]*font-size\s*:\s*14px/i.test(code);
          return hasContainerWidth && hasContainerMaxWidth && hasMediaQuery && hasMediaFontSize;
        }
      },

      'intermediate-6': {
        title: 'CSS Transforms',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Transforms</h4>
          <p><strong>Instructions:</strong> Apply transforms:</p>
          <ul>
            <li>Make the box transform: rotate(45deg)</li>
            <li>Make the box transform: scale(1.2) on hover</li>
            <li>Add transition: transform 0.3s</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="box">Transform Me</div>`,
        solution: `.box {
  transform: rotate(45deg);
  transition: transform 0.3s;
}

.box:hover {
  transform: scale(1.2);
}`,
        validate: (code) => {
          const hasBoxRotate = /\.box\s*\{[^}]*transform\s*:\s*rotate\s*$\s*45deg\s*$/i.test(code);
          const hasTransition = /\.box\s*\{[^}]*transition\s*:\s*transform\s+0\.3s/i.test(code);
          const hasBoxHoverScale = /\.box:hover\s*\{[^}]*transform\s*:\s*scale\s*$\s*1\.2\s*$/i.test(code);
          return hasBoxRotate && hasTransition && hasBoxHoverScale;
        }
      },

      'intermediate-7': {
        title: 'CSS Shadows',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Shadows</h4>
          <p><strong>Instructions:</strong> Add shadows:</p>
          <ul>
            <li>Give the card box-shadow: 0 4px 8px rgba(0,0,0,0.1)</li>
            <li>Give the text text-shadow: 2px 2px 4px rgba(0,0,0,0.3)</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="card">
  <h3 class="text">Shadowed Text</h3>
  <p>This card has a shadow effect.</p>
</div>`,
        solution: `.card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.text {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}`,
        validate: (code) => {
          const hasCardBoxShadow = /\.card\s*\{[^}]*box-shadow\s*:\s*0\s+4px\s+8px\s+rgba\s*$\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.1\s*$/i.test(code);
          const hasTextShadow = /\.text\s*\{[^}]*text-shadow\s*:\s*2px\s+2px\s+4px\s+rgba\s*$\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.3\s*$/i.test(code);
          return hasCardBoxShadow && hasTextShadow;
        }
      },

      'intermediate-8': {
        title: 'CSS Gradients',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Gradients</h4>
          <p><strong>Instructions:</strong> Create gradients:</p>
          <ul>
            <li>Give the header background: linear-gradient(to right, blue, purple)</li>
            <li>Give the circle background: radial-gradient(circle, red, yellow)</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="header">
  <h2>Gradient Header</h2>
</div>
<div class="circle">Radial Gradient</div>`,
        solution: `.header {
  background: linear-gradient(to right, blue, purple);
}

.circle {
  background: radial-gradient(circle, red, yellow);
}`,
        validate: (code) => {
          const hasHeaderLinearGradient = /\.header\s*\{[^}]*background\s*:\s*linear-gradient\s*$\s*to\s+right\s*,\s*blue\s*,\s*purple\s*$/i.test(code);
          const hasCircleRadialGradient = /\.circle\s*\{[^}]*background\s*:\s*radial-gradient\s*$\s*circle\s*,\s*red\s*,\s*yellow\s*$/i.test(code);
          return hasHeaderLinearGradient && hasCircleRadialGradient;
        }
      },

      'intermediate-9': {
        title: 'CSS Animations',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Animations</h4>
          <p><strong>Instructions:</strong> Create animation:</p>
          <ul>
            <li>Create @keyframes bounce with 0% and 100% transform: translateY(0) and 50% transform: translateY(-20px)</li>
            <li>Apply animation: bounce 2s infinite to the ball</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="ball">Bouncing Ball</div>`,
        solution: `@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.ball {
  animation: bounce 2s infinite;
}`,
        validate: (code) => {
          const hasKeyframes = /@keyframes\s+bounce/i.test(code);
          const hasTranslateY0 = /transform\s*:\s*translateY\s*$\s*0\s*$/i.test(code);
          const hasTranslateYNeg20 = /transform\s*:\s*translateY\s*$\s*-20px\s*$/i.test(code);
          const hasBallAnimation = /\.ball\s*\{[^}]*animation\s*:\s*bounce\s+2s\s+infinite/i.test(code);
          return hasKeyframes && hasTranslateY0 && hasTranslateYNeg20 && hasBallAnimation;
        }
      },

      'intermediate-10': {
        title: 'CSS Variables',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: CSS Variables</h4>
          <p><strong>Instructions:</strong> Use CSS variables:</p>
          <ul>
            <li>Define --primary-color: #3498db in :root</li>
            <li>Define --secondary-color: #e74c3c in :root</li>
            <li>Use var(--primary-color) for .primary background</li>
            <li>Use var(--secondary-color) for .secondary background</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        htmlContent: `<div class="primary">Primary Color</div>
<div class="secondary">Secondary Color</div>`,
        solution: `:root {
  --primary-color: #3498db;
  --secondary-color: #e74c3c;
}

.primary {
  background: var(--primary-color);
}

.secondary {
  background: var(--secondary-color);
}`,
        validate: (code) => {
          const hasRootPrimary = /:root\s*\{[^}]*--primary-color\s*:\s*#3498db/i.test(code);
          const hasRootSecondary = /:root\s*\{[^}]*--secondary-color\s*:\s*#e74c3c/i.test(code);
          const hasPrimaryVar = /\.primary\s*\{[^}]*background\s*:\s*var\s*$\s*--primary-color\s*$/i.test(code);
          const hasSecondaryVar = /\.secondary\s*\{[^}]*background\s*:\s*var\s*$\s*--secondary-color\s*$/i.test(code);
          return hasRootPrimary && hasRootSecondary && hasPrimaryVar && hasSecondaryVar;
        }
      },

      // ADVANCED TASKS (10 tasks - 30 EXP each)
      'advanced-1': {
        title: 'Advanced Flexbox Layout',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Advanced Flexbox Layout</h4>
          <p><strong>Instructions:</strong> Create complex flex layout:</p>
          <ul>
            <li>Make container display: flex, flex-direction: column, min-height: 100vh</li>
            <li>Make header and footer flex-shrink: 0</li>
            <li>Make main flex: 1</li>
            <li>Make content display: flex, justify-content: space-between</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="container">
  <header class="header">Header</header>
  <main class="main">
    <div class="content">
      <div class="sidebar">Sidebar</div>
      <div class="article">Article</div>
    </div>
  </main>
  <footer class="footer">Footer</footer>
</div>`,
        solution: `.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  flex-shrink: 0;
}

.main {
  flex: 1;
}

.content {
  display: flex;
  justify-content: space-between;
}`,
        validate: (code) => {
          const hasContainerFlex = /\.container\s*\{[^}]*display\s*:\s*flex/i.test(code);
          const hasContainerColumn = /\.container\s*\{[^}]*flex-direction\s*:\s*column/i.test(code);
          const hasContainerHeight = /\.container\s*\{[^}]*min-height\s*:\s*100vh/i.test(code);
          const hasHeaderFooterShrink = /\.header\s*,\s*\.footer\s*\{[^}]*flex-shrink\s*:\s*0/i.test(code);
          const hasMainFlex = /\.main\s*\{[^}]*flex\s*:\s*1/i.test(code);
          const hasContentFlex = /\.content\s*\{[^}]*display\s*:\s*flex/i.test(code);
          const hasContentJustify = /\.content\s*\{[^}]*justify-content\s*:\s*space-between/i.test(code);
          return hasContainerFlex && hasContainerColumn && hasContainerHeight && 
                 hasHeaderFooterShrink && hasMainFlex && hasContentFlex && hasContentJustify;
        }
      },

      'advanced-2': {
        title: 'CSS Grid Advanced',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Grid Advanced</h4>
          <p><strong>Instructions:</strong> Create advanced grid:</p>
          <ul>
            <li>Make container display: grid</li>
            <li>Set grid-template-areas: "header header" "sidebar main" "footer footer"</li>
            <li>Set grid-template-columns: 200px 1fr</li>
            <li>Assign grid-area to each element</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="container">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main Content</main>
  <footer class="footer">Footer</footer>
</div>`,
        solution: `.container {
  display: grid;
  grid-template-areas: "header header" "sidebar main" "footer footer";
  grid-template-columns: 200px 1fr;
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}`,
        validate: (code) => {
          const hasContainerGrid = /\.container\s*\{[^}]*display\s*:\s*grid/i.test(code);
          const hasGridAreas = /\.container\s*\{[^}]*grid-template-areas\s*:\s*"header\s+header"\s+"sidebar\s+main"\s+"footer\s+footer"/i.test(code);
          const hasGridColumns = /\.container\s*\{[^}]*grid-template-columns\s*:\s*200px\s+1fr/i.test(code);
          const hasHeaderArea = /\.header\s*\{[^}]*grid-area\s*:\s*header/i.test(code);
          const hasSidebarArea = /\.sidebar\s*\{[^}]*grid-area\s*:\s*sidebar/i.test(code);
          const hasMainArea = /\.main\s*\{[^}]*grid-area\s*:\s*main/i.test(code);
          const hasFooterArea = /\.footer\s*\{[^}]*grid-area\s*:\s*footer/i.test(code);
          return hasContainerGrid && hasGridAreas && hasGridColumns && 
                 hasHeaderArea && hasSidebarArea && hasMainArea && hasFooterArea;
        }
      },

      'advanced-3': {
        title: 'Complex Animations',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Complex Animations</h4>
          <p><strong>Instructions:</strong> Create complex animation:</p>
          <ul>
            <li>Create @keyframes spin with transform: rotate(360deg)</li>
            <li>Create @keyframes pulse with transform: scale(1) to scale(1.1)</li>
            <li>Apply both animations to .element with different durations</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="element">Animated Element</div>`,
        solution: `@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.element {
  animation: spin 2s linear infinite, pulse 1s ease-in-out infinite;
}`,
        validate: (code) => {
          const hasSpinKeyframes = /@keyframes\s+spin/i.test(code);
          const hasPulseKeyframes = /@keyframes\s+pulse/i.test(code);
          const hasRotate360 = /transform\s*:\s*rotate\s*$\s*360deg\s*$/i.test(code);
          const hasScale1_1 = /transform\s*:\s*scale\s*$\s*1\.1\s*$/i.test(code);
          const hasElementAnimation = /\.element\s*\{[^}]*animation\s*:[^}]*spin[^}]*pulse/i.test(code) || 
                                    /\.element\s*\{[^}]*animation\s*:[^}]*pulse[^}]*spin/i.test(code);
          return hasSpinKeyframes && hasPulseKeyframes && hasRotate360 && hasScale1_1 && hasElementAnimation;
        }
      },

      'advanced-4': {
        title: 'CSS Custom Properties Advanced',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Custom Properties Advanced</h4>
          <p><strong>Instructions:</strong> Advanced CSS variables:</p>
          <ul>
            <li>Define --theme-primary, --theme-secondary, --theme-accent in :root</li>
            <li>Create .theme-dark with different variable values</li>
            <li>Use variables in .card for colors and spacing</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="card">
  <h3>Themed Card</h3>
  <p>This card uses CSS custom properties.</p>
</div>`,
        solution: `:root {
  --theme-primary: #3498db;
  --theme-secondary: #2ecc71;
  --theme-accent: #e74c3c;
}

.theme-dark {
  --theme-primary: #2c3e50;
  --theme-secondary: #27ae60;
  --theme-accent: #c0392b;
}

.card {
  background: var(--theme-primary);
  border: 2px solid var(--theme-secondary);
  color: var(--theme-accent);
}`,
        validate: (code) => {
          const hasRootPrimary = /:root\s*\{[^}]*--theme-primary/i.test(code);
          const hasRootSecondary = /:root\s*\{[^}]*--theme-secondary/i.test(code);
          const hasRootAccent = /:root\s*\{[^}]*--theme-accent/i.test(code);
          const hasThemeDark = /\.theme-dark\s*\{[^}]*--theme-primary/i.test(code);
          const hasCardVarPrimary = /\.card\s*\{[^}]*background\s*:\s*var\s*$\s*--theme-primary\s*$/i.test(code);
          const hasCardVarSecondary = /\.card\s*\{[^}]*border\s*:[^}]*var\s*$\s*--theme-secondary\s*$/i.test(code);
          const hasCardVarAccent = /\.card\s*\{[^}]*color\s*:\s*var\s*$\s*--theme-accent\s*$/i.test(code);
          return hasRootPrimary && hasRootSecondary && hasRootAccent && hasThemeDark && 
                 hasCardVarPrimary && hasCardVarSecondary && hasCardVarAccent;
        }
      },

      'advanced-5': {
        title: 'CSS Pseudo-elements',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Pseudo-elements</h4>
          <p><strong>Instructions:</strong> Use pseudo-elements:</p>
          <ul>
            <li>Add ::before pseudo-element to .quote with content: '"'</li>
            <li>Add ::after pseudo-element to .quote with content: '"'</li>
            <li>Style both pseudo-elements with font-size: 2em and color: gray</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<p class="quote">This is a quoted text that should have decorative quotes.</p>`,
        solution: `.quote::before {
  content: '"';
  font-size: 2em;
  color: gray;
}

.quote::after {
  content: '"';
  font-size: 2em;
  color: gray;
}`,
        validate: (code) => {
          const hasQuoteBefore = /\.quote::before\s*\{[^}]*content\s*:\s*['"]/i.test(code);
          const hasQuoteAfter = /\.quote::after\s*\{[^}]*content\s*:\s*['"]/i.test(code);
          const hasBeforeFontSize = /\.quote::before\s*\{[^}]*font-size\s*:\s*2em/i.test(code);
          const hasAfterFontSize = /\.quote::after\s*\{[^}]*font-size\s*:\s*2em/i.test(code);
          const hasBeforeColor = /\.quote::before\s*\{[^}]*color\s*:\s*gray/i.test(code);
          const hasAfterColor = /\.quote::after\s*\{[^}]*color\s*:\s*gray/i.test(code);
          return hasQuoteBefore && hasQuoteAfter && hasBeforeFontSize && 
                 hasAfterFontSize && hasBeforeColor && hasAfterColor;
        }
      },

      'advanced-6': {
        title: 'CSS Clipping and Masking',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Clipping and Masking</h4>
          <p><strong>Instructions:</strong> Apply clipping:</p>
          <ul>
            <li>Use clip-path: circle(50%) on .circle</li>
            <li>Use clip-path: polygon(50% 0%, 0% 100%, 100% 100%) on .triangle</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="circle">Circular Clip</div>
<div class="triangle">Triangle Clip</div>`,
        solution: `.circle {
  clip-path: circle(50%);
}

.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}`,
        validate: (code) => {
          const hasCircleClip = /\.circle\s*\{[^}]*clip-path\s*:\s*circle\s*$\s*50%\s*$/i.test(code);
          const hasTriangleClip = /\.triangle\s*\{[^}]*clip-path\s*:\s*polygon\s*$\s*50%\s+0%\s*,\s*0%\s+100%\s*,\s*100%\s+100%\s*$/i.test(code);
          return hasCircleClip && hasTriangleClip;
        }
      },

      'advanced-7': {
        title: 'CSS Filter Effects',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Filter Effects</h4>
          <p><strong>Instructions:</strong> Apply filters:</p>
          <ul>
            <li>Add filter: blur(5px) to .blurred</li>
            <li>Add filter: brightness(1.5) contrast(1.2) to .enhanced</li>
            <li>Add filter: grayscale(100%) to .grayscale</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="blurred">Blurred Element</div>
<div class="enhanced">Enhanced Element</div>
<div class="grayscale">Grayscale Element</div>`,
        solution: `.blurred {
  filter: blur(5px);
}

.enhanced {
  filter: brightness(1.5) contrast(1.2);
}

.grayscale {
  filter: grayscale(100%);
}`,
        validate: (code) => {
          const hasBlurredFilter = /\.blurred\s*\{[^}]*filter\s*:\s*blur\s*$\s*5px\s*$/i.test(code);
          const hasEnhancedFilter = /\.enhanced\s*\{[^}]*filter\s*:\s*brightness\s*$\s*1\.5\s*$\s+contrast\s*$\s*1\.2\s*$/i.test(code);
          const hasGrayscaleFilter = /\.grayscale\s*\{[^}]*filter\s*:\s*grayscale\s*$\s*100%\s*$/i.test(code);
          return hasBlurredFilter && hasEnhancedFilter && hasGrayscaleFilter;
        }
      },

      'advanced-8': {
        title: 'CSS 3D Transforms',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS 3D Transforms</h4>
          <p><strong>Instructions:</strong> Create 3D effects:</p>
          <ul>
            <li>Add perspective: 1000px to .container</li>
            <li>Add transform: rotateX(45deg) rotateY(45deg) to .cube</li>
            <li>Add transform-style: preserve-3d to .cube</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="container">
  <div class="cube">3D Cube</div>
</div>`,
        solution: `.container {
  perspective: 1000px;
}

.cube {
  transform: rotateX(45deg) rotateY(45deg);
  transform-style: preserve-3d;
}`,
        validate: (code) => {
          const hasContainerPerspective = /\.container\s*\{[^}]*perspective\s*:\s*1000px/i.test(code);
          const hasCubeRotateX = /\.cube\s*\{[^}]*transform\s*:[^}]*rotateX\s*$\s*45deg\s*$/i.test(code);
          const hasCubeRotateY = /\.cube\s*\{[^}]*transform\s*:[^}]*rotateY\s*$\s*45deg\s*$/i.test(code);
          const hasCubeTransformStyle = /\.cube\s*\{[^}]*transform-style\s*:\s*preserve-3d/i.test(code);
          return hasContainerPerspective && hasCubeRotateX && hasCubeRotateY && hasCubeTransformStyle;
        }
      },

      'advanced-9': {
        title: 'CSS Scroll Animations',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: CSS Scroll Animations</h4>
          <p><strong>Instructions:</strong> Create scroll effects:</p>
          <ul>
            <li>Add scroll-behavior: smooth to html</li>
            <li>Use position: sticky and top: 0 on .sticky</li>
            <li>Add transform: translateY(100px) and transition to .scroll-element</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="sticky">Sticky Header</div>
<div class="scroll-element">Scroll Animation Element</div>
<div style="height: 200vh;">Scroll content</div>`,
        solution: `html {
  scroll-behavior: smooth;
}

.sticky {
  position: sticky;
  top: 0;
}

.scroll-element {
  transform: translateY(100px);
  transition: transform 0.6s ease;
}`,
        validate: (code) => {
          const hasHtmlScrollBehavior = /html\s*\{[^}]*scroll-behavior\s*:\s*smooth/i.test(code);
          const hasStickyPosition = /\.sticky\s*\{[^}]*position\s*:\s*sticky/i.test(code);
          const hasStickyTop = /\.sticky\s*\{[^}]*top\s*:\s*0/i.test(code);
          const hasScrollTransform = /\.scroll-element\s*\{[^}]*transform\s*:\s*translateY\s*$\s*100px\s*$/i.test(code);
          const hasScrollTransition = /\.scroll-element\s*\{[^}]*transition\s*:[^}]*transform/i.test(code);
          return hasHtmlScrollBehavior && hasStickyPosition && hasStickyTop && 
                 hasScrollTransform && hasScrollTransition;
        }
      },

      'advanced-10': {
        title: 'Complete CSS Layout System',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Complete CSS Layout System</h4>
          <p><strong>Instructions:</strong> Create comprehensive layout:</p>
          <ul>
            <li>Combine Grid and Flexbox for .layout</li>
            <li>Add responsive breakpoints with media queries</li>
            <li>Include hover effects, transitions, and animations</li>
            <li>Use CSS variables for theming</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        htmlContent: `<div class="layout">
  <header class="header">Header</header>
  <nav class="nav">Navigation</nav>
  <main class="main">Main Content</main>
  <aside class="sidebar">Sidebar</aside>
  <footer class="footer">Footer</footer>
</div>`,
        solution: `:root {
  --primary: #3498db;
  --secondary: #2ecc71;
}

.layout {
  display: grid;
  grid-template-areas: "header header" "nav main" "sidebar main" "footer footer";
  grid-template-columns: 200px 1fr;
  gap: 10px;
  transition: all 0.3s ease;
}

.header { grid-area: header; background: var(--primary); }
.nav { grid-area: nav; }
.main { grid-area: main; display: flex; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; background: var(--secondary); }

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "nav" "main" "sidebar" "footer";
  }
}`,
        validate: (code) => {
          const hasRootVars = /:root\s*\{[^}]*--primary/i.test(code);
          const hasLayoutGrid = /\.layout\s*\{[^}]*display\s*:\s*grid/i.test(code);
          const hasGridAreas = /\.layout\s*\{[^}]*grid-template-areas/i.test(code);
          const hasGridColumns = /\.layout\s*\{[^}]*grid-template-columns/i.test(code);
          const hasMediaQuery = /@media\s*$[^}]*max-width\s*:\s*768px\s*$/i.test(code);
          const hasHeaderArea = /\.header\s*\{[^}]*grid-area\s*:\s*header/i.test(code);
          const hasVarUsage = /var\s*$\s*--primary\s*$/i.test(code);
          return hasRootVars && hasLayoutGrid && hasGridAreas && hasGridColumns && 
                 hasMediaQuery && hasHeaderArea && hasVarUsage;
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
      'beginner-1': 'Learn to select and style HTML elements with CSS',
      'beginner-2': 'Apply font properties to control text appearance',
      'beginner-3': 'Add background colors to elements',
      'beginner-4': 'Align text content within elements',
      'beginner-5': 'Control spacing around elements with margins',
      'beginner-6': 'Add internal spacing with padding properties',
      'beginner-7': 'Create borders around elements',
      'beginner-8': 'Set element dimensions with width and height',
      'beginner-9': 'Style lists and control their appearance',
      'beginner-10': 'Use class selectors to target specific elements',
      'intermediate-1': 'Create flexible layouts with CSS Flexbox',
      'intermediate-2': 'Build grid-based layouts with CSS Grid',
      'intermediate-3': 'Position elements precisely on the page',
      'intermediate-4': 'Add interactive hover effects with transitions',
      'intermediate-5': 'Create responsive designs with media queries',
      'intermediate-6': 'Transform elements with CSS transforms',
      'intermediate-7': 'Add depth with box and text shadows',
      'intermediate-8': 'Create beautiful gradient backgrounds',
      'intermediate-9': 'Animate elements with CSS keyframes',
      'intermediate-10': 'Use CSS custom properties for dynamic styling',
      'advanced-1': 'Master complex flexbox layouts for full pages',
      'advanced-2': 'Create advanced grid layouts with named areas',
      'advanced-3': 'Combine multiple animations for complex effects',
      'advanced-4': 'Build theming systems with CSS variables',
      'advanced-5': 'Use pseudo-elements for decorative content',
      'advanced-6': 'Create custom shapes with clip-path',
      'advanced-7': 'Apply visual effects with CSS filters',
      'advanced-8': 'Create 3D effects with CSS transforms',
      'advanced-9': 'Implement smooth scrolling and sticky elements',
      'advanced-10': 'Build a complete responsive layout system'
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
      editorContent: this.gameState.editorContent,
      htmlContent: this.gameState.htmlContent
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
        editorContent: parsedState.editorContent || {},
        htmlContent: parsedState.htmlContent || {}
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
    
    // Code editor
    document.getElementById('codeEditor').addEventListener('input', (e) => {
      if (this.currentTask) {
        if (this.currentEditorMode === 'html') {
          this.gameState.htmlContent[this.currentTask] = e.target.value;
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
  
  // Switch between HTML and CSS editor modes
  switchEditorMode(mode) {
    this.currentEditorMode = mode;
    const htmlBtn = document.getElementById('htmlBtn');
    const cssBtn = document.getElementById('cssBtn');
    const editorTitleText = document.getElementById('editorTitleText');
    const codeEditor = document.getElementById('codeEditor');
    
    if (mode === 'html') {
      htmlBtn.classList.add('active');
      cssBtn.classList.remove('active');
      editorTitleText.textContent = 'HTML Editor';
      codeEditor.placeholder = 'HTML code is predefined. Switch to CSS to write your styles.';
      codeEditor.readOnly = true;
      codeEditor.value = this.gameState.htmlContent[this.currentTask] || this.tasks[this.currentTask].htmlContent;
    } else {
      cssBtn.classList.add('active');
      htmlBtn.classList.remove('active');
      editorTitleText.textContent = 'CSS Editor';
      codeEditor.placeholder = 'Write your CSS code here...';
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
    
    // Initialize HTML content for the task
    if (!this.gameState.htmlContent[taskId]) {
      this.gameState.htmlContent[taskId] = task.htmlContent;
    }
    
    // Start in CSS mode
    this.switchEditorMode('css');
    
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
    const task = this.tasks[taskId];
    const failedAttempts = this.gameState.failedAttempts[taskId] || 0;
    const isUnlocked = this.gameState.unlockedSolutions.has(taskId);
    
    // Calculate EXP penalty based on level
    let expPenalty = 5; // default for beginner
    if (task.level === 'intermediate') expPenalty = 10;
    if (task.level === 'advanced') expPenalty = 15;
    
    if (isUnlocked) {
      showSolutionBtn.disabled = false;
      showSolutionBtn.textContent = 'Show Solution';
    } else if (failedAttempts >= 2) {
      showSolutionBtn.disabled = false;
      showSolutionBtn.textContent = `Show Solution (-${expPenalty} EXP)`;
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
    
    if (this.currentEditorMode === 'html') {
      this.showValidationFeedback('Please switch to CSS editor to write your CSS code.', 'error');
      return;
    }
    
    if (!code) {
      this.showValidationFeedback('Please write some CSS code first.', 'error');
      return;
    }
    
    const isValid = task.validate(code);
    
    if (isValid) {
      this.showValidationFeedback('Perfect! Your CSS code is correct. Click Submit to earn EXP!', 'success');
      if (submitBtn) submitBtn.disabled = false;
    } else {
      // Track failed attempts
      const taskId = this.currentTask;
      this.gameState.failedAttempts[taskId] = (this.gameState.failedAttempts[taskId] || 0) + 1;
      this.saveGameState();
      
      this.showValidationFeedback('Your CSS doesn\'t match the expected output. Check the instructions and try again.', 'error');
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
          course: "css",
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
        <p><strong>Here's the correct CSS solution:</strong></p>
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
      // Calculate EXP penalty based on level
      let expPenalty = 5; // default for beginner
      if (task.level === 'intermediate') expPenalty = 10;
      if (task.level === 'advanced') expPenalty = 15;
      
      // Deduct EXP
      this.gameState.exp = Math.max(0, this.gameState.exp - expPenalty);
      this.gameState.unlockedSolutions.add(taskId);
      this.updateExpCounter();
    }
    
    // Switch to CSS mode and show solution
    this.switchEditorMode('css');
    document.getElementById('codeEditor').value = task.solution;
    this.gameState.editorContent[taskId] = task.solution;
    this.saveGameState();
    
    // Update live preview
    this.updateLivePreview();
    
    // Update button
    this.updateSolutionButton();
    
    // Show feedback
    if (!isAlreadyUnlocked) {
      let expPenalty = 5;
      if (task.level === 'intermediate') expPenalty = 10;
      if (task.level === 'advanced') expPenalty = 15;
      this.showValidationFeedback(`Solution revealed! ${expPenalty} EXP deducted. Study the code and try to understand it.`, 'error');
    } else {
      this.showValidationFeedback('Here\'s the solution again. Study it carefully!', 'success');
    }
  }
  
  updateLivePreview() {
    const htmlCode = this.gameState.htmlContent[this.currentTask] || this.tasks[this.currentTask].htmlContent;
    const cssCode = this.gameState.editorContent[this.currentTask] || '';
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

  // Add method to reset all game data (for debugging)
  resetGameData() {
    this.gameState = {
      exp: 0,
      completedTasks: new Set(),
      unlockedSolutions: new Set(),
      failedAttempts: {},
      theme: 'light',
      editorContent: {},
      htmlContent: {}
    };
    this.saveGameState();
    this.updateUI();
    console.log('Game data reset successfully');
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CSSLearningGame();
});
