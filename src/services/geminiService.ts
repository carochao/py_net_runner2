import { STATIC_THEMES, STATIC_THEME_ALIASES } from '../themes/index';

// Helper to normalize consecutive horizontal spaces/tabs (except line leading indentation)
export function normalizeHorizontalSpaces(text: string): string {
  const lines = text.split('\n');
  const normalizedLines = lines.map(line => {
    // 1. Capture leading spaces or tabs representing indentation
    const indentMatch = line.match(/^([ \t]*)/);
    const indent = indentMatch ? indentMatch[1] : '';
    const content = line.substring(indent.length);
    
    // 2. Collapse any multiple consecutive horizontal spaces/tabs inside the rest of the line to a single space
    const collapsed = content.replace(/[ \t]+/g, ' ').trim();
    
    return indent + collapsed;
  });
  
  return normalizedLines.join('\n');
}

// Helper to relax spacing constraints in a regular expression
export function relaxRegex(r: RegExp): RegExp {
  let src = r.source;
  
  // 1. Comments: Allow optional spaces after # so `#comment` and `# comment` both work.
  src = src.replace(/([^\\#]|^)#(?:\\s\*|\\s\+|\s)*/g, "$1#\\s*");

  // 2. Word relaxation: allow both British and American spellings (favourite <-> favorite)
  src = src.replace(/favou\?rite|favourite|favorite/gi, "favou?rite");

  // 4. Allow spaces around commas: replace "," with "\\s*,\\s*"
  src = src.replace(/(\\[\s\S])|(,)/g, (match, escaped, comma) => {
    if (escaped) return escaped;
    return "\\s*,\\s*";
  });

  // 5. Allow spaces around colons: replace ":" with "\\s*:\\s*"
  src = src.replace(/(\\[\s\S])|(:)/g, (match, escaped, colon) => {
    if (escaped) return escaped;
    return "\\s*:\\s*";
  });

  // 6. Quotes: Allow optional spaces around any quote character or character class matching quotes
  src = src.replace(/(\\[\s\S])|(\[['\"\\\\]+\]|['\"])/g, (match, escaped, target) => {
    if (escaped) return escaped;
    return `\\s*${target}\\s*`;
  });

  // 7. Allow any spacing around assignment & equality operator "=" and "=="
  src = src.replace(/([^\\!=<>+\-*/\s])\s*=\s*([^\\!=<>\s])/g, "$1\\s*=\\s*$2");

  // 8. Allow optional spacing around operators like "+", "-", "*", "/", "%"
  src = src.replace(/\\([+\-*/%])/g, "\\s*\\$1\\s*");

  // 9. Allow optional spacing around escaped brackets/parentheses: "\\(", "\\)", "\\[", "\\]"
  src = src.replace(/\\\(/g, "\\s*\\(\\s*");
  src = src.replace(/\\\)/g, "\\s*\\)\\s*");
  src = src.replace(/\\\[/g, "\\s*\\[\\s*");
  src = src.replace(/\\\]/g, "\\s*\\]\\s*");

  // 10. Make all unescaped space characters match any optional spaces/tabs \\s*
  src = src.replace(/(\\[\s\S])|( )/g, (match, escaped, space) => {
    if (escaped) return escaped;
    return "\\s*";
  });

  // 11. Collapse any double spaces \\s*\\s* or extra \\s* to just one \\s*
  src = src.replace(/(?:\\s\*)+/g, "\\s*");
  src = src.replace(/(?:\\s\+)+/g, "\\s+");

  return new RegExp(src, r.flags);
}

export function normalizeUserCode(code: string): string {
  return normalizeHorizontalSpaces(code)
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2013\u2014]/g, '-');
}

export function splitTopLevelArgs(str: string): string[] {
  const args: string[] = [];
  let cur = '';
  let parenDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;
  let inQ = false;
  let qChar = '';

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (inQ) {
      cur += c;
      if (c === qChar && (i === 0 || str[i - 1] !== '\\')) {
        inQ = false;
      }
      continue;
    }
    if (c === '"' || c === "'") {
      inQ = true;
      qChar = c;
      cur += c;
      continue;
    }
    if (c === '(') { parenDepth++; cur += c; continue; }
    if (c === ')') { parenDepth--; cur += c; continue; }
    if (c === '[') { bracketDepth++; cur += c; continue; }
    if (c === ']') { bracketDepth--; cur += c; continue; }
    if (c === '{') { braceDepth++; cur += c; continue; }
    if (c === '}') { braceDepth--; cur += c; continue; }

    if (c === ',' && parenDepth === 0 && bracketDepth === 0 && braceDepth === 0) {
      if (cur.trim()) args.push(cur.trim());
      cur = '';
      continue;
    }
    cur += c;
  }
  if (cur.trim()) args.push(cur.trim());
  return args;
}

export function testWithRelaxedRegex(regex: RegExp, userCode: string): boolean {
  if (regex.test(userCode)) return true;
  
  const normalizedUserCode = normalizeUserCode(userCode);
  if (regex.test(normalizedUserCode)) return true;

  try {
    const relaxed = relaxRegex(regex);
    if (relaxed.test(userCode)) return true;
    if (relaxed.test(normalizedUserCode)) return true;

    // Test spelling variations (favorite <-> favourite)
    const ukCode = normalizedUserCode.replace(/favorite/gi, 'favourite');
    if (relaxed.test(ukCode)) return true;
    const usCode = normalizedUserCode.replace(/favourite/gi, 'favorite');
    if (relaxed.test(usCode)) return true;
  } catch (e) {
    // Ignore RegExp syntax error in relaxRegex
  }
  return false;
}

export function testCaseInsensitiveMatch(regex: RegExp, userCode: string): boolean {
  try {
    const originalFlags = regex.flags || "";
    const flags = originalFlags.includes('i') ? originalFlags : originalFlags + 'i';
    const ciRegex = new RegExp(regex.source, flags);
    if (ciRegex.test(userCode)) return true;
    
    const normalizedUserCode = normalizeUserCode(userCode);
    if (ciRegex.test(normalizedUserCode)) return true;

    const relaxed = relaxRegex(regex);
    const relaxedFlags = relaxed.flags || "";
    const rFlags = relaxedFlags.includes('i') ? relaxedFlags : relaxedFlags + 'i';
    const relaxedCi = new RegExp(relaxed.source, rFlags);
    if (relaxedCi.test(userCode)) return true;
    if (relaxedCi.test(normalizedUserCode)) return true;
  } catch (e) {
    // Ignore RegExp syntax error
  }
  return false;
}

// Local validation for simple tasks to avoid unnecessary AI calls or when offline
export function validateCodeLocally(userCode: string, solutionRegex: (string | RegExp)[], userInputs: string[] = []) {
  const lines = userCode.split('\n');
  const variables: Record<string, any> = {};
  const userFunctions: Record<string, { params: string[], body: string[] }> = {};
  const prints: string[] = [];
  const errors: { line: number; message: string; type: 'error' | 'warning' }[] = [];
  let inputCount = 0;

  const stack: { char: string; line: number; pos: number }[] = [];
  const bracketPairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  // Execution state tracking
  const executeStack = [true]; // Stack documenting if we should execute in the current block
  const ifLevelMet = [false];  // Stack documenting if an if/elif condition was met at the current depth
  let currentDepth = 0;

  const userClasses = new Set<string>();

  const stringifyValue = (evaluated: any): string => {
    if (evaluated === null) return "None";
    if (evaluated === undefined) return "None";
    if (Array.isArray(evaluated)) {
      const open = (evaluated as any).__isTuple ? '(' : '[';
      const close = (evaluated as any).__isTuple ? ')' : ']';
      const itemsStr = evaluated.map((v: any) => typeof v === 'string' ? `'${v}'` : stringifyValue(v)).join(', ');
      let finalStr = itemsStr;
      if ((evaluated as any).__isTuple && evaluated.length === 1) {
        finalStr += ',';
      }
      return `${open}${finalStr}${close}`;
    }
    if (typeof evaluated === 'object' && evaluated !== null && evaluated.__class__) {
      const className = evaluated.__class__;
      const strFuncName = `${className}.__str__`;
      if (userFunctions[strFuncName]) {
        const func = userFunctions[strFuncName];
        const firstParam = func.params[0] || 'self';
        const localScope: Record<string, any> = {};
        localScope[firstParam] = evaluated;
        
        const backup: Record<string, any> = {};
        if (variables[firstParam] !== undefined) backup[firstParam] = variables[firstParam];
        variables[firstParam] = evaluated;
        
        const savedExecuteStack = [...executeStack];
        const savedIfLevelMet = [...ifLevelMet];
        const savedDepth = currentDepth;
        
        executeStack.length = 0;
        executeStack.push(true);
        ifLevelMet.length = 0;
        ifLevelMet.push(false);
        currentDepth = 0;
        
        let retVal: any = undefined;
        const res = processLines(func.body, 0, true);
        if (res && res.returned !== undefined) retVal = res.returned;
        
        executeStack.length = 0;
        executeStack.push(...savedExecuteStack);
        ifLevelMet.length = 0;
        ifLevelMet.push(...savedIfLevelMet);
        currentDepth = savedDepth;
        
        delete variables[firstParam];
        if (backup[firstParam] !== undefined) variables[firstParam] = backup[firstParam];
        
        if (retVal !== undefined) return String(retVal);
      }
      return `<__main__.${className} object>`;
    }
    return String(evaluated);
  };

    const evaluateValue = (val: string): any => {
    val = val.trim();
    if (!val) return undefined;
    
    // Handle empty tuple
    if (val === '()') {
       const t: any = [];
       t.__isTuple = true;
       return t;
    }

    // Handle parentheses wrapping the whole expression
    let isWrapped = false;
    if (val.startsWith('(') && val.endsWith(')')) {
      // Check if they are matching. If we have (1) + (2), they are NOT matching at start/end
      let depth = 0;
      let matched = true;
      for (let k = 0; k < val.length - 1; k++) {
          if (val[k] === '(') depth++;
          else if (val[k] === ')') depth--;
          if (depth === 0) {
              matched = false;
              break;
          }
      }
      if (matched) {
          isWrapped = true;
          // Don't strip yet, we need to check for commas inside
      }
    }

    // Handle comma-separated values (tuples) outside of brackets
    let depthComma = 0;
    let inQuoteComma: string | null = null;
    let hasComma = false;
    const searchStr = isWrapped ? val.slice(1, -1) : val;
    for (let k = 0; k < searchStr.length; k++) {
        const char = searchStr[k];
        if ((char === '"' || char === "'") && (k === 0 || searchStr[k-1] !== '\\')) {
            if (!inQuoteComma) inQuoteComma = char;
            else if (inQuoteComma === char) inQuoteComma = null;
        } else if (!inQuoteComma) {
            if (char === '(' || char === '[' || char === '{') depthComma++;
            else if (char === ')' || char === ']' || char === '}') depthComma--;
            else if (char === ',' && depthComma === 0) {
                hasComma = true;
                break;
            }
        }
    }

    if (hasComma) {
        const items: any[] = [];
        let currentItem = '';
        let depth = 0;
        let inQuote: string | null = null;
        for (let k = 0; k < searchStr.length; k++) {
            const char = searchStr[k];
            if ((char === '"' || char === "'") && (k === 0 || searchStr[k-1] !== '\\')) {
                if (!inQuote) inQuote = char;
                else if (inQuote === char) inQuote = null;
            }
            if (!inQuote) {
                if (char === '(' || char === '[' || char === '{') depth++;
                else if (char === ')' || char === ']' || char === '}') depth--;
                else if (char === ',' && depth === 0) {
                    items.push(evaluateValue(currentItem.trim()));
                    currentItem = '';
                    continue;
                }
            }
            currentItem += char;
        }
        if (currentItem.trim()) items.push(evaluateValue(currentItem.trim()));
        (items as any).__isTuple = true;
        return items;
    }

    if (isWrapped) {
        return evaluateValue(val.slice(1, -1));
    }

    // Support basic expressions - Balance aware
    const operators = ['+', '-', '*', '/', '%', '**'];
    for (const op of operators) {
        let inQuote: string | null = null;
        let lastOpIndex = -1;
        let depth = 0;
        
        // Find the operator outside of quotes and all types of brackets
        for (let k = val.length - 1; k >= 0; k--) {
            const char = val[k];
            if ((char === '"' || char === "'") && (k === 0 || val[k-1] !== '\\')) {
                if (!inQuote) inQuote = char;
                else if (inQuote === char) inQuote = null;
            } else if (!inQuote) {
                if (char === ')' || char === ']' || char === '}') depth++;
                else if (char === '(' || char === '[' || char === '{') depth--;
                else if (depth === 0) {
                    if (op === '**') {
                        if (val[k] === '*' && val[k-1] === '*') {
                            lastOpIndex = k - 1;
                            break;
                        }
                    } else if (char === op) {
                        // For single char operators, make sure it's not part of a double char one
                        if (op === '*' && (val[k-1] === '*' || val[k+1] === '*')) {
                            continue;
                        }
                        lastOpIndex = k;
                        break;
                    }
                }
            }
        }

        if (lastOpIndex !== -1) {
            const leftStr = val.slice(0, lastOpIndex).trim();
            const rightStr = val.slice(lastOpIndex + op.length).trim();
            
            // Handle unary operators
            if (leftStr === '') {
                if (op === '-') return -evaluateValue(rightStr);
                if (op === '+') return evaluateValue(rightStr);
                return NaN;
            }

            const left = evaluateValue(leftStr);
            const right = evaluateValue(rightStr);
            
            if (op === '+') {
                if (typeof left === 'string' || typeof right === 'string') {
                    return String(left) + String(right);
                }
                return (left as any) + (right as any);
            }
            if (op === '-') return (left as any) - (right as any);
            if (op === '*') return (left as any) * (right as any);
            if (op === '/') return (left as any) / (right as any);
            if (op === '%') return (left as any) % (right as any);
            if (op === '**') return Math.pow(left as any, right as any);
        }
    }

    if (val === 'True') return true;
    if (val === 'False') return false;
    if (val === 'None') return null;

    // String literals
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      return val.slice(1, -1);
    }
    
    // Number literals
    if (!isNaN(Number(val)) && val !== '') return Number(val);
    
    // Variables
    if (variables[val] !== undefined) return variables[val];

    // List literals & Comprehensions
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      if (!inner) return [];
      
      // List Comprehension: [x for x in range(10) if x % 2 == 0]
      if (inner.includes(' for ') && inner.includes(' in ')) {
        const compMatch = inner.match(/^(.*?)\s+for\s+([a-zA-Z_]\w*)\s+in\s+(.*?)(?:\s+if\s+(.*))?$/);
        if (compMatch) {
          const itemExpr = compMatch[1].trim();
          const varName = compMatch[2].trim();
          const iterableExpr = compMatch[3].trim();
          const conditionExpr = compMatch[4] ? compMatch[4].trim() : null;

          let iterable: any[] = [];
          const rangeMatch = iterableExpr.match(/^range\s*\(\s*(.*?)\s*\)$/);
          if (rangeMatch) {
            const rangeArg = evaluateValue(rangeMatch[1]);
            const rangeLimit = Number(rangeArg);
            if (!isNaN(rangeLimit)) {
              for (let r = 0; r < Math.min(rangeLimit, 100); r++) iterable.push(r);
            }
          } else {
            const evaluated = evaluateValue(iterableExpr);
            if (Array.isArray(evaluated) || typeof evaluated === 'string') {
              iterable = Array.from(evaluated);
            }
          }

          const results: any[] = [];
          const backup = variables[varName];
          for (const item of iterable.slice(0, 100)) {
            variables[varName] = item;
            if (!conditionExpr || evaluateCondition(conditionExpr)) {
              results.push(evaluateValue(itemExpr));
            }
          }
          if (backup !== undefined) variables[varName] = backup;
          else delete variables[varName];
          return results;
        }
      }

      // Indexing/Slicing detection: If it ends with ] but the matching [ isn't at index 0
      let depth0 = 0;
      let lastMatchIdx = -1;
      for (let k = val.length - 1; k >= 0; k--) {
        if (val[k] === ']') depth0++;
        else if (val[k] === '[') depth0--;
        if (depth0 === 0) { lastMatchIdx = k; break; }
      }
      
      if (lastMatchIdx > 0) {
        // This is indexing/slicing on a list literal, e.g., [1,2,3][0]
        // Fall through to the indexing/slicing logic below
      } else {
        const items: any[] = [];
        let currentItem = '';
        let depth = 0;
        let inQuote: string | null = null;
        for (let k = 0; k < inner.length; k++) {
          const char = inner[k];
          if ((char === '"' || char === "'") && (k === 0 || inner[k-1] !== '\\')) {
            if (!inQuote) inQuote = char;
            else if (inQuote === char) inQuote = null;
          }
          if (!inQuote) {
            if (char === '[') depth++;
            else if (char === ']') depth--;
            else if (char === ',' && depth === 0) {
              items.push(evaluateValue(currentItem.trim()));
              currentItem = '';
              continue;
            }
          }
          currentItem += char;
        }
        if (currentItem.trim()) items.push(evaluateValue(currentItem.trim()));
        return items;
      }
    }

    // Indexing and Slicing (e.g., target[0] or target[1:4])
    if (val.endsWith(']')) {
      let depth = 0;
      let lastBracketIndex = -1;
      for (let k = val.length - 1; k >= 0; k--) {
        const char = val[k];
        if (char === ']') depth++;
        else if (char === '[') depth--;
        
        if (depth === 0) {
          lastBracketIndex = k;
          break;
        }
      }
      
      if (lastBracketIndex > 0) {
        const targetStr = val.slice(0, lastBracketIndex).trim();
        const sliceExpr = val.slice(lastBracketIndex + 1, val.length - 1).trim();
        
        const target = evaluateValue(targetStr);
        if (target !== undefined && (Array.isArray(target) || typeof target === 'string')) {
          if (sliceExpr.includes(':')) {
            const parts = sliceExpr.split(':');
            const startStr = parts[0]?.trim();
            const stopStr = parts[1]?.trim();
            
            let start = startStr ? Number(evaluateValue(startStr)) : 0;
            let stop = stopStr ? Number(evaluateValue(stopStr)) : target.length;
            
            if (isNaN(start)) start = 0;
            if (isNaN(stop)) stop = target.length;
            
            if (start < 0) start = target.length + start;
            if (stop < 0) stop = target.length + stop;
            
            return target.slice(start, stop);
          } else {
            const indexValue = evaluateValue(sliceExpr);
            const index = Number(indexValue);
            if (!isNaN(index)) {
              const idx = index < 0 ? target.length + index : index;
              return target[idx];
            }
          }
        }
      }
    }

    // Handle input()
    const inputMatch = val.match(/^input\s*\((.*)\)$/);
    if (inputMatch) {
        if (inputCount < userInputs.length) {
            const res = userInputs[inputCount];
            inputCount++;
            return res;
        }
        // Signal that more input is needed via a special return or throwing
        const promptRaw = inputMatch[1].trim();
        const prompt = promptRaw ? evaluateValue(promptRaw) : "Input required";
        const error: any = new Error("Awaiting input");
        error.awaitingInput = true;
        error.prompt = prompt;
        throw error;
    }

    // Built-in functions
    const builtInMatch = val.match(/^(len|int|str|float|type|abs|sum|min|max|bool)\s*\((.*)\)$/);
    if (builtInMatch) {
      const funcName = builtInMatch[1];
      const arg = evaluateValue(builtInMatch[2]);
      if (funcName === 'len') return Array.isArray(arg) || typeof arg === 'string' ? arg.length : 0;
      if (funcName === 'int') return parseInt(arg) || 0;
      if (funcName === 'str') return String(arg);
      if (funcName === 'float') return parseFloat(arg) || 0.0;
      if (funcName === 'type') return typeof arg;
      if (funcName === 'abs') return Math.abs(arg);
      if (funcName === 'sum') return Array.isArray(arg) ? arg.reduce((a, b) => a + b, 0) : 0;
      if (funcName === 'min') return Array.isArray(arg) ? Math.min(...arg) : arg;
      if (funcName === 'max') return Array.isArray(arg) ? Math.max(...arg) : arg;
      if (funcName === 'bool') return Boolean(arg);
    }

    // Method calls (e.g., obj.method(args))
    const methodMatch = val.match(/^([a-zA-Z_]\w*)\s*\.\s*([a-zA-Z_]\w*)\s*\((.*)\)$/);
    if (methodMatch) {
      const objName = methodMatch[1];
      const methodName = methodMatch[2];
      const argsStr = methodMatch[3];
      
      let obj = variables[objName];
      if (obj !== undefined) {
        if (typeof obj === 'object' && obj !== null && obj.__class__) {
          const className = obj.__class__;
          const methodFuncName = `${className}.${methodName}`;
          if (userFunctions[methodFuncName]) {
            const func = userFunctions[methodFuncName];
            const args: string[] = [];
            let currentArg = '';
            let depth = 0;
            let inQuote: string | null = null;
            for (let k = 0; k < argsStr.length; k++) {
                const char = argsStr[k];
                if ((char === '"' || char === "'") && (k === 0 || argsStr[k-1] !== '\\')) {
                    if (!inQuote) inQuote = char;
                    else if (inQuote === char) inQuote = null;
                }
                if (!inQuote) {
                    if (char === '(') depth++;
                    else if (char === ')') depth--;
                    else if (char === ',' && depth === 0) {
                        args.push(currentArg.trim());
                        currentArg = '';
                        continue;
                    }
                }
                currentArg += char;
            }
            if (currentArg.trim()) args.push(currentArg.trim());
            const argValues = args.map(a => evaluateValue(a));
            
            const firstParam = func.params[0] || 'self';
            const localScope: Record<string, any> = {};
            localScope[firstParam] = obj;
            
            func.params.slice(1).forEach((p, idx) => {
              localScope[p] = argValues[idx];
            });
            
            const backup: Record<string, any> = {};
            const allParams = [firstParam, ...func.params.slice(1)];
            for (const p of allParams) {
              if (variables[p] !== undefined) backup[p] = variables[p];
              variables[p] = localScope[p];
            }
            
            const savedExecuteStack = [...executeStack];
            const savedIfLevelMet = [...ifLevelMet];
            const savedDepth = currentDepth;
            
            executeStack.length = 0;
            executeStack.push(true);
            ifLevelMet.length = 0;
            ifLevelMet.push(false);
            currentDepth = 0;
            
            let returnValue: any = undefined;
            const res = processLines(func.body, 0, true);
            if (res && res.returned !== undefined) {
              returnValue = res.returned;
            }
            
            executeStack.length = 0;
            executeStack.push(...savedExecuteStack);
            ifLevelMet.length = 0;
            ifLevelMet.push(...savedIfLevelMet);
            currentDepth = savedDepth;
            
            for (const p of allParams) {
              delete variables[p];
              if (backup[p] !== undefined) variables[p] = backup[p];
            }
            return returnValue;
          }
        }
        if (Array.isArray(obj)) {
          if (methodName === 'pop') {
            const indexArg = argsStr.trim();
            const indexValue = indexArg ? evaluateValue(indexArg) : undefined;
            const index = indexValue !== undefined ? Number(indexValue) : obj.length - 1;
            
            if (!isNaN(index) && index >= 0 && index < obj.length) {
              return obj.splice(index, 1)[0];
            }
            return null;
          }
          if (methodName === 'append') {
            const item = evaluateValue(argsStr);
            obj.push(item);
            return null;
          }
          if (methodName === 'remove') {
            const item = evaluateValue(argsStr);
            const idx = obj.indexOf(item);
            if (idx !== -1) obj.splice(idx, 1);
            return null;
          }
          if (methodName === 'count') {
            const item = evaluateValue(argsStr);
            return obj.filter(x => x === item).length;
          }
        }
        if (typeof obj === 'string') {
          if (methodName === 'upper') return obj.toUpperCase();
          if (methodName === 'lower') return obj.toLowerCase();
          if (methodName === 'capitalize') return obj.charAt(0).toUpperCase() + obj.slice(1).toLowerCase();
          if (methodName === 'strip') return obj.trim();
          if (methodName === 'replace') {
            const args = argsStr.split(',').map(s => evaluateValue(s.trim()));
            return obj.split(args[0]).join(args[1]);
          }
        }
      }
    }

    // Handle function calls
    const funcCallMatch = val.match(/^([a-zA-Z_]\w*)\s*\((.*)\)$/);
    if (funcCallMatch) {
      const funcName = funcCallMatch[1];
      const argsStr = funcCallMatch[2];
      
      if (userClasses.has(funcName)) {
        const instanceObj: Record<string, any> = { __class__: funcName };
        const initFuncName = `${funcName}.__init__`;
        if (userFunctions[initFuncName]) {
          const func = userFunctions[initFuncName];
          const args: string[] = [];
          let currentArg = '';
          let depth = 0;
          let inQuote: string | null = null;
          for (let k = 0; k < argsStr.length; k++) {
              const char = argsStr[k];
              if ((char === '"' || char === "'") && (k === 0 || argsStr[k-1] !== '\\')) {
                  if (!inQuote) inQuote = char;
                  else if (inQuote === char) inQuote = null;
              }
              if (!inQuote) {
                  if (char === '(') depth++;
                  else if (char === ')') depth--;
                  else if (char === ',' && depth === 0) {
                      args.push(currentArg.trim());
                      currentArg = '';
                      continue;
                  }
              }
              currentArg += char;
          }
          if (currentArg.trim()) args.push(currentArg.trim());
          const argValues = args.map(a => evaluateValue(a));
          
          const firstParam = func.params[0] || 'self';
          const localScope: Record<string, any> = {};
          localScope[firstParam] = instanceObj;
          
          func.params.slice(1).forEach((p, idx) => {
            localScope[p] = argValues[idx];
          });
          
          const backup: Record<string, any> = {};
          const allParams = [firstParam, ...func.params.slice(1)];
          for (const p of allParams) {
            if (variables[p] !== undefined) backup[p] = variables[p];
            variables[p] = localScope[p];
          }
          
          const savedExecuteStack = [...executeStack];
          const savedIfLevelMet = [...ifLevelMet];
          const savedDepth = currentDepth;
          
          executeStack.length = 0;
          executeStack.push(true);
          ifLevelMet.length = 0;
          ifLevelMet.push(false);
          currentDepth = 0;
          
          processLines(func.body, 0, true);
          
          executeStack.length = 0;
          executeStack.push(...savedExecuteStack);
          ifLevelMet.length = 0;
          ifLevelMet.push(...savedIfLevelMet);
          currentDepth = savedDepth;
          
          for (const p of allParams) {
            delete variables[p];
            if (backup[p] !== undefined) variables[p] = backup[p];
          }
        }
        return instanceObj;
      }
      
      if (userFunctions[funcName]) {
        const func = userFunctions[funcName];
        // Improved split that respects parentheses
        const args: string[] = [];
        let currentArg = '';
        let depth = 0;
        let inQuote: string | null = null;
        
        for (let k = 0; k < argsStr.length; k++) {
            const char = argsStr[k];
            if ((char === '"' || char === "'") && (k === 0 || argsStr[k-1] !== '\\')) {
                if (!inQuote) inQuote = char;
                else if (inQuote === char) inQuote = null;
            }
            
            if (!inQuote) {
                if (char === '(') depth++;
                else if (char === ')') depth--;
                else if (char === ',' && depth === 0) {
                    args.push(currentArg.trim());
                    currentArg = '';
                    continue;
                }
            }
            currentArg += char;
        }
        if (currentArg.trim()) args.push(currentArg.trim());

        const argValues = args.map(a => evaluateValue(a));
        
        // Setup local scope
        const localScope: Record<string, any> = {};
        func.params.forEach((p, idx) => {
          localScope[p] = argValues[idx];
        });

        // Backup global variables that collide
        const backup: Record<string, any> = {};
        for (const p of func.params) {
          if (variables[p] !== undefined) backup[p] = variables[p];
          variables[p] = localScope[p];
        }

        // Save execution state
        const savedExecuteStack = [...executeStack];
        const savedIfLevelMet = [...ifLevelMet];
        const savedDepth = currentDepth;

        // Reset state for function scope
        executeStack.length = 0;
        executeStack.push(true);
        ifLevelMet.length = 0;
        ifLevelMet.push(false);
        currentDepth = 0;

        // Execute function body
        let returnValue: any = undefined;
        const result: any = processLines(func.body, 0, true);
        if (result && result.returned !== undefined) {
          returnValue = result.returned;
        }

        // Restore execution state
        executeStack.length = 0;
        executeStack.push(...savedExecuteStack);
        ifLevelMet.length = 0;
        ifLevelMet.push(...savedIfLevelMet);
        currentDepth = savedDepth;

        // Restore global variables
        for (const p of func.params) {
          delete variables[p];
          if (backup[p] !== undefined) variables[p] = backup[p];
        }

        return returnValue;
      }
    }

    // Handle f-strings
    if (val.startsWith('f"') || val.startsWith("f'") || val.startsWith('F"') || val.startsWith("F'")) {
      let content = val.slice(2, -1);
      return content.replace(/\{(.*?)\}/g, (_match, expr) => {
        const evaluated = evaluateValue(expr.trim());
        return evaluated !== undefined ? stringifyValue(evaluated) : 'None';
      });
    }

    // Object Property Access (e.g., obj.prop)
    const propAccessMatch = val.match(/^([a-zA-Z_]\w*)\s*\.\s*([a-zA-Z_]\w*)$/);
    if (propAccessMatch) {
      const objName = propAccessMatch[1];
      const propName = propAccessMatch[2];
      
      const obj = variables[objName];
      if (obj !== undefined && typeof obj === 'object' && obj !== null) {
        return obj[propName] !== undefined ? obj[propName] : 'None';
      }
      const classAttr = variables[propName];
      if (classAttr !== undefined) {
        return classAttr;
      }
      return 'None';
    }
    
    // Fallback
    if (/^[a-zA-Z_]\w*$/.test(val)) {
        return undefined; // Resolve as undefined if it looks like a variable but isn't set
    }
    return val;
  };

  const evaluateCondition = (expr: string): boolean => {
    expr = expr.trim();

    // Handle 'and' and 'or'
    if (expr.includes(' and ')) {
      const parts = expr.split(' and ');
      return parts.every(p => evaluateCondition(p));
    }
    if (expr.includes(' or ')) {
      const parts = expr.split(' or ');
      return parts.some(p => evaluateCondition(p));
    }

    const ops = ['==', '!=', '>=', '<=', '>', '<'];
    for (const op of ops) {
        let inQuote: string | null = null;
        let lastOpIndex = -1;
        let depth = 0;
        
        for (let k = expr.length - 1; k >= 0; k--) {
            const char = expr[k];
            if ((char === '"' || char === "'") && (k === 0 || expr[k-1] !== '\\')) {
                if (!inQuote) inQuote = char;
                else if (inQuote === char) inQuote = null;
            } else if (!inQuote) {
                if (char === ')' || char === ']' || char === '}') depth++;
                else if (char === '(' || char === '[' || char === '{') depth--;
                else if (depth === 0) {
                    if (expr.slice(k, k + op.length) === op) {
                        // Special check for single > or < to not match >= or <=
                        if ((op === '>' || op === '<') && (expr[k+1] === '=' || expr[k-1] === '!')) {
                            continue;
                        }
                        // Also check == to not match !=
                        if (op === '==' && expr[k-1] === '!') {
                            continue;
                        }
                        lastOpIndex = k;
                        break;
                    }
                }
            }
        }

        if (lastOpIndex !== -1) {
            const leftStr = expr.slice(0, lastOpIndex).trim();
            const rightStr = expr.slice(lastOpIndex + op.length).trim();
            const left = evaluateValue(leftStr);
            const right = evaluateValue(rightStr);
            if (op === '==') return left == right;
            if (op === '!=') return left != right;
            if (op === '>=') return left >= right;
            if (op === '<=') return left <= right;
            if (op === '>') return left > right;
            if (op === '<') return left < right;
        }
    }
    const val = evaluateValue(expr);
    return !!val;
  };

  const processLines = (linesToProcess: string[], startingLineIdx: number, isFunctionScope = false, classPrefix?: string): any => {
    let i = 0;
    while (i < linesToProcess.length) {
      const line = linesToProcess[i];
      const lineNum = startingLineIdx + i + 1;
      
      // Strip comments for matching
      let codePart = line.split('#')[0];
      const trimmed = codePart.trim();
      
      // Skip empty lines or comments
      if (!trimmed) {
        i++;
        continue;
      }

      // --- Indentation Management ---
      const leadingSpaces = line.search(/\S/);
      // Ensure we don't process indentation for lines that are just whitespace (handled by trimmed check above, but safer)
      if (leadingSpaces === -1) {
        i++;
        continue;
      }
      const indentLevel = Math.floor(leadingSpaces / 4);

      // Check if we are on a continuation of a previously started level (elif/else)
      const isContinuation = trimmed.startsWith('elif ') || trimmed.startsWith('else:');

      // If we moved out of a block, pop until we match depth.
      while (indentLevel < currentDepth && !(indentLevel === currentDepth - 1 && isContinuation)) {
        executeStack.pop();
        ifLevelMet.pop();
        currentDepth--;
      }

      const expectedIndent = currentDepth * 4;
      const isInBrackets = stack.length > 0;

      // --- New Indentation Check ---
      const prevLineIdx = i - 1;
      let prevLineWasColon = false;
      if (prevLineIdx >= 0) {
        // Find previous non-empty line
        let p = prevLineIdx;
        while (p >= 0 && !linesToProcess[p].trim()) p--;
        if (p >= 0) {
          const prevLine = linesToProcess[p].split('#')[0].trim();
          if (prevLine.endsWith(':')) {
            prevLineWasColon = true;
            const prevLeadingSpaces = linesToProcess[p].search(/\S/);
            if (leadingSpaces <= prevLeadingSpaces) {
              errors.push({ line: lineNum, message: "IndentationError: expected an indented block", type: 'error' });
            }
          }
        }
      }

      if (!prevLineWasColon && leadingSpaces > expectedIndent && !isInBrackets) {
          errors.push({ line: lineNum, message: "IndentationError: unexpected indent", type: 'error' });
      } else if (!prevLineWasColon && leadingSpaces < expectedIndent && !isContinuation && !isInBrackets) {
          // If we are less than expected but didn't pop enough (e.g. 2 spaces when depth is 1 (4 spaces))
          errors.push({ line: lineNum, message: "IndentationError: unindent does not match any outer indentation level", type: 'error' });
      }

      const isExecuting = executeStack[currentDepth];

      // --- Syntax Check: Brackets (ignoring contents of string literals and comments) ---
      let inSingleQuote = false;
      let inDoubleQuote = false;
      let inTripleSingle = false;
      let inTripleDouble = false;
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        // Handle comment
        if (!inSingleQuote && !inDoubleQuote && !inTripleSingle && !inTripleDouble && char === '#') {
          break; // Rest of line is comment
        }
        // Handle quotes
        if (!inSingleQuote && !inTripleSingle) {
          if (line.slice(j, j + 3) === '"""') {
            inTripleDouble = !inTripleDouble;
            j += 2;
            continue;
          } else if (!inTripleDouble && char === '"' && (j === 0 || line[j - 1] !== '\\')) {
            inDoubleQuote = !inDoubleQuote;
            continue;
          }
        }
        if (!inDoubleQuote && !inTripleDouble) {
          if (line.slice(j, j + 3) === "'''") {
            inTripleSingle = !inTripleSingle;
            j += 2;
            continue;
          } else if (!inTripleSingle && char === "'" && (j === 0 || line[j - 1] !== '\\')) {
            inSingleQuote = !inSingleQuote;
            continue;
          }
        }

        // Only check brackets outside strings
        if (!inSingleQuote && !inDoubleQuote && !inTripleSingle && !inTripleDouble) {
          if (['(', '[', '{'].includes(char)) {
            stack.push({ char, line: lineNum, pos: j });
          } else if ([')', ']', '}'].includes(char)) {
            const last = stack.pop();
            if (!last || last.char !== bracketPairs[char]) {
              errors.push({ line: lineNum, message: `SyntaxError: Closing '${char}' does not match any opening bracket.`, type: 'error' });
            }
          }
        }
      }

      // --- Syntax Check: Quotes (always check, ignoring triple-quoted docstrings) ---
      const hasTripleQuotes = line.includes('"""') || line.includes("'''");
      if (!hasTripleQuotes) {
        const quoteCount = (line.match(/"/g) || []).length;
        const singleQuoteCount = (line.match(/'/g) || []).length;
        if (quoteCount % 2 !== 0 && !line.includes("'") && !line.includes("\\\"")) {
          errors.push({ line: lineNum, message: "SyntaxError: EOL while scanning string literal (unclosed double quote).", type: 'error' });
        }
        if (singleQuoteCount % 2 !== 0 && !line.includes('"') && !line.includes("\\'")) {
          errors.push({ line: lineNum, message: "SyntaxError: EOL while scanning string literal (unclosed single quote).", type: 'error' });
        }
      }

      // --- Loop Simulation (FOR) ---
      const forMatch = trimmed.match(/^for\s+([a-zA-Z_][\w,\s]*)\s+in\s+(.*):$/);
      if (forMatch) {
        if (!trimmed.endsWith(':')) {
           errors.push({ line: lineNum, message: "SyntaxError: Expected ':' at the end of statement.", type: 'error' });
        }
        
        const rawVarNames = forMatch[1].trim();
        const targetVars = rawVarNames.split(',').map(s => s.trim()).filter(Boolean);
        const iterableExpr = forMatch[2].trim().replace(/:$/, ""); // Ensure no colon at end
        
        // Find the block
        const blockLines: string[] = [];
        let j = i + 1;
        let blockBaseIndent = -1;
        while (j < linesToProcess.length) {
          const nextLine = linesToProcess[j];
          const nextTrimmed = nextLine.trim();
          if (!nextTrimmed) {
            blockLines.push(nextLine);
            j++;
            continue;
          }
          const nextLeadingSpaces = nextLine.search(/\S/);
          if (nextLeadingSpaces > leadingSpaces) {
            if (blockBaseIndent === -1) blockBaseIndent = nextLeadingSpaces;
            blockLines.push(blockBaseIndent !== -1 ? nextLine.slice(blockBaseIndent) : nextLine);
            j++;
          } else {
            break;
          }
        }

        if (blockLines.length === 0 || blockLines.every(l => !l.trim())) {
           errors.push({ line: lineNum, message: "IndentationError: expected an indented block", type: 'error' });
        }
        
        if (isExecuting && blockLines.length > 0) {
          try {
            let iterable: any[] = [];
            const rangeMatch = iterableExpr.match(/^range\s*\(\s*(.*?)\s*\)$/);
            
            if (rangeMatch) {
              const parts = splitTopLevelArgs(rangeMatch[1]).map(p => evaluateValue(p));
              let start = 0, stop = 0, step = 1;
              if (parts.length === 1) {
                stop = Number(parts[0]) || 0;
              } else if (parts.length === 2) {
                start = Number(parts[0]) || 0;
                stop = Number(parts[1]) || 0;
              } else if (parts.length >= 3) {
                start = Number(parts[0]) || 0;
                stop = Number(parts[1]) || 0;
                step = Number(parts[2]) || 1;
              }
              if (step > 0) {
                for (let r = start; r < stop && iterable.length < 2500; r += step) iterable.push(r);
              } else if (step < 0) {
                for (let r = start; r > stop && iterable.length < 2500; r += step) iterable.push(r);
              }
            } else {
                const evaluated = evaluateValue(iterableExpr);
                if (typeof evaluated === 'string' || Array.isArray(evaluated)) {
                    iterable = Array.from(evaluated);
                } else if (evaluated && typeof evaluated === 'object') {
                    iterable = Object.entries(evaluated);
                }
            }

            if (iterable.length > 0) {
              // Process the block N times
              for (const item of iterable.slice(0, 2500)) { // Cap at 2500 to avoid infinite loops
                if (targetVars.length === 1) {
                  variables[targetVars[0]] = item;
                } else {
                  if (Array.isArray(item)) {
                    targetVars.forEach((v, idx) => {
                      variables[v] = item[idx];
                    });
                  } else if (item && typeof item === 'object') {
                    const entries = Object.entries(item);
                    if (entries.length > 0) {
                      targetVars[0] && (variables[targetVars[0]] = entries[0][0]);
                      targetVars[1] && (variables[targetVars[1]] = entries[0][1]);
                    }
                  }
                }
                
                // Save state before processing block
                const savedExecuteStack = [...executeStack];
                const savedIfLevelMet = [...ifLevelMet];
                const savedDepth = currentDepth;
                
                // Isolate environment for sub-block
                executeStack.length = 0;
                executeStack.push(isExecuting);
                ifLevelMet.length = 0;
                ifLevelMet.push(false);
                currentDepth = 0;
                
                const result: any = processLines(blockLines, startingLineIdx + i + 1);
                
                // If the block processing requested input, cascade it up
                if (result && result.awaitingInput) return result;
                if (result && result.returned !== undefined) return result;
                if (result && result.break) break;
                if (result && result.continue) continue;

                // Restore state after processing block
                executeStack.length = 0;
                executeStack.push(...savedExecuteStack);
                ifLevelMet.length = 0;
                ifLevelMet.push(...savedIfLevelMet);
                currentDepth = savedDepth;
              }
            }
          } catch (e: any) {
             if (e && e.awaitingInput) {
               return {
                 success: false,
                 feedback: "Awaiting user input...",
                 output: prints,
                 errors: [],
                 awaitingInput: true,
                 lastPrompt: e.prompt
               };
             }
             throw e;
          }
        }
        
        i = j; // Skip the block in the main processing
        continue;
      }

      // --- Loop Simulation (WHILE) ---
      const whileMatch = trimmed.match(/^while\s+(.*):$/);
      if (whileMatch) {
        if (!trimmed.endsWith(':')) {
           errors.push({ line: lineNum, message: "SyntaxError: Expected ':' at the end of statement.", type: 'error' });
        }
        
        const condition = whileMatch[1];
        
        // Find the block
        const blockLines: string[] = [];
        let j = i + 1;
        let blockBaseIndent = -1;
        while (j < linesToProcess.length) {
          const nextLine = linesToProcess[j];
          const nextTrimmed = nextLine.trim();
          if (!nextTrimmed) {
            blockLines.push(nextLine);
            j++;
            continue;
          }
          const nextLeadingSpaces = nextLine.search(/\S/);
          if (nextLeadingSpaces > leadingSpaces) {
            if (blockBaseIndent === -1) blockBaseIndent = nextLeadingSpaces;
            blockLines.push(blockBaseIndent !== -1 ? nextLine.slice(blockBaseIndent) : nextLine);
            j++;
          } else {
            break;
          }
        }

        if (blockLines.length === 0 || blockLines.every(l => !l.trim())) {
           errors.push({ line: lineNum, message: "IndentationError: expected an indented block", type: 'error' });
        }

        if (isExecuting && blockLines.length > 0) {
          try {
            let safetyBreak = 0;
            while (evaluateCondition(condition) && safetyBreak < 2500) {
              // Save state before processing block
              const savedExecuteStack = [...executeStack];
              const savedIfLevelMet = [...ifLevelMet];
              const savedDepth = currentDepth;
              
              // Isolate environment for sub-block
              executeStack.length = 0;
              executeStack.push(isExecuting);
              ifLevelMet.length = 0;
              ifLevelMet.push(false);
              currentDepth = 0;
              
              const result: any = processLines(blockLines, startingLineIdx + i + 1);
              
              // If the block processing requested input, cascade it up
              if (result && result.awaitingInput) return result;
              if (result && result.returned !== undefined) return result;
              if (result && result.break) break;
              if (result && result.continue) continue;

              // Restore state after processing block
              executeStack.length = 0;
              executeStack.push(...savedExecuteStack);
              ifLevelMet.length = 0;
              ifLevelMet.push(...savedIfLevelMet);
              currentDepth = savedDepth;
              
              safetyBreak++;
            }

            if (evaluateCondition(condition) && safetyBreak === 2500) {
              errors.push({ line: lineNum, message: "RuntimeError: Potential infinite loop detected or too many iterations (capped at 2500).", type: 'error' });
            }
          } catch (e: any) {
             if (e && e.awaitingInput) {
               return {
                 success: false,
                 feedback: "Awaiting user input...",
                 output: prints,
                 errors: [],
                 awaitingInput: true,
                 lastPrompt: e.prompt
               };
             }
             throw e;
          }
        }
        
        i = j; // Skip the block in the main processing
        continue;
      }

      // --- Class Definition (CLASS) ---
      const classMatch = trimmed.match(/^class\s+([a-zA-Z_]\w*)(?:\s*\((.*)\))?\s*:$/);
      if (classMatch) {
         if (!trimmed.endsWith(':')) {
           errors.push({ line: lineNum, message: "SyntaxError: Expected ':' at the end of statement.", type: 'error' });
         }
         const className = classMatch[1];
         let j = i + 1;
         const blockLines: string[] = [];
         let blockBaseIndent = -1;
         while (j < linesToProcess.length) {
           const nextLine = linesToProcess[j];
           const nextTrimmed = nextLine.trim();
           if (!nextTrimmed) {
             blockLines.push(nextLine);
             j++;
             continue;
           }
           const nextLeadingSpaces = nextLine.search(/\S/);
           if (nextLeadingSpaces > leadingSpaces) {
             if (blockBaseIndent === -1) blockBaseIndent = nextLeadingSpaces;
             blockLines.push(blockBaseIndent !== -1 ? nextLine.slice(blockBaseIndent) : nextLine);
             j++;
           } else {
             break;
           }
         }
         
         if (blockLines.length === 0 || blockLines.every(l => !l.trim())) {
           errors.push({ line: lineNum, message: "IndentationError: expected an indented block", type: 'error' });
         }
         
         if (isExecuting) {
            userClasses.add(className);
            variables[className] = true;
            // Execute class body lines immediately to define methods and track variables
            processLines(blockLines, startingLineIdx + i + 1, false, className);
         }
         
         i = j;
         continue;
      }

      // --- Function Definition (DEF) ---
      const defMatch = trimmed.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*)\)\s*:$/);
      if (defMatch) {
        const funcName = defMatch[1];
        const params = defMatch[2].split(',').map(p => p.trim()).filter(p => p);
        
        let j = i + 1;
        const blockLines: string[] = [];
        let blockBaseIndent = -1;
        while (j < linesToProcess.length) {
          const nextLine = linesToProcess[j];
          const nextTrimmed = nextLine.trim();
          if (!nextTrimmed) {
            blockLines.push(nextLine);
            j++;
            continue;
          }
          const nextLeadingSpaces = nextLine.search(/\S/);
          if (nextLeadingSpaces > leadingSpaces) {
            if (blockBaseIndent === -1) blockBaseIndent = nextLeadingSpaces;
            blockLines.push(blockBaseIndent !== -1 ? nextLine.slice(blockBaseIndent) : nextLine);
            j++;
          } else {
            break;
          }
        }
        
        if (blockLines.length === 0 || blockLines.every(l => !l.trim())) {
          errors.push({ line: lineNum, message: "IndentationError: expected an indented block", type: 'error' });
        }
        
        if (isExecuting) {
          const registeredName = classPrefix ? `${classPrefix}.${funcName}` : funcName;
          userFunctions[registeredName] = { params, body: blockLines };
        }
        
        i = j; // Skip block
        continue;
      }

      // --- Break / Continue ---
      if ((trimmed === 'break' || trimmed === 'continue') && isExecuting) {
        return { [trimmed]: true };
      }

      // --- Return Statement ---
      const returnMatch = trimmed.match(/^return\s*(.*)$/);
      if (returnMatch && isExecuting) {
        if (!isFunctionScope) {
          errors.push({ line: lineNum, message: "SyntaxError: 'return' outside function.", type: 'error' });
        } else {
          const val = evaluateValue(returnMatch[1] || 'None');
          return { returned: val };
        }
        i++;
        continue;
      }

      // --- Conditional Branching (IF / ELIF / ELSE) ---
      const ifMatch = trimmed.match(/^if\s+(.*):$/);
      const elifMatch = trimmed.match(/^elif\s+(.*):$/);
      const elseMatch = trimmed.match(/^else:$/);

      if (ifMatch || elifMatch || elseMatch) {
        if (!trimmed.endsWith(':')) {
           errors.push({ line: lineNum, message: "SyntaxError: Expected ':' at the end of statement.", type: 'error' });
           i++;
           return;
        }

        try {
          if (ifMatch) {
            const condition = ifMatch[1];
            const result = isExecuting ? evaluateCondition(condition) : false;
            executeStack.push(isExecuting && result);
            ifLevelMet.push(result);
            currentDepth++;
          } else if (elifMatch) {
            const condition = elifMatch[1];
            const conditionMetInChain = ifLevelMet[currentDepth];
            const parentExecuting = executeStack[currentDepth - 1] ?? true;
            
            if (conditionMetInChain) {
              executeStack[currentDepth] = false;
            } else {
              const result = parentExecuting && evaluateCondition(condition);
              executeStack[currentDepth] = result;
              if (result) ifLevelMet[currentDepth] = true;
            }
          } else if (elseMatch) {
            const conditionMetInChain = ifLevelMet[currentDepth];
            const parentExecuting = executeStack[currentDepth - 1] ?? true;
            executeStack[currentDepth] = parentExecuting && !conditionMetInChain;
          }
        } catch (e: any) {
           if (e && e.awaitingInput) {
             return {
               success: false,
               feedback: "Awaiting user input...",
               output: prints,
               errors: [],
               awaitingInput: true,
               lastPrompt: e.prompt
             };
           }
           throw e;
        }
        i++;
        continue;
      }

      // --- Common Python Keywords missing colons ---
      if (trimmed.match(/^(for|while|def|class)\b/i) && !trimmed.endsWith(':')) {
        errors.push({ line: lineNum, message: `SyntaxError: Expected ':' at the end of statement.`, type: 'error' });
        i++;
        continue;
      }

      // If we are skipping this block, skip simulation but keep syntax checks above
      if (!isExecuting) {
        i++;
        continue;
      }

      // --- Logic Simulation (Standalone Expression / Method Call) ---
      const isStandaloneMethodCall = /^[a-zA-Z_]\w*\s*\.\s*[a-zA-Z_]\w*\s*\(.*\)$/.test(trimmed);
      if (isStandaloneMethodCall && isExecuting) {
        evaluateValue(trimmed);
        i++;
        continue;
      }

      // --- Object Property Assignment (obj.prop = value) ---
      const propAssignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*\.\s*([a-zA-Z_]\w*)\s*([+\-*/])?=\s*(.*)$/);
      if (propAssignMatch) {
         const objName = propAssignMatch[1];
         const propName = propAssignMatch[2];
         const op = propAssignMatch[3];
         const rValueExpr = propAssignMatch[4].trim();
         
         if (isExecuting) {
            const evaluatedValue = evaluateValue(rValueExpr);
            if (variables[objName] === undefined || typeof variables[objName] !== 'object' || variables[objName] === null) {
               variables[objName] = {};
            }
            if (op) {
               const currentVal = variables[objName][propName] ?? 0;
               if (op === '+') variables[objName][propName] = currentVal + evaluatedValue;
               if (op === '-') variables[objName][propName] = currentVal - evaluatedValue;
               if (op === '*') variables[objName][propName] = currentVal * evaluatedValue;
               if (op === '/') variables[objName][propName] = currentVal / evaluatedValue;
            } else {
               variables[objName][propName] = evaluatedValue;
            }
         }
         i++;
         continue;
      }

      // --- Logic Simulation (Variable Assignment) ---
      // Restricted regex to avoid matching comparisons like 'if x == 5' or 'print(x == 5)'
      const assignMatch = trimmed.match(/^([a-zA-Z_]\w*(?:\s*\[.*?\])?(?:\s*,\s*[a-zA-Z_]\w*(?:\s*\[.*?\])?)*)\s*([+\-*/])?=(?!=)\s*(.*)$/);
      if (assignMatch) {
        const lhs = assignMatch[1].trim();
        const op = assignMatch[2];
        let valueExpr = assignMatch[3].split('#')[0].trim();

        const trimmedVal = valueExpr.trim();
        let hasLineError = false;
        if (trimmedVal) {
          const isNumericVal = !isNaN(Number(trimmedVal)) && trimmedVal !== '';
          const isVariableVal = /^[a-zA-Z_]\w*$/.test(trimmedVal) && variables[trimmedVal] !== undefined;
          const isUndefinedVariableVal = /^[a-zA-Z_]\w*$/.test(trimmedVal) && variables[trimmedVal] === undefined;
          const isStringLiteralVal = 
            (trimmedVal.startsWith('"') && trimmedVal.endsWith('"')) || 
            (trimmedVal.startsWith("'") && trimmedVal.endsWith("'")) ||
            (trimmedVal.startsWith('f"') && trimmedVal.endsWith('"')) ||
            (trimmedVal.startsWith("f'") && trimmedVal.endsWith("'")) ||
            (trimmedVal.startsWith('F"') && trimmedVal.endsWith('"')) ||
            (trimmedVal.startsWith("F'") && trimmedVal.endsWith("'"));
          const isReservedVal = ['True', 'False', 'None'].includes(trimmedVal);

          // Skip false positive unquoted space/colon checks for lists, tuples, dicts, list comprehensions, and list slicing
          const isBracketedOrSlicing = 
            (trimmedVal.startsWith('[') && trimmedVal.endsWith(']')) ||
            (trimmedVal.startsWith('(') && trimmedVal.endsWith(')')) ||
            (trimmedVal.startsWith('{') && trimmedVal.endsWith('}')) ||
            (/\w+\s*\[.*\]/.test(trimmedVal)) ||
            (/\bfor\s+[a-zA-Z_]\w*\s+in\s+/.test(trimmedVal));

          if (!isStringLiteralVal && !isNumericVal && !isVariableVal && !isReservedVal && !isBracketedOrSlicing) {
             const holdsUnquotedSpaces = /\b[a-zA-Z_]\w*\s+[a-zA-Z0-9_]/.test(trimmedVal);
             const holdsColons = trimmedVal.includes(':');
             const containsOperators = /[+\-*/%]/.test(trimmedVal);
             const containsFunctionCall = /[a-zA-Z_]\w*\s*\(/.test(trimmedVal);

             if ((holdsUnquotedSpaces || holdsColons) && !containsOperators && !containsFunctionCall) {
                errors.push({ 
                  line: lineNum, 
                  message: `SyntaxError: invalid syntax. String literals must be enclosed in quotes (e.g., "${trimmedVal}")`, 
                  type: 'error' 
                });
                hasLineError = true;
             } else if (isUndefinedVariableVal) {
                errors.push({
                  line: lineNum,
                  message: `NameError: name '${trimmedVal}' is not defined. Did you forget to wrap it in quotes or define it?`,
                  type: 'error'
                });
                hasLineError = true;
             }
          }
        }

        if (hasLineError) {
          i++;
          continue;
        }

        // Logic simulation
        try {
          const val = evaluateValue(valueExpr);
          
          if (lhs.includes(',')) {
            // Multiple assignment: cpu, ram = 80, 43 or a, b = [1, 2]
            const targets = lhs.split(',').map(t => t.trim().split('#')[0].trim());
            if (Array.isArray(val) && val.length === targets.length) {
              targets.forEach((target, idx) => {
                variables[target] = val[idx];
              });
            } else if (Array.isArray(val)) {
               errors.push({ line: lineNum, message: `ValueError: too many values to unpack (expected ${targets.length})`, type: 'error' });
            } else {
               errors.push({ line: lineNum, message: "TypeError: cannot unpack non-iterable object", type: 'error' });
            }
          } else if (lhs.includes('[') && lhs.endsWith(']')) {
             // Handle indexed assignment like manifest[0] = "New Key"
             const bracketStart = lhs.indexOf('[');
             const targetName = lhs.slice(0, bracketStart).trim();
             const indexExpr = lhs.slice(bracketStart + 1, -1).trim();
             const target = variables[targetName];
             const index = evaluateValue(indexExpr);
             
             if (target !== undefined && Array.isArray(target)) {
                 if ((target as any).__isTuple) {
                     errors.push({ line: lineNum, message: "TypeError: 'tuple' object does not support item assignment", type: 'error' });
                 } else {
                     const idx = Number(index);
                     if (!isNaN(idx)) {
                         const realIdx = idx < 0 ? target.length + idx : idx;
                         if (realIdx >= 0 && realIdx < target.length) {
                             target[realIdx] = val;
                         } else {
                             errors.push({ line: lineNum, message: "IndexError: list assignment index out of range", type: 'error' });
                         }
                     }
                 }
             } else {
                 errors.push({ line: lineNum, message: `NameError: name '${targetName}' is not defined.`, type: 'error' });
             }
          } else {
            const varName = lhs;
            if (op) {
              if (variables[varName] === undefined) {
                 errors.push({ line: lineNum, message: `NameError: name '${varName}' is not defined.`, type: 'error' });
              } else {
                 if (op === '+') variables[varName] += val;
                 if (op === '-') variables[varName] -= val;
                 if (op === '*') variables[varName] *= val;
                 if (op === '/') variables[varName] /= val;
              }
            } else {
              variables[varName] = val;
            }
          }
        } catch (e: any) {
          if (e && e.awaitingInput) {
            return {
              success: false,
              feedback: "Awaiting user input...",
              output: prints,
              errors: [],
              awaitingInput: true,
              lastPrompt: e.prompt
            };
          }
          throw e;
        }
        i++;
        continue;
      }

      // --- Logic Simulation (Print) ---
      const printStartMatch = trimmed.match(/^print\s*\(/);
      if (printStartMatch && isExecuting) {
        // Find the balanced closing parenthesis for the print call
        let depth = 0;
        let printContent = '';
        let found = false;
        const fullTrimmed = trimmed;
        
        // Skip 'print' and finding the matching paren
        const startIdx = fullTrimmed.indexOf('(');
        for (let k = startIdx; k < fullTrimmed.length; k++) {
          const char = fullTrimmed[k];
          if (char === '(') depth++;
          else if (char === ')') depth--;
          
          if (depth === 0) {
            printContent = fullTrimmed.slice(startIdx + 1, k).trim();
            found = true;
            break;
          }
        }

        if (found) {
          const rawArgs = splitTopLevelArgs(printContent);
          let sep = ' ';
          let hasLineError = false;
          const positionalArgs: string[] = [];

          for (const rawArg of rawArgs) {
            const trimmedArg = rawArg.trim();
            if (!trimmedArg) continue;

            if (trimmedArg.startsWith('sep=')) {
              const sepVal = evaluateValue(trimmedArg.slice(4).trim());
              sep = sepVal !== undefined ? String(sepVal) : ' ';
              continue;
            }
            if (trimmedArg.startsWith('end=')) {
              continue;
            }

            const isNumeric = !isNaN(Number(trimmedArg)) && trimmedArg !== '';
            const isVariable = /^[a-zA-Z_]\w*$/.test(trimmedArg) && variables[trimmedArg] !== undefined;
            const isUndefinedVariable = /^[a-zA-Z_]\w*$/.test(trimmedArg) && variables[trimmedArg] === undefined && !['True', 'False', 'None'].includes(trimmedArg);
            const isStringLiteral = 
              (trimmedArg.startsWith('"') && trimmedArg.endsWith('"')) || 
              (trimmedArg.startsWith("'") && trimmedArg.endsWith("'")) ||
              (trimmedArg.startsWith('f"') && trimmedArg.endsWith('"')) ||
              (trimmedArg.startsWith("f'") && trimmedArg.endsWith("'")) ||
              (trimmedArg.startsWith('F"') && trimmedArg.endsWith('"')) ||
              (trimmedArg.startsWith("F'") && trimmedArg.endsWith("'"));
            const isReserved = ['True', 'False', 'None'].includes(trimmedArg);
            const isBracketedOrSlicing = 
              (trimmedArg.startsWith('[') && trimmedArg.endsWith(']')) ||
              (trimmedArg.startsWith('(') && trimmedArg.endsWith(')')) ||
              (trimmedArg.startsWith('{') && trimmedArg.endsWith('}')) ||
              (/(?:^[a-zA-Z_]\w*\s*\[.*\]$)/.test(trimmedArg)) ||
              (/\bfor\s+[a-zA-Z_]\w*\s+in\s+/.test(trimmedArg));
            const containsOperators = /[+\-*/%<>=]/.test(trimmedArg);
            const containsFunctionCall = /[a-zA-Z_]\w*\s*\(/.test(trimmedArg);

            if (isUndefinedVariable && !containsFunctionCall && !containsOperators) {
              errors.push({
                line: lineNum,
                message: `NameError: name '${trimmedArg}' is not defined. Did you forget to wrap it in quotes or define it?`,
                type: 'error'
              });
              hasLineError = true;
            } else if (!isStringLiteral && !isNumeric && !isVariable && !isReserved && !isBracketedOrSlicing && !containsOperators && !containsFunctionCall) {
              const holdsUnquotedSpaces = /\b[a-zA-Z_]\w*\s+[a-zA-Z0-9_]/.test(trimmedArg);
              const holdsColons = trimmedArg.includes(':');
              if (holdsUnquotedSpaces || holdsColons) {
                errors.push({ 
                  line: lineNum, 
                  message: `SyntaxError: invalid syntax. String literals must be enclosed in quotes (e.g., "${trimmedArg}")`, 
                  type: 'error' 
                });
                hasLineError = true;
              }
            }

            positionalArgs.push(trimmedArg);
          }

          if (hasLineError) {
             i++;
             continue;
          }

          try {
            if (positionalArgs.length === 0) {
              if (prints.length < 1000) prints.push('');
            } else {
              const renderedParts: string[] = [];
              for (const argExpr of positionalArgs) {
                const evaluated = evaluateValue(argExpr);
                if (evaluated === undefined) {
                  renderedParts.push('None');
                } else if (typeof evaluated === 'string') {
                  renderedParts.push(evaluated);
                } else {
                  renderedParts.push(stringifyValue(evaluated));
                }
              }
              const outputLine = renderedParts.join(sep);
              if (prints.length < 1000) {
                prints.push(outputLine);
              } else if (prints.length === 1000) {
                prints.push('... [Output truncated after 1000 lines]');
              }
            }
          } catch (e: any) {
            if (e && e.awaitingInput) {
              return {
                success: false,
                feedback: "Awaiting user input...",
                output: prints,
                errors: [],
                awaitingInput: true,
                lastPrompt: e.prompt
              };
            }
            throw e;
          }
          i++;
          continue;
        }
      }

      // --- Catch Case-sensitive errors or NameErrors ---
      const caseMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*(\(?)/);
      if (caseMatch && isExecuting) {
          const identifier = caseMatch[1];
          
          const pythonKeywords = [
            'import', 'from', 'pass', 'assert', 'global', 'nonlocal', 'del', 'yield', 
            'raise', 'try', 'except', 'finally', 'with', 'as', 'and', 'or', 'not', 
            'is', 'in', 'lambda', 'if', 'else', 'elif', 'for', 'while', 'def', 'class', 'return', 'break', 'continue'
          ];
          
          const isBuiltIn = [
            'print', 'len', 'int', 'str', 'float', 'type', 'abs', 'sum', 'min', 'max', 'bool', 'input', 
            'range', 'list', 'dict', 'set', 'tuple'
          ].includes(identifier);
          
          const isUserFuncOrClass = userFunctions[identifier] || userClasses.has(identifier);
          const isUserVar = variables[identifier] !== undefined;
          const isKeyword = pythonKeywords.includes(identifier);
          
          if (!isBuiltIn && !isUserFuncOrClass && !isUserVar && !isKeyword) {
              if (identifier.toLowerCase() === 'print') {
                 errors.push({ line: lineNum, message: `NameError: name '${identifier}' is not defined. Did you mean 'print'?`, type: 'error' });
              } else if (identifier === 'pint' || identifier === 'prnt' || identifier === 'prnit' || identifier === 'printf') {
                 errors.push({ line: lineNum, message: `NameError: name '${identifier}' is not defined. Did you mean 'print'?`, type: 'error' });
              } else {
                 errors.push({ line: lineNum, message: `NameError: name '${identifier}' is not defined`, type: 'error' });
              }
          }
      }
      
      i++;
    }
  };

  const executionResult = processLines(lines, 0);
  if (executionResult && executionResult.awaitingInput) return executionResult;

  // Final check for unclosed brackets
  while (stack.length > 0) {
    const last = stack.pop();
    if (last) errors.push({ line: last.line, message: `SyntaxError: Unclosed opening '${last.char}'.`, type: 'error' });
  }

  const passesSelection = errors.length === 0 && solutionRegex.every(item => {
    try {
      const regex = typeof item === 'string' ? new RegExp(item) : item;
      return testWithRelaxedRegex(regex, userCode);
    } catch (e) { return false; }
  });

  if (errors.length === 0 && !passesSelection) {
    let hint = "The code logic doesn't quite match the required patterns.";
    solutionRegex.forEach((item) => {
       const regex = typeof item === 'string' ? new RegExp(item) : item;
       if (!testWithRelaxedRegex(regex, userCode)) {
          if (/(?:^|\s)(Print|PRINT)\s*\(/i.test(userCode) && !/(?:^|\s)print\s*\(/.test(userCode)) {
             hint = "Casing mismatch! Python built-in commands like 'print' must be strictly in lowercase. Please use 'print(...)' instead of 'Print(...)' or 'PRINT(...)'.";
          } else if (testCaseInsensitiveMatch(regex, userCode)) {
             hint = "Casing mismatch! Python is case-sensitive, so your characters, string literals, or variable names must exactly match the expected upper/lowercase capitalization.";
          } else if (regex.source.includes('print')) {
             hint = "Did you forget to print the result or use the correct message? Make sure the message matches the task description exactly.";
          } else if (regex.source.includes('=')) {
             hint = "One of your variable assignments might be missing or incorrect. Make sure the variable name and assigned value match the instructions exactly.";
          }
       }
    });
    errors.push({ line: lines.length, message: hint, type: 'warning' });
  }

  const localOutput = prints.length > 0
    ? prints.join('\n')
    : (passesSelection ? ">>> Execution complete. [Process finished with exit code 0]" : (errors.length > 0 ? ">>> Execution failed: Errors detected." : ">>> Logic validation failed. Check patterns."));

  return {
    success: passesSelection,
    errors: errors,
    feedback: passesSelection 
      ? "Diagnostic check passed! Code integrity verified." 
      : (errors.length > 0 ? "Fault detected in script sequence. Check the error log." : "Requirement mismatch. Verify your logic against the task goals."),
    output: localOutput
  };
}

export async function getAIHint(lessonTitle: string, userCode: string, taskDescription: string, offlineSnippet?: string) {
  try {
    const response = await fetch('/api/gemini/hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonTitle, userCode, taskDescription }),
    });
    if (!response.ok) throw new Error("Server response error");
    return await response.json();
  } catch (error) {
    console.warn("AI Hint Request Failed (Offline Mode):", error);
    return { 
      remark: "System Offline: Neural link unavailable. Try solving it using the documentation provided.",
      concept: "Connection lost.",
      snippet: offlineSnippet || "# CONNECTION_ERROR"
    };
  }
}

export async function checkCodeWithAI(userCode: string, lessonTitle: string, taskDescription: string, solutionRegex: string[], inputs?: string[]) {
  // First, check locally
  const localResult = validateCodeLocally(userCode, solutionRegex);

  try {
    const response = await fetch('/api/gemini/check-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userCode, lessonTitle, taskDescription, solutionRegex, inputs }),
    });
    if (!response.ok) throw new Error("Server response error");
    return await response.json();
  } catch (error) {
    console.warn("Check Request Failed, using Local Evaluator:", error);
    return localResult;
  }
}

// Local AI Retheming Logic (Autonomous Core)
function generateRethemeLocally(interest: string, currentLessons: any[]): any[] {
  console.log(`Autonomous Core: Generating retheme for "${interest}"`);
  const normalizedInterest = interest.toLowerCase().trim();
  
  // Theme-specific generic prefixes to avoid "TERMINAL_A1" fallback
  const interestUpper = interest.toUpperCase().replace(/\s+/g, '_');
  const getThemedPrefix = (isHeader: boolean) => {
    const headerSuffixes = ["_OS", "_CORE", "_CMD", "_HUB", "_GRID", "_NAV"];
    const missionSuffixes = ["_INIT", "_LINK", "_SYNC", "_AUTH", "_PROC", "_EXEC"];
    const suffixes = isHeader ? headerSuffixes : missionSuffixes;
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${interestUpper}${randomSuffix}`;
  };

  return currentLessons.map(lesson => {
    // Determine the base theme title parts
    const baseTitle = lesson.title.split(':').pop()?.trim() || lesson.title;
    const newTitle = `${interest.charAt(0).toUpperCase() + interest.slice(1)}: ${baseTitle}`;

    if (lesson.id === "data-types-intro") {
      const normalized = interest.toLowerCase().trim();
      let intVar = "my_int";
      let floatVar = "my_real";
      let charVar = "my_char";
      let stringVar = "my_string";

      if (normalized.includes("marvel") || normalized.includes("avenger") || normalized.includes("stark")) {
        intVar = "suit_power"; floatVar = "radiation_idx"; charVar = "agent_rank"; stringVar = "shield_status";
      } else if (normalized.includes("space") || normalized.includes("nasa") || normalized.includes("galaxy")) {
        intVar = "payload_kgs"; floatVar = "orbit_coeff"; charVar = "probe_tier"; stringVar = "space_status";
      } else if (normalized.includes("starwars") || normalized.includes("jedi") || normalized.includes("force") || normalized.includes("star wars")) {
        intVar = "kyber_force"; floatVar = "parsec_dist"; charVar = "jedi_rank"; stringVar = "saber_status";
      } else if (normalized.includes("cyberpunk") || normalized.includes("samurai") || normalized.includes("neon")) {
        intVar = "nano_cores"; floatVar = "sync_ratio"; charVar = "rig_tier"; stringVar = "deck_status";
      } else if (normalized.includes("roblox") || normalized.includes("obby")) {
        intVar = "obby_stages"; floatVar = "gravity_mult"; charVar = "badge_class"; stringVar = "world_status";
      } else if (normalized.includes("simpsons") || normalized.includes("homer") || normalized.includes("springfield")) {
        intVar = "donut_count"; floatVar = "radiation_lvl"; charVar = "grade_rank"; stringVar = "town_status";
      } else if (normalized.includes("gaming") || normalized.includes("rpg") || normalized.includes("gamer")) {
        intVar = "score_points"; floatVar = "speed_mult"; charVar = "gear_tier"; stringVar = "game_status";
      } else if (normalized.includes("music") || normalized.includes("beat") || normalized.includes("studio")) {
        intVar = "tempo_beats"; floatVar = "delay_ratio"; charVar = "chord_key"; stringVar = "track_status";
      } else if (normalized.includes("fantasy") || normalized.includes("wizard") || normalized.includes("magic")) {
        intVar = "mana_points"; floatVar = "spell_coeff"; charVar = "spell_rank"; stringVar = "quest_guild";
      } else if (normalized.includes("dc") || normalized.includes("batman") || normalized.includes("justice")) {
        intVar = "bat_levels"; floatVar = "toxic_index"; charVar = "suit_tier"; stringVar = "hero_status";
      } else if (normalized.includes("football") || normalized.includes("soccer") || normalized.includes("premier")) {
        intVar = "goals_count"; floatVar = "pass_accuracy"; charVar = "squad_group"; stringVar = "team_status";
      } else {
        const cleanInterest = normalized.replace(/[^a-z0-9]/g, "");
        const prefix = cleanInterest.slice(0, 10) || "my";
        intVar = `${prefix}_val`;
        floatVar = `${prefix}_ratio`;
        charVar = `${prefix}_tier`;
        stringVar = `${prefix}_msg`;
      }

      const pad = (str: string, len: number) => {
        if (str.length >= len) return str.slice(0, len);
        return str + " ".repeat(len - str.length);
      };
      const pIntVar = pad(intVar, 10);
      const pFloatVar = pad(floatVar, 10);
      const pCharVar = pad(charVar, 10);
      const pStringVar = pad(stringVar, 10);

      const themedTechnical = `Just like sorting cargo crates in a secure storage bay, Python organizes your information into specific **Data Types**:\n\n` +
"```text\n" +
`       [ ${pIntVar} ]     [ ${pFloatVar} ]      [ ${pCharVar} ]      [ ${pStringVar} ]\n` +
"     .___________._     .___________._     .___________._     .___________._\n" +
"    /           / |    /           / |    /           / |    /           / |\n" +
"   /___________/  |   /___________/  |   /___________/  |   /___________/  |\n" +
"   |           |  |   |           |  |   |           |  |   |           |  |\n" +
"   |  LABEL:   |  |   |  LABEL:   |  |   |  LABEL:   |  |   |  LABEL:   |  |\n" +
`   | ${pad(intVar, 10)}|  /   | ${pad(floatVar, 10)}|  /   | ${pad(charVar, 10)}|  /   | ${pad(stringVar, 10)}|  /\n` +
"   |  CONTENT: | /    |  CONTENT: | /    |  CONTENT: | /    |  CONTENT: | /\n" +
"   |  101      |/     |  3.14     |/     |  'A'      |/     |  \"Bytes\"  |/\n" +
"   |___________|/     |___________|/     |___________|/     |___________|/\n" +
"```\n\n" +
`### The Four Core Categories:\n` +
`1. **Integer (\`int\`)**: Discrete counts, whole numbers (e.g., \`101\`).\n` +
`2. **Float (\`float\`)**: Decimals and measurement ratios (e.g., \`3.14\`).\n` +
`3. **Character (\`char\`)**: Singular keys or status flags (e.g., \`'A'\`). *(Python treats characters as mini-strings.)*\n` +
`4. **String (\`str\`)**: Text descriptions and messages (e.g., \`\"Bytes\"\`).`;

      const themedExample = `system_id = 99         # Integer (int)\n` +
`power_ratio = 0.75     # Float (float / real)\n` +
`core_status = 'N'      # Character\n` +
`sys_message = \"Ready\"  # String (str)`;

      const themedTask = `### YOUR MISSION\n\n` +
`Create the four container variables as illustrated in our box diagram above:\n` +
`1. Create \`${intVar}\` set to the integer \`101\`.\n` +
`2. Create \`${floatVar}\` set to the float \`3.14\`.\n` +
`3. Create \`${charVar}\` set to the character \`'A'\`.\n` +
`4. Create \`${stringVar}\` set to the string \`\"Bytes\"\`.\n\n` +
`Finally, print all four variables.`;

      const themedSolution = `${intVar} = 101\n` +
`${floatVar} = 3.14\n` +
`${charVar} = 'A'\n` +
`${stringVar} = "Bytes"\n` +
`print(${intVar})\n` +
`print(${floatVar})\n` +
`print(${charVar})\n` +
`print(${stringVar})`;

      const themedIntro = `# Memory Containers: Data Types\n\n` +
`In your ${interest} adventures, different types of data need dedicated storage boxes. Let's see how memory is allocated for each category.`;

      return {
        ...lesson,
        title: `${interest.charAt(0).toUpperCase() + interest.slice(1)}: Memory Containers`,
        headerPrefix: getThemedPrefix(true),
        missionPrefix: getThemedPrefix(false),
        intro: themedIntro,
        technical: themedTechnical,
        example: themedExample,
        task: themedTask,
        baseCode: `# TODO: Initialize the four ${interest.toLowerCase()} container variables\n`,
        hints: [
          `No quotes are needed for ${intVar} or ${floatVar}.`,
          `Wrap the value for ${charVar} in single quotes, and ${stringVar} in double quotes.`,
          `To print, use the print() function (e.g., print(${intVar})).`
        ],
        solution: themedSolution,
        solutionRegex: [
          new RegExp(`${intVar}\\s*=\\s*101`),
          new RegExp(`${floatVar}\\s*=\\s*3\\.14`),
          new RegExp(`${charVar}\\s*=\\s*['"]A['"]`),
          new RegExp(`${stringVar}\\s*=\\s*['"]Bytes['"]`),
          new RegExp(`print\\s*\\(.*${intVar}.*\\)`),
          new RegExp(`print\\s*\\(.*${floatVar}.*\\)`),
          new RegExp(`print\\s*\\(.*${charVar}.*\\)`),
          new RegExp(`print\\s*\\(.*${stringVar}.*\\)`)
        ]
      };
    }
    
    // Attempt local string substitution for the intro and task
    const replacements: Record<string, string> = {
      'mainframe': `${interest} system`,
      'neural link': `${interest} connection`,
      'cybercoder': `${interest} expert`,
      'hacker': `${interest} operator`,
      'encryption': `${interest} data`,
      'firewall': `${interest} barrier`,
      'uplink': `${interest} link`,
      'node': `${interest} point`,
      'grid': `${interest} environment`,
      'protocol': `${interest} procedure`,
      'mainframe\'s': `${interest}'s system`,
      'cyberware': `${interest} equipment`,
      'cyberpunk': `${interest} world`,
      'Blackwall': `${interest} core`,
      'Arasaka': `${interest}`,
      'System Initialized': `${interest} Core Active`,
      'uplink_id': `${interest.toLowerCase().replace(/\s+/g, '_')}_id`,
      'signal_strength': `${interest.toLowerCase().replace(/\s+/g, '_')}_power`,
      'key_id': `${interest.toLowerCase().replace(/\s+/g, '_')}_key`,
      'access_level': `${interest.toLowerCase().replace(/\s+/g, '_')}_level`,
      'packet_id': `${interest.toLowerCase().replace(/\s+/g, '_')}_data`,
      'hacker_alias': `${interest.toLowerCase().replace(/\s+/g, '_')}_alias`,
      'port_alpha': `${interest.toLowerCase().replace(/\s+/g, '_')}_alpha`,
      'port_beta': `${interest.toLowerCase().replace(/\s+/g, '_')}_beta`,
      'ports': `${interest} nodes`,
      'security level': `${interest} clearance`,
      'long-range hack': `${interest} mission`,
      'power levels': `${interest} energy levels`,
      'Encryption bypass': `${interest} pass`,
      'Code Running': `${interest} Process Active`,
      'Neural Link': `${interest} Link`,
      'cybernetic': `${interest} tech`,
      'cyber-': `${interest.toLowerCase()}-`
    };

    const getReplacementRegex = (key: string) => {
      const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let pattern = escapedKey;
      if (/^\w/.test(key)) {
        pattern = '\\b' + pattern;
      }
      if (/\w$/.test(key)) {
        pattern = pattern + '\\b';
      }
      return new RegExp(pattern, 'gi');
    };

    const sortedReplacements = Object.entries(replacements).sort((a, b) => b[0].length - a[0].length);

    const rethemeText = (text: string) => {
      if (!text) return text;
      let newText = text;
      sortedReplacements.forEach(([key, val]) => {
        const regex = getReplacementRegex(key);
        newText = newText.replace(regex, val);
      });
      return newText;
    };

    const rethemeRegex = (regexList: RegExp[]) => {
      if (!regexList || !Array.isArray(regexList)) return regexList;
      return regexList.map(r => {
        try {
          if (!(r instanceof RegExp)) return r;
          let pattern = r.source;
          sortedReplacements.forEach(([key, val]) => {
            const regex = getReplacementRegex(key);
            pattern = pattern.replace(regex, val);
          });
          return new RegExp(pattern, r.flags);
        } catch (e) {
          return r;
        }
      });
    };

    return {
      ...lesson,
      title: newTitle,
      headerPrefix: getThemedPrefix(true),
      missionPrefix: getThemedPrefix(false),
      intro: rethemeText(lesson.intro),
      task: rethemeText(lesson.task),
      technical: rethemeText(lesson.technical),
      example: rethemeText(lesson.example),
      baseCode: rethemeText(lesson.baseCode),
      solution: rethemeText(lesson.solution),
      solutionRegex: rethemeRegex(lesson.solutionRegex)
    };
  });
}

