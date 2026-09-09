import { STATIC_THEMES } from './src/themes/index';
import { LESSONS } from './src/content';
import { validateCodeLocally } from './src/services/geminiService';

console.log("Starting themes verification...");

let totalPassed = 0;
let totalFailed = 0;

for (const [themeName, theme] of Object.entries(STATIC_THEMES)) {
  console.log(`\nVerifying theme: ${themeName}`);
  
  // Apply theme to lessons
  const themedLessons = LESSONS.map(lesson => {
    const override = (theme as any)[lesson.id];
    if (override) {
      // Merge overrides
      let solutionRegex = override.solutionRegex || lesson.solutionRegex;
      if (typeof solutionRegex === 'string') {
        try {
          solutionRegex = eval(solutionRegex);
        } catch (e) {}
      }
      return {
        ...lesson,
        ...override,
        solutionRegex
      };
    }
    return lesson;
  });

  // Verify each lesson
  themedLessons.forEach((lesson, index) => {
    const solution = lesson.solution;
    const regexList = lesson.solutionRegex || [];
    
    if (solution && regexList.length > 0) {
      // Prepend baseCode to solution to simulate the full user editor content
      const fullCode = (lesson.baseCode || "") + "\n" + solution;
      
      // We pass simulated inputs because some tasks wait for input()
      const simulateInputs: string[] = [];
      // populate with dummy inputs for input() tests
      for (let i = 0; i < 10; i++) simulateInputs.push("123");
      
      const validation = validateCodeLocally(fullCode, regexList, simulateInputs);
      
      const regexMatches = regexList.every((regex: any) => {
        let r = regex;
        if (typeof regex === 'string') {
          r = new RegExp(regex);
        }
        return r.test(fullCode);
      });

      if (!regexMatches) {
        console.error(`  ❌ Lesson [${index}] (${lesson.id}) solution does NOT match regexes!`);
        console.error(`     Solution: ${JSON.stringify(solution)}`);
        console.error(`     Regexes:  ${regexList.map((r: any) => r.toString()).join(' && ')}`);
        totalFailed++;
      } else if (validation.errors && validation.errors.some(e => e.type === 'error')) {
        console.error(`  ❌ Lesson [${index}] (${lesson.id}) executed with logic/syntax errors!`);
        console.error(`     Solution: ${JSON.stringify(solution)}`);
        console.error(`     Errors:    ${JSON.stringify(validation.errors)}`);
        totalFailed++;
      } else {
        totalPassed++;
      }
    }
  });
}

console.log(`\nSummary: Passed: ${totalPassed}, Failed: ${totalFailed}`);
if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log("All theme solutions verified successfully!");
  process.exit(0);
}
