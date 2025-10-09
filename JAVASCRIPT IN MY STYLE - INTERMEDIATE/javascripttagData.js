/**
 * JavaScript Tag Data
 * Comprehensive categorization of JavaScript concepts
 * Updated with skin and black theme styling
 */

const tagData = {
  categories: [
    {
      name: "Core Language Features",
      description: "Fundamental JavaScript language constructs and syntax",
      tags: [
        { name: "Variables-js" },
        { name: "Datatypes-js" },
        { name: "Var-js" },
        { name: "Let-js" },
        { name: "Const-js" },
        { name: "Keywords-js" },
        { name: "Operators-js" },
        { name: "Expressions-js" },
        { name: "Comparision-js" },
        { name: "Logical-operators-js" },
        { name: "Unary-Operators-js" },
        { name: "Increment-decrement-js" },
        { name: "Ternary-Operator-js" },
        { name: "typeof-js" },
        { name: "Void-Operator-js" },
        { name: "Precedence-js" }
      ]
    },
    {
      name: "Control Flow",
      description: "Statements and structures that control program execution",
      tags: [
        { name: "Conditional-statements-js" },
        { name: "Switch-Statement-js" },
        { name: "Loops-js" },
        { name: "while-Loop-js" },
        { name: "Do-while-loop-js" },
        { name: "Break-statement-js" },
        { name: "Continue-statement-js" },
        { name: "Control-Flow-js" },
        { name: "return-Statement-js" },
        { name: "throw-Statement-js" }
      ]
    },
    {
      name: "Functions",
      description: "Function declaration, expressions, and advanced function concepts",
      tags: [
        { name: "Function-decloration-js" },
        { name: "Function-constructor-js" },
        { name: "Arrow-Functions-js" },
        { name: "Named-functions-js" },
        { name: "Nested-functions-js" },
        { name: "Callback-functions-js" },
        { name: "Higher-order-functions-js" },
        { name: "IIFE-js" },
        { name: "Recursion-js" },
        { name: "Bind-js" },
        { name: "Call-apply-js" },
        { name: "Currying-js" },
        { name: "Function-hosting-js" },
        { name: "Generators-js" },
        { name: "Yield-Keyword-js" }
      ]
    },
    {
      name: "Objects & Classes",
      description: "Object-oriented programming concepts and object manipulation",
      tags: [
        { name: "Object-js" },
        { name: "Classes-js" },
        { name: "Constructor-Functions-js" },
        { name: "Prototypes-js" },
        { name: "Prototype-chain-js" },
        { name: "Inheritance-js" },
        { name: "Encapsulation-js" },
        { name: "OOP-js" },
        { name: "this-Keyword-js" },
        { name: "Instance-js" },
        { name: "Object-freeze-js" },
        { name: "Accessors-js" },
        { name: "Private-Fields-js" },
        { name: "Final-classes-js" },
        { name: "Guard-classes-js" },
        { name: "Method-overloading-js" },
        { name: "Proxy-js" }
      ]
    },
    {
      name: "Arrays & Data Structures",
      description: "Array methods and data structure implementations",
      tags: [
        { name: "Array-js" },
        { name: "Array-Buffer-js" },
        { name: "Map-js" },
        { name: "Set-object-js" },
        { name: "WeakMap-WeakSet-js" },
        { name: "Filter-js" },
        { name: "Find-index-js" },
        { name: "Index-of-js" },
        { name: "Slice-js" },
        { name: "Stack-js" },
        { name: "Queue-js" },
        { name: "Heap-js" },
        { name: "Tree-Traversal-js" },
        { name: "Typed-Arrays-js" },
        { name: "Zero-Based-Indexing-js" }
      ]
    },
    {
      name: "Strings & Text Processing",
      description: "String manipulation and text processing methods",
      tags: [
        { name: "String-Methods-js" },
        { name: "Template-Literals-js" },
        { name: "Tagged-Templates-js" },
        { name: "Backticks-js" },
        { name: "Concatenation-js" },
        { name: "Regex-js" },
        { name: "Encode-decode-js" }
      ]
    },
    {
      name: "Numbers & Math",
      description: "Numeric operations and mathematical functions",
      tags: [
        { name: "Math-object-js" },
        { name: "Parse-int-js" },
        { name: "Parse-float-js" },
        { name: "Float-js" },
        { name: "Bigint-js" },
        { name: "Nan-js" },
        { name: "Rounding-numbers-js" }
      ]
    },
    {
      name: "Asynchronous Programming",
      description: "Promises, async/await, and asynchronous operations",
      tags: [
        { name: "Promises-js" },
        { name: "Async-await-js" },
        { name: "Asynchronous-javascript-js" },
        { name: "Event-loop-js" },
        { name: "SetTimeout-js" },
        { name: "Timers-js" },
        { name: "Abort-Controller-js" }
      ]
    },
    {
      name: "DOM Manipulation",
      description: "Document Object Model interaction and manipulation",
      tags: [
        { name: "Dom-js" },
        { name: "DOM-events-js" },
        { name: "Events-js" },
        { name: "Event-bubling-js" },
        { name: "Event-delegation-js" },
        { name: "Get-element-by-id-js" },
        { name: "Query-Selector-js" },
        { name: "Html-dom-methods-js" },
        { name: "Attributes-js" },
        { name: "Node-list-js" },
        { name: "Mutation-observer-js" }
      ]
    },
    {
      name: "Event Handling",
      description: "User interactions and event management",
      tags: [
        { name: "Mouse-events-js" },
        { name: "Key-events-js" },
        { name: "Input-Events-js" },
        { name: "User-Events-js" },
        { name: "Keyboard-handling-js" },
        { name: "Throttling-js" }
      ]
    },
    {
      name: "Browser APIs",
      description: "Web APIs and browser-specific functionality",
      tags: [
        { name: "Web-API-js" },
        { name: "Bom-js" },
        { name: "Window-Object-js" },
        { name: "History-api-js" },
        { name: "URL-API-js" },
        { name: "File-Api-js" },
        { name: "Performance-API-js" },
        { name: "Intl-js" },
        { name: "Cookies-js" }
      ]
    },
    {
      name: "HTTP & Networking",
      description: "Network requests and data communication",
      tags: [
        { name: "Ajax-js" },
        { name: "Fetch-Api-js" },
        { name: "XMLHttpRequest-js" },
        { name: "REST-API-js" },
        { name: "Graphql-js" },
        { name: "Http-vs-Https-js" },
        { name: "Rest-vs-soap-js" },
        { name: "Get-js" },
        { name: "Post-js" },
        { name: "Web-Sockets-js" }
      ]
    },
    {
      name: "Data Handling",
      description: "Data parsing, serialization, and manipulation",
      tags: [
        { name: "Json-js" },
        { name: "XML-Parsing-js" },
        { name: "Date-Object-js" },
        { name: "Boolean-js" },
        { name: "Null-js" },
        { name: "Undefined-js" },
        { name: "Symbol-js" },
        { name: "Immutable-Data-js" },
        { name: "Shallow-vs-Deep-Copy-js" },
        { name: "Value-vs-Reference-js" }
      ]
    },
    {
      name: "Scope & Context",
      description: "Variable scope, context, and execution environments",
      tags: [
        { name: "Scope-js" },
        { name: "Block-scope-js" },
        { name: "Lexical-scope-js" },
        { name: "Global-variables-js" },
        { name: "Hosting-js" },
        { name: "Clousers-js" }
      ]
    },
    {
      name: "Modules & Patterns",
      description: "Code organization and design patterns",
      tags: [
        { name: "Module-js" },
        { name: "Module-pattern-js" },
        { name: "Import-export-js" },
        { name: "Observer-pattern-js" },
        { name: "Abstraction-js" },
        { name: "Middleware-js" }
      ]
    },
    {
      name: "Error Handling & Debugging",
      description: "Error management and debugging techniques",
      tags: [
        { name: "Error-handling-js" },
        { name: "try-catch-js" },
        { name: "Debugging-js" },
        { name: "Console-js" },
        { name: "Strict-js" }
      ]
    },
    {
      name: "Advanced Concepts",
      description: "Advanced JavaScript features and concepts",
      tags: [
        { name: "Destructuring-js" },
        { name: "Spread-rest-operators-js" },
        { name: "Optional-chaining-js" },
        { name: "Short-circuiting-js" },
        { name: "Decarators-js" },
        { name: "Polyfill-js" },
        { name: "Eval-js" },
        { name: "Atomics-js" },
        { name: "Watchers-js" }
      ]
    },
    {
      name: "Memory & Performance",
      description: "Memory management and performance optimization",
      tags: [
        { name: "Memory-management-js" },
        { name: "Garbage-js" },
        { name: "Web-Workers-js" },
        { name: "Buffer-js" }
      ]
    },
    {
      name: "Tools & Environment",
      description: "Development tools and JavaScript environments",
      tags: [
        { name: "Nodejs-js" },
        { name: "Deno-js" },
        { name: "Babel-js" },
        { name: "Jest-js" },
        { name: "JavaScript Engine (V8)-js" },
        { name: "Vanilla-js" },
        { name: "Ecma-js" }
      ]
    },
    {
      name: "HTML Integration",
      description: "JavaScript integration with HTML and forms",
      tags: [
        { name: "SCRIPT-TAG-JS" },
        { name: "Defer-attribute-js" },
        { name: "Form-js" },
        { name: "Alert-js" },
        { name: "Output-methods-js" },
        { name: "Quirks-Mode-js" },
        { name: "z-index-js" }
      ]
    }
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = tagData;
}
