import fs from 'fs';

const filePath = './src/content.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace \\n with \n
content = content.replace(/\\\\n/g, '\\n');
// Replace \\" with \"
content = content.replace(/\\\\"/g, '\\"');

fs.writeFileSync(filePath, content);
console.log('Fixed double backslashes again');
