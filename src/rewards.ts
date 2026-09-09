import cyberTerminalHaven from './assets/images/cyber_terminal_haven_1780580084826.png';
import codeMatrixGoddess from './assets/images/code_matrix_goddess_1780580101597.png';
import retroHackerBase from './assets/images/retro_hacker_base_1780580118899.png';
import mrResendeFunko from './assets/images/Mr Resende.png';
import mrWardFunko from './assets/images/Mr_Ward_Funko.png';
import mrSingerFunko from './assets/images/Mr_Singer_Funko.png';
import retroVersionImage from './assets/images/sixteen_bit_retro_1780652712392.png';
import sixteenBitVersionImage from './assets/images/16_bit.png';
import pythonRewardImage from './assets/images/python.png';
import heroRewardImage from './assets/images/hero.png';
import summerTaskImage from './assets/images/summer.png';

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'theme' | 'banner' | 'wallpaper' | 'soundpack';
  value: string;
  colors?: {
    bg: string;
    panel: string;
    accent: string;
  };
}

export const REWARDS: RewardItem[] = [
  // THEMES
  {
    id: "theme-default",
    name: "[CLASSIC] Cyan Protocol",
    description: "The standard issue CyberCoder interface. Reliable, balanced, and sharp.",
    cost: 0,
    type: "theme",
    value: "cyan"
  },
  {
    id: "theme-pink",
    name: "[VIVID] Neural Magenta",
    description: "Ultra-saturated digital magenta. Maximum immersion for high-intensity coding sessions.",
    cost: 100,
    type: "theme",
    value: "pink"
  },
  {
    id: "theme-green",
    name: "[MATRIX] Ghost Shell",
    description: "The definitive emerald matrix experience. High-contrast green for code purity.",
    cost: 150,
    type: "theme",
    value: "green"
  },
  {
    id: "theme-amber",
    name: "[CAUTION] Level 5 Warning",
    description: "Intense industrial amber environment. Brilliantly bright for critical debugging tasks.",
    cost: 250,
    type: "theme",
    value: "amber"
  },
  {
    id: "theme-marvel",
    name: "[HERO] Stark Interface",
    description: "A UI designed for the Avengers. JARVIS-inspired patterns and heroic red/gold accents.",
    cost: 400,
    type: "theme",
    value: "marvel"
  },
  {
    id: "theme-cyberpunk",
    name: "[HACK] Night City Link",
    description: "High tech, low life. Neon yellow and deep purple glitch aesthetics.",
    cost: 400,
    type: "theme",
    value: "cyberpunk"
  },
  {
    id: "theme-space",
    name: "[VOID] Galactic Command",
    description: "Starship terminal interface. Deep blue and pulsar white.",
    cost: 400,
    type: "theme",
    value: "space"
  },
  {
    id: "theme-football",
    name: "[SPORT] VAR Terminal",
    description: "Pitch-side logic. Grass green and stadium floodlight white.",
    cost: 400,
    type: "theme",
    value: "football"
  },
  {
    id: "theme-roblox",
    name: "[BLOCK] Blox Protocol",
    description: "Experimental block-based UI. Playful but powerful.",
    cost: 400,
    type: "theme",
    value: "roblox"
  },
  {
    id: "theme-fantasy",
    name: "[MYSTIC] Arcane Mirror",
    description: "Ancient runes and magical parchment textures.",
    cost: 400,
    type: "theme",
    value: "fantasy"
  },
  {
    id: "theme-gaming",
    name: "[GAMER] RGB Console",
    description: "Ultra-high refresh rate aesthetics with RGB accents.",
    cost: 600,
    type: "theme",
    value: "gaming"
  },
  {
    id: "theme-simpsons",
    name: "[CARTOON] Springfield Link",
    description: "A UI that smells like donuts and Duff beer.",
    cost: 600,
    type: "theme",
    value: "simpsons"
  },
  {
    id: "theme-star-wars",
    name: "[FORCE] Jedi Terminal",
    description: "Ancient protocol droid interfaces and high-tech galactic command.",
    cost: 600,
    type: "theme",
    value: "starwars"
  },
  {
    id: "theme-music",
    name: "[BEAT] Sampler Deck",
    description: "A UI designed for the ultimate beat maker.",
    cost: 600,
    type: "theme",
    value: "music"
  },
  {
    id: "theme-dc",
    name: "[BAT] WayneTech OS",
    description: "Tactical, stealthy, and loaded with justice.",
    cost: 600,
    type: "theme",
    value: "dc"
  },
  // BANNERS (Renamed to Ambiances in description for clarity)
  {
    id: "banner-default",
    name: "Neural Void",
    description: "Pitch black environment with optimized focus. Pure minimalist coding.",
    cost: 0,
    type: "banner",
    value: "void",
    // Using keywords instead of URLs to allow CSS handling
    colors: {
      bg: "#020408",
      panel: "rgba(5, 8, 12, 0.95)",
      accent: "rgba(6, 182, 212, 0.1)"
    }
  },
  {
    id: "banner-circuit",
    name: "Silicon Core",
    description: "Technical atmosphere with integrated emerald circuits and data-flow particles.",
    cost: 50,
    type: "banner",
    value: "circuit",
    colors: {
      bg: "#03140d",
      panel: "rgba(4, 25, 18, 0.95)",
      accent: "rgba(16, 185, 129, 0.15)"
    }
  },
  {
    id: "banner-city",
    name: "Tokyo Nightline",
    description: "Distant neon haze from the 99th floor. Deep violets and urban glow.",
    cost: 100,
    type: "banner",
    value: "city",
    colors: {
      bg: "#0d041a",
      panel: "rgba(20, 5, 40, 0.95)",
      accent: "rgba(168, 85, 247, 0.2)"
    }
  },
  {
    id: "banner-glitch",
    name: "Digital Distortion",
    description: "Chaotic system-level overrides. High-intensity data corruption color palette.",
    cost: 300,
    type: "banner",
    value: "glitch",
    colors: {
      bg: "#1a0404",
      panel: "rgba(40, 5, 5, 0.95)",
      accent: "rgba(239, 68, 68, 0.2)"
    }
  },
  // WALLPAPERS
  {
    id: "wallpaper-cyber-terminal",
    name: "[ART] Terminal Haven",
    description: "Futuristic wide-view hacker den with vibrant synthwave neon screens.",
    cost: 200,
    type: "wallpaper",
    value: cyberTerminalHaven
  },
  {
    id: "wallpaper-matrix-goddess",
    name: "[ART] Core Matrix Goddess",
    description: "Mesmerizing glowing neural entity weaving streams of green code threads.",
    cost: 350,
    type: "wallpaper",
    value: codeMatrixGoddess
  },
  {
    id: "wallpaper-retro-hacker",
    name: "[ART] 90s Phosphor Station",
    description: "Nostalgic cozy basement with classic green phosphor CRT glow.",
    cost: 500,
    type: "wallpaper",
    value: retroHackerBase
  },
  {
    id: "wallpaper-mr-resende-funko",
    name: "[ART] MR Resende Funko Pop",
    description: "Special Edition Computer Science Teacher custom collectible vinyl figure.",
    cost: 150,
    type: "wallpaper",
    value: mrResendeFunko
  },
  {
    id: "wallpaper-mr-ward-funko",
    name: "[ART] MR Ward Funko Pop",
    description: "Special Edition Science & Tech custom collectible vinyl figure.",
    cost: 150,
    type: "wallpaper",
    value: mrWardFunko
  },
  {
    id: "wallpaper-mr-singer-funko",
    name: "[ART] MR Singer Funko Pop",
    description: "Special Edition Logic Specialist custom collectible vinyl figure.",
    cost: 150,
    type: "wallpaper",
    value: mrSingerFunko
  },
  {
    id: "wallpaper-retro-version",
    name: "[ART] RETRO VERSION",
    description: "Immersive 16-bit retro terminal setup with glowing monitors, classic arcade elements, and warm phosphor aesthetics.",
    cost: 300,
    type: "wallpaper",
    value: retroVersionImage
  },
  {
    id: "wallpaper-sixteen-bit-version",
    name: "[ART] 16 Bit Version",
    description: "Classic retro style visual. Built from the custom uploaded memory grid.",
    cost: 350,
    type: "wallpaper",
    value: sixteenBitVersionImage
  },
  {
    id: "wallpaper-python-genesis",
    name: "[ART] Pythonic Genesis",
    description: "A clean and modern Python visual representation symbolizing high versatility, code purity, and complete semantic control.",
    cost: 200,
    type: "wallpaper",
    value: pythonRewardImage
  },
  {
    id: "wallpaper-classic-vanguard",
    name: "[ART] Classic Cyber Vanguard",
    description: "The original wide-view neon terminal, representing the genesis of your hacking journey.",
    cost: 300,
    type: "wallpaper",
    value: heroRewardImage
  },
  {
    id: "wallpaper-summer-task",
    name: "[ART] Summer Task",
    description: "A beautiful, warm, and sun-soaked seasonal backdrop to celebrate your coding achievements.",
    cost: 150,
    type: "wallpaper",
    value: summerTaskImage
  },
  // SOUND PACKS & SYNTH BEATS STORE
  {
    id: "sound-retro-arcade",
    name: "[SONIC] Retro Arcade Pack",
    description: "Classic 8-bit chip-tune audio experience. Features laser beam shots for coding success, retro downward slides on syntax error warnings, and an looping 8-bit tracking synthesizer beat.",
    cost: 150,
    type: "soundpack",
    value: "retro-arcade"
  },
  {
    id: "sound-cyberpunk-hud",
    name: "[SONIC] Cyberpunk HUD Pack",
    description: "Immersive tactical hud deck audio. Highly satisfying electronic chirp triggers on verified tasks, warning static bursts on error logs, and a deep ambient sub-bass cyber synthesizer loop.",
    cost: 250,
    type: "soundpack",
    value: "cyberpunk-hud"
  },
  {
    id: "sound-anime-meme",
    name: "[SONIC] Kawaii Meme Pack",
    description: "Amusing, playful school vibes. Features sparkling magical chime cascade on task completion, hilarious cartoon spring slide-down triggers on compiling failures, and an upbeat lo-fi chibi background beat.",
    cost: 350,
    type: "soundpack",
    value: "anime-meme"
  }
];