function splitLessonContent(content: string) {
  if (!content) return { intro: "", technical: "", example: "", task: "" };

  // 1. ISOLATE THE TASK
  const taskHeaderRegex = /###\s*(Your Task|YOUR TASK|YOUR MISSION)/i;
  const taskMatch = content.match(taskHeaderRegex);
  
  let taskPart = "";
  let workingContent = content;
  
  if (taskMatch && taskMatch.index !== undefined) {
    workingContent = content.slice(0, taskMatch.index).trim();
    taskPart = content.slice(taskMatch.index).trim();
  }
  
  // 2. ISOLATE THE EXAMPLE (usually in a python code block)
  const codeBlockRegex = /```python\n([\s\S]*?)```/;
  const codeMatch = workingContent.match(codeBlockRegex);
  let examplePart = "";
  if (codeMatch) {
    examplePart = codeMatch[1].trim();
    workingContent = workingContent.replace(codeMatch[0], "").trim();
  }

  // 3. ISOLATE THE INTRO VS THE TECHNICAL EXPLANATION
  // The first "###" header usually marks the start of the technical explanation/How it Works
  const firstTripleIdx = workingContent.indexOf('###');
  let intro = workingContent;
  let technical = "";
  
  if (firstTripleIdx !== -1) {
    intro = workingContent.slice(0, firstTripleIdx).trim();
    technical = workingContent.slice(firstTripleIdx).trim();
  }
  
  return { intro, technical, example: examplePart, task: taskPart };
}

