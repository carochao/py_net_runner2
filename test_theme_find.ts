import fs from 'fs';

const testFile = './src/themes/gaming.ts';
let content = fs.readFileSync(testFile, 'utf8');

// Let's find "intro-lists"
const entryStartString = '"intro-lists": {';
const entryStart = content.indexOf(entryStartString);
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

console.log("Found intro-lists block ending at: " + entryEnd);
console.log("End portion of intro-lists block:");
console.log(content.substring(entryEnd - 50, entryEnd));
