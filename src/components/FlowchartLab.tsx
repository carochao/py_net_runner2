/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Coins, 
  Layers, 
  HelpCircle as HelpIcon,
  Check,
  ChevronRight,
  Info,
  Copy,
  Pause,
  SkipBack,
  SkipForward,
  Zap
} from 'lucide-react';

// Define block shapes and styles
export type BlockType = 'start' | 'end' | 'process' | 'io' | 'decision';

export interface FlowBlock {
  id: string;
  type: BlockType;
  label: string;
  description?: string;
  // Execution attributes
  action?: (state: any) => any;
  isCorrectSlotId?: string; // used for matching validation
}

export interface FlowSlot {
  id: string;
  label: string;
  type: BlockType;
  x: number; // grid column (0-4 or percentage)
  y: number; // grid row (0-6)
  branchLabel?: string; // e.g. "Yes" or "No"
  connectsTo: string[]; // ids of slots it directs to
}

export interface FlowchartChallenge {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  creditsReward: number;
  description: string;
  slots: FlowSlot[];
  blocksBank: FlowBlock[]; // list of available blocks
  distractors: FlowBlock[]; // extra wrong blocks to challenge them
  // Logic validator
  verifyCode: (placedMap: Record<string, string>) => { success: boolean; logs: string[] };
  initialVariables?: Record<string, any>;
}

interface CodeRepresentation {
  pseudocode: string;
  python: string;
}

export const CHALLENGE_CODES: Record<string, CodeRepresentation> = {
  'subtract-three': {
    pseudocode: `START
  INPUT a, b, c
  Result = a - b - c
  OUTPUT Result
END`,
    python: `# Python 3 Solution
a = int(input("Enter Value A: "))
b = int(input("Enter Value B: "))
c = int(input("Enter Value C: "))

result = a - b - c
print(f"Result: {result}")`
  },
  'subtract-three-threshold': {
    pseudocode: `START
  INPUT a, b, c
  Result = a - b - c
  IF Result > 20 THEN
    OUTPUT "Larger"
  ELSE
    OUTPUT "Less"
  ENDIF
END`,
    python: `# Python 3 Solution
a = int(input("Enter Value A: "))
b = int(input("Enter Value B: "))
c = int(input("Enter Value C: "))

result = a - b - c
if result > 20:
    print("Larger")
else:
    print("Less")`
  },
  'count-to-hundred': {
    pseudocode: `START
  Initialize Counter = 1
  WHILE Counter <= 100 DO
    OUTPUT Counter
    Counter = Counter + 1
  ENDWHILE
END`,
    python: `# Python 3 Solution
counter = 1
while counter <= 100:
    print(counter)
    counter += 1`
  },
  'multiply-odd-even': {
    pseudocode: `START
  INPUT a, b, c
  Result = a * b * c
  OUTPUT Result
  IF Result MOD 2 == 0 THEN
    OUTPUT "EVEN"
  ELSE
    OUTPUT "ODD"
  ENDIF
END`,
    python: `# Python 3 Solution
a = int(input("Enter Value A: "))
b = int(input("Enter Value B: "))
c = int(input("Enter Value C: "))

result = a * b * c
print(f"Result: {result}")

if result % 2 == 0:
    print("EVEN")
else:
    print("ODD")`
  },
  'count-odd-only': {
    pseudocode: `START
  Initialize Counter = 1
  WHILE Counter <= 100 DO
    IF Counter MOD 2 != 0 THEN
      OUTPUT Counter
    ENDIF
    Counter = Counter + 1
  ENDWHILE
END`,
    python: `# Python 3 Solution
counter = 1
while counter <= 100:
    if counter % 2 != 0:
        print(counter)
    counter += 1`
  },
  'absolute-difference': {
    pseudocode: `START
  INPUT a, b
  IF a >= b THEN
    Diff = a - b
  ELSE
    Diff = b - a
  ENDIF
  OUTPUT Diff
END`,
    python: `# Python 3 Solution
a = int(input("Enter Value A: "))
b = int(input("Enter Value B: "))

if a >= b:
    diff = a - b
else:
    diff = b - a

print(f"Absolute Difference: {diff}")`
  },
  'double-and-cap': {
    pseudocode: `START
  INPUT Signal
  Result = Signal * 2
  IF Result > 100 THEN
    Result = 100
  ENDIF
  OUTPUT Result
END`,
    python: `# Python 3 Solution
signal = int(input("Enter Inbound Signal: "))
result = signal * 2

if result > 100:
    result = 100

print(f"Capped Result: {result}")`
  },
  'count-down-rocket': {
    pseudocode: `START
  Initialize Counter = 10
  WHILE Counter > 0 DO
    OUTPUT Counter
    Counter = Counter - 1
  ENDWHILE
  OUTPUT "IGNITION!"
END`,
    python: `# Python 3 Solution
counter = 10
while counter > 0:
    print(counter)
    counter -= 1
print("IGNITION!")`
  },
  'max-of-three': {
    pseudocode: `START
  INPUT a, b, c
  IF a >= b AND a >= c THEN
    OUTPUT "A is Max"
  ELSE
    IF b >= c THEN
      OUTPUT "B is Max"
    ELSE
      OUTPUT "C is Max"
    ENDIF
  ENDIF
END`,
    python: `# Python 3 Solution
a = int(input("Enter Value A: "))
b = int(input("Enter Value B: "))
c = int(input("Enter Value C: "))

if a >= b and a >= c:
    print("A is Max")
elif b >= c:
    print("B is Max")
else:
    print("C is Max")`
  },
  'factorial-calc': {
    pseudocode: `START
  INPUT N
  Initialize Result = 1
  WHILE N > 1 DO
    Result = Result * N
    N = N - 1
  ENDWHILE
  OUTPUT Result
END`,
    python: `# Python 3 Solution
n = int(input("Enter Value N: "))
result = 1

while n > 1:
    result = result * n
    n -= 1

print(f"Factorial Result: {result}")`
  },
  'temp-freezing-check': {
    pseudocode: `START
  INPUT TempC
  F = TempC * 1.8 + 32
  IF F <= 32 THEN
    OUTPUT "FREEZING"
  ELSE
    OUTPUT "SAFE"
  ENDIF
END`,
    python: `# Python 3 Solution
temp_c = float(input("Enter temperature in Celsius: "))
f = temp_c * 1.8 + 32

if f <= 32:
    print("FREEZING")
else:
    print("SAFE")`
  },
  'sum-natural-numbers': {
    pseudocode: `START
  INPUT N
  Initialize Sum = 0, Counter = 1
  WHILE Counter <= N DO
    Sum = Sum + Counter
    Counter = Counter + 1
  ENDWHILE
  OUTPUT Sum
END`,
    python: `# Python 3 Solution
n = int(input("Enter limit N: "))
total_sum = 0
counter = 1

while counter <= n:
    total_sum += counter
    counter += 1

print(f"Sum of natural numbers: {total_sum}")`
  }
};

export interface HighlightInfo {
  pseudo: number[];
  python: number[];
}

export const CHALLENGE_HIGHLIGHT_MAP: Record<string, Record<string, HighlightInfo>> = {
  'subtract-three': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [1], python: [2] },
    's4': { pseudo: [1], python: [3] },
    's5': { pseudo: [2], python: [5] },
    's6': { pseudo: [3], python: [6] },
    's7': { pseudo: [4], python: [] }
  },
  'subtract-three-threshold': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1, 2, 3] },
    's3': { pseudo: [2], python: [5] },
    's4': { pseudo: [3], python: [6] },
    's5': { pseudo: [4], python: [7] },
    's6': { pseudo: [6], python: [9] },
    's7': { pseudo: [8], python: [] }
  },
  'count-to-hundred': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [2], python: [2] },
    's4': { pseudo: [3], python: [3] },
    's5': { pseudo: [4], python: [4] },
    's6': { pseudo: [6], python: [] }
  },
  'multiply-odd-even': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1, 2, 3] },
    's3': { pseudo: [2], python: [5] },
    's4': { pseudo: [3], python: [6] },
    's5': { pseudo: [4], python: [8] },
    's6': { pseudo: [5], python: [9] },
    's7': { pseudo: [7], python: [11] },
    's8': { pseudo: [9], python: [] }
  },
  'count-odd-only': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [2], python: [2] },
    's4': { pseudo: [3], python: [3] },
    's5': { pseudo: [4], python: [4] },
    's6': { pseudo: [6], python: [5] },
    's7': { pseudo: [8], python: [] }
  },
  'absolute-difference': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1, 2] },
    's3': { pseudo: [2], python: [4] },
    's4': { pseudo: [3], python: [5] },
    's5': { pseudo: [5], python: [7] },
    's6': { pseudo: [7], python: [9] },
    's7': { pseudo: [8], python: [] }
  },
  'double-and-cap': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [2], python: [2] },
    's4': { pseudo: [3], python: [4] },
    's5': { pseudo: [4], python: [5] },
    's6': { pseudo: [6], python: [7] },
    's7': { pseudo: [7], python: [] }
  },
  'count-down-rocket': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [2], python: [2] },
    's4': { pseudo: [3], python: [3] },
    's5': { pseudo: [4], python: [4] },
    's6': { pseudo: [6], python: [5] },
    's7': { pseudo: [7], python: [] }
  },
  'max-of-three': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1, 2, 3] },
    's3': { pseudo: [2], python: [5] },
    's4': { pseudo: [3], python: [6] },
    's5': { pseudo: [5], python: [7] },
    's6': { pseudo: [6], python: [8] },
    's7': { pseudo: [8], python: [10] },
    's8': { pseudo: [11], python: [] }
  },
  'factorial-calc': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [2], python: [2] },
    's4': { pseudo: [3], python: [4] },
    's5': { pseudo: [4], python: [5] },
    's6': { pseudo: [5], python: [6] },
    's7': { pseudo: [7], python: [8] },
    's8': { pseudo: [8], python: [] }
  },
  'temp-freezing-check': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [2], python: [2] },
    's4': { pseudo: [3], python: [4] },
    's5': { pseudo: [4], python: [5] },
    's6': { pseudo: [6], python: [7] },
    's7': { pseudo: [8], python: [] }
  },
  'sum-natural-numbers': {
    's1': { pseudo: [0], python: [0] },
    's2': { pseudo: [1], python: [1] },
    's3': { pseudo: [2], python: [2, 3] },
    's4': { pseudo: [3], python: [5] },
    's5': { pseudo: [4], python: [6] },
    's6': { pseudo: [5], python: [7] },
    's7': { pseudo: [7], python: [9] },
    's8': { pseudo: [8], python: [] }
  }
};

export const getHighlightedLines = (challengeId: string, slotId: string | null): HighlightInfo => {
  if (!slotId) return { pseudo: [], python: [] };
  const challengeMap = CHALLENGE_HIGHLIGHT_MAP[challengeId];
  if (!challengeMap) return { pseudo: [], python: [] };
  return challengeMap[slotId] || { pseudo: [], python: [] };
};

export interface SimStep {
  slotId: string;
  log: string;
}

