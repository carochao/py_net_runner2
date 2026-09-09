import { MARVEL_THEME } from './marvel';
import { FOOTBALL_THEME } from './football';
import { SPACE_THEME } from './space';
import { STARWARS_THEME } from './starwars';
import { CYBERPUNK_THEME } from './cyberpunk';
import { ROBLOX_THEME } from './roblox';
import { SIMPSONS_THEME } from './simpsons';
import { GAMING_THEME } from './gaming';
import { MUSIC_THEME } from './music';
import { FANTASY_THEME } from './fantasy';
import { DC_THEME } from './dc';

export const STATIC_THEMES: any = {
  marvel: MARVEL_THEME,
  football: FOOTBALL_THEME,
  space: SPACE_THEME,
  starwars: STARWARS_THEME,
  cyberpunk: CYBERPUNK_THEME,
  roblox: ROBLOX_THEME,
  simpsons: SIMPSONS_THEME,
  gaming: GAMING_THEME,
  music: MUSIC_THEME,
  fantasy: FANTASY_THEME,
  dc: DC_THEME
};

export const STATIC_THEME_ALIASES: any = {
  "avengers": "marvel",
  "stark": "marvel",
  "soccer": "football",
  "premier": "football",
  "nasa": "space",
  "galaxy": "space",
  "jedi": "starwars",
  "force": "starwars",
  "samurai": "cyberpunk",
  "neon": "cyberpunk",
  "obby": "roblox",
  "springfield": "simpsons",
  "homer": "simpsons",
  "gamer": "gaming",
  "rpg": "gaming",
  "beat": "music",
  "studio": "music",
  "wizard": "fantasy",
  "magic": "fantasy",
  "batman": "dc",
  "justice": "dc"
};
