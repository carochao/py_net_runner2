import fs from 'fs';
import path from 'path';

function inspect() {
  const dir = './src/themes';
  if (!fs.existsSync(dir)) return;
  
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.ts') && file !== 'index.ts') {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const match = content.match(/"list-filtering":\s*\{([\s\S]*?)\}/);
      if (match) {
        console.log(`=== File: ${file} ===`);
        console.log(match[0]);
      }
    }
  });
}

inspect();
