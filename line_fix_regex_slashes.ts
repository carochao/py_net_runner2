import fs from 'fs';
import path from 'path';

const themesDir = './src/themes';
const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
    const filePath = path.join(themesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Split into lines
    let lines = content.split('\n');
    let insideListIndexing = false;
    let modified = false;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"list-indexing": {')) {
            insideListIndexing = true;
        }
        
        if (insideListIndexing) {
            if (lines[i].includes('solutionRegex:')) {
                // Replace any double backslashes on the solutionRegex line
                let newLine = lines[i].split('\\\\').join('\\');
                if (newLine !== lines[i]) {
                    lines[i] = newLine;
                    modified = true;
                }
            }
            // Check if we hit the close block of list-indexing
            if (lines[i].trim() === '},' && i > 0 && lines[i-1].includes('solutionRegex:')) {
                insideListIndexing = false;
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'));
        console.log(`Cleaned solutionRegex line for ${file}`);
    }
}
