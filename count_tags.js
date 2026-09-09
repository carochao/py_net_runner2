import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');

const tags = [
  'div', 'main', 'section', 'header', 'footer', 'aside', 'motion.div', 
  'AnimatePresence', 'ErrorBoundary', 'Editor', 'form', 'label', 'input', 'button'
];

tags.forEach(tag => {
  const openCount = (content.match(new RegExp(`<${tag.replace('.', '\\.')}(\\s|>)`, 'g')) || []).length;
  const selfClosingCount = (content.match(new RegExp(`<${tag.replace('.', '\\.')}[^>]*\\/>`, 'g')) || []).length;
  const closeCount = (content.match(new RegExp(`</${tag.replace('.', '\\.')}>`, 'g')) || []).length;
  
  const effectiveOpen = openCount - selfClosingCount;
  
  if (effectiveOpen !== closeCount) {
    console.log(`Tag <${tag}>: Open=${openCount}, SelfClosing=${selfClosingCount}, EffectiveOpen=${effectiveOpen}, Close=${closeCount} -> DIFF=${effectiveOpen - closeCount}`);
  } else {
    // console.log(`Tag <${tag}>: Balanced (${effectiveOpen})`);
  }
});
