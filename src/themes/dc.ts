export const DC_THEME: any = {
  "intro-print": {
    headerPrefix: "WAYNETECH_OS",
    missionPrefix: "BATCAVE_COMM",
    intro: "# Dark Knight Protocol: print()\n\nWelcome to the Batcave, Master Bruce. The urban crime-fighting grid is online. Initialize the cowl's tactical display with a status check.",
    task: "Use `print()` to display: `\"I am Vengeance\"`",
    baseCode: "# TODO: Initialize HUD signal\n",
    solution: "print(\"I am Vengeance\")",
    solutionRegex: [/print\s*\(\s*['\"]I am Vengeance['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "BAT_STYLE",
    missionPrefix: "CASE_AUTHORIZATION",
    intro: "# Batcomputer Sync: Case Authorization\n\nBatman doesn't tolerate tactical errors. The Batcomputer terminal expects rigid case matching. Using an uppercase command like `Print()` or capital variables will lock the Oracle files to prevent villainous intrusion! Keep your code in standard lowercase.",
    task: "Declare a lowercase tactical registry variable named `bat_gadget_count` and set it to `35`. Print it using `print()` to prepare your armory. Keep everything lowercase!",
    baseCode: "# TODO: Register bat_gadget_count and print it\n",
    solution: "bat_gadget_count = 35\nprint(bat_gadget_count)",
    solutionRegex: [/bat_gadget_count\s*=\s*35/, /print\s*\(\s*bat_gadget_count\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "ENCRYPTED_INTEL",
    missionPrefix: "ORACLE_NODE",
    intro: "# Classified Case Files: Comments\n\nNot even the Justice League should see these contingency plans. Use comments to hide your strategies for defeating rogue meta-humans.",
    task: "Write a comment `# Kryptonite location: Vault 7` and then `print(\"Files hidden\")`",
    baseCode: "# TODO: Hide secret files\n",
    solution: "# Kryptonite location: Vault 7\nprint(\"Files hidden\")",
    solutionRegex: [/#.*Kryptonite location: Vault 7/, /print\s*\(\s*['\"]Files hidden['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "BATCOMPUTER_HUD",
    missionPrefix: "VAULT_TAG",
    intro: "# Batcomputer Diagnostics: Inline Comments\n\nWhile Oracle coordinates active operations, you need to tag critical items inside Wayne Enterprises vault systems. Add inline notes directly adjacent to registry parameters.",
    task: "Initialize `kryptonite_grams` to `5`. On the same line, add an inline comment `# Containment vault`.",
    baseCode: "# TODO: Register asset with inline comment\n",
    solution: "kryptonite_grams = 5 # Containment vault",
    solutionRegex: [/kryptonite_grams\s*=\s*5/, /#.*Containment vault/]
  },
  "intro-vars": {
    headerPrefix: "UTILITY_BELT",
    missionPrefix: "GADGET_STOCK",
    intro: "# Tactical Inventory: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled gadget pouch** on Batman's utility belt! You give the pouch a label, put a specific gadget or quantity inside, and grab it whenever you need it during a mission.\n\nA vigilante must always know their resources. Let's use variables to track how many Batarangs are left and your current reputation in Gotham.",
    task: "Create `batarangs` set to `20` and `gotham_fear_level` set to `9.8`.",
    baseCode: "# TODO: Sync inventory stats\n",
    solution: "batarangs = 20\ngotham_fear_level = 9.8",
    solutionRegex: [/batarangs\s*=\s*20/, /gotham_fear_level\s*=\s*9\.8/]
  },
  "vars-reassignment": {
    headerPrefix: "CRIME_SCANNER",
    missionPrefix: "THREAT_UPDATE",
    intro: "# Joker Spotted: Reassignment\n\nThe clown prince of crime has moved to a new location! Update your `target_location` variable to dispatch the Batmobile to Arkham.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "target = \"Ace Chemicals\"\nprint(target)  # Output: Ace Chemicals\n\n# We overwrite the old value by assigning a new one:\ntarget = \"Arkham\"\nprint(target)  # Output: Arkham",
    task: "Initialize `target` as `\"Ace Chemicals\"`. Then update `target` to `\"Arkham\"`. Print it.",
    baseCode: "target = \"Ace Chemicals\"\n# TODO: Redirect target to Arkham\n",
    solution: "target = \"Ace Chemicals\"\ntarget = \"Arkham\"\nprint(target)",
    solutionRegex: [/target\s*=\s*['\"]Ace Chemicals['\"]/, /target\s*=\s*['\"]Arkham['\"]/, /print\s*\(\s*target\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "BATCOMPUTER",
    missionPrefix: "SIGNAL_CATCH",
    intro: "# Echo Request: Gotham Sensor Handshake\n\nWait for the Batcomputer orbital radar to push an incoming distress signal! Before the target's location coordinate bypasses your cowl's HUD, set up an empty placeholder variable in your terminal to catch the rogue signal.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `dc_data = \"\"` as a placeholder, we allocate space in memory. Then, running `dc_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the rogue signal dynamically so you can see it change!",
    example: "dc_data = \"\"  # Buffer is ready, but currently empty\ndc_data = input(\"Enter rogue signal: \")  # Line 2 updates the empty string with your input!\nprint(\"Tracking signal: \" + dc_data)",
    task: "1. Initialize `dc_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter rogue signal: \")` to populate it.\n3. Print `\"Tracking signal: \" + dc_data`.",
    baseCode: "# TODO: Initialize empty signal buffer, capture, and print\n",
    hints: [
      "Use dc_data = \"\" to prepare the Batcomputer buffer.",
      "Use dc_data = input(\"Enter rogue signal: \") to capture the stream.",
      "Print \"Tracking signal: \" combined with the dc_data variable."
    ],
    solution: "dc_data = \"\"\ndc_data = input(\"Enter rogue signal: \")\nprint(\"Tracking signal: \" + dc_data)",
    solutionRegex: [/dc_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "RESERVE_SYNC",
    missionPrefix: "SQUAD_STATUS",
    intro: "# Tactical Coordination: Multi-Assignment\n\nCoordinate with Robin and Nightwing. Initialize their mission status variables simultaneously to ensure a synchronized strike on the Penguin's warehouse.",
    task: "Assign `robin_status` set to `\"In Position\"` and `nightwing` set to `\"Ready\"` in one line.",
    baseCode: "# TODO: Sync squad status\n",
    solution: "robin_status, nightwing = \"In Position\", \"Ready\"",
    solutionRegex: [/robin_status\s*,\s*nightwing\s*=\s*['\"]In Position['\"]\s*,\s*['\"]Ready['\"]/]
  },
  "data-strings": {
    headerPrefix: "RIDDLER_CLUE",
    missionPrefix: "CIPHER_BREAK",
    intro: "# Solving the Enigma: Strings\n\nThe Riddler has left a message on the GCPD mainframe. Use strings to store and decrypt the latest riddle before the timer runs out.",
    task: "Create a variable `riddle` set to `\"Riddle me this...\"`. Print it.",
    baseCode: "# TODO: Process riddle string\n",
    solution: "riddle = \"Riddle me this...\"\nprint(riddle)",
    solutionRegex: [/riddle\s*=\s*['\"]Riddle me this\.\.\.['\"]/]
  },
  "data-booleans": {
    headerPrefix: "BAT_COMPUTER",
    missionPrefix: "CRIME_NET",
    intro: "# Gotham Logic: Booleans\n\nOracle is scanning the city. Is the Joker at Arkham? Is the Batmobile fueled? Use booleans to track the binary state of Gotham's safety.",
    task: "Set `signal_in_the_sky` to `True` and `robin_is_lost` to `False`.",
    baseCode: "# TODO: Check Gotham night status\n",
    solution: "signal_in_the_sky = True\nrobin_is_lost = False",
    solutionRegex: [/signal_in_the_sky\s*=\s*True/, /robin_is_lost\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "BAT_COMPUTER",
    missionPrefix: "GADGET_TALLY",
    intro: "# Utility Belt Logic: Math\n\nBatman is prepping for a patrol. Tally up the total number of Batarangs and Smoke Pellets to ensure Gotham's protector has the resources for a long night.",
    task: "Create `batarangs` as `15` and `smoke_pellets` as `5`. Store the sum in `total_gear` and print it.",
    baseCode: "# TODO: Audit utility belt\n",
    solution: "batarangs = 15\nsmoke_pellets = 5\ntotal_gear = batarangs + smoke_pellets\nprint(total_gear)",
    solutionRegex: [/total_gear\s*=\s*batarangs\s*\+\s*smoke_pellets/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe Bat-Computer was hit by a Joker virus. Run a memory dump to calculate stealth probability using light levels and suitability modifiers.",
    technical: "### Tactical Analysis Engine:\n1. **Stealth Probability**: Subtract armour burden and background light level from standard environment assets prior to checking multipliers.\n2. **Bat-System Priority**: Implement parentheses `()` to bypass standard calculation patterns and priority-assess safety conditions.",
    example: "light_level = 80\ndarkness_mod = -10\nstealth_chance = (light_level + darkness_mod) * 0.8\nprint(stealth_chance)",
    task: "1. Create tactical input `light_level` as `80`.\n2. Create tactical input `darkness_mod` as `-10`.\n3. Calculate `(light_level + darkness_mod) * 0.8` and store in `stealth_chance`.\n4. Print `stealth_chance`.",
    baseCode: "# TODO: Execute stealth diagnostic\n",
    solution: "light_level = 80\ndarkness_mod = -10\nstealth_chance = (light_level + darkness_mod) * 0.8\nprint(stealth_chance)",
    solutionRegex: [/stealth_chance\s*=\s*\(\s*light_level\s*\+\s*darkness_mod\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "JLA_ROSTER",
    missionPrefix: "YOUR TASK",
    intro: "# Justice League Roll Call: Lists\n\nWelcome back to the Watchtower. Register the active members for tonight's patrol over Gotham and Metropolis.",
    technical: "### Justice League Roll Call Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of values stored in a single unified sequence. Rather than tracking heroes using distinct isolated files (e.g., `member1 = \"Batman\"`, `member2 = \"Superman\"`), you can list them in one dynamic array under a single Watchtower monitor.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, which act as the solid security containment shield around your members.\n- **Comma Separation**: Every league member registered in your patrol sheet must be separated by a comma.\n- **Zero-Based Ranks**: Python lists use zero-based indexing. The league founder is monitored at index `0`, the next member at `1`, and the third at `2`.",
    example: "# Register multiple heroes in a single list variable\npatrol_team = [\"Wonder Woman\", \"Green Lantern\", \"Aquaman\"]\nprint(patrol_team)  # Transmits the active watchtower roster",
    task: "Create a list `justice_league` with \"Batman\", \"Superman\", and \"Flash\". Print it for the watchtower records.",
    baseCode: "# TODO: Log active heroes\n",
    solution: "justice_league = [\"Batman\", \"Superman\", \"Flash\"]\nprint(justice_league)",
    solutionRegex: [/justice_league\s*=\s*\[/, /print\s*\(\s*justice_league\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "WATCHTOWER_RADAR",
    missionPrefix: "YOUR TASK",
    intro: "# Dispatch Coordinate: Hero Indices\n\nThe Oracle sensor nodes indicate crises. Pull Batman and Flash from your Watchtower coordination database to deploy them to active locations.",
    technical: "### Justice League Array:\n\n```text\njustice_league = [\"Batman\", \"Superman\", \"Flash\"]\n#                 [0]          [1]           [2]\n```",
    example: "# Grab members from watchtower coordinate list using indices\njustice_league = [\"Batman\", \"Superman\", \"Flash\"]\n\n# Retrieve first division leader (index 0)\np1 = justice_league[0]\nprint(p1)  # Output: Batman\n\n# Retrieve third swift reserve (index 2)\np3 = justice_league[2]\nprint(p3)  # Output: Flash",
    task: "1. Pinpoint the first member (index 0) in `justice_league` and store in `p1`.\n2. Pinpoint the third member (index 2) in `justice_league` and store in `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "justice_league = [\"Batman\", \"Superman\", \"Flash\"]\n# TODO: Dispatch members 0 and 2\n",
    solution: "p1 = justice_league[0]\np3 = justice_league[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*justice_league\s*\[\s*0\s*\]/, /p3\s*=\s*justice_league\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "JLA_ROSTER_ADD",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value hero operative is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "justice_league = [\"Batman\",\"Superman\",\"Flash\"]\njustice_league.append(\"Wonder Woman\")\n# justice_league is now updated!",
    task: "1. Append \"Wonder Woman\" to the `justice_league` list.\n2. Print the final `justice_league` list to confirm installation.",
    baseCode: "justice_league = [\"Batman\",\"Superman\",\"Flash\"]\n# TODO: Append value and print\n",
    solution: "justice_league.append(\"Wonder Woman\")\nprint(justice_league)",
    solutionRegex: [/justice_league\.\s*append\s*\(\s*['"]Wonder Woman['"]\s*\)/, /print\s*\(\s*justice_league\s*\)/]
  },
  "list-pop": {
    headerPrefix: "ARKHAM_BOOKING",
    missionPrefix: "YOUR TASK",
    intro: "# Arkham Booking: .pop()\n\nThe Batcomputer has processed the list of active threats. Batman has just intercepted the highest priority target. Use `.pop()` to extract the last rogue villain from the active gallery list and lock them safely in Arkham.",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = rogues_gallery.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `rogues_gallery` list and store it inside a variable named `captured_villain`.\n2. Print `captured_villain` to output the purged token.",
    baseCode: "rogues_gallery = [\"Joker\",\"Riddler\",\"Penguin\"]\n# TODO: Pop last element and print\n",
    solution: "captured_villain = rogues_gallery.pop()\nprint(captured_villain)",
    solutionRegex: [/captured_villain\s*=\s*rogues_gallery\.\s*pop\s*\(\s*\)/, /print\s*\(\s*captured_villain\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "COORDINATE_VAULT",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Batcomputer-Grade Immutable Tuples:\n- **What is a Tuple?**: A tuple is an ordered sequence of data points, like a crime scene grid, but with a critical security constraint: **lists are mutable** (meaning elements can be reordered or deleted as Batman gathers evidence), whereas **tuples are immutable** (their coordinates and metadata are permanently locked down in memory and cannot be altered once stored).\n- **Syntax**: Declared using round parentheses `()` instead of square brackets `[]`.\n- **Speed & Security**: Because tuples are simpler and read-only, the Batcomputer processes them faster and uses them to lock critical, static assets like Batcave coordinates or secret communication frequencies against tamper attempts.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `batcave_location` containing \"Gotham Sub-Levels\" and the number `1939`.\n2. Print the `batcave_location` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "batcave_location = (\"Gotham Sub-Levels\", 1939)\nprint(batcave_location)",
    solutionRegex: [/batcave_location\s*=\s*\(\s*['"]Gotham Sub-Levels['"]\s*,\s*1939\s*\)/, /print\s*\(\s*batcave_location\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "BELT_CONFIGURATION",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `bat_arsenal` containing the single string \"Batarang\"\n2. Create a tuple named `utility_belt_config` containing the numbers `5` and `0`.\n3. Rewrite `bat_arsenal[0]` to be \"Grapple_Gun\"\n4. Print both `bat_arsenal` and `utility_belt_config`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "bat_arsenal = [\"Batarang\" ]\nutility_belt_config = (5, 0)\nbat_arsenal[0] = \"Grapple_Gun\"\nprint(bat_arsenal)\nprint(utility_belt_config)",
    solutionRegex: [/bat_arsenal\s*\[\s*0\s*\]\s*=\s*['"]Grapple_Gun['"]/, /utility_belt_config\s*=\s*\(\s*5\s*,\s*0\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "CELL_BLOCK_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `arkham_manifest` list.\n2. Store this result in a new variable named `high_risk_ward`.\n3. Print the resulting slice `high_risk_ward`.",
    baseCode: "arkham_manifest = [\"Freeze\",\"Bane\",\"Ivy\",\"Harley\",\"Clayface\",\"Scarecrow\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "high_risk_ward = arkham_manifest[1:4]\nprint(high_risk_ward)",
    solutionRegex: [/high_risk_ward\s*=\s*arkham_manifest\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*high_risk_ward\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "THREAT_ELEVATION",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `threat_levels`.\n2. Store the result in a variable named `red_alerts`.\n3. Print `red_alerts`.",
    baseCode: "threat_levels = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "red_alerts = [t for t in threat_levels if t > 50]\nprint(red_alerts)",
    solutionRegex: [/red_alerts\s*=\s*\[\s*t\s+for\s+t\s+in\s+threat_levels\s+if\s+t\s*>\s*50\s*\]/, /print\s*\(\s*red_alerts\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "RADAR_BEACONS",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `gotham_beacons` list using a list comprehension.\n2. Store this filtered list in a new variable named `active_zones`.\n3. Print `active_zones`.",
    baseCode: "gotham_beacons = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "active_zones = [b for b in gotham_beacons if b % 2 == 0]\nprint(active_zones)",
    solutionRegex: [/active_zones\s*=\s*\[\s*b\s+for\s+b\s+in\s+gotham_beacons\s+if\s+b\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*active_zones\s*\)/]
  },
  "intro-input": {
    headerPrefix: "BAT_COMPUTER",
    missionPrefix: "YOUR TASK",
    intro: "# Oracle Database Query: User Input\n\nGotham City is under siege. Oracle has initiated a Batcomputer inquiry to locate the villain responsible for the recent crime wave. Prompt the user for the threat\'s location.",
    technical: "### Input Queries:\n- Use `input()` to prompt for live sector reports from the city\'s sensor grid.\n- Returns the target coordinates as a string for high-speed tracking.\n- **Tactical Concatenation**: Link tracking labels or villain alerts together using the `+` operator (e.g., `\"Bat\" + \"Cave\"` becomes `\"BatCave\"`). Note that Python won\'t insert spaces automatically, so format your tactical logs precisely!",
    example: "villain = input(\"Enter suspect identity: \")\nprint(\"Locating: \" + villain)",
    task: "1. Ask the user for the city sector with the prompt: **\"Enter sector ID: \"** and store it in a variable named `sector_id`.\n2. Print **\"Analyzing sector: \"** concatenated with the user\'s `sector_id` value.",
    baseCode: "# TODO: Capture sector and print the scan log\n",
    solution: "sector_id = input(\"Enter sector ID: \")\nprint(\"Analyzing sector: \" + sector_id)",
    solutionRegex: [/sector_id\s*=\s*input\s*\(\s*['\"]Enter sector ID: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Analyzing sector: \s*['\"]\s*\+\s*sector_id\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "ORACLE_FILE",
    missionPrefix: "LOG_GEN",
    intro: "# Gotham Chronicles: Story Generator\n\nConstruct encrypted incident dossiers for the Batcomputer. Capture eyewitness reports to trace the path and tools used by vigilantes.",
    technical: "### Record Linkage:\nLink suspects, devices, and districts together using the + syntax. Ensure space padding exists inside the hardcoded text blocks.",
    example: "hero = \"Batman\"\nroom = \"Batcave\"\nlog = hero + \" retreated to \" + room\nprint(log)",
    task: "1. Ask the user for the hero identity with the prompt: **\"Enter hero name: \"** and store it in `hero`.\n2. Ask the user for the villain lair with the prompt: **\"Enter villain lair: \"** and store it in `lair`.\n3. Ask the user for the gadget name with the prompt: **\"Enter gadget name: \"** and store it in `gadget`.\n4. Combine into a variable named `gotham_report` using the format: `hero + \" bypassed \" + lair + \" with a \" + gadget + \"!\"` and print `gotham_report`.",
    baseCode: "# TODO: Document Gotham incident information\n",
    solution: "hero = input(\"Enter hero name: \")\nlair = input(\"Enter villain lair: \")\ngadget = input(\"Enter gadget name: \")\ngotham_report = hero + \" bypassed \" + lair + \" with a \" + gadget + \"!\"\nprint(gotham_report)",
    solutionRegex: [/hero\s*=\s*input\s*\(\s*['"]Enter hero name:\s*['"]\s*\)/, /lair\s*=\s*input\s*\(\s*['"]Enter villain lair:\s*['"]\s*\)/, /gadget\s*=\s*input\s*\(\s*['"]Enter gadget name:\s*['"]\s*\)/, /gotham_report\s*=\s*hero\s*\+\s*['"] bypassed ['"]\s*\+\s*lair\s*\+\s*['"] with a ['"]\s*\+\s*gadget\s*\+\s*['"]!['"]/, /print\s*\(\s*gotham_report\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "BATCOMPUTER_LOGS",
    missionPrefix: "TACTICAL_OVERRIDE",
    intro: "# Gotham Files: Oracle Network Glitch\n\nThe Penguin has launched a brute-force decryption on Gotham bridges! Draft an incident reporting protocol for high-priority files.",
    technical: "### Encrypted Record Chain:\nConnect the dots of Batman's encounters by gluing rogue data fields together with strict spacer structures.",
    example: "report = rogue + \" injected \" + toxin + \" into \" + server + \" at \" + level + \". System is \" + mode + \"!\"",
    task: "1. Ask for current hero identity with prompt: **\"Enter hero name: \"** and store in `hero`.\n2. Ask for counter-security gadget with prompt: **\"Enter counter gadget: \"** and store in `bat_gadget`.\n3. Ask for compromised Gotham facility with prompt: **\"Enter district sector: \"** and store in `sector`.\n4. Ask for system alert levels with prompt: **\"Enter threat level: \"** and store in `threat_level`.\n5. Ask for mainframe response with prompt: **\"Enter computer status: \"** and store in `comp_status`.\n6. Combine into a variable named `gotham_breach` and print using the exact format: `hero + \" injected \" + bat_gadget + \" into \" + sector + \" at \" + threat_level + \". System is \" + comp_status + \"!\"`.",
    baseCode: "# TODO: Document Oracle backup network glitch\n",
    solution: "hero = input(\"Enter hero name: \")\nbat_gadget = input(\"Enter counter gadget: \")\nsector = input(\"Enter district sector: \")\nthreat_level = input(\"Enter threat level: \")\ncomp_status = input(\"Enter computer status: \")\ngotham_breach = hero + \" injected \" + bat_gadget + \" into \" + sector + \" at \" + threat_level + \". System is \" + comp_status + \"!\"\nprint(gotham_breach)",
    solutionRegex: [/hero\s*=\s*input\s*\(\s*['"]Enter hero name:\s*['"]\s*\)/, /bat_gadget\s*=\s*input\s*\(\s*['"]Enter counter gadget:\s*['"]\s*\)/, /sector\s*=\s*input\s*\(\s*['"]Enter district sector:\s*['"]\s*\)/, /threat_level\s*=\s*input\s*\(\s*['"]Enter threat level:\s*['"]\s*\)/, /comp_status\s*=\s*input\s*\(\s*['"]Enter computer status:\s*['"]\s*\)/, /print\s*\(\s*gotham_breach\s*\)/]
  },
  "print-formatting": {
    title: "Batcomputer Registry: F-Strings",
    headerPrefix: "BAT_SCANNER",
    missionPrefix: "INTEL_FORMAT",
    intro: "# Batcomputer Registry: F-Strings\n\nMonitoring Gotham's grid is more efficient with formatted output logs. Inject vigilante identities and tier threat levels directly into your console headers.",
    technical: "### The Bat-Format standard:\n- **F-Prefix**: Always prepend string literals with `f` to enable dynamic expansion.\n- **Data Placements**: Wrap variables with curly braces `{}` to securely route memory values directly into output string grids.",
    example: "hero = \'Batman\'\nprint(f\'Secure uplink with {hero}\') # Outputs: Secure uplink with Batman",
    task: "### YOUR MISSION\n\nYou have `alias = \'Batman\'` and `level = 9`. Use an **f-string** to print: `Hero: Batman | Security Tier: 9`.",
    baseCode: "alias = \'Batman\'\nlevel = 9\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Embed {alias} and {level} inside curly braces."
    ],
    solution: "alias = \'Batman\'\nlevel = 9\nprint(f\'Hero: {alias} | Security Tier: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Hero:\s*\{alias\}\s*\|\s*Security\s*Tier:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Batcomputer Dispatch: Advanced F-Strings",
    headerPrefix: "BAT_REGRID",
    missionPrefix: "UNIT_ROUTE",
    intro: "# Gotham Defense: Advanced F-Strings\n\nMonitor security feeds from the Batcomputer. F-strings allow you to perform inline calculations to count active squads and enforce UPPERCASE district codes under threat.",
    technical: "### Vigilante Command Tech:\n- **Math in Braces**: Add backup patrollers or gadgets directly inside your string: `{patrols + backups}`.\n- **Inline Methods**: Convert Gotham zones to uppercase instantly for global alerts: `{zone.upper()}`.",
    example: "x, y = 3, 2\nprint(f'Total Batarangs: {x * y}')",
    task: "### YOUR MISSION\n\n1. Prompt for officer count with: **\"Enter officer count: \"** and store it as an integer in `officers`.\n2. Prompt for target district with: **\"Enter district: \"** and store it in `district`.\\n3. Use an **f-string** to print: `Deploying {officers} officers to {district.upper()}...`.",
    baseCode: "# TODO: Dispatch unit\n",
    hints: [
      "Ask for officers using int(input(\"Enter officer count: \"))",
      "Ask for district using input(\"Enter district: \")",
      "Use {officers} and {district.upper()} inside the printed f-string."
    ],
    solution: "officers = int(input(\"Enter officer count: \"))\ndistrict = input(\"Enter district: \")\nprint(f\"Deploying {officers} officers to {district.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{officers\}\s*officers\s*to\s*\{district\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Batcomputer Crime Scanner: Casting to Int",
    headerPrefix: "GOTHAM_SCAN",
    missionPrefix: "ROGUE_REC",
    intro: "# Gotham Safety Grid: Tracking Criminals\\n\\nScattered alert reports come in through emergency radio channels. Read their crime frequencies into the Batcomputer and cast them into integers to calculate exactly how many threats Batman faces on patrol.",
    technical: "### Crime Recasting:\\n- Use `int()` to extract proper numerical values from text inputs, allowing the Batcomputer to tally active offenses.",
    example: "thugs = int(input(\"Thugs in sector: \"))\nactive_threats = thugs + 1",
    task: "### YOUR MISSION\\n\\nTally Gotham villains:\\n1. Prompt for escaped inmates with **\\\"Enter escaped inmates: \\\"** and store it as an integer in `arkham_inmates`.\\n2. Prompt for rogues at large with **\\\"Enter rogue villains spotted: \\\"** and store it as an integer in `rogues_at_large`.\\n3. Calculate and print the combined count of active Gotham threats.",
    baseCode: "# TODO: Cast threats and tally them\\n",
    hints: [
      "Store inmates: arkham_inmates = int(input(\\\"Enter escaped inmates: \\\"))",
      "Store rogues: rogues_at_large = int(input(\\\"Enter rogue villains spotted: \\\"))",
      "Print the sum of arkham_inmates and rogues_at_large."
    ],
    solution: "arkham_inmates = int(input(\\\"Enter escaped inmates: \\\"))\\nrogues_at_large = int(input(\\\"Enter rogue villains spotted: \\\"))\\nprint(arkham_inmates + rogues_at_large)",
    solutionRegex: [/arkham_inmates\s*=\s*int\s*\(\s*input/, /rogues_at_large\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Batcomputer Sonar: Casting to Float",
    headerPrefix: "BAT_RADAR",
    missionPrefix: "SONAR_SCALE",
    intro: "# Gotham Surveillance: Sonar Ranging\\n\\nHook sonar sensors onto local Gotham water pipelines. Sound waves return decimal frequency signatures that the Batcomputer must parse as floating-point numbers to accurately track moving targets.",
    technical: "### Batcomputer Float Diagnostics:\\n- **What is a Float?**: Unlike integers (whole numbers), a `float` represents a decimal value (e.g., `1.25` seconds). Sonar scan increments must be floats to maintain microsecond accuracy.\\n- **String-to-Float Translation**: The standard `input()` function captures every reading as text (a string). To use it in calculations, pass it through `float()`, e.g., `val = float(input())`.\\n- **The Integer Trap**: Attempting to feed a decimal string like `\"1.25\"` into `int()` will instantly crash the Batcomputer with a `ValueError`! Always use `float()` for signals with potential decimal parts.",
    example: "thug_distance = float(input(\"Ranging signal: \"))\neta_mins = thug_distance * 0.4",
    task: "### YOUR MISSION\\n\\nCalibrate Batman\\'s tracking radar:\\n1. Prompt for sonar ping time with **\\\"Enter sonar ping interval in seconds: \\\"** and store it as a float in `ping_interval`.\\n2. Prompt for refinement multiplier with **\\\"Refinement multiplier: \\\"** and store it as a float in `multiplier`.\\n3. Multiply ping interval by refinement multiplier, then print the total time adjustment value.",
    baseCode: "# TODO: Tune sonar intervals\\n",
    hints: [
      "Use ping_interval = float(input(\"Enter sonar ping interval in seconds: \"))",
      "Use multiplier = float(input(\"Refinement multiplier: \"))",
      "Print the multiple: print(ping_interval * multiplier)"
    ],
    solution: "ping_interval = float(input(\"Enter sonar ping interval in seconds: \"))\nmultiplier = float(input(\"Refinement multiplier: \"))\nprint(ping_interval * multiplier)",
    solutionRegex: [/ping_interval\s*=\s*float\s*\(\s*input/, /multiplier\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Batcomputer Entry: Indentation Blocks",
    headerPrefix: "BAT_VAULT",
    missionPrefix: "CAVE_ACCESS",
    intro: "# Asylum Hack: Indentation Discipline\\n\\nBypassing Arkham mainframe relays is a game of precision. Unlike C++ or Java, Python uses empty spaces to block statements together. Write flawless syntax to slide past Arkham\\'s security.",
    technical: "### Batman\\'s Protocol:\\n- The colon (`:`) creates a tactical branch.\\n- Indent exactly 4 characters deep to execute steps nested beneath that security gate.",
    example: "if True:\\n    print(\\\"Batarang calibrated\\\")  # Batcomputer line",
    task: "### YOUR MISSION\\n\\nBypass the mainframe gates:\\n1. Write an `if True:` control block.\\n2. On the next line, indented with 4 spaces, print **\\\"Accessing...\\\"** to initiate the cave override feed.",
    baseCode: "# TODO: Nest Arkham terminal instructions\\n",
    hints: [
      "End your if statement with an automatic colon (:)",
      "Indent the next line with exactly 4 spaces",
      "Print \\\"Accessing...\\\" inside the gate"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Batcave Uplink: Deep Encryption Layers",
    headerPrefix: "BAT_UPLINK",
    missionPrefix: "OVERRIDE_SEC",
    intro: "# Arkham Asylum Hack: Multi-Gate Decryption\\n\\nOracle has tracked the Riddler\\'s coordinates down to deep database tables in the asylum mainframe. To avoid cyber-retaliation, you must nest logical security bypass gates with exact indentation coordinates.",
    technical: "### Tactical Spacing Calculations:\\n- Python code checks use nesting to restrict deep command execution.\\n- Every subordinate layer doubles your offset (4 spaces up to **8 spaces**) to remain valid.",
    example: "if True:\\n    print(\"Security layer 1\")\\n    if True:\\n        print(\"Security layer 2\")",
    task: "### YOUR MISSION\\n\\nVerify Batman\\'s remote control link to Arkham security:\\n1. Establish the outer main bypass filter utilizing **`if True:`**.\\n2. Nest the secondary validation security check inside with a **`if True:`** (indented by 4 spaces).\\n3. In the third innermost command line (indented by exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Program nested Bat-computer logic blocks\\n",
    hints: [
      "Open with if True: on line 1.",
      "Insert if True: on line 2, indented with 4 spaces.",
      "Execute print(\"CORE ACCESS GRANTED\") on line 3, indented with 8 spaces."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "BAT_SIGNAL",
    missionPrefix: "CLOUD_SCAN",
    intro: "# Darkness Rises: If Statements\n\nCommissioner Gordon is at the searchlight. Use an if statement to check if the Bat-Signal is visible in the clouds before heading to the roof.",
    task: "If `signal_on` is `True`, print `\"HEADING TO THE ROOF\"`.",
    baseCode: "signal_on = True\n# TODO: Check signal status\n",
    solution: "signal_on = True\nif signal_on:\n    print(\"HEADING TO THE ROOF\")",
    solutionRegex: [/if\s+signal_on/, /print\s*\(\s*['\"]HEADING TO THE ROOF['\"]\s*\)/]
  },
  "control-else": {
    title: "Batcomputer Security: Else Branches",
    headerPrefix: "BAT_RECON",
    missionPrefix: "SYSTEM_REPLY",
    intro: "# Gotham Signal Intercept: If/Else Validation\\n\\nBatman is auditing access requests attempting to scan Arkham security databases. If the pass-key verifies as positive, grant remote terminal entry. Otherwise, transmit silent alarm triggers directly to Commissioner Gordon\\'s phone.",
    technical: "### Vigilante Error Handling:\\n- `else:` directs executing code when the initial statement resolves to `False`. Keep it strictly in line with the parent `if` statement block.",
    example: "if signal_detected:\\n    print(\\\"Target located\\\")\\nelse:\\n    print(\\\"Searching Gotham\\\")",
    task: "### YOUR MISSION\\n\\nRun the Batcave clearance logic:\\n1. Process an `if/else` verification on `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Verify Arkham database keys\\n",
    hints: [
      "Use if key_valid: as the initial statement.",
      "Indent the success output: print(\\\"ACCESS GRANTED\\\").",
      "Add else: at column 0.",
      "Indent the failure output: print(\\\"ALARM TRIGGERED\\\")."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Arkham Intruders: Elif Clearance",
    headerPrefix: "BAT_MONITOR",
    missionPrefix: "TIER_ALARM",
    intro: "# Asylum Database: Tiered Mainframe Access\\n\\nOracle is scanning connections logging into the Arkham terminal. To differentiate WayneTech updates, guard profiles, and inmate threats, construct a multi-tiered conditional script using `elif`.",
    technical: "### Security System Chaining:\\n- Python checks each condition in descending order. Once a criterion is met, its code executes and the checker bypasses the remaining branches.",
    example: "if code == \"Batman\":\\n    print(\"Welcome Wayne\")\\nelif code == \"Robin\":\\n    print(\"Welcome Grayson\")\\nelse:\\n    print(\"Intruder detected\")",
    task: "### YOUR MISSION\\n\\nClassify WayneTech dial-in privileges:\\n1. Construct an `if/elif/else` triage on `clearance`.\\n2. If `clearance` equals `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Otherwise, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Run batcomputer clearance check\\n",
    hints: [
      "Compare clearance equal to 1 first",
      "Add a middle level via elif clearance <= 5:",
      "Implement the else: block to log suspicious users"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Tactical Coverup: WayneTech Disguise",
    headerPrefix: "BAT_REACTION",
    missionPrefix: "BATCOMPUTER_LOG",
    intro: "# Vigilante Alibi: Stealth Protocol\n\nThe GCPD is auditing the Wayne Enterprises server breach. If the Batcomputer detected local officers scanning, trigger your spoofing sequence to print a defensive decoy. Otherwise, output a stealth confirmation.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"SMOKE_PELLET_DEPLOY\")\nelse:\n    print(\"Silent shadow mode.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` secure routing:\n1. If `is_detected`, print **`\"SMOKE_PELLET_DEPLOY\"`** to block investigators.\n2. Else, print **`\"Silent shadow mode.\"`** to maintain silent operations.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"SMOKE_PELLET_DEPLOY\".",
      "Add else: at the base level and print \"Silent shadow mode.\""
    ],
    solution: "if is_detected:\n    print(\"SMOKE_PELLET_DEPLOY\")\nelse:\n    print(\"Silent shadow mode.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]SMOKE_PELLET_DEPLOY['"]\s*\)/, /print\s*\(\s*['"]Silent\s+shadow\s+mode\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Vigilante Intel: Threat Grade",
    headerPrefix: "BATCOMPUTER_OS",
    missionPrefix: "THREAT_EVAL",
    intro: "# Security File: Batcomputer Threat Classification\n\nIdentify and catalog a central rogue entity using the Batcomputer. Based on the calculated dynamic threat level, assign an target file classification rank.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to evaluate the villain's threat power level.\n- **Assignment**: Set the `threat_class` inside the matching condition branches to run specific defenses.",
    example: "if power > 9000:\n    threat_class = \"Arkham_Max\"\nelse:\n    threat_class = \"GCPD_Main\"",
    task: "### YOUR MISSION\n\nClassify the target villain threat profile:\n1. If rogue `threat_level > 9000`, set `threat_class` to **`\"Arkham_Max\"`**.\n2. Else, set `threat_class` to **`\"GCPD_Main\"`**.\n3. Finally, print the threat class using `print(threat_class)`.",
    baseCode: "threat_level = 9001\nthreat_class = \"\"\n# TODO: Classify threat priority and print it\n",
    hints: [
      "Assign threat_class within your logic blocks.",
      "Call print(threat_class) at the end, completely unindented."
    ],
    solution: "threat_level = 9001\nif threat_level > 9000:\n    threat_class = \"Arkham_Max\"\nelse:\n    threat_class = \"GCPD_Main\"\nprint(threat_class)",
    solutionRegex: [/if\s+threat_level\s*>\s*9000\s*:/, /threat_class\s*=\s*['"]Arkham_Max['"]/, /threat_class\s*=\s*['"]GCPD_Main['"]/, /print\s*\(\s*threat_class\s*\)/]
  },
  "control-adventure": {
    title: "Tactical Access: WayneTech Sector",
    headerPrefix: "WAYNETECH_NET",
    missionPrefix: "BAT_INFILTRATION",
    intro: "# Batcave Entryway: Secure Sector Select\n\nYou've unlocked the outer WayneTech router firewall. Now you must pick a diagnostic sub-system: \"1\" (Main Security Vault) or \"2\" (Maintenance Access Point).",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Querying Security Vault...\")",
    task: "### YOUR MISSION\n\nEstablish server sector handshake:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Choose WayneTech server zone\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Signal Router: Gotham Threat Triage",
    headerPrefix: "BATCOMPUTER_SYS",
    missionPrefix: "ALERT_ROUTING",
    intro: "# Police Frequency: Scanner Dispatch\n\nThe Batcomputer tracks criminal activity in city sectors. Route emergency alerts according to active caller alerts: \"joker\", \"riddler\", or \"freeze\".",
    technical: "### Cascading Checks:\n- **Sequential**: Checks prioritized threats beginning with highest anarchy ratings.\n- **Exclusive**: Activating response unit 'A' handles the specific boss, preventing GCPD crossflow.\n- **Exhaustive**: An `else` is assigned to generic petty crimes across downtown.",
    example: "if threat == \"joker\":\n    print(\"Batmobile deploy.\")\nelif threat == \"riddler\":\n    print(\"Decode riddle.\")",
    task: "### YOUR MISSION\n\nFilter the incoming alert for variable `threat`:\n1. If `threat` is **`\"joker\"`**, print **`\"Batmobile deploy.\"`**\n2. Elif `threat` is **`\"riddler\"`**, print **`\"Decode riddle.\"`**\n3. Elif `threat` is **`\"freeze\"`**, print **`\"Thermals active.\"`**\n4. Else, print **`\"GCPD handles physicals.\"`**",
    baseCode: "threat = \"joker\"\n# TODO: Route batcomputer response\n",
    hints: [
      "Compare threats using if/elif statements.",
      "Add print calls inside nested lines."
    ],
    solution: "if threat == \"joker\":\n    print(\"Batmobile deploy.\")\nelif threat == \"riddler\":\n    print(\"Decode riddle.\")\nelif threat == \"freeze\":\n    print(\"Thermals active.\")\nelse:\n    print(\"GCPD handles physicals.\")",
    solutionRegex: [/if\s+threat\s*==\s*['"]joker['"]\s*:/, /elif\s+threat\s*==\s*['"]riddler['"]\s*:/, /elif\s+threat\s*==\s*['"]freeze['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Batmobile\s+deploy\.['"]\s*\)/, /print\s*\(\s*['"]Decode\s+riddle\.['"]\s*\)/, /print\s*\(\s*['"]Thermals\s+active\.['"]\s*\)/, /print\s*\(\s*['"]GCPD\s+handles\s+physicals\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Grid Patrol: Sector Tour",
    headerPrefix: "BATCOMPUTER_SCAN",
    missionPrefix: "SECTOR_SWEEP",
    intro: "# Urban Patrol: Automated Sector Cycles\n\nGotham City has too many alleys for manually checking each camera feed. Automate a loop cycle to run remote security sweeps across city sectors sequentially.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### Loop Iterations:\n- **range(5)**: Automates a routine that executes exactly 5 times (0 through 4).\n- **Control Flow**: Perfect for looping through continuous surveillance feeds.",
    example: "for i in range(3):\n    print(f\"Camera {i+1} online\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Camera {i+1} online\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write your patrol loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Camera {i+1} online"
    ],
    solution: "for i in range(5):\n    print(f\"Camera {i+1} online\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Signal Tracer: Frequency Scan",
    headerPrefix: "BATCOMPUTER_SIG",
    missionPrefix: "FREQ_WALK",
    intro: "# Signal Decoding: Scanner Tracker\n\nThe Batcomputer picks up encrypted radio frequencies from the Riddler's signal tower. To pinpoint the origin broadcast, verify each character step by step.",
    technical: "### Frequency Sweep:\n- **Sequencing**: Walks through the signal string from left to right, character by character.\n- **Automatic Terminals**: No range or index needed; the loop stops automatically at the end.",
    example: "for glyph in \"RIDDLE\":\n    print(glyph)",
    task: "### YOUR MISSION\n\nYou've tapped an active encoded channel in the variable `frequency`: `\"RIDDLE\"`. Use a `for` loop to iterate through every character `glyph` in the variable `frequency` and `print` it.",
    baseCode: "frequency = \"RIDDLE\"\n# TODO: Loop through the frequency elements\n",
    hints: [
      "Structure the block with 'for glyph in frequency:'.",
      "Print the glyph using the nested print statement."
    ],
    solution: "frequency = \"RIDDLE\"\nfor glyph in frequency:\n    print(glyph)",
    solutionRegex: [/for\s+glyph\s+in\s+frequency/, /print\s*\(\s*glyph\s*\)/]
  },
  "loop-list-audit": {
    title: "Threat Assessment: Rogue Locator",
    headerPrefix: "BAT_COMPUTER",
    missionPrefix: "THREAT_SCAN",
    intro: "# Database Search: Villain Intel\n\nGotham's surveillance network is scanning active encrypted files. Filter out criminal cases specifically tagged with the Rogue Registry `.rog` extension.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"joker.rog\"`, then `\"civilian.db\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".rog\")` asks: *\"Does the text inside `f` end with `.rog`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".rog\"):\n          # This runs ONLY if the current file ends with .rog!\n  ```",
    example: "profiles = [\"cop.txt\", \"joker.rog\"]\nfor p in profiles:\n    if \".rog\" in p:\n        print(p)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".rog\"`, `print` the critical warning: `f\"Threat detected: {f}\"`.",
    baseCode: "discovered_files = [\"joker.rog\", \"civilian.db\", \"bane.rog\", \"city_grid.sys\"]\n# TODO: Track Gotham rogue files\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".rog\"):",
      "Print f'Threat detected: {f}'"
    ],
    solution: "discovered_files = [\"joker.rog\", \"civilian.db\", \"bane.rog\", \"city_grid.sys\"]\nfor f in discovered_files:\n    if f.endswith(\".rog\"):\n        print(f\"Threat detected: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.rog['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Gotham Patrol: Surveillance Matrix",
    headerPrefix: "ARKHAM_SENSORS",
    missionPrefix: "SURVEILLANCE",
    intro: "# City Sectors: Camera Grid Scans\n\nGotham's financial district is monitored via local sectors (X) and high-altitude lenses (Y). Run the Batcomputer scanner through every block division.",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 Gotham sector scan with variable `x` (outer loop representing Rows) and variable `y` (inner loop representing Columns) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Row 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Col 0) -> Output: `Batcomputer - Row: 0, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Batcomputer - Row: 0, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Batcomputer - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Row 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Col 0) -> Output: `Batcomputer - Row: 1, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Batcomputer - Row: 1, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Batcomputer - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Row 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Col 0) -> Output: `Batcomputer - Row: 2, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Batcomputer - Row: 2, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Batcomputer - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Sector {r}, Cam {c}\")",
    task: "### YOUR MISSION\n\nScan a **3x3 block coordinates mapping**. Use nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the camera status message in this exact format: `f\"Batcomputer - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Scan Gotham blocks\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Batcomputer - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Batcomputer - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Batcomputer Override: Intruder Shutdown",
    headerPrefix: "WAYNE_NETWORK",
    missionPrefix: "INTRUDER_HALT",
    intro: "# Security Override: Intruder Isolation\n\nIf the Wayne Enterprise mainframe detects an unauthorized breach attempt during grid audits, the Batcomputer executes an immediate security shutdown. Python implements this using `break`.",
    technical: "### Mainframe Blockage:\n- **Instant Kill**: Sever data loops instantly when intruder threats trigger security alerts.\n- **Firewall Gates**: Deploy condition tests recursively inside active monitors.",
    example: "for scan in range(10):\n    if scan == 5:\n        break\n    print(scan)",
    task: "### YOUR MISSION\n\nAudit file directories over `range(10)`. If the security breach risk index `i` reaches exactly `7` (Unauthorized intruder recognized), execute a standard `break` to preserve data integrity. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Check security channels with emergency break\n",
    hints: [
      "Set up security sweep 'for i in range(10):'",
      "Identify intruder sign 'if i == 7:'",
      "Insert exit switch 'break', then print loop index i"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Batcomputer: Terminal Drainage",
    headerPrefix: "BAT_POWER",
    missionPrefix: "GRID_DISCHARGE",
    intro: "# Mainframe Cycles: While Loops\n\nWhile `for` loops iterate over a specific sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor the backup battery of a localized WayneTech sonar uplink during a stealth mission.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to sustain the scanning satellite.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "GADGET_TECH",
    missionPrefix: "PROTOTYPE_RUN",
    intro: "# WayneTech Engineering: Functions\n\nDon't manually calibrate every Batarang! Create a reusable function to calculate the flight path of any thrown gadget.",
    task: "Write a function `throw_gadget(name)` that prints `f'Launching {name}...'`. Call it.",
    baseCode: "# TODO: Define gadget function\n",
    solution: "def throw_gadget(name):\n    print(f'Launching {name}...')\n\nthrow_gadget('Batarang')",
    solutionRegex: [/def\s+throw_gadget/, /throw_gadget\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "ORACLE_INTEL",
    missionPrefix: "NESTED_ENCRYPT",
    intro: "# Oracle's Web: Recursion\n\nTo trace the Penguin's money laundering, Oracle must dive recursively through offshore shell accounts, following the data trail until the source is revealed.",
    task: "Write a recursive function `trace_account(depth)` that prints `depth` and calls itself with `depth-1` if `depth > 0`.",
    baseCode: "# TODO: Dive into shell accounts\n",
    solution: "def trace_account(depth):\n    print(depth)\n    if depth > 0:\n        trace_account(depth - 1)\n\ntrace_account(5)",
    solutionRegex: [/def\s+trace_account/, /trace_account\s*\(\s*depth\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "METROPOLIS_GEN",
    missionPrefix: "HERO_TEMPLATE",
    intro: "# Justice League Registry: Classes\n\nEvery hero in the Justice League needs a profile. Instead of defining separate variables for every hero's health, powers, and base from scratch, let's build a template blueprint in Python called a **Class**.",
    task: "### YOUR MISSION\n\nDefine a base class named `SuperHero`. Use `pass` inside its block under proper indentation.",
    baseCode: "# TODO: Define the base class SuperHero\n",
    hints: [
      "Use 'class SuperHero:' followed by an indented 'pass'.",
      "Check your spelling and capitalization carefully!"
    ],
    solution: "class SuperHero:\n    pass",
    solutionRegex: [/class\s+SuperHero/, /pass/]
  },
  "oop-init": {
    headerPrefix: "BATCOMPUTER_BOOT",
    missionPrefix: "PROFILE_SPEC",
    intro: "# League Registry: Constructors\n\nWhen a new hero joins the League, Oracle stamps their identity onto the monitors! We can use Python's constructor method `__init__` to assign vital information immediately when a new hero object is created.",
    task: "### YOUR MISSION\n\nInside `SuperHero`, define the constructor method `__init__` which accepts `self` and a parameter `name`. Assign the `name` value to `self.name`.",
    baseCode: "class SuperHero:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Define the method using 'def __init__(self, name):'.",
      "Inside, save the name to the hero object using 'self.name = name'."
    ],
    solution: "class SuperHero:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "TRAINING_DRILL",
    missionPrefix: "POWER_TEST",
    intro: "# Activating Gear: Methods\n\nA hero needs actions to protect Gotham or Metropolis! In Object-Oriented Programming, functions defined inside a class are called **Methods**. Let's write a method to let our heroes activate their unique capability!",
    task: "### YOUR MISSION\n\nAdd a `use_power` method to `SuperHero` that `print`s \"Power deployed\".",
    baseCode: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define use_power method\n",
    hints: [
      "Define 'def use_power(self):' as part of the class.",
      "Use print('Power deployed') inside the method."
    ],
    solution: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n    def use_power(self):\n        print(\"Power deployed\")",
    solutionRegex: [/def\s+use_power\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Power deployed['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "METROPOLIS_STATUS",
    missionPrefix: "HERO_STATE",
    intro: "# Independent Hero States: Object State\n\nIf Batman is patrolling the streets, Superman shouldn't be forced to go with him! Each hero instance tracks their own state independently. We can store this as an instance variable inside our class and update it depending on their actions.",
    task: "### YOUR MISSION\n\n1. In `__init__`, add a `hero_state` instance variable defaulted to the string \"Standby\".\n2. Create a method `patrol` that updates the hero's `self.hero_state` to the string \"Active\".",
    baseCode: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add hero_state default\n    # TODO: Add patrol method\n",
    hints: [
      "Inside __init__, initialise 'self.hero_state = \"Standby\"'.",
      "Under 'def patrol(self):', set 'self.hero_state = \"Active\"'."
    ],
    solution: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n        self.hero_state = \"Standby\"\n    def patrol(self):\n        self.hero_state = \"Active\"",
    solutionRegex: [/self\.hero_state\s*=\s*['"]Standby['"]/, /def\s+patrol/, /self\.hero_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "COMMS_LINK",
    missionPrefix: "LEAGUE_ASSIST",
    intro: "# Justice League Calling: Object Interaction\n\nHeroes never fight completely alone. Objects can interact with one another by receiving other instances of a class as parameters. Let's enable heroes to call upon other league members for backup!",
    task: "### YOUR MISSION\n\nAdd a `call_backup` method to `SuperHero` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Calling backup from: {other.name}\"`.",
    baseCode: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add call_backup method\n",
    hints: [
      "Define 'def call_backup(self, other):' inside the class.",
      "Use an f-string to access the other hero's name via other.name."
    ],
    solution: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n    def call_backup(self, other):\n        print(f\"Calling backup from: {other.name}\")",
    solutionRegex: [/def\s+call_backup\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "STAR_LABS",
    missionPrefix: "SPEED_FORCE",
    intro: "# Speed Force Channeling: Inheritance\n\nAn ordinary hero is amazing, but a Speedster gets incredible speed physics—like vibrating through walls or running back in time! We can inherit general helper properties from `SuperHero` to create a specialized `Speedster` subclass.",
    task: "### YOUR MISSION\n\nCreate a class `Speedster` that inherits from `SuperHero`. Give it a `run_fast` method that `print`s \"Speed Force active\".",
    baseCode: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create Speedster subclass inheriting from SuperHero\n",
    hints: [
      "Use 'class Speedster(SuperHero):' to construct inheritance.",
      "Define 'def run_fast(self):' and have it print 'Speed Force active'."
    ],
    solution: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n\nclass Speedster(SuperHero):\n    def run_fast(self):\n        print(\"Speed Force active\")",
    solutionRegex: [/class\s+Speedster\s*\(\s*SuperHero\s*\)\s*:/, /def\s+run_fast/, /print\s*\(\s*['"]Speed Force active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "LEAGUE_HUD",
    missionPrefix: "PROFILE_READ",
    intro: "# Batcomputer Readout: Custom Str Method\n\nIf we try to print a superhero object directly, Python renders a messy memory hexadecimal. Let's override the special double-underscore method `__str__` to output a clean, hero-branded registry title instead.",
    task: "### YOUR MISSION\n\nIn `SuperHero`, add the custom method `__str__` that returns: `f\"Hero {self.name}\"`.",
    baseCode: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define 'def __str__(self):' inside the SuperHero class block.",
      "Make sure you return (do not print) the formatted f-string: f'Hero {self.name}'"
    ],
    solution: "class SuperHero:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Hero {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Hero.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "WATCHTOWER_HQ",
    missionPrefix: "GROUP_PROTOCOL",
    intro: "# Global Affiliations: Shared Class Variables\n\nEach hero has a unique identity, tools, and mission state, but they *all* share a unified team affiliation. We can use a Class Variable to store shared constants globally for all instances, conserving crucial satellite runtime memory.",
    task: "### YOUR MISSION\n\n1. Define a class variable `team` set to \"Justice League\" inside `SuperHero` before other initialisers.\n2. `print` the class variable using `SuperHero.team`.",
    baseCode: "class SuperHero:\n    # TODO: Define class variable 'team'\n    pass\n# TODO: Print SuperHero.team\n",
    hints: [
      "Place 'team = \"Justice League\"' immediately under the class declaration.",
      "Print the value of SuperHero.team outside the class."
    ],
    solution: "class SuperHero:\n    team = \"Justice League\"\n\nprint(SuperHero.team)",
    solutionRegex: [/team\s*=\s*['"]Justice League['"]/, /print\s*\(\s*SuperHero\.team\s*\)/]
  }
};