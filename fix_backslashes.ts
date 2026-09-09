import fs from 'fs';
import path from 'path';

function fixDoubleBackslashes(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace \\" with \"
    content = content.replace(/\\\\"/g, '\\"');
    // Replace \\n with \n (if I accidentally doubled them)
    // Wait, \n in double quotes SHOULD be a single backslash.
    // If I see \\n in view_file, it means the file has two.
    content = content.replace(/\\\\n/g, '\\n');
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

files.forEach(fixDoubleBackslashes);
console.log('Fixed double backslashes');
