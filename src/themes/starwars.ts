export const STARWARS_THEME: any = {
  "intro-print": {
    headerPrefix: "ASTROMECH_UPLINK",
    missionPrefix: "BOOT_ROUTINE",
    intro: "# Initialising Astromech Core: print()\n\nWelcome to the Rebel Alliance starfighter cockpit. Before powering up the thrusters, broadcast a system check signal to ensure your astromech droid is fully online!",
    task: "Use `print()` to display: `\"Astromech Link: ACTIVE\"`",
    baseCode: "# TODO: Check astromech online status\n",
    solution: "print(\"Astromech Link: ACTIVE\")",
    solutionRegex: [/print\s*\(\s*['\"]Astromech Link: ACTIVE['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "REBEL_STYLE",
    missionPrefix: "STANDARD_CASING",
    intro: "# Droid Translators: Standard Casing\n\nAstromech droids process mainframe overrides in standardized, case-sensitive bytecode. Executing uppercase commands like `Print()` will trigger security warnings across the Imperial sectors! Keep all bypass commands and rebel variables in standard lowercase.",
    task: "Store the hyperspace power count in a lowercase variable named `hyperdrive_cells` with value `800`. Print it using `print()` to trigger the jump to hyperspace! Remember, keep everything lowercase.",
    baseCode: "# TODO: Initialize hyperdrive_cells and print it\n",
    solution: "hyperdrive_cells = 800\nprint(hyperdrive_cells)",
    solutionRegex: [/hyperdrive_cells\s*=\s*800/, /print\s*\(\s*hyperdrive_cells\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "DEATH_STAR_SCHEMATICS",
    missionPrefix: "EXPLOIT_TAG",
    intro: "# Secret Alliance Logs: Comments\n\nThe Empire is watching our transmissions. Use comments to document structural weaknesses in the Death Star's thermal exhaust ports without raising any suspicion from Imperial sensors.",
    task: "Write a comment `# Imperial exhaust flaw` and then `print(\"Analysing...\")`",
    baseCode: "# TODO: Add secure log\n",
    solution: "# Imperial exhaust flaw\nprint(\"Analysing...\")",
    solutionRegex: [/#.*Imperial exhaust flaw/, /print\s*\(\s*['\"]Analysing\.\.\.['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "REBEL_HUD",
    missionPrefix: "DEFLECTOR_SYNC",
    intro: "# Targeting Computer: Inline Comments\n\nDuring high-stakes outer rim dogfights, Rebel fighters must tune their shields on the fly. Add quick deflector notes directly next to your defence frequencies.",
    task: "Initialise `shield_frequency` to `108`. On the same line, add an inline comment `# Deflector override`.",
    baseCode: "# TODO: Map shield frequency with inline comment\n",
    solution: "shield_frequency = 108 # Deflector override",
    solutionRegex: [/shield_frequency\s*=\s*108/, /#.*Deflector override/]
  },
  "intro-vars": {
    headerPrefix: "SQUADRON_DOCK",
    missionPrefix: "LOADOUT_SYNC",
    intro: "# Starfighter Loadout: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled storage bin** in your starfighter's inventory bay! You give the bin a name (like `torpedoes`), store ammunition or power values inside, and retrieve or update it during flight.\n\nPrepare your ship for battle. Let's use variables to track your photon torpedo count and total shield power capacity.",
    task: "Create `torpedoes` set to `4` and `shields` set to `100`.",
    baseCode: "# TODO: Load starfighter inventory\n",
    solution: "torpedoes = 4\nshields = 100",
    solutionRegex: [/torpedoes\s*=\s*4/, /shields\s*=\s*100/]
  },
  "vars-reassignment": {
    headerPrefix: "HYPERDRIVE_SYS",
    missionPrefix: "SPEED_CALIBRATE",
    intro: "# Hyperdrive Ignition: Reassignment\n\nYou are preparing your X-Wing's hyperdrive for the jump to lightspeed. Your navigation computer needs to calibrate its warp velocity multiplier.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "hyperdrive_multiplier = 1.0\nprint(hyperdrive_multiplier)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\nhyperdrive_multiplier = 2.1\nprint(hyperdrive_multiplier)  # Output: 2.1",
    task: "Initialise `hyperdrive_multiplier` as `1.0`. Then update `hyperdrive_multiplier` to `2.1` to jump to hyperspace. Print it.",
    baseCode: "hyperdrive_multiplier = 1.0\n# TODO: Engage hyperdrive to 2.1\n",
    solution: "hyperdrive_multiplier = 1.0\nhyperdrive_multiplier = 2.1\nprint(hyperdrive_multiplier)",
    solutionRegex: [/hyperdrive_multiplier\s*=\s*1\.0/, /hyperdrive_multiplier\s*=\s*2\.1/, /print\s*\(\s*hyperdrive_multiplier\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "REBEL_TRANSPONDER",
    missionPrefix: "SIGNAL_CATCH",
    intro: "# Echo Request: Astromech Transponder\n\nWait for the starship's communication array to push an incoming distress beacon from the Princess's cruiser! Before the transmission passes by your cockpit display, set up a placeholder variable in R2-D2's memory buffer to catch and secure the incoming coordinate frequency.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `starwars_data = \"\"` as a placeholder, we allocate space in memory. Then, running `starwars_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the new signal dynamically so you can see it change!",
    example: "starwars_data = \"\"  # Memory slot is allocated and empty\nstarwars_data = input(\"Enter beacon frequency: \")  # Line 2 updates the empty string with your input!\nprint(\"Receiving signal: \" + starwars_data)",
    task: "1. Initialize `starwars_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter beacon frequency: \")` to populate it.\n3. Print `\"Receiving signal: \" + starwars_data`.",
    baseCode: "# TODO: Initialize empty transponder, capture, and print\n",
    hints: [
      "Use starwars_data = \"\" to prepare the transponder.",
      "Use starwars_data = input(\"Enter beacon frequency: \") to capture the stream.",
      "Print \"Receiving signal: \" combined with the starwars_data variable."
    ],
    solution: "starwars_data = \"\"\nstarwars_data = input(\"Enter beacon frequency: \")\nprint(\"Receiving signal: \" + starwars_data)",
    solutionRegex: [/starwars_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    title: "Smuggler Evasion: Multi-Assignment",
    headerPrefix: "FALCON_CONCEAL",
    missionPrefix: "CARGO_MASQUERADE",
    intro: "# Smuggler Evasion: Multi-Assignment\n\nAn Imperial Star Destroyer just caught the Millennium Falcon in its deep-space sensor scanner! To evade immediate impoundment, Han Solo needs to spoof their sensor arrays.\n\nInitialise both our registered vessel signature and our manifested cargo scan profile on a single line of code to mask our smuggled rebel plans.",
    technical: "### Smuggler Dual-Sync:\n- Speed is everything. Multi-assignment lets you assign values to multiple variables at once in one line.\n- Format: `variable1, variable2 = value1, value2`.",
    example: "pilot, navigator = \"Han\", \"Chewie\"",
    task: "### YOUR MISSION\n\nAssign `falcon_signature` to `\"YT-1300_LIGHT_FREIGHTER\"` and `cargo_profile` to `\"SCRAP_METAL\"` in a single line of code.",
    baseCode: "# TODO: Mask ship parameters on one line\n",
    hints: [
      "Use the comma separation: falcon_signature, cargo_profile = \"YT-1300_LIGHT_FREIGHTER\", \"SCRAP_METAL\"",
      "Make sure you initialise both variables on the same line."
    ],
    solution: "falcon_signature, cargo_profile = \"YT-1300_LIGHT_FREIGHTER\", \"SCRAP_METAL\"",
    solutionRegex: [/falcon_signature\s*,\s*cargo_profile\s*=\s*['\"]YT-1300_LIGHT_FREIGHTER['\"]\s*,\s*['\"]SCRAP_METAL['\"]/]
  },
  "data-strings": {
    headerPrefix: "TRANSMISSION_DECODER",
    missionPrefix: "NAV_READOUT",
    intro: "# Intercepted Transmissions: Strings\n\nDecoding Imperial beacon signals requires reading raw text patterns of stellar sectors. Extract the target coordinates from the transmission.",
    task: "Create a variable `destination` set to `\"Tatooine\"`. Print it.",
    baseCode: "# TODO: Intercept coordinates\n",
    solution: "destination = \"Tatooine\"\nprint(destination)",
    solutionRegex: [/destination\s*=\s*['\"]Tatooine['\"]/, /print\s*\(\s*destination\s*\)/]
  },
  "data-booleans": {
    headerPrefix: "COCKPIT_HUD",
    missionPrefix: "INTEGRITY_CHECK",
    intro: "# Jedi Intuition: Booleans\n\nIs the Force with you? Are the flight deflectors operational? Use booleans to monitor the state of your ship and your connection to the Light Side.",
    task: "Set `force_aligned` to `True` and `deflector_offline` to `False`.",
    baseCode: "# TODO: Check integrity status\n",
    solution: "force_aligned = True\ndeflector_offline = False",
    solutionRegex: [/force_aligned\s*=\s*True/, /deflector_offline\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "NAV_COMPUTER",
    missionPrefix: "JUMP_CALC",
    intro: "# Hyperspace Math: Math\n\nHan needs those coordinates fast! Calculate the total distance through the asteroid field by adding the safe corridor length to the final approach parsecs.",
    task: "Create `safe_corridor` as `12` and `final_approach` as `3`. Store the sum in `total_parsecs` and print it.",
    baseCode: "# TODO: Prepare for lightspeed jump\n",
    solution: "safe_corridor = 12\nfinal_approach = 3\ntotal_parsecs = safe_corridor + final_approach\nprint(total_parsecs)",
    solutionRegex: [/total_parsecs\s*=\s*safe_corridor\s*\+\s*final_approach/]
  },
  "math-advanced": {
    title: "Tractor Beam Breakout: Modulo & Power",
    headerPrefix: "FALCON_POWER_GRID",
    missionPrefix: "MODULO_STABILIZER",
    intro: "# Tractor Beam Breakout: Modulo & Power\n\nAn Imperial Star Destroyer has locked onto the Millennium Falcon with a high-intensity tractor beam! To disrupt the gravitational pull without overloading our primary shields, we must execute a precise reverse-frequency discharge pulse.\n\nFirst, we need to balance our auxiliary fuel conduits. Dividing our 10 fuel injectors equally into 3 generator banks leaves an unallocated remainder, which we can isolate using the **modulo operator (`%`)**.\n\nSecond, to break the magnetic lock, we must exponentially increase our shield emitter coupling. We will calculate the amplification factor by raising 2 to the 8th power using the **power operator (`**`)**.",
    technical: "### Tactical Calculations:\n- **Modulo (`%`)**: Returns the remainder left over after division. Perfect for finding the remaining unaligned power units.\n- **Power (`**`)**: Performs exponential calculation, raising a base number to a power.",
    example: "remainder = 14 % 5         # remainder is 4\nshield_strength = 3 ** 3   # raises 3 to the 3rd power (27)",
    task: "### YOUR MISSION\n\n1. Calculate the residual energy remainder of `10 % 3` and store the result in `extra_bit`.\n2. Calculate the exponent discharge frequency of `2 ** 8` and store the result in `encryption_strength`.\n3. Print both variables to fire the shield pulse and break the imperial lock!",
    baseCode: "# TODO: Calculate extra_bit and encryption_strength, then print both\n",
    hints: [
      "Use modulo to find the remainder of 10 divided by 3: extra_bit = 10 % 3",
      "Use double asterisks for exponents to raise 2 to the 8th power: encryption_strength = 2 ** 8"
    ],
    solution: "extra_bit = 10 % 3\nencryption_strength = 2 ** 8\nprint(extra_bit)\nprint(encryption_strength)",
    solutionRegex: [/extra_bit\s*=\s*10\s*%\s*3/, /encryption_strength\s*=\s*2\s*\*\*\s*8/]
  },
  "math-bidmas": {
    title: "Stealing Death Star Plans: BIDMAS",
    headerPrefix: "REBEL_INFILTRATION",
    missionPrefix: "SHIELD_DECRYPT",
    intro: "# Stealing Death Star Plans: BIDMAS\n\nTo steal the Death Star plans, the Rebel Alliance must break into the highly secured Imperial Archives vault on Scarif. The data vault terminal is protected by complex security shield grids. To bypass both defence firewalls without alerting Lord Vader, you must trigger precise frequency channels!\n\nUse mathematical order of operations (BIDMAS/PEMDAS) to compute the exact override patterns. Notice how a simple set of parentheses `()` changes the priority of the shield codes, yielding entirely different security calculations.",
    technical: "### Tactical Priority Keys:\n- **Brackets `()`**: Forces evaluation first.\n- **Multiplication `*`**: Always evaluates before addition `+` unless overridden by brackets.",
    example: "charge_a = (10 + 5) * 2  # Brackets first: 15 * 2 = 30\ncharge_b = 10 + (5 * 2)  # Multiplication first: 10 + 10 = 20",
    task: "### YOUR MISSION\n\n1. Calculate `(20 + 5) * 4` and store the result in `set_a` (Vault Override Frequency A).\n2. Calculate `20 + (5 * 4)` and store the result in `set_b` (Vault Override Frequency B).\n3. Print both frequencies to sync with the transmission deck and extract the Death Star schematics.",
    baseCode: "# TODO: Calculate set_a and set_b, then print both\n",
    hints: [
      "Use brackets to prioritize additions: set_a = (20 + 5) * 4",
      "For set_b, use set_b = 20 + (5 * 4) to ensure separate alignment."
    ],
    solution: "set_a = (20 + 5) * 4\nset_b = 20 + (5 * 4)\nprint(set_a)\nprint(set_b)",
    solutionRegex: [/set_a\s*=\s*\(\s*20\s*\+\s*5\s*\)\s*\*\s*4/, /set_b\s*=\s*20\s*\+\s*\(\s*5\s*\*\s*4\s*\)/]
  },
    "math-complex": {
    title: "Smuggler Payout: Falcon Ledger",
    headerPrefix: "REBEL_REWARDS",
    missionPrefix: "LEDGER_CALC",
    intro: "# Smuggler Payout: Math Review\n\nHan Solo has successfully rescued Princess Leia from the Death Star and returned to the Rebel base on Yavin 4. Now, the Rebel leadership is ready to pay him his promised reward.\n\nHowever, Solo's reward calculation is complex:\nFirst, Leia grants Han a `gross_reward` of `80` thousand credits.\nBut Han must instantly allocate `-10` thousand credits for `repair_costs` to patch the Millennium Falcon's hyperdrive and armor plating after the furious Star Destroyer escape.\nFinally, Jabba the Hutt's notorious bounty fee must be paid. Fortunately, Chewbacca managed to negotiate a discount, leaving Solo with an 80% multiplier (`0.8`) of the remaining sum.\n\nCombine these operators to calculate the smuggler's final payout ledger safely!",
    technical: "### Operations Priority:\n1. **Operation Grouping**: Wrap your base values and repair offsets inside parentheses `()` before scaling with the discount multiplier.\n2. **Prioritization**: Brackets ensure additions/deductions are calculated before the final multiplier is applied.",
    example: "gross_reward = 100\nrepair_costs = -20\nfinal_payout = (gross_reward + repair_costs) * 0.9\nprint(final_payout)",
    task: "### YOUR MISSION\n\nCalculate Han Solo's final payout after repairing the Falcon:\n1. Set `gross_reward` as `80`.\n2. Set `repair_costs` as `-10`.\n3. Calculate the final reward: add `gross_reward` and `repair_costs`, multiply the sum by `0.8`, and store it in `final_payout`.\n4. Print `final_payout`.",
    baseCode: "# TODO: Calculate Han Solo's final reward\n",
    hints: [
      "Define gross_reward = 80 and repair_costs = -10.",
      "Calculate: final_payout = (gross_reward + repair_costs) * 0.8",
      "Print the final result using print(final_payout)."
    ],
    solution: "gross_reward = 80\nrepair_costs = -10\nfinal_payout = (gross_reward + repair_costs) * 0.8\nprint(final_payout)",
    solutionRegex: [/gross_reward\s*=\s*80/, /repair_costs\s*=\s*-\s*10/, /final_payout\s*=\s*\(\s*gross_reward\s*\+\s*repair_costs\s*\)\s*\*\s*0\.8/, /print\s*\(\s*final_payout\s*\)/]
  },
"intro-lists": {
    headerPrefix: "REBEL_LOGS",
    missionPrefix: "SQUADRON_SYNC",
    intro: "# Pilot Roster: Lists\n\nTally up the pilots currently in X-Wing formation. Red Leader needs to know who's ready for the trench run.",
    technical: "### Starfighter Squadron lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) flight line-up of starfighters grouped under a single squadron name. Instead of keeping a separate nav-system entry for each pilot (e.g., `p1 = \"Luke\"`, `p2 = \"Wedge\"`), a list allows you to sync and monitor your entire active squadron sequence together.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, which act as the solid protective hangar walls around your ships.\n- **Comma Separation**: Every pilot registered in your flight log must be separated by a comma.\n- **Zero-Based Flight Slots**: Python lists use zero-based indexing. The flight leader of your squadron coordinates from index `0`, the wingman at `1`, and the wingman's cover at `2`.",
    example: "# Log multiple fighters in a single list variable\nstarfighters = [\"X-Wing\", \"Y-Wing\", \"A-Wing\"]\nprint(starfighters)  # Transmits the active squadron manifest",
    task: "Initialise your `squadron` list with \"Luke\", \"Wedge\", and \"Biggs\". Print the list to confirm the flight plan.",
    baseCode: "# TODO: Log active pilots\n",
    solution: "squadron = [\"Luke\", \"Wedge\", \"Biggs\"]\nprint(squadron)",
    solutionRegex: [/squadron\s*=\s*\[/, /print\s*\(\s*squadron\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "FORMATION_SCAN",
    missionPrefix: "YOUR TASK",
    intro: "# Wing Commander: Pilot Indexing\n\nThe Death Star is in range! Red Leader needs to isolate the lead trench pilots directly from the squadron formation array.",
    technical: "### Starfighter Positions:\n\n```text\nsquadron = [\"Luke\", \"Wedge\", \"Biggs\"]\n#          [0]      [1]        [2]\n```",
    example: "# Select trench run pilots from squadron roster using index positions\nsquadron = [\"Luke\", \"Wedge\", \"Biggs\"]\n\n# Retrieve lead pilot (index 0)\np1 = squadron[0]\nprint(p1)  # Output: Luke\n\n# Retrieve wingman pilot (index 2)\np3 = squadron[2]\nprint(p3)  # Output: Biggs",
    task: "1. Select the pilot at index 0 from `squadron` and store them in `p1`.\n2. Select the wingman at index 2 and store them in `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "squadron = [\"Luke\", \"Wedge\", \"Biggs\"]\n# TODO: Launch pilots from slots 0 and 2\n",
    solution: "p1 = squadron[0]\np3 = squadron[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*squadron\s*\[\s*0\s*\]/, /p3\s*=\s*squadron\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "WING_SYNC",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value rebel fighter squadron pilot is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "squadron = [\"Luke\",\"Wedge\",\"Biggs\"]\nsquadron.append(\"Han\")\n# squadron is now updated!",
    task: "1. Append \"Han\" to the `squadron` list.\n2. Print the final `squadron` list to confirm installation.",
    baseCode: "squadron = [\"Luke\",\"Wedge\",\"Biggs\"]\n# TODO: Append value and print\n",
    solution: "squadron.append(\"Han\")\nprint(squadron)",
    solutionRegex: [/squadron\.\s*append\s*\(\s*['"]Han['"]\s*\)/, /print\s*\(\s*squadron\s*\)/]
  },
  "list-pop": {
    headerPrefix: "CHUTE_FLUSH",
    missionPrefix: "YOUR TASK",
    intro: "# Chute Flush: .pop()\n\nOh no! The garbage compactor walls on the Death Star are closing in, and there is a Dianoga monster lurking in the waste water! Flush the trash chute immediately to lighten our load. Use `.pop()` to eject the last item into space and clear a path to the maintenance hatch!",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = trash_chute_items.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `trash_chute_items` list and store it inside a variable named `ejected_debris`.\n2. Print `ejected_debris` to output the purged token.",
    baseCode: "trash_chute_items = [\"Scrap Metal\",\"Soggy Cushion\",\"Dianoga Monster\"]\n# TODO: Pop last element and print\n",
    solution: "ejected_debris = trash_chute_items.pop()\nprint(ejected_debris)",
    solutionRegex: [/ejected_debris\s*=\s*trash_chute_items\.\s*pop\s*\(\s*\)/, /print\s*\(\s*ejected_debris\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "NAV_COMPUTER_COORDS",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Navicomputer-Shielded Tuples:\n- **What is a Tuple?**: A tuple is an ordered sequence of elements, like a ship's manifest, but with an absolute galactic distinction: **lists are mutable** (meaning you can swap hyperdrive components or add cargo at will), whereas **tuples are immutable** (their coordinates and hyperdrive vectors are permanently locked and hardcoded into the Navicomputer, preventing any dangerous mid-hyperspace modifications).\n- **Syntax**: Enclosed inside secure round parentheses `()` instead of square brackets `[]`.\n- **Speed & Security**: Because tuples are simpler and read-only, astromech droids can process them faster, shielding critical data (like secret Rebel Base coordinates) from accidental or malicious overrides.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `yavin_coordinates` containing \"Rebel Base Core\" and the number `327`.\n2. Print the `yavin_coordinates` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "yavin_coordinates = (\"Rebel Base Core\", 327)\nprint(yavin_coordinates)",
    solutionRegex: [/yavin_coordinates\s*=\s*\(\s*['"]Rebel Base Core['"]\s*,\s*327\s*\)/, /print\s*\(\s*yavin_coordinates\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "HYPER_CALIBRATION",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `jedi_holocrons` containing the single string \"Padawan Log\"\n2. Create a tuple named `hyperdrive_ratio` containing the numbers `0` and `5`.\n3. Rewrite `jedi_holocrons[0]` to be \"Master Legacy\"\n4. Print both `jedi_holocrons` and `hyperdrive_ratio`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "jedi_holocrons = [\"Padawan Log\" ]\nhyperdrive_ratio = (0, 5)\njedi_holocrons[0] = \"Master Legacy\"\nprint(jedi_holocrons)\nprint(hyperdrive_ratio)",
    solutionRegex: [/jedi_holocrons\s*\[\s*0\s*\]\s*=\s*['"]Master Legacy['"]/, /hyperdrive_ratio\s*=\s*\(\s*0\s*,\s*5\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "FORCE_ORDER_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `force_academy_ranks` list.\n2. Store this result in a new variable named `middle_ranks`.\n3. Print the resulting slice `middle_ranks`.",
    baseCode: "force_academy_ranks = [\"Initiate\",\"Padawan\",\"Knight\",\"Master\",\"Grandmaster\",\"Ghost\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "middle_ranks = force_academy_ranks[1:4]\nprint(middle_ranks)",
    solutionRegex: [/middle_ranks\s*=\s*force_academy_ranks\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*middle_ranks\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "SENSITIVE_SWEEP",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `midichlorians`.\n2. Store the result in a variable named `force_sensitives`.\n3. Print `force_sensitives`.",
    baseCode: "midichlorians = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "force_sensitives = [m for m in midichlorians if m > 50]\nprint(force_sensitives)",
    solutionRegex: [/force_sensitives\s*=\s*\[\s*m\s+for\s+m\s+in\s+midichlorians\s+if\s+m\s*>\s*50\s*\]/, /print\s*\(\s*force_sensitives\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "HYPERGATE_TALLY",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `rebel_beacons` list using a list comprehension.\n2. Store this filtered list in a new variable named `active_hypergates`.\n3. Print `active_hypergates`.",
    baseCode: "rebel_beacons = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "active_hypergates = [b for b in rebel_beacons if b % 2 == 0]\nprint(active_hypergates)",
    solutionRegex: [/active_hypergates\s*=\s*\[\s*b\s+for\s+b\s+in\s+rebel_beacons\s+if\s+b\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*active_hypergates\s*\)/]
  },
  "intro-input": {
    headerPrefix: "NAV_RECORDS",
    missionPrefix: "YOUR TASK",
    intro: "# Millennium Falcon Navicomputer: Starhip Input\n\nThe Empire is closing in! To bypass automated Imperial tractor beams, prompt the pilot to identify which sector jump coordinate they wish to plot.",
    technical: "### Galactic Coordinate Fetching:\n- The `input()` protocol queries pilots for coordinates directly within astromech flight decks.\n- Instantly routes navigation thrusters through hyperspace.\n- **Hyperdrive Concatenation**: Glue coordinate vectors or astromech logs together using the `+` operator (e.g., `\"Death\" + \"Star\"` becomes `\"DeathStar\"`). Be mindful of spaces within your text strings, otherwise the Imperial coordinate link will fuse together!",
    example: "ship = input(\"Enter starship: \")\nprint(\"Configuring shields for: \" + ship)",
    task: "1. Ask the pilot for the flight path with the prompt: **\"Enter flight path: \"** and store it in a variable named `flight_path`.\n2. Print **\"Plotting course to: \"** concatenated with the user\'s `flight_path` value.",
    baseCode: "# TODO: Capture path and plot core jumps\n",
    solution: "flight_path = input(\"Enter flight path: \")\nprint(\"Plotting course to: \" + flight_path)",
    solutionRegex: [/flight_path\s*=\s*input\s*\(\s*['\"]Enter flight path: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Plotting course to: \s*['\"]\s*\+\s*flight_path\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "REBEL_LOG",
    missionPrefix: "LOG_GEN",
    intro: "# Astromech Logs: Story Generator\n\nGenerate customized sector navigation records to keep the rebellion log system up to date. Prompt the pilot for critical hyperdrive variables.",
    technical: "### Concatenating Star Maps:\nCombine celestial coordinates and starship registries in sequence using the + operator. Pay close attention to spacing!",
    example: "pilot = \"Han\"\nbase = \"Yavin 4\"\nreport = pilot + \" flight to \" + base\nprint(report)",
    task: "1. Ask the pilot for their name with the prompt: **\"Enter pilot name: \"** and store it in `pilot`.\n2. Ask the pilot for the imperial sector with the prompt: **\"Enter imperial sector: \"** and store it in `sector`.\n3. Ask the pilot for the starfighter with the prompt: **\"Enter starfighter: \"** and store it in `starfighter`.\n4. Combine into a variable named `rebel_log` using the format: `pilot + \" bypassed \" + sector + \" with a \" + starfighter + \"!\"` and print `rebel_log`.",
    baseCode: "# TODO: Compile pilot flight logs\n",
    solution: "pilot = input(\"Enter pilot name: \")\nsector = input(\"Enter imperial sector: \")\nstarfighter = input(\"Enter starfighter: \")\nrebel_log = pilot + \" bypassed \" + sector + \" with a \" + starfighter + \"!\"\nprint(rebel_log)",
    solutionRegex: [/pilot\s*=\s*input\s*\(\s*['"]Enter pilot name:\s*['"]\s*\)/, /sector\s*=\s*input\s*\(\s*['"]Enter imperial sector:\s*['"]\s*\)/, /starfighter\s*=\s*input\s*\(\s*['"]Enter starfighter:\s*['"]\s*\)/, /rebel_log\s*=\s*pilot\s*\+\s*['"] bypassed ['"]\s*\+\s*sector\s*\+\s*['"] with a ['"]\s*\+\s*starfighter\s*\+\s*['"]!['"]/, /print\s*\(\s*rebel_log\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "SCOMP_OVERRIDE",
    missionPrefix: "HYPERSPACE_ERR",
    intro: "# Chopper Protocols: Starship Log Error\n\nChopper locked out the imperial navcomputer after a hyperspace surge! Overwrite the flight log entry with five rebel indicators.",
    technical: "### Hyperspace Data Chains:\nCombine astromech parameters, security keys, and spaceport coordinates chronologically using correct string concatenation.",
    example: "astrolog = astromech + \" injected \" + link + \" into \" + node + \" at \" + gate + \". System is \" + state + \"!\"",
    task: "1. Ask the protocol droid for pilot with prompt: **\"Enter pilot name: \"** and store in `pilot`.\n2. Ask for nav bypass passcode with prompt: **\"Enter hyperdrive bypass: \"** and store in `bypass_pass`.\n3. Ask for destination space station with prompt: **\"Enter imperial gate: \"** and store in `garrison_gate`.\n4. Ask for shield security sector with prompt: **\"Enter security sector: \"** and store in `shield_sector`.\n5. Ask for astromech status with prompt: **\"Enter hyperdrive status: \"** and store in `hyperdrive_status`.\n6. Combine into a variable named `starfighter_glitch` and print using the exact format: `pilot + \" injected \" + bypass_pass + \" into \" + garrison_gate + \" at \" + shield_sector + \". System is \" + hyperdrive_status + \"!\"`.",
    baseCode: "# TODO: Compile the Hyperdrive override log\n",
    solution: "pilot = input(\"Enter pilot name: \")\nbypass_pass = input(\"Enter hyperdrive bypass: \")\ngarrison_gate = input(\"Enter imperial gate: \")\nshield_sector = input(\"Enter security sector: \")\nhyperdrive_status = input(\"Enter hyperdrive status: \")\nstarfighter_glitch = pilot + \" injected \" + bypass_pass + \" into \" + garrison_gate + \" at \" + shield_sector + \". System is \" + hyperdrive_status + \"!\"\nprint(starfighter_glitch)",
    solutionRegex: [/pilot\s*=\s*input\s*\(\s*['"]Enter pilot name:\s*['"]\s*\)/, /bypass_pass\s*=\s*input\s*\(\s*['"]Enter hyperdrive bypass:\s*['"]\s*\)/, /garrison_gate\s*=\s*input\s*\(\s*['"]Enter imperial gate:\s*['"]\s*\)/, /shield_sector\s*=\s*input\s*\(\s*['"]Enter security sector:\s*['"]\s*\)/, /hyperdrive_status\s*=\s*input\s*\(\s*['"]Enter hyperdrive status:\s*['"]\s*\)/, /print\s*\(\s*starfighter_glitch\s*\)/]
  },
  "print-formatting": {
    title: "Imperial Database: F-Strings",
    headerPrefix: "CHASSIS_SCAN",
    missionPrefix: "COMMS_CRYPT",
    intro: "# Imperial Database: F-Strings\n\nIntercepting Imperial comms streams requires dynamic header rendering. Hook up your navicomputer variables to broadcast localized security levels to bypassing Star Destroyers.",
    technical: "### F-String Protocol:\n- **F-Prefix**: Format strings on-the-fly using `f\'...\'` syntax.\n- **Braces Evaluation**: Put your variables inside `{}` inside the quotes to instantly substitute their runtime values.",
    example: "jedi = \'Luke\'\nprint(f\'Vessel owned by {jedi}\') # Outputs: Vessel owned by Luke",
    task: "### YOUR MISSION\n\nYou have `alias = \'Rebel Pilot\'` and `level = 4`. Use an **f-string** to print: `Pilot: Rebel Pilot | Squadron Rank: 4`.",
    baseCode: "alias = \'Rebel Pilot\'\nlevel = 4\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Put {alias} and {level} inside curly braces within the string."
    ],
    solution: "alias = \'Rebel Pilot\'\nlevel = 4\nprint(f\'Pilot: {alias} | Squadron Rank: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Pilot:\s*\{alias\}\s*\|\s*Squadron\s*Rank:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Squadron Hyperspace: Advanced F-Strings",
    headerPrefix: "NAV_COMMS",
    missionPrefix: "SQUAD_JUMP",
    intro: "# Squadron Comms: Advanced F-Strings\n\nCoordinate starfighters entering the hyperspace lanes. Your navicomputer uses f-strings to format target coordinates and render pilot sector designations in uppercase on the HUD.",
    technical: "### Navicomputer Calculations:\n- **Inline Math**: Add fighter squads or calculate parsecs inside the braces: `{fighters + recruits}`.\n- **String Methods**: Force callsigns or target regions to capital letters automatically using `.upper()`.",
    example: "s1, s2 = 4, 8\nprint(f'X-Wings in squad: {s1 + s2}')",
    task: "### YOUR MISSION\n\n1. Prompt for fighter count with: **\"Enter fighter count: \"** and store it as an integer in `fighters`.\n2. Prompt for destination system with: **\"Enter target system: \"** and store it in `system`.\n3. Use an **f-string** to print: `Deploying {fighters} fighters to {system.upper()}...`.",
    baseCode: "# TODO: Launch starfighter cohort\n",
    hints: [
      "Ask for fighters using int(input(\"Enter fighter count: \"))",
      "Ask for system using input(\"Enter target system: \")",
      "Use {fighters} and {system.upper()} in your f-string."
    ],
    solution: "fighters = int(input(\"Enter fighter count: \"))\nsystem = input(\"Enter target system: \")\nprint(f\"Deploying {fighters} fighters to {system.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{fighters\}\s*fighters\s*to\s*\{system\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Empire Hangar Operations: Casting to Int",
    headerPrefix: "HANGAR_LOG",
    missionPrefix: "FIGHTER_RECAST",
    intro: "# Imperial Fleet Control: Integer Quantizing\\n\\nTIE fighter launch manifests are updated via regional command lines. Quantize arrival strings into structural integers so the Death Star hangar computer can plan launch formations.",
    technical: "### Fleet Calculations:\\n- Use `int(input(\\\"Prompt\\\"))` to immediately cast incoming flight text lines into math-ready integers.",
    example: "shuttles = int(input(\"Shuttles docked: \"))\ntotal_ships = shuttles + 2",
    task: "### YOUR MISSION\\n\\nCalculate incoming squad forces:\\n1. Prompt for TIE Fighters with **\\\"Enter TIE Fighter count: \\\"** and store it as an integer in `tie_fighters`.\\n2. Prompt for Interceptors with **\\\"Enter interceptor count: \\\"** and store it as an integer in `interceptors`.\\n3. Print the total combined number of starfighters ready inside the Imperial hangar.",
    baseCode: "# TODO: Cast starfighter counts and sum them\\n",
    hints: [
      "Use tie_fighters = int(input(\\\"Enter TIE Fighter count: \\\"))",
      "Use interceptors = int(input(\\\"Enter interceptor count: \\\"))",
      "Print the sum using tie_fighters + interceptors inside print()."
    ],
    solution: "tie_fighters = int(input(\\\"Enter TIE Fighter count: \\\"))\\ninterceptors = int(input(\\\"Enter interceptor count: \\\"))\\nprint(tie_fighters + interceptors)",
    solutionRegex: [/tie_fighters\s*=\s*int\s*\(\s*input/, /interceptors\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Dreadnought Deflectors: Casting to Float",
    headerPrefix: "DEFLECT_GRID",
    missionPrefix: "EMPIRE_SHIELD",
    intro: "# Deflector Calibration: Precision Decimal Floats\\n\\nProtect the TIE swarm during hyperspace jumps. Navicomputer shield readouts arrive as string outputs from remote satellites. Convert them to floats to calculate exact energy barriers.",
    technical: "### Imperial Shield Float Diagnostics:\\n- **What is a Float?**: While integers represent whole elements (like `100` stormtroopers), a `float` represents a decimal fractional quantity (e.g., `4.2` energy nodes, or `1.75` warp shield multipliers) for absolute protective shielding precision.\\n- **String Telemetry to Imperial Decimals**: All inputs captured from the remote terminal using `input()` stream in as string text. To compile them into structural math formulas, convert them using `float()`, e.g., `shield_val = float(input())`.\\n- **The Hyperdrive Failure (ValueError)**: Attempting to call `int()` on a decimal input sequence like `\"4.2\"` triggers a severe `ValueError` crash, disabling deflector shields instantly!",
    example: "hyper_parsecs = float(input(\"Sector parsecs: \"))\nfuel_burn = hyper_parsecs * 4.2",
    task: "### YOUR MISSION\\n\\nCalibrate starfighter deflector shields:\\n1. Prompt for core intensity with **\\\"Enter shield core intensity: \\\"** and store it as a float in `intensity`.\\n2. Prompt for generator efficiency with **\\\"Enter shield generator efficiency: \\\"** and store it as a float in `efficiency`.\\n3. Multiply core intensity by generator efficiency, and print the output.",
    baseCode: "# TODO: Calculate Imperial deflector capacity\\n",
    hints: [
      "Get intensity: intensity = float(input(\"Enter shield core intensity: \"))",
      "Get efficiency: efficiency = float(input(\"Enter shield generator efficiency: \"))",
      "Print intensity multiplied by efficiency."
    ],
    solution: "intensity = float(input(\"Enter shield core intensity: \"))\nefficiency = float(input(\"Enter shield generator efficiency: \"))\nprint(intensity * efficiency)",
    solutionRegex: [/intensity\s*=\s*float\s*\(\s*input/, /efficiency\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Holocron Core: Indentation Blocks",
    headerPrefix: "JEDI_ARCHIVE",
    missionPrefix: "FORCE_LIGHT",
    intro: "# Temple Archives: Logical Hierarchy\\n\\nUnlocking ancient Jedi holocrons requires mental and structural focus. Python groups commands together by formatting their indent values. A single loose space can sever your connection to the archives.",
    technical: "### Republic Coding Customs:\\n- A colon (`:`) marks the start of a sacred nested stream.\\n- Indent the sub-commands with precisely 4 spaces to bind them within the Force boundary.",
    example: "if True:\\n    print(\\\"Trust the Force\\\")  # Guided block",
    task: "### YOUR MISSION\\n\\nTap into the Archives:\\n1. Write an `if True:` force alignment.\\n2. Indent the subsequent line by exactly 4 spaces and print **\\\"Accessing...\\\"** to decrypt old galactic coordinates.",
    baseCode: "# TODO: Decrypt coordinates with 4 spaces\\n",
    hints: [
      "Write if True: to begin",
      "Press Spacebar 4 times on the next line to indent",
      "Execute print(\\\"Accessing...\\\") inside the aligned indentation"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Imperial Vaults: Double Security Gates",
    headerPrefix: "EMPIRE_CORE",
    missionPrefix: "DEEP_ARCHIVE",
    intro: "# Outer Rim Records: Secure Compartments\\n\\nFinding the lost archives of the Old Republic requires scanning deep Imperial vaults. Code blocks are layered inside parent conditions using cascading indent margins. Keep the Force aligned to prevent an encrypted lockout.",
    technical: "### Holocron Spacing Arrays:\\n- Outer gates utilize a single indentation offset (4 spaces).\\n- Deeper archives require a compounding **8-space margin limit** to operate correctly within the security envelope.",
    example: "if True:\\n    print(\"Outer Sanctum\")\\n    if True:\\n        print(\"Inner Sanctum\")  # Level 2 (8 spaces)",
    task: "### YOUR MISSION\\n\\nDecrypt classified spaceship flight log structures:\\n1. Initiate the outer planetary validation chamber using **`if True:`**.\\n2. Set up the inner databank validation check under it with a nested **`if True:`** (indented by 4 spaces).\\n3. Indented by exactly 8 spaces on the third line, print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Synchronize dual-layer archive vaults\\n",
    hints: [
      "Write if True: on the first line.",
      "On line 2, press space 4 times, then write if True:.",
      "On line 3, press space 8 times, then print(\"CORE ACCESS GRANTED\")."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "R2_SCANNER",
    missionPrefix: "FLIGHT_LOGIC",
    intro: "# Imperial Detection: If Statements\n\nR2-D2 has picked up an Imperial signature. Use an if statement to initiate the hyperspace jump before the TIE fighters zero in.",
    task: "If `imperial_ships` is `True`, print `\"JUMP TO HYPERSPACE\"`.",
    baseCode: "imperial_ships = True\n# TODO: Check for Imperial ships\n",
    solution: "imperial_ships = True\nif imperial_ships:\n    print(\"JUMP TO HYPERSPACE\")",
    solutionRegex: [/if\s+imperial_ships/, /print\s*\(\s*['\"]JUMP TO HYPERSPACE['\"]\s*\)/]
  },
  "control-else": {
    title: "Imperial Firewall: Else Command",
    headerPrefix: "DEATH_STAR_COM",
    missionPrefix: "CODE_FAILOVER",
    intro: "# Sector Decryption: If/Else Redundancy\\n\\nInfiltrating Imperial database centers requires structured error handlers. If the access pass is validated, download the tactical Death Star schematics. Otherwise, sound the base alarms to trigger a hangar escape. The `else` block serves as your safety barrier.",
    technical: "### Imperial Syntax Rules:\\n- Ensure the keyword `else:` aligns directly with the corresponding `if` command.\\n- Do not put a boolean logical comparison directly on the `else` statement line.",
    example: "if is_jedi:\\n    print(\\\"Force shield active\\\")\\nelse:\\n    print(\\\"Target locked\\\")",
    task: "### YOUR MISSION\\n\\nDecide the hangar door command sequence:\\n1. Construct an `if/else` control route measuring `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`** to cover your retreat.",
    baseCode: "key_valid = False\\n# TODO: Command security gates\\n",
    hints: [
      "Begin with if key_valid: (colon included).",
      "Indent to trigger the print(\\\"ACCESS GRANTED\\\") call.",
      "Place else: without indentation to initiate the fallback.",
      "Indent to print(\\\"ALARM TRIGGERED\\\")."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Republic Decryption: Elif Holocrons",
    headerPrefix: "TEMPLE_ARCH",
    missionPrefix: "TIER_FORCE",
    intro: "# Jedi Archives: Security Clearances\\n\\nThe Temple archives restrict access using old Old Republic keys. High-level holocrons require an `if/elif/else` sequence to properly sort padawans, knights, and archive-masters before granting entry.",
    technical: "### Jedi Spacing Rules:\\n- Chaining `elif` conditions lets the Temple mainframe evaluate multiple options sequentially.\\n- Keep your blocks nested with 4 clean spaces.",
    example: "if is_yoda:\\n    print(\"Master Yoda\")\\nelif is_jedi:\\n    print(\"Jedi Knight\")\\nelse:\\n    print(\"Intruder\")",
    task: "### YOUR MISSION\\n\\nSort Republic archive Clearance keys:\\n1. Code an `if/elif/else` structure assessing `clearance`.\\n2. If `clearance` is equal to `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Else, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Check Jedi Temple permissions\\n",
    hints: [
      "Check equality with if clearance == 1:",
      "Chain the intermediate level with elif clearance <= 5:",
      "Provide a fallback print inside an else: block"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Jedi Mind Trick: Sentinel Bypass",
    headerPrefix: "FORCE_OS",
    missionPrefix: "STEALTH_TALK",
    intro: "# Coruscant Patrol: Obi-Wan's Mind Screen\n\nImperial Stormtroopers are checking identification units in Sector 4. If the outpost security protocol detected your lightsaber power cell, use a swift Jedi mind trick to deflect their questions. Otherwise, travel on safely.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"HYPERDRIVE_ENGAGED\")\nelse:\n    print(\"Force is with us.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` Force suggestion:\n1. If `is_detected`, print **`\"HYPERDRIVE_ENGAGED\"`** to cloud the scout trooper's mind.\n2. Else, print **`\"Force is with us.\"`** and locate your contact at the cantina.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"HYPERDRIVE_ENGAGED\".",
      "Add else: at the base level and print \"Force is with us.\""
    ],
    solution: "if is_detected:\n    print(\"HYPERDRIVE_ENGAGED\")\nelse:\n    print(\"Force is with us.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]HYPERDRIVE_ENGAGED['"]\s*\)/, /print\s*\(\s*['"]Force\s+is\s+with\s+us\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Force Evaluation: Jedi standing",
    headerPrefix: "JEDI_ARCHIVE",
    missionPrefix: "POTENTIAL_CHECK",
    intro: "# Jedi Temple: Force Sensitivity Classification\n\nEvaluate an initiate's standing position in the Jedi Order based on their raw midichlorians potential count. Extremely high readings classify the initiate as a Master.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to analyse the biological midichlorian metrics.\n- **Assignment**: Write the target `force_rank` string variable in the matching nested logical flow paths.",
    example: "if index > 9000:\n    force_rank = \"Master\"\nelse:\n    force_rank = \"Padawan\"",
    task: "### YOUR MISSION\n\nDetermine active Jedi Order standings:\n1. If active initiate `midichlorians > 9000`, set `force_rank` to **`\"Master\"`**.\n2. Else, set `force_rank` to **`\"Padawan\"`**.\n3. Finally, display your Jedi status using `print(force_rank)`.",
    baseCode: "midichlorians = 9001\nforce_rank = \"\"\n# TODO: Assess Jedi order standing and print it\n",
    hints: [
      "Set force_rank inside the conditional logic branches.",
      "Print(force_rank) needs to be at the bottom of the script, unindented."
    ],
    solution: "midichlorians = 9001\nif midichlorians > 9000:\n    force_rank = \"Master\"\nelse:\n    force_rank = \"Padawan\"\nprint(force_rank)",
    solutionRegex: [/if\s+midichlorians\s*>\s*9000\s*:/, /force_rank\s*=\s*['"]Master['"]/, /force_rank\s*=\s*['"]Padawan['"]/, /print\s*\(\s*force_rank\s*\)/]
  },
  "control-adventure": {
    title: "Outpost Access: Infiltration Route",
    headerPrefix: "ARCHIVE_NET",
    missionPrefix: "JEDI_SPLIT",
    intro: "# Coruscant Archive Vault: Command Center Junction\n\nYou've overridden the Imperial security shield grid. Now you must choose your target vault terminal: \"1\" (Imperial Archives Vault) or \"2\" (Service Maintenance Backdoor).",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Accessing Imperial Archives...\")",
    task: "### YOUR MISSION\n\nRun the secure gateway algorithm:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Guide the infiltration route\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Astromech Uplink: Droid Directives",
    headerPrefix: "R2_LINK",
    missionPrefix: "CHIP_DIRECTIVE",
    intro: "# Binary Interface: Core Processing\n\nR2-D2 has intercepted imperial transmission vectors. He must route encryption packets based on protocol key tags: \"rebel\", \"empire\", or \"scoundrel\".",
    technical: "### Cascading Checks:\n- **Sequential**: Scans the military clearance headers from top priority down.\n- **Exclusive**: Only the first valid faction code unlocks decryption.\n- **Exhaustive**: An `else` routine initiates self-destruct for jawas or unknown intruders.",
    example: "if alliance == \"rebel\":\n    print(\"Access granted.\")\nelif alliance == \"empire\":\n    print(\"Alarms triggered!\")",
    task: "### YOUR MISSION\n\nDecode communication lines based on variable `alliance`:\n1. If `alliance` is **`\"rebel\"`**, print **`\"Access granted.\"`**\n2. Elif `alliance` is **`\"empire\"`**, print **`\"Alarms triggered!\"`**\n3. Elif `alliance` is **`\"scoundrel\"`**, print **`\"Bribe offered.\"`**\n4. Else, print **`\"Droid reset.\"`**",
    baseCode: "alliance = \"rebel\"\n# TODO: Distribute decoder branches\n",
    hints: [
      "Check rebels first, then empire, then scoundrel.",
      "The catch-all handles undefined entities."
    ],
    solution: "if alliance == \"rebel\":\n    print(\"Access granted.\")\nelif alliance == \"empire\":\n    print(\"Alarms triggered!\")\nelif alliance == \"scoundrel\":\n    print(\"Bribe offered.\")\nelse:\n    print(\"Droid reset.\")",
    solutionRegex: [/if\s+alliance\s*==\s*['"]rebel['"]\s*:/, /elif\s+alliance\s*==\s*['"]empire['"]\s*:/, /elif\s+alliance\s*==\s*['"]scoundrel['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Access\s+granted\.['"]\s*\)/, /print\s*\(\s*['"]Alarms\s+triggered!['"]\s*\)/, /print\s*\(\s*['"]Bribe\s+offered\.['"]\s*\)/, /print\s*\(\s*['"]Droid\s+reset\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Droid Cycles: Sector Sweeper",
    headerPrefix: "R2_PATROL",
    missionPrefix: "SECTOR_SCAN",
    intro: "# Imperial Facility: Automated Patrol Sweeps\n\nR2-D2 has hooked into the Death Star main terminal. Program a automated sweep routine to scan five sectors sequentially to check for Stormtrooper activity.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### range(5) Iteration:\n- **Automation**: Executes the query cycle exactly 5 times (sectors 0 through 4).\n- **Structure**: Indent the printed feedback block with 4 spaces.",
    example: "for i in range(3):\n    print(f\"Sector {i+1} clear\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Sector {i+1} clear\"` for each of the 5 cycles.",
    baseCode: "# TODO: Direct R2-D2's scan loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Sector {i+1} clear"
    ],
    solution: "for i in range(5):\n    print(f\"Sector {i+1} clear\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Astromech Signal: Stream Reader",
    headerPrefix: "R2_BUFFER",
    missionPrefix: "BYTE_STREAM",
    intro: "# Droid Interfaces: Hologram Stream Reads\n\nAstromech droids stream holo-recordings in compressed string lines. Program R2-D2 to parse the received data packets sequentially bit-by-bit.",
    technical: "### Stream Parsing:\n- **Pointers**: Walks step-by-step through the string from index zero to the end.\n- **Safe Sequence**: The droid routine finishes automatically when the data string ends.",
    example: "for char in \"JEDI\":\n    print(char)",
    task: "### YOUR MISSION\n\nR2-D2 has intercepted an encrypted Rebel alliance `transmission`: `\"JEDI\"`. Use a `for` loop to iterate through every character `char` in the variable `transmission` and `print` it.",
    baseCode: "transmission = \"JEDI\"\n# TODO: Read R2-D2 signal stream\n",
    hints: [
      "Utilize 'for char in transmission:' structure.",
      "Nest 'print(char)' centered inside the loop block."
    ],
    solution: "transmission = \"JEDI\"\nfor char in transmission:\n    print(char)",
    solutionRegex: [/for\s+char\s+in\s+transmission/, /print\s*\(\s*char\s*\)/]
  },
  "loop-list-audit": {
    title: "Droid Audits: Transmission Sweep",
    headerPrefix: "R2D2_DECRYPTION",
    missionPrefix: "COMRADE_SCAN",
    intro: "# Rebellion Scanner: Jedi Directives\n\nR2-D2 has intercepted files from the Imperial tactical terminal. Filter through the galactic datastreams for coded rebel files ending with `.jed`.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"skywalker.jed\"`, then `\"imperial_patrol.dat\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".jed\")` asks: *\"Does the text inside `f` end with `.jed`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".jed\"):\n          # This runs ONLY if the current file ends with .jed!\n  ```",
    example: "signals = [\"imperial.ch\", \"kenobi.jed\"]\nfor s in signals:\n    if \".jed\" in s:\n        print(s)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".jed\"`, `print` the coordinate relay message: `f\"Jedi signal: {f}\"`.",
    baseCode: "discovered_files = [\"skywalker.jed\", \"imperial_patrol.dat\", \"tatooine_recon.jed\", \"shield_coords.cfg\"]\n# TODO: Isolate Jedi transmissions\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".jed\"):",
      "Print f'Jedi signal: {f}'"
    ],
    solution: "discovered_files = [\"skywalker.jed\", \"imperial_patrol.dat\", \"tatooine_recon.jed\", \"shield_coords.cfg\"]\nfor f in discovered_files:\n    if f.endswith(\".jed\"):\n        print(f\"Jedi signal: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.jed['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Decryption Grid: Shield Matrix",
    headerPrefix: "DEATH_STAR_COMMS",
    missionPrefix: "GRID_RECON",
    intro: "# Star Charts: Trench Shield Decryption\n\nR2-D2 has breached the mainframe's shield database! Scan through the defence coordinates along sectors (X) and shield points (Y) to locate safety gaps.",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 shield matrix scan with variable `x` (outer loop representing Sectors) and variable `y` (inner loop representing Shield Points) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Sector 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Point 0) -> Output: `Empire - Row: 0, Col: 0`\n     - `y = 1` (Point 1) -> Output: `Empire - Row: 0, Col: 1`\n     - `y = 2` (Point 2) -> Output: `Empire - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Sector 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Point 0) -> Output: `Empire - Row: 1, Col: 0`\n     - `y = 1` (Point 1) -> Output: `Empire - Row: 1, Col: 1`\n     - `y = 2` (Point 2) -> Output: `Empire - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Sector 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Point 0) -> Output: `Empire - Row: 2, Col: 0`\n     - `y = 1` (Point 1) -> Output: `Empire - Row: 2, Col: 1`\n     - `y = 2` (Point 2) -> Output: `Empire - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Shield {r}, Pad {c}\")",
    task: "### YOUR MISSION\n\nScan a **3x3 shield matrix**. Code nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the sector coordinates in this exact format: `f\"Empire - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Sweep Imperial shield matrices\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Empire - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Empire - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Trench Run: Hyperdrive Shutdown",
    headerPrefix: "RED_LEADER_HUD",
    missionPrefix: "HYPER_ABORT",
    intro: "# Galactic Flight: Aborting Hyperspace\n\nIf Vader's fighters get a missile lock on your X-Wing, you must drop out of hyperspace immediately. Python controls active loop execution using the `break` command.",
    technical: "### Hyperdrive Cutoff:\n- **Instant Exit**: Exit loop progressions instantly during space alerts.\n- **Sensory Guards**: Intercept threat indices with conditional checks.",
    example: "for sec in range(10):\n    if sec == 5:\n        break\n    print(sec)",
    task: "### YOUR MISSION\n\nExecute flight stage calibrations over `range(10)`. If your target threat warning index `i` registers `7` (Vader lock verified), call `break` to initiate defensive maneuvers. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Check pilot flight paths with safety break\n",
    hints: [
      "Initiate flight loop 'for i in range(10):'",
      "Set cockpit risk constraint 'if i == 7:'",
      "Trigger 'break' beneath, then print cockpit state i"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Saber Charging: Power Drain",
    headerPrefix: "SABER_INT",
    missionPrefix: "ENERGY_CELL",
    intro: "# Kyber Cycles: While Loops\n\nWhile `for` loops iterate over a specific sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor a lightsaber's battery as its energy is drained during continuous block training.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power the plasma blade.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    title: "Astromech Routines: Signal Uplink",
    headerPrefix: "REBEL_DIAGNOSTIC",
    missionPrefix: "SIGNAL_UP",
    intro: "# Astromech Core Actions: Functions\n\nDon't calculate coordinate uploads manually every time! Design a reusable function so R2-D2 can ping rebel outposts at the touch of a button.",
    task: "Write a function `ping_outpost(outpost_id)` that prints `f'Signal uplink to outpost {outpost_id} established.'`. Call your function with argument `'Yavin 4'`.",
    baseCode: "# TODO: Define reusable uplink function\n",
    solution: "def ping_outpost(outpost_id):\n    print(f'Signal uplink to outpost {outpost_id} established.')\n\nping_outpost('Yavin 4')",
    solutionRegex: [/def\s+ping_outpost/, /ping_outpost\s*\(/]
  },
  "functions-recursion": {
    title: "Jedi Archives: Holocron Decryption",
    headerPrefix: "JEDI_HOLOCRON",
    missionPrefix: "LIGHT_PEEL",
    intro: "# Navigating the Archives: Recursion\n\nTo unlock ancient Jedi lore, you must systematically open nested security layers of an ancient Holocron. Recursion allows the decryption algorithm to open a layer, and then call itself on the remaining layers.",
    task: "Write a recursive function `decrypt_holocron(layer)` that prints the current `layer` and calls itself with `layer-1` until the layer count reaches `0`.",
    baseCode: "# TODO: Deep archival decryption\n",
    solution: "def decrypt_holocron(layer):\n    print(layer)\n    if layer > 0:\n        decrypt_holocron(layer - 1)\n\ndecrypt_holocron(5)",
    solutionRegex: [/def\s+decrypt_holocron/, /decrypt_holocron\s*\(\s*layer\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "CORE_SHIPYARD",
    missionPrefix: "SHIP_TEMPLATE",
    intro: "# Fleet Blueprints: Classes\n\nCommanders, we need a unified structural blueprint for all Rebel starships. Instead of coding every newly manufactured fighter from scratch, define a generic class template so we can stamp out new starships on demand.",
    task: "### YOUR MISSION\n\nDefine a base class named `Starship`. Use `pass` inside its body under proper block indentation.",
    baseCode: "# TODO: Establish base class Starship\n",
    hints: [
      "Use 'class Starship:' followed by an indented 'pass'.",
      "Check your capitalization!"
    ],
    solution: "class Starship:\n    pass",
    solutionRegex: [/class\s+Starship/, /pass/]
  },
  "oop-init": {
    headerPrefix: "SHIP_IGNITION",
    missionPrefix: "MODEL_SPEC",
    intro: "# Launching Starships: Constructors\n\nEvery time a new fighter rolls off the Corellian shipyard assembly line, the targeting computer needs to know its specific model. We will use the constructor method `__init__` to assign designations automatically upon ship construction.",
    task: "### YOUR MISSION\n\nIn `Starship`, define the constructor `__init__` which accepts `self` and a parameter `model`. Assign the value of `model` to `self.model`.",
    baseCode: "class Starship:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Use 'def __init__(self, model):' as the constructor name.",
      "Assign it inside the body: self.model = model"
    ],
    solution: "class Starship:\n    def __init__(self, model):\n        self.model = model",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*model\s*\)\s*:/, /self\.model\s*=\s*model/]
  },
  "oop-methods": {
    headerPrefix: "WEAPONS_CALIBRATE",
    missionPrefix: "LASER_TEST",
    intro: "# Active Weapon Systems: Methods\n\nA starship needs teeth to survive Imperial ambushes. Let's write a method `fire_lasers` directly inside the class code so any ship instance can charge its cannons and strike back.",
    task: "### YOUR MISSION\n\nAdd a `fire_lasers` method to `Starship` that `print`s \"Lasers active\".",
    baseCode: "class Starship:\n    def __init__(self, model):\n        self.model = model\n    # TODO: Define fire_lasers method\n",
    hints: [
      "Write 'def fire_lasers(self):' and indent it inside the class cell.",
      "Print 'Lasers active' inside the method body."
    ],
    solution: "class Starship:\n    def __init__(self, model):\n        self.model = model\n    def fire_lasers(self):\n        print(\"Lasers active\")",
    solutionRegex: [/def\s+fire_lasers\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Lasers active['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "HYPERDRIVE_STAT",
    missionPrefix: "STATUS_CHECK",
    intro: "# Isolated Systems: Independent Object State\n\nIf we send a squadron of X-Wings into combat, activating one fighter's hyperdrive shouldn't pull the whole alliance fleet along with it. Each ship tracks its own flight controls and energy state independently.",
    task: "### YOUR MISSION\n\n1. Add a `hyperdrive_state` variable in `__init__` defaulted to the string \"Standby\".\n2. Create a method `engage_hyperdrive` that updates `self.hyperdrive_state` to \"Active\".",
    baseCode: "class Starship:\n    def __init__(self, model):\n        self.model = model\n        # TODO: Add hyperdrive_state default\n    # TODO: Add engage_hyperdrive method\n",
    hints: [
      "Add 'self.hyperdrive_state = \"Standby\"' inside __init__.",
      "In engage_hyperdrive, set 'self.hyperdrive_state = \"Active\"'."
    ],
    solution: "class Starship:\n    def __init__(self, model):\n        self.model = model\n        self.hyperdrive_state = \"Standby\"\n    def engage_hyperdrive(self):\n        self.hyperdrive_state = \"Active\"",
    solutionRegex: [/self\.hyperdrive_state\s*=\s*['"]Standby['"]/, /def\s+engage_hyperdrive/, /self\.hyperdrive_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "RADAR_CON",
    missionPrefix: "TACTICAL_LINK",
    intro: "# Wingman Interlink: Object Interaction\n\nStarships coordinate their formations. To establish tactical grids, one flight computer must be able to read and scan other nearby shipping elements flying alongside them.",
    task: "### YOUR MISSION\n\nAdd a `lock_target` method to `Starship` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Targeting: {other.model}\"`.",
    baseCode: "class Starship:\n    def __init__(self, model):\n        self.model = model\n    # TODO: Add lock_target method\n",
    hints: [
      "The lock_target(self, other) signature accepts 'other' as its second parameter.",
      "Access other's model using other.model inside an f-string."
    ],
    solution: "class Starship:\n    def __init__(self, model):\n        self.model = model\n    def lock_target(self, other):\n        print(f\"Targeting: {other.model}\")",
    solutionRegex: [/def\s+lock_target\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.model/]
  },
  "oop-inheritance": {
    headerPrefix: "REBEL_UPGRADE",
    missionPrefix: "FORCE_LINK",
    intro: "# Specialized Fighter Class: Inheritance\n\nInheritance allows you to build specialized combat categories based on Starship templates. Let's design a specialized `JediStarfighter` capable of tapping into Force navigation matrix guides.",
    task: "### YOUR MISSION\n\nCreate a class `JediStarfighter` that inherits from `Starship`. Give it a `use_force` method that `print`s \"Force navigation active\".",
    baseCode: "class Starship:\n    def __init__(self, model):\n        self.model = model\n# TODO: Create JediStarfighter subclass inheriting from Starship\n",
    hints: [
      "Use 'class JediStarfighter(Starship):' to construct inheritance.",
      "Inside, define the use_force method printing appropriate status confirmation."
    ],
    solution: "class Starship:\n    def __init__(self, model):\n        self.model = model\n\nclass JediStarfighter(Starship):\n    def use_force(self):\n        print(\"Force navigation active\")",
    solutionRegex: [/class\s+JediStarfighter\s*\(\s*Starship\s*\)\s*:/, /def\s+use_force/, /print\s*\(\s*['"]Force navigation active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "HUD_CONSOLE",
    missionPrefix: "READOUT_STR",
    intro: "# Console Diagnostics: Custom Str Representation\n\nIf we print a ship object directly, Python throws a confusing raw pointer key. Let's override the special `__str__` method to render clear, tactical HUD specifications instead.",
    task: "### YOUR MISSION\n\nIn `Starship`, add system method `__str__` that returns: `f\"Starship Model {self.model}\"`.",
    baseCode: "class Starship:\n    def __init__(self, model):\n        self.model = model\n    # TODO: Add __str__ method\n",
    hints: [
      "Define traditional __str__(self) block inside Starship.",
      "Return the required f-string format rather than printing it."
    ],
    solution: "class Starship:\n    def __init__(self, model):\n        self.model = model\n    def __str__(self):\n        return f\"Starship Model {self.model}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Starship Model.*self\.model.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "ALLIANCE_HQ",
    missionPrefix: "COGNIZANT_CONST",
    intro: "# Fleet Alliances: Shared Class Variables\n\nWhile every starship enjoys unique model classes, they all share core constants — such as whom they defend! We use Class Variables to share states among all starships without duplicating memory allocations.",
    task: "### YOUR MISSION\n\n1. Define a class variable `faction` set to \"Rebel Alliance\" in `Starship`.\n2. `print` the class variable using `Starship.faction`.",
    baseCode: "class Starship:\n    # TODO: Define class variable 'faction'\n    pass\n# TODO: Print Starship.faction\n",
    hints: [
      "Add 'faction = \"Rebel Alliance\"' immediately to Starship class block.",
      "Call print(Starship.faction) outside the class boundaries directly."
    ],
    solution: "class Starship:\n    faction = \"Rebel Alliance\"\n\nprint(Starship.faction)",
    solutionRegex: [/faction\s*=\s*['"]Rebel Alliance['"]/, /print\s*\(\s*Starship\.faction\s*\)/]
  }
};