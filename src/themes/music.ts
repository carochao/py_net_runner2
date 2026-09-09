export const MUSIC_THEME: any = {
  "intro-print": {
    headerPrefix: "STUDIO_MONITOR",
    missionPrefix: "DAW_START",
    intro: "# Mixing Desk: print()\n\nWelcome to the recording studio. The synthesizers are patched, the amplifiers are hummin', and the master fader is ready. Test the main speaker channels by printing a signal test message.",
    task: "Use `print()` to display: `\"Main Monitor: ACTIVE\"`",
    baseCode: "# TODO: Test local monitors\n",
    solution: "print(\"Main Monitor: ACTIVE\")",
    solutionRegex: [/print\s*\(\s*['\"]Main Monitor: ACTIVE['\"]\s*\)/]
  },
  "naming-conventions": {
    headerPrefix: "MIXER_STYLE",
    missionPrefix: "DECK_SIGNALS",
    intro: "# Deck Controls: Clean Case Signals\n\nSynchronizing your digital audio workstation (DAW) requires micro-second accuracy. Commands are case-sensitive; using an uppercase command like `Print()` will drop the signal, leaving your tracks completely silent! Structure your audio protocols in pure lowercase.",
    task: "Declare a lowercase track variable named `synth_delay` with a setting of `120`. Print the tempo using `print()` to engage the master sync. Use lowercase only!",
    baseCode: "# TODO: Declare synth_delay and print it\n",
    solution: "synth_delay = 120\nprint(synth_delay)",
    solutionRegex: [/synth_delay\s*=\s*120/, /print\s*\(\s*synth_delay\s*\)/]
  },
  "intro-comments": {
    headerPrefix: "TRACK_NOTES",
    missionPrefix: "PRODUCER_LOG",
    intro: "# Lyric Sheets: Comments\n\nOther producers will collaborate on your arrangement. Use comments to write structural labels inside your track timeline without affecting the synthesizers.",
    task: "Write a comment `# Drop starts at bar 32` and then `print(\"Rendering track...\")`",
    baseCode: "# TODO: Leave timeline notes\n",
    solution: "# Drop starts at bar 32\nprint(\"Rendering track...\")",
    solutionRegex: [/#.*Drop starts at bar 32/, /print\s*\(\s*['\"]Rendering track\.\.\.['\"]\s*\)/]
  },
  "comments-inline": {
    headerPrefix: "SYNTH_PATCH",
    missionPrefix: "KNOB_LABEL",
    intro: "# Studio Mixing: Inline Comments\n\nWhen dialling-in analogue synthesizer parameters, you can tag configuration values on the fly. Add quick inline track notes directly next to channel properties.",
    task: "Initialise `track_bpm` to `128`. On the same line, add an inline comment `# Dance floor tempo`.",
    baseCode: "# TODO: Set up BPM with inline comment\n",
    solution: "track_bpm = 128 # Dance floor tempo",
    solutionRegex: [/track_bpm\s*=\s*128/, /#.*Dance floor tempo/]
  },
  "intro-vars": {
    headerPrefix: "MIXER_CONSOLE",
    missionPrefix: "TRACK_VARS",
    intro: "# Track Parameters: Variables\n\n**What is a Variable?** Think of a **variable** as a **labeled control knob** on your synthesizer or mixer! You label the knob (like `active_tracks`), set its level or tempo value inside, and adjust or query it as you build your track.\n\nA modern DAW tracks hundreds of mixing channels. Let's use variables to log active tracks in your project and the master signal velocity.",
    task: "Create `active_tracks` set to `64` and `bpm_limit` set to `1500`.",
    baseCode: "# TODO: Initialise DAW settings\n",
    solution: "active_tracks = 64\nbpm_limit = 1500",
    solutionRegex: [/active_tracks\s*=\s*64/, /bpm_limit\s*=\s*1500/]
  },
  "vars-reassignment": {
    headerPrefix: "SYNTH_MOD",
    missionPrefix: "FILTER_SWEEP",
    intro: "# LFO Modulation: Reassignment\n\nYou've just adjusted the cutoff frequency on an analogue synth filter. Update your sweep multiplier variable to shape the synth wave's resonance.",
    technical: "When you assign a new value to an existing variable name, Python throws away the old value and replaces it with the new one. This is called **reassignment**.",
    example: "cutoff_multiplier = 1.0\nprint(cutoff_multiplier)  # Output: 1.0\n\n# We overwrite the old value by assigning a new one:\ncutoff_multiplier = 2.1\nprint(cutoff_multiplier)  # Output: 2.1",
    task: "Initialise `cutoff_multiplier` as `1.0`. Then update `cutoff_multiplier` to `2.1`. Print it.",
    baseCode: "cutoff_multiplier = 1.0\n# TODO: Sweep filter to 2.1\n",
    solution: "cutoff_multiplier = 1.0\ncutoff_multiplier = 2.1\nprint(cutoff_multiplier)",
    solutionRegex: [/cutoff_multiplier\s*=\s*1\.0/, /cutoff_multiplier\s*=\s*2\.1/, /print\s*\(\s*cutoff_multiplier\s*\)/]
  },
  "vars-placeholder": {
    headerPrefix: "MIDI_CHANNEL",
    missionPrefix: "PATCH_CAPTURE",
    intro: "# Echo Request: Synth Channel Handshake\n\nWait for the digital audio workstation to push an incoming MIDI performance signal! Before the synth lead's patch key bypasses your monitor, set up an empty placeholder variable in your script to catch the instrument name.",
    technical: "For strings, an \"empty\" value is represented by two quotes with nothing inside, such as `\"\"` or `''`.\n\n### Overwriting with Input:\nBy first initializing `music_data = \"\"` as a placeholder, we allocate space in memory. Then, running `music_data = input(\"...\")` overwrites that placeholder with whatever you enter, updating the empty string to the synth patch name dynamically so you can see it change!",
    example: "music_data = \"\"  # Memory slot is allocated and empty\nmusic_data = input(\"Enter synth patch name: \")  # Line 2 updates the empty string with your input!\nprint(\"Loading instrument: \" + music_data)",
    task: "1. Initialize `music_data` as an empty string `\"\"` or `''`.\n2. Use `input(\"Enter synth patch name: \")` to populate it.\n3. Print `\"Loading instrument: \" + music_data`.",
    baseCode: "# TODO: Initialize empty MIDI buffer, capture, and print\n",
    hints: [
      "Use music_data = \"\" to prepare the patch slot.",
      "Use music_data = input(\"Enter synth patch name: \") to capture the name.",
      "Print \"Loading instrument: \" combined with the music_data variable."
    ],
    solution: "music_data = \"\"\nmusic_data = input(\"Enter synth patch name: \")\nprint(\"Loading instrument: \" + music_data)",
    solutionRegex: [/music_data\s*=\s*['\"]['\"]/, /input/, /print/]
  },
  "vars-multi": {
    headerPrefix: "MIXER_SYNC",
    missionPrefix: "EQ_RESET",
    intro: "# Sound Check: Multi-Assignment\n\nThe headliner is about to start. Initialise the volume and bass levels for the main speakers simultaneously for a perfectly balanced drop.",
    task: "Assign `volume` set to `11` and `bass` set to `9` in one line.",
    baseCode: "# TODO: Adjust mixer\n",
    solution: "volume, bass = 11, 9",
    solutionRegex: [/volume\s*,\s*bass\s*=\s*11\s*,\s*9/]
  },
  "data-strings": {
    headerPrefix: "PLAYLIST_HUD",
    missionPrefix: "SONG_METADATA",
    intro: "# Audio Metadata: Strings\n\nMetadata helps catalog tracks across streaming markets. Register a string containing your song's main music genre.",
    task: "Create a variable `music_genre` set to `\"Synthwave\"`. Print it.",
    baseCode: "# TODO: Label song genre\n",
    solution: "music_genre = \"Synthwave\"\nprint(music_genre)",
    solutionRegex: [/music_genre\s*=\s*['\"]Synthwave['\"]/]
  },
  "data-booleans": {
    headerPrefix: "MIDI_CLOCK",
    missionPrefix: "BEAT_SYNC",
    intro: "# Beat Matching: Booleans\n\nIs the analogue MIDI clock synchronized? Has the loop record safety switch triggered? Keep the beat matched using conditional booleans.",
    task: "Set `midi_clock_synced` to `True` and `record_safety_active` to `False`.",
    baseCode: "# TODO: Check MIDI clock\n",
    solution: "midi_clock_synced = True\nrecord_safety_active = False",
    solutionRegex: [/midi_clock_synced\s*=\s*True/, /record_safety_active\s*=\s*False/]
  },
  "intro-math": {
    headerPrefix: "SOUND_BOARD",
    missionPrefix: "GAIN_STAGING",
    intro: "# Mastering Logic: Math\n\nThe track is almost finished. Sum up the decibel levels from the kick drum and the bass line to ensure they don't clip the master fader during the drop.",
    task: "Create `kick_db` as `-6` and `bass_db` as `-3`. Store the sum in `summed_signal` and print it.",
    baseCode: "# TODO: Balance the mix\n",
    solution: "kick_db = -6\nbass_db = -3\nsummed_signal = kick_db + bass_db\nprint(summed_signal)",
    solutionRegex: [/summed_signal\s*=\s*kick_db\s*\+\s*bass_db/]
  },
    "math-complex": {
    headerPrefix: "TECHNICAL_PROTOCOL",
    missionPrefix: "YOUR TASK",
    intro: "# Technical Protocol: Memory Dump\n\nThe DAW crashed during mastering. Run a technical protocol memory dump to restore the master gain levels after threshold reduction.",
    technical: "### Audio Gain Stages:\n1. **Acoustic Math**: Offset the absolute peak input gain with threshold attenuators before determining output coefficients.\n2. **Group Processing**: Brackets `()` act as parallel audio pathways, compiling offsets in a single pass before multiplying by master gains.",
    example: "peak_gain = 80\nthreshold = -10\nmaster_output = (peak_gain + threshold) * 0.8\nprint(master_output)",
    task: "1. Create frequency variable `peak_gain` as `80`.\n2. Create frequency variable `threshold` as `-10`.\n3. Calculate `(peak_gain + threshold) * 0.8` and store in `master_output`.\n4. Print `master_output`.",
    baseCode: "# TODO: Stabilize DAW settings\n",
    solution: "peak_gain = 80\nthreshold = -10\nmaster_output = (peak_gain + threshold) * 0.8\nprint(master_output)",
    solutionRegex: [/master_output\s*=\s*\(\s*peak_gain\s*\+\s*threshold\s*\)\s*\*\s*0\.8/]
  },
"intro-lists": {
    headerPrefix: "DAW_CHANNELS",
    missionPrefix: "TRACKS_TALLY",
    intro: "# Signal Chains: Lists\n\nOrganize the central tracks layout in your DAW session. Grouping vocal stems into lists simplifies routing and effects.",
    technical: "### DAW Track Lists:\n- **What is a List?**: A list is an ordered, changeable (mutable) collection of signals grouped inside a single channel variable. Instead of configuring each separate recording on an isolated channel (e.g., `ch1 = \"Lead Vocals\"`, `ch2 = \"Synths\"`), a list lets you bundle multiple audio stems together under a single track name.\n- **Syntax**: Lists are defined using square brackets `[` and `]`, resembling the physical slot borders on your studio mixing board.\n- **Comma Separation**: Every stem or melody track listed inside your session must be separated by a comma.\n- **Zero-Based Channels**: Python lists use zero-based indexing. The first channel of your fader bank is handled at index `0`, the second fader at `1`, and the third at `2`.",
    example: "# Sequence multiple tracks in a single list variable\nsession_stems = [\"Kick Drum\", \"Bassline\", \"Chorus Vocals\"]\nprint(session_stems)  # Outputs the entire session tracks layout",
    task: "Initialise your `tracks` list with \"Lead Vocals\", \"Backing Vocals\", and \"Melody Synth\". Print the tracks list.",
    baseCode: "# TODO: List mastering tracks\n",
    solution: "tracks = [\"Lead Vocals\", \"Backing Vocals\", \"Melody Synth\"]\nprint(tracks)",
    solutionRegex: [/tracks\s*=\s*\[/, /print\s*\(\s*tracks\s*\)/]
  },
  "list-indexing": {
    headerPrefix: "MIXER_ROUTING",
    missionPrefix: "YOUR TASK",
    intro: "# Stem Extraction: Track Indices\n\nYour master DAW mixer needs to route specific audio channels. Grouping and filtering tracks correctly starts with precise channel selection.",
    technical: "### Mixer Channel Board:\n\n```text\ntracks = [\"Lead Vocals\", \"Backing Vocals\", \"Melody Synth\"]\n#        [0]             [1]                [2]\n```",
    example: "# Grab tracks from mixer board using channel indices\ntracks = [\"Lead Vocals\", \"Backing Vocals\", \"Melody Synth\"]\n\n# Select first track (index 0)\np1 = tracks[0]\nprint(p1)  # Output: Lead Vocals\n\n# Select third track (index 2)\np3 = tracks[2]\nprint(p3)  # Output: Melody Synth",
    task: "1. Read the lead channel (index 0) from `tracks` and store in `p1`.\n2. Read the synth track (index 2) from `tracks` and store in `p3`.\n3. Print both `p1` and `p3`.",
    baseCode: "tracks = [\"Lead Vocals\", \"Backing Vocals\", \"Melody Synth\"]\n# TODO: Extract channels 0 and 2 for routing\n",
    solution: "p1 = tracks[0]\np3 = tracks[2]\nprint(p1)\nprint(p3)",
    solutionRegex: [/p1\s*=\s*tracks\s*\[\s*0\s*\]/, /p3\s*=\s*tracks\s*\[\s*2\s*\]/]
  },
  "list-append": {
    headerPrefix: "CHANNEL_INJECT",
    missionPrefix: "YOUR TASK",
    intro: "# Expanding Arrays: .append()\n\nExcellent progress. Now, your tactical records indicate a newly detected, high-value audio track channel is within scanning range. Use .append() to instantly add it to your records.",
    technical: "### Append Protocol:\n- The `.append()` method mutates lists directly in memory.\n- It adds elements to index `-1` (the very end of your active stack).",
    example: "tracks = [\"Lead Vocals\",\"Backing Vocals\",\"Melody Synth\"]\ntracks.append(\"Heavy Bass\")\n# tracks is now updated!",
    task: "1. Append \"Heavy Bass\" to the `tracks` list.\n2. Print the final `tracks` list to confirm installation.",
    baseCode: "tracks = [\"Lead Vocals\",\"Backing Vocals\",\"Melody Synth\"]\n# TODO: Append value and print\n",
    solution: "tracks.append(\"Heavy Bass\")\nprint(tracks)",
    solutionRegex: [/tracks\.\s*append\s*\(\s*['"]Heavy Bass['"]\s*\)/, /print\s*\(\s*tracks\s*\)/]
  },
  "list-pop": {
    headerPrefix: "STEM_CONSOLIDATION",
    missionPrefix: "YOUR TASK",
    intro: "# DAW Cleanup: .pop()\n\nYour session disk cache is starting to overload with extra unused audio stems and rendering trails! Clear up valuable system RAM. Use `.pop()` to extract the last redundant file from your session buffer and log its deletion.",
    technical: "### Pop Purge Parameters:\n- Calling `.pop()` without arguments extracts and returns the **last** item from a list.\n- It directly modifies the original list sequence.",
    example: "popped_item = stem_cache.pop()\nprint(popped_item)  # Displays deleted record",
    task: "1. Pop the last item from the `stem_cache` list and store it inside a variable named `deleted_stem`.\n2. Print `deleted_stem` to output the purged token.",
    baseCode: "stem_cache = [\"Reverb Trail\",\"Click Track\",\"Reference Vocal\"]\n# TODO: Pop last element and print\n",
    solution: "deleted_stem = stem_cache.pop()\nprint(deleted_stem)",
    solutionRegex: [/deleted_stem\s*=\s*stem_cache\.\s*pop\s*\(\s*\)/, /print\s*\(\s*deleted_stem\s*\)/]
  },
  "intro-tuples": {
    headerPrefix: "STUDIO_COORD",
    missionPrefix: "YOUR TASK",
    intro: "# Secure Vault Coordinates: tuples\n\nSome critical keys and structural coordinates must remain permanently unchangeable during a high-risk connection sequence. tuples provide locked-down collections that resist running processes modification.",
    technical: "### Master-Tape Immutable Tuples:\n- **What is a Tuple?**: A tuple is an ordered collection of variables, like a stereo track configuration, but with an absolute production distinction: **lists are mutable** (meaning you can add tracks, rearrange order, or swap stems dynamically), whereas **tuples are immutable** (their contents are permanently locked like finished audio recorded onto magnetic master tape and cannot be edited once saved).\n- **Syntax**: Written using round parentheses `()` instead of square brackets `[]`.\n- **Speed & Integrity**: Because tuples are simpler and read-only, DAW systems process them faster and use them to protect vital, unchangeable configurations like mastering sample rates or physical studio mixer locations.",
    example: "VAULT = (\"Master\", 101)\nprint(VAULT[0])  # Access elements just like a list",
    task: "1. Initialize a tuple named `studio_rack` containing \"Abbey Road B1\" and the number `1969`.\n2. Print the `studio_rack` tuple.",
    baseCode: "# TODO: Initialize the coordinate tuple and print\n",
    solution: "studio_rack = (\"Abbey Road B1\", 1969)\nprint(studio_rack)",
    solutionRegex: [/studio_rack\s*=\s*\(\s*['"]Abbey Road B1['"]\s*,\s*1969\s*\)/, /print\s*\(\s*studio_rack\s*\)/]
  },
  "intro-tuples-immutability": {
    headerPrefix: "BUFFER_INTEGRITY",
    missionPrefix: "YOUR TASK",
    intro: "# Unchangeable Core: tuples vs Lists\n\nVerify the absolute difference in stability: adjust a flexible list configuration, then test the absolute immutability of your hard-coded tuple data.",
    technical: "### Storage Verification:\n- Lists are fully dynamic, meaning you can update indices in-place (`items[0] = new_value`).\n- tuples are read-only blocks: once declared, their order and contents are permanently sealed in RAM.",
    example: "my_list = [\"v1\"]\nmy_list[0] = \"v2\"  # Legal!\n\nmy_tuple = (1, 2)\n# my_tuple[0] = 99  # ILLEGAL!",
    task: "1. Create a list named `mixer_stems` containing the single string \"Snare\"\n2. Create a tuple named `daw_buffer_version` containing the numbers `12` and `4`.\n3. Rewrite `mixer_stems[0]` to be \"Gated Snare\"\n4. Print both `mixer_stems` and `daw_buffer_version`.",
    baseCode: "# TODO: Demonstrate mutable list and immutable tuple\n",
    solution: "mixer_stems = [\"Snare\" ]\ndaw_buffer_version = (12, 4)\nmixer_stems[0] = \"Gated Snare\"\nprint(mixer_stems)\nprint(daw_buffer_version)",
    solutionRegex: [/mixer_stems\s*\[\s*0\s*\]\s*=\s*['"]Gated Snare['"]/, /daw_buffer_version\s*=\s*\(\s*12\s*,\s*4\s*\)/]
  },
  "list-slicing": {
    headerPrefix: "BUS_FADER_CONTROL",
    missionPrefix: "YOUR TASK",
    intro: "# Segment Filtering: List Slicing\n\nYou don't need a heavy bulk memory dump to extract targeted sectors! Slice specific ranges out of your structural list, isolating just the high-value coordinates.",
    technical: "### Slicing Operators:\n- Defined using start and end indices with colons: `list[start:end]`.\n- The start index is fully `inclusive`, while the end coordinate boundary is strictly `exclusive`.",
    example: "subset = items[1:4]  # Extracts elements at index 1, 2, and 3",
    task: "1. Slice index `1` to index `4` (exclusive) from the `mix_bus_stems` list.\n2. Store this result in a new variable named `drum_subset`.\n3. Print the resulting slice `drum_subset`.",
    baseCode: "mix_bus_stems = [\"kick\",\"snare\",\"hi_hat\",\"perc\",\"overhead\",\"room\"]\n# TODO: Slice indices 1:4 and print\n",
    solution: "drum_subset = mix_bus_stems[1:4]\nprint(drum_subset)",
    solutionRegex: [/drum_subset\s*=\s*mix_bus_stems\s*\[\s*1\s*:\s*4\s*\]/, /print\s*\(\s*drum_subset\s*\)/]
  },
  "list-filtering": {
    headerPrefix: "PEAK_DETECT",
    missionPrefix: "YOUR TASK",
    intro: "# High-Fidelity Filters: List Comprehensions\n\nA raw stream of unfiltered variables slows down execution speed. Construct a list comprehension to filter items with ratings or thresholds greater than 50 instantaneously.",
    technical: "### Comprehension Syntax:\n- Comprehensions allow single-line loops: `[x for x in list if condition]`.\n- It constructs and returns a fully new list on the fly.",
    example: "under_limit = [x for x in data if x < 20]",
    task: "1. Use a list comprehension to filter all values **greater than 50** from `db_meters`.\n2. Store the result in a variable named `peaking_vocals`.\n3. Print `peaking_vocals`.",
    baseCode: "db_meters = [12, 55, 34, 89, 21, 67]\n# TODO: Comprehend and filter values > 50\n",
    solution: "peaking_vocals = [d for d in db_meters if d > 50]\nprint(peaking_vocals)",
    solutionRegex: [/peaking_vocals\s*=\s*\[\s*d\s+for\s+d\s+in\s+db_meters\s+if\s+d\s*>\s*50\s*\]/, /print\s*\(\s*peaking_vocals\s*\)/]
  },
  "list-comprehension-range": {
    headerPrefix: "MIDI_QUANTIZATION",
    missionPrefix: "YOUR TASK",
    intro: "# Automated Array Generation: Math Comprehension\n\nLet's isolate structural coordinates matching even integers. Use a powerful list comprehension combined with modulo checks to filter operational nodes dynamically.",
    technical: "### Modular Filtration:\n- Check if indices are divisble: `x % 2 == 0` catches all even integers.\n- Efficiently applies complex criteria without long multiline nested loops.",
    example: "evens = [n for n in range(10) if n % 2 == 0]",
    task: "1. Filter only the **even** numbers from the `midi_notes` list using a list comprehension.\n2. Store this filtered list in a new variable named `even_midi_notes`.\n3. Print `even_midi_notes`.",
    baseCode: "midi_notes = [101, 102, 103, 104, 105, 106, 107, 108]\n# TODO: Comprehend and filter even indices\n",
    solution: "even_midi_notes = [m for m in midi_notes if m % 2 == 0]\nprint(even_midi_notes)",
    solutionRegex: [/even_midi_notes\s*=\s*\[\s*m\s+for\s+m\s+in\s+midi_notes\s+if\s+m\s*%\s*2\s*==\s*0\s*\]/, /print\s*\(\s*even_midi_notes\s*\)/]
  },
  "intro-input": {
    headerPrefix: "SYNTH_PATCH",
    missionPrefix: "YOUR TASK",
    intro: "# DAW Mic Check: DJ Input\n\nWarm up the crowd! To fire up the MIDI controller, query the producer for which sample pack or instrument track they wish to load.",
    technical: "### Audio Routing Queries:\n- The `input()` instruction queries the performance board for real-time instrument choices.\n- Keeps stage monitors and speakers mapped dynamically.\n- **Signal Concatenation**: Patch audio channels or track labels together using the `+` operator (e.g., `\"Synth\" + \"Bass\"` becomes `\"SynthBass\"`). Be sure to add spaces in your lyric or monitor strings, or the words will overlap and ruin the mix!",
    example: "synth = input(\"Select synthesizer: \")\nprint(\"Loading patch: \" + synth)",
    task: "1. Ask the artist for their track with the prompt: **\"Enter track name: \"** and store it in a variable named `track_name`.\n2. Print **\"Now playing: \"** concatenated with the user\'s `track_name` value.",
    baseCode: "# TODO: Capture track name and print the player log\n",
    solution: "track_name = input(\"Enter track name: \")\nprint(\"Now playing: \" + track_name)",
    solutionRegex: [/track_name\s*=\s*input\s*\(\s*['\"]Enter track name: \s*['\"]\s*\)/, /print\s*\(\s*['\"]Now playing: \s*['\"]\s*\+\s*track_name\s*\)/]
  },
  "input-mad-libs": {
    headerPrefix: "STUDIO_TRACK",
    missionPrefix: "TRACK_GEN",
    intro: "# Producer Notes: Story Generator\n\nKeep track of remix sessions and collab schedules. Write a small script to log which artist worked on which mixing board with a chosen plugin.",
    technical: "### Compiling Studio Logs:\nSynthesize artist names, sound stages, and synthesizer plugins using clean string joining. Double check space boundaries.",
    example: "producer = \"Zedd\"\nroom = \"Daft Studio\"\nlog = producer + \" completed \" + room\nprint(log)",
    task: "1. Ask the user for the DJ name with the prompt: **\"Enter DJ name: \"** and store it in `dj`.\n2. Ask the user for the stadium stage with the prompt: **\"Enter stadium stage: \"** and store it in `stage`.\n3. Ask the user for the audio patch with the prompt: **\"Enter audio patch: \"** and store it in `patch`.\n4. Combine into a variable named `session_log` using the format: `dj + \" bypassed \" + stage + \" with a \" + patch + \"!\"` and print `session_log`.",
    baseCode: "# TODO: Record mixer sessions\n",
    solution: "dj = input(\"Enter DJ name: \")\nstage = input(\"Enter stadium stage: \")\npatch = input(\"Enter audio patch: \")\nsession_log = dj + \" bypassed \" + stage + \" with a \" + patch + \"!\"\nprint(session_log)",
    solutionRegex: [/dj\s*=\s*input\s*\(\s*['"]Enter DJ name:\s*['"]\s*\)/, /stage\s*=\s*input\s*\(\s*['"]Enter stadium stage:\s*['"]\s*\)/, /patch\s*=\s*input\s*\(\s*['"]Enter audio patch:\s*['"]\s*\)/, /session_log\s*=\s*dj\s*\+\s*['"] bypassed ['"]\s*\+\s*stage\s*\+\s*['"] with a ['"]\s*\+\s*patch\s*\+\s*['"]!['"]/, /print\s*\(\s*session_log\s*\)/]
  },
  "input-mad-libs-pro": {
    headerPrefix: "CONTROLLER_REPORTS",
    missionPrefix: "SOUND_OVERLOAD",
    intro: "# Studio Detune: Advanced MIDI Meltdown\n\nThe synthesizer console's internal buffer is slipping! Structure an automated track diagnostics log using five detailed music criteria.",
    technical: "### Balancing Track Chains:\nJoin MIDI indicators, digital channels, and sound effect states in sequential string quotes with accurate padding.",
    example: "trackLog = artist + \" injected \" + signal + \" into \" + aux + \" at \" + db + \". System is \" + freq + \"!\"",
    task: "1. Ask for producer credentials with prompt: **\"Enter producer name: \"** and store in `producer`.\n2. Ask for MIDI trigger command with prompt: **\"Enter MIDI code: \"** and store in `midi_code`.\n3. Ask for destination channel with prompt: **\"Enter mixer strip: \"** and store in `mixer_strip`.\n4. Ask for compressor ratio tier with prompt: **\"Enter compression level: \"** and store in `comp_level`.\n5. Ask for audio buffer status with prompt: **\"Enter audio status: \"** and store in `audio_status`.\n6. Combine into a variable named `synth_glitch` and print using the exact format: `producer + \" injected \" + midi_code + \" into \" + mixer_strip + \" at \" + comp_level + \". System is \" + audio_status + \"!\"`.",
    baseCode: "# TODO: Compile ambient studio diagnostics\n",
    solution: "producer = input(\"Enter producer name: \")\nmidi_code = input(\"Enter MIDI code: \")\nmixer_strip = input(\"Enter mixer strip: \")\ncomp_level = input(\"Enter compression level: \")\naudio_status = input(\"Enter audio status: \")\nsynth_glitch = producer + \" injected \" + midi_code + \" into \" + mixer_strip + \" at \" + comp_level + \". System is \" + audio_status + \"!\"\nprint(synth_glitch)",
    solutionRegex: [/producer\s*=\s*input\s*\(\s*['"]Enter producer name:\s*['"]\s*\)/, /midi_code\s*=\s*input\s*\(\s*['"]Enter MIDI code:\s*['"]\s*\)/, /mixer_strip\s*=\s*input\s*\(\s*['"]Enter mixer strip:\s*['"]\s*\)/, /comp_level\s*=\s*input\s*\(\s*['"]Enter compression level:\s*['"]\s*\)/, /audio_status\s*=\s*input\s*\(\s*['"]Enter audio status:\s*['"]\s*\)/, /print\s*\(\s*synth_glitch\s*\)/]
  },
  "print-formatting": {
    title: "Studio Registry: F-Strings",
    headerPrefix: "STUDIO_MONITOR",
    missionPrefix: "TRACK_VERIFY",
    intro: "# Studio Registry: F-Strings\n\nStitch dynamic tracks and channel indices directly into DAW logs. F-strings allow you to dynamically embed names and levels into control readouts effortlessly.",
    technical: "### Dynamic Mix Formatting:\n- Prepend with `f` before string start boundaries (`f\'...\'`).\n- Wrap channel properties in `{}` to instantly read track registries into your console.",
    example: "producer = \'Beatmaker\'\nprint(f\'Session with {producer}\') # Outputs: Session with Beatmaker",
    task: "### YOUR MISSION\n\nYou have `alias = \'Beatmaker\'` and `level = 12`. Use an **f-string** to print: `Artist: Beatmaker | Audio Volume: 12`.",
    baseCode: "alias = \'Beatmaker\'\nlevel = 12\n# TODO: Print with f-string\n",
    hints: [
      "Start your string with f, like f\'...\'",
      "Map variables inside {alias} and {level} to insert them."
    ],
    solution: "alias = \'Beatmaker\'\nlevel = 12\nprint(f\'Artist: {alias} | Audio Volume: {level}\')",
    solutionRegex: [/print\s*\(\s*f['"]Artist:\s*\{alias\}\s*\|\s*Audio\s*Volume:\s*\{level\}['"]\s*\)/]
  },
  "input-fstrings-fun": {
    title: "Mixer Automations: Advanced F-Strings",
    headerPrefix: "DAW_ROUTING",
    missionPrefix: "CLONE_ROUTE",
    intro: "# Studio Signals: Advanced F-Strings\n\nStitch audio channels together dynamically under your DAW controller. F-strings let developers calculate live decibel variations and standardize sector names to pristine uppercase.",
    technical: "### Studio Deck Routing:\n- **Gain Summation**: Calculate compound signals directly inside string templates: `{faders + gain}`.\n- **Upper Format**: Standardize and uppercase physical monitor quadrants easily: `{track.upper()}`.",
    example: "kicks, snares = 2, 4\nprint(f'Synced track stems: {kicks + snares}')",
    task: "### YOUR MISSION\n\n1. Prompt for clone count with: **\"Enter clone count: \"** and store it as an integer in `clones`.\n2. Prompt for target region with: **\"Enter audio channel: \"** and store it in `channel`.\\n3. Use an **f-string** to print: `Deploying {clones} clones to {channel.upper()}...`.",
    baseCode: "# TODO: Route mixer streams\n",
    hints: [
      "Ask for clones using int(input(\"Enter clone count: \"))",
      "Ask for channel using input(\"Enter audio channel: \")",
      "Inject {clones} and {channel.upper()} inside the printed script output."
    ],
    solution: "clones = int(input(\"Enter clone count: \"))\nchannel = input(\"Enter audio channel: \")\nprint(f\"Deploying {clones} clones to {channel.upper()}...\")",
    solutionRegex: [/print\s*\(\s*f['"]Deploying\s*\{clones\}\s*clones\s*to\s*\{channel\.upper\(\)\}\.\.\.['"]\s*\)/]
  },
  "input-cast-int": {
    title: "Synthesizer Polyphony: Casting to Int",
    headerPrefix: "MIDI_ROUTING",
    missionPrefix: "VOICE_RECAST",
    intro: "# DAW Polyphony: Parsing Channel Notes\\n\\nModern virtual synths utilize strict voice thresholds. Recast upcoming text instructions from MIDI channels to prevent playback audio clips from dropping voices.",
    technical: "### Polyphonic Casting:\\n- Cast text string parameters into proper note channels using `int(input(\\\"Notes: \\\"))`.",
    example: "lead_waves = int(input(\"Active leads: \"))\ntotal_channels = lead_waves + 8",
    task: "### YOUR MISSION\\n\\nMap hardware channels:\\n1. Prompt for synth MIDI notes with **\\\"Enter analogue synth MIDI notes: \\\"** and store it as an integer in `analog_synth_notes`.\\n2. Prompt for vocal tracks with **\\\"Enter vocal sampler harmony notes: \\\"** and store it as an integer in `vocal_chords`.\\n3. Calculate and print the combined note voices running into your master mixer.",
    baseCode: "# TODO: Recast audio streams and merge them\\n",
    hints: [
      "Ask for synth: analog_synth_notes = int(input(\\\"Enter analogue synth MIDI notes: \\\"))",
      "Ask for vocals: vocal_chords = int(input(\\\"Enter vocal sampler harmony notes: \\\"))",
      "Print the sum of the variables: print(analog_synth_notes + vocal_chords)"
    ],
    solution: "analog_synth_notes = int(input(\\\"Enter analogue synth MIDI notes: \\\"))\\nvocal_chords = int(input(\\\"Enter vocal sampler harmony notes: \\\"))\\nprint(analog_synth_notes + vocal_chords)",
    solutionRegex: [/analog_synth_notes\s*=\s*int\s*\(\s*input/, /vocal_chords\s*=\s*int\s*\(\s*input/]
  },
  "input-cast-float": {
    title: "Fader Decibels: Casting to Float",
    headerPrefix: "GAIN_DECIBEL",
    missionPrefix: "FLOAT_VOL",
    intro: "# Mastering Suite: Gain Decimal Calculations\\n\\nProfessional audio mastering relies on precise decibels (dB) readings. Mixing boards report audio curves in float format. Convert raw input decibels to evaluate balanced master logs correctly.",
    technical: "### Audio Console Float Diagnostics:\\n- **What is a Float?**: While integers represent whole numbers (like `12` chromatic notes), a `float` represents fractional decimal metrics (e.g., `-3.25` dB fader cuts or `1.57` pitch frequency ratios) for audiophile precision.\\n- **Mixing Console Inputs**: Commands obtained from the `input()` slider values start as raw text strings. To apply mathematical curves, convert them using `float()`, e.g., `volume = float(input())`.\\n- **The Clip Distortion Trap**: Trying to parse a decimal sound parameter like `\"-3.25\"` using `int()` triggers a `ValueError` crash, instantly failing your soundboard session!",
    example: "tempo_bpm = float(input(\"Base track speed: \"))\nsample_rate = tempo_bpm * 1.5",
    task: "### YOUR MISSION\\n\\nTweak mixer channel balances:\\n1. Prompt for audio decibels with **\\\"Enter analogue audio decibel level: \\\"** and store it as a float in `db_level`.\\n2. Prompt for volume scale with **\\\"Master volume scale factor: \\\"** and store it as a float in `scale_factor`.\\n3. Compute and print the adjusted volume level.",
    baseCode: "# TODO: Handle audio decibel scaling\\n",
    hints: [
      "Get db_level = float(input(\"Enter analogue audio decibel level: \"))",
      "Get scale = scale_factor = float(input(\"Master volume scale factor: \"))",
      "Multiply db_level and scale_factor inside print()."
    ],
    solution: "db_level = float(input(\"Enter analogue audio decibel level: \"))\nscale_factor = float(input(\"Master volume scale factor: \"))\nprint(db_level * scale_factor)",
    solutionRegex: [/db_level\s*=\s*float\s*\(\s*input/, /scale_factor\s*=\s*float\s*\(\s*input/]
  },
  "control-indentation": {
    title: "Sample Synchronizer: Indentation Blocks",
    headerPrefix: "DAW_RHYTHM",
    missionPrefix: "TRACK_ALIGN",
    intro: "# Beat Alignment: Indentation Blocks\\n\\nSynthesizing custom loop tracks involves perfect rhythm. Python uses empty spaces to keep logical blocks locked onto the tempo. Misaligned lines disrupt the code structure like standard drop beats.",
    technical: "### Audio Track Formatting:\\n- Colons (`:`) acts like local bar lines starting a new sequence.\\n- Add exactly 4 spaces to align nested instructions directly onto the code grid.",
    example: "if True:\\n    print(\\\"Tempo synchronized!\\\")  # Aligned line",
    task: "### YOUR MISSION\\n\\nSynchronize the virtual mixing deck:\\n1. Formulate an `if True:` conditional block.\\n2. On the next line, carrying 4 spaces of indentation, print **\\\"Accessing...\\\"** to fetch mixing frequencies.",
    baseCode: "# TODO: Keep mixer block channels aligned\\n",
    hints: [
      "End your if True statement with a colon (:)",
      "Indent the following line inside by 4 spaces",
      "Print the string: print(\\\"Accessing...\\\")"
    ],
    solution: "if True:\n    print(\"Accessing...\")",
    solutionRegex: [/if\s+True\s*:/, /print\s*\(\s*['"]Accessing\.\.\.['"]\s*\)/]
  },
  "control-nested-indent": {
    title: "Rack Modulation: Cascading Audio Effects",
    headerPrefix: "DAW_GRID",
    missionPrefix: "RACK_BUS",
    intro: "# FX Signal Loops: Double Routing Channels\\n\\nTo engineer complex ambient synthesis on virtual mixing tables, you must feed effects buses into sub-effect units. Cascading your logic blocks in Python keeps your track mixing lines perfectly on-tempo.",
    technical: "### Signal Bus Nesting:\\n- Primary effects chains are indented with standard spacing (4 spaces).\\n- Sub-filter chains are nested under parent loops with double formatting (**8 spaces**).",
    example: "if True:\\n    print(\"Reverb bus connected\")\\n    if True:\\n        print(\"EQ limiter running\")",
    task: "### YOUR MISSION\\n\\nRoute vocal synthesizers down to deep performance racks:\\n1. Initialise original deck routing with **`if True:`**.\\n2. Nest the internal compression parameters under it with a secondary **`if True:`** (indented by 4 spaces).\\n3. On the inner sub-line (indented by exactly 8 spaces), print **`\"CORE ACCESS GRANTED\"`**.",
    baseCode: "# TODO: Group deep modular effects loops\\n",
    hints: [
      "First master bus check: if True:",
      "Second sub-channel bus: indentation offset of 4 spaces with if True:",
      "Third instruction line: offset of 8 spaces executing print(\"CORE ACCESS GRANTED\")"
    ],
    solution: "if True:\n    if True:\n        print(\"CORE ACCESS GRANTED\")",
    solutionRegex: [/if\s+True\s*:/, /if\s+True\s*:/, /print\s*\(\s*['"]CORE\s+ACCESS\s+GRANTED['"]\s*\)/]
  },
  "control-if": {
    headerPrefix: "DJ_BOOTH",
    missionPrefix: "DROP_BEAT",
    intro: "# Performance Logic: If Statements\n\nThe energy in the club is peaking. Check if the crowd is ready before dropping the heavy bass and lighting up the stage.",
    task: "If `crowd_ready` is `True`, print `\"DROP THE BASS\"`.",
    baseCode: "crowd_ready = True\n# TODO: Check crowd energy\n",
    solution: "crowd_ready = True\nif crowd_ready:\n    print(\"DROP THE BASS\")",
    solutionRegex: [/if\s+crowd_ready/, /print\s*\(\s*['\"]DROP THE BASS['\"]\s*\)/]
  },
  "control-else": {
    title: "Rack Routing: If/Else FX Channel",
    headerPrefix: "DAW_ROUTING",
    missionPrefix: "CHANNEL_ELSE",
    intro: "# Mastering Bus: Else FX Failover\\n\\nWhen processing digital audio workstations, you need safety paths. If your analogue decibel channel reports verified status, connect the main vocal reverb rig. Else, trigger the compression floor limits to avoid ear damage.",
    technical: "### Safe Studio Spacing:\\n- Ensure the `else:` parameter perfectly mirrors the indent level of the starting `if` definition.\\n- Keep its indented instructions exactly at 4 spaces offset.",
    example: "if reverb_on:\\n    print(\\\"Studio room mode\\\")\\nelse:\\n    print(\\\"Dry channel master\\\")",
    task: "### YOUR MISSION\\n\\nAudit output channel keys:\\n1. Code an `if/else` safety link using `key_valid`.\\n2. If `key_valid` is `True`, print **`\"ACCESS GRANTED\"`**.\\n3. Otherwise, print **`\"ALARM TRIGGERED\"`**.",
    baseCode: "key_valid = False\\n# TODO: Control digital mixing tracks\\n",
    hints: [
      "Set up: if key_valid: on line 1.",
      "Indent 4 spaces on line 2 and call print(\\\"ACCESS GRANTED\\\").",
      "Code else: flush to the left on line 3.",
      "Inside the else block, indent and call print(\\\"ALARM TRIGGERED\\\")."
    ],
    solution: "if key_valid:\n    print(\"ACCESS GRANTED\")\nelse:\n    print(\"ALARM TRIGGERED\")",
    solutionRegex: [/if\s+key_valid/, /else\s*:/, /print\s*\(\s*['"]ACCESS GRANTED['"]s*\)/, /print\s*\(\s*['"]ALARM TRIGGERED['"]s*\)/]
  },
  "control-elif": {
    title: "Master Bus: Elif Channels",
    headerPrefix: "DAW_MASTER",
    missionPrefix: "TRACK_TIERS",
    intro: "# Mixing Desk: Level Clearances\\n\\nAdvanced digital synthesizers restrict performance options by interface credentials. To keep novice musicians from blowing the audio monitors, use an `if/elif/else` matrix to sort users.",
    technical: "### Track Channel Decibels:\\n- `elif` acts as custom alternative pathways inside the mixer.\\n- All statements must align perfectly at column 0.",
    example: "if decibels > 90:\\n    print(\"Volume too loud!\")\\nelif decibels > 40:\\n    print(\"Ideal mix\")\\nelse:\\n    print(\"Signal muted\")",
    task: "### YOUR MISSION\\n\\nConfigure equalizer console clearances:\\n1. Draft an `if/elif/else` chain around `clearance`.\\n2. If `clearance` equals `1`, print **`\"ROOT ACCESS\"`**.\\n3. Elif `clearance` is less than or equal to `5`, print **`\"LEVEL 5 ACCESS\"`**.\\n4. Otherwise, print **`\"PERMISSION DENIED\"`**.",
    baseCode: "clearance = 5\\n# TODO: Safeguard mixer channel options\\n",
    hints: [
      "Ensure line 1 tests equality with if clearance == 1:",
      "Ensure line 3 tests upper bound with elif clearance <= 5:",
      "Return permissive refusal on else: block"
    ],
    solution: "if clearance == 1:\n    print(\"ROOT ACCESS\")\nelif clearance <= 5:\n    print(\"LEVEL 5 ACCESS\")\nelse:\n    print(\"PERMISSION DENIED\")",
    solutionRegex: [/if\s+clearance\s*==\s*1/, /elif\s+clearance\s*<=\s*5/, /else\s*:/, /print\s*\(\s*['"]ROOT ACCESS['"]s*\)/, /print\s*\(\s*['"]LEVEL 5 ACCESS['"]s*\)/, /print\s*\(\s*['"]PERMISSION DENIED['"]s*\)/]
  },
  "control-meme-gen": {
    title: "Sample Cover: Track Masking",
    headerPrefix: "SAMPLER_DEF",
    missionPrefix: "BEAT_STEAL",
    intro: "# Music Industry Law: Sample Clearing\n\nYou've used a legendary jazz breakbeat sample without securing royal licenses yet. If automated copyright bots detected the uncleared sample snippet in your master track, print a defensive denial to keep the beat on the dancefloor! Else, keep the groove running.",
    technical: "### Branching Logic:\n- **Condition**: Use the boolean `is_detected` directly.\n- **Else Clause**: Provides a fallback for when the condition is `False`.\n- **Strings**: Ensure text precision when copying status identifiers.",
    example: "if is_detected:\n    print(\"PULL_CROSSFADER_SHUT\")\nelse:\n    print(\"Sub-bass vibe clean.\")",
    task: "### YOUR MISSION\n\nCompose an `if/else` audio-bot filter:\n1. If `is_detected`, print **`\"PULL_CROSSFADER_SHUT\"`** to bypass the digital taking-down system.\n2. Else, print **`\"Sub-bass vibe clean.\"`** and release the hit record.",
    baseCode: "is_detected = True\n# TODO: Generate the response\n",
    hints: [
      "Use if is_detected: with a colon.",
      "Indent the next line and print \"PULL_CROSSFADER_SHUT\".",
      "Add else: at the base level and print \"Sub-bass vibe clean.\""
    ],
    solution: "if is_detected:\n    print(\"PULL_CROSSFADER_SHUT\")\nelse:\n    print(\"Sub-bass vibe clean.\")",
    solutionRegex: [/if\s+is_detected/, /else\s*:/, /print\s*\(\s*['"]PULL_CROSSFADER_SHUT['"]\s*\)/, /print\s*\(\s*['"]Sub-bass\s+vibe\s+clean\.['"]\s*\)/]
  },
  "control-nickname-gen": {
    title: "Console Control: Volume Fader Mode",
    headerPrefix: "Studio_DSP",
    missionPrefix: "LEVEL_CHECK",
    intro: "# Mixing Board: Frequency Output Protection\n\nSelect a protective audio amplification mode based on the current output signal index. Heavy decibel surges automatically engage the studio Limiter compression helper.",
    technical: "### Threshold Triggers:\n- **Comparison**: Use `> 9000` to evaluate the raw master sound metric in decibels.\n- **Assignment**: Write the target `fader_mode` string correctly in the matching conditional flows.",
    example: "if sound > 9000:\n    fader_mode = \"Limiter\"\nelse: \n    fader_mode = \"Overdrive\"",
    task: "### YOUR MISSION\n\nMonitor active audio amplification status:\n1. If master output `decibels > 9000`, set `fader_mode` to **`\"Overdrive\"`**.\n2. Else, set `fader_mode` to **`\"Limiter\"`**.\n3. Finally, print the fader setting with `print(fader_mode)`.",
    baseCode: "decibels = 9001\nfader_mode = \"\"\n# TODO: Set mixing console fader status and print it\n",
    hints: [
      "Set fader_mode inside the conditionals.",
      "Ensure print(fader_mode) is at the very end with zero indentation."
    ],
    solution: "decibels = 9001\nif decibels > 9000:\n    fader_mode = \"Overdrive\"\nelse:\n    fader_mode = \"Limiter\"\nprint(fader_mode)",
    solutionRegex: [/if\s+decibels\s*>\s*9000\s*:/, /fader_mode\s*=\s*['"]Overdrive['"]/, /fader_mode\s*=\s*['"]Limiter['"]/, /print\s*\(\s*fader_mode\s*\)/]
  },
  "control-adventure": {
    title: "Channel Uplink: Mixing Console Route",
    headerPrefix: "AUDIO_ROUTE",
    missionPrefix: "BUS_SPLIT",
    intro: "# Royal Mixing Deck: Feed Gate Setup\n\nYou've bypassed the master console protection matrix. Two audio sub-busses are available: \"1\" (A-Grade Vault Master Node) or \"2\" (Vintage Tape Backdoor Feed). Pick your bypass route.",
    technical: "### Branching Route:\n- **Identity Checks**: Compare `choice` using `==` with string values.\n- **Condition Nesting**: Wrap actions inside specific `if/elif/else` branches.",
    example: "if choice == \"1\":\n    print(\"Hooking to Master Node...\")",
    task: "### YOUR MISSION\n\nConfigure mixing console routing channels:\n1. If `choice` is **\"1\"**, print **\"System Breached!\"**.\n2. Elif `choice` is **\"2\"**, print **\"Backdoor Found!\"**.\n3. Else, print **\"Connection Lost.\"**.",
    baseCode: "choice = \"1\"\n# TODO: Connect mixing sub-busses\n",
    hints: [
      "Use elif for the second branch.",
      "The else handles any input that isn't '1' or '2'."
    ],
    solution: "if choice == \"1\":\n    print(\"System Breached!\")\nelif choice == \"2\":\n    print(\"Backdoor Found!\")\nelse:\n    print(\"Connection Lost.\")",
    solutionRegex: [/if\s+choice\s*==\s*['"]1['"]\s*:/, /elif\s+choice\s*==\s*['"]2['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]System Breached!['"]\s*\)/, /print\s*\(\s*['"]Backdoor Found!['"]\s*\)/, /print\s*\(\s*['"]Connection Lost\.['"]\s*\)/]
  },
  "control-multi-elif": {
    title: "Dynamic DSP: Channel Splitter",
    headerPrefix: "STUDIO_DSP",
    missionPrefix: "BEAT_ROUTING",
    intro: "# Mixing Desk: Signal Matrix\n\nYour mixer console's routing panel must direct digital sound outputs based on active track channels: \"synth\", \"vocal\", or \"percussion\".",
    technical: "### Cascading Checks:\n- **Sequential**: Runs frequency filter banks from highest treble down.\n- **Exclusive**: Selecting synth processing disables secondary loops to avoid sonic muddiness.\n- **Exhaustive**: An `else` connects unknown inputs to a generic bypass channel.",
    example: "if channel == \"synth\":\n    print(\"Reverb active.\")\nelif channel == \"vocal\":\n    print(\"Auto-tune engaged.\")",
    task: "### YOUR MISSION\n\nFilter the active tracks for variable `channel`:\n1. If `channel` is **`\"synth\"`**, print **`\"Reverb active.\"`**\n2. Elif `channel` is **`\"vocal\"`**, print **`\"Auto-tune engaged.\"`**\n3. Elif `channel` is **`\"percussion\"`**, print **`\"Compression high.\"`**\n4. Else, print **`\"Bypass filter.\"`**",
    baseCode: "channel = \"synth\"\n# TODO: Implement multi-channel audio split\n",
    hints: [
      "Differentiate synth, vocal, and percussion.",
      "Place print directives inside matching blocks."
    ],
    solution: "if channel == \"synth\":\n    print(\"Reverb active.\")\nelif channel == \"vocal\":\n    print(\"Auto-tune engaged.\")\nelif channel == \"percussion\":\n    print(\"Compression high.\")\nelse:\n    print(\"Bypass filter.\")",
    solutionRegex: [/if\s+channel\s*==\s*['"]synth['"]\s*:/, /elif\s+channel\s*==\s*['"]vocal['"]\s*:/, /elif\s+channel\s*==\s*['"]percussion['"]\s*:/, /else\s*:/, /print\s*\(\s*['"]Reverb\s+active\.['"]\s*\)/, /print\s*\(\s*['"]Auto-tune\s+engaged\.['"]\s*\)/, /print\s*\(\s*['"]Compression\s+high\.['"]\s*\)/, /print\s*\(\s*['"]Bypass\s+filter\.['"]\s*\)/]
  },
  "control-loops": {
    title: "DSP Grid: Channel Cycles",
    headerPrefix: "SYNTH_ENV",
    missionPrefix: "BAR_REPETITIONS",
    intro: "# Dynamic Beats: Looping Frequencies\n\nSound design relies heavily on looping. Program your audio deck to fire rhythmic cycles sequentially across audio channels to verify standard phase alignment.",
    technical: "### What is a Loop? 🔁\nIn programming, a **loop** is like a track that tells the computer to repeat a block of code over and over again so you don't have to write the same code multiple times! A **for loop** is a specific type of loop used when you know beforehand exactly how many times you want to repeat that action.\n\n### range(5) Iteration:\n- **Automation**: Triggers the loop sequence exactly 5 times (bars 0 up to 4).\n- **Structure**: Indent your output prints by 4 spaces within the loop.",
    example: "for i in range(3):\n    print(f\"Channel {i+1} aligned\")",
    task: "### YOUR MISSION\n\nUse a `for` loop with `range(5)` to `print` the status message `f\"Channel {i+1} aligned\"` for each of the 5 cycles.",
    baseCode: "# TODO: Write your beat loop\n",
    hints: [
      "Use 'for i in range(5):'",
      "Print an f-string inside the loop: Channel {i+1} aligned"
    ],
    solution: "for i in range(5):\n    print(f\"Channel {i+1} aligned\")",
    solutionRegex: [/for\s+i\s+in\s+range\s*\(\s*5\s*\)/, /print/]
  },
  "loop-data-scan": {
    title: "MIDI Stream: Note Inspector",
    headerPrefix: "MIDI_STREAM",
    missionPrefix: "NOTE_SCAN",
    intro: "# Sequence Tracking: Note Walks\n\nMIDI protocols encode synth values sequentially in a stream string. Walking through the melody pattern is crucial for applying fine-tuned DSP filters.",
    technical: "### Music Iteration:\n- **Processing**: The synthesizer scans note letters one by one across the bars.\n- **Filter Ends**: Automatically finishes the loop when the digital stem completes.",
    example: "for note in \"MIDI\":\n    print(note)",
    task: "### YOUR MISSION\n\nYou've recorded a custom synthesizer `melody` pattern: `\"SYNTH\"`. Use a `for` loop to iterate through every character `note` in the variable `melody` and `print` it.",
    baseCode: "melody = \"SYNTH\"\n# TODO: Extract note characters\n",
    hints: [
      "Track sound nodes using 'for note in melody:'.",
      "Call print(note) nested with four spaces of indentation."
    ],
    solution: "melody = \"SYNTH\"\nfor note in melody:\n    print(note)",
    solutionRegex: [/for\s+note\s+in\s+melody/, /print\s*\(\s*note\s*\)/]
  },
  "loop-list-audit": {
    title: "Track Audit: Instrument Sweeper",
    headerPrefix: "MIXING_CONSOLE",
    missionPrefix: "MIDI_FILTER",
    intro: "# Mixing Desk: Synthesizers Only\n\nYour digital audio workstation captured multiple recorded loops. Traverse the files list and extract instrument channels specifically configured with the MIDI synth `.mid` format.",
    technical: "### Understanding Loop Variables & `.endswith()` 💡\n\n- **The Loop Variable (`f`)**: When we write `for f in discovered_files:`, Python takes the list `discovered_files` and loops through it one by one. In each round of the loop, the temporary variable **`f`** automatically holds the current filename (like `\"bassline.mid\"`, then `\"vocal_raw.wav\"`, and so on). You can name this variable anything, but `f` is just a short nickname!\n- **The `.endswith()` Method**: Since `f` is a string, we can use Python's built-in `.endswith()` method on it. Running `f.endswith(\".mid\")` asks: *\"Does the text inside `f` end with `.mid`?\"* It returns `True` if it does, and `False` if it doesn't.\n- **Smart Filtering**: By combining them:\n  ```python\n  for f in discovered_files:\n      if f.endswith(\".mid\"):\n          # This runs ONLY if the current file ends with .mid!\n  ```",
    example: "tracks = [\"drum_loops.wav\", \"lead_synth.mid\"]\nfor t in tracks:\n    if \".mid\" in t:\n        print(t)",
    task: "### YOUR MISSION\n\nScan through `discovered_files`. If a file ends with `\".mid\"`, `print` the soundboard routing notice: `f\"Synthesizing: {f}\"`.",
    baseCode: "discovered_files = [\"bassline.mid\", \"vocal_raw.wav\", \"chord_prog.mid\", \"eq_settings.cfg\"]\n# TODO: Route MIDI lines\n",
    hints: [
      "for f in discovered_files:",
      "if f.endswith(\".mid\"):",
      "Print f'Synthesizing: {f}'"
    ],
    solution: "discovered_files = [\"bassline.mid\", \"vocal_raw.wav\", \"chord_prog.mid\", \"eq_settings.cfg\"]\nfor f in discovered_files:\n    if f.endswith(\".mid\"):\n        print(f\"Synthesizing: {f}\")",
    solutionRegex: [/for\s+f\s+in\s+discovered_files/, /f\.endswith\s*\(\s*['"]\.mid['"]\s*\)/, /print/]
  },
  "loop-nested": {
    title: "Soundboard Pad: Signal Matrix",
    headerPrefix: "BEAT_GRID",
    missionPrefix: "PAD_ALIGN",
    intro: "# Beat Slices: Sequencing Audio Tracks\n\nDrum samplers and modern soundboards are 3x3 coordinate pads. Trigger sounds dynamically by looping through banks (X) and active trigger pads (Y).",
    technical: "### How Nested Loops Work Step-by-Step:\nA **nested loop** is simply a loop inside another loop. The key concept is: **The inner loop completes ALL of its iterations for every single step of the outer loop.**\n\nLet's trace a 3x3 soundboard scan with variable `x` (outer loop representing Banks) and variable `y` (inner loop representing Pads) from `0` to `2`:\n\n1. **Outer loop starts**: `x = 0` (Bank 0)\n   - *Inner loop runs completely*:\n     - `y = 0` (Pad 0) -> Output: `Synth - Row: 0, Col: 0`\n     - `y = 1` (Pad 1) -> Output: `Synth - Row: 0, Col: 1`\n     - `y = 2` (Pad 2) -> Output: `Synth - Row: 0, Col: 2`\n2. **Outer loop moves to next step**: `x = 1` (Bank 1)\n   - *Inner loop runs completely again*:\n     - `y = 0` (Pad 0) -> Output: `Synth - Row: 1, Col: 0`\n     - `y = 1` (Pad 1) -> Output: `Synth - Row: 1, Col: 1`\n     - `y = 2` (Pad 2) -> Output: `Synth - Row: 1, Col: 2`\n3. **Outer loop moves to last step**: `x = 2` (Bank 2)\n   - *Inner loop runs completely one last time*:\n     - `y = 0` (Pad 0) -> Output: `Synth - Row: 2, Col: 0`\n     - `y = 1` (Pad 1) -> Output: `Synth - Row: 2, Col: 1`\n     - `y = 2` (Pad 2) -> Output: `Synth - Row: 2, Col: 2`\n\n### Critical Indentation Rules:\nIn Python, indentation defines which loop a line of code belongs to:\n- **Outer Loop (no indent)**: `for x in range(3):` starts at the far left.\n- **Inner Loop (4 spaces indented)**: `for y in range(3):` is nested inside `x`.\n- **Executable Code (8 spaces indented)**: `print(...)` sits inside both loops, so it needs 8 spaces (double indentation) to run correctly.",
    example: "for r in range(2):\n    for c in range(2):\n        print(f\"Bank {r}, Pad {c}\")",
    task: "### YOUR MISSION\n\nCalibrate a **3x3 launchpad array**. Use nested loops with `range(3)` for `x` and `y`.\n\nInside the inner loop, `print` the calibrated pad nodes in this exact format: `f\"Synth - Row: {x}, Col: {y}\"`.\n\nMake sure your `print` is indented with 8 spaces!",
    baseCode: "# TODO: Program launchpad patterns\n",
    hints: [
      "The first (outer) loop starts with 'for x in range(3):' on line 1.",
      "The second (inner) loop 'for y in range(3):' must be on line 2, indented with 4 spaces.",
      "The print statement on line 3 must be indented with 8 spaces: print(f\"Synth - Row: {x}, Col: {y}\")"
    ],
    solution: "for x in range(3):\n    for y in range(3):\n        print(f\"Synth - Row: {x}, Col: {y}\")",
    solutionRegex: [/for\s+x/, /for\s+y/, /print/]
  },
  "loop-break-continue": {
    title: "Synth Override: High-Frequency Mute",
    headerPrefix: "MIXER_CONSOLE",
    missionPrefix: "MUTE_SEQUENCE",
    intro: "# DAW Engineering: Emergency Audio Breaks\n\nIf raw decibel levels spike and threaten to blow out your studio monitors, the mixing desk must instantly cut the signal. Python implements this using the `break` command.",
    technical: "### Master Fader Cutoff:\n- **Instant Kill**: Terminate play loops instantly when decibel alerts are triggered.\n- **Audio Protection**: Intercept feedback loops using structured block statements.",
    example: "for beat in range(10):\n    if beat == 5:\n        break\n    print(beat)",
    task: "### YOUR MISSION\n\nRun audio signals over `range(10)` decibel increments. If the peak level index `i` reaches exactly `7`, trigger an emergency `break` to protect speakers. Otherwise, `print` current index `i` using `print(i)`.",
    baseCode: "# TODO: Loop audio signals with overload safety\n",
    hints: [
      "Instate loop 'for i in range(10):'",
      "Formulate Peak warning 'if i == 7:'",
      "Trigger 'break' inside, then add print(i)"
    ],
    solution: "for i in range(10):\n    if i == 7:\n        break\n    print(i)",
    solutionRegex: [/for\s+i\s+in\s+range/, /if\s+i\s*==\s*7/, /break/, /print/]
  },
  "control-while": {
    title: "Amplifier Life: Subwoofer Decay",
    headerPrefix: "BASS_STATION",
    missionPrefix: "VOLT_DECAY",
    intro: "# Synthesizer Cycles: While Loops\n\nWhile `for` loops iterate over a specific sequence, `while` loops keep running **as long as a condition remains True**. Use this to monitor portable amplifier battery power during a live street synth show.",
    task: "### YOUR MISSION\n\n1. `battery` starts at `100`.\n2. While `battery > 0`, subtract `20` from `battery` to power the subwoofer.\n3. `print` the current `battery` level inside the loop."
  },
  "functions-intro": {
    headerPrefix: "SYNTH_PATCH",
    missionPrefix: "TRIGGER_NOTE",
    intro: "# MIDI Automation: Functions\n\nDon't trigger every synthesizer note or pad manually! Create a reusable Python function to trigger a sound sample on any designated MIDI channel automatically.",
    task: "Write a function `play_sample(pad_id)` that prints `f'Playing sample on pad {pad_id}...'`. Call it.",
    baseCode: "# TODO: Define playback function\n",
    solution: "def play_sample(pad_id):\n    print(f'Playing sample on pad {pad_id}...')\n\nplay_sample('A7')",
    solutionRegex: [/def\s+play_sample/, /play_sample\s*\(/]
  },
  "functions-recursion": {
    headerPrefix: "ECHO_CHAMBER",
    missionPrefix: "DELAY_RECURS",
    intro: "# Tape Delay: Recursion\n\nTo build a rich tape echo effect, write a recursive feedback loop that prints the echo volume at depth `feedback` and calls itself recursively with reduced gain until it fades to silence.",
    task: "Write a recursive function `trigger_echo(feedback)` that prints the feedback number and calls itself with `feedback-1` until it reaches `0`.",
    baseCode: "# TODO: Feed tape delay loops\n",
    solution: "def trigger_echo(feedback):\n    print(feedback)\n    if feedback > 0:\n        trigger_echo(feedback - 1)\n\ntrigger_echo(5)",
    solutionRegex: [/def\s+trigger_echo/, /trigger_echo\s*\(\s*feedback\s*-\s*1\s*\)/]
  },
  "oop-intro": {
    headerPrefix: "MUSIC_STUDIO",
    missionPrefix: "MEMBER_TEMPLATE",
    intro: "# Band Elements: Classes\n\nMusicians, instead of setting up individual variables for every band member's performance state from scratch, let's design a reusable structural blueprint. In Python, this template is known as a **Class**.",
    task: "### YOUR MISSION\n\nDefine a base class named `BandMember`. Use `pass` inside its block under proper indentation.",
    baseCode: "# TODO: Establish base class BandMember\n",
    hints: [
      "Use 'class BandMember:' followed by an indented 'pass'.",
      "Check your spelling and capitalization!"
    ],
    solution: "class BandMember:\n    pass",
    solutionRegex: [/class\s+BandMember/, /pass/]
  },
  "oop-init": {
    headerPrefix: "MEMBER_SIGN",
    missionPrefix: "STAGE_NAME",
    intro: "# Joining the Band: Constructors\n\nWhen a new musician joins the band, we want to catalog their stage name instantly! We can use Python's constructor method `__init__` to assign crucial properties automatically upon object initialization.",
    task: "### YOUR MISSION\n\nIn `BandMember`, define the constructor `__init__` which accepts `self` and a parameter `name`. Assign the value of `name` to `self.name`.",
    baseCode: "class BandMember:\n    # TODO: Add __init__ constructor\n",
    hints: [
      "Use 'def __init__(self, name):' as the constructor name.",
      "Assign it inside the body: self.name = name"
    ],
    solution: "class BandMember:\n    def __init__(self, name):\n        self.name = name",
    solutionRegex: [/def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/, /self\.name\s*=\s*name/]
  },
  "oop-methods": {
    headerPrefix: "STAGE_PRACTICE",
    missionPrefix: "SOLO_TEST",
    intro: "# Spotlights & Solos: Methods\n\nA band member needs actions to rock out on stage. In Object-Oriented Programming, functions defined inside a class are called **Methods**. Let's write a method to let our members lay down a solo!",
    task: "### YOUR MISSION\n\nAdd a `play_solo` method to `BandMember` that `print`s \"Playing solo\".",
    baseCode: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Define play_solo method\n",
    hints: [
      "Write 'def play_solo(self):' and indent it inside the class layout.",
      "Print 'Playing solo' inside the system block."
    ],
    solution: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n    def play_solo(self):\n        print(\"Playing solo\")",
    solutionRegex: [/def\s+play_solo\s*\(\s*self\s*\)\s*:/, /print\s*\(\s*['"]Playing solo['"]\s*\)/]
  },
  "oop-state": {
    headerPrefix: "GIG_PREP",
    missionPrefix: "STATUS_CHECK",
    intro: "# Powering the Performance: Independent Object State\n\nEvery musician has their own energy levels and performance state. Changing the backing singer's performance status shouldn't override the drummer's focus. Each class instance manages its state variables independently.",
    task: "### YOUR MISSION\n\n1. Add a `performance_state` variable in `__init__` defaulted to the string \"Standby\".\n2. Create a method `start_gig` that updates `self.performance_state` to \"Active\".",
    baseCode: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n        # TODO: Add performance_state default\n    # TODO: Add start_gig method\n",
    hints: [
      "Add 'self.performance_state = \"Standby\"' inside the constructor.",
      "In start_gig, update 'self.performance_state = \"Active\"'."
    ],
    solution: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n        self.performance_state = \"Standby\"\n    def start_gig(self):\n        self.performance_state = \"Active\"",
    solutionRegex: [/self\.performance_state\s*=\s*['"]Standby['"]/, /def\s+start_gig/, /self\.performance_state\s*=\s*['"]Active['"]/]
  },
  "oop-interaction": {
    headerPrefix: "JAM_SESSION",
    missionPrefix: "JAM_LINK",
    intro: "# Dynamic Harmonies: Object Interaction\n\nMusic is a collective art form! Objects can interact by receiving other instances of a class as method parameters. Let's enable band members to coordinate jam lines with each other.",
    task: "### YOUR MISSION\n\nAdd a `jam_with` method to `BandMember` that accepts `other` as its parameter. It should `print` the formatted message: `f\"Jamming with: {other.name}\"`.",
    baseCode: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add jam_with method\n",
    hints: [
      "The jam_with(self, other) signature accepts 'other' as its second parameter.",
      "Access other's name using other.name inside an f-string."
    ],
    solution: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n    def jam_with(self, other):\n        print(f\"Jamming with: {other.name}\")",
    solutionRegex: [/def\s+jam_with\s*\(\s*self\s*,\s*other\s*\)\s*:/, /other\.name/]
  },
  "oop-inheritance": {
    headerPrefix: "BAND_UPGRADE",
    missionPrefix: "LEAD_SOLO",
    intro: "# Specialized Stage Roles: Inheritance\n\nA Lead Guitarist is a band member, but they get special spotlight tricks—like ripping high-speed guitar riffs! We can inherit general characteristics and build a specialized `LeadGuitarist` subclass.",
    task: "### YOUR MISSION\n\nCreate a class `LeadGuitarist` that inherits from `BandMember`. Give it a `shred` method that `print`s \"Guitar solo active\".",
    baseCode: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n# TODO: Create LeadGuitarist subclass inheriting from BandMember\n",
    hints: [
      "Use 'class LeadGuitarist(BandMember):' to set up inheritance.",
      "Define 'def shred(self):' and print the required guitar solo text."
    ],
    solution: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n\nclass LeadGuitarist(BandMember):\n    def shred(self):\n        print(\"Guitar solo active\")",
    solutionRegex: [/class\s+LeadGuitarist\s*\(\s*BandMember\s*\)\s*:/, /def\s+shred/, /print\s*\(\s*['"]Guitar solo active['"]\s*\)/]
  },
  "oop-str": {
    headerPrefix: "ROSTER_READOUT",
    missionPrefix: "REPRESENT_STR",
    intro: "# Album Credits: Custom Str representation\n\nWhen we print a band member object directly, Python throws a confusing raw pointer key. Let's override the special `__str__` method to print a readable stage credit representation instead.",
    task: "### YOUR MISSION\n\nIn `BandMember`, add the standard double-underscore method `__str__` that returns: `f\"Band Member {self.name}\"`.",
    baseCode: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n    # TODO: Add __str__ method\n",
    hints: [
      "Define __str__(self) block inside BandMember class.",
      "Return the required f-string format rather than printing it."
    ],
    solution: "class BandMember:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f\"Band Member {self.name}\"",
    solutionRegex: [/def\s+__str__/, /return\s+f['"].*Band Member.*self\.name.*['"]/]
  },
  "oop-class-vars": {
    headerPrefix: "RECORD_LABEL",
    missionPrefix: "GENRE_CONST",
    intro: "# Universal Band Genres: Class Variables\n\nEach musician has unique roles, names and energy states on stage, but they *all* play for the same band under the same record label guidelines. We can use a Class Variable to store shared constants that apply to all instances globally.",
    task: "### YOUR MISSION\n\n1. Define a class variable `genre` set to \"Rock\" inside the `BandMember` class structure.\n2. `print` the class variable using `BandMember.genre`.",
    baseCode: "class BandMember:\n    # TODO: Define class variable 'genre'\n    pass\n# TODO: Print BandMember.genre\n",
    hints: [
      "Add 'genre = \"Rock\"' immediately under the class declaration.",
      "Call print(BandMember.genre) outside the class block directly."
    ],
    solution: "class BandMember:\n    genre = \"Rock\"\n\nprint(BandMember.genre)",
    solutionRegex: [/genre\s*=\s*['"]Rock['"]/, /print\s*\(\s*BandMember\.genre\s*\)/]
  }
};