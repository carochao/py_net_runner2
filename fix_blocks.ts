import fs from 'fs';

function fixBrokenBlocks() {
    let content = fs.readFileSync('./src/content.ts', 'utf8');

    // Fix the Tuple 1, 0 block
    content = content.replace(/task: \"### YOUR MISSION\\n\\n1\. Create a List `manifest` with `\\"item_1\\"`.\\n2\. Create a Tuple `VERSION` with `1\", `0`\.[\s\S]*?3\. Change `manifest\[0\]` to `\"item_updated\"`\.[\s\S]*?4\. Print both\.`,/g, 
        'task: "### YOUR MISSION\\n\\n1. Create a List `manifest` with `\\"item_1\\"`.\\n2. Create a Tuple `VERSION` with `1`, `0`.\\n3. Change `manifest[0]` to `\\"item_updated\\"`.\\n4. Print both.",');

    // Check for other starts-with-number lines that are broken
    const lines = content.split('\n');
    let fixedLines: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (/^\s*\d+\. /.test(line) && i > 0 && !lines[i-1].trim().endsWith(',') && !lines[i-1].trim().endsWith('{') && !lines[i-1].trim().endsWith('[')) {
            // This line likely belongs to the previous line's string
            let prev = fixedLines.pop()!;
            // Remove any trailing backticks or quotes that were breaking it
            prev = prev.replace(/[`,]$/, '');
            fixedLines.push(prev + '\\n' + line.trim());
        } else {
            fixedLines.push(line);
        }
    }
    content = fixedLines.join('\n');
    
    fs.writeFileSync('./src/content.ts', content);
}

fixBrokenBlocks();
console.log('Fixed broken blocks in content.ts');
