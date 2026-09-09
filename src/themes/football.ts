export const FOOTBALL_THEME: any = {
  "intro-print": {
    headerPrefix: "PITCH_COMM",
    missionPrefix: "TACTICAL_UP",
    intro: "# Match Day Setup: print()\n\nWelcome to the tactical chalkboard, Coach. The team is warm, the stadium is loud, and kickoff is moments away. Test the digital scoreboard by transmitting a stadium-wide message.",
    task: "Use `print()` to display: `\"Kickoff Ready\"`",
    baseCode: "# TODO: Initialize scoreboard\n",
    solution: "print(\"Kickoff Ready\")",
    solutionRegex: [/print\s*\(\s*['\"]Kickoff Ready['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "TACTICAL_STYLE",
    missionPrefix: "LOWERCASE_PLAYBOOKS",
    intro: "# Tactical Syntax: Lowercase Playbooks\n\nThe football analysis engine processes pitch plays at high speed. It enforces strict, case-sensitive syntax protocols. If you log referee instructions using `Print()` instead of `print()`, the video assistant referee (VAR) system will crash and flag an error. All tactical play variables must be lowercase.",
    task: "Define a lowercase variable named `match_score` and assign `10` to represent the squad's performance rating. Print it out using `print()` so the manager can review it. Write everything in lowercase!",
    baseCode: "# TODO: Define match_score with 10 and print it\n",
    solution: "match_score = 10\nprint(match_score)",
    solutionRegex: [/match_score\s*=\s*10/, /print\s*\(\s*match_score\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "SCOUT_NOTES",
    missionPrefix: "TACTIC_TAG",
    intro: "# Tactical Notebook: Comments\n\nThe opposing manager is scanning our playbook. Use comments to hide secret formation instructions, keeping your set-piece plans completely secure.",
    task: "Write a comment `# Exploit left-back wing space` and then `print(\"Attacking...\")`",
    baseCode: "# TODO: Write scout note\n",
    solution: "# Exploit left-back wing space\nprint(\"Attacking...\")",
    solutionRegex: [/#.*Exploit left-back wing space/, /print\s*\(\s*['\"]Attacking\.\.\.['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "SCOUT_LIVE",
    missionPrefix: "LIVE_TAG",
    intro: "# Bench Notes: Inline Comments\n\nDuring a high-stakes match, you might need to add quick tactical notes directly next to your instructions. Inline comments keep your playbook clear and focused.",
    task: "Initialize `player_id` to `128`. On the same line, add an inline comment `# Striker position`.",
    baseCode: "# TODO: Initialize player ID with an inline comment\n",
    solution: "player_id = 128 # Striker position",
    solutionRegex: [/player_id\s*=\s*128/, /#.*Striker position/]
  },
  "intro-vars": {
    headerPrefix: "TEAM_SHEET",
    missionPrefix: "PLAYER_ROSTER",
    intro: "# Squad Database: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled player profile** on your team sheet! You give the profile a name (like `weekly_wage_k`), assign values inside it (like their wages or age), and check or update them as the match season progresses.\n\nTracking your top striker's fitness and form is essential for trophy runs. Let's use variables to log goals scored and jersey number.",
    task: "Create `academy_players` set to `64` and `weekly_wage_k` set to `1500`.",
    baseCode: "# TODO: Track player contract variables\n",
    solution: "academy_players = 64\nweekly_wage_k = 1500",
    solutionRegex: [/academy_players\s*=\s*64/, /weekly_wage_k\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "TACTIC_UPGRADE",
    missionPrefix: "FORMATION_SHIFT",
    intro: "# Squad Rotation: Reassignment\n\nYour defender has received a red card. Update your formation variables to shift your team layout to a defensive stance.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "pressing_intensity = 1.0\nprint(pressing_intensity)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\npressing_intensity = 2.1\nprint(pressing_intensity)  # Output: 2.1",
    task: "Initialize `pressing_intensity` as `1.0`. Then update `pressing_intensity` to `2.1`. Print it.",
    baseCode: "pressing_intensity = 1.0\n# TODO: Shift intensity to 2.1\n",
    solution: "pressing_intensity = 1.0\npressing_intensity = 2.1\nprint(pressing_intensity)",
    solutionRegex: [/pressing_intensity\s*=\s*1\.0/, /pressing_intensity\s*=\s*2\.1/, /print\s*\(\s*pressing_intensity\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "TRANSFER_WINDOW",
    missionPrefix: "BID_LOG",
    intro: "# Scouting Target: Placeholders\n\nPrepare your scouting radar for a new signing. Before the scout's encrypted transfer signal passes by your manager's dashboard, set up a placeholder variable in your computer's memory buffer to catch and secure the incoming player name.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `football_data = \"\"` as a placeholder, we allocate space in memory. Then, running `football_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the new signing dynamically so you can see it change!",
    example: "football_data = \"\"  # Memory slot is allocated and empty\nfootball_data = input(\"Enter transfer target name: \")  # Line 2 updates the empty string with your input!\nprint(\"Signing: \" + football_data)",
    task: "1. Initialize `football_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter transfer target name: \")` to populate it.\n3. Print `\"Signing: \" + football_data`.",
    baseCode: "# TODO: Set up transfer window input capture\n",
    hints: [
      "Use football_data = \"\" to prepare the transfer radar.",
      "Use football_data = input(\"Enter transfer target name: \") to capture the player name.",
      "Print \"Signing: \" combined with the football_data variable."
    ],
    solution: "football_data = \"\"\nfootball_data = input(\"Enter transfer target name: \")\nprint(\"Signing: \" + football_data)",
    solutionRegex: [/football_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "MATCH_STATS",
    missionPrefix: "SCORE_INIT",
    intro: "# Kickoff Protocol: Multi-Assignment\n\nThe scoreboard needs to be reset for the second half. Initialise the goals and assists for your star player in one quick command.",
    task: "Assign `goals` set to `2` and `assists` set to `1` in one line.",
    baseCode: "# TODO: Update scorecard\n",
    solution: "goals, assists = 2, 1",
    solutionRegex: [/goals\s*,\s*assists\s*=\s*2\s*,\s*1/]
  },
  "data-strings": {
    headerPrefix: "SPEAKER_COMM",
    missionPrefix: "MATCH_STADIUM",
    intro: "# Fixture Board: Strings\n\nPreparing stadium screens requires matching text labels. Define an official location string for the championship trophy.",
    task: "Create a variable `stadium` set to `\"Wembley\"`. Print it.",
    baseCode: "# TODO: Setup champion stadium\n",
    solution: "stadium = \"Wembley\"\nprint(stadium)",
    solutionRegex: [/stadium\s*=\s*['\"]Wembley['\"]/]
  },
  "data-numbers": {
    headerPrefix: "STADIUM_STATS",
    missionPrefix: "KPI_METRICS",
    intro: "# Game Stats Calibration: Numbers\n\nTrack matching indicators for precision game stats. Use integers for whole counts (like substitution limits) and floats for continuous metrics (like average runs per match).",
    task: "Set `match_duration` to `90.5` and `sub_limit` to `5`.",
    baseCode: "# TODO: Define game day parameters\n",
    solution: "match_duration = 90.5\nsub_limit = 5",
    solutionRegex: [/match_duration\s*=\s*90\.5/, /sub_limit\s*=\s*5/]
  },
  "data-booleans": {
    headerPrefix: "VAR_ROOM",
    missionPrefix: "DECISION_CHECK",
    intro: "# VAR Monitor: Booleans\n\nIs the offside trap synchronized? Has the referee given a penalty? Track officiating decisions using logic booleans.",
    task: "Set `penalty_awarded` to `True` and `offside_trap_active` to `False`.",
    baseCode: "# TODO: Initialise referee variables\n",
    solution: "penalty_awarded = True\noffside_trap_active = False",
    solutionRegex: [/penalty_awarded\s*=\s*True/, /offside_trap_active\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "SQUAD_LOGS",
    missionPrefix: "TRAINING_SUM",
    intro: "# Fitness Protocol: Math\n\nThe gaffer wants to know who's ready for the weekend. Sum up the number of goals scored in training by your two star strikers to see if the attack is clicking.",
    task: "Create `striker_a_goals` as `4` and `striker_b_goals` as `6`. Store the sum in `total_team_goals` and print it.",
    baseCode: "# TODO: Sum training statistics\n",
    solution: "striker_a_goals = 4\nstriker_b_goals = 6\ntotal_team_goals = striker_a_goals + striker_b_goals\nprint(total_team_goals)",
    solutionRegex: [/total_team_goals\s*=\s*striker_a_goals\s*\+\s*striker_b_goals/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe match database has crashed. Run a memory dump to recover the final player rating after adjusting base fitness for fatigue and consistency.",
    technical: "### Player Stats Calibration:\n1. **Stat Formulas**: Combine the initial squad fitness value with match fatigue penalties before computing consistency indicators.\n2. **Order**: Enclose the standard arithmetic additions inside parentheses `()` so they execute before the multiplier calculations.",
    example: "base_fitness = 80\nfatigue_penalty = -10\nmatch_rating = (base_fitness + fatigue_penalty) * 0.8\nprint(match_rating)",
    task: "1. Create metric `base_fitness` as `80`.\n2. Create metric `fatigue_penalty` as `-10`.\n3. Calculate `(base_fitness + fatigue_penalty) * 0.8` and store in `match_rating`.\n4. Print `match_rating`.",
    baseCode: "# TODO: Analyse physical indicators\n",
    solution: "base_fitness = 80\nfatigue_penalty = -10\nmatch_rating = (base_fitness + fatigue_penalty) * 0.8\nprint(match_rating)",
    solutionRegex: [/match_rating\s*=\s*\(\s*base_fitness\s*\+\s*fatigue_penalty\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "TEAM_FORMATION",
    missionPrefix: "LINEUP_LIST",
    intro: "# Starting Eleven: Lists\n\nBefore launching into the Champions League final, outline your three central key forwards in the starting line-up roster.",
    technical: "### Match Line-up Squad Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) lineup of players grouped together under a single squad variable. Instead of tracking player cards in isolated, separate sheets (e.g., `striker = \"Messi\"`, `winger = \"Neymar\"`), a list allows you to group your entire tactical lineup sequence under one team banner.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, which resemble the physical outer boundary lines of the stadium pitch.\n- **Comma Separation**: Every selected player placed inside your squad must be separated by a comma.\n- **Zero-Based Roster**: Python lists use zero-based indexing. The captain or first player listed is positioned at index `0`, the second player at `1`, and the third at `2`.",
    example: "# Register multiple starters in a single list variable\nstarting_attackers = [\"Mbappe\", \"Haaland\", \"Salah\"]\nprint(starting_attackers)  # Outputs the entire starting lineup roster",
    task: "Initialise your `squad` list with \"Messi\", \"Ronaldo\", and \"Neymar\". Print the squad.",
    baseCode: "# TODO: Log squad selection\n",
    solution: "squad = [\"Messi\", \"Ronaldo\", \"Neymar\"]\nprint(squad)",
    solutionRegex: [/squad\s*=\s*\[/, /print\s*\(\s*squad\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "LINEUP_CALL",
    missionPrefix: "YOUR TASK",
    intro: "# Key Strike: Striker Indices\n\nTo dominate the pitch in the Champions League final, retrieve your first-choice talisman striker and your versatile third-rotation winger.",
    technical: "### Squad Placements:\n\n```text\nsquad = [\"Messi\", \"Ronaldo\", \"Neymar\"]\n#       [0]       [1]         [2]\n```",
    example: "# Field squad players using our lineup slots list\nsquad = [\"Messi\", \"Ronaldo\", \"Neymar\"]\n\n# Isolate talisman player (index 0)\np1 = squad[0]\nprint(p1)  # Output: Messi\n\n# Isolate final winger (index 2)\np3 = squad[2]\nprint(p3)  # Output: Neymar",
    task: "1. Pull the talisman player (index 0) from the `squad` list into `p1`.\n2. Pull the final winger (index 2) from `squad` into `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "squad = [\"Messi\", \"Ronaldo\", \"Neymar\"]\n# TODO: Field squad indices 0 and 2\n",
    solution: "p1 = squad[0]\np3 = squad[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*squad\s*\[\s*0\s*\]/, /p3\s*=\s*squad\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "TRANSFER_WINDOW",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value squad player is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "squad = [\"Messi\",\"Ronaldo\",\"Neymar\"]\nsquad.append(\"Mbappe\")\n# squad is now updated!",
    task: "1. Append \"Mbappe\" to the `squad` list.\n2. Print the final `squad` list to confirm installation.",
    baseCode: "squad = [\"Messi\",\"Ronaldo\",\"Neymar\"]\n# TODO: Append value and print\n",
    solution: "squad.append(\"Mbappe\")\nprint(squad)",
    solutionRegex: [/squad\.\s*append\s*\(\s*['"]Mbappe['"]\s*\)/, /print\s*\(\s*squad\s*\)/]
  },
  "list-pop": {
    headerPrefix: "SUB_BOARD",
    missionPrefix: "YOUR TASK",
    intro: "# Tactical Substitution: .pop()\n\nThe manager is gesturing to the bench—it's time for a crucial late-game substitution! Bring on a fresh goalscorer to break the deadlock. Use `.pop()` to retrieve the last substitute from the bench list so they can enter the match.",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = substitutes_bench.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `substitutes_bench` list and store it inside a variable named `subbed_player`.\n2. Print `subbed_player` to output the purged token.",
    baseCode: "substitutes_bench = [\"Salah\",\"Haaland\",\"Kane\"]\n# TODO: Pop last element and print\n",
    solution: "subbed_player = substitutes_bench.pop()\nprint(subbed_player)",
    solutionRegex: [/subbed_player\s*=\s*substitutes_bench\.\s*pop\s*\(\s*\)/, /print\s*\(\s*subbed_player\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "STADIUM_MAP",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Match-Locked Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of values, similar to a tactical squad sheet, but with one critical tactical distinction: **lists are mutable** (meaning the manager can substitute players, change formations, or add new bench options during play), whereas **tuples are immutable** (their content and sequence are permanently locked, just like a historic match result written on a trophy that can never be altered).\n- **Syntax**: Enclosed in round parentheses `()` instead of square brackets `[]`.\n- **Speed & Security**: Because tuples are simpler and read-only, sports analysis systems process them faster and use them to protect vital, unchangeable facts like stadium founding years or team-specific pitch coordinates.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `stadium_sector` containing \"Camp Nou North\" and the number `1899`.\n2. Print the `stadium_sector` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "stadium_sector = (\"Camp Nou North\", 1899)\nprint(stadium_sector)",
    solutionRegex: [/stadium_sector\s*=\s*\(\s*['"]Camp Nou North['"]\s*,\s*1899\s*\)/, /print\s*\(\s*stadium_sector\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "STRATEGY_VAL",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `training_drills` containing the single string \"Rondo\"\n2. Create a tuple named `match_strategy` containing the numbers `4` and `3`.\n3. Rewrite `training_drills[0]` to be \"Scrimmage\"\n4. Print both `training_drills` and `match_strategy`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "training_drills = [\"Rondo\" ]\nmatch_strategy = (4, 3)\ntraining_drills[0] = \"Scrimmage\"\nprint(training_drills)\nprint(match_strategy)",
    solutionRegex: [/training_drills\s*\[\s*0\s*\]\s*=\s*['"]Scrimmage['"]/, /match_strategy\s*=\s*\(\s*4\s*,\s*3\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "TACTICAL_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `starting_eleven` list.\n2. Store this result in a new variable named `core_midfield`.\n3. Print the resulting slice `core_midfield`.",
    baseCode: "starting_eleven = [\"Goalkeeper\",\"Defender1\",\"Defender2\",\"Midfielder1\",\"Midfielder2\",\"Striker\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "core_midfield = starting_eleven[1:4]\nprint(core_midfield)",
    solutionRegex: [/core_midfield\s*=\s*starting_eleven\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*core_midfield\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "FITNESS_METRICS",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `fitness_scores`.\n2. Store the result in a variable named `match_ready`.\n3. Print `match_ready`.",
    baseCode: "fitness_scores = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "match_ready = [s for s in fitness_scores if s > 50]\nprint(match_ready)",
    solutionRegex: [/match_ready\s*=\s*\[\s*s\s+for\s+s\s+in\s+fitness_scores\s+if\s+s\s*>\s*50\s*\]/, /print\s*\(\s*match_ready\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "JERSEY_INDEX",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `squad_jersey_numbers` list using a list comprehension.\n2. Store this filtered list in a new variable named `even_jerseys`.\n3. Print `even_jerseys`.",
    baseCode: "squad_jersey_numbers = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "even_jerseys = [n for n in squad_jersey_numbers if n % 2 == 0]\nprint(even_jerseys)",
    solutionRegex: [/even_jerseys\s*=\s*\[\s*n\s+for\s+n\s+in\s+squad_jersey_numbers\s+if\s+n\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*even_jerseys\s*\)/]
  },
  "intro-input": {
    headerPrefix: "TACTICAL_PAD",
    missionPrefix: "YOUR TASK",
    intro: "# Team Selection: Tactical Input\n\nThe championship final is tonight. The manager must query the training computer for which custom pitch tactic should be run first.",
    technical: "### Interactive Strategy:\n- Use `input()` to poll coaches or analysers for immediate strategic adjustments.\n- It converts key presses into play-call configurations on the sideline fly.\n- **Tactical Concatenation**: Glue play-calling data or tactical logs together using the `+` operator (e.g., `\"Quick\" + \"Pass\"` becomes `\"QuickPass\"`). Remember to add spaces within quotes, otherwise they\'ll merge on the blackboard!",
    example: "formation = input(\"Set formation: \")\nprint(\"Playing style: \" + formation)",
    task: "1. Ask the analyst for the strategy with the prompt: **\"Enter player role: \"** and store it in a variable named `player_role`.\n2. Print **\"Assigning role: \"** concatenated with the user\'s `player_role` value.",
    baseCode: "# TODO: Capture role and print assignments\n",
    solution: "player_role = input(\"Enter player role: \")\nprint(\"Assigning role: \" + player_role)",
    solutionRegex: [/player_role\s*=\s*input\s*\(\s*['\"]Enter player role: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Assigning role: \s*['\"]\s*\+\s*player_role\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "TACTIC_REP",
    missionPrefix: "MATCH_GEN",
    intro: "# Press Conference: Story Generator\n\nGenerate matchday summaries automatically for the technical report. Take sideline quotes and positions to describe tactical plays on the pitch.",
    technical: "### Aggregating Football Tactics:\nSynthesise managers, defences, and strategic play formations into clean press-ready lines using standard variable joining.",
    example: "manager = \"Pep\"\nteam = \"Red Devils\"\nTactics = manager + \" defeated \" + team\nprint(Tactics)",
    task: "1. Ask the user for the manager with the prompt: **\"Enter manager name: \"** and store it in `manager`.\n2. Ask the user for the defensive wall with the prompt: **\"Enter defensive wall: \"** and store it in `defence`.\n3. Ask the user for the play style with the prompt: **\"Enter tactical play: \"** and store it in `play`.\n4. Combine into a variable named `match_summary` using the format: `manager + \" bypassed \" + defence + \" with a \" + play + \"!\"` and print `match_summary`.",
    baseCode: "# TODO: Assemble tactical sports updates\n",
    solution: "manager = input(\"Enter manager name: \")\ndefence = input(\"Enter defensive wall: \")\nplay = input(\"Enter tactical play: \")\nmatch_summary = manager + \" bypassed \" + defence + \" with a \" + play + \"!\"\nprint(match_summary)",
    solutionRegex: [/manager\s*=\s*input\s*\(\s*['"]Enter manager name:\s*['"]\s*\)/, /defence\s*=\s*input\s*\(\s*['"]Enter defensive wall:\s*['"]\s*\)/, /play\s*=\s*input\s*\(\s*['"]Enter tactical play:\s*['"]\s*\)/, /match_summary\s*=\s*manager\s*\+\s*['"] bypassed ['"]\s*\+\s*defence\s*\+\s*['"] with a ['"]\s*\+\s*play\s*\+\s*['"]!['"]/, /print\s*\(\s*match_summary\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "TEAM_ENGINE",
    missionPrefix: "TACTICAL_GLITCH",
    intro: "# Camp Nou Meltdown: Technical Tactics\n\nThe tactical tracking software has crashed right before El Clasico! Compile a team-wide tactical alignment memo using five pitch variables.",
    technical: "### Coordinating Pitch Data:\nUse standard variable addition to connect the dots between manager inputs, offensive play styles, and field coordinates.",
    example: "play = manager + \" injected \" + code + \" into \" + zone + \" at \" + minute + \". System is \" + vibe + \"!\"",
    task: "1. Ask for the manager name with prompt: **\"Enter manager name: \"** and store in `manager`.\n2. Ask for the play design key with prompt: **\"Enter play key: \"** and store in `play_key`.\n3. Ask for the tactical offensive sector with prompt: **\"Enter pitch sector: \"** and store in `sector`.\n4. Ask for the tactical tier with prompt: **\"Enter defensive tier: \"** and store in `def_tier`.\n5. Ask for the game momentum with prompt: **\"Enter match trend: \"** and store in `match_trend`.\n6. Combine into a variable named `tactic_glitch` and print using the exact format: `manager + \" injected \" + play_key + \" into \" + sector + \" at \" + def_tier + \". System is \" + match_trend + \"!\"`.",
    baseCode: "# TODO: Deliver the sideline tactical briefing\n",
    solution: "manager = input(\"Enter manager name: \")\nplay_key = input(\"Enter play key: \")\nsector = input(\"Enter pitch sector: \")\ndef_tier = input(\"Enter defensive tier: \")\nmatch_trend = input(\"Enter match trend: \")\ntactic_glitch = manager + \" injected \" + play_key + \" into \" + sector + \" at \" + def_tier + \". System is \" + match_trend + \"!\"\nprint(tactic_glitch)",
    solutionRegex: [/manager\s*=\s*input\s*\(\s*['"]Enter manager name:\s*['"]\s*\)/, /play_key\s*=\s*input\s*\(\s*['"]Enter play key:\s*['"]\s*\)/, /sector\s*=\s*input\s*\(\s*['"]Enter pitch sector:\s*['"]\s*\)/, /def_tier\s*=\s*input\s*\(\s*['"]Enter defensive tier:\s*['"]\s*\)/, /match_trend\s*=\s*input\s*\(\s*['"]Enter match trend:\s*['"]\s*\)/, /print\s*\(\s*tactic_glitch\s*\)/]
  },
  "print-formatting": {
    title: "Squad Registry: F-Strings",
    headerPrefix: "TACHY_CARD",
    missionPrefix: "SQUAD_STATS",
    intro: "# Squad Registry: F-Strings\n\nDynamically format player squad registers for the tactical HUD. Build clean terminal readouts featuring player squad indices and rating tier levels.",
    technical: "### F-Strings Technique:\n- Use `f` before the string's opening quotes (e.g., `f\'...\'`).\n- Insert `{variable_name}` to automatically load and format its current value.",
    example: "player = \'Messi\'\nprint(f\'Captain: {player}\') # Outputs: Captain: Messi",
    task: "### YOUR MISSION\n\nYou have `alias = \'Messi\'` and `level = 10`. Use an **f-string** to print: `Player: Messi | Squad Number: 10`.",
    baseCode: "alias = \'Messi\'\nlevel = 10\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Use {alias} and {level} in the curly brackets within the string."
    ],
    solution: "alias = \'Messi\'\nlevel = 10\nprint(f\'Player: {alias} | Squad Number: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Player:\s*\{alias\}\s*\|\s*Squad\s*Number:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Squad Mobilization: Advanced F-Strings",
    headerPrefix: "TAC_TABLET",
    missionPrefix: "SCOUT_VAL",
    intro: "# Training Ground: Dynamic F-Strings\n\nFormat tactical readouts for the manager's tablet. F-strings are the absolute best way to output player metrics and uppercase pitch coordinates rapidly before a big derby.",
    technical: "### Tactical HUD:\n- **Braces Mathematics**: Sum starting squads and reserves instantly inside the string: `{bench + starters}`.\n- **Format Methods**: Enforce capitalized stadium regions on-the-fly: `{stadium.upper()}`.",
    example: "sline, reserves = 11, 7\nprint(f'Match-day squad: {sline + reserves}')",
    task: "### YOUR MISSION\n\n1. Prompt for scout count with: **\"Enter scout count: \"** and store it as an integer in `scouts`.\n2. Prompt for target stadium with: **\"Enter target region: \"** and store it in `region`.\\n3. Use an **f-string** to print: `Deploying {scouts} scouts to {region.upper()}...`.",
    baseCode: "# TODO: Mobilize squad scouts\n",
    hints: [
      "Ask for scouts using int(input(\"Enter scout count: \"))",
      "Ask for region using input(\"Enter target region: \")",
      "Inject {scouts} and {region.upper()} clearly inside your f-string text."
    ],
    solution: "scouts = int(input(\"Enter scout count: \"))\nregion = input(\"Enter target region: \")\nprint(f\"Deploying {scouts} scouts to {region.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{scouts\}\s*scouts\s*to\s*\{region\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Squad Depth Matrix: Casting to Int",
    headerPrefix: "CLUB_STATS",
    missionPrefix: "PLAYER_RECAST",
    intro: "# Strategic Drafting: Casting Signings\\n\\nWhen draft specs or transfers are uploaded, they arrive in string text format. Cast player figures into integers to see if your squad depth complies with the football league guidelines.",
    technical: "### Tactical Recasting:\\n- Turn raw visitor inputs into numeric players using `int()` to compute active squad capacity.",
    example: "loan_players = int(input(\"Loan roster: \"))\ntotal_roster = loan_players + 11",
    task: "### YOUR MISSION\\n\\nCalculate squad depth:\\n1. Prompt for current squad size with **\\\"Enter current squad size: \\\"** and store it as an integer in `current_squad`.\\n2. Prompt for new signings with **\\\"Enter new signings: \\\"** and store it as an integer in `new_signings`.\\n3. Print the total team size after drafting the additions.",
    baseCode: "# TODO: Cast and calculate team size\\n",
    hints: [
      "Get current roster: current_squad = int(input(\\\"Enter current squad size: \\\"))",
      "Get signings: new_signings = int(input(\\\"Enter new signings: \\\"))",
      "Add current_squad and new_signings inside the print function."
    ],
    solution: "current_squad = int(input(\\\"Enter current squad size: \\\"))\\nnew_signings = int(input(\\\"Enter new signings: \\\"))\\nprint(current_squad + new_signings)",
    solutionRegex: [/current_squad\s*=\s*int\s*\(\s*input/, /new_signings\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Pitch Performance Index: Casting to Float",
    headerPrefix: "ANALYST_DECK",
    missionPrefix: "STAT_MULT",
    intro: "# Squad Kinetics: GPS Tracking Decimals\\n\\nPlayer wearables register distances in highly precise decimal fractions. To calculate overall player load and velocity index, parse these telemetry values into floats.",
    technical: "### Performance Float Diagnostics:\\n- **What is a Float?**: While integers represent whole numbers (like `11` starting players), a `float` represents a decimal fraction (e.g., `11.45` kilometers). GPS telemetry is extremely sensitive to these minor details.\\n- **Recasting Text telemetry**: Raw numbers received via the `input()` tablet console come in as strings. To calculate total sprinting averages, you must cast them using `float()`, such as `val = float(input())`.\\n- **The Offside Indent/Int Trap**: Attempting to feed a fractional distance like `\"11.45\"` into `int()` is a yellow card error! Python will halt execution with a `ValueError` because integers can\\'t hold decimals.",
    example: "session_hours = float(input(\"Session duration: \"))\ncalories_lost = session_hours * 600.5",
    task: "### YOUR MISSION\\n\\nCalculate player performance indexes:\\n1. Prompt for distance with **\\\"Enter distance covered in kilometers: \\\"** and store it as a float in `distance`.\\n2. Prompt for pace factor with **\\\"Performance pace factor: \\\"** and store it as a float in `pace`.\\n3. Print the result of multiplying distance and pace.",
    baseCode: "# TODO: Multi-vector tracker math\\n",
    hints: [
      "Get distance: distance = float(input(\"Enter distance covered in kilometers: \"))",
      "Get pace: pace = float(input(\"Performance pace factor: \"))",
      "Print the combined metric via print(distance * pace)."
    ],
    solution: "distance = float(input(\"Enter distance covered in kilometers: \"))\npace = float(input(\"Performance pace factor: \"))\nprint(distance * pace)",
    solutionRegex: [/distance\s*=\s*float\s*\(\s*input/, /pace\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Tactical Drill: Indentation Blocks",
    headerPrefix: "PLAY_BOOK",
    missionPrefix: "PITCH_MAP",
    intro: "# Manager Playbook: Indentation Rules\\n\\nFootball formations rely on structural alignment. To run analytic simulations, organize your player tracking scripts using proper indentation blocks, ensuring each drill sequence belongs inside the tactics module.",
    technical: "### Team Alignment Guide:\\n- A colon (`:`) marks the start of a dedicated set piece.\\n- Indent tactical steps underneath by exactly 4 spaces to keep the players in tight formation.",
    example: "if True:\\n    print(\\\"Counter-attack ready\\\")  # Organized block",
    task: "### YOUR MISSION\\n\\nRun the attack drill script:\\n1. Write an `if True:` condition block.\\n2. Indent the next line with 4 spaces and print **\\\"Accessing...\\\"** to monitor modern striker coordinates.",
    baseCode: "# TODO: Structure your striker playbook\\n",
    hints: [
      "Write an if True: statement on line 1",
      "Use 4 spaces to indent line 2",
      "Incorporate the print(\\\"Accessing...\\\") function inside"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Tactical Playbook: Layered Sub-Strategies",
    headerPrefix: "PLAY_ANALYSIS",
    missionPrefix: "GRID_TUNE",
    intro: "# Deep Strategic Models: Double Alignment\\n\\nTo model advanced tactical strategies for championship matches, we use nested loops and logic blocks in Python. Align your analytical checks layer-by-layer to construct complex drill conditions.",
    technical: "### Tactical Array Multipliers:\\n- Outer parameters set standard stadium conditions (4 spaces).\\n- Nested striker/winger logic requires structured offsets of **8 spaces**.",
    example: "if True:\\n    print(\"Attacking Mode Enabled\")\\n    if True:\\n        print(\"Overlap Strategy Activated\")",
    task: "### YOUR MISSION\\n\\nConfigure high-yield offensive tactics:\\n1. Define the outer play condition with **`if True:`**.\\n2. Nest the inner winger validation check underneath with a second **`if True:`** (indented by 4 spaces).\\n3. Deep inside the striker zone (indented by exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Structure double tactical alignments\\n",
    hints: [
      "Start line 1 with if True:.",
      "Use 4 spaces to indent the secondary if True: on line 2.",
      "Use 8 spaces to indent the print(\"CORE ACCESS GRANTED\") statement on line 3."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "VAR_CHECK",
    missionPrefix: "REF_DECISION",
    intro: "# Match Official Logic: If Statements\n\nThe match is in extra time. Check the VAR screen to see if a foul occurred in the box before awarding the winning penalty.",
    task: "If `is_penalty` is `True`, print `\"PENALTY AWARDED\"`.",
    baseCode: "is_penalty = True\n# TODO: Consult VAR\n",
    solution: "is_penalty = True\nif is_penalty:\n    print(\"PENALTY AWARDED\")",
    solutionRegex: [/if\s+is_penalty/, /print\s*\(\s*['\"]PENALTY AWARDED['\"]\s*\)/]
  },
  "control-else": {
    title: "Tactical Drill: If/Else Formations",
    headerPrefix: "PLAYER_ANALYSIS",
    missionPrefix: "DRILL_ELSE",
    intro: "# Pitch Plays: Else Decision Trees\\n\\nAnalysing modern winger drills requires structured branch choices. If the key tactical criteria are valid, execute the wing attack pattern. Else, collapse the entire formation into defence mode to guard the penalty area.",
    technical: "### Formation Spacing:\\n- Ensure the `else:` statement is completely separated on its own line and carries no condition.\\n- Match its margin to its corresponding `if` to keep your players in visual formation.",
    example: "if pass_completed:\\n    print(\\\"Shoot!\\\")\\nelse:\\n    print(\\\"Defend!\\\")",
    task: "### YOUR MISSION\\n\\nRun the playbook analysis system:\\n1. Construct an `if/else` drill using `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Else, print **`\"ALARM TRIGGERED\"`** to signal the red card.",
    baseCode: "key_valid = False\\n# TODO: Program the pitch play\\n",
    hints: [
      "Develop the structure using if key_valid: first.",
      "Indent 4 spaces underneath to print the positive match.",
      "Line up else: cleanly with the if.",
      "Indent inside else to trigger the alarm print."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Dynamic Playbook: Elif Formations",
    headerPrefix: "COACH_STATS",
    missionPrefix: "LEVEL_SELECT",
    intro: "# Strategic Drills: Sorting Player Tiers\\n\\nOur club is designing player profiling templates. To dynamically allocate training drills, track clearances in order: first-team stars get master access, squad players get standard access, and trialists get standard trial tags.",
    technical: "### Playbook Flow control:\\n- Nest each print sequence under its condition.\\n- Align `if`, `elif`, and `else` vertically so the coach\\'s plan stays organized.",
    example: "if rating >= 90:\\n    print(\"First Team\")\\nelif rating >= 75:\\n    print(\"Reserve Bench\")\\nelse:\\n    print(\"Youth Academy\")",
    task: "### YOUR MISSION\\n\\nClassify match-day dashboard clearances:\\n1. Open an `if/elif/else` chain on `clearance`.\\n2. If `clearance` is exactly `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Else, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Define academy drilling permissions\\n",
    hints: [
      "Start with if clearance == 1:",
      "Add the secondary qualification using elif clearance <= 5:",
      "Close the play using else: for denied users"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Media Blitz: Press Conference Logic",
    headerPrefix: "PRESS_ROOM",
    missionPrefix: "POST_MATCH",
    intro: "# Football Media Tactics: Keeping Mum\n\nYou've just triumphed in a dramatic cup tie, but cameras spotted you speaking to a rival club's scout on the touchline. If reporters detected the meeting, dismiss the rumors instantly with a classic press dodging line. Otherwise, keep your standard tactics running.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"OFFSIDE_TACTIC_DEPLOY\")\nelse:\n    print(\"Tactical play running.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` press triage:\n1. If `is_detected`, print **`\"OFFSIDE_TACTIC_DEPLOY\"`** to end the press conference.\n2. Else, print **`\"Tactical play running.\"`** and return to the training ground.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"OFFSIDE_TACTIC_DEPLOY\".",
      "Add else: at the base level and print \"Tactical play running.\""
    ],
    solution: "if is_detected:\n    print(\"OFFSIDE_TACTIC_DEPLOY\")\nelse:\n    print(\"Tactical play running.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]OFFSIDE_TACTIC_DEPLOY['"]\s*\)/, /print\s*\(\s*['"]Tactical\s+play\s+running\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Tactical Drill: Squad Status",
    headerPrefix: "FOOTBALL_CORE",
    missionPrefix: "RANK_AWARD",
    intro: "# Player Status: Roster Placement\n\nAssign a roster status to a squad member based on their physical match stamina index. High-performing footballers with active status earn inclusion into the elite Starter squad.",
    technical: "### Tactical Assignment:\n- **Comparison**: Use `> 9000` to evaluate the player's physical stamina points level.\n- **Assignment**: Set the `roster_status` variable inside the logic branches so the line-up is properly filled.",
    example: "if stamina > 9000:\n    roster_status = \"Starter\"\nelse:\n    roster_status = \"Reserve\"",
    task: "### YOUR MISSION\n\nEvaluate stamina points rating:\n1. If player performance rating `stamina > 9000`, set `roster_status` to **`\"Starter\"`**.\n2. Else, set `roster_status` to **`\"Reserve\"`**.\n3. Finally, print the configured roster status with `print(roster_status)`.",
    baseCode: "stamina = 9001\nroster_status = \"\"\n# TODO: Set roster status and print it\n",
    hints: [
      "Assign the status inside your if/else branches.",
      "Remember to print(roster_status) outside the indentation at the end."
    ],
    solution: "stamina = 9001\nif stamina > 9000:\n    roster_status = \"Starter\"\nelse:\n    roster_status = \"Reserve\"\nprint(roster_status)",
    solutionRegex: [/if\s+stamina\s*>\s*9000\s*:/, /roster_status\s*=\s*['"]Starter['"]/, /roster_status\s*=\s*['"]Reserve['"]/, /print\s*\(\s*roster_status\s*\)/]
  },
  "control-adventure": {
    title: "Infiltration Route: Stadium Back-Channel",
    headerPrefix: "ANALYSIS_CTRL",
    missionPrefix: "STADIUM_DOOR",
    intro: "# VAR Server Core: Choosing the Access Tunnel\n\nYou've penetrated stadium security gates. Now you must route to a stream module: \"1\" (Official Vault Feed) or \"2\" (Secondary Goal-Line Camera). Select one.",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Accessing Vault Feed...\")",
    task: "### YOUR MISSION\n\nEstablish connection to target video feeds:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Match tunnel routing\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Tactical Playbook: Formation Setup",
    headerPrefix: "FORMATION_CORE",
    missionPrefix: "TACTICAL_ALIGN",
    intro: "# Squad Formations: Tactical Routing\n\nYour tactics board must direct player positions based on active squad roles: \"attack\", \"midfield\", or \"defence\". Route incoming lineups dynamically.",
    technical: "### Cascading Checks:\n- **Sequential**: Checks each formation condition in order from top to bottom.\n- **Exclusive**: Only the first matched role executes.\n- **Exhaustive**: An `else` catch-all routes to the bench for unassigned roles.",
    example: "if role == \"attack\":\n    print(\"Striker advanced.\")\nelif role == \"midfield\":\n    print(\"Playmaker central.\")",
    task: "### YOUR MISSION\n\nConfigure the formation router for variable `role`:\n1. If `role` is **`\"attack\"`**, print **`\"Striker advanced.\"`**\n2. Elif `role` is **`\"midfield\"`**, print **`\"Playmaker central.\"`**\n3. Elif `role` is **`\"defence\"`**, print **`\"Centre back deep.\"`**\n4. Else, print **`\"Bench warming.\"`**",
    baseCode: "role = \"attack\"\n# TODO: Route players to their tactical positions\n",
    hints: [
      "Use if role == \"attack\": with a colon.",
      "Follow up with elif role == \"midfield\":",
      "End with else: to handle bench players."
    ],
    solution: "if role == \"attack\":\n    print(\"Striker advanced.\")\nelif role == \"midfield\":\n    print(\"Playmaker central.\")\nelif role == \"defence\":\n    print(\"Centre back deep.\")\nelse:\n    print(\"Bench warming.\")",
    solutionRegex: [/if\s+role\s*==\s*['"]attack['"]\s*:/, /elif\s+role\s*==\s*['"]midfield['"]\s*:/, /elif\s+role\s*==\s*['"]defence['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Striker\s+advanced\.['"]\s*\)/, /print\s*\(\s*['"]Playmaker\s+central\.['"]\s*\)/, /print\s*\(\s*['"]Centre\s+back\s+deep\.['"]\s*\)/, /print\s*\(\s*['"]Bench\s+warming\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Pitch Drills: Cycle Scan",
    headerPrefix: "DRILL_CONTROL",
    missionPrefix: "PITCH_CYCLE",
    intro: "# Tactical Routines: Repeat Sprints\n\nFootballers run repetitive patterns to build physical muscle memory. Streamlining player performance means automating five consecutive scan cycles of specific pitch zones.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### Range Sequences:\n- **range(5)**: Automates the exercise exactly 5 times (indices 0 to 4).\n- **Tracking**: Ideal for indexing zone drills or player sprint logs on the tactics board.",
    example: "for i in range(3):\n    print(f\"Zone {i+1} completed\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Zone {i+1} completed\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write your drill loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Zone {i+1} completed"
    ],
    solution: "for i in range(5):\n    print(f\"Zone {i+1} completed\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Tactical Sequence: Route Inspection",
    headerPrefix: "TACTICS_BOARD",
    missionPrefix: "PLAY_STEP",
    intro: "# Squad Tactics: Set-Piece Analysis\n\nModern football coaches document set-piece routes using tactical coordinate strings. To construct the perfect attack pattern, review each tactical code symbol individually.",
    technical: "### Code Traversal:\n- **Step Routing**: Walks the playset string index by index, fetching the positions.\n- **Drill Flow**: Automatically completes the sweep when the play sequence runs its length.",
    example: "for step in \"DRILL\":\n    print(step)",
    task: "### YOUR MISSION\n\nYou've designed a specialized wing routine code in the variable `tactics`: `\"PASS\"`. Use a `for` loop to iterate through every character `step` in the variable `tactics` and `print` it.",
    baseCode: "tactics = \"PASS\"\n# TODO: Trace the play sequence\n",
    hints: [
      "Create 'for step in tactics:' to step through.",
      "Make sure to print each character on a new line."
    ],
    solution: "tactics = \"PASS\"\nfor step in tactics:\n    print(step)",
    solutionRegex: [/for\s+step\s+in\s+tactics/, /print\s*\(\s*step\s*\)/]
  },
  "loop-list-audit": {
    title: "Tactics Ledger: Drill Isolation",
    headerPrefix: "SQUAD_ANALYSIS",
    missionPrefix: "PLAY_FILTER",
    intro: "# Strategy Filter: Playbook Audits\n\nThe manager wants to prepare tactical drills for tomorrow. Isolate the strategy coordinates specifically labeled as set-piece files ending with `.pl`.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"kickoff.pl\"`, then `\"roster.csv\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".pl\")` asks: *\"Does the text inside `f` end with `.pl`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".pl\"):\n          # This runs ONLY if the current file ends with .pl!\n  ```",
    example: "strategies = [\"notes.txt\", \"corner_sweep.pl\"]\nfor s in strategies:\n    if \".pl\" in s:\n        print(s)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a strategy ends with `\".pl\"`, `print` the team-wide notification: `f\"Drill ready: {f}\"`.",
    baseCode: "discovered_files = [\"kickoff.pl\", \"roster.csv\", \"counter.pl\", \"pitch_grid.png\"]\n# TODO: Extract play tactics\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".pl\"):",
      "Print f'Drill ready: {f}'"
    ],
    solution: "discovered_files = [\"kickoff.pl\", \"roster.csv\", \"counter.pl\", \"pitch_grid.png\"]\nfor f in discovered_files:\n    if f.endswith(\".pl\"):\n        print(f\"Drill ready: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.pl['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Tactical Map: Pitch Grid Patterns",
    headerPrefix: "DRILL_COORDINATES",
    missionPrefix: "PITCH_SCAN",
    intro: "# Tactical Drills: Pitch Sector Scanning\n\nModern tactics break the football pitch into a strict spatial matrix. To check player positions, run a sweep across tactical grid coordinates (X) and (Y).",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 pitch scan with variable `x` (outer loop representing Rows) and variable `y` (inner loop representing Columns) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Row 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Col 0) -> Output: `Pitch - Row: 0, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Pitch - Row: 0, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Pitch - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Row 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Col 0) -> Output: `Pitch - Row: 1, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Pitch - Row: 1, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Pitch - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Row 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Col 0) -> Output: `Pitch - Row: 2, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Pitch - Row: 2, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Pitch - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Zone {r}-{c}\")",
    task: "### YOUR MISSION\n\nScan a **3x3 playbook sector**. Use nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the pitch coordinate status in this exact format: `f\"Pitch - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Track playbook zones\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Pitch - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Pitch - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Tactical Halt: Counter Abort",
    headerPrefix: "PLAYBOOK_CYCLE",
    missionPrefix: "COUNTER_LIMIT",
    intro: "# Game Strategy: Breaking Tactical Offenses\n\nIf the opposition springs an offside trap, the manager calls an immediate tactical freeze. Python uses the `break` command to terminate iteration loops when specific criteria are met.",
    technical: "### Tactical Out:\n- **Immediate Halt**: Use `break` inside team loops to halt play immediately.\n- **Play Audits**: Wrap checks inside structured conditions to prevent yellow cards.",
    example: "for play in range(10):\n    if play == 5:\n        break\n    print(play)",
    task: "### YOUR MISSION\n\nRun through drill sessions covering `range(10)`. If a critical tactical failure index `i` reaches `7`, trigger an offline defensive `break`. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Run playbook cycles with break safety\n",
    hints: [
      "Incorporate 'for i in range(10):'",
      "Set conditional guard 'if i == 7:'",
      "Insert exit modifier 'break', then print i"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "VAR Power: Screen Depletion",
    headerPrefix: "VAR_STADIUM",
    missionPrefix: "MONITOR_BAT",
    intro: "# VAR System Cycles: While Loops\n\nWhile `for` loops run through a sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor backup battery decay on the VAR pitchside screen during a long penalty review.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to keep the screen backlight illuminated.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "COACH_STATS",
    missionPrefix: "TACTICAL_DRILL",
    intro: "# Drill Automation: Functions\n\nDon't manually record sprint stats for every single player! Create a reusable function to log a player's sprint training completions automatically.",
    task: "Write a function `run_drill(player_name)` that prints `f'Player {player_name} completed the sprint run...'`. Call it.",
    baseCode: "# TODO: Define speed drill function\n",
    solution: "def run_drill(player_name):\n    print(f'Player {player_name} completed the sprint run...')\n\nrun_drill('Ronaldo')",
    solutionRegex: [/def\s+run_drill/, /run_drill\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "CHAMPIONS_CUP",
    missionPrefix: "PLAYOFF_TREE",
    intro: "# Tournament Ladder: Recursion\n\nTo determine the tournament champions, we must trace our playoff matches recursively back through each bracket level, from finals back to the opening rounds.",
    task: "Write a recursive function `playoff_rounds(round_num)` that prints the round number and calls itself with `round_num-1` until it reaches `0`.",
    baseCode: "# TODO: Traverse playoff rounds\n",
    solution: "def playoff_rounds(round_num):\n    print(round_num)\n    if round_num > 0:\n        playoff_rounds(round_num - 1)\n\nplayoff_rounds(5)",
    solutionRegex: [/def\s+playoff_rounds/, /playoff_rounds\s*\(\s*round_num\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "SQUAD_GEN",
    missionPrefix: "PLAYER_TEMPLATE",
    intro: "# Squad Creation: Classes\n\nCoach, instead of writing separate variables for every player's statistics from scratch, let's build a unified blueprint for our squad members. In Python, this template is called a **Class**.",
    task: "### YOUR MISSION\n\nDefine a base class named `FootballPlayer`. Use `pass` inside its block under proper indentation.",
    baseCode: "# TODO: Define the base class FootballPlayer\n",
    hints: [
      "Use 'class FootballPlayer:' followed by an indented 'pass'.",
      "Check your capitalization!"
    ],
    solution: "class FootballPlayer:\n    pass",
    solutionRegex: [/class\s+FootballPlayer/, /pass/]
  },
  "oop-init": {
    headerPrefix: "SQUAD_BOOT",
    missionPrefix: "ROSTER_SPEC",
    intro: "# Player Onboarding: Constructors\n\nWhen a new signing joins the club, we want to stamp their name onto their new jersey instantly! We can use Python's constructor method `__init__` to assign vital details immediately when a new player object is created.",
    task: "### YOUR MISSION\n\nInside `FootballPlayer`, define the constructor method `__init__` which accepts `self` and a parameter `name`. Assign the `name` value to `self.name`.",
    baseCode: "class FootballPlayer:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Define the method using 'def __init__(self, name):'.",
      "Inside, save the name to the player object using 'self.name = name'."
    ],
    solution: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "TRAINING_DRILL",
    missionPrefix: "SHOOT_PRACTICE",
    intro: "# On-Pitch Abilities: Methods\n\nA professional roster needs tools on the field. In Object-Oriented Programming, functions defined inside a class are called **Methods**. Let's add a shoot action so our players can fire on goal!",
    task: "### YOUR MISSION\n\nAdd a `shoot` method to `FootballPlayer` that `print`s \"Shot on target\".",
    baseCode: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define shoot method\n",
    hints: [
      "Define 'def shoot(self):' as part of the class.",
      "Use print('Shot on target') inside the method."
    ],
    solution: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n    def shoot(self):\n        print(\"Shot on target\")",
    solutionRegex: [/def\s+shoot\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Shot on target['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "FITNESS_MONITOR",
    missionPrefix: "STRENGTH_CHECK",
    intro: "# Managing Player Energy: Object State\n\nEach player tracks their physical shape individually on the pitch. No two players have the exact same fatigue. We can store this as an instance variable inside our class and update it depending on their on-field actions.",
    task: "### YOUR MISSION\n\n1. In `__init__`, add a `match_state` instance variable defaulted to the string \"Standby\".\n2. Create a method `play_match` that updates the player's `self.match_state` to the string \"Active\".",
    baseCode: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add match_state default\n    # TODO: Add play_match method\n",
    hints: [
      "Inside __init__, initialise 'self.match_state = \"Standby\"'.",
      "Under 'def play_match(self):', set 'self.match_state = \"Active\"'."
    ],
    solution: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n        self.match_state = \"Standby\"\n    def play_match(self):\n        self.match_state = \"Active\"",
    solutionRegex: [/self\.match_state\s*=\s*['"]Standby['"]/, /def\s+play_match/, /self\.match_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "SQUAD_COMMS",
    missionPrefix: "PLAY_LINK",
    intro: "# Tiki-Taka: Object Interaction\n\nFootball is a team game! Objects can interact with one another by receiving other instances of a class as variables. Let's design a quick passing-link between two midfielders.",
    task: "### YOUR MISSION\n\nAdd a `pass_to` method to `FootballPlayer` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Passing to: {other.name}\"`.",
    baseCode: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add pass_to method\n",
    hints: [
      "Define 'def pass_to(self, other):' inside the class.",
      "Use an f-string to access the other player's name via other.name."
    ],
    solution: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n    def pass_to(self, other):\n        print(f\"Passing to: {other.name}\")",
    solutionRegex: [/def\s+pass_to\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "ROSTER_UPGRADE",
    missionPrefix: "KEEPER_SPECIAL",
    intro: "# Specialized Squad Roles: Inheritance\n\nA Goalkeeper is a football player, but gets completely different rules—like being allowed to use their hands! We can inherit the base `FootballPlayer` characteristics and extend them to build a specialized `Goalkeeper` class.",
    task: "### YOUR MISSION\n\nCreate a class `Goalkeeper` that inherits from `FootballPlayer`. Give it a `make_save` method that `print`s \"Goalkeeper diving save\".",
    baseCode: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create Goalkeeper subclass inheriting from FootballPlayer\n",
    hints: [
      "Use 'class Goalkeeper(FootballPlayer):' to inherit.",
      "Define 'def make_save(self):' and have it print 'Goalkeeper diving save'."
    ],
    solution: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n\nclass Goalkeeper(FootballPlayer):\n    def make_save(self):\n        print(\"Goalkeeper diving save\")",
    solutionRegex: [/class\s+Goalkeeper\s*\(\s*FootballPlayer\s*\)\s*:/, /def\s+make_save/, /print\s*\(\s*['"]Goalkeeper diving save['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "SQUAD_LEADERBOARD",
    missionPrefix: "ROSTER_STATS",
    intro: "# Squad Roster Output: Special Str Method\n\nIf we try to print a player object directly, Python prints an unreadable memory hex. We can override the special `__str__` method to output a readable string representation for our roster dashboards!",
    task: "### YOUR MISSION\n\nIn `FootballPlayer`, add the custom method `__str__` that returns: `f\"Football Player {self.name}\"`.",
    baseCode: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define 'def __str__(self):'.",
      "Make sure you return (do not print) the formatted f-string: f'Football Player {self.name}'"
    ],
    solution: "class FootballPlayer:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Football Player {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Football Player.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "CLUB_HEADQUARTERS",
    missionPrefix: "CLUB_STANDARD",
    intro: "# Universal Club Colours: Shared Class Variables\n\nEvery single player on our team has unique names and match physical status, but they *all* play for the exact same club! We can use a Class Variable to store shared constants that apply to all instances globally, saving valuable memory space.",
    task: "### YOUR MISSION\n\n1. Define a class variable `club` set to \"FC Python\" in `FootballPlayer` before other initialisers.\n2. `print` the class variable using `FootballPlayer.club`.",
    baseCode: "class FootballPlayer:\n    # TODO: Define class variable 'club'\n    pass\n# TODO: Print FootballPlayer.club\n",
    hints: [
      "Place 'club = \"FC Python\"' immediately under the class declaration.",
      "Print the value of FootballPlayer.club outside the class."
    ],
    solution: "class FootballPlayer:\n    club = \"FC Python\"\n\nprint(FootballPlayer.club)",
    solutionRegex: [/club\s*=\s*['"]FC Python['"]/, /print\s*\(\s*FootballPlayer\.club\s*\)/]
  }
};