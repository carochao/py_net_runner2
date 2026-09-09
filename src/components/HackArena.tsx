import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  ChevronRight, 
  ChevronDown,
  Play, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCcw, 
  Code2, 
  Award, 
  Coins, 
  Sliders, 
  ArrowLeft,
  Settings,
  HelpCircle,
  Undo2,
  Bug,
  Eye,
  EyeOff,
  Info,
  Zap
} from 'lucide-react';

import resendeGif from '../assets/images/resendegif.gif';

interface HackArenaProps {
  onBackToMain: () => void;
  onRewardCredits: (credits: number) => void;
  currentCredits: number;
  userInterest?: string;
  activeTheme?: { id: string; name: string; value: string };
}

type AgeTier = 'gcse' | 'alevel';

interface ChallengeTask {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ageTier: AgeTier;
  targetBudget: number;
  creditsReward: number;
  description: string;
  buggyCode: string;
  expectedOutputRegex: RegExp[];
  runSim?: boolean; // Whether to trigger the graphical canvas trace!
  solutionHint: string;
}

const CH_HELLO_TYPO: ChallengeTask = {
  id: 'hello-typo',
  title: 'Capital print() Command',
  subtitle: 'Correct the capitalization of Python commands',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 150,
  description: `Welcome! Python is extremely picky about uppercase and lowercase letters (we call this being "case-sensitive").

Python knows exactly how to print text using a lowercase 'print(...)', but if you write 'Print(...)' with a capital P, it gets confused and refuses to run!

Fix the print command below by changing 'Print' to lowercase 'print'.`,
  buggyCode: `# Python is case-sensitive!
# Fix the capitalized command below:


Print("Hello, Cyber Explorer!")`,
  expectedOutputRegex: [
    /print\s*\(\s*["']Hello,\s*Cyber\s*Explorer!["']\s*\)/
  ],
  solutionHint: `Simply change the word 'Print' to 'print' (all lower case). Remember: standard Python commands are almost always written in lowercase characters!`
};

const CH_MISSING_QUOTE: ChallengeTask = {
  id: 'missing-quote',
  title: 'Unclosed Text String',
  subtitle: 'Find the missing closing quotation mark',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 150,
  description: `In programming, continuous text is called a "string". Every string must begin and end with matching quotation marks (they are like matching bookends holding your text safe).

The code below starts with a quote mark, but completely forgot to close it before printing! This makes Python throw a SyntaxError.

Close the quote mark around the word "Access Granted" to solve the level!`,
  buggyCode: `# Close your quotation marks!


message = "Access Granted
print(message)`,
  expectedOutputRegex: [
    /message\s*=\s*["']Access\s+Granted["']/i
  ],
  solutionHint: `Match the quotes: you need a closing double quote (") right after the word 'Granted' so it looks like: message = "Access Granted"`
};

const CH_INDENT_LEVEL: ChallengeTask = {
  id: 'indent-level',
  title: 'Indentation Align Warning',
  subtitle: 'Add a space tab to align conditional command blocks',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 200,
  description: `In Python, we use spacing (indentation) to show that a line of code belongs inside a statement, like an 'if' check. Usually, we use either 4 spaces or a Tab key press!

Our script has an active core alert block. But the 'print' command is sitting completely on the far left edge of the page instead of tucked inside the block! This causes an IndentationError.

Add 4 spaces at the start of the print command below to indent it properly.`,
  buggyCode: `alert_active = True
if alert_active:
# Fix indentation below! Press the Space bar 4 times or press the TAB key once:


print("ALERT: Core heat warning!")`,
  expectedOutputRegex: [
    /^\s+print\(\s*["']ALERT:\s*Core\s*heat\s*warning!["']\s*\)/m
  ],
  solutionHint: `Add exactly 4 spaces (or press the spacebar 4 times) right in front of 'print("ALERT...' on the last line so it aligns nicely inside the if block.`
};

const CH_MISSING_COLON: ChallengeTask = {
  id: 'missing-colon',
  title: 'The Forgotten Colon',
  subtitle: 'Complete the syntax declaration of a loop structure',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 200,
  description: `Whenever you write a control header in Python (like 'for', 'while', 'if', or 'def'), you must signal the end of that header line with a colon sign (:). This tells Python: "Prepare for indented instructions!"

Our network ping loop repeats 3 times, but it is missing that critical colon.

Add a colon (:) to the end of the 'for' line below to complete it!`,
  buggyCode: `# This loop repeats 3 times, but it is missing a colon!


for i in range(3)
    print("Sending ping sync...")`,
  expectedOutputRegex: [
    /for\s+i\s+in\s+range\(\s*3\s*\)\s*:/i
  ],
  solutionHint: `Locate line 2: 'for i in range(3)' and add a colon ':' right at the end to make it 'for i in range(3):'`
};

const CH_SPIRAL: ChallengeTask = {
  id: 'spiral-maze',
  title: 'The Spiral Maze Pathing',
  subtitle: 'Correct syntax errors to navigate the grid backup node',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 300,
  description: `Your mechanical crawler needs to reach the main server block. The path code written below has a syntax bug (no parentheses on 'left') and a physical structure bug where code isn't indented inside the command sequence.

Fix the code so:
1. 'left' is called appropriately as 'left()'
2. All commands inside 'def run_crawler():' are properly indented with spaces.`,
  buggyCode: `def run_crawler():
# All commands below must be indented!


forward(2)
left
forward(2)
left()
forward(1)`,
  expectedOutputRegex: [
    /forward\(2\)/i,
    /left\(\)/i,
    /forward\(2\)/i,
    /left\(\)/i,
    /forward\(1\)/i
  ],
  runSim: true,
  solutionHint: `In Python, functions must be called with parentheses, e.g., left() instead of left. Also, make sure all lines under the function are indented by adding 4 spaces at the beginning of each command, aligning them perfectly like steps of a ladder.`
};

const CH_REACTOR: ChallengeTask = {
  id: 'reactor-coolant',
  title: 'Core Regulator Valve Bug',
  subtitle: 'Diagnose the dangerous comparison vs assignment operator issue',
  difficulty: 'Medium',
  ageTier: 'gcse',
  targetBudget: 4,
  creditsReward: 400,
  description: `The auxiliary core regulator is overheating! The previous technician wrote a cooling check loop, but it keeps failing with a crash. 

Look carefully at the check: 'if temperature = critical_limit:'.
In programming, we use '=' to assign/store a value, but to ASK if two things are EQUAL, we must use a different comparison operator entirely. 

Fix the operator so the check evaluates correctly!`,
  buggyCode: `# Reactor Temperature Check Sequence
temperature = 100
critical_limit = 80

# FIX THE COMPARISON OPERATOR BELOW (should compare, not assign!)


if temperature = critical_limit:
    activate_coolant()
    print("Matrix flooding engaged!")
else:
    print("Reactor states operational.")`,
  expectedOutputRegex: [
    /if temperature\s*==\s*critical_limit:/i
  ],
  solutionHint: `Remember: a single equal sign (=) is used to assign values to variables like boxes. Double equal signs (==) are used like a scale to ask Python if both sides are equal. Use == inside the if statement.`
};

const CH_VAR_TYPO: ChallengeTask = {
  id: 'var-typo',
  title: 'Mismatched Variable Box',
  subtitle: 'Fix a misspelled variable identifier to restore connection',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 300,
  description: `Variables are named boxes where we store useful data value packets. If you name a box 'super_secret_code', you must refer to it using that EXACT same spelling later!

Our system declares 'super_secret_code', but when printing, it misspelled it as 'super_secret_cod' (missing the 'e'). 

Find and fix this spelling error below so the variables match!`,
  buggyCode: `super_secret_code = "TX-892"

# BUG: Spot the subtle typo in the variable name below!


print("System Key matched: " + super_secret_cod)`,
  expectedOutputRegex: [
    /super_secret_code\s*=\s*/,
    /print\s*\(.*super_secret_code.*\)/
  ],
  solutionHint: `Check the final line: replace 'super_secret_cod' with 'super_secret_code' so it matches the spelling of line 1.`
};

const CH_BUFFER: ChallengeTask = {
  id: 'buffer-leak',
  title: 'Index Out of Range Anomaly',
  subtitle: 'Track down off-by-one errors in array loops',
  difficulty: 'Hard',
  ageTier: 'alevel',
  targetBudget: 4,
  creditsReward: 500,
  description: `The memory mapping matrix array stores sector addresses. The system loader is crashing midway. 

In Python, sequences are 0-indexed, meaning the first element is at [0]. If a list has 3 items, the maximum index is 2. The loop runs 'range(0, 4)', which executes indices [0, 1, 2, 3]. Accessing index [3] on a 3-element list leaks invalid frames!

Fix the loop bounds so it scans only valid index coordinates.`,
  buggyCode: `# Diagnostic Sector Identifiers
sectors = ["Central Core", "Auxiliary Buffer", "Coolant Tank"]

# BUG: range(0, 4) tries to access sectors[3] which is Out of Range!
# Fix range bounds to inspect only index 0, 1, and 2


for index in range(0, 4):
    diagnostic = sectors[index]
    print("Inspecting: " + diagnostic)`,
  expectedOutputRegex: [
    /range\(\s*0\s*,\s*3\s*\)/i
  ],
  solutionHint: `The list "sectors" contains exactly 3 elements. Under Python's zero-based indexing system, the valid indices represent the set [0, 1, 2]. Limit the range upper bound inside the loop declaration by substituting range(0, 4) with range(0, 3) or len(sectors).`
};

const CH_SPELLING_BUG: ChallengeTask = {
  id: 'spelling-bug',
  title: 'Variable Label Typo',
  subtitle: 'Fix misspelled variable pointers in plain console printout',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 150,
  description: `In programming, variables are like custom labels on mailboxes. If the label says 'user_name' with a low line (underscore), Python won't find it if we look for the name 'username' without that low line!

Find the spelling error below where we try to print the user name, and fix it to match 'user_name'.`,
  buggyCode: `user_name = "Alex"

# BUG: Spelling mistake! Fix "username" to match user_name


print("Welcome, " + username)`,
  expectedOutputRegex: [
    /print\s*\(\s*["']Welcome,\s*["']\s*\+\s*user_name\s*\)/i
  ],
  solutionHint: `Inspect lines 1 and 4: Replace 'username' on line 4 with 'user_name' so that they match exactly.`
};

const CH_PLUS_SIGN_MISSING: ChallengeTask = {
  id: 'plus-missing',
  title: 'String Glue Helper',
  subtitle: 'Join separate text pieces together',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 150,
  description: `When printing multiple items together in Python, like some plain text and a number variable, you cannot just stand them next to each other. You must separate or connect them! 

Usually, we glue them together using a plus sign (+) or a separating comma (,). 

Add a connecting plus sign '+' between the text string "Scanning sector " and the variable sector_id below!`,
  buggyCode: `sector_id = 7

# BUG: Missing joining operator! Add a '+' between text and sector_id on the print statement:


print("Scanning sector " sector_id)`,
  expectedOutputRegex: [
    /print\s*\(\s*["']Scanning\s+sector\s*["']\s*\+\s*sector_id\s*\)/i
  ],
  solutionHint: `Change the print statement to join the two values cleanly: print("Scanning sector " + sector_id)`
};

const CH_INFINITE_LOOP: ChallengeTask = {
  id: 'infinite-loop',
  title: 'Infinite Loop Lockout',
  subtitle: 'Break of terminal execution loop',
  difficulty: 'Medium',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 250,
  description: `Loops are amazing, but they must know when to stop! Our count starts at 5, and we want to repeat while count is greater than 0. But because we never count down, count stays 5 forever. The computer is locked in an infinite cycle!

Add a line of code inside the 'while' block to subtract 1 from count at each step so our counter can reach 0 and stop safely.`,
  buggyCode: `count = 5
while count > 0:
    print("Decrypting mainframe tick...")
    # BUG: count is always 5!
    # Write code to decrease count by 1 at each loop pass:


    `,
  expectedOutputRegex: [
    /(count\s*=\s*count\s*-\s*1|count\s*-=\s*1)/i
  ],
  solutionHint: `Add the line "    count = count - 1" (or count -= 1) indented inside the block beneath print to decrement your loop counter.`
};

const CH_INPUT_INT_CAST: ChallengeTask = {
  id: 'input-int-cast',
  title: 'Data Type Calculator Match',
  subtitle: 'Convert letters and numbers into mathematically sound types',
  difficulty: 'Medium',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 250,
  description: `When people enter numbers into program prompts, Python reads them as strings (letters), not math numbers. If you try to add a string ("14") and a real number (1), Python throws a TypeError crash because they are different types!

We must convert (cast) the string 'user_age' into a math-ready integer using 'int(user_age)'. 

Fix the calculation below to cast 'user_age' before adding 1!`,
  buggyCode: `# user_age starts as a text string "14"
user_age = "14"

# BUG: You can't do addition math on text characters!
# Wrap user_age inside int() below to convert it first:


next_year = user_age + 1
print(next_year)`,
  expectedOutputRegex: [
    /next_year\s*=\s*int\(\s*user_age\s*\)\s*\+\s*1/i
  ],
  solutionHint: `Edit line 5 to say: next_year = int(user_age) + 1`
};

const CH_FUNCTION_RETURN: ChallengeTask = {
  id: 'function-return',
  title: 'The Missing Shipment',
  subtitle: 'Ensure functions return their calculated metrics',
  difficulty: 'Hard',
  ageTier: 'alevel',
  targetBudget: 5,
  creditsReward: 350,
  description: `Functions are like little calculation factories. If they don't use the keyword 'return', they keep the calculated answer completely hidden inside themselves and hand back nothing (None)!

Our 'calc_power' calculates code output but forgets to return it.

Add a return line inside the function so it ships the 'output' back to the total.`,
  buggyCode: `def calc_power(reactor_num):
    output = reactor_num * 120
    # BUG: Calculated output, but forgot to return the result!
    # Add a return line here:


    
total = calc_power(3)
print("Reactor Power output is: " + str(total))`,
  expectedOutputRegex: [
    /^\s*return\s+output/m
  ],
  solutionHint: `Add "    return output" (indented nicely inside the function) to pass the output value back to whoever called the function.`
};

const CH_LIST_APPEND: ChallengeTask = {
  id: 'list-append',
  title: 'Array Expansion Protocol',
  subtitle: 'Correct the command used to push items into list structures',
  difficulty: 'Hard',
  ageTier: 'alevel',
  targetBudget: 5,
  creditsReward: 350,
  description: `To append a single item to a Python list string array, developers sometimes mistakenly try to use '.add()'. But standard Python lists use '.append()' to put things inside!

Correct the code below to append 'Proxy-9' into our list of bypass nodes properly.`,
  buggyCode: `bypass_nodes = ["Proxy-1", "Proxy-2"]

# BUG: Python lists don't have an '.add' method!
# Change .add to .append below:


bypass_nodes.add("Proxy-9")
print(bypass_nodes)`,
  expectedOutputRegex: [
    /bypass_nodes\.append\(\s*["']Proxy-9["']\s*\)/i
  ],
  solutionHint: `Replace 'bypass_nodes.add(' with 'bypass_nodes.append(' on line 4.`
};

const CH_BOOL_CAPITAL: ChallengeTask = {
  id: 'bool-capital',
  title: 'Capital Boolean Values',
  subtitle: 'Correct the capitalization of True and False Booleans',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 150,
  description: `In Python, logical values (Booleans) are extremely case-sensitive and must ALWAYS start with a capital letter! 

This means you must use 'True' or 'False'. If you write lowercase 'true' or 'false', Python treats them as variable names it doesn't know and crashes.

Correct the lowercase boolean value 'true' below by capitalizing it to 'True'.`,
  buggyCode: `# Python Booleans must be capitalized!
# Fix the lowercase boolean value below:


system_online = true

if system_online:
    print("Mainframe Sync Online!")`,
  expectedOutputRegex: [
    /system_online\s*=\s*True/
  ],
  solutionHint: `Simply change the lowercase word 'true' on line 4 to capitalized 'True'.`
};

const CH_LOGIC_OPERATORS: ChallengeTask = {
  id: 'logic-operators',
  title: 'Lowercase Logical Operators',
  subtitle: 'Correct invalid uppercase logical AND/OR keyword syntax',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 150,
  description: `In Python, logical operators like AND and OR are lowercase words: 'and' and 'or'. 

If you write them in uppercase 'AND' or 'OR', Python's compiler won't recognize them and will trigger a SyntaxError! 

Fix the uppercase 'AND' operator below by changing it to lowercase 'and'.`,
  buggyCode: `# Python logical operators must be lowercase!
# Fix the uppercase logical operator below:


is_hacker = True
has_access_pass = True

if is_hacker AND has_access_pass:
    print("Port Override Granted!")`,
  expectedOutputRegex: [
    /if\s+is_hacker\s+and\s+has_access_pass\s*:/i
  ],
  solutionHint: `Find the word 'AND' on line 8 and replace it with its lowercase counterpart 'and'.`
};

const CH_COMBINED_GATES: ChallengeTask = {
  id: 'combined-gates',
  title: 'Logical Matrix Override',
  subtitle: 'Deploy combined Boolean capitals and lowercase logic',
  difficulty: 'Easy',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 200,
  description: `Time to combine your knowledge! This cyber gate has multiple syntax issues blocking our compiler thread:

1. Boolean values like true/false must be capitalized: 'True' or 'False'.
2. Logical operator gates like AND/OR must be lowercase: 'and' or 'or'.

Fix both lowercase boolean values ('true' to 'True') and the uppercase operator ('AND' to 'and') below to clear the level!`,
  buggyCode: `# Fix all Boolean and Operator syntax bugs below!
# Remember: Booleans are capitalized, Operators are lowercase.


cell_alpha = true
cell_beta = true

if cell_alpha AND cell_beta:
    print("Combined Matrix Override Engaged!")`,
  expectedOutputRegex: [
    /cell_alpha\s*=\s*True/,
    /cell_beta\s*=\s*True/,
    /if\s+cell_alpha\s+and\s+cell_beta\s*:/
  ],
  solutionHint: `You need to make 3 changes: change 'true' to 'True' for cell_alpha, 'true' to 'True' for cell_beta, and 'AND' to lowercase 'and' in the if statement.`
};

const CH_MODULO_EVEN: ChallengeTask = {
  id: 'even-odd-modulo',
  title: 'Parity Override Gate',
  subtitle: 'Swap standard division with the remainder modulo operator',
  difficulty: 'Medium',
  ageTier: 'gcse',
  targetBudget: 4,
  creditsReward: 300,
  description: `The security system routes even packets to Slot A, but the check is misconfigured. In Python, check conditions using '/' perform float division (e.g. 10 / 2 results in 5.0). 

To check if a number is even, you want to inspect the remainder of dividing by 2. This is done with the modulo (%) operator, which yields the remainder of a division. For example, 10 % 2 is 0.

Find the bug on line 5 and replace the division operator '/' with the modulo operator '%' to fix the check!`,
  buggyCode: `# Packet transmission parity validator
packet_id = 458

# BUG: Using float division / instead of modulo remainder %:


if packet_id / 2 == 0:
    print("Even Sequence: Routing to Slot A")
else:
    print("Odd Sequence: Routing to Slot B")`,
  expectedOutputRegex: [
    /packet_id\s*%\s*2\s*==\s*0/i
  ],
  solutionHint: `Find line 5: replace 'packet_id / 2' with 'packet_id % 2' to perform modulo remainder checks.`
};

const CH_STRING_LITERAL_QUOTE: ChallengeTask = {
  id: 'string-literal-quote',
  title: 'The Ghost Identifier',
  subtitle: 'Wrap literal words in quotation characters to prevent NameError flags',
  difficulty: 'Medium',
  ageTier: 'gcse',
  targetBudget: 5,
  creditsReward: 250,
  description: `The logic compares the system's active_protocol status with the literal word OFFLINE. In Python, words without quotes are treated as variable names (identifiers). Since there is no variable named OFFLINE, Python throws a NameError!

Wrap the target term OFFLINE in double quotes so Python recognizes it as a plain string text value!`,
  buggyCode: `# Connection state supervisor
active_protocol = "OFFLINE"

# BUG: Comparing active_protocol to an unquoted variable name OFFLINE!
# Convert OFFLINE into a proper text string "OFFLINE":


if active_protocol == OFFLINE:
    print("Warning: Firewall is inactive!")`,
  expectedOutputRegex: [
    /if\s+active_protocol\s*==\s*["']OFFLINE["']/i
  ],
  solutionHint: `Replace OFFLINE with "OFFLINE" inside the comparison on line 5 so it is evaluated as a string literal.`
};

const CH_LIST_MEMBERSHIP: ChallengeTask = {
  id: 'list-membership',
  title: 'Intruder Registry Check',
  subtitle: 'Use modern in operator keyword for sequence verification',
  difficulty: 'Medium',
  ageTier: 'gcse',
  targetBudget: 4,
  creditsReward: 300,
  description: `The developer is trying to check if the 'visitor' string is one of the administrative nodes listed in the 'white_list'. 

However, they used '==' which asks if a single word is EXACTLY equal to the entire list of words. This is always False!

Change the comparison operator '==' to the Python 'in' membership operator to verify elements inside a collection correctly.`,
  buggyCode: `# Database authorized registry checks
white_list = ["admin_node", "backup_vault", "core_relay"]
visitor = "backup_vault"

# BUG: Broken equality operator. Check if visitor is inside white_list using 'in':


if visitor == white_list:
    print("Authorization Code Cleared!")`,
  expectedOutputRegex: [
    /if\s+visitor\s+in\s+white_list\s*:/i
  ],
  solutionHint: `On line 5, replace 'visitor == white_list' with 'visitor in white_list' to perform a containment lookup.`
};

const CH_OOP_SELF: ChallengeTask = {
  id: 'oop-self-param',
  title: 'Missing OOP Self Reference',
  subtitle: 'Correct the method parameter in object-oriented structures',
  difficulty: 'Hard',
  ageTier: 'alevel',
  targetBudget: 5,
  creditsReward: 400,
  description: `In Python Object-Oriented Programming (OOP), every instance method defined inside a class must accept a reference to the active object instance as its very first parameter. By convention, this parameter is named 'self'.

If you omit 'self' from the function definition, calling 'instance.reboot()' triggers a TypeError because Python automatically passes the instance under the hood, but the function isn't expecting it!

Add 'self' inside the parameters of the 'reboot' method on line 5 so the system can boot successfully!`,
  buggyCode: `class MainframeNode:
    def __init__(self, name):
        self.name = name

    # BUG: Method reboot() is missing the self parameter!
    def reboot():
        print(self.name + " reboot sequence triggered!")

node = MainframeNode("Sec-Alpha")
node.reboot()`,
  expectedOutputRegex: [
    /def\s+reboot\(\s*self\s*\)\s*:/
  ],
  solutionHint: `In a Python class, instance methods must have 'self' as their first argument. Change 'def reboot():' to 'def reboot(self):' to restore self access.`
};

const CH_GLOBAL_SCOPE: ChallengeTask = {
  id: 'global-scope-lock',
  title: 'Variable Scope Isolation',
  subtitle: 'Declare global overrides inside isolated function namespaces',
  difficulty: 'Hard',
  ageTier: 'alevel',
  targetBudget: 5,
  creditsReward: 400,
  description: `In Python, you can read global variables inside a function, but if you try to assign or modify a global variable directly, Python treats it as a brand-new local variable. If you try to modify it before initializing it locally, it throws an UnboundLocalError!

To tell Python that we want to modify the actual global variable, we must explicitly declare it with the 'global' keyword at the start of the function.

Add the line 'global firewall_status' at the top of the function to allow status updates!`,
  buggyCode: `firewall_status = "SECURE"

def disable_firewall():
    # BUG: Attempting to write to a global variable!
    # Declare 'global firewall_status' here first:
    
    
    firewall_status = "OVERRIDDEN"
    print("Firewall bypassed!")

disable_firewall()
print("System is now: " + firewall_status)`,
  expectedOutputRegex: [
    /^\s*global\s+firewall_status/m
  ],
  solutionHint: `Add '    global firewall_status' inside the function body (properly indented with 4 spaces) before modifying the variable, so Python knows to modify the global state.`
};

const CH_INFINITE_RECURSION: ChallengeTask = {
  id: 'infinite-recursion',
  title: 'Recursive Base Case Defect',
  subtitle: 'Incorporate terminal conditions to prevent system stack overflow',
  difficulty: 'Hard',
  ageTier: 'alevel',
  targetBudget: 5,
  creditsReward: 450,
  description: `Recursion is a programming technique where a function calls itself. To prevent calling itself forever (which leads to a RecursionError/Stack Overflow), every recursive function must have a "base case": a simple condition where it returns a value directly without calling itself again.

Our factorial power calculator is missing its base case check (when n is 0 or 1, it should just return 1). Without it, the calculation plunges into negative numbers and crashes the stack!

Write the missing base case check 'if n <= 1: return 1' at the start of the function.`,
  buggyCode: `def calc_factorial(n):
    # BUG: Missing recursive base case! 
    # If n <= 1, we should immediately return 1:
    
    
    return n * calc_factorial(n - 1)

result = calc_factorial(5)
print("Factorial outcome: " + str(result))`,
  expectedOutputRegex: [
    /if\s+n\s*(<=\s*1|==\s*1)\s*:\s*(return\s+1|\n\s+return\s+1)/i
  ],
  solutionHint: `Write '    if n <= 1:\n        return 1' (fully indented) at the start of the function, so that the recursion stops when n reaches 1.`
};

const CH_DICT_KEY_SAFE: ChallengeTask = {
  id: 'dictionary-key-safe',
  title: 'Key Lookup Vulnerability',
  subtitle: 'Utilize safe dictionary lookups to avoid KeyError runtime crashes',
  difficulty: 'Hard',
  ageTier: 'alevel',
  targetBudget: 5,
  creditsReward: 350,
  description: `In Python, dictionaries map keys to values. If you try to fetch a key that does not exist using bracket notation (e.g. 'vault_data["clearance_level"]'), Python crashes instantly with a KeyError!

A much safer method is to use the '.get(key, default)' function, which returns a default value (like "STANDARD" or None) if the key is missing, instead of crashing the program.

Replace the bracket lookup with a safe '.get("clearance_level", "STANDARD")' lookup!`,
  buggyCode: `vault_data = {
    "node_id": "X-101",
    "status": "ACTIVE"
}

# BUG: clearance_level is not in the dictionary! Bracket lookup crashes with KeyError.
# Replace vault_data["clearance_level"] with vault_data.get("clearance_level", "STANDARD")


user_clearance = vault_data["clearance_level"]
print("Clearance level is: " + user_clearance)`,
  expectedOutputRegex: [
    /vault_data\.get\(\s*["']clearance_level["']\s*,\s*["']STANDARD["']\s*\)/i
  ],
  solutionHint: `On line 8, change the direct lookup 'vault_data["clearance_level"]' to 'vault_data.get("clearance_level", "STANDARD")' to safely handle missing values.`
};

const ALL_CHALLENGES: ChallengeTask[] = [
  CH_HELLO_TYPO,
  CH_MISSING_QUOTE,
  CH_INDENT_LEVEL,
  CH_MISSING_COLON,
  CH_SPELLING_BUG,
  CH_PLUS_SIGN_MISSING,
  CH_BOOL_CAPITAL,
  CH_LOGIC_OPERATORS,
  CH_COMBINED_GATES,
  CH_SPIRAL,
  CH_REACTOR,
  CH_INFINITE_LOOP,
  CH_INPUT_INT_CAST,
  CH_VAR_TYPO,
  CH_MODULO_EVEN,
  CH_STRING_LITERAL_QUOTE,
  CH_LIST_MEMBERSHIP,
  CH_BUFFER,
  CH_FUNCTION_RETURN,
  CH_LIST_APPEND,
  CH_OOP_SELF,
  CH_GLOBAL_SCOPE,
  CH_INFINITE_RECURSION,
  CH_DICT_KEY_SAFE
];

interface CelebrationParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  dur: number;
  size: number;
  rotate: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  translateX: number;
}

const playSuccessSound = (volume: number = 0.3) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.connect(ctx.destination);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.connect(filter);

    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc1.connect(gainNode);
    
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12);
    osc2.connect(gainNode);

    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24);
    osc3.connect(gainNode);

    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(volume, ctx.currentTime + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime + 0.12);
    osc3.start(ctx.currentTime + 0.24);

    osc1.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
    osc3.stop(ctx.currentTime + 0.6);
  } catch (err) {
    console.warn("Audio Context init failed:", err);
  }
};

const highlightPython = (code: string) => {
  const lines = code.split('\n');
  return lines.map((line, lineIdx) => {
    if (!line.length) {
      return <div key={lineIdx} className="h-6 select-none shadow-none text-transparent"> </div>;
    }

    const segments: React.ReactNode[] = [];
    
    // Split on first occurrence of '#' unless it's within a quote string
    // Let's do a reliable first-pass check to safely extract the comment block
    let codePart = line;
    let commentPart = '';
    
    // Find '#' that is NOT inside quotes.
    let insideDouble = false;
    let insideSingle = false;
    let hashIdx = -1;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && !insideSingle) {
        insideDouble = !insideDouble;
      } else if (char === "'" && !insideDouble) {
        insideSingle = !insideSingle;
      } else if (char === '#' && !insideDouble && !insideSingle) {
        hashIdx = i;
        break;
      }
    }
    
    if (hashIdx !== -1) {
      codePart = line.substring(0, hashIdx);
      commentPart = line.substring(hashIdx);
    }
    
    if (codePart) {
      // Find strings, keywords, built-ins, and numbers
      const regex = /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|\b(if|elif|else|for|in|while|def|return|True|False|and|or|not|is|import|as)\b|\b(print|range|len|forward|left|right|activate_coolant|append|add|correct_nodes)\b|\b(\d+)\b/g;
      
      let lastIndex = 0;
      let match;
      let pieceId = 0;
      
      while ((match = regex.exec(codePart)) !== null) {
        // Normal text before match
        if (match.index > lastIndex) {
          segments.push(
            <span key={`txt-${lineIdx}-${pieceId++}`} className="text-slate-300 font-mono">
              {codePart.substring(lastIndex, match.index)}
            </span>
          );
        }
        
        const [full, str, kw, fn, num] = match;
        if (str) {
          segments.push(
            <span key={`str-${lineIdx}-${pieceId++}`} className="text-[#f9e2af] font-mono">
              {str}
            </span>
          );
        } else if (kw) {
          segments.push(
            <span key={`kw-${lineIdx}-${pieceId++}`} className="text-[#cba6f7] font-mono">
              {kw}
            </span>
          );
        } else if (fn) {
          segments.push(
            <span key={`fn-${lineIdx}-${pieceId++}`} className="text-[#89b4fa] font-mono">
              {fn}
            </span>
          );
        } else if (num) {
          segments.push(
            <span key={`num-${lineIdx}-${pieceId++}`} className="text-[#f38ba8] font-mono">
              {num}
            </span>
          );
        }
        
        lastIndex = regex.lastIndex;
      }
      
      // Leftover normal text
      if (lastIndex < codePart.length) {
        segments.push(
          <span key={`txt-${lineIdx}-${pieceId++}`} className="text-slate-300 font-mono">
            {codePart.substring(lastIndex)}
          </span>
        );
      }
    }
    
    // Add comment back in beautiful pale green
    if (commentPart) {
      segments.push(
        <span key={`comment-${lineIdx}`} className="text-[#a6e3a1] font-mono opacity-90 drop-shadow-[0_0_1px_rgba(166,227,161,0.15)]">
          {commentPart}
        </span>
      );
    }
    
    return (
      <div key={lineIdx} className="leading-6 min-h-[1.5rem] font-mono whitespace-pre flex items-center">
        {segments}
      </div>
    );
  });
};

export default function HackArena({ onBackToMain, onRewardCredits, currentCredits, userInterest, activeTheme }: HackArenaProps) {
  // Theme titles & badges
  const getThemeDetails = () => {
    const rawInterest = (userInterest || activeTheme?.value || '').toLowerCase().trim();
    if (rawInterest.includes('simpson')) {
      return {
        title: "SPRINGFIELD DUFF_NET",
        subtitle: "Apu's Registry Control & Nuclear Power grid debugger",
        iconColor: "text-amber-400",
        accentBorder: "border-amber-400/20",
        badge: "🍩 APU APPROVED"
      };
    }
    if (rawInterest.includes('marvel')) {
      return {
        title: "S.H.I.E.L.D. HELICARRIER CORE",
        subtitle: "STARK IND. HUD repair terminal",
        iconColor: "text-red-500",
        accentBorder: "border-red-500/20",
        badge: "🦸 STARK VERIFIED"
      };
    }
    if (rawInterest.includes('star wars') || rawInterest.includes('starwars')) {
      return {
        title: "DEATH STAR CONTROL DECK",
        subtitle: "Retro Jedi Console malfunction overrides",
        iconColor: "text-emerald-400",
        accentBorder: "border-emerald-400/20",
        badge: "🌌 JEDI CLEARANCE"
      };
    }
    if (rawInterest.includes('space') || rawInterest.includes('void')) {
      return {
        title: "GALACTIC APEX INTERFACE",
        subtitle: "Lunar landing telemetry error patcher",
        iconColor: "text-sky-400",
        accentBorder: "border-sky-400/20",
        badge: "🚀 VOID LINK"
      };
    }
    if (rawInterest.includes('football') || rawInterest.includes('sport')) {
      return {
        title: "VAR PITCH-SIDE PROTOCOL",
        subtitle: "Camp Nou stadium tactical line checker",
        iconColor: "text-green-400",
        accentBorder: "border-green-400/20",
        badge: "⚽ REF APPROVED"
      };
    }
    if (rawInterest.includes('music') || rawInterest.includes('beat')) {
      return {
        title: "MPC SAMPLER DECKS",
        subtitle: "Beatmaker lofi wave-loop syntax corrector",
        iconColor: "text-orange-500",
        accentBorder: "border-orange-500/20",
        badge: "🎵 BEAT SECURED"
      };
    }
    if (rawInterest.includes('fantasy') || rawInterest.includes('magic') || rawInterest.includes('mystic')) {
      return {
        title: "ARCANE PARCHMENT MIRROR",
        subtitle: "Rune scroll compiler and spell repairs",
        iconColor: "text-purple-400",
        accentBorder: "border-purple-400/20",
        badge: "🔮 SPELL BOUND"
      };
    }
    if (rawInterest.includes('roblox') || rawInterest.includes('block') || rawInterest.includes('obby')) {
      return {
        title: "STUDIO SERVER INTRUSION",
        subtitle: "Blox obby SCRIPT_BOOT corrector",
        iconColor: "text-red-500",
        accentBorder: "border-red-500/20",
        badge: "🎮 ROBLOX APEX"
      };
    }
    if (rawInterest.includes('cyberpunk') || rawInterest.includes('hack')) {
      return {
        title: "NIGHT CITY GRID PORTAL",
        subtitle: "Megabuilding safehouse subversion patcher",
        iconColor: "text-yellow-400",
        accentBorder: "border-yellow-400/20",
        badge: "💾 NETRUN LINK"
      };
    }
    if (rawInterest.includes('dc') || rawInterest.includes('bat')) {
      return {
        title: "WAYNETECH BATCH CONTROLLER",
        subtitle: "Gotham crime-net satellite uplink patches",
        iconColor: "text-blue-400",
        accentBorder: "border-blue-400/20",
        badge: "🦇 BATMAN OS"
      };
    }
    return {
      title: "HACKER INTRUSION HUB",
      subtitle: "System malfunction detection & script patches",
      iconColor: "text-cyber-cyan",
      accentBorder: "border-cyber-cyan/20",
      badge: "ONLINE SECURE"
    };
  };

  const themeDetails = getThemeDetails();

  const [selectedTier, setSelectedTier] = useState<AgeTier>('gcse');
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeTask>(CH_HELLO_TYPO);
  
  // GIF Toggle State
  const [showGif, setShowGif] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('arena_show_gif');
      return stored !== 'false';
    } catch {
      return true;
    }
  });
  
  // Sandbox State
  const [userCode, setUserCode] = useState(currentChallenge.buggyCode);
  const [creditsBudget, setCreditsBudget] = useState(currentChallenge.targetBudget);
  const [compileLogs, setCompileLogs] = useState<string[]>(['>>> HACK MATRIX INITIALIZED.', '>>> SELECT AGE TIER OR PRESS "RUN EXPLOIT" TO COMPILE.']);
  const [tutorExplanation, setTutorExplanation] = useState<string>('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [hasClaimedReward, setHasClaimedReward] = useState(false);
  const [attemptsUsed, setAttemptsUsed] = useState(0);

  // Completed challenges tracking array
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('hack_arena_completed_challenges');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Celebration States
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState<CelebrationParticle[]>([]);

  // Simulated Visual Grid State
  const [robotPos, setRobotPos] = useState({ x: 1, y: 1, dir: 'right' });
  const [robotPath, setRobotPath] = useState<{x: number, y: number}[]>([{ x: 1, y: 1 }]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSteps, setSimSteps] = useState<any[]>([]);

  // Textarea Overlay & Synced Scroll Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  // Auto-switch first challenge when selectedTier changes
  useEffect(() => {
    const filtered = ALL_CHALLENGES.filter(c => c.ageTier === selectedTier);
    if (filtered.length > 0 && !filtered.some(c => c.id === currentChallenge.id)) {
      loadChallenge(filtered[0]);
    }
  }, [selectedTier]);

  // Update sandbox when challenge changes
  const loadChallenge = (task: ChallengeTask) => {
    setCurrentChallenge(task);
    setUserCode(task.buggyCode);
    setCreditsBudget(task.targetBudget);
    setAttemptsUsed(0);
    setSuccess(null);
    setTutorExplanation('');
    setHasClaimedReward(completedChallengeIds.includes(task.id));
    setShowCelebration(false);
    setConfetti([]);
    resetSimulation();
    setCompileLogs([
      `>>> MOUNTED SECURE GRID TASK: ${task.title.toUpperCase()}`,
      `>>> BUDGET: ${task.targetBudget} LOGIC ATTACKS MAX.`,
      `>>> SECURE PAYLOAD REWARD: ${task.creditsReward} CREDITS.`
    ]);
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    let volInt = 30;
    try {
      const storedVol = localStorage.getItem('soundpack_volume');
      if (storedVol !== null) {
        volInt = parseInt(storedVol, 10);
      }
    } catch (e) {}
    playSuccessSound(volInt / 100);

    const colors = [
      '#10b981', // emerald-500
      '#06b6d4', // cyan-500
      '#f59e0b', // amber-500
      '#6366f1', // indigo-500
      '#ec4899', // pink-500
      '#a855f7', // purple-500
      '#facc15'  // yellow-400
    ];
    const shapes: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];

    const newConfetti: CelebrationParticle[] = Array.from({ length: 75 }).map((_, i) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      return {
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * -30 - 10,
        color: randomColor,
        delay: Math.random() * 0.8,
        dur: Math.random() * 2 + 2,
        size: Math.random() * 8 + 6,
        rotate: Math.random() * 360,
        shape: randomShape,
        translateX: Math.random() * 200 - 100
      };
    });
    setConfetti(newConfetti);
  };

  const resetSimulation = () => {
    setRobotPos({ x: 1, y: 1, dir: 'right' });
    setRobotPath([{ x: 1, y: 1 }]);
    setIsSimulating(false);
    setSimSteps([]);
  };

  // Run the code and evaluate both local requirements and simulated actions
  const handleCompileExploit = async () => {
    if (creditsBudget <= 0 && success !== true) {
      setCompileLogs(prev => [...prev, '❌ COMPILER SYSTEM LOCKOUT: Insufficient logical budget. Please reset to try again.']);
      return;
    }

    setAttemptsUsed(p => p + 1);
    const newBudget = creditsBudget - 1;
    setCreditsBudget(newBudget);

    const logs: string[] = [];
    logs.push(`>>> INITIALIZING INTRUSION COMPILER TACTIC #${attemptsUsed + 1}...`);
    logs.push(`>>> CHECKING SOURCE FOR ${selectedTier.toUpperCase()} SECURITY MATRICS...`);

    // Clean comments and string literals to prevent matching elements in comments
    const cleanCode = userCode
      .split('\n')
      .map(line => {
        let insideDouble = false;
        let insideSingle = false;
        let hashIdx = -1;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' && !insideSingle) {
            insideDouble = !insideDouble;
          } else if (char === "'" && !insideDouble) {
            insideSingle = !insideSingle;
          } else if (char === '#' && !insideDouble && !insideSingle) {
            hashIdx = i;
            break;
          }
        }
        if (hashIdx !== -1) {
          return line.substring(0, hashIdx);
        }
        return line;
      })
      .join('\n');

    // Basic syntax checking engine mirroring real errors with local age-centered analysis
    let hasSyntaxBugs = false;
    let customExplanation = '';

    if (currentChallenge.id === 'hello-typo') {
      if (cleanCode.includes('Print(')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: You used uppercase 'Print'! 
Python is extremely case-sensitive. It knows how to print with lower-case 'print(...)', but 'Print' with a capital P is seen as a completely different, unknown command word. 

Change 'Print' on the last line to lowercase 'print' to solve this issue!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: NameError: name 'Print' is not defined. 
In Python, builtin instructions are parsed strictly in lowercase lexer rules.`;
        }
      }
    } else if (currentChallenge.id === 'missing-quote') {
      const singleQuoteCount = (cleanCode.match(/'/g) || []).length;
      const doubleQuoteCount = (cleanCode.match(/"/g) || []).length;
      if (doubleQuoteCount % 2 !== 0 || singleQuoteCount % 2 !== 0 || !cleanCode.includes('Access Granted"')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Found a missing quote mark! 
It is like leaving one side of your treasure locker unlocked, or printing a book with only one cover! 

Change line 2 to close the text block cleanly by adding a double quote (") after Granted: message = "Access Granted"`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: SyntaxError: EOL while scanning string literal.
A string literal was started with a delimiter but no matching delimiter was discovered prior to the newline boundary.`;
        }
      }
    } else if (currentChallenge.id === 'indent-level') {
      const lines = cleanCode.split('\n');
      const printLineIndex = lines.findIndex(l => l.includes('print("ALERT'));
      if (printLineIndex !== -1 && lines[printLineIndex].startsWith('print')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Alignment misalignment! 
Your 'print' line is sitting all the way on the left margin. In Python, code inside blocks (like an 'if' action check) must be indented by exactly 4 spaces to show they belong inside that block. 

Add exactly 4 spaces (or press Tab) right in front of the 'print' keyword!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: IndentationError: expected an indented block.
Statements inside conditional compound statements require explicit semantic indentation frames (typically 4 spaces or single tab block).`;
        }
      }
    } else if (currentChallenge.id === 'missing-colon') {
      const lines = cleanCode.split('\n');
      const forLine = lines.find(l => l.includes('for i in range'));
      if (forLine && !forLine.includes(':')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Forgotten colon! 
At the end of statements starting with 'for' or 'if', we always need a colon ':' to tell Python what loop instructions are coming next.

Add a colon ':' at the very end of your 'for i in range(3)' line!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: SyntaxError: expected ':'
All compound statements starting with 'for' control flow bounds must terminate with the colon operator.`;
        }
      }
    } else if (currentChallenge.id === 'spiral-maze') {
      if (cleanCode.includes('left') && !cleanCode.includes('left(')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: You forgot to put brackets after the command word! 
Writing 'left' without brackets is like drawing a big green button but forgetting to push it! Python sees 'left' as just a stationary object. Add parentheses 'left()' to tell your crawler to actually spin.`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: Unhandled pointer resolution. 
SyntaxError: Bound-method reference. The statement on line 5 references function 'left' natively instead of invoking it under call-operator syntax. Change to left().`;
        }
      } else if (
        (cleanCode.includes('forward(') || cleanCode.includes('left(')) && 
        !cleanCode.includes('    forward') && 
        !cleanCode.includes('\tforward')
      ) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Alignment error! 
In Python, inside any function block like 'def run_crawler():', your command instructions must be neatly tucked under the line with 4 spaces (indented). Think of it like neatly arranging items inside a filing drawer so they don't block the drawer from closing! Indent your commands under the function definition.`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: Indentation alignment mismatch. 
IndentationError: expected an indented block after function definition 'run_crawler' on line 1. Python uses semantic whitespace to build lexer frames.`;
        }
      }
    } else if (currentChallenge.id === 'reactor-coolant') {
      if (/\btemperature\s*=\s*critical_limit\b/.test(cleanCode)) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Box Confusion Operator!
Single '=' is used when storing a value inside a box. But inside an 'if' query, we want to look at both scales and inspect if they are perfectly balanced! Use twin equals '==' to check if temperature is equal to critical_limit.`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: L-value assignment inside conditional check. 
SyntaxError: invalid syntax. In Python 3.x, '=' cannot operate as a conditional logical expression binder. Use comparison operator '==' to resolve boolean validation.`;
        }
      }
    } else if (currentChallenge.id === 'var-typo') {
      if (/\bsuper_secret_cod\b/.test(cleanCode)) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Name mismatch! 
Python is trying to find a treasure box named 'super_secret_cod', but your box was labeled 'super_secret_code' on line 1. Add that missing spelling letter 'e' on line 4!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: NameError: name 'super_secret_cod' is not defined. Did you spell your identifier correctly?`;
        }
      }
    } else if (currentChallenge.id === 'spelling-bug') {
      if (/\busername\b/.test(cleanCode)) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Spelling mismatch!
Your variable box on line 1 is labeled 'user_name' with an underscore, but on line 4 you tried to use 'username'. 

Change 'username' on line 4 to 'user_name' so they match!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: NameError: name 'username' is not defined. Did you spell your identifier correctly?`;
        }
      }
    } else if (currentChallenge.id === 'plus-missing') {
      if (!cleanCode.includes('+') && !cleanCode.includes(',')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Missing operator!
You can't print a text string and a variable right next to each other. You must stick or join them!

Insert a plus sign '+' between the end quote and 'sector_id' so it looks like: print("Scanning sector " + sector_id)`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: SyntaxError: invalid syntax (unconnected string and identifier).`;
        }
      }
    } else if (currentChallenge.id === 'infinite-loop') {
      if (!cleanCode.includes('count -') && !cleanCode.includes('count -=')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Infinite recurrence danger!
The loop counter 'count' stays at 5 forever because we forgot to count down!

Add a line inside the loop: count = count - 1 so it counts down each time!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: UnboundedLoopError: Execution runtime overflow. Variable count must trend monotonically downwards.`;
        }
      }
    } else if (currentChallenge.id === 'input-int-cast') {
      if (!cleanCode.includes('int(')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Type math error!
You cannot add a text string 'user_age' and a math number together directly! 

Convert 'user_age' to a matching integer: next_year = int(user_age) + 1`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: TypeError: can only concatenate str (not "int") to str.`;
        }
      }
    } else if (currentChallenge.id === 'function-return') {
      if (!cleanCode.includes('return')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: The calculated output is stuck!
Your calc_power function does the math, but doesn't hand the result back. 

Add 'return output' on a new line inside the function.`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: ReturnValueFault: Function calc_power returned implicit None instead of calculated numeric output.`;
        }
      }
    } else if (currentChallenge.id === 'list-append') {
      if (cleanCode.includes('.add(')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Unknown command '.add()'!
Python lists do not use '.add()'. Instead, they use '.append()' to add new objects.

Replace '.add' with '.append' on line 4!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: AttributeError: 'list' object has no attribute 'add'. Did you mean 'append'?`;
        }
      }
    } else if (currentChallenge.id === 'bool-capital') {
      if (cleanCode.includes('true') || cleanCode.includes('false')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Case-sensitivity alert for Boolean states!
In Python, true and false MUST start with a capital letter ('True' or 'False'). Lowercase 'true' is treated as an unknown variable name!

Change 'true' to capitalized 'True' on line 4!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: NameError: name 'true' is not defined. did you mean 'True'? Built-in Boolean states are strictly tokenized as True and False.`;
        }
      }
    } else if (currentChallenge.id === 'logic-operators') {
      if (cleanCode.includes('AND') || cleanCode.includes('OR')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Uppercase logical operator!
Python's logical operators are completely lowercase. The words 'and' and 'or' must be written in all-lowercase.

Change 'AND' to lowercase 'and' on line 8!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: SyntaxError: invalid syntax. 'AND' is recognized as a plain variable or identifier block rather than a valid conditional logical connector!`;
        }
      }
    } else if (currentChallenge.id === 'combined-gates') {
      if (cleanCode.includes('true') || cleanCode.includes('false') || cleanCode.includes('AND') || cleanCode.includes('OR')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Multiple syntax faults found!
At least one Boolean state is lowercase (e.g. 'true') or an operator is uppercase (e.g. 'AND').

1. Boolean values like true/false must be capitalized: 'True' or 'False'.
2. Logical operator gates like AND/OR must be lowercase: 'and' or 'or'.

Fix all three faults in cell_alpha, cell_beta, and the if check to unlock the gate!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: MultiSyntaxError: lower-case boolean literal binding and invalid uppercase token 'AND' logical connector.`;
        }
      }
    } else if (currentChallenge.id === 'buffer-leak') {
      if (cleanCode.includes('range(0, 4)')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Out of bounds space alert!
Your sector list only has indexing slots [0, 1, 2]. If your loop scans up to 4 elements, it tries to access index slot [3] from an empty system cupboard! Bring your scanning limit back down to range(0, 3) so it fits your real index inventory.`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: IndexError: list index out of range. 
Memory allocation violation: elements of index sequence [3] do not match list pointer density (length === 3). Bound range(0, 4) exceeds index-set {0..2}.`;
        }
      }
    } else if (currentChallenge.id === 'even-odd-modulo') {
      if (cleanCode.includes('/')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Found division operator "/" instead of modulo remainder "%"!
Remember: the "/" operator performs a normal division (which gives float types). To verify if a number is even or odd, use the '%' remainder operator to see if the outcome is 0!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: TypeError: unsupported operate values for division-check. Using floating scalar operator '/' does not resolve to an integer remainder matrix. Swap to '%' for modulo arithmetic.`;
        }
      }
    } else if (currentChallenge.id === 'string-literal-quote') {
      if (cleanCode.includes('== OFFLINE') || (cleanCode.includes('==') && /\bOFFLINE\b/.test(cleanCode) && !/["']OFFLINE["']/.test(cleanCode))) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Undefined name 'OFFLINE'!
You must wrap text words in quotation marks like "OFFLINE", otherwise Python searches for an undeclared variable named OFFLINE and crashes.`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: NameError: name 'OFFLINE' is not defined. did you mean to declare it as a literal string block? Wrap "OFFLINE" in quotations.`;
        }
      }
    } else if (currentChallenge.id === 'list-membership') {
      if (cleanCode.includes('== white_list') || cleanCode.includes('==white_list')) {
        hasSyntaxBugs = true;
        if (selectedTier === 'gcse') {
          customExplanation = `🤖 ANALOGICAL RADAR: Equality comparison mismatch!
Using '==' compares the single visitor string directly to the whole list. You must use the 'in' keyword (e.g. 'visitor in white_list') to test if it's an element in the collection!`;
        } else {
          customExplanation = `💎 TECHNICAL ERROR: LogicalExpressionError: Equality comparisons on string items vs sequence type returns unexpected boolean evaluation. Use 'in' operator to perform container search queries.`;
        }
      }
    }

    // If no explicit simulated bugs, match regex requirements
    let matchSuccess = true;
    for (const rx of currentChallenge.expectedOutputRegex) {
      if (!rx.test(userCode)) {
        matchSuccess = false;
        break;
      }
    }

    if (hasSyntaxBugs || !matchSuccess) {
      logs.push(`❌ DEPLOYMENT THREAD BLOCKED.`);
      let explanation = customExplanation;
      if (explanation) {
        logs.push(explanation);
      } else {
        explanation = `🔍 RECON ANALYSIS SUGGESTION: Ensure spelling, operators, variables, parenthesis, brackets, or structure match the task instructions perfectly!`;
        logs.push(`>>> HINT RE-ROUTE: Focus on correcting the logical patterns described in description. Review syntax rules.`);
      }
      setTutorExplanation(explanation);
      setCompileLogs(prev => [...prev, ...logs]);
      setSuccess(false);

      if (newBudget <= 0) {
        setCompileLogs(prev => [...prev, '🚨 ERROR RECOVERY FAULT: 0 logical attacks remaining. Matrix mainframe has shut down access. Use the "Reset Sandbox" button to restore connection structure.']);
      }
    } else {
      logs.push(`✅ ENVIRO-COMPILE SUCCEEDED! EXPLOIT STABILIZED.`);
      logs.push(`>>> DEPLOYING AUTOMATION PROTOCOLS...`);
      
      // Auto-grant credits immediately if not completed previously
      const alreadyCompleted = completedChallengeIds.includes(currentChallenge.id);
      if (!alreadyCompleted) {
        onRewardCredits(currentChallenge.creditsReward);
        setHasClaimedReward(true);
        logs.push(`💰 SECURE DEPOSIT SUCCESS: +${currentChallenge.creditsReward} Cyber Credits cataloged in mainframe account!`);
      } else {
        setHasClaimedReward(true);
      }

      setTutorExplanation('');
      setCompileLogs(prev => [...prev, ...logs]);
      setSuccess(true);

      // Persist completed challenge IDs
      setCompletedChallengeIds(prev => {
        if (!prev.includes(currentChallenge.id)) {
          const next = [...prev, currentChallenge.id];
          try {
            localStorage.setItem('hack_arena_completed_challenges', JSON.stringify(next));
          } catch (e) {}
          return next;
        }
        return prev;
      });

      triggerCelebration();

      // Trigger grid turtle navigation sequence for visual gratification!
      if (currentChallenge.runSim) {
        runGridVisualPath();
      }
    }
  };

  const runGridVisualPath = () => {
    setIsSimulating(true);
    let steps = [
      { x: 1, y: 1, dir: 'right' },
      { x: 3, y: 1, dir: 'right' }, // forward(2)
      { x: 3, y: 1, dir: 'down' },  // left() (since it's a grid maze we turn relative directions)
      { x: 3, y: 3, dir: 'down' },  // forward(2)
      { x: 3, y: 3, dir: 'left' },  // left()
      { x: 2, y: 3, dir: 'left' }   // forward(1)
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setRobotPos(step);
        setRobotPath(prev => [...prev, { x: step.x, y: step.y }]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 450);
  };

  const claimPayloadReward = () => {
    if (completedChallengeIds.includes(currentChallenge.id)) {
      setHasClaimedReward(true);
      return;
    }

    if (success && !hasClaimedReward) {
      onRewardCredits(currentChallenge.creditsReward);
      setHasClaimedReward(true);

      // Save completed state to tracking array
      setCompletedChallengeIds(prev => {
        if (!prev.includes(currentChallenge.id)) {
          const next = [...prev, currentChallenge.id];
          try {
            localStorage.setItem('hack_arena_completed_challenges', JSON.stringify(next));
          } catch (e) {}
          return next;
        }
        return prev;
      });

      setCompileLogs(prev => [...prev, `💰 SECURE DEPOSIT SUCCESS: +${currentChallenge.creditsReward} Cyber Credits cataloged in mainframe account!`]);
    }
  };

  const handleNextChallenge = () => {
    const tasksInTier = ALL_CHALLENGES.filter(c => c.ageTier === selectedTier);
    const currentTaskIdx = tasksInTier.findIndex(c => c.id === currentChallenge.id);
    if (currentTaskIdx !== -1 && currentTaskIdx + 1 < tasksInTier.length) {
      loadChallenge(tasksInTier[currentTaskIdx + 1]);
    } else {
      if (selectedTier === 'gcse') {
        setSelectedTier('alevel');
        const nextTasks = ALL_CHALLENGES.filter(c => c.ageTier === 'alevel');
        if (nextTasks.length > 0) {
          loadChallenge(nextTasks[0]);
        }
      } else {
        setSelectedTier('gcse');
        const nextTasks = ALL_CHALLENGES.filter(c => c.ageTier === 'gcse');
        if (nextTasks.length > 0) {
          loadChallenge(nextTasks[0]);
        }
      }
    }
  };

  // Reset current challenge state
  const resetSandbox = () => {
    setUserCode(currentChallenge.buggyCode);
    setCreditsBudget(currentChallenge.targetBudget);
    setAttemptsUsed(0);
    setSuccess(null);
    setTutorExplanation('');
    setHasClaimedReward(completedChallengeIds.includes(currentChallenge.id));
    setShowCelebration(false);
    setConfetti([]);
    resetSimulation();
    setCompileLogs([
      `>>> RELOADED SECURE GRID TASK: ${currentChallenge.title.toUpperCase()}`,
      `>>> BUDGET: ${currentChallenge.targetBudget} ATTEMPTS FULLY RESET.`,
      `>>> STANDBY...`
    ]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-[#a9b1d6] font-sans relative" data-theme={activeTheme?.value}>
      {/* Dynamic Cyber Ambient Space background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #1f2335 1px, transparent 1px), linear-gradient(to bottom, #1f2335 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
      </div>

      {/* TOP HEADER CONTROLS */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-slate-900/80 bg-black/40 backdrop-blur-md relative z-10 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={onBackToMain}>
            <div className="w-8 h-8 bg-[var(--accent,rgb(245,158,11))] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <Zap className="text-black w-5 h-5" />
            </div>
            <span className="text-sm font-black text-white italic tracking-tighter uppercase glow-text">
              Back to <span className="text-[var(--accent,rgb(245,158,11))] opacity-70">Landing page</span>
            </span>
          </div>
          <div className="h-4 w-[1px] bg-slate-850"></div>
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-[var(--primary)] animate-pulse" />
            <span className="font-mono text-xs font-black tracking-widest text-slate-400">{themeDetails.title}::CHALLENGES</span>
          </div>
        </div>

        {/* Global Level Indicator & Credits state link */}
        <div className="flex items-center gap-4">
          {/* Level Switch Toggles */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-slate-900">
            <button 
              onClick={() => setSelectedTier('gcse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${selectedTier === 'gcse' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'text-slate-500 border border-transparent hover:text-slate-300'}`}
            >
              GCSE
            </button>
            <button 
              onClick={() => setSelectedTier('alevel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${selectedTier === 'alevel' ? 'bg-indigo-500/20 text-indigo-500 border border-indigo-500/30' : 'text-slate-500 border border-transparent hover:text-slate-300'}`}
            >
              A-Level
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-cyber-cyan/10 border border-cyber-cyan/30 px-3 py-1.5 rounded-xl font-mono text-xs text-cyber-cyan">
            <Coins className="w-3.5 h-3.5" />
            <span className="font-bold">{currentCredits} CREDITS</span>
          </div>
        </div>
      </header>

      {/* CORE GRID LAYOUT */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT COLUMN: LIST OF ASSAYS & DETAILS */}
        <aside className="w-80 border-r border-[#1a1b26] bg-[#0c0e1a]/90 backdrop-blur-sm p-5 flex flex-col gap-4 overflow-hidden shrink-0">
          <div>
            <h2 className="text-white font-black text-sm uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyber-pink" />
              {themeDetails.badge}
            </h2>
            <p className="text-xs text-slate-450 leading-snug">Choose an isolated terminal sequence. Match syntax flaws to bypass firewall protocols.</p>
          </div>

          {/* INTUITIVE LEVEL SELECTOR WITH PEDAGOGICAL DETAILS */}
          <div className="bg-slate-950/80 border border-slate-850 p-3.5 rounded-xl flex flex-col gap-2.5 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
              🎓 CHOOSE EDUCATION LEVEL:
            </span>
            
            <div className="grid grid-cols-2 gap-1 bg-black/60 p-1 rounded-lg border border-slate-900">
              <button 
                onClick={() => setSelectedTier('gcse')}
                className={`py-1.5 rounded text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTier === 'gcse' 
                    ? 'bg-amber-500 text-black font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.4)]' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Ages 14-16: GCSE Level"
              >
                GCSE
              </button>
              <button 
                onClick={() => setSelectedTier('alevel')}
                className={`py-1.5 rounded text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTier === 'alevel' 
                    ? 'bg-cyber-pink text-white font-extrabold shadow-[0_0_10px_rgba(255,0,127,0.4)]' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Ages 16-18: A-Level"
              >
                A-Level
              </button>
            </div>

            <div className="text-[10.5px] leading-relaxed text-slate-400 font-medium bg-black/45 p-2.5 rounded-lg border border-slate-900">
              {selectedTier === 'gcse' && (
                <div>
                  <span className="text-amber-400 font-black block mb-0.5">🟡 GCSE LEVEL</span>
                  <p className="text-slate-400">Error diagnostics use <b>intuitive everyday analogies and practical pointers</b> to explain syntax bugs clearly with friendly debug tips.</p>
                </div>
              )}
              {selectedTier === 'alevel' && (
                <div>
                  <span className="text-cyber-pink font-black block mb-0.5">🔴 A-LEVEL LEVEL</span>
                  <p className="text-slate-400">Error diagnostics output <b>rigorous computer science terminology</b>, formal compiler traces, and detailed structural dry analyses.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pr-1">
            {ALL_CHALLENGES.filter(task => task.ageTier === selectedTier).map((task) => {
              const isSelected = currentChallenge.id === task.id;
              const isCompleted = completedChallengeIds.includes(task.id);

              let cardStyle = '';
              if (isSelected) {
                if (isCompleted) {
                  cardStyle = 'bg-black/50 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
                } else {
                  cardStyle = 'bg-black/50 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]';
                }
              } else {
                if (isCompleted) {
                  cardStyle = 'bg-[#064e3b]/10 hover:bg-[#064e3b]/20 border-emerald-500/25';
                } else {
                  cardStyle = 'bg-black/20 hover:bg-[#121627] border-slate-850';
                }
              }

              return (
                <button
                  key={task.id}
                  onClick={() => loadChallenge(task)}
                  className={`w-full p-4.5 rounded-xl border flex flex-col text-left transition-all relative overflow-hidden group cursor-pointer shrink-0 ${cardStyle}`}
                >
                  <div className="flex justify-between items-start mb-2 w-full">
                    <span className="font-mono text-[11px] bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-0.5 rounded uppercase font-bold">{task.difficulty}</span>
                    {isCompleted ? (
                      <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> STABILIZED
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] text-amber-500 flex items-center gap-1 font-bold bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">
                        <Coins className="w-2.5 h-2.5" /> +{task.creditsReward}
                      </span>
                    )}
                  </div>
                  <h3 className={`font-black tracking-tight text-sm mb-1 ${isSelected ? 'text-white' : isCompleted ? 'text-emerald-300 font-bold' : 'text-slate-300'}`}>{task.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{task.subtitle}</p>
                  
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span className="text-slate-500 font-medium">Target Range:</span>
                    <span className="text-slate-400 font-black uppercase">
                      {task.ageTier === 'gcse' ? 'GCSE (Ages 14-16)' : 'A-Level (Ages 16-18)'}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute right-2 bottom-2">
                      <div className={`w-1.5 h-1.5 rounded-full animate-ping ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-auto border-t border-slate-900 pt-3">
            <div className="bg-[#111322]/80 border border-slate-850 rounded-xl p-3.5 flex flex-col gap-1.5 shrink-0">
              <span className="text-xs text-amber-500 font-black uppercase tracking-widest flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Adaptive System
              </span>
              <p className="text-[10.5px] text-slate-400 leading-relaxed">
                Watch how the <b>AI Feedback adaptations</b> respond differently for each level when verifying code or looking at compilation warnings!
              </p>
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: ACTIVE CHALLENGE PLAYGROUND */}
        <main className="flex-1 flex flex-col bg-[#0b0c16] overflow-hidden min-w-0 relative">
          
          {/* CHALLENGE DETAILS BANNER AT THE VERY TOP */}
          <div className="p-4 border-b border-[#121424] bg-gradient-to-r from-black/45 via-transparent to-transparent flex items-center justify-between gap-2 shrink-0">
            <span className="font-mono text-xs text-slate-300 flex items-center gap-1.5 uppercase bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              <Code2 className="w-3.5 h-3.5 text-amber-500" /> CHALLENGE ACTIVE MODULE
            </span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-405">Intrusion Retries Allowed:</span>
              <span className={`font-black px-2.5 py-1 rounded-lg ${creditsBudget > 1 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}>
                {creditsBudget} TACTICAL RUNS LEFT
              </span>
            </div>
          </div>

          {/* MAIN CODING INTERACTIVE GRID */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#121424] overflow-hidden min-h-0">
            
            {/* COLUMN 1: BRIEFING & DIRECTIVE (if task 1), SIMULATION & FEEDBACK */}
            <div className="bg-[#070912] p-5 flex flex-col gap-5 overflow-y-auto">
              
              {/* THE ACTUAL TASK (CRITICAL BRIEFING) CARD */}
              <div className="bg-[#121629]/65 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl group-hover:bg-amber-400 transition-colors"></div>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded flex items-center gap-1.5">
                        <span className="animate-pulse">⚠️</span> CRITICAL TASK BRIEFING
                      </span>
                    </div>
                    <h1 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight uppercase">{currentChallenge.title}</h1>
                    <p className="text-[14px] font-bold text-slate-100 mt-3 leading-relaxed whitespace-pre-wrap border-t border-slate-800/60 pt-3">
                      {currentChallenge.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* RECON ANALYSIS HINT ACCORDION (Always available but styled cleanly) */}
              <div className="border border-slate-800/60 bg-black/35 rounded-xl p-3 shadow-inner">
                <details className="group cursor-pointer select-none">
                  <summary className="flex items-center justify-between text-xs font-black text-slate-400 hover:text-white transition-colors py-1">
                    <span className="flex items-center gap-2 font-mono">
                      🔍 NEED A RECON ANALYSIS HINT?
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2.5 p-3.5 rounded-xl bg-black/60 border border-slate-850/80 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap shadow-inner select-text">
                    {currentChallenge.solutionHint}
                  </div>
                </details>
              </div>

              {/* YOUR TASK DIRECTIVE (Shown ONLY in task one to guide new users, placed further down to declutter the GIF section) */}
              {currentChallenge.id === 'hello-typo' && (
                <div className="bg-[#10142c]/90 border border-slate-800/80 rounded-2xl p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)] relative overflow-hidden mt-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <h3 className="font-mono text-xs font-black uppercase tracking-widest text-amber-500">
                      YOUR TASK DIRECTIVE
                    </h3>
                  </div>
                  
                  <div className="space-y-3.5">
                    <p className="text-[13.5px] font-bold text-slate-100 leading-relaxed">
                      The compiler on the right contains a broken Python script. Inspect the code lines, identify the syntax error, and repair it to override the firewall.
                    </p>
                    
                    <div className="space-y-2.5 text-[12.5px] text-slate-300 font-medium pl-1 leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-amber-500 font-black shrink-0 mt-0.5">1</div>
                        <span>Locate the buggy Python script inside the <b>Virtual Compiler Interface</b> workspace on the right side.</span>
                      </div>
                      
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-amber-500 font-black shrink-0 mt-0.5">2</div>
                        <span>Identify the specific syntax failure (such as incorrect command capitalization, unclosed quotes, alignment, or spelling).</span>
                      </div>
                      
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-amber-500 font-black shrink-0 mt-0.5">3</div>
                        <span>Fix the code directly inside the text editor pane, then press the <b>Execute Intrusion Logic</b> button to build your payload.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC TOP HALF: PREVIEW GRID ONLY IF runSim IS ACTIVE */}
              {currentChallenge.runSim && (
                <div className="p-5 border border-slate-850 bg-black/30 rounded-2xl flex flex-col justify-center items-center relative min-h-[240px]">
                  <div className="w-full max-w-sm flex flex-col items-center gap-3">
                    <span className="font-mono text-xs text-[#2ac3de] uppercase tracking-widest flex items-center gap-1 font-bold">
                      <Eye className="w-3.5 h-3.5 animate-pulse" /> Apprentice Simulation Grid
                    </span>

                    {/* Cute 4x4 Grid Board with Mechanical Crawler */}
                    <div className="relative w-64 h-64 border-2 border-slate-800/80 rounded-2xl bg-black/60 p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between">
                      {/* Grid cells background */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-10">
                        {Array(16).fill(0).map((_, i) => (
                           <div key={i} className="border border-slate-500 animate-pulse"></div>
                        ))}
                      </div>

                      {/* Visual target Node (e.g., Target at 2,3) */}
                      <div className="absolute w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-500/70 text-emerald-400 flex items-center justify-center z-10 animate-pulse font-mono text-xs font-black" style={{ left: '50%', top: '75%', transform: 'translate(-50%, -50%)' }}>
                        SYS
                      </div>
                      
                      {/* Grid path lines rendered dynamically */}
                      <svg className="absolute inset-0 pointer-events-none w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#ea9a3d"
                          strokeWidth="3.5"
                          strokeDasharray="4 4"
                          points={robotPath.map(p => `${20 + p.x * 55}, ${20 + p.y * 55}`).join(' ')}
                          className="transition-all duration-500"
                        />
                      </svg>

                      {/* The Robot / Mechanical Bug Crawler */}
                      <div 
                        className="absolute w-10 h-10 flex items-center justify-center z-20 transition-all duration-300"
                        style={{ 
                          left: `${robotPos.x * 55}px`, 
                          top: `${robotPos.y * 55}px`,
                          transform: `rotate(${robotPos.dir === 'right' ? '0' : robotPos.dir === 'down' ? '90' : robotPos.dir === 'left' ? '180' : '270'}deg)`
                        }}
                      >
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(234,154,61,0.6)] relative">
                          <span className="text-black font-black text-xs">🤖</span>
                          <div className="absolute right-0 w-1 h-3.5 bg-cyan-400 rounded-r"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 font-mono text-xs text-slate-400 bg-black/40 p-2.5 rounded-lg border border-slate-900 w-full justify-between font-bold">
                      <span>Coordinates: X: {robotPos.x}, Y: {robotPos.y}</span>
                      <span>Heading: {robotPos.dir.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUCCESS REWARD BANNER */}
              {success === true && (
                <div className="p-5 border-2 border-emerald-500/20 rounded-2xl bg-emerald-500/5 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn select-none shadow-[0_0_30px_rgba(16,185,129,0.05)] border-solid">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg shadow-lg">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-emerald-450 font-extrabold text-[15px] uppercase tracking-wide flex items-center gap-1.5 font-black">
                        🎉 EXPLOIT SUCCESSFUL
                      </h4>
                      <p className="text-xs text-slate-300 font-medium mt-0.5 leading-relaxed">
                        You successfully bypassed the firewall defense and stabilized the compiler!
                      </p>
                      <span className="font-mono text-[11.5px] text-amber-400 font-bold block mt-1.5 uppercase bg-amber-500/5 px-2.5 py-0.5 rounded border border-amber-500/10 inline-block">
                        Payload Award: +{currentChallenge.creditsReward} Cyber Credits
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowCelebration(true)}
                    className="whitespace-nowrap px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center w-full md:w-auto bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white"
                  >
                    View Completed Code
                  </button>
                </div>
              )}

              {/* WARNING TUTOR EXPLANATION REPORT ON ERROR */}
              {success === false && (
                <div className="p-5 border border-red-500/20 rounded-2xl bg-red-500/5 flex flex-col gap-4 animate-fadeIn select-none shadow-[0_0_20px_rgba(239,68,68,0.05)]">
                  <div className="flex items-center justify-between border-b border-red-500/15 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                      <h4 className="text-red-400 font-black text-sm uppercase tracking-wider">
                        Intrusion Attempt Blocked
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] text-red-405 uppercase bg-red-500/10 border border-red-500/25 px-2.5 py-0.5 rounded font-black">
                      {creditsBudget} Retries Left
                    </span>
                  </div>

                  <div className="bg-black/40 border border-slate-850 p-4 rounded-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-xs font-bold text-[#ea9a3d] uppercase tracking-wider">
                        {selectedTier === 'gcse' ? '🤖 GCSE Analogical Analysis' : '💎 Formal Computer Science Diagnosis'}
                      </span>
                    </div>
                    <div className="text-[13.5px] leading-relaxed text-slate-100 whitespace-pre-wrap font-medium font-sans">
                      {tutorExplanation}
                    </div>
                  </div>

                  {creditsBudget <= 0 ? (
                    <div className="p-3 bg-red-500/15 border border-red-500/25 rounded-xl text-center text-xs text-red-300 font-bold leading-relaxed">
                      🚨 ACCESS INTRUSION LOCKOUT: 0 tactical runs remaining. MAINBOARD has blocked inputs. Click "Reset Sandbox" to restore system access and retry.
                    </div>
                  ) : (
                    <p className="text-xs text-slate-450 leading-relaxed pl-1 italic font-medium">
                      Identify and resolve the syntax issue explained above, then hit compile once more.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* COLUMN 2: EDITOR PANEL */}
            <div className="bg-[#090b14] p-5 flex flex-col gap-4 min-h-[400px] border-l border-slate-900">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" /> python_sandbox.py
                </span>
                <button
                  onClick={resetSandbox}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-all font-mono hover:bg-slate-900 px-2.5 py-1.5 rounded cursor-pointer border border-slate-850 hover:border-slate-800"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Reset Sandbox
                </button>
              </div>

              {/* SIMPLIFIED IN-APP NEON TEXTAREA EDITOR */}
              <div className="flex-1 relative flex flex-col border border-slate-850 rounded-xl overflow-hidden focus-within:border-cyan-500/40 bg-black/40 min-h-[300px]">
                <div className="w-full h-9 bg-slate-900/60 flex items-center px-4 border-b border-slate-850 text-slate-400 font-mono text-xs uppercase tracking-wider font-bold select-none shrink-0">
                  <span>VIRTUAL COMPILER INTERFACE</span>
                </div>
                
                {/* DUAL LAYER INTEGRATED EDITOR */}
                <div className="flex-1 relative overflow-hidden font-mono text-sm leading-6 min-h-[250px]">
                  {/* HIGHLIGHTED PYTHON CODE (LAYER 1 - UNDERNEATH) */}
                  <div 
                    ref={highlightRef}
                    className="absolute inset-0 p-5 pointer-events-none select-none whitespace-pre overflow-hidden leading-6 font-mono text-sm"
                    style={{ tabSize: 4 }}
                  >
                    {highlightPython(userCode)}
                  </div>
                  
                  {/* INTERACTIVE EDITABLE TEXTAREA (LAYER 2 - ON TOP) */}
                  <textarea
                    ref={textareaRef}
                    value={userCode}
                    onScroll={handleScroll}
                    onChange={(e) => {
                      setUserCode(e.target.value);
                      if (success !== null) setSuccess(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        const textarea = e.currentTarget;
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const value = textarea.value;
                        const newValue = value.substring(0, start) + '    ' + value.substring(end);
                        setUserCode(newValue);
                        // Reset cursor position to right after the inserted spaces
                        setTimeout(() => {
                          textarea.selectionStart = textarea.selectionEnd = start + 4;
                        }, 0);
                      } else if (e.key === 'Enter') {
                        e.preventDefault();
                        const textarea = e.currentTarget;
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const value = textarea.value;

                        const beforeCursor = value.substring(0, start);
                        const afterCursor = value.substring(end);
                        const linesBefore = beforeCursor.split('\n');
                        const currentLine = linesBefore[linesBefore.length - 1];

                        const indentMatch = currentLine.match(/^\s*/);
                        const currentIndent = indentMatch ? indentMatch[0] : '';

                        const lineWithoutComments = currentLine.split('#')[0].trimEnd();
                        const endsWithColon = lineWithoutComments.endsWith(':');

                        const addedIndent = endsWithColon ? '    ' : '';
                        const indentToInsert = '\n' + currentIndent + addedIndent;

                        const newValue = beforeCursor + indentToInsert + afterCursor;
                        setUserCode(newValue);

                        const newCursorPos = start + indentToInsert.length;
                        setTimeout(() => {
                          textarea.selectionStart = textarea.selectionEnd = newCursorPos;
                        }, 0);
                      }
                    }}
                    className="absolute inset-0 w-full h-full bg-transparent p-5 font-mono text-sm text-transparent caret-cyan-400 outline-none resize-none leading-6 select-text overflow-auto whitespace-pre border-0 ring-0 focus:ring-0 focus:outline-none"
                    placeholder="# Write your corrective Python code script here..."
                    style={{ tabSize: 4 }}
                  />
                </div>
              </div>

              {/* COMPILE / ACTION BUTTON GROUP */}
              <div className="flex gap-3 w-full shrink-0">
                <button
                  onClick={handleCompileExploit}
                  disabled={creditsBudget <= 0 && success !== true}
                  className={`py-4 rounded-xl font-mono text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 border cursor-pointer border-white/10 ${
                    success === true ? 'w-1/2 bg-emerald-500 text-black hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'w-full'
                  } ${
                    success !== true && creditsBudget <= 0 
                      ? 'bg-slate-900/50 text-slate-600 border-slate-900 cursor-not-allowed'
                      : success !== true 
                        ? 'bg-[#ea9a3d] hover:brightness-110 text-black font-black shadow-[0_0_20px_rgba(234,154,61,0.2)]'
                        : ''
                  }`}
                >
                  <Play className={`w-4 h-4 fill-current ${success !== true ? 'animate-pulse' : ''}`} />
                  <span>{success === true ? 'Exploit Successful' : 'Execute Intrusion Logic'}</span>
                </button>

                {success === true && (
                  <button
                    onClick={handleNextChallenge}
                    className="w-1/2 py-4 rounded-xl font-mono text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 border cursor-pointer border-cyan-500/30 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/35 hover:border-cyan-500/50 hover:text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] select-none animate-fadeIn"
                  >
                    <span>Next Trial</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* FLOATING CORRECTION GUIDE OVERLAY (Bottom-Right corner overlay) */}
          {currentChallenge.id === 'hello-typo' && (
            <div className="absolute bottom-[95px] right-6 z-40 flex flex-col items-end pointer-events-none">
              {showGif ? (
                <div className="pointer-events-auto w-[320px] bg-[#070913]/95 border border-cyan-500/40 rounded-2xl p-4 shadow-[0_10px_35px_rgba(6,182,212,0.3)] backdrop-blur-md flex flex-col gap-3 animate-fadeIn">
                  <div className="flex items-center justify-between w-full border-b border-slate-850 pb-2">
                    <span className="font-mono text-[10px] text-cyan-400 font-extrabold tracking-widest uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                      CORRECTION GUIDE
                    </span>
                    <button
                      onClick={() => {
                        setShowGif(false);
                        localStorage.setItem('arena_show_gif', 'false');
                      }}
                      className="p-1 rounded bg-[#121629] hover:bg-slate-800 text-slate-400 hover:text-white transition-all font-mono border border-slate-850 cursor-pointer"
                      title="Hide GIF Guide"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="relative w-full aspect-video bg-black/60 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/80 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <img 
                      src={resendeGif} 
                      alt="Correction Guide Tutorial" 
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono leading-normal text-center bg-black/30 p-2 rounded-lg border border-slate-900">
                    Fix the capitalized <code className="text-amber-400 font-bold bg-amber-500/10 px-1 py-0.5 rounded">Print</code> with a lowercase <code className="text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">print</code>.
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowGif(true);
                    localStorage.setItem('arena_show_gif', 'true');
                  }}
                  className="pointer-events-auto bg-cyan-500 hover:bg-cyan-400 text-black px-4.5 py-2.5 rounded-full font-mono text-xs font-black tracking-wider flex items-center gap-2 shadow-[0_4px_20px_rgba(6,182,212,0.45)] border border-cyan-400/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Show GIF Guide"
                >
                  <Eye className="w-4 h-4" />
                  <span>SHOW TUTORIAL GIF</span>
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* CELEBRATION OVERLAY */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070f]/95 overflow-hidden select-none"
          >
            {/* Floating Sparkles and Confetti particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {confetti.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ 
                    y: '-10vh', 
                    x: 0,
                    rotate: c.rotate, 
                    scale: 0.8,
                    opacity: 0.9 
                  }}
                  animate={{ 
                    y: '110vh', 
                    rotate: c.rotate + 360 * (Math.random() > 0.5 ? 2 : -2), 
                    x: Math.sin(c.id) * 50,
                    opacity: [0.9, 1, 0.7, 0]
                  }}
                  transition={{ 
                    duration: c.dur, 
                    delay: c.delay,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  style={{ 
                    position: 'absolute',
                    left: `${c.x}%`,
                    width: c.size, 
                    height: c.size, 
                    backgroundColor: c.color,
                    boxShadow: `0 0 10px ${c.color}60`,
                    clipPath: c.shape === 'triangle' 
                      ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                      : c.shape === 'star'
                        ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                        : c.shape === 'square'
                          ? 'none'
                          : 'none',
                    borderRadius: c.shape === 'circle' ? '50%' : '0px'
                  }}
                />
              ))}
            </div>

            {/* Main congratulatory badge frame */}
            <motion.div
              initial={{ scale: 0.7, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-lg p-8 rounded-3xl border border-emerald-500/30 bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center text-center relative shadow-[0_0_50px_rgba(16,185,129,0.15)] mx-4"
            >
              {/* Glow rings in the background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

              <div className="relative mb-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 0.95, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-400/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  <Award className="w-12 h-12 text-emerald-450 animate-pulse" />
                  <span className="absolute -top-1 -right-1 text-xs">✨</span>
                </motion.div>
                <div className="absolute inset-0 -m-3 border border-dashed border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
              </div>

              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-black flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> CHALLENGE RESOLVED
              </span>

              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                {currentChallenge.title}
              </h2>
              
              <p className="font-mono text-[11px] text-slate-400 tracking-wide mb-6">
                Security breach repaired successfully. Mains connection fully stabilized.
              </p>

              {/* Reward presentation badge */}
              <div className="w-full bg-[#0d0e15] border border-slate-900 rounded-2xl p-4 flex justify-between items-center mb-6 shadow-inner">
                <div className="text-left font-mono">
                  <span className="text-[10px] text-slate-500 block">TIER CLASSIFICATION</span>
                  <span className="text-[11px] text-white font-bold capitalize">{currentChallenge.ageTier} Level</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-850" />
                <div className="text-right font-mono flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 block">EXPLOIT REWARD</span>
                  <span className="text-sm text-amber-400 font-extrabold flex items-center gap-1">
                    <Coins className="w-4 h-4 text-amber-400" />
                    +{currentChallenge.creditsReward} CREDITS
                  </span>
                </div>
              </div>

              {/* Action button rows */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => {
                    setShowCelebration(false);
                  }}
                  className="flex-1 py-3.5 px-6 rounded-xl border border-slate-850 hover:bg-slate-900/45 text-slate-300 hover:text-white font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Completed Code</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowCelebration(false);
                    handleNextChallenge();
                  }}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Next Task</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
