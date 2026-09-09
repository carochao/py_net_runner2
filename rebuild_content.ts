import fs from 'fs';

function rebuildContent() {
    const filePath = './src/content.ts';
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    let output: string[] = [];
    
    let currentProp: string | null = null;
    let currentValue: string = "";
    
    const propRegex = /^\s*([a-zA-Z0-9]+):\s*[\"`']([\s\S]*)/;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // If it starts with imports or the array export, just add it
        if (line.startsWith('import') || line.startsWith('export const LESSONS') || line.trim() === '];') {
            output.push(line);
            continue;
        }
        
        // If it looks like a new property
        const match = line.match(propRegex);
        if (match) {
            let name = match[1];
            let val = match[2];
            
            // Clean up the value from trailing quotes and commas
            // We want to find where it ends.
            // If it ends with ", or `, or ', it's a single line property
            if (val.trim().endsWith('",') || val.trim().endsWith('`,') || val.trim().endsWith("',") || val.trim().endsWith('"') || val.trim().endsWith('`') || val.trim().endsWith("'")) {
                let cleanVal = val.trim().replace(/^(.*)[`"'],?$/, '$1');
                // Re-escape it properly
                let escaped = cleanVal.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                output.push(`    ${name}: "${escaped}",`);
            } else {
                // Multi-line start
                currentProp = name;
                currentValue = val;
            }
        } else if (currentProp && !line.trim().startsWith('id:') && !line.trim().startsWith('level:')) {
            // Continuation of multi-line
            currentValue += '\\n' + line.trim();
            // Check if this line ends the property
            if (line.trim().endsWith('",') || line.trim().endsWith('`,') || line.trim().endsWith("',") || line.trim().endsWith('"') || line.trim().endsWith('`') || line.trim().endsWith("'")) {
                let cleanVal = currentValue.replace(/^(.*)[`"'],?$/, '$1');
                let escaped = cleanVal.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                output.push(`    ${currentProp}: "${escaped}",`);
                currentProp = null;
                currentValue = "";
            }
        } else {
            output.push(line);
        }
    }
    
    fs.writeFileSync(filePath, output.join('\n'));
}

rebuildContent();
console.log('Rebuilt content.ts structure');
