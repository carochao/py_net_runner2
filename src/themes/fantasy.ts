export const FANTASY_THEME: any = {
  "intro-print": {
    headerPrefix: "ANCIENT_SCROLL",
    missionPrefix: "SPELL_CAST",
    intro: "# Arcane Awakening: print()\n\nThe magic is awakening within you. To test your connection to the ethereal plane, you must cast a minor illumination spell by speaking its true name to the air.",
    task: "Use `print()` to display: `\"Lumos Maxima\"`",
    baseCode: "# TODO: Cast light spell\n",
    solution: "print(\"Lumos Maxima\")",
    solutionRegex: [/print\s*\(\s*['\"]Lumos Maxima['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "WIZARD_STYLE",
    missionPrefix: "MAGE_PRONUNCIATION",
    intro: "# Arcane Enunciations: Lowercase Spellcraft\n\nCasting runes must be written with flawless pronunciation. Writing capital letters in magical commands like `Print()` or variable names will disrupt the mystical current, turning your helpful spell into a terrible curse! Write all summonings in lowercase.",
    task: "Summon a lowercase magical variable named `mana_crystals` with a charge value of `77`. Print it with `print()` to ignite the tower gates. Everything must be lowercase!",
    baseCode: "# TODO: Summon mana_crystals and print the charge\n",
    solution: "mana_crystals = 77\nprint(mana_crystals)",
    solutionRegex: [/mana_crystals\s*=\s*77/, /print\s*\(\s*mana_crystals\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "WIZARD_TOME",
    missionPrefix: "SECRET_RUNES",
    intro: "# Hidden Runes: Comments\n\nSome secrets are meant only for the eyes of the wise. Use comments to leave notes in your spellbook that the uninitiated cannot read.",
    task: "Write a comment `# The dragon sleeps in the east` and then `print(\"Spell active\")`",
    baseCode: "# TODO: Add secret runes\n",
    solution: "# The dragon sleeps in the east\nprint(\"Spell active\")",
    solutionRegex: [/#.*The dragon sleeps in the east/, /print\s*\(\s*['\"]Spell active['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "SPELL_HUD",
    missionPrefix: "RUNE_TAG",
    intro: "# Spellbook Annotations: Inline Comments\n\nWhile engraving new circles of protection in your spellbook, you can tag spell ingredients on the fly. Let's tag mystical parameters with quick inline remarks.",
    task: "Initialize `mana_cost` to `75`. On the same line, add an inline comment `# Fireball requirement`.",
    baseCode: "# TODO: Initialize mana cost with inline comment\n",
    solution: "mana_cost = 75 # Fireball requirement",
    solutionRegex: [/mana_cost\s*=\s*75/, /#.*Fireball requirement/]
  },
  "intro-vars": {
    headerPrefix: "WIZARD_HUD",
    missionPrefix: "SPELL_TALLY",
    intro: "# Magical Power: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled wooden jar** on your potion shelf! You write a name on the jar's label (like `mana_pool`), store magical ingredients or mana levels inside, and cast or retrieve them during your magical rituals.\n\nYour spellbook demands constant energy tracking. Let's use variables to track your maximum mana pool and golden galleons in your vault.",
    task: "Create `mana_pool` set to `64` and `gold_galleons` set to `1500`.",
    baseCode: "# TODO: Record wizard stats\n",
    solution: "mana_pool = 64\ngold_galleons = 1500",
    solutionRegex: [/mana_pool\s*=\s*64/, /gold_galleons\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "ALCHEMY_LAB",
    missionPrefix: "INFUSION_LEVEL",
    intro: "# Alchemical Potency: Reassignment\n\nYou have just simmered a new drop of mandrake juice. Re-assign your infusion potency variable to apply the new magical boost to your potion.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "infusion_scale = 1.0\nprint(infusion_scale)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\ninfusion_scale = 2.1\nprint(infusion_scale)  # Output: 2.1",
    task: "Initialize `infusion_scale` as `1.0`. Then update `infusion_scale` to `2.1`. Print it.",
    baseCode: "infusion_scale = 1.0\n# TODO: Elevate density to 2.1\n",
    solution: "infusion_scale = 1.0\ninfusion_scale = 2.1\nprint(infusion_scale)",
    solutionRegex: [/infusion_scale\s*=\s*1\.0/, /infusion_scale\s*=\s*2\.1/, /print\s*\(\s*infusion_scale\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "SCRYING_MIRROR",
    missionPrefix: "RUNE_CATCH",
    intro: "# Echo Request: Wizard Mirror Link\n\nWait for the wizard's obsidian mirror to push a runic signal! Before the target's scrying rune bypasses your sight, prepare an empty vessel variable in your spellbook to catch and bind the magic frequency.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `fantasy_data = \"\"` as a placeholder, we allocate space in memory. Then, running `fantasy_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the scrying rune dynamically so you can see it change!",
    example: "fantasy_data = \"\"  # Vessel is ready, but currently empty\nfantasy_data = input(\"Enter scrying rune: \")  # Line 2 updates the empty string with your input!\nprint(\"Channelling rune: \" + fantasy_data)",
    task: "1. Initialize `fantasy_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter scrying rune: \")` to populate it.\n3. Print `\"Channelling rune: \" + fantasy_data`.",
    baseCode: "# TODO: Initialize empty scrying vessel, capture, and print\n",
    hints: [
      "Use fantasy_data = \"\" to prepare the vessel.",
      "Use fantasy_data = input(\"Enter scrying rune: \") to catch the spell.",
      "Print \"Channelling rune: \" combined with the fantasy_data variable."
    ],
    solution: "fantasy_data = \"\"\nfantasy_data = input(\"Enter scrying rune: \")\nprint(\"Channelling rune: \" + fantasy_data)",
    solutionRegex: [/fantasy_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "HERO_STATS",
    missionPrefix: "BATTLE_PREP",
    intro: "# Warrior Readiness: Multi-Assignment\n\nA true champion knows their limits. Initialize your current health and mana levels at the same time before stepping into the dragon's lair.",
    task: "Assign `health` set to `100` and `mana` set to `50` in one line.",
    baseCode: "# TODO: Prep stats\n",
    solution: "health, mana = 100, 50",
    solutionRegex: [/health\s*,\s*mana\s*=\s*100\s*,\s*50/]
  },
  "data-strings": {
    headerPrefix: "SCROLL_INDEX",
    missionPrefix: "FORBIDDEN_REALM",
    intro: "# Cartography: Strings\n\nNavigating the enchanted kingdoms requires translating ancient script. Set the string variable for your destination.",
    task: "Create a variable `realm_name` set to `\"Rivendell\"`. Print it.",
    baseCode: "# TODO: Tag target coordinates\n",
    solution: "realm_name = \"Rivendell\"\nprint(realm_name)",
    solutionRegex: [/realm_name\s*=\s*['\"]Rivendell['\"]/]
  },
  "data-booleans": {
    headerPrefix: "GATE_RUNES",
    missionPrefix: "BARRIER_SEAL",
    intro: "# Barrier Control: Booleans\n\nIs the dungeon gate magically sealed? Is the dragon alert alarm active? Guide the adventurers safely through using logical booleans.",
    task: "Set `gate_sealed` to `True` and `dragon_alert` to `False`.",
    baseCode: "# TODO: Check castle gate state\n",
    solution: "gate_sealed = True\ndragon_alert = False",
    solutionRegex: [/gate_sealed\s*=\s*True/, /dragon_alert\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "MAGE_COUNCIL",
    missionPrefix: "REAGENTS_TALLY",
    intro: "# Potion Crafting: Math\n\nA truly powerful brew requires precisely measured ingredients. Add the number of dragon scales to the phoenix feathers to determine the strength of your fire resistance potion.",
    task: "Create `dragon_scales` as `10` and `phoenix_feathers` as `5`. Store the sum in `potion_strength` and print it.",
    baseCode: "# TODO: Calculate potion potency\n",
    solution: "dragon_scales = 10\nphoenix_feathers = 5\npotion_strength = dragon_scales + phoenix_feathers\nprint(potion_strength)",
    solutionRegex: [/potion_strength\s*=\s*dragon_scales\s*\+\s*phoenix_feathers/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe ancient scroll is fading. Perform a memory dump of its arcane resonance to determine the potion's final potency after neutralizing impurities.",
    technical: "### Potion Equations:\n1. **Spell Formulation**: Add potion impurities to the pure elemental base prior to factoring in the final transmutation modifier.\n2. **Arcane Circle**: Python relies on bracket parentheses `()` to bypass normal arithmetic order and run components of spells ahead of schedule.",
    example: "base_essence = 80\nneutralizer = -10\nfinal_potency = (base_essence + neutralizer) * 0.8\nprint(final_potency)",
    task: "1. Create mystical variable `base_essence` as `80`.\n2. Create mystical variable `neutralizer` as `-10`.\n3. Calculate `(base_essence + neutralizer) * 0.8` and store in `final_potency`.\n4. Print `final_potency`.",
    baseCode: "# TODO: Transmute mana properties\n",
    solution: "base_essence = 80\nneutralizer = -10\nfinal_potency = (base_essence + neutralizer) * 0.8\nprint(final_potency)",
    solutionRegex: [/final_potency\s*=\s*\(\s*base_essence\s*\+\s*neutralizer\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "SPELLBOOK_PAGES",
    missionPrefix: "GRIMOIRE_TALLY",
    intro: "# Spell Catalog: Lists\n\nA master mage stores active incantations inside their spellbook. Store your starting combat spells to track available magic.",
    technical: "### Wizard Spell Catalog Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of values stored in a single grimoire. Instead of defining each spell individually (e.g., `s1 = \"Fireball\"`, `s2 = \"Heal\"`), a list lets you bind multiple scrolls together under a single master collection variable.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, resembling the hard leather covers of your spellbook.\n- **Comma Separation**: Each spell or magic rune inside your catalog must be separated by a comma.\n- **Zero-Based Runes**: Python lists use zero-based indexing. The first spell is inscribed at index `0`, the second at `1`, and the third at `2`.",
    example: "# Bind multiple incantations in a single list variable\nspellbook = [\"Lightning Bolt\", \"Levitate\", \"Freeze Scroll\"]\nprint(spellbook)  # Manifests the entire catalog",
    task: "Initialize your `spells` list with \"Fireball\", \"Heal\", and \"Teleport\". Print the spells list to confirm your magical readiness.",
    baseCode: "# TODO: Tally scrolls and magic\n",
    solution: "spells = [\"Fireball\", \"Heal\", \"Teleport\"]\nprint(spells)",
    solutionRegex: [/spells\s*=\s*\[/, /print\s*\(\s*spells\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "GRIMOIRE_SELECT",
    missionPrefix: "YOUR TASK",
    intro: "# Spell Cast: Scroll Indices\n\nIn the dungeon's shadows, you need speed! Retrieve the first elemental summon and the third traversal spell instantly from your spellbook.",
    technical: "### Magic Inventory Scroll:\n\n```text\nspells = [\"Fireball\", \"Heal\", \"Teleport\"]\n#         [0]          [1]        [2]\n```",
    example: "# Load spells from magic book using scroll indices\nspells = [\"Fireball\", \"Heal\", \"Teleport\"]\n\n# Select first spell (index 0)\np1 = spells[0]\nprint(p1)  # Output: Fireball\n\n# Select third spell (index 2)\np3 = spells[2]\nprint(p3)  # Output: Teleport",
    task: "1. Load the spell at index 0 from `spells` and store inside `p1`.\n2. Load the utility spell at index 2 and store inside `p3`.\n3. Print both `p1` and `p3`.",
    baseCode: "spells = [\"Fireball\", \"Heal\", \"Teleport\"]\n# TODO: Extract spell grimoire indices 0 and 2\n",
    solution: "p1 = spells[0]\np3 = spells[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*spells\s*\[\s*0\s*\]/, /p3\s*=\s*spells\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "SPELL_LEARN",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value magic spell is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "spells = [\"Fireball\",\"Heal\",\"Teleport\"]\nspells.append(\"Invisibility\")\n# spells is now updated!",
    task: "1. Append \"Invisibility\" to the `spells` list.\n2. Print the final `spells` list to confirm installation.",
    baseCode: "spells = [\"Fireball\",\"Heal\",\"Teleport\"]\n# TODO: Append value and print\n",
    solution: "spells.append(\"Invisibility\")\nprint(spells)",
    solutionRegex: [/spells\.\s*append\s*\(\s*['"]Invisibility['"]\s*\)/, /print\s*\(\s*spells\s*\)/]
  },
  "list-pop": {
    headerPrefix: "POTION_CONSUME",
    missionPrefix: "YOUR TASK",
    intro: "# Quick Sip: .pop()\n\nA fierce dragon approaches, and you need an instant boost! Drink the last elixir from your belt pouch to prepare for battle. Use `.pop()` to consume the final potion in your active belt stack.",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = active_potions.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `active_potions` list and store it inside a variable named `consumed_potion`.\n2. Print `consumed_potion` to output the purged token.",
    baseCode: "active_potions = [\"Mana Potion\",\"Health Elixir\",\"Stamina Tonic\"]\n# TODO: Pop last element and print\n",
    solution: "consumed_potion = active_potions.pop()\nprint(consumed_potion)",
    solutionRegex: [/consumed_potion\s*=\s*active_potions\.\s*pop\s*\(\s*\)/, /print\s*\(\s*consumed_potion\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "PORTAL_LOC",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Arcane Immutable Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of elements, much like a spell ingredient list, but with one mystical distinction: **lists are mutable** (they can be modified, reordered, or added to on the fly), whereas **tuples are immutable** (once declared, their content and order are sealed forever like an ancient rune in solid stone).\n- **Syntax**: Defined with magical round parentheses `()` instead of common square brackets `[]`.\n- **Speed & Wards**: Because tuples are simpler and read-only, they require less memory energy to process and serve as perfect wards to protect critical, unchangeable coordinates, ley line ports, or true names from corruption.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `portal_coordinates` containing \"Elf Mountains\" and the number `9909`.\n2. Print the `portal_coordinates` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "portal_coordinates = (\"Elf Mountains\", 9909)\nprint(portal_coordinates)",
    solutionRegex: [/portal_coordinates\s*=\s*\(\s*['"]Elf Mountains['"]\s*,\s*9909\s*\)/, /print\s*\(\s*portal_coordinates\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "GRIMOIRE_LOCK",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `spell_grades` containing the single string \"Apprentice\"\n2. Create a tuple named `grimoire_id` containing the numbers `7` and `0`.\n3. Rewrite `spell_grades[0]` to be \"Archmage\"\n4. Print both `spell_grades` and `grimoire_id`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "spell_grades = [\"Apprentice\" ]\ngrimoire_id = (7, 0)\nspell_grades[0] = \"Archmage\"\nprint(spell_grades)\nprint(grimoire_id)",
    solutionRegex: [/spell_grades\s*\[\s*0\s*\]\s*=\s*['"]Archmage['"]/, /grimoire_id\s*=\s*\(\s*7\s*,\s*0\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "RUNE_ENGRAVING",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `runes_sequence` list.\n2. Store this result in a new variable named `combat_sigils`.\n3. Print the resulting slice `combat_sigils`.",
    baseCode: "runes_sequence = [\"fire\",\"frost\",\"shadow\",\"lightning\",\"earth\",\"wind\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "combat_sigils = runes_sequence[1:4]\nprint(combat_sigils)",
    solutionRegex: [/combat_sigils\s*=\s*runes_sequence\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*combat_sigils\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "CRYSTAL_CHARGE",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `crystal_charges`.\n2. Store the result in a variable named `charged_gems`.\n3. Print `charged_gems`.",
    baseCode: "crystal_charges = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "charged_gems = [c for c in crystal_charges if c > 50]\nprint(charged_gems)",
    solutionRegex: [/charged_gems\s*=\s*\[\s*c\s+for\s+c\s+in\s+crystal_charges\s+if\s+c\s*>\s*50\s*\]/, /print\s*\(\s*charged_gems\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "MONOLITH_SYNC",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `monolith_frequencies` list using a list comprehension.\n2. Store this filtered list in a new variable named `resonating_wells`.\n3. Print `resonating_wells`.",
    baseCode: "monolith_frequencies = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "resonating_wells = [f for f in monolith_frequencies if f % 2 == 0]\nprint(resonating_wells)",
    solutionRegex: [/resonating_wells\s*=\s*\[\s*f\s+for\s+f\s+in\s+monolith_frequencies\s+if\s+f\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*resonating_wells\s*\)/]
  },
  "intro-input": {
    headerPrefix: "SPELL_BOOK",
    missionPrefix: "YOUR TASK",
    intro: "# Channeling the Void: Wizard Input\n\nTo cast an ancient ward of protection, you must prompt the apprentice wizard for the sacred rune text they wish to invoke.",
    technical: "### Conjuring User Inputs:\n- The `input()` incantation intercepts the user\'s speech and binds it as a scroll fragment.\n- The resulting energy crystal is always preserved as pure text.\n- **Runic Concatenation**: Bind magic words or runic scrolls together using the `+` operator (e.g., `\"Lumos\" + \"Maxima\"` becomes `\"LumosMaxima\"`). Be mindful of empty spaces within your scrolls, or the spell will fuse into a single word!",
    example: "spell_name = input(\"Chant spell: \")\nprint(\"Casting: \" + spell_name)",
    task: "1. Ask the apprentice for the rune with the prompt: **\"Enter mystical rune: \"** and store it in a variable named `mystical_rune`.\n2. Print **\"Channeling rune: \"** concatenated with the user\'s `mystical_rune` value.",
    baseCode: "# TODO: Capture rune and print the incantation\n",
    solution: "mystical_rune = input(\"Enter mystical rune: \")\nprint(\"Channeling rune: \" + mystical_rune)",
    solutionRegex: [/mystical_rune\s*=\s*input\s*\(\s*['\"]Enter mystical rune: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Channeling rune: \s*['\"]\s*\+\s*mystical_rune\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "GRIMOIRE_TALE",
    missionPrefix: "SCROLL_GEN",
    intro: "# Chronicles of Eld: Story Generator\n\nInscribe the legendary deeds of mythical heroes in the Arcane library. Read apprentice inputs to generate custom spell and quest reports.",
    technical: "### Magical Incantations:\nJoin the sacred names of wizards, dungeons, and relics into an unbroken thread of power using the magic of string compounding.",
    example: "mage = \"Merlin\"\nkeep = \"Dread Tower\"\nscroll = mage + \" enchanted the \" + keep\nprint(scroll)",
    task: "1. Ask the apprentice for the wizard name with the prompt: **\"Enter wizard name: \"** and store it in `wizard`.\n2. Ask the apprentice for the dungeon name with the prompt: **\"Enter dungeon name: \"** and store it in `dungeon`.\n3. Ask the apprentice for the artifact name with the prompt: **\"Enter artifact: \"** and store it in `artifact`.\n4. Combine into a variable named `legend_scroll` using the format: `wizard + \" bypassed \" + dungeon + \" with a \" + artifact + \"!\"` and print `legend_scroll`.",
    baseCode: "# TODO: Journal wizard epic tales\n",
    solution: "wizard = input(\"Enter wizard name: \")\ndungeon = input(\"Enter dungeon name: \")\nartifact = input(\"Enter artifact: \")\nlegend_scroll = wizard + \" bypassed \" + dungeon + \" with a \" + artifact + \"!\"\nprint(legend_scroll)",
    solutionRegex: [/wizard\s*=\s*input\s*\(\s*['"]Enter wizard name:\s*['"]\s*\)/, /dungeon\s*=\s*input\s*\(\s*['"]Enter dungeon name:\s*['"]\s*\)/, /artifact\s*=\s*input\s*\(\s*['"]Enter artifact:\s*['"]\s*\)/, /legend_scroll\s*=\s*wizard\s*\+\s*['"] bypassed ['"]\s*\+\s*dungeon\s*\+\s*['"] with a ['"]\s*\+\s*artifact\s*\+\s*['"]!['"]/, /print\s*\(\s*legend_scroll\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "GRIMOIRE_CHARGES",
    missionPrefix: "RUNE_CONJURING",
    intro: "# Magic Feedback: Spell Overload\n\nThe Archmage's mystical apparatus is expanding! Formulate a spell containment scroll using five unique magical parameters.",
    technical: "### Compound Arcane Runes:\nString wizard designations, enchanted rings, and mana-draining towers into a cohesive parchment log using the power of string concatenation.",
    example: "runeLog = wizard + \" injected \" + rune + \" into \" + crystal + \" at \" + tier + \". System is \" + state + \"!\"",
    task: "1. Ask the apprentice for wizard name with prompt: **\"Enter wizard name: \"** and store in `wizard`.\n2. Ask for custom casting rune with prompt: **\"Enter arcana rune: \"** and store in `runa`.\n3. Ask for destination tower vault with prompt: **\"Enter tower vault: \"** and store in `vault`.\n4. Ask for magical mana-power tier with prompt: **\"Enter portal tier: \"** and store in `portal_tier`.\n5. Ask for the enchanted apparatus state with prompt: **\"Enter spell status: \"** and store in `spell_status`.\n6. Combine into a variable named `mystic_overload` and print using the exact format: `wizard + \" injected \" + runa + \" into \" + vault + \" at \" + portal_tier + \". System is \" + spell_status + \"!\"`.",
    baseCode: "# TODO: Compile legendary mystical containment files\n",
    solution: "wizard = input(\"Enter wizard name: \")\nruna = input(\"Enter arcana rune: \")\nvault = input(\"Enter tower vault: \")\nportal_tier = input(\"Enter portal tier: \")\nspell_status = input(\"Enter spell status: \")\nmystic_overload = wizard + \" injected \" + runa + \" into \" + vault + \" at \" + portal_tier + \". System is \" + spell_status + \"!\"\nprint(mystic_overload)",
    solutionRegex: [/wizard\s*=\s*input\s*\(\s*['"]Enter wizard name:\s*['"]\s*\)/, /runa\s*=\s*input\s*\(\s*['"]Enter arcana rune:\s*['"]\s*\)/, /vault\s*=\s*input\s*\(\s*['"]Enter tower vault:\s*['"]\s*\)/, /portal_tier\s*=\s*input\s*\(\s*['"]Enter portal tier:\s*['"]\s*\)/, /spell_status\s*=\s*input\s*\(\s*['"]Enter spell status:\s*['"]\s*\)/, /print\s*\(\s*mystic_overload\s*\)/]
  },
  "print-formatting": {
    title: "Scroll Registry: F-Strings",
    headerPrefix: "TOWER_SCAN",
    missionPrefix: "SCROLL_FORMAT",
    intro: "# Scroll Registry: F-Strings\n\nMage councils require automated spellbook logs. Use Python f-strings to dynamically project wizard names and clearance circles into your crystal ball.",
    technical: "### Ethereal Format strings:\n- **Prefix**: Prefix with `f` to activate rune-form templates.\n- **Placements**: Bind localized variables using curly braces `{}` inside string bounds.",
    example: "wizard = \'Gandalf\'\nprint(f\'Summoning: {wizard}\') # Outputs: Summoning: Gandalf",
    task: "### YOUR MISSION\n\nYou have `alias = \'Gandalf\'` and `level = 20`. Use an **f-string** to print: `Mage: Gandalf | Mana Tier: 20`.",
    baseCode: "alias = \'Gandalf\'\nlevel = 20\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Ensure {alias} and {level} are nested in curly braces inside text string values."
    ],
    solution: "alias = \'Gandalf\'\nlevel = 20\nprint(f\'Mage: {alias} | Mana Tier: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Mage:\s*\{alias\}\s*\|\s*Mana\s*Tier:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Ethereal Summonings: Advanced F-Strings",
    headerPrefix: "ORB_ROUTE",
    missionPrefix: "SUMMON_VAL",
    intro: "# High Mage Council: Advanced F-Strings\n\nCoordinate ethereal spirits migrating to target dimensions. F-strings allow your portal spellbook to calculate spirit densities and render destination gateways to uppercase automatically.",
    technical: "### Mystical Rune Injections:\n- **Sacred Math**: Sum raw runestones, shrines, or potion ingredients inside braces: `{orbs + gems}`.\n- **Dimension Keys**: Enforce uppercase dimensional lock keys directly inside your prints: `{realm.upper()}`.",
    example: "elves, dwarves = 5, 3\nprint(f'Allied soldiers: {elves + dwarves}')",
    task: "### YOUR MISSION\n\n1. Prompt for spirit count with: **\"Enter spirit count: \"** and store it as an integer in `spirits`.\n2. Prompt for destination gateway with: **\"Enter target gateway: \"** and store it in `gateway`.\\n3. Use an **f-string** to print: `Deploying {spirits} spirits to {gateway.upper()}...`.",
    baseCode: "# TODO: Unseal magical gates\n",
    hints: [
      "Ask for spirits using int(input(\"Enter spirit count: \"))",
      "Ask for gateway using input(\"Enter target gateway: \")",
      "Incorporate {spirits} and {gateway.upper()} in the printed f-string."
    ],
    solution: "spirits = int(input(\"Enter spirit count: \"))\ngateway = input(\"Enter target gateway: \")\nprint(f\"Deploying {spirits} spirits to {gateway.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{spirits\}\s*spirits\s*to\s*\{gateway\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Ethereal Arcana Math: Casting to Int",
    headerPrefix: "PORTAL_CALC",
    missionPrefix: "MANA_RECAST",
    intro: "# High Mage Forge: Recasting Mana Crystals\\n\\nMystical blueprints represent magic elements in runic text structures. To spark planar portals or power elemental wards, recast runes from physical descriptions into actual numeric values.",
    technical: "### Sacred Casting Rituals:\\n- Convert runic strings to magic integers: `crystals = int(input(\\\"Mana: \\\"))`.",
    example: "ward_runes = int(input(\"Active wards: \"))\ntotal_power = ward_runes + 3",
    task: "### YOUR MISSION\\n\\nTally magic reservoirs:\\n1. Prompt for mana crystals with **\\\"Enter blue crystals mana points: \\\"** and store it as an integer in `crystal_mana`.\\n2. Prompt for Spellbook power with **\\\"Enter spellbook scroll points: \\\"** and store it as an integer in `spellbook_power`.\\n3. Print the total combined wizard power to stabilize the dynamic dimensional tear.",
    baseCode: "# TODO: Cast spell properties\\n",
    hints: [
      "Add crystals: crystal_mana = int(input(\\\"Enter blue crystals mana points: \\\"))",
      "Add book: spellbook_power = int(input(\\\"Enter spellbook scroll points: \\\"))",
      "Combine and display the sum using print()."
    ],
    solution: "crystal_mana = int(input(\\\"Enter blue crystals mana points: \\\"))\\nspellbook_power = int(input(\\\"Enter spellbook scroll points: \\\"))\\nprint(crystal_mana + spellbook_power)",
    solutionRegex: [/crystal_mana\s*=\s*int\s*\(\s*input/, /spellbook_power\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Ethereal Elixir: Casting to Float",
    headerPrefix: "FORGE_DECIMAL",
    missionPrefix: "FLOAT_POTION",
    intro: "# Potion Crafting: Alchemy Decimals\\n\\nBrew a potion of greater levitation. The apothecary cauldron requires incredibly precise fractional portions of unicorn elixir and phoenix essence. Parse values as decimal floats to prevent potion volatility!",
    technical: "### Arcane Float Diagnostics:\\n- **What is a Float?**: While integers represent whole quantities (like `3` spellbooks), a `float` represents a decimal component (e.g., `4.75` ml of dragon tear). Alchemical scales need floating-point precision to avoid recipe instability.\\n- **Scroll text to Liquid decimals**: Any text obtained by your `input()` spell starts as a string. To transform this text into real alchemical numbers, use the `float()` keyword, like so: `val = float(input())`.\\n- **The Cauldron Crack**: If you try to cast a decimal value like `\"4.75\"` using `int()`, the parsing fails and cracks your cauldron with a catastrophic `ValueError`!",
    example: "mana_drip = float(input(\"Spiritual drip speed: \"))\npotency_pct = mana_drip * 2.8",
    task: "### YOUR MISSION\\n\\nBrew an alchemical fluid scale:\\n1. Prompt for phoenix essence with **\\\"Enter liquid phoenix essence ml: \\\"** and store it as a float in `essence`.\\n2. Prompt for ethereal dilution with **\\\"Ethereal dilution scale: \\\"** and store it as a float in `dilution`.\\n3. Multiply phoenix essence by dilution scale, and print the output.",
    baseCode: "# TODO: Balance alchemical fluid scale\\n",
    hints: [
      "Use essence = float(input(\"Enter liquid phoenix essence ml: \"))",
      "Use dilution = float(input(\"Ethereal dilution scale: \"))",
      "Find liquid power by printing essence * dilution."
    ],
    solution: "essence = float(input(\"Enter liquid phoenix essence ml: \"))\ndilution = float(input(\"Ethereal dilution scale: \"))\nprint(essence * dilution)",
    solutionRegex: [/essence\s*=\s*float\s*\(\s*input/, /dilution\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Spellbook Inscription: Indentation Blocks",
    headerPrefix: "ARCANE_RUNES",
    missionPrefix: "SPELL_BIND",
    intro: "# Mystic Formulations: Spacing Runes\\n\\nWeaving runes into a magical grimoire demands aesthetic and geometric precision. In Python, magical sequences are grouped inside logical blocks using spaces. An unaligned rune will crack the cauldron.",
    technical: "### Alchemy Block Methods:\\n- Mystical boundaries are defined using a trailing colon (`:`).\\n- Indent your sub-spells with exactly 4 spaces to insulate the magic from casting errors.",
    example: "if True:\\n    print(\\\"Spellward active\\\")  # Aligned spell",
    task: "### YOUR MISSION\\n\\nInscribe the levitation ritual:\\n1. Write an `if True:` spell container.\\n2. On the next line, indented with exactly 4 spaces, print **\\\"Accessing...\\\"** to release the magical seals.",
    baseCode: "# TODO: Inscribe spell blocks with 4 spaces\\n",
    hints: [
      "Start your spell array using if True:",
      "Indent the second line with exactly 4 spaces",
      "Add the instruction print(\\\"Accessing...\\\") inside"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Alchemical Chambers: Cascading Magical Circles",
    headerPrefix: "FORGE_GRID",
    missionPrefix: "RUNE_SEAL",
    intro: "# Arcane Runes: Cascading Dimensional Seals\\n\\nBrewing legendary celestial drafts demands stacking glowing magical seals inside the laboratory cauldron. One misaligned margin line breaks your focus, triggering catastrophic mana backfires across the forge.",
    technical: "### Sacred Runic Formations:\\n- Outer barrier ward functions are initialised using standard (4 space) tabs.\\n- Inside, internal focal ward rings require exactly **8 spaces** of nested offset alignment.",
    example: "if True:\\n    print(\"Outer barrier active\")\\n    if True:\\n        print(\"Inner forge core balanced\")",
    task: "### YOUR MISSION\\n\\nDisarm the magical seals guarding the celestial grimoire:\\n1. Construct the primary mystical circle with **`if True:`**.\\n2. Nest the internal containment ward matrix with a **`if True:`** (indented by 4 spaces).\\n3. Deep in the inner crucible (indented by exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Form nested alchemical rune boundaries\\n",
    hints: [
      "Inscribe outer seal on line 1 with if True:.",
      "On line 2, write if True: after indenting with exactly 4 spaces.",
      "On line 3, print(\"CORE ACCESS GRANTED\") after indenting with exactly 8 spaces."
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "BRIDGE_GUARD",
    missionPrefix: "WIZARD_DRIVE",
    intro: "# Gatekeeper Logic: If Statements\n\nYou stand before the Great Bridge. Use your arcane knowledge to prevent the ancient evil from crossing into the realm of men.",
    task: "If `is_balrog` is `True`, print `\"YOU SHALL NOT PASS\"`.",
    baseCode: "is_balrog = True\n# TODO: Defend the bridge\n",
    solution: "is_balrog = True\nif is_balrog:\n    print(\"YOU SHALL NOT PASS\")",
    solutionRegex: [/if\s+is_balrog/, /print\s*\(\s*['\"]YOU SHALL NOT PASS['\"]\s*\)/]
  },
  "control-else": {
    title: "Alchemical Gates: If/Else Seals",
    headerPrefix: "FORGE_GRID",
    missionPrefix: "SEAL_ELSE",
    intro: "# Rune Containment: If/Else Wardings\\n\\nStanding inside the mystic alchemy room, you must safely open glowing potion cabinets. If the inscribed rune key validates cleanly, unlock the magic chest. Else, immediately flare containment ward fires to stop intruders.",
    technical: "### High Arcana Syntax Rules:\\n- Python requires the `else:` ward to carry a trailing colon (`:`).\\n- Placing any condition statement directly on the `else:` level will trigger structural alchemical instability!",
    example: "if spell_active:\\n    print(\\\"Ward running\\\")\\nelse:\\n    print(\\\"Tomb unprotected\\\")",
    task: "### YOUR MISSION\\n\\nDisarm the laboratory seals:\\n1. Construct an `if/else` magic command on `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Control laboratory arcane locks\\n",
    hints: [
      "Write if key_valid: to construct line 1.",
      "Indent and write print(\\\"ACCESS GRANTED\\\") under line 1.",
      "Position else: at the base level margin to lock in the negative check.",
      "Indent and write print(\\\"ALARM TRIGGERED\\\") inside else."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Griffin Aviary: Elif Seals",
    headerPrefix: "CAULDRON_FLOW",
    missionPrefix: "TIER_RUNE",
    intro: "# Alchemical Sanctorum: Magical Access Keys\\n\\nTending the griffin reserve and alchemical libraries requires layered runic clearance. Arcane masters, guild scribes, and regular peasants must be validated in sequence using `elif` to keep spells stable.",
    technical: "### Runecrafting Chain Structures:\\n- Chaining `elif` conditions keeps your dimensional doors behaving correctly.\\n- Check conditions sequentially, from most restrictive to fallback.",
    example: "if is_archmage:\\n    print(\"Master spells unlocked\")\\nelif is_apprentice:\\n    print(\"Basic spells active\")\\nelse:\\n    print(\"Cauldron explodes!\")",
    task: "### YOUR MISSION\\n\\nRead high-order runic validation clearance layers:\\n1. Construct an `if/elif/else` ward around `clearance`.\\n2. If `clearance` equals `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Otherwise, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Lock magical dungeon cabinets\\n",
    hints: [
      "Initiate alchemical check with if clearance == 1:",
      "Inscribe next level with elif clearance <= 5:",
      "Finish the seal with else: to freeze intruders"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Arcane Illusion: Veil Spell",
    headerPrefix: "MYSTIC_COVER",
    missionPrefix: "ILLUSION_PULSE",
    intro: "# Illusion Mastery: Magical Counter-Divination\n\nA rival archwizard is probing your arcane aura. If your protective runes detected the diagnostic scry, project a sensory illusion to silence their inquiries! Otherwise, rest easy in the shadows.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"CAST_VEIL_OF_MISTS\")\nelse:\n    print(\"Mage aura suppressed.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` magic binding:\n1. If `is_detected`, print **`\"CAST_VEIL_OF_MISTS\"`** to shroud your spellcasting.\n2. Else, print **`\"Mage aura suppressed.\"`** and complete your/our ritual.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"CAST_VEIL_OF_MISTS\".",
      "Add else: at the base level and print \"Mage aura suppressed.\""
    ],
    solution: "if is_detected:\n    print(\"CAST_VEIL_OF_MISTS\")\nelse:\n    print(\"Mage aura suppressed.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]CAST_VEIL_OF_MISTS['"]\s*\)/, /print\s*\(\s*['"]Mage\s+aura\s+suppressed\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Sorcery Ranking: Mage Order Status",
    headerPrefix: "MYSTIC_ACADEMY",
    missionPrefix: "SPELL_RANK",
    intro: "# Wizards Circle: Arcane Level Standings\n\nAssign a magical title rank to an academy wizard based on their internal mana flow capacity. High-level spellcasters are inducted into the elite Council of Archmages.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to check the `mana_level` capacity.\n- **Assignment**: Update the `wizard_rank` variable inside the logical structures to reflect academy hierarchy.",
    example: "if power > 9000:\n    wizard_rank = \"Archmage\"\nelse:\n    wizard_rank = \"Apprentice\"",
    task: "### YOUR MISSION\n\nEvaluate the magical mana capacity:\n1. If caster `mana_level > 9000`, set `wizard_rank` to **`\"Archmage\"`**.\n2. Else, set `wizard_rank` to **`\"Apprentice\"`**.\n3. Finally, display your mage title using `print(wizard_rank)`.",
    baseCode: "mana_level = 9001\nwizard_rank = \"\"\n# TODO: Evaluate magic capability and print it\n",
    hints: [
      "Set wizard_rank within the if and else blocks respectively.",
      "Ensure print(wizard_rank) is placed at the very end, outside the indentation."
    ],
    solution: "mana_level = 9001\nif mana_level > 9000:\n    wizard_rank = \"Archmage\"\nelse:\n    wizard_rank = \"Apprentice\"\nprint(wizard_rank)",
    solutionRegex: [/if\s+mana_level\s*>\s*9000\s*:/, /wizard_rank\s*=\s*['"]Archmage['"]/, /wizard_rank\s*=\s*['"]Apprentice['"]/, /print\s*\(\s*wizard_rank\s*\)/]
  },
  "control-adventure": {
    title: "Runic Vault: Portal Path Selection",
    headerPrefix: "PORTAL_GATE",
    missionPrefix: "RUNE_ACCESS",
    intro: "# Archmage Sanctum: Vault Sentry Gate\n\nYou have bypassed the gargoyle outer circle. Before you sit two portal keys of light: \"1\" (Inner Sanctum Core) or \"2\" (Secret Chamber Gateway). Choose your destination!",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Activating Sanctum Gate...\")",
    task: "### YOUR MISSION\n\nDirect the portal spell matrix:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"** to open the vault door.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"** to find the hidden hallway.\n3. Else, print **\"Connection Lost.\"** and vanish into the Void.",
    baseCode: "choice = \"1\"\n# TODO: Spellbind the portals\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Arcane Conduit: Mana Dispatch",
    headerPrefix: "CONDUIT_CORE",
    missionPrefix: "ELEMENT_SPLIT",
    intro: "# Elemental Gate: Mystic Matrix\n\nThe magical circle must distribute raw magical ley line channels depending on the requested spell element: \"fire\", \"frost\", or \"lightning\".",
    technical: "### Cascading Checks:\n- **Sequential**: Scans the runic glyph arrays starting from primal combustion nodes.\n- **Exclusive**: Routing to frost spells instantly subdues flame channels to preserve runes.\n- **Exhaustive**: An `else` locks magic vents to avoid feedback bursts.",
    example: "if element == \"fire\":\n    print(\"Ignition surge!\")\nelif element == \"frost\":\n    print(\"Blizzard formed.\")",
    task: "### YOUR MISSION\n\nRoute active elements for variable `element`:\n1. If `element` is **`\"fire\"`**, print **`\"Ignition surge!\"`**\n2. Elif `element` is **`\"frost\"`**, print **`\"Blizzard formed.\"`**\n3. Elif `element` is **`\"lightning\"`**, print **`\"Tesla static.\"`**\n4. Else, print **`\"Spell fizzled.\"`**",
    baseCode: "element = \"fire\"\n# TODO: Channel elemental forces\n",
    hints: [
      "Match elemental magic types.",
      "Include print commands for results."
    ],
    solution: "if element == \"fire\":\n    print(\"Ignition surge!\")\nelif element == \"frost\":\n    print(\"Blizzard formed.\")\nelif element == \"lightning\":\n    print(\"Tesla static.\")\nelse:\n    print(\"Spell fizzled.\")",
    solutionRegex: [/if\s+element\s*==\s*['"]fire['"]\s*:/, /elif\s+element\s*==\s*['"]frost['"]\s*:/, /elif\s+element\s*==\s*['"]lightning['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Ignition\s+surge!['"]\s*\)/, /print\s*\(\s*['"]Blizzard\s+formed\.['"]\s*\)/, /print\s*\(\s*['"]Tesla\s+static\.['"]\s*\)/, /print\s*\(\s*['"]Spell\s+fizzled\.['"]\s*\)/]
  },
  "control-loops": {
    title: "Spell Cycles: Conjuration Loops",
    headerPrefix: "CHAMBER_CORE",
    missionPrefix: "RUNIC_GLYPH",
    intro: "# Mystic Spires: Magical Automations\n\nWizard apprentices shouldn't cast scouting flashes manually. Automate a spell sequence using a runic circle to run scouts through spires sequentially.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### Spell Automation:\n- **range(5)**: Runs the spell cycle exactly 5 times (0 through 4).\n- **Iteration**: The loop variable tracks each active runic ward.",
    example: "for i in range(3):\n    print(f\"Spire {i+1} scouted\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Spire {i+1} scouted\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write your spell loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Spire {i+1} scouted"
    ],
    solution: "for i in range(5):\n    print(f\"Spire {i+1} scouted\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Runic Cipher: Glyph Walk",
    headerPrefix: "GLYPH_READER",
    missionPrefix: "RUNA_DECODE",
    intro: "# Ancient Scripts: Runic Reading\n\nAncient spell formulas are stored in magical runic arrays. Scholars must read and channel each glyph symbol individually to trigger the defensive shield.",
    technical: "### Casting Sequence:\n- **Iterative Reading**: The loop variable extracts one magic rune item at a time sequentially.\n- **Channel Rest**: The magical flow stops once the glyph array has been read completely.",
    example: "for rune in \"SPELL\":\n    print(rune)",
    task: "### YOUR MISSION\n\nYou've discovered a protective `spell`: `\"LUMOS\"`. Use a `for` loop to iterate through every character `rune` in the variable `spell` and `print` it.",
    baseCode: "spell = \"LUMOS\"\n# TODO: Walk through the runes sequentially\n",
    hints: [
      "Write 'for rune in spell:' to begin reading.",
      "Print individual components to complete the enchantment."
    ],
    solution: "spell = \"LUMOS\"\nfor rune in spell:\n    print(rune)",
    solutionRegex: [/for\s+rune\s+in\s+spell/, /print\s*\(\s*rune\s*\)/]
  },
  "loop-list-audit": {
    title: "Archive Sorting: Spell Filtration",
    headerPrefix: "ALCHEMIST_REG",
    missionPrefix: "SCROLL_SORT",
    intro: "# Spell Vaults: Runic Ciphers\n\nYou're organizing magic scrolls in the High Tower. Locate hidden transmutation directives ending with the sacred rune suffix `.run`.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"teleport.run\"`, then `\"recipe.ing\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".run\")` asks: *\"Does the text inside `f` end with `.run`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".run\"):\n          # This runs ONLY if the current file ends with .run!\n  ```",
    example: "scrolls = [\"history.txt\", \"fireball.run\"]\nfor s in scrolls:\n    if \".run\" in s:\n        print(s)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".run\"`, `print` the magical notice: `f\"Incantation loaded: {f}\"`.",
    baseCode: "discovered_files = [\"teleport.run\", \"recipe.ing\", \"levitate.run\", \"map.pdf\"]\n# TODO: Catalog magical scroll files\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".run\"):",
      "Print f'Incantation loaded: {f}'"
    ],
    solution: "discovered_files = [\"teleport.run\", \"recipe.ing\", \"levitate.run\", \"map.pdf\"]\nfor f in discovered_files:\n    if f.endswith(\".run\"):\n        print(f\"Incantation loaded: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.run['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Runic Matrix: Spires Grid",
    headerPrefix: "MAGE_GATE",
    missionPrefix: "RUNE_ALIGN",
    intro: "# Teleportation Gate: Runic Coordinates\n\nTo power the grand gateway, you must trace the magical glyph rows (X) and columns (Y) sequentially, aligning the focal energy cells.",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 spell circle scan with variable `x` (outer loop representing Rows) and variable `y` (inner loop representing Columns) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Row 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Col 0) -> Output: `Magic - Row: 0, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Magic - Row: 0, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Magic - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Row 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Col 0) -> Output: `Magic - Row: 1, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Magic - Row: 1, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Magic - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Row 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Col 0) -> Output: `Magic - Row: 2, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Magic - Row: 2, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Magic - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Rune {r}-{c}\")",
    task: "### YOUR MISSION\n\nAlign a **3x3 spell circle**. Use nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the rune calibration parameters in this exact format: `f\"Magic - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Ignite the magical coordinates\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Magic - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Magic - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Mana Surge: Spell Cast Dissolve",
    headerPrefix: "MAGE_GATE",
    missionPrefix: "SPELL_ABORT",
    intro: "# Conjuration: Preventing Magical Overloads\n\nWhen channeling a level 10 elemental spell, ancient mages must watch for runic fractures. To dissolve casting circles instantly, mages invoke the magical `break` keyword.",
    technical: "### Evaporation Runes:\n- **Clean Void**: Collapse magical gateways immediately upon structural corruption.\n- **Spell Stability**: Implement check nodes nested inside standard iteration circles.",
    example: "for spark in range(10):\n    if spark == 5:\n        break\n    print(spark)",
    task: "### YOUR MISSION\n\nChannel magical vibrations across `range(10)` frames. If the instability warning level `i` registers exactly `7`, invoke `break` to avoid complete spell disintegration. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Cast spell sequences with shield breaks\n",
    hints: [
      "Launch spell circle 'for i in range(10):'",
      "Impose magical check 'if i == 7:'",
      "Deploy 'break' beneath, then print runic frequency i"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Ancient Relic: Spell Discharge",
    headerPrefix: "RELIC_CYCLE",
    missionPrefix: "MANA_DRAIN",
    intro: "# Runes of Sustenance: While Loops\n\nWhile `for` loops iterate over a specific sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor the battery life of an ancient mechanical golem relic during defense.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power the ward shields.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "MAGE_COUNCIL",
    missionPrefix: "SPELL_BIND",
    intro: "# Spell Invocations: Functions\n\nDon't recite incantations manually for every protective rune ward! Create a reusable spell binding function to charge any specific defensive barrier node in the fortress.",
    task: "Write a function `charge_ward(node_id)` that prints `f'Charging protection ward {node_id}...'`. Call it.",
    baseCode: "# TODO: Define ward binding spells\n",
    solution: "def charge_ward(node_id):\n    print(f'Charging protection ward {node_id}...')\n\ncharge_ward('A7')",
    solutionRegex: [/def\s+charge_ward/, /charge_ward\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "DRUID_SPELL",
    missionPrefix: "FOREST_ECHO",
    intro: "# Echoing Deep: Recursion\n\nTo send a beacon through the infinite rings of the Whispering Woods, a druid casts an echoing pulse that prints its resonance wave `layer` and calls itself recursively with `layer-1` until it fades out.",
    task: "Write a recursive function `whisper_echo(layer)` that prints the resonance level and calls itself with `layer-1` until it reaches `0`.",
    baseCode: "# TODO: Call echoing whisper\n",
    solution: "def whisper_echo(layer):\n    print(layer)\n    if layer > 0:\n        whisper_echo(layer - 1)\n\nwhisper_echo(5)",
    solutionRegex: [/def\s+whisper_echo/, /whisper_echo\s*\(\s*layer\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "GUILD_REGISTRY",
    missionPrefix: "HERO_TEMPLATE",
    intro: "# Guild Blueprints: Classes\n\nGuild Masters, we need a unified structural blueprint for all our guild adventurers. Instead of writing separate stats from scratch for every hero, define a reusable guild template in Python called a **Class**.",
    task: "### YOUR MISSION\n\nDefine a base class named `Adventurer`. Use `pass` inside its body under proper block indentation.",
    baseCode: "# TODO: Establish base class Adventurer\n",
    hints: [
      "Use 'class Adventurer:' followed by an indented 'pass'.",
      "Check your capitalization carefully!"
    ],
    solution: "class Adventurer:\n    pass",
    solutionRegex: [/class\s+Adventurer/, /pass/]
  },
  "oop-init": {
    headerPrefix: "GUILD_ONBOARD",
    missionPrefix: "HERO_SPEC",
    intro: "# Initiating Heroes: Constructors\n\nEvery time a new recruit signs the guild roster, we want to catalog their adventurer name instantly! We will use Python's constructor method `__init__` to assign names automatically upon initialization.",
    task: "### YOUR MISSION\n\nIn `Adventurer`, define the constructor `__init__` which accepts `self` and a parameter `name`. Assign the value of `name` to `self.name`.",
    baseCode: "class Adventurer:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Use 'def __init__(self, name):' as the constructor name.",
      "Assign inside the body: self.name = name"
    ],
    solution: "class Adventurer:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "TRAINING_GROUNDS",
    missionPrefix: "COMBAT_TEST",
    intro: "# Readying for Battle: Methods\n\nAn adventurer needs active abilities to clear dungeons and vanquish beasts. Functions defined inside a class are called **Methods**. Let's add a battle cry so any recruited classmate can shout on commanding cues!",
    task: "### YOUR MISSION\n\nAdd a `battle_cry` method to `Adventurer` that `print`s \"For glory\".",
    baseCode: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define battle_cry method\n",
    hints: [
      "Write 'def battle_cry(self):' and indent it inside the class boundaries.",
      "Print 'For glory' inside the method body."
    ],
    solution: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n    def battle_cry(self):\n        print(\"For glory\")",
    solutionRegex: [/def\s+battle_cry\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]For glory['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "MANA_MONITOR",
    missionPrefix: "QUEST_CHECK",
    intro: "# Independent Hero Slabs: Independent Object State\n\nIf we send the mighty Paladin on a high-risk quest, the resting Rogue back in the tavern shouldn't suddenly run out of stamina! Each adventurer tracks their own health, mana, and state independently.",
    task: "### YOUR MISSION\n\n1. Add a `quest_state` variable in `__init__` defaulted to the string \"Standby\".\n2. Create a method `start_quest` that updates `self.quest_state` to \"Active\".",
    baseCode: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add quest_state default\n    # TODO: Add start_quest method\n",
    hints: [
      "Add 'self.quest_state = \"Standby\"' inside the constructor.",
      "In start_quest, write 'self.quest_state = \"Active\"'."
    ],
    solution: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n        self.quest_state = \"Standby\"\n    def start_quest(self):\n        self.quest_state = \"Active\"",
    solutionRegex: [/self\.quest_state\s*=\s*['"]Standby['"]/, /def\s+start_quest/, /self\.quest_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "PARTY_COMMS",
    missionPrefix: "SHARE_LOOT",
    intro: "# Dungeon Parties: Object Interaction\n\nNo adventurer takes on dragons entirely alone! In Python OOP, objects can interact with one another by receiving other instances of a class as variables. Let's design a protective coordination method!",
    task: "### YOUR MISSION\n\nAdd a `protect_hero` method to `Adventurer` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Shielding: {other.name}\"`.",
    baseCode: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add protect_hero method\n",
    hints: [
      "The protect_hero(self, other) signature accepts 'other' as its second parameter.",
      "Access other's name using other.name inside an f-string."
    ],
    solution: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n    def protect_hero(self, other):\n        print(f\"Shielding: {other.name}\")",
    solutionRegex: [/def\s+protect_hero\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "GUILD_UPGRADE",
    missionPrefix: "MAGE_SPECIAL",
    intro: "# Specialized Guild Roles: Inheritance\n\nA Wizard is an adventurer, but they get specialized magical stats and can cast sorcery! Inheritance allows us to build specialized hero classes on top of our existing base class templates.",
    task: "### YOUR MISSION\n\nCreate a class `Wizard` that inherits from `Adventurer`. Give it a `cast_spell` method that `print`s \"Spellcast active\".",
    baseCode: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create Wizard subclass inheriting from Adventurer\n",
    hints: [
      "Use 'class Wizard(Adventurer):' to establish inheritance.",
      "Define 'def cast_spell(self):' to print the spellcast confirmation."
    ],
    solution: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n\nclass Wizard(Adventurer):\n    def cast_spell(self):\n        print(\"Spellcast active\")",
    solutionRegex: [/class\s+Wizard\s*\(\s*Adventurer\s*\)\s*:/, /def\s+cast_spell/, /print\s*\(\s*['"]Spellcast active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "GUILD_LEDGER",
    missionPrefix: "HERO_READOUT",
    intro: "# Tavern Registers: Custom String Representation\n\nIf we try to print a hero object directly, Python throws a confusing raw pointer coordinate. Let's override the special `__str__` method to print a beautifully formatted nameplate instead.",
    task: "### YOUR MISSION\n\nIn `Adventurer`, add standard method `__str__` that returns: `f\"Adventurer {self.name}\"`.",
    baseCode: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define standard __str__(self) method in Adventurer.",
      "Use 'return' instead of printing inside __str__."
    ],
    solution: "class Adventurer:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Adventurer {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Adventurer.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "GUILD_HEADQUARTERS",
    missionPrefix: "WORLD_CONST",
    intro: "# Global Affiliations: Shared Class Variables\n\nEach adventurer has a unique physical class, name, and quest log, but they *all* belong to the same guild! We use Class Variables to share variables globally among all instances without allocating extra heap memory.",
    task: "### YOUR MISSION\n\n1. Define a class variable `guild` set to \"Ironclad\" in `Adventurer`.\n2. `print` the class variable using `Adventurer.guild`.",
    baseCode: "class Adventurer:\n    # TODO: Define class variable 'guild'\n    pass\n# TODO: Print Adventurer.guild\n",
    hints: [
      "Declare guild = \"Ironclad\" right below 'class Adventurer:' before other code.",
      "Access it directly with Adventurer.guild."
    ],
    solution: "class Adventurer:\n    guild = \"Ironclad\"\n\nprint(Adventurer.guild)",
    solutionRegex: [/guild\s*=\s*['"]Ironclad['"]/, /print\s*\(\s*Adventurer\.guild\s*\)/]
  }
};