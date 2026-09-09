import fs from 'fs';

function cleanupCorruptions(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Pattern 1: "\`. -> ".
    content = content.replace(/\\\"\`\./g, '".');
    
    // Pattern 2: "\`, -> ",
    content = content.replace(/\\\"\`\,/g, '",');
    
    // Pattern 3: Backtick at end of line followed by comma
    content = content.replace(/\`,$/gm, '",');

    // Fix specifically line 641 style: True\", print \"BREACHING SECURITY"\`.`,
    // Wait, let's just find unescaped backticks and remove them if they are near quotes.
    content = content.replace(/\\\"\`/g, '"');
    content = content.replace(/\`\\\"/g, '"');
    
    // Fix the case where a property ends with `, instead of ",
    content = content.replace(/\`,(\s*\n)/g, '",$1');

    fs.writeFileSync(filePath, content);
}

cleanupCorruptions('./src/content.ts');
console.log('Cleaned patterns in content.ts');
