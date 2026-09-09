import fs from 'fs';

const filePath = './src/content.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace \\" with \"
content = content.replace(/\\\\"/g, '\\"');
// Replace \\' with ' (or \' which is also fine in double quotes)
content = content.replace(/\\\\'/g, "'");

fs.writeFileSync(filePath, content);
console.log('Fixed escaping in content.ts');
