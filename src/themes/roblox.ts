export const ROBLOX_THEME: any = {
  "intro-print": {
    headerPrefix: "STUDIO_OUTPUT",
    missionPrefix: "SCRIPT_BOOT",
    intro: "# Joining the Server: print()\n\nYou just opened Roblox Studio to build the next viral obby! First, boot up the game server console by printing a welcome message for your players.",
    task: "Use `print()` to display: `\"Welcome to my Roblox Game!\"`",
    baseCode: "# TODO: Initialise server output\n",
    solution: "print(\"Welcome to my Roblox Game!\")",
    solutionRegex: [/print\s*\(\s*['\"]Welcome to my Roblox Game!['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "LUA_STYLE",
    missionPrefix: "LOWERCASE_BLOCKS",
    intro: "# Script Conventions: Lowercase Roblox Blocks\n\nWhen writing custom mini-games or obby checkpoints, maintaining standard coding styles is crucial. Commands and variables must be set up in lowercase, or your game servers will throw compile-time script glitches! Maintain clean lowercase structures.",
    task: "Define a lowercase variable named `game_passes` and set it to `150` to inventory player purchases. Print it with `print()` to log the transaction. Everything must be lowercase!",
    baseCode: "# TODO: Establish game_passes inventory variable and print it\n",
    solution: "game_passes = 150\nprint(game_passes)",
    solutionRegex: [/game_passes\s*=\s*150/, /print\s*\(\s*game_passes\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "STUDIO_SEC",
    missionPrefix: "DEV_NOTE",
    intro: "# Code Documentation: Comments\n\nOther developers might modify your scripts. Use comments to leave clear instructions in your workspace without breaking the game code.",
    task: "Write a comment `# Script targets kill-bricks` and then `print(\"Loading script...\")`",
    baseCode: "# TODO: Write script notes\n",
    solution: "# Script targets kill-bricks\nprint(\"Loading script...\")",
    solutionRegex: [/#.*Script targets kill-bricks/, /print\s*\(\s*['\"]Loading script\.\.\.['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "STUDIO_PART",
    missionPrefix: "PART_METADATA",
    intro: "# Workspace Tagging: Inline Comments\n\nIn Roblox Studio, we constantly configure physical objects and part values. Add quick inline notes directly next to property assignments to keep your workspace clear.",
    task: "Initialise `part_density` to `15`. On the same line, add an inline comment `# Custom physics`.",
    baseCode: "# TODO: Define part parameter with inline comment\n",
    solution: "part_density = 15 # Custom physics",
    solutionRegex: [/part_density\s*=\s*15/, /#.*Custom physics/]
  },
  "intro-vars": {
    headerPrefix: "BADGE_STORE",
    missionPrefix: "PLAYER_INVENT",
    intro: "# Inventory Management: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled storage container** in Roblox Studio! You give the container a name (like `max_players`), store player counts or item stock inside, and read them when coding scripts for your obby.\n\nBuilding multiplayer arenas requires managing active player counts and item stock. Let's use variables to log active players and maximum servers.",
    task: "Create `max_players` set to `64` and `server_capacity` set to `1500`.",
    baseCode: "# TODO: Match workspace resources\n",
    solution: "max_players = 64\nserver_capacity = 1500",
    solutionRegex: [/max_players\s*=\s*64/, /server_capacity\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "BRICK_TWEEN",
    missionPrefix: "SCALE_UPDATE",
    intro: "# Size Tweens: Reassignment\n\nYou've just scaled up a neon spawn block. Re-assign your scale variable to dynamically apply the new dimension on the grid.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "stud_scale = 1.0\nprint(stud_scale)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\nstud_scale = 2.1\nprint(stud_scale)  # Output: 2.1",
    task: "Initialise `stud_scale` as `1.0`. Then update `stud_scale` to `2.1`. Print it.",
    baseCode: "stud_scale = 1.0\n# TODO: Scale to 2.1\n",
    solution: "stud_scale = 1.0\nstud_scale = 2.1\nprint(stud_scale)",
    solutionRegex: [/stud_scale\s*=\s*1\.0/, /stud_scale\s*=\s*2\.1/, /print\s*\(\s*stud_scale\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "STUDIO_CONSOLE",
    missionPrefix: "USER_CAPTURE",
    intro: "# Echo Request: Server Chat Stream\n\nWait for the Roblox Game Server to push an incoming player event! Before their chat message bypasses your Studio output window, prepare an empty placeholder variable in your script to catch and print the player's username.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `roblox_data = \"\"` as a placeholder, we allocate space in memory. Then, running `roblox_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the player username dynamically so you can see it change!",
    example: "roblox_data = \"\"  # Memory slot is allocated and empty\nroblox_data = input(\"Enter joining player: \")  # Line 2 updates the empty string with your input!\nprint(\"Welcoming: \" + roblox_data)",
    task: "1. Initialize `roblox_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter joining player: \")` to populate it.\n3. Print `\"Welcoming: \" + roblox_data`.",
    baseCode: "# TODO: Initialize empty chat buffer, capture, and print\n",
    hints: [
      "Use roblox_data = \"\" to prepare the script.",
      "Use roblox_data = input(\"Enter joining player: \") to capture the name.",
      "Print \"Welcoming: \" combined with the roblox_data variable."
    ],
    solution: "roblox_data = \"\"\nroblox_data = input(\"Enter joining player: \")\nprint(\"Welcoming: \" + robblox_data)",
    solutionRegex: [/roblox_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "CURRENCY_SYNC",
    missionPrefix: "BANK_INIT",
    intro: "# Economic Update: Multi-Assignment\n\nYour game is booming! Initialise the player's starting Robux and Tix amounts at once to prevent any glitches in the merchant shop.",
    task: "Assign `robux` set to `500` and `tix` set to `1000` in one line.",
    baseCode: "# TODO: Fund account\n",
    solution: "robux, tix = 500, 1000",
    solutionRegex: [/robux\s*,\s*tix\s*=\s*500\s*,\s*1000/]
  },
  "data-strings": {
    headerPrefix: "WORKSPACE_SYS",
    missionPrefix: "BLOCK_MODEL",
    intro: "# Asset Library: Strings\n\nRoblox parts are organized with unique text names. Assign a string representing your newly generated block model type.",
    task: "Create a variable `part_type` set to `\"SpawnPlate\"`. Print it.",
    baseCode: "# TODO: Define block assets\n",
    solution: "part_type = \"SpawnPlate\"\nprint(part_type)",
    solutionRegex: [/part_type\s*=\s*['\"]SpawnPlate['\"]/]
  },
  "data-booleans": {
    headerPrefix: "PHYSICS_RIG",
    missionPrefix: "PART_ANCHOR",
    intro: "# Block Properties: Booleans\n\nShould your obby floor fall under players, or should it float in space? Control part coordinates using booleans.",
    task: "Set `is_anchored` to `True` and `can_collide` to `False`.",
    baseCode: "# TODO: Apply physics properties\n",
    solution: "is_anchored = True\ncan_collide = False",
    solutionRegex: [/is_anchored\s*=\s*True/, /can_collide\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "DEV_STATS",
    missionPrefix: "VISIT_COUNT",
    intro: "# Game Popularity: Math\n\nYour Obby is going viral! Calculate the total number of visits from mobile and PC users to see if you qualify for the Front Page rewards program.",
    task: "Create `mobile_visits` as `1250` and `pc_visits` as `800`. Store the sum in `total_visits` and print it.",
    baseCode: "# TODO: Tally platform analytics\n",
    solution: "mobile_visits = 1250\npc_visits = 800\ntotal_visits = mobile_visits + pc_visits\nprint(total_visits)",
    solutionRegex: [/total_visits\s*=\s*mobile_visits\s*\+\s*pc_visits/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe Datastore has a timeout. Run a memory dump to verify your final Robux payout after listing fees and platform tax.",
    technical: "### Developer Revenue Metrics:\n1. **Virtual Sales Logic**: Deduct initial listing costs from total items sold prior to processing platform developer exchange multipliers.\n2. **Order of Evaluation**: Use parentheses `()` to declare listing fee subtraction as an operation of top-level priority.",
    example: "sale_price = 80\nlisting_fee = -10\nrobux_payout = (sale_price + listing_fee) * 0.8\nprint(robux_payout)",
    task: "1. Set `sale_price` as `80`.\n2. Set `listing_fee` as `-10`.\n3. Calculate `(sale_price + listing_fee) * 0.8` and store in `robux_payout`.\n4. Print `robux_payout`.",
    baseCode: "# TODO: Extract payout ledger\n",
    solution: "sale_price = 80\nlisting_fee = -10\nrobux_payout = (sale_price + listing_fee) * 0.8\nprint(robux_payout)",
    solutionRegex: [/robux_payout\s*=\s*\(\s*sale_price\s*\+\s*listing_fee\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "STUDIO_ASSETS",
    missionPrefix: "MODEL_TALLY",
    intro: "# Workspace Models: Lists\n\nYou are building an obby in Roblox Studio. You need to keep track of the main parts that you are spawning in the workspace hierarchy.",
    technical: "### Roblox Workspace Asset Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of values stored inside a single Workspace variable. Instead of tracking each spawned part with individual code variables (e.g., `part1 = \"SpawnPoint\"`, `part2 = \"LavaBrick\"`), a list lets you group multiple assets together inside a single folder hierarchy structure.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, which acts like a physical folder enclosing your game models.\n- **Comma Separation**: Every distinct asset inside your Roblox Studio list must be separated by a comma.\n- **Zero-Based Folders**: Python lists use zero-based indexing. The first asset in the hierarchy sits at index `0`, the second at `1`, and the third at `2`.",
    example: "# Store multiple models in a single list folder variable\nworkspace_models = [\"SpeedPad\", \"Trampoline\", \"TrussPart\"]\nprint(workspace_models)  # Prints the entire model asset collection",
    task: "Initialise your `parts` list with \"SpawnPoint\", \"CheckPoint\", and \"LavaBrick\". Print the parts list.",
    baseCode: "# TODO: Record spawned parts\n",
    solution: "parts = [\"SpawnPoint\", \"CheckPoint\", \"LavaBrick\"]\nprint(parts)",
    solutionRegex: [/parts\s*=\s*\[/, /print\s*\(\s*parts\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "WORKSPACE_QUERY",
    missionPrefix: "YOUR TASK",
    intro: "# Object Selection: Part Indices\n\nYour Lua script in Roblox Studio must verify properties of spawned parts. Isolate the initial spawning point and the hazardous obstacle by their indices.",
    technical: "### Workspace Layout:\n\n```text\nparts = [\"SpawnPoint\", \"CheckPoint\", \"LavaBrick\"]\n#       [0]            [1]             [2]\n```",
    example: "# Grab parts from Roblox Workspace using child list indices\nparts = [\"SpawnPoint\", \"CheckPoint\", \"LavaBrick\"]\n\n# Select first part block (index 0)\np1 = parts[0]\nprint(p1)  # Output: SpawnPoint\n\n# Select third part block (index 2)\np3 = parts[2]\nprint(p3)  # Output: LavaBrick",
    task: "1. Retrieve the first part (index 0) in the `parts` list and store in `p1`.\n2. Retrieve the third part (index 2) in the `parts` list and store in `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "parts = [\"SpawnPoint\", \"CheckPoint\", \"LavaBrick\"]\n# TODO: Extract spawn and hazard plates\n",
    solution: "p1 = parts[0]\np3 = parts[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*parts\s*\[\s*0\s*\]/, /p3\s*=\s*parts\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "INSTANTIATE_PART",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value workspace brick part is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "parts = [\"SpawnPoint\",\"CheckPoint\",\"LavaBrick\"]\nparts.append(\"SpeedPad\")\n# parts is now updated!",
    task: "1. Append \"SpeedPad\" to the `parts` list.\n2. Print the final `parts` list to confirm installation.",
    baseCode: "parts = [\"SpawnPoint\",\"CheckPoint\",\"LavaBrick\"]\n# TODO: Append value and print\n",
    solution: "parts.append(\"SpeedPad\")\nprint(parts)",
    solutionRegex: [/parts\.\s*append\s*\(\s*['"]SpeedPad['"]\s*\)/, /print\s*\(\s*parts\s*\)/]
  },
  "list-pop": {
    headerPrefix: "DESTROY_PART",
    missionPrefix: "YOUR TASK",
    intro: "# Clean Workspace: .pop()\n\nYour Roblox studio project is lagging because there are too many unanchored, redundant parts lying around! Clear the clutter from the engine. Use `.pop()` to destroy the last obsolete asset from your list to optimize the game server.",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = redundant_assets.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `redundant_assets` list and store it inside a variable named `destroyed`.\n2. Print `destroyed` to output the purged token.",
    baseCode: "redundant_assets = [\"TempBlock\",\"OldPart\",\"UnanchoredStud\"]\n# TODO: Pop last element and print\n",
    solution: "destroyed = redundant_assets.pop()\nprint(destroyed)",
    solutionRegex: [/destroyed\s*=\s*redundant_assets\.\s*pop\s*\(\s*\)/, /print\s*\(\s*destroyed\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "VECTOR_ANCHOR",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Anchored Immutable Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of values, similar to a parts group in the workspace, but with a critical stability difference: **lists are mutable** (meaning you can dynamically add, delete, or rearrange parts at runtime), whereas **tuples are immutable** (their elements are completely locked and anchored in memory, meaning they cannot be modified once created).\n- **Syntax**: Defined using round parentheses `()` instead of square brackets `[]`.\n- **Speed & Stability**: Because tuples are simpler and read-only, game servers process them faster, protecting critical unchangeable parameters like a level's spawns or origin coordinates from accidental script changes.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `vector_spawn` containing \"Roblox High\" and the number `2006`.\n2. Print the `vector_spawn` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "vector_spawn = (\"Roblox High\", 2006)\nprint(vector_spawn)",
    solutionRegex: [/vector_spawn\s*=\s*\(\s*['"]Roblox High['"]\s*,\s*2006\s*\)/, /print\s*\(\s*vector_spawn\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "ENGINE_LOCK",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `studio_palette` containing the single string \"Bricks\"\n2. Create a tuple named `engine_version` containing the numbers `4` and `1`.\n3. Rewrite `studio_palette[0]` to be \"Trusses\"\n4. Print both `studio_palette` and `engine_version`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "studio_palette = [\"Bricks\" ]\nengine_version = (4, 1)\nstudio_palette[0] = \"Trusses\"\nprint(studio_palette)\nprint(engine_version)",
    solutionRegex: [/studio_palette\s*\[\s*0\s*\]\s*=\s*['"]Trusses['"]/, /engine_version\s*=\s*\(\s*4\s*,\s*1\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "SERVICE_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `workspace_hierarchy` list.\n2. Store this result in a new variable named `core_services`.\n3. Print the resulting slice `core_services`.",
    baseCode: "workspace_hierarchy = [\"Terrain\",\"Lighting\",\"Scripts\",\"SoundService\",\"Chat\",\"Players\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "core_services = workspace_hierarchy[1:4]\nprint(core_services)",
    solutionRegex: [/core_services\s*=\s*workspace_hierarchy\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*core_services\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "SCALE_FILTER",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `part_sizes`.\n2. Store the result in a variable named `giant_parts`.\n3. Print `giant_parts`.",
    baseCode: "part_sizes = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "giant_parts = [s for s in part_sizes if s > 50]\nprint(giant_parts)",
    solutionRegex: [/giant_parts\s*=\s*\[\s*s\s+for\s+s\s+in\s+part_sizes\s+if\s+s\s*>\s*50\s*\]/, /print\s*\(\s*giant_parts\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "TELEPORT_SWEEP",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `obby_beacons` list using a list comprehension.\n2. Store this filtered list in a new variable named `active_teleports`.\n3. Print `active_teleports`.",
    baseCode: "obby_beacons = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "active_teleports = [b for b in obby_beacons if b % 2 == 0]\nprint(active_teleports)",
    solutionRegex: [/active_teleports\s*=\s*\[\s*b\s+for\s+b\s+in\s+obby_beacons\s+if\s+b\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*active_teleports\s*\)/]
  },
  "intro-input": {
    headerPrefix: "STUDIO_CLI",
    missionPrefix: "YOUR TASK",
    intro: "# Chat System: Roblox Input\n\nBuild an interactive chat barrier. To let users unlock specific obby checkpoints, you need to prompt them to enter the level password key.",
    technical: "### Studio Scripting Inputs:\n- The `input()` command reads text streams typed by users inside the chat widget.\n- Feeds custom coordinates or scripts directly into script instances.\n- **Lua Concatenation**: Glue chat messages or system alerts together using the `+` operator (e.g., `\"Roblox\" + \"Studio\"` becomes `\"RobloxStudio\"`). Make sure to include spaces in your text quotes, otherwise player usernames and scores will stick together!",
    example: "pass = input(\"Enter obby secret: \")\nprint(\"Access granted to: \" + pass)",
    task: "1. Ask the developer for the test server name with the prompt: **\"Enter server name: \"** and store it in a variable named `server_name`.\n2. Print **\"Connecting to server: \"** concatenated with the user\'s `server_name` value.",
    baseCode: "# TODO: Capture server name and print connection status\n",
    solution: "server_name = input(\"Enter server name: \")\nprint(\"Connecting to server: \" + server_name)",
    solutionRegex: [/server_name\s*=\s*input\s*\(\s*['\"]Enter server name: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Connecting to server: \s*['\"]\s*\+\s*server_name\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "STUDIO_LORE",
    missionPrefix: "GAME_GEN",
    intro: "# Roblox Chat Log: Story Generator\n\nGenerate customized system messages for your Roblox games. Build an automated system that details obstacles bypassed by key players.",
    technical: "### Joining Game Logs:\nUse the + syntax to glue player tags, obby obstacles, and gear coordinates together cleanly into one system-wide string entry.",
    example: "player = \"Builderman\"\nobstyle = \"Lava Pit\"\nchat = player + \" finished \" + obstyle\nprint(chat)",
    task: "1. Ask the user for the player name with the prompt: **\"Enter player name: \"** and store it in `player`.\n2. Ask the user for the obby obstacle with the prompt: **\"Enter obby obstacle: \"** and store it in `obstacle`.\n3. Ask the user for the spawn gear with the prompt: **\"Enter spawn gear: \"** and store it in `gear`.\n4. Combine into a variable named `obby_announcement` using the format: `player + \" bypassed \" + obstacle + \" with a \" + gear + \"!\"` and print `obby_announcement`.",
    baseCode: "# TODO: Compile obby gameplay logs\n",
    solution: "player = input(\"Enter player name: \")\nobstacle = input(\"Enter obby obstacle: \")\ngear = input(\"Enter spawn gear: \")\nobby_announcement = player + \" bypassed \" + obstacle + \" with a \" + gear + \"!\"\nprint(obby_announcement)",
    solutionRegex: [/player\s*=\s*input\s*\(\s*['"]Enter player name:\s*['"]\s*\)/, /obstacle\s*=\s*input\s*\(\s*['"]Enter obby obstacle:\s*['"]\s*\)/, /gear\s*=\s*input\s*\(\s*['"]Enter spawn gear:\s*['"]\s*\)/, /obby_announcement\s*=\s*player\s*\+\s*['"] bypassed ['"]\s*\+\s*obstacle\s*\+\s*['"] with a ['"]\s*\+\s*gear\s*\+\s*['"]!['"]/, /print\s*\(\s*obby_announcement\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "LUA_STATIONS",
    missionPrefix: "ERR_TRACKER",
    intro: "# Game Dev Chaos: Roblox Server Override\n\nA server exploiter has run a malicious Lua bytecode loop. Generate an interactive Roblox server diagnostic report using five crucial inputs.",
    technical: "### Multi-variable Concatenation:\nJoin your Roblox player parameters, obby milestones, and admin keys using basic string arithmetic to generate server announcements.",
    example: "chat = admin + \" injected \" + script + \" into \" + obby + \" at \" + level + \". System is \" + mode + \"!\"",
    task: "1. Ask for player name with prompt: **\"Enter player name: \"** and store in `player`.\n2. Ask for the admin exploit script with prompt: **\"Enter exploit script: \"** and store in `exploit`.\n3. Ask for the targeted block code with prompt: **\"Enter targeted block: \"** and store in `target_block`.\n4. Ask for the game server zone with prompt: **\"Enter server zone: \"** and store in `zone`.\n5. Ask for the game server state with prompt: **\"Enter server state: \"** and store in `server_state`.\n6. Combine into a variable named `roblox_log` and print using the exact format: `player + \" injected \" + exploit + \" into \" + target_block + \" at \" + zone + \". System is \" + server_state + \"!\"`.",
    baseCode: "# TODO: Keep Roblox servers operational\n",
    solution: "player = input(\"Enter player name: \")\nexploit = input(\"Enter exploit script: \")\ntarget_block = input(\"Enter targeted block: \")\nzone = input(\"Enter server zone: \")\nserver_state = input(\"Enter server state: \")\nroblox_log = player + \" injected \" + exploit + \" into \" + target_block + \" at \" + zone + \". System is \" + server_state + \"!\"\nprint(roblox_log)",
    solutionRegex: [/player\s*=\s*input\s*\(\s*['"]Enter player name:\s*['"]\s*\)/, /exploit\s*=\s*input\s*\(\s*['"]Enter exploit script:\s*['"]\s*\)/, /target_block\s*=\s*input\s*\(\s*['"]Enter targeted block:\s*['"]\s*\)/, /zone\s*=\s*input\s*\(\s*['"]Enter server zone:\s*['"]\s*\)/, /server_state\s*=\s*input\s*\(\s*['"]Enter server state:\s*['"]\s*\)/, /print\s*\(\s*roblox_log\s*\)/]
  },
  "print-formatting": {
    title: "Server Registry: F-Strings",
    headerPrefix: "SERVER_CONSOLE",
    missionPrefix: "OBBY_VERIFY",
    intro: "# Server Registry: F-Strings\n\nAdmin terminals require automated visitor logs. Write f-strings to dynamically display player usernames and server clearance levels on access.",
    technical: "### Formatting Protocol:\n- **F-Prefix**: Put `f` before your text quotes to enable Roblox script-style substitution.\n- **Direct Substitution**: Place variables inside `{}` inside the string to render their values immediately.",
    example: "player = \'Builderman\'\nprint(f\'Welcome player {player}\') # Outputs: Welcome player Builderman",
    task: "### YOUR MISSION\n\nYou have `alias = \'Builderman\'` and `level = 99`. Use an **f-string** to print: `Builder: Builderman | Dev Rank: 99`.",
    baseCode: "alias = \'Builderman\'\nlevel = 99\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Place {alias} and {level} in the curly braces."
    ],
    solution: "alias = \'Builderman\'\nlevel = 99\nprint(f\'Builder: {alias} | Dev Rank: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Builder:\s*\{alias\}\s*\|\s*Dev\s*Rank:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Developer Console: Advanced F-Strings",
    headerPrefix: "STUDIO_COORD",
    missionPrefix: "ADMIN_ROUTE",
    intro: "# Roblox Studio: Advanced F-Strings\n\nCoordinate player spawning structures across game worlds. F-strings help the game engine perform inline coordinate adjustments and convert Roblox regions into uppercase dynamically.",
    technical: "### Studio Scripting:\n- **Spawn Math**: Instantly calculate bricks, studs, or assets: `{blocks + wedges}`.\n- **Case Consistency**: Render Roblox game zone designations formatted in clean uppercase code styling: `{place.upper()}`.",
    example: "tix, robux = 20, 10\nprint(f'Rich developer items: {tix + robux}')",
    task: "### YOUR MISSION\n\n1. Prompt for admin count with: **\"Enter admin count: \"** and store it as an integer in `admins`.\n2. Prompt for game world with: **\"Enter game world: \"** and store it in `world`.\\n3. Use an **f-string** to print: `Deploying {admins} admins to {world.upper()}...`.",
    baseCode: "# TODO: Spawn administrators\n",
    hints: [
      "Ask for admins using int(input(\"Enter admin count: \"))",
      "Ask for world using input(\"Enter game world: \")",
      "Form the f-string output using {admins} and {world.upper()}."
    ],
    solution: "admins = int(input(\"Enter admin count: \"))\nworld = input(\"Enter game world: \")\nprint(f\"Deploying {admins} admins to {world.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{admins\}\s*admins\s*to\s*\{world\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Obby Construction: Casting to Int",
    headerPrefix: "BUILD_MONITOR",
    missionPrefix: "PART_RECAST",
    intro: "# Roblox Admin Console: Recasting Studio Bricks\\n\\nDeveloping obbys means adjusting platform objects on the fly. Players submit asset parameters as text strings. Cast them to integers to map physical blocks into the layout engine.",
    technical: "### Roblox Block Conversions:\\n- Recast client block values into real script layers using `int(input(\\\"Bricks: \\\"))`.",
    example: "anchored_blocks = int(input(\"Anchored pieces: \"))\ntotal_bricks = anchored_blocks + 10",
    task: "### YOUR MISSION\\n\\nTally Roblox game assets:\\n1. Prompt for neon blocks count with **\\\"Enter neon blocks density: \\\"** and store it as an integer in `neon_blocks`.\\n2. Prompt for lobby spawn pads count with **\\\"Enter lobby spawn pads: \\\"** and store it as an integer in `spawn_pads`.\\n3. Verify coordinates by printing the total sum of these bricks.",
    baseCode: "# TODO: Re-index obby components\\n",
    hints: [
      "Get blocks: neon_blocks = int(input(\\\"Enter neon blocks density: \\\"))",
      "Get spawns: spawn_pads = int(input(\\\"Enter lobby spawn pads: \\\"))",
      "Tally the parts up inside print()."
    ],
    solution: "neon_blocks = int(input(\\\"Enter neon blocks density: \\\"))\\nspawn_pads = int(input(\\\"Enter lobby spawn pads: \\\"))\\nprint(neon_blocks + spawn_pads)",
    solutionRegex: [/neon_blocks\s*=\s*int\s*\(\s*input/, /spawn_pads\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Gravity Scale: Casting to Float",
    headerPrefix: "STUDIO_GRAV",
    missionPrefix: "BRICK_WEIGHT",
    intro: "# Custom Physics: Float Calibrations\\n\\nAdjusting game workspace properties in Roblox Studio often requires exact decimal parameters. Read custom player inputs and recast them into decimal float values to scale brick gravity variables.",
    technical: "### Roblox Studio Float Diagnostics:\\n- **What is a Float?**: While integers represent whole numbers (like `150` brick parts), a `float` represents a decimal value (e.g., `0.25` stud offset, or `1.5` gravity scale) to design perfect physics properties.\\n- **String input to Studio decimals**: Player prompts from `input()` arrive inside the terminal as string text. To transform this text into computational brick coordinates, pass them to `float()`, e.g., `scale = float(input())`.\\n- **The Server Crash Error**: Attempting to run `int()` on a decimal offset like `\"0.25\"` immediately triggers a `ValueError` crash, killing the local Roblox game server thread!",
    example: "stud_offset = float(input(\"Platform offset: \"))\nfinal_pos = stud_offset * 3.5",
    task: "### YOUR MISSION\\n\\nCalibrate dynamic obby gravity variables:\\n1. Prompt for gravity override with **\\\"Enter workspace gravity override: \\\"** and store it as a float in `gravity_scale`.\\n2. Prompt for density multiplier with **\\\"Brick density multiplier: \\\"** and store it as a float in `density_multiplier`.\\n3. Print the result of multiplying workspace gravity override by brick density multiplier.",
    baseCode: "# TODO: Calibrate workspace gravity scale\\n",
    hints: [
      "Use gravity_scale = float(input(\"Enter workspace gravity override: \"))",
      "Use density_multiplier = float(input(\"Brick density multiplier: \"))",
      "Print their product using gravity_scale * density_multiplier."
    ],
    solution: "gravity_scale = float(input(\"Enter workspace gravity override: \"))\ndensity_multiplier = float(input(\"Brick density multiplier: \"))\nprint(gravity_scale * density_multiplier)",
    solutionRegex: [/gravity_scale\s*=\s*float\s*\(\s*input/, /density_multiplier\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Obby Logic Gates: Indentation Blocks",
    headerPrefix: "STUDIO_SCRIPT",
    missionPrefix: "BRICK_FLOW",
    intro: "# Roblox Studio: Alignment Protocol\\n\\nScripting custom obby stages requires clean structures. In Python, blocks are nested visually using indentation. Keep your game logic aligned so your bricks know when to trigger gravity updates.",
    technical: "### Lua-to-Python Developer Tip:\\n- Colons (`:`) replace Lua\\'s `then` or `do` statements.\\n- Always indent instructions underneath with exactly 4 spaces to group them inside the block.",
    example: "if True:\\n    print(\\\"Platform spawned\\\")  # Nested Roblox step",
    task: "### YOUR MISSION\\n\\nTrigger custom checkpoint logic:\\n1. Set up an `if True:` condition block.\\n2. On the next line, indented with 4 spaces, print **\\\"Accessing...\\\"** to unlock the platform parameters.",
    baseCode: "# TODO: Script custom obby templates\\n",
    hints: [
      "Format line 1 as if True:",
      "Press Tab or Spacebar 4 times on line 2",
      "Write print(\\\"Accessing...\\\") in the indented space"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Obby Checkpoint Level 2: Nested Mechanics",
    headerPrefix: "STUDIO_DEV",
    missionPrefix: "BLOCK_COLL",
    intro: "# Game Workspace Builder: Double Level Nesting\\n\\nConfiguring advanced trigger zones inside Roblox Studio scripts allows complex platform layouts. In Python, blocks are grouped inside parent states using uniform offsets. Layer your conditions to build safe pathways.",
    technical: "### Level Multiplicity in Scripts:\\n- The outer condition handles global biome states (4-spaces offset).\\n- Nested conditions within determine sub-brick actions (compounded **8-spaces offset**).",
    example: "if True:\\n    print(\"Lava block disabled\")\\n    if True:\\n        print(\"Neon platform visible\")",
    task: "### YOUR MISSION\\n\\nUnlock elite custom developer obby permissions:\\n1. Write the outer mechanics validation gate with **`if True:`**.\\n2. Nest the interior checkpoint trigger underneath with an inner **`if True:`** (indented by 4 spaces).\\n3. On the innermost level (indented with exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Construct nested platform triggers\\n",
    hints: [
      "Write if True: to lock in line 1.",
      "Indent the next line by 4 spaces and initiate if True:.",
      "Indent the following command line by 8 spaces to print the access token."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "VIP_GATE",
    missionPrefix: "ACCESS_LOGIC",
    intro: "# Game Scripting: If Statements\n\nYou're building a VIP area. Check the player's credentials to see if they have the necessary pass to enter the restricted zone.",
    task: "If `is_vip` is `True`, print `\"ENTERING VIP LOUNGE\"`.",
    baseCode: "is_vip = True\n# TODO: Verify access\n",
    solution: "is_vip = True\nif is_vip:\n    print(\"ENTERING VIP LOUNGE\")",
    solutionRegex: [/if\s+is_vip/, /print\s*\(\s*['\"]ENTERING VIP LOUNGE['\"]\s*\)/]
  },
  "control-else": {
    title: "Workspace Checkpoint: If/Else Bricks",
    headerPrefix: "VIP_GATE",
    missionPrefix: "BRICK_ELSE",
    intro: "# Obby Platform Logic: Else Triggers\\n\\nSetting up a custom checkpoint block in Roblox Studio requires robust branching code. If the player possesses the right token key, spawn the next level bridge. Else, immediately drop a neon red lava block to trigger a visual defeat.",
    technical: "### Obby Decisive Syntax:\\n- `else:` replaces standard Lua block `else` statements.\\n- Just like `if`, the `else` block MUST be followed by a colon (`:`), with nested instructions aligned precisely beneath.",
    example: "if player_has_badge:\\n    print(\\\"Open Golden Gate\\\")\\nelse:\\n    print(\\\"Fling Player\\\")",
    task: "### YOUR MISSION\\n\\nTrigger the obby security gate:\\n1. Construct an `if/else` block evaluating `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Else, print **`\"ALARM TRIGGERED\"`** to trap the brick.",
    baseCode: "key_valid = False\\n# TODO: Script modular checkpoint bypass\\n",
    hints: [
      "Write if key_valid: on line 1 (remember the colon!).",
      "Indent 4 spaces on line 2 and call print(\\\"ACCESS GRANTED\\\").",
      "Write else: aligned back to the starting margin on line 3.",
      "Indent 4 spaces and print(\\\"ALARM TRIGGERED\\\")."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "VIP Gates: Elif Levels",
    headerPrefix: "STUDIO_DEV",
    missionPrefix: "BRICK_ELIF",
    intro: "# Obby Passports: Tiered VIP Areas\\n\\nBuilding dynamic VIP lounges in Roblox Studio requires sorting players by their badge clearances (Devs, Premium users, and regular guests). Write an `if/elif/else` chain in Python to grant custom rewards.",
    technical: "### Obby Triage Arrays:\\n- Chaining `elif` conditions allows multiple separate outcomes.\\n- All conditionals inside alignment blocks are checked one by one.",
    example: "if badge == \"Admin\":\\n    print(\"Welcome Creator\")\\nelif badge == \"VIP\":\\n    print(\"Welcome Premium\")\\nelse:\\n    print(\"No pass\")",
    task: "### YOUR MISSION\\n\\nFilter obby player permissions:\\n1. Build an `if/elif/else` script around `clearance`.\\n2. If `clearance` is exactly `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Else, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Route player VIP pass codes\\n",
    hints: [
      "Check creator status first using if clearance == 1:",
      "Check premium membership using elif clearance <= 5:",
      "Use else: to trigger regular spawn mechanics"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Obby Guard: Exploit Defensive Screen",
    headerPrefix: "BLOX_SHIELD",
    missionPrefix: "ANTITHEAT",
    intro: "# Blox Security: Escape the Admin Command\n\nYou programmed a custom gravity coil exploit to speedrun a super-hard Obby. If the admin script detected the floating physics code, send a defensive chat line to override the kicked screen. Otherwise, let your Blox adventure continue.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"RESPAWN_TO_SPAWNPOINT\")\nelse:\n    print(\"Blox adventure ongoing.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` platform guard:\n1. If `is_detected`, print **`\"RESPAWN_TO_SPAWYPOINT\"`** (or target **`\"RESPAWN_TO_SPAWNPOINT\"`**) to bypass the admin ban script.\n2. Else, print **`\"Blox adventure ongoing.\"`** and claim your Robux reward.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"RESPAWN_TO_SPAWNPOINT\".",
      "Add else: at the base level and print \"Blox adventure ongoing.\""
    ],
    solution: "if is_detected:\n    print(\"RESPAWN_TO_SPAWNPOINT\")\nelse:\n    print(\"Blox adventure ongoing.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]RESPAWN_TO_SPAWNPOINT['"]\s*\)/, /print\s*\(\s*['"]Blox\s+adventure\s+ongoing\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Avatar Ranks: VIP Status Builder",
    headerPrefix: "BLOX_CLUB",
    missionPrefix: "CLUB_UPGRADE",
    intro: "# Builders Club: Player Status Assignment\n\nAssign a special competitive status tag rank to a player base on their total Robux balance count. Luxury Roblox gamers receive VIP server entry rights.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to evaluate Robux wealth index.\n- **Assignment**: Write the appropriate `player_status` string value inside the logical condition blocks.",
    example: "if balance > 9000:\n    player_status = \"VIP\"\nelse:\n    player_status = \"Guest\"",
    task: "### YOUR MISSION\n\nVerify Roblox server status tier:\n1. If current client `robux_count > 9000`, set `player_status` to **`\"VIP\"`**.\n2. Else, set `player_status` to **`\"Guest\"`**.\n3. Finally, write the status out by printing `print(player_status)`.",
    baseCode: "robux_count = 9001\nplayer_status = \"\"\n# TODO: Process gamepass status and print it\n",
    hints: [
      "Set your player_status variable inside the logic branches.",
      "End by using print(player_status) outside the check block, entirely unindented."
    ],
    solution: "robux_count = 9001\nif robux_count > 9000:\n    player_status = \"VIP\"\nelse:\n    player_status = \"Guest\"\nprint(player_status)",
    solutionRegex: [/if\s+robux_count\s*>\s*9000\s*:/, /player_status\s*=\s*['"]VIP['"]/, /player_status\s*=\s*['"]Guest['"]/, /print\s*\(\s*player_status\s*\)/]
  },
  "control-adventure": {
    title: "Roblox Server: Command Route",
    headerPrefix: "BLOX_CMD",
    missionPrefix: "SCRIPTER_ACCESS",
    intro: "# Roblox Studio: Database Gateway Choice\n\nYou bypassed the security scripts guarding the premium player ledger. Now you must pick a gateway destination block: \"1\" (Central Vault Database) or \"2\" (Hidden Backdoor Script).",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Routing to Central Vault Database...\")",
    task: "### YOUR MISSION\n\nCompose a game script router block:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Route Roblox server blocks\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Roblox Obby: Command Route",
    headerPrefix: "BLOX_ROUTING",
    missionPrefix: "PLAYER_DISPATCH",
    intro: "# Gamepass Admin: Member Hub Routing\n\nYour Obby script must route Roblox user accounts based on membership types: \"premium\", \"builders\", or \"guest\" to their designated spawn fields.",
    technical: "### Cascading Checks:\n- **Sequential**: Validates subscription tokens starting from VIP elite cards down.\n- **Exclusive**: Only the first positive credential check claims player spawn rights.\n- **Exhaustive**: An `else` kicks hackers or unauthenticated clients to lobby grounds.",
    example: "if vip == \"premium\":\n    print(\"VIP server access.\")\nelif vip == \"builders\":\n    print(\"Co-op code built.\")",
    task: "### YOUR MISSION\n\nAssign player locations based on variable `vip`:\n1. If `vip` is **`\"premium\"`**, print **`\"VIP server access.\"`**\n2. Elif `vip` is **`\"builders\"`**, print **`\"Co-op code built.\"`**\n3. Elif `vip` is **`\"guest\"`**, print **`\"Standard Obby arena.\"`**\n4. Else, print **`\"Unauthorized ban.\"`**",
    baseCode: "vip = \"premium\"\n# TODO: Check roblox VIP hierarchy\n",
    hints: [
      "Check premium, builders, and guest roles.",
      "The end branch redirects other requests to standard bans."
    ],
    solution: "if vip == \"premium\":\n    print(\"VIP server access.\")\nelif vip == \"builders\":\n    print(\"Co-op code built.\")\nelif vip == \"guest\":\n    print(\"Standard Obby arena.\")\nelse:\n    print(\"Unauthorized ban.\")",
    solutionRegex: [/if\s+vip\s*==\s*['"]premium['"]\s*:/, /elif\s+vip\s*==\s*['"]builders['"]\s*:/, /elif\s+vip\s*==\s*['"]guest['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]VIP\s+server\s+access\.['"]\s*\)/, /print\s*\(\s*['"]Co-op\s+code\s+built\.['"]\s*\)/, /print\s*\(\s*['"]Standard\s+Obby\s+arena\.['"]\s*\)/, /print\s*\(\s*['"]Unauthorized\s+ban\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Obby Cycles: Spawn Checks",
    headerPrefix: "MAP_CONTROL",
    missionPrefix: "SPAWN_SWEEP",
    intro: "# Obby Iterations: Sector Automation\n\nExperienced Roblox developers use loops to set up map segments dynamically. Write a script to iterate sequentially and run scans across five map sectors.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### range(5) Iteration:\n- **Automation**: Triggers the map-building loop exactly 5 times (sectors 0 to 4 inclusive).\n- **Structure**: Always follow loop colons with 4 spaces of indentation.",
    example: "for i in range(3):\n    print(f\"Spawn {i+1} loaded\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Spawn {i+1} loaded\"` for each of the 5 cycles.",
    baseCode: "# TODO: Loop through obby map blocks\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Spawn {i+1} loaded"
    ],
    solution: "for i in range(5):\n    print(f\"Spawn {i+1} loaded\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Chat Filter: Text Sweeper",
    headerPrefix: "CHAT_SERVICE",
    missionPrefix: "BOUT_READ",
    intro: "# Chat Moderation: Parsing Messages\n\nRoblox admin scripts inspect messaging text inputs dynamically. Learn to loop through the string's chars to verify tag and filter structures.",
    technical: "### Text Loops:\n- **Walking**: Iterates over string text values sequentially, index to index.\n- **Complete**: Finishes processing when the standard chat packet runs out of symbols.",
    example: "for letter in \"BLOX\":\n    print(letter)",
    task: "### YOUR MISSION\n\nYou've intercepted a Roblox chat bubble `message`: `\"BLOX\"`. Use a `for` loop to iterate through every character `letter` in the variable `message` and `print` it.",
    baseCode: "message = \"BLOX\"\n# TODO: Read individual characters\n",
    hints: [
      "Create 'for letter in message:' block.",
      "Verify and print elements inside the loop body."
    ],
    solution: "message = \"BLOX\"\nfor letter in message:\n    print(letter)",
    solutionRegex: [/for\s+letter\s+in\s+message/, /print\s*\(\s*letter\s*\)/]
  },
  "loop-list-audit": {
    title: "Roblox Studio: Script Auditer",
    headerPrefix: "ROBLOX_COMPILER",
    missionPrefix: "LUA_FILTER",
    intro: "# Roblox Studio: Checking Scripts\n\nYou're setting up the local workspace file directory. Scan your resources roster and load only valid Lua scripts ending with `.lua` to prevent game bugs.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"kill_brick.lua\"`, then `\"brick_colour.txt\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".lua\")` asks: *\"Does the text inside `f` end with `.lua`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".lua\"):\n          # This runs ONLY if the current file ends with .lua!\n  ```",
    example: "scripts = [\"config.txt\", \"kill_brick.lua\"]\nfor s in scripts:\n    if \".lua\" in s:\n        print(s)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".lua\"`, `print` the output line: `f\"Loading script: {f}\"`.",
    baseCode: "discovered_files = [\"kill_brick.lua\", \"brick_colour.txt\", \"spawn_system.lua\", \"baseplate.gme\"]\n# TODO: Load Lua game scripts\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".lua\"):",
      "Print f'Loading script: {f}'"
    ],
    solution: "discovered_files = [\"kill_brick.lua\", \"brick_colour.txt\", \"spawn_system.lua\", \"baseplate.gme\"]\nfor f in discovered_files:\n    if f.endswith(\".lua\"):\n        print(f\"Loading script: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.lua['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Studio Builder: Spawn Grid Matrix",
    headerPrefix: "BUILD_COMPILER",
    missionPrefix: "BRICK_COORD",
    intro: "# Obby Builder: Programmatic Part Placement\n\nWhen creating obby arenas, developers automate building layouts. Spawn standard 3x3 neon floor parts matching grid paths (X) and (Y).",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 spawn grid scan with variable `x` (outer loop representing Rows) and variable `y` (inner loop representing Columns) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Row 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Col 0) -> Output: `Roblox - Row: 0, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Roblox - Row: 0, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Roblox - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Row 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Col 0) -> Output: `Roblox - Row: 1, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Roblox - Row: 1, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Roblox - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Row 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Col 0) -> Output: `Roblox - Row: 2, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Roblox - Row: 2, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Roblox - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Stud {r},{c}\")",
    task: "### YOUR MISSION\n\nPlat a **3x3 obby floor map**. Code nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` each coordinate in this exact format: `f\"Roblox - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Map obby brick positions\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Roblox - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Roblox - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Obby Crash: Studio Abort",
    headerPrefix: "ROBLOX_COMPILER",
    missionPrefix: "CRASH_OVERRIDE",
    intro: "# Game Dev: Preventing Workspace Crashing\n\nWhen writing complex scripts in Roblox Studio, infinite loops can crash your server. Python provides the `break` command to force exit loops instantly.",
    technical: "### Memory Override:\n- **Emergency Exit**: Use `break` inside game loops to avoid memory overflows.\n- **Status Guards**: Intercept rogue loop counts before compiling.",
    example: "for brick in range(10):\n    if brick == 5:\n        break\n    print(brick)",
    task: "### YOUR MISSION\n\nLoop through `range(10)` to instantiate neon tiles. If the brick placement index `i` reaches `7`, call `break` to avoid server crash. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Spawn neon blocks with safety break\n",
    hints: [
      "Define loop 'for i in range(10):'",
      "Set up condition 'if i == 7:'",
      "Deploy 'break' beneath the condition, then print i"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Obby Obstacle: Gravity Charger",
    headerPrefix: "BLOX_POWER",
    missionPrefix: "BAT_DRAIN",
    intro: "# Game Engine Cycles: While Loops\n\nWhile `for` loops run a specific number of times, `while` loops keep running **as long as a condition remains True**. Use this to monitor an active block's battery power as it charges a jump pad.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to charge the gravity pad.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "LUAU_COMPILER",
    missionPrefix: "EVENT_LISTEN",
    intro: "# Luau Scripting: Functions\n\nDon't duplicate script code for every teleport pad! Create a reusable function to handle player transitions cleanly inside the workspace.",
    task: "Write a function `teleport_player(pad_id)` that prints `f'Teleporting player to pad {pad_id}...'`. Call it.",
    baseCode: "# TODO: Define teleport handlers\n",
    solution: "def teleport_player(pad_id):\n    print(f'Teleporting player to pad {pad_id}...')\n\nteleport_player('A7')",
    solutionRegex: [/def\s+teleport_player/, /teleport_player\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "OBBY_GENERATOR",
    missionPrefix: "PROCEDURAL_GEN",
    intro: "# Procedural Stairs: Recursion\n\nTo construct a dynamic spiral staircase descending endlessly into space, write a recursive generator that anchors a part of height `layer` and calls itself recursively.",
    task: "Write a recursive function `generate_stage(stage)` that prints the stage number and calls itself with `stage-1` until it reaches `0`.",
    baseCode: "# TODO: Generate stepped bricks\n",
    solution: "def generate_stage(stage):\n    print(stage)\n    if stage > 0:\n        generate_stage(stage - 1)\n\ngenerate_stage(5)",
    solutionRegex: [/def\s+generate_stage/, /generate_stage\s*\(\s*stage\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "AVATAR_SPAWN",
    missionPrefix: "PLAYER_TEMPLATE",
    intro: "# Game Workspace: Classes\n\nCommanders, in Roblox, every gamer connected to the server is represented by an active Player instance. Instead of re-coding individual variables for health, scores, or assets from scratch, Roblox scripts use template blueprints called **Classes**.",
    task: "### YOUR MISSION\n\nDefine a base class named `RobloxPlayer`. Use `pass` inside its block under proper indentation.",
    baseCode: "# TODO: Establish base class RobloxPlayer\n",
    hints: [
      "Use 'class RobloxPlayer:' followed by an indented 'pass'.",
      "Ensure proper capitalization of RobloxPlayer!"
    ],
    solution: "class RobloxPlayer:\n    pass",
    solutionRegex: [/class\s+RobloxPlayer/, /pass/]
  },
  "oop-init": {
    headerPrefix: "GAME_JOIN",
    missionPrefix: "USER_SPEC",
    intro: "# Player Onboarding: Constructors\n\nWhen a player joins your custom Roblox experience, we want to stamp their username immediately! We will use the constructor method `__init__` to assign their account username as soon as their player instance boots up.",
    task: "### YOUR MISSION\n\nInside `RobloxPlayer`, define the constructor method `__init__` which accepts `self` and a parameter `name`. Assign the `name` value to `self.name`.",
    baseCode: "class RobloxPlayer:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Define the method using 'def __init__(self, name):'.",
      "Inside, save the name to the player object using 'self.name = name'."
    ],
    solution: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "STUDIO_ABILITIES",
    missionPrefix: "PHY_BEHAVIOR",
    intro: "# Player Actions: Methods\n\nA player in Roblox Studio needs active abilities, like jumping, chatting, or reset-spawning. In Object-Oriented Programming, functions defined inside a class are called **Methods**. Let's add a leap action so our players can bound into the air!",
    task: "### YOUR MISSION\n\nAdd a `jump` method to `RobloxPlayer` that `print`s \"Jump active\".",
    baseCode: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define jump method\n",
    hints: [
      "Define 'def jump(self):' as part of the class.",
      "Use print('Jump active') inside the method."
    ],
    solution: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n    def jump(self):\n        print(\"Jump active\")",
    solutionRegex: [/def\s+jump\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Jump active['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "SERVER_MONITOR",
    missionPrefix: "STATS_CHECK",
    intro: "# Tracking Player Sessions: Object State\n\nInside your Roblox game, each player tracks their session state separately — one player could be on a victory lap, while another is waiting in the lobby. Each player instance manages its own instance variables independently.",
    task: "### YOUR MISSION\n\n1. In `__init__`, add a `game_state` instance variable defaulted to the string \"Standby\".\n2. Create a method `join_game` that updates the player's `self.game_state` to the string \"Active\".",
    baseCode: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add game_state default\n    # TODO: Add join_game method\n",
    hints: [
      "Inside __init__, initialise 'self.game_state = \"Standby\"'.",
      "Under 'def join_game(self):', set 'self.game_state = \"Active\"'."
    ],
    solution: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n        self.game_state = \"Standby\"\n    def join_game(self):\n        self.game_state = \"Active\"",
    solutionRegex: [/self\.game_state\s*=\s*['"]Standby['"]/, /def\s+join_game/, /self\.game_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "TRADE_SYSTEM",
    missionPrefix: "USER_LINK",
    intro: "# Game Trades: Object Interaction\n\nRoblox is a fully social platform! Players interact by exchanging special trade items, friending, or tagging each other in minigames. In Python OOP, objects interact by receiving other instances of a class as parameters.",
    task: "### YOUR MISSION\n\nAdd a `trade_with` method to `RobloxPlayer` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Trading with: {other.name}\"`.",
    baseCode: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add trade_with method\n",
    hints: [
      "Define 'def trade_with(self, other):' inside the class.",
      "Use an f-string to access the other player's name via other.name."
    ],
    solution: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n    def trade_with(self, other):\n        print(f\"Trading with: {other.name}\")",
    solutionRegex: [/def\s+trade_with\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "ROBLOX_PREMIUM",
    missionPrefix: "VIP_UPGRADE",
    intro: "# Specialized Player Roles: Inheritance\n\nIn Roblox, some players hold special roles — like VIP members who get exclusive gear, unique particle trails, or flying abilities! We can inherit general player attributes and extend them to build a specialized `VIPPlayer` subclass.",
    task: "### YOUR MISSION\n\nCreate a class `VIPPlayer` that inherits from `RobloxPlayer`. Give it an `activate_trail` method that `print`s \"VIP particle trail active\".",
    baseCode: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create VIPPlayer subclass inheriting from RobloxPlayer\n",
    hints: [
      "Use 'class VIPPlayer(RobloxPlayer):' to construct inheritance.",
      "Define 'def activate_trail(self):' and have it print 'VIP particle trail active'."
    ],
    solution: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n\nclass VIPPlayer(RobloxPlayer):\n    def activate_trail(self):\n        print(\"VIP particle trail active\")",
    solutionRegex: [/class\s+VIPPlayer\s*\(\s*RobloxPlayer\s*\)\s*:/, /def\s+activate_trail/, /print\s*\(\s*['"]VIP particle trail active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "NAME_BOARD",
    missionPrefix: "USER_TAG",
    intro: "# Leaderboard Displays: Special Str Method\n\nIf we try to print a player instance directly in our script, Python returns a messy memory index. Let's override the special double-underscore method `__str__` to render a clean, human-readable username tag for Leaderboards instead.",
    task: "### YOUR MISSION\n\nIn `RobloxPlayer`, add the custom method `__str__` that returns: `f\"Roblox Player {self.name}\"`.",
    baseCode: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define 'def __str__(self):' inside the RobloxPlayer class block.",
      "Make sure you return (do not print) the formatted f-string: f'Roblox Player {self.name}'"
    ],
    solution: "class RobloxPlayer:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Roblox Player {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Roblox Player.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "METAVERSE_CLOUD",
    missionPrefix: "PLATFORM_CONST",
    intro: "# Universal Game Services: Shared Class Variables\n\nEvery Roblox player has their own customizable avatar, stats, and inventory bag, but they *all* run on the same platform! We can use a Class Variable to store shared constants that apply to all instances globally, saving server memory.",
    task: "### YOUR MISSION\n\n1. Define a class variable `platform` set to \"Roblox\" inside `RobloxPlayer` before other initialisers.\n2. `print` the class variable using `RobloxPlayer.platform`.",
    baseCode: "class RobloxPlayer:\n    # TODO: Define class variable 'platform'\n    pass\n# TODO: Print RobloxPlayer.platform\n",
    hints: [
      "Place 'platform = \"Roblox\"' immediately under the class declaration.",
      "Print the value of RobloxPlayer.platform outside the class."
    ],
    solution: "class RobloxPlayer:\n    platform = \"Roblox\"\n\nprint(RobloxPlayer.platform)",
    solutionRegex: [/platform\s*=\s*['"]Roblox['"]/, /print\s*\(\s*RobloxPlayer\.platform\s*\)/]
  }
};