export const getChallengeSimSteps = (
  challengeId: string,
  inputs: { a: number; b: number; c: number },
  placedBlocks: Record<string, string>,
  allAvailableBlocks: { id: string; label: string }[]
): SimStep[] => {
  const steps: SimStep[] = [];
  
  const getLabel = (slotId: string, defaultName: string = 'Node') => {
    const bId = placedBlocks[slotId];
    if (!bId) return defaultName;
    const blk = allAvailableBlocks.find(b => b.id === bId);
    return blk ? blk.label : defaultName;
  };

  if (challengeId === 'subtract-three') {
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input A, B, C')} (Register A = ${inputs.a})` },
      { slotId: 's3', log: `${getLabel('s3', 'Initialize Register B')} (Register B = ${inputs.b})` },
      { slotId: 's4', log: `${getLabel('s4', 'Initialize Register C')} (Register C = ${inputs.c})` },
      { slotId: 's5', log: `${getLabel('s5', 'Calculate Result')} (Calculating: ${inputs.a} - ${inputs.b} - ${inputs.c} = ${inputs.a - inputs.b - inputs.c})` },
      { slotId: 's6', log: `📺 CONSOLE FEED: ${inputs.a - inputs.b - inputs.c}` },
      { slotId: 's7', log: `${getLabel('s7', 'End')}` }
    );
  }
  else if (challengeId === 'subtract-three-threshold') {
    const res = inputs.a - inputs.b - inputs.c;
    const isLarger = res > 20;
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input A, B, C')} (REG_A: ${inputs.a} | REG_B: ${inputs.b} | REG_C: ${inputs.c} | COMBINED: ${res})` },
      { slotId: 's3', log: `${getLabel('s3', 'Calculate Result')} (Formula resolves: ${res})` },
      { slotId: 's4', log: `${getLabel('s4', 'Is Result > 20?')} (Evaluating: is ${res} > 20? -> ${isLarger ? 'YES' : 'NO'})` },
      { slotId: isLarger ? 's5' : 's6', log: isLarger ? `📺 CONSOLE FEED: "Larger"` : `📺 CONSOLE FEED: "Less"` },
      { slotId: 's7', log: `${getLabel('s7', 'End')}` }
    );
  }
  else if (challengeId === 'count-to-hundred') {
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Initialize Counter = 1')}` },
      { slotId: 's3', log: `${getLabel('s3', 'Is Counter <= 100?')} (Evaluating: is 1 <= 100? -> YES)` },
      { slotId: 's4', log: `📺 CONSOLE FEED: 1` },
      { slotId: 's5', log: `${getLabel('s5', 'Increment Counter')} (Counter becomes 2)` },
      { slotId: 's3', log: `${getLabel('s3', 'Is Counter <= 100?')} (Evaluating: is 2 <= 100? -> YES)` },
      { slotId: 's4', log: `📺 CONSOLE FEED: 2` },
      { slotId: 's5', log: `${getLabel('s5', 'Increment Counter')} (... skipping items 3 to 99 ...)` },
      { slotId: 's3', log: `${getLabel('s3', 'Is Counter <= 100?')} (Evaluating: is 101 <= 100? -> NO)` },
      { slotId: 's6', log: `${getLabel('s6', 'End')} (Loop Exit, counter reaches terminate code)` }
    );
  }
  else if (challengeId === 'multiply-odd-even') {
    const product = inputs.a * inputs.b * inputs.c;
    const isEven = product % 2 === 0;
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input A, B, C')} (Inputs received: A=${inputs.a}, B=${inputs.b}, C=${inputs.c})` },
      { slotId: 's3', log: `${getLabel('s3', 'Calculate Product')} (Evaluating: ${inputs.a} * ${inputs.b} * ${inputs.c} = ${product})` },
      { slotId: 's4', log: `📺 CONSOLE FEED: Output Result = ${product}` },
      { slotId: 's5', log: `${getLabel('s5', 'Is Result Even?')} (Evaluating: is ${product} % 2 == 0? -> ${isEven ? 'YES' : 'NO'})` },
      { slotId: isEven ? 's6' : 's7', log: isEven ? `📺 CONSOLE FEED: "EVEN"` : `📺 CONSOLE FEED: "ODD"` },
      { slotId: 's8', log: `${getLabel('s8', 'End')}` }
    );
  }
  else if (challengeId === 'count-odd-only') {
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Initialize Counter = 1')}` },
      { slotId: 's3', log: `${getLabel('s3', 'Is Counter <= 100?')} (Evaluating: is 1 <= 100? -> YES)` },
      { slotId: 's4', log: `${getLabel('s4', 'Is Counter Odd?')} (Is 1 % 2 !== 0? -> YES)` },
      { slotId: 's5', log: `📺 CONSOLE FEED: 1` },
      { slotId: 's6', log: `${getLabel('s6', 'Increment Counter')} (Counter becomes 2)` },
      { slotId: 's3', log: `${getLabel('s3', 'Is Counter <= 100?')} (Evaluating: is 2 <= 100? -> YES)` },
      { slotId: 's4', log: `${getLabel('s4', 'Is Counter Odd?')} (Is 2 % 2 !== 0? -> NO - skip output)` },
      { slotId: 's6', log: `${getLabel('s6', 'Increment Counter')} (... skipping subsequent iterations ...)` },
      { slotId: 's3', log: `${getLabel('s3', 'Is Counter <= 100?')} (Evaluating: is 101 <= 100? -> NO)` },
      { slotId: 's7', log: `${getLabel('s7', 'End')}` }
    );
  }
  else if (challengeId === 'absolute-difference') {
    const diff = Math.abs(inputs.a - inputs.b);
    const isGreaterOrEqual = inputs.a >= inputs.b;
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input A, B')} (Captured A=${inputs.a}, B=${inputs.b})` },
      { slotId: 's3', log: `${getLabel('s3', 'Is A >= B?')} (Evaluating: Is ${inputs.a} >= ${inputs.b}? -> ${isGreaterOrEqual ? 'YES' : 'NO'})` },
      { slotId: isGreaterOrEqual ? 's4' : 's5', log: isGreaterOrEqual ? `${getLabel('s4', 'Subtract B from A')} (Calculated: ${inputs.a} - ${inputs.b} = ${diff})` : `${getLabel('s5', 'Subtract A from B')} (Calculated: ${inputs.b} - ${inputs.a} = ${diff})` },
      { slotId: 's6', log: `📺 CONSOLE FEED: Absolute Diff = ${diff}` },
      { slotId: 's7', log: `${getLabel('s7', 'End')}` }
    );
  }
  else if (challengeId === 'double-and-cap') {
    const doubledValue = inputs.a * 2;
    const isExceeded = doubledValue > 100;
    const finalValue = isExceeded ? 100 : doubledValue;
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input A')} (Signal = ${inputs.a})` },
      { slotId: 's3', log: `${getLabel('s3', 'Multiply A by 2')} (Doubled Value = ${doubledValue})` },
      { slotId: 's4', log: `${getLabel('s4', 'Is Result > 100?')} (Evaluating: is ${doubledValue} > 100? -> ${isExceeded ? 'YES' : 'NO'})` },
      ...(isExceeded ? [{ slotId: 's5', log: `${getLabel('s5', 'Cap Result at 100')} (Surge Cap limit applied: override Result to 100)` }] : []),
      { slotId: 's6', log: `📺 CONSOLE FEED: Final Output Result = ${finalValue}` },
      { slotId: 's7', log: `${getLabel('s7', 'End')}` }
    );
  }
  else if (challengeId === 'count-down-rocket') {
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Initialize Counter = 10')}` },
      { slotId: 's3', log: `${getLabel('s3', 'Countdown Check')} (Evaluating: is 10 > 0? -> YES)` },
      { slotId: 's4', log: `📺 CONSOLE FEED: 10` },
      { slotId: 's5', log: `${getLabel('s5', 'Decrement Counter')} (Counter becomes 9)` },
      { slotId: 's3', log: `${getLabel('s3', 'Countdown Check')} (Evaluating: is 9 > 0? -> YES)` },
      { slotId: 's4', log: `📺 CONSOLE FEED: 9` },
      { slotId: 's5', log: `${getLabel('s5', 'Decrement Counter')} (... skipping subsequent count-down events ...)` },
      { slotId: 's3', log: `${getLabel('s3', 'Countdown Check')} (Evaluating: is 0 > 0? -> NO / End of Loop)` },
      { slotId: 's6', log: `📺 CONSOLE FEED: "IGNITION!"` },
      { slotId: 's7', log: `${getLabel('s7', 'End')}` }
    );
  }
  else if (challengeId === 'max-of-three') {
    const aMax = (inputs.a >= inputs.b && inputs.a >= inputs.c);
    const bMax = (inputs.b >= inputs.c);
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input A, B, C')} (Captured inputs: A=${inputs.a} | B=${inputs.b} | C=${inputs.c})` },
      { slotId: 's3', log: `${getLabel('s3', 'Is A >= B & C?')} (Evaluating: is A(${inputs.a}) >= B(${inputs.b}) & C(${inputs.c})? -> ${aMax ? 'YES' : 'NO'})` },
      ...(aMax 
        ? [{ slotId: 's4', log: `📺 CONSOLE FEED: "A is Max" (Value = ${inputs.a})` }]
        : [
            { slotId: 's5', log: `${getLabel('s5', 'Is B >= C?')} (Evaluating: is B(${inputs.b}) >= C(${inputs.c})? -> ${bMax ? 'YES' : 'NO'})` },
            ...(bMax 
              ? [{ slotId: 's6', log: `📺 CONSOLE FEED: "B is Max" (Value = ${inputs.b})` }]
              : [{ slotId: 's7', log: `📺 CONSOLE FEED: "C is Max" (Value = ${inputs.c})` }])
          ]),
      { slotId: 's8', log: `${getLabel('s8', 'End')}` }
    );
  }
  else if (challengeId === 'factorial-calc') {
    const N = Math.min(5, (inputs.b % 3) + 3);
    const fact = (n: number): number => n <= 1 ? 1 : n * fact(n - 1);
    const res = fact(N);
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input Value N')} (Registered N = ${N})` },
      { slotId: 's3', log: `${getLabel('s3', 'Initialize Result')} (Result = 1)` },
      { slotId: 's4', log: `${getLabel('s4', 'Is N > 1?')} (Evaluating: is ${N} > 1? -> YES)` },
      { slotId: 's5', log: `${getLabel('s5', 'Factorial Multiply')} (Result = 1 * ${N} = ${N})` },
      { slotId: 's6', log: `${getLabel('s6', 'Decrement N')} (N becomes ${N - 1})` },
      { slotId: 's4', log: `${getLabel('s4', 'Is N > 1?')} (Evaluating subsequent loops ...)` },
      { slotId: 's7', log: `📺 CONSOLE FEED: Factorial Result = ${res}` },
      { slotId: 's8', log: `${getLabel('s8', 'End')}` }
    );
  }
  else if (challengeId === 'temp-freezing-check') {
    const celsius = inputs.b;
    const fahrenheit = celsius * 1.8 + 32;
    const isFreezing = fahrenheit <= 32;
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Read Temperature')} (Celsius = ${celsius}°C)` },
      { slotId: 's3', log: `${getLabel('s3', 'Convert C to F')} (Calculated Fahrenheit = ${fahrenheit.toFixed(1)}°F)` },
      { slotId: 's4', log: `${getLabel('s4', 'Is F <= 32?')} (Evaluating: is ${fahrenheit.toFixed(1)} <= 32? -> ${isFreezing ? 'YES' : 'NO'})` },
      { slotId: isFreezing ? 's5' : 's6', log: isFreezing ? `📺 CONSOLE FEED: "FREEZING"` : `📺 CONSOLE FEED: "SAFE"` },
      { slotId: 's7', log: `${getLabel('s7', 'End')}` }
    );
  }
  else if (challengeId === 'sum-natural-numbers') {
    const N = (inputs.b % 3) + 3;
    const sum = (N * (N + 1)) / 2;
    steps.push(
      { slotId: 's1', log: `${getLabel('s1', 'Start')}` },
      { slotId: 's2', log: `${getLabel('s2', 'Input Limit N')} (Limit parameter N = ${N})` },
      { slotId: 's3', log: `${getLabel('s3', 'Initialize Sum/Counter')} (Sum = 0, Counter = 1)` },
      { slotId: 's4', log: `${getLabel('s4', 'Is Counter <= N?')} (Evaluating: is 1 <= ${N}? -> YES)` },
      { slotId: 's5', log: `${getLabel('s5', 'Accumulate Sum')} (Sum becomes 1)` },
      { slotId: 's6', log: `${getLabel('s6', 'Increment Counter')} (Counter becomes 2)` },
      { slotId: 's4', log: `${getLabel('s4', 'Is Counter <= N?')} (Evaluating subsequent increments ...)` },
      { slotId: 's7', log: `📺 CONSOLE FEED: Computed Sum = ${sum}` },
      { slotId: 's8', log: `${getLabel('s8', 'End')}` }
    );
  }
  
  return steps;
};

