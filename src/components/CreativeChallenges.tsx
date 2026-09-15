import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  ChevronRight, 
  Play, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCcw, 
  Code2, 
  Award, 
  Coins, 
  ArrowLeft,
  Settings,
  HelpCircle,
  Undo2,
  Info,
  BookOpen,
  Zap,
  Flame,
  Cpu,
  Sparkles,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { validateCodeLocally, testWithRelaxedRegex } from '../services/geminiService';
import { ADVANCED_CREATIVE_TASKS } from '../data/advancedCreativeTasks';

interface CreativeChallengesProps {
  onBackToMain: () => void;
  onRewardCredits: (credits: number) => void;
  currentCredits: number;
  userInterest?: string;
  activeTheme?: { id: string; name: string; value: string };
}

export interface CreativeTask {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  section?: 'standard' | 'advanced';
  creditsReward: number;
  description: string;
  initialCode: string;
  solutionRegex: string[];
  solutionHint: string;
  expectedInputCount: number;
}

const CREATIVE_TASKS: CreativeTask[] = [
  {
    id: 'eggs-powerful',
    title: 'The Mighty Egg',
    subtitle: 'Output a simple string literal',
    difficulty: 'Easy',
    creditsReward: 150,
    description: `To begin your creative coding training, write a custom Python program that outputs the sentence "Eggs are powerful." on a new line.

In Python, you can output strings of letters and characters to the screen by wrapping them in double quotes " " or single quotes ' ' inside a print command:
print("Your text goes here")`,
    initialCode: `# Challenge 1: The Mighty Egg
# Write a program that outputs the sentence: Eggs are powerful.

`,
    solutionRegex: [
      `print\\s*\\(\\s*["']Eggs\\s+are\\s+powerful\\.?["']\\s*\\)`
    ],
    solutionHint: `Simply type: print("Eggs are powerful.")`,
    expectedInputCount: 0
  },
  {
    id: 'two-sentences',
    title: 'Dual Line Transmitters',
    subtitle: 'Print multiple statements in succession',
    difficulty: 'Easy',
    creditsReward: 180,
    description: `Python runs instructions one by one, from top to bottom. If you write two print statements on separate lines, Python will output them on two separate lines.

Write a program that outputs the following sentences on 2 different lines:
"Gregg loves big elbows"
"Graham hates Parma ham"`,
    initialCode: `# Challenge 2: Dual Line Transmitters
# Output these two sentences on 2 separate lines:
# 1. Gregg loves big elbows
# 2. Graham hates Parma ham

`,
    solutionRegex: [
      `print\\s*\\(\\s*["']Gregg\\s+loves\\s+big\\s+elbows\\.?["']\\s*\\)`,
      `print\\s*\\(\\s*["']Graham\\s+hates\\s+Parma\\s+ham\\.?["']\\s*\\)`
    ],
    solutionHint: `Write two print lines:
print("Gregg loves big elbows")
print("Graham hates Parma ham")`,
    expectedInputCount: 0
  },
  {
    id: 'comma-oneline',
    title: 'Horizontal Alignment',
    subtitle: 'Consolidate output strings with a comma',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `When we pass multiple values separated by a comma (,) inside a single print statement, Python automatically outputs them on the SAME line, inserting a space between them.

For example, print("Hello", "World") outputs "Hello World".

Using the exact two sentences from the previous activity:
"Gregg loves big elbows"
"Graham hates Parma ham"

Write a single print statement that outputs both sentences on a single line, separated by a comma!`,
    initialCode: `# Challenge 3: Horizontal Alignment
# Print both Gregg and Graham sentences on a single line using a separating comma:

`,
    solutionRegex: [
      `print\\s*\\(\\s*["']Gregg\\s+loves\\s+big\\s+elbows\\.?["']\\s*(?:,|\\+)\\s*["'](?:,\\s*)?Graham\\s+hates\\s+Parma\\s+ham\\.?["']\\s*\\)|print\\s*\\(\\s*["']Gregg\\s+loves\\s+big\\s+elbows,?\\s+Graham\\s+hates\\s+Parma\\s+ham\\.?["']\\s*\\)`
    ],
    solutionHint: `Put both sentences as arguments separated by a comma:
print("Gregg loves big elbows", "Graham hates Parma ham")`,
    expectedInputCount: 0
  },
  {
    id: 'tv-show-input',
    title: 'Neural Scanner Input',
    subtitle: 'Gather telemetry string inputs',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `To gather user interaction inside our terminal, we use the input() function. Python pauses and waits for the user to type something and press Enter.

For example:
tv_show = input("Enter favourite show: ")

Write a program that asks someone for their favourite TV show using the input statement and stores it inside a variable.`,
    initialCode: `# Challenge 4: Neural Scanner Input
# Use the input() function to collect someone's favourite TV show:

`,
    solutionRegex: [
      `input\\s*\\(`
    ],
    solutionHint: `Declare a variable and set it equal to input(), for example:
favourite_show = input("What's your favourite TV show? ")`,
    expectedInputCount: 1
  },
  {
    id: 'tv-show-echo',
    title: 'The Echo Protocol',
    subtitle: 'Print variables back to the mainframe console',
    difficulty: 'Easy',
    creditsReward: 220,
    description: `Once you have collected an input and saved it to a named variable box, you can run print(variable) to output its contents back to the screen.

Write a program that:
1. Inputs someone's favourite TV show and saves it to a variable.
2. Uses a print statement to output that variable back to them.`,
    initialCode: `# Challenge 5: The Echo Protocol
# 1. Ask for their favourite TV show using input() and store it:


# 2. Print the value of that variable back to them:

`,
    solutionRegex: [
      `[a-zA-Z_]\\w*\\s*=\\s*input\\s*\\(`,
      `print\\s*\\(\\s*[a-zA-Z_]\\w*\\s*\\)`
    ],
    solutionHint: `Store the input inside a variable, then print that variable:
show = input("Enter TV show: ")
print(show)`,
    expectedInputCount: 1
  },
  {
    id: 'movie-context-newline',
    title: 'Movie Query Sequence',
    subtitle: 'Assemble structured output strings',
    difficulty: 'Easy',
    creditsReward: 250,
    description: `Let's make our interaction more human! We want to prompt for their favourite movie, output an explanatory sentence, and then print their movie's value on the next line.

Write a program that:
1. Prompts for their favourite movie using input() and stores it in a variable.
2. Prints: "So your favourite movie is: "
3. Prints their movie's variable value on the following line.`,
    initialCode: `# Challenge 6: Movie Query Sequence
# 1. Use input() to ask for their favourite movie:


# 2. Print: "So your favourite movie is:"


# 3. Print their favourite movie:

`,
    solutionRegex: [
      `[a-zA-Z_]\\w*\\s*=\\s*input\\s*\\(`,
      `print\\s*\\(\\s*["'](?:So\\s+)?your\\s+favou?rite\\s+movie\\s+is:?\\s*["']\\s*\\)`,
      `print\\s*\\(\\s*[a-zA-Z_]\\w*\\s*\\)`
    ],
    solutionHint: `Write three logical steps:
movie = input("What's your favourite movie? ")
print("So your favourite movie is:")
print(movie)`,
    expectedInputCount: 1
  },
  {
    id: 'movie-context-comma',
    title: 'Single-Line Movie Conjunction',
    subtitle: 'Merge strings and variables on one line',
    difficulty: 'Easy',
    creditsReward: 250,
    description: `Let's make our program's dialogue even tighter! Instead of printing the header on one line and the variable on the next line, we can print them on the exact same line.

This is done by separating them with a comma inside a single print statement:
print("So your favourite movie is:", movie)

Write a program that asks for their favourite movie, and prints the message and the movie value on the SAME line using a separating comma.`,
    initialCode: `# Challenge 7: Single-Line Movie Conjunction
# 1. Use input() to collect their favourite movie:


# 2. Print "So your favourite movie is:" and the movie together on one line using a comma:

`,
    solutionRegex: [
      `print\\s*\\(\\s*(?:f["'](?:So\\s+)?your\\s+favou?rite\\s+movie\\s+is:?\\s*\\{[a-zA-Z_]\\w*\\}["']|["'](?:So\\s+)?your\\s+favou?rite\\s+movie\\s+is:?\\s*["']\\s*(?:,|\\+)\\s*[a-zA-Z_]\\w*|[a-zA-Z_]\\w*\\s*,\\s*["'](?:So\\s+)?your\\s+favou?rite\\s+movie\\s+is:?\\s*["'])\\s*\\)`
    ],
    solutionHint: `Combine them into one print command separated by a comma:
movie = input("Favorite movie: ")
print("So your favourite movie is:", movie)`,
    expectedInputCount: 1
  },
  {
    id: 'gokart-registration',
    title: 'Go-Kart Registration Hub',
    subtitle: 'Develop a high-density full-profile collection form',
    difficulty: 'Medium',
    creditsReward: 300,
    description: `Time to build a complete program! We need a registration interface for our elite Go-Kart website.

Your program must:
1. Collect the user's first name, middle name, last name (second name) using 3 separate input() prompts.
2. Collect their email address, home address, and postcode using 3 more input() prompts.
3. Print a welcome message greeting them and showing their collected details!

This form collects 6 unique inputs in total. Ensure your code prompts for:
- First Name
- Middle Name
- Second/Last Name
- Email Address
- Home Address
- Postcode`,
    initialCode: `# Challenge 8: Go-Kart Registration Hub
# Collect all registration fields and print a summary back:

first_name = input("Enter First Name: ")






`,
    solutionRegex: [
      `input\\s*\\(`,
      `print\\s*\\(`
    ],
    solutionHint: `Write input statements for first, middle, second/last names, email, address, and postcode. Then print them out. You'll need 6 inputs total!`,
    expectedInputCount: 6
  },
  {
    id: 'best-console-var',
    title: 'The Elite Handheld',
    subtitle: 'Declare and store a string in a variable',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Variables are used to store data inside named containers. In Python, you can name a variable anything as long as it starts with a letter, and store text inside it using the equals (=) assignment operator.

Create a variable called bestConsole and store the string "PS Vita" inside it!`,
    initialCode: `# Challenge 9: The Elite Handheld
# Create a variable named bestConsole and store the string "PS Vita" inside it:

`,
    solutionRegex: [
      `bestConsole\\s*=\\s*["']PS\\s+Vita["']`
    ],
    solutionHint: `Declare: bestConsole = "PS Vita"`,
    expectedInputCount: 0
  },
  {
    id: 'best-console-echo',
    title: 'Consoles on Display',
    subtitle: 'Output the value of a string variable',
    difficulty: 'Easy',
    creditsReward: 220,
    description: `Storing values in variables is only half the power. To display a variable's value on screen, pass the exact variable name (without quotes) inside a print statement:
print(my_variable)

Create a variable called bestConsole, store the string "PS Vita" inside it, and then print that variable to display its value!`,
    initialCode: `# Challenge 10: Consoles on Display
# 1. Create a variable called bestConsole and assign the string "PS Vita" to it:


# 2. Output the value of this variable directly to the console:

`,
    solutionRegex: [
      `bestConsole\\s*=\\s*["']PS\\s+Vita["']`,
      `print\\s*\\(\\s*bestConsole\\s*\\)`
    ],
    solutionHint: `Define: bestConsole = "PS Vita"
Then write: print(bestConsole)`,
    expectedInputCount: 0
  },
  {
    id: 'best-console-input',
    title: 'Interactive Console Override',
    subtitle: 'Collect variable data from a keyboard input',
    difficulty: 'Easy',
    creditsReward: 240,
    description: `Instead of hardcoding "PS Vita" in our file, we can ask players to type their own favorite console! The input() function pauses the console and waits for user input. By placing it to the right of an equals operator, the input value is instantly stored in your variable.

Allow the user to input their favorite console's name, storing the parsed value in the variable bestConsole.`,
    initialCode: `# Challenge 11: Interactive Console Override
# Allow the user to input the value of bestConsole into the program:

`,
    solutionRegex: [
      `bestConsole\\s*=\\s*input\\s*\\(`
    ],
    solutionHint: `Simply type: bestConsole = input("Enter best console name: ")`,
    expectedInputCount: 1
  },
  {
    id: 'console-age-casting',
    title: 'Casting the Ages',
    subtitle: 'Prompt and cast input into integers',
    difficulty: 'Medium',
    creditsReward: 260,
    description: `By default, input() returns text as a string. If we want to store ages, tallies, or do math calculations, we must "cast" or convert that value into an integer (a whole number). We do this by wrapping input() inside the int() function:
my_number = int(input("Enter number: "))

Write a program that:
1. Prompts for a favorite console using input(), storing it inside bestConsole.
2. Prompts for its release age using input(), casting it directly into an integer inside consoleAge.
3. Prints out both values!`,
    initialCode: `# Challenge 12: Casting the Ages
# 1. Prompt for favourite console and store it inside bestConsole:


# 2. Prompt for consoleAge, casting it as an integer using int(input(...)):


# 3. Output both values:

`,
    solutionRegex: [
      `bestConsole\\s*=\\s*input\\s*\\(`,
      `consoleAge\\s*=\\s*int\\s*\\(\\s*input\\s*\\(`,
      `print\\s*\\(`
    ],
    solutionHint: `Use int(input(...)) to collect consoleAge, e.g.:
bestConsole = input("Enter console: ")
consoleAge = int(input("Enter age: "))
print(bestConsole, consoleAge)`,
    expectedInputCount: 2
  },
  {
    id: 'console-portable-boolean',
    title: 'Portable Telemetry Flags',
    subtitle: 'Incorporate logical Booleans into console metadata',
    difficulty: 'Medium',
    creditsReward: 280,
    description: `A Boolean value represents one of two options: True or False. Note that in Python, both key words are case-sensitive and must be written with capital letters (True / False) with no quotes!

Write a program that:
1. Prompts the user for their favorite console store in bestConsole.
2. Cast-prompts for consoleAge as an integer.
3. Creates a third variable called portable and sets it to the Boolean True or False (depending on your choice!).
4. Prints out all three parameters to the log feed list!`,
    initialCode: `# Challenge 13: Portable Telemetry Flags
# 1. Prompt and cast console and ages:
bestConsole = input("Console Name: ")
consoleAge = int(input("Console Age: "))

# 2. Add another variable called 'portable' and set it to a Boolean True or False:


# 3. Output portable along with other variables:

`,
    solutionRegex: [
      `portable\\s*=\\s*(True|False)`,
      `print\\s*\\(`
    ],
    solutionHint: `Set portable = True or portable = False without any quotes, then print all three variables!`,
    expectedInputCount: 2
  },
  {
    id: 'five-datatypes',
    title: 'The Five Primes',
    subtitle: 'Construct a program utilizing five basic datatypes',
    difficulty: 'Medium',
    creditsReward: 320,
    description: `Python programs process information using 5 principal data types:
1. String (text enclosed in quotes, e.g. "Pegasus")
2. Integer (whole numbers, e.g. 5)
3. Float (numbers containing decimals, e.g. 1.82)
4. Boolean (True or False with no quotes)
5. List (a sequence of values inside square brackets, e.g. ["carrots", "apples"])

Create a new program from scratch representing 5 attributes of your favorite console, animal, or character (such as a horse). You must:
- Declare 5 different variables representing all 5 datatypes.
- Print out each of the 5 variables to the screen!`,
    initialCode: `# Challenge 14: The Five Primes
# Create 5 variables about a subject (like a horse) using: String, Integer, Float, Boolean, and List.
# Print all five of them!

`,
    solutionRegex: [
      `=\\s*["'].*?["']`,
      `=\\s*\\d+(?!\\.)`,
      `=\\s*\\d+\\.\\d+`,
      `=\\s*(True|False)`,
      `=\\s*(\\[|\\()`
    ],
    solutionHint: `Write five variable declarations, for example:
name = "Mare"
age = 6
weight = 542.8
is_alive = True
colors = ["black", "white"]
print(name, age, weight, is_alive, colors)`,
    expectedInputCount: 0
  },
  {
    id: 'story-protocol',
    title: 'Dynamic Narrative Engine',
    subtitle: 'Synthesize custom text templates with variables',
    difficulty: 'Hard',
    creditsReward: 400,
    description: `Let's use our program inputs to write a short interactive storyline generator!

You are tasked to build a storytelling engine that collects 5 prompt inputs:
1. name (the person's name)
2. pronoun (e.g. "He", "She", "They")
3. possessive_pronoun (e.g. "his", "her", "their")
4. hobby (e.g. "baking", "climbing")
5. favorite_game (e.g. "Zelda", "Portal")

Then, write and print a custom story of at least 2 paragraphs incorporating all 5 dynamic entries! E.g. "There once was a player called FIRSTNAME who loved playing FAVGAME..."`,
    initialCode: `# Challenge 15: Dynamic Narrative Engine
# 1. Collect inputs for: name, pronoun, possessive_pronoun, hobby, and favorite_game:


# 2. Output a 2-paragraph custom story (about 2 paragraphs long) incorporating all of them:

`,
    solutionRegex: [
      `input\\s*\\(`,
      `print\\s*\\(`
    ],
    solutionHint: `Gather the 5 inputs using variables, then construct two long print paragraphs combining string concatenation (+) or premium commas!`,
    expectedInputCount: 5
  },
  {
    id: 'add-three-numbers',
    title: 'Threefold Addition',
    subtitle: 'Sum three numbers together',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Write a program that adds 3 numbers together and outputs the result. You can choose any three numbers, add them up, and print the resulting sum.`,
    initialCode: `# Challenge 16: Threefold Addition
# Write a program that adds 3 numbers together and outputs the result:

`,
    solutionRegex: [
      `\\+`,
      `print\\s*\\(`
    ],
    solutionHint: `Simply define or use three numbers, add them, and print the sum. For example:
print(10 + 20 + 35)`,
    expectedInputCount: 0
  },
  {
    id: 'input-add-three-numbers',
    title: 'Interactive Summation',
    subtitle: 'Prompt, cast, and sum three integers',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Write a program where all 3 numbers are inputted by user and casting is used to make them into integers. Add them up and print the resulting value.`,
    initialCode: `# Challenge 17: Interactive Summation
# Prompt the user for 3 numbers, cast them as integers, add them, and print the result:

`,
    solutionRegex: [
      `int\\s*\\(`,
      `input\\s*\\(`,
      `\\+`,
      `print\\s*\\(`
    ],
    solutionHint: `Prompt using input() nested inside int():
num1 = int(input("Num 1: "))
num2 = int(input("Num 2: "))
num3 = int(input("Num 3: "))
print(num1 + num2 + num3)`,
    expectedInputCount: 3
  },
  {
    id: 'add-two-sub-one',
    title: 'Addition and Subtraction Chain',
    subtitle: 'Combine addition and subtraction operations',
    difficulty: 'Medium',
    creditsReward: 260,
    description: `Write a program that takes 3 numbers as inputs, casts them as integers, adds the first two together, then subtracts the last integer from it, then outputs the result.`,
    initialCode: `# Challenge 18: Addition and Subtraction Chain
# 1. Take 3 inputs and cast them as integers
# 2. Add the first two, subtract the third, and print the result:

`,
    solutionRegex: [
      `int\\s*\\(`,
      `input\\s*\\(`,
      `\\+`,
      `-`,
      `print\\s*\\(`
    ],
    solutionHint: `Collect 3 inputs with integer casting, calculate and output:
a = int(input())
b = int(input())
c = int(input())
print(a + b - c)`,
    expectedInputCount: 3
  },
  {
    id: 'rectangle-area',
    title: 'Rectangle Area Calculator',
    subtitle: 'Calculate area from width and height inputs',
    difficulty: 'Easy',
    creditsReward: 240,
    description: `Make a program that calculates the area of a rectangle and outputs it back to the user. Ask the user for the width and height, cast them to integers/floats, and print the multiplied width * height.`,
    initialCode: `# Challenge 19: Rectangle Area Calculator
# 1. Ask for width and height (cast to numbers)
# 2. Calculate area and output it:

`,
    solutionRegex: [
      `input\\s*\\(`,
      `\\*`,
      `print\\s*\\(`
    ],
    solutionHint: `Get width and height, multiply them, and print:
width = int(input("Width: "))
height = int(input("Height: "))
print("Area:", width * height)`,
    expectedInputCount: 2
  },
  {
    id: 'average-floats',
    title: 'Floating-Point Average',
    subtitle: 'Calculate the mean of three decimal values',
    difficulty: 'Medium',
    creditsReward: 280,
    description: `Make a program that takes 3 numbers as floats, calculates the average by dividing their sum by 3, and outputs it back to the user.`,
    initialCode: `# Challenge 20: Floating-Point Average
# 1. Prompt for 3 floats
# 2. Calculate their average and print the result:

`,
    solutionRegex: [
      `float\\s*\\(`,
      `input\\s*\\(`,
      `\\/`,
      `print\\s*\\(`
    ],
    solutionHint: `Collect 3 floats, sum them up, divide by 3 (or 3.0), and print:
num1 = float(input())
num2 = float(input())
num3 = float(input())
print((num1 + num2 + num3) / 3)`,
    expectedInputCount: 3
  },
  {
    id: 'division-remainder',
    title: 'Modulus Remainder',
    subtitle: 'Extract the remainder of a division',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `The modulo operator (%) is used to find the remainder of a division.\n\nMake a program that divides 2 inputted integers together and outputs the remainder back to the user.`,
    initialCode: `# Challenge 21: Modulus Remainder
# 1. Collect 2 inputted integers
# 2. Find and print the remainder of their division:

`,
    solutionRegex: [
      `int\\s*\\(`,
      `input\\s*\\(`,
      `%`,
      `print\\s*\\(`
    ],
    solutionHint: `Get top and bottom integers, then print the modulo remainder using %:
a = int(input())
b = int(input())
print(a % b)`,
    expectedInputCount: 2
  },
  {
    id: 'division-integer',
    title: 'Floor Division',
    subtitle: 'Retrieve the integer part of division',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `In Python, double-slash (//) is the floor division operator. It divides two numbers and discards any fractional part.\n\nMake a program that divides 2 inputted integers together and outputs only the whole number portion of the answer.`,
    initialCode: `# Challenge 22: Floor Division
# 1. Collect 2 inputted integers
# 2. Divide them using floor division and print the whole number result:

`,
    solutionRegex: [
      `int\\s*\\(`,
      `input\\s*\\(`,
      `\\/\\/`,
      `print\\s*\\(`
    ],
    solutionHint: `Use // operator to divide two integers:
a = int(input())
b = int(input())
print(a // b)`,
    expectedInputCount: 2
  },
  {
    id: 'odd-or-even',
    title: 'Odd or Even Parity',
    subtitle: 'Verify parity of an integer',
    difficulty: 'Hard',
    creditsReward: 300,
    description: `An even number is perfectly divisible by 2 (number % 2 == 0), whereas an odd number leaves a remainder of 1.\n\nMake a program that lets the user input an integer, then outputs whether or not the number is odd or even.`,
    initialCode: `# Challenge 23: Odd or Even Parity
# 1. Input an integer from the user:
# 2. Check if it's odd or even, then output the verdict:

`,
    solutionRegex: [
      `input\\s*\\(`,
      `%\\s*2`,
      `if\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Input an integer, use an if/else checking if number % 2 == 0:
num = int(input("Enter number: "))
if num % 2 == 0:
    print("even")
else:
    print("odd")`,
    expectedInputCount: 1
  },
  {
    id: 'less-than-ten',
    title: 'Under Ten Checker',
    subtitle: 'Compare integers to ten',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Write a program that checks if an integer is less than 10. If it is, output “your number is less than 10” else, output “your number is either equal to, or bigger than 10”.`,
    initialCode: `# Challenge 24: Under Ten
# 1. Ask the user to input an integer:


# 2. Check if it is less than 10, then print the specified outputs:

`,
    solutionRegex: [
      `input\\s*\\(`,
      `if\\s+.*(?:<|<=|>|>=)\\s*10`,
      `print\\s*\\(.*less\\s+than\\s+10`,
      `print\\s*\\(.*(?:equal|bigger|greater)`
    ],
    solutionHint: `Input an integer and compare it:
num = int(input("Enter number: "))
if num < 10:
    print("your number is less than 10")
else:
    print("your number is either equal to, or bigger than 10")`,
    expectedInputCount: 1
  },
  {
    id: 'mega-dosh',
    title: 'Mega Dosh',
    subtitle: 'Accumulate high-tier capital bounds',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Make a program that allows the user to enter 2 numbers, add them together, store this in a variable. If the total is bigger than or equal to 100, output “Mega Dosh” if not, output “Get back to work”.`,
    initialCode: `# Challenge 25: Mega Dosh
# 1. Get 2 numbers inputted by the user:


# 2. Sum them and save inside a variable:


# 3. Check if total >= 100 and output accordingly:

`,
    solutionRegex: [
      `input\\s*\\(`,
      `\\+`,
      `if\\s+[^\\n]*>=?\\s*100`,
      `print\\s*\\(.*[Mm]ega\\s+[Dd]osh`,
      `print\\s*\\(.*[Gg]et\\s+back\\s+to\\s+work`
    ],
    solutionHint: `Get 2 inputs, sum them up, check if total >= 100:
num1 = int(input())
num2 = int(input())
total = num1 + num2
if total >= 100:
    print("Mega Dosh")
else:
    print("Get back to work")`,
    expectedInputCount: 2
  },
  {
    id: 'bean-opinion',
    title: 'The Bean Decider',
    subtitle: 'Judge culinary preferences',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Make a program that allows the user to enter their favourite food. If it is NOT “Beans” output “You are a BEAN”, else output “Peak, you have good taste.”.`,
    initialCode: `# Challenge 26: The Bean Decider
# 1. Ask the user for their favorite food:


# 2. If it is NOT "Beans", output "You are a BEAN", otherwise "Peak, you have good taste.":

`,
    solutionRegex: [
      `input\\s*\\(`,
      `if\\s+.*[Bb]eans`,
      `print\\s*\\(.*[Yy]ou\\s+are\\s+a\\s+[Bb][Ee][Aa][Nn]`,
      `print\\s*\\(.*[Pp]eak`
    ],
    solutionHint: `Ask for food, check if unequal to "Beans":
food = input("What's your favorite food? ")
if food != "Beans":
    print("You are a BEAN")
else:
    print("Peak, you have good taste.")`,
    expectedInputCount: 1
  },
  {
    id: 'parity-verdict',
    title: 'Strict Parity Verdict',
    subtitle: 'Output ODD or EVEN standard tags',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Make a program that allows the user to enter a number, checks if it is ODD or EVEN, and outputs exactly “ODD” if it’s odd, and “EVEN” if it’s even.`,
    initialCode: `# Challenge 27: Strict Parity Verdict
# 1. Ask for a number as input:


# 2. Check odd or even, output exactly "ODD" or "EVEN":

`,
    solutionRegex: [
      `input\\s*\\(`,
      `%\\s*2`,
      `print\\s*\\(.*[Ee][Vv][Ee][Nn]`,
      `print\\s*\\(.*[Oo][Dd][Dd]`
    ],
    solutionHint: `Input a number and print ODD/EVEN depending on the modulo remainder:
num = int(input("Enter number: "))
if num % 2 == 0:
    print("EVEN")
else:
    print("ODD")`,
    expectedInputCount: 1
  },
  {
    id: 'gta-eight-check',
    title: 'GTA 8 Age Gate',
    subtitle: 'Establish verification checks for future releases',
    difficulty: 'Medium',
    creditsReward: 280,
    description: `Imagine it’s the year 4092, make a program that allows the user to enter their age and try to buy a copy of GTA 8. If their age is less than 18, deny them. If not, allow them.\n\nThere must be a boolean called “ageAppropriate” that starts off as False and is set to True if the user is of age (18 or older).`,
    initialCode: `# Challenge 28: GTA 8 Age Gate
# 1. Prompt for user's age (cast to integer):


# 2. Define a boolean called ageAppropriate starting at False:


# 3. Check if age is 18 or more, set ageAppropriate, and permit/deny:

`,
    solutionRegex: [
      `ageAppropriate\\s*=\\s*False`,
      `int\\s*\\(\\s*input\\s*\\(`,
      `ageAppropriate\\s*=\\s*True`,
      `if\\s+`
    ],
    solutionHint: `Set ageAppropriate to False initially, then check if age is >= 18:
age = int(input("Enter age: "))
ageAppropriate = False
if age >= 18:
    ageAppropriate = True
    print("allow")
else:
    print("deny")`,
    expectedInputCount: 1
  },
  {
    id: 'secure-login-v1',
    title: 'Grid Core Login',
    subtitle: 'Verify credentials against database records',
    difficulty: 'Medium',
    creditsReward: 280,
    description: `Make a program that uses IF statements to create a login system for a user. Have 2 pre-made variables called “databaseUsername” and “databasePassword”. Allow the user to enter their username and password into 2 variables. If the variables both match up, allow the user to login and output “login successful” otherwise output “Get out you dirty hacker”.`,
    initialCode: `# Challenge 29: Grid Core Login
databaseUsername = "admin"
databasePassword = "secret_password"

# 1. Ask the user for their entered username and password:


# 2. Check if they match. Output "login successful" or "Get out you dirty hacker":

`,
    solutionRegex: [
      `input\\s*\\(`,
      `databaseUsername\\s*==|databasePassword\\s*==`,
      `print\\s*\\(.*[Ll]ogin\\s+[Ss]uccessful`,
      `print\\s*\\(.*[Gg]et\\s+out\\s+you\\s+dirty\\s+hacker`
    ],
    solutionHint: `Take username and password inputs, check if both match:
user = input()
pwd = input()
if user == databaseUsername and pwd == databasePassword:
    print("login successful")
else:
    print("Get out you dirty hacker")`,
    expectedInputCount: 2
  },
  {
    id: 'grade-mark',
    title: 'Grading Kernel',
    subtitle: 'Evaluate exam score brackets',
    difficulty: 'Hard',
    creditsReward: 320,
    description: `Make a program that uses a conditional structure to grade an exam mark. The mark should be inputted by the user and casted to an integer.\n\nThe test is out of 100 and the grades are as follows:
- Less than 30 = "fail"
- 30-49 = "pass"
- 50-74 = "merit"
- 75-90 = "Distinction"
- 91-100 = "Distinction Star"`,
    initialCode: `# Challenge 30: Grading Kernel
# 1. Input exam mark and cast to integer:


# 2. Classify the grade and print the result:

`,
    solutionRegex: [
      `int\\s*\\(\\s*input\\s*\\(`,
      `print\\s*\\(.*[Ff]ail`,
      `print\\s*\\(.*[Pp]ass`,
      `print\\s*\\(.*[Mm]erit`,
      `print\\s*\\(.*[Dd]istinction`,
      `print\\s*\\(.*[Dd]istinction\\s+[Ss]tar`
    ],
    solutionHint: `Input the mark, then use simple elif checks:
mark = int(input())
if mark < 30:
    print("fail")
elif mark <= 49:
    print("pass")
elif mark <= 74:
    print("merit")
elif mark <= 90:
    print("Distinction")
else:
    print("Distinction Star")`,
    expectedInputCount: 1
  },
  {
    id: 'grade-mark-validator',
    title: 'Grading Kernel with Range Check',
    subtitle: 'Validate input boundaries before grading',
    difficulty: 'Hard',
    creditsReward: 350,
    description: `The same as the previous task, but add input verification to check if the grade is inclusively between 0 and 100. If outside [0, 100], print "invalid mark". Otherwise, perform grading!`,
    initialCode: `# Challenge 31: Grading Kernel with Range Check
# 1. Input exam mark and cast to integer:


# 2. Check if it is between 0 and 100 (inclusively). If not, print "invalid mark".
# 3. Otherwise, classify the grade normally:

`,
    solutionRegex: [
      `int\\s*\\(\\s*input\\s*\\(`,
      `print\\s*\\(.*[Ii]nvalid\\s+[Mm]ark`,
      `print\\s*\\(.*[Ff]ail`,
      `print\\s*\\(.*[Pp]ass`,
      `print\\s*\\(.*[Mm]erit`,
      `print\\s*\\(.*[Dd]istinction`,
      `print\\s*\\(.*[Dd]istinction\\s+[Ss]tar`
    ],
    solutionHint: `Use boundaries first, then normal grading structure:
mark = int(input())
if mark < 0 or mark > 100:
    print("invalid mark")
elif mark < 30:
    print("fail")
elif mark <= 49:
    print("pass")
elif mark <= 74:
    print("merit")
elif mark <= 90:
    print("Distinction")
else:
    print("Distinction Star")`,
    expectedInputCount: 1
  },
  {
    id: 'big-john-for',
    title: 'Repeating Big John (FOR)',
    subtitle: 'Output words 10 times using a for loop',
    difficulty: 'Easy',
    creditsReward: 180,
    description: `Make a program that outputs the words “Big John” 10 times using a for loop.`,
    initialCode: `# Challenge 32: Repeating Big John (FOR)
# Output "Big John" exactly 10 times using a for loop:

`,
    solutionRegex: [
      `for\\s+`,
      `print\\s*\\(\\s*["']Big\\s+John["']\\s*\\)`
    ],
    solutionHint: `Use a for loop over a range of 10:
for i in range(10):
    print("Big John")`,
    expectedInputCount: 0
  },
  {
    id: 'big-john-while',
    title: 'Repeating Big John (WHILE)',
    subtitle: 'Output words 10 times using a while loop',
    difficulty: 'Easy',
    creditsReward: 190,
    description: `Make a program that outputs the words “Big John” 10 times using a while loop.`,
    initialCode: `# Challenge 33: Repeating Big John (WHILE)
# Output "Big John" exactly 10 times using a while loop:

`,
    solutionRegex: [
      `while\\s+`,
      `print\\s*\\(\\s*["']Big\\s+John["']\\s*\\)`
    ],
    solutionHint: `Initialize a counter, loop while counter < 10, increment inside:
i = 0
while i < 10:
    print("Big John")
    i += 1`,
    expectedInputCount: 0
  },
  {
    id: 'count-0-10-for',
    title: 'Decimal Count (FOR)',
    subtitle: 'Count from 0 up to 10 with a for loop',
    difficulty: 'Easy',
    creditsReward: 180,
    description: `Make a program that counts from 0 to 10 (inclusive) using a for loop. Output each number on its own line.`,
    initialCode: `# Challenge 34: Decimal Count (FOR)
# Output numbers from 0 to 10 inclusive using a for loop:

`,
    solutionRegex: [
      `for\\s+`,
      `range\\s*\\(\\s*(11|0\\s*,\\s*11)\\s*\\)`,
      `print\\s*\\(`
    ],
    solutionHint: `Loop through range(11) to include 10, then print:
for i in range(11):
    print(i)`,
    expectedInputCount: 0
  },
  {
    id: 'count-0-10-while',
    title: 'Decimal Count (WHILE)',
    subtitle: 'Count from 0 up to 10 with a while loop',
    difficulty: 'Easy',
    creditsReward: 190,
    description: `Make a program that counts from 0 to 10 (inclusive) using a while loop. Make sure to print the counter at each iteration.`,
    initialCode: `# Challenge 35: Decimal Count (WHILE)
# Count from 0 to 10 inclusive with a while loop and output the numbers:

`,
    solutionRegex: [
      `while\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Initialize count = 0, check while count <= 10, print count, increment:
count = 0
while count <= 10:
    print(count)
    count += 1`,
    expectedInputCount: 0
  },
  {
    id: 'input-until-greater-10',
    title: 'Continuous Upward Boundary Check',
    subtitle: 'Loop input until a target threshold is reached',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Make a program that allows the user to input a number continually until the number is greater than 10. This must be a while loop. (Don't forget to cast your int!)`,
    initialCode: `# Challenge 36: Continuous Upward Boundary Check
# Input numbers continuously inside a while loop until an integer greater than 10 is inputted:

`,
    solutionRegex: [
      `while\\s+`,
      `int\\s*\\(\\s*input\\s*\\(`
    ],
    solutionHint: `Start with an initial input, then run a while loop checking if less than or equal to 10:
val = 0
while val <= 10:
    val = int(input("Enter number: "))`,
    expectedInputCount: 3
  },
  {
    id: 'count-interval-2-for',
    title: 'Interval Evolution',
    subtitle: 'Count up to 100 in intervals of 2',
    difficulty: 'Medium',
    creditsReward: 220,
    description: `Make a program that uses a FOR loop and counts up to 100, but it must count up in intervals of 2 (e.g., 0, 2, 4, ..., 100). Use the range function's step parameter.`,
    initialCode: `# Challenge 37: Interval Evolution
# Output numbers up to 100 inclusive, counting up in intervals of 2, using a for loop:

`,
    solutionRegex: [
      `for\\s+`,
      `range\\s*\\(\\s*\\d+\\s*,\\s*(101|102)\\s*,\\s*2\\s*\\)`,
      `print\\s*\\(`
    ],
    solutionHint: `Use range(0, 101, 2) inside your for loop:
for i in range(0, 101, 2):
    print(i)`,
    expectedInputCount: 0
  },
  {
    id: 'odd-numbers-for',
    title: 'Odd Range Scanner (FOR)',
    subtitle: 'Iterate up to 100 displaying odd numbers',
    difficulty: 'Medium',
    creditsReward: 220,
    description: `Make a for loop that counts up to 100, but only outputs the ODD numbers.`,
    initialCode: `# Challenge 38: Odd Range Scanner (FOR)
# Output all odd numbers up to 100 using a for loop:

`,
    solutionRegex: [
      `for\\s+`,
      `(range\\s*\\(\\s*1\\s*,\\s*(100|101)\\s*,\\s*2\\s*\\)|%\\s*2\\s*!=\\s*0|%\\s*2\\s*==\\s*1)`,
      `print\\s*\\(`
    ],
    solutionHint: `You can use range(1, 101, 2) or screen using an if statement with modulo:
for i in range(1, 101, 2):
    print(i)`,
    expectedInputCount: 0
  },
  {
    id: 'odd-numbers-while',
    title: 'Odd Range Scanner (WHILE)',
    subtitle: 'Loop up to 100 displaying odd numbers',
    difficulty: 'Medium',
    creditsReward: 230,
    description: `Make a program that counts up to 100, outputting only the ODD numbers, utilizing a while loop.`,
    initialCode: `# Challenge 39: Odd Range Scanner (WHILE)
# Output odd numbers up to 100 using a while loop:

`,
    solutionRegex: [
      `while\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Initialize a counter, increment by 2 inside your checking while loop:
i = 1
while i < 100:
    print(i)
    i += 2`,
    expectedInputCount: 0
  },
  {
    id: 'friends-array-for',
    title: 'Circle of Friendship (FOR)',
    subtitle: 'Loop through a 1D list of names using for',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Make a program that has a 1D array with the first names of your 3 best friends. It must print every element in the array using a for loop.`,
    initialCode: `# Challenge 40: Circle of Friendship (FOR)
# 1. Define a list containing 3 first names of friends:


# 2. Iterate and print each friend's name using a for loop:

`,
    solutionRegex: [
      `\\[\\s*["'][^"'\n]+["']\\s*,\\s*["'][^"'\n]+["']\\s*,\\s*["'][^"'\n]+["']\\s*\\]`,
      `for\\s+.*\\s+in\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Create a list of strings, then print each with a for loop:
friends = ["Alice", "Bob", "Charlie"]
for f in friends:
    print(f)`,
    expectedInputCount: 0
  },
  {
    id: 'friends-array-while',
    title: 'Circle of Friendship (WHILE)',
    subtitle: 'Loop through a list of names using while',
    difficulty: 'Medium',
    creditsReward: 210,
    description: `Make a program that has a 1D array with the first names of your 3 best friends, and prints every element using a while loop instead of a for loop.`,
    initialCode: `# Challenge 41: Circle of Friendship (WHILE)
# 1. Define a list containing 3 first names of friends:


# 2. Iterate and print each friend's name using a while loop and indexing:

`,
    solutionRegex: [
      `\\[\\s*["'][^"'\n]+["']\\s*,\\s*["'][^"'\n]+["']\\s*,\\s*["'][^"'\n]+["']\\s*\\]`,
      `while\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Maintain an index variable, check while index < len(friends), print each, then increment:
friends = ["Alice", "Bob", "Charlie"]
i = 0
while i < len(friends):
    print(friends[i])
    i += 1`,
    expectedInputCount: 0
  },
  {
    id: 'celebs-grid-for',
    title: 'Celebrity Grid (FOR)',
    subtitle: 'Iterate through a 2D list of names using for',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Make a program that has a 2D array with the first and last names of your favourite 5 celebrities (past or present) and outputs the first and last name of every celeb in the list. Each celebrity should be on a different line. Must use a for loop.`,
    initialCode: `# Challenge 42: Celebrity Grid (FOR)
# 1. Define a 2D list containing first and last names of 5 celebrities:


# 2. Print both the first and last names of each celebrity on individual lines using a for loop:

`,
    solutionRegex: [
      `for\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Provide a 2D list and iterate over it:
celebs = [["Keanu", "Reeves"], ["Pedro", "Pascal"], ["Cillian", "Murphy"], ["Zendaya", "Coleman"], ["Tom", "Hanks"]]
for c in celebs:
    print(c[0], c[1])`,
    expectedInputCount: 0
  },
  {
    id: 'celebs-grid-while',
    title: 'Celebrity Grid (WHILE)',
    subtitle: 'Iterate through a 2D list of names using while',
    difficulty: 'Hard',
    creditsReward: 260,
    description: `Make a program that has a 2D array with the first and last names of your favourite 5 celebrities and outputs the first and last name of every celeb in the list. Each celebrity should be on a different line. Must use a while loop.`,
    initialCode: `# Challenge 43: Celebrity Grid (WHILE)
# 1. Provide a 2D list with the first and last names of your 5 favorite celebrities:


# 2. Output both names of each celebrity on different lines using a while loop:

`,
    solutionRegex: [
      `while\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Manage an index variable and run a while loop over the list size:
celebs = [["Keanu", "Reeves"], ["Pedro", "Pascal"], ["Cillian", "Murphy"], ["Zendaya", "Coleman"], ["Tom", "Hanks"]]
idx = 0
while idx < len(celebs):
    print(celebs[idx][0], celebs[idx][1])
    idx += 1`,
    expectedInputCount: 0
  },
  {
    id: 'string-scanner-for',
    title: 'Kung Pao Lettering (FOR)',
    subtitle: 'Loop through string characters using for',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Make a program that has the string “Big John loves kung pao chicken”, and outputs every character of the string on individual different lines using a for loop.`,
    initialCode: `# Challenge 44: Kung Pao Lettering (FOR)
text = "Big John loves kung pao chicken"

# Iterate and output each individual character on a separate line using a for loop:

`,
    solutionRegex: [
      `for\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Simply iterate through characters and print them:
text = "Big John loves kung pao chicken"
for char in text:
    print(char)`,
    expectedInputCount: 0
  },
  {
    id: 'string-scanner-while',
    title: 'Kung Pao Lettering (WHILE)',
    subtitle: 'Loop through string characters using while',
    difficulty: 'Medium',
    creditsReward: 210,
    description: `Make a program that has the string “Big John loves kung pao chicken”, and outputs every character of the string on individual different lines using a while loop.`,
    initialCode: `# Challenge 45: Kung Pao Lettering (WHILE)
text = "Big John loves kung pao chicken"

# Iterate and output each individual character on a separate line using a while loop and indexing:

`,
    solutionRegex: [
      `while\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Use a counter index, loop until length of text, indexing char by char:
text = "Big John loves kung pao chicken"
i = 0
while i < len(text):
    print(text[i])
    i += 1`,
    expectedInputCount: 0
  },
  {
    id: 'nineteen-and-fives',
    title: 'Occurrence Matrix Filter',
    subtitle: 'Validate frequency of specific integers',
    difficulty: 'Medium',
    creditsReward: 280,
    description: `Make a program to check if a list of integers has exactly two occurrences of nineteen (19) and at least three occurrences of five (5). Print True if this is true, otherwise print False.\n\nExample list: \n\`[19, 19, 15, 5, 3, 5, 5, 2]\` (returns True)`,
    initialCode: `# Challenge 46: Occurrence Matrix Filter
# Check if the list has exactly two occurrences of 19 and at least three occurrences of 5:
nums = [19, 19, 15, 5, 3, 5, 5, 2]

# Write your verification logic below and print the solution verification (True/False):

`,
    solutionRegex: [
      `count\\s*\\(\\s*19\\s*\\)`,
      `count\\s*\\(\\s*5\\s*\\)`,
      `print\\s*\\(`
    ],
    solutionHint: `Use the .count() method on the list and verify both conditions:
nineteens = nums.count(19)
fives = nums.count(5)
if nineteens == 2 and fives >= 3:
    print(True)
else:
    print(False)`,
    expectedInputCount: 0
  },
  {
    id: 'differ-by-ten',
    title: 'Century Spacing Metric',
    subtitle: 'Verify if 100 numbers differ by exactly ten',
    difficulty: 'Hard',
    creditsReward: 350,
    description: `Make a program to test a list of one hundred integers between 0 and 999, which all differ by ten from one another. Return/Print True otherwise False.`,
    initialCode: `# Challenge 47: Century Spacing Metric
# Test if a list of 100 integers has all adjacent items differing by exactly 10:
nums = [i * 10 for i in range(100)] # Differ by 10 from one another increment style

# Write your verification logic below and print True if constraints are met, otherwise False:

`,
    solutionRegex: [
      `(?:len\\s*\\(|for\\s+|diff|100)`,
      `print\\s*\\(`
    ],
    solutionHint: `Ensure the list has exactly 100 elements, then verify the adjacent differences in a loop:
is_valid = len(nums) == 100
for i in range(len(nums) - 1):
    if abs(nums[i+1] - nums[i]) != 10:
        is_valid = False
print(is_valid)`,
    expectedInputCount: 0
  },
  {
    id: 'four-distinct-no-repeats',
    title: 'Four-Fold Uniqueness Track',
    subtitle: 'Rule verification over consecutive elements',
    difficulty: 'Hard',
    creditsReward: 360,
    description: `Make a program to find a list of integers containing exactly four distinct values, making sure that no integer repeats twice consecutively among the first twenty entries. Output/Print True if it passes, otherwise False.`,
    initialCode: `# Challenge 48: Four-Fold Uniqueness Track
# Check if the list contains exactly four distinct values and has no adjacent consecutive duplicates:
nums = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]

# Write your verification logic below and print True or False:

`,
    solutionRegex: [
      `(?:append\\s*\\(|set\\s*\\(|unique|len\\s*\\()`,
      `print\\s*\\(`
    ],
    solutionHint: `Track unique elements using a loop and keep track of adjacent duplicates:
unique_values = []
for x in nums:
    if x not in unique_values:
        unique_values.append(x)

no_consecutive = True
for i in range(min(19, len(nums) - 1)):
    if nums[i] == nums[i+1]:
        no_consecutive = False

if len(unique_values) == 4 and no_consecutive:
    print(True)
else:
    print(False)`,
    expectedInputCount: 0
  },
  {
    id: 'procedure-bob',
    title: 'Procedural Bob Greeting',
    subtitle: 'Define and call a simple parameterless procedure',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Make a procedure (a function that doesn't return any value) that prints the word “Bob” and call it.`,
    initialCode: `# Challenge 49: Procedural Bob Greeting
# Define a procedure that prints the word "Bob", and then call it:

`,
    solutionRegex: [
      `def\\s+`,
      `print\\s*\\(\\s*["']Bob["']\\s*\\)`
    ],
    solutionHint: `Define a procedure and call it:
def greet():
    print("Bob")

greet()`,
    expectedInputCount: 0
  },
  {
    id: 'function-bob',
    title: 'Functional Bob Return',
    subtitle: 'Define a function returning a string value',
    difficulty: 'Easy',
    creditsReward: 210,
    description: `Make a function that returns the word “Bob”, call it, and print the return value back to the screen.`,
    initialCode: `# Challenge 50: Functional Bob Return
# Define a function returning 'Bob', call it, and print the printed returned value:

`,
    solutionRegex: [
      `def\\s+`,
      `return\\s+["']Bob["']`,
      `print\\s*\\(`
    ],
    solutionHint: `Define a function returning "Bob", then print the result of calling it:
def get_bob():
    return "Bob"

print(get_bob())`,
    expectedInputCount: 0
  },
  {
    id: 'procedure-add-params',
    title: 'Integer Parameterized Sum',
    subtitle: 'Supply integer parameters to a custom procedure',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Make a procedure that takes 2 parameters as integers, adds them together, then prints the result.`,
    initialCode: `# Challenge 51: Integer Parameterized Sum
# Define a procedure taking two parameters, adding them together and printing the result:

`,
    solutionRegex: [
      `def\\s+.*\\(\\s*[A-Za-z0-9_]+\\s*,\\s*[A-Za-z0-9_]+\\s*\\)`,
      `\\+`,
      `print\\s*\\(`
    ],
    solutionHint: `Define the procedure taking two arguments, sum them inside and print:
def custom_sum(a, b):
    print(a + b)

custom_sum(50, 75)`,
    expectedInputCount: 0
  },
  {
    id: 'function-input-multiply',
    title: 'Interactive Multiplication Function',
    subtitle: 'Cast inputted parameters and compute their product',
    difficulty: 'Medium',
    creditsReward: 260,
    description: `Make a function that takes 2 parameters as integers, multiplies them together, and returns the result (or prints it). \n\n**Note**: The 2 inputs must be inputted by the user and casted into integers before passing them as arguments to the function!`,
    initialCode: `# Challenge 52: Interactive Multiplication Function
# 1. Write a function that takes two integer parameters, multiplies them and returns or prints the product:


# 2. Collect 2 user inputs, cast them to integers, and call your function passing them:

`,
    solutionRegex: [
      `def\\s+`,
      `input\\s*\\(`,
      `\\*`
    ],
    solutionHint: `Define a function, request inputs, cast to integers, and call:
def multiply(x, y):
    print(x * y)

a = int(input())
b = int(input())
multiply(a, b)`,
    expectedInputCount: 2
  },
  {
    id: 'procedure-full-name',
    title: 'Full Name Welcome System',
    subtitle: 'Integrate dynamic inputs inside formatted welcomes',
    difficulty: 'Medium',
    creditsReward: 240,
    description: `Make a procedure that takes 2 strings as parameters: First name and Last name (USER INPUTTED).\n\nThe procedure must then print: \n\`So your full name is: XXXXXX YYYYYY\` (where X and Y represent the names they've inputted).`,
    initialCode: `# Challenge 53: Full Name Welcome System
# 1. Define a procedure that takes first and last name parameters and prints the full welcome sentence:


# 2. Allow the user to enter their first and last name, then execute the procedure:

`,
    solutionRegex: [
      `def\\s+`,
      `input\\s*\\(`,
      `print\\s*\\(.*[Ss]o\\s+your\\s+full\\s+name\\s+is`
    ],
    solutionHint: `Define a procedure taking first and last name, collect inputs, then execute:
def greet_fullname(first, last):
    print("So your full name is: " + first + " " + last)

fname = input()
lname = input()
greet_fullname(fname, lname)`,
    expectedInputCount: 2
  },
  {
    id: 'username-length-check',
    title: 'User Portal Verification (Length)',
    subtitle: 'Examine candidate usernames according to length bounds',
    difficulty: 'Medium',
    creditsReward: 270,
    description: `Make a function that takes 1 string as a parameter (USER INPUTTED). The function must check if the username is longer than 5 characters, but less than 15 characters. If it is, the function returns "Valid", if not, then it returns "Invalid".`,
    initialCode: `# Challenge 54: User Portal Verification (Length)
# 1. Make a function taking a candidate username:


# 2. Check length (longer than 5 and less than 15), returning "Valid" or "Invalid":

`,
    solutionRegex: [
      `def\\s+`,
      `len\\s*\\(`,
      `return\\s+["'](Valid|Invalid)["']`
    ],
    solutionHint: `Verify the length using the len() function:
def verify_username(u):
    if len(u) > 5 and len(u) < 15:
        return "Valid"
    else:
        return "Invalid"

user_input = input("Enter username: ")
print(verify_username(user_input))`,
    expectedInputCount: 1
  },
  {
    id: 'username-symbols-check',
    title: 'User Portal Verification (Dodgy Symbols)',
    subtitle: 'Audit usernames for restrictive syntax badges',
    difficulty: 'Hard',
    creditsReward: 290,
    description: `Improve the function from the previous challenge by adding a check for dodgy symbols in the username. The function must return "Invalid" if any of these symbols are found in the string: @ ! #`,
    initialCode: `# Challenge 55: User Portal Verification (Dodgy Symbols)
# 1. Define username checker check for length (between 5 and 15 exclusively):
# 2. Also return "Invalid" if any character contains '@', '!', or '#':

`,
    solutionRegex: [
      `def\\s+`,
      `(@|!|#)`,
      `return\\s+["'](Valid|Invalid)["']`
    ],
    solutionHint: `Check length and ensure dodgy characters are missing:
def verify_strict(u):
    if len(u) <= 5 or len(u) >= 15:
        return "Invalid"
    if "@" in u or "!" in u or "#" in u:
        return "Invalid"
    return "Valid"

print(verify_strict(input()))`,
    expectedInputCount: 1
  },
  {
    id: 'credentials-double-check',
    title: 'Dual Portal Matrix Guard',
    subtitle: 'Verify username and password lengths simultaneously',
    difficulty: 'Hard',
    creditsReward: 330,
    description: `Improve the function from the previous challenge by adding a second parameter for a password. Your checks must now check both username and password, returning one of:\n\n- \`"Valid"\`\n- \`"Username invalid"\`\n- \`"Password Invalid"\`\n- \`"Both username and password invalid"\`\n\n**Note**: The rules for password validity are: must be between 8 and 20 characters long. Keep the username rules from previous challenges.`,
    initialCode: `# Challenge 56: Dual Portal Matrix Guard
# Define a function verifying both username and password parameter lengths, returning correct messages:

`,
    solutionRegex: [
      `def\\s+`,
      `return.*[Uu]sername\\s+invalid`,
      `return.*[Pp]assword\\s+[Ii]nvalid`
    ],
    solutionHint: `Set conditions checking lengths and symbols for both:
def guard(u, p):
    u_ok = len(u) > 5 and len(u) < 15 and "@" not in u and "!" not in u and "#" not in u
    p_ok = len(p) >= 8 and len(p) <= 20
    
    if u_ok and p_ok:
        return "Valid"
    elif not u_ok and not p_ok:
        return "Both username and password invalid"
    elif not u_ok:
        return "Username invalid"
    else:
        return "Password Invalid"`,
    expectedInputCount: 2
  },
  {
    id: 'password-capital-check',
    title: 'Strict Uppercase Password Audit',
    subtitle: 'Perform character case analyses inside passwords',
    difficulty: 'Hard',
    creditsReward: 350,
    description: `Improve the function from the previous challenge by checking if the password has at least 1 capital letter in it. If it does (and passes previous password checks), return \`"Valid"\` else return \`"Invalid"\` (or appropriate invalid labels based on constraints).`,
    initialCode: `# Challenge 57: Strict Uppercase Password Audit
# 1. Add capital checking to password validation:


# 2. Return valid or invalid depending on whether an uppercase letter exists in the password:

`,
    solutionRegex: [
      `isupper\\s*\\(|is_upper|any\\(.*isupper\\(.*`,
      `return\\s+["']`
    ],
    solutionHint: `You can loop through all characters of the password and check if .isupper() returns true:
def has_upper(p):
    for char in p:
        if char.isupper():
            return True
    return False`,
    expectedInputCount: 2
  },
  {
    id: 'graham-biscuits-loop',
    title: 'The Graham Biscuit Echo',
    subtitle: 'Iterate custom slogans with precision loops',
    difficulty: 'Medium',
    creditsReward: 220,
    description: `Create a procedure that outputs the words “Graham has the best biscuits”, and call it from within a while loop. The while loop must iterate exactly 7 times.`,
    initialCode: `# Challenge 58: The Graham Biscuit Echo
# 1. Define a procedure that outputs the slogan:


# 2. Call it from within a while loop that runs exactly 7 times:

`,
    solutionRegex: [
      `def\\s+`,
      `while\\s+`,
      `print\\s*\\(.*[Gg]raham\\s+has\\s+the\\s+best\\s+biscuits`
    ],
    solutionHint: `Keep a loop count index initialized at 0, check count < 7, trigger procedure, increment:
def output_slogan():
    print("Graham has the best biscuits")

i = 0
while i < 7:
    output_slogan()
    i += 1`,
    expectedInputCount: 0
  },
  {
    id: 'animal-array-third',
    title: 'The Menagerie Selector',
    subtitle: 'Query array elements inside custom processes',
    difficulty: 'Easy',
    creditsReward: 200,
    description: `Make an array (list) with 7 elements (the names of 7 animals of your choice). Create a function that passes the array into it as a parameter, then returns the 3rd element of the array when called. Call it, and print the returned value.`,
    initialCode: `# Challenge 59: The Menagerie Selector
# 1. Define a list of 7 animals:


# 2. Create a function that returns the 3rd element (index 2):

`,
    solutionRegex: [
      `def\\s+`,
      `return\\s+.*2`,
      `print\\s*\\(`
    ],
    solutionHint: `Provide your list of animals, index via list[2], and print:
animals = ["Cat", "Dog", "Capybara", "Lion", "Tiger", "Fox", "Bear"]
def select_animal(arr):
    return arr[2]

print(select_animal(animals))`,
    expectedInputCount: 0
  },
  {
    id: 'add-seven-array',
    title: 'Array Addition Vector',
    subtitle: 'Transform an array using additive integers',
    difficulty: 'Hard',
    creditsReward: 300,
    description: `Make an array with 7 integers. Create a function that passes the array into it as a parameter, then adds the value of “7” to each element. Call it, and print the modified array.`,
    initialCode: `# Challenge 60: Array Addition Vector
# 1. Create a list containing 7 integer values:


# 2. Design a function that iterates and adds 7 to each item:

`,
    solutionRegex: [
      `def\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Use a loop to modify each index, or build a new list, then print:
nums = [1, 2, 3, 4, 5, 6, 7]
def add_seven(arr):
    for i in range(len(arr)):
        arr[i] += 7
    return arr

print(add_seven(nums))`,
    expectedInputCount: 0
  },
  {
    id: 'two-number-calc',
    title: 'Functional Calculator',
    subtitle: 'Create arithmetic utilities with targeted branches',
    difficulty: 'Hard',
    creditsReward: 340,
    description: `Make a 2-number calculator:\n\n- Let the user input 2 numbers and choose an operation using if statements (\`"add"\`, \`"multiply"\`, \`"divide"\`, \`"subtract"\`).\n- Create 4 functions - one for each calculation. Each function will accept 2 int parameters and return 1 int.\n- When the user selects their option, print the calculated output format using: \`"Your answer is: RESULT"\``,
    initialCode: `# Challenge 61: Functional Calculator
# Define four separate functions for addition, multiplication, division and subtraction:


# Allow the user to input two inputs and choose an option:

`,
    solutionRegex: [
      `def\\s+`,
      `if\\s+`,
      `print\\s*\\(.*[Yy]our\\s+answer\\s+is`
    ],
    solutionHint: `Make individual functions for maths, get inputs, identify math choice, trigger function and print:
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b): return a // b

num1 = int(input("Num 1: "))
num2 = int(input("Num 2: "))
op = input("Operation: ")
if op == "add":
    print("Your answer is:", add(num1, num2))`,
    expectedInputCount: 3
  },
  {
    id: 'calculator-roids',
    title: 'Calculator on Roids',
    subtitle: 'Encompass calculator execution in active loops',
    difficulty: 'Hard',
    creditsReward: 360,
    description: `Improve your calculator from the previous challenge by using a while loop to make the system constantly allow the user to use the program until they choose to stop (e.g. entering "stop" or "exit").`,
    initialCode: `# Challenge 62: Calculator on Roids
# Encompass the calculator loop within a while construct until termination input:

`,
    solutionRegex: [
      `while\\s+`,
      `def\\s+`
    ],
    solutionHint: `Wrap your operation choice inside a continuous while loop:
active = True
while active:
    choice = input("Option: ")
    if choice == "stop":
        active = False`,
    expectedInputCount: 4
  },
  {
    id: 'barclays-banking-system',
    title: 'Barclays Banking Core',
    subtitle: 'Synthesize a nested-list customer banking environment',
    difficulty: 'Hard',
    creditsReward: 450,
    description: `Make a Barclays Banking system containing these modules:\n\n- **Database**: A 2D array of usernames, passwords, and floats representing balances (define at least 7 users, e.g. \`users = [["john", "p1", 500.50], ...]\`).\n- **loginButton function**: Accepts username and password inputs, matches them against the 2D database array, and outputs \`"login successful"\`.\n- **Check balance**: Returns the balance of the logged-in user.\n- **Deposit**: Modifies the user's balance with addition (amount, username parameters).\n- **Withdrawal**: Modifies the user's balance with subtraction (amount, username parameters).\n- **Control loop**: Runs continuously inside a while loop permitting menu selections (e.g. 1 logs in, 2 withdraws, 3 checks balance, 4 deposits, 0 exits).`,
    initialCode: `# Challenge 63: Barclays Banking Core
# Define the client list (usernames, passwords, balances):
accounts = [
    ["alice", "pass1", 100.0],
    ["bob", "pass2", 250.50],
    ["charlie", "pass3", 50.0],
    ["david", "pass4", 999.0],
    ["eve", "pass5", 1250.0],
    ["frank", "pass6", 5.0],
    ["grace", "pass7", 77.7]
]

# Write banking procedures and outer control loop:

`,
    solutionRegex: [
      `loginButton`,
      `while\\s+`
    ],
    solutionHint: `Build functions updating the database matching index, and update user inputs sequentially inside the control loop.`,
    expectedInputCount: 4
  },
  {
    id: 'spongebob-trio-index',
    title: 'Bikini Bottom Trio',
    subtitle: 'Retrieve selective array items',
    difficulty: 'Easy',
    creditsReward: 180,
    description: `Create an array with the names of 3 SpongeBob characters. Output the name of the 2nd one in the array (remember indexing starts at 0, so the 2nd one is index 1!).`,
    initialCode: `# Challenge 64: Bikini Bottom Trio
# 1. Create a list containing 3 SpongeBob characters:


# 2. Output the 2nd one in the list (index 1):

`,
    solutionRegex: [
      `print\\s*\\(.*\\[1\\]\\s*\\)`
    ],
    solutionHint: `Define your list of SpongeBob characters and print index 1:
names = ["SpongeBob", "Patrick", "Squidward"]
print(names[1])`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-trio-while',
    title: 'Oceanic Loop (WHILE)',
    subtitle: 'Iterate SpongeBob names using a while loop',
    difficulty: 'Easy',
    creditsReward: 190,
    description: `Using your 3 SpongeBob characters array and a WHILE loop, output all of the names in order.`,
    initialCode: `# Challenge 65: Oceanic Loop (WHILE)
characters = ["SpongeBob", "Patrick", "Squidward"]

# Output all names in order using a while loop:

`,
    solutionRegex: [
      `while\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Keep an index initialized at 0, check index < len(characters), print, and increment:
i = 0
while i < len(characters):
    print(characters[i])
    i += 1`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-trio-for',
    title: 'Oceanic Loop (FOR)',
    subtitle: 'Iterate SpongeBob names using a for loop',
    difficulty: 'Easy',
    creditsReward: 180,
    description: `Using your 3 SpongeBob characters array and a FOR loop, output all of the names in order.`,
    initialCode: `# Challenge 66: Oceanic Loop (FOR)
characters = ["SpongeBob", "Patrick", "Squidward"]

# Output all names in order using a for loop:

`,
    solutionRegex: [
      `for\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Use a simple for loop to iterate over the array characters:
for character in characters:
    print(character)`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-nephew',
    title: 'Mr Krabs Nephew Update',
    subtitle: 'Update elements at runtime inside lists',
    difficulty: 'Medium',
    creditsReward: 240,
    description: `Using an array of 3 SpongeBob characters, during runtime, change the value of whatever is in index 2 of your array to "Mr Krabs Nephew – Graham" and output the value before and after the change.`,
    initialCode: `# Challenge 67: Mr Krabs Nephew Update
characters = ["SpongeBob", "Patrick", "Squidward"]

# 1. Output index 2 of your array:


# 2. Modify index 2 to "Mr Krabs Nephew – Graham":


# 3. Output index 2 again:

`,
    solutionRegex: [
      `print\\s*\\(.*\\[2\\]\\s*\\)`,
      `\\[2\\]\\s*=\\s*["']Mr\\s+Krabs\\s+Nephew\\s*–\\s*Graham["']`
    ],
    solutionHint: `Print characters[2], assign a new string with index 2, then print characters[2] again:
print(characters[2])
characters[2] = "Mr Krabs Nephew – Graham"
print(characters[2])`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-backwards-decology',
    title: 'Ocean Floor Decology (Backwards)',
    subtitle: 'Loop an array backwards utilizing while',
    difficulty: 'Medium',
    creditsReward: 260,
    description: `Update your array to contain the names of 10 SpongeBob characters. Using your while loop and the EXACT SAME array from before, output the array BACKWARDS (e.g. indexing starting at 9 down to 0).`,
    initialCode: `# Challenge 68: Ocean Floor Decology (Backwards)
# Update this list to contain exactly 10 SpongeBob characters:
characters = [
    "SpongeBob", "Patrick", "Squidward", "Sandy", "Mr. Krabs",
    "Plankton", "Gary", "Pearl", "Karen", "Mrs. Puff"
]

# Use a while loop to output the characters backwards:

`,
    solutionRegex: [
      `while\\s+`,
      `print\\s*\\(`
    ],
    solutionHint: `Set an index starting at the maximum index (len(characters) - 1), use while index >= 0, print, and decrement:
i = len(characters) - 1
while i >= 0:
    print(characters[i])
    i -= 1`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-even-indexes',
    title: 'Parity Marine Indexing',
    subtitle: 'Only output names of even indices',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Continuing from the previous one, only output the names of even number indexes of your 10 SpongeBob characters. E.g. 0, 2, 4, 6, 8 etc.`,
    initialCode: `# Challenge 69: Parity Marine Indexing
characters = [
    "SpongeBob", "Patrick", "Squidward", "Sandy", "Mr. Krabs",
    "Plankton", "Gary", "Pearl", "Karen", "Mrs. Puff"
]

# Output only the characters at even indices (0, 2, 4, etc.):

`,
    solutionRegex: [
      `print\\s*\\(`
    ],
    solutionHint: `Iterate through the array and print elements at even indices using a loop or stride slice:
for i in range(0, len(characters), 2):
    print(characters[i])`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-weight-grid',
    title: 'Rotund Marine Matrix',
    subtitle: 'Store character names and weights in a 2D array',
    difficulty: 'Medium',
    creditsReward: 250,
    description: `Create a 2D array of 5 SpongeBob characters names and their weight in kilograms. Then, use a pair of nested for loops to output every element in the 2D array.`,
    initialCode: `# Challenge 70: Rotund Marine Matrix
# Create a 2D array of 5 SpongeBob characters and their weight in kg:


# Use a pair of nested for loops to output every single item in the 2D array:

`,
    solutionRegex: [
      `for\\s+`,
      `for\\s+`
    ],
    solutionHint: `Create a 2D list and iterate using row and column loops:
data = [["SpongeBob", 5.0], ["Patrick", 15.0], ["Mr. Krabs", 160.0], ["Sandy", 8.0], ["Squidward", 12.0]]
for row in data:
    for item in row:
        print(item)`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-chunky-fish',
    title: 'The Chunky Filter',
    subtitle: 'Examine weight thresholds during matrix outputs',
    difficulty: 'Hard',
    creditsReward: 290,
    description: `Use the same for loops as before with the 2D array of Spongebob characters and weights. Modify it so that: Whenever it outputs a character, if they weigh more than 150KG, the program says “Who’s a chunky fish?” before outputting their name.`,
    initialCode: `# Challenge 71: The Chunky Filter
# Use your 2D array with 5 characters and weights:
characters = [
    ["SpongeBob", 5.0],
    ["Patrick", 12.0],
    ["Mr. Krabs", 155.0],
    ["Sandy", 8.0],
    ["Squidward", 20.0]
]

# Output names, check if weight > 150, say "Who’s a chunky fish?" if true:

`,
    solutionRegex: [
      `if\\s+`,
      `print\\s*\\(.*Who.*chunky.*`
    ],
    solutionHint: `Loop through each sublist, check if weight (sublist[1]) > 150, dynamic print if true:
for c in characters:
    if c[1] > 150:
        print("Who’s a chunky fish?")
    print(c[0])`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-ocean-population',
    title: 'Bikini Bottom Random population',
    subtitle: 'Generate 1000 random character instances',
    difficulty: 'Hard',
    creditsReward: 380,
    description: `Use a combination of iteration and randomness to create 1000 instances of random SpongeBob characters (just names this time). Put these into a 1D array, then use a for loop to output the entire array of 1000 items in a structured fashion.\n\n**Hints**:\n- Import \`random\` and use \`random.randint()\` or \`random.choice()\`.\n- Setup a sample name list of characters to pick from.\n- Use a while loop with a counter to populate the 1000-items array.`,
    initialCode: `# Challenge 72: Bikini Bottom Random population
# Create a 1D list of 1000 random SpongeBob character names, then print them in a structured fashion:

`,
    solutionRegex: [
      `import\\s+random`,
      `print\\s*\\(`
    ],
    solutionHint: `Define a small list of characters to choose from, iterate 1000 times appending a random choice, and print:
import random
pool = ["SpongeBob", "Patrick", "Squidward", "Sandy", "Mr. Krabs"]
population = []
i = 0
while i < 1000:
    choice = pool[random.randint(0, len(pool)-1)]
    population.append(choice)
    i += 1

for p in population:
    print(p)`,
    expectedInputCount: 0
  },
  {
    id: 'spongebob-population-ages',
    title: 'Bikini Bottom Population Demographics',
    subtitle: 'Generate 1000 random 2D character-age instances',
    difficulty: 'Hard',
    creditsReward: 400,
    description: `Create a 1000-item 2D array containing random SpongeBob character names paired with a random age (e.g. from 1 to 100). Use a loop to populate and output the array in a structured fashion.`,
    initialCode: `# Challenge 73: Bikini Bottom Population Demographics
# Use a combination of iteration and randomness to create a 2D array of 1000 entries (name, age), then print:

`,
    solutionRegex: [
      `import\\s+random`,
      `print\\s*\\(`
    ],
    solutionHint: `Define a small name list pool, loop 1000 times choosing a name and a random age, insert into 2D array and print:
import random
pool = ["SpongeBob", "Patrick", "Squidward", "Sandy"]
pop_ages = []
for i in range(1000):
    name = pool[random.randint(0, len(pool)-1)]
    age = random.randint(1, 100)
    pop_ages.append([name, age])

for p in pop_ages:
    print(p[0], "is", p[1], "years old")`,
    expectedInputCount: 0
  }
];

export const ALL_CREATIVE_TASKS: CreativeTask[] = [
  ...CREATIVE_TASKS.map(t => ({ ...t, section: 'standard' as const })),
  ...ADVANCED_CREATIVE_TASKS.map(t => ({ ...t, section: 'advanced' as const }))
];

export default function CreativeChallenges({ onBackToMain, onRewardCredits, currentCredits, userInterest, activeTheme }: CreativeChallengesProps) {
  // Theme titles & badges
  const getThemeDetails = () => {
    const rawInterest = (userInterest || activeTheme?.value || '').toLowerCase().trim();
    if (rawInterest.includes('simpson')) {
      return {
        title: "SPRINGFIELD CREATIVE LAB",
        subtitle: "Apu's automated Kwik-E-Mart inventory systems",
        iconColor: "text-amber-400",
        accentColor: "var(--primary)",
        badge: "🍩 APU APPROVED"
      };
    }
    if (rawInterest.includes('marvel')) {
      return {
        title: "STARK IND. QUANTUM CORE",
        subtitle: "Write custom Jarvis algorithms and shield codes",
        iconColor: "text-red-500",
        accentColor: "var(--primary)",
        badge: "🦸 STARK VERIFIED"
      };
    }
    if (rawInterest.includes('star wars') || rawInterest.includes('starwars')) {
      return {
        title: "JEDI ACADEMY TELEMETRY LAB",
        subtitle: "Droid instructions and navigation systems",
        iconColor: "text-emerald-400",
        accentColor: "var(--primary)",
        badge: "🌌 JEDI ARCHIVE"
      };
    }
    if (rawInterest.includes('space') || rawInterest.includes('void')) {
      return {
        title: "DEEP SPACE SCIENTIFIC HUB",
        subtitle: "Orbital flight plans and stellar calculations",
        iconColor: "text-sky-400",
        accentColor: "var(--primary)",
        badge: "🚀 GALACTIC DECK"
      };
    }
    if (rawInterest.includes('football') || rawInterest.includes('sport')) {
      return {
        title: "CAMP NOU STRATEGY DECK",
        subtitle: "Player fitness rosters and match tactical layouts",
        iconColor: "text-green-400",
        accentColor: "var(--primary)",
        badge: "⚽ LA LIGA SYSTEM"
      };
    }
    if (rawInterest.includes('music') || rawInterest.includes('beat')) {
      return {
        title: "MPC SECTOR SEQUENCING",
        subtitle: "Customize looping frequencies and synthesizer loops",
        iconColor: "text-orange-500",
        accentColor: "var(--primary)",
        badge: "🎵 AUDIO SYNCED"
      };
    }
    if (rawInterest.includes('fantasy') || rawInterest.includes('magic') || rawInterest.includes('mystic')) {
      return {
        title: "ARCANE PARCHMENT LAB",
        subtitle: "Synthesizing magic formulas and spell matrices-",
        iconColor: "text-purple-400",
        accentColor: "var(--primary)",
        badge: "🔮 MAGUS SYSTEM"
      };
    }
    if (rawInterest.includes('roblox') || rawInterest.includes('block') || rawInterest.includes('obby')) {
      return {
        title: "ROBLOX STUDIO SCRIPT CORE",
        subtitle: "Design complete mechanics for multiplayer games",
        iconColor: "text-red-500",
        accentColor: "var(--primary)",
        badge: "🎮 STUDIO ACTIVE"
      };
    }
    if (rawInterest.includes('cyberpunk') || rawInterest.includes('hack')) {
      return {
        title: "NIGHT CITY RETRO SUBSET",
        subtitle: "Megabuilding safehouse console script modules",
        iconColor: "text-yellow-400",
        accentColor: "var(--primary)",
        badge: "💾 MATRIX SECTOR"
      };
    }
    if (rawInterest.includes('dc') || rawInterest.includes('bat')) {
      return {
        title: "WAYNETECH EXPERIMENTAL LAB",
        subtitle: "Tactical armor diagnostic simulation scripts",
        iconColor: "text-blue-400",
        accentColor: "var(--primary)",
        badge: "🦇 BATMAN OS"
      };
    }
    return {
      title: "CREATIVE_CHALLENGES.py",
      subtitle: "Write custom scripts from scratch. Design full streams.",
      iconColor: "text-cyber-cyan",
      accentColor: "var(--primary)",
      badge: "CREATIVE DECK"
    };
  };

  const themeDetails = getThemeDetails();

  const [selectedSection, setSelectedSection] = useState<'all' | 'standard' | 'advanced'>('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<CreativeTask>(ALL_CREATIVE_TASKS[0]);
  const [userCode, setUserCode] = useState(selectedTask.initialCode);

  const filteredTasks = ALL_CREATIVE_TASKS.filter(task => {
    const matchesSection = selectedSection === 'all' || (task.section || 'standard') === selectedSection;
    if (!matchesSection) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(q) ||
      task.subtitle.toLowerCase().includes(q) ||
      task.difficulty.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q)
    );
  });

  const handleSelectSection = (section: 'all' | 'standard' | 'advanced') => {
    setSelectedSection(section);
    const pool = section === 'all' 
      ? ALL_CREATIVE_TASKS 
      : ALL_CREATIVE_TASKS.filter(t => (t.section || 'standard') === section);
    if (pool.length > 0 && !pool.some(t => t.id === selectedTask.id)) {
      loadChallenge(pool[0]);
    }
  };
  const [compileLogs, setCompileLogs] = useState<string[]>([
    '>>> INITIALIZING CREATIVE PROGRAMMING MAIN MATRIX...',
    '>>> SELECT A CHALLENGE AND COMPILE YOUR OWN SENSE PROTOCOL.'
  ]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number }[]>([]);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('py_creative_completed_challenges');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [simulationInputs, setSimulationInputs] = useState<string[]>([]);
  const [currentSimIndex, setCurrentSimIndex] = useState(0);
  const [isAwaitingInput, setIsAwaitingInput] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState('Type your input here...');
  const [liveInputValue, setLiveInputValue] = useState('');
  const [editorFontSize, setEditorFontSize] = useState(13);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    loadChallenge(selectedTask);
  }, [selectedTask]);

  const loadChallenge = (task: CreativeTask) => {
    setSelectedTask(task);
    setUserCode(task.initialCode);
    setSuccess(null);
    setShowCelebration(false);
    setConfetti([]);
    setSimulationInputs([]);
    setCurrentSimIndex(0);
    setIsAwaitingInput(false);
    setCompileLogs([
      `>>> MOUNTED SECURE GRID WORKSPACE: ${task.title.toUpperCase()}`,
      `>>> CLASSIFICATION: ${task.difficulty.toUpperCase()} CREATIVE TARGET.`,
      `>>> PAYLOAD INCENTIVE: +${task.creditsReward} CYBER CREDITS.`
    ]);
  };

  const playBeep = (freq: number, type: OscillatorType = 'sine', duration = 0.15) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context beep error", e);
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    playBeep(440, 'triangle', 0.2);
    setTimeout(() => playBeep(554, 'triangle', 0.2), 150);
    setTimeout(() => playBeep(659, 'triangle', 0.2), 300);
    setTimeout(() => playBeep(880, 'sine', 0.4), 450);

    const colors = ['#00f2ff', '#ff007f', '#a9b1d6', '#f59e0b', '#10b981'];
    const list = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
      delay: Math.random() * 0.5
    }));
    setConfetti(list);
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Python highlighting function inside client environment
  const highlightPython = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, lineIdx) => {
      if (!line.length) {
        return (
          <div 
            key={lineIdx} 
            className="select-none shadow-none text-transparent" 
            style={{ height: `${editorFontSize + 10}px` }}
          >
            {" "}
          </div>
        );
      }

      const segments: React.ReactNode[] = [];
      const hashIndex = line.indexOf('#');
      let codePart = line;
      let commentPart = '';

      if (hashIndex !== -1) {
        codePart = line.slice(0, hashIndex);
        commentPart = line.slice(hashIndex);
      }

      const words = codePart.split(/(\s+|,|\(|\)|\[|\]|=|\+|\*|%|\.[a-zA-Z_]\w*|:|"|')/);
      let inString = false;
      let stringChar = '';
      let currentStr = '';

      for (let i = 0; i < words.length; i++) {
        const item = words[i];

        if (inString) {
          currentStr += item;
          if (item === stringChar) {
            segments.push(<span key={i} className="text-[#9ece6a]">{currentStr}</span>);
            inString = false;
            currentStr = '';
          }
          continue;
        }

        if (item === '"' || item === "'") {
          inString = true;
          stringChar = item;
          currentStr = item;
          continue;
        }

        // Standard Python syntax tokens
        if (/^(if|else|elif|while|for|def|return|import|as|in)$/.test(item)) {
          segments.push(<span key={i} className="text-[#bb9af0]">{item}</span>);
        } else if (/^(print|input|len|range|int|str|float)$/.test(item)) {
          segments.push(<span key={i} className="text-[#7dcfff]">{item}</span>);
        } else if (/^(True|False|None)$/.test(item)) {
          segments.push(<span key={i} className="text-[#ff9e64]">{item}</span>);
        } else if (/^\d+$/.test(item)) {
          segments.push(<span key={i} className="text-[#ff9e64]">{item}</span>);
        } else if (item.trim() && !/^[a-zA-Z_]\w*$/.test(item)) {
          // Operators & punctuations
          segments.push(<span key={i} className="text-[#89ddff]">{item}</span>);
        } else {
          // Variables & identifiers
          segments.push(<span key={i} className="text-[#a9b1d6]">{item}</span>);
        }
      }

      if (inString) {
        segments.push(<span key="stray-str" className="text-[#9ece6a]">{currentStr}</span>);
      }

      if (commentPart) {
        segments.push(<span key="comment" className="text-[#565f89]">{commentPart}</span>);
      }

      return (
        <div 
          key={lineIdx} 
          className="flex items-center whitespace-pre font-mono"
          style={{ height: `${editorFontSize + 10}px` }}
        >
          {segments}
        </div>
      );
    });
  };

  const handleProgramExecution = (overrideInputs?: string[]) => {
    const inputsToUse = overrideInputs !== undefined ? overrideInputs : simulationInputs;
    
    // Process code execution
    const codeToRun = userCode;
    playBeep(220, 'sine', 0.1);

    setCompileLogs(prev => [
      ...prev,
      `>>> COMPUTING INSTRUCTIONS FOR ${selectedTask.title.toUpperCase()}...`,
      `>>> RUNTIME INITIATED.`
    ]);

    // Use our highly-capable local python interpreter
    const runResult: any = validateCodeLocally(codeToRun, selectedTask.solutionRegex, inputsToUse);

    // If interpreter requests input
    if (runResult.awaitingInput) {
      setIsAwaitingInput(true);
      setInputPlaceholder(runResult.lastPrompt || 'Enter telemetry packet:');
      setCompileLogs(prev => [
        ...prev,
        ...runResult.output,
        `🔑 [INPUT REQUIRED]: ${runResult.lastPrompt || 'Enter value'}`
      ]);
      setTimeout(() => inputFieldRef.current?.focus(), 80);
      return;
    }

    // Complete run outputs
    const fullOutputLogs = [...runResult.output];
    
    // Evaluate if correct using lenient regex protocols against both code and executed output
    let matchesAllRegex = true;
    const combinedOutput = fullOutputLogs.join('\n');
    for (const regexStr of selectedTask.solutionRegex) {
      try {
        const regex = typeof regexStr === 'string' ? new RegExp(regexStr, 'mi') : regexStr;
        if (!testWithRelaxedRegex(regex, codeToRun)) {
          // Output fallback: check if the executed output satisfies the pattern
          let outputMatched = false;
          try {
            outputMatched = testWithRelaxedRegex(regex, combinedOutput) || regex.test(combinedOutput);
          } catch (e) {
            outputMatched = false;
          }
          if (!outputMatched) {
            matchesAllRegex = false;
            break;
          }
        }
      } catch (e) {
        matchesAllRegex = false;
        break;
      }
    }

    // Double check specific conditions for Go-Kart Registration
    if (selectedTask.id === 'gokart-registration') {
      const inputOccurrences = (codeToRun.match(/input\s*\(/g) || []).length;
      if (inputOccurrences < 6) {
        matchesAllRegex = false;
        fullOutputLogs.push(`❌ ERROR: The registration hub collects 6 unique fields. Your program only contains ${inputOccurrences} input() collectors.`);
      }
    }

    const logsToAppend = [
      ...runResult.output,
      `>>> RUNTIME COMPLETED.`
    ];

    if (matchesAllRegex && !runResult.errors?.length) {
      logsToAppend.push(`✅ PIPELINE VERIFIED! LOGIC ACCORDS WITH RULES.`);
      setSuccess(true);
      
      const isAlreadyDone = completedChallengeIds.includes(selectedTask.id);
      if (!isAlreadyDone) {
        onRewardCredits(selectedTask.creditsReward);
        const nextCompleted = [...completedChallengeIds, selectedTask.id];
        setCompletedChallengeIds(nextCompleted);
        try {
          localStorage.setItem('py_creative_completed_challenges', JSON.stringify(nextCompleted));
        } catch {}
        logsToAppend.push(`💰 SECURE DEPOSIT SUCCESS: +${selectedTask.creditsReward} Cyber Credits cataloged in your account!`);
      }
      triggerCelebration();
    } else {
      logsToAppend.push(`❌ ERROR IN TARGET VERIFICATION FEED.`);
      if (runResult.errors && runResult.errors.length > 0) {
        runResult.errors.forEach((err: any) => {
          logsToAppend.push(`   [LINE ${err.line}]: ${err.message}`);
        });
      }
      logsToAppend.push(`>>> SUGGESTION: ${selectedTask.solutionHint}`);
      setSuccess(false);
      playBeep(120, 'square', 0.45);
    }

    setCompileLogs(prev => [...prev, ...logsToAppend]);
    setIsAwaitingInput(false);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveInputValue.trim()) return;

    const nextInputs = [...simulationInputs, liveInputValue.trim()];
    setSimulationInputs(nextInputs);
    setCompileLogs(prev => [...prev, `> ${liveInputValue.trim()}`]);
    setLiveInputValue('');
    
    // Evaluate logic again with updated input buffers
    handleProgramExecution(nextInputs);
  };

  const handleNextChallenge = () => {
    const pool = filteredTasks.length > 0 ? filteredTasks : ALL_CREATIVE_TASKS;
    const currentIdx = pool.findIndex(t => t.id === selectedTask.id);
    if (currentIdx !== -1 && currentIdx + 1 < pool.length) {
      loadChallenge(pool[currentIdx + 1]);
    } else if (pool.length > 0) {
      loadChallenge(pool[0]);
    }
  };

  const resetSandbox = () => {
    setUserCode(selectedTask.initialCode);
    setSuccess(null);
    setShowCelebration(false);
    setConfetti([]);
    setSimulationInputs([]);
    setCurrentSimIndex(0);
    setIsAwaitingInput(false);
    setCompileLogs([
      `>>> RELOADED SECURE GRID TASK: ${selectedTask.title.toUpperCase()}`,
      `>>> STORAGE STATE CLEARED.`,
      `>>> STANDBY INDENTATION STREAM...`
    ]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-[#a9b1d6] font-sans relative" data-theme={activeTheme?.value}>
      {/* Cyber Ambient Grid Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      
      {/* Confetti Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 1, x: `${c.x}vw`, y: `${c.y}vh` }}
                animate={{
                  y: '120vh',
                  rotate: [0, 360, 720],
                  x: [`${c.x}vw`, `${c.x + (Math.random() * 10 - 5)}vw`]
                }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  delay: c.delay,
                  ease: 'easeOut'
                }}
                className="absolute rounded-sm"
                style={{
                  width: c.size,
                  height: c.size,
                  backgroundColor: c.color,
                  boxShadow: `0 0 10px ${c.color}`
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Top Header Controls */}
      <header className="h-14 border-b border-[#1a1b26] bg-[#0c0e1a]/95 backdrop-blur px-6 flex items-center justify-between z-40 select-none">
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
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
            <h1 className="text-sm font-black text-white hover:brightness-110 tracking-widest uppercase font-mono">
              {themeDetails.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-[#1a1b26]">
            <Award className="w-3.5 h-3.5 text-[var(--secondary)]" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">REWARD SCHEDULING</span>
          </div>

          <div className="flex items-center gap-1.5 bg-cyber-cyan/10 border border-cyber-cyan/30 px-3 py-1.5 rounded-lg">
            <Coins className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span className="text-xs font-black font-mono text-[var(--primary)]">{currentCredits}</span>
            <span className="text-[8px] font-mono text-[var(--primary)]/60 uppercase tracking-widest">CREDITS</span>
          </div>
        </div>
      </header>

      {/* Main Interface Split Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Challenge Navigation and Descriptions */}
        <aside className="w-84 border-r border-[#1a1b26] bg-[#0c0e1a]/90 backdrop-blur p-4 flex flex-col gap-3.5 overflow-hidden shrink-0">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-white font-black text-[13px] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <BookOpen className="w-3.5 h-3.5 text-[var(--secondary)]" />
                {themeDetails.badge}
              </h2>
              <span className="text-[9px] font-mono text-slate-500 font-bold px-1.5 py-0.5 rounded bg-black/40 border border-slate-800">
                {ALL_CREATIVE_TASKS.length} PROTOCOLS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">Write your own Python files from scratch. Design algorithms and solve objectives.</p>
          </div>

          {/* Section Selection Tabs */}
          <div className="flex bg-black/60 p-1 rounded-xl border border-slate-800/80 gap-1 select-none">
            <button
              type="button"
              onClick={() => handleSelectSection('standard')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedSection === 'standard'
                  ? 'bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <BookOpen className="w-3 h-3 shrink-0" />
              <span>CORE</span>
              <span className="text-[8.5px] px-1 py-0.2 rounded bg-black/50 text-slate-400 font-bold border border-slate-800">
                {CREATIVE_TASKS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectSection('advanced')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedSection === 'advanced'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Flame className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
              <span>ADVANCED</span>
              <span className="text-[8.5px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                {ADVANCED_CREATIVE_TASKS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectSection('all')}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedSection === 'all'
                  ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
              }`}
              title="Show all challenges"
            >
              <span>ALL</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                selectedSection === 'advanced' 
                  ? "Search advanced protocols..." 
                  : selectedSection === 'standard' 
                  ? "Search core challenges..." 
                  : "Search all challenges..."
              }
              className="w-full bg-black/40 border border-slate-800/80 rounded-xl pl-8 pr-7 py-1.5 text-[11px] font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyber-cyan/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Advanced Section Notice Banner */}
          {selectedSection === 'advanced' && (
            <div className="p-2.5 bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-transparent border border-amber-500/30 rounded-xl flex items-center gap-2.5 text-left">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span>Advanced Computer Science</span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono leading-tight truncate">
                  Algorithms, Stacks, OOP, Cryptography & Math
                </div>
              </div>
            </div>
          )}

          {/* Challenges List */}
          <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto pr-1">
            {filteredTasks.length === 0 ? (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-slate-500">
                  <Search className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-slate-400">No matching challenges found</div>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedSection('all'); }}
                  className="text-[10px] font-mono text-cyber-cyan hover:underline"
                >
                  Reset filters & search
                </button>
              </div>
            ) : (
              filteredTasks.map((task, idx) => {
                const isSelected = selectedTask.id === task.id;
                const isCompleted = completedChallengeIds.includes(task.id);
                const isAdvanced = task.section === 'advanced';

                let badgeColor = 'bg-slate-900 border-slate-800 text-slate-400';
                if (isCompleted) {
                  badgeColor = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
                } else if (task.difficulty === 'Expert') {
                  badgeColor = 'bg-rose-500/20 border-rose-500/40 text-rose-300';
                } else if (task.difficulty === 'Hard') {
                  badgeColor = 'bg-amber-500/20 border-amber-500/40 text-amber-300';
                } else if (isSelected) {
                  badgeColor = 'bg-cyber-cyan/15 border-cyber-cyan/30 text-cyber-cyan';
                }

                const seqLabel = isAdvanced 
                  ? `ADV_0${idx + 1}` 
                  : `SEQ_0${idx + 1}`;

                return (
                  <button
                    key={task.id}
                    onClick={() => loadChallenge(task)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1 cursor-pointer bg-transparent shrink-0 ${
                      isSelected 
                        ? isAdvanced
                          ? 'bg-gradient-to-r from-amber-500/10 to-rose-500/10 border-amber-500/50 shadow-[0_0_18px_rgba(245,158,11,0.25)]'
                          : 'bg-gradient-to-r from-cyber-cyan/5 to-cyber-pink/5 border-cyber-cyan/40 shadow-[0_0_15px_var(--primary-glow)]' 
                        : isAdvanced
                          ? 'border-amber-500/20 hover:bg-amber-500/5 hover:border-amber-500/40'
                          : 'border-[#1a1b26] hover:bg-slate-900/40 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-500 select-none">{seqLabel}</span>
                        {isAdvanced && (
                          <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider">
                            PRO
                          </span>
                        )}
                      </div>
                      <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-1.5 py-0.5 rounded border ${badgeColor}`}>
                        {isCompleted ? 'VERIFIED' : task.difficulty}
                      </span>
                    </div>

                    <h3 className={`text-xs font-black uppercase tracking-tight leading-snug truncate ${
                      isSelected ? 'text-white' : isAdvanced ? 'text-amber-100/90' : 'text-slate-400'
                    }`}>
                      {task.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 hover:text-slate-400 leading-normal truncate block">
                      {task.subtitle}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-auto border-t border-slate-900 pt-3 flex flex-col gap-2">
            <div className="p-3 bg-black/40 border border-slate-900 rounded-xl">
              <h4 className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{selectedSection === 'advanced' ? 'ADVANCED PROTOCOLS' : 'COMPASS RULES'}</span>
                {selectedSection === 'advanced' && <Flame className="w-3 h-3 text-amber-400" />}
              </h4>
              <ul className="text-[9.5px] text-slate-600 leading-relaxed list-disc list-inside">
                {selectedSection === 'advanced' ? (
                  <>
                    <li>Focus on algorithmic logic & efficiency</li>
                    <li>Design functions, loops & data structures</li>
                    <li>Test edge cases directly in the terminal</li>
                  </>
                ) : (
                  <>
                    <li>No boilerplate layout required</li>
                    <li>Verify your print matching outputs</li>
                    <li>Interact directly via console prompt</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </aside>

        {/* Right Frame Components */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#090b16]">
          
          {/* Left panel: Information, Instructions and Code Editor */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-[#1a1b26]">
            
            {/* Task Info Panel */}
            <div className="p-6 border-b-2 border-cyber-cyan/30 bg-cyber-cyan/[0.04] shadow-[0_4px_30px_rgba(6,182,212,0.12)] relative overflow-hidden pl-8 sm:pl-9 select-text">
              <div className={`absolute left-0 top-0 bottom-0 w-[5px] shadow-[0_0_15px_var(--primary-glow)] ${
                selectedTask.section === 'advanced' ? 'bg-amber-400' : 'bg-cyber-cyan'
              }`} />
              <div className="absolute top-0 right-0 p-4 opacity-[0.04] pointer-events-none select-none">
                <Terminal className="w-32 h-32 text-cyber-cyan" />
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      selectedTask.section === 'advanced' ? 'bg-amber-400' : 'bg-cyber-cyan'
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                      selectedTask.section === 'advanced' ? 'bg-amber-400' : 'bg-cyber-cyan'
                    }`}></span>
                  </span>
                  <span className="px-2.5 py-0.5 bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan text-[10px] font-mono font-black rounded uppercase tracking-widest selection:bg-white selection:text-cyber-cyan">
                    OBJECTIVE FIELD
                  </span>
                  {selectedTask.section === 'advanced' && (
                    <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-black rounded uppercase tracking-widest flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      ADVANCED LAB
                    </span>
                  )}
                  <span className="text-slate-700">|</span>
                  <span className="text-slate-400 font-mono text-[10.5px] uppercase tracking-wider">REWARD: +{selectedTask.creditsReward} CC</span>
                  <span className="text-slate-700">|</span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    selectedTask.difficulty === 'Expert'
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : selectedTask.difficulty === 'Hard'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan'
                  }`}>
                    {selectedTask.difficulty}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2 font-mono glow-text">
                  {selectedTask.title}
                </h2>
                
                <div className="text-sm text-slate-100 leading-relaxed font-semibold whitespace-pre-wrap selection:bg-cyber-cyan/30">
                  {selectedTask.description}
                </div>
              </div>
            </div>

            {/* High-fidelity Code Editor Header */}
            <div className="h-10 px-5 border-b border-[#1a1b26] bg-[#0c0e1a]/60 backdrop-blur flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyber-pink" />
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">
                  Active_Scriptfile_Workspace
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Font control */}
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setEditorFontSize(f => Math.max(11, f - 1))}
                    className="w-5 h-5 bg-black/40 border border-[#1a1b26] hover:bg-slate-900 rounded flex items-center justify-center font-mono text-slate-500 hover:text-white text-[10px] transition-colors cursor-pointer"
                    title="Shrink font size"
                  >
                    -
                  </button>
                  <span className="text-[8.5px] font-mono text-slate-600 font-bold px-1 select-none">
                    {editorFontSize}PX
                  </span>
                  <button 
                    onClick={() => setEditorFontSize(f => Math.min(18, f + 1))}
                    className="w-5 h-5 bg-black/40 border border-[#1a1b26] hover:bg-slate-900 rounded flex items-center justify-center font-mono text-slate-500 hover:text-white text-[10px] transition-colors cursor-pointer"
                    title="Grow font size"
                  >
                    +
                  </button>
                </div>

                <div className="h-3 w-px bg-[#1a1b26]" />

                <button 
                  onClick={resetSandbox}
                  className="px-2.5 py-1 text-[9.5px] font-mono bg-slate-900 border border-[#2a2c3f]/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reset code editor to initial setup template"
                >
                  <Undo2 className="w-3 h-3" />
                  <span>RESET FILE</span>
                </button>
              </div>
            </div>

            {/* DUAL LAYER SYNTAX EDITING FIELD */}
            <div className="flex-1 relative overflow-hidden font-mono bg-[#070913] flex">
              {/* LINE NUMBERS GUTTER */}
              <div 
                ref={gutterRef}
                className="w-12 h-full bg-[#090b16]/60 border-r border-[#1a1b26]/50 text-right pr-3 select-none pointer-events-none text-slate-500 flex flex-col pt-5 overflow-hidden font-mono shrink-0"
                style={{ 
                  fontSize: `${Math.max(10, editorFontSize - 2)}px`,
                  lineHeight: `${editorFontSize + 10}px`
                }}
              >
                {userCode.split('\n').map((_, idx) => (
                  <div key={idx} style={{ height: `${editorFontSize + 10}px` }} className="flex items-center justify-end">
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* EDITOR CONTAINER */}
              <div className="flex-1 relative overflow-hidden h-full">
                <div 
                  ref={highlightRef}
                  className="absolute inset-0 p-5 pointer-events-none select-none whitespace-pre overflow-hidden font-mono tracking-normal"
                  style={{ 
                    tabSize: 4, 
                    fontSize: `${editorFontSize}px`,
                    lineHeight: `${editorFontSize + 10}px`
                  }}
                >
                  {highlightPython(userCode)}
                </div>
                
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
                  className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-[#00f2ff] outline-none border-none p-5 selection:bg-cyan-500/20 resize-none font-mono tracking-normal whitespace-pre overflow-auto focus:ring-0 focus:outline-none"
                  style={{ 
                    tabSize: 4, 
                    fontSize: `${editorFontSize}px`,
                    lineHeight: `${editorFontSize + 10}px`
                  }}
                  spellCheck="false"
                  aria-label="Code input box"
                />
              </div>
            </div>
            
            {/* Compile/Run buttons row */}
            <div className="p-4 bg-[#0a0c16] border-t border-[#1a1b26] flex items-center gap-3">
              <button
                onClick={() => {
                  setSimulationInputs([]);
                  handleProgramExecution([]);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-[#00f2ff] to-blue-600 border border-cyan-400 hover:brightness-110 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current text-black" />
                <span>COMPILE & RUN PROGRAM</span>
              </button>
            </div>
          </div>

          {/* Right panel: Terminal execution window & simulation feedbacks */}
          <div className="md:w-96 flex flex-col overflow-hidden bg-[#0a0c16]">
            {/* Terminal Header */}
            <div className="h-10 px-5 border-b border-[#1a1b26] bg-[#0c0e1a]/60 backdrop-blur-md flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">
                  Py-Logic_Host_Process
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-wider">SECURE GRID</span>
              </div>
            </div>

            {/* Debug Console Logs */}
            <div 
              ref={terminalRef}
              className="flex-1 p-5 font-mono text-xs overflow-y-auto space-y-2.5 scrollbar-thin flex flex-col leading-snug"
            >
              <div className="space-y-1">
                {compileLogs.map((log, idx) => {
                  let textStyle = 'text-slate-450';
                  if (log.startsWith('✅')) textStyle = 'text-[#10b981] font-bold';
                  else if (log.startsWith('❌') || log.startsWith('🚨') || log.indexOf('ERROR') !== -1) textStyle = 'text-[#ff007f] font-bold';
                  else if (log.startsWith('>>>')) textStyle = 'text-slate-500';
                  else if (log.startsWith('💰') || log.startsWith('💎')) textStyle = 'text-[#f59e0b] font-bold';
                  else if (log.startsWith('🔑')) textStyle = 'text-[#00f2ff] animate-pulse font-medium';
                  else if (log.startsWith('>')) textStyle = 'text-[#a9b1d6] font-bold italic pl-2';

                  return (
                    <div 
                      key={idx} 
                      className={`break-words whitespace-pre-wrap text-left ${textStyle}`}
                    >
                      {log}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Interactive Input Field */}
              {isAwaitingInput && (
                <form 
                  onSubmit={handleInputSubmit}
                  className="mt-2 flex items-center gap-1.5 border border-[#00f2ff]/30 bg-black/50 p-2 rounded-lg animate-fadeIn text-left"
                >
                  <span className="text-[#00f2ff] font-bold">&gt;&gt;_</span>
                  <input
                    ref={inputFieldRef}
                    type="text"
                    value={liveInputValue}
                    onChange={(e) => setLiveInputValue(e.target.value)}
                    placeholder={inputPlaceholder}
                    className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-xs font-mono flex-1 caret-[#00f2ff]"
                  />
                  <button 
                    type="submit"
                    className="px-2 py-1 bg-[#00f2ff] hover:bg-cyan-400 text-black font-mono text-[9px] font-black rounded uppercase cursor-pointer"
                  >
                    SEND
                  </button>
                </form>
              )}
            </div>

            {/* Verification Success or Failure Alert Toast */}
            {success !== null && (
              <div className={`p-5 border-t relative overflow-hidden text-left
                ${success 
                  ? 'bg-emerald-500/5 border-emerald-500/20' 
                  : 'bg-rose-500/5 border-[#ff007f]/20'}`}
              >
                <div className="flex gap-3">
                  {success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#ff007f] shrink-0" />
                  )}

                  <div className="space-y-1 md:space-y-2">
                    <h3 className={`text-xs font-black uppercase tracking-tight
                      ${success ? 'text-emerald-400' : 'text-[#ff007f]'}`}
                    >
                      {success ? 'CHALLENGE COMPLETED SUCCESSFULLY' : 'RULES VERIFICATION OVERRIDE FAULT'}
                    </h3>
                    
                    <p className="text-[10.5px] text-slate-400 leading-relaxed">
                      {success 
                        ? 'Sensory logic aligns perfectly with standard rules. Cyber credits safely cataloged inside neural node system storage!' 
                        : 'Invalid statements found inside target pipeline. Review spelling prompts, prints, punctuation, variables, commas, and functions.'}
                    </p>

                    {success && (
                      <button
                        onClick={handleNextChallenge}
                        className="mt-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-1 transition-all cursor-pointer border border-white/10"
                      >
                        <span>NEXT CHALLENGE</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
