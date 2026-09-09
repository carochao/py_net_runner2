export const GAMING_THEME: any = {
  "intro-print": {
    headerPrefix: "NEURAL_SOCKET",
    missionPrefix: "UPLINK_ESTABLISHED",
    intro: "# Initialising ICE Breaker: print()\n\nWake up, Samurai. We've got a city to burn. First, check your neural link status by broadcasting a heartbeat signal to the net.",
    task: "Use `print()` to display: `\"Neural Link: ACTIVE\"`",
    baseCode: "# TODO: Check neural link\n",
    solution: "print(\"Neural Link: ACTIVE\")",
    solutionRegex: [/print\s*\(\s*['\"]Neural Link: ACTIVE['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "GAME_MASTER_DECK",
    missionPrefix: "LOWERCASE_KEYS",
    intro: "# Game Master Rules: Lowercase Keys\n\nCheats and game commands are highly case-sensitive inside the terminal sandbox. Typing capital keys or writing commands like `Print()` will fail to execute your hack, leaving your party defenseless against level 99 monsters! Use standard lowercase.",
    task: "Create a lowercase inventory item variable named `mana_potions` and assign its count to `99`. Print this count using `print()` to confirm your supplies. Everything must be lowercase!",
    baseCode: "# TODO: Store mana_potions variable and print it\n",
    solution: "mana_potions = 99\nprint(mana_potions)",
    solutionRegex: [/mana_potions\s*=\s*99/, /print\s*\(\s*mana_potions\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "ENCRYPTED_LOG",
    missionPrefix: "GHOST_TAG",
    intro: "# Shadow Documentation: Comments\n\nThe Corporates are watching. Use comments to leave messages for your chooms in the afterlife, ensuring they know how to find your stash.",
    task: "Write a comment `# Arasaka security flaw` and then `print(\"Breaching...\")`",
    baseCode: "# TODO: Tag the network\n",
    solution: "# Arasaka security flaw\nprint(\"Breaching...\")",
    solutionRegex: [/#.*Arasaka security flaw/, /print\s*\(\s*['\"]Breaching\.\.\.['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "CHEAT_HUD",
    missionPrefix: "RAM_POKE",
    intro: "# Memory Offsets: Inline Comments\n\nWhen editing game files for cheats or custom configurations, you must tag memory parameters on the fly so you don't corrupt the client.",
    task: "Initialise `cheat_code` to `42`. On the same line, add an inline comment `# Infinite health`.",
    baseCode: "# TODO: Map cheat variable with inline comment\n",
    solution: "cheat_code = 42 # Infinite health",
    solutionRegex: [/cheat_code\s*=\s*42/, /#.*Infinite health/]
  },
  "intro-vars": {
    headerPrefix: "CHROME_UPGRADE",
    missionPrefix: "DATA_SHARD",
    intro: "# Augmentation Stats: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled inventory slot** in your character's backpack! You give the slot a name (like `ram_gb`), put potions, stats, or gold coins inside, and use them to power up your levels.\n\nYour cyberware needs constant monitoring. Let's use variables to track your RAM capacity and Eddies in your digital wallet.",
    task: "Create `ram_gb` set to `64` and `eddies` set to `1500`.",
    baseCode: "# TODO: Sync cyberware stats\n",
    solution: "ram_gb = 64\neddies = 1500",
    solutionRegex: [/ram_gb\s*=\s*64/, /eddies\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "NETRUNNER_RIG",
    missionPrefix: "RAM_ALLOC",
    intro: "# Resource Management: Reassignment\n\nYou've just installed a new Sandevistan. Update your `hardware_profile` variable to reflect the new implant.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "os_version = 1.0\nprint(os_version)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\nos_version = 2.1\nprint(os_version)  # Output: 2.1",
    task: "Initialise `os_version` as `1.0`. Then update `os_version` to `2.1`. Print it.",
    baseCode: "os_version = 1.0\n# TODO: Upgrade to 2.1\n",
    solution: "os_version = 1.0\nos_version = 2.1\nprint(os_version)",
    solutionRegex: [/os_version\s*=\s*1\.0/, /os_version\s*=\s*2\.1/, /print\s*\(\s*os_version\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "LOBBY_STREAM",
    missionPrefix: "HERO_CATCH",
    intro: "# Echo Request: RPG Lobby Handshake\n\nWait for the multiplayer guild lobby to push a player matchmaking request! Before the joining player's hero guild tag bypasses your terminal, set up an empty placeholder variable in your guild manager's memory stack to catch their profile name.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `gaming_data = \"\"` as a placeholder, we allocate space in memory. Then, running `gaming_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the matchmaking hero name dynamically so you can see it change!",
    example: "gaming_data = \"\"  # Memory slot is allocated and empty\ngaming_data = input(\"Enter matchmaking hero: \")  # Line 2 updates the empty string with your input!\nprint(\"Matched with: \" + gaming_data)",
    task: "1. Initialize `gaming_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter matchmaking hero: \")` to populate it.\n3. Print `\"Matched with: \" + gaming_data`.",
    baseCode: "# TODO: Initialize empty hero buffer, capture, and print\n",
    hints: [
      "Use gaming_data = \"\" to prepare the lobby seat.",
      "Use gaming_data = input(\"Enter matchmaking hero: \") to capture the player.",
      "Print \"Matched with: \" combined with the gaming_data variable."
    ],
    solution: "gaming_data = \"\"\ngaming_data = input(\"Enter matchmaking hero: \")\nprint(\"Matched with: \" + gaming_data)",
    solutionRegex: [/gaming_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "SAVE_STATE",
    missionPrefix: "XP_SYNC",
    intro: "# Player Progress: Multi-Assignment\n\nYou've just defeated a mini-boss! Update your total XP and gold reserves in a single atomic operation to ensure your save file remains consistent.",
    task: "Assign `xp` set to `5000` and `gold` set to `1200` in one line.",
    baseCode: "# TODO: Sync loot\n",
    solution: "xp, gold = 5000, 1200",
    solutionRegex: [/xp\s*,\s*gold\s*=\s*5000\s*,\s*1200/]
  },
  "data-strings": {
    headerPrefix: "BRAINDANCE_DECODER",
    missionPrefix: "DATA_STRIP",
    intro: "# Braindance Analysis: Strings\n\nDecoding a braindance requires processing raw text streams. Extract the location metadata from the recorded data.",
    task: "Create a variable `location` set to `\"Night City\"`. Print it.",
    baseCode: "# TODO: Extract BD location\n",
    solution: "location = \"Night City\"\nprint(location)",
    solutionRegex: [/location\s*=\s*['\"]Night City['\"]/]
  },
  "data-booleans": {
    headerPrefix: "DECK_STATUS",
    missionPrefix: "ICE_CHECK",
    intro: "# Netrunner Logic: Booleans\n\nIs your neural link synchronized? Has the corporate ICE detected your presence? Use booleans to monitor your security while diving into the data stream.",
    task: "Set `neural_link_synced` to `True` and `ice_warning_active` to `False`.",
    baseCode: "# TODO: Initialise netrunning protocols\n",
    solution: "neural_link_synced = True\nice_warning_active = False",
    solutionRegex: [/neural_link_synced\s*=\s*True/, /ice_warning_active\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "DUNGEON_DATA",
    missionPrefix: "LOOT_VALUATION",
    intro: "# Inventory Management: Math\n\nYou've just cleared out a treasure room! Add the value of the gold pile to the gem chest to find the total profit from this raid before returning to town.",
    task: "Create `gold_gold` as `2500` and `gem_value` as `1500`. Store the sum in `total_loot` and print it.",
    baseCode: "# TODO: Calculate raid profit\n",
    solution: "gold_gold = 2500\ngem_value = 1500\ntotal_loot = gold_gold + gem_value\nprint(total_loot)",
    solutionRegex: [/total_loot\s*=\s*gold_gold\s*\+\s*gem_value/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe game engine hit a segmentation fault. Execute a memory dump to calculate final damage taken by combining attack power and defence buffs.",
    technical: "### Engine Math Resolution:\n1. **Combat Formulas**: Integrate defence shields with raw monster impact scores prior to evaluating critical damage multipliers.\n2. **Parentheses**: Placing parameters within brackets `()` makes the engine perform aggregate subtraction before initiating float multiplications.",
    example: "attack_power = 80\ndefence_buff = -10\nfinal_damage = (attack_power + defence_buff) * 0.8\nprint(final_damage)",
    task: "1. Set `attack_power` to `80`.\n2. Set `defence_buff` to `-10`.\n3. Calculate `(attack_power + defence_buff) * 0.8` and store in `final_damage`.\n4. Print `final_damage`.",
    baseCode: "# TODO: Calculate combat metrics\n",
    solution: "attack_power = 80\ndefence_buff = -10\nfinal_damage = (attack_power + defence_buff) * 0.8\nprint(final_damage)",
    solutionRegex: [/final_damage\s*=\s*\(\s*attack_power\s*\+\s*defence_buff\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "BAG_INVENTORY",
    missionPrefix: "PLAYER_BAG",
    intro: "# Inventory Setup: Lists\n\nYou're embarking on an epic RPG quest. Create a standard inventory list to store your starting high-tier weaponry for the adventure.",
    technical: "### Player Inventory Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of values stored in a single container. Instead of tracking each item in its own slot (e.g., `slot1 = \"Sword\"`, `slot2 = \"Potion\"`), a list lets you group multiple weapons or items together under a single inventory name.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, which act as the inventory bag's borders.\n- **Comma Separation**: Every item stored inside your inventory must be separated by a comma.\n- **Zero-Based Hotkeys**: Python lists use zero-based indexing. The first slot of your inventory is accessed at index `0`, the second slot at `1`, and the third slot at `2`.",
    example: "# Store multiple weapons in a single list variable\nweapons = [\"Buster Sword\", \"Fire Staff\", \"Iron Shield\"]\nprint(weapons)  # Prints the entire equipment list",
    task: "Initialise your `inventory` list with \"Master Sword\", \"Health Potion\", and \"Hylian Shield\". Print the list to confirm preparations.",
    baseCode: "# TODO: Log inventory list\n",
    solution: "inventory = [\"Master Sword\", \"Health Potion\", \"Hylian Shield\"]\nprint(inventory)",
    solutionRegex: [/inventory\s*=\s*\[/, /print\s*\(\s*inventory\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "BAG_QUERY",
    missionPrefix: "YOUR TASK",
    intro: "# Quick Select: Inventory Indices\n\nIn the heat of combat, you don't rifle through your entire bag! Map hotkeys to specific slots in your inventory list for prompt weapon retrieval.",
    technical: "### Inventory Slots:\n\n```text\ninventory = [\"Master Sword\", \"Health Potion\", \"Hylian Shield\"]\n#            [0]               [1]               [2]\n```",
    example: "# Grab items from game inventory using slot indices\ninventory = [\"Master Sword\", \"Health Potion\", \"Hylian Shield\"]\n\n# Select first slot asset (index 0)\np1 = inventory[0]\nprint(p1)  # Output: Master Sword\n\n# Select third slot asset (index 2)\np3 = inventory[2]\nprint(p3)  # Output: Hylian Shield",
    task: "1. Retrieve the first weapon (index 0) from the `inventory` list and store in `p1`.\n2. Retrieve the shield item (index 2) and store in `p3`.\n3. Print both `p1` and `p3`.",
    baseCode: "inventory = [\"Master Sword\", \"Health Potion\", \"Hylian Shield\"]\n# TODO: Retrieve first and third inventory items\n",
    solution: "p1 = inventory[0]\np3 = inventory[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*inventory\s*\[\s*0\s*\]/, /p3\s*=\s*inventory\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "LOOT_BAG_UPGRADE",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value weapon tool is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "inventory = [\"Master Sword\",\"Health Potion\",\"Hylian Shield\"]\ninventory.append(\"Hookshot\")\n# inventory is now updated!",
    task: "1. Append \"Hookshot\" to the `inventory` list.\n2. Print the final `inventory` list to confirm installation.",
    baseCode: "inventory = [\"Master Sword\",\"Health Potion\",\"Hylian Shield\"]\n# TODO: Append value and print\n",
    solution: "inventory.append(\"Hookshot\")\nprint(inventory)",
    solutionRegex: [/inventory\.\s*append\s*\(\s*['"]Hookshot['"]\s*\)/, /print\s*\(\s*inventory\s*\)/]
  },
  "list-pop": {
    headerPrefix: "INVENTORY_CLEANUP",
    missionPrefix: "YOUR TASK",
    intro: "# Bag Cleanup: .pop()\n\nYour inventory is overflowing, and carrying too much weight will slow down your character! Drop that useless starter gear. Use `.pop()` to quickly discard the last junk item from your inventory to free up bag space before you get overencumbered!",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = redundant_loot.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `redundant_loot` list and store it inside a variable named `discarded`.\n2. Print `discarded` to output the purged token.",
    baseCode: "redundant_loot = [\"Broken Sword\",\"Rusty Key\",\"Empty Bottle\"]\n# TODO: Pop last element and print\n",
    solution: "discarded = redundant_loot.pop()\nprint(discarded)",
    solutionRegex: [/discarded\s*=\s*redundant_loot\.\s*pop\s*\(\s*\)/, /print\s*\(\s*discarded\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "REALM_PORT",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Immutable Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of items, similar to an inventory list, but with one game-changing distinction: **lists are mutable** (meaning you can add, remove, or swap items on the fly), whereas **tuples are immutable** (their contents are permanently locked and cannot be changed or edited in memory once defined).\n- **Syntax**: Defined with round parentheses `()` instead of square brackets `[]`.\n- **Speed & Integrity**: Because tuples are simpler and read-only, they process faster and secure critical hardcoded coordinates, level seeds, or realm boundaries from accidental runtime alteration.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `server_realm` containing \"Elysium Fields\" and the number `7777`.\n2. Print the `server_realm` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "server_realm = (\"Elysium Fields\", 7777)\nprint(server_realm)",
    solutionRegex: [/server_realm\s*=\s*\(\s*['"]Elysium Fields['"]\s*,\s*7777\s*\)/, /print\s*\(\s*server_realm\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "STAT_VAULT",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `loot_chest` containing the single string \"Bronze Sword\"\n2. Create a tuple named `player_stats` containing the numbers `99` and `1`.\n3. Rewrite `loot_chest[0]` to be \"Excalibur\"\n4. Print both `loot_chest` and `player_stats`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "loot_chest = [\"Bronze Sword\" ]\nplayer_stats = (99, 1)\nloot_chest[0] = \"Excalibur\"\nprint(loot_chest)\nprint(player_stats)",
    solutionRegex: [/loot_chest\s*\[\s*0\s*\]\s*=\s*['"]Excalibur['"]/, /player_stats\s*=\s*\(\s*99\s*,\s*1\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "ACTION_BAR_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `action_bar` list.\n2. Store this result in a new variable named `combat_keys`.\n3. Print the resulting slice `combat_keys`.",
    baseCode: "action_bar = [\"slash\",\"dodge\",\"fireball\",\"heal\",\"parry\",\"teleport\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "combat_keys = action_bar[1:4]\nprint(combat_keys)",
    solutionRegex: [/combat_keys\s*=\s*action_bar\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*combat_keys\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "MANA_FILTER",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `mana_levels`.\n2. Store the result in a variable named `high_mana`.\n3. Print `high_mana`.",
    baseCode: "mana_levels = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "high_mana = [m for m in mana_levels if m > 50]\nprint(high_mana)",
    solutionRegex: [/high_mana\s*=\s*\[\s*m\s+for\s+m\s+in\s+mana_levels\s+if\s+m\s*>\s*50\s*\]/, /print\s*\(\s*high_mana\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "QUEST_INDEX",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `quest_id_numbers` list using a list comprehension.\n2. Store this filtered list in a new variable named `valid_quest_nodes`.\n3. Print `valid_quest_nodes`.",
    baseCode: "quest_id_numbers = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "valid_quest_nodes = [q for q in quest_id_numbers if q % 2 == 0]\nprint(valid_quest_nodes)",
    solutionRegex: [/valid_quest_nodes\s*=\s*\[\s*q\s+for\s+q\s+in\s+quest_id_numbers\s+if\s+q\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*valid_quest_nodes\s*\)/]
  },
  "intro-input": {
    headerPrefix: "GUILD_HALL",
    missionPrefix: "YOUR TASK",
    intro: "# RPG Character Setup: Player Input\n\nChoose your path, adventurer! Before stepping out of the starting tavern, you must register your heroic character name in the royal registry.",
    technical: "### Character Creation Prompts:\n- The `input()` command pauses the game engine until the user supplies custom text inputs.\n- This allows personalizing save files, dialogue trees, and combat equipment.\n- **Inventory Concatenation**: Combine weapon names or dungeon labels together using the `+` operator (e.g., `\"Mana\" + \"Potion\"` becomes `\"ManaPotion\"`). Remember to insert explicit spaces, or your inventory screen will become a single, unreadable word!",
    example: "class_type = input(\"Select your class: \")\nprint(\"Selected class: \" + class_type)",
    task: "1. Ask the adventurer for their quest with the prompt: **\"Enter quest target: \"** and store it in a variable named `quest_target`.\n2. Print **\"Embarking to: \"** concatenated with the user\'s `quest_target` value.",
    baseCode: "# TODO: Capture quest destination and print the starting message\n",
    solution: "quest_target = input(\"Enter quest target: \")\nprint(\"Embarking to: \" + quest_target)",
    solutionRegex: [/quest_target\s*=\s*input\s*\(\s*['\"]Enter quest target: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Embarking to: \s*['\"]\s*\+\s*quest_target\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "QUEST_LOG",
    missionPrefix: "LOG_GEN",
    intro: "# Adventure Journals: Story Generator\n\nProgram your RPG text logs to document epic dungeon runs. Gather user details to narrate how dangerous rooms were overcome.",
    technical: "### Concatenating Lore Files:\nString your custom variables and rigid story components in sequence using + operands. Ensure sentence boundaries align nicely.",
    example: "hero = \"Geralt\"\nbeast = \"Griffin\"\ntale = hero + \" hunted the \" + beast\nprint(tale)",
    task: "1. Ask the user for the hero name with the prompt: **\"Enter hero name: \"** and store it in `hero`.\n2. Ask the user for the dungeon boss with the prompt: **\"Enter dungeon boss: \"** and store it in `boss`.\n3. Ask the user for the primary weapon with the prompt: **\"Enter primary weapon: \"** and store it in `weapon`.\n4. Combine into a variable named `adventure_log` using the format: `hero + \" bypassed \" + boss + \" with a \" + weapon + \"!\"` and print `adventure_log`.",
    baseCode: "# TODO: Record dungeon run lore\n",
    solution: "hero = input(\"Enter hero name: \")\nboss = input(\"Enter dungeon boss: \")\nweapon = input(\"Enter primary weapon: \")\nadventure_log = hero + \" bypassed \" + boss + \" with a \" + weapon + \"!\"\nprint(adventure_log)",
    solutionRegex: [/hero\s*=\s*input\s*\(\s*['"]Enter hero name:\s*['"]\s*\)/, /boss\s*=\s*input\s*\(\s*['"]Enter dungeon boss:\s*['"]\s*\)/, /weapon\s*=\s*input\s*\(\s*['"]Enter primary weapon:\s*['"]\s*\)/, /adventure_log\s*=\s*hero\s*\+\s*['"] bypassed ['"]\s*\+\s*boss\s*\+\s*['"] with a ['"]\s*\+\s*weapon\s*\+\s*['"]!['"]/, /print\s*\(\s*adventure_log\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "CONSOLE_REPORTS",
    missionPrefix: "DUNGEON_GLITCH",
    intro: "# Retro Glitch: Sandbox Terminal\n\nThe dungeon master's core engine is bugging out! Assemble an adventurer bug-fix protocol file using five custom game elements.",
    technical: "### String Interlacing:\nBridge the gap between adventurer metrics, custom sandbox elements, and current floors using correct string delimiters and addition signs.",
    example: "bug = client + \" injected \" + cheat + \" into \" + arena + \" at \" + lvl + \". System is \" + state + \"!\"",
    task: "1. Ask the gamer for hero name with prompt: **\"Enter adventurer: \"** and store in `hero`.\n2. Ask for custom developer hotkey with prompt: **\"Enter exploit key: \"** and store in `exploit_key`.\n3. Ask for map instance with prompt: **\"Enter arena room: \"** and store in `arena_room`.\n4. Ask for game level with prompt: **\"Enter game level: \"** and store in `game_level`.\n5. Ask for current quest status with prompt: **\"Enter sandbox status: \"** and store in `sandbox_status`.\n6. Combine into a variable named `adventure_glitch` and print using the exact format: `hero + \" injected \" + exploit_key + \" into \" + arena_room + \" at \" + game_level + \". System is \" + sandbox_status + \"!\"`.",
    baseCode: "# TODO: Keep the sandbox simulation running\n",
    solution: "hero = input(\"Enter adventurer: \")\nexploit_key = input(\"Enter exploit key: \")\narena_room = input(\"Enter arena room: \")\ngame_level = input(\"Enter game level: \")\nsandbox_status = input(\"Enter sandbox status: \")\nadventure_glitch = hero + \" injected \" + exploit_key + \" into \" + arena_room + \" at \" + game_level + \". System is \" + sandbox_status + \"!\"\nprint(adventure_glitch)",
    solutionRegex: [/hero\s*=\s*input\s*\(\s*['"]Enter adventurer:\s*['"]\s*\)/, /exploit_key\s*=\s*input\s*\(\s*['"]Enter exploit key:\s*['"]\s*\)/, /arena_room\s*=\s*input\s*\(\s*['"]Enter arena room:\s*['"]\s*\)/, /game_level\s*=\s*input\s*\(\s*['"]Enter game level:\s*['"]\s*\)/, /sandbox_status\s*=\s*input\s*\(\s*['"]Enter sandbox status:\s*['"]\s*\)/, /print\s*\(\s*adventure_glitch\s*\)/]
  },
  "print-formatting": {
    title: "Guild Registry: F-Strings",
    headerPrefix: "GUILD_CONSOLE",
    missionPrefix: "HERO_VERIFY",
    intro: "# Guild Registry: F-Strings\n\nReady to list raid commanders? Format live guild monitors dynamically. F-strings allow you to embed character names and adventure tiers in real-time.",
    technical: "### F-String Protocol:\n- Prefacing strings with `f` tells Python to process internal replacement blocks.\n- Replace bracket tags with `{variable}` to render stats directly.",
    example: "hero = \'Link\'\nprint(f\'Adventurer: {hero}\') # Outputs: Adventurer: Link",
    task: "### YOUR MISSION\n\nYou have `alias = \'Link\'` and `level = 80`. Use an **f-string** to print: `Hero: Link | Quest Stage: 80`.",
    baseCode: "alias = \'Link\'\nlevel = 80\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Embed {alias} and {level} inside curly braces."
    ],
    solution: "alias = \'Link\'\nlevel = 80\nprint(f\'Hero: {alias} | Quest Stage: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Hero:\s*\{alias\}\s*\|\s*Quest\s*Stage:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Guild Mobilization: Advanced F-Strings",
    headerPrefix: "HERO_HUD",
    missionPrefix: "RAID_VAL",
    intro: "# Guild Council: Advanced F-Strings\n\nCoordinate raid parties entering legendary dungeons. Your guild master dashboard uses f-strings to sum party members and force regional dungeon codes to raw uppercase.",
    technical: "### Tactical Lobby Code:\n- **Inline RPG Math**: Sum active levels, gold pockets, or keys inside brackets: `{ranks + bonus}`.\n- **Uppercase Locations**: Force target locations to show up in clean, uppercase quest scrolls: `{zone.upper()}`.",
    example: "warriors, mages = 4, 3\nprint(f'Active raid power: {warriors + mages}')",
    task: "### YOUR MISSION\n\n1. Prompt for hero count with: **\"Enter hero count: \"** and store it as an integer in `heroes`.\n2. Prompt for target realm with: **\"Enter targeted zone: \"** and store it in `zone`.\\n3. Use an **f-string** to print: `Deploying {heroes} heroes to {zone.upper()}...`.",
    baseCode: "# TODO: Mobilize the legion\n",
    hints: [
      "Ask for heroes using int(input(\"Enter hero count: \"))",
      "Ask for zone using input(\"Enter targeted zone: \")",
      "Output exactly the themed f-string incorporating {heroes} and {zone.upper()}."
    ],
    solution: "heroes = int(input(\"Enter hero count: \"))\nzone = input(\"Enter targeted zone: \")\nprint(f\"Deploying {heroes} heroes to {zone.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{heroes\}\s*heroes\s*to\s*\{zone\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Loot Locker Inventory: Casting to Int",
    headerPrefix: "RPG_VAULT",
    missionPrefix: "COIN_RECAST",
    intro: "# Quest Rewards: Recasting Inventory Gold\\n\\nWhen trading items inside legendary server hubs, loot reports arrive in text logs. Convert raw descriptions into real integers to update your gold stash ledger.",
    technical: "### Safe RPG Bookkeeping:\\n- Cast raw text coins to integer quantities: `gold = int(input(\\\"Coins: \\\"))`.",
    example: "boss_loot = int(input(\"Raid gold: \"))\ntotal_purse = boss_loot + 500",
    task: "### YOUR MISSION\\n\\nSettle your inventory coins:\\n1. Prompt for active quest gold with **\\\"Enter gold from active quests: \\\"** and store it as an integer in `quest_gold`.\\n2. Prompt for guild raid bonus gold with **\\\"Enter bonus gold from guild raid: \\\"** and store it as an integer in `guild_bonus`.\\n3. Print the total combined gold coins residing within your vault tab.",
    baseCode: "# TODO: Cast coins and compute total gold\\n",
    hints: [
      "Use quest_gold = int(input(\\\"Enter gold from active quests: \\\"))",
      "Use guild_bonus = int(input(\\\"Enter bonus gold from guild raid: \\\"))",
      "Add both fields and print the result."
    ],
    solution: "quest_gold = int(input(\\\"Enter gold from active quests: \\\"))\\nguild_bonus = int(input(\\\"Enter bonus gold from guild raid: \\\"))\\nprint(quest_gold + guild_bonus)",
    solutionRegex: [/quest_gold\s*=\s*int\s*\(\s*input/, /guild_bonus\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Crit Multiplier: Casting to Float",
    headerPrefix: "DAMAGE_CALC",
    missionPrefix: "CRIT_DECIMAL",
    intro: "# Guild Combat Logs: Precision Crit Scaling\\n\\nMin-maxing RPG hero output requires critical damage calculations. Damage multipliers usually span fractional metrics. Cast raw text records into floats to evaluate damage scales correctly.",
    technical: "### Gamer Stat Float Diagnostics:\\n- **What is a Float?**: While standard integers work for discrete resources (like `50` health potions), decimal stats (like a `2.25` crit multiplier) require `float` types to represent fractional values.\\n- **String logs to Float Numbers**: User responses captured via `input()` are strings. To do math on stats, convert them using `float()`, e.g., `value = float(input())`.\\n- **The Game-Crash Trap**: Int conversion cannot parse a decimal dot. Trying to parse `\"2.25\"` with `int()` will trigger a `ValueError` crash, instantly exiting your game program!",
    example: "run_speed = float(input(\"Sprint multiplier: \"))\njump_ht = run_speed * 1.35",
    task: "### YOUR MISSION\\n\\nCalculate weapon critical strikes:\\n1. Prompt for weapon damage with **\\\"Enter hero weapon base damage: \\\"** and store it as a float in `base_damage`.\\n2. Prompt for critical multiplier with **\\\"Critical threat modifier multiplier: \\\"** and store it as a float in `critical_mod`.\\n3. Calculate and print the combined weapon strike value by multiplying the base damage and critical modifier.",
    baseCode: "# TODO: Process elite crit math\\n",
    hints: [
      "Use base_damage = float(input(\"Enter hero weapon base damage: \"))",
      "Use critical_mod = float(input(\"Critical threat modifier multiplier: \"))",
      "Tally combat score using print(base_damage * critical_mod)."
    ],
    solution: "base_damage = float(input(\"Enter hero weapon base damage: \"))\ncritical_mod = float(input(\"Critical threat modifier multiplier: \"))\nprint(base_damage * critical_mod)",
    solutionRegex: [/base_damage\s*=\s*float\s*\(\s*input/, /critical_mod\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Loot Verification: Indentation Blocks",
    headerPrefix: "GUILD_GATE",
    missionPrefix: "QUEST_LOG",
    intro: "# Vault Decryption: Code Blocks\\n\\nOpening mystical master chests requires rigorous structural geometry. Python groups looting events under logical blocks using neat spacing. A single misaligned block will lock down your inventory eternally.",
    technical: "### Quest Script Rules:\\n- Start conditional states with a trailing colon (`:`).\\n- Nest all action logic inside with 4 exact spaces of indentation margin.",
    example: "if True:\\n    print(\\\"Epic loot acquired\\\")  # Indented statement",
    task: "### YOUR MISSION\\n\\nActivate the legendary chest sequence:\\n1. Write an `if True:` control statement.\\n2. On the next line, indented with exactly 4 spaces, print **\\\"Accessing...\\\"** to pop the secure chest seals.",
    baseCode: "# TODO: Format guild chest code structures\\n",
    hints: [
      "Put if True: on the first line",
      "Indent the next statement by 4 spaces",
      "Output print(\\\"Accessing...\\\") to read the epic vault"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Guild Vault: Stacking Secure Crypts",
    headerPrefix: "VAULT_DOOR",
    missionPrefix: "CRYPT_FLOW",
    intro: "# Legendary Treasure Loot: Layered Spellwards\\n\\nThe sacred iron vault containing the ancient celestial sword is locked within a secondary physical chamber. To loot the chest without triggering active security traps, align your code nesting layers cleanly.",
    technical: "### Dungeon Crypt Alignment:\\n- Outer conditions handle spellward validations (4 spaces offset).\\n- Inner nested conditions handle mechanical lock evaluations (exactly **8 spaces** of nesting offset).",
    example: "if True:\\n    print(\"Outer seal broken\")\\n    if True:\\n        print(\"Inner lock pick success\")",
    task: "### YOUR MISSION\\n\\nGain clearance to the inner guild repository:\\n1. Open the primary vault barrier utilizing **`if True:`**.\\n2. Nest the interior chest authorization checkpoint under it with **`if True:`** (indented by 4 spaces).\\n3. On the innermost line (indented with exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Program nested treasure locks\\n",
    hints: [
      "Line 1: if True:",
      "Line 2: 4 spaces of indentation, then if True:",
      "Line 3: 8 spaces of indentation, to print(\"CORE ACCESS GRANTED\")"
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "LOOT_LOCK",
    missionPrefix: "KEY_CHECK",
    intro: "# Dungeon Secrets: If Statements\n\nYou've found a legendary chest! Check your inventory for the correct key before attempting to reveal the treasures within.",
    task: "If `has_key` is `True`, print `\"CHEST UNLOCKED\"`.",
    baseCode: "has_key = True\n# TODO: Try the chest\n",
    solution: "has_key = True\nif has_key:\n    print(\"CHEST UNLOCKED\")",
    solutionRegex: [/if\s+has_key/, /print\s*\(\s*['\"]CHEST UNLOCKED['\"]\s*\)/]
  },
  "control-else": {
    title: "Adventure Gates: If/Else Looting",
    headerPrefix: "LOOT_LOCK",
    missionPrefix: "LOOT_ELSE",
    intro: "# Rare Vault Seals: If/Else Check\\n\\nYou stand in front of the legendary dragon vault. If the explorer carries the royal key, pop the chest locks cleanly. Else, activate the protective stone monolith traps to seal off the vault area forever.",
    technical: "### Quest Script Routing:\\n- The `else:` statement directs program flow when your primary query yields a `False` result. Align it perfectly with the original `if` level.",
    example: "if has_mana:\\n    print(\\\"Cast spell\\\")\\nelse:\\n    print(\\\"Normal strike\\\")",
    task: "### YOUR MISSION\\n\\nAudit the mythical tomb terminal checks:\\n1. Construct an `if/else` condition checking `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Open chest or trigger traps\\n",
    hints: [
      "Open your structure with: if key_valid:.",
      "Indent with 4 spaces to print \\\"ACCESS GRANTED\\\".",
      "Format else: without indentations on line 3.",
      "Indent below else: and print \\\"ALARM TRIGGERED\\\"."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Guild Vault: Elif Clearances",
    headerPrefix: "CRYPT_GATE",
    missionPrefix: "TIER_VAULT",
    intro: "# Dungeon Treasure: Stacking Lock Clearances\\n\\nMystical dungeons limit loot tiers according to character reputation stats. Use an `if/elif/else` code flow to check keys: legendary guild masters, standard party division leads, and low-level squires.",
    technical: "### Loot Chamber Selection:\\n- Keep conditional blocks sorted. The first condition that matches stops the execution flow for the entire chain.",
    example: "if level >= 50:\\n    print(\"Elite loot\")\\nelif level >= 10:\\n    print(\"Standard loot\")\\nelse:\\n    print(\"No chest\")",
    task: "### YOUR MISSION\\n\\nClassify dungeon chest security codes:\\n1. Construct an `if/elif/else` script measuring `clearance`.\\n2. If `clearance` is exactly `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Otherwise, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Identify treasure container permissions\\n",
    hints: [
      "Check master level with if clearance == 1:",
      "Check officer limits utilizing elif clearance <= 5:",
      "Add else: to summon the mimic trap"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Speedrunner Cover: Chat Spoof",
    headerPrefix: "STREAM_OS",
    missionPrefix: "CHEAT_SPOOF",
    intro: "# Speedrun Glitch: Mod Flag Mitigation\n\nYou just utilized a high-profile wall-clipping cheat during a live speedrun tournament. If the lobby moderators detected the exploitation sequence, send an instant chat spoofing line to prevent getting banned from the ladder! Else, keep the speedrun timer ticking.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"ACTIVATE_GLITCH_DASH\")\nelse:\n    print(\"Speedrun timer ticking.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` stream-chat proxy:\n1. If `is_detected`, print **`\"ACTIVATE_GLITCH_DASH\"`** to dodge the moderator's banhammer.\n2. Else, print **`\"Speedrun timer ticking.\"`** and claim your/our world record!",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"ACTIVATE_GLITCH_DASH\".",
      "Add else: at the base level and print \"Speedrun timer ticking.\""
    ],
    solution: "if is_detected:\n    print(\"ACTIVATE_GLITCH_DASH\")\nelse:\n    print(\"Speedrun timer ticking.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]ACTIVATE_GLITCH_DASH['"]\s*\)/, /print\s*\(\s*['"]Speedrun\s+timer\s+ticking\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Rank Determination: Gamer Score Title",
    headerPrefix: "LADDER_OS",
    missionPrefix: "TIER_AWARD",
    intro: "# Matchmaking: Leaderboard Rank Allocation\n\nAssign a special competitive tier ranking to an active player based on their total gamer score. High-level speedrunners with supreme rank scores are promoted to Grandmaster.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to evaluate the dynamic leaderboard score.\n- **Assignment**: Set the player's `rank_title` string correctly in the matching conditional flows.",
    example: "if power > 9000:\n    rank_title = \"Grandmaster\"\nelse:\n    rank_title = \"Noob\"",
    task: "### YOUR MISSION\n\nCalibrate ladder positioning status:\n1. If matchmaking `gamer_score > 9000`, set `rank_title` to **`\"Grandmaster\"`**.\n2. Else, set `rank_title` to **`\"Noob\"`**.\n3. Finally, print the resulting active title with `print(rank_title)`.",
    baseCode: "gamer_score = 9001\nrank_title = \"\"\n# TODO: Determine gaming title and print it\n",
    hints: [
      "Assign the rank_title string within the respective branches.",
      "End the file by printing the title using print(rank_title) unindented."
    ],
    solution: "gamer_score = 9001\nif gamer_score > 9000:\n    rank_title = \"Grandmaster\"\nelse:\n    rank_title = \"Noob\"\nprint(rank_title)",
    solutionRegex: [/if\s+gamer_score\s*>\s*9000\s*:/, /rank_title\s*=\s*['"]Grandmaster['"]/, /rank_title\s*=\s*['"]Noob['"]/, /print\s*\(\s*rank_title\s*\)/]
  },
  "control-adventure": {
    title: "Dungeon Raid: Secret Hubs",
    headerPrefix: "DUNGEON_OS",
    missionPrefix: "STAGE_SPLIT",
    intro: "# Retro Boss Room: Door Selection\n\nYou have cracked the gate locks leading to the dev core. Two teleport portals reside in the safe zone: \"1\" (Grand Treasure Vault) or \"2\" (Maintenance Glitch Route). Select your exit.",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Loading Treasure Vault...\")",
    task: "### YOUR MISSION\n\nVerify destination status inside the admin panel:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Program dungeon door mechanics\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Stream Routing: Tournament Split",
    headerPrefix: "STREAM_ROUTING",
    missionPrefix: "CHAT_DISPATCH",
    intro: "# Matchmaking Server: Faction Directives\n\nThe server routes active gamers into specific tournament streams based on gamer tags: \"speedrun\", \"coop\", or \"pvp\" to optimize load balance.",
    technical: "### Cascading Checks:\n- **Sequential**: Checks registered gamer paths from top tier limits down.\n- **Exclusive**: Only the first matching stream receives connection priority.\n- **Exhaustive**: An `else` routes unassigned casuals to lobby screens.",
    example: "if lobby == \"speedrun\":\n    print(\"Timer activated.\")\nelif lobby == \"coop\":\n    print(\"Duo room.\")",
    task: "### YOUR MISSION\n\nDirect player setups based on variable `lobby`:\n1. If `lobby` is **`\"speedrun\"`**, print **`\"Timer activated.\"`**\n2. Elif `lobby` is **`\"coop\"`**, print **`\"Duo room.\"`**\n3. Elif `lobby` is **`\"pvp\"`**, print **`\"Arena duel.\"`**\n4. Else, print **`\"Queueing offline.\"`**",
    baseCode: "lobby = \"speedrun\"\n# TODO: Setup stream routing branches\n",
    hints: [
      "Create lobby comparison conditions.",
      "The else block handles the offline queue."
    ],
    solution: "if lobby == \"speedrun\":\n    print(\"Timer activated.\")\nelif lobby == \"coop\":\n    print(\"Duo room.\")\nelif lobby == \"pvp\":\n    print(\"Arena duel.\")\nelse:\n    print(\"Queueing offline.\")",
    solutionRegex: [/if\s+lobby\s*==\s*['"]speedrun['"]\s*:/, /elif\s+lobby\s*==\s*['"]coop['"]\s*:/, /elif\s+lobby\s*==\s*['"]pvp['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Timer\s+activated\.['"]\s*\)/, /print\s*\(\s*['"]Duo\s+room\.['"]\s*\)/, /print\s*\(\s*['"]Arena\s+duel\.['"]\s*\)/, /print\s*\(\s*['"]Queueing\s+offline\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Server Cycles: Lobby Scans",
    headerPrefix: "LOBBY_CYCLES",
    missionPrefix: "ROOM_AUDIT",
    intro: "# Lobby Scans: Mass Checkouts\n\nGame masters shouldn't audit active servers manually. Automate server health checks across tournament lobbies sequentially to ensure steady matchmaking.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### Iterative Loops:\n- **range(5)**: Boots a loop sequence running exactly 5 times (Room indexing 0 up to 4).\n- **Control Flow**: Great for checking player rooms or scanning server sectors.",
    example: "for i in range(3):\n    print(f\"Lobby {i+1} active\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Lobby {i+1} active\"` for each of the 5 cycles.",
    baseCode: "# TODO: Loop through rooms\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Lobby {i+1} active"
    ],
    solution: "for i in range(5):\n    print(f\"Lobby {i+1} active\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Command Buffers: Keypress Sweeper",
    headerPrefix: "COMBO_PARSER",
    missionPrefix: "INPUT_WALK",
    intro: "# Input Tracking: Action Parsing\n\nTo execute complex high-tier combos, the game engine reads player keypress command structures sequentially. Walk through the key inputs piece by piece.",
    technical: "### String Iteration:\n- **Processing**: The loop processor inspects action characters sequentially.\n- **Termination**: Ends automatically when there are no more combo key bindings left to register.",
    example: "for key in \"WASD\":\n    print(key)",
    task: "### YOUR MISSION\n\nYou've captured a player's action speed run `combo` input: `\"WASD\"`. Use a `for` loop to iterate through every character `key` in the variable `combo` and `print` it.",
    baseCode: "combo = \"WASD\"\n# TODO: Parse the action keys\n",
    hints: [
      "Use 'for key in combo:' to get individual key bindings.",
      "Print each key command on its own line."
    ],
    solution: "combo = \"WASD\"\nfor key in combo:\n    print(key)",
    solutionRegex: [/for\s+key\s+in\s+combo/, /print\s*\(\s*key\s*\)/]
  },
  "loop-list-audit": {
    title: "Inventory Sorting: Quest Items",
    headerPrefix: "LOOT_STASH",
    missionPrefix: "ITEM_FILTER",
    intro: "# Loot Stash: Relic Filter\n\nYour legendary dungeon crawl rewarded you with dozens of mysterious loot boxes. Filter your inventory list for keys that are tagged as epic loot artifacts ending with `.gme`.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"dragon_orb.gme\"`, then `\"trash_stone.txt\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".gme\")` asks: *\"Does the text inside `f` end with `.gme`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".gme\"):\n          # This runs ONLY if the current file ends with .gme!\n  ```",
    example: "loot = [\"wood_stick.txt\", \"relic_sword.gme\"]\nfor l in loot:\n    if \".gme\" in l:\n        print(l)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If an item ends with `\".gme\"`, `print` the server notification: `f\"Equipped legendary: {f}\"`.",
    baseCode: "discovered_files = [\"dragon_orb.gme\", \"trash_stone.txt\", \"shadow_dagger.gme\", \"gold_coins.dat\"]\n# TODO: Sift through loot drops\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".gme\"):",
      "Print f'Equipped legendary: {f}'"
    ],
    solution: "discovered_files = [\"dragon_orb.gme\", \"trash_stone.txt\", \"shadow_dagger.gme\", \"gold_coins.dat\"]\nfor f in discovered_files:\n    if f.endswith(\".gme\"):\n        print(f\"Equipped legendary: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.gme['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Dungeon Mapper: Tile Sweeps",
    headerPrefix: "DUNGEON_MAP",
    missionPrefix: "ROOM_COORD",
    intro: "# Quest Exploration: Mapping Level Tiles\n\nRPG maps are saved as double-subscript matrices of tiles. To generate a map, your script traverses room blocks (X) and floor patterns (Y).",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 dungeon grid scan with variable `x` (outer loop representing Chambers) and variable `y` (inner loop representing Quadrants) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Chamber 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Quadrant 0) -> Output: `Tile - Row: 0, Col: 0`\n     - `y = 1` (Quadrant 1) -> Output: `Tile - Row: 0, Col: 1`\n     - `y = 2` (Quadrant 2) -> Output: `Tile - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Chamber 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Quadrant 0) -> Output: `Tile - Row: 1, Col: 0`\n     - `y = 1` (Quadrant 1) -> Output: `Tile - Row: 1, Col: 1`\n     - `y = 2` (Quadrant 2) -> Output: `Tile - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Chamber 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Quadrant 0) -> Output: `Tile - Row: 2, Col: 0`\n     - `y = 1` (Quadrant 1) -> Output: `Tile - Row: 2, Col: 1`\n     - `y = 2` (Quadrant 2) -> Output: `Tile - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Tile {r},{c}\")",
    task: "### YOUR MISSION\n\nDraw a **3x3 dungeon grid**. Run nested loops with `range(3)` for `x` (chamber) and `y` (quadrant).\n\nInside the inner loop, `print` the tile logs in this exact format: `f\"Tile - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Map dungeon coordinates\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Tile - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Tile - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Boss Mechanics: Aggro Override",
    headerPrefix: "DUNGEON_RUN",
    missionPrefix: "AGGRO_CEASE",
    intro: "# Dungeon Crawl: Aborting Combat Phases\n\nWhen a raid boss begins charging an instakill spell, your party must instantly retreat. Python lets you override standard dungeon looping sequences using the `break` command.",
    technical: "### Fight Escape:\n- **Instant Exit**: Wipe active server loops the second a wipe mechanic activates.\n- **Warden Safeguards**: Check threat values inside structured standard conditions.",
    example: "for round in range(10):\n    if round == 5:\n        break\n    print(round)",
    task: "### YOUR MISSION\n\nDeploy damage triggers over `range(10)` frames. If the battle rage warning state `i` reaches `7`, `break` the loop to evade the boss's ultimate spell. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Script fight sequences with safety break\n",
    hints: [
      "Launch loop 'for i in range(10):'",
      "Set boss rage gauge monitor 'if i == 7:'",
      "Trigger 'break' inside the condition, then execute print(i)"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Gamer Deck: Mana Drain",
    headerPrefix: "PLAYER_STATUS",
    missionPrefix: "MP_DECAY",
    intro: "# Game State Cycles: While Loops\n\nWhile `for` loops iterate over a fixed sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor your console's auxiliary battery power as you complete an epic long-range raid.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power your controller.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "DAEMON_UPLOADER",
    missionPrefix: "QUICK_HACK",
    intro: "# Netrunner Skillset: Functions\n\nDon't hack manually every time! Create a reusable daemon function to distribute a virus across all connected nodes in the apartment.",
    task: "Write a function `upload_virus(node_id)` that prints `f'Infecting node {node_id}...'`. Call it.",
    baseCode: "# TODO: Pack daemon function\n",
    solution: "def upload_virus(node_id):\n    print(f'Infecting node {node_id}...')\n\nupload_virus('A7')",
    solutionRegex: [/def\s+upload_virus/, /upload_virus\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "DAEMON_RECURSE",
    missionPrefix: "ICE_PICK",
    intro: "# Infiltrating the Blackwall: Recursion\n\nTo bypass Arasaka's ICE, you need a recursive daemon that eats through layered firewalls, one node at a time, until the core is exposed.",
    task: "Write a recursive function `infect_node(layer)` that prints the layer and calls itself with `layer-1` until it reaches `0`.",
    baseCode: "# TODO: Deep ICE breach\n",
    solution: "def infect_node(layer):\n    print(layer)\n    if layer > 0:\n        infect_node(layer - 1)\n\ninfect_node(5)",
    solutionRegex: [/def\s+infect_node/, /infect_node\s*\(\s*layer\s*-\s*1\s*\)/]
  }
};