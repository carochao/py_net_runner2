export const MARVEL_THEME: any = {
  "intro-print": {
    headerPrefix: "STARK_OS",
    missionPrefix: "BOOT_SEQUENCE",
    intro: "# Suit Diagnostics: print()\n\nWelcome back, Mr. Stark. The Avengers initiative requires your armour to be fully operational. Perform a system check on the Mark LXXXV armour's audio transmitter.",
    task: "Use `print()` to display: `\"JARVIS: Online\"`",
    baseCode: "# TODO: Initialise JARVIS\n",
    solution: "print(\"JARVIS: Online\")",
    solutionRegex: [/print\s*\(\s*['\"]JARVIS: Online['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "STARK_STYLE",
    missionPrefix: "CASE_VALIDATION",
    intro: "# Case Validation: Jarvis Protocols\n\nStark Industries software enforces strict naming protocols. If you try to call JARVIS with commands like `Print()` or declare variables with Capital case, the Stark security firewall will reject the request as a cyber-threat! Keep your commands and custom variables in clean lowercase.",
    task: "Create a lowercase telemetry variable named `arc_reactor` and assign the value `3000` to it. Then, use `print()` to inspect the voltage. Keep everything strictly lowercase!",
    baseCode: "# TODO: Define arc_reactor with 3000 and print it\n",
    solution: "arc_reactor = 3000\nprint(arc_reactor)",
    solutionRegex: [/arc_reactor\s*=\s*3000/, /print\s*\(\s*arc_reactor\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "STARK_SEC",
    missionPrefix: "TECH_NOTE",
    intro: "# Blueprint Security: Comments\n\nNick Fury is sniffing around your design schematics. Use comments to leave notes on your armour's weak spots, keeping them invisible to SHIELD.",
    task: "Write a comment `# Repulsor core safety bypass` and then `print(\"Calibrating...\")`",
    baseCode: "# TODO: Add note to blueprints\n",
    solution: "# Repulsor core safety bypass\nprint(\"Calibrating...\")",
    solutionRegex: [/#.*Repulsor core safety bypass/, /print\s*\(\s*['\"]Calibrating\.\.\.['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "JARVIS_LOG",
    missionPrefix: "LIVE_ANNOTATE",
    intro: "# HUD Diagnostics: Inline Comments\n\nWhen you are flying at Mach 3, JARVIS displays rapid streams of real-time diagnostics. Add quick telemetry notes directly adjacent to your system configuration parameters.",
    task: "Initialise `arc_reactor_percent` to `100`. On the same line, add an inline comment `# Maximum capacity`.",
    baseCode: "# TODO: Initialise arc reactor with inline comment\n",
    solution: "arc_reactor_percent = 100 # Maximum capacity",
    solutionRegex: [/arc_reactor_percent\s*=\s*100/, /#.*Maximum capacity/]
  },
  "intro-vars": {
    headerPrefix: "STARK_HUD",
    missionPrefix: "ARMOUR_SUITE",
    intro: "# Arc Reactor Power: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled energy slot** in Tony Stark's Iron Man HUD! You label the slot (like `reactor_level`), put power cells or nanotech shield values inside, and deploy them automatically as you fight battles.\n\nTo prepare for combat, we must balance your nanotech armour components. Let's use variables to track your reactor power rate and nano-shields.",
    task: "Create `nanotech_shields` set to `64` and `reactor_level` set to `1500`.",
    baseCode: "# TODO: Track suit resources\n",
    solution: "nanotech_shields = 64\nreactor_level = 1500",
    solutionRegex: [/nanotech_shields\s*=\s*64/, /reactor_level\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "FRIDAY_SYS",
    missionPrefix: "SUIT_UPGRADE",
    intro: "# Repulsor Charge: Reassignment\n\nYou've just upgraded your repulsor core. Update your armour energy multiplier variable to reflect the new nanotech power calibration.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "armour_multiplier = 1.0\nprint(armour_multiplier)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\narmour_multiplier = 2.1\nprint(armour_multiplier)  # Output: 2.1",
    task: "Initialise `armour_multiplier` as `1.0`. Then update `armour_multiplier` to `2.1`. Print it.",
    baseCode: "armour_multiplier = 1.0\n# TODO: Upgrade repulsors to 2.1\n",
    solution: "armour_multiplier = 1.0\narmour_multiplier = 2.1\nprint(armour_multiplier)",
    solutionRegex: [/armour_multiplier\s*=\s*1\.0/, /armour_multiplier\s*=\s*2\.1/, /print\s*\(\s*armour_multiplier\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "STARK_OS",
    missionPrefix: "CLEARANCE_KEY",
    intro: "# Echo Request: JARVIS Network Handshake\n\nWait for the Stark Industries satellite network to push an encryption packet! Before the helicarrier's secure clearance key bypasses your wrist display, set up an empty placeholder variable in JARVIS's memory stack to catch the incoming authorization code.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `marvel_data = \"\"` as a placeholder, we allocate space in memory. Then, running `marvel_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the new clearance key dynamically so you can see it change!",
    example: "marvel_data = \"\"  # Memory slot is allocated and empty\nmarvel_data = input(\"Enter clearance key: \")  # Line 2 updates the empty string with your input!\nprint(\"Bypassing firewall: \" + marvel_data)",
    task: "1. Initialize `marvel_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter clearance key: \")` to populate it.\n3. Print `\"Bypassing firewall: \" + marvel_data`.",
    baseCode: "# TODO: Initialize empty key buffer, capture, and print\n",
    hints: [
      "Use marvel_data = \"\" to prepare the node.",
      "Use marvel_data = input(\"Enter clearance key: \") to capture the stream.",
      "Print \"Bypassing firewall: \" combined with the marvel_data variable."
    ],
    solution: "marvel_data = \"\"\nmarvel_data = input(\"Enter clearance key: \")\nprint(\"Bypassing firewall: \" + marvel_data)",
    solutionRegex: [/marvel_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "STARK_SYNC",
    missionPrefix: "SQUAD_BOOT",
    intro: "# Tactical Initialisation: Multi-Assignment\n\nAssembly takes precision. Initialise the combat status of Iron Man and Captain America simultaneously to ensure they hit the drop zone at the exact same millisecond.",
    task: "Assign `iron_man` set to `\"READY\"` and `cap` set to `\"READY\"` in one line.",
    baseCode: "# TODO: Sync heroes\n",
    solution: "iron_man, cap = \"READY\", \"READY\"",
    solutionRegex: [/iron_man\s*,\s*cap\s*=\s*['\"]READY['\"]\s*,\s*['\"]READY['\"]/]
  },
  "data-strings": {
    headerPrefix: "QUINJET_NAV",
    missionPrefix: "MISSION_COORD",
    intro: "# Quinjet Navigation: Strings\n\nDispatching the Quinjet requires registering your target planet's name. Use strings containing your mission destination.",
    task: "Create a variable `destination` set to `\"Asgard\"`. Print it.",
    baseCode: "# TODO: Key in Quinjet target\n",
    solution: "destination = \"Asgard\"\nprint(destination)",
    solutionRegex: [/destination\s*=\s*['\"]Asgard['\"]/]
  },
  "data-booleans": {
    headerPrefix: "AVENGERS_COMMS",
    missionPrefix: "SQUAD_CHECK",
    intro: "# Battle Command: Booleans\n\nFRIDAY is scanning the tactical landscape. Is the repulsor reactor fully powered? Has the squad warning beacon been triggered? Use booleans to direct the Avengers.",
    task: "Set `reactor_powered` to `True` and `warning_active` to `False`.",
    baseCode: "# TODO: Initialise battle logs\n",
    solution: "reactor_powered = True\nwarning_active = False",
    solutionRegex: [/reactor_powered\s*=\s*True/, /warning_active\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "STARK_OS",
    missionPrefix: "POWER_SYNC",
    intro: "# Suit Calibration: Math\n\nYour armour's power distribution needs balancing. Calculate the total energy output by combining the charge levels of your primary and secondary arc reactors.",
    task: "Create `primary_reactor` as `5000` and `secondary_reactor` as `2500`. Store the sum in `total_power` and print it.",
    baseCode: "# TODO: Calculate total suit power\n",
    solution: "primary_reactor = 5000\nsecondary_reactor = 2500\ntotal_power = primary_reactor + secondary_reactor\nprint(total_power)",
    solutionRegex: [/total_power\s*=\s*primary_reactor\s*\+\s*secondary_reactor/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nTony, the Mark 85's core is overloaded. Run a memory dump to calculate the final stability index by applying the dampening multiplier to the combined reactor output.",
    technical: "### Arc Reactor Calibration:\n1. **Core Arithmetic**: Compute the total output and apply the dampening modifier before writing to the stability index.\n2. **Parentheses**: Enclosing operations in `()` ensures they run first, protecting the reactor cores from unexpected power surges.",
    example: "reactor_output = 80\ndampener = -10\nstability_index = (reactor_output + dampener) * 0.8\nprint(stability_index)",
    task: "1. Create `reactor_output` as `80`.\n2. Create `dampener` as `-10`.\n3. Calculate `(reactor_output + dampener) * 0.8` and store in `stability_index`.\n4. Print it.",
    baseCode: "# TODO: Run memory dump and stabilize\n",
    solution: "reactor_output = 80\ndampener = -10\nstability_index = (reactor_output + dampener) * 0.8\nprint(stability_index)",
    solutionRegex: [/stability_index\s*=\s*\(\s*reactor_output\s*\+\s*dampener\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "AVENGERS_ASSETS",
    missionPrefix: "HERO_ROSTER",
    intro: "# Support Team: Lists\n\nKeep a roster of the active Avengers currently on the battlefield to coordinate the strike against Thanos.",
    technical: "### S.H.I.E.L.D. Tactical Roster Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of data entities grouped under a single variable name. Instead of registering each agent or hero on independent files (e.g., `h1 = \"Iron Man\"`, `h2 = \"Thor\"`), lists allow you to organize your entire strike force sequence together.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, forming the containment forcefield around your records.\n- **Comma Separation**: Every deployed hero inside your tactical team must be separated by a comma.\n- **Zero-Based Ranks**: Python lists use zero-based indexing. The highest-ranked leader sits at index `0`, the second hero at `1`, and the third at `2`.",
    example: "# Register multiple operatives in a single list variable\nroster = [\"Hulk\", \"Black Widow\", \"Hawkeye\"]\nprint(roster)  # Transmits the active strike force roster",
    task: "Initialise your `heroes` list with \"Iron Man\", \"Captain America\", and \"Thor\". Print the list to confirm deployment.",
    baseCode: "# TODO: Log active heroes\n",
    solution: "heroes = [\"Iron Man\", \"Captain America\", \"Thor\"]\nprint(heroes)",
    solutionRegex: [/heroes\s*=\s*\[/, /print\s*\(\s*heroes\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "SQUAD_STRIKE",
    missionPrefix: "YOUR TASK",
    intro: "# Strike Coordination: Roster Indices\n\nThanos is attacking Wakanda! Deploy your heavy-hitters directly. Pull the first and third heroes from your active battle-roster.",
    technical: "### Tactical Positions:\n\n```text\nheroes = [\"Iron Man\", \"Captain America\", \"Thor\"]\n#        [0]           [1]                 [2]\n```",
    example: "# Select heroes from our battle-roster using list indices\nheroes = [\"Iron Man\", \"Captain America\", \"Thor\"]\n\n# Isolate first hero (index 0)\np1 = heroes[0]\nprint(p1)  # Output: Iron Man\n\n# Isolate third hero (index 2)\np3 = heroes[2]\nprint(p3)  # Output: Thor",
    task: "1. Assign the first hero (index 0) in `heroes` to `p1`.\n2. Assign the third hero (index 2) in `heroes` to `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "heroes = [\"Iron Man\", \"Captain America\", \"Thor\"]\n# TODO: Deploy heroes from positions 0 and 2\n",
    solution: "p1 = heroes[0]\np3 = heroes[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*heroes\s*\[\s*0\s*\]/, /p3\s*=\s*heroes\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "HERO_RECRUIT",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value avenger hero is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "heroes = [\"Iron Man\",\"Captain America\",\"Thor\"]\nheroes.append(\"Hulk\")\n# heroes is now updated!",
    task: "1. Append \"Hulk\" to the `heroes` list.\n2. Print the final `heroes` list to confirm installation.",
    baseCode: "heroes = [\"Iron Man\",\"Captain America\",\"Thor\"]\n# TODO: Append value and print\n",
    solution: "heroes.append(\"Hulk\")\nprint(heroes)",
    solutionRegex: [/heroes\.\s*append\s*\(\s*['"]Hulk['"]\s*\)/, /print\s*\(\s*heroes\s*\)/]
  },
  "list-pop": {
    headerPrefix: "RAFT_PURGE",
    missionPrefix: "YOUR TASK",
    intro: "# Security Breach: .pop()\n\nS.H.I.E.L.D. security alert at The Raft prison facility! One of the maximum-security prisoners has initiated an escape sequence. Use `.pop()` to extract the last prisoner from the cell block list and track their location.",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = raft_prisoners.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `raft_prisoners` list and store it inside a variable named `escaped_villain`.\n2. Print `escaped_villain` to output the purged token.",
    baseCode: "raft_prisoners = [\"Loki\",\"Ultron\",\"Thanos\"]\n# TODO: Pop last element and print\n",
    solution: "escaped_villain = raft_prisoners.pop()\nprint(escaped_villain)",
    solutionRegex: [/escaped_villain\s*=\s*raft_prisoners\.\s*pop\s*\(\s*\)/, /print\s*\(\s*escaped_villain\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "SANCTUM_MAP",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Stark-Grade Immutable Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of variables, like a list of active drones, but with a critical security difference: **lists are mutable** (Jarvis can modify, append, or clear elements at runtime), whereas **tuples are immutable** (their sequence and contents are permanently welded in memory and cannot be hacked or modified after initialization).\n- **Syntax**: Enclosed with round parentheses `()` instead of standard square brackets `[]`.\n- **Speed & Security**: Because tuples are simpler and read-only, Stark systems process them faster and use them to protect unchangeable records like Sanctum coordinates or Arc Reactor baseline specifications.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `sanctum_coordinates` containing \"New York Sanctum\" and the number `177`.\n2. Print the `sanctum_coordinates` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "sanctum_coordinates = (\"New York Sanctum\", 177)\nprint(sanctum_coordinates)",
    solutionRegex: [/sanctum_coordinates\s*=\s*\(\s*['"]New York Sanctum['"]\s*,\s*177\s*\)/, /print\s*\(\s*sanctum_coordinates\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "GAUNTLET_SPECS",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `avengers_assets` containing the single string \"Quinjet\"\n2. Create a tuple named `infinity_gauntlet_specs` containing the numbers `6` and `0`.\n3. Rewrite `avengers_assets[0]` to be \"Helicarrier\"\n4. Print both `avengers_assets` and `infinity_gauntlet_specs`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "avengers_assets = [\"Quinjet\" ]\ninfinity_gauntlet_specs = (6, 0)\navengers_assets[0] = \"Helicarrier\"\nprint(avengers_assets)\nprint(infinity_gauntlet_specs)",
    solutionRegex: [/avengers_assets\s*\[\s*0\s*\]\s*=\s*['"]Helicarrier['"]/, /infinity_gauntlet_specs\s*=\s*\(\s*6\s*,\s*0\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "DOSSIER_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `shield_dossier` list.\n2. Store this result in a new variable named `strike_team`.\n3. Print the resulting slice `strike_team`.",
    baseCode: "shield_dossier = [\"Widow\",\"Hawkeye\",\"Fury\",\"Hill\",\"Coulson\",\"Carter\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "strike_team = shield_dossier[1:4]\nprint(strike_team)",
    solutionRegex: [/strike_team\s*=\s*shield_dossier\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*strike_team\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "ARC_POWER_SCAN",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `stark_power_nodes`.\n2. Store the result in a variable named `overcharged_nodes`.\n3. Print `overcharged_nodes`.",
    baseCode: "stark_power_nodes = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "overcharged_nodes = [p for p in stark_power_nodes if p > 50]\nprint(overcharged_nodes)",
    solutionRegex: [/overcharged_nodes\s*=\s*\[\s*p\s+for\s+p\s+in\s+stark_power_nodes\s+if\s+p\s*>\s*50\s*\]/, /print\s*\(\s*overcharged_nodes\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "BEACON_SWEEP",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `wakanda_beacons` list using a list comprehension.\n2. Store this filtered list in a new variable named `even_beacons`.\n3. Print `even_beacons`.",
    baseCode: "wakanda_beacons = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "even_beacons = [b for b in wakanda_beacons if b % 2 == 0]\nprint(even_beacons)",
    solutionRegex: [/even_beacons\s*=\s*\[\s*b\s+for\s+b\s+in\s+wakanda_beacons\s+if\s+b\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*even_beacons\s*\)/]
  },
  "intro-input": {
    headerPrefix: "SHIELD_COMM",
    missionPrefix: "YOUR TASK",
    intro: "# Helicarrier Terminal: Security Handshake\n\nTony Stark is setting up a secure satellite link. Prompt the agent on duty to enter the security authorization password before launching.",
    technical: "### Encryption Inputs:\n- Retrieve custom threat matrices or personnel tags securely using `input()`.\n- Converts live user entries directly into tactical mission updates.\n- **Suit Concatenation**: Link diagnostic status strings or Stark armor tags together using the `+` operator (e.g., `\"Iron\" + \"Man\"` becomes `\"IronMan\"`). Python does not add spaces automatically, so allocate padding spacing within your text quotes!",
    example: "hero_alias = input(\"Avengers alias: \")\nprint(\"Authorized: \" + hero_alias)",
    task: "1. Ask the agent for their destination with the prompt: **\"Enter target location: \"** and store it in a variable named `target_location`.\n2. Print **\"Deploying Avengers to: \"** concatenated with the user\'s `target_location` value.",
    baseCode: "# TODO: Capture location and print deployment log\n",
    solution: "target_location = input(\"Enter target location: \")\nprint(\"Deploying Avengers to: \" + target_location)",
    solutionRegex: [/target_location\s*=\s*input\s*\(\s*['\"]Enter target location: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Deploying Avengers to: \s*['\"]\s*\+\s*target_location\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "AVENGERS_FILES",
    missionPrefix: "LOG_GEN",
    intro: "# Helicarrier Reports: Story Generator\n\nTony Stark is standardizing mission incident reports. Prompt the operator on duty to assemble details of recent superhero engagements.",
    technical: "### Assembling Tactical Dossiers:\nGlue superhero names, hostile fortresses, and tactical devices together using basic string concatenation.",
    example: "hero = \"Thor\"\nthreat = \"Frost Giant\"\ndossier = hero + \" defeated \" + threat\nprint(dossier)",
    task: "1. Ask the user for the superhero name with the prompt: **\"Enter hero name: \"** and store it in `hero`.\n2. Ask the user for the Hydra villain with the prompt: **\"Enter villain name: \"** and store it in `villain`.\n3. Ask the user for the tactical tool with the prompt: **\"Enter tactical tool: \"** and store it in `tool`.\n4. Combine into a variable named `mission_report` using the format: `hero + \" bypassed \" + villain + \" with a \" + tool + \"!\"` and print `mission_report`.",
    baseCode: "# TODO: Formulate security files\n",
    solution: "hero = input(\"Enter hero name: \")\nvillain = input(\"Enter villain name: \")\ntool = input(\"Enter tactical tool: \")\nmission_report = hero + \" bypassed \" + villain + \" with a \" + tool + \"!\"\nprint(mission_report)",
    solutionRegex: [/hero\s*=\s*input\s*\(\s*['"]Enter hero name:\s*['"]\s*\)/, /villain\s*=\s*input\s*\(\s*['"]Enter villain name:\s*['"]\s*\)/, /tool\s*=\s*input\s*\(\s*['"]Enter tactical tool:\s*['"]\s*\)/, /mission_report\s*=\s*hero\s*\+\s*['"] bypassed ['"]\s*\+\s*villain\s*\+\s*['"] with a ['"]\s*\+\s*tool\s*\+\s*['"]!['"]/, /print\s*\(\s*mission_report\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "S_H_I_E_L_D_FILES",
    missionPrefix: "ULTRON_SEC",
    intro: "# Helicarrier Override: Ultron Infestation\n\nUltron has breached the global mainframe! Forge a tactical defence report using five encrypted inputs from S.H.I.E.L.D. security centers.",
    technical: "### String Inter-weaving:\nPiece together your variables and hardcoded text blocks sequentially to track the ongoing cyber invasion.",
    example: "breach = agent + \" injected \" + weapon + \" into \" + grid + \" at \" + phase + \". System is \" + alert + \".\"",
    task: "1. Ask the terminal for the agent or hero key with prompt: **\"Enter hero name: \"** and store it in `hero`.\n2. Ask for the tactical weapon with prompt: **\"Enter tactical weapon: \"** and store it in `weapon`.\n3. Ask for the compromised mainframe sector with prompt: **\"Enter master sector: \"** and store it in `sector`.\n4. Ask for the shield threat level with prompt: **\"Enter threat level: \"** and store it in `threat_level`.\n5. Ask for the defensive reactor status with prompt: **\"Enter system status: \"** and store it in `status`.\n6. Combine into a variable named `shield_breach` and print using the exact format: `hero + \" injected \" + weapon + \" into \" + sector + \" at \" + threat_level + \". System is \" + status + \"!\"`.",
    baseCode: "# TODO: Structure Helicarrier override logs\n",
    solution: "hero = input(\"Enter hero name: \")\nweapon = input(\"Enter tactical weapon: \")\nsector = input(\"Enter master sector: \")\nthreat_level = input(\"Enter threat level: \")\nstatus = input(\"Enter system status: \")\nshield_breach = hero + \" injected \" + weapon + \" into \" + sector + \" at \" + threat_level + \". System is \" + status + \"!\"\nprint(shield_breach)",
    solutionRegex: [/hero\s*=\s*input\s*\(\s*['"]Enter hero name:\s*['"]\s*\)/, /weapon\s*=\s*input\s*\(\s*['"]Enter tactical weapon:\s*['"]\s*\)/, /sector\s*=\s*input\s*\(\s*['"]Enter master sector:\s*['"]\s*\)/, /threat_level\s*=\s*input\s*\(\s*['"]Enter threat level:\s*['"]\s*\)/, /status\s*=\s*input\s*\(\s*['"]Enter system status:\s*['"]\s*\)/, /print\s*\(\s*shield_breach\s*\)/]
  },
  "print-formatting": {
    title: "S.H.I.E.L.D. Registry: F-Strings",
    headerPrefix: "SHIELD_SCANNER",
    missionPrefix: "SECURE_IDENT",
    intro: "# S.H.I.E.L.D. Registry: F-Strings\n\nTony Stark's console mainframe requires secure credentials. Use f-strings to dynamically embed operative names and security clearance levels in real time into the Jarvis uplink.",
    technical: "### Dynamic Formatting:\n- **F-Prefix**: Place `f` right before your string quotes (e.g., `f\'...\'`).\n- **Brace Injection**: Inside `{}`, reference variables directly to display their values without manual concatenation.",
    example: "hero = \'Iron Man\'\nprint(f\'Welcome, {hero}\') # Outputs: Welcome, Iron Man",
    task: "### YOUR MISSION\n\nYou have `alias = \'Iron Man\'` and `level = 10`. Use an **f-string** to print: `Hero: Iron Man | Armor Mark: 10`.",
    baseCode: "alias = \'Iron Man\'\nlevel = 10\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Embed {alias} and {level} in the curly braces inside the string."
    ],
    solution: "alias = \'Iron Man\'\nlevel = 10\nprint(f\'Hero: {alias} | Armor Mark: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Hero:\s*\{alias\}\s*\|\s*Armor\s*Mark:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "S.H.I.E.L.D. Deployment: Advanced F-Strings",
    headerPrefix: "JARVIS_UP",
    missionPrefix: "AUTO_DRONE",
    intro: "# Jarvis Uplink: Diagnostic F-Strings\n\nDeploy Stark defence drones to active combat sectors. F-strings allow Jarvis to format tactical vectors, perform fast drone calculations, and transform region names to uppercase in a single execution.",
    technical: "### Dynamic Drone Telemetry:\n- **Inline Calculations**: Evaluate math directly without helper variables: `{drones * 2}`.\n- **Method Formatting**: Transform string inputs to uppercase directly: `{sector.upper()}`.",
    example: "active, backup = 12, 4\nprint(f'Defenders ready: {active + backup}')",
    task: "### YOUR MISSION\n\n1. Prompt for drone count with: **\"Enter drone count: \"** and store it as an integer in `drones`.\n2. Prompt for the target sector with: **\"Enter target sector: \"** and store it in `sector`.\n3. Use an **f-string** to print: `Deploying {drones} drones to {sector.upper()}...`.",
    baseCode: "# TODO: S.H.I.E.L.D. drone controls\n",
    hints: [
      "Ask for drones using int(input(\"Enter drone count: \"))",
      "Ask for sector using input(\"Enter target sector: \")",
      "Use {drones} and {sector.upper()} inside the f-string."
    ],
    solution: "drones = int(input(\"Enter drone count: \"))\nsector = input(\"Enter target sector: \")\nprint(f\"Deploying {drones} drones to {sector.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{drones\}\s*drones\s*to\s*\{sector\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Arc Reactor Calibration: Casting to Int",
    headerPrefix: "STARK_SYS",
    missionPrefix: "REACTOR_REC",
    intro: "# Arc Reactor: Current Balancing\\n\\nTony Stark\\'s defense suit depends on balanced energy grids. Telemetry diagnostics return power outputs as raw text. Recast these levels into standard integers to balance the reactor flow before takeoff.",
    technical: "### Stark Power Conversion:\\n- String inputs are purely logical descriptions. To perform high-yield energy addition, use `int()` to convert strings to actual numerical variables.",
    example: "stark_voltage = int(input(\"Initial load: \"))\nfinal_voltage = stark_voltage + 100",
    task: "### YOUR MISSION\\n\\nCalculate Stark defense thruster loads:\\n1. Prompt for left thruster output with **\\\"Enter left thruster output: \\\"** and store it as an integer in `thruster_level`.\\n2. Prompt for chest output with **\\\"Enter chest unibeam output: \\\"** and store it as an integer in `chest_level`.\\n3. Calculate and print the total combined energy load in your Arc Reactor.",
    baseCode: "# TODO: Intercept and cast Stark battery loads\\n",
    hints: [
      "Ask for thrusters: thruster_level = int(input(\\\"Enter left thruster output: \\\"))",
      "Ask for chest: chest_level = int(input(\\\"Enter chest unibeam output: \\\"))",
      "Sum them and call print() on the result."
    ],
    solution: "thruster_level = int(input(\\\"Enter left thruster output: \\\"))\\nchest_level = int(input(\\\"Enter chest unibeam output: \\\"))\\nprint(thruster_level + chest_level)",
    solutionRegex: [/thruster_level\s*=\s*int\s*\(\s*input/, /chest_level\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Thruster Vectoring: Casting to Float",
    headerPrefix: "STARK_JET",
    missionPrefix: "VECTOR_MULT",
    intro: "# Jarvis Vector Diagnostics: Float Precision\\n\\nIron Man\\'s flight stabilizers require precise fractional thrust values. Convert raw console strings to decimals dynamically to gauge target velocities accurately.",
    technical: "### Stark Vector Float Diagnostics:\\n- **What is a Float?**: While integers represent whole quantities (like `4` rocket engines), a `float` represents fractional quantities (e.g., `1.5` mach, or `102.45` thrust ratio) to secure proper flight mechanics.\\n- **Formatting raw JARVIS logs**: Real-time console `input()` operations capture numeric telemetry as text strings. To use these as real mathematical dimensions, wrap them in `float()`, e.g., `val = float(input())`.\\n- **The Stark Core Collapse Danger**: Trying to run `int()` on a fractional string representation like `\"1.5\"` instantly breaks Python operations with a `ValueError`! Always use `float()` for variable inputs with decimal potential.",
    example: "energy_pct = float(input(\"Enter battery charge pct: \"))\nhours_left = energy_pct * 1.5",
    task: "### YOUR MISSION\\n\\nCalculate Stark flight vectors:\\n1. Prompt for flight thrust with **\\\"Enter flight thrust level: \\\"** and store it as a float in `thrust`.\\n2. Prompt for stabilization coefficient with **\\\"Enter stabilization coefficient: \\\"** and store it as a float in `coeff`.\\n3. Calculate and print the total multiplied thrust value.",
    baseCode: "# TODO: Balance Stark vector math\\n",
    hints: [
      "Ask for thrust: thrust = float(input(\"Enter flight thrust level: \"))",
      "Ask for coeff: coeff = float(input(\"Enter stabilization coefficient: \"))",
      "Multiply thrust and coeff, and print the resulting float."
    ],
    solution: "thrust = float(input(\"Enter flight thrust level: \"))\ncoeff = float(input(\"Enter stabilization coefficient: \"))\nprint(thrust * coeff)",
    solutionRegex: [/thrust\s*=\s*float\s*\(\s*input/, /coeff\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Stark Firewall: Indentation Blocks",
    headerPrefix: "JARVIS_BLOCK",
    missionPrefix: "VIBRANIUM_GRID",
    intro: "# Shield Calibration: Structural Alignment\\n\\nJARVIS protocols require clean spacing. Python relies on precise indentation to define nested logical blocks. Offsets organize Stark Industry firmware layers safely.",
    technical: "### Nanotech Formatting:\\n- Placed colons (`:`) indicate the start of a logical sequence.\\n- Nested instructions **MUST** have 4 spaces of structural margin, or they will fail JARVIS system integrity checks!",
    example: "if True:\\n    print(\\\"Shields active\\\")  # Stark block",
    task: "### YOUR MISSION\\n\\nInitialize the backup mainframe:\\n1. Write an `if True:` conditional block.\\n2. On the next line, indented with 4 spaces, print **\\\"Accessing...\\\"** to confirm Vibranium grid activation.",
    baseCode: "# TODO: Form JARVIS nanotech sequence\\n",
    hints: [
      "Set up if True: at the end of the first line",
      "Add a 4-space indent on the next line",
      "Call print(\\\"Accessing...\\\") under the condition"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Stark Nanotech: Nested Diagnostics",
    headerPrefix: "JARVIS_SYS",
    missionPrefix: "STARK_CORE",
    intro: "# Nanotech Interface: Layered Overdrive\\n\\nPowering Stark backup flight systems requires deep cascading validation logs. Jarvis demands strict visual indentation hierarchy, verifying modular power routing layer-by-layer.",
    technical: "### Hardware Multi-Nesting:\\n- Place your primary conditional check. Underneath inside its block, nest your backup control layer.\\n- Ensure the secondary execution line has **8 spaces** of functional offset.",
    example: "if True:\\n    print(\"Grid Checked\")\\n    if True:\\n        print(\"Core Locked\")  # Level 2 (8 spaces)",
    task: "### YOUR MISSION\\n\\nSiphon supplementary arc reactor power:\\n1. Create a primary system gateway using **`if True:`**.\\n2. Nest an internal safe check utilizing a secondary **`if True:`** with exactly 4 spaces of indentation.\\n3. Deep inside the micro-analytics layer (indented with exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Align nested Stark core directives\\n",
    hints: [
      "First line: if True:",
      "Second line: Indent with 4 spaces and write: if True:",
      "Third line: Indent with 8 spaces and write: print(\"CORE ACCESS GRANTED\")"
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "JARVIS_SCAN",
    missionPrefix: "THREAT_EVAL",
    intro: "# Threat Detection: If Statements\n\nJarvis is scanning the perimeter for Hydra activity. Use an if statement to trigger the alert system if a threat is identified.",
    task: "If `threat_detected` is `True`, print `\"AVENGERS ASSEMBLE\"`.",
    baseCode: "threat_detected = True\n# TODO: Scan for threats\n",
    solution: "threat_detected = True\nif threat_detected:\n    print(\"AVENGERS ASSEMBLE\")",
    solutionRegex: [/if\s+threat_detected/, /print\s*\(\s*['\"]AVENGERS ASSEMBLE['\"]\s*\)/]
  },
  "control-else": {
    title: "The Jarvis Override: Else Protocol",
    headerPrefix: "STARK_HUD",
    missionPrefix: "REACTOR_ELSE",
    intro: "# Diverted Power: If/Else Control\\n\\nWhen the Arc Reactor diagnostic verifies core containment, Jarvis is instructed to route secondary energy grids. If containment fails, you must immediately sound emergency alert alarms in Stark Tower. Use `else` to handle the failure route.",
    technical: "### Stark Shield Failures:\\n- Place your primary shield conditional. Place `else:` at the original alignment column (0 indent) to specify the alternative diagnostic response.",
    example: "if core_stable:\\n    print(\\\"System stable\\\")\\nelse:\\n    print(\\\"Alert Jarvis\\\")",
    task: "### YOUR MISSION\\n\\nEvaluate Stark system keys:\\n1. Code an `if/else` selection using `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Implement Stark safety check\\n",
    hints: [
      "Write if key_valid: on line 1.",
      "Indent 4 spaces and write print(\\\"ACCESS GRANTED\\\").",
      "On line 3, write else: at the base level.",
      "Indent 4 spaces on line 4 and write print(\\\"ALARM TRIGGERED\\\")."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Stark Authorization: Elif Protocols",
    headerPrefix: "STARK_ACCESS",
    missionPrefix: "CORE_TIERS",
    intro: "# Suit Diagnostics: Tiered Clearance Levels\\n\\nJarvis protocols establish multiple clearance profiles for Stark technology. Use `elif` chains to route guest users, lab technicians, and Avengers status to their correct UI streams.",
    technical: "### Nanotech Route Stacking:\\n- Ensure each `elif` is aligned at column 0 along with the main `if` and `else` blocks.\\n- Only the matching logical branch resolves its instructions; subsequent checks are ignored.",
    example: "if user == \"Tony\":\\n    print(\"Welcome Sir\")\\nelif user == \"Bruce\":\\n    print(\"Welcome Dr. Banner\")\\nelse:\\n    print(\"Unidentified user\")",
    task: "### YOUR MISSION\\n\\nRoute active credentials for Stark armour modules:\\n1. Construct an `if/elif/else` check around `clearance`.\\n2. If `clearance` is exactly `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Otherwise, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Route armour subsystem access level\\n",
    hints: [
      "Begin with if clearance == 1:",
      "Use elif clearance <= 5: for the middle tier",
      "Finish with else: to lock out guest protocols"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Jarvis Cloak: Alibi Generator",
    headerPrefix: "STARK_ALIBI",
    missionPrefix: "SPY_REACTION",
    intro: "# S.H.I.E.L.D. Inquest: Stark Tech Concealment\n\nNick Fury is asking questions about an unauthorized flight of the Mark 85 armour. If active sensors detected the armour signature outside the secure Stark hangar, program Jarvis to print a standard security dismissal. Otherwise, stabilise atmospheric glide.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"DEPLOY_REFACTOR_FLARES\")\nelse:\n    print(\"Stark armour cooling.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` security dispatch:\n1. If `is_detected`, print **`\"DEPLOY_REFACTOR_FLARES\"`** to deflect S.H.I.E.L.D. auditors.\n2. Else, print **`\"Stark armour cooling.\"`** and recharge the armour batteries.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"DEPLOY_REFACTOR_FLARES\".",
      "Add else: at the base level and print \"Stark armour cooling.\""
    ],
    solution: "if is_detected:\n    print(\"DEPLOY_REFACTOR_FLARES\")\nelse:\n    print(\"Stark armour cooling.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]DEPLOY_REFACTOR_FLARES['"]\s*\)/, /print\s*\(\s*['"]Stark\s+armour\s+cooling\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Arsenal Upgrade: Plating Grade",
    headerPrefix: "STARK_CORE",
    missionPrefix: "UPGRADE_LEVEL",
    intro: "# Stark Tech: Arc Reactor Power Suit Rating\n\nCalibrate the armour structural plating status based on current active Arc Reactor energy output. Iron Man suits outputting massive power triggers Vibranium shell reinforcement.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to evaluate Arc Reactor energy output metrics.\n- **Assignment**: Set the suit's `armor_status` string internally inside the logical branches.",
    example: "if power > 9000:\n    armor_status = \"Vibranium\"\nelse:\n    armor_status = \"Titanium\"",
    task: "### YOUR MISSION\n\nCheck Stark armour capability settings:\n1. If output performance `arc_reactor_output > 9000`, set `armor_status` to **`\"Vibranium\"`**.\n2. Else, set `armor_status` to **`\"Titanium\"`**.\n3. Finally, print the configured plating status with `print(armor_status)`.",
    baseCode: "arc_reactor_output = 9001\narmor_status = \"\"\n# TODO: Set armour structural status and print it\n",
    hints: [
      "Define armor_status inside the logical branches.",
      "Finally, print(armor_status) as the last line unindented."
    ],
    solution: "arc_reactor_output = 9001\nif arc_reactor_output > 9000:\n    armor_status = \"Vibranium\"\nelse:\n    armor_status = \"Titanium\"\nprint(armor_status)",
    solutionRegex: [/if\s+arc_reactor_output\s*>\s*9000\s*:/, /armor_status\s*=\s*['"]Vibranium['"]/, /armor_status\s*=\s*['"]Titanium['"]/, /print\s*\(\s*armor_status\s*\)/]
  },
  "control-adventure": {
    title: "Stark Security: Database Access",
    headerPrefix: "STARK_NET",
    missionPrefix: "SYSTEM_HANDSHAKE",
    intro: "# Stark Network Central: Subgrid Choices\n\nYou have broken through the primary firewall shield of Stark Industries. Ahead are two database subgrids: \"1\" (Nano-Tech Lab Database) or \"2\" (Secondary Maintenance Port).",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Initialising Core Uplink...\")",
    task: "### YOUR MISSION\n\nEstablish diagnostic access:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Pick Stark server zone\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Jarvis Signal: Avenger Deployment",
    headerPrefix: "JARVIS_SYS",
    missionPrefix: "HERO_DEPLOY",
    intro: "# Stark Center: Threat Distribution\n\nJarvis must deploy Stark security units based on incoming tactical alert indicators: \"thor\", \"stark\", or \"widow\" to optimise shields.",
    technical: "### Cascading Checks:\n- **Sequential**: Checks high-threat levels across global defence zones.\n- **Exclusive**: Only the matched tactical branch deploys its designated unit, conserving reactor grids.\n- **Exhaustive**: An `else` deploys Shield cleanup crews for lower grade hazards.",
    example: "if beacon == \"thor\":\n    print(\"Bifrost alignment.\")\nelif beacon == \"stark\":\n    print(\"Repulsors firing.\")",
    task: "### YOUR MISSION\n\nProgram active defence alerts based on variable `beacon`:\n1. If `beacon` is **`\"thor\"`**, print **`\"Bifrost alignment.\"`**\n2. Elif `beacon` is **`\"stark\"`**, print **`\"Repulsors firing.\"`**\n3. Elif `beacon` is **`\"widow\"`**, print **`\"Infiltration sneaky.\"`**\n4. Else, print **`\"Shield cleanup.\"`**",
    baseCode: "beacon = \"stark\"\n# TODO: Route Jarvis signal paths\n",
    hints: [
      "Direct Jarvis with dynamic beacon comparisons.",
      "Ensure strings are matched precisely."
    ],
    solution: "if beacon == \"thor\":\n    print(\"Bifrost alignment.\")\nelif beacon == \"stark\":\n    print(\"Repulsors firing.\")\nelif beacon == \"widow\":\n    print(\"Infiltration sneaky.\")\nelse:\n    print(\"Shield cleanup.\")",
    solutionRegex: [/if\s+beacon\s*==\s*['"]thor['"]\s*:/, /elif\s+beacon\s*==\s*['"]stark['"]\s*:/, /elif\s+beacon\s*==\s*['"]widow['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Bifrost\s+alignment\.['"]\s*\)/, /print\s*\(\s*['"]Repulsors\s+firing\.['"]\s*\)/, /print\s*\(\s*['"]Infiltration\s+sneaky\.['"]\s*\)/, /print\s*\(\s*['"]Shield\s+cleanup\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Iron Man Armour: Grid Sweeper",
    headerPrefix: "FRIDAY_CORE",
    missionPrefix: "SUIT_SWEEP",
    intro: "# Suit Integrity: Guard Patrols\n\nTony Stark's armoured systems require continuous component verification. Instruct Friday to loop sequentially and run microchecks across structural armour zones.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### Range Sequences:\n- **range(5)**: Automates the diagnostic scan exactly 5 times (0 to 4 inclusive).\n- **Repetitive Loops**: Friday uses these loop matrices to trace repulsor grids rapidly.",
    example: "for i in range(3):\n    print(f\"Thruster {i+1} stable\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Thruster {i+1} stable\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write helmet grid checks\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Thruster {i+1} stable"
    ],
    solution: "for i in range(5):\n    print(f\"Thruster {i+1} stable\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Stark Sensor: Code Tracer",
    headerPrefix: "STARK_FREQ",
    missionPrefix: "WAVE_WALK",
    intro: "# Frequency Scans: Extremis Decoding\n\nStark Industries satellite relays pick up high-frequency signals from Hydra camps. Scan the stream character by character to trace coordinate signals.",
    technical: "### String Scanning:\n- **Iterative Check**: Friday walks the stream line to capture individual beacon nodes.\n- **Termination**: Concludes automatically when the telemetry line ends.",
    example: "for node in \"IRON\":\n    print(node)",
    task: "### YOUR MISSION\n\nYou've decrypted a Stark `beacon` frequency segment: `\"IRON\"`. Use a `for` loop to iterate through every character `node` in the variable `beacon` and `print` it.",
    baseCode: "beacon = \"IRON\"\n# TODO: Loop through Stark signals\n",
    hints: [
      "For loop syntax: 'for node in beacon:'.",
      "Print each character element inside the indented block."
    ],
    solution: "beacon = \"IRON\"\nfor node in beacon:\n    print(node)",
    solutionRegex: [/for\s+node\s+in\s+beacon/, /print\s*\(\s*node\s*\)/]
  },
  "loop-list-audit": {
    title: "Friday Diagnostics: Node Audit",
    headerPrefix: "FRIDAY_INTEGRITY",
    missionPrefix: "LOG_FILT",
    intro: "# Friday Defence: Nano Security\n\nTony Stark's nano-bots have spotted corrupted segments inside the helmet HUD telemetry. Isolate the armour systems ending with `.stk` to authorise diagnostics.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"repulsor.stk\"`, then `\"unibeam.log\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".stk\")` asks: *\"Does the text inside `f` end with `.stk`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".stk\"):\n          # This runs ONLY if the current file ends with .stk!\n  ```",
    example: "modules = [\"core_temp.txt\", \"ibeam.stk\"]\nfor m in modules:\n    if \".stk\" in m:\n        print(m)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".stk\"`, `print` Friday's telemetry report: `f\"Stark system active: {f}\"`.",
    baseCode: "discovered_files = [\"repulsor.stk\", \"unibeam.log\", \"arc_reactor.stk\", \"flight_vectors.tmp\"]\n# TODO: Scan Stark modules\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".stk\"):",
      "Print f'Stark system active: {f}'"
    ],
    solution: "discovered_files = [\"repulsor.stk\", \"unibeam.log\", \"arc_reactor.stk\", \"flight_vectors.tmp\"]\nfor f in discovered_files:\n    if f.endswith(\".stk\"):\n        print(f\"Stark system active: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.stk['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "HUD Grid: Target Sector Mapping",
    headerPrefix: "STARK_HUD",
    missionPrefix: "TARGET_MAP",
    intro: "# Target Tracking: Stark Radar Sweeps\n\nTony Stark's HUD divides sky coordinates into a holographic 3x3 array. To calibrate target locks, lock onto vertical lanes (X) and elevation points (Y).",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 HUD grid scan with variable `x` (outer loop representing Rows/Lanes) and variable `y` (inner loop representing Columns/Altitude) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Lane 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Altitude 0) -> Output: `Radar - Row: 0, Col: 0`\n     - `y = 1` (Altitude 1) -> Output: `Radar - Row: 0, Col: 1`\n     - `y = 2` (Altitude 2) -> Output: `Radar - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Lane 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Altitude 0) -> Output: `Radar - Row: 1, Col: 0`\n     - `y = 1` (Altitude 1) -> Output: `Radar - Row: 1, Col: 1`\n     - `y = 2` (Altitude 2) -> Output: `Radar - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Lane 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Altitude 0) -> Output: `Radar - Row: 2, Col: 0`\n     - `y = 1` (Altitude 1) -> Output: `Radar - Row: 2, Col: 1`\n     - `y = 2` (Altitude 2) -> Output: `Radar - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Sector {r}-{c}\")",
    task: "### YOUR MISSION\n\nCalibrate a **3x3 radar lock**. Run nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the lock values in this exact format: `f\"Radar - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Sweep Stark radar zones\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Radar - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Radar - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Friday Override: Diagnostics Interrupt",
    headerPrefix: "MARK_ARMOR",
    missionPrefix: "DIAG_KILL",
    intro: "# Repulsor Systems: Manual Power Venting\n\nIf the arc reactor detects excessive feedback spikes during armour cycles, Friday initiates a safety discharge. Python makes it easy to cease processing instantly via `break`.",
    technical: "### System Lock:\n- **Immediate Halt**: Ceasing loop instructions instantly saves reactor coils.\n- **Diagnostic Gateways**: Wrap active checks into target logical conditions.",
    example: "for heat in range(10):\n    if heat == 5:\n        break\n    print(heat)",
    task: "### YOUR MISSION\n\nLoop diagnostic calibrations over `range(10)`. If Friday's system warning core level `i` registers exactly `7`, `break` the diagnostics to prevent a overload shutdown. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Check diagnostics cycles with safety break\n",
    hints: [
      "Write 'for i in range(10):'",
      "Add safety limits with 'if i == 7:'",
      "Insert exit instruction 'break', then call print(i)"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Arc Stabilizer: Thermal Decay",
    headerPrefix: "ARC_MONITOR",
    missionPrefix: "THERMAL_DECAY",
    intro: "# Energy Cycles: While Loops\n\nWhile `for` loops iterate over a specific sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor the Arc Reactor's battery cells as they power down during armor diagnostic cycles.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power the repulsors.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "AVENGERS_TECH",
    missionPrefix: "JARVIS_CALIBRATE",
    intro: "# Stark Arsenal: Functions\n\nDon't manually calibrate every repulsor beam! Create a reusable Jarvis function to configure the energy discharge level of any armour suit.",
    task: "Write a function `deploy_armor(armor_id)` that prints `f'Deploying armor model {armor_id}...'`. Call it.",
    baseCode: "# TODO: Package armour control\n",
    solution: "def deploy_armor(armor_id):\n    print(f'Deploying armor model {armor_id}...')\n\ndeploy_armor('Mark 85')",
    solutionRegex: [/def\s+deploy_armor/, /deploy_armor\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "STARK_LINK",
    missionPrefix: "NANO_UPGRADE",
    intro: "# Nanotech Replication: Recursion\n\nTo assemble the Mark LXXXV armour, the nanobots must recursively duplicate themselves, constructing the framework layer by layer until the suit is complete.",
    task: "Write a recursive function `assemble_nano(layers)` that prints the layers and calls itself with `layers-1` until it reaches `0`.",
    baseCode: "# TODO: Replicate nanotech armour\n",
    solution: "def assemble_nano(layers):\n    print(layers)\n    if layers > 0:\n        assemble_nano(layers - 1)\n\nassemble_nano(5)",
    solutionRegex: [/def\s+assemble_nano/, /assemble_nano\s*\(\s*layers\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "STARK_FAB",
    missionPrefix: "ARMOUR_TEMPLATE",
    intro: "# Armour Blueprints: Classes\n\nTony, we need a unified structural blueprint for all your tactical armours. Instead of coding every newly manufactured suit from scratch, define a generic class template so we can stamp out new armours on demand.",
    task: "### YOUR MISSION\n\nDefine a base class named `StarkSuit`. Use `pass` inside its body under proper block indentation.",
    baseCode: "# TODO: Establish base class StarkSuit\n",
    hints: [
      "Use 'class StarkSuit:' followed by an indented 'pass'.",
      "Check your spelling carefully!"
    ],
    solution: "class StarkSuit:\n    pass",
    solutionRegex: [/class\s+StarkSuit/, /pass/]
  },
  "oop-init": {
    headerPrefix: "ARMOUR_BOOT",
    missionPrefix: "MODEL_SPEC",
    intro: "# Initialising Armour: Constructors\n\nEvery time a new suit rolls off the assembly line, JARVIS needs to know its exact model number. We will use the constructor method `__init__` to automatically assign designations upon boot.",
    task: "### YOUR MISSION\n\nIn `StarkSuit`, define the constructor `__init__` which accepts `self` and a parameter `model`. Assign the value of `model` to `self.model`.",
    baseCode: "class StarkSuit:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Use 'def __init__(self, model):' as the constructor name.",
      "Assign it inside the body: self.model = model"
    ],
    solution: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*model\s*\)\s*:/, /self\.model\s*=\s*model/]
  },
  "oop-methods": {
    headerPrefix: "ARMOUR_CALIBRATE",
    missionPrefix: "WEAPON_TEST",
    intro: "# Custom Armour Commands: Methods\n\nA beautiful chassis is useless without teeth. Let's write a method `fire_repulsors` directly inside the class to let any suit activate its thrusters and blast repulsor charges.",
    task: "### YOUR MISSION\n\nAdd a `fire_repulsors` method to `StarkSuit` that `print`s \"Repulsors active\".",
    baseCode: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n    # TODO: Define fire_repulsors method\n",
    hints: [
      "Write 'def fire_repulsors(self):' and indent it inside the class block.",
      "Print 'Repulsors active' inside the function logic."
    ],
    solution: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n    def fire_repulsors(self):\n        print(\"Repulsors active\")",
    solutionRegex: [/def\s+fire_repulsors\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Repulsors active['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "STARK_OS_COM",
    missionPrefix: "STATUS_CHECK",
    intro: "# Isolated Armour Slabs: Independent Object State\n\nIf we send the Hulkbuster into battle, we don't want your private flight suit to suddenly fire its missiles too. Each suit instance must track its own power system and state independently.",
    task: "### YOUR MISSION\n\n1. Add a `flight_state` variable in `__init__` defaulted to the string \"Standby\".\n2. Create a method `engage_thrusters` that updates `self.flight_state` to \"Active\".",
    baseCode: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n        # TODO: Add flight_state default\n    # TODO: Add engage_thrusters method\n",
    hints: [
      "Add 'self.flight_state = \"Standby\"' inside __init__.",
      "In engage_thrusters, run 'self.flight_state = \"Active\"'."
    ],
    solution: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n        self.flight_state = \"Standby\"\n    def engage_thrusters(self):\n        self.flight_state = \"Active\"",
    solutionRegex: [/self\.flight_state\s*=\s*['"]Standby['"]/, /def\s+engage_thrusters/, /self\.flight_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "FRIDAY_SAT",
    missionPrefix: "SQUAD_COMMS",
    intro: "# Combat Interlinks: Object Interaction\n\nStark suits never fly blind. To coordinate coordinated repulsor barrages, one suit must be able to scan and ping other distinct suits flying in the same airspace structure.",
    task: "### YOUR MISSION\n\nAdd a `scan_suit` method to `StarkSuit` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Targeting: {other.model}\"`.",
    baseCode: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n    # TODO: Add scan_suit method\n",
    hints: [
      "The scan_suit(self, other) signature takes 'other' as its second parameter.",
      "Access other's model using other.model inside an f-string."
    ],
    solution: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n    def scan_suit(self, other):\n        print(f\"Targeting: {other.model}\")",
    solutionRegex: [/def\s+scan_suit\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.model/]
  },
  "oop-inheritance": {
    headerPrefix: "STARK_UPGRADE",
    missionPrefix: "CLASS_EXPAND",
    intro: "# Specialized Armour Chassis: Inheritance\n\nInheritance allows you to build specialized armour classes based on your base model. Let's subclass `StarkSuit` to build a specialized `StealthArmor` framework with stealth concealment engines.",
    task: "### YOUR MISSION\n\nCreate a class `StealthArmor` that inherits from `StarkSuit`. Give it an `activate_cloak` method that `print`s \"Stealth system active\".",
    baseCode: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n# TODO: Create StealthArmor subclass inheriting from StarkSuit\n",
    hints: [
      "Use 'class StealthArmor(StarkSuit):' to set up inheritance.",
      "Inside, define the activate_cloak method."
    ],
    solution: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n\nclass StealthArmor(StarkSuit):\n    def activate_cloak(self):\n        print(\"Stealth system active\")",
    solutionRegex: [/class\s+StealthArmor\s*\(\s*StarkSuit\s*\)\s*:/, /def\s+activate_cloak/, /print\s*\(\s*['"]Stealth system active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "STARK_HUD_STR",
    missionPrefix: "HUD_READOUT",
    intro: "# HUD Interfaces: Custom String Representation\n\nIf we print an active suit instance directly, Python returns a messy memory coordinate. Let's override `__str__` to output a pristine, tactical combat diagnostic readout for Tony's HUD.",
    task: "### YOUR MISSION\n\nIn `StarkSuit`, add standard method `__str__` that returns: `f\"Stark Suit Model {self.model}\"`.",
    baseCode: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n    # TODO: Add __str__ method\n",
    hints: [
      "Define standard __str__(self) method in StarkSuit.",
      "Use 'return' instead of printing inside __str__."
    ],
    solution: "class StarkSuit:\n    def __init__(self, model):\n        self.model = model\n    def __str__(self):\n        return f\"Stark Suit Model {self.model}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Stark Suit.*self\.model.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "STARK_FACTORY",
    missionPrefix: "GLOBAL_PROTOCOL",
    intro: "# Universal Variables: Shared Class Variables\n\nSome standards apply to *every single suit* regardless of its weapon configurations — like who designed them. We use Class Variables to share variables globally among all instances without allocating extra heap memory.",
    task: "### YOUR MISSION\n\n1. Define a class variable `creator` set to \"Tony Stark\" in `StarkSuit`. \n2. `print` the class variable using `StarkSuit.creator`.",
    baseCode: "class StarkSuit:\n    # TODO: Define class variable 'creator'\n    pass\n# TODO: Print StarkSuit.creator\n",
    hints: [
      "Declare creator = \"Tony Stark\" right below 'class StarkSuit:' before other code.",
      "Access it directly with StarkSuit.creator."
    ],
    solution: "class StarkSuit:\n    creator = \"Tony Stark\"\n\nprint(StarkSuit.creator)",
    solutionRegex: [/creator\s*=\s*['"]Tony Stark['"]/, /print\s*\(\s*StarkSuit\.creator\s*\)/]
  }
};