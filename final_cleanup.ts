import fs from 'fs';

function finalCleanup(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix cases where we have `"` followed by `"` or ``` followed by `"`
    // Like: \"beta\"\" or \`"gamma"\`
    
    // Replace \"\" with \"
    content = content.replace(/\\\"\\\"/g, '\\"');
    
    // Replace \`" with \"
    content = content.replace(/\\\`\"/g, '\\"');
    
    // Replace \"\` with \"
    content = content.replace(/\\\"\\\`/g, '\\"');

    // Fix the case in line 288 specifically if it still persists
    // Example: with `\"alpha\"`, `\"beta\"\", and \`"gamma"\`
    // We want to remove any accidental backticks that aren't real backticks
    
    // Clean up any remaining backticks that are NOT supposed to be backticks in double quoted strings
    // If a line starts with field: " and has a ` in it that is NOT escaped, it might be a problem.
    // Actually, in double quotes, backticks are fine.
    
    // The problem in line 288 was: `\"beta\"\", and \`"gamma"\`
    // It has an extra \" at the end of beta and a \` at the start of gamma.
    
    // Let's just fix the mismatched quotes.
    
    fs.writeFileSync(filePath, content);
}

const files = ['./src/content.ts'];
const themesDir = './src/themes';
if (fs.existsSync(themesDir)) {
    fs.readdirSync(themesDir).forEach(f => {
        if (f.endsWith('.ts') && f !== 'index.ts') {
            files.push(`${themesDir}/${f}`);
        }
    });
}
// path is not defined above, let's just use the array.
files.push('./src/themes/marvel.ts');
// Actually let's just do content.ts for now as it's the one with most errors.

finalCleanup('./src/content.ts');
console.log('Final cleanup done');
