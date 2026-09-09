import fs from 'fs';
import path from 'path';

const THEME_UPDATES: Record<string, { intro: string; technical: string; example: string }> = {
  roblox: {
    intro: '# Immutable Vector Spawns: tuples\\n\\nSome coordinates or world metadata in your Roblox game must never change once initialized, such as the game\\\'s spawn anchor or building center. tuples provide a bulletproof way to store constant collections that cannot be modified by running scripts.',
    technical: '### Roblox Vector tuples:\\n- Defined using round parentheses `()` instead of square brackets `[]`.\\n- tuples are immutable, meaning any attempt to modify or overwrite their contents at runtime will throw an immediate script error.',
    example: 'SPAWN_LOCATION = ("Obby Spawn", 2006)\\nprint(SPAWN_LOCATION[0])  # Access elements just like a list'
  },
  simpsons: {
    intro: '# Tamper-Proof Stock Records: tuples\\n\\nApu wants to make sure certain core Kwik-E-Mart registry values—like store location coordinates or established opening years—are completely immutable and cannot be altered by mistake (or by Homer!). tuples are perfect for fixed records that resist accidental modification.',
    technical: '### Immutable Kwik-E-Mart Records:\\n- Defined using round parentheses `()` rather than square brackets `[]`.\\n- Once created, a tuple\\\'s elements can never be replaced or updated, keeping your store ledger completely secure from edits.',
    example: 'APU_RECORDS = ("Kwik-E-Mart Register Line", 1989)\\nprint(APU_RECORDS[0])  # Access elements just like a list'
  },
  dc: {
    intro: '# Secret Batcave Locations: tuples\\n\\nBatman relies on absolute data integrity. Vital geographical coordinates—like the entrance to the Batcave or the security vaults under Wayne Enterprises—must stay permanently unchangeable. tuples store these crucial, locked-down locations that cannot be modified by any hacker.',
    technical: '### Batcomputer Coordinate Protocol:\\n- Created using round parentheses `()` instead of square brackets `[]`.\\n- Attempts to modify or append to an established tuple will cause an immediate execution halt (`TypeError`), securing the records.',
    example: 'BATCAVE_LOCATION = ("Gotham Sub-Levels", 1939)\\nprint(BATCAVE_LOCATION[0])  # Access coordinates securely'
  },
  fantasy: {
    intro: '# Eternal Portal Ley-Lines: tuples\\n\\nIn magical realm geography, certain ancient teleportation portals or ley-line coordinates are woven into the very fabric of reality and must never be altered. tuples hold these immutable magical collections that cannot be changed by any potion or spell.',
    technical: '### Unalterable Portal Runes:\\n- Inscribed using round parentheses `()` rather than the mutable square brackets `[]`.\\n- Any sorcery or code attempting to modify their elements will trigger an immediate backfire (`TypeError`).',
    example: 'PORTAL_COORDINATES = ("Elf Mountains", 9909)\\nprint(PORTAL_COORDINATES[0])  # Extract portal name'
  },
  football: {
    intro: '# Fixed Stadium Coordinates: tuples\\n\\nWhen map coordinates for fan zones or club foundations (like our historic Camp Nou home sector) are defined on the tactical board, they should be permanently unchangeable to prevent administrative errors. tuples provide locked-down collections that preserve our layout.',
    technical: '### Immutable Stadium Coordinates:\\n- Written with round parentheses `()` rather than square brackets `[]`.\\n- Once created, their size and element order are locked, protecting them from unexpected updates during operations.',
    example: 'STADIUM_SECTOR = ("Camp Nou North", 1899)\\nprint(STADIUM_SECTOR[0])  # Safe coordinate lookup'
  },
  gaming: {
    intro: '# Immutable Realm Anchors: tuples\\n\\nIn RPG world-generation, core settings like player respawn locations or official server configurations must remain absolutely static. tuples provide secure, immutable data slots that prevent accidental overwrites from game loops.',
    technical: '### Protected Realm tuples:\\n- Formatted using round parentheses `()` instead of standard square brackets `[]`.\\n- Perfect for static configurations; any attempt to rewrite a value will cause a runtime crash.',
    example: 'SERVER_REALM = ("Elysium Fields", 7777)\\nprint(SERVER_REALM[0])  # Safely fetch realm parameters'
  },
  marvel: {
    intro: '# Shielding the Mystic Sanctums: tuples\\n\\nDoctor Strange must keep the coordinates of Earth\\\'s defense Sanctums locked down. To prevent magical tampering or dark sorcerers shifting their places, we must secure them using tuples—unalterable structures that prevent any edits.',
    technical: '### Mystic Sanctum Anchors:\\n- Crafted with round parentheses `()` rather than ordinary lists `[]`.\\n- Once the dimensional coordinates are locked into a tuple, any cosmic attempt to modify them fails instantly with a `TypeError`.',
    example: 'SANCTUM_COORDINATES = ("New York Sanctum", 177)\\nprint(SANCTUM_COORDINATES[0])  # Access mystic anchors'
  },
  music: {
    intro: '# Fixed Studio Hardware Presets: tuples\\n\\nIn our multi-track recording console, certain hardware rack paths and historic patch bays (like the Abbey Road B1 configuration) are hardwired and must never change during a session. tuples are perfect for representing these permanent patching chains.',
    technical: '### Fixed Hardware Chains:\\n- Represented with round parentheses `()` instead of square brackets `[]`.\\n- Attempts to overwrite hardware patches in a tuple will trigger an immediate error, keeping your physical presets safe.',
    example: 'STUDIO_RACK = ("Abbey Road B1", 1969)\\nprint(STUDIO_RACK[0])  # Safe patch lookup'
  },
  space: {
    intro: '# Lunar Navigation Telemetry: tuples\\n\\nWhen planning Apollo mission descents, coordinates of critical landing zones, such as the Sea of Tranquility, must remain perfectly constant. tuples allow flight computers to lock down telemetry fields so they cannot be corrupted mid-orbit.',
    technical: '### Permanent Telemetry Logs:\\n- Syntactically written with round parentheses `()` rather than square brackets `[]`.\\n- Any rogue calculation trying to overwrite a tuple coordinate triggers an immediate system halt, protecting the spacecraft.',
    example: 'LUNAR_BASE = ("Sea of Tranquility", 1969)\\nprint(LUNAR_BASE[0])  # Read permanent coordinates'
  },
  starwars: {
    intro: '# Locking Starfighter Coordinates: tuples\\n\\nBefore launching into hyperspace, target coordinates for key Rebel bases—like the base core on Yavin IV—must be loaded securely. tuples let the navigation computer store these values as immutable arrays, safe from Imperial tracking interference.',
    technical: '### Locked Navcomputer Vectors:\\n- Encoded using round parentheses `()` rather than square brackets `[]`.\\n- If any droid or subroutine attempts to overwrite the targets, the system triggers a secure lock, preventing navigation drift.',
    example: 'YAVIN_COORDINATES = ("Rebel Base Core", 327)\\nprint(YAVIN_COORDINATES[0])  # Read nav coordinates'
  },
  cyberpunk: {
    intro: '# Encrypted Grid Coordinates: tuples\\n\\nWhen connecting to the secure subnet grid, certain coordinates—like your hidden safehouse in Megabuilding H10—must remain absolutely immutable. tuples provide a tamper-proof memory structure that blocks netrunner subversion.',
    technical: '### Hardened Tuple Slots:\\n- Declared using round parentheses `()` instead of standard square brackets `[]`.\\n- Attempts to modify active items in a tuple from the console shell will force a security dump (`TypeError`).',
    example: 'CYBER_COORDINATES = ("Megabuilding H10", 1047)\\nprint(CYBER_COORDINATES[0])  # Read Grid Target'
  }
};

