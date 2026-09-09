import fs from 'fs';
import path from 'path';

function restoreFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fields = ['intro', 'task', 'solution', 'baseCode', 'technical', 'example', 'hints'];

    fields.forEach(field => {
        const startPattern = new RegExp(`${field}:\\s*[\`\\"']`, 'g');
        let match;
        let offset = 0;
        let newContent = "";
        let lastIndex = 0;
        
        while ((match = startPattern.exec(content)) !== null) {
            newContent += content.substring(lastIndex, match.index);
            let start = match.index + field.length + 2;
            let quoteChar = content[start];
            start += 1;
            
            let end = -1;
            let searchIndex = start;
            while(true) {
                let potentialEnd = content.indexOf(`${quoteChar},`, searchIndex);
                if (potentialEnd === -1) {
                    potentialEnd = content.indexOf(`${quoteChar}\n`, searchIndex);
                    if (potentialEnd === -1) break;
                }
                
                let after = content.substring(potentialEnd + 2, potentialEnd + 50);
                if (after.includes('\n') || after.includes('}') || /^\s*(headerPrefix|missionPrefix|intro|task|baseCode|solution|solutionRegex|id|level|title|description|technical|example|hints):/.test(after.trim())) {
                    end = potentialEnd;
                    break;
                }
                searchIndex = potentialEnd + 1;
            }
            
            if (end !== -1) {
                let inner = content.substring(start, end);
                let clean = inner.replace(/\\`/g, '`').replace(/\r\n/g, '\n').replace(/\n/g, '\\n');
                let escaped = clean.replace(/"/g, '\\"');
                newContent += `${field}: "${escaped}"`;
                lastIndex = end + 1;
            } else {
                newContent += match[0];
                lastIndex = start;
            }
        }
        newContent += content.substring(lastIndex);
        content = newContent;
    });

    fs.writeFileSync(filePath, content);
}

const themesDir = './src/themes';
if (fs.existsSync(themesDir)) {
  fs.readdirSync(themesDir).forEach(f => {
    if (f.endsWith('.ts') && f !== 'index.ts') {
      restoreFile(path.join(themesDir, f));
    }
  });
}

console.log('Restored all theme files to double quotes');
