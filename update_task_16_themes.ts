import fs from 'fs';
import path from 'path';

const themesDir = './src/themes';
const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const themedData: Record<string, any> = {
  'cyberpunk.ts': {
    headerPrefix: "CYBERWARE_SCAN",
    missionPrefix: "YOUR TASK",
    intro: "# Indexing Chrome: Zero-Based Access\\n\\nYour tactical HUD needs to fetch specific cyberware implants from your neural index. Pinpoint the first and main active installations to run self-diagnostics.",
    technical: "### Index Map:\\n\\n\`\`\`text\\nimplants = [\\\"Sandevistan\\\", \\\"Kiroshi Optics\\\", \\\"Mantis Blades\\\"]\\n#          [0]             [1]              [2]\\n\`\`\`",
    example: "print(implants[0])  # Outputs: Sandevistan\\n\\nsecond = implants[1]\\nprint(second)  # Outputs: Kiroshi Optics",
    task: "1. Retrieve the first implant (index 0) from the \`implants\` list and store inside \`p1\`.\\n2. Retrieve the third implant (index 2) and store inside \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "implants = [\\\"Sandevistan\\\", \\\"Kiroshi Optics\\\", \\\"Mantis Blades\\\"]\\n# TODO: Extract indices 0 and 2\\n",
    solution: "p1 = implants[0]\\np3 = implants[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*implants\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*implants\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'gaming.ts': {
    headerPrefix: "BAG_QUERY",
    missionPrefix: "YOUR TASK",
    intro: "# Quick Select: Inventory Indices\\n\\nIn the heat of combat, you don't rifle through your entire bag! Map hotkeys to specific slots in your inventory list for prompt weapon retrieval.",
    technical: "### Inventory Slots:\\n\\n\`\`\`text\\ninventory = [\\\"Master Sword\\\", \\\"Health Potion\\\", \\\"Hylian Shield\\\"]\\n#            [0]               [1]               [2]\\n\`\`\`",
    example: "weapon = inventory[0]\\nprint(weapon)  # Outputs: Master Sword",
    task: "1. Retrieve the first weapon (index 0) from the \`inventory\` list and store in \`p1\`.\\n2. Retrieve the shield item (index 2) and store in \`p3\`.\\n3. Print both \`p1\` and \`p3\`.",
    baseCode: "inventory = [\\\"Master Sword\\\", \\\"Health Potion\\\", \\\"Hylian Shield\\\"]\\n# TODO: Retrieve first and third inventory items\\n",
    solution: "p1 = inventory[0]\\np3 = inventory[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*inventory\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*inventory\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'space.ts': {
    headerPrefix: "MANIFEST_ACCESS",
    missionPrefix: "YOUR TASK",
    intro: "# Quick Release: Gear Indexing\\n\\nThe airlock cargo bay holds crucial equipment. Pinpoint specific life-support canisters using precise positional indices.",
    technical: "### Cargo Map:\\n\\n\`\`\`text\\ngear = [\\\"Oxygen Tank\\\", \\\"Solar Panel\\\", \\\"Drill\\\"]\\n#       [0]             [1]             [2]\\n\`\`\`",
    example: "main_gear = gear[0]\\nprint(main_gear)  # Outputs: Oxygen Tank",
    task: "1. Extract the first cargo item (index 0) from the \`gear\` list and store in \`p1\`.\\n2. Extract the third cargo item (index 2) and store in \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "gear = [\\\"Oxygen Tank\\\", \\\"Solar Panel\\\", \\\"Drill\\\"]\\n# TODO: Extract indices 0 and 2 from cargo\\n",
    solution: "p1 = gear[0]\\np3 = gear[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*gear\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*gear\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'marvel.ts': {
    headerPrefix: "SQUAD_STRIKE",
    missionPrefix: "YOUR TASK",
    intro: "# Strike Coordination: Roster Indices\\n\\nThanos is attacking Wakanda! Deploy your heavy-hitters directly. Pull the first and third heroes from your active battle-roster.",
    technical: "### Tactical Positions:\\n\\n\`\`\`text\\nheroes = [\\\"Iron Man\\\", \\\"Captain America\\\", \\\"Thor\\\"]\\n#        [0]           [1]                 [2]\\n\`\`\`",
    example: "print(heroes[0])  # Outputs: Iron Man",
    task: "1. Assign the first hero (index 0) in \`heroes\` to \`p1\`.\\n2. Assign the third hero (index 2) in \`heroes\` to \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "heroes = [\\\"Iron Man\\\", \\\"Captain America\\\", \\\"Thor\\\"]\\n# TODO: Deploy heroes from positions 0 and 2\\n",
    solution: "p1 = heroes[0]\\np3 = heroes[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*heroes\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*heroes\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'roblox.ts': {
    headerPrefix: "WORKSPACE_QUERY",
    missionPrefix: "YOUR TASK",
    intro: "# Object Selection: Part Indices\\n\\nYour Lua script in Roblox Studio must verify properties of spawned parts. Isolate the initial spawning point and the hazardous obstacle by their indices.",
    technical: "### Workspace Layout:\\n\\n\`\`\`text\\nparts = [\\\"SpawnPoint\\\", \\\"CheckPoint\\\", \\\"LavaBrick\\\"]\\n#       [0]            [1]             [2]\\n\`\`\`",
    example: "start_part = parts[0]\\nprint(start_part)  # Outputs: SpawnPoint",
    task: "1. Retrieve the first part (index 0) in the \`parts\` list and store in \`p1\`.\\n2. Retrieve the third part (index 2) in the \`parts\` list and store in \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "parts = [\\\"SpawnPoint\\\", \\\"CheckPoint\\\", \\\"LavaBrick\\\"]\\n# TODO: Extract spawn and hazard plates\\n",
    solution: "p1 = parts[0]\\np3 = parts[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*parts\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*parts\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'starwars.ts': {
    headerPrefix: "FORMATION_SCAN",
    missionPrefix: "YOUR TASK",
    intro: "# Wing Commander: Pilot Indexing\\n\\nThe Death Star is in range! Red Leader needs to isolate the lead trench pilots directly from the squadron formation array.",
    technical: "### Starfighter Positions:\\n\\n\`\`\`text\\nsquadron = [\\\"Luke\\\", \\\"Wedge\\\", \\\"Biggs\\\"]\\n#          [0]      [1]        [2]\\n\`\`\`",
    example: "lead_pilot = squadron[0]\\nprint(lead_pilot)  # Outputs: Luke",
    task: "1. Select the pilot at index 0 from \`squadron\` and store them in \`p1\`.\\n2. Select the wingman at index 2 and store them in \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "squadron = [\\\"Luke\\\", \\\"Wedge\\\", \\\"Biggs\\\"]\\n# TODO: Launch pilots from slots 0 and 2\\n",
    solution: "p1 = squadron[0]\\np3 = squadron[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*squadron\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*squadron\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'football.ts': {
    headerPrefix: "LINEUP_CALL",
    missionPrefix: "YOUR TASK",
    intro: "# Key Strike: Striker Indices\\n\\nTo dominate the pitch in the Champions League final, retrieve your first-choice talisman striker and your versatile third-rotation winger.",
    technical: "### Squad Placements:\\n\\n\`\`\`text\\nsquad = [\\\"Messi\\\", \\\"Ronaldo\\\", \\\"Neymar\\\"]\\n#       [0]       [1]         [2]\\n\`\`\`",
    example: "main_striker = squad[0]\\nprint(main_striker)  # Outputs: Messi",
    task: "1. Pull the talisman player (index 0) from the \`squad\` list into \`p1\`.\\n2. Pull the final winger (index 2) from \`squad\` into \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "squad = [\\\"Messi\\\", \\\"Ronaldo\\\", \\\"Neymar\\\"]\\n# TODO: Field squad indices 0 and 2\\n",
    solution: "p1 = squad[0]\\np3 = squad[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*squad\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*squad\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'music.ts': {
    headerPrefix: "MIXER_ROUTING",
    missionPrefix: "YOUR TASK",
    intro: "# Stem Extraction: Track Indices\\n\\nYour master DAW mixer needs to route specific audio channels. Grouping and filtering tracks correctly starts with precise channel selection.",
    technical: "### Mixer Channel Board:\\n\\n\`\`\`text\\ntracks = [\\\"Lead Vocals\\\", \\\"Backing Vocals\\\", \\\"Melody Synth\\\"]\\n#        [0]             [1]                [2]\\n\`\`\`",
    example: "focus_track = tracks[0]\\nprint(focus_track)  # Outputs: Lead Vocals",
    task: "1. Read the lead channel (index 0) from \`tracks\` and store in \`p1\`.\\n2. Read the synth track (index 2) from \`tracks\` and store in \`p3\`.\\n3. Print both \`p1\` and \`p3\`.",
    baseCode: "tracks = [\\\"Lead Vocals\\\", \\\"Backing Vocals\\\", \\\"Melody Synth\\\"]\\n# TODO: Extract channels 0 and 2 for routing\\n",
    solution: "p1 = tracks[0]\\np3 = tracks[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*tracks\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*tracks\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'simpsons.ts': {
    headerPrefix: "AISLE_LOOKUP",
    missionPrefix: "YOUR TASK",
    intro: "# Cashier Retrieval: Box Indexing\\n\\nHomer is demanding his treats at Apu's counter! Grab the Squishee cup and Donuts directly using register box positions.",
    technical: "### Shelf Coordinate Maps:\\n\\n\`\`\`text\\nsnacks = [\\\"Donuts\\\", \\\"Duff Beer\\\", \\\"Squishee\\\"]\\n#        [0]         [1]           [2]\\n\`\`\`",
    example: "homer_fav = snacks[0]\\nprint(homer_fav)  # Outputs: Donuts",
    task: "1. Grab the snack at index 0 from \`snacks\` and store in \`p1\`.\\n2. Grab the sugary slushie at index 2 and store in \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "snacks = [\\\"Donuts\\\", \\\"Duff Beer\\\", \\\"Squishee\\\"]\\n# TODO: Retrieve Homer's items at coordinates 0 and 2\\n",
    solution: "p1 = snacks[0]\\np3 = snacks[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*snacks\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*snacks\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'fantasy.ts': {
    headerPrefix: "GRIMOIRE_SELECT",
    missionPrefix: "YOUR TASK",
    intro: "# Spell Cast: Scroll Indices\\n\\nIn the dungeon's shadows, you need speed! Retrieve the first elemental summon and the third traversal spell instantly from your spellbook.",
    technical: "### Magic Inventory Scroll:\\n\\n\`\`\`text\\nspells = [\\\"Fireball\\\", \\\"Heal\\\", \\\"Teleport\\\"]\\n#         [0]          [1]        [2]\\n\`\`\`",
    example: "quick_cast = spells[0]\\nprint(quick_cast)  # Outputs: Fireball",
    task: "1. Load the spell at index 0 from \`spells\` and store inside \`p1\`.\\n2. Load the utility spell at index 2 and store inside \`p3\`.\\n3. Print both \`p1\` and \`p3\`.",
    baseCode: "spells = [\\\"Fireball\\\", \\\"Heal\\\", \\\"Teleport\\\"]\\n# TODO: Extract spell grimoire indices 0 and 2\\n",
    solution: "p1 = spells[0]\\np3 = spells[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*spells\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*spells\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  },
  'dc.ts': {
    headerPrefix: "WATCHTOWER_RADAR",
    missionPrefix: "YOUR TASK",
    intro: "# Dispatch Coordinate: Hero Indices\\n\\nThe Oracle sensor nodes indicate crises. Pull Batman and Flash from your Watchtower coordination database to deploy them to active locations.",
    technical: "### Justice League Array:\\n\\n\`\`\`text\\njustice_league = [\\\"Batman\\\", \\\"Superman\\\", \\\"Flash\\\"]\\n#                 [0]          [1]           [2]\\n\`\`\`",
    example: "leader = justice_league[0]\\nprint(leader)  # Outputs: Batman",
    task: "1. Pinpoint the first member (index 0) in \`justice_league\` and store in \`p1\`.\\n2. Pinpoint the third member (index 2) in \`justice_league\` and store in \`p3\`.\\n3. Print \`p1\` and \`p3\`.",
    baseCode: "justice_league = [\\\"Batman\\\", \\\"Superman\\\", \\\"Flash\\\"]\\n# TODO: Dispatch members 0 and 2\\n",
    solution: "p1 = justice_league[0]\\np3 = justice_league[2]\\nprint(p1)\\nprint(p3)",
    solutionRegex: "[/p1\\\\s*=\\\\s*justice_league\\\\s*\\\\[\\\\s*0\\\\s*\\\\]/, /p3\\\\s*=\\\\s*justice_league\\\\s*\\\\[\\\\s*2\\\\s*\\\\]/]"
  }
};

for (const file of files) {
  const data = themedData[file];
  if (!data) continue;

  const filePath = path.join(themesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Programmatically handle existing target task deletion if any
  const targetId = "list-indexing";
  const targetString = `"${targetId}": {`;
  const existingIndex = content.indexOf(targetString);
  if (existingIndex !== -1) {
    let braceCount = 0;
    let existingEnd = -1;
    for (let i = existingIndex + targetString.length; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') {
        if (braceCount === 0) {
          let end = i + 1;
          while (end < content.length && (content[end] === ',' || content[end] === '\n' || content[end] === ' ' || content[end] === '\r')) {
            end++;
          }
          existingEnd = end;
          break;
        }
        braceCount--;
      }
    }
    if (existingEnd !== -1) {
      content = content.substring(0, existingIndex) + content.substring(existingEnd);
    }
  }

  // Find "intro-lists" end bound
  const entryStartString = '"intro-lists": {';
  const entryStart = content.indexOf(entryStartString);
  if (entryStart === -1) {
    console.log(`Skipped ${file} (intro-lists not found)`);
    continue;
  }

  let braceCount = 0;
  let entryEnd = -1;
  for (let i = entryStart + entryStartString.length; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      if (braceCount === 0) {
        entryEnd = i + 1;
        break;
      }
      braceCount--;
    }
  }

  if (entryEnd === -1) {
    console.error(`Error parsing ${file}`);
    continue;
  }

  const newBlock = `,\n  "${targetId}": {
    headerPrefix: "${data.headerPrefix}",
    missionPrefix: "${data.missionPrefix}",
    intro: "${data.intro}",
    technical: "${data.technical}",
    example: "${data.example}",
    task: "${data.task}",
    baseCode: "${data.baseCode}",
    solution: "${data.solution}",
    solutionRegex: ${data.solutionRegex}
  }`;

  content = content.substring(0, entryEnd) + newBlock + content.substring(entryEnd);

  fs.writeFileSync(filePath, content);
  console.log(`Successfully context-themed task 16 in ${file}`);
}
