/**
 * CSS Property Data
 * Contains all CSS properties organized by category with descriptions
 */
const tagData = {
  categories: [
    {
      name: "Layout Properties",
      description: "Properties for positioning and layout control",
      tags: [
        { name: "display", description: "Display type of element" },
        { name: "position", description: "Positioning method" },
        { name: "top", description: "Top offset for positioned elements" },
        { name: "right", description: "Right offset for positioned elements" },
        { name: "bottom", description: "Bottom offset for positioned elements" },
        { name: "left", description: "Left offset for positioned elements" },
        { name: "float", description: "Float element left or right" },
        { name: "clear", description: "Clear floating elements" },
        { name: "z-index", description: "Stack order of elements" },
        { name: "overflow", description: "Content overflow behavior" },
        { name: "overflow-x", description: "Horizontal overflow behavior" },
        { name: "overflow-y", description: "Vertical overflow behavior" },
        { name: "visibility", description: "Element visibility" },
        { name: "clip", description: "Clipping region" },
        { name: "clip-path", description: "Clipping path shape" }
      ]
    },
    {
      name: "Flexbox Properties",
      description: "Properties for flexible box layout",
      tags: [
        { name: "flex", description: "Flex shorthand property" },
        { name: "flex-direction", description: "Direction of flex items" },
        { name: "flex-wrap", description: "Flex item wrapping" },
        { name: "flex-flow", description: "Flex direction and wrap shorthand" },
        { name: "flex-grow", description: "Flex item growth factor" },
        { name: "flex-shrink", description: "Flex item shrink factor" },
        { name: "flex-basis", description: "Initial main size of flex item" },
        { name: "justify-content", description: "Main axis alignment" },
        { name: "align-items", description: "Cross axis alignment" },
        { name: "align-self", description: "Individual cross axis alignment" },
        { name: "align-content", description: "Multi-line cross axis alignment" },
        { name: "order", description: "Flex item order" },
        { name: "gap", description: "Gap between flex items" }
      ]
    },
    {
      name: "Grid Properties",
      description: "Properties for CSS Grid layout",
      tags: [
        { name: "grid", description: "Grid shorthand property" },
        { name: "grid-template", description: "Grid template shorthand" },
        { name: "grid-template-columns", description: "Grid column track sizes" },
        { name: "grid-template-rows", description: "Grid row track sizes" },
        { name: "grid-template-areas", description: "Named grid areas" },
        { name: "grid-auto-columns", description: "Auto-generated column sizes" },
        { name: "grid-auto-rows", description: "Auto-generated row sizes" },
        { name: "grid-auto-flow", description: "Auto-placement algorithm" },
        { name: "grid-column", description: "Grid column placement shorthand" },
        { name: "grid-row", description: "Grid row placement shorthand" },
        { name: "grid-area", description: "Grid area placement shorthand" },
        { name: "grid-column-start", description: "Grid column start line" },
        { name: "grid-column-end", description: "Grid column end line" },
        { name: "grid-row-start", description: "Grid row start line" },
        { name: "grid-row-end", description: "Grid row end line" },
        { name: "grid-gap", description: "Grid gap shorthand (deprecated)" },
        { name: "grid-column-gap", description: "Grid column gap (deprecated)" },
        { name: "grid-row-gap", description: "Grid row gap (deprecated)" },
        { name: "justify-items", description: "Default justify-self for all items" },
        { name: "justify-self", description: "Individual inline axis alignment" },
        { name: "place-content", description: "Align and justify content shorthand" },
        { name: "place-items", description: "Align and justify items shorthand" },
        { name: "place-self", description: "Align and justify self shorthand" }
      ]
    },
    {
      name: "Box Model Properties",
      description: "Properties for element dimensions and spacing",
      tags: [
        { name: "width", description: "Element width" },
        { name: "height", description: "Element height" },
        { name: "min-width", description: "Minimum width" },
        { name: "max-width", description: "Maximum width" },
        { name: "min-height", description: "Minimum height" },
        { name: "max-height", description: "Maximum height" },
        { name: "margin", description: "Outer spacing shorthand" },
        { name: "margin-top", description: "Top margin" },
        { name: "margin-right", description: "Right margin" },
        { name: "margin-bottom", description: "Bottom margin" },
        { name: "margin-left", description: "Left margin" },
        { name: "margin-block", description: "Block axis margin shorthand" },
        { name: "margin-inline", description: "Inline axis margin shorthand" },
        { name: "padding", description: "Inner spacing shorthand" },
        { name: "padding-top", description: "Top padding" },
        { name: "padding-right", description: "Right padding" },
        { name: "padding-bottom", description: "Bottom padding" },
        { name: "padding-left", description: "Left padding" },
        { name: "box-sizing", description: "Box model calculation method" }
      ]
    },
    {
      name: "Border Properties",
      description: "Properties for element borders",
      tags: [
        { name: "border", description: "Border shorthand property" },
        { name: "border-width", description: "Border width" },
        { name: "border-style", description: "Border style" },
        { name: "border-color", description: "Border color" },
        { name: "border-top", description: "Top border shorthand" },
        { name: "border-right", description: "Right border shorthand" },
        { name: "border-bottom", description: "Bottom border shorthand" },
        { name: "border-left", description: "Left border shorthand" },
        { name: "border-radius", description: "Border corner radius" },
        { name: "border-top-left-radius", description: "Top-left corner radius" },
        { name: "border-top-right-radius", description: "Top-right corner radius" },
        { name: "border-bottom-left-radius", description: "Bottom-left corner radius" },
        { name: "border-bottom-right-radius", description: "Bottom-right corner radius" },
        { name: "border-image", description: "Border image shorthand" },
        { name: "border-collapse", description: "Table border collapse" },
        { name: "border-spacing", description: "Table border spacing" }
      ]
    },
    {
      name: "Typography Properties",
      description: "Properties for text styling and layout",
      tags: [
        { name: "font", description: "Font shorthand property" },
        { name: "font-family", description: "Font family" },
        { name: "font-size", description: "Font size" },
        { name: "font-weight", description: "Font weight" },
        { name: "font-style", description: "Font style" },
        { name: "font-variant", description: "Font variant" },
        { name: "font-stretch", description: "Font stretch" },
        { name: "font-size-adjust", description: "Font size adjustment" },
        { name: "font-kerning", description: "Font kerning" },
        { name: "font-feature-settings", description: "Font feature settings" },
        { name: "line-height", description: "Line height" },
        { name: "letter-spacing", description: "Letter spacing" },
        { name: "word-spacing", description: "Word spacing" },
        { name: "text-align", description: "Text alignment" },
        { name: "text-align-last", description: "Last line text alignment" },
        { name: "text-decoration", description: "Text decoration shorthand" },
        { name: "text-decoration-line", description: "Text decoration line" },
        { name: "text-decoration-color", description: "Text decoration color" },
        { name: "text-decoration-style", description: "Text decoration style" },
        { name: "text-indent", description: "Text indentation" },
        { name: "text-transform", description: "Text case transformation" },
        { name: "text-shadow", description: "Text shadow" },
        { name: "text-overflow", description: "Text overflow behavior" },
        { name: "white-space", description: "White space handling" },
        { name: "word-break", description: "Word breaking behavior" },
        { name: "word-wrap", description: "Word wrapping behavior" },
        { name: "hyphens", description: "Hyphenation behavior" },
        { name: "vertical-align", description: "Vertical alignment" },
        { name: "direction", description: "Text direction" },
        { name: "unicode-bidi", description: "Unicode bidirectional algorithm" },
        { name: "writing-mode", description: "Writing mode" },
        { name: "tab-size", description: "Tab character size" }
      ]
    },
    {
      name: "Color & Background Properties",
      description: "Properties for colors and backgrounds",
      tags: [
        { name: "color", description: "Text color" },
        { name: "background", description: "Background shorthand property" },
        { name: "background-color", description: "Background color" },
        { name: "background-image", description: "Background image" },
        { name: "background-repeat", description: "Background repeat behavior" },
        { name: "background-position", description: "Background position" },
        { name: "background-size", description: "Background size" },
        { name: "background-attachment", description: "Background attachment" },
        { name: "background-origin", description: "Background origin" },
        { name: "background-clip", description: "Background clipping area" },
        { name: "background-blend-mode", description: "Background blend mode" },
        { name: "opacity", description: "Element opacity" },
        { name: "mix-blend-mode", description: "Element blend mode" },
        { name: "isolation", description: "Stacking context isolation" }
      ]
    },
    {
      name: "Transform & Animation Properties",
      description: "Properties for transformations and animations",
      tags: [
        { name: "transform", description: "Element transformation" },
        { name: "transform-origin", description: "Transform origin point" },
        { name: "transform-style", description: "3D transform style" },
        { name: "perspective", description: "3D perspective" },
        { name: "perspective-origin", description: "3D perspective origin" },
        { name: "backface-visibility", description: "Backface visibility" },
        { name: "rotate", description: "Element rotation" },
        { name: "scale", description: "Element scaling" },
        { name: "animation", description: "Animation shorthand property" },
        { name: "animation-name", description: "Animation name" },
        { name: "animation-duration", description: "Animation duration" },
        { name: "animation-timing-function", description: "Animation timing function" },
        { name: "animation-delay", description: "Animation delay" },
        { name: "animation-iteration-count", description: "Animation iteration count" },
        { name: "animation-direction", description: "Animation direction" },
        { name: "animation-fill-mode", description: "Animation fill mode" },
        { name: "animation-play-state", description: "Animation play state" },
        { name: "keyframes", description: "Keyframe animation rules" },
        { name: "transition", description: "Transition shorthand property" },
        { name: "transition-property", description: "Transition property" },
        { name: "transition-duration", description: "Transition duration" },
        { name: "transition-timing-function", description: "Transition timing function" },
        { name: "transition-delay", description: "Transition delay" }
      ]
    },
    {
      name: "Visual Effects Properties",
      description: "Properties for visual effects and filters",
      tags: [
        { name: "box-shadow", description: "Box shadow effect" },
        { name: "filter", description: "Filter effects" },
        { name: "backdrop-filter", description: "Backdrop filter effects" },
        { name: "mask", description: "Element masking" },
        { name: "clip-path", description: "Clipping path" },
        { name: "shape-outside", description: "Shape for text wrapping" }
      ]
    },
    {
      name: "List Properties",
      description: "Properties for list styling",
      tags: [
        { name: "list-style", description: "List style shorthand" },
        { name: "list-style-type", description: "List marker type" },
        { name: "list-style-position", description: "List marker position" },
        { name: "list-style-image", description: "List marker image" }
      ]
    },
    {
      name: "Table Properties",
      description: "Properties for table layout and styling",
      tags: [
        { name: "table-layout", description: "Table layout algorithm" },
        { name: "border-collapse", description: "Table border collapse" },
        { name: "border-spacing", description: "Table border spacing" },
        { name: "caption-side", description: "Table caption position" },
        { name: "empty-cells", description: "Empty table cell display" }
      ]
    },
    {
      name: "User Interface Properties",
      description: "Properties for user interaction and interface",
      tags: [
        { name: "cursor", description: "Mouse cursor style" },
        { name: "user-select", description: "Text selection behavior" },
        { name: "pointer-events", description: "Pointer event handling" },
        { name: "resize", description: "Element resize behavior" },
        { name: "outline", description: "Outline shorthand property" },
        { name: "outline-color", description: "Outline color" },
        { name: "outline-style", description: "Outline style" },
        { name: "outline-width", description: "Outline width" },
        { name: "outline-offset", description: "Outline offset" },
        { name: "caret-color", description: "Text input caret color" }
      ]
    },
    {
      name: "Content & Generated Content",
      description: "Properties for content generation and object fitting",
      tags: [
        { name: "object-fit", description: "Object fitting behavior" },
        { name: "object-position", description: "Object position" },
        { name: "image-rendering", description: "Image rendering quality" },
        { name: "will-change", description: "Performance optimization hint" },
        { name: "content", description: "Generated content" },
        { name: "counter-increment", description: "Counter increment" },
        { name: "counter-reset", description: "Counter reset" }
      ]
    },
    {
      name: "Print & Paging Properties",
      description: "Properties for print and paging control",
      tags: [
        { name: "page-break-before", description: "Page break before element" },
        { name: "page-break-after", description: "Page break after element" },
        { name: "page-break-inside", description: "Page break inside element" },
        { name: "break-before", description: "Break before element" },
        { name: "break-after", description: "Break after element" },
        { name: "break-inside", description: "Break inside element" },
        { name: "widows", description: "Minimum lines at page top" },
        { name: "orphans", description: "Minimum lines at page bottom" }
      ]
    },
    {
      name: "Multi-column Properties",
      description: "Properties for multi-column layout",
      tags: [
        { name: "columns", description: "Multi-column shorthand" },
        { name: "column-count", description: "Number of columns" },
        { name: "column-width", description: "Column width" },
        { name: "column-gap", description: "Gap between columns" },
        { name: "column-rule", description: "Column rule shorthand" },
        { name: "column-rule-width", description: "Column rule width" },
        { name: "column-rule-style", description: "Column rule style" },
        { name: "column-rule-color", description: "Column rule color" },
        { name: "column-span", description: "Column spanning" },
        { name: "column-fill", description: "Column fill behavior" },
        { name: "break-inside", description: "Break inside behavior" }
      ]
    },
    {
      name: "Scroll Properties",
      description: "Properties for scrolling behavior",
      tags: [
        { name: "scroll-behavior", description: "Scrolling behavior" },
        { name: "scroll-margin", description: "Scroll margin shorthand" },
        { name: "scroll-padding", description: "Scroll padding shorthand" },
        { name: "overscroll-behavior", description: "Overscroll behavior" }
      ]
    },
    {
      name: "Miscellaneous Properties",
      description: "Other CSS properties and values",
      tags: [
        { name: "zoom", description: "Element zoom level" },
        
        { name: "inherit", description: "Inherit parent value" },
        { name: "initial", description: "Use initial value" },
        { name: "unset", description: "Unset to inherited or initial" },
        { name: "revert", description: "Revert to user agent stylesheet" }
      ]
    }
  ]
};
