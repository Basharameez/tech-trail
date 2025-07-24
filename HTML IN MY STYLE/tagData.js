/**
 * HTML5 Tag Data
 * Contains all HTML5 tags organized by category with descriptions
 */
const tagData = {
  categories: [
    {
      name: "Formatting Tags",
      description: "Tags for text formatting and styling",
      tags: [
        { name: "b", description: "Bold text" },
        { name: "i", description: "Italic text" },
        { name: "em", description: "Emphasized text" },
        { name: "mark", description: "Marked/highlighted text" },
        { name: "small", description: "Smaller text" },
        { name: "del", description: "Deleted text" },
        { name: "ins", description: "Inserted text" },
        { name: "sub", description: "Subscript text" },
        { name: "sup", description: "Superscript text" },
        { name: "strong", description: "Important text (semantically strong)" },
        { name: "code", description: "Code text" },
        { name: "kbd", description: "Keyboard input" },
        { name: "var", description: "Variable" },
        { name: "abbr", description: "Abbreviation or acronym" },
        { name: "cite", description: "Citation or reference to a source" },
        { name: "s", description: "Strikethrough text" },
        { name: "u", description: "Underlined text (non-semantic)" }
      ]
    },
    {
      name: "Sectioning Tags",
      description: "Tags for document structure and layout",
      tags: [
        { name: "header", description: "Document header section" },
        { name: "nav", description: "Navigation links section" },
        { name: "main", description: "Main content section" },
        { name: "section", description: "Thematic section" },
        { name: "article", description: "Self-contained content" },
        { name: "aside", description: "Aside content" },
        { name: "footer", description: "Document footer section" },
        { name: "div", description: "Generic division" },
        { name: "address", description: "Contact information" }
      ]
    },
    {
      name: "Text Structure Tags",
      description: "Tags for structuring text content",
      tags: [
        { name: "h1-h6", description: "Headings level 1 to 6" },
        { name: "p", description: "Paragraph" },
        { name: "blockquote", description: "Block quotation" },
        { name: "q", description: "Short inline quotation" },
        { name: "ol", description: "Ordered list" },
        { name: "ul", description: "Unordered list" },
        { name: "li", description: "List item" },
        { name: "figure", description: "Figure with caption" },
        { name: "figcaption", description: "Caption for figure" },
        { name: "pre", description: "Preformatted text" },
        { name: "hgroup", description: "Group of headings" },
        { name: "wbr", description: "Word break opportunity" }
      ]
    },
    {
      name: "Form Tags",
      description: "Tags for interactive web forms",
      tags: [
        { name: "form", description: "Form for user input" },
        { name: "input", description: "Input control" },
        { name: "label", description: "Label for form control" },
        { name: "button", description: "Clickable button" },
        { name: "select", description: "Dropdown list" },
        { name: "optgroup", description: "Option group" },
        { name: "option", description: "Option in dropdown list" },
        { name: "textarea", description: "Multi-line text input" },
        { name: "fieldset", description: "Group of form controls" },
        { name: "legend", description: "Caption for fieldset" },
        { name: "datalist", description: "Predefined options for inputs" },
        { name: "output", description: "Calculation result" },
        { name: "progress", description: "Progress indicator" },
        { name: "meter", description: "Value within a range" }
      ]
    },
    {
      name: "Media Tags",
      description: "Tags for multimedia content",
      tags: [
        { name: "img", description: "Image" },
        { name: "audio", description: "Sound content" },
        { name: "video", description: "Video content" },
        { name: "source", description: "Media resource" },
        { name: "track", description: "Text track for media" },
        { name: "svg", description: "Scalable vector graphics" },
        { name: "canvas", description: "Graphics via scripting" },
        { name: "picture", description: "Container for multiple image sources" }
      ]
    },
    {
      name: "Table Tags",
      description: "Tags for creating tables",
      tags: [
        { name: "table", description: "Table" },
        { name: "caption", description: "Table caption" },
        { name: "thead", description: "Table header group" },
        { name: "tbody", description: "Table body" },
        { name: "tfoot", description: "Table footer" },
        { name: "tr", description: "Table row" },
        { name: "th", description: "Table header cell" },
        { name: "td", description: "Table data cell" },
        { name: "col", description: "Table column" }
      ]
    },
    {
      name: "Metadata Tags",
      description: "Tags for document metadata",
      tags: [
        { name: "meta", description: "Metadata information" },
        { name: "link", description: "Link to external resource" },
        { name: "title", description: "Document title" },
        { name: "style", description: "Style information" },
        { name: "base", description: "Base URL for relative URLs" }
      ]
    },
    {
      name: "Script/Interactive Tags",
      description: "Tags for scripting and interactivity",
      tags: [
        { name: "embed", description: "Embedded content" },
        { name: "object", description: "Embedded object" },
        { name: "param", description: "Parameter for object" },
        { name: "iframe", description: "Inline frame" },
        { name: "a", description: "Hyperlink" }
      ]
    },
    {
      name: "Programmatic Tags",
      description: "Tags for programming features",
      tags: [
        { name: "data", description: "Machine-readable value" },
        { name: "time", description: "Date/time" },
        { name: "var", description: "Variable" }
      ]
    },
    
  ]
};
