import fs from 'fs';
import path from 'path';

const themesDir = './src/themes';
const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const themeConfigs: Record<string, {
  noun: string,          // singular themed item (e.g. implant, weapon, hero, spell)
  listVar: string,       // variable name representing the active list (e.g. active_implants, inventory, heroes)
  initialList: string[], // items in the list
  appendVal: string,     // item to append
  popListVar: string,    // list variable for pop
  popList: string[],     // items for pop list
  popDest: string,       // variable to pop into (e.g. purged_implant, discarded)
  tupleVar: string,      // coordinate tuple variable
  tupleStr: string,      // tuple string value
  tupleNum: number       // tuple number value
  listTupleListVar: string // mutable list variable for tuple immutability task
  listTupleListItem: string // original item for list immutability task
  listTupleListUpdated: string // updated item for list immutability task
  tupleImmutName: string    // tuple variable for tuple immutability task
  tupleImmutVal1: number    // tuple val 1
  tupleImmutVal2: number    // tuple val 2
  sliceListVar: string      // slice list variable
  sliceList: string[]       // elements for slice
  sliceDest: string         // slice target variable
  filterListVar: string     // filter source variable
  filterVal: string         // filter list element variable (e.g. t, m, w)
  filterDest: string        // filter result variable
  rangeListVar: string      // range list variable
  rangeVal: string          // range loop element variable
  rangeDest: string         // range result variable
  headerSuffix1: string     // suffix for list-append
  headerSuffix2: string     // suffix for list-pop
  headerSuffix3: string     // suffix for intro-tuples
  headerSuffix4: string     // suffix for intro-tuples-immutability
  headerSuffix5: string     // suffix for list-slicing
  headerSuffix6: string     // suffix for list-filtering
  headerSuffix7: string     // suffix for list-comprehension-range
}> = {
  'cyberpunk.ts': {
    noun: "cyberware implant",
    listVar: "active_implants",
    initialList: ["Sandevistan", "Kiroshi Optics", "Mantis Blades"],
    appendVal: "Gorilla Arms",
    popListVar: "compromised_cyberware",
    popList: ["Subdermal Armor", "Tyrosine Injector", "Neural Link"],
    popDest: "purged_implant",
    tupleVar: "cyber_coordinates",
    tupleStr: "Megabuilding H10",
    tupleNum: 1047,
    listTupleListVar: "implant_upgrades",
    listTupleListItem: "Heal-on-kill",
    listTupleListUpdated: "Heal-on-kill_v2",
    tupleImmutName: "firmware_version",
    tupleImmutVal1: 2,
    tupleImmutVal2: 0,
    sliceListVar: "cyberdeck_buffer",
    sliceList: ["ping", "overheat", "short_circuit", "synapse_burn", "system_reset", "cyberware_malfunction"],
    sliceDest: "quickhacks",
    filterListVar: "thermals",
    filterVal: "t",
    filterDest: "dangerous_temps",
    rangeListVar: "subgrid_coordinates",
    rangeVal: "c",
    rangeDest: "even_coordinates",
    headerSuffix1: "CHROME_UPGRADE",
    headerSuffix2: "CHROME_PURGE",
    headerSuffix3: "SECURE_COORDS",
    headerSuffix4: "CORE_INTEGRITY",
    headerSuffix5: "DECK_SLICE",
    headerSuffix6: "THERMAL_SCAN",
    headerSuffix7: "GRID_FILTER"
  },
  'gaming.ts': {
    noun: "weapon tool",
    listVar: "inventory",
    initialList: ["Master Sword", "Health Potion", "Hylian Shield"],
    appendVal: "Hookshot",
    popListVar: "redundant_loot",
    popList: ["Broken Sword", "Rusty Key", "Empty Bottle"],
    popDest: "discarded",
    tupleVar: "server_realm",
    tupleStr: "Elysium Fields",
    tupleNum: 7777,
    listTupleListVar: "loot_chest",
    listTupleListItem: "Bronze Sword",
    listTupleListUpdated: "Excalibur",
    tupleImmutName: "player_stats",
    tupleImmutVal1: 99,
    tupleImmutVal2: 1,
    sliceListVar: "action_bar",
    sliceList: ["slash", "dodge", "fireball", "heal", "parry", "teleport"],
    sliceDest: "combat_keys",
    filterListVar: "mana_levels",
    filterVal: "m",
    filterDest: "high_mana",
    rangeListVar: "quest_id_numbers",
    rangeVal: "q",
    rangeDest: "valid_quest_nodes",
    headerSuffix1: "LOOT_BAG_UPGRADE",
    headerSuffix2: "INVENTORY_CLEANUP",
    headerSuffix3: "REALM_PORT",
    headerSuffix4: "STAT_VAULT",
    headerSuffix5: "ACTION_BAR_SLICE",
    headerSuffix6: "MANA_FILTER",
    headerSuffix7: "QUEST_INDEX"
  },
  'dc.ts': {
    noun: "hero operative",
    listVar: "justice_league",
    initialList: ["Batman", "Superman", "Flash"],
    appendVal: "Wonder Woman",
    popListVar: "rogues_gallery",
    popList: ["Joker", "Riddler", "Penguin"],
    popDest: "captured_villain",
    tupleVar: "batcave_location",
    tupleStr: "Gotham Sub-Levels",
    tupleNum: 1939,
    listTupleListVar: "bat_arsenal",
    listTupleListItem: "Batarang",
    listTupleListUpdated: "Grapple_Gun",
    tupleImmutName: "utility_belt_config",
    tupleImmutVal1: 5,
    tupleImmutVal2: 0,
    sliceListVar: "arkham_manifest",
    sliceList: ["Freeze", "Bane", "Ivy", "Harley", "Clayface", "Scarecrow"],
    sliceDest: "high_risk_ward",
    filterListVar: "threat_levels",
    filterVal: "t",
    filterDest: "red_alerts",
    rangeListVar: "gotham_beacons",
    rangeVal: "b",
    rangeDest: "active_zones",
    headerSuffix1: "JLA_ROSTER_ADD",
    headerSuffix2: "ARKHAM_BOOKING",
    headerSuffix3: "COORDINATE_VAULT",
    headerSuffix4: "BELT_CONFIGURATION",
    headerSuffix5: "CELL_BLOCK_SLICE",
    headerSuffix6: "THREAT_ELEVATION",
    headerSuffix7: "RADAR_BEACONS"
  },
  'fantasy.ts': {
    noun: "magic spell",
    listVar: "spells",
    initialList: ["Fireball", "Heal", "Teleport"],
    appendVal: "Invisibility",
    popListVar: "active_potions",
    popList: ["Mana Potion", "Health Elixir", "Stamina Tonic"],
    popDest: "consumed_potion",
    tupleVar: "portal_coordinates",
    tupleStr: "Elf Mountains",
    tupleNum: 9909,
    listTupleListVar: "spell_grades",
    listTupleListItem: "Apprentice",
    listTupleListUpdated: "Archmage",
    tupleImmutName: "grimoire_id",
    tupleImmutVal1: 7,
    tupleImmutVal2: 0,
    sliceListVar: "runes_sequence",
    sliceList: ["fire", "frost", "shadow", "lightning", "earth", "wind"],
    sliceDest: "combat_sigils",
    filterListVar: "crystal_charges",
    filterVal: "c",
    filterDest: "charged_gems",
    rangeListVar: "monolith_frequencies",
    rangeVal: "f",
    rangeDest: "resonating_wells",
    headerSuffix1: "SPELL_LEARN",
    headerSuffix2: "POTION_CONSUME",
    headerSuffix3: "PORTAL_LOC",
    headerSuffix4: "GRIMOIRE_LOCK",
    headerSuffix5: "RUNE_ENGRAVING",
    headerSuffix6: "CRYSTAL_CHARGE",
    headerSuffix7: "MONOLITH_SYNC"
  },
  'football.ts': {
    noun: "squad player",
    listVar: "squad",
    initialList: ["Messi", "Ronaldo", "Neymar"],
    appendVal: "Mbappe",
    popListVar: "substitutes_bench",
    popList: ["Salah", "Haaland", "Kane"],
    popDest: "subbed_player",
    tupleVar: "stadium_sector",
    tupleStr: "Camp Nou North",
    tupleNum: 1899,
    listTupleListVar: "training_drills",
    listTupleListItem: "Rondo",
    listTupleListUpdated: "Scrimmage",
    tupleImmutName: "match_strategy",
    tupleImmutVal1: 4,
    tupleImmutVal2: 3,
    sliceListVar: "starting_eleven",
    sliceList: ["Goalkeeper", "Defender1", "Defender2", "Midfielder1", "Midfielder2", "Striker"],
    sliceDest: "core_midfield",
    filterListVar: "fitness_scores",
    filterVal: "s",
    filterDest: "match_ready",
    rangeListVar: "squad_jersey_numbers",
    rangeVal: "n",
    rangeDest: "even_jerseys",
    headerSuffix1: "TRANSFER_WINDOW",
    headerSuffix2: "SUB_BOARD",
    headerSuffix3: "STADIUM_MAP",
    headerSuffix4: "STRATEGY_VAL",
    headerSuffix5: "TACTICAL_SLICE",
    headerSuffix6: "FITNESS_METRICS",
    headerSuffix7: "JERSEY_INDEX"
  },
  'marvel.ts': {
    noun: "avenger hero",
    listVar: "heroes",
    initialList: ["Iron Man", "Captain America", "Thor"],
    appendVal: "Hulk",
    popListVar: "raft_prisoners",
    popList: ["Loki", "Ultron", "Thanos"],
    popDest: "escaped_villain",
    tupleVar: "sanctum_coordinates",
    tupleStr: "New York Sanctum",
    tupleNum: 177,
    listTupleListVar: "avengers_assets",
    listTupleListItem: "Quinjet",
    listTupleListUpdated: "Helicarrier",
    tupleImmutName: "infinity_gauntlet_specs",
    tupleImmutVal1: 6,
    tupleImmutVal2: 0,
    sliceListVar: "shield_dossier",
    sliceList: ["Widow", "Hawkeye", "Fury", "Hill", "Coulson", "Carter"],
    sliceDest: "strike_team",
    filterListVar: "stark_power_nodes",
    filterVal: "p",
    filterDest: "overcharged_nodes",
    rangeListVar: "wakanda_beacons",
    rangeVal: "b",
    rangeDest: "even_beacons",
    headerSuffix1: "HERO_RECRUIT",
    headerSuffix2: "RAFT_PURGE",
    headerSuffix3: "SANCTUM_MAP",
    headerSuffix4: "GAUNTLET_SPECS",
    headerSuffix5: "DOSSIER_SLICE",
    headerSuffix6: "ARC_POWER_SCAN",
    headerSuffix7: "BEACON_SWEEP"
  },
  'music.ts': {
    noun: "audio track channel",
    listVar: "tracks",
    initialList: ["Lead Vocals", "Backing Vocals", "Melody Synth"],
    appendVal: "Heavy Bass",
    popListVar: "stem_cache",
    popList: ["Reverb Trail", "Click Track", "Reference Vocal"],
    popDest: "deleted_stem",
    tupleVar: "studio_rack",
    tupleStr: "Abbey Road B1",
    tupleNum: 1969,
    listTupleListVar: "mixer_stems",
    listTupleListItem: "Snare",
    listTupleListUpdated: "Gated Snare",
    tupleImmutName: "daw_buffer_version",
    tupleImmutVal1: 12,
    tupleImmutVal2: 4,
    sliceListVar: "mix_bus_stems",
    sliceList: ["kick", "snare", "hi_hat", "perc", "overhead", "room"],
    sliceDest: "drum_subset",
    filterListVar: "db_meters",
    filterVal: "d",
    filterDest: "peaking_vocals",
    rangeListVar: "midi_notes",
    rangeVal: "m",
    rangeDest: "even_midi_notes",
    headerSuffix1: "CHANNEL_INJECT",
    headerSuffix2: "STEM_CONSOLIDATION",
    headerSuffix3: "STUDIO_COORD",
    headerSuffix4: "BUFFER_INTEGRITY",
    headerSuffix5: "BUS_FADER_CONTROL",
    headerSuffix6: "PEAK_DETECT",
    headerSuffix7: "MIDI_QUANTIZATION"
  },
  'roblox.ts': {
    noun: "workspace brick part",
    listVar: "parts",
    initialList: ["SpawnPoint", "CheckPoint", "LavaBrick"],
    appendVal: "SpeedPad",
    popListVar: "redundant_assets",
    popList: ["TempBlock", "OldPart", "UnanchoredStud"],
    popDest: "destroyed",
    tupleVar: "vector_spawn",
    tupleStr: "Roblox High",
    tupleNum: 2006,
    listTupleListVar: "studio_palette",
    listTupleListItem: "Bricks",
    listTupleListUpdated: "Trusses",
    tupleImmutName: "engine_version",
    tupleImmutVal1: 4,
    tupleImmutVal2: 1,
    sliceListVar: "workspace_hierarchy",
    sliceList: ["Terrain", "Lighting", "Scripts", "SoundService", "Chat", "Players"],
    sliceDest: "core_services",
    filterListVar: "part_sizes",
    filterVal: "s",
    filterDest: "giant_parts",
    rangeListVar: "obby_beacons",
    rangeVal: "b",
    rangeDest: "active_teleports",
    headerSuffix1: "INSTANTIATE_PART",
    headerSuffix2: "DESTROY_PART",
    headerSuffix3: "VECTOR_ANCHOR",
    headerSuffix4: "ENGINE_LOCK",
    headerSuffix5: "SERVICE_SLICE",
    headerSuffix6: "SCALE_FILTER",
    headerSuffix7: "TELEPORT_SWEEP"
  },
  'simpsons.ts': {
    noun: "convenience food snack",
    listVar: "snacks",
    initialList: ["Donuts", "Duff Beer", "Squishee"],
    appendVal: "Krusty Burger",
    popListVar: "expired_shelf",
    popList: ["Moldy Hotdog", "Sour Milk", "Rotten Cabbage"],
    popDest: "dumpster_bound",
    tupleVar: "apu_records",
    tupleStr: "Kwik-E-Mart Register Line",
    tupleNum: 1989,
    listTupleListVar: "simpsons_couch",
    listTupleListItem: "Homer",
    listTupleListUpdated: "Grandpa",
    tupleImmutName: "couch_dimensions",
    tupleImmutVal1: 3,
    tupleImmutVal2: 0,
    sliceListVar: "springfield_residents",
    sliceList: ["Homer", "Marge", "Bart", "Lisa", "Maggie", "Ned"],
    sliceDest: "simpson_kids",
    filterListVar: "radiation_levels",
    filterVal: "r",
    filterDest: "nuclear_meltdowns",
    rangeListVar: "homer_calories",
    rangeVal: "c",
    rangeDest: "even_donuts",
    headerSuffix1: "REPLENISH_SHELF",
    headerSuffix2: "APU_REJECT",
    headerSuffix3: "LEDGER_LOCK",
    headerSuffix4: "COUCH_SIZE_LOCK",
    headerSuffix5: "FAMILY_LINEUP_SLICE",
    headerSuffix6: "SECTOR_7G_ALARM",
    headerSuffix7: "DONUT_COUNTER"
  },
  'space.ts': {
    noun: "space equipment gear",
    listVar: "gear",
    initialList: ["Oxygen Tank", "Solar Panel", "Drill"],
    appendVal: "Rover",
    popListVar: "damaged_canisters",
    popList: ["Empty H2O", "Ripped Tube", "Depleted Cell"],
    popDest: "jettisoned",
    tupleVar: "lunar_base",
    tupleStr: "Sea of Tranquility",
    tupleNum: 1969,
    listTupleListVar: "shuttle_crew",
    listTupleListItem: "Candidate A",
    listTupleListUpdated: "Commander",
    tupleImmutName: "telemetry_port",
    tupleImmutVal1: 5,
    tupleImmutVal2: 1,
    sliceListVar: "space_station_orbit",
    sliceList: ["Launch", "Atmosphere", "LowOrbit", "HighOrbit", "LunarTransit", "DeepSpace"],
    sliceDest: "cruising_phases",
    filterListVar: "solar_winds",
    filterVal: "w",
    filterDest: "ion_storms",
    rangeListVar: "anomaly_frequencies",
    rangeVal: "f",
    rangeDest: "even_frequencies",
    headerSuffix1: "CARGO_STOWAGE",
    headerSuffix2: "AIRLOCK_PURGE",
    headerSuffix3: "TELEMETRY_LOCK",
    headerSuffix4: "PORT_VERIFICATION",
    headerSuffix5: "MISSION_STAGING_SLICE",
    headerSuffix6: "RADIATION_WARN",
    headerSuffix7: "ANOMALY_SWEEP"
  },
  'starwars.ts': {
    noun: "rebel fighter squadron pilot",
    listVar: "squadron",
    initialList: ["Luke", "Wedge", "Biggs"],
    appendVal: "Han",
    popListVar: "trash_chute_items",
    popList: ["Scrap Metal", "Soggy Cushion", "Dianoga Monster"],
    popDest: "ejected_debris",
    tupleVar: "yavin_coordinates",
    tupleStr: "Rebel Base Core",
    tupleNum: 327,
    listTupleListVar: "jedi_holocrons",
    listTupleListItem: "Padawan Log",
    listTupleListUpdated: "Master Legacy",
    tupleImmutName: "hyperdrive_ratio",
    tupleImmutVal1: 0,
    tupleImmutVal2: 5,
    sliceListVar: "force_academy_ranks",
    sliceList: ["Initiate", "Padawan", "Knight", "Master", "Grandmaster", "Ghost"],
    sliceDest: "middle_ranks",
    filterListVar: "midichlorians",
    filterVal: "m",
    filterDest: "force_sensitives",
    rangeListVar: "rebel_beacons",
    rangeVal: "b",
    rangeDest: "active_hypergates",
    headerSuffix1: "WING_SYNC",
    headerSuffix2: "CHUTE_FLUSH",
    headerSuffix3: "NAV_COMPUTER_COORDS",
    headerSuffix4: "HYPER_CALIBRATION",
    headerSuffix5: "FORCE_ORDER_SLICE",
    headerSuffix6: "SENSITIVE_SWEEP",
    headerSuffix7: "HYPERGATE_TALLY"
  }
};

