import { Lesson } from './types';

export const LESSONS: Lesson[] = [
{
    id: "intro-print",
    level: "basics",
    title: "Output Protocol: Print",
    description: "Master the most basic command: printing to the console.",
    headerPrefix: "TERMINAL_A1",
    missionPrefix: "HELLO_WORLD",
    intro: "# The Neural Uplink: print()\n\nYou just bypassed the first layer of the mainframe. To confirm your connection is stable, you must output a message to the system console.",
    technical: "1. You type the name of the function: `print`\n2. You provide the **arguments** inside parentheses `()`. These are the pieces of information you want the system to display.\n3. If you want to print text, you must wrap it in **quotes** (\" \" or ' '), which tells Python this is a \"string\" of characters, not a command.",
    example: "print(\"Connecting...\")  # Output: Connecting...\nprint(101)             # Output: 101",
    task: "### YOUR MISSION\n\nUse `print()` to display the message: \"System Initialized\"",
    baseCode: "# TODO: print your first message\n",
    hints: [
      "Type 'print' followed by parentheses.",
      "Put your message inside quotes within the parentheses."
    ],
    offlineSnippet: "print(\"Your Message Here\")",
    solution: "print(\"System Initialized\")",
    solutionRegex: [/print\s*\(\s*['"]System Initialized['"]\s*\)/]
  },
{
    id: "intro-comments",
    level: "basics",
    title: "Silent Protocols: Comments",
    description: "Learn how to document your code and leave notes for other operators.",
    headerPrefix: "SHADOW_DOCS",
    missionPrefix: "GHOST_NOTE",
    intro: "# Hidden Metadata: Comments\n\nWhen building complex scripts, you need notes that the system ignores. Comments allow you to document your bypass strategies without triggering the anti-virus.",
    technical: "### The Hash Symbol (#):\nAnything after a `#` on a line is treated as a comment.\n\n### Why use them?\n1. **Documentation**: To explain what a complex piece of code does.\n2. **Ghosting**: To temporarily \"turn off\" a line of code without deleting it.",
    example: "# This is a full-line comment. Python skips this.\nprint(\"Running sync...\") # This is an inline comment.",
    task: "### YOUR MISSION\n\nWrite a comment `# Encryption bypass` and then `print(\"Code Running\")`",
    baseCode: "# TODO: Add your comment and print statement\n",
    hints: [
      "Start your comment with the # character.",
      "The comment must be on its own line or at the end of a line.",
      'Example:\n# My note\nprint("Hello")'
    ],
    solution: "# Encryption bypass\nprint(\"Code Running\")",
    solutionRegex: [/#.*Encryption bypass/, /print\s*\(\s*['"]Code Running['"]\s*\)/]
  },
{
    id: "comments-inline",
    level: "basics",
    title: "Ghost Notes: Inline Comments",
    description: "Master the art of adding notes at the end of code lines.",
    headerPrefix: "DECRYPT_CONSOLE",
    missionPrefix: "QUICK_TAG",
    intro: "# Tagging Resources: Inline Comments\n\nDuring a high-speed data extraction, you might need to tag specific variables. Inline comments help you label keys and ports on the fly.",
    technical: "### The Visual Divide:\nIn our neural interface (and most IDEs), comments change color (usually becoming darker/greyed out) to distinguish them from active code protocols.",
    example: "ports = 80  # Default HTTP port",
    task: "### YOUR MISSION\n\nInitialize `key_id` to `128`. On the same line, add an inline comment `# Security level`.",
    baseCode: "# TODO: Initialize variable with an inline comment\n",
    hints: [
      "Put the # and your text after the variable assignment.",
      "Example: x = 10 # This is x"
    ],
    solution: "key_id = 128 # Security level",
    solutionRegex: [/key_id\s*=\s*128/, /#.*Security level/]
  },
  {
    id: "intro-vars",
    level: "basics",
    title: "The Neural Link: Variables",
    description: "Learn how to store data in the system using the virtual box concept.",
    headerPrefix: "CORE_MEM",
    missionPrefix: "LINK_SYNC",
    intro: "# Digital Storage: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled storage box** in your computer's memory! You can give this box a name, put some data inside it, and use or change that data later.\n\nIn this system, you need to store data packets as you tunnel through the firewall. Let's create some variables to track your encryption keys and power levels.",
    technical: "### What is a Variable? 🤔\n\nThink of a **variable** as a **labeled storage box** (or a labeled container) in your computer's memory:\n\n1. **The Name (The Label)**: You give your storage box a unique name (like `uplink_id`). This is the label on the box so you can find it later.\n2. **The Value (The Content)**: You place a piece of information inside the box (like the number `7` or the text `\"Neo\"`).\n3. **Retrieving it**: Whenever you need that information later, you don't need to retype it—you just use the box's name, and Python will look inside the box for you!\n\nThe equals sign (`=`) is called the **Assignment Operator**. It acts like a hand putting the value on the right side inside the box on the left side:\n\n```text\n       BOX LABEL              VALUE TO STORE\n      [ uplink_id ]   <---   7\n             |               |\n        .____v_______________v____.\n       /                         /|\n      /                         / |\n     /_________________________/  |\n     |                         |  |\n     |   LABEL:   uplink_id    |  |\n     |   CONTENT: 7            |  /\n     |                         | /\n     |_________________________|/\n```",
    example: "user_name = \"Neo\"       # String storage\nsecurity_clearance = 5  # Number storage\nis_active = True        # Boolean storage",
    task: "### YOUR MISSION\n\nCreate a variable `uplink_id` and set it to `7`. Create another called `signal_strength` and set it to `100`.",
    baseCode: "# TODO: Create your virtual boxes (variables) and print them\n",
    hints: [
      "Variable name goes on the left, value on the right of the '='.",
      'Example: box_name = "content"',
      "To print: print(player_name)"
    ],
    offlineSnippet: "variable_name = \"value\"\nprint(variable_name)",
    solution: "uplink_id = 7\nsignal_strength = 100",
    solutionRegex: [/uplink_id\s*=\s*7/, /signal_strength\s*=\s*100/]
  },
{
    id: "naming-conventions",
    level: "basics",
    title: "Naming Protocols: Case Sensitivity",
    description: "Learn the rules of case sensitivity: standard variables and commands are lowercase.",
    headerPrefix: "STYLE_MATRIX",
    missionPrefix: "CASE_CHECK",
    intro: "# Core Aesthetics: Case Sensitivity\n\nThe mainframe is extremely precise about case formatting. In Python, commands (like `print()`) and variables (like `access_code`) are strictly **case-sensitive** and should be written in **lowercase**.\n\nWriting `Print()` or `Access_Code = ...` will prompt a syntax or reference error, disrupting your neural uplink.",
    technical: "### Case Sensitivity & Camel Case:\n\n1. **Commands must be lowercase**: `print()` is valid, but `Print()` or `PRINT()` will breach security protocol due to undefined command errors.\n2. **Variables should be lowercase**: Standard variables use lowercase letters. For multi-word variables, separate them with an underscore (e.g., `access_code`). This style is known as **snake_case**.\n3. **Alternative Camel Case**: In some programming environments, multi-word variables are written by capitalizing the first letter of each word after the first with no spaces (e.g., `accessCode`). This style is known as **camelCase**.",
    example: "# Correct formatting\naccess_code = 7709\nprint(access_code)\n\n# Incorrect formatting\nAccess_Code = 7709    # Non-standard capitalization\nPrint(access_code)    # Will fail! \"Print\" is not a command",
    task: "### YOUR MISSION\n\nCreate a lowercase variable named `access_code` and assign the value `7709` to it. Then, use `print()` to display it. Remember: keep everything in lowercase!",
    baseCode: "# TODO: Define access_code with value 7709 and print it\n",
    hints: [
      "Make sure 'access_code' is entirely lowercase.",
      "Do not use capital 'P' for 'print()'.",
      "Assign the number 7709 directly without quotes to set an integer value."
    ],
    offlineSnippet: "access_code = 7709\nprint(access_code)",
    solution: "access_code = 7709\nprint(access_code)",
    solutionRegex: [/access_code\s*=\s*7709/, /print\s*\(\s*access_code\s*\)/]
  },
{
    id: "vars-reassignment",
    level: "basics",
    title: "Dynamic Storage: Reassignment",
    description: "Learn how to update the value stored in a variable.",
    headerPrefix: "IO_CONTROLLER",
    missionPrefix: "FLUX_UPDATE",
    intro: "# Memory Shaping: Reassignment\n\nProtocols change. Systems upgrade. To maintain your connection, you must learn to update the values inside your variables as the network state shifts.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one.\n\n### Incrementing (Counters):\nA common use for reassignment is updating a score or a counter by using the variable's *current* value to calculate its *new* value.",
    example: "status = \"Offline\"\nprint(status)  # Output: Offline\n\nscore = 0\nscore = score + 10  # Take 0, add 10, and store back in 'score'",
    task: "### YOUR MISSION\n\n1. Set `access_level` to `1`.\n2. Update `access_level` to `access_level + 5`.\n3. Print the access_level.",
    baseCode: "access_level = 1\n# TODO: Update access_level\n",
    hints: [
      "First: access_level = 1",
      "Next: access_level = access_level + 5",
      "Then: print(access_level)"
    ],
    solution: "access_level = 1\naccess_level = access_level + 5\nprint(access_level)",
    solutionRegex: [/access_level\s*=\s*1/, /access_level\s*=\s*access_level\s*\+\s*5/, /print\s*\(\s*access_level\s*\)/]
  },
{
    id: "data-types-intro",
    level: "basics",
    title: "Memory Containers: Data Types",
    description: "Learn how the compiler sets up different boxes for different kinds of data.",
    headerPrefix: "MEM_ALLOC",
    missionPrefix: "TYPE_IDENT",
    intro: "# Memory Containers: Data Types\n\nIn programming, different types of data need different kinds of storage boxes. Before we inspect each type in depth, let's see how Python categorizes them.",
    technical: "Just like sorting boxes in a warehouse, Python organizes your memories into specific **Data Types** based on what is stored inside them:\n\n```text\n       [ my_int ]        [ my_real ]        [ my_char ]       [ my_string ]\n     .___________._     .___________._     .___________._     .___________._\n    /           / |    /           / |    /           / |    /           / |\n   /___________/  |   /___________/  |   /___________/  |   /___________/  |\n   |           |  |   |           |  |   |           |  |   |           |  |\n   |  LABEL:   |  |   |  LABEL:   |  |   |  LABEL:   |  |   |  LABEL:   |  |\n   |  my_int   |  /   |  my_real  |  /   |  my_char  |  /   |  my_string|  /\n   |  CONTENT: | /    |  CONTENT: | /    |  CONTENT: | /    |  CONTENT: | /\n   |  101      |/     |  3.14     |/     |  'A'      |/     |  \"Bytes\"  |/\n   |___________|/     |___________|/     |___________|/     |___________|/\n```\n\n### The Four Core Categories:\n1. **Integer (`int`)**: Whole numbers without decimals (e.g., `101`). Ideal for discrete counts.\n2. **Float (`float` / real)**: Numbers with decimals (e.g., `3.14`). Ideal for continuous measurements.\n3. **Character (`char` or small string)**: A symbol or letter in quotes (e.g., `'A'`). *(Note: Python handles characters as mini-strings.)*\n4. **String (`str`)**: Chained characters or text in quotes (e.g., `\"Bytes\"`). Ideal for sentences or data feeds.",
    example: "system_id = 99         # Integer (int)\npower_ratio = 0.75     # Float (float / real)\ncore_status = 'N'      # Character (char)\nsys_message = \"Ready\"  # String (str)",
    task: "### YOUR MISSION\n\nCreate the four variables illustrated in our box diagram above:\n1. Create `my_int` containing the integer `101`.\n2. Create `my_real` containing the float decimal `3.14`.\n3. Create `my_char` containing the character `'A'`.\n4. Create `my_string` containing the string `\"Bytes\"`.\n\nFinally, print all four variables.",
    baseCode: "# TODO: Define the four standard container types\n",
    hints: [
      "To store numbers, enter them directly without quotes (e.g., my_int = 101).",
      "To store characters or strings, wrap them in matching single or double quotes (e.g., my_char = 'A').",
      "To print, use the print() function. You can print them individually (e.g., print(my_int)) or all together."
    ],
    solution: "my_int = 101\nmy_real = 3.14\nmy_char = 'A'\nmy_string = \"Bytes\"\nprint(my_int)\nprint(my_real)\nprint(my_char)\nprint(my_string)",
    solutionRegex: [/my_int\s*=\s*101/, /my_real\s*=\s*3\.14/, /my_char\s*=\s*['"]A['"]/, /my_string\s*=\s*['"]Bytes['"]/, /print\s*\(.*my_int.*\)/, /print\s*\(.*my_real.*\)/, /print\s*\(.*my_char.*\)/, /print\s*\(.*my_string.*\)/]
  },
{
    id: "data-strings",
    level: "basics",
    title: "Text Streams: Strings",
    description: "Learn how to work with text data types.",
    headerPrefix: "CORE_SYMBOLS",
    missionPrefix: "STR_PROTOCOL",
    intro: "# Manifest Strings: Strings\n\nIn the digital realm, all non-binary data is stored as text strings. Use these to communicate with other operators and tag your discovered assets.",
    technical: "### Key Rules:\n- You can use single quotes (`' '`) or double quotes (\" \").\n- Strings are literally just \"strings\" of characters tied together.",
    example: "operator = \"Neo\"        # Double quotes\nnode = 'Mainframe'      # Single quotes",
    task: "### YOUR MISSION\n\nCreate a variable `hacker_alias` set to \"Neo\". Print it.",
    baseCode: "# TODO: Define your strings\n",
    hints: [
      "Always wrap strings in quotes.",
      "Spaces inside quotes are preserved."
    ],
    solution: "hacker_alias = \"Neo\"\nprint(hacker_alias)",
    solutionRegex: [/hacker_alias\s*=\s*['"]Neo['"]/, /print\s*\(\s*hacker_alias\s*\)/]
  },
{
    id: "data-numbers",
    level: "basics",
    title: "Precision Cores: Integers & Floats",
    description: "Understand the difference between whole numbers and decimals.",
    headerPrefix: "POWER_BUS",
    missionPrefix: "FLOAT_MATH",
    intro: "# Energy Calibration: Numbers\n\nNumbers power your terminal. Use integers for counting nodes and floats for the precise voltage adjustments required to stabilize the link.",
    technical: "1. **Integers (int)**: Whole numbers without decimals (e.g., `10`, `-5`, `0`).\n2. **Floats (float)**: Numbers with decimal points (e.g., `10.5`, `3.14`, `-0.01`).\n\n### Why does it matter?\nIntegers are faster and used for counting. Floats are used for precision (prices, coordinates, sensor data).",
    example: "nodes = 12          # int\nvoltage = 1.5       # float",
    task: "### YOUR MISSION\n\nSet `voltage` to `12.5` and `node_count` to `1024`.",
    baseCode: "# TODO: Define an int and a float\n",
    hints: [
      "Don't use quotes for numbers!",
      "An integer is a whole number, a float has a dot (.)"
    ],
    solution: "voltage = 12.5\nnode_count = 1024",
    solutionRegex: [/voltage\s*=\s*12\.5/, /node_count\s*=\s*1024/]
  },
{
    id: "data-booleans",
    level: "basics",
    title: "Binary Logic: Booleans",
    description: "Master the True and False binary states.",
    headerPrefix: "LOGIC_GATE",
    missionPrefix: "GATE_STATUS",
    intro: "# Digital Sentinel: Booleans\n\nBooleans are the simplest form of data: either 1 or 0, ON or OFF, True or False. Use them to determine if a security gate is open or locked.",
    technical: "### Key Rules:\n- Booleans in Python must be capitalized: `True` and `False`.\n- They do NOT use quotes. If you put quotes around them, they become strings!",
    example: "online = True\nalarm_active = False\n\n# Caution!\nmessage = \"True\" # This is just a string, not a boolean state.",
    task: "### YOUR MISSION\n\nSet `access_granted` to `True` and `alarm_triggered` to `False`.",
    baseCode: "# TODO: Initialize your booleans\n",
    hints: [
      "Use True and False with capital first letters.",
      "Do not use quotes."
    ],
    solution: "access_granted = True\nalarm_triggered = False",
    solutionRegex: [/access_granted\s*=\s*True/, /alarm_triggered\s*=\s*False/]
  },
{
    id: "vars-multi",
    level: "basics",
    title: "Parallel Sync: Multi-Assignment",
    description: "Assign multiple values in a single line of code.",
    headerPrefix: "SYNC_BUS",
    missionPrefix: "BATCH_INIT",
    intro: "# Rapid Boot: Multi-Assignment\n\nYou don't have time to waste. Initialize multiple security subsystems simultaneously to keep your connection ahead of the mainframe's scan.",
    technical: "### Efficiency Boost:\nYou separate variable names with commas on the left, and their values with commas on the right. This is cleaner and keeps related data together.",
    example: "# Pattern: name1, name2 = val1, val2\nkey_a, key_b = 101, 202",
    task: "### YOUR MISSION\n\nAssign `port_alpha` set to `80` and `port_beta` set to `443` in one line.",
    baseCode: "# TODO: Assign both ports on one line\n",
    hints: [
      "Use the comma: port1, port2 = val1, val2",
      "Example: x, y = 1, 2"
    ],
    solution: "port_alpha, port_beta = 80, 443",
    solutionRegex: [/port_alpha\s*,\s*port_beta\s*=\s*80\s*,\s*443/]
  },
{
    id: "intro-math",
    level: "basics",
    title: "Circuit Breaker: Math",
    description: "Manipulate data with operators.",
    headerPrefix: "NODE_MGMT",
    missionPrefix: "CAPACITY_CHECK",
    intro: "# Resource Math: Addition & Subtraction\n\nCalculate your current node capacity. Combine your local servers and hijacked proxies to see the total processing power at your disposal.",
    technical: "- `+` Addition\n- `-` Subtraction\n- `*` Multiplication\n- `/` Division",
    example: "a = 10 + 5 # result: 15\nb = 20 - 4 # result: 16",
    task: "### YOUR MISSION\n\nCreate `local_nodes` as `15` and `proxy_nodes` as `5`. Store the sum in `total_nodes` and print it.",
    baseCode: "# TODO: Calculate and print total_nodes\n",
    hints: [
      "Use the + operator.",
      "Remember to assign it to total_nodes.",
      "Use print(total_nodes) at the end."
    ],
    solution: "local_nodes = 15\nproxy_nodes = 5\ntotal_nodes = local_nodes + proxy_nodes\nprint(total_nodes)",
    solutionRegex: [/total_nodes\s*=\s*local_nodes\s*\+\s*proxy_nodes/, /print/]
  },
{
    id: "math-advanced",
    level: "basics",
    title: "Modular Encryption: Advanced Math",
    description: "Use modulo and power operators and print the results.",
    headerPrefix: "ENCRYPT_CORE",
    missionPrefix: "MODULO_CRYPT",
    intro: "# Prime Detection: Modulo & Powers\n\nAdvanced encryption depends on remainders and large exponents. Use these operators to verify if a security key is divisible and test the system's limits.",
    technical: "### Advanced Operators:\n- `%` Modulo: Returns the remainder of a division (great for finding even/odd numbers).\n- `**` Exponentiation: Raises a number to a power.",
    example: "remainder = 10 % 3 # remainder is 1\npower = 2 ** 3     # power is 8 (2*2*2)",
    task: "### YOUR MISSION\n\n1. Calculate `10 % 3` and store it in `extra_bit`.\n2. Calculate `2 ** 8` and store it in `encryption_strength`.\n3. Print both.",
    baseCode: "# TODO: Calculate extra_bit, encryption_strength, and print both\n",
    hints: [
      "For remainder, use 10 % 3.",
      "For power, use 2 ** 8.",
      "Don't forget to print(extra_bit) and print(encryption_strength)."
    ],
    solution: "extra_bit = 10 % 3\nencryption_strength = 2 ** 8\nprint(extra_bit)\nprint(encryption_strength)",
    solutionRegex: [/extra_bit\s*=\s*10\s*%\s*3/, /encryption_strength\s*=\s*2\s*\*\*\s*8/]
  },
{
    id: "math-bidmas",
    level: "basics",
    title: "Order of Operations: BIDMAS",
    description: "Learn how Python prioritizes mathematical operations.",
    headerPrefix: "GATE_CALC",
    missionPrefix: "CALC_HIERARCHY",
    intro: "# Operational Priority: BIDMAS\n\nCracking a complex encryption key requires precise mathematical order. Ensure that your offsets are added only after the primary multiplier is applied to the data packet.",
    technical: "### Hierarchy:\n- **B**rackets `()`\n- **I**ndices (Powers) `**`\n- **D**ivision / **M**ultiplication `/` `*`\n- **A**ddition / **S**ubtraction `+` `-` \n\nUsing brackets `()` allows you to control which part of the calculation happens first.",
    example: "score = 10 + 5 * 2    # Result: 20 (5*2 happens first)\nscore = (10 + 5) * 2  # Result: 30 (10+5 happens first)",
    task: "### YOUR MISSION\n\n- Calculate `(20 + 5) * 4` for `set_a`.\n- Calculate `20 + (5 * 4)` for `set_b`.\n- `print` both.",
    baseCode: "# TODO: Calculate set_a and set_b, then print\n",
    hints: [
      "Brackets always come first.",
      "set_a should be 100.",
      "set_b should be 40."
    ],
    solution: "set_a = (20 + 5) * 4\nset_b = 20 + (5 * 4)\nprint(set_a)\nprint(set_b)",
    solutionRegex: [/set_a\s*=\s*\(\s*20\s*\+\s*5\s*\)\s*\*\s*4/, /set_b\s*=\s*20\s*\+\s*\(\s*5\s*\*\s*4\s*\)/]
  },
{
    id: "math-complex",
    level: "basics",
    title: "Final Tally: Math Review",
    description: "Combine multiple operators to solve a complex problem.",
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe central system has initiated a protocol reset. Run a memory dump to verify the integrity status score after subtracting offsets and applying scaling indices.",
    technical: "### Structural Calculations:\n1. **Operation Grouping**: Combine your base indices and adjustment offsets before multiplying by the diagnostic scaling coefficient.\n2. **Prioritization**: Use parentheses `()` around addition and subtraction so they evaluate prior to any multi-operator execution.",
    example: "base_val = 80\nmodifier = -10\ndecrypted_key = (base_val + modifier) * 0.8\nprint(decrypted_key)",
    task: "### YOUR MISSION\n\n1. Set `base_val` as `80`.\n2. Set `modifier` as `-10`.\n3. Calculate `(base_val + modifier) * 0.8` and store in `decrypted_key`.\n4. Print `decrypted_key`.",
    baseCode: "# TODO: Implement the multi-step calculation\n",
    hints: [
      "Start by defining your variables.",
      "Use (base_value + bonus) in brackets.",
      "Multiply by 0.8 at the end."
    ],
    solution: "base_val = 80\nmodifier = -10\ndecrypted_key = (base_val + modifier) * 0.8\nprint(decrypted_key)",
    solutionRegex: [/base_val\s*=\s*80/, /modifier\s*=\s*-10/, /decrypted_key\s*=\s*\(\s*base_val\s*\+\s*modifier\s*\)\s*\*\s*0\.8/]
  },
{
    id: "intro-input",
    level: "basics",
    title: "Data Acquisition: Input",
    description: "Learn how to receive data from the user.",
    headerPrefix: "IO_TERMINAL",
    missionPrefix: "QUERY_INIT",
    intro: "# User handshake: The input() Function\n\nThe primary way to receive data from an external operator is through the input() protocol. This pauses your script and waits for a manual data entry.",
    technical: "1. **The Prompt**: You provide a string inside the parentheses that tells the user what to type.\n2. **The Wait**: The program pauses execution until the user presses Enter.\n3. **The Return**: Whatever the user types is returned as a **String** (text), regardless of what they typed.\n- **String Concatenation**: You can glue strings together using the `+` operator (e.g., `\"A\" + \"B\"` becomes `\"AB\"`). Note that Python won\'t automatically add spaces between them!",
    example: "username = input(\"Enter your credentials: \")\nprint(\"Welcome, \" + username)",
    task: "### YOUR MISSION\n\nAsk: \"Enter target system: \" and store in `target`. Print \"Initializing link to: \" + target.",
    baseCode: "# TODO: Ask for target and print it\n",
    hints: [
      'target = input("Enter target system: ")',
      'Then use the + operator to join the strings: print("Initializing link to: " + target)'
    ],
    solution: "target = input(\"Enter target system: \")\nprint(\"Initializing link to: \" + target)",
    solutionRegex: [/target\s*=\s*input\s*\(\s*['"]Enter target system: \s*['"]\s*\)/]
  },
{
    id: "vars-placeholder",
    level: "basics",
    title: "The Shadow Buffer: Placeholders",
    description: "Prepare your variables before the data arrives.",
    headerPrefix: "DATA_STREAM",
    missionPrefix: "INPUT_CAPTURE",
    intro: "# Echo Request: Placeholders\n\nWait for the mainframe to push a response packet. Use a placeholder variable to catch the server's identify signal before it bypasses your terminal.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Input Integration:\nThe `input()` function pauses the program and waits for the user to type something. We can capture that typed text into a variable.",
    example: "target_node = \"\"  # The box is ready, but currently empty\ntarget_node = input(\"Enter Node: \")",
    task: "### YOUR MISSION\n\n1. Initialize `packet_id` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter target ID: \")` to fill it.\n3. Print `\"Targeting: \" + packet_id`.",
    baseCode: "# TODO: Initialize empty, populate with input, and print\n",
    hints: [
      'Use packet_id = "" for step 1.',
      'Use packet_id = input("Enter target ID: ") for step 2.',
      "Use the + operator to join the strings in the print statement."
    ],
    solution: "packet_id = \"\"\npacket_id = input(\"Enter target ID: \")\nprint(\"Targeting: \" + packet_id)",
    solutionRegex: [/packet_id\s*=\s*['"]['"]/, /input/, /print/]
  },
{
    id: "input-mad-libs",
    level: "basics",
    title: "The Infinite Saga: Story Engine",
    description: "Combine user inputs to generate a personalized narrative.",
    headerPrefix: "NEURAL_STORY",
    missionPrefix: "NARRATIVE_GEN",
    intro: "# Operational Logs: The Story Engine\n\nGenerate iconic mission reports by injecting operative names, target locations, and technical actions into a live play-by-play template.",
    technical: "### Combining Strings:\nYou can use the `+` operator to join strings together (concatenation). Be careful with spaces\\u2014Python won't add them automatically between variables!",
    example: "operator = \"Neo\"\nsystem = \"Mainframe\"\nstory = operator + \" has breached the \" + system + \".\"\nprint(story) # Output: Neo has breached the Mainframe.",
    task: "### YOUR MISSION\n\n1. `name = input(\"Name: \")`\n2. `system = input(\"System: \")`\n3. `tool = input(\"Tool: \")`\n4. Combine into `report`.\n5. Print it.",
    baseCode: "# TODO: Collect inputs and build the story\n",
    hints: [
      "Use input() three times for the three variables.",
      "Be careful with spaces inside your story string!",
      'Example: story = "Hi " + name + "!"'
    ],
    solution: "name = input(\"Name: \")\nsystem = input(\"System: \")\ntool = input(\"Tool: \")\nreport = name + \" bypassed \" + system + \" with a \" + tool + \"!\"\nprint(report)",
    solutionRegex: [/name\s*=\s*input/, /system\s*=\s*input/, /tool\s*=\s*input/]
  },
{
    id: "input-mad-libs-pro",
    level: "basics",
    title: "The Glitch Report: Advanced Mad Libs",
    description: "Construct a wilder data narrative using 5 different user inputs.",
    headerPrefix: "LOG_SYNTH",
    missionPrefix: "GLITCH_DOC",
    intro: "# Memory Corruption: Advanced Mad Libs\n\nThe mainframe is fragmented. Generate a complex system error report using five different inputs from the user to mask your trail.",
    technical: "### Complexity Management:\n- When using many variables, ensure your string quotes are balanced.\n- Adding `+` signs keeps the chain going.\n- Spaces must be placed inside the \"quotes\" of your fixed text to separate the variables.",
    example: "glitch = \"CRITICAL: \" + node + \" has encountered a \" + error + \"!\"",
    task: "### YOUR MISSION\n\n1. `user = input(\"Name: \")`\n2. `code = input(\"Code: \")`\n3. `node = input(\"Node: \")`\n4. `level = input(\"Level: \")`\n5. `verb = input(\"Action: \")`\n6. Print the glitch by combining them in the exact format: `user + \" injected \" + code + \" into \" + node + \" at \" + level + \". System is \" + verb + \"!\"`.",
    baseCode: "# TODO: Build the advanced glitch report\n",
    hints: [
      "Use input() five times with descriptive prompt strings.",
      "Check your capitalization for the variable names (Python is case-sensitive!).",
      "Ensure spaces are where they need to be in the quoted strings."
    ],
    solution: "user = input(\"Name: \")\ncode = input(\"Code: \")\nnode = input(\"Node: \")\nlevel = input(\"Level: \")\nverb = input(\"Action: \")\nprint(user + \" injected \" + code + \" into \" + node + \" at \" + level + \". System is \" + verb + \"!\")",
    solutionRegex: [/print\s*\(.*user.*code.*node.*level.*verb.*\)/]
  },
{
    id: "print-formatting",
    level: "basics",
    title: "Identity Verification: F-Strings",
    description: "Format your output with embedded variables.",
    headerPrefix: "ID_SCANNER",
    missionPrefix: "FSTRING_AUTO",
    intro: "# Dynamic Headers: F-Strings\n\nManual concatenation is slow. F-strings allow you to inject operative data directly into your terminal headers for a cleaner, high-speed interface.",
    technical: "### The F-String Protocol:\n- **Prefix**: Put an `f` before the opening quote. \n- **Braces**: Place your variables directly inside curly braces `{}` within the string.\n- **Injection**: Python will automatically \"inject\" the current value of the variable into that spot.",
    example: "user = \"Neo\"\nprint(f\"Welcome, {user}\") # Outputs: Welcome, Neo",
    task: "### YOUR MISSION\n\nYou have `alias = \"Neo\"` and `level = 7`. Use an **f-string** to print: `Operative: Neo | Security Level: 7`.",
    baseCode: "alias = \"Neo\"\nlevel = 7\n# TODO: Print with f-string\n",
    hints: [
      'Start your string with f, like f"...".',
      "Put the variables inside { } within the string."
    ],
    solution: "alias = \"Neo\"\nlevel = 7\nprint(f\"Operative: {alias} | Security Level: {level}\")",
    solutionRegex: [/print\s*\(\s*f['"]Operative:\s*\{alias\}\s*\|\s*Security\s*Level:\s*\{level\}['"]\s*\)/]
  },
{
    id: "input-fstrings-fun",
    level: "basics",
    title: "Dynamic Signals: Advanced F-Strings",
    description: "Use f-strings for more complex output patterns.",
    headerPrefix: "SIGNAL_GEN",
    missionPrefix: "AUTO_HEADER",
    intro: "# Signal Synthesis: Advanced F-Strings\n\nCreate complex system messages by combining multiple data types into a single, high-fidelity f-string. This ensures your terminal output remains synchronized with the shifting data streams.",
    technical: "### Rules for F-Strings:\n- You can perform **math** inside the braces: `{x + y}`.\n- You can call **methods** inside the braces: `{name.upper()}`.\n- It's the modern, preferred way to handle strings in Python.",
    example: "x, y = 5, 10\nprint(f\"Total nodes: {x + y}\") # Output: Total nodes: 15",
    task: "### YOUR MISSION\n\n1. `nodes = int(input(\"Nodes: \"))`\n2. `region = input(\"Region: \")`\n3. Print: `Deploying {nodes} proxies to {region.upper()}...`.",
    baseCode: "# TODO: Use f-strings with math/methods\n",
    hints: [
      "Use {nodes} and {region.upper()} inside the f-string.",
      "Don't forget the 'f' at the start of the print function."
    ],
    solution: "nodes = int(input(\"Nodes: \"))\nregion = input(\"Region: \")\nprint(f\"Deploying {nodes} proxies to {region.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{nodes\}\s*proxies\s*to\s*\{region\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
{
    id: "input-cast-int",
    level: "basics",
    title: "Digital Quantization: Casting to Int",
    description: "Convert string input into whole numbers.",
    headerPrefix: "GATE_CONFIG",
    missionPrefix: "INT_RECAST",
    intro: "# Variable Shielding: Data Casting\n\nData received via input() is always a string. To use it for calculating security offsets or node counts, you must \"cast\" it into an integer to unlock its mathematical properties.",
    technical: "### The Casting Protocol:\n- **`input()`**: \"10\" (A string, you can't do math with it)\n- **`int(\"10\")`**: 10 (An integer, now you can use `+`, `-`, etc.)\n- **Pattern**: `variable = int(input(\"Prompt\"))`",
    example: "age = int(input(\"Enter age: \"))\nnext_year = age + 1",
    task: "### YOUR MISSION\n\n1. Get `current_nodes` from user as an **int**.\n2. Get `new_nodes` as an **int**.\n3. Print the sum.",
    baseCode: "# TODO: Cast inputs to int and add them\n",
    hints: [
      "Wrap input() in int(), like int(input(...)).",
      "Then add the two variables together."
    ],
    solution: "current_nodes = int(input(\"Current: \"))\nnew_nodes = int(input(\"New: \"))\nprint(current_nodes + new_nodes)",
    solutionRegex: [/current_nodes?\s*=\s*int\s*\(\s*input/, /new_nodes?\s*=\s*int\s*\(\s*input/]
  },
{
    id: "input-cast-float",
    level: "basics",
    title: "Precision Calibration: Casting to Float",
    description: "Convert string input into decimal numbers.",
    headerPrefix: "SENS_O_MATIC",
    missionPrefix: "FLOAT_RECAST",
    intro: "# Voltage Tuning: Parsing Floats\n\nSecurity sensors often return precise decimal values. Cast these inputs into floats to ensure your frequency adjustments are accurate enough to bypass the mainframe's detection.",
    technical: "### System Float Diagnostics:\n- **What is a Float?**: While integers represent whole numbers (like `30` server logs), a `float` represents a decimal fractional value (e.g., `10.5` volts or `1.57` pitch frequency ratios) for high-precision arithmetic.\n- **String-to-Float Translation**: The standard `input()` function captures every reading as text (a string). To use it in calculations, pass it through `float()`, e.g., `val = float(input())`.\n- **The Integer Trap**: Attempting to feed a fractional string like `\"10.5\"` into `int()` will instantly crash Python with a `ValueError`! Always use `float()` for signals with potential decimal parts.",
    example: "price = float(input(\"Enter price: \"))\ntotal = price * 1.1",
    task: "### YOUR MISSION\n\nCalibrate telemetry sensors:\n1. Prompt for voltage offset with **\"Voltage: \"** and store it as a float in `voltage`.\n2. Prompt for multiplier scale with **\"Mult: \"** and store it as a float in `multiplier`.\n3. Print the result of multiplying voltage and multiplier.",
    baseCode: "# TODO: Cast to float and multiply\n",
    hints: [
      "Use voltage = float(input(\"Voltage: \"))",
      "Use multiplier = float(input(\"Mult: \"))",
      "Multiply voltage by multiplier and print the result."
    ],
    solution: "voltage = float(input(\"Voltage: \"))\nmultiplier = float(input(\"Mult: \"))\nprint(voltage * multiplier)",
    solutionRegex: [/voltage\s*=\s*float\s*\(\s*input/, /multiplier\s*=\s*float\s*\(\s*input/]
  },
{
    id: "intro-lists",
    level: "basics",
    title: "Array Infiltration: Lists",
    description: "Store multiple values in one sequence.",
    headerPrefix: "SCAN_RESULTS",
    missionPrefix: "PROXY_MAP",
    intro: "# Resource Mapping: Lists\n\nYou've scanned the network and identified multiple targets. Store these discovered proxies in an ordered list to track your infiltration progress.",
    technical: "### Key Concepts:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of items stored in a single variable. While a standard variable holds just one value (e.g., `proxy = \"alpha\"`), a list lets you group multiple elements (like strings, numbers, or even other lists) together under a single name.\n- **Square Brackets**: Lists are defined using square brackets `[` and `]`.\n- **Comma Separation**: Elements inside the list must be separated by commas.\n- **Zero-Based Indexing**: Python starts counting positions from zero. The first item is at index `0`, the second is at `1`, and so on.",
    example: "targets = [\"Mainframe\", \"Vault\", \"Firewall\"]\nprint(targets[0]) # Output: Mainframe",
    task: "### YOUR MISSION\n\nCreate a list `proxies` with \"alpha\", \"beta\", and \"gamma\". Print the proxies.",
    baseCode: "# TODO: Initialize and print your proxies list\n",
    hints: [
      "Use square brackets [ ].",
      "Separate items with commas.",
      "print(proxies)"
    ],
    solution: "proxies = [\"alpha\", \"beta\", \"gamma\"]\nprint(proxies)",
    solutionRegex: [/proxies\s*=\s*\[\s*['"]alpha['"]\s*,\s*['"]beta['"]\s*,\s*['"]gamma['"]\s*\]/]
  },
{
    id: "list-indexing",
    level: "basics",
    title: "Zero-Based Access: Indices",
    description: "Learn how to pinpoint and retrieve specific items from a list.",
    headerPrefix: "PROTOCOL_SCAN",
    missionPrefix: "ADDR_LOOKUP",
    intro: "# Targeted Extraction: Indexing\n\nYou need to pull a specific server address from your proxy list. Use numerical addresses (indices) to locate exact packets within the data stream.",
    technical: "### THE ADDRESS MAP:\n\n```text\nproxies = [\"alpha\", \"beta\", \"gamma\"]\n#         [0]       [1]      [2]\n```",
    example: "# Grab specific items from a list using index positions\nproxies = [\"alpha\", \"beta\", \"gamma\"]\n\n# Retrieve first item (index 0)\np1 = proxies[0]\nprint(p1)  # Output: alpha\n\n# Retrieve third item (index 2)\np3 = proxies[2]\nprint(p3)  # Output: gamma",
    task: "### YOUR MISSION\n\n1. Get the first item (index 0) from `proxies` and store it in `p1`.\n2. Get the last item (index 2) and store it in `p3`.\n3. Print both.",
    baseCode: "proxies = [\"alpha\", \"beta\", \"gamma\"]\n# TODO: Retrieve indices 0 and 2\n",
    hints: [
      "Remember, the first item is index 0.",
      "The third item is index 2.",
      "Use the syntax: list_name[index]"
    ],
    solution: "p1 = proxies[0]\np3 = proxies[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*proxies\s*\[\s*0\s*\]/, /p3\s*=\s*proxies\s*\[\s*2\s*\]/]
  },
{
    id: "list-append",
    level: "basics",
    title: "Resource Acquisition: Appending",
    description: "Grow your data arrays dynamically.",
    headerPrefix: "RESOURCE_BUS",
    missionPrefix: "AUTO_APPEND",
    intro: "# Expanding Access: .append()\n\nYou've found a new security token! Use the .append() method to add this newly acquired asset to the end of your resource list without rebuilding the entire array.",
    technical: "- The `.append()` method **modifies** the original list directly.\n- It always adds the new item to the very **end** of the list (index -1).\n- This is efficient for building lists as data streams in from sensors or user input.",
    example: "tools = [\"pick\"]\ntools.append(\"wrench\")\n# tools is now [\"pick\", \"wrench\"]",
    task: "### YOUR MISSION\n\nAppend \"delta\" to the `active_nodes` list and print it.",
    baseCode: "active_nodes = [\"alpha\", \"beta\", \"gamma\"]\n# TODO: Append and print\n",
    hints: [
      "Call the method on the list: active_nodes.append(...)",
      "Then print the list name."
    ],
    solution: "active_nodes.append(\"delta\")\nprint(active_nodes)",
    solutionRegex: [/active_nodes\.\s*append\s*\(\s*['"]delta['"]\s*\)/]
  },
{
    id: "list-pop",
    level: "basics",
    title: "Cache Clearance: .pop()",
    description: "Remove and retrieve items from a list.",
    headerPrefix: "CACHE_MGMT",
    missionPrefix: "POP_PROTOCOL",
    intro: "# Memory Purge: .pop()\n\nThe mainframe is tracking your older proxy nodes. Use .pop() to remove the redundant addresses from your list while keeping a record of the last node purged.",
    technical: "- **Extraction**: Unlike deleting, `.pop()` \"handcuffs\" the value and returns it to you. You can store this value in a variable.\n- **Positioning**: By default, `.pop()` removes the **last** item. However, you can pass an index (like `.pop(0)`) to remove an item from a specific position.\n- **Destructive**: This method modifies the original list.",
    example: "queue = [\"user_1\", \"user_2\", \"user_3\"]\nlast_user = queue.pop() \n# queue is now [\"user_1\", \"user_2\"]\n# last_user is \"user_3\"\n\nfirst_user = queue.pop(0)\n# queue is now [\"user_2\"]\n# first_user is \"user_1\"",
    task: "### YOUR MISSION\n\n1. Pop the last item from `redundant_nodes` and store it in `purged`.\n2. Print `purged`.",
    baseCode: "redundant_nodes = [\"node_x\", \"node_y\", \"node_z\"]\n# TODO: Pop the last item and print\n",
    hints: [
      "Use removed_item = redundant_nodes.pop()",
      "Then print the removed_item and the original list."
    ],
    solution: "purged = redundant_nodes.pop()\nprint(purged)",
    solutionRegex: [/purged\s*=\s*redundant_nodes\s*\.\s*pop\s*\(\s*\)/]
  },
{
    id: "intro-tuples",
    level: "basics",
    title: "Immutable Vaults: tuples",
    description: "Learn about constant sequences that cannot be modified.",
    headerPrefix: "CORE_VALS",
    missionPrefix: "LOCKED_DATA",
    intro: "# Hard-Coded Constants: tuples\n\nSome system data must remains unchangeable. tuples provide a secure, immutable way to store critical coordinates or server ports that should never be modified during execution.",
    technical: "### Key Characteristics:\n- **What is a Tuple?**: A tuple is an ordered collection of items, similar to a list, but with one critical distinction: **lists are mutable** (meaning you can add, remove, or edit items after creation), whereas **tuples are immutable** (meaning their contents and order are permanently locked in memory and cannot be changed in any way once defined).\n- **Syntax**: Tuples use round parentheses `()` instead of the square brackets `[]` used for lists.\n- **Speed & Security**: Because tuples are simpler and read-only, the computer processes them faster, and they protect critical parameters (like server ports) from being altered accidentally.",
    example: "# List (Mutable - can change)\nports = [80, 443]\nports[0] = 8080 # This works.\n\n# tuple (Immutable - locked)\ncoordinates = (34.05, -118.24)\n# coordinates[0] = 0 # This would cause an ERROR!",
    task: "### YOUR MISSION\n\nCreate a tuple `server_info` with \"192.168.1.1\" and `8080`. Print it.",
    baseCode: "# TODO: Create a tuple and print it\n",
    hints: [
      "Use parentheses () for tuples.",
      "Separate values with commas.",
      "Example: my_tuple = (1, 2, 3)"
    ],
    solution: "server_info = (\"192.168.1.1\", 8080)\nprint(server_info)",
    solutionRegex: [/server_info\s*=\s*\(\s*['"]192\.168\.1\.1['"]\s*,\s*8080\s*\)/]
  },
{
    id: "intro-tuples-immutability",
    level: "basics",
    title: "The Unchangeable Core: Immutability",
    description: "Witness the power of data that refuses to be hacked.",
    headerPrefix: "VAULT_LOCK",
    missionPrefix: "IMMUTABLE_TEST",
    intro: "# Data Integrity: Immutability\n\nContrast the flexible nature of lists with the rigid security of tuples. Attempting to modify a tuple is a system violation that ensures the core data remains pure.",
    technical: "### The Immutable Vault:\n- **No Modifications**: If you try to use `.append()` or `.pop()` on a tuple, the system will trigger a `TypeError`.\n- **Integrity Check**: The data is \"welded\" into memory, ensuring it stays exactly as it was defined during initialization.",
    example: "# This works:\nmy_list = [1, 2]\nmy_list[0] = 9\n\n# This CRASHES:\nmy_tuple = (1, 2)\n# my_tuple[0] = 9  # ERROR!",
    task: "### YOUR MISSION\n\n1. Create a List `manifest` with \"item_1\".\n2. Create a tuple `version` with `1`, `0`.\n3. Change `manifest[0]` to \"item_updated\".\n4. Print both.",
    baseCode: "# TODO: Contrast a List and a tuple\n",
    hints: [
      "Use square brackets [] for the list and parentheses () for the tuple.",
      "Assign a new value to manifest[0] just like any other variable.",
      "Print both at the end."
    ],
    solution: "manifest = [\"item_1\"]\nversion = (1, 0)\nmanifest[0] = \"item_updated\"\nprint(manifest)\nprint(version)",
    solutionRegex: [/manifest\s*\[\s*0\s*\]\s*=\s*['"]item_updated['"]/, /version\s*=\s*\(\s*1\s*,\s*0\s*\)/]
  },
{
    id: "list-slicing",
    level: "basics",
    title: "Subnet Extraction: Slicing",
    description: "Carve out specific segments of data.",
    headerPrefix: "BUFFER_FLOW",
    missionPrefix: "SLICE_EXTRACT",
    intro: "# Selective Retrieval: Slicing\n\nYou don't need the entire data packet. Use slicing to extract a specific range of addresses from a large list, allowing you to focus on the most critical nodes.",
    technical: "- **Range**: Use square brackets with a colon `[start:end]`.\n- **Inclusive/Exclusive**: The first number is the start (inclusive), the second is the end (exclusive).\n- **Original Preservation**: Slicing creates a **new** list; the original remains untouched.",
    example: "data = [10, 20, 30, 40, 50]\nsubset = data[1:4] # Gets indices 1, 2, 3 -> [20, 30, 40]",
    task: "### YOUR MISSION\n\nFrom `data_packet`, slice from index `1` to index `4` (exclusive). Store in `payload` and print.",
    baseCode: "data_packet = [\"cmd\", \"ptr\", \"val\", \"end\", \"extra\", \"null\"]\n# TODO: Slice and print\n",
    hints: [
      "Use square brackets with a colon: list[1:4].",
      "Remember to print the new variable."
    ],
    solution: "payload = data_packet[1:4]\nprint(payload)",
    solutionRegex: [/payload\s*=\s*data_packet\s*\[\s*1\s*:\s*4\s*\]/]
  },
{
    id: "control-indentation",
    level: "control_flow",
    title: "Indentation Protocol",
    description: "Learn Python's most important rule: logical hierarchy through indentation.",
    headerPrefix: "CORE_SYNTAX",
    missionPrefix: "SCOPE_CHECK",
    intro: "# Coding Standards: Indentation\n\nIndentation defines the boundaries of your code blocks. If you don't indent properly, the compiler won't know which instructions belong to which security gate.",
    technical: "### The Colon-Indented Pattern:\nWhenever you see a line ending in a **colon** (`:`), it means a new \"block\" of code is starting. The next lines **MUST** be indented (usually 4 spaces).\n\n### Critical Failure:\nIf you don't indent correctly, the system will throw an `IndentationError`. Consistency is mandatory.",
    example: "if True:\n    print(\"Inside the block\") # Indented\nprint(\"Outside\")    # Not indented",
    task: "### YOUR MISSION\n\nWrite an `if True:` statement, and on the next line (indented), `print` the message \"Accessing...\".",
    baseCode: "# TODO: Write an if statement with 4 spaces of indentation\n",
    hints: [
      "End the first line with a colon (:).",
      "Press the 'Tab' key or spacebar 4 times on the second line.",
      'Example:\nif True:\n    print("Hello")'
    ],
    offlineSnippet: "if True:\n    # Indented block\n    print(\"Inside\")",
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
{
    id: "control-nested-indent",
    level: "control_flow",
    title: "Nested Hierarchy",
    description: "Master multiple levels of indentation.",
    headerPrefix: "SEC_DEEP_SCAN",
    missionPrefix: "ACCESS_HUB",
    intro: "# Deep Logic: Nested Indentation\n\nAccessing the core processor requires passing through multiple layers of logic. Each new layer requires a deeper level of indentation to stay within the security context.",
    technical: "### The Stacking Effect:\n- **Level 1**: 4 spaces.\n- **Level 2**: 8 spaces (4 for the first block + 4 for the nested one).\n- **Precision**: Every `if` requires its own colon and its own level of indentation.",
    example: "if True:\n    print(\"Level 1\")\n    if True:\n        print(\"Level 2\") # 8 spaces total!",
    task: "### YOUR MISSION\n\nCreate nested `if True:` statements (level 2) and `print` \"CORE ACCESS GRANTED\".",
    baseCode: "# TODO: Nest your indentation blocks\n",
    hints: [
      "Level 1 = 4 spaces.",
      "Level 2 = 8 spaces.",
      "Each 'if' needs its own colon (:)."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print/]
  },
{
    id: "control-if",
    level: "control_flow",
    title: "Logic Gates: Conditionals",
    description: "Make decisions in your scripts.",
    headerPrefix: "FIREWALL_SENS",
    missionPrefix: "PORT_SCAN",
    intro: "# Traffic Intercept: if Statements\n\nConditionals are the logic gates of your infiltration script. Use them to check if a port is open before attempting to broadcast your payload.",
    technical: "### Comparison Operators:\n- **Equal to** (`==`)\n- **Not equal to** (`!=`)\n- **Greater than** (`>`)\n- **Less than** (`<`)\n- **Greater or equal** (`>=`)\n- **Less or equal** (`<=`)\n\n### Structure and Indentation:\n1. Every `if` line must end with a **colon** (`:`).\n2. Python uses **Indentation** (4 spaces) to know which lines belong \"inside\" the if-statement.",
    example: "online = True\nif online == True:\n    print(\"Connection active\")",
    task: "### YOUR MISSION\n\nIf `port_open` is `True\", print \"BREACHING SECURITY\"\\`.",
    baseCode: "port_open = True\n# TODO: Write your if statement\n",
    hints: [
      "Use == for comparison or just 'if port_open:'.",
      "Don't forget the colon (:) at the end of the if line.",
      "Indent the code inside the if block."
    ],
    solution: "if port_open:\n    print(\"BREACHING SECURITY\")",
    solutionRegex: [/if\s+port_open/, /print/]
  },
{
    id: "control-else",
    level: "control_flow",
    title: "The Counter-Protocol: Else",
    description: "Handle the \"otherwise\" scenario in your logic.",
    headerPrefix: "SHADOW_GATE",
    missionPrefix: "AUTH_REVIEW",
    intro: "# Branching Paths: if/else\n\nThe mainframe has countered your first move. Use an else statement to provide a secondary path for your script when the primary condition isn't met.",
    technical: "### Rules of Engagement:\n1. `else` does **not** have its own condition.\n2. It must be at the same indentation level as its `if`.\n3. It also ends with a colon (`:`).",
    example: "access = False\n\nif access:\n    print(\"Welcome.\")\nelse:\n    print(\"Halt.\")",
    task: "### YOUR MISSION\n\nIf `key_valid` is `True`, print \"ACCESS GRANTED\", else print \"ALARM TRIGGERED\"\\`.",
    baseCode: "key_valid = False\n# TODO: Write an if/else block\n",
    hints: [
      "The 'else:' line must NOT be indented.",
      "The print statements INSIDE the if and else MUST be indented."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/]
  },
{
    id: "control-elif",
    level: "control_flow",
    title: "Multiple Pathways: Elif",
    description: "Check multiple specific conditions before giving up.",
    headerPrefix: "GATE_LOGIC",
    missionPrefix: "QUALIFY_CHECK",
    intro: "# Tiered Security: if/elif/else\n\nSome systems have multiple access levels. Use elif to check for specific clearance codes in order, only falling back to a total lockout if all checks fail.",
    technical: "You can chain as many `elif` statements as you need between the `if` and the `else`. Each one is checked in order.",
    example: "clearance = 1\nif clearance == 1:\n    print(\"Admin.\")\nelif clearance <= 4:\n    print(\"Operator.\")",
    task: "### YOUR MISSION\n\n- If `clearance` is `1\", print \"ROOT ACCESS\"\\`.\n- Elif \\`clearance\\` <= \\`5\\`, print \"LEVEL 5 ACCESS\"\\`.\n- Else print \"PERMISSION DENIED\"\\`.",
    baseCode: "clearance = 5\n# TODO: Write if/elif/else structure\n",
    hints: [
      "Use == for 'exactly equal to'.",
      "Use <= for 'less than or equal to'.",
      "Check clearance 1 first, then 5."
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/]
  },
{
    id: "control-meme-gen",
    level: "control_flow",
    title: "Algorithm: Hype Generator",
    description: "Use logic to choose the perfect reaction.",
    headerPrefix: "DEEP_HYPE_OS",
    missionPrefix: "MOOD_CHECK",
    intro: "# Media Training: If Logic\n\nHandle your operative's post-breach reaction. If they are detected, they might deliver a viral \"No Comment\" to the news streams to remain anonymous.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying meme identifiers.",
    example: "if is_detected:\n    print(\"NO COMMENT!\")\nelse:\n    print(\"All according to plan.\")",
    task: "### YOUR MISSION\n\nIf `is_detected`, `print` \"NO COMMENT!\", else `print` \"All according to plan.\"",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use a simple if/else.",
      "Strings from the operator can be blunt!"
    ],
    solution: "if is_detected:\n    print(\"NO COMMENT!\")\nelse:\n    print(\"All according to plan.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(.*\)/]
  },
{
    id: "control-nickname-gen",
    level: "control_flow",
    title: "The Identity Engine: Alias Status",
    description: "Generate unique titles based on reputation.",
    headerPrefix: "ALIAS_MGMT",
    missionPrefix: "RANK_AWARD",
    intro: "# Operative Status: Reputation\n\nAward a special rank to an operative based on their experience level. High-level hackers are inducted into the elite Shadow Council.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to check the power level.\n- **Assignment**: Update the `rank` variable inside the logic branches so the final value reflects the current system state.",
    example: "if power > 9000:\n    rank = \"Elite\"\nelse:\n    rank = \"Novice\"",
    task: "### YOUR MISSION\n\nIf `xp > 9000`, set `rank` to \"Elite\", else set `rank` to \"Novice\". Finally, `print(rank)`.",
    baseCode: "xp = 9001\nrank = \"\n# TODO: Generate rank and print it\n",
    hints: [
      "Assign the rank strings inside the if/else blocks.",
      "Make sure you print(rank) at the very end, outside the indentation."
    ],
    solution: "xp = 9001\nif xp > 9000:\n    rank = \"Elite\"\nelse:\n    rank = \"Novice\"\nprint(rank)",
    solutionRegex: [
      /if\s+xp\s*>\s*9000\s*:/,
      /rank\s*=\s*['"]Elite['"]/,
      /rank\s*=\s*['"]Novice['"]/,
      /print\s*\(\s*rank\s*\)/
    ]
  },
{
    id: "control-adventure",
    level: "control_flow",
    title: "Infiltration Path",
    description: "Build a choose-your-own-adventure logic gate.",
    headerPrefix: "TACTICAL_CMD",
    missionPrefix: "DECISION_TIME",
    intro: "# Shadow Protocol: Branching Paths\n\nYou are inside the server room. You must choose: \"1\" (Vault) or \"2\" (Backdoor). Every movement changes the outcome of the mission.",
    technical: "### Branching Narrative:\n- **Equality**: Use `==` to compare the `choice` string to specific targets.\n- **Else**: Handles invalid entries or unexpected paths.\n- **Indentation**: Each narrative result must be indented to belong to its branch.",
    example: "if choice == \"1\":\n    print(\"Entering Vault...\")",
    task: "### YOUR MISSION\n\nIf `choice` is **\"1\"**, `print` \"System Breached!\"; elif `choice` is **\"2\"**, `print` \"Backdoor Found!\"; else, `print` \"Connection Lost.\"",
    baseCode: "choice = \"1\"\n# TODO: Build the story branches\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "choice = \"1\"\nif choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [
      /if\s+choice\s*==\s*['"]1['"]\s*:/,
      /elif\s+choice\s*==\s*['"]2['"]\s*:/,
      /else\s*:/
    ]
  },
{
    id: "control-multi-elif",
    level: "control_flow",
    title: "Multi-Logic: Firewall Routing",
    description: "Use multiple paths to handle many possibilities.",
    headerPrefix: "SEC_ROUTING",
    missionPrefix: "DATA_DISPATCH",
    intro: "# Disciplinary Hub: Multi-Logic\n\nThe firewall must route incoming data packets. Handle the branches for Encryption, Protocol, and Handshake to keep the data flowing smoothly.",
    technical: "### Cascading Checks:\n- **Sequential**: Python checks each `if` and `elif` in order from top to bottom.\n- **Exclusive**: Only the **first** branch that is `True` will run. All others are ignored.\n- **Exhaustive**: An `else` at the end ensures you always have a fallback.",
    example: "if data == \"encrypt\":\n    print(\"Secure channel.\")\nelif data == \"open\":\n    print(\"Warning!\")",
    task: "### YOUR MISSION\n\nHandle 3 branches for `data`: \"secure\", \"proxy\", and \"local\". Use an `else` for \"Unknown IP\".",
    baseCode: "data = \"secure\"\n# TODO: Implement 4 branches\n",
    hints: [
      "You can use multiple 'elif' statements one after another.",
      "Make sure each if/elif line ends with a colon (:)."
    ],
    solution: "if data == \"secure\":\n    print(\"Encrypted.\")\nelif data == \"proxy\":\n    print(\"Redirected.\")\nelif data == \"local\":\n    print(\"Internal.\")\nelse:\n    print(\"Unknown IP\")",
    solutionRegex: [
      /if\s+data\s*==\s*['"]secure['"]\s*:/,
      /elif\s+data\s*==\s*['"]proxy['"]\s*:/,
      /elif\s+data\s*==\s*['"]local['"]\s*:/,
      /else\s*:/
    ]
  },
{
    id: "control-loops",
    level: "control_flow",
    title: "System Cycles: For Loops",
    description: "Iterate over sequences.",
    headerPrefix: "PROCESS_DRUM",
    missionPrefix: "CYCLE_TIMER",
    intro: "# Repetitive Tasks: For Loops\n\nComputers are perfect for repetitive tasks that would bore a human. Your operative needs to run diagnostics across multiple sectors\\u2014let's automate the scan cycle.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### The range() Function:\n- **Generation**: `range(n)` generates a sequence of numbers from `0` up to (but not including) `n`.\n- **Iteration**: The loop variable (often `i` for index) changes automatically with each cycle.\n- **Structure**: Ends with a colon (`:`) and uses 4 spaces for the inner block.",
    example: "for i in range(3):\n    print(f\"Packet {i+1} sent!\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Sector {i+1} scanned\" for each of the 5 cycles.",
    baseCode: "# TODO: Write your for loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop."
    ],
    solution: "for i in range(5):\n    print(f\"Sector {i+1} scanned\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
{
    id: "loop-data-scan",
    level: "control_flow",
    title: "Data Stream: String Loops",
    description: "Iterate through characters in a data stream.",
    headerPrefix: "PACKET_INSPECT",
    missionPrefix: "STREAM_SCAN",
    intro: "# Character Analysis: String Iteration\n\nIn the digital realm, strings are treated as sequences of bytes. This means you can \"walk\" through a security token or server address, character by character.",
    technical: "### Sequential Access:\n- **Variable**: The loop variable (e.g., `char`) represents the current character in each cycle.\n- **Iteration**: The loop ends automatically when it reaches the end of the string.",
    example: "for char in \"BREACH\":\n    print(char)",
    task: "### YOUR MISSION\n\nYou've intercepted an encrypted signal: \"SEC-9\". Use a `for` loop to iterate through every character in the variable `signal` and `print` it.",
    baseCode: "signal = \"SEC-9\"\n# TODO: Loop through each character\n",
    hints: [
      "for char in signal:",
      "print(char)"
    ],
    solution: "signal = \"SEC-9\"\nfor char in signal:\n    print(char)",
    solutionRegex: [/for\s+char\s+in\s+signal/, /print\s*\(\s*char\s*\)/]
  },
{
    id: "loop-list-audit",
    level: "control_flow",
    title: "Node Audit: List Iteration",
    description: "Scan your inventory for specific patterns.",
    headerPrefix: "ASSET_SCAN",
    missionPrefix: "PY_FILTER",
    intro: "# Batch Audit: List Loops\n\nYou need to find all the security scripts in a directory. We can use a loop to scan the entire list and filter for specific file extensions.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current item's name (like `\"breach.py\"`, then `\"logs.txt\"`, and so on). You can name this variable anything (e.g., `for file in discovered_files:`), but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".py\")` asks: *\"Does the text inside `f` end with `.py`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".py\"):\n          # This runs ONLY if the current file ends with .py!\n  ```",
    example: "files = [\"data.txt\", \"exploit.py\"]\nfor f in files:\n    if \".py\" in f:\n        print(f)",
    task: "### YOUR MISSION\n\nScan `discovered_files`. If a file ends with \".py\", `print` the message: `f\"Analyzing: {f}\".",
    baseCode: "discovered_files = [\"breach.py\", \"logs.txt\", \"sniff.py\", \"data.json\"]\n# TODO: Audit the list and print .py files\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".py\"):",
      "Use an f-string to print."
    ],
    solution: "discovered_files = [\"breach.py\", \"logs.txt\", \"sniff.py\", \"data.json\"]\nfor f in discovered_files:\n    if f.endswith(\".py\"):\n        print(f\"Analyzing: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith/]
  },
{
    id: "loop-nested",
    level: "control_flow",
    title: "Matrix Scan: Nested Loops",
    description: "Master the art of scanning multi-dimensional grids and matrix structures.",
    headerPrefix: "GRID_RUNNER",
    missionPrefix: "COORDS_SCAN",
    intro: "# Node & Port: Nested Loops\n\nThe network is a grid of nodes and ports. To scan every available access point, we need one loop for the nodes and another loop inside it for the ports.",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 grid scan with variable `x` (outer loop) and variable `y` (inner loop) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0`\n   - *Inner loop runs completely*:\n     - `y = 0` -> Output: `X: 0, Y: 0`\n     - `y = 1` -> Output: `X: 0, Y: 1`\n     - `y = 2` -> Output: `X: 0, Y: 2`\n2. **Outer loop moves to next step**: `x = 1`\n   - *Inner loop runs completely again*:\n     - `y = 0` -> Output: `X: 1, Y: 0`\n     - `y = 1` -> Output: `X: 1, Y: 1`\n     - `y = 2` -> Output: `X: 1, Y: 2`\n3. **Outer loop moves to last step**: `x = 2`\n   - *Inner loop runs completely one last time*:\n     - `y = 0` -> Output: `X: 2, Y: 0`\n     - `y = 1` -> Output: `X: 2, Y: 1`\n     - `y = 2` -> Output: `X: 2, Y: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for x in [1, 2]:\n    for y in [\"A\", \"B\"]:\n        print(f\"{x}{y}\")",
    task: "### YOUR MISSION\n\nScan a **3x3 grid**. Use two nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the coordinates in this exact format: `f\"X: {x}, Y: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Write your nested loops\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"X: {x}, Y: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"X: {x}, Y: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
{
    id: "loop-break-continue",
    level: "control_flow",
    title: "Precision Cycles: Break and Continue",
    description: "Control your loops with precision.",
    headerPrefix: "CORE_EXEC",
    missionPrefix: "VAL_LIMIT",
    intro: "# Manual Override: Break and Continue\n\nSometimes you need to terminate an infiltration cycle early or skip a specific node. Python provides two keywords for this manual flow control.",
    technical: "### Flow Control:\n- `break`: Emergency exit. It kills the loop immediately and moves to the code below it.\n- `continue`: Skip cycle. It stops the current iteration and jumps straight to the start of the next cycle.",
    example: "for i in range(10):\n    if i == 5:\n        break # Stops entirely at 5",
    task: "### YOUR MISSION\n\nLoop through `range(10)`. If the number is `7`, `break` the loop (Protocol breached). Otherwise, `print` the current cycle number.",
    baseCode: "# TODO: Write loop with break condition\n",
    hints: [
      "Use 'for i in range(10):'.",
      "Check 'if i == 7:'.",
      "Use 'break' inside the if block."
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/]
  },
{
    id: "control-while",
    level: "control_flow",
    title: "Persistent Pulse: While Loops",
    description: "Loop until a condition is met.",
    headerPrefix: "PULSE_MONITOR",
    missionPrefix: "PWR_DECAY",
    intro: "# Energy Cycles: While Loops\n\nWhile `for` loops iterate over a specific sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor power levels during a long-range hack.",
    technical: "### Comparison:\n- **Loop Type Difference**: While for loops iterate over a specific sequence, while loops keep running as long as a condition remains True.\n- **Infinite Risk**: If the condition never becomes `False`, the loop runs forever (Infinite Loop). Always ensure your code modifies the state! \n- **Uncertain Cycles**: Perfect for when you don't know exactly how many times you need to repeat\\u2014like waiting for a security token to expire.",
    example: "power = 100\nwhile power > 0:\n    print(\"Breaching...\")\n    power -= 10",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0\", subtract \\`20\\` from \\`battery\\`.\n3. \\`print\\` the current \\`battery\\` level inside the loop.",
    baseCode: "battery = 100\n# TODO: Write your while loop\n",
    hints: [
      "Use 'while battery > 0:'.",
      "Subtract inside: 'battery -= 20'.",
      "Print it inside the loop."
    ],
    solution: "battery = 100\nwhile battery > 0:\n    battery -= 20\n    print(battery)",
    solutionRegex: [/while\s+battery\s*>\s*0/, /battery\s*(-=)\s*20/, /print/]
  },
{
    id: "loop-while-countdown",
    level: "control_flow",
    title: "Self-Destruct: Countdown",
    description: "Create a countdown timer using a while loop.",
    headerPrefix: "AUTODESTRUCT",
    missionPrefix: "SEC_PURGE",
    intro: "# Tick-Tock: The Countdown\n\nWhile loops are the standard choice for timers and self-destruct protocols. Decrease a counter until the system is fully purged.",
    technical: "### Sequential Decay:\n- **Initialization**: Set your start value outside the loop.\n- **Condition**: Check if the value is above zero.\n- **Indentation**: Ensure the subtraction happens **inside** the loop block so the condition can eventually fail.",
    example: "t = 3\nwhile t > 0:\n    print(t)\n    t -= 1\nprint(\"PURGED\")",
    task: "### YOUR MISSION\n\n1. Use a `while` loop to countdown `timer` from `5` down to `1`.\n2. Inside the loop, `print` current `timer` then subtract `1`.\n3. After the loop, `print` \"SYSTEM PURGED\".",
    baseCode: "timer = 5\n# TODO: Countdown and victory message\n",
    hints: [
      "The victory message print must NOT be indented.",
      "Check if timer > 0."
    ],
    solution: "timer = 5\nwhile timer > 0:\n    print(timer)\n    timer -= 1\nprint(\"SYSTEM PURGED\")",
    solutionRegex: [/while\s+timer\s*>\s*0/, /print\s*\(\s*timer\s*\)/, /print\s*\(\s*['"]SYSTEM PURGED['"]\s*\)/]
  },
{
    id: "while-logic",
    level: "control_flow",
    title: "Adaptive Logic: While + If",
    description: "Combine while loops with conditional logic.",
    headerPrefix: "CORE_DECRYPT",
    missionPrefix: "AUTO_ADAPT",
    intro: "# Adaptive Cycles: Logic in Loops\n\nThe mainframe defense adapts as you hack. Use an `if` statement inside your `while` loop to react to changing security variables in real-time.",
    technical: "### Complexity in Iteration:\n- **Nesting**: You can place any amount of code inside a loop, including more loops or complex if/elif/else structures.\n- **Indentation**: Remember that the code inside the `if` needs to be indented **again** (8 spaces total).",
    example: "while online:\n    if signal < 5:\n        print(\"Boosting...\")",
    task: "### YOUR MISSION\n\n1. While `security` is > `0`.\n2. Subtract `10` from `security`.\n3. **If** `security` is exactly `50\", \\`print\\` \"Halfway breached!\".",
    baseCode: "security = 100\n# TODO: Combine while and if\n",
    hints: [
      "Use 'while security > 0:'.",
      "Indent the 'if' inside the while.",
      "Check 'if security == 50:'."
    ],
    solution: "security = 100\nwhile security > 0:\n    security -= 10\n    if security == 50:\n        print(\"Halfway breached!\")",
    solutionRegex: [/while\s+security\s*>\s*0/, /if\s+security\s*==\s*50/]
  },
{
    id: "while-password",
    level: "control_flow",
    title: "Security Key: Input While",
    description: "Use a loop to force a correct encryption key.",
    headerPrefix: "GATE_ENTRY",
    missionPrefix: "CHALLENGE_RES",
    intro: "# The Access Gate: Input Loops\n\nIn high-security zones, we use `while` loops to repeatedly challenge for a decryption key until the correct data is received. This prevents \"one-off\" attempts from bypassing the terminal.",
    technical: "### The Infinite Retry:\n- **Initialization**: Set your variable to an \"incorrect\" value outside the loop to ensure it enters the first cycle.\n- **Condition**: Use `!=` (not equal) to keep looping until the match is found.\n- **Update**: You **must** call `input()` inside the loop to allow the user to change the variable's value.",
    example: "key = \"\"\nwhile key != \"OPEN\":\n    key = input(\"Enter Key: \")",
    task: "### YOUR MISSION\n\n1. Initialize `code = \"\"`.\n2. Write a `while` loop that runs while `code` is **NOT equal to** \"ROUTINE\".\n3. Inside, update `code` with: `input(\"SECURITY CHALLENGE: \")`.\n4. Outside the loop, `print` \"Access Granted\".",
    baseCode: "# TODO: Implement the security gate loop\n",
    hints: [
      'Initialize code = "" before the loop.',
      "Use != for 'not equal'.",
      "Update code inside the loop."
    ],
    solution: "code = \"\"\nwhile code != \"ROUTINE\":\n    code = input(\"SECURITY CHALLENGE: \")\nprint(\"Access Granted\")",
    solutionRegex: [/code\s*=\s*['"]['"]/, /while\s+code\s*!=\s*['"]ROUTINE['"]/, /code\s*=\s*input/, /print\s*\(\s*['"]Access Granted['"]\s*\)/]
  },
{
    id: "list-filtering",
    level: "control_flow",
    title: "Neural Filtering: List Comprehension",
    description: "Filter existing lists with a single line of code.",
    headerPrefix: "SIGNAL_CLEANER",
    missionPrefix: "FREQ_FILTER",
    intro: "# Noise Reduction: Basic Comprehensions\n\nA system administrator needs to filter out noise from a data stream instantly. Use list comprehensions to find packets with a frequency above the required threshold.",
    technical: "### Decoding the Syntax:\n`[item for item in old_list if condition]`\n\n1. **Extraction**: The first `item` is what actually gets added to the new list.\n2. **Iteration**: The `for` loop looks at every piece of data.\n3. **Filtering**: The `if` check decides if the item is kept or discarded.",
    example: "# Filter values greater than 50 from signal_data\nsignal_data = [12, 55, 34, 89, 21, 67]\nhigh_freq = [s for s in signal_data if s > 50]\nprint(high_freq)  # Output: [55, 89, 67]",
    task: "### YOUR MISSION\n\nYou have `signal_data`. Create `high_freq` which contains only values **greater than 50**. Print it.",
    baseCode: "signal_data = [12, 55, 34, 89, 21, 67]\n# TODO: Filter signals > 50\n",
    hints: [
      "Use the pattern: [s for s in signals if s > 50]",
      "The first 's' is what gets added to the new list.",
      "Then print the high_freq list."
    ],
    solution: "high_freq = [s for s in signal_data if s > 50]\nprint(high_freq)",
    solutionRegex: [/high_freq\s*=\s*\[\s*.*\s+for\s+.*\s+in\s+signal_data\s+if\s+.*\s*>\s*50\s*\]/]
  },
{
    id: "list-comprehension-range",
    level: "control_flow",
    title: "Automated Synthesis: List Comprehensions",
    description: "Filter and transform lists with a single line of code.",
    headerPrefix: "KEY_GENERATOR",
    missionPrefix: "VALID_KEYS",
    intro: "# Key Generation: List Comprehensions\n\nAutomatically generate security keys for a new subnet. Use comprehensions to identify even-numbered values for specific packet distributions across the local network.",
    technical: "### Advanced Logic:\n- **Transformation**: You can modify the item before adding it (e.g., `[x*2 for x in list]`).\n- **Generation**: Use `range(n)` to generate numbers without an existing list.\n- **Modulo Check**: Use `% 2 == 0` to identify even numbers during the filter phase.",
    example: "# Keep only even values from security_codes using list comprehension\nsecurity_codes = [101, 102, 103, 104, 105, 106, 107, 108]\nvalid_pings = [c for c in security_codes if c % 2 == 0]\nprint(valid_pings)  # Output: [102, 104, 106, 108]",
    task: "### YOUR MISSION\n\nYou have `security_codes`. Create `valid_pings` containing only **even** values from the list. Print it.",
    baseCode: "security_codes = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Filter even codes into valid_pings\n",
    hints: [
      "Use the modulo operator % 2 == 0 to check for even numbers.",
      "Pattern: [code for code in security_codes if code % 2 == 0]",
      "Don't forget to print(valid_pings) at the end."
    ],
    solution: "valid_pings = [c for c in security_codes if c % 2 == 0]\nprint(valid_pings)",
    solutionRegex: [/valid_pings\s*=\s*\[\s*.*\s+for\s+.*\s+in\s+security_codes\s+if\s+.*\s*%\s*2\s*==\s*0\s*\]/]
  },
{
    id: "functions-intro",
    level: "functions",
    title: "Command Packaging: Intro to Functions",
    description: "Learn how to package logic into reusable blocks.",
    headerPrefix: "MODULE_DEF",
    missionPrefix: "SCRIPT_INIT",
    intro: "# Tactical Toolkits: Functions\n\nA function is like a pre-written infiltration script. Instead of rewriting every instruction every time, you just call the script name and the terminal executes its sub-routines.",
    technical: "### Definition vs Call:\n- **def**: The keyword used to \"define\" the function.\n- **Name**: Use snake_case for descriptive names.\n- **Parameters**: Variables inside the `()` act as inputs.\n- **Execution**: To run it, type the name with parentheses: `my_func()`.",
    example: "def broadcast(signal):\n    print(f\"Broadcasting: {signal}\")",
    task: "### YOUR MISSION\n\nDefine a function named `alert_system` that accepts one parameter: `status`.\n1. Inside, it should `print` a message: `f\"System alert triggered: {status}\".\n2. Finally, **call** your function with \"OVERHEAT\".",
    baseCode: "# TODO: Define alert_system\n",
    hints: [
      "Use the 'def' keyword.",
      "Include the argument in parentheses.",
      "Call it outside the indent."
    ],
    solution: "def alert_system(status):\n    print(f\"System alert triggered: {status}\")\n\nalert_system(\"OVERHEAT\")",
    solutionRegex: [/def\s+alert_system\s*\(\s*status\s*\)\s*:/, /print\s*\(/, /alert_system\s*\(\s*['"]OVERHEAT['"]\s*\)/]
  },
{
    id: "functions-multi-params",
    level: "functions",
    title: "Multi-Flow Input: Arguments",
    description: "Passing multiple variables into a single function.",
    headerPrefix: "SEC_PARAMETER",
    missionPrefix: "DATA_PASS",
    intro: "# Multi-Flow Input: Arguments\n\nMost complex infiltration tools need more than one piece of data, like a server IP and a port number. To handle multiple inputs, you list them inside the parentheses, **separated by a comma**.",
    technical: "### Syntax Pattern:\n- **Definition**: `def my_function(first_item, second_item):` \n- **Usage**: When calling the function, you must provide values (arguments) for both, also separated by a comma.",
    example: "def login(user, passw):\n    print(f\"Logging in {user}...\")",
    task: "### YOUR MISSION\n\nDefine `access_node` with two parameters: `node_id` and `sector`.\n1. Inside, `print`: `f\"Accessing node {node_id} in sector {sector}\".\n2. Call it with `101` and \"B7\".",
    baseCode: "# TODO: Define and call access_node\n",
    hints: [
      "Separate parameters with a comma: def func(a, b):",
      "Call it with a number and a string."
    ],
    solution: "def access_node(node_id, sector):\n    print(f\"Accessing node {node_id} in sector {sector}\")\n\naccess_node(101, \"B7\")",
    solutionRegex: [/def\s+access_node\s*\(\s*node_id\s*,\s*sector\s*\)\s*:/, /print\s*\(/, /access_node\s*\(\s*101\s*,\s*['"]B7['"]\s*\)/]
  },
{
    id: "functions-return",
    level: "functions",
    title: "The Result: Returning Data",
    description: "Learn how to get information back from a function.",
    headerPrefix: "DATA_EXTRACT",
    missionPrefix: "VAL_RETURN",
    intro: "# Extraction Phase: Return Values\n\nSometimes you don't just want a function to print something\\u2014you want it to calculate a value and give it back to you. This is essential for chaining complex logical operations together.",
    technical: "### The return Keyword:\n- **Yielding**: The `return` statement exits the function immediately and \"returns\" the following value to the caller.\n- **Storage**: You can catch a returned value by assigning it to a variable: `result = my_func()`.",
    example: "def add(a, b):\n    return a + b\n\nx = add(5, 5) # x is now 10",
    task: "### YOUR MISSION\n\n1. Define `calc_offset(base, drift)` that **returns** `base + drift`.\n2. Call it with `100` and `5\", and \\`print\\` the result.",
    baseCode: "# TODO: Define and print returned value\n",
    hints: [
      "Use 'return base + drift'.",
      "Do NOT print inside the function.",
      "Print the result of the function call outside."
    ],
    solution: "def calc_offset(base, drift):\n    return base + drift\n\nresult = calc_offset(100, 5)\nprint(result)",
    solutionRegex: [/return\s+base\s*\+\s*drift/, /print\s*\(\s*result\s*\)/]
  },
{
    id: "functions-lambda",
    level: "functions",
    title: "Ghost Scripts: Lambdas",
    description: "Short, one-liner functions for quick logic.",
    headerPrefix: "LAMBDA_X",
    missionPrefix: "ONE_LINER",
    intro: "# Anonymous Logic: Lambdas\n\nLambda functions are \"ghost scripts\"\\u2014anonymous, one-liner functions that exist only to perform a single logical task. Use them for quick data transformations without the overhead of a full definition.",
    technical: "### The One-Liner:\n- **Syntax**: `lambda arguments: expression` \n- **Simplicity**: No `def`, no `return` keyword, just pure logic in a single line.",
    example: "square = lambda x: x * x\nprint(square(4)) # 16",
    task: "### YOUR MISSION\n\nCreate a lambda named `double` that takes `x` and returns `x * 2`. `print` the result of `double(10)`.",
    baseCode: "# TODO: Write a lambda function\n",
    hints: [
      "Use 'double = lambda x: x * 2'.",
      "Then call print(double(10))."
    ],
    solution: "double = lambda x: x * 2\nprint(double(10))",
    solutionRegex: [/double\s*=\s*lambda\s+x\s*:\s*x\s*\*\s*2/, /print\s*\(\s*double\s*\(\s*10\s*\)\s*\)/]
  },
{
    id: "functions-recursion",
    level: "functions",
    title: "Recursive Loop: Deep Infiltration",
    description: "A function that calls itself to solve nested problems.",
    headerPrefix: "RECURSE_D",
    missionPrefix: "NESTED_SCAN",
    intro: "# Deep Descent: Recursion\n\nRecursion is when a function calls itself. It's like a Russian doll of logic, used to drill down into complex, nested data structures like encrypted directories or deep neural branches.",
    technical: "### Rules of Infinite Descent:\n- **Base Case**: You **must** have a condition that stops the recursion, or your program will crash (stack overflow).\n- **Recursive Step**: The function calls itself with a slightly different (usually smaller) input.",
    example: "def count(n):\n    if n == 0: return\n    print(n)\n    count(n-1)",
    task: "### YOUR MISSION\n\nWrite a recursive function `countdown(n)` that prints `n` and then calls `countdown(n-1)` **if n > 0**. Call it with `3`.",
    baseCode: "# TODO: Create a recursive function\n",
    hints: [
      "Check 'if n > 0:' before calling itself.",
      "Make sure you subtract 1 in the recursive call."
    ],
    solution: "def countdown(n):\n    print(n)\n    if n > 0:\n        countdown(n-1)\n\ncountdown(3)",
    solutionRegex: [/def\s+countdown/, /countdown\s*\(\s*n\s*-\s*1\s*\)/, /countdown\s*\(\s*3\s*\)/]
  },
{
    id: "oop-intro",
    level: "oop",
    title: "Digital Genesis: Basic Classes",
    description: "Define the blueprint for your digital comrades.",
    headerPrefix: "ENTITY_PLAN",
    missionPrefix: "NEW_BOT_TYPE",
    intro: "# Variable Templates: Classes\n\nCreate a blueprint for your software agents. This allows you to track individual states for every operative in the network without duplicate code.",
    technical: "### Creating a Class:\n- **Keyword**: Use `class` followed by a PascalCase name (e.g. `Operative`).\n- **pass**: A placeholder keyword for an empty body.\n- **Call**: To create an object, call the class like a function: `my_obj = MyClass()`.",
    example: "class Drone:\n    pass\n\nbot1 = Drone()",
    task: "### YOUR MISSION\n\nDefine a class `Operative`. Use `pass` inside the body.",
    baseCode: "# TODO: Define class Operative\n",
    hints: [
      "Use 'class Operative:' followed by an indented 'pass'.",
      "Check your spelling carefully!"
    ],
    solution: "class Operative:\n    pass",
    solutionRegex: [/class\s+Operative/, /pass/]
  },
{
    id: "oop-init",
    level: "oop",
    title: "Neural Link: Constructors",
    description: "Assign unique identities to your operatives.",
    headerPrefix: "ID_CARD_GEN",
    missionPrefix: "OP_SETUP",
    intro: "# Variable Initialization: __init__\n\nInitialize an operative's core variables\\u2014their designation and encryption level\\u2014when they are first booted into the mainframe.",
    technical: "### The self Key:\n- **Identity**: Inside a class, `self` refers to the specific instance we are currently talking to. It's how a class recognizes its own internal data.\n- **Assignment**: Use `self.variable = value` to store information on the instance.",
    example: "class Bot:\n    def __init__(self, id):\n        self.id = id",
    task: "### YOUR MISSION\n\nIn `Operative`, define `__init__` that takes `designation`. Assign `designation` to `self.designation`.",
    baseCode: "class Operative:\n    # TODO: Add __init__\n",
    hints: [
      "def __init__(self, designation):",
      "Assign it: self.designation = designation"
    ],
    solution: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*designation\s*\)\s*:/, /self\.designation\s*=\s*designation/]
  },
{
    id: "oop-methods",
    level: "oop",
    title: "Hardware Upgrade: Methods",
    description: "Teach your objects how to perform actions.",
    headerPrefix: "SYS_ACTION",
    missionPrefix: "FUNC_LINK",
    intro: "# Internal Functions: Methods\n\nA method is a function that lives inside a class. It represents an action that an object can perform, like encrypted communication or system purging.",
    technical: "### Defining Methods:\n- **Indent**: Methods must be indented inside the class block.\n- **self**: Every method **must** take `self` as its first parameter to access the object's data.",
    example: "class Drone:\n    def pilot(self):\n        print(\"Engaging...\")",
    task: "### YOUR MISSION\n\nAdd a `ping` method to `Operative` that `print`s \"Signal sent\".",
    baseCode: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n    # TODO: Add ping method\n",
    hints: [
      "Methods need (self) as the first parameter.",
      "Just use a simple print inside."
    ],
    solution: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n    def ping(self):\n        print(\"Signal sent\")",
    solutionRegex: [/def\s+ping\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Signal sent['"]\s*\)/]
  },
{
    id: "oop-state",
    level: "oop",
    title: "Variable Integrity: Local vs Global",
    description: "Understand how objects maintain their own data state.",
    headerPrefix: "RAM_ALLOC",
    missionPrefix: "STATE_PROTECT",
    intro: "# Memory Segregation: Object State\n\nEach operative instance maintains its own memory space. This means one operative can be \"Active\" while another is \"Hibernate\", even though they share the same class blueprint.",
    technical: "### Internal State:\n- **Assignment**: Methods can modify `self` variables (like `self.status`).\n- **Isolation**: Changes in `bot_a` do not affect `bot_b`.",
    example: "class Bot:\n    def reboot(self):\n        self.power = 100",
    task: "### YOUR MISSION\n\n1. Give `Operative` a `status` variable in `__init__` (default to \"Offline\").\n2. Add an `activate` method that sets `self.status` to \"Online\".",
    baseCode: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n        # TODO: Add status\n    # TODO: Add activate method\n",
    hints: [
      "self.status = 'Offline' inside __init__.",
      "self.status = 'Online' inside activate()."
    ],
    solution: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n        self.status = \"Offline\"\n    def activate(self):\n        self.status = \"Online\"",
    solutionRegex: [/self\.status\s*=\s*['"]Offline['"]/, /def\s+activate/, /self\.status\s*=\s*['"]Online['"]/]
  },
{
    id: "oop-interaction",
    level: "oop",
    title: "Neural Cross-Link: Interaction",
    description: "Learn how objects can interact with each other.",
    headerPrefix: "P2P_HANDSHAKE",
    missionPrefix: "NODE_TRUST",
    intro: "# Object Interaction: Handshakes\n\nIn the digital matrix, single operatives don't work alone. They must learn to interact with other objects, passing data and establishing trusted connections across different memory spaces.",
    technical: "### Passing Objects:\n- **Arguments**: You can pass an entire object into a method just like any other variable.\n- **Access**: Inside the method, you can access the other object's attributes using its name (e.g., `other.name`).",
    example: "def sync(self, other):\n    print(f\"Syncing with {other.id}\")",
    task: "### YOUR MISSION\n\nAdd a `scan` method to `Operative` that takes `other` as a parameter. It should `print` the message: `f\"Targeting: {other.designation}\".",
    baseCode: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n    # TODO: Add scan method\n",
    hints: [
      "The method needs (self, other).",
      "Access the other object's data with other.designation."
    ],
    solution: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n    def scan(self, other):\n        print(f\"Targeting: {other.designation}\")",
    solutionRegex: [/def\s+scan\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.designation/]
  },
{
    id: "oop-inheritance",
    level: "oop",
    title: "Code Evolution: Inheritance",
    description: "Learn how to create specialized objects from base ones.",
    headerPrefix: "DNA_REPLICATE",
    missionPrefix: "CLASS_EXPAND",
    intro: "# Genetic Branching: Inheritance\n\nInheritance allows you to create a \"Child\" class that automatically receives all the variables and methods of its \"Parent\". Use this to build specialized operatives (like a \"Spy\") based on a standard \"Operative\" template.",
    technical: "### Parent-Child Link:\n- **Syntax**: `class Child(Parent):` \n- **Hierarchy**: The Child class inherits everything but can also add its own unique methods or override existing ones.",
    example: "class Spy(Operative):\n    def cloak(self):\n        print(\"Invisible\")",
    task: "### YOUR MISSION\n\nCreate a class `SecurityExpert` that inherits from `Operative`. Give it an `encrypt` method that `print`s \"Data secured\".",
    baseCode: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n# TODO: Create SecurityExpert(Operative)\n",
    hints: [
      "Use 'class SecurityExpert(Operative):'.",
      "Then define the encrypt method inside."
    ],
    solution: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n\nclass SecurityExpert(Operative):\n    def encrypt(self):\n        print(\"Data secured\")",
    solutionRegex: [/class\s+SecurityExpert\s*\(\s*Operative\s*\)\s*:/, /def\s+encrypt/]
  },
{
    id: "oop-str",
    level: "oop",
    title: "System Description: __str__",
    description: "Control how your objects are represented as text.",
    headerPrefix: "LOG_FORMATTER",
    missionPrefix: "TEXT_REPORT",
    intro: "# Data Output: The string method\n\nBy default, printing an object displays a weird memory address. Use the `__str__` method to define a clean, human-readable status report for your operatives.",
    technical: "### Representation:\n- **Return**: `__str__` must **return** a string, not print it.\n- **Trigger**: This method is called automatically whenever you use `print(object)` or `str(object)`.",
    example: "def __str__(self):\n    return f\"Bot: {self.id}\"",
    task: "### YOUR MISSION\n\nIn `Operative`, add `__str__` that returns: `f\"Operative {self.designation}\".",
    baseCode: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n    # TODO: Add __str__\n",
    hints: [
      "The method name is exactly __str__ with double underscores.",
      "It must return the string."
    ],
    solution: "class Operative:\n    def __init__(self, designation):\n        self.designation = designation\n    def __str__(self):\n        return f\"Operative {self.designation}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Operative.*self\.designation.*['"]/]
  },
{
    id: "oop-class-vars",
    level: "oop",
    title: "Central Control: Class Variables",
    description: "Learn to share data across ALL instances of a class.",
    headerPrefix: "GLOBAL_REG",
    missionPrefix: "CLASS_WIDE",
    intro: "# Global Invariants: Class Variables\n\nClass variables belong to the class itself, not to any single operative. If you update a class variable, every operative in the network sees the change simultaneously.",
    technical: "### Shared Memory:\n- **Placement**: Define class variables outside of `__init__`, directly inside the class block.\n- **Access**: You can access them via `ClassName.variable` or `self.variable`.",
    example: "class Bot:\n    version = 1.0\n\nb1 = Bot()\nprint(b1.version) # 1.0",
    task: "### YOUR MISSION\n\n1. Add a class variable `security_level = \"High\" to `Operative`.\n2. `print` the class variable using `Operative.security_level`.",
    baseCode: "class Operative:\n    # TODO: Add class variable\n    pass\n# TODO: Print it\n",
    hints: [
      "The variable goes above __init__ or right at the top of the class.",
      "Print it using the class name."
    ],
    solution: "class Operative:\n    security_level = \"High\"\n\nprint(Operative.security_level)",
    solutionRegex: [/security_level\s*=\s*['"]High['"]/, /print\s*\(\s*Operative\.security_level\s*\)/]
  }
];
