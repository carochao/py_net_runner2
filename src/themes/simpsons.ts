export const SIMPSONS_THEME: any = {
  "intro-print": {
    headerPrefix: "SPRINGFIELD_OS",
    missionPrefix: "HOMER_ALERT",
    intro: "# Nuclear Console: print()\n\nWelcome to Sector 7G of the Springfield Power Plant. Homer is napping, and the reactor console is blinking furiously. Test the core microphone system by printing a direct alert.",
    task: "Use `print()` to display: `\"Donut Power Source: ACTIVE\"`",
    baseCode: "# TODO: Wake up Homer\n",
    solution: "print(\"Donut Power Source: ACTIVE\")",
    solutionRegex: [/print\s*\(\s*['\"]Donut Power Source: ACTIVE['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "BURNS_CO",
    missionPrefix: "POWER_CASE_SAFETY",
    intro: "# Burns Controls: Power Case Safety\n\nSafety inspector Homer Simpson has to watch the reactor monitors carefully. Mr. Burns' legacy systems are extremely sensitive; typing capital commands like `Print()` or duplicating variable labels with uppercase letters will trigger full plant sirens! Enter your codes in pure, clean lowercase.",
    task: "Define a lowercase indicator variable named `donut_inventory` and set it to `12`. Print the donut storage using `print()` to reassure Homer. Do it all in lowercase!",
    baseCode: "# TODO: Create donut_inventory and print it\n",
    solution: "donut_inventory = 12\nprint(donut_inventory)",
    solutionRegex: [/donut_inventory\s*=\s*12/, /print\s*\(\s*donut_inventory\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "CHALKBOARD_LOG",
    missionPrefix: "BART_DETENTION",
    intro: "# Blackboard Writing: Comments\n\nBart needs to write lines on the school chalkboard. In Python, programmers write notes that are completely ignored by the computer using comments.",
    task: "Write a comment `# I will not photocopy my butt` and then `print(\"Class dismissed\")`",
    baseCode: "# TODO: Write chalkboard line\n",
    solution: "# I will not photocopy my butt\nprint(\"Class dismissed\")",
    solutionRegex: [/#.*I will not photocopy my butt/, /print\s*\(\s*['\"]Class dismissed['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "NUCLEAR_HUD",
    missionPrefix: "STASH_LOCK",
    intro: "# Sector 7G Console: Inline Comments\n\nUnder Mr. Burns' strict supervision, Homer manages the local core parameters. Add a quick inline note next to your snack indicators to keep them hidden.",
    task: "Initialise `donut_count` to `12`. On the same line, add an inline comment `# Secret drawer stash`.",
    baseCode: "# TODO: Initialise donut count with inline comment\n",
    solution: "donut_count = 12 # Secret drawer stash",
    solutionRegex: [/donut_count\s*=\s*12/, /#.*Secret drawer stash/]
  },
  "intro-vars": {
    headerPrefix: "KWIK_E_LOG",
    missionPrefix: "APU_INVENTORY",
    intro: "# Squishee Machine: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled glass jar** on Apu's store shelf! You write a label on the jar (like `squishee_cups`), put your inventory items inside, and change or recount them when customers buy them.\n\nApu needs to keep track of store inventory under Springfield's summer heat. Let's use variables to log squishee cups remaining and frozen store items.",
    task: "Create `squishee_cups` set to `64` and `frozen_items` set to `1500`.",
    baseCode: "# TODO: Track store products\n",
    solution: "squishee_cups = 64\nfrozen_items = 1500",
    solutionRegex: [/squishee_cups\s*=\s*64/, /frozen_items\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "BAR_TAB",
    missionPrefix: "MOES_LOG",
    intro: "# Moe's Tavern Tab: Reassignment\n\nHomer just finished another pint of Duff beer! Update his running tab variable to reflect the new total before Moe suspects anything.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "duff_order_count = 1.0\nprint(duff_order_count)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\nduff_order_count = 2.1\nprint(duff_order_count)  # Output: 2.1",
    task: "Initialise `duff_order_count` as `1.0`. Then update `duff_order_count` to `2.1`. Print it.",
    baseCode: "duff_order_count = 1.0\n# TODO: Add more pints to 2.1\n",
    solution: "duff_order_count = 1.0\nduff_order_count = 2.1\nprint(duff_order_count)",
    solutionRegex: [/duff_order_count\s*=\s*1\.0/, /duff_order_count\s*=\s*2\.1/, /print\s*\(\s*duff_order_count\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "BURNS_CO",
    missionPrefix: "SNACK_BUFFER",
    intro: "# Echo Request: Homer's Snack Reserve\n\nWait for the Kwik-E-Mart automated delivery drone to push a response packet! Before Apu's fresh glazed delivery signal bypasses Sector 7G's terminal, set up an empty placeholder variable in the safety computer's memory buffer to catch the incoming donut quantity.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `simpsons_data = \"\"` as a placeholder, we allocate space in memory. Then, running `simpsons_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the new donut quantity dynamically so you can see it change!",
    example: "simpsons_data = \"\"  # Memory slot is allocated and empty\nsimpsons_data = input(\"Enter donut quantity: \")  # Line 2 updates the empty string with your input!\nprint(\"Intercepting delivery: \" + simpsons_data)",
    task: "1. Initialize `simpsons_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter donut quantity: \")` to populate it.\n3. Print `\"Intercepting delivery: \" + simpsons_data`.",
    baseCode: "# TODO: Initialize empty snack buffer, capture, and print\n",
    hints: [
      "Use simpsons_data = \"\" to prepare the buffer.",
      "Use simpsons_data = input(\"Enter donut quantity: \") to capture the stream.",
      "Print \"Intercepting delivery: \" combined with the simpsons_data variable."
    ],
    solution: "simpsons_data = \"\"\nsimpsons_data = input(\"Enter donut quantity: \")\nprint(\"Intercepting delivery: \" + simpsons_data)",
    solutionRegex: [/simpsons_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "KWIK_E_LOG",
    missionPrefix: "STOCK_INIT",
    intro: "# Inventory Day: Multi-Assignment\n\nApu is counting the stock. Record the number of donuts and cans of Duff beer in the fridge in one quick entry to get back to the checkout counter.",
    task: "Assign `donuts` set to `12` and `duff_cans` set to `6` in one line.",
    baseCode: "# TODO: Stock Kwik-E-Mart\n",
    solution: "donuts, duff_cans = 12, 6",
    solutionRegex: [/donuts\s*,\s*duff_cans\s*=\s*12\s*,\s*6/]
  },
  "data-strings": {
    headerPrefix: "PRANK_CALL",
    missionPrefix: "MOES_PHONE",
    intro: "# Moe's Telephone: Strings\n\nBart is dialing Moe's Tavern with a brand new pun. Assign his target search name to a string variable.",
    task: "Create a variable `prank_target` set to `\"Seymour Butz\"`. Print it.",
    baseCode: "# TODO: Initiate prank call\n",
    solution: "prank_target = \"Seymour Butz\"\nprint(prank_target)",
    solutionRegex: [/prank_target\s*=\s*['\"]Seymour Butz['\"]/]
  },
  "data-booleans": {
    headerPrefix: "PLANT_CORE",
    missionPrefix: "MELTDOWN_CHECK",
    intro: "# Core Meltdown: Booleans\n\nIs the cooling water valve open? Has a sector alarm been triggered? Use booleans to track reactor status checks.",
    task: "Set `cooling_valve_open` to `True` and `alarm_triggered` to `False`.",
    baseCode: "# TODO: Monitor reactor core safety\n",
    solution: "cooling_valve_open = True\nalarm_triggered = False",
    solutionRegex: [/cooling_valve_open\s*=\s*True/, /alarm_triggered\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "DORM_LOG",
    missionPrefix: "SNACK_COUNT",
    intro: "# Kwik-E-Mart Stock: Math\n\nApu is doing a late-night inventory check. Combine the number of pink glazed donuts with the chocolate ones to make sure there's enough for Homer's morning run.",
    task: "Create `pink_glazed` as `24` and `chocolate_sprinkles` as `12`. Store the sum in `donut_total` and print it.",
    baseCode: "# TODO: Count the inventory\n",
    solution: "pink_glazed = 24\nchocolate_sprinkles = 12\ndonut_total = pink_glazed + chocolate_sprinkles\nprint(donut_total)",
    solutionRegex: [/donut_total\s*=\s*pink_glazed\s*\+\s*chocolate_sprinkles/]
  },
  "math-bidmas": {
    title: "Homer's Donut Priority: BIDMAS",
    headerPrefix: "DONUT_PRIORITY",
    missionPrefix: "CALC_HIERARCHY",
    intro: "# Homer's Donut Priority: BIDMAS\n\nHomer is trying to calculate his daily donut storage and consumption, but cracking a complex Simpsons data key requires precise mathematical order! Ensure that your offsets are added only after the primary multiplier is applied to the data packet, otherwise you'll trigger a nuclear core alert (or lose half your glazed donuts!).\n\nUse mathematical order of operations (BIDMAS/PEMDAS) to compute the exact donut batches. See how a simple set of parentheses `()` changes the priority of the calculations, yielding completely different results for Homer's stomach!",
    technical: "### Donut Calculation Priority:\n- **B**rackets `()`: Forces these donuts to be boxed together first.\n- **M**ultiplication `*`: Always evaluated before **A**ddition `+` unless brackets say otherwise.",
    example: "donuts_a = (20 + 5) * 4  # Brackets first: 25 * 4 = 100\ndonuts_b = 20 + (5 * 4)  # Multiplication first: 20 + 20 = 40",
    task: "1. Calculate `(20 + 5) * 4` for `set_a` (Donut Batch A with box grouping).\n2. Calculate `20 + (5 * 4)` for `set_b` (Donut Batch B without box grouping).\n3. `print` both values so Apu can verify the box count.",
    baseCode: "# TODO: Calculate set_a and set_b, then print both\n",
    hints: [
      "Brackets always come first: set_a = (20 + 5) * 4",
      "Multiplication is evaluated before addition: set_b = 20 + (5 * 4)"
    ],
    solution: "set_a = (20 + 5) * 4\nset_b = 20 + (5 * 4)\nprint(set_a)\nprint(set_b)",
    solutionRegex: [/set_a\s*=\s*\(\s*20\s*\+\s*5\s*\)\s*\*\s*4/, /set_b\s*=\s*20\s*\+\s*\(\s*5\s*\*\s*4\s*\)/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe Kwik-E-Mart register is on the fritz. Initiate a technical protocol memory dump to find the final price for Homer's squishee after deposits and taxes.",
    technical: "### Register Calculations:\n1. **Apu's Math Rules**: Combine cup deposits and slushie rates prior to multiplying item prices by our specialized sales tax multipliers.\n2. **Register Brackets**: Parentheses `()` function like cash register trays, separating base values before total transaction fees.",
    example: "base_cost = 80\ndeposit = -10\nhomer_total = (base_cost + deposit) * 0.8\nprint(homer_total)",
    task: "1. Create cashier variable `base_cost` as `80`.\n2. Create cashier variable `deposit` as `-10`.\n3. Calculate `(base_cost + deposit) * 0.8` and store in `homer_total`.\n4. Print `homer_total`.",
    baseCode: "# TODO: Compute Homer's bill\n",
    solution: "base_cost = 80\ndeposit = -10\nhomer_total = (base_cost + deposit) * 0.8\nprint(homer_total)",
    solutionRegex: [/homer_total\s*=\s*\(\s*base_cost\s*\+\s*deposit\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "KWIK_E_STAT",
    missionPrefix: "SHELF_STOCK",
    intro: "# Inventory Lists: Squishee Shelves\n\nApu needs a quick stock count on the top-selling snacks at the Springfield Kwik-E-Mart cash register shelf.",
    technical: "### Kwik-E-Mart Inventory Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) catalog of items kept under a single variable name. Instead of keeping a separate clipboard for every individual snack (e.g., `snack1 = \"Donuts\"`, `snack2 = \"Duff Beer\"`), lists let you bundle multiple items together on a single store shelf spreadsheet.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, which are shaped like the shelf rails on Apu's displays.\n- **Comma Separation**: Every item stored on your shelf must be separated by a comma.\n- **Zero-Based Shelves**: Python lists use zero-based indexing. The top shelf holds items at index `0`, the middle shelf at `1`, and the bottom at `2`.",
    example: "# Log multiple products in a single list variable\nshelf_items = [\"KrustyO's\", \"Buzz Cola\", \"Lard Lad Donuts\"]\nprint(shelf_items)  # Prints the entire shelf stock count",
    task: "Initialise your `snacks` list with \"Donuts\", \"Duff Beer\", and \"Squishee\". Print the list of shelf snacks.",
    baseCode: "# TODO: Counter stock list\n",
    solution: "snacks = [\"Donuts\", \"Duff Beer\", \"Squishee\"]\nprint(snacks)",
    solutionRegex: [/snacks\s*=\s*\[/, /print\s*\(\s*snacks\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "AISLE_LOOKUP",
    missionPrefix: "YOUR TASK",
    intro: "# Cashier Retrieval: Box Indexing\n\nHomer is demanding his treats at Apu's counter! Grab the Squishee cup and Donuts directly using register box positions.",
    technical: "### Shelf Coordinate Maps:\n\n```text\nsnacks = [\"Donuts\", \"Duff Beer\", \"Squishee\"]\n#        [0]         [1]           [2]\n```",
    example: "# Grab items from register snacks board using index positions\nsnacks = [\"Donuts\", \"Duff Beer\", \"Squishee\"]\n\n# Select first snack (index 0)\np1 = snacks[0]\nprint(p1)  # Output: Donuts\n\n# Select third snack (index 2)\np3 = snacks[2]\nprint(p3)  # Output: Squishee",
    task: "1. Grab the snack at index 0 from `snacks` and store in `p1`.\n2. Grab the sugary slushie at index 2 and store in `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "snacks = [\"Donuts\", \"Duff Beer\", \"Squishee\"]\n# TODO: Retrieve Homer's items at coordinates 0 and 2\n",
    solution: "p1 = snacks[0]\np3 = snacks[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*snacks\s*\[\s*0\s*\]/, /p3\s*=\s*snacks\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "REPLENISH_SHELF",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value convenience food snack is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "snacks = [\"Donuts\",\"Duff Beer\",\"Squishee\"]\nsnacks.append(\"Krusty Burger\")\n# snacks is now updated!",
    task: "1. Append \"Krusty Burger\" to the `snacks` list.\n2. Print the final `snacks` list to confirm installation.",
    baseCode: "snacks = [\"Donuts\",\"Duff Beer\",\"Squishee\"]\n# TODO: Append value and print\n",
    solution: "snacks.append(\"Krusty Burger\")\nprint(snacks)",
    solutionRegex: [/snacks\.\s*append\s*\(\s*['"]Krusty Burger['"]\s*\)/, /print\s*\(\s*snacks\s*\)/]
  },
  "list-pop": {
    headerPrefix: "APU_REJECT",
    missionPrefix: "YOUR TASK",
    intro: "# Spoiled Stock: .pop()\n\nApu's Kwik-E-Mart scanner has detected some seriously expired items on the shelf, and the Springfield health inspector is pulling up to the curb! Use `.pop()` to immediately yank the last spoiled item from the shelf list and toss it straight into the dumpster.",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = expired_shelf.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `expired_shelf` list and store it inside a variable named `dumpster_bound`.\n2. Print `dumpster_bound` to output the purged token.",
    baseCode: "expired_shelf = [\"Moldy Hotdog\",\"Sour Milk\",\"Rotten Cabbage\"]\n# TODO: Pop last element and print\n",
    solution: "dumpster_bound = expired_shelf.pop()\nprint(dumpster_bound)",
    solutionRegex: [/dumpster_bound\s*=\s*expired_shelf\.\s*pop\s*\(\s*\)/, /print\s*\(\s*dumpster_bound\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "LEDGER_LOCK",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Sealed Vault Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of records, like a ledger of store items, but with one crucial Springfield difference: **lists are mutable** (meaning Homer can eat items off a list or Apu can restock them), whereas **tuples are immutable** (their contents are permanently locked and cannot be changed or eaten after being declared).\n- **Syntax**: Defined using round parentheses `()` instead of square brackets `[]`.\n- **Speed & Safety**: Because tuples are simpler and read-only, they process faster and prevent Homer from accidentally overwriting or changing critical data like the Kwik-E-Mart cash register logs or nuclear safety baseline values.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `apu_records` containing \"Kwik-E-Mart Register Line\" and the number `1989`.\n2. Print the `apu_records` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "apu_records = (\"Kwik-E-Mart Register Line\", 1989)\nprint(apu_records)",
    solutionRegex: [/apu_records\s*=\s*\(\s*['"]Kwik-E-Mart Register Line['"]\s*,\s*1989\s*\)/, /print\s*\(\s*apu_records\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "COUCH_SIZE_LOCK",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `simpsons_couch` containing the single string \"Homer\"\n2. Create a tuple named `couch_dimensions` containing the numbers `3` and `0`.\n3. Rewrite `simpsons_couch[0]` to be \"Grandpa\"\n4. Print both `simpsons_couch` and `couch_dimensions`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "simpsons_couch = [\"Homer\" ]\ncouch_dimensions = (3, 0)\nsimpsons_couch[0] = \"Grandpa\"\nprint(simpsons_couch)\nprint(couch_dimensions)",
    solutionRegex: [/simpsons_couch\s*\[\s*0\s*\]\s*=\s*['"]Grandpa['"]/, /couch_dimensions\s*=\s*\(\s*3\s*,\s*0\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "FAMILY_LINEUP_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `springfield_residents` list.\n2. Store this result in a new variable named `simpson_kids`.\n3. Print the resulting slice `simpson_kids`.",
    baseCode: "springfield_residents = [\"Homer\",\"Marge\",\"Bart\",\"Lisa\",\"Maggie\",\"Ned\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "simpson_kids = springfield_residents[1:4]\nprint(simpson_kids)",
    solutionRegex: [/simpson_kids\s*=\s*springfield_residents\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*simpson_kids\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "SECTOR_7G_ALARM",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `radiation_levels`.\n2. Store the result in a variable named `nuclear_meltdowns`.\n3. Print `nuclear_meltdowns`.",
    baseCode: "radiation_levels = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "nuclear_meltdowns = [r for r in radiation_levels if r > 50]\nprint(nuclear_meltdowns)",
    solutionRegex: [/nuclear_meltdowns\s*=\s*\[\s*r\s+for\s+r\s+in\s+radiation_levels\s+if\s+r\s*>\s*50\s*\]/, /print\s*\(\s*nuclear_meltdowns\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "DONUT_COUNTER",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `homer_calories` list using a list comprehension.\n2. Store this filtered list in a new variable named `even_donuts`.\n3. Print `even_donuts`.",
    baseCode: "homer_calories = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "even_donuts = [c for c in homer_calories if c % 2 == 0]\nprint(even_donuts)",
    solutionRegex: [/even_donuts\s*=\s*\[\s*c\s+for\s+c\s+in\s+homer_calories\s+if\s+c\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*even_donuts\s*\)/]
  },
  "intro-input": {
    headerPrefix: "BURNS_PORTAL",
    missionPrefix: "YOUR TASK",
    intro: "# Nuclear Control Board: Homer Input\n\nHomer has spill-proof coffee stains on the terminal! Prompt him to specify which snacks catalog he wants to open from the safety computer.",
    technical: "### Nuclear Protocol Interceptions:\n- Run `input()` to poll Homer for donut flavors or emergency core containment commands.\n- It converts keyboard taps into vital instructions (or lunch orders).\n- **Donut Concatenation**: Glue snack titles and safety warning strings together using the `+` operator (e.g., `\"Pink\" + \"Donut\"` becomes `\"PinkDonut\"`). Ensure you add empty spaces in your quoted strings, otherwise Homer will merge his snacks into a single chaotic lump!",
    example: "donut = input(\"Favorite flavor: \")\nprint(\"Dispensing: \" + donut)",
    task: "1. Ask Homer for his snack choice with the prompt: **\"Enter snack choice: \"** and store it in a variable named `snack_choice`.\n2. Print **\"Dispensing: \"** concatenated with the user\'s `snack_choice` value.",
    baseCode: "# TODO: Capture snack choice and print dispensing status\n",
    solution: "snack_choice = input(\"Enter snack choice: \")\nprint(\"Dispensing: \" + snack_choice)",
    solutionRegex: [/snack_choice\s*=\s*input\s*\(\s*['\"]Enter snack choice: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Dispensing: \s*['\"]\s*\+\s*snack_choice\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "BURNS_MEMO",
    missionPrefix: "LOG_GEN",
    intro: "# Nuclear Incident Log: Story Generator\n\nGenerate customized safety reports for Mr. Burns. Program an automated incident logger detailing the antics of Springfield nuclear inspector.",
    technical: "### Gluing Memo Strings:\nConcatenate nuclear employees, power grid reactors, and eating utensils inside the console space. Be mindful of space parameters inside the quotes.",
    example: "person = \"Homer\"\nfood = \"Giant Donut\"\nincident = person + \" devoured \" + food\nprint(incident)",
    task: "1. Ask Mr. Burns for the worker alias with the prompt: **\"Enter worker name: \"** and store it in `worker`.\n2. Ask Mr. Burns for the reactor room with the prompt: **\"Enter reactor room: \"** and store it in `reactor`.\n3. Ask Mr. Burns for the safety tool with the prompt: **\"Enter safety tool: \"** and store it in `utensil`.\n4. Combine into a variable named `burns_log` using the format: `worker + \" bypassed \" + reactor + \" with a \" + utensil + \"!\"` and print `burns_log`.",
    baseCode: "# TODO: Document safety board incident memos\n",
    solution: "worker = input(\"Enter worker name: \")\nreactor = input(\"Enter reactor room: \")\nutensil = input(\"Enter safety tool: \")\nburns_log = worker + \" bypassed \" + reactor + \" with a \" + utensil + \"!\"\nprint(burns_log)",
    solutionRegex: [/worker\s*=\s*input\s*\(\s*['"]Enter worker name:\s*['"]\s*\)/, /reactor\s*=\s*input\s*\(\s*['"]Enter reactor room:\s*['"]\s*\)/, /utensil\s*=\s*input\s*\(\s*['"]Enter safety tool:\s*['"]\s*\)/, /burns_log\s*=\s*worker\s*\+\s*['"] bypassed ['"]\s*\+\s*reactor\s*\+\s*['"] with a ['"]\s*\+\s*utensil\s*\+\s*['"]!['"]/, /print\s*\(\s*burns_log\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "SECTOR_7G_ALARM",
    missionPrefix: "CORE_MELTDOWN",
    intro: "# Nuclear Control Failure: Homer Glitch\n\nHomer dropped his jelly donut right onto the reactor control levers! Write an emergency override log using five Springfield indicators.",
    technical: "### Reactor Data Linkage:\nLink Springfield inspectors, sweets, and cooling tower quadrants together into a warning message with standard string joining.",
    example: "donutLog = worker + \" injected \" + item + \" into \" + pipe + \" at \" + temp + \". System is \" + state + \"!\"",
    task: "1. Ask for safety supervisor with prompt: **\"Enter employee name: \"** and store in `employee`.\n2. Ask for the contaminating item with prompt: **\"Enter snack contaminant: \"** and store in `contaminant`.\n3. Ask for the cooling reactor quadrant with prompt: **\"Enter cooling cell: \"** and store in `cooling_cell`.\n4. Ask for the core thermal grade with prompt: **\"Enter core temperature: \"** and store in `temp_level`.\n5. Ask for the reactor state with prompt: **\"Enter reactor status: \"** and store in `reactor_status`.\n6. Combine into a variable named `springfield_meltdown` and print using the exact format: `employee + \" injected \" + contaminant + \" into \" + cooling_cell + \" at \" + temp_level + \". System is \" + reactor_status + \"!\"`.",
    baseCode: "# TODO: Compile Springfield Nuclear error boards\n",
    solution: "employee = input(\"Enter employee name: \")\ncontaminant = input(\"Enter snack contaminant: \")\ncooling_cell = input(\"Enter cooling cell: \")\ntemp_level = input(\"Enter core temperature: \")\nreactor_status = input(\"Enter reactor status: \")\nspringfield_meltdown = employee + \" injected \" + contaminant + \" into \" + cooling_cell + \" at \" + temp_level + \". System is \" + reactor_status + \"!\"\nprint(springfield_meltdown)",
    solutionRegex: [/employee\s*=\s*input\s*\(\s*['"]Enter employee name:\s*['"]\s*\)/, /contaminant\s*=\s*input\s*\(\s*['"]Enter snack contaminant:\s*['"]\s*\)/, /cooling_cell\s*=\s*input\s*\(\s*['"]Enter cooling cell:\s*['"]\s*\)/, /temp_level\s*=\s*input\s*\(\s*['"]Enter core temperature:\s*['"]\s*\)/, /reactor_status\s*=\s*input\s*\(\s*['"]Enter reactor status:\s*['"]\s*\)/, /print\s*\(\s*springfield_meltdown\s*\)/]
  },
  "print-formatting": {
    title: "Staff Registry: F-Strings",
    headerPrefix: "PLANT_SECTOR",
    missionPrefix: "BURNS_VERIFY",
    intro: "# Staff Registry: F-Strings\n\nMr. Burns demands a dynamic monitor system for the Sector 7-G safety status. Format console logs with f-strings to scan employees and display threat thresholds.",
    technical: "### Plant Reporting Protocol:\n- **F-Prefix**: Use `f` before the string quotes to activate dynamic parsing.\n- **Braces**: Put variable tokens in `{}` to insert employee data and safety clearances straight into the line.",
    example: "employee = \'Homer\'\nprint(f\'Alert: {employee} asleep!\') # Outputs: Alert: Homer asleep!",
    task: "### YOUR MISSION\n\nYou have `alias = \'Homer\'` and `level = 1`. Use an **f-string** to print: `Employee: Homer | Safety Sector: 1`.",
    baseCode: "alias = \'Homer\'\nlevel = 1\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Use {alias} and {level} in curly brackets in the string."
    ],
    solution: "alias = \'Homer\'\nlevel = 1\nprint(f\'Employee: {alias} | Safety Sector: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Employee:\s*\{alias\}\s*\|\s*Safety\s*Sector:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Power Plant Monitors: Advanced F-Strings",
    headerPrefix: "ALARM_WING",
    missionPrefix: "STAFF_DISP",
    intro: "# Nuclear Sector 7-G: Advanced F-Strings\n\nMonitor radiation cells inside the Springfield Nuclear Plant. Format alert systems to perform calculations on safety inspectors and force reactor wing labels to uppercase.",
    technical: "### Plant Safety Protocols:\n- **Doughnut Calculations**: Keep track of Springfield supplies inside the f-string: `{pink_glazed + glazed}`.\n- **Reactor Alarms**: Standardize reactor block identifiers in bold, screaming uppercase characters: `{wing.upper()}`.",
    example: "homer, lenny = 1, 1\nprint(f'Sleeping workers: {homer + lenny}')",
    task: "### YOUR MISSION\n\n1. Prompt for worker count with: **\"Enter worker count: \"** and store it as an integer in `workers`.\n2. Prompt for target sector with: **\"Enter nuclear sector: \"** and store it in `sector`.\\n3. Use an **f-string** to print: `Deploying {workers} workers to {sector.upper()}...`.",
    baseCode: "# TODO: Assign personnel\n",
    hints: [
      "Ask for workers using int(input(\"Enter worker count: \"))",
      "Ask for sector using input(\"Enter nuclear sector: \")",
      "Bind those fields safely using {workers} and {sector.upper()}."
    ],
    solution: "workers = int(input(\"Enter worker count: \"))\nsector = input(\"Enter nuclear sector: \")\nprint(f\"Deploying {workers} workers to {sector.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{workers\}\s*workers\s*to\s*\{sector\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Donut Stockpile Index: Casting to Int",
    headerPrefix: "HOMER_SCAN",
    missionPrefix: "DONUT_RECAST",
    intro: "# Springfield Nuclear Plant: Glazed Metrics\\n\\nHomer\\'s working console can compile donut shipments instantly. Recast shipments from local bakery boxes into true integer numbers to avoid an office hazard crisis.",
    technical: "### Bakery Math Optimization:\\n- Donut counts must be parsed as full quantities using `int()` to avoid Homer throwing a code exception.",
    example: "chocolate_donuts = int(input(\"Box 1 count: \"))\ntotal_glazed = chocolate_donuts + 1",
    task: "### YOUR MISSION\\n\\nAudit Springfield\\'s breakfast supply:\\n1. Prompt for pink glazed donuts with **\\\"Enter pink glazed donuts count: \\\"** and store it as an integer in `pink_donuts`.\\n2. Prompt for jelly filled donuts with **\\\"Enter jelly filled donuts count: \\\"** and store it as an integer in `jelly_donuts`.\\n3. Calculate and print the total donut feast sum to verify plant morale security.",
    baseCode: "# TODO: Parse donut metrics\\n",
    hints: [
      "Use pink_donuts = int(input(\\\"Enter pink glazed donuts count: \\\"))",
      "Use jelly_donuts = int(input(\\\"Enter jelly filled donuts count: \\\"))",
      "Print the sum using the + operator."
    ],
    solution: "pink_donuts = int(input(\\\"Enter pink glazed donuts count: \\\"))\\njelly_donuts = int(input(\\\"Enter jelly filled donuts count: \\\"))\\nprint(pink_donuts + jelly_donuts)",
    solutionRegex: [/pink_donuts?\s*=\s*int\s*\(\s*input/, /jelly_donuts?\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Meltdown Multipliers: Casting to Float",
    headerPrefix: "REACTOR_TEMP",
    missionPrefix: "CORE_DECIMAL",
    intro: "# Sector 7-G Diagnostic: Core Radiation decimals\\n\\nMonitor Springfield\\'s core uranium rods. Precise isotopes produce fractional dosage counts. Cast the temperature registers to floats, otherwise the plant warning system will glitch out entirely.",
    technical: "### Nuclear Float Diagnostics:\\n- **What is a Float?**: While integers represent whole numbers (like `3` cooling towers), a `float` represents a decimal fractional rate (e.g., `0.45` rads, or `102.5` core temperature) for high-precision nuclear safety.\\n- **Homer-Proof Console Inputs**: The safety console `input()` captures your key entries as raw text strings. To calculate safety levels mathematically, you must transform them using `float()`, e.g., `rads = float(input())`.\\n- **The Direct Meltdown Alert**: Attempting to feed a fractional string like `\"0.45\"` into `int()` will instantly trigger a warning system crash with a `ValueError`! Always use `float()` for decimal metrics before Homer falls asleep on the buttons.",
    example: "donut_weight = float(input(\"Heavy donut size: \"))\nsugar_level = donut_weight * 0.45",
    task: "### YOUR MISSION\\n\\nAudit reactor radiation lines:\\n1. Prompt for core radiation with **\\\"Enter core radiation dosage: \\\"** and store it as a float in `radiation`.\\n2. Prompt for safety margin with **\\\"Core safety warning margin: \\\"** and store it as a float in `safety_margin`.\\n3. Multiply core radiation dosage by safety warning margin, and print the output.",
    baseCode: "# TODO: Audit reactor float thresholds\\n",
    hints: [
      "Get radiation: radiation = float(input(\"Enter core radiation dosage: \"))",
      "Get margin: safety_margin = float(input(\"Core safety warning margin: \"))",
      "Evaluate with print(radiation * safety_margin)."
    ],
    solution: "radiation = float(input(\"Enter core radiation dosage: \"))\nsafety_margin = float(input(\"Core safety warning margin: \"))\nprint(radiation * safety_margin)",
    solutionRegex: [/radiation\s*=\s*float\s*\(\s*input/, /safety_margin\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Control Room Safety: Indentation Blocks",
    headerPrefix: "HOMER_PROT",
    missionPrefix: "LUNCH_BREAK",
    intro: "# Sector 7-G: Nuclear Indentation\\n\\nMr. Burns demands perfect nuclear code structure. Python groups core commands under nested logic blocks using uniform spaces. Don\\'t let Homer spill soda on the Spacebar, or the system crashes!",
    technical: "### Safety Inspector Regulations:\\n- Always end conditional checks in a colon (`:`).\\n- Indent subsequent block statements with 4 clean spaces to run your core protection code.",
    example: "if True:\\n    print(\\\"Reactor stable (phew)\\\")  # Indented sequence",
    task: "### YOUR MISSION\\n\\nUnlock Homer\\'s emergency donut stash:\\n1. Write an `if True:` block conditional.\\n2. On the next line, indented with exactly 4 spaces, print **\\\"Accessing...\\\"** to complete the terminal verification.",
    baseCode: "# TODO: Secure the Springfield mainframe blocks\\n",
    hints: [
      "Terminate your if line with a colon (:)",
      "Indent the following printed command by 4 spaces",
      "Print the message: print(\\\"Accessing...\\\")"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Reactor Safeguards: Doubling Down Security",
    headerPrefix: "BURNS_CORP",
    missionPrefix: "CORE_ALIGN",
    intro: "# Sector 7-G Reactor Core: Double Lockout\\n\\nHomer is trying to play games on the Springfield control terminal, but Mr. Burns has protected the core using layered safeguards. Keep your spacing precisely calibrated to keep the nuclear reactor cooling lines from bursting.",
    technical: "### Control Room Safety Grid:\\n- Outer parameters represent general physical shielding (4 spaces).\\n- Nested inner checks evaluate electronic safety valve levels (exactly **8 spaces**).",
    example: "if True:\\n    print(\"Turbines cooling\")\\n    if True:\\n        print(\"Rods aligned\")",
    task: "### YOUR MISSION\\n\\nEnable the main emergency cooling valve program:\\n1. Write the outer core validation switch using **`if True:`**.\\n2. Nest the inner auxiliary system verification under it with **`if True:`** (indented by 4 spaces).\\n3. Indented by exactly 8 spaces on the third line, print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Secure the nested cooling loops\\n",
    hints: [
      "Open reactor bypass with if True: on line 1.",
      "Indent line 2 by 4 spaces to write the secondary check.",
      "Indent line 3 by 8 spaces to trigger the print command."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "PLANT_ALARM",
    missionPrefix: "DOH_LOGIC",
    intro: "# Safety Inspector: If Statements\n\nSector 7-G is overheating! Homer needs to check the core temperature and initiate the evacuation procedure if things get unstable.",
    task: "If `core_unstable` is `True`, print `\"D'OH! EVACUATE!\"`.",
    baseCode: "core_unstable = True\n# TODO: Monitor core status\n",
    solution: "core_unstable = True\nif core_unstable:\n    print(\"D'OH! EVACUATE!\")",
    solutionRegex: [/if\s+core_unstable/, /print\s*\(\s*['"]D'OH! EVACUATE!['"]\s*\)/]
  },
  "control-else": {
    title: "Nuclear Safety: If/Else Protocol",
    headerPrefix: "BURNS_SAFETY",
    missionPrefix: "CORE_ELSE",
    intro: "# Springfield Control Room: Else Fallback\\n\\nHomer is trying to log into the Sector 7-G administrative panel. If his credentials key verifies, unlock his backup email. Otherwise, beep loudly and trigger the core radiation system meltdown siren.",
    technical: "### Nuclear Guard Rails:\\n- The `else:` statement handles all negative conditions (where `key_valid == False`).\\n- It should never carry a condition evaluation itself, only a trailing colon.",
    example: "if is_donut:\\n    print(\\\"Homer eating\\\")\\nelse:\\n    print(\\\"Homer sleeping\\\")",
    task: "### YOUR MISSION\\n\\nVerify Homer\\'s computer access status:\\n1. Write a clear `if/else` security gate using `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Protect Springfield terminal core\\n",
    hints: [
      "Set your line 1 control conditional as: if key_valid:.",
      "Indent the success output line 4 spaces: print(\\\"ACCESS GRANTED\\\").",
      "Set up else: back on the zero-margin level.",
      "Add print(\\\"ALARM TRIGGERED\\\") with a 4-space indentation inside the negative branch."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Springfield Terminal: Elif Protocols",
    headerPrefix: "BURNS_MAIN",
    missionPrefix: "TIER_CORE",
    intro: "# Sector 7-G Login: Burns Clearances\\n\\nMr. Burns has configured multiple employee levels on the Springfield nuclear reactor terminal. Admins, senior operators, and regular inspectors (like Homer) must be directed accordingly using an `if/elif/else` check.",
    technical: "### Regulator Classifications:\\n- Placing `elif` allows you to handle intermediate states cleanly before giving up and locking the console.",
    example: "if user == \"Burns\":\\n    print(\"Excellent!\")\\nelif user == \"Smithers\":\\n    print(\"Welcome Smithers\")\\nelse:\\n    print(\"Release the hounds!\")",
    task: "### YOUR MISSION\\n\\nDetermine nuclear terminal authorizations:\\n1. Assemble an `if/elif/else` security layer looking at `clearance`.\\n2. If `clearance` is `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Otherwise, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Protect reactor authorization tiers\\n",
    hints: [
      "Begin by testing if clearance == 1:",
      "Write the next option with elif clearance <= 5:",
      "Finish your script with an else: lockout"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Alibi Generator: Nuclear Control",
    headerPrefix: "SECTOR_7G",
    missionPrefix: "SAFE_ALIBI",
    intro: "# Springfield Inquest: Sector 7G Excuses\n\nMr. Burns is looking for the operative who left a half-eaten donut on the plutonium rods. If security cameras detected Homer's presence during the power surge, print the ultimate workplace deflection! Otherwise, sit back and enjoy the break.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"RUN_TO_DONUT_CART\")\nelse:\n    print(\"Snack break success.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` work excuse logic:\n1. If `is_detected`, print **`\"RUN_TO_DONUT_CART\"`** to save your job at the plant.\n2. Else, print **`\"Snack break success.\"`** and enjoy your/our coffee break.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"RUN_TO_DONUT_CART\".",
      "Add else: at the base level and print \"Snack break success.\""
    ],
    solution: "if is_detected:\n    print(\"RUN_TO_DONUT_CART\")\nelse:\n    print(\"Snack break success.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]RUN_TO_DONUT_CART['"]\s*\)/, /print\s*\(\s*['"]Snack\s+break\s+success\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Donut Metric: Appetite Scale Rating",
    headerPrefix: "LAZY_7G",
    missionPrefix: "DIET_UPGRADE",
    intro: "# Plant Cafeteria: Homer's Scale Evaluation\n\nCalculate Homer Simpson's physical appetite size scale based on donut weight load counts. Large scale donut deliveries qualify Homer for absolute heavyweight status.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to evaluate total daily donut weight ratings.\n- **Assignment**: Write the `homer_rating` string internally inside the matching logical branches.",
    example: "if consumption > 9000:\n    homer_rating = \"Super_Sized\"\nelse:\n    homer_rating = \"Average\"",
    task: "### YOUR MISSION\n\nCheck the Springfield bakery weight classification:\n1. If food `donut_weight > 9000`, set `homer_rating` to **`\"Super_Sized\"`**.\n2. Else, set `homer_rating` to **`\"Average\"`**.\n3. Finally, print the rating with `print(homer_rating)`.",
    baseCode: "donut_weight = 9001\nhomer_rating = \"\"\n# TODO: Score safe status and print it\n",
    hints: [
      "Set homer_rating inside the conditional logic blocks.",
      "Check that print(homer_rating) is unindented and has correct parameters."
    ],
    solution: "donut_weight = 9001\nif donut_weight > 9000:\n    homer_rating = \"Super_Sized\"\nelse:\n    homer_rating = \"Average\"\nprint(homer_rating)",
    solutionRegex: [/if\s+donut_weight\s*>\s*9000\s*:/, /homer_rating\s*=\s*['"]Super_Sized['"]/, /homer_rating\s*=\s*['"]Average['"]/, /print\s*\(\s*homer_rating\s*\)/]
  },
  "control-adventure": {
    title: "Reactor Controls: Access Tunnel",
    headerPrefix: "PLANT_NET",
    missionPrefix: "BURNS_DOOR",
    intro: "# Sector 7G Admin Router: Secure Access Selection\n\nYou've bypassed Mr. Burns' outer office keypad system. Choose which security node to exploit: \"1\" (Main Power Vault Core) or \"2\" (Sector 7G Emergency Backdoor).",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Accessing Main Power Vault...\")",
    task: "### YOUR MISSION\n\nImplement the plant router rules in your script:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Guide Homer's reactor selection\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Springfield Routing: Donut Dispatch",
    headerPrefix: "DONUT_CORE",
    missionPrefix: "REACTION_ROUTING",
    intro: "# Plant Cafeteria: Automated Snack Feeder\n\nYour Sector 7G console must distribute donut deliveries based on flavor choices: \"sprinkles\", \"jelly\", or \"glazed\".",
    technical: "### Cascading Checks:\n- **Sequential**: Inspects donut flavor inventories from Homer's highest favorites down.\n- **Exclusive**: Finding a sprinkle bundle stops search checks instantly so Homer claims it.\n- **Exhaustive**: An `else` prints a warning for health bars or raw vegetables.",
    example: "if donut == \"sprinkles\":\n    print(\"Homer drooling!\")\nelif donut == \"jelly\":\n    print(\"Homer smiling.\")",
    task: "### YOUR MISSION\n\nDispense donuts based on variable `donut`:\n1. If `donut` is **`\"sprinkles\"`**, print **`\"Homer drooling!\"`**\n2. Elif `donut` is **`\"jelly\"`**, print **`\"Homer smiling.\"`**\n3. Elif `donut` is **`\"glazed\"`**, print **`\"Homer eating.\"`**\n4. Else, print **`\"Anger yell: D'oh!\"`**",
    baseCode: "donut = \"sprinkles\"\n# TODO: Route Homer's donut priorities\n",
    hints: [
      "Differentiate donuts: sprinkles, jelly, and glazed.",
      "Handle unexpected vegetables with the else: block."
    ],
    solution: "if donut == \"sprinkles\":\n    print(\"Homer drooling!\")\nelif donut == \"jelly\":\n    print(\"Homer smiling.\")\nelif donut == \"glazed\":\n    print(\"Homer eating.\")\nelse:\n    print(\"Anger yell: D'oh!\")",
    solutionRegex: [/if\s+donut\s*==\s*['"]sprinkles['"]\s*:/, /elif\s+donut\s*==\s*['"]jelly['"]\s*:/, /elif\s+donut\s*==\s*['"]glazed['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Homer\s+drooling!['"]\s*\)/, /print\s*\(\s*['"]Homer\s+smiling\.['"]\s*\)/, /print\s*\(\s*['"]Homer\s+eating\.['"]\s*\)/, /print\s*\(\s*['"]Anger\s+yell:\s+D'oh!['"]\s*\)/]
  },
  "control-loops": {
    title: "Core Cycles: Sector 7G Scans",
    headerPrefix: "PLANT_REACTOR",
    missionPrefix: "SAFETY_AUDIT",
    intro: "# Meltdown Prevention: Reactor Auto-Sweeps\n\nMr. Burns demands automated quality checks. Instead of sleeping at your desk, loop sequentially through Springfield's station segments to verify cooling systems automatically.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### range(5) Iteration:\n- **Automation**: Triggers the monitoring loop exactly 5 times (sectors 0 to 4 inclusive).\n- **Structure**: Ends with a colon and requires 4 spaces structure indentation.",
    example: "for i in range(3):\n    print(f\"Core {i+1} stable\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Core {i+1} stable\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write your Sector 7G scan loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Core {i+1} stable"
    ],
    solution: "for i in range(5):\n    print(f\"Core {i+1} stable\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Nuclear Logs: Scanner Sweep",
    headerPrefix: "BURNS_DIAG",
    missionPrefix: "LOG_ITER",
    intro: "# Facility Auditing: Log Line Reading\n\nThe plant safety terminals track active nuclear vents with coded characters. Monitor Springfield's core temperature states by reading logs char-by-char.",
    technical: "### Core Scanning:\n- **Iterators**: Loop variables pull single code letters sequentially.\n- **Automatic Termination**: Rest assured, Burns' loop wraps up safely once the diagnostic code finishes.",
    example: "for letter in \"DOH!\":\n    print(letter)",
    task: "### YOUR MISSION\n\nYou've isolated a cooling system fault `log_line`: `\"DOH!\"`. Use a `for` loop to iterate through every character `letter` in the variable `log_line` and `print` it.",
    baseCode: "log_line = \"DOH!\"\n# TODO: Scan Burns' core logs\n",
    hints: [
      "Set up the loop: 'for letter in log_line:'.",
      "Write print(letter) at the indented line."
    ],
    solution: "log_line = \"DOH!\"\nfor letter in log_line:\n    print(letter)",
    solutionRegex: [/for\s+letter\s+in\s+log_line/, /print\s*\(\s*letter\s*\)/]
  },
  "loop-list-audit": {
    title: "Console Audit: Core Log Sweeper",
    headerPrefix: "SECTOR_7G_ALARM",
    missionPrefix: "LOG_FILTER",
    intro: "# Nuclear Console: Securing Vents\n\nHomer spilled pink donut sprinkles on the terminal monitor! Scan Springfield's central telemetry files and isolate active core alert lines containing the suffix `.err`.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"sprinkler.err\"`, then `\"coffee_maker.log\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".err\")` asks: *\"Does the text inside `f` end with `.err`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".err\"):\n          # This runs ONLY if the current file ends with .err!\n  ```",
    example: "logs = [\"safety_ok.txt\", \"meltdown.err\"]\nfor l in logs:\n    if \".err\" in l:\n        print(l)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".err\"`, `print` the critical nuclear alert: `f\"Meltdown alert: {f}\"`.",
    baseCode: "discovered_files = [\"sprinkler.err\", \"coffee_maker.log\", \"reactor_temp.err\", \"homer_keys.cfg\"]\n# TODO: Clear core logs\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".err\"):",
      "Print f'Meltdown alert: {f}'"
    ],
    solution: "discovered_files = [\"sprinkler.err\", \"coffee_maker.log\", \"reactor_temp.err\", \"homer_keys.cfg\"]\nfor f in discovered_files:\n    if f.endswith(\".err\"):\n        print(f\"Meltdown alert: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.err['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Core Monitor: Sector 7G Matrix",
    headerPrefix: "SAFETY_BURNS",
    missionPrefix: "CORE_ALIGN",
    intro: "# Safety Inspection: Core Terminal Sweeps\n\nHomer hasn't checked the radiation monitors! Save Springfield by writing a nested scan loop to verify monitor blocks (X) and backup relays (Y).",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 core monitor scan with variable `x` (outer loop representing Columns/Blocks) and variable `y` (inner loop representing Valves/Relays) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Block 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Valve 0) -> Output: `Springfield - Row: 0, Col: 0`\n     - `y = 1` (Valve 1) -> Output: `Springfield - Row: 0, Col: 1`\n     - `y = 2` (Valve 2) -> Output: `Springfield - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Block 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Valve 0) -> Output: `Springfield - Row: 1, Col: 0`\n     - `y = 1` (Valve 1) -> Output: `Springfield - Row: 1, Col: 1`\n     - `y = 2` (Valve 2) -> Output: `Springfield - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Block 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Valve 0) -> Output: `Springfield - Row: 2, Col: 0`\n     - `y = 1` (Valve 1) -> Output: `Springfield - Row: 2, Col: 1`\n     - `y = 2` (Valve 2) -> Output: `Springfield - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Core {r}, Valve {c}\")",
    task: "### YOUR MISSION\n\nMonitor a **3x3 core telemetry array**. Create nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the valve coordinates in this exact format: `f\"Springfield - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Audit Springfield safety grids\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Springfield - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Springfield - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Meltdown Abort: Manual SCRAM",
    headerPrefix: "SECTOR_7G_ALARM",
    missionPrefix: "SCRAM_ACTIVE",
    intro: "# Nuclear Safety: SCRAM Manual Override\n\nIf radiation levels spike critical at the Springfield Power Plant, Homer needs to hit the SCRAM switch. Python allows interrupting loop cycles cleanly using `break`.",
    technical: "### Emergency SCRAM:\n- **Clean Stop**: Cut loop execution instantly with a single `break` statement.\n- **Sprinkle Alarms**: Protect core sectors by triggering check conditions.",
    example: "for temp in range(10):\n    if temp == 5:\n        break\n    print(temp)",
    task: "### YOUR MISSION\n\nMonitor temperature cycles over `range(10)`. If the heat warning gauge index `i` hits `7`, initiate the core SCRAM routine using `break`. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Script power plant SCRAM safety breaks\n",
    hints: [
      "Launch loop 'for i in range(10):'",
      "Formulate reactor guard 'if i == 7:'",
      "Deploy 'break' inside, then printed progress via print(i)"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Nuclear Station: Core Depletion",
    headerPrefix: "REACTOR_SEC_7G",
    missionPrefix: "BAT_BURN",
    intro: "# Emergency Power: While Loops\n\nWhile `for` loops run through a sequence, `while` loops keep running **as long as a condition remains True**. Use this to track backup battery depletion in Sector 7G while Homer takes a donut break.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power the safety alarm.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "PLANT_MACROS",
    missionPrefix: "VALVE_CONTROL",
    intro: "# Reactor Automation: Functions\n\nDon't run around Sector 7G calibrating every dial by hand! Create a reusable Python function to automatically adjust the pressure on any cooling valve.",
    task: "Write a function `adjust_valve(valve_id)` that prints `f'Calibrating cooling valve {valve_id}...'`. Call it.",
    baseCode: "# TODO: Define automated valves\n",
    solution: "def adjust_valve(valve_id):\n    print(f'Calibrating cooling valve {valve_id}...')\n\nadjust_valve('A7')",
    solutionRegex: [/def\s+adjust_valve/, /adjust_valve\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "KWIK_E_MACH",
    missionPrefix: "APU_RESTOCK",
    intro: "# Stacked Boxes: Recursion\n\nApu is packing inventory boxes of Squishee syrup cups into the freezer vault. Create a recursive stack count that unloads and tracks packages from the truck back down to the shelf level.",
    task: "Write a recursive function `unload_cups(boxes)` that prints the box count and calls itself with `boxes-1` until it reaches `0`.",
    baseCode: "# TODO: Count nested boxes\n",
    solution: "def unload_cups(boxes):\n    print(boxes)\n    if boxes > 0:\n        unload_cups(boxes - 1)\n\nunload_cups(5)",
    solutionRegex: [/def\s+unload_cups/, /unload_cups\s*\(\s*boxes\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "TOWN_RECORDS",
    missionPrefix: "CITIZEN_TEMPLATE",
    intro: "# Springfield Registry: Classes\n\nMayor Quimby, we need a unified structural blueprint for all citizens of Springfield. Instead of coding individual stats, jobs, or inventories for every resident from scratch, we can define a template blueprint in Python called a **Class**.",
    task: "### YOUR MISSION\n\nDefine a base class named `SpringfieldCitizen`. Use `pass` inside its body under proper block indentation.",
    baseCode: "# TODO: Establish base class SpringfieldCitizen\n",
    hints: [
      "Use 'class SpringfieldCitizen:' followed by an indented 'pass'.",
      "Check your capitalization carefully!"
    ],
    solution: "class SpringfieldCitizen:\n    pass",
    solutionRegex: [/class\s+SpringfieldCitizen/, /pass/]
  },
  "oop-init": {
    headerPrefix: "TOWN_HALL",
    missionPrefix: "CITIZEN_SPEC",
    intro: "# Resident Arriving: Constructors\n\nWhen a new character arrives in Springfield, Mayor Quimby needs to log their name onto the census immediately! We will use Python's constructor method `__init__` to assign names automatically when a new character object is created.",
    task: "### YOUR MISSION\n\nIn `SpringfieldCitizen`, define the constructor `__init__` which accepts `self` and a parameter `name`. Assign the value of `name` to `self.name`.",
    baseCode: "class SpringfieldCitizen:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Use 'def __init__(self, name):' as the constructor name.",
      "Assign it inside the body: self.name = name"
    ],
    solution: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "TOWN_TALK",
    missionPrefix: "SPEECH_TEST",
    intro: "# Catchphrases: Methods\n\nA resident of Springfield is nothing without their signature catchphrase. In Object-Oriented Programming, functions defined inside a class are called **Methods**. Let's write a speech method so our citizens can shout out their catchphrase!",
    task: "### YOUR MISSION\n\nAdd a `speak` method to `SpringfieldCitizen` that `print`s \"D'oh!\".",
    baseCode: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define speak method\n",
    hints: [
      "Write 'def speak(self):' and indent it inside the class layout.",
      "Print 'D'oh!' inside the method cell."
    ],
    solution: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(\"D'oh!\")",
    solutionRegex: [/def\s+speak\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]D['"]oh!['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "KWIK_E_TRACK",
    missionPrefix: "STATUS_CHECK",
    intro: "# Snack Tracking: Independent Object State\n\nIn Springfield, hunger is a serious matter! Helping Homer eat a pink frosted donut shouldn't make Mr. Burns full. Each citizen manages their own status independently using instance variables.",
    task: "### YOUR MISSION\n\n1. Add a `status` variable in `__init__` defaulted to the string \"Hungry\".\n2. Create a method `eat_donut` that updates `self.status` to \"Satisfied\".",
    baseCode: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add status default\n    # TODO: Add eat_donut method\n",
    hints: [
      "Add 'self.status = \"Hungry\"' inside __init__.",
      "In eat_donut, run 'self.status = \"Satisfied\"'."
    ],
    solution: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n        self.status = \"Hungry\"\n    def eat_donut(self):\n        self.status = \"Satisfied\"",
    solutionRegex: [/self\.status\s*=\s*['"]Hungry['"]/, /def\s+eat_donut/, /self\.status\s*=\s*['"]Satisfied['"]/]
  },
  "oop-interaction": {
    headerPrefix: "MOES_PHONES",
    missionPrefix: "PRANK_CALL",
    intro: "# Pranking Moe: Object Interaction\n\nSpringfield is interactive! Characters often bother each other. In Python OOP, objects can interact with one another by receiving other instances of a class as parameters. Let's orchestrate a prank call!",
    task: "### YOUR MISSION\n\nAdd a `prank_call` method to `SpringfieldCitizen` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Pranking: {other.name}\"`.",
    baseCode: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add prank_call method\n",
    hints: [
      "The prank_call(self, other) signature accepts 'other' as its second parameter.",
      "Access other's name using other.name inside an f-string."
    ],
    solution: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n    def prank_call(self, other):\n        print(f\"Pranking: {other.name}\")",
    solutionRegex: [/def\s+prank_call\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "SPRINGFIELD_ES",
    missionPrefix: "VIP_PRANK",
    intro: "# Specialty Trouble: Inheritance\n\nSome citizens are standard quiet characters, whereas others are legendary troublemakers! Inheritance allows us to build specialized resident templates (subclasses) on top of our existing base class.",
    task: "### YOUR MISSION\n\nCreate a class `Prankster` that inherits from `SpringfieldCitizen`. Give it an `activate_slingshot` method that `print`s \"Slingshot active\".",
    baseCode: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create Prankster subclass inheriting from SpringfieldCitizen\n",
    hints: [
      "Use 'class Prankster(SpringfieldCitizen):' to construct inheritance.",
      "Define 'def activate_slingshot(self):' to print the required text."
    ],
    solution: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n\nclass Prankster(SpringfieldCitizen):\n    def activate_slingshot(self):\n        print(\"Slingshot active\")",
    solutionRegex: [/class\s+Prankster\s*\(\s*SpringfieldCitizen\s*\)\s*:/, /def\s+activate_slingshot/, /print\s*\(\s*['"]Slingshot active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "KENT_NEWS",
    missionPrefix: "REPRESENT_STR",
    intro: "# TV Interviews: Custom __str__ representation\n\nIf we try to print a citizen object directly, Python throws an ugly memory pointer register. Let's override the special double-underscore method `__str__` to print a beautiful introduction on Channel 6 instead.",
    task: "### YOUR MISSION\n\nIn `SpringfieldCitizen`, add the standard double-underscore method `__str__` that returns: `f\"Springfield Citizen {self.name}\"`.",
    baseCode: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define __str__(self) block inside SpringfieldCitizen class.",
      "Use 'return' instead of printing inside __str__."
    ],
    solution: "class SpringfieldCitizen:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Springfield Citizen {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Springfield Citizen.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "TOWN_SQUARE",
    missionPrefix: "MAP_CONST",
    intro: "# Unified Town Heritage: Class Variables\n\nWhile every citizen has unique characteristics, names, and hunger levels, they *all* share the exact same town environment. We can use a Class Variable to store shared constants that apply to all instances, saving server memory.",
    task: "### YOUR MISSION\n\n1. Define a class variable `town` set to \"Springfield\" inside `SpringfieldCitizen`.\n2. `print` the class variable using `SpringfieldCitizen.town`.",
    baseCode: "class SpringfieldCitizen:\n    # TODO: Define class variable 'town'\n    pass\n# TODO: Print SpringfieldCitizen.town\n",
    hints: [
      "Place 'town = \"Springfield\"' immediately under the class declaration.",
      "Print the value of SpringfieldCitizen.town outside the class."
    ],
    solution: "class SpringfieldCitizen:\n    town = \"Springfield\"\n\nprint(SpringfieldCitizen.town)",
    solutionRegex: [/town\s*=\s*['"]Springfield['"]/, /print\s*\(\s*SpringfieldCitizen\.town\s*\)/]
  }
};