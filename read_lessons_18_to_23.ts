import fs from 'fs';
import path from 'path';

function inspect() {
  const dir = './src/themes';
  if (!fs.existsSync(dir)) return;
  
  const targetKeys = ["list-pop", "intro-tuples", "intro-tuples-immutability", "list-slicing", "list-filtering", "list-comprehension-range"];
  
  const files = ['roblox.ts', 'simpsons.ts', 'space.ts'];
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n============================\nFILE: ${file}\n============================`);
    targetKeys.forEach(key => {
      const regex = new RegExp(`"${key}":\\s*\\{[\\s\\S]*?\\n\\s*\\}(\\s*,|\\s*\\n)`, 'g');
      const match = content.match(regex);
      if (match) {
        // Just print key, headerPrefix, and intro
        const block = match[0];
        const introMatch = block.match(/intro:\s*(["'`])[\s\\S]*?\1/);
        const taskMatch = block.match(/task:\s*(["'`])[\s\\S]*?\1/);
        const baseCodeMatch = block.match(/baseCode:\s*(["'`])[\s\\S]*?\1/);
        console.log(`[${key}]:`);
        if (introMatch) console.log(`  Intro: ${introMatch[0].substring(0, 120)}...`);
        if (taskMatch) console.log(`  Task:  ${taskMatch[0].substring(0, 120)}...`);
        if (baseCodeMatch) console.log(`  Code:  ${baseCodeMatch[0].trim()}`);
      } else {
        console.log(`[${key}]: Not found`);
      }
    });
  });
}

inspect();
