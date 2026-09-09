export const STATIC_THEMES: any = {
  roblox: {
    "intro-print": {
      headerPrefix: "STUDIO_OUTPUT",
      missionPrefix: "SCRIPT_BOOT",
      intro: "# Joining the Server: print()\n\nYou just opened Roblox Studio to build the next viral obby!",
      task: 'Use `print()` to display the message: `"Welcome to my Roblox Game!"`',
      solutionRegex: [/print\s*\(\s*['"]Welcome to my Roblox Game!['"]\s*\)/]
    }
  }
};
export const STATIC_THEME_ALIASES: any = {
  "obby": "roblox"
};