for (const file of files) {
  const config = themeConfigs[file];
  if (!config) {
    console.log(`No config found for ${file}, passing...`);
    continue;
  }

  const filePath = path.join(themesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We are going to wipe any existing entries from list-append to list-comprehension-range inside this file to prevent duplicates.
  const taskIdsToDelete = [
    "list-append",
    "list-pop",
    "intro-tuples",
    "intro-tuples-immutability",
    "list-slicing",
    "list-filtering",
    "list-comprehension-range"
  ];

  for (const tid of taskIdsToDelete) {
    const tString = `"${tid}": {`;
    const idx = content.indexOf(tString);
    if (idx !== -1) {
      let braceCount = 0;
      let endIdx = -1;
      for (let i = idx + tString.length; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') {
          if (braceCount === 0) {
            let end = i + 1;
            while (end < content.length && (content[end] === ',' || content[end] === '\n' || content[end] === ' ' || content[end] === '\r')) {
              end++;
            }
            endIdx = end;
            break;
          }
          braceCount--;
        }
      }
      if (endIdx !== -1) {
        content = content.substring(0, idx) + content.substring(endIdx);
      }
    }
  }

  // Now, find list-indexing block end bound
  const indexingStartString = '"list-indexing": {';
  const indexingStartIdx = content.indexOf(indexingStartString);
  if (indexingStartIdx === -1) {
    console.warn(`WARNING: "list-indexing" not found in ${file}! Skipping.`);
    continue;
  }

  let braceCount = 0;
  let indexingEndIdx = -1;
  for (let i = indexingStartIdx + indexingStartString.length; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      if (braceCount === 0) {
        indexingEndIdx = i + 1;
        break;
      }
      braceCount--;
    }
  }

  if (indexingEndIdx === -1) {
    console.error(`ERROR: Failed to parse boundary for list-indexing in ${file}!`);
    continue;
  }

  // Construct the new list block entries programmatically with delicious lore!
  const listAppendBlock = `  "list-append": {
    headerPrefix: "${config.headerSuffix1}",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\\n\\nExcellent progress. Now, your tactical records indicate a newly detected, high-value ${config.noun} is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\\n- The \`.append()\` method mutates lists directly in memory.\\n- It adds elements to index \`-1\` (the very end of your active stack).",
    example: "${config.listVar} = ${JSON.stringify(config.initialList).replace(/"/g, '\\"')}\\n${config.listVar}.append(\\"${config.appendVal}\\")\\n# ${config.listVar} is now updated!",
    task: "1. Append \\"${config.appendVal}\\" to the \`${config.listVar}\` list.\\n2. Print the final \`${config.listVar}\` list to confirm installation.",
    baseCode: "${config.listVar} = ${JSON.stringify(config.initialList).replace(/"/g, '\\"')}\\n# TODO: Append value and print\\n",
    solution: "${config.listVar}.append(\\"${config.appendVal}\\")\\nprint(${config.listVar})",
    solutionRegex: [/${config.listVar}\\.\\s*append\\s*\\(\\s*['"]${config.appendVal}['"]\\s*\\)/, /print\\s*\\(\\s*${config.listVar}\\s*\\)/]
  }`;

  const listPopBlock = `  "list-pop": {
    headerPrefix: "${config.headerSuffix2}",
    missionPrefix: "YOUR TASK",
    intro: "# Cache Purging: .pop()\\n\\nThe central servers are monitoring your memory signatures! Target your obsolete index logs and use .pop() to release the redundant entries before you trigger a terminal security lockout.",
    technical: "### Pop Purge Parameters:\\n- Calling \`.pop()\` without arguments extracts and returns the **last** item from a list.\\n- It directly modifies the original list sequence.",
    example: "popped_item = ${config.popListVar}.pop()\\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the \`${config.popListVar}\` list and store it inside a variable named \`${config.popDest}\`.\\n2. Print \`${config.popDest}\` to output the purged token.",
    baseCode: "${config.popListVar} = ${JSON.stringify(config.popList).replace(/"/g, '\\"')}\\n# TODO: Pop last element and print\\n",
    solution: "${config.popDest} = ${config.popListVar}.pop()\\nprint(${config.popDest})",
    solutionRegex: [/${config.popDest}\\s*=\\s*${config.popListVar}\\.\\s*pop\\s*\\(\\s*\\)/, /print\\s*\\(\\s*${config.popDest}\\s*\\)/]
  }`;

  const introTuplesBlock = `  "intro-tuples": {
    headerPrefix: "${config.headerSuffix3}",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\\n\\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Immutable tuples:\\n- Syntactically defined with round parentheses \`()\` rather than square brackets \`[]\`.\\n- Attempts to modify structural values in a tuple will result in immediate execution halts (\`TypeError\`).",
    example: "VAULT = (\\"Master\\", 101)\\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named \`${config.tupleVar}\` containing \\"${config.tupleStr}\\" and the number \`${config.tupleNum}\`.\\n2. Print the \`${config.tupleVar}\` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\\n",
    solution: "${config.tupleVar} = (\\"${config.tupleStr}\\", ${config.tupleNum})\\nprint(${config.tupleVar})",
    solutionRegex: [/${config.tupleVar}\\s*=\\s*\\(\\s*['"]${config.tupleStr}['"]\\s*,\\s*${config.tupleNum}\\s*\\)/, /print\\s*\\(\\s*${config.tupleVar}\\s*\\)/]
  }`;

  const introTuplesImmutabilityBlock = `  "intro-tuples-immutability": {
    headerPrefix: "${config.headerSuffix4}",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\\n\\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\\n- Lists are fully dynamic, meaning you can update indices in-place (\`items[0] = new_value\`).\\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\\"v1\\"]\\nmy_list[0] = \\"v2\\"  # Legal!\\n\\nmy_tuple = (1, 2)\\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named \`${config.listTupleListVar}\` containing the single string \\"${config.listTupleListItem}\\"\\n2. Create a tuple named \`${config.tupleImmutName}\` containing the numbers \`${config.tupleImmutVal1}\` and \`${config.tupleImmutVal2}\`.\\n3. Rewrite \`${config.listTupleListVar}[0]\` to be \\"${config.listTupleListUpdated}\\"\\n4. Print both \`${config.listTupleListVar}\` and \`${config.tupleImmutName}\`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\\n",
    solution: "${config.listTupleListVar} = [\\"${config.listTupleListItem}\\" ]\\n${config.tupleImmutName} = (${config.tupleImmutVal1}, ${config.tupleImmutVal2})\\n${config.listTupleListVar}[0] = \\"${config.listTupleListUpdated}\\"\\nprint(${config.listTupleListVar})\\nprint(${config.tupleImmutName})",
    solutionRegex: [/${config.listTupleListVar}\\s*\\[\\s*0\\s*\\]\\s*=\\s*['"]${config.listTupleListUpdated}['"]/, /${config.tupleImmutName}\\s*=\\s*\\(\\s*${config.tupleImmutVal1}\\s*,\\s*${config.tupleImmutVal2}\\s*\\)/]
  }`;

  const listSlicingBlock = `  "list-slicing": {
    headerPrefix: "${config.headerSuffix5}",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\\n\\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\\n- Defined using start and end indices with colons: \`list[start:end]\`.\\n- The start index is fully \`inclusive\`, while the end coordinate boundary is strictly \`exclusive\`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index \`1\` to index \`4\` (exclusive) from the \`${config.sliceListVar}\` list.\\n2. Store this result in a new variable named \`${config.sliceDest}\`.\\n3. Print the resulting slice \`${config.sliceDest}\`.",
    baseCode: "${config.sliceListVar} = ${JSON.stringify(config.sliceList).replace(/"/g, '\\"')}\\n# TODO: Slice indices 1:4 and print\\n",
    solution: "${config.sliceDest} = ${config.sliceListVar}[1:4]\\nprint(${config.sliceDest})",
    solutionRegex: [/${config.sliceDest}\\s*=\\s*${config.sliceListVar}\\s*\\[\\s*1\\s*:\\s*4\\s*\\]/, /print\\s*\\(\\s*${config.sliceDest}\\s*\\)/]
  }`;

  const listFilteringBlock = `  "list-filtering": {
    headerPrefix: "${config.headerSuffix6}",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\\n\\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\\n- Comprehensions allow single-line loops: \`[x for x in list if condition]\`.\\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from \`${config.filterListVar}\`.\\n2. Store the result in a variable named \`${config.filterDest}\`.\\n3. Print \`${config.filterDest}\`.",
    baseCode: "${config.filterListVar} = [12, 55, 34, 89, 21, 67]\\n# TODO: Comprehend and filter values > 50\\n",
    solution: "${config.filterDest} = [${config.filterVal} for ${config.filterVal} in ${config.filterListVar} if ${config.filterVal} > 50]\\nprint(${config.filterDest})",
    solutionRegex: [/${config.filterDest}\\s*=\\s*\\[\\s*${config.filterVal}\\s+for\\s+${config.filterVal}\\s+in\\s+${config.filterListVar}\\s+if\\s+${config.filterVal}\\s*>\\s*50\\s*\\]/, /print\\s*\\(\\s*${config.filterDest}\\s*\\)/]
  }`;

  const listComprehensionRangeBlock = `  "list-comprehension-range": {
    headerPrefix: "${config.headerSuffix7}",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\\n\\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\\n- Check if indices are divisble: \`x % 2 == 0\` catches all even integers.\\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the \`${config.rangeListVar}\` list using a list comprehension.\\n2. Store this filtered list in a new variable named \`${config.rangeDest}\`.\\n3. Print \`${config.rangeDest}\`.",
    baseCode: "${config.rangeListVar} = [101, 102, 103, 104, 105, 106, 107, 108]\\n# TODO: Comprehend and filter even indices\\n",
    solution: "${config.rangeDest} = [${config.rangeVal} for ${config.rangeVal} in ${config.rangeListVar} if ${config.rangeVal} % 2 == 0]\\nprint(${config.rangeDest})",
    solutionRegex: [/${config.rangeDest}\\s*=\\s*\\[\\s*${config.rangeVal}\\s+for\\s+${config.rangeVal}\\s+in\\s+${config.rangeListVar}\\s+if\\s+${config.rangeVal}\\s*%\\s*2\\s*==\\s*0\\s*\\]/, /print\\s*\\(\\s*${config.rangeDest}\\s*\\)/]
  }`;

  const fullPayload = `,\n${listAppendBlock},\n${listPopBlock},\n${introTuplesBlock},\n${introTuplesImmutabilityBlock},\n${listSlicingBlock},\n${listFilteringBlock},\n${listComprehensionRangeBlock}`;

  // Insert fullPayload right after list-indexing block end (indexingEndIdx)
  content = content.substring(0, indexingEndIdx) + fullPayload + content.substring(indexingEndIdx);

  fs.writeFileSync(filePath, content);
  console.log(`Successfully context-themed remaining 7 list tasks in ${file}`);
}
