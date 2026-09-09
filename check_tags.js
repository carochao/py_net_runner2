
import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');

const tagNames = [
  'div', 'section', 'main', 'footer', 'header', 'aside', 'motion.div', 
  'AnimatePresence', 'ErrorBoundary', 'App', 'StrictMode', 'Editor', 
  'ReactMarkdown', 'button', 'h1', 'h2', 'h3', 'p', 'span', 'nav', 'a', 
  'ul', 'li', 'strong', 'code', 'pre', 'form', 'label', 'input', 'style',
  'CheckCircle2', 'Zap', 'Menu', 'X', 'Terminal', 'Cpu', 'Layers', 'Box', 
  'ChevronRight', 'Play', 'Lightbulb', 'AlertTriangle', 'Lock', 'Unlock', 
  'Radio', 'Code2', 'ShoppingBag', 'Palette', 'ImageIcon', 'Columns', 
  'Maximize2', 'Minimize2', 'RefreshCcw', 'ChevronsUpDown', 'AlertCircle'
];

const stack = [];
const lines = content.split('\n');

// A better way: find <tag and see if it ends with /> or </tag>
// But parsing JSX with regex is dangerous.
// Let's try to just find all <TAG and </TAG

let i = 0;
while (i < content.length) {
  if (content.substring(i, i+2) === '</') {
    let end = content.indexOf('>', i);
    let tag = content.substring(i+2, end).trim();
    if (tagNames.includes(tag)) {
        let lineNum = content.substring(0, i).split('\n').length;
        if (stack.length === 0) {
            console.log(`ERROR: Closing </${tag}> without opening at line ${lineNum}`);
        } else {
            let last = stack.pop();
            if (last.tag !== tag) {
                console.log(`ERROR: Mismatched tag at line ${lineNum}: found </${tag}>, expected </${last.tag}> (opened at line ${last.line})`);
            }
        }
    }
    i = end + 1;
  } else if (content[i] === '<' && content[i+1] !== ' ' && content[i+1] !== '!' && content.substring(i, i+4) !== '<...') {
    let end = content.indexOf('>', i);
    // Find the next > while ignoring ones in strings? Hard.
    // Let's assume tags are simple for now.
    let tagContent = content.substring(i+1, end).trim();
    let tagName = tagContent.split(/\s/)[0];
    
    if (tagNames.includes(tagName)) {
        let lineNum = content.substring(0, i).split('\n').length;
        // Check if self-closing
        if (tagContent.endsWith('/') || (end > 0 && content[end-1] === '/')) {
            // Self closing
        } else {
            stack.push({ tag: tagName, line: lineNum });
        }
    }
    i = end + 1;
  } else {
    i++;
  }
}

if (stack.length > 0) {
  console.log(`ERROR: ${stack.length} unclosed tags at end of file:`);
  stack.forEach(s => console.log(`  <${s.tag}> opened at line ${s.line}`));
} else {
  console.log("SUCCESS: Tags seem balanced");
}
