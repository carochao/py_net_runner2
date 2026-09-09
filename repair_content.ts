import fs from 'fs';

function repairContent() {
    const filePath = './src/content.ts';
    let content = fs.readFileSync(filePath, 'utf8');

    // Pattern to match any field: `...` where it might be broken
    // We assume each lesson is an object {} in an array
    // This is hard. Let's try to just fix the most common breakage:
    // field: ` ... `...`,
    
    const fields = ['intro', 'task', 'solution', 'baseCode', 'technical', 'example'];
    
    fields.forEach(field => {
        // Find field: `
        let startToken = `${field}: \``;
        let pos = 0;
        while ((pos = content.indexOf(startToken, pos)) !== -1) {
            let start = pos + startToken.length;
            // Find the NEXT `,` that is at the end of a line (or followed by whitespace and a field name)
            // We search for ` followed by , and \n
            let end = -1;
            let searchIndex = start;
            while(true) {
                let potentialEnd = content.indexOf('`,', searchIndex);
                if (potentialEnd === -1) break;
                
                // Check if this is the REAL end.
                // Real end is followed by \n and maybe spaces and then a field name or }
                let after = content.substring(potentialEnd + 2, potentialEnd + 20);
                if (after.includes('\n') || after.includes('}') || after.trim().startsWith('id:') || after.trim().startsWith('level:')) {
                    end = potentialEnd;
                    break;
                }
                searchIndex = potentialEnd + 1;
            }
            
            if (end !== -1) {
                let inner = content.substring(start, end);
                // Unescape everything first to get back to "clean" state
                let clean = inner.replace(/\\`/g, '`');
                // Now escape correctly
                let fixed = clean.replace(/`/g, '\\`');
                content = content.substring(0, start) + fixed + content.substring(end);
                pos = start + fixed.length + 2;
            } else {
                pos = start;
            }
        }
    });

    fs.writeFileSync(filePath, content);
}

repairContent();
console.log('Repaired content.ts');
