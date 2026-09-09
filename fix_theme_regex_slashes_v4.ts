import fs from 'fs';
import path from 'path';

const themesDir = './src/themes';
const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
    const filePath = path.join(themesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the list-indexing solutionRegex block
    const listIndexingIndex = content.indexOf('"list-indexing":');
    if (listIndexingIndex !== -1) {
        // Search for the first appearance of solutionRegex: [ ... ] after list-indexing
        const regexHeader = 'solutionRegex: [';
        const regexIndex = content.indexOf(regexHeader, listIndexingIndex);
        if (regexIndex !== -1) {
            const regexEndIndex = content.indexOf(']', regexIndex);
            if (regexEndIndex !== -1) {
                const originalRegexBlock = content.substring(regexIndex, regexEndIndex + 1);
                // Replace double backslashes with single backslashes inside this regex block
                const fixedRegexBlock = originalRegexBlock.replace(/\\\\/g, '\\');
                if (fixedRegexBlock !== originalRegexBlock) {
                    content = content.substring(0, regexIndex) + fixedRegexBlock + content.substring(regexEndIndex + 1);
                    fs.writeFileSync(filePath, content);
                    console.log(`Successfully fixed double backslashes in ${file} for list-indexing`);
                }
            }
        }
    }
}