// 5 Flowchart Challenges
export const FLOWCHART_CHALLENGES: FlowchartChallenge[] = [
  {
    id: 'subtract-three',
    title: 'Integer Subtraction Schematic',
    subtitle: 'Subtract 3 user inputted integers together and outputs the result',
    difficulty: 'Easy',
    creditsReward: 150,
    description: `Construct a sequential flowchart that receives 3 integer inputs from the user, subtracts them one by one, and prints the final resulting value.`,
    initialVariables: { a: 0, b: 0, c: 0, result: 0 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Input 1', type: 'io', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Input 2', type: 'io', x: 2, y: 2.4, connectsTo: ['s4'] },
      { id: 's4', label: 'Input 3', type: 'io', x: 2, y: 3.6, connectsTo: ['s5'] },
      { id: 's5', label: 'Arithmetic Logic', type: 'process', x: 2, y: 4.8, connectsTo: ['s6'] },
      { id: 's6', label: 'Display Output', type: 'io', x: 2, y: 6.0, connectsTo: ['s7'] },
      { id: 's7', label: 'Process Terminus', type: 'end', x: 2, y: 7.2, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_a', type: 'io', label: 'Input A' },
      { id: 'b_input_b', type: 'io', label: 'Input B' },
      { id: 'b_input_c', type: 'io', label: 'Input C' },
      { id: 'b_calc_sub', type: 'process', label: 'Subtract: Result = A - B - C' },
      { id: 'b_print_res', type: 'io', label: 'Output Result' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_add', type: 'process', label: 'Add All: Result = A + B + C' },
      { id: 'b_dist_dec', type: 'decision', label: 'Is Result > 20?' },
      { id: 'b_dist_print_fail', type: 'io', label: 'Output "Failed"' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Running diagnostics on Schematic: Subtraction...");
      
      const s1 = placedMap['s1'];
      const s2 = placedMap['s2'];
      const s3 = placedMap['s3'];
      const s4 = placedMap['s4'];
      const s5 = placedMap['s5'];
      const s6 = placedMap['s6'];
      const s7 = placedMap['s7'];

      if (s1 !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Critical starting node [Start] is missing!"] };
      
      // Let's check inputs are defined sequentially
      const expectedInputs = ['b_input_a', 'b_input_b', 'b_input_c'];
      const actualInputs = [s2, s3, s4];
      const hasCorrectInputs = actualInputs.every(val => expectedInputs.includes(val)) && (new Set(actualInputs).size === 3);
      
      if (!hasCorrectInputs) {
        return { success: false, logs: [...logs, "❌ ERROR: Inputs are misconfigured. You must capture values for A, B, and C in the registers!"] };
      }
      
      if (s5 !== 'b_calc_sub') {
        return { success: false, logs: [...logs, "❌ ERROR: Math operator is incorrect or displaced! Current formula fails to calculate (A - B - C)."] };
      }
      
      if (s6 !== 'b_print_res') {
        return { success: false, logs: [...logs, "❌ ERROR: Missing correct Display node. No output command registered to output the computed Result."] };
      }
      
      if (s7 !== 'b_end') {
        return { success: false, logs: [...logs, "❌ ERROR: Sequence contains dangling nodes. Finish with the [End] terminal."] };
      }

      logs.push("✓ Standard inputs captured successfully: A, B, C.");
      logs.push("✓ Applied subtract logic: Result = A - B - C");
      logs.push("✓ Output printed to terminal console.");
      logs.push("✓ Process exited properly.");
      return { success: true, logs };
    }
  },
  {
    id: 'subtract-three-threshold',
    title: 'Boundary Check Upgraded Flow',
    subtitle: 'Output whether the subtraction is larger or less than 20',
    difficulty: 'Medium',
    creditsReward: 200,
    description: `Construct an adaptive flowchart evaluating if (A - B - C) is greater than 20. Based on this, output "Larger" or "Less", then successfully close.`,
    initialVariables: { a: 0, b: 0, c: 0, result: 0 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Inputs', type: 'io', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Compute Engine', type: 'process', x: 2, y: 2.4, connectsTo: ['s4'] },
      { id: 's4', label: 'Decision Node', type: 'decision', x: 2, y: 3.6, connectsTo: ['s5', 's6'] },
      // Left path (True)
      { id: 's5', label: 'Print: "Larger"', type: 'io', x: 0.8, y: 5.0, branchLabel: 'Yes (> 20)', connectsTo: ['s7'] },
      // Right path (False)
      { id: 's6', label: 'Print: "Less"', type: 'io', x: 3.2, y: 5.0, branchLabel: 'No (<= 20)', connectsTo: ['s7'] },
      { id: 's7', label: 'Process Terminus', type: 'end', x: 2, y: 6.4, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_all', type: 'io', label: 'Input A, B, C' },
      { id: 'b_calc_sub', type: 'process', label: 'Calculate Result = A - B - C' },
      { id: 'b_check_20', type: 'decision', label: 'Is Result > 20?' },
      { id: 'b_print_larger', type: 'io', label: 'Output "Larger"' },
      { id: 'b_print_less', type: 'io', label: 'Output "Less"' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_print_res', type: 'io', label: 'Output Result' },
      { id: 'b_dist_loop', type: 'decision', label: 'while Counter < 100' },
      { id: 'b_dist_init', type: 'process', label: 'Counter = 1' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Checking Boundary Threshold Schematic...");
      
      if (placedMap['s1'] !== 'b_start') {
        return { success: false, logs: [...logs, "❌ ERROR: Expected starting sequence flow."] };
      }
      if (placedMap['s2'] !== 'b_input_all') {
        // can be inputs
        return { success: false, logs: [...logs, "❌ ERROR: Inputs block must be placed at the top inputs slot."] };
      }
      if (placedMap['s3'] !== 'b_calc_sub') {
        return { success: false, logs: [...logs, "❌ ERROR: Need an operation node resolving: Result = A - B - C"] };
      }
      if (placedMap['s4'] !== 'b_check_20') {
        return { success: false, logs: [...logs, "❌ ERROR: Missing central decision block evaluating if 'Result > 20'."] };
      }
      if (placedMap['s5'] !== 'b_print_larger') {
        return { success: false, logs: [...logs, "❌ ERROR: Left branch (True/Yes) should output 'Larger' because threshold limits require positive evaluations."] };
      }
      if (placedMap['s6'] !== 'b_print_less') {
        return { success: false, logs: [...logs, "❌ ERROR: Right branch (False/No) should output 'Less' as the fallback branch."] };
      }
      if (placedMap['s7'] !== 'b_end') {
        return { success: false, logs: [...logs, "❌ ERROR: Schematic must exit through an ending [End] node."] };
      }

      logs.push("✓ Core structures matched!");
      logs.push("✓ Validated logic branches for threshold 20.");
      logs.push("✓ Test simulation: A=100, B=50, C=10 -> Result 40 > 20 -> Outputs 'Larger' correctly.");
      logs.push("✓ Test simulation: A=30, B=20, C=5 -> Result 5 <= 20 -> Outputs 'Less' correctly.");
      return { success: true, logs };
    }
  },
  {
    id: 'count-to-hundred',
    title: 'The Century Loop Iterator',
    subtitle: 'Count up to 100 and outputs the counter every iteration',
    difficulty: 'Medium',
    creditsReward: 220,
    description: `Design a looping sequence structure. Initialize a Counter at 1, evaluate if the Counter is less than or equal to 100, and output the current Counter, updating it on each pass.`,
    initialVariables: { counter: 1 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Define Counter', type: 'process', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Loop Check', type: 'decision', x: 2, y: 2.6, connectsTo: ['s4', 's6'] },
      // Loop True Branch downwards
      { id: 's4', label: 'Print Current', type: 'io', x: 2, y: 4.2, branchLabel: 'Yes (<= 100)', connectsTo: ['s5'] },
      { id: 's5', label: 'Increment Flow', type: 'process', x: 2, y: 5.6, connectsTo: ['s3'] }, // loop connection shown visually
      // Loop Exit side branch
      { id: 's6', label: 'Process Terminus', type: 'end', x: 3.5, y: 2.6, branchLabel: 'No (> 100)', connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_init_c', type: 'process', label: 'Initialize Counter = 1' },
      { id: 'b_check_100', type: 'decision', label: 'Is Counter <= 100?' },
      { id: 'b_print_c', type: 'io', label: 'Output Counter' },
      { id: 'b_add_c', type: 'process', label: 'Add 1 to Counter' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_check_even', type: 'decision', label: 'Is Counter % 2 == 0?' },
      { id: 'b_dist_sub_c', type: 'process', label: 'Subtract 1 from Counter' },
      { id: 'b_dist_calc', type: 'process', label: 'Counter = 100' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Analyzing Iterative Century Loop...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing start anchor."] };
      if (placedMap['s2'] !== 'b_init_c') return { success: false, logs: [...logs, "❌ ERROR: Counter value must be initialized to 1 before entering loop."] };
      if (placedMap['s3'] !== 'b_check_100') return { success: false, logs: [...logs, "❌ ERROR: Diamond decisions node must verify 'Is Counter <= 100?'."] };
      if (placedMap['s4'] !== 'b_print_c') return { success: false, logs: [...logs, "❌ ERROR: Inside the loop, you must first print the active Counter!"] };
      if (placedMap['s5'] !== 'b_add_c') return { success: false, logs: [...logs, "❌ ERROR: Missing incremental operator block (Add 1 to Counter) to prevent endless loops!"] };
      if (placedMap['s6'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Loop exit branch should terminate with [End]."] };

      logs.push("✓ Loop variables mapped correctly.");
      logs.push("✓ Safe bounds verified (Infinite loop danger check: Safe).");
      logs.push("✓ Verified loop output counts from 1 up to 100 successfully.");
      return { success: true, logs };
    }
  },
  {
    id: 'multiply-odd-even',
    title: 'Product Parity Tester',
    subtitle: 'Multiply 3 integers, check/output whether it is ODD or EVEN, and output the result',
    difficulty: 'Hard',
    creditsReward: 250,
    description: `Design a branching system. Collect 3 numbers, multiply them together to get the Result, Output the Result first, then check if Result is Odd or Even, producing correct classifications.`,
    initialVariables: { a: 0, b: 0, c: 0, result: 0 },
    slots: [
      { id: 's1', label: 'Start Point', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Get User Inputs', type: 'io', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Solve Multiply', type: 'process', x: 2, y: 2.4, connectsTo: ['s4'] },
      { id: 's4', label: 'Print Result', type: 'io', x: 2, y: 3.6, connectsTo: ['s5'] },
      { id: 's5', label: 'Parity Decision', type: 'decision', x: 2, y: 4.8, connectsTo: ['s6', 's7'] },
      // Branches
      { id: 's6', label: 'Print: "EVEN"', type: 'io', x: 0.8, y: 6.0, branchLabel: 'Even (Rem = 0)', connectsTo: ['s8'] },
      { id: 's7', label: 'Print: "ODD"', type: 'io', x: 3.2, y: 6.0, branchLabel: 'Odd (Rem != 0)', connectsTo: ['s8'] },
      { id: 's8', label: 'Exit Terminus', type: 'end', x: 2, y: 7.2, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_xyz', type: 'io', label: 'Input A, B, C' },
      { id: 'b_calc_mul', type: 'process', label: 'Multiply: Result = A * B * C' },
      { id: 'b_print_val', type: 'io', label: 'Output Result' },
      { id: 'b_check_even', type: 'decision', label: 'Is Result % 2 == 0?' },
      { id: 'b_print_even', type: 'io', label: 'Output "EVEN"' },
      { id: 'b_print_odd', type: 'io', label: 'Output "ODD"' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_check_odd', type: 'decision', label: 'Is Result % 2 != 0?' },
      { id: 'b_dist_calc_sub', type: 'process', label: 'Calculate Result = A - B - C' },
      { id: 'b_dist_c', type: 'process', label: 'Counter = 1' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Reviewing Product Parity Tester flowchart...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Expected [Start] node."] };
      if (placedMap['s2'] !== 'b_input_xyz') return { success: false, logs: [...logs, "❌ ERROR: Expected sequential captures for three variable registers."] };
      if (placedMap['s3'] !== 'b_calc_mul') return { success: false, logs: [...logs, "❌ ERROR: Operation calculation logic must be: Result = A * B * C."] };
      if (placedMap['s4'] !== 'b_print_val') return { success: false, logs: [...logs, "❌ ERROR: Check the instructions: 'output the result and then check odd/even'."] };
      if (placedMap['s5'] !== 'b_check_even') return { success: false, logs: [...logs, "❌ ERROR: Missing parity condition detector 'Is Result % 2 == 0?'."] };
      if (placedMap['s6'] !== 'b_print_even') return { success: false, logs: [...logs, "❌ ERROR: Left path must display 'EVEN' on successful condition triggers."] };
      if (placedMap['s7'] !== 'b_print_odd') return { success: false, logs: [...logs, "❌ ERROR: Right path must display 'ODD' on fallback triggers."] };
      if (placedMap['s8'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: End block is missing or misplaced."] };

      logs.push("✓ Inputs captured correctly.");
      logs.push("✓ Calculations and outputs are correctly sequenced.");
      logs.push("✓ Parity testing: (2 * 3 * 5) = 30 -> EVEN output matches.");
      logs.push("✓ Parity testing: (3 * 3 * 3) = 27 -> ODD output matches.");
      return { success: true, logs };
    }
  },
  {
    id: 'count-odd-only',
    title: 'The Parity Filter Loop',
    subtitle: 'Counts to 100 BUT ONLY outputs the counter IF the number is odd',
    difficulty: 'Hard',
    creditsReward: 300,
    description: `Perfect the ultimate controller loop. Count from 1 to 100, but route the sequence through an inner decision block that screens whether the counter is odd (| Counter % 2 != 0 |) before outputting.`,
    initialVariables: { counter: 1 },
    slots: [
      { id: 's1', label: 'Start Point', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Init Loop Counter', type: 'process', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Boundary check', type: 'decision', x: 2, y: 2.6, connectsTo: ['s4', 's7'] },
      
      // Inside outer yes path: inner decision
      { id: 's4', label: 'Parity Decider', type: 'decision', x: 2, y: 4.2, branchLabel: 'Yes (<= 100)', connectsTo: ['s5', 's6'] },
      
      // Inner branches
      { id: 's5', label: 'Print: ODD', type: 'io', x: 0.5, y: 5.6, branchLabel: 'Yes (Is Odd)', connectsTo: ['s6'] },
      { id: 's6', label: 'Increment Node', type: 'process', x: 2, y: 7.0, branchLabel: 'No (Is Even)', connectsTo: ['s3'] },
      
      // Outer Exit path
      { id: 's7', label: 'Loop End Terminal', type: 'end', x: 3.8, y: 2.6, branchLabel: 'No (> 100)', connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_init_c', type: 'process', label: 'Initialize Counter = 1' },
      { id: 'b_check_100', type: 'decision', label: 'Is Counter <= 100?' },
      { id: 'b_check_odd', type: 'decision', label: 'Is Counter % 2 != 0?' },
      { id: 'b_print_c', type: 'io', label: 'Output Counter' },
      { id: 'b_add_c', type: 'process', label: 'Add 1 to Counter' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_check_even', type: 'decision', label: 'Is Counter % 2 == 0?' },
      { id: 'b_dist_print_even', type: 'io', label: 'Output "Even"' },
      { id: 'b_dist_subtract', type: 'process', label: 'Subtract 1' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Querying Logic for Nested Odd Iterator...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing Start point!"] };
      if (placedMap['s2'] !== 'b_init_c') return { success: false, logs: [...logs, "❌ ERROR: Expected initialization: Initialize Counter = 1."] };
      if (placedMap['s3'] !== 'b_check_100') return { success: false, logs: [...logs, "❌ ERROR: Outer decision must screen loop limit bounds (<= 100)."] };
      if (placedMap['s4'] !== 'b_check_odd') return { success: false, logs: [...logs, "❌ ERROR: Inner loop selector must check for parity odd status: Counter % 2 != 0."] };
      if (placedMap['s5'] !== 'b_print_c') return { success: false, logs: [...logs, "❌ ERROR: Left branch of the inner check must trigger printing out the value of Counter."] };
      if (placedMap['s6'] !== 'b_add_c') return { success: false, logs: [...logs, "❌ ERROR: Loop body must unconditionally update Counter by adding 1 on every run!"] };
      if (placedMap['s7'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Loop termination is not routed to exit cleanly."] };

      logs.push("✓ Nested block configuration valid.");
      logs.push("✓ Filter conditional correctly triggers odd checks.");
      logs.push("✓ Safe counter loops 100 times without failing.");
      logs.push("✓ Printed logs display: 1, 3, 5, 7, ..., 99 only!");
      return { success: true, logs };
    }
  },
  {
    id: 'absolute-difference',
    title: 'Absolute Distance Sensor',
    subtitle: 'Determine the positive mathematical distance between values A and B',
    difficulty: 'Easy',
    creditsReward: 150,
    description: 'Ensure your circuit processes A and B correctly. If A is greater than or equal to B, calculate positive distance as Diff = A - B. If not, calculate Diff = B - A. Finally, output Diff to the console and end.',
    initialVariables: { a: 0, b: 0, result: 0 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Inputs', type: 'io', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Decision Node', type: 'decision', x: 2, y: 2.4, connectsTo: ['s4', 's5'] },
      { id: 's4', label: 'Diff = A - B', type: 'process', x: 0.8, y: 3.8, branchLabel: 'Yes (A >= B)', connectsTo: ['s6'] },
      { id: 's5', label: 'Diff = B - A', type: 'process', x: 3.2, y: 3.8, branchLabel: 'No (A < B)', connectsTo: ['s6'] },
      { id: 's6', label: 'Output Diff', type: 'io', x: 2, y: 5.2, connectsTo: ['s7'] },
      { id: 's7', label: 'Process Terminus', type: 'end', x: 2, y: 6.5, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_ab', type: 'io', label: 'Input A, B' },
      { id: 'b_check_ab', type: 'decision', label: 'Is A >= B?' },
      { id: 'b_calc_ab', type: 'process', label: 'Subtract: Diff = A - B' },
      { id: 'b_calc_ba', type: 'process', label: 'Subtract: Diff = B - A' },
      { id: 'b_print_diff', type: 'io', label: 'Output Diff' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_calc_add', type: 'process', label: 'Add Diff = A + B' },
      { id: 'b_dist_check_eq', type: 'decision', label: 'Is A == B?' },
      { id: 'b_dist_print_fail', type: 'io', label: 'Output "Mismatch"' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Analyzing Absolute Distance Sensor flowchart...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing start anchor [Start]."] };
      if (placedMap['s2'] !== 'b_input_ab') return { success: false, logs: [...logs, "❌ ERROR: Need an Inputs register block for A and B."] };
      if (placedMap['s3'] !== 'b_check_ab') return { success: false, logs: [...logs, "❌ ERROR: Decision gate must evaluate 'Is A >= B?'."] };
      if (placedMap['s4'] !== 'b_calc_ab') return { success: false, logs: [...logs, "❌ ERROR: Left branch requires subtracting B from A (Diff = A - B)."] };
      if (placedMap['s5'] !== 'b_calc_ba') return { success: false, logs: [...logs, "❌ ERROR: Right branch requires subtracting A from B (Diff = B - A)."] };
      if (placedMap['s6'] !== 'b_print_diff') return { success: false, logs: [...logs, "❌ ERROR: Must print the calculated Diff value before exit."] };
      if (placedMap['s7'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Must close process with [End] terminal."] };

      logs.push("✓ Layout alignment verified.");
      logs.push("✓ Math distance cases validated.");
      logs.push("✓ Simulation trace: A=50, B=20 -> Yes -> Output Diff=30");
      logs.push("✓ Simulation trace: A=10, B=45 -> No -> Output Diff=35");
      return { success: true, logs };
    }
  },
  {
    id: 'double-and-cap',
    title: 'Signal Surge Limiter',
    subtitle: 'Double the inbound variable, cap at absolute threshold of 100',
    difficulty: 'Easy',
    creditsReward: 150,
    description: 'Process an input signal by doubling it (Result = Signal * 2). Check if Result exceeds 100. If Yes, override the valuation with 100. Finally, print the Result and Terminate.',
    initialVariables: { signal: 0, result: 0 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Signal Input', type: 'io', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Double Engine', type: 'process', x: 2, y: 2.4, connectsTo: ['s4'] },
      { id: 's4', label: 'Surge Decision', type: 'decision', x: 2, y: 3.6, connectsTo: ['s5', 's6'] },
      { id: 's5', label: 'Threshold Cap', type: 'process', x: 0.8, y: 4.8, branchLabel: 'Yes (> 100)', connectsTo: ['s6'] },
      { id: 's6', label: 'Output Result', type: 'io', x: 2, y: 6.0, connectsTo: ['s7'] },
      { id: 's7', label: 'Process Terminus', type: 'end', x: 2, y: 7.2, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_sig', type: 'io', label: 'Input Signal' },
      { id: 'b_double_sig', type: 'process', label: 'Double: Result = Signal * 2' },
      { id: 'b_check_100', type: 'decision', label: 'Is Result > 100?' },
      { id: 'b_cap_100', type: 'process', label: 'Cap: Result = 100' },
      { id: 'b_print_res', type: 'io', label: 'Output Result' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_triple', type: 'process', label: 'Triple: Result = Signal * 3' },
      { id: 'b_dist_check_0', type: 'decision', label: 'Is Result <= 0?' },
      { id: 'b_dist_print_fail', type: 'io', label: 'Output "Overload"' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Running signal surge diagnostics...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Expected [Start] node at entry."] };
      if (placedMap['s2'] !== 'b_input_sig') return { success: false, logs: [...logs, "❌ ERROR: Inputs register must read 'Input Signal'."] };
      if (placedMap['s3'] !== 'b_double_sig') return { success: false, logs: [...logs, "❌ ERROR: Process block must double the signal first."] };
      if (placedMap['s4'] !== 'b_check_100') return { success: false, logs: [...logs, "❌ ERROR: Decision check 'Is Result > 100?' is missing or misplaced."] };
      if (placedMap['s5'] !== 'b_cap_100') return { success: false, logs: [...logs, "❌ ERROR: Left branch Yes (threshold exceeded) must override Result = 100."] };
      if (placedMap['s6'] !== 'b_print_res') return { success: false, logs: [...logs, "❌ ERROR: Output channel must print 'Output Result' to terminal."] };
      if (placedMap['s7'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Dangling nodes found. Wire to [End] block."] };

      logs.push("✓ Surge safety logic valid.");
      logs.push("✓ Verified double and cap values.");
      logs.push("✓ Test scale: Input=40 -> doubled 80 <= 100 -> Outputs 80");
      logs.push("✓ Test scale: Input=65 -> doubled 130 > 100 -> Capped and Outputs 100");
      return { success: true, logs };
    }
  },
  {
    id: 'count-down-rocket',
    title: 'Thruster Ignition Sequencer',
    subtitle: 'Initialize variable to 10, count down to 0, output IGNITION',
    difficulty: 'Medium',
    creditsReward: 220,
    description: 'Develop a rocket launcher controller. Initialize Counter to 10. While Counter is greater than 0, output the Counter value and decrement it. Once Counter reaches 0, exit the loop, output "IGNITION" and terminate.',
    initialVariables: { counter: 10 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Init Sequencer', type: 'process', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Countdown Check', type: 'decision', x: 2, y: 2.6, connectsTo: ['s4', 's6'] },
      { id: 's4', label: 'Output Counter', type: 'io', x: 2, y: 4.2, branchLabel: 'Yes (Counter > 0)', connectsTo: ['s5'] },
      { id: 's5', label: 'Decrement Engine', type: 'process', x: 2, y: 5.6, connectsTo: ['s3'] },
      { id: 's6', label: 'Launch Sequence', type: 'io', x: 3.8, y: 2.6, branchLabel: 'No (Counter <= 0)', connectsTo: ['s7'] },
      { id: 's7', label: 'Process Terminus', type: 'end', x: 3.8, y: 4.2, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_init_10', type: 'process', label: 'Initialize Counter = 10' },
      { id: 'b_check_pos', type: 'decision', label: 'Is Counter > 0?' },
      { id: 'b_print_count', type: 'io', label: 'Output Counter' },
      { id: 'b_sub_1', type: 'process', label: 'Subtract 1 from Counter' },
      { id: 'b_print_ignition', type: 'io', label: 'Output "IGNITION!"' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_add_1', type: 'process', label: 'Add 1 to Counter' },
      { id: 'b_dist_check_10', type: 'decision', label: 'Is Counter == 10?' },
      { id: 'b_dist_abort', type: 'io', label: 'Output "ABORT"' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Validating launch sequencer control paths...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing start trigger."] };
      if (placedMap['s2'] !== 'b_init_10') return { success: false, logs: [...logs, "❌ ERROR: Sequencer must initialize Counter to 10."] };
      if (placedMap['s3'] !== 'b_check_pos') return { success: false, logs: [...logs, "❌ ERROR: Loop condition must check 'Is Counter > 0?'."] };
      if (placedMap['s4'] !== 'b_print_count') return { success: false, logs: [...logs, "❌ ERROR: Inside loop, output Counter values sequentially."] };
      if (placedMap['s5'] !== 'b_sub_1') return { success: false, logs: [...logs, "❌ ERROR: Must subtract 1 from Counter on every loop pass."] };
      if (placedMap['s6'] !== 'b_print_ignition') return { success: false, logs: [...logs, "❌ ERROR: Loop completion branch must output 'IGNITION!'."] };
      if (placedMap['s7'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Sequence termination must conclude with [End]."] };

      logs.push("✓ Countdown loop parameters validated.");
      logs.push("✓ Safe bounds verified (Safety checks: PASSED).");
      logs.push("✓ Code simulation counts down from 10 down to 1.");
      logs.push("✓ Correct launch output signal detected.");
      return { success: true, logs };
    }
  },
  {
    id: 'max-of-three',
    title: 'Peak Signal Locator',
    subtitle: 'Evaluate three variables and output only the largest value',
    difficulty: 'Hard',
    creditsReward: 250,
    description: 'Construct a nested decision tree. Input three signals: A, B, and C. Evaluate if A is the largest (A >= B AND A >= C). If Yes, print "A is Max" and Exit. If No, evaluate if B >= C. If Yes, print "B is Max", otherwise print "C is Max".',
    initialVariables: { a: 0, b: 0, c: 0, max: 0 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Input Signals', type: 'io', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'A >= B & C?', type: 'decision', x: 2, y: 2.4, connectsTo: ['s4', 's5'] },
      { id: 's4', label: 'Output: A Max', type: 'io', x: 0.5, y: 3.8, branchLabel: 'Yes (A is Max)', connectsTo: ['s8'] },
      { id: 's5', label: 'Is B >= C?', type: 'decision', x: 3.5, y: 3.8, branchLabel: 'No (A is not Max)', connectsTo: ['s6', 's7'] },
      { id: 's6', label: 'Output: B Max', type: 'io', x: 2.45, y: 4.8, branchLabel: 'Yes (B >= C)', connectsTo: ['s8'] },
      { id: 's7', label: 'Output: C Max', type: 'io', x: 4.15, y: 4.8, branchLabel: 'No (B < C)', connectsTo: ['s8'] },
      { id: 's8', label: 'Process Terminus', type: 'end', x: 2, y: 6.2, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_all', type: 'io', label: 'Input A, B, C' },
      { id: 'b_check_a', type: 'decision', label: 'Is A >= B and A >= C?' },
      { id: 'b_print_a', type: 'io', label: 'Output "A is Max"' },
      { id: 'b_check_bc', type: 'decision', label: 'Is B >= C?' },
      { id: 'b_print_b', type: 'io', label: 'Output "B is Max"' },
      { id: 'b_print_c', type: 'io', label: 'Output "C is Max"' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_add_all', type: 'process', label: 'Calculate Sum = A + B + C' },
      { id: 'b_dist_check_eq', type: 'decision', label: 'Is A == B == C?' },
      { id: 'b_dist_print_fail', type: 'io', label: 'Output "Zero Signal"' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Auditing nested decision pathway tree...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing sequence entry [Start]."] };
      if (placedMap['s2'] !== 'b_input_all') return { success: false, logs: [...logs, "❌ ERROR: Captured register values must read input sequence."] };
      if (placedMap['s3'] !== 'b_check_a') return { success: false, logs: [...logs, "❌ ERROR: Root decision gate must test 'Is A >= B and A >= C?'."] };
      if (placedMap['s4'] !== 'b_print_a') return { success: false, logs: [...logs, "❌ ERROR: If A is greater than or equal to both B and C, you must write 'A is Max' output."] };
      if (placedMap['s5'] !== 'b_check_bc') return { success: false, logs: [...logs, "❌ ERROR: Fallback decision must evaluate 'Is B >= C?'."] };
      if (placedMap['s6'] !== 'b_print_b') return { success: false, logs: [...logs, "❌ ERROR: If B >= C, output 'B is Max' block."] };
      if (placedMap['s7'] !== 'b_print_c') return { success: false, logs: [...logs, "❌ ERROR: If B < C, fallback branch must output 'C is Max'."] };
      if (placedMap['s8'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Schematic must exit cleanly with [End]."] };

      logs.push("✓ Symmetrical tree pathways validated.");
      logs.push("✓ Verified Max bounds evaluation logic: Safe.");
      logs.push("✓ Test simulation: A=90, B=20, C=10 -> A is Max. Confirmed!");
      logs.push("✓ Test simulation: A=10, B=65, C=40 -> B is Max. Confirmed!");
      logs.push("✓ Test simulation: A=5, B=10, C=80 -> C is Max. Confirmed!");
      return { success: true, logs };
    }
  },
  {
    id: 'factorial-calc',
    title: 'The Factorial Calculator',
    subtitle: 'Compute the factorial (N!) of an input integer N',
    difficulty: 'Hard',
    creditsReward: 260,
    description: 'Construct a factorial workflow. Read N from user input. Initialize Result = 1. Program a loop while N > 1 where we evaluate N > 1, multiply Result = Result * N, decrement N = N - 1, and output Result when the loop ends.',
    initialVariables: { a: 5, b: 0, c: 0, result: 1 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Input Value N', type: 'io', x: 2, y: 1.1, connectsTo: ['s3'] },
      { id: 's3', label: 'Initialize Result', type: 'process', x: 2, y: 2.2, connectsTo: ['s4'] },
      { id: 's4', label: 'Loop Check', type: 'decision', x: 2, y: 3.5, connectsTo: ['s5', 's7'] },
      { id: 's5', label: 'Factorial Multiply', type: 'process', x: 2, y: 4.8, branchLabel: 'Yes (N > 1)', connectsTo: ['s6'] },
      { id: 's6', label: 'Decrement N', type: 'process', x: 2, y: 6.0, connectsTo: ['s4'] },
      { id: 's7', label: 'Output Result', type: 'io', x: 3.7, y: 3.5, branchLabel: 'No (N <= 1)', connectsTo: ['s8'] },
      { id: 's8', label: 'Process Terminus', type: 'end', x: 3.7, y: 5.0, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_n', type: 'io', label: 'Input N' },
      { id: 'b_init_res_1', type: 'process', label: 'Initialize Result = 1' },
      { id: 'b_check_n_gt_1', type: 'decision', label: 'Is N > 1?' },
      { id: 'b_multiply_res', type: 'process', label: 'Multiply: Result = Result * N' },
      { id: 'b_sub_n_1', type: 'process', label: 'Decrement: N = N - 1' },
      { id: 'b_print_res', type: 'io', label: 'Output Result' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_add_res', type: 'process', label: 'Add: Result = Result + N' },
      { id: 'b_dist_check_res', type: 'decision', label: 'Is Result > N?' },
      { id: 'b_dist_print_n', type: 'io', label: 'Output N' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Verifying Factorial Calculator logic flow...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing start trigger [Start]."] };
      if (placedMap['s2'] !== 'b_input_n') return { success: false, logs: [...logs, "❌ ERROR: Expected input register for value N."] };
      if (placedMap['s3'] !== 'b_init_res_1') return { success: false, logs: [...logs, "❌ ERROR: Must initialize factorial result: Initialize Result = 1."] };
      if (placedMap['s4'] !== 'b_check_n_gt_1') return { success: false, logs: [...logs, "❌ ERROR: Decision check 'Is N > 1?' is misconfigured or out of place."] };
      if (placedMap['s5'] !== 'b_multiply_res') return { success: false, logs: [...logs, "❌ ERROR: Yes branch inside loop must apply Factorial Multiply: Result = Result * N."] };
      if (placedMap['s6'] !== 'b_sub_n_1') return { success: false, logs: [...logs, "❌ ERROR: Must decrement N by 1 inside loop body (N = N - 1)."] };
      if (placedMap['s7'] !== 'b_print_res') return { success: false, logs: [...logs, "❌ ERROR: No branch from loop exit must connect output Result block."] };
      if (placedMap['s8'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Finish with the terminal [End] point."] };

      logs.push("✓ Factorial loop layout matches design requirements.");
      logs.push("✓ Verified trace simulation: Input N = 5 -> Factorial computed 120.");
      logs.push("✓ Verified trace simulation: Input N = 3 -> Factorial computed 6.");
      return { success: true, logs };
    }
  },
  {
    id: 'temp-freezing-check',
    title: 'Freezing Point Sensor',
    subtitle: 'Convert Celsius to Fahrenheit and assess freeze threat',
    difficulty: 'Easy',
    creditsReward: 140,
    description: 'Read a Celsius temperature value, convert it to Fahrenheit using F = TempC * 1.8 + 32, and check if F <= 32. If Yes, output "FREEZING". If No, output "SAFE". Finally, terminate.',
    initialVariables: { a: 15, b: 0, c: 0, result: 0 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Read Temperature', type: 'io', x: 2, y: 1.2, connectsTo: ['s3'] },
      { id: 's3', label: 'Convert F', type: 'process', x: 2, y: 2.4, connectsTo: ['s4'] },
      { id: 's4', label: 'Decision Node', type: 'decision', x: 2, y: 3.6, connectsTo: ['s5', 's6'] },
      { id: 's5', label: 'Freeze State', type: 'io', x: 0.8, y: 5.0, branchLabel: 'Yes (<= 32)', connectsTo: ['s7'] },
      { id: 's6', label: 'Safe State', type: 'io', x: 3.2, y: 5.0, branchLabel: 'No (> 32)', connectsTo: ['s7'] },
      { id: 's7', label: 'Process Terminus', type: 'end', x: 2, y: 6.4, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_temp', type: 'io', label: 'Input TempC' },
      { id: 'b_convert_temp', type: 'process', label: 'Convert: F = TempC * 1.8 + 32' },
      { id: 'b_check_freezing', type: 'decision', label: 'Is F <= 32?' },
      { id: 'b_print_freezing', type: 'io', label: 'Output "FREEZING"' },
      { id: 'b_print_safe', type: 'io', label: 'Output "SAFE"' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_c_only', type: 'process', label: 'Convert: F = TempC * 1.8' },
      { id: 'b_dist_boil', type: 'decision', label: 'Is F > 100?' },
      { id: 'b_print_boil', type: 'io', label: 'Output "BOILING"' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Running freezing point diagnostic scan...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing sequence entry 'Start'."] };
      if (placedMap['s2'] !== 'b_input_temp') return { success: false, logs: [...logs, "❌ ERROR: Expected input temperature register reading C."] };
      if (placedMap['s3'] !== 'b_convert_temp') return { success: false, logs: [...logs, "❌ ERROR: Ensure math equation converts Celsius: F = TempC * 1.8 + 32."] };
      if (placedMap['s4'] !== 'b_check_freezing') return { success: false, logs: [...logs, "❌ ERROR: Decision check 'Is F <= 32?' is missing."] };
      if (placedMap['s5'] !== 'b_print_freezing') return { success: false, logs: [...logs, "❌ ERROR: If conversion <= 32 (freezing state), output 'FREEZING' must trigger."] };
      if (placedMap['s6'] !== 'b_print_safe') return { success: false, logs: [...logs, "❌ ERROR: If conversion > 32 (warm state), output 'SAFE' must trigger."] };
      if (placedMap['s7'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Output branches must rejoin and close with [End]."] };

      logs.push("✓ Conversion pipeline verified.");
      logs.push("✓ Correct branch selections verified.");
      logs.push("✓ Test simulation: TempC = 0 -> F = 32 -> YES -> Output 'FREEZING'!");
      logs.push("✓ Test simulation: TempC = 15 -> F = 59 -> NO -> Output 'SAFE'!");
      return { success: true, logs };
    }
  },
  {
    id: 'sum-natural-numbers',
    title: 'Natural Number Accumulator',
    subtitle: 'Compute the sum of integers from 1 up to N',
    difficulty: 'Medium',
    creditsReward: 200,
    description: 'Read limit N from user input. Initialize Sum = 0 and Counter = 1. Create a loop verifying Counter <= N. In each pass, add Counter to Sum (Sum = Sum + Counter), increment Counter (Counter = Counter + 1), and then print Sum at loop exit.',
    initialVariables: { a: 5, b: 0, c: 0, result: 0 },
    slots: [
      { id: 's1', label: 'Trigger Event', type: 'start', x: 2, y: 0, connectsTo: ['s2'] },
      { id: 's2', label: 'Input Limit N', type: 'io', x: 2, y: 1.1, connectsTo: ['s3'] },
      { id: 's3', label: 'Initialize Sum/Counter', type: 'process', x: 2, y: 2.2, connectsTo: ['s4'] },
      { id: 's4', label: 'Loop Check', type: 'decision', x: 2, y: 3.4, connectsTo: ['s5', 's7'] },
      { id: 's5', label: 'Accumulate Sum', type: 'process', x: 2, y: 4.6, branchLabel: 'Yes (<= N)', connectsTo: ['s6'] },
      { id: 's6', label: 'Increment Counter', type: 'process', x: 2, y: 5.8, connectsTo: ['s4'] },
      { id: 's7', label: 'Output Sum', type: 'io', x: 3.7, y: 3.4, branchLabel: 'No (> N)', connectsTo: ['s8'] },
      { id: 's8', label: 'Process Terminus', type: 'end', x: 3.7, y: 4.8, connectsTo: [] }
    ],
    blocksBank: [
      { id: 'b_start', type: 'start', label: 'Start' },
      { id: 'b_input_limit', type: 'io', label: 'Input Limit N' },
      { id: 'b_init_sum_c', type: 'process', label: 'Initialize Sum = 0, Counter = 1' },
      { id: 'b_check_c_lte_n', type: 'decision', label: 'Is Counter <= N?' },
      { id: 'b_add_c_to_sum', type: 'process', label: 'Accumulate: Sum = Sum + Counter' },
      { id: 'b_add_1_to_c', type: 'process', label: 'Increment: Counter = Counter + 1' },
      { id: 'b_print_sum', type: 'io', label: 'Output Sum' },
      { id: 'b_end', type: 'end', label: 'End' }
    ],
    distractors: [
      { id: 'b_dist_add_only', type: 'process', label: 'Accumulate: Sum = Sum + 1' },
      { id: 'b_dist_check_over', type: 'decision', label: 'Is Sum > N?' },
      { id: 'b_print_c_only', type: 'io', label: 'Output Counter' }
    ],
    verifyCode: (placedMap) => {
      const logs = [];
      logs.push(">>> Verifying natural summation accumulator diagram...");
      if (placedMap['s1'] !== 'b_start') return { success: false, logs: [...logs, "❌ ERROR: Missing start trigger [Start]."] };
      if (placedMap['s2'] !== 'b_input_limit') return { success: false, logs: [...logs, "❌ ERROR: Limit N must be inputted at the starting channel."] };
      if (placedMap['s3'] !== 'b_init_sum_c') return { success: false, logs: [...logs, "❌ ERROR: Registers initialization for loop: Initialize Sum = 0, Counter = 1 is missing."] };
      if (placedMap['s4'] !== 'b_check_c_lte_n') return { success: false, logs: [...logs, "❌ ERROR: Decision gate must review limit condition: Is Counter <= N?"] };
      if (placedMap['s5'] !== 'b_add_c_to_sum') return { success: false, logs: [...logs, "❌ ERROR: Inside loop, accumulate step fails: Sum = Sum + Counter."] };
      if (placedMap['s6'] !== 'b_add_1_to_c') return { success: false, logs: [...logs, "❌ ERROR: Loop iteration step is missing: Increment: Counter = Counter + 1."] };
      if (placedMap['s7'] !== 'b_print_sum') return { success: false, logs: [...logs, "❌ ERROR: Output node must print computed 'Output Sum' value at loop exit."] };
      if (placedMap['s8'] !== 'b_end') return { success: false, logs: [...logs, "❌ ERROR: Layout is incomplete. Join terminating path to the [End] block."] };

      logs.push("✓ Summation parameters mapped correctly.");
      logs.push("✓ Safe loop metrics recorded (safety index check: PASSED).");
      logs.push("✓ Test simulation: N = 5 -> Computed sum = 15.");
      logs.push("✓ Test simulation: N = 10 -> Computed sum = 55.");
      return { success: true, logs };
    }
  }
];

interface FlowchartLabProps {
  onBackToMain: () => void;
  onRewardCredits: (credits: number) => void;
  currentCredits: number;
  userInterest?: string;
  activeTheme?: { id: string; name: string; value: string };
}

// Helper to map grid coordinates to absolute pixel values in the 800px canvas
const getCoordinates = (x: number, y: number) => {
  // Center is mapped to 400px (meaning x = 2 is center of 800px canvas)
  const xCoord = 400 + (x - 2) * 125;
  const yCoord = y * 58 + 40;
  return { x: xCoord, y: yCoord };
};

export default function FlowchartLab({ onBackToMain, onRewardCredits, currentCredits, userInterest, activeTheme }: FlowchartLabProps) {
  // Theme titles & badges
  const getThemeDetails = () => {
    const rawInterest = (userInterest || activeTheme?.value || '').toLowerCase().trim();
    if (rawInterest.includes('simpson')) {
      return {
        title: "SPRINGFIELD SCHEMATICS FLOW",
        subtitle: "Apu's automated Kwik-E-Mart stock algorithm flowcharts",
        badge: "🍩 APU APPROVED"
      };
    }
    if (rawInterest.includes('marvel')) {
      return {
        title: "STARK JARVIS SYNC GRID",
        subtitle: "Design flows for Stark Industries flight engines",
        badge: "🦸 STARK VERIFIED"
      };
    }
    if (rawInterest.includes('star wars') || rawInterest.includes('starwars')) {
      return {
        title: "JEDI FLOWCHART LOGIC CONSOLE",
        subtitle: "Design automated pathfinding for R2-D2",
        badge: "🌌 JEDI ARCHIVE"
      };
    }
    if (rawInterest.includes('space') || rawInterest.includes('void')) {
      return {
        title: "DEEP SPACE ALGORITHM DESIGNER",
        subtitle: "Orbital flight plans and stellar calculations",
        badge: "🚀 GALACTIC DECK"
      };
    }
    if (rawInterest.includes('football') || rawInterest.includes('sport')) {
      return {
        title: "CAMP NOU PLAY-BOOK DIAGRAMS",
        subtitle: "Synthesizing play strategies and match tactical routes",
        badge: "⚽ LA LIGA SYSTEM"
      };
    }
    if (rawInterest.includes('music') || rawInterest.includes('beat')) {
      return {
        title: "MPC SYSTEM FLOWCHART",
        subtitle: "Synthesizing looping frequencies and beat-making timelines",
        badge: "🎵 AUDIO SYNCED"
      };
    }
    if (rawInterest.includes('fantasy') || rawInterest.includes('magic') || rawInterest.includes('mystic')) {
      return {
        title: "ARCANE SCROLL SYNTAX PLOTTER",
        subtitle: "Synthesizing spell runes and spell pathways",
        badge: "🔮 MAGUS SYSTEM"
      };
    }
    if (rawInterest.includes('roblox') || rawInterest.includes('block') || rawInterest.includes('obby')) {
      return {
        title: "ROBLOX STUDIO OBBY ENGINE",
        subtitle: "Design complete mechanics for obby games",
        badge: "🎮 STUDIO ACTIVE"
      };
    }
    if (rawInterest.includes('cyberpunk') || rawInterest.includes('hack')) {
      return {
        title: "NIGHT CITY RETRO SUBSET",
        subtitle: "Secure server layout schema designer",
        badge: "💾 MATRIX SECTOR"
      };
    }
    if (rawInterest.includes('dc') || rawInterest.includes('bat')) {
      return {
        title: "WAYNETECH EXPERIMENTAL OS",
        subtitle: "Batcomputer tactical blueprint overrides",
        badge: "🦇 BATMAN OS"
      };
    }
    return {
      title: "FLOWCHART LAB",
      subtitle: "Map layout systems visually to pass logic tests.",
      badge: "ALGORITHMIC THINKING"
    };
  };

  const themeDetails = getThemeDetails();

  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const challenge = FLOWCHART_CHALLENGES[activeChallengeIdx];

  // Store which block is placed in which slot
  // Key: slot ID, Value: block ID
  const [placedBlocks, setPlacedBlocks] = useState<Record<string, string>>({});
  // Selected block from the palette
  const [selectedPaletteBlockId, setSelectedPaletteBlockId] = useState<string | null>(null);
  // Track which slot is being hovered during visual drag-and-drop
  const [draggedOverSlotId, setDraggedOverSlotId] = useState<string | null>(null);

  // States for verification and simulation
  const [verificationResult, setVerificationResult] = useState<{ success: boolean; logs: string[] } | null>(null);
  const [executingSlotId, setExecutingSlotId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simulationInputs, setSimulationInputs] = useState<{ a: number; b: number; c: number }>({ a: 15, b: 3, c: 2 });
  const [showRewardNotification, setShowRewardNotification] = useState(false);
  const [earnedReward, setEarnedReward] = useState(0);
  const [copiedType, setCopiedType] = useState<'pseudo' | 'python' | null>(null);

  // Step-by-step simulator states
  const [simulationSteps, setSimulationSteps] = useState<SimStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState<number>(650); // ms per step
  
  // Custom Visual Failure indicators
  const [showErrorOverlay, setShowErrorOverlay] = useState(false);
  const [shakeCanvas, setShakeCanvas] = useState(false);

  // Sync executingSlotId and simulationLogs based on current step index
  useEffect(() => {
    if (isSimulating && simulationSteps.length > 0 && currentStepIndex >= 0) {
      const activeStep = simulationSteps[currentStepIndex];
      setExecutingSlotId(activeStep.slotId);

      const baseLogs = [
        "🎉 SCHEMATIC VERIFICATION PASSED. CODER ENGINE ACTIVE.",
        `>>> INJECTING SIMULATED VALUES: a=${simulationInputs.a}, b=${simulationInputs.b}, c=${simulationInputs.c}`,
        ...simulationSteps.slice(0, currentStepIndex + 1).map(s => `[TRACE] ${s.log}`)
      ];
      if (currentStepIndex === simulationSteps.length - 1) {
        baseLogs.push("", "🏆 SIMULATION STATUS: SECURE. CHALLENGE COMPLETED SUCCESSFULLY!");
      }
      setSimulationLogs(baseLogs);
    } else {
      setExecutingSlotId(null);
    }
  }, [currentStepIndex, simulationSteps, isSimulating, simulationInputs]);

  // Handle auto-play intervals
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isSimulating && isAutoPlay && simulationSteps.length > 0) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < simulationSteps.length - 1) {
            return prev + 1;
          } else {
            setIsAutoPlay(false);
            return prev;
          }
        });
      }, autoPlaySpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSimulating, isAutoPlay, simulationSteps, autoPlaySpeed]);

  // Sync error overlay display with schematic changes
  useEffect(() => {
    if (!verificationResult) {
      setShowErrorOverlay(false);
    }
  }, [verificationResult]);

  // Listen for Escape key on window to dismiss compiler error overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowErrorOverlay(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCopyCode = (text: string, type: 'pseudo' | 'python') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Dynamic position offsets for slots inside the flowchart (allows dragging)
  const [slotOffsets, setSlotOffsets] = useState<Record<string, { x: number; y: number }>>({});

  // Reset node offsets and simulation status when switching challenges to avoid layout spillover
  useEffect(() => {
    setSlotOffsets({});
    setSimulationSteps([]);
    setCurrentStepIndex(-1);
    setIsSimulating(false);
    setIsAutoPlay(false);
    setVerificationResult(null);
  }, [activeChallengeIdx]);

  // Drag tracking refs
  const dragInfo = useRef<{
    slotId: string;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
    hasMoved: boolean;
  } | null>(null);

  const justDraggedRef = useRef(false);

  // Helper to map grid coordinates to absolute pixel values with offsets
  const getSlotCoords = (slotId: string, defaultX: number, defaultY: number) => {
    const base = getCoordinates(defaultX, defaultY);
    const offset = slotOffsets[slotId] || { x: 0, y: 0 };
    return { x: base.x + offset.x, y: base.y + offset.y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, slotId: string) => {
    // Only drag with left mouse button / single finger touch
    if (e.button !== 0) return;
    
    // Ignore drag if clicking close button, delete button, or input values inside
    const target = e.target as HTMLElement;
    if (target.closest('.no-drag')) {
      return;
    }

    const currentOffset = slotOffsets[slotId] || { x: 0, y: 0 };
    dragInfo.current = {
      slotId,
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: currentOffset.x,
      startOffsetY: currentOffset.y,
      hasMoved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, slotId: string) => {
    if (!dragInfo.current || dragInfo.current.slotId !== slotId) return;
    
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;
    
    if (!dragInfo.current.hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      dragInfo.current.hasMoved = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        console.warn("Could not set pointer capture", err);
      }
    }

    if (dragInfo.current.hasMoved) {
      const { startOffsetX, startOffsetY } = dragInfo.current;
      setSlotOffsets(prev => ({
        ...prev,
        [slotId]: {
          x: startOffsetX + dx,
          y: startOffsetY + dy
        }
      }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, slotId: string) => {
    if (dragInfo.current && dragInfo.current.slotId === slotId) {
      if (dragInfo.current.hasMoved) {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (err) {
          console.warn("Could not release pointer capture", err);
        }
        // Block the next immediate click so dragging doesn't count as standard slot click
        justDraggedRef.current = true;
        setTimeout(() => {
          justDraggedRef.current = false;
        }, 50);
      }
      dragInfo.current = null;
    }
  };
  
  // Stored list of completed challenge IDs
  const [completedList, setCompletedList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('flowchart_completed_challenges');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'unsolved' | 'solved'>('all');

  // Reset local challenge slots
  const resetChallenge = () => {
    setPlacedBlocks({});
    setSelectedPaletteBlockId(null);
    setVerificationResult(null);
    setExecutingSlotId(null);
    setIsSimulating(false);
    setSimulationLogs([]);
    setSlotOffsets({});
    setShowErrorOverlay(false);
    setShakeCanvas(false);
  };

  useEffect(() => {
    resetChallenge();
    // Pre-calculate randomized inputs for simulations
    randomizeInputs();
  }, [activeChallengeIdx]);

  const randomizeInputs = () => {
    setSimulationInputs({
      a: Math.floor(Math.random() * 50) + 30, // 30-80
      b: Math.floor(Math.random() * 15) + 5,   // 5-20
      c: Math.floor(Math.random() * 5) + 1     // 1-5
    });
  };

  // Helper lists representing the block pool + distractors
  const allAvailableBlocks = React.useMemo(() => {
    // Combine blocks bank + distractors, shuffle them gently
    return [...challenge.blocksBank, ...challenge.distractors];
  }, [challenge]);

  // Click handler for blocks in the bank
  const handlePaletteBlockClick = (blockId: string) => {
    setSelectedPaletteBlockId(prev => prev === blockId ? null : blockId);
  };

  // Drag-and-drop support: Start dragging from the block bank
  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    e.dataTransfer.setData("text/plain", blockId);
    setSelectedPaletteBlockId(blockId);
  };

  // Drag-and-drop support: Drag over an empty or occupied slot
  const handleDragOver = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    if (draggedOverSlotId !== slotId) {
      setDraggedOverSlotId(slotId);
    }
  };

  // Drag-and-drop support: Drag leaves the slot
  const handleDragLeave = (e: React.DragEvent, slotId: string) => {
    if (draggedOverSlotId === slotId) {
      setDraggedOverSlotId(null);
    }
  };

  // Drag-and-drop support: Drop block onto slot
  const handleDropOnSlot = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    setDraggedOverSlotId(null);
    const blockId = e.dataTransfer.getData("text/plain");
    if (!blockId) return;

    const updated = { ...placedBlocks };
    Object.keys(updated).forEach(k => {
      if (updated[k] === blockId) {
        delete updated[k];
      }
    });

    updated[slotId] = blockId;
    setPlacedBlocks(updated);
    setSelectedPaletteBlockId(null); // Clear active selected states
    setVerificationResult(null); // Reset schematic verification
  };

  // Click handler for slots in the workspace
  const handleSlotClick = (slotId: string) => {
    if (justDraggedRef.current) return;
    // If a block is currently selected, place it in the clicked slot
    if (selectedPaletteBlockId) {
      // Find if this block is already placed elsewhere and remove it if so
      const updated = { ...placedBlocks };
      Object.keys(updated).forEach(k => {
        if (updated[k] === selectedPaletteBlockId) {
          delete updated[k];
        }
      });
      // Place it
      updated[slotId] = selectedPaletteBlockId;
      setPlacedBlocks(updated);
      setSelectedPaletteBlockId(null); // Clear selection
      
      // Clear verify state when schematic modifications happen
      setVerificationResult(null);
    } else {
      // If no block selected, click on an occupied slot to remove/clear it
      if (placedBlocks[slotId]) {
        const updated = { ...placedBlocks };
        delete updated[slotId];
        setPlacedBlocks(updated);
        setVerificationResult(null);
      }
    }
  };

  // Run the schematic verification and active step simulation
  const checkSchematicAndExecute = async () => {
    if (isSimulating) return;

    // Verify correct logic placement
    const check = challenge.verifyCode(placedBlocks);
    setVerificationResult(check);

    if (!check.success) {
      setSimulationLogs(check.logs);
      setShowErrorOverlay(true);
      setShakeCanvas(true);
      // Automatically reset vibration feedback after keyframes complete
      setTimeout(() => {
        setShakeCanvas(false);
      }, 500);
      return;
    }

    // Success - dismiss error indicator overlay
    setShowErrorOverlay(false);

    // Persist completed challenge and reward credits immediately on successful design verification
    if (!completedList.includes(challenge.id)) {
      const updated = [...completedList, challenge.id];
      setCompletedList(updated);
      try {
        localStorage.setItem('flowchart_completed_challenges', JSON.stringify(updated));
      } catch {}

      // Trigger reward credits
      onRewardCredits(challenge.creditsReward);
      setEarnedReward(challenge.creditsReward);
      setShowRewardNotification(true);
    }

    // Success! Let's build the step-by-step instructions list and trigger auto-run
    const steps = getChallengeSimSteps(challenge.id, simulationInputs, placedBlocks, allAvailableBlocks);
    setSimulationSteps(steps);
    setCurrentStepIndex(0);
    setIsSimulating(true);
    setIsAutoPlay(true);
    return; // Short-circuit the legacy loops below

    // Success! Let's trigger a beautiful visual execution loop trace
    setIsSimulating(true);
    setSimulationLogs(["🛡️ SCHEMATIC ENCRYPT_KEY PASSED. BOOTING CODER ENGINE...", ">>> INJECTING SIMULATED CHIP INBOUND VALUES:"]);
    
    // Simulate active tracers
    const isLoop = isLoopChallenge(challenge.id);
    
    if (challenge.id === 'subtract-three') {
      const { a, b, c } = simulationInputs;
      setSimulationLogs(prev => [
        ...prev,
        `>>> REG_A: ${a} | REG_B: ${b} | REG_C: ${c}`,
        `>>> Starting node tracing...`
      ]);

      const stepsSequence = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'];
      for (const step of stepsSequence) {
        setExecutingSlotId(step);
        const activeBlockId = placedBlocks[step];
        const activeBlock = allAvailableBlocks.find(b => b.id === activeBlockId);
        
        let text = `Running: [${activeBlock?.label || 'Empty'}]`;
        if (step === 's2') text += ` (Register A = ${a})`;
        if (step === 's3') text += ` (Register B = ${b})`;
        if (step === 's4') text += ` (Register C = ${c})`;
        if (step === 's5') text += ` (Calculating: ${a} - ${b} - ${c} = ${a - b - c})`;
        if (step === 's6') text = `📺 CONSOLE FEED: ${a - b - c}`;
        
        setSimulationLogs(prev => [...prev, `[TRACE] ${text}`]);
        await new Promise(r => setTimeout(r, 600));
      }
    } 
    else if (challenge.id === 'subtract-three-threshold') {
      const { a, b, c } = simulationInputs;
      const res = a - b - c;
      const isLarger = res > 20;

      setSimulationLogs(prev => [
        ...prev,
        `>>> REG_A: ${a} | REG_B: ${b} | REG_C: ${c} | COMBINED: ${res}`,
        `>>> Trailing node trace...`
      ]);

      const stepsSequence = ['s1', 's2', 's3', 's4', isLarger ? 's5' : 's6', 's7'];
      for (const step of stepsSequence) {
        setExecutingSlotId(step);
        const activeBlockId = placedBlocks[step];
        const activeBlock = allAvailableBlocks.find(b => b.id === activeBlockId);
        
        let text = `Running Block: [${activeBlock?.label || 'Empty'}]`;
        if (step === 's3') text += ` (Formula resolves: ${res})`;
        if (step === 's4') text += ` (Evaluating: is ${res} > 20? -> ${isLarger ? 'YES' : 'NO'})`;
        if (step === 's5') text = `📺 CONSOLE FEED: "Larger"`;
        if (step === 's6') text = `📺 CONSOLE FEED: "Less"`;

        setSimulationLogs(prev => [...prev, `[TRACE] ${text}`]);
        await new Promise(r => setTimeout(r, 600));
      }
    }
    else if (challenge.id === 'count-to-hundred') {
      setSimulationLogs(prev => [...prev, `>>> Initiating iteration counters...`]);
      
      // Sequence: Start, Init, Check loop visually then generate summary list
      const traceSteps = ['s1', 's2', 's3', 's4', 's5'];
      for (const step of traceSteps) {
        setExecutingSlotId(step);
        await new Promise(r => setTimeout(r, 450));
      }

      setSimulationLogs(prev => [
        ...prev,
        `[TRACE] Running Loop Check (Counter <= 100? -> Yes)`,
        `[TRACE] 📺 CONSOLE FEED: 1`,
        `[TRACE] 📺 CONSOLE FEED: 2`,
        `[TRACE] 📺 CONSOLE FEED: 3`,
        `[TRACE] 📺 CONSOLE FEED: ... skipping middle elements to prevent terminal stack crash ...`,
        `[TRACE] 📺 CONSOLE FEED: 98`,
        `[TRACE] 📺 CONSOLE FEED: 99`,
        `[TRACE] 📺 CONSOLE FEED: 100`,
        `[TRACE] Loop Check (Counter <= 100? - Counter=101 -> No / Exit loop)`,
        `[TRACE] Routing to Process Terminus [End]`
      ]);

      setExecutingSlotId('s6');
      await new Promise(r => setTimeout(r, 500));
    }
    else if (challenge.id === 'multiply-odd-even') {
      // Simulate random products
      const { a, b, c } = simulationInputs;
      const product = a * b * c;
      const isEven = product % 2 === 0;

      setSimulationLogs(prev => [
        ...prev,
        `>>> INPUTS: ${a} * ${b} * ${c} = ${product}`,
        `>>> Sequential validation booting...`
      ]);

      const stepsSequence = ['s1', 's2', 's3', 's4', 's5', isEven ? 's6' : 's7', 's8'];
      for (const step of stepsSequence) {
        setExecutingSlotId(step);
        const activeBlockId = placedBlocks[step];
        const activeBlock = allAvailableBlocks.find(b => b.id === activeBlockId);
        
        let text = `Running Block: [${activeBlock?.label || 'Empty'}]`;
        if (step === 's4') text = `📺 CONSOLE FEED: Output Result = ${product}`;
        if (step === 's5') text += ` (Evaluating: is ${product} % 2 == 0? -> ${isEven ? 'YES' : 'NO'})`;
        if (step === 's6') text = `📺 CONSOLE FEED: "EVEN"`;
        if (step === 's7') text = `📺 CONSOLE FEED: "ODD"`;

        setSimulationLogs(prev => [...prev, `[TRACE] ${text}`]);
        await new Promise(r => setTimeout(r, 600));
      }
    }
    else if (challenge.id === 'count-odd-only') {
      setSimulationLogs(prev => [...prev, `>>> Parsing parity filters iterative schematic...`]);
      const initialVisualTrace = ['s1', 's2', 's3', 's4', 's5', 's6'];
      for (const step of initialVisualTrace) {
        setExecutingSlotId(step);
        await new Promise(r => setTimeout(r, 400));
      }

      setSimulationLogs(prev => [
        ...prev,
        `[TRACE] Loop Check (Counter <= 100? -> Yes)`,
        `[TRACE] Is 1 Odd? -> Yes -> 📺 CONSOLE FEED: 1`,
        `[TRACE] Is 2 Odd? -> No -> (Skip display output, jump to increment)`,
        `[TRACE] Is 3 Odd? -> Yes -> 📺 CONSOLE FEED: 3`,
        `[TRACE] ... iterating sequence up to 100 ...`,
        `[TRACE] 📺 CONSOLE FEED: 97`,
        `[TRACE] 📺 CONSOLE FEED: 99`,
        `[TRACE] Loop Exit (Counter=101 > 100)`,
        `[TRACE] Tracing to exits...`
      ]);

      setExecutingSlotId('s7');
      await new Promise(r => setTimeout(r, 500));
    }
    else if (challenge.id === 'absolute-difference') {
      const { a, b } = simulationInputs;
      const diff = Math.abs(a - b);
      const isGreaterOrEqual = a >= b;

      setSimulationLogs(prev => [
        ...prev,
        `>>> REG_A: ${a} | REG_B: ${b}`,
        `>>> Starting active flowchart trace...`
      ]);

      const stepsSequence = ['s1', 's2', 's3', isGreaterOrEqual ? 's4' : 's5', 's6', 's7'];
      for (const step of stepsSequence) {
        setExecutingSlotId(step);
        const activeBlockId = placedBlocks[step];
        const activeBlock = allAvailableBlocks.find(b => b.id === activeBlockId);
        
        let text = `Running Block: [${activeBlock?.label || 'Empty'}]`;
        if (step === 's2') text += ` (Captured A=${a}, B=${b})`;
        if (step === 's3') text += ` (Is A(${a}) >= B(${b})? -> ${isGreaterOrEqual ? 'YES' : 'NO'})`;
        if (step === 's4') text += ` (Calculated Difference: ${a} - ${b} = ${diff})`;
        if (step === 's5') text += ` (Calculated Difference: ${b} - ${a} = ${diff})`;
        if (step === 's6') text = `📺 CONSOLE FEED: Absolute Diff = ${diff}`;

        setSimulationLogs(prev => [...prev, `[TRACE] ${text}`]);
        await new Promise(r => setTimeout(r, 600));
      }
    }
    else if (challenge.id === 'double-and-cap') {
      const { a } = simulationInputs;
      const doubledValue = a * 2;
      const isExceeded = doubledValue > 100;
      const finalValue = isExceeded ? 100 : doubledValue;

      setSimulationLogs(prev => [
        ...prev,
        `>>> INPUT SIGNAL: ${a}`,
        `>>> Starting surge trace checks...`
      ]);

      const stepsSequence = isExceeded 
        ? ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] 
        : ['s1', 's2', 's3', 's4', 's6', 's7'];

      for (const step of stepsSequence) {
        setExecutingSlotId(step);
        const activeBlockId = placedBlocks[step];
        const activeBlock = allAvailableBlocks.find(b => b.id === activeBlockId);
        
        let text = `Running: [${activeBlock?.label || 'Empty'}]`;
        if (step === 's2') text += ` (Signal = ${a})`;
        if (step === 's3') text += ` (Doubled Value = ${doubledValue})`;
        if (step === 's4') text += ` (Is ${doubledValue} > 100? -> ${isExceeded ? 'YES (SURGE TRIGGERED)' : 'NO (SAFE RANGE)'})`;
        if (step === 's5') text += ` (Cap applied: override Result to 100)`;
        if (step === 's6') text = `📺 CONSOLE FEED: Final Output Result = ${finalValue}`;

        setSimulationLogs(prev => [...prev, `[TRACE] ${text}`]);
        await new Promise(r => setTimeout(r, 600));
      }
    }
    else if (challenge.id === 'count-down-rocket') {
      setSimulationLogs(prev => [...prev, `>>> Preparing launch booster ignition...`]);

      const initialTrace = ['s1', 's2', 's3', 's4', 's5'];
      for (const step of initialTrace) {
        setExecutingSlotId(step);
        await new Promise(r => setTimeout(r, 400));
      }

      setSimulationLogs(prev => [
        ...prev,
        `[TRACE] Loop Check (Counter > 0? -> Counter=10 -> Yes)`,
        `[TRACE] 📺 CONSOLE FEED: 10`,
        `[TRACE] 📺 CONSOLE FEED: 9`,
        `[TRACE] 📺 CONSOLE FEED: 8`,
        `[TRACE] 📺 CONSOLE FEED: 7`,
        `[TRACE] 📺 CONSOLE FEED: ... decrementing loop variables ...`,
        `[TRACE] 📺 CONSOLE FEED: 3`,
        `[TRACE] 📺 CONSOLE FEED: 2`,
        `[TRACE] 📺 CONSOLE FEED: 1`,
        `[TRACE] Loop Check (Counter > 0? -> Counter=0 -> No / Exit loop)`,
        `[TRACE] Routing to Launch Sequence...`
      ]);

      setExecutingSlotId('s6');
      await new Promise(r => setTimeout(r, 600));
      setSimulationLogs(prev => [...prev, `[TRACE] 📺 CONSOLE FEED: "IGNITION!"`]);

      setExecutingSlotId('s7');
      await new Promise(r => setTimeout(r, 500));
    }
    else if (challenge.id === 'max-of-three') {
      const { a, b, c } = simulationInputs;
      const maxVal = Math.max(a, b, c);

      setSimulationLogs(prev => [
        ...prev,
        `>>> REGISTER INPUTS: A=${a} | B=${b} | C=${c}`,
        `>>> Tracing nested tree elements...`
      ]);

      const stepsSequence = ['s1', 's2', 's3'];
      if (a >= b && a >= c) {
        stepsSequence.push('s4');
      } else {
        stepsSequence.push('s5');
        if (b >= c) {
          stepsSequence.push('s6');
        } else {
          stepsSequence.push('s7');
        }
      }
      stepsSequence.push('s8');

      for (const step of stepsSequence) {
        setExecutingSlotId(step);
        const activeBlockId = placedBlocks[step];
        const activeBlock = allAvailableBlocks.find(b => b.id === activeBlockId);
        
        let text = `Running Block: [${activeBlock?.label || 'Empty'}]`;
        if (step === 's2') text += ` (Captured inputs A, B, C)`;
        if (step === 's3') text += ` (Evaluating: is A(${a}) >= B(${b}) and C(${c})? -> ${a >= b && a >= c ? 'YES (A is max)' : 'NO'})`;
        if (step === 's5') text += ` (Evaluating: is B(${b}) >= C(${c})? -> ${b >= c ? 'YES' : 'NO'})`;
        if (step === 's4') text = `📺 CONSOLE FEED: "A is Max" (Value = ${a})`;
        if (step === 's6') text = `📺 CONSOLE FEED: "B is Max" (Value = ${b})`;
        if (step === 's7') text = `📺 CONSOLE FEED: "C is Max" (Value = ${c})`;

        setSimulationLogs(prev => [...prev, `[TRACE] ${text}`]);
        await new Promise(r => setTimeout(r, 600));
      }
    }

    setExecutingSlotId(null);
    setIsSimulating(false);

    // Persist completed challenge and reward credits
    if (!completedList.includes(challenge.id)) {
      const updated = [...completedList, challenge.id];
      setCompletedList(updated);
      try {
        localStorage.setItem('flowchart_completed_challenges', JSON.stringify(updated));
      } catch {}

      // Trigger reward credits
      onRewardCredits(challenge.creditsReward);
      setEarnedReward(challenge.creditsReward);
      setShowRewardNotification(true);
    }

    setSimulationLogs(prev => [...prev, "", "🏆 SIMULATION STATUS: SECURE. CHALLENGE COMPLETED SUCCESSFULLY!"]);
  };

  // Check if a block is placed in any slot
  const isBlockPlaced = (blockId: string) => {
    return Object.values(placedBlocks).includes(blockId);
  };

  // Filtered challenges based on status tab
  const filteredChallenges = FLOWCHART_CHALLENGES.filter(c => {
    const isCompleted = completedList.includes(c.id);
    if (activeCategory === 'solved') return isCompleted;
    if (activeCategory === 'unsolved') return !isCompleted;
    return true;
  });

  return (
    <div className="h-screen overflow-hidden bg-[#07080d] text-slate-100 flex flex-col font-sans relative selection:bg-[#00f2ff]/30 selection:text-white" data-theme={activeTheme?.value}>
      
      {/* Decorative Matrix Scan Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent animate-pulse pointer-events-none" />

      {/* Reward Alert Drawer */}
      <AnimatePresence>
        {showRewardNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-emerald-950 to-slate-900 border-2 border-emerald-500 rounded-3xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center gap-4 max-w-sm w-full"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/30">
              <Coins className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white font-black text-sm uppercase tracking-tight">Schematic Solved!</h4>
              <p className="text-xs text-slate-400">Awarded <span className="font-bold text-emerald-400">+{earnedReward}</span> cyber credits.</p>
            </div>
            <div className="flex flex-col gap-1 items-stretch shrink-0">
              {activeChallengeIdx < FLOWCHART_CHALLENGES.length - 1 ? (
                <button 
                  onClick={() => {
                    setShowRewardNotification(false);
                    setActiveChallengeIdx(prev => prev + 1);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-mono font-black uppercase tracking-wider rounded-lg px-3 py-1.5 transition-all cursor-pointer flex items-center justify-center gap-0.5"
                >
                  NEXT <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : null}
              <button 
                onClick={() => setShowRewardNotification(false)}
                className="text-slate-500 hover:text-white text-[9px] cursor-pointer uppercase font-mono tracking-widest px-2 py-1 text-center"
              >
                CLOSED
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Panel */}
      <header className="border-b border-slate-900 bg-[#090b11] px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={onBackToMain}>
            <div className="w-8 h-8 bg-[var(--accent,rgb(245,158,11))] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <Zap className="text-black w-5 h-5" />
            </div>
            <span className="text-sm font-black text-white italic tracking-tighter uppercase glow-text">
              Back to <span className="text-[var(--accent,rgb(245,158,11))] opacity-70">Landing page</span>
            </span>
          </div>
          
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-ping" />
            <h1 className="text-sm font-black text-white tracking-widest uppercase font-mono">
              {themeDetails.title}
            </h1>
          </div>
        </div>

        {/* Level Controls & Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-900">
            <Layers className="w-3.5 h-3.5 text-cyber-pink" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">FLOW LAB PROTOCOL</span>
          </div>

          <div className="flex items-center gap-1.5 bg-cyber-cyan/10 border border-cyber-cyan/30 px-3 py-1.5 rounded-lg">
            <Coins className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span className="text-xs font-black font-mono text-[var(--primary)]">{currentCredits}</span>
            <span className="text-[8px] font-mono text-[var(--primary)]/60 uppercase tracking-widest">CREDITS</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Side: Challenge Listing / Objective Selector */}
        <aside className="w-full md:w-80 border-r border-slate-900 bg-[#0c0e15] p-5 flex flex-col gap-4 overflow-hidden shrink-0">
          <div>
            <h2 className="text-white font-black text-[13px] uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink" />
              {themeDetails.badge}
            </h2>
            <p className="text-[11px] text-slate-400 leading-normal">
              Instead of writing raw code, map the logic pathways! Arrange the logical operations in the proper order to guide compiler routines successfully.
            </p>
          </div>

          {/* Filtering Tab Pills */}
          <div className="grid grid-cols-3 gap-1 bg-[#12141d] p-1 rounded-xl border border-slate-900 shrink-0">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`text-[9.5px] py-1.5 font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer
                ${activeCategory === 'all' ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30' : 'text-slate-500 hover:text-slate-300 border border-transparent'}`}
            >
              ALL
            </button>
            <button 
              onClick={() => setActiveCategory('unsolved')}
              className={`text-[9.5px] py-1.5 font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer
                ${activeCategory === 'unsolved' ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30' : 'text-slate-500 hover:text-slate-300 border border-transparent'}`}
            >
              UNSOLVED
            </button>
            <button 
              onClick={() => setActiveCategory('solved')}
              className={`text-[9.5px] py-1.5 font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer
                ${activeCategory === 'solved' ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30' : 'text-slate-500 hover:text-slate-300 border border-transparent'}`}
            >
              SOLVED
            </button>
          </div>

          {/* Scrollable Challenge List */}
          <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {filteredChallenges.map((item) => {
              const globalIdx = FLOWCHART_CHALLENGES.findIndex(x => x.id === item.id);
              const isSelected = challenge.id === item.id;
              const isCompleted = completedList.includes(item.id);

              let statusColor = 'text-slate-500 border-slate-800 bg-slate-900/30';
              if (isCompleted) {
                statusColor = 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5';
              } else if (isSelected) {
                statusColor = 'text-[#00f2ff] border-[#00f2ff]/20 bg-[#00f2ff]/5';
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    const idx = FLOWCHART_CHALLENGES.findIndex(x => x.id === item.id);
                    setActiveChallengeIdx(idx);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 cursor-pointer shrink-0
                    ${isSelected 
                      ? 'bg-gradient-to-r from-[#00f2ff]/5 to-transparent border-[#00f2ff]/40 shadow-[0_0_15px_rgba(0,242,255,0.05)]' 
                      : 'border-slate-900 bg-transparent hover:bg-slate-900/30 hover:border-slate-800'}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] font-mono text-slate-500 select-none">CODECHAMP_0{globalIdx + 1}</span>
                    <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-1.5 py-0.5 rounded border ${statusColor}`}>
                      {isCompleted ? 'COMPLETE' : item.difficulty}
                    </span>
                  </div>

                  <h3 className={`text-xs font-black uppercase tracking-tight leading-snug truncate ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-slate-500 leading-normal truncate block">
                    {item.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick instructions Panel */}
          <div className="mt-auto border-t border-slate-900 pt-4 bg-black/20 p-3 rounded-xl border border-slate-900/50">
            <h4 className="text-[10px] text-[#00f2ff] font-mono font-black uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              LAB PROTOCOLS
            </h4>
            <ul className="text-[10px] text-slate-400 leading-relaxed space-y-1.5 text-left list-none pl-0">
              <li className="flex gap-1 items-start">
                <span className="text-[#00f2ff] font-bold">1.</span>
                <span>Click a card in the **Block Bank** palette.</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-[#00f2ff] font-bold">2.</span>
                <span>Click any empty **Workspace Slot** to deploy it.</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-[#00f2ff] font-bold">3.</span>
                <span>Click placed cards to purge them back to palette.</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-[#00f2ff] font-bold">4.</span>
                <span>Compile Schematic to execute neural flow checks.</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Central Workspace Canvas Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#090a10]">
          
          {/* Active Challenge Header Card */}
          <div className="px-5 py-2.5 bg-[#0a0c14] border-b border-slate-900 text-left">
            <h2 className="text-emerald-400 font-black text-sm uppercase tracking-tight flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-mono font-bold">
                +{challenge.creditsReward} CREDITS
              </span>
              {challenge.title}
            </h2>
            <p className="text-[#00f2ff] font-bold text-sm mt-0.5 leading-snug">
              {challenge.description}
            </p>
          </div>

          <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
            
            {/* Visual Grid Canvas (Drag Slates) */}
            <div className="flex-1 p-4 overflow-y-auto relative flex flex-col items-center justify-start gap-2.5 min-h-[500px]">
              
               {/* Floating Layout Assist Banner */}
              <div className="w-full max-w-[800px] shrink-0 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-300 font-mono backdrop-blur-sm shadow-md">
                <span className="flex items-center gap-2 text-left">
                  <span className="w-2 h-2 rounded-full bg-[#00f2ff] shrink-0 animate-pulse" />
                  <span className="text-[11px]">💡 <span className="text-[#00f2ff] font-bold">PRO-TIP:</span> You can **drag and reposition** any slot node to clean up the layout or connections!</span>
                </span>
                <button
                  onClick={() => setSlotOffsets({})}
                  disabled={Object.keys(slotOffsets).length === 0}
                  className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:hover:border-slate-800 hover:bg-slate-800 text-[#00f2ff] text-[10px] font-bold uppercase tracking-wider rounded-md px-2 py-1 transition-all cursor-pointer disabled:cursor-not-allowed ml-3 whitespace-nowrap"
                >
                  Reset Layout
                </button>
              </div>

              {/* Symmetrical Workshop Workspace Row: Column of cards on left, flowchart on right */}
              <div className="flex flex-col lg:flex-row gap-6 items-start justify-center w-full max-w-[1160px] shrink-0 font-mono">
                
                {/* Left Column: Translation Code Cards */}
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 text-left">
                  {/* Pseudocode Card */}
                  <div className="bg-[#0b0c15]/90 border border-slate-800 rounded-2xl p-4 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#00f2ff]/80" />
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00f2ff] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-pulse" />
                        Pseudocode Representation
                      </h3>
                      <button
                        onClick={() => handleCopyCode(CHALLENGE_CODES[challenge.id]?.pseudocode || '', 'pseudo')}
                        className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-[#00f2ff] transition-all cursor-pointer flex items-center gap-1 text-[9px] font-mono font-bold"
                      >
                        {copiedType === 'pseudo' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="font-mono text-xs text-slate-300 bg-black/40 p-2.5 rounded-xl border border-slate-900 overflow-y-auto max-h-[220px] whitespace-pre leading-relaxed flex flex-col">
                      {(CHALLENGE_CODES[challenge.id]?.pseudocode || '// Code format unavailable.')
                        .split('\n')
                        .map((line, idx) => {
                          const isHighlighted = getHighlightedLines(challenge.id, executingSlotId).pseudo.includes(idx);
                          return (
                            <div
                              key={idx}
                              className={`px-2 py-0.5 rounded transition-all duration-200 flex items-start select-text
                                ${isHighlighted 
                                  ? 'bg-cyan-950/70 text-[#00f2ff] font-extrabold border-l-2 border-[#00f2ff] shadow-[0_0_12px_rgba(0,242,255,0.15)] scale-[1.02] translate-x-1 pl-1.5 z-10' 
                                  : 'text-slate-400 opacity-60'
                                }`}
                            >
                              <span className="w-5 text-slate-600 select-none text-right mr-3 text-[10px] shrink-0 mt-[2px]">{idx + 1}</span>
                              <span className="break-all whitespace-pre">{line}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Python Card */}
                  <div className="bg-[#0b0c15]/90 border border-slate-800 rounded-2xl p-4 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/80" />
                     <div className="flex items-center justify-between mb-2">
                       <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                         Python 3 equivalence
                       </h3>
                       <button
                         onClick={() => handleCopyCode(CHALLENGE_CODES[challenge.id]?.python || '', 'python')}
                         className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-amber-400 transition-all cursor-pointer flex items-center gap-1 text-[9px] font-mono font-bold"
                       >
                         {copiedType === 'python' ? (
                           <>
                             <Check className="w-3.5 h-3.5 text-emerald-400" />
                             <span className="text-emerald-400">COPIED!</span>
                           </>
                         ) : (
                           <>
                             <Copy className="w-3.5 h-3.5" />
                             <span>COPY</span>
                           </>
                         )}
                       </button>
                    </div>
                    <div className="font-mono text-xs text-slate-300 bg-black/40 p-2.5 rounded-xl border border-slate-900 overflow-y-auto max-h-[220px] whitespace-pre leading-relaxed flex flex-col">
                      {(CHALLENGE_CODES[challenge.id]?.python || '# Code format unavailable.')
                        .split('\n')
                        .map((line, idx) => {
                          const isHighlighted = getHighlightedLines(challenge.id, executingSlotId).python.includes(idx);
                          return (
                            <div
                              key={idx}
                              className={`px-2 py-0.5 rounded transition-all duration-200 flex items-start select-text
                                ${isHighlighted 
                                  ? 'bg-amber-950/70 text-amber-300 font-extrabold border-l-2 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.15)] scale-[1.02] translate-x-1 pl-1.5 z-10' 
                                  : 'text-slate-400 opacity-60'
                                }`}
                            >
                              <span className="w-5 text-slate-600 select-none text-right mr-3 text-[10px] shrink-0 mt-[2px]">{idx + 1}</span>
                              <span className="break-all whitespace-pre">{line}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Flowchart Canvas & Simulator Playback Controls underneath */}
                <div className="flex-1 flex flex-col gap-4 items-center justify-start min-w-[800px]">
                  
                  {/* Symmetrical Canvas Frame that guarantees identical coordinates mapping */}
                  <div 
                    id="flowchart-canvas-container" 
                    className={`relative w-[800px] h-[550px] shrink-0 border rounded-2xl p-4 shadow-[inset_0_0_40px_rgba(0,242,255,0.02)] backdrop-blur-sm transition-all duration-300 ${
                    shakeCanvas 
                      ? 'animate-shake border-rose-500/80 ring-4 ring-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.35)] bg-[#0d070b]/90' 
                      : 'border-slate-800/80 bg-[#090b11]/80'
                  }`}
                >
                  <style>{`
                    @keyframes customShake {
                      0%, 100% { transform: translateX(0); }
                      15% { transform: translateX(-6px); }
                      30% { transform: translateX(5px); }
                      45% { transform: translateX(-4px); }
                      60% { transform: translateX(3px); }
                      75% { transform: translateX(-2px); }
                      90% { transform: translateX(1px); }
                    }
                    .animate-shake {
                      animation: customShake 0.4s ease-in-out;
                    }
                  `}</style>
                
                {/* Conduit/Connections Layer: Rendered SVG backing line paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <defs>
                    {/* Glowing neon green gradient and arrow pointer markers */}
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00f2ff" />
                      <stop offset="100%" stopColor="#ff007f" />
                    </linearGradient>
                    
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="8"
                      refX="8"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 8 3, 0 6" fill="#475569" />
                    </marker>

                    <marker
                      id="arrowhead-loop"
                      markerWidth="10"
                      markerHeight="8"
                      refX="8"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 8 3, 0 6" fill="#818cf8" />
                    </marker>
                    
                    <marker
                      id="glowing-arrowhead"
                      markerWidth="10"
                      markerHeight="8"
                      refX="8"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 8 3, 0 6" fill="#00f2ff" />
                    </marker>
                  </defs>

                  {/* SVG path connector lines calculated dynamically */}
                  {challenge.slots.map(slot => {
                    return slot.connectsTo.map(targetId => {
                      const targetSlot = challenge.slots.find(s => s.id === targetId);
                      if (!targetSlot) return null;

                      const startCoords = getSlotCoords(slot.id, slot.x, slot.y);
                      const endCoords = getSlotCoords(targetSlot.id, targetSlot.x, targetSlot.y);
                      const startX = startCoords.x;
                      const startY = startCoords.y;
                      const endX = endCoords.x;
                      const endY = endCoords.y;

                      const isExecutingConn = executingSlotId === slot.id;
                      const isLoopBack = startY > endY;

                      if (isLoopBack) {
                        // Curving loopback line to prevent overlapping downwards flow lines
                        // Draw a beautiful Indigo arc going far to the left
                        const offset = -115;
                        const cX1 = startX + offset;
                        const cY1 = startY;
                        const cX2 = endX + offset;
                        const cY2 = endY;
                        const d = `M ${startX} ${startY} C ${cX1} ${cY1}, ${cX2} ${cY2}, ${endX} ${endY}`;

                        return (
                          <g key={`${slot.id}-${targetId}`}>
                            <path 
                              d={d}
                              fill="none"
                              stroke={isExecutingConn ? "#00f2ff" : "#818cf8"} 
                              strokeWidth={isExecutingConn ? 3.5 : 2}
                              strokeDasharray={isExecutingConn ? "none" : "5 3"}
                              markerEnd={`url(#${isExecutingConn ? 'glowing-arrowhead' : 'arrowhead-loop'})`}
                              className={isExecutingConn ? "animate-pulse" : ""}
                            />
                            <text 
                              x={Math.min(startX, endX) + offset + 20} 
                              y={(startY + endY) / 2}
                              fill="#a5b4fc" 
                              fontSize="12.5" 
                              fontFamily="monospace"
                              className="text-[12.5px] font-black fill-indigo-300 select-none uppercase tracking-widest"
                            >
                              LOOP PATH
                            </text>
                          </g>
                        );
                      }

                      return (
                        <g key={`${slot.id}-${targetId}`}>
                          <line 
                            x1={startX} 
                            y1={startY} 
                            x2={endX} 
                            y2={endY} 
                            stroke={isExecutingConn ? "#00f2ff" : "#475569"} 
                            strokeWidth={isExecutingConn ? 3 : 2}
                            markerEnd={`url(#${isExecutingConn ? 'glowing-arrowhead' : 'arrowhead'})`}
                            className={isExecutingConn ? "animate-pulse" : ""}
                          />
                          {/* Render textual label for branches if exists (e.g. Yes/No branches) */}
                          {targetSlot.branchLabel && (
                            <text 
                              x={(startX + endX) / 2 + 12} 
                              y={(startY + endY) / 2 - 4}
                              fill="#00f2ff" 
                              fontSize="13.5" 
                              fontFamily="monospace"
                              className="text-[13.5px] uppercase font-extrabold tracking-widest select-none fill-cyan-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                            >
                              {targetSlot.branchLabel}
                            </text>
                          )}
                        </g>
                      );
                    });
                  })}
                </svg>

                {/* Slots absolutely positioned in same coordinate system! */}
                {challenge.slots.map((slot) => {
                  const placedBlockId = placedBlocks[slot.id];
                  const placedBlock = allAvailableBlocks.find(b => b.id === placedBlockId);
                  
                  const isExecuting = executingSlotId === slot.id;
                  const blockToPlace = allAvailableBlocks.find(b => b.id === selectedPaletteBlockId);
                  const isTypeMatching = blockToPlace && blockToPlace.type === slot.type;
                  
                  // Style shapes according to type
                  let shapeStyles = 'rounded-xl';
                  let emptyBorderStyles = 'border-2 border-dashed';
                  if (slot.type === 'start' || slot.type === 'end') {
                    shapeStyles = 'rounded-[30px]';
                    emptyBorderStyles += ' border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-400 hover:bg-emerald-500/10 text-emerald-300';
                  } else if (slot.type === 'decision') {
                    // diamond approximation
                    shapeStyles = 'rounded-2xl rotate-3';
                    emptyBorderStyles += ' border-purple-500/50 bg-purple-500/5 hover:border-purple-400 hover:bg-purple-500/10 rotate-3 text-purple-300';
                  } else if (slot.type === 'io') {
                    // parallelogram approximation
                    shapeStyles = 'skew-x-6';
                    emptyBorderStyles += ' border-amber-500/50 bg-amber-500/5 hover:border-amber-400 hover:bg-amber-500/10 skew-x-6 text-amber-300';
                  } else if (slot.type === 'process') {
                    shapeStyles = 'rounded-md';
                    emptyBorderStyles += ' border-cyan-500/50 bg-cyan-500/5 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-300';
                  }

                  const coords = getSlotCoords(slot.id, slot.x, slot.y);
                  const slotX = coords.x;
                  const slotY = coords.y;

                  const isDraggedOver = draggedOverSlotId === slot.id;

                  return (
                    <div 
                      key={slot.id}
                      onPointerDown={(e) => handlePointerDown(e, slot.id)}
                      onPointerMove={(e) => handlePointerMove(e, slot.id)}
                      onPointerUp={(e) => handlePointerUp(e, slot.id)}
                      onPointerCancel={(e) => handlePointerUp(e, slot.id)}
                      onDragOver={(e) => handleDragOver(e, slot.id)}
                      onDragLeave={(e) => handleDragLeave(e, slot.id)}
                      onDrop={(e) => handleDropOnSlot(e, slot.id)}
                      style={{
                        position: 'absolute',
                        left: `${slotX}px`,
                        top: `${slotY}px`,
                        transform: 'translate(-50%, -50%)',
                        touchAction: 'none',
                      }}
                      className="group z-20 cursor-grab active:cursor-grabbing select-none"
                    >
                      {/* Interactive Slot Container */}
                      <button
                        onClick={() => handleSlotClick(slot.id)}
                        className={`w-40 transition-all cursor-pointer flex flex-col items-center justify-center text-center relative
                          ${isExecuting ? 'ring-4 ring-[#00f2ff] shadow-[0_0_25px_rgba(0,242,255,0.6)] bg-cyan-950/80 scale-[1.03] z-30' : ''}
                          ${isDraggedOver ? 'ring-4 ring-emerald-400 border-emerald-400 bg-emerald-950/40 scale-[1.05] shadow-[0_0_20px_rgba(52,211,153,0.5)] z-40' : (isTypeMatching ? 'ring-2 ring-[#00f2ff] ring-offset-2 ring-offset-black scale-[1.03] animate-pulse bg-cyan-950/30' : '')}
                          ${verificationResult?.success === false ? 'ring-2 ring-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.35)]' : ''}
                          ${placedBlock ? 'border-none p-0 bg-transparent' : `border py-2 px-2.5 h-[58px] ${shapeStyles} ${emptyBorderStyles}`}`}
                      >
                        {placedBlock ? (
                          // Custom Designed Block inside the Slot matching the Official OCR Shapes!
                          placedBlock.type === 'start' || placedBlock.type === 'end' ? (
                            /* START/END: Pill / Capsule Shape (Terminator) */
                            <div 
                              className="w-full py-2.5 px-3 rounded-full flex flex-col justify-center items-center font-bold text-center border-2 border-emerald-400 bg-gradient-to-br from-emerald-950 to-emerald-900 text-emerald-100 shadow-xl transition-all hover:scale-[1.03] relative min-h-[58px] max-h-[64px]"
                            >
                              <span className="text-[10px] uppercase font-mono tracking-wide leading-snug font-black line-clamp-2">
                                {placedBlock.label}
                              </span>
                              <span className="text-[6.5px] uppercase tracking-widest font-mono text-slate-300 font-extrabold mt-0.5 opacity-90">
                                {placedBlock.type.toUpperCase()}
                              </span>
                              {/* Hover purge button */}
                              <span className="no-drag absolute -top-1 right-3 w-4.5 h-4.5 rounded-full bg-red-650/30 text-[9px] font-black border border-red-500 text-red-100 opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-110 shadow-lg transition-all">
                                ×
                              </span>
                            </div>
                          ) : placedBlock.type === 'decision' ? (
                            /* DECISION: Perfect Diamond / Rhombus Shape */
                            <div 
                              className="w-[155px] h-[78px] flex items-center justify-center relative hover:scale-[1.03] transition-all"
                              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                            >
                              {/* Purple Border Layer */}
                              <div 
                                className="absolute inset-0 bg-purple-400"
                                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                              />
                              {/* Inner background and horizontal content */}
                              <div 
                                className="absolute inset-[1.5px] bg-gradient-to-br from-purple-950 to-purple-900 text-purple-100 flex flex-col justify-center items-center px-4 py-1 text-center"
                                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                              >
                                <span className="text-[9px] uppercase font-mono tracking-normal leading-tight font-black max-w-[85%] line-clamp-2">
                                  {placedBlock.label}
                                </span>
                                <span className="text-[6.5px] uppercase tracking-widest font-mono text-slate-300 font-extrabold mt-0.5 opacity-90">
                                  DECISION
                                </span>
                                {/* Hover purge button on decision */}
                                <span className="no-drag absolute top-1 right-4 w-4.5 h-4.5 rounded-full bg-red-650/40 text-[9px] font-black border border-red-550 text-red-100 opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-110 shadow-lg transition-all">
                                  ×
                                </span>
                              </div>
                            </div>
                          ) : placedBlock.type === 'io' ? (
                            /* INPUT/OUTPUT: Parallelogram Shape (Skewed) */
                            <div 
                              className="w-full py-2.5 px-3 flex flex-col justify-center items-center font-bold text-center border-2 border-amber-400 bg-gradient-to-br from-amber-950 to-amber-900 text-amber-100 shadow-xl transition-all hover:scale-[1.03] relative transform -skew-x-12 rounded-sm min-h-[58px] max-h-[64px]"
                            >
                              {/* Text content skewed BACK so it stays perfectly readable and horizontal */}
                              <div className="transform skew-x-12 flex flex-col items-center justify-center">
                                <span className="text-[10px] uppercase font-mono tracking-wide leading-snug font-black line-clamp-2">
                                  {placedBlock.label}
                                </span>
                                <span className="text-[6.5px] uppercase tracking-widest font-mono text-slate-300 font-extrabold mt-0.5 opacity-90">
                                  INPUT / OUTPUT
                                </span>
                              </div>
                              {/* Hover purge button */}
                              <span className="no-drag absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-650/30 text-[9px] font-black border border-red-550 text-red-100 opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-110 shadow-lg transition-all transform skew-x-12">
                                ×
                              </span>
                            </div>
                          ) : (
                            /* PROCESS: Sharp Rectangle Shape */
                            <div 
                              className="w-full py-2.5 px-2.5 rounded-sm flex flex-col justify-center items-center font-bold text-center border-2 border-[#00f2ff] bg-gradient-to-br from-[#0c315e] to-slate-900 text-white shadow-xl transition-all hover:scale-[1.03] relative min-h-[58px] max-h-[64px]"
                            >
                              <span className="text-[10px] uppercase font-mono tracking-wide leading-snug font-black line-clamp-2">
                                {placedBlock.label}
                              </span>
                              <span className="text-[6.5px] uppercase tracking-widest font-mono text-slate-300 font-extrabold mt-0.5 opacity-90">
                                PROCESS
                              </span>
                              {/* Hover purge button */}
                              <span className="no-drag absolute -top-1 -right-1.5 w-4.5 h-4.5 rounded-full bg-red-650/30 text-[9px] font-black border border-red-550 text-red-100 opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-110 shadow-lg transition-all">
                                ×
                              </span>
                            </div>
                          )
                        ) : (
                          // Unfilled empty Slot outline helper
                          <div className={slot.type === 'io' ? 'transform -skew-x-6' : ''}>
                            <span className={`text-[9.5px] font-mono font-black tracking-widest uppercase transition-colors
                              ${isTypeMatching ? 'text-cyan-300 animate-pulse' : 'text-slate-400/90'}`}>
                              {slot.type.toUpperCase()} SLOT
                            </span>
                            <span className="text-[12.5px] uppercase tracking-tight text-white font-extrabold font-mono mt-1 px-1 group-hover:text-cyan-200 transition-colors block">
                              {slot.label}
                            </span>
                            {isTypeMatching ? (
                              <span className="text-[9px] font-extrabold text-[#00f2ff] bg-[#00f2ff]/20 px-3 py-1 rounded-full mt-2 animate-bounce border border-[#00f2ff]/40 shadow-lg font-mono inline-block">
                                PLACE BLOCK
                              </span>
                            ) : selectedPaletteBlockId ? (
                              <span className="text-[8px] text-slate-400 font-bold font-mono mt-2 block">
                                Requires {slot.type} block
                              </span>
                            ) : (
                              <span className="text-[8px] text-slate-500 font-bold font-mono mt-2 uppercase tracking-wide opacity-80 block">
                                Click or Drag to place
                              </span>
                            )}
                          </div>
                        )}
                      </button>

                      {/* Labels for diamond decisions split branch lines */}
                      {slot.branchLabel && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1">
                          <span className="font-mono text-[7px] font-bold text-slate-500 bg-black/60 px-1 rounded uppercase">
                            {slot.branchLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Interactive Dynamic Compiler Failure HUD Warning overlay */}
                <AnimatePresence>
                  {showErrorOverlay && verificationResult?.success === false && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/50 backdrop-blur-sm rounded-3xl">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-md bg-[#0e0408]/98 border-2 border-rose-500 rounded-2xl p-5 shadow-[0_0_60px_rgba(244,63,94,0.45)] text-left flex flex-col gap-3 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 animate-pulse" />
                        
                        {/* Top status line */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-rose-950/40">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                            <span className="text-rose-400 font-extrabold font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                              ⚠️ compiler fault detected
                            </span>
                          </div>
                          <button
                            onClick={() => setShowErrorOverlay(false)}
                            className="text-[9px] uppercase font-mono font-black text-slate-400 hover:text-white px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-900 hover:border-slate-850 cursor-pointer transition-all"
                          >
                            Dismiss [ESC]
                          </button>
                        </div>

                        {/* Diagnostic list containing parsed compilation failures */}
                        <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-1">
                          {verificationResult.logs.filter(log => log.includes('❌') || log.includes('ERROR')).map((err, i) => (
                            <div key={i} className="flex gap-2.5 items-start text-[11px] font-mono leading-relaxed">
                              <span className="text-rose-500 font-bold shrink-0">▶</span>
                              <span className="text-rose-100 font-bold">
                                {err.replace('❌ ERROR:', '').replace('❌', '').trim()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Helper hint recommendation block */}
                        <div className="bg-rose-950/20 border border-rose-900/40 p-3 rounded-xl flex items-start gap-2.5">
                          <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-black text-rose-300 font-mono uppercase tracking-widest leading-none">Debug Recommendation:</span>
                            <p className="text-[10px] text-slate-300 leading-normal font-mono">
                              Refer to the sidebar logs for full system traceback. Double-check your starting Terminator, processing sequence, decision nodes, and exit terminal bounds.
                            </p>
                          </div>
                        </div>
                        
                        {/* Action trigger footer bar */}
                        <div className="flex justify-end gap-2 mt-1.5 pt-2 border-t border-rose-950/30">
                          <button
                            onClick={() => setShowErrorOverlay(false)}
                            className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white font-extrabold font-mono text-[9px] uppercase tracking-widest rounded-lg border border-rose-500/50 hover:border-rose-400 cursor-pointer transition-all active:scale-[0.98]"
                          >
                            Close Overlay
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Horizontal Interactive Simulator Control Card placed under the Canvas of size exactly w-[800px] */}
              {simulationSteps.length > 0 && (
                <div className="w-[800px] bg-[#0a0b14]/95 border border-slate-850 shadow-lg text-left flex flex-row items-center justify-between gap-4 p-3 rounded-2xl relative overflow-hidden transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f2ff] via-indigo-500 to-[#ff007f]" />
                  
                  {/* Left Side: Step Indicator */}
                  <div className="flex flex-col gap-0.5 shrink-0 min-w-[120px]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00f2ff] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-pulse" />
                      Flow Execution
                    </span>
                    <span className="text-[9px] font-mono font-extrabold text-slate-400">
                      STEP {currentStepIndex + 1} / {simulationSteps.length}
                    </span>
                  </div>

                  {/* Middle: Debugger Terminal Logs (One-Liner / Compact inline block) */}
                  <div className="flex-1 min-w-0 bg-[#06080d] px-3 py-1.5 rounded-xl border border-slate-950 flex flex-row items-center justify-between min-h-[46px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] gap-3">
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <div className="text-[7.5px] uppercase tracking-widest text-[#00f2ff]/50 font-black mb-0.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#00f2ff]/60" />
                        Trace Output
                      </div>
                      {currentStepIndex >= 0 ? (
                        <div className="text-slate-300 font-bold font-mono text-[10.5px] truncate">
                          {simulationSteps[currentStepIndex]?.log}
                        </div>
                      ) : (
                        <div className="text-slate-500 italic font-mono text-[9px]">No node active. Play to trace.</div>
                      )}
                    </div>
                    {currentStepIndex === simulationSteps.length - 1 && (
                      <div className="shrink-0 flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 rounded-lg animate-fade-in">
                        <span className="text-[8px] font-black text-emerald-400 tracking-wider">VERIFIED!</span>
                        <button
                          onClick={() => {
                            setCurrentStepIndex(0);
                            setIsAutoPlay(true);
                          }}
                          className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 hover:text-white font-mono text-[7px] font-bold uppercase cursor-pointer transition-all active:scale-[0.98]"
                          title="Re-run Simulation"
                        >
                          Run Again
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right side: Controls and Playback speed */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Playback speed slider on left of buttons */}
                    <div className="flex flex-col gap-1 bg-[#05060b] px-2 py-1.5 rounded-xl border border-slate-900/40 w-[110px]">
                      <div className="flex justify-between items-center text-[7.5px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-none">
                        <span>Speed</span>
                        <span className="text-[#00f2ff] font-bold">{autoPlaySpeed}ms</span>
                      </div>
                      <input
                        type="range"
                        min="200"
                        max="2000"
                        step="50"
                        value={autoPlaySpeed}
                        onChange={e => setAutoPlaySpeed(Number(e.target.value))}
                        className="w-full accent-[#00f2ff] h-1 bg-slate-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Button Center */}
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-slate-900/60 shadow-inner">
                      {/* Reset */}
                      <button
                        onClick={() => {
                          setIsAutoPlay(false);
                          setCurrentStepIndex(0);
                        }}
                        className="w-7 h-7 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-rose-400 cursor-pointer flex items-center justify-center transition-all shadow-sm"
                        title="Restart Simulation"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>

                      {/* Step Backward */}
                      <button
                        onClick={() => {
                          setIsAutoPlay(false);
                          setCurrentStepIndex(prev => Math.max(0, prev - 1));
                        }}
                        disabled={currentStepIndex <= 0}
                        className="w-7 h-7 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-[#00f2ff] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
                        title="Previous Step"
                      >
                        <SkipBack className="w-3 h-3" />
                      </button>

                      {/* Play / Pause */}
                      <button
                        onClick={() => {
                          setIsAutoPlay(prev => !prev);
                        }}
                        className={`w-10 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-all border shadow-[0_0_15px_rgba(0,242,255,0.05)]
                          ${isAutoPlay 
                            ? 'bg-rose-950/40 border-rose-500/50 hover:bg-rose-950/60 text-rose-400' 
                            : 'bg-cyan-950/40 border-[#00f2ff]/50 hover:bg-cyan-950/60 text-[#00f2ff]'
                          }`}
                        title={isAutoPlay ? 'Pause' : 'Auto Play'}
                      >
                        {isAutoPlay ? <Pause className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3 ml-0.5" />}
                      </button>

                      {/* Step Forward */}
                      <button
                        onClick={() => {
                          setIsAutoPlay(false);
                          setCurrentStepIndex(prev => Math.min(simulationSteps.length - 1, prev + 1));
                        }}
                        disabled={currentStepIndex >= simulationSteps.length - 1}
                        className="w-7 h-7 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-[#00f2ff] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
                        title="Next Step"
                      >
                        <SkipForward className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              </div>
            </div>
          </div>

            {/* Right Panel: Block BANK and Active Output logs terminal */}
            <aside className="w-full xl:w-96 border-t xl:border-t-0 xl:border-l border-slate-900 bg-[#07090e] p-3 flex flex-col gap-2.5 overflow-y-auto shrink-0 text-left">
              
              {/* Highly Pronounced Block Bank Container Card */}
              <div className="p-3 rounded-xl bg-gradient-to-b from-[#0d1322] to-[#05070e] border-2 border-cyan-500/35 shadow-[0_0_30px_rgba(0,242,255,0.12)] flex flex-col gap-2">
                {/* Block Bank Title Block */}
                <div>
                  <h3 className="text-white font-extrabold text-[11px] uppercase tracking-wider mb-0.5 font-mono flex items-center justify-between">
                    <span className="text-cyan-400 flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      DEPLOYABLE BLOCK BANK
                    </span>
                    <span className="text-[8px] text-[#00f2ff] font-extrabold leading-none bg-[#00f2ff]/10 px-1.5 py-0.5 rounded border border-[#00f2ff]/20">
                      BANK: ONLINE
                    </span>
                  </h3>
                  <p className="text-[9.5px] text-slate-300 leading-relaxed font-medium">
                    Select a core logic block below, then choose an empty matching slot on the flowchart schematic to connect it.
                  </p>
                </div>

                {/* Blocks Palette List Area */}
                <div className="grid grid-cols-2 gap-2 mt-0.5">
                  {allAvailableBlocks.map((block) => {
                    const placed = isBlockPlaced(block.id);
                    const isSelected = selectedPaletteBlockId === block.id;

                    // Sophisticated visual separation for different node states
                    let borderClass = 'border-slate-800 bg-slate-950/60 text-slate-200 hover:scale-[1.03] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]';
                    
                    if (placed) {
                      borderClass = 'border-slate-900/50 bg-slate-900/10 text-slate-500 opacity-40 cursor-not-allowed scale-95';
                    } else if (isSelected) {
                      borderClass = 'border-[#00f2ff] ring-2 ring-cyan-500 ring-offset-1 ring-offset-slate-950 bg-cyan-950/80 shadow-[0_0_20px_rgba(0,242,255,0.5)] scale-[1.05] text-white z-10';
                    } else {
                      // Color theme depending on type
                      if (block.type === 'start' || block.type === 'end') {
                        borderClass = 'border-emerald-500/40 bg-emerald-950/15 hover:bg-emerald-950/30 hover:border-emerald-400 text-emerald-300';
                      } else if (block.type === 'decision') {
                        borderClass = 'border-purple-500/40 bg-purple-950/15 hover:bg-purple-950/30 hover:border-purple-400 text-purple-300';
                      } else if (block.type === 'io') {
                        borderClass = 'border-amber-500/40 bg-amber-950/15 hover:bg-amber-950/30 hover:border-amber-400 text-amber-300';
                      } else {
                        borderClass = 'border-cyan-500/40 bg-cyan-950/15 hover:bg-cyan-950/30 hover:border-cyan-400 text-cyan-300';
                      }
                    }

                    let typeColor = 'text-cyan-400';
                    if (block.type === 'start' || block.type === 'end') typeColor = 'text-emerald-400';
                    if (block.type === 'decision') typeColor = 'text-purple-400';
                    if (block.type === 'io') typeColor = 'text-amber-400';

                    return (
                      <button
                        key={block.id}
                        draggable={!placed && !isSimulating}
                        onDragStart={(e) => handleDragStart(e, block.id)}
                        onClick={() => !placed && handlePaletteBlockClick(block.id)}
                        disabled={placed || isSimulating}
                        className={`p-2 rounded-lg border text-left transition-all flex flex-col relative min-h-[54px] justify-between
                          ${placed || isSimulating ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing select-none'}
                          ${borderClass}`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-[7px] font-mono font-black uppercase tracking-widest ${typeColor}`}>
                            {block.type}
                          </span>
                          
                          {placed && (
                            <span className="text-[7px] font-mono text-emerald-400 uppercase font-black flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> wired
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-mono font-black uppercase tracking-tight leading-tight mt-0.5 text-white line-clamp-2">
                          {block.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control Deck Action Buttons */}
              <div className="flex flex-col gap-1.5 border-t border-slate-900 pt-3">
                <div className="flex gap-2">
                  <button
                    onClick={checkSchematicAndExecute}
                    disabled={isSimulating}
                    className="flex-1 py-2 px-3 rounded-lg font-black font-mono text-[11px] uppercase tracking-wider transition-all bg-[#00f2ff] text-black hover:brightness-125 hover:shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>COMPILE SCHEMATIC</span>
                  </button>

                  <button
                    onClick={resetChallenge}
                    disabled={isSimulating}
                    className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-all cursor-pointer hover:bg-slate-800 animate-none"
                    title="Reset Circuit Node"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct quick action to proceed to the next flowchart task once solved */}
                {(completedList.includes(challenge.id) || (verificationResult?.success && !isSimulating)) && activeChallengeIdx < FLOWCHART_CHALLENGES.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setActiveChallengeIdx((prev) => prev + 1)}
                    className="w-full py-2.5 px-3 rounded-lg font-black font-mono text-[10px] uppercase tracking-wider transition-all bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer flex items-center justify-center gap-1 border border-emerald-500/20 active:scale-95"
                  >
                    <span>NEXT CHALLENGE TASK</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                )}

                {/* Randomized input config tool */}
                {!isLoopChallenge(challenge.id) && (
                  <div className="p-2 bg-[#0a0c13] border border-slate-950 rounded-lg flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[8px] text-slate-500 uppercase font-black">CHIP INBOUND REGISTERS:</span>
                    <div className="flex gap-1.5 font-mono text-[9px]">
                      <span className="text-amber-500">A={simulationInputs.a}</span>
                      <span className="text-amber-500">B={simulationInputs.b}</span>
                      <span className="text-amber-500">C={simulationInputs.c}</span>
                    </div>
                    <button 
                      onClick={randomizeInputs} 
                      disabled={isSimulating}
                      className="text-[8px] font-bold text-[#00f2ff] hover:brightness-125 cursor-pointer font-mono"
                    >
                      RAND
                    </button>
                  </div>
                )}
              </div>

              {/* Diagnostics Simulation Terminal Logs */}
              <div className={`flex-1 flex flex-col min-h-[105px] border rounded-lg bg-black/50 overflow-hidden font-mono mt-1.5 transition-all duration-300
                ${verificationResult?.success === false 
                  ? 'border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.15)] bg-rose-950/5' 
                  : 'border-slate-900 bg-black/50'}`}
              >
                <div className={`px-3 py-1.5 flex justify-between items-center shrink-0 border-b transition-colors duration-300
                  ${verificationResult?.success === false 
                    ? 'bg-[#1a0a0f] border-rose-950/40' 
                    : 'bg-[#0b0d15] border-slate-900'}`}
                >
                  <span className={`text-[9px] font-bold tracking-widest uppercase transition-colors
                    ${verificationResult?.success === false ? 'text-rose-400 font-extrabold' : 'text-slate-400'}`}
                  >
                    {verificationResult?.success === false ? '⚠️ SCHEMATIC FAULT DETECTED' : 'SCHEMATIC DIAGNOSTICS CONSOLE'}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${verificationResult?.success === false ? 'bg-rose-500' : 'bg-[#00f2ff] animate-pulse'}`} />
                </div>
                
                <div className="flex-1 p-3 overflow-y-auto text-[9.5px] space-y-1.5 text-[#00f2ff] opacity-85 leading-relaxed selection:bg-[#00f2ff]/20">
                  {simulationLogs.length === 0 ? (
                    <span className="text-slate-600 block italic">Deploy blocks onto correct slots and compile schematic to trigger live code analysis.</span>
                  ) : (
                    simulationLogs.map((log, idx) => {
                      let color = 'text-[#00f2ff]';
                      if (log.startsWith('❌')) color = 'text-red-400 font-bold';
                      if (log.startsWith('✓') || log.includes('SUCCESSFULLY')) color = 'text-emerald-400 font-bold';
                      if (log.startsWith('📺')) color = 'text-yellow-400 font-black tracking-normal';
                      if (log.startsWith('[TRACE]')) color = 'text-slate-400';

                      return (
                        <div key={idx} className={color}>
                          {log}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </aside>

          </div>
        </main>

      </div>
    </div>
  );
}

// Utility to check if a challenge contains loop parameters
function isLoopChallenge(challengeId: string): boolean {
  return ['count-to-hundred', 'count-odd-only', 'count-down-rocket', 'factorial-calc', 'sum-natural-numbers'].includes(challengeId);
}
