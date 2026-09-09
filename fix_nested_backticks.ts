import fs from 'fs';
import path from 'path';

function escapeBackticksInTemplateLiterals(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');

  // This is a regex that matches backtick strings.
  // We need to find backticks INSIDE backticks and escape them.
  // This is hard with regex alone if there are multiple.
  
  // Let's try to find potential broken assignments
  // Look for field: ` ... ` and check if there are nested unescaped backticks.
  
  const fields = ['intro', 'task', 'solution', 'baseCode', 'technical', 'example'];
  
  fields.forEach(field => {
    const reg = new RegExp(`${field}:\\s*\`([\\s\\S]*?)\`\\s*,`, 'g');
    content = content.replace(reg, (match, p1) => {
      // p1 is the content inside the backticks.
      // If p1 contains unescaped backticks, escape them.
      // We look for backticks that are NOT preceded by a backslash.
      
      // But wait, if it was already broken, p1 might only be a part of the original string!
      // Example: task: `Use `print()`...`
      // The reg will match `Use ` and leave the rest as a syntax error.
      
      return match; // This won't work if it's already broken.
    });
  });

  // Let's try a different approach.
  // Find strings like: task: ` ... ` where the next part of the file doesn't make sense.
  // Actually, let's just use a state machine or a more robust parser.
  
  // Simpler idea: find lines that look like field: ` ... ` where there's a backtick in the middle.
  // Example: task: `Something `else` here`,
  
  // This pattern matches a field, followed by a backtick, then some text, then another backtick,
  // then more text, then a backtick and a comma.
  // This is specifically what happens when a single backtick was inside.
  
  fields.forEach(field => {
    const brokenReg = new RegExp(`${field}:\\s*\`([^\`]*?)\`([^\`]*?)\`,`, 'g');
    content = content.replace(brokenReg, (match, part1, part2) => {
      // part1 + part2 is the whole content.
      // We need to escape the middle backtick.
      console.log(`Fixing broken backticks in ${field}`);
      return `${field}: \`${part1}\`${part2}\`,`;
    });
    
    // Also handle cases with 2 or more nested backticks if any
    const multiBrokenReg = new RegExp(`${field}:\\s*\`([\\s\\S]*?)\`,`, 'g');
    // We can't easily regex this if it's broken across lines.
  });

  // Best way: find where the quote started and find the REAL end (which is followed by a comma and newline)
  
  fields.forEach(field => {
    const startPattern = `${field}: \``;
    let index = content.indexOf(startPattern);
    while (index !== -1) {
      let searchPos = index + startPattern.length;
      // Find the end of the entry which is `,` followed by whitespace and then either } or another field name
      // and it must be at the end of the line or before the next field.
      
      // Look for the next `,` that is followed by a newline and some spaces and then a field or }
      // This is the likely REAL end of the object property.
      
      let nextComma = content.indexOf('`,', searchPos);
      if (nextComma !== -1) {
        // Between searchPos and nextComma, we need to escape all backticks.
        let internalContent = content.substring(searchPos, nextComma);
        let escaped = internalContent.replace(/`/g, '\\`');
        content = content.substring(0, searchPos) + escaped + content.substring(nextComma);
      }
      
      index = content.indexOf(startPattern, index + 1);
    }
  });

  fs.writeFileSync(filePath, content);
}

const files = ['./src/content.ts'];
const themesDir = './src/themes';
if (fs.existsSync(themesDir)) {
  fs.readdirSync(themesDir).forEach(f => {
    if (f.endsWith('.ts') && f !== 'index.ts') {
      files.push(path.join(themesDir, f));
    }
  });
}

files.forEach(escapeBackticksInTemplateLiterals);
console.log('Finished escaping nested backticks');
