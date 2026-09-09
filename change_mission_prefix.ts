import fs from 'fs';
import path from 'path';

// 1. Update src/content.ts
const contentPath = './src/content.ts';
if (fs.existsSync(contentPath)) {
    let content = fs.readFileSync(contentPath, 'utf8');
    // Find the math-complex object and replace missionPrefix
    const complexStart = content.indexOf('id: "math-complex"');
    if (complexStart !== -1) {
        const nextBrackets = content.indexOf('}', complexStart);
        const subBlock = content.substring(complexStart, nextBrackets);
        const updatedSubBlock = subBlock.replace('missionPrefix: "MEMORY_DUMP"', 'missionPrefix: "YOUR TASK"');
        content = content.substring(0, complexStart) + updatedSubBlock + content.substring(nextBrackets);
        fs.writeFileSync(contentPath, content);
        console.log('Updated src/content.ts');
    }
}

// 2. Update themed files
const themesDir = './src/themes';
const fileNames = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const name of fileNames) {
    const filePath = path.join(themesDir, name);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find math-complex block
    const taskId = "math-complex";
    const entryStartString = `"${taskId}": {`;
    const entryStart = content.indexOf(entryStartString);
    if (entryStart !== -1) {
        let braceCount = 0;
        let entryEnd = -1;
        for (let i = entryStart + entryStartString.length; i < content.length; i++) {
            if (content[i] === '{') braceCount++;
            if (content[i] === '}') {
                if (braceCount === 0) {
                    entryEnd = i + 1;
                    break;
                }
                braceCount--;
            }
        }
        
        if (entryEnd !== -1) {
            const subBlock = content.substring(entryStart, entryEnd);
            const updatedSubBlock = subBlock.replace(/missionPrefix:\s*"MEMORY_DUMP"/, 'missionPrefix: "YOUR TASK"');
            content = content.substring(0, entryStart) + updatedSubBlock + content.substring(entryEnd);
            fs.writeFileSync(filePath, content);
            console.log(`Updated missionPrefix in theme ${name}`);
        }
    }
}