function applyThemedContent(originalLesson: any, themedData: any) {
  const cleanupStr = (str: string) => {
    if (typeof str !== 'string') return str;
    return str.replace(/\\n/g, '\n');
  };

  // Extract structural parts from original
  const original = {
    headerPrefix: originalLesson.headerPrefix,
    missionPrefix: originalLesson.missionPrefix,
    intro: originalLesson.intro,
    technical: originalLesson.technical,
    example: originalLesson.example,
    task: originalLesson.task,
    solutionRegex: originalLesson.solutionRegex || [],
    baseCode: originalLesson.baseCode,
    solution: originalLesson.solution,
    offlineSnippet: originalLesson.offlineSnippet || ""
  };
  
  // If original had 'content' (unmigrated), split it
  if (!original.intro && originalLesson.content) {
    const split = splitLessonContent(originalLesson.content);
    original.intro = split.intro;
    original.technical = split.technical;
    original.example = split.example;
    original.task = split.task;
  }

  // Extract structural parts from themed
  const themed = {
    headerPrefix: themedData.headerPrefix,
    missionPrefix: themedData.missionPrefix,
    intro: themedData.intro,
    technical: themedData.technical,
    example: themedData.example,
    task: themedData.task,
    title: themedData.title,
    solutionRegex: themedData.solutionRegex,
    baseCode: themedData.baseCode,
    solution: themedData.solution,
    offlineSnippet: themedData.offlineSnippet
  };

  // If themed has 'content' (from STATIC_THEMES or AI), split it
  if (!themed.intro && themedData.content) {
    const split = splitLessonContent(themedData.content);
    themed.intro = split.intro;
    themed.technical = split.technical;
    themed.example = split.example;
    themed.task = split.task;
  }

  // Final merging logic
  const finalIntro = themed.intro || original.intro || "";
  const finalTechnical = themed.technical || original.technical || ""; 
  const finalExample = themed.example || original.example || "";
  const finalTask = themed.task || original.task || "";
  const finalHeaderPrefix = themed.headerPrefix || original.headerPrefix;
  const finalMissionPrefix = themed.missionPrefix || original.missionPrefix;
  const finalTitle = themed.title || originalLesson.title;
  const finalBaseCode = themed.baseCode || original.baseCode || "";
  const finalSolution = themed.solution || original.solution || "";
  const finalHints = themedData.hints || originalLesson.hints || [];

  // Determine offline snippet
  let finalOfflineSnippet = themed.offlineSnippet;
  if (!finalOfflineSnippet) {
    if (original.offlineSnippet && original.offlineSnippet.trim() === (original.solution || "").trim()) {
      finalOfflineSnippet = finalSolution;
    } else {
      finalOfflineSnippet = original.offlineSnippet;
    }
  }

  // Process resolution regexes carefully
  let finalRegex = original.solutionRegex;
  if (themed.solutionRegex) {
    const rawRegex = Array.isArray(themed.solutionRegex) ? themed.solutionRegex : [themed.solutionRegex];
    finalRegex = rawRegex.map((r: any) => {
      try {
        if (r instanceof RegExp) return r;
        if (typeof r === 'string') return new RegExp(r);
        return null;
      } catch (e) { return null; }
    }).filter(Boolean);
  }

  return {
    ...originalLesson,
    title: finalTitle,
    headerPrefix: finalHeaderPrefix,
    missionPrefix: finalMissionPrefix,
    intro: cleanupStr(finalIntro),
    technical: cleanupStr(finalTechnical),
    example: cleanupStr(finalExample),
    task: cleanupStr(finalTask),
    baseCode: cleanupStr(finalBaseCode),
    solution: cleanupStr(finalSolution),
    offlineSnippet: cleanupStr(finalOfflineSnippet),
    hints: Array.isArray(finalHints) ? finalHints.map(h => cleanupStr(h)) : [],
    solutionRegex: finalRegex.length > 0 ? finalRegex : original.solutionRegex,
    content: undefined // Ensure nested content doesn't override structural fields
  };
}

