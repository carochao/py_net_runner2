export const SPACE_THEME: any = {
  "intro-print": {
    headerPrefix: "SAT_COMM",
    missionPrefix: "BEACON_INIT",
    intro: "# Intergalactic Bridge: print()\n\nThe vacuum of space is vast. To establish your position among the stars, broadcast a signal beacon that the relay stations on Mars can detect.",
    task: "Use `print()` to display: `\"One small step for man\"`",
    baseCode: "# TODO: Broadcast beacon signal\n",
    solution: "print(\"One small step for man\")",
    solutionRegex: [/print\s*\(\s*['\"]One small step for man['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "ORBIT_STYLE",
    missionPrefix: "CASE_CALIBRATION",
    intro: "# Orbit Safety: Case Calibration\n\nSpace telemetry requires perfect accuracy. The onboard navigation computer is case-sensitive; using `Print()` or capitalizing telemetry variables will lead to deep-space telemetry misalignment! Keep your commands and orbital variables in clean lowercase.",
    task: "Define a lowercase telemetry variable named `rover_signal` with a value of `900`. Print its status using `print()` to confirm connection with the Martian colony. Keep everything lowercase!",
    baseCode: "# TODO: Define rover_signal and print it\n",
    solution: "rover_signal = 900\nprint(rover_signal)",
    solutionRegex: [/rover_signal\s*=\s*900/, /print\s*\(\s*rover_signal\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "SHIP_LOG",
    missionPrefix: "FLIGHT_NOTE",
    intro: "# Astronaut Logs: Comments\n\nNot every observation belongs in the formal telemetry. Use comments to record personal notes about the view of the Orion Nebula for the journey home.",
    task: "Write a comment `# Comet spotted at zero-nine-zero` and then `print(\"Log updated\")`",
    baseCode: "# TODO: Add personal log entry\n",
    solution: "# Comet spotted at zero-nine-zero\nprint(\"Log updated\")",
    solutionRegex: [/#.*Comet spotted at zero-nine-zero/, /print\s*\(\s*['\"]Log updated['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "SAT_HUD",
    missionPrefix: "COORD_TAG",
    intro: "# Navigational Logs: Inline Comments\n\nWhile charting unknown worlds, you need to mark satellite parameters with quick, real-time telemetry comments. Let's tag deep space tracking variables on the fly.",
    task: "Initialise `telemetry_port` to `8080`. On the same line, add an inline comment `# Deep Space Band`.",
    baseCode: "# TODO: Initialise telemetry port with inline comment\n",
    solution: "telemetry_port = 8080 # Deep Space Band",
    solutionRegex: [/telemetry_port\s*=\s*8080/, /#.*Deep Space Band/]
  },
  "intro-vars": {
    headerPrefix: "SHIP_TELEMETRY",
    missionPrefix: "STATS_SYNC",
    intro: "# Astronaut Equipment: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled supply container** in your spacecraft's cabin! You write a label on the locker (like `oxygen_liters`), store fuel, oxygen levels, or freeze-dried food inside, and monitor or consume them during your space voyage.\n\nYour life-support suit requires constant telemetry. Let's use variables to track your oxygen tank capacity and remaining rations in your space locker.",
    task: "Create `oxygen_liters` set to `64` and `rations_count` set to `1500`.",
    baseCode: "# TODO: Sync suit stats\n",
    solution: "oxygen_liters = 64\nrations_count = 1500",
    solutionRegex: [/oxygen_liters\s*=\s*64/, /rations_count\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "THRUSTER_CORE",
    missionPrefix: "SPEED_CALIBRATE",
    intro: "# Speed Boost: Reassignment\n\nYou have just ignited the second-stage ion thrusters. Update your thruster output variable to reflect the warp velocity multiplier.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "thruster_multiplier = 1.0\nprint(thruster_multiplier)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\nthruster_multiplier = 2.1\nprint(thruster_multiplier)  # Output: 2.1",
    task: "Initialise `thruster_multiplier` as `1.0`. Then update `thruster_multiplier` to `2.1`. Print it.",
    baseCode: "thruster_multiplier = 1.0\n# TODO: Fire secondary boosters to 2.1\n",
    solution: "thruster_multiplier = 1.0\nthruster_multiplier = 2.1\nprint(thruster_multiplier)",
    solutionRegex: [/thruster_multiplier\s*=\s*1\.0/, /thruster_multiplier\s*=\s*2\.1/, /print\s*\(\s*thruster_multiplier\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "FLIGHT_COMP",
    missionPrefix: "VECTOR_CATCH",
    intro: "# Echo Request: Satellite Vector Handshake\n\nWait for the Mars orbital station to push a telemetry transmission packet! Before the lander's docking coordinate bypasses your navigation terminal, set up an empty placeholder variable in your flight computer's memory buffer to catch the incoming vector ID.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `space_data = \"\"` as a placeholder, we allocate space in memory. Then, running `space_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the docking vector dynamically so you can see it change!",
    example: "space_data = \"\"  # Buffer is ready, but currently empty\nspace_data = input(\"Enter vector ID: \")  # Line 2 updates the empty string with your input!\nprint(\"Docking sequence: \" + space_data)",
    task: "1. Initialize `space_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter vector ID: \")` to populate it.\n3. Print `\"Docking sequence: \" + space_data`.",
    baseCode: "# TODO: Initialize empty telemetry buffer, capture, and print\n",
    hints: [
      "Use space_data = \"\" to prepare the flight memory slot.",
      "Use space_data = input(\"Enter vector ID: \") to capture the telemetry coordinates.",
      "Print \"Docking sequence: \" combined with the space_data variable."
    ],
    solution: "space_data = \"\"\nspace_data = input(\"Enter vector ID: \")\nprint(\"Docking sequence: \" + space_data)",
    solutionRegex: [/space_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "CRITICAL_LOGS",
    missionPrefix: "LIFE_SUPPORT",
    intro: "# Vital Signs: Multi-Assignment\n\nOxygen and fuel are your two most precious resources. Initialise their levels in a single operation to ensure your dashboard has the latest readings for the long voyage home.",
    task: "Assign `oxygen` set to `95` and `fuel` set to `100` in one line.",
    baseCode: "# TODO: Sync life support\n",
    solution: "oxygen, fuel = 95, 100",
    solutionRegex: [/oxygen\s*,\s*fuel\s*=\s*95\s*,\s*100/]
  },
  "data-strings": {
    headerPrefix: "MAP_SENSORS",
    missionPrefix: "DESTINATION_LOC",
    intro: "# Sector Scan: Strings\n\nNavigating through asteroid clusters requires pinpointing star systems. Register your ship's destination.",
    task: "Create a variable `destination` set to `\"Alpha Centauri\"`. Print it.",
    baseCode: "# TODO: Set star path\n",
    solution: "destination = \"Alpha Centauri\"\nprint(destination)",
    solutionRegex: [/destination\s*=\s*['\"]Alpha Centauri['\"]/]
  },
  "data-booleans": {
    headerPrefix: "LAUNCH_TOWER",
    missionPrefix: "PREFLIGHT_OK",
    intro: "# Rocket Logic: Booleans\n\nIs the fuel tank pressurized? Has the launch escape tower been armed? Use booleans to monitor mission-critical components during countdown.",
    task: "Set `fuel_pressurized` to `True` and `escape_tower_active` to `False`.",
    baseCode: "# TODO: Check booster status\n",
    solution: "fuel_pressurized = True\nescape_tower_active = False",
    solutionRegex: [/fuel_pressurized\s*=\s*True/, /escape_tower_active\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "LOGISTICS_HUB",
    missionPrefix: "RE_SUPPLY",
    intro: "# Logistics Report: Math\n\nGround control is asking for a resource tally. Combine the current oxygen reserves with the emergency backup tanks to ensure the crew can survive the journey to Mars.",
    task: "Create `main_tank` as `85` and `emergency_tank` as `15`. Store the sum in `oxygen_total` and print it.",
    baseCode: "# TODO: Sum mission resources\n",
    solution: "main_tank = 85\nemergency_tank = 15\noxygen_total = main_tank + emergency_tank\nprint(oxygen_total)",
    solutionRegex: [/oxygen_total\s*=\s*main_tank\s*\+\s*emergency_tank/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nMission logs are corrupted. Initiate a technical protocol memory dump to calculate net oxygen flow by adjusting tank levels and efficiency factors.",
    technical: "### Life Support Dynamics:\n1. **Flow Aggregation**: The primary storage level is offset by the telemetry emergency vent rate prior to calculating recycling throughput.\n2. **Parentheses**: Parentheses `()` force addition/subtraction to run before multiplying by the core recycler efficiency.",
    example: "tank_level = 80\ndrain_rate = -10\nfinal_oxygen = (tank_level + drain_rate) * 0.8\nprint(final_oxygen)",
    task: "1. Create coordinate `tank_level` as `80`.\n2. Create coordinate `drain_rate` as `-10`.\n3. Calculate `(tank_level + drain_rate) * 0.8` and store in `final_oxygen`.\n4. Print `final_oxygen`.",
    baseCode: "# TODO: Check oxygen level\n",
    solution: "tank_level = 80\ndrain_rate = -10\nfinal_oxygen = (tank_level + drain_rate) * 0.8\nprint(final_oxygen)",
    solutionRegex: [/final_oxygen\s*=\s*\(\s*tank_level\s*\+\s*drain_rate\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "CARGO_MANIFEST",
    missionPrefix: "SUPPLY_TALLY",
    intro: "# Mission Gear: Lists\n\nDon't leave anything behind on Earth. Store your critical mission equipment in a list to ensure the crew is fully prepared for the lunar landing.",
    technical: "### Space Cargo Manifest Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of data items packed into a single variable. Instead of declaring separate variables for every component in your cargo bay (e.g., `item1 = \"Oxygen Tank\"`, `item2 = \"Drill\"`), a list allows you to group multiple essential supplies under a single manifest registry.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, which act as the solid outer walls of your shuttle's storage pods.\n- **Comma Separation**: Every supply item packed inside your manifest must be separated by a comma.\n- **Zero-Based Pods**: Python lists use zero-based indexing. The first cargo bay container is registered at index `0`, the second at `1`, and the third at `2`.",
    example: "# Log multiple shuttle items in a single list variable\nshuttle_cargo = [\"Spacesuit\", \"Radio Transceiver\", \"Fuel Cell\"]\nprint(shuttle_cargo)  # Displays the entire cargo manifest payload",
    task: "Initialise your `gear` list with \"Oxygen Tank\", \"Solar Panel\", and \"Drill\". Print the list to confirm the manifest.",
    baseCode: "# TODO: Log mission supplies\n",
    solution: "gear = [\"Oxygen Tank\", \"Solar Panel\", \"Drill\"]\nprint(gear)",
    solutionRegex: [/gear\s*=\s*\[/, /print\s*\(\s*gear\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "MANIFEST_ACCESS",
    missionPrefix: "YOUR TASK",
    intro: "# Quick Release: Gear Indexing\n\nThe airlock cargo bay holds crucial equipment. Pinpoint specific life-support canisters using precise positional indices.",
    technical: "### Cargo Map:\n\n```text\ngear = [\"Oxygen Tank\", \"Solar Panel\", \"Drill\"]\n#       [0]             [1]             [2]\n```",
    example: "# Access cargo gear in our checklist using list indices\ngear = [\"Oxygen Tank\", \"Solar Panel\", \"Drill\"]\n\n# Isolate first cargo (index 0)\np1 = gear[0]\nprint(p1)  # Output: Oxygen Tank\n\n# Isolate third cargo (index 2)\np3 = gear[2]\nprint(p3)  # Output: Drill",
    task: "1. Extract the first cargo item (index 0) from the `gear` list and store in `p1`.\n2. Extract the third cargo item (index 2) and store in `p3`.\n3. Print `p1` and `p3`.",
    baseCode: "gear = [\"Oxygen Tank\", \"Solar Panel\", \"Drill\"]\n# TODO: Extract indices 0 and 2 from cargo\n",
    solution: "p1 = gear[0]\np3 = gear[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*gear\s*\[\s*0\s*\]/, /p3\s*=\s*gear\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "CARGO_STOWAGE",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value space equipment gear is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "gear = [\"Oxygen Tank\",\"Solar Panel\",\"Drill\"]\ngear.append(\"Rover\")\n# gear is now updated!",
    task: "1. Append \"Rover\" to the `gear` list.\n2. Print the final `gear` list to confirm installation.",
    baseCode: "gear = [\"Oxygen Tank\",\"Solar Panel\",\"Drill\"]\n# TODO: Append value and print\n",
    solution: "gear.append(\"Rover\")\nprint(gear)",
    solutionRegex: [/gear\.\s*append\s*\(\s*['"]Rover['"]\s*\)/, /print\s*\(\s*gear\s*\)/]
  },
  "list-pop": {
    headerPrefix: "AIRLOCK_PURGE",
    missionPrefix: "YOUR TASK",
    intro: "# Airlock Jettison: .pop()\n\nAn alarm is sounding in the space station's main airlock! Pressure is fluctuating, and you need to clear out the damaged life-support containers immediately to prevent a hull rupture. Use `.pop()` to jettison the last damaged item straight into the vacuum of space!",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = damaged_canisters.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `damaged_canisters` list and store it inside a variable named `jettisoned`.\n2. Print `jettisoned` to output the purged token.",
    baseCode: "damaged_canisters = [\"Empty H2O\",\"Ripped Tube\",\"Depleted Cell\"]\n# TODO: Pop last element and print\n",
    solution: "jettisoned = damaged_canisters.pop()\nprint(jettisoned)",
    solutionRegex: [/jettisoned\s*=\s*damaged_canisters\.\s*pop\s*\(\s*\)/, /print\s*\(\s*jettisoned\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "TELEMETRY_LOCK",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Telemetry Immutable Tuples:\n- **What is a Tuple?**: A tuple is an ordered sequence of data fields, like a flight manifest, but with a critical safety distinction: **lists are mutable** (meaning you can add cargo or clear out old space junk at runtime), whereas **tuples are immutable** (their coordinates and parameters are permanently hardcoded and locked down in memory, preventing any post-launch changes).\n- **Syntax**: Enclosed inside round parentheses `()` instead of the standard square brackets `[]`.\n- **Speed & Security**: Because tuples are simpler and read-only, guidance systems process them faster and use them to protect vital parameters like lunar coordinates or escape velocities from accidental mid-flight changes.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `lunar_base` containing \"Sea of Tranquility\" and the number `1969`.\n2. Print the `lunar_base` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "lunar_base = (\"Sea of Tranquility\", 1969)\nprint(lunar_base)",
    solutionRegex: [/lunar_base\s*=\s*\(\s*['"]Sea of Tranquility['"]\s*,\s*1969\s*\)/, /print\s*\(\s*lunar_base\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "PORT_VERIFICATION",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `shuttle_crew` containing the single string \"Candidate A\"\n2. Create a tuple named `telemetry_port` containing the numbers `5` and `1`.\n3. Rewrite `shuttle_crew[0]` to be \"Commander\"\n4. Print both `shuttle_crew` and `telemetry_port`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "shuttle_crew = [\"Candidate A\" ]\ntelemetry_port = (5, 1)\nshuttle_crew[0] = \"Commander\"\nprint(shuttle_crew)\nprint(telemetry_port)",
    solutionRegex: [/shuttle_crew\s*\[\s*0\s*\]\s*=\s*['"]Commander['"]/, /telemetry_port\s*=\s*\(\s*5\s*,\s*1\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "MISSION_STAGING_SLICE",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `space_station_orbit` list.\n2. Store this result in a new variable named `cruising_phases`.\n3. Print the resulting slice `cruising_phases`.",
    baseCode: "space_station_orbit = [\"Launch\",\"Atmosphere\",\"LowOrbit\",\"HighOrbit\",\"LunarTransit\",\"DeepSpace\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "cruising_phases = space_station_orbit[1:4]\nprint(cruising_phases)",
    solutionRegex: [/cruising_phases\s*=\s*space_station_orbit\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*cruising_phases\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "RADIATION_WARN",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `solar_winds`.\n2. Store the result in a variable named `ion_storms`.\n3. Print `ion_storms`.",
    baseCode: "solar_winds = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "ion_storms = [w for w in solar_winds if w > 50]\nprint(ion_storms)",
    solutionRegex: [/ion_storms\s*=\s*\[\s*w\s+for\s+w\s+in\s+solar_winds\s+if\s+w\s*>\s*50\s*\]/, /print\s*\(\s*ion_storms\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "ANOMALY_SWEEP",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `anomaly_frequencies` list using a list comprehension.\n2. Store this filtered list in a new variable named `even_frequencies`.\n3. Print `even_frequencies`.",
    baseCode: "anomaly_frequencies = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "even_frequencies = [f for f in anomaly_frequencies if f % 2 == 0]\nprint(even_frequencies)",
    solutionRegex: [/even_frequencies\s*=\s*\[\s*f\s+for\s+f\s+in\s+anomaly_frequencies\s+if\s+f\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*even_frequencies\s*\)/]
  },
  "intro-input": {
    headerPrefix: "MISSION_CTRL",
    missionPrefix: "YOUR TASK",
    intro: "# Telemetry Command: Astronaut Handshake\n\nPrepare for deep-space flight. To calibrate optimal thrust directions, prompt the pilot astronaut for their next coordinate trajectory.",
    technical: "### Navcomputer Inputs:\n- Use `input()` to fetch live telemetry values or heading adjustments from orbital flight grids.\n- Feeds directly into orbital stabilization guidance models.\n- **Telemetry Concatenation**: Join transmission vectors or flight labels together using the `+` operator (e.g., `\"Mars\" + \"Base\"` becomes `\"MarsBase\"`). Remember to add spaces in your quoted text, or the navigation coordinates will merge and cause trajectory drift!",
    example: "planet = input(\"Destination planet: \")\nprint(\"Mapping route to: \" + planet)",
    task: "1. Ask the astronaut for the landing zone with the prompt: **\"Enter landing zone: \"** and store it in a variable named `landing_zone`.\n2. Print **\"Initiating touchdown sequence at: \"** concatenated with the user\'s `landing_zone` value.",
    baseCode: "# TODO: Capture landing zone and print sequence status\n",
    solution: "landing_zone = input(\"Enter landing zone: \")\nprint(\"Initiating touchdown sequence at: \" + landing_zone)",
    solutionRegex: [/landing_zone\s*=\s*input\s*\(\s*['\"]Enter landing zone: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Initiating touchdown sequence at: \s*['\"]\s*\+\s*landing_zone\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "MISSION_LOG",
    missionPrefix: "TELEMETRY_GEN",
    intro: "# Astronaut Log: Story Generator\n\nGenerate customized telemetry records for Mission Control. Keep space logs synchronized with autopilot routes and space exploration devices.",
    technical: "### Orbital String Compilation:\nConcatenate astronaut designations, docking bays, and propulsion systems sequentially using standard string addition.",
    example: "crew = \"Armstrong\"\nfacility = \"Lunar Gateway\"\ntelemetry = crew + \" landed at \" + facility\nprint(telemetry)",
    task: "1. Ask the space program for the pilot name with the prompt: **\"Enter pilot name: \"** and store it in `astronaut`.\n2. Ask the space program for the docking sector with the prompt: **\"Enter docking sector: \"** and store it in `sector`.\n3. Ask the space program for the propulsion tool with the prompt: **\"Enter auxiliary tool: \"** and store it in `tool`.\n4. Combine into a variable named `orbit_log` using the format: `astronaut + \" bypassed \" + sector + \" with a \" + tool + \"!\"` and print `orbit_log`.",
    baseCode: "# TODO: Assemble deep space exploration reports\n",
    solution: "astronaut = input(\"Enter pilot name: \")\nsector = input(\"Enter docking sector: \")\ntool = input(\"Enter auxiliary tool: \")\norbit_log = astronaut + \" bypassed \" + sector + \" with a \" + tool + \"!\"\nprint(orbit_log)",
    solutionRegex: [/astronaut\s*=\s*input\s*\(\s*['"]Enter pilot name:\s*['"]\s*\)/, /sector\s*=\s*input\s*\(\s*['"]Enter docking sector:\s*['"]\s*\)/, /tool\s*=\s*input\s*\(\s*['"]Enter auxiliary tool:\s*['"]\s*\)/, /orbit_log\s*=\s*astronaut\s*\+\s*['"] bypassed ['"]\s*\+\s*sector\s*\+\s*['"] with a ['"]\s*\+\s*tool\s*\+\s*['"]!['"]/, /print\s*\(\s*orbit_log\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "NAV_OVERLOAD",
    missionPrefix: "TELEMETRY_GLITCH",
    intro: "# Astronaut Log: Deep Space Corruption\n\nA solar flare has disrupted orbital operations. Re-write the flight-deck stabilization tracker using five orbital telemetry inputs.",
    technical: "### Multiple Variable Alignment:\nEnsure spaces are placed inside string literals surrounding telemetry attributes to guarantee Mission Control can read the dynamic logs.",
    example: "incident = pilot + \" injected \" + key + \" into \" + chamber + \" at \" + alt + \". System is \" + state + \"!\"\nprint(incident)",
    task: "1. Ask the space program for pilot name with prompt: **\"Enter pilot name: \"** and store in `astronaut`.\n2. Ask for orbital key with prompt: **\"Enter orbital key: \"** and store in `orbital_key`.\n3. Ask for dock bay with prompt: **\"Enter dock bay: \"** and store in `dock_bay`.\n4. Ask for altitude zone with prompt: **\"Enter altitude zone: \"** and store in `altitude_zone`.\n5. Ask for propulsion status with prompt: **\"Enter thruster status: \"** and store in `prop_status`.\n6. Combine into a variable named `space_glitch` and print using the exact format: `astronaut + \" injected \" + orbital_key + \" into \" + dock_bay + \" at \" + altitude_zone + \". System is \" + prop_status + \"!\"`.",
    baseCode: "# TODO: Compile advanced deep space system error\n",
    solution: "astronaut = input(\"Enter pilot name: \")\norbital_key = input(\"Enter orbital key: \")\ndock_bay = input(\"Enter dock bay: \")\naltitude_zone = input(\"Enter altitude zone: \")\nprop_status = input(\"Enter thruster status: \")\nspace_glitch = astronaut + \" injected \" + orbital_key + \" into \" + dock_bay + \" at \" + altitude_zone + \". System is \" + prop_status + \"!\"\nprint(space_glitch)",
    solutionRegex: [/astronaut\s*=\s*input\s*\(\s*['"]Enter pilot name:\s*['"]\s*\)/, /orbital_key\s*=\s*input\s*\(\s*['"]Enter orbital key:\s*['"]\s*\)/, /dock_bay\s*=\s*input\s*\(\s*['"]Enter dock bay:\s*['"]\s*\)/, /altitude_zone\s*=\s*input\s*\(\s*['"]Enter altitude zone:\s*['"]\s*\)/, /prop_status\s*=\s*input\s*\(\s*['"]Enter thruster status:\s*['"]\s*\)/, /print\s*\(\s*space_glitch\s*\)/]
  },
  "print-formatting": {
    title: "Astro-Telemetry: F-Strings",
    headerPrefix: "TELEMETRY_SCAN",
    missionPrefix: "COSMIC_LOG",
    intro: "# Astro-Telemetry: F-Strings\n\nAvoid complicated calculations on telemetry feeds. Use Python f-strings to stitch astronaut mission control names and rocket clearance clearances together into one solid stream.",
    technical: "### Telemetry Merging:\n- **Prefix**: Prefix with `f` for dynamic rendering of strings.\n- **Placements**: Map raw variable memory locations with `{}` inside the f-string for instant rendering.",
    example: "pilot = \'Armstrong\'\nprint(f\'Vessel commander: {pilot}\') # Outputs: Vessel commander: Armstrong",
    task: "### YOUR MISSION\n\nYou have `alias = \'Commander\'` and `level = 5`. Use an **f-string** to print: `Astronaut: Commander | Orbit Phase: 5`.",
    baseCode: "alias = \'Commander\'\nlevel = 5\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Use {alias} and {level} inside the curly brackets."
    ],
    solution: "alias = \'Commander\'\nlevel = 5\nprint(f\'Astronaut: {alias} | Orbit Phase: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Astronaut:\s*\{alias\}\s*\|\s*Orbit\s*Phase:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Telemetry Synthesis: Advanced F-Strings",
    headerPrefix: "ORBITAL_SYN",
    missionPrefix: "PROBE_ROUTE",
    intro: "# Mission Control: Advanced F-Strings\n\nManage solar flares and colony probes dynamically. F-strings allow gravity calculators to solve telemetry curves and format landing coordinate uppercase regions in real time.",
    technical: "### Control Room Math:\n- **Inline Formulas**: Combine raw thrusters and vector booster outputs: `{boosters + engines}`.\n- **Capitalize Zones**: Auto-uppercase orbital landing coordinates for space telescopes: `{quadrant.upper()}`.",
    example: "p1, p2 = 4, 3\nprint(f'Satellites aligned: {p1 + p2}')",
    task: "### YOUR MISSION\n\n1. Prompt for probe count with: **\"Enter probe count: \"** and store it as an integer in `probes`.\n2. Prompt for destination colony with: **\"Enter target quadrant: \"** and store it in `quadrant`.\\n3. Use an **f-string** to print: `Deploying {probes} probes to {quadrant.upper()}...`.",
    baseCode: "# TODO: Dispatch probes\n",
    hints: [
      "Ask for probes using int(input(\"Enter probe count: \"))",
      "Ask for quadrant using input(\"Enter target quadrant: \")",
      "Return the variables via {probes} and {quadrant.upper()} inside the printed text."
    ],
    solution: "probes = int(input(\"Enter probe count: \"))\nquadrant = input(\"Enter target quadrant: \")\nprint(f\"Deploying {probes} probes to {quadrant.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{probes\}\s*probes\s*to\s*\{quadrant\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Colony Crew Logistics: Casting to Int",
    headerPrefix: "ORBIT_RECAST",
    missionPrefix: "CREW_TOTAL",
    intro: "# Mars Logistics: Quantizing Space Crew\\n\\nColony arrival logs register passengers as catalog descriptors. To balance oxygen recycling rates, you must cast incoming voyager counts to integers for our atmospheric systems.",
    technical: "### Astro-Engineering Casting:\\n- Convert incoming texts to physical digits: `crew = int(input(\\\"Astronauts: \\\"))`.",
    example: "pilots = int(input(\"Active pilots: \"))\nlifesupport_load = pilots + 4",
    task: "### YOUR MISSION\\n\\nSum orbital colonists:\\n1. Prompt for active crew with **\\\"Enter active astronauts: \\\"** and store it as an integer in `current_crew`.\\n2. Prompt for incoming tourists with **\\\"Enter space tourists arriving: \\\"** and store it as an integer in `incoming_tourists`.\\n3. Print the complete count of active colonists residing on the space station.",
    baseCode: "# TODO: Cast crew inputs and add them\\n",
    hints: [
      "Get astronauts: current_crew = int(input(\\\"Enter active astronauts: \\\"))",
      "Get tourists: incoming_tourists = int(input(\\\"Enter space tourists arriving: \\\"))",
      "Display the aggregate total using print()."
    ],
    solution: "current_crew = int(input(\\\"Enter active astronauts: \\\"))\\nincoming_tourists = int(input(\\\"Enter space tourists arriving: \\\"))\\nprint(current_crew + incoming_tourists)",
    solutionRegex: [/current_crew\s*=\s*int\s*\(\s*input/, /incoming_tourists\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Orbital Mechanics: Casting to Float",
    headerPrefix: "ASTRO_NAV",
    missionPrefix: "GRAVITY_SENS",
    intro: "# Warp Vectoring: High-Precision Navigation\\n\\nDeep-space telemetry is calculated using decimals of light-years and gravitational values. Recast telemetry variables to float structures to secure standard orbit correction burns.",
    technical: "### Space Navigation Float Diagnostics:\\n- **What is a Float?**: While integers track discrete counts (like `3` astronauts), a `float` represents fractional quantities (e.g., `12.8` light ears, or `0.02` thruster angle adjustment values) crucial for orbital maneuvers.\\n- **String Telemetry translation**: Standard spaceship sensor telemetry obtained via `input()` starts as a raw text string. You must cast it to decimal values using `float()`, e.g., `heading = float(input())`.\\n- **The Orbit Derail Error**: Casting a decimal coordinate like `\"12.8\"` using the whole integer function `int()` triggers an instant `ValueError` crash, disabling auto-tracking navigation systems entirely!",
    example: "fuel_tons = float(input(\"Fuel storage level: \"))\nrange_au = fuel_tons * 12.8",
    task: "### YOUR MISSION\\n\\nCalculate warp corridor vectors:\\n1. Prompt for spaceship velocity with **\\\"Enter spaceship velocity in mach: \\\"** and store it as a float in `velocity`.\\n2. Prompt for warp factor with **\\\"Atmospheric warp coefficient: \\\"** and store it as a float in `warp_factor`.\\n3. Calculate and print the combined product of spaceship velocity and atmospheric warp.",
    baseCode: "# TODO: Warp coordinate translation\\n",
    hints: [
      "Use velocity = float(input(\"Enter spaceship velocity in mach: \"))",
      "Use warp_factor = float(input(\"Atmospheric warp coefficient: \"))",
      "Output the multiple using print(velocity * warp_factor)."
    ],
    solution: "velocity = float(input(\"Enter spaceship velocity in mach: \"))\nwarp_factor = float(input(\"Atmospheric warp coefficient: \"))\nprint(velocity * warp_factor)",
    solutionRegex: [/velocity\s*=\s*float\s*\(\s*input/, /warp_factor\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Hatch Override: Indentation Blocks",
    headerPrefix: "ORBITAL_SYS",
    missionPrefix: "HATCH_OPEN",
    intro: "# Astro Command: Structural Calibration\\n\\nDocking with the orbital terminal is highly delicate. Python structural blocks must be indented perfectly back-to-back. One misplaced line of spacing will cause a core telemetry mismatch, dropping communication.",
    technical: "### Flight-Deck Spacing:\\n- Terminal blocks are initiated by the colon (`:`) key.\\n- Always indent internal blocks with 4 spaces so the spacecraft can read nested directions.",
    example: "if True:\\n    print(\\\"Airlock pressure safe\\\")  # Spaceship block",
    task: "### YOUR MISSION\\n\\nSynchronize the orbital hatch locks:\\n1. Write an `if True:` control conditional.\\n2. On the next line, indented by 4 spaces, print **\\\"Accessing...\\\"** to pull docking credentials.",
    baseCode: "# TODO: Program spaceship airlock blocks\\n",
    hints: [
      "End line 1 with if True:",
      "Indent line 2 by 4 spaces (or hit Tab)",
      "Insert print(\\\"Accessing...\\\") on the indented line"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Airlock Override: Stacking Ship Systems",
    headerPrefix: "ASTRO_CORE",
    missionPrefix: "AIRLOCK_DEP",
    intro: "# Station Override: Modular Spacing Grid\\n\\nUnlocking the auxiliary storage cells on the International Space Station requires layered system validation checks. If your micro-spacing drifts, telemetry fails and the airlock remains permanently vacuum-locked.",
    technical: "### Orbital Telemetry Stacking:\\n- The first level uses simple logical structures (4 spaces).\\n- The second level nests diagnostic commands directly inside using exactly **8 spaces** of structural indent.",
    example: "if True:\\n    print(\"Outer seal green\")\\n    if True:\\n        print(\"Inner ring verified\")",
    task: "### YOUR MISSION\\n\\nSecure crew access to the science module:\\n1. Construct the primary terminal shield gate with **`if True:`**.\\n2. Set up the secondary air-seal authorization under it with a nested **`if True:`** (indented by 4 spaces).\\n3. Deep inside the diagnostic sector (indented by exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Group deep airlock override sequences\\n",
    hints: [
      "Line 1: if True:",
      "Line 2: 4 spaces indent, then if True:",
      "Line 3: 8 spaces indent, then print(\"CORE ACCESS GRANTED\")"
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "FUEL_MGMT",
    missionPrefix: "LAUNCH_VERIFY",
    intro: "# Launch Protocol: If Statements\n\nMission control is performing the final countdown. Verify that fuel levels are optimal before igniting the primary engines for liftoff.",
    task: "If `fuel_ready` is `True`, print `\"ENGINES IGNITED\"`.",
    baseCode: "fuel_ready = True\n# TODO: Check fuel status\n",
    solution: "fuel_ready = True\nif fuel_ready:\n    print(\"ENGINES IGNITED\")",
    solutionRegex: [/if\s+fuel_ready/, /print\s*\(\s*['\"]ENGINES IGNITED['\"]\s*\)/]
  },
  "control-else": {
    title: "Command Telemetry: If/Else Failover",
    headerPrefix: "ASTRO_TELEMETRY",
    missionPrefix: "FAILSAFE_ROUTE",
    intro: "# Station Autopilot: Decisive Else Command\\n\\nYour capsule is approach-firing onto the station terminal. Under standard docking, if the key coordinates authenticate, lock the mechanical seals. If the match fails, immediately fire stabilization thrusters of the capsule to float back.",
    technical: "### Spacecraft Fallbacks:\\n- Placing an `else:` statement directs operations when your initial condition evaluates to `False`. Keep it in pristine vertical alignment with its original `if` statement block.",
    example: "if oxygen_ok:\\n    print(\\\"Internal pressure normal\\\")\\nelse:\\n    print(\\\"Emergency valves closed\\\")",
    task: "### YOUR MISSION\\n\\nValidate capsule airlock keys:\\n1. Code an `if/else` condition check around `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Command orbital docking airlocks\\n",
    hints: [
      "Implement the if condition: if key_valid: on line 1.",
      "Indent to print(\\\"ACCESS GRANTED\\\") on line 2.",
      "Place else: at the outer layer on line 3.",
      "Indent to print(\\\"ALARM TRIGGERED\\\") on line 4."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Hatch Calibration: Elif Levels",
    headerPrefix: "LAUNCH_PAD",
    missionPrefix: "TELEMETRY_ELIF",
    intro: "# SpaceX Flight Deck: Multi-Level Docking\\n\\nISS docking protocols require multi-phased authentication. Command codes must be verified sequentially to unlock secure laboratory pods, living spaces, or general cargo holds. Use `elif` to triage clearances perfectly.",
    technical: "### Orbital Safety Logic:\\n- Python matches only one branch in the stack. Check from the most strict condition (`clearance == 1`) down to the broadest fallback.",
    example: "if sensor == \"Oxygen\":\\n    print(\"Primary module green\")\\nelif sensor == \"Carbon\":\\n    print(\"Venting active\")\\nelse:\\n    print(\"Vacuum warning\")",
    task: "### YOUR MISSION\\n\\nCheck active commander capsule privileges:\\n1. Construct an `if/elif/else` flow around `clearance`.\\n2. If `clearance` is `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Else, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Validate ship cabin access clearance\\n",
    hints: [
      "Use if clearance == 1: to begin",
      "Integrate elif clearance <= 5: to authorize intermediate levels",
      "Conclude with else: to seal the cabin airlock"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Orbital Coverup: Decoy Transmitter",
    headerPrefix: "ORBITAL_OS",
    missionPrefix: "RADAR_MASK",
    intro: "# Deep Space Stealth: Alien Beacon Bypass\n\nYour lunar lander has entered a restricted alien orbit sector. If alien sentinel satellites detected your warp signature, trigger the decoy transmitter with a scrambled frequency to remain undetected. Else, broadcast a cruiser system stable signal.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"ACTIVATE_SHIELD_DECOY\")\nelse:\n    print(\"Cruising speed stable.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` telemetry stealth flow:\n1. If `is_detected`, print **`\"ACTIVATE_SHIELD_DECOY\"`** to scramble alien tracking sensors.\n2. Else, print **`\"Cruising speed stable.\"`** and deploy the landing shuttle.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"ACTIVATE_SHIELD_DECOY\".",
      "Add else: at the base level and print \"Cruising speed stable.\""
    ],
    solution: "if is_detected:\n    print(\"ACTIVATE_SHIELD_DECOY\")\nelse:\n    print(\"Cruising speed stable.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]ACTIVATE_SHIELD_DECOY['"]\s*\)/, /print\s*\(\s*['"]Cruising\s+speed\s+stable\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Warp Calibration: Thrust Rating",
    headerPrefix: "ENGINE_OS",
    missionPrefix: "SPEED_GRADE",
    intro: "# Ship Velocity: Engine Drive Mode\n\nCalibrate your ship's propulsion engine drive mode based on the current engine velocity. Spacecraft maintaining extremely high thrust outputs automatic activation of Hyperdrive.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to check the `thrust_velocity` level.\n- **Assignment**: Update the `drive_mode` variable in different logical blocks so the spaceship adjusts fuel consumption.",
    example: "if speed > 9000:\n    drive_mode = \"Hyperdrive\"\nelse:\n    drive_mode = \"Sublight\"",
    task: "### YOUR MISSION\n\nConfigure automatic engine warp modes:\n1. If engine `thrust_velocity > 9000`, assign `drive_mode` the value **`\"Hyperdrive\"`**.\n2. Else, assign `drive_mode` the value **`\"Sublight\"`**.\n3. Finally, output the engine setting with `print(drive_mode)`.",
    baseCode: "thrust_velocity = 9001\ndrive_mode = \"\"\n# TODO: Calibrate warp engines and print it\n",
    hints: [
      "Set your drive_mode inside the conditionals.",
      "Print drive_mode below your block with no indentation."
    ],
    solution: "thrust_velocity = 9001\nif thrust_velocity > 9000:\n    drive_mode = \"Hyperdrive\"\nelse:\n    drive_mode = \"Sublight\"\nprint(drive_mode)",
    solutionRegex: [/if\s+thrust_velocity\s*>\s*9000\s*:/, /drive_mode\s*=\s*['"]Hyperdrive['"]/, /drive_mode\s*=\s*['"]Sublight['"]/, /print\s*\(\s*drive_mode\s*\)/]
  },
  "control-adventure": {
    title: "Orbit Landing: Guidance Route",
    headerPrefix: "LANDER_CTRL",
    missionPrefix: "ROUTE_CORRECTION",
    intro: "# Artemis Colony Approach: Docking Bay Choice\n\nYour descent spacecraft is passing the ISS perimeter. Point your nose to target \"1\" (Primary Command Dock) or \"2\" (Secondary Solar Repair Dock). Select your harbor.",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Inbound to Command...\")",
    task: "### YOUR MISSION\n\nEvaluate and steer your spacecraft to the target dock:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"** to sync computers.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"** to hook to the solar grid.\n3. Else, print **\"Connection Lost.\"** and float in orbit.",
    baseCode: "choice = \"1\"\n# TODO: Guide the spaceship landing\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Nav-Computer: Sector Routing",
    headerPrefix: "GUIDANCE_CPU",
    missionPrefix: "ORBIT_DISPATCH",
    intro: "# Navigational Route: System Gateway\n\nThe mainframe must allocate fuel flow paths depending on active autopilot modes: \"warp\", \"cruise\", or \"orbit\". Handle trajectory paths carefully.",
    technical: "### Cascading Checks:\n- **Sequential**: Evaluates propulsion modes starting from hyper-thrusters.\n- **Exclusive**: Assigning warp fuel disables secondary engine routines.\n- **Exhaustive**: An `else` fires collision alarms for unmapped navigation paths.",
    example: "if maneuver == \"warp\":\n    print(\"Hyperdrive engage.\")\nelif maneuver == \"cruise\":\n    print(\"Plasma burn.\")",
    task: "### YOUR MISSION\n\nAssign maneuvers based on variable `maneuver`:\n1. If `maneuver` is **`\"warp\"`**, print **`\"Hyperdrive engage.\"`**\n2. Elif `maneuver` is **`\"cruise\"`**, print **`\"Plasma burn.\"`**\n3. Elif `maneuver` is **`\"orbit\"`**, print **`\"Gravity assist.\"`**\n4. Else, print **`\"Impact alert!\"`**",
    baseCode: "maneuver = \"cruise\"\n# TODO: Configure navigation logic\n",
    hints: [
      "Use if maneuver == \"warp\": with a colon.",
      "Apply sequential elif and else blocks."
    ],
    solution: "if maneuver == \"warp\":\n    print(\"Hyperdrive engage.\")\nelif maneuver == \"cruise\":\n    print(\"Plasma burn.\")\nelif maneuver == \"orbit\":\n    print(\"Gravity assist.\")\nelse:\n    print(\"Impact alert!\")",
    solutionRegex: [/if\s+maneuver\s*==\s*['"]warp['"]\s*:/, /elif\s+maneuver\s*==\s*['"]cruise['"]\s*:/, /elif\s+maneuver\s*==\s*['"]orbit['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Hyperdrive\s+engage\.['"]\s*\)/, /print\s*\(\s*['"]Plasma\s+burn\.['"]\s*\)/, /print\s*\(\s*['"]Gravity\s+assist\.['"]\s*\)/, /print\s*\(\s*['"]Impact\s+alert!['"]\s*\)/]
  },
  "control-loops": {
    title: "Telemetry Cycles: Sector Scans",
    headerPrefix: "NAV_COMPUTER",
    missionPrefix: "ORBIT_SCAN",
    intro: "# Orbital Probing: Autonomous sweeps\n\nDeep space is too vast for manually aiming high-gain sensors. Automate a telemetry sweep checking five sectors sequentially to detect background cosmic anomalies.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### range(5) Iteration:\n- **Automation**: Triggers the telemetry search exactly 5 times (sectors 0 to 4 inclusive).\n- **Structure**: Always follow loop colons with a 4 space indentation block.",
    example: "for i in range(3):\n    print(f\"Sector {i+1} scanned\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Sector {i+1} scanned\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write your orbital scan loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Sector {i+1} scanned"
    ],
    solution: "for i in range(5):\n    print(f\"Sector {i+1} scanned\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "Beacon Decode: Char Walker",
    headerPrefix: "TELEMETRY_REC",
    missionPrefix: "GRID_WALK",
    intro: "# Telemetry Signals: Character Reading\n\nDistant alien probes transmit information in tight character strings. Navigator computers must read satellite feeds sequentially to extract coordinate indices.",
    technical: "### String Reading:\n- **Streaming**: The loop pointer advances through the data stream character by character.\n- **Safe Landing**: Stop automatically when the scanner reaches the buffer's terminal byte.",
    example: "for char in \"WARP\":\n    print(char)",
    task: "### YOUR MISSION\n\nYou've received an enigmatic `beacon` broadcast: `\"WARP\"`. Use a `for` loop to iterate through every character `char` in the variable `beacon` and `print` it.",
    baseCode: "beacon = \"WARP\"\n# TODO: Scan beacon characters\n",
    hints: [
      "Create the loop with 'for char in beacon:'.",
      "Direct the output command inside the tabbed block."
    ],
    solution: "beacon = \"WARP\"\nfor char in beacon:\n    print(char)",
    solutionRegex: [/for\s+char\s+in\s+beacon/, /print\s*\(\s*char\s*\)/]
  },
  "loop-list-audit": {
    title: "Sector Audit: Signal Filter",
    headerPrefix: "DEEP_SCAN",
    missionPrefix: "SIGNAL_FILT",
    intro: "# Signal Survey: Anomalous Stars\n\nYour satellite array captures raw interstellar telemetry logs. Look through the transmission frequencies to isolate signals specifically ending with the deep-space pulse tag `\".sp\"`.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"nebula.sp\"`, then `\"system.cfg\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".sp\")` asks: *\"Does the text inside `f` end with `.sp`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".sp\"):\n          # This runs ONLY if the current file ends with .sp!\n  ```",
    example: "frequencies = [\"comms.wav\", \"pulsar.sp\"]\nfor f in frequencies:\n    if \".sp\" in f:\n        print(f)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".sp\"`, `print` the status message: `f\"Analysing cosmic: {f}\"`.",
    baseCode: "discovered_files = [\"nebula.sp\", \"system.cfg\", \"quasar.sp\", \"metrics.dat\"]\n# TODO: Scan deep space logs\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".sp\"):",
      "Print f'Analysing cosmic: {f}'"
    ],
    solution: "discovered_files = [\"nebula.sp\", \"system.cfg\", \"quasar.sp\", \"metrics.dat\"]\nfor f in discovered_files:\n    if f.endswith(\".sp\"):\n        print(f\"Analysing cosmic: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.sp['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Grid Scan: Deep Sector Matrix",
    headerPrefix: "ASTEROID_MAP",
    missionPrefix: "GRID_SECTOR",
    intro: "# Star Charts: Dual Navigational Scans\n\nTo scan a galaxy cluster, your orbital sensors sweep rows (X) and columns (Y) of a coordinate grid. This is accomplished using nested loops to cross every intersection.",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 deep sector grid scan with variable `x` (outer loop representing Rows) and variable `y` (inner loop representing Columns) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Row 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Col 0) -> Output: `Grid - Row: 0, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Grid - Row: 0, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Grid - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Row 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Col 0) -> Output: `Grid - Row: 1, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Grid - Row: 1, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Grid - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Row 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Col 0) -> Output: `Grid - Row: 2, Col: 0`\n     - `y = 1` (Col 1) -> Output: `Grid - Row: 2, Col: 1`\n     - `y = 2` (Col 2) -> Output: `Grid - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Row: {r}, Col: {c}\")",
    task: "### YOUR MISSION\n\nScan a **3x3 orbital grid**. Use nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the mapped status in this exact format: `f\"Grid - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Scan the 3x3 asteroid grid\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Grid - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Grid - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Warp Cycle: Navigation Interrupt",
    headerPrefix: "WARP_DRIVE",
    missionPrefix: "ABORT_SEQUENCE",
    intro: "# Astrodynamics: Manual Loop Override\n\nSometimes an unexpected gravitational anomaly forces an emergency safety stop during a warp entry sequence. Python provides an immediate escape via the `break` command.",
    technical: "### Thruster Interrupt:\n- **Skip Cycles**: Stop entire operations instantly when encountering critical hazards.\n- **Safety Limits**: Deploy an `if` condition to catch failures before finalizing computations.",
    example: "for s in range(10):\n    if s == 5:\n        break\n    print(s)",
    task: "### YOUR MISSION\n\nLoop through `range(10)` to initiate rocket fuel stages. If the engine heat stage index `i` reaches `7`, execute a manual `break` to avoid core meltdown. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Sequence launch engine with emergency abort\n",
    hints: [
      "Define loop with 'for i in range(10):'",
      "Formulate safety checks using 'if i == 7:'",
      "Deploy 'break' beneath the condition, then print number 'i'"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Deep Space: Probe Discharge",
    headerPrefix: "PROBE_SENS",
    missionPrefix: "BAT_DECAY",
    intro: "# Telemetry Cycles: While Loops\n\nWhile `for` loops iterate over a sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor auxiliary battery decay on a deep-space probe transmitting research packets.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power the transmitter.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "RECON_SCANNER",
    missionPrefix: "PING_REPORTS",
    intro: "# Space Exploration: Functions\n\nDon't ping satellite clusters manually one-by-one! Create a reusable telemetry function to ping any orbital sensor node automatically.",
    task: "Write a function `ping_satellite(satellite_id)` that prints `f'Pinging satellite {satellite_id}...'`. Call it.",
    baseCode: "# TODO: Define communications function\n",
    solution: "def ping_satellite(satellite_id):\n    print(f'Pinging satellite {satellite_id}...')\n\nping_satellite('A7')",
    solutionRegex: [/def\s+ping_satellite/, /ping_satellite\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "ORBIT_DESCENT",
    missionPrefix: "SURFACE_PROBE",
    intro: "# Atmospheric Entry: Recursion\n\nTo descend safely through the layers of Jupiter's atmosphere, your exploration probe must recursively analyse heatshield densities, layer by layer, until it hits the cloud deck.",
    task: "Write a recursive function `probe_descent(altitude)` that prints the altitude and calls itself with `altitude-1` until it reaches `0`.",
    baseCode: "# TODO: Execute recursive descent\n",
    solution: "def probe_descent(altitude):\n    print(altitude)\n    if altitude > 0:\n        probe_descent(altitude - 1)\n\nprobe_descent(5)",
    solutionRegex: [/def\s+probe_descent/, /probe_descent\s*\(\s*altitude\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "ORBIT_SHIPYARD",
    missionPrefix: "SAT_TEMPLATE",
    intro: "# Orbital Networks: Classes\n\nCommanders, we need a unified blueprint for launching and tracking our communications satellites. Instead of coding every newly launched satellite from scratch, let's define a reusable blueprint in Python called a **Class**.",
    task: "### YOUR MISSION\n\nDefine a base class named `Satellite`. Use `pass` inside its body under proper block indentation.",
    baseCode: "# TODO: Establish base class Satellite\n",
    hints: [
      "Use 'class Satellite:' followed by an indented 'pass'.",
      "Check your spelling and capitalization!"
    ],
    solution: "class Satellite:\n    pass",
    solutionRegex: [/class\s+Satellite/, /pass/]
  },
  "oop-init": {
    headerPrefix: "SAT_IGNITION",
    missionPrefix: "SAT_SPEC",
    intro: "# Deploying Satellites: Constructors\n\nEvery time a new orbital node enters orbit, Mission Control needs to catalog its name. We will use the constructor method `__init__` to assign designations automatically upon satellite initialization.",
    task: "### YOUR MISSION\n\nIn `Satellite`, define the constructor `__init__` which accepts `self` and a parameter `name`. Assign the value of `name` to `self.name`.",
    baseCode: "class Satellite:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Use 'def __init__(self, name):' as the constructor name.",
      "Assign it inside the body: self.name = name"
    ],
    solution: "class Satellite:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "SAT_TELEMETRY",
    missionPrefix: "PING_TEST",
    intro: "# Live Transmissions: Methods\n\nA silent satellite is just space junk. Let's write a method `ping` directly inside our class code so any active satellite object can receive ping signals and report back.",
    task: "### YOUR MISSION\n\nAdd a `ping` method to `Satellite` that `print`s \"Ping received\".",
    baseCode: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define ping method\n",
    hints: [
      "Write 'def ping(self):' and indent it inside the class cell.",
      "Print 'Ping received' inside the method body."
    ],
    solution: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n    def ping(self):\n        print(\"Ping received\")",
    solutionRegex: [/def\s+ping\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Ping received['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "SAT_GRID_STAT",
    missionPrefix: "CON_CHECK",
    intro: "# Power Regimes: Independent Object State\n\nWhen we deploy a constellation of communications satellites, booting up one satellite's solar charger shouldn't affect other satellites. Each satellite instance manages its own power and state grids independently.",
    task: "### YOUR MISSION\n\n1. Add a `system_status` variable in `__init__` defaulted to the string \"Standby\".\n2. Create a method `activate_systems` that updates `self.system_status` to \"Active\".",
    baseCode: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add system_status default\n    # TODO: Add activate_systems method\n",
    hints: [
      "Add 'self.system_status = \"Standby\"' inside __init__.",
      "In activate_systems, setup 'self.system_status = \"Active\"'."
    ],
    solution: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n        self.system_status = \"Standby\"\n    def activate_systems(self):\n        self.system_status = \"Active\"",
    solutionRegex: [/self\.system_status\s*=\s*['"]Standby['"]/, /def\s+activate_systems/, /self\.system_status\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "DEEP_SPACE_NET",
    missionPrefix: "LINK_UP",
    intro: "# Mesh Networks: Object Interaction\n\nIn orbital operations, satellites coordinate to route signals around planetary curves. To set up mesh relays, one satellite must receive and interface with another independent satellite object.",
    task: "### YOUR MISSION\n\nAdd a `connect_to` method to `Satellite` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Connecting to: {other.name}\"`.",
    baseCode: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add connect_to method\n",
    hints: [
      "The connect_to(self, other) signature accepts 'other' as its second parameter.",
      "Access other's name using other.name inside an f-string."
    ],
    solution: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n    def connect_to(self, other):\n        print(f\"Connecting to: {other.name}\")",
    solutionRegex: [/def\s+connect_to\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "CONSTELLATION_UP",
    missionPrefix: "SCIENCE_FORK",
    intro: "# Scientific Payload Extensions: Inheritance\n\nInheritance allows you to build specialized orbits on top of your existing communication foundations. Let's design a specialized subclass `ScienceSatellite` equipped with spectroscopic science payloads.",
    task: "### YOUR MISSION\n\nCreate a class `ScienceSatellite` that inherits from `Satellite`. Give it an `activate_sensors` method that `print`s \"Science sensors active\".",
    baseCode: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create ScienceSatellite subclass inheriting from Satellite\n",
    hints: [
      "Use 'class ScienceSatellite(Satellite):' to constructor inheritance.",
      "Define 'def activate_sensors(self):' and print the required text."
    ],
    solution: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n\nclass ScienceSatellite(Satellite):\n    def activate_sensors(self):\n        print(\"Science sensors active\")",
    solutionRegex: [/class\s+ScienceSatellite\s*\(\s*Satellite\s*\)\s*:/, /def\s+activate_sensors/, /print\s*\(\s*['"]Science sensors active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "CONSOLE_STATION",
    missionPrefix: "REPRESENT_STR",
    intro: "# Console Diagnostics: Custom __str__ representation\n\nWhen we print a satellite object, Python dumps a hexadecimal pointer. Let's override the special double-underscore method `__str__` to render a readable description on Earth monitors instead.",
    task: "### YOUR MISSION\n\nIn `Satellite`, add the custom method `__str__` that returns: `f\"Satellite {self.name}\"`.",
    baseCode: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define __str__(self) block inside Satellite class.",
      "Use 'return' instead of printing inside __str__."
    ],
    solution: "class Satellite:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Satellite {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Satellite.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "COMMAND_HQ",
    missionPrefix: "GLOBAL_OPERATOR",
    intro: "# Shared Spacecraft Registries: Class Variables\n\nEach satellite has separate designations and system statuses, but they all share the same network operator. We use Class Variables to share variables globally among all spacecraft objects without devoting memory overhead.",
    task: "### YOUR MISSION\n\n1. Define a class variable `operator` set to \"NASA\" inside `Satellite`.\n2. `print` the class variable using `Satellite.operator`.",
    baseCode: "class Satellite:\n    # TODO: Define class variable 'operator'\n    pass\n# TODO: Print Satellite.operator\n",
    hints: [
      "Add 'operator = \"NASA\"' immediately to Satellite class block.",
      "Call print(Satellite.operator) outside the class boundaries directly."
    ],
    solution: "class Satellite:\n    operator = \"NASA\"\n\nprint(Satellite.operator)",
    solutionRegex: [/operator\s*=\s*['"]NASA['"]/, /print\s*\(\s*Satellite\.operator\s*\)/]
  }
};