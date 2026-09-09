import fs from 'fs';

const filePath = './src/content.ts';
let content = fs.readFileSync(filePath, 'utf8');

// This script converts the broken backtick strings back to safe double-quoted strings with \n
// It's a bit "brute force" but it should work for this specific file structure.

const fields = ['intro', 'task', 'solution', 'baseCode', 'technical', 'example', 'hints'];

fields.forEach(field => {
    // Match the field and everything until the likely end of the property
    // We look for field: ` OR field: " OR field: '
    // And we want to capture until the next property or end of object
    
    const startPattern = new RegExp(`${field}:\\s*[\`\\"']`, 'g');
    let match;
    let offset = 0;
    let newContent = "";
    let lastIndex = 0;
    
    while ((match = startPattern.exec(content)) !== null) {
        newContent += content.substring(lastIndex, match.index);
        let start = match.index + field.length + 2; // skip field: and whitespace
        let quoteChar = content[start];
        start += 1;
        
        // Find the "real" end of this string.
        // It's followed by , and then a newline and spaces and then another field or }
        let end = -1;
        let searchIndex = start;
        while(true) {
            let potentialEnd = content.indexOf(`${quoteChar},`, searchIndex);
            if (potentialEnd === -1) {
                // Try without comma (last property in object)
                potentialEnd = content.indexOf(`${quoteChar}\n`, searchIndex);
                if (potentialEnd === -1) break;
            }
            
            let after = content.substring(potentialEnd + 2, potentialEnd + 50);
            if (after.includes('\n') || after.includes('}') || /^\s*(id|title|level|id|headerPrefix|missionPrefix|intro|technical|example|task|baseCode|hints|solution|solutionRegex|offlineSnippet):/.test(after.trim())) {
                end = potentialEnd;
                break;
            }
            searchIndex = potentialEnd + 1;
        }
        
        if (end !== -1) {
            let inner = content.substring(start, end);
            // Unescape backticks, replace real newlines with \n
            let clean = inner.replace(/\\`/g, '`').replace(/\r\n/g, '\n').replace(/\n/g, '\\n');
            // Escape double quotes for the new container
            let escaped = clean.replace(/"/g, '\\"');
            newContent += `${field}: "${escaped}"`;
            lastIndex = end + 1; // skip closing quote
        } else {
            newContent += match[0];
            lastIndex = start;
        }
    }
    newContent += content.substring(lastIndex);
    content = newContent;
});

fs.writeFileSync(filePath, content);
console.log('Restored content.ts to double quotes');