export async function rethemeLessons(interest: string, currentLessons: any[]): Promise<any[]> {
  if (!interest) return currentLessons;
  const normalizedInterest = interest.toLowerCase().trim();
  const cleanInterest = interest
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  const stripped = cleanInterest.replace(/[^a-z0-9]/g, '');
  
  // 1. CHECK STATIC THEMES FIRST
  let staticThemeKey: string | undefined = undefined;

  // Exact or alias match
  if (STATIC_THEMES[normalizedInterest]) {
    staticThemeKey = normalizedInterest;
  } else if (STATIC_THEMES[cleanInterest]) {
    staticThemeKey = cleanInterest;
  } else if (STATIC_THEMES[stripped]) {
    staticThemeKey = stripped;
  } else if (STATIC_THEME_ALIASES[normalizedInterest]) {
    staticThemeKey = STATIC_THEME_ALIASES[normalizedInterest];
  } else if (STATIC_THEME_ALIASES[cleanInterest]) {
    staticThemeKey = STATIC_THEME_ALIASES[cleanInterest];
  } else if (STATIC_THEME_ALIASES[stripped]) {
    staticThemeKey = STATIC_THEME_ALIASES[stripped];
  } else if (stripped.includes('pokemon') || stripped.includes('pokedex') || stripped.includes('pikachu') || stripped.includes('pokeball') || stripped.includes('pokmon')) {
    staticThemeKey = 'pokemon';
  } else if (stripped.includes('minecraft') || stripped.includes('creeper') || stripped.includes('redstone') || stripped.includes('overworld') || stripped.includes('steve') || stripped === 'craft') {
    staticThemeKey = 'minecraft';
  } else if (stripped.includes('mario') || stripped.includes('luigi') || stripped.includes('nintendo') || stripped.includes('bowser') || stripped.includes('mushroomkingdom')) {
    staticThemeKey = 'mario';
  } else if (stripped.includes('starwars') || stripped.includes('force') || stripped.includes('jedi') || stripped.includes('skywalker') || stripped.includes('starwar')) {
    staticThemeKey = 'starwars';
  } else if (stripped === 'dc' || stripped.includes('batman') || stripped.includes('gotham') || stripped.includes('waynetech') || stripped.includes('dcuniverse')) {
    staticThemeKey = 'dc';
  } else if (stripped.includes('marvel') || stripped.includes('stark') || stripped.includes('ironman') || stripped.includes('avenger')) {
    staticThemeKey = 'marvel';
  } else if (stripped.includes('simpson') || stripped.includes('homer') || stripped.includes('springfield')) {
    staticThemeKey = 'simpsons';
  } else if (stripped.includes('cyberpunk') || stripped.includes('samurai') || stripped.includes('nightcity') || stripped.includes('neon')) {
    staticThemeKey = 'cyberpunk';
  } else if (stripped.includes('roblox') || stripped.includes('obby') || stripped.includes('blox')) {
    staticThemeKey = 'roblox';
  } else if (stripped.includes('football') || stripped.includes('soccer') || stripped.includes('fifa') || stripped.includes('ronaldo') || stripped.includes('messi')) {
    staticThemeKey = 'football';
  } else if (stripped.includes('space') || stripped.includes('nasa') || stripped.includes('cosmos') || stripped.includes('astronomy') || stripped.includes('galaxy')) {
    staticThemeKey = 'space';
  } else if (stripped.includes('gaming') || stripped.includes('gamer') || stripped.includes('rpg') || stripped === 'game' || stripped === 'games') {
    staticThemeKey = 'gaming';
  } else if (stripped.includes('music') || stripped.includes('beat') || stripped.includes('synth') || stripped.includes('studio')) {
    staticThemeKey = 'music';
  } else if (stripped.includes('fantasy') || stripped.includes('wizard') || stripped.includes('magic') || stripped.includes('dragon')) {
    staticThemeKey = 'fantasy';
  } else if (stripped.includes('anime') || stripped.includes('shonen') || stripped.includes('shounen') || stripped.includes('demonslayer') || stripped.includes('tanjiro') || stripped.includes('onepiece') || stripped.includes('luffy') || stripped.includes('myhero') || stripped.includes('mha') || stripped.includes('deku') || stripped.includes('manga') || stripped.includes('naruto')) {
    staticThemeKey = 'anime';
  } else if (stripped.includes('mecha') || stripped.includes('kaiju') || stripped.includes('godzilla') || stripped.includes('gundam') || stripped.includes('robot') || stripped.includes('evangelion') || stripped.includes('eva') || stripped.includes('pacificrim') || stripped.includes('jaeger')) {
    staticThemeKey = 'mecha';
  }

  if (staticThemeKey && STATIC_THEMES[staticThemeKey]) {
    const themeData = STATIC_THEMES[staticThemeKey];
    return currentLessons.map(lesson => {
      // First, get a local retheme for this lesson to fill in gaps (baseCode, technical, etc.)
      const baseRethemed = generateRethemeLocally(interest, [lesson])[0];
      
      const override = themeData[lesson.id];
      if (override) {
        // Merge the static override on top of the locally rethemed base
        return applyThemedContent(baseRethemed, override);
      }
      return baseRethemed;
    });
  }

  // 2. USE AI (FRONTEND)
  try {
    const response = await fetch('/api/gemini/retheme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interest, currentLessons }),
    });
    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }
    const themedLessonsRaw = await response.json();
    if (themedLessonsRaw?.fallback) {
      return generateRethemeLocally(interest, currentLessons);
    }
    const themedLessons = Array.isArray(themedLessonsRaw) ? themedLessonsRaw : (Array.isArray(themedLessonsRaw?.lessons) ? themedLessonsRaw.lessons : []);
    
    if (themedLessons.length === 0) {
      return generateRethemeLocally(interest, currentLessons);
    }

    return currentLessons.map(lesson => {
      const themed = themedLessons.find((l: any) => l.id === lesson.id);
      return themed ? applyThemedContent(lesson, themed) : lesson;
    });
  } catch (error) {
    console.info("Using local theme generator:", error);
    return generateRethemeLocally(interest, currentLessons);
  }
}

