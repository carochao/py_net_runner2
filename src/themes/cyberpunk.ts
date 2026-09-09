export const CYBERPUNK_THEME: any = {
  "intro-print": {
    headerPrefix: "NEURAL_SOCKET",
    missionPrefix: "UPLINK_ESTABLISHED",
    intro: "# Initializing ICE Breaker: print()\n\nWake up, Samurai. We've got a city to burn. First, check your neural link status by broadcasting a heartbeat signal to the net.",
    task: "Use `print()` to display: `\"Neural Link: ACTIVE\"`",
    baseCode: "# TODO: Check neural link\n",
    solution: "print(\"Neural Link: ACTIVE\")",
    solutionRegex: [/print\s*\(\s*['\"]Neural Link: ACTIVE['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "DECK_STYLE",
    missionPrefix: "STEALTH_CASING",
    intro: "# Rig Protocols: Stealth Casing\n\nNetrunning requires total stealth. Real deck programs operate in clean, silent lowercase; uppercase commands like `Print()` are loud, sloppy, and will trigger defensive ICE alerts on the megacorp subnets immediately! Write your variables and functions in strict lowercase.",
    task: "Initialize a lowercase hacking sequence variable named `cyber_deck` with the value `2077`. Print it to the screen using `print()` to launch your proxy bypass. Everything must be lowercase!",
    baseCode: "# TODO: Initiate cyber_deck on your rig and print it\n",
    solution: "cyber_deck = 2077\nprint(cyber_deck)",
    solutionRegex: [/cyber_deck\s*=\s*2077/, /print\s*\(\s*cyber_deck\s*\)/]
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
    headerPrefix: "DECRYPT_PORT",
    missionPrefix: "PORT_TAG",
    intro: "# Ghost Protocols: Inline Comments\n\nWhen you're breaching corporate gateways in the Net, you need to tag critical subnet connections immediately. Let's tag active cyberware ports.",
    task: "Initialize `subnet_port` to `503`. On the same line, add an inline comment `# Blackwall gateway`.",
    baseCode: "# TODO: Initialize connection with inline comment\n",
    solution: "subnet_port = 503 # Blackwall gateway",
    solutionRegex: [/subnet_port\s*=\s*503/, /#.*Blackwall gateway/]
  },
  "intro-vars": {
    headerPrefix: "CHROME_UPGRADE",
    missionPrefix: "DATA_SHARD",
    intro: "# Augmentation Stats: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled data shard slot** in your cyberware! You give the slot a name (like `ram_gb`), load RAM or eddies inside, and retrieve or overclock it on the fly.\n\nYour cyberware needs constant monitoring. Let's use variables to track your RAM capacity and Eddies in your digital wallet.",
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
    task: "Initialize `os_version` as `1.0`. Then update `os_version` to `2.1`. Print it.",
    baseCode: "os_version = 1.0\n# TODO: Upgrade to 2.1\n",
    solution: "os_version = 1.0\nos_version = 2.1\nprint(os_version)",
    solutionRegex: [/os_version\s*=\s*1\.0/, /os_version\s*=\s*2\.1/, /print\s*\(\s*os_version\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "DECK_BUFFER",
    missionPrefix: "RIG_HANDSHAKE",
    intro: "# Echo Request: Subnet Buffer\n\nWait for the Megacorp subnet to push an access token packet! Before the corporate gateway signal bypasses your neural cyberdeck, set up an empty placeholder variable in your rig's buffer to catch the incoming proxy key.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `cyberpunk_data = \"\"` as a placeholder, we allocate space in memory. Then, running `cyberpunk_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the new proxy key dynamically so you can see it change!",
    example: "cyberpunk_data = \"\"  # Memory slot is allocated and empty\ncyberpunk_data = input(\"Enter subnet token: \")  # Line 2 updates the empty string with your input!\nprint(\"Decrypted token: \" + cyberpunk_data)",
    task: "1. Initialize `cyberpunk_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter subnet token: \")` to populate it.\n3. Print `\"Decrypted token: \" + cyberpunk_data`.",
    baseCode: "# TODO: Initialize empty buffer, capture, and print\n",
    hints: [
      "Use cyberpunk_data = \"\" to allocate memory on your deck.",
      "Use cyberpunk_data = input(\"Enter subnet token: \") to capture the packet.",
      "Print \"Decrypted token: \" combined with the cyberpunk_data variable."
    ],
    solution: "cyberpunk_data = \"\"\ncyberpunk_data = input(\"Enter subnet token: \")\nprint(\"Decrypted token: \" + cyberpunk_data)",
    solutionRegex: [/cyberpunk_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "CYBERWARE_SYNC",
    missionPrefix: "DUAL_LINK",
    intro: "# Neural Optimization: Multi-Assignment\n\nSpeed is everything. Initialize your left and right optic modules at once to synchronize your visual feed before the net-police arrive.",
    task: "Assign `left_optic` set to `\"ACTIVE\"` and `right_optic` set to `\"ACTIVE\"` in one line.",
    baseCode: "# TODO: Sync visual optics\n",
    solution: "left_optic, right_optic = \"ACTIVE\", \"ACTIVE\"",
    solutionRegex: [/left_optic\s*,\s*right_optic\s*=\s*['\"]ACTIVE['\"]\s*,\s*['\"]ACTIVE['\"]/]
  },
  "data-types-intro": {
    headerPrefix: "MEM_STREAM",
    missionPrefix: "ALLOC_BLOCKS",
    intro: "# Memory Containers: Data Types\n\nIn the matrix, different data packets need dedicated storage boxes. Before we inject our payload, let's look at how the memory allocator categorizes them.",
    technical: "Just like allocating blocks in virtual memory, Python separates your data into specific **Data Types**:\n\n```text\n       [ nano_cores ]     [ sync_ratio ]      [ rig_tier ]      [ deck_status ]\n     .___________._     .___________._     .___________._     .___________._\n    /           / |    /           / |    /           / |    /           / |\n   /___________/  |   /___________/  |   /___________/  |   /___________/  |\n   |           |  |   |           |  |   |           |  |   |           |  |\n   |  LABEL:   |  |   |  LABEL:   |  |   |  LABEL:   |  |   |  LABEL:   |  |\n   | nano_cores|  /   | sync_ratio|  /   | rig_tier  |  /   |deck_status|  /\n   |  CONTENT: | /    |  CONTENT: | /    |  CONTENT: | /    |  CONTENT: | /\n   |  101      |/     |  3.14     |/     |  'A'      |/     |  \"Bytes\"  |/\n   |___________|/     |___________|/     |___________|/     |___________|/\n```\n\n### The Four Core Categories:\n1. **Integer (`int`)**: Discrete counts, whole numbers (e.g., `101`).\n2. **Float (`float`)**: Decimals and signal ratios (e.g., `3.14`).\n3. **Character (`char`)**: Singular alphanumeric flags (e.g., `'A'`).\n4. **String (`str`)**: Alpha-numeric sentences and streams (e.g., `\"Bytes\"`).",
    example: "system_id = 99         # Integer (int)\npower_ratio = 0.75     # Float (float)\ncore_status = 'N'      # Character\nsys_message = \"Ready\"  # String (str)",
    task: "### YOUR MISSION\n\nCreate the four memory container variables as illustrated in our box diagram above:\n1. Create `nano_cores` set to the integer `101`.\n2. Create `sync_ratio` set to the float `3.14`.\n3. Create `rig_tier` set to the character `'A'`.\n4. Create `deck_status` set to the string `\"Bytes\"`.\n\nFinally, print all four variables.",
    baseCode: "# TODO: Initialize the four different cyber-containers\n",
    hints: [
      "No quotes are needed for nano_cores or sync_ratio.",
      "Use single quotes for rig_tier and double/single quotes for deck_status.",
      "To print, use the print() function. You can print them individually (e.g., print(nano_cores)) or all together."
    ],
    solution: "nano_cores = 101\nsync_ratio = 3.14\nrig_tier = 'A'\ndeck_status = \"Bytes\"\nprint(nano_cores)\nprint(sync_ratio)\nprint(rig_tier)\nprint(deck_status)",
    solutionRegex: [/nano_cores\s*=\s*101/, /sync_ratio\s*=\s*3\.14/, /rig_tier\s*=\s*['"]A['"]/, /deck_status\s*=\s*['"]Bytes['"]/, /print\s*\(.*nano_cores.*\)/, /print\s*\(.*sync_ratio.*\)/, /print\s*\(.*rig_tier.*\)/, /print\s*\(.*deck_status.*\)/]
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
    baseCode: "# TODO: Initialize netrunning protocols\n",
    solution: "neural_link_synced = True\nice_warning_active = False",
    solutionRegex: [/neural_link_synced\s*=\s*True/, /ice_warning_active\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "RIPPER_LOG",
    missionPrefix: "CHROME_CALC",
    intro: "# Augmentation Costs: Math\n\nA Ripperdoc is quoting you for a double installation. Calculate the total cost of the Kiroshi MK.3 and the titanium bones extension to see if you have enough Eddies.",
    task: "Create `optics_cost` as `1200` and `bones_cost` as `800`. Store the sum in `total_bill` and print it.",
    baseCode: "# TODO: Calculate ripperdoc fee\n",
    solution: "optics_cost = 1200\nbones_cost = 800\ntotal_bill = optics_cost + bones_cost\nprint(total_bill)",
    solutionRegex: [/total_bill\s*=\s*optics_cost\s*\+\s*bones_cost/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nYour deck is glitching. Initiate a technical protocol memory dump to see if you have enough Eddies for Vik's new ripperdoc installation.",
    technical: "### Neural Deck Calibration:\n1. **Financial Buffer**: Compile raw product costs with street discounts before executing total hardware tax rates.\n2. **Data Pipeline**: Parentheses `()` act as RAM tunnels, prioritizing internal calculations before processing external multipliers.",
    example: "list_price = 80\ncred_discount = -10\nfinal_eddies = (list_price + cred_discount) * 0.8\nprint(final_eddies)",
    task: "1. Establish `list_price` as `80`.\n2. Establish `cred_discount` as `-10`.\n3. Calculate `(list_price + cred_discount) * 0.8` and store in `final_eddies`.\n4. Print `final_eddies`.",
    baseCode: "# TODO: Audit cyberware funds\n",
    solution: "list_price = 80\ncred_discount = -10\nfinal_eddies = (list_price + cred_discount) * 0.8\nprint(final_eddies)",
    solutionRegex: [/final_eddies\s*=\s*\(\s*list_price\s*\+\s*cred_discount\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "CHROME_INVENTORY",
    missionPrefix: "IMPLANT_SYNC",
    intro: "# Augment List: Lists\n\nWhat's in your body? Store your current cyberware implants in a list to monitor their stability and thermal levels.",
    technical: "### Cyberdeck Implant Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of data points saved inside a single memory unit. Rather than allocating individual blocks for each separate chrome mod (e.g., `mod1 = \"Kiroshi\"`, `mod2 = \"Mantis\"`), lists let you register and sync multiple implants together under a single inventory container.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, resembling the neural bus shielding of your cyberdeck.\n- **Comma Separation**: Every installed piece of cyberware inside your neural harness must be separated by a comma.\n- **Zero-Based Hotkeys**: Python lists use zero-based indexing. Your primary system upgrade is mapped to index `0`, your secondary to `1`, and your auxiliary to `2`.",
    example: "# Register multiple chrome modifications in a single list variable\ncyberdeck_rig = [\"Subdermal Armor\", \"Gorilla Arms\", \"Biomonitor\"]\nprint(cyberdeck_rig)  # Displays the active hardware configuration",
    task: "Initialize your `implants` list with \"Sandevistan\", \"Kiroshi Optics\", and \"Mantis Blades\". Print the list to confirm the surgery.",
    baseCode: "# TODO: Log active implants\n",
    solution: "implants = [\"Sandevistan\", \"Kiroshi Optics\", \"Mantis Blades\"]\nprint(implants)",
    solutionRegex: [/implants\s*=\s*\[/, /print\s*\(\s*implants\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "CYBERWARE_SCAN",
    missionPrefix: "YOUR TASK",
    intro: "# Indexing Chrome: Zero-Based Access\n\nYour tactical HUD needs to fetch specific cyberware implants from your neural index. Pinpoint the first and main active installations to run self-diagnostics.",
    technical: "### Index Map:\n\n```text\nimplants = [\"Sandevistan\", \"Kiroshi Optics\", \"Mantis Blades\"]\n#          [0]             [1]              [2]\n```",
    example: "# Grab items from HUD neural implants list using index positions\nimplants = [\"Sandevistan\", \"Kiroshi Optics\", \"Mantis Blades\"]\n\n# Retrieve first implant (index 0)\np1 = implants[0]\nprint(p1)  # Output: Sandevistan\n\n# Retrieve third implant (index 2)\np3 = implants[2]\nprint(p3)  # Output: Mantis Blades",
    task: "1. Retrieve the first implant (index 0) from the `implants` list and store inside `p1`.\n2. Retrieve the third implant (index 2) and store inside `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "implants = [\"Sandevistan\", \"Kiroshi Optics\", \"Mantis Blades\"]\n# TODO: Extract indices 0 and 2\n",
    solution: "p1 = implants[0]\np3 = implants[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*implants\s*\[\s*0\s*\]/, /p3\s*=\s*implants\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "CHROME_UPGRADE",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value cyberware implant is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "active_implants = [\"Sandevistan\",\"Kiroshi Optics\",\"Mantis Blades\"]\nactive_implants.append(\"Gorilla Arms\")\n# active_implants is now updated!",
    task: "1. Append \"Gorilla Arms\" to the `active_implants` list.\n2. Print the final `active_implants` list to confirm installation.",
    baseCode: "active_implants = [\"Sandevistan\",\"Kiroshi Optics\",\"Mantis Blades\"]\n# TODO: Append value and print\n",
    solution: "active_implants.append(\"Gorilla Arms\")\nprint(active_implants)",
    solutionRegex: [/active_implants\.\s*append\s*\(\s*['"]Gorilla Arms['"]\s*\)/, /print\s*\(\s*active_implants\s*\)/]
  },
  "list-pop": {
    headerPrefix: "CHROME_PURGE",
    missionPrefix: "YOUR TASK",
    intro: "# Cyberware Emergency Purge: .pop()\n\nCorporate netrunners are tracing your cyberdeck's neural signature! You have some compromised implants installed that are leaking telemetry. Use `.pop()` to instantly purge the last rogue unit from your system hardware list before the Arasaka ICE locks down your deck!",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = compromised_cyberware.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `compromised_cyberware` list and store it inside a variable named `purged_implant`.\n2. Print `purged_implant` to output the purged token.",
    baseCode: "compromised_cyberware = [\"Subdermal Armor\",\"Tyrosine Injector\",\"Neural Link\"]\n# TODO: Pop last element and print\n",
    solution: "purged_implant = compromised_cyberware.pop()\nprint(purged_implant)",
    solutionRegex: [/purged_implant\s*=\s*compromised_cyberware\.\s*pop\s*\(\s*\)/, /print\s*\(\s*purged_implant\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "SECURE_COORDS",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Netrunner-Shielded Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of values, similar to a deck configuration list, but with one critical hacking distinction: **lists are mutable** (netrunners can swap active software or edit payload files on the fly), whereas **tuples are immutable** (their contents are permanently hardcoded like a burnt-in bios ROM chip and cannot be overridden by external injections or malicious processes).\n- **Syntax**: Declared using protective round parentheses `()` instead of square brackets `[]`.\n- **Speed & Security**: Because tuples are simpler and read-only, cyberdecks process them much faster and use them to protect deep system data like secure grid coordinates or encrypted gateway node addresses from accidental modification.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `cyber_coordinates` containing \"Megabuilding H10\" and the number `1047`.\n2. Print the `cyber_coordinates` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "cyber_coordinates = (\"Megabuilding H10\", 1047)\nprint(cyber_coordinates)",
    solutionRegex: [/cyber_coordinates\s*=\s*\(\s*['"]Megabuilding H10['"]\s*,\s*1047\s*\)/, /print\s*\(\s*cyber_coordinates\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "CORE_INTEGRITY",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `implant_upgrades` containing the single string \"Heal-on-kill\"\n2. Create a tuple named `firmware_version` containing the numbers `2` and `0`.\n3. Rewrite `implant_upgrades[0]` to be \"Heal-on-kill_v2\"\n4. Print both `implant_upgrades` and `firmware_version`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "implant_upgrades = [\"Heal-on-kill\" ]\nfirmware_version = (2, 0)\nimplant_upgrades[0] = \"Heal-on-kill_v2\"\nprint(implant_upgrades)\nprint(firmware_version)",
    solutionRegex: [/implant_upgrades\s*\[\s*0\s*\]\s*=\s*['"]Heal-on-kill_v2['"]/, /firmware_version\s*=\s*\(\s*2\s*,\s*0\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "DECK_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `cyberdeck_buffer` list.\n2. Store this result in a new variable named `quickhacks`.\n3. Print the resulting slice `quickhacks`.",
    baseCode: "cyberdeck_buffer = [\"ping\",\"overheat\",\"short_circuit\",\"synapse_burn\",\"system_reset\",\"cyberware_malfunction\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "quickhacks = cyberdeck_buffer[1:4]\nprint(quickhacks)",
    solutionRegex: [/quickhacks\s*=\s*cyberdeck_buffer\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*quickhacks\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "THERMAL_SCAN",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `thermals`.\n2. Store the result in a variable named `dangerous_temps`.\n3. Print `dangerous_temps`.",
    baseCode: "thermals = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "dangerous_temps = [t for t in thermals if t > 50]\nprint(dangerous_temps)",
    solutionRegex: [/dangerous_temps\s*=\s*\[\s*t\s+for\s+t\s+in\s+thermals\s+if\s+t\s*>\s*50\s*\]/, /print\s*\(\s*dangerous_temps\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "GRID_FILTER",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `subgrid_coordinates` list using a list comprehension.\n2. Store this filtered list in a new variable named `even_coordinates`.\n3. Print `even_coordinates`.",
    baseCode: "subgrid_coordinates = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "even_coordinates = [c for c in subgrid_coordinates if c % 2 == 0]\nprint(even_coordinates)",
    solutionRegex: [/even_coordinates\s*=\s*\[\s*c\s+for\s+c\s+in\s+subgrid_coordinates\s+if\s+c\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*even_coordinates\s*\)/]
  },
  "intro-input": {
    headerPrefix: "NET_HANDSHAKE",
    missionPrefix: "YOUR TASK",
    intro: "# Subnet Entry: User Input\n\nTo penetrate deeper into the Megacorp database, you need to prompt the netrunner for the specific subnet gate they wish to compromise.",
    technical: "### Capturing User Strings:\n- The `input()` function prompts the user for keyboard entry and blocks execution until they hit Enter.\n- It always returns the user\'s input as a clean, raw string.\n- **Rig Concatenation**: Glue netrunner coordinates or proxy credentials together using the `+` operator (e.g., `\"Cyber\" + \"Punk\"` becomes `\"CyberPunk\"`). Be sure to include spaces in your code strings, or the mainframe security firewall will trigger an alert on your merged commands!",
    example: "agent_name = input(\"Netrunner Alias: \")\nprint(\"Logged in as: \" + agent_name)",
    task: "1. Ask the user for their target with the prompt: **\"Enter target subnet: \"** and store it in a variable named `target_subnet`.\n2. Print **\"Breaching subnet: \"** concatenated with the user\'s `target_subnet` value.",
    baseCode: "# TODO: Capture subnet and print the breach message\n",
    solution: "target_subnet = input(\"Enter target subnet: \")\nprint(\"Breaching subnet: \" + target_subnet)",
    solutionRegex: [/target_subnet\s*=\s*input\s*\(\s*['\"]Enter target subnet: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Breaching subnet: \s*['\"]\s*\+\s*target_subnet\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "NET_LOG",
    missionPrefix: "LOG_GEN",
    intro: "# Netrunner Logs: Story Generator\n\nBypass Megacorp filters by writing a script that compiles an encryption breach log. Capture user inputs to generate the final breach report.",
    technical: "### Concatenating Data Streams:\nCombine variables and hardcoded string status blocks using the + operator. Keep spacing clean inside your string quotes.",
    example: "operator = \"Neo\"\nnetwork = \"Mainframe\"\nlog = operator + \" accessed \" + network\nprint(log)",
    task: "1. Ask the user for the runner alias with the prompt: **\"Enter runner alias: \"** and store it in `runner`.\n2. Ask the user for the corporate host with the prompt: **\"Enter corp host: \"** and store it in `host`.\n3. Ask the user for the quickhack tool with the prompt: **\"Enter quickhack: \"** and store it in `quickhack`.\n4. Combine into a variable named `log_entry` using the format: `runner + \" bypassed \" + host + \" with a \" + quickhack + \"!\"` and print `log_entry`.",
    baseCode: "# TODO: Capture cyberpunk inputs and print the breach log\n",
    solution: "runner = input(\"Enter runner alias: \")\nhost = input(\"Enter corp host: \")\nquickhack = input(\"Enter quickhack: \")\nlog_entry = runner + \" bypassed \" + host + \" with a \" + quickhack + \"!\"\nprint(log_entry)",
    solutionRegex: [/runner\s*=\s*input\s*\(\s*['"]Enter runner alias:\s*['"]\s*\)/, /host\s*=\s*input\s*\(\s*['"]Enter corp host:\s*['"]\s*\)/, /quickhack\s*=\s*input\s*\(\s*['"]Enter quickhack:\s*['"]\s*\)/, /log_entry\s*=\s*runner\s*\+\s*['"] bypassed ['"]\s*\+\s*host\s*\+\s*['"] with a ['"]\s*\+\s*quickhack\s*\+\s*['"]!['"]/, /print\s*\(\s*log_entry\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "GLITCH_LOG",
    missionPrefix: "NET_FRAGMENT",
    intro: "# Neural Glitch: Advanced Mad Libs\n\nThe mainframe is experiencing massive network packet fragmentation. Compile a high-priority subnet breach manifest with five real-time inputs to mask your neural signature.",
    technical: "### Complexity Management:\n- When using many variables, ensure your string quotes are balanced.\n- Adding `+` signs keeps the chain going.\n- Spaces must be placed inside the \"quotes\" of your fixed text to separate the variables.",
    example: "glitch = operator + \" injected \" + payload + \" into \" + mainframe + \" at \" + tier + \". System is \" + state + \"!\"\nprint(glitch)",
    task: "1. Ask the hacker for their alias with prompt: **\"Enter netrunner alias: \"** and store it in `netrunner`.\n2. Ask for the malware payload with prompt: **\"Enter malware payload: \"** and store it in `malware`.\n3. Ask for the targeted subnet with prompt: **\"Enter target subnet: \"** and store it in `subnet`.\n4. Ask for security tier with prompt: **\"Enter security tier: \"** and store it in `sec_level`.\n5. Ask for the system status with prompt: **\"Enter system status: \"** and store it in `system_status`.\n6. Combine into a variable named `glitch_report` and print using the exact format: `netrunner + \" injected \" + malware + \" into \" + subnet + \" at \" + sec_level + \". System is \" + system_status + \"!\"`.",
    baseCode: "# TODO: Build the advanced cyber glitch report\n",
    solution: "netrunner = input(\"Enter netrunner alias: \")\nmalware = input(\"Enter malware payload: \")\nsubnet = input(\"Enter target subnet: \")\nsec_level = input(\"Enter security tier: \")\nsystem_status = input(\"Enter system status: \")\nglitch_report = netrunner + \" injected \" + malware + \" into \" + subnet + \" at \" + sec_level + \". System is \" + system_status + \"!\"\nprint(glitch_report)",
    solutionRegex: [/netrunner\s*=\s*input\s*\(\s*['"]Enter netrunner alias:\s*['"]\s*\)/, /malware\s*=\s*input\s*\(\s*['"]Enter malware payload:\s*['"]\s*\)/, /subnet\s*=\s*input\s*\(\s*['"]Enter target subnet:\s*['"]\s*\)/, /sec_level\s*=\s*input\s*\(\s*['"]Enter security tier:\s*['"]\s*\)/, /system_status\s*=\s*input\s*\(\s*['"]Enter system status:\s*['"]\s*\)/, /print\s*\(\s*glitch_report\s*\)/]
  },
  "print-formatting": {
    title: "Identity Verification: F-Strings",
    headerPrefix: "IDENTITY_SCAN",
    missionPrefix: "FSTRING_VAL",
    intro: "# Neural Registry: F-Strings\n\nDirect memory concatenation is legacy netrunning. Modern deck firmware uses f-strings to dynamically bind neural signatures and operative security clearance levels instantly into the terminal display.",
    technical: "### F-String Protocol:\n- **Prefix**: Prepend an `f` before the opening quote (e.g., `f\'...\'`).\n- **Direct Injection**: Embed variables inside curly braces `{}` to inject them directly into your output.",
    example: "runner = \'V\'\nprint(f\'Access granted to {runner}\') # Outputs: Access granted to V",
    task: "### YOUR MISSION\n\nYou have `alias = \'V\'` and `level = 50`. Use an **f-string** to print: `Netrunner: V | Cyber Tier: 50`.",
    baseCode: "alias = \'V\'\nlevel = 50\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Embed {alias} and {level} inside the curly braces of your string."
    ],
    solution: "alias = \'V\'\nlevel = 50\nprint(f\'Netrunner: {alias} | Cyber Tier: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Netrunner:\s*\{alias\}\s*\|\s*Cyber\s*Tier:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Signal Routing: Advanced F-Strings",
    headerPrefix: "SIGNAL_GEN",
    missionPrefix: "AUTO_HEADER",
    intro: "# Neural Signals: Advanced F-Strings\n\nHigh-performance cyberdecks require real-time telemetry rendering. By using f-strings, you can perform inline math and string manipulation inside braces to format active network logs instantly.",
    technical: "### Inline Expressions:\n- **Inline Math**: Calculate metrics on-the-fly inside braces: `{x + y}`.\n- **String Methods**: Manipulate text cases instantly: `{text.upper()}`.\n- This keeps your netrunning terminal lightweight and easy to read.",
    example: "x, y = 5, 10\nprint(f'Active connections: {x + y}')",
    task: "### YOUR MISSION\n\n1. Prompt for node count with: **\"Enter node count: \"** and store it as an integer in `nodes`.\n2. Prompt for the subnet name with: **\"Enter subnet zone: \"** and store it in `subnet`.\n3. Use a single **f-string** to print: `Deploying {nodes} proxies to {subnet.upper()}...`.",
    baseCode: "# TODO: Use f-strings with math/methods\n",
    hints: [
      "Ask for nodes using int(input(\"Enter node count: \"))",
      "Ask for subnet using input(\"Enter subnet zone: \")",
      "Use {nodes} and {subnet.upper()} inside the f-string."
    ],
    solution: "nodes = int(input(\"Enter node count: \"))\nsubnet = input(\"Enter subnet zone: \")\nprint(f\"Deploying {nodes} proxies to {subnet.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{nodes\}\s*proxies\s*to\s*\{subnet\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Grid Calibration: Casting to Int",
    headerPrefix: "GRID_CALIB",
    missionPrefix: "INT_RECAST",
    intro: "# Grid Calibrations: Quantizing Inputs\\n\\nRaw external security data is fed into your cyberdeck as strings. To run precision diagnostic scripts, calculate active processes, or determine subnet sizes, you must recast this data into integers to unlock your deck\\'s arithmetic processor.",
    technical: "### Direct Integers Protocol:\\n- **Raw Input**: `input(\\\"Prompt\\\")` returns strings (text), which cannot be added or multiplied mathematically.\\n- **Recasting**: Wrap the input in `int()` to convert it: `ram = int(input(\\\"Prompt\\\"))`.",
    example: "connected_runners = int(input(\"Active users: \"))\ntotal_load = connected_runners + 5",
    task: "### YOUR MISSION\\n\\nRecast raw inputs to calculate deck operations:\\n1. Prompt for active cpu cores with **\\\"Enter active cyberdeck CPU cores: \\\"** and store it as an integer in `ram_cores`.\\n2. Prompt for security cores with **\\\"Enter intruder detection system cores: \\\"** and store it as an integer in `security_cores`.\\n3. Calculate and print the combined sum of both core counts to verify available node clusters.",
    baseCode: "# TODO: Recast deck inputs and sum them\\n",
    hints: [
      "Use ram_cores = int(input(\\\"Enter active cyberdeck CPU cores: \\\"))",
      "Use security_cores = int(input(\\\"Enter intruder detection system cores: \\\"))",
      "Print the sum of the two variables, e.g., print(ram_cores + security_cores)"
    ],
    solution: "ram_cores = int(input(\\\"Enter active cyberdeck CPU cores: \\\"))\\nsecurity_cores = int(input(\\\"Enter intruder detection system cores: \\\"))\\nprint(ram_cores + security_cores)",
    solutionRegex: [/ram_cores\s*=\s*int\s*\(\s*input/, /security_cores\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Grid Frequencies: Casting to Float",
    headerPrefix: "SIGNAL_CALIB",
    missionPrefix: "FLOAT_TUNE",
    intro: "# Signal Synthesis: Parsing Decimal Floats\\n\\nSubnet telemetry requires high-precision float adjustments. Raw deck sensory logs arrive as string data. To bypass military ICE, you must parse signal parameters into floats to compute exact frequency multiples.",
    technical: "### Cyberdeck Float Diagnostics:\\n- **What is a Float?**: While integers represent discrete hardware metrics (like `12` RAM gigabytes), a `float` represents a decimal fractional value (e.g., `14.5` kHz signal frequency or `1.35` modulation coefficient) for high-precision hacking.\\n- **String Telemetry conversion**: Netrunner prompts obtained via `input()` enter your terminal as raw text strings. Pass them into the `float()` keyword to unlock decimal logic, e.g., `tuned = float(input())`.\\n- **The Deck Core Meltdown (ValueError)**: Attempting to process a decimal frequency like `\"14.5\"` with `int()` will instantly trigger a severe `ValueError` crash, burning out your deck circuitry!",
    example: "signal_gain = float(input(\"Base gain: \"))\nnoise_floor = signal_gain * 0.25",
    task: "### YOUR MISSION\\n\\nTune cyberdeck signal frequencies:\\n1. Prompt for active neural frequency with **\\\"Enter neural frequency signal: \\\"** and store it as a float in `frequency`.\\n2. Prompt for deck modulator with **\\\"Enter deck modulator: \\\"** and store it as a float in `modulator`.\\n3. Calculate and print the result of multiplying both variables to lock in the signal bypass.",
    baseCode: "# TODO: Calibrate netrunner decimals\\n",
    hints: [
      "Use frequency = float(input(\"Enter neural frequency signal: \"))",
      "Use modulator = float(input(\"Enter deck modulator: \"))",
      "Multiply frequency and modulator, and print the output."
    ],
    solution: "frequency = float(input(\"Enter neural frequency signal: \"))\nmodulator = float(input(\"Enter deck modulator: \"))\nprint(frequency * modulator)",
    solutionRegex: [/frequency\s*=\s*float\s*\(\s*input/, /modulator\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Logical Isolation: Indentation Blocks",
    headerPrefix: "CORE_COMPILER",
    missionPrefix: "GATE_SHIELD",
    intro: "# Cyberdeck Architecture: Gate Isolation\\n\\nTo bypass Arasaka security grids, structural formatting is micro-managed. In Python, code blocks are defined by indentation alone. A misaligned cyber-logic line will trigger terminal feedback and alert corporate watchdogs.",
    technical: "### The Nested Colon Rule:\\nWhenever you see a line ending in a **colon** (`:`), a structural nested layer begins. The lines that follow **MUST** carry an offset (exactly 4 spaces) to mark them as belonging to that context.\\n\\n### ICE Backlash:\\nFailing to align your gates correctly triggers an `IndentationError` - frying your deck core.",
    example: "if True:\\n    print(\\\"Gateway unlocked\\\")  # Indented block",
    task: "### YOUR MISSION\\n\\nSecure the gate credentials:\\n1. Write an `if True:` logic gate.\\n2. On the next line, indenting by exactly 4 spaces, print **\\\"Accessing...\\\"** to slide into the subnet.",
    baseCode: "# TODO: Write an if statement with 4 spaces of indentation\\n",
    hints: [
      "Begin with if True: followed by a colon",
      "Indent the next line with exactly 4 spaces (or press Tab)",
      "Call print(\\\"Accessing...\\\") inside the block"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Subnet Nesting: Deep Mainframe ICE",
    headerPrefix: "CORE_COMPILER",
    missionPrefix: "DEEP_DECRYPT",
    intro: "# Mainframe Subnets: Layered Authentication\\n\\nTo fully breach the outer corp-vault, you must cascade authentication parameters. Python interprets code execution blocks purely by their depth of alignment. One misaligned pixel in your nesting depth triggers immediate watchdog alarm routines.",
    technical: "### Stacking Logical Gates:\\n- **Level 1**: An outer block initiated by `if True:` starts with 4 spaces of indentation.\\n- **Level 2**: An inner nested block starting with `if True:` under that requires **8 spaces** of total baseline offset.\\n- **Logic Check**: Each statement requires its own terminating colon (`:`) and nested indentation block.",
    example: "if True:\\n    print(\"Level 1 (4 spaces)\")\\n    if True:\\n        print(\"Level 2 (8 spaces total)\")",
    task: "### YOUR MISSION\\n\\nNavigate the deepest security sub-chambers of the cyberdeck:\\n1. Construct the outer gateway block with **`if True:`**.\\n2. Nest an inner validation checkpoint under it with a secondary **`if True:`** indented by exactly 4 spaces.\\n3. On the inner sub-line, indented by exactly 8 spaces, print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Nest your cyberlock gates cleanly\\n",
    hints: [
      "Level 1: Start with if True: on line 1.",
      "Level 2: Use 4 spaces of indentation for the second if True: on line 2.",
      "Level 3: Use 8 spaces of indentation to print \"CORE ACCESS GRANTED\" on line 3."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "SECURITY_TURRET",
    missionPrefix: "ICE_SCAN",
    intro: "# Hacking the Network: If Statements\n\nYou're at the terminal. Use an if statement to check if the security ICE is vulnerable before attempting to gain root access.",
    task: "If `ice_vulnerable` is `True`, print `\"ROOT ACCESS ACQUIRED\"`.",
    baseCode: "ice_vulnerable = True\n# TODO: Scan for ICE breach\n",
    solution: "ice_vulnerable = True\nif ice_vulnerable:\n    print(\"ROOT ACCESS ACQUIRED\")",
    solutionRegex: [/if\s+ice_vulnerable/, /print\s*\(\s*['\"]ROOT ACCESS ACQUIRED['\"]\s*\)/]
  },
  "control-else": {
    title: "The Secondary Protocol: Else",
    headerPrefix: "GRID_DEFENSE",
    missionPrefix: "ACCESS_FAILSAFE",
    intro: "# Alternative Execution: If/Else\\n\\nYour breach attempt on Arasaka's perimeter firewall is in progress. A basic conditional gate allows handling a positive match, but security grids require an alternative route when key access fails. Use `else` to trigger sub-routine alerts or stealth procedures before ICE traps your connection.",
    technical: "### Else Branch Mechanics:\\n- The `else` keyword does not take a custom conditional evaluation block.\\n- It must be placed at the exact same vertical indentation level as the parent `if` statement.\\n- The `else` statement must also terminate with a colon (`:`).",
    example: "if user_valid:\\n    print(\\\"Authorized\\\")\\nelse:\\n    print(\\\"Locked\\\")",
    task: "### YOUR MISSION\\n\\nVerify security access keys:\\n1. Write an `if/else` structure evaluating `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Evaluate key_valid with if/else\\n",
    hints: [
      "Use if key_valid: ending with a colon.",
      "Indent the next line and print \\\"ACCESS GRANTED\\\".",
      "Bring the indentation back to the start and write else: with a colon.",
      "Indent under else: and print \\\"ALARM TRIGGERED\\\"."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]\s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Tiered Subnets: Elif Clearance",
    headerPrefix: "SUBNET_SCAN",
    missionPrefix: "ROUTE_ELIF",
    intro: "# Firewall Access Matrix: Multi-Tier Clearance\\n\\nSome military Arasaka subnets carry several security grades. A simple positive/negative gate is not enough; you must evaluate specific clearance levels in sequence using `elif`. Ensure your requests are triaged correctly before a black-ICE lockdown is deployed.",
    technical: "### Cascading Checks with Elif:\\n- `elif` stands for 'else if' in Python.\\n- Use `elif` to check secondary conditions only when previous `if` and `elif` checks resolve as `False`.\\n- Keep all blocks indented cleanly inside their respective parent statements.",
    example: "if user == \"Admin\":\\n    print(\"Root access\")\\nelif user == \"Staff\":\\n    print(\"Standard access\")\\nelse:\\n    print(\"Intruder alarm\")",
    task: "### YOUR MISSION\\n\\nDetermine the netrunner access permissions:\\n1. Form an `if/elif/else` chain evaluating the value of `clearance`.\\n2. If `clearance` is exactly `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Else, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Write if/elif/else clearance check\\n",
    hints: [
      "Begin by checking if clearance == 1:",
      "On the next branch, use elif clearance <= 5:",
      "Conclude the block with else: to flag unauthorized attempts"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Hype Protocol: ICE Response",
    headerPrefix: "OS_REACTION",
    missionPrefix: "STENCIL_LOG",
    intro: "# Media Coverup: Netrunner Stealth\n\nYour breach sequence left digital footprint fragments. An Arasaka news hacker is tracking your deck signature. If corporate security detected your deck, purge the deck memory to stay anonymous. Else, report a ghost protocol handshake.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"EMERGENCY_DECK_PURGE\")\nelse:\n    print(\"Ghost protocol active.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` response check:\n1. If `is_detected`, print **`\"EMERGENCY_DECK_PURGE\"`** to mask your neural signature.\n2. Else, print **`\"Ghost protocol active.\"`** and slip out.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"EMERGENCY_DECK_PURGE\".",
      "Add else: at the base level and print \"Ghost protocol active.\""
    ],
    solution: "if is_detected:\n    print(\"EMERGENCY_DECK_PURGE\")\nelse:\n    print(\"Ghost protocol active.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]EMERGENCY_DECK_PURGE['"]\s*\)/, /print\s*\(\s*['"]Ghost\s+protocol\s+active\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Chromed Status: Reputation",
    headerPrefix: "CHROME_CORE",
    missionPrefix: "RANK_AWARD",
    intro: "# Neural Load: System Reputation\n\nAward a special rank to an operative based on their chrome load capability. High-level netrunners with optimal hardware levels are inducted into the elite Militech Sector.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to check the `chrome_rating` level.\n- **Assignment**: Update the `tier` variable inside the logic branches so the final value reflects the current system state.",
    example: "if power > 9000:\n    tier = \"Militech\"\nelse:\n    tier = \"BudgetArms\"",
    task: "### YOUR MISSION\n\nConfigure identity ratings:\n1. If `chrome_rating > 9000`, set `tier` to **`\"Militech\"`**.\n2. Else, set `tier` to **`\"BudgetArms\"`**.\n3. Finally, print the assigned tier with `print(tier)`.",
    baseCode: "chrome_rating = 9001\ntier = \"\"\n# TODO: Generate rank and print it\n",
    hints: [
      "Assign the tier strings inside the if/else blocks.",
      "Make sure you print(tier) at the very end, outside the indentation."
    ],
    solution: "chrome_rating = 9001\nif chrome_rating > 9000:\n    tier = \"Militech\"\nelse:\n    tier = \"BudgetArms\"\nprint(tier)",
    solutionRegex: [/if\s+chrome_rating\s*>\s*9000\s*:/, /tier\s*=\s*['"]Militech['"]/, /tier\s*=\s*['"]BudgetArms['"]/, /print\s*\(\s*tier\s*\)/]
  },
  "control-adventure": {
    title: "Grid Infiltration: Subgrid Choice",
    headerPrefix: "ACCESS_ROUTE",
    missionPrefix: "ICE_SPLIT",
    intro: "# Net Breach Path: Choose Your Vault\n\nYou have bypassed the central firewall gateway. Two databanks lay ahead: \"1\" (Main Ledger Core) or \"2\" (System Backdoor). Select carefully; any mistake triggers a net-lockout.",
    technical: "### Branching Routes:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Approaching Main Core...\")",
    task: "### YOUR MISSION\n\nEvaluate the target network access vector:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Construct path choices\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Grid Protocol: Host Allocation",
    headerPrefix: "NET_ROUTING",
    missionPrefix: "ICE_DISPATCH",
    intro: "# Grid Security: Packet Filtration\n\nThe subnet receiver must route connection packets based on access privilege level: \"admin\", \"runner\", or \"guest\". Clean data flows avoid corp scans.",
    technical: "### Cascading Checks:\n- **Sequential**: Checks packet protocols inside the socket in order.\n- **Exclusive**: The first matching privilege profile claims the thread execution.\n- **Exhaustive**: An `else` block locks the gate for unknown deck signals.",
    example: "if packet == \"admin\":\n    print(\"Root access.\")\nelif packet == \"runner\":\n    print(\"Decrypted.\")",
    task: "### YOUR MISSION\n\nHandle connection routing for variable `packet`:\n1. If `packet` is **`\"admin\"`**, print **`\"Root access.\"`**\n2. Elif `packet` is **`\"runner\"`**, print **`\"Decrypted.\"`**\n3. Elif `packet` is **`\"guest\"`**, print **`\"Sandboxed.\"`**\n4. Else, print **`\"System lockdown.\"`**",
    baseCode: "packet = \"runner\"\n# TODO: Route host packet layers\n",
    hints: [
      "Implement an if-elif-elif-else cascade.",
      "Match \"admin\", \"runner\", and \"guest\" exactly."
    ],
    solution: "if packet == \"admin\":\n    print(\"Root access.\")\nelif packet == \"runner\":\n    print(\"Decrypted.\")\nelif packet == \"guest\":\n    print(\"Sandboxed.\")\nelse:\n    print(\"System lockdown.\")",
    solutionRegex: [/if\s+packet\s*==\s*['"]admin['"]\s*:/, /elif\s+packet\s*==\s*['"]runner['"]\s*:/, /elif\s+packet\s*==\s*['"]guest['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Root\s+access\.['"]\s*\)/, /print\s*\(\s*['"]Decrypted\.['"]\s*\)/, /print\s*\(\s*['"]Sandboxed\.['"]\s*\)/, /print\s*\(\s*['"]System\s+lockdown\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Grid Scan: Host Sweeper",
    headerPrefix: "GRID_SCAN",
    missionPrefix: "PORT_INDEX",
    intro: "# Subnet Sweeping: Automation\n\nManual node inspection is too slow for a fast-paced hack. Program an automated diagnostic deck scan to verify connection ports sequentially.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### The range() Function:\n- **Generation**: `range(n)` generates a sequence of numbers from `0` up to (but not including) `n`.\n- **Iteration**: The loop variable changes on each loop cycle, allowing automated checks.\n- **Structure**: Indent the print block by 4 spaces inside the loop.",
    example: "for i in range(3):\n    print(f\"Node {i+1} bypassed!\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Subnet {i+1} scanned\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write your for loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Subnet {i+1} scanned"
    ],
    solution: "for i in range(5):\n    print(f\"Subnet {i+1} scanned\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Byte Stream: Buffer Iterator",
    headerPrefix: "BUFFER_FLOW",
    missionPrefix: "BYTE_SCAN",
    intro: "# Stream Analysis: Cyberware Iteration\n\nIn the cyberware subnet, memory buffers are processed as streams of single-byte character packets. This allows you to inspect safety nodes one step at a time.",
    technical: "### Stream Traversal:\n- **Iterative Variable**: The loop variable (like `byte`) represents each char/byte sequential block.\n- **Automation**: The `for` loop terminates naturally when the memory buffer runs dry.",
    example: "for byte in \"DECK\":\n    print(byte)",
    task: "### YOUR MISSION\n\nYou've captured an encrypted cyberware memory `buffer`: `\"CHROME\"`. Use a `for` loop to iterate through every character `byte` in the variable `buffer` and `print` it.",
    baseCode: "buffer = \"CHROME\"\n# TODO: Walk the memory buffer\n",
    hints: [
      "Use 'for byte in buffer:' to read characters sequentially.",
      "Call 'print(byte)' inside the indented loop body."
    ],
    solution: "buffer = \"CHROME\"\nfor byte in buffer:\n    print(byte)",
    solutionRegex: [/for\s+byte\s+in\s+buffer/, /print\s*\(\s*byte\s*\)/]
  },
  "loop-list-audit": {
    title: "Subnet Scan: Daemon Audit",
    headerPrefix: "DECK_AUDIT",
    missionPrefix: "DAEMON_FIND",
    intro: "# Subnet Audit: Daemon Compilation\n\nYou've breached a corporate mainframe and need to find all compilation daemons. Filter through the file nodes to locate the ones ending in `.dm`.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"overload.dm\"`, then `\"logs.txt\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".dm\")` asks: *\"Does the text inside `f` end with `.dm`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".dm\"):\n          # This runs ONLY if the current file ends with .dm!\n  ```",
    example: "daemons = [\"sniff.exe\", \"overdrive.dm\"]\nfor d in daemons:\n    if \".dm\" in d:\n        print(d)",
    task: "### YOUR MISSION\n\nScan `discovered_files`. If a file ends with `\".dm\"`, `print` the message: `f\"Compiling: {f}\"`.",
    baseCode: "discovered_files = [\"overload.dm\", \"logs.txt\", \"cyber.dm\", \"id.cfg\"]\n# TODO: Walk network nodes and compile .dm programs\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".dm\"):",
      "Print f'Compiling: {f}'"
    ],
    solution: "discovered_files = [\"overload.dm\", \"logs.txt\", \"cyber.dm\", \"id.cfg\"]\nfor f in discovered_files:\n    if f.endswith(\".dm\"):\n        print(f\"Compiling: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.dm['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Mainframe Scan: Nested Ports",
    headerPrefix: "PORT_SCANNER",
    missionPrefix: "ACCESS_MATRIX",
    intro: "# Subnet Cracking: Node & Port Matrix\n\nThe target mainframe is structured as a grid. To bypass its firewall, you must scan all ports (Y) across every subnet node (X).",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 mainframe scan with variable `x` (outer loop representing Nodes) and variable `y` (inner loop representing Ports) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Node 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Port 0) -> Output: `Hack - Node: 0, Port: 0`\n     - `y = 1` (Port 1) -> Output: `Hack - Node: 0, Port: 1`\n     - `y = 2` (Port 2) -> Output: `Hack - Node: 0, Port: 2`\n2. **Outer loop moves to next step**: `x = 1` (Node 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Port 0) -> Output: `Hack - Node: 1, Port: 0`\n     - `y = 1` (Port 1) -> Output: `Hack - Node: 1, Port: 1`\n     - `y = 2` (Port 2) -> Output: `Hack - Node: 1, Port: 2`\n3. **Outer loop moves to last step**: `x = 2` (Node 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Port 0) -> Output: `Hack - Node: 2, Port: 0`\n     - `y = 1` (Port 1) -> Output: `Hack - Node: 2, Port: 1`\n     - `y = 2` (Port 2) -> Output: `Hack - Node: 2, Port: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for node in range(2):\n    for port in range(2):\n        print(f\"Node: {node}, Port: {port}\")",
    task: "### YOUR MISSION\n\nScan a **3x3 subnet**. Use nested loops with `range(3)` for `x` (node) and `y` (port).\n\nInside the inner loop, `print` the telemetry in this exact format: `f\"Hack - Node: {x}, Port: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Hack the mainframe ports\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Hack - Node: {x}, Port: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Hack - Node: {x}, Port: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "ICE Breaker: Trace Interrupt",
    headerPrefix: "DECK_OVERRIDE",
    missionPrefix: "SIGNAL_KILL",
    intro: "# Decryption: Manual Protocol Exits\n\nIf corporate security nodes start trace protocols on your cyberdeck, you must execute an immediate disconnect. Python uses the `break` command to force quit cycles.",
    technical: "### Emergency Disconnect:\n- **Immediate Terminate**: Exit any active sub-program logic grid instantaneously.\n- **Trace Mitigation**: Wrap safety audits inside localized conditions.",
    example: "for trace in range(10):\n    if trace == 5:\n        break\n    print(trace)",
    task: "### YOUR MISSION\n\nRun an exploit sweep across `range(10)` nodes. If the corporate response trace index `i` hits `7`, invoke an emergency `break` to disconnect. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Scan node logs with break safety\n",
    hints: [
      "Inject 'for i in range(10):'",
      "Add safety boundary 'if i == 7:'",
      "Trigger 'break' inside, then call print(i)"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Persistent Pulse: Loop Injection",
    headerPrefix: "DECK_CYCLE",
    missionPrefix: "PULSE_SYS",
    intro: "# Cyberdeck Cycles: While Loops\n\nWhile `for` loops iterate over a specific sequence, `while` loops keep running **as long as a condition remains True**. Use this to keep your decryption pulse active and monitor power levels during a long-range hack.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power the cyberdeck.\n3. `print` the current `battery` level inside the loop."
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
  },
  "oop-intro": {
    headerPrefix: "NET_SYS_GEN",
    missionPrefix: "RUNNER_TEMPLATE",
    intro: "# Digital Blueprints: Classes\n\nChoom, we need a unified system blueprint for all the Netrunners in Night City. Instead of manually writing variables for health, cyberware slots, or eurodollars for every single mercenary, we construct a template blueprint in Python called a **Class**.",
    task: "### YOUR MISSION\n\nDefine a base class named `Netrunner`. Use `pass` inside its block under proper indentation.",
    baseCode: "# TODO: Establish base class Netrunner\n",
    hints: [
      "Use 'class Netrunner:' followed by an indented 'pass'.",
      "Watch your indentation and capitalization!"
    ],
    solution: "class Netrunner:\n    pass",
    solutionRegex: [/class\s+Netrunner/, /pass/]
  },
  "oop-init": {
    headerPrefix: "CHIP_ONBOARD",
    missionPrefix: "MEM_SPEC",
    intro: "# Mercenary Onboarding: Constructors\n\nEvery time a new runner connects to the local subnet, we need to load their custom alias. We use Python's constructor method `__init__` to assign their handle automatically when their runner object boots up.",
    task: "### YOUR MISSION\n\nInside `Netrunner`, define the constructor method `__init__` which accepts `self` and a parameter `name`. Assign the `name` value to `self.name`.",
    baseCode: "class Netrunner:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Define the constructor using 'def __init__(self, name):'.",
      "Save the name parameter using 'self.name = name'."
    ],
    solution: "class Netrunner:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "MAIN_IMPLANT",
    missionPrefix: "HACK_RUN",
    intro: "# Cyberware Abilities: Methods\n\nA runner in Night City is useless without cyberware. Functions declared inside a class are known as **Methods**. We will define a custom hacking method so any instantiated runner can upload a quickhack to nearby targets!",
    task: "### YOUR MISSION\n\nAdd a `hack` method to `Netrunner` that `print`s \"System hacked\".",
    baseCode: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define hack method\n",
    hints: [
      "Define 'def hack(self):' as part of the class.",
      "Use print('System hacked') inside the method body."
    ],
    solution: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n    def hack(self):\n        print(\"System hacked\")",
    solutionRegex: [/def\s+hack\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]System hacked['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "NEURAL_LINK",
    missionPrefix: "STATUS_CHECK",
    intro: "# Isolated Cyber Brains: Independent Object State\n\nWhen multiple mercs are running a heist, frying one Arasaka guard's neural adapter shouldn't overheat your own team's gear! Each Netrunner tracks their own mental strain, RAM capacity, and status independently using instance variables.",
    task: "### YOUR MISSION\n\n1. In `__init__`, add a `connection_state` instance variable defaulted to the string \"Standby\".\n2. Create a method `connect` that updates the runner's `self.connection_state` to the string \"Active\".",
    baseCode: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add connection_state default\n    # TODO: Add connect method\n",
    hints: [
      "Inside __init__, initialise 'self.connection_state = \"Standby\"'.",
      "Under 'def connect(self):', set 'self.connection_state = \"Active\"'."
    ],
    solution: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n        self.connection_state = \"Standby\"\n    def connect(self):\n        self.connection_state = \"Active\"",
    solutionRegex: [/self\.connection_state\s*=\s*['"]Standby['"]/, /def\s+connect/, /self\.connection_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "SUBNET_P2P",
    missionPrefix: "COMM_LINK",
    intro: "# Peer-to-Peer Interlinks: Object Interaction\n\nNo merc is an island in the net. To coordinate combined operations, nodes must communicate. In Python, objects can interact with one another by receiving other instances of a class as parameters.",
    task: "### YOUR MISSION\n\nAdd a `scan_runner` method to `Netrunner` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Scanning: {other.name}\"`.",
    baseCode: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add scan_runner method\n",
    hints: [
      "Define 'def scan_runner(self, other):' inside the class.",
      "Access other's name using other.name inside an f-string."
    ],
    solution: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n    def scan_runner(self, other):\n        print(f\"Scanning: {other.name}\")",
    solutionRegex: [/def\s+scan_runner\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "CHROME_UPGRADE",
    missionPrefix: "CYBER_SPECIAL",
    intro: "# Specialized Augmentations: Inheritance\n\nAn ordinary runner can probe light networks, but a specialized Cyberpunk can interface with heavy battle rigs! Using Inheritance, we can inherit all base traits from `Netrunner` and extend them to build a specialized `CyberCombat` subclass.",
    task: "### YOUR MISSION\n\nCreate a class `CyberCombat` that inherits from `Netrunner`. Give it an `activate_sandevistan` method that `print`s \"Sandevistan active\".",
    baseCode: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create CyberCombat subclass inheriting from Netrunner\n",
    hints: [
      "Use 'class CyberCombat(Netrunner):' to declare inheritance.",
      "Define the activate_sandevistan method and print the success trigger."
    ],
    solution: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n\nclass CyberCombat(Netrunner):\n    def activate_sandevistan(self):\n        print(\"Sandevistan active\")",
    solutionRegex: [/class\s+CyberCombat\s*\(\s*Netrunner\s*\)\s*:/, /def\s+activate_sandevistan/, /print\s*\(\s*['"]Sandevistan active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "KOSHI_HUD",
    missionPrefix: "USER_TAG",
    intro: "# HUD Introductions: Custom Str Method\n\nIf we try to print an active object instance directly in a terminal script, Python returns a messy hexadecimal address. Let's override the special double-underscore `__str__` method to render a tactical cyberpunk grid banner instead.",
    task: "### YOUR MISSION\n\nIn `Netrunner`, add the custom method `__str__` that returns: `f\"Netrunner {self.name}\"`.",
    baseCode: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define 'def __str__(self):' inside the Netrunner class.",
      "Return the formatted f-string: f'Netrunner {self.name}' instead of printing it."
    ],
    solution: "class Netrunner:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Netrunner {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Netrunner.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "NETWATCH_SYS",
    missionPrefix: "GLOBAL_PROTOCOL",
    intro: "# Night City Subnets: Shared Class Variables\n\nEvery runner in our system operates under unique aliases and RAM status constraints, but they *all* jack into the same database layer! We can use a Class Variable to store shared constants globally for all class instances, optimizing precious hardware memory.",
    task: "### YOUR MISSION\n\n1. Define a class variable `city` set to \"Night City\" inside `Netrunner` before other initialisers.\n2. `print` the class variable using `Netrunner.city`.",
    baseCode: "class Netrunner:\n    # TODO: Define class variable 'city'\n    pass\n# TODO: Print Netrunner.city\n",
    hints: [
      "Place 'city = \"Night City\"' immediately under the class declaration.",
      "Print Netrunner.city outside the class boundaries directly."
    ],
    solution: "class Netrunner:\n    city = \"Night City\"\n\nprint(Netrunner.city)",
    solutionRegex: [/city\s*=\s*['"]Night City['"]/, /print\s*\(\s*Netrunner\.city\s*\)/]
  }
};