function applyUpdates() {
  const dir = './src/themes';
  if (!fs.existsSync(dir)) return;
  
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.ts') && file !== 'index.ts') {
      const themeKey = file.replace('.ts', '');
      const update = THEME_UPDATES[themeKey];
      if (!update) {
        console.log(`No update defined for ${themeKey}`);
        return;
      }
      
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      const key = 'intro-tuples';
      const startIndex = content.indexOf(`"${key}":`);
      if (startIndex === -1) {
        console.log(`Could not find "${key}" inside ${file}`);
        return;
      }
      
      let bracketCount = 0;
      let inString = false;
      let stringChar = '';
      let blockContent = '';
      let endIndex = -1;
      
      for (let i = startIndex; i < content.length; i++) {
        const char = content[i];
        blockContent += char;
        
        if ((char === '"' || char === "'" || char === "`") && content[i-1] !== '\\') {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (stringChar === char) {
            inString = false;
          }
        }
        
        if (!inString) {
          if (char === '{') bracketCount++;
          if (char === '}') {
            bracketCount--;
            if (bracketCount === 0) {
              endIndex = i;
              break;
            }
          }
        }
      }
      
      if (endIndex === -1) {
        console.log(`Could not find closing bracket for "${key}" inside ${file}`);
        return;
      }
      
      let updatedBlock = blockContent;
      
      // Replace intro, technical, example
      updatedBlock = updatedBlock.replace(
        /intro:\s*(["'`])[\s\S]*?\1/g,
        `intro: "${update.intro}"`
      );
      
      updatedBlock = updatedBlock.replace(
        /technical:\s*(["'`])[\s\S]*?\1/g,
        `technical: "${update.technical}"`
      );
      
      updatedBlock = updatedBlock.replace(
        /example:\s*(["'`])[\s\S]*?\1/g,
        `example: "${update.example}"`
      );
      
      const beforeBlock = content.substring(0, startIndex);
      const afterBlock = content.substring(endIndex + 1);
      
      content = beforeBlock + updatedBlock + afterBlock;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully updated "intro-tuples" inside ${file}!`);
    }
  });
}

applyUpdates();
