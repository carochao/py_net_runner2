/**
 * Procedural Synthesizer & Sound FX Engine for CyberCoder
 * Employs Web Audio API to generate custom synthesized sound effects and 
 * looping background synth tracks on-the-fly without requiring network assets.
 */

class SoundService {
  private audioCtx: AudioContext | null = null;
  private ambientOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private ambientTimer: any = null;
  private currentAmbientPack: string | null = null;
  private isAmbencePlaying: boolean = false;
  private masterVolume: number = 0.35; // default volume for safety

  private initCtx(): AudioContext | null {
    if (this.audioCtx) return this.audioCtx;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
        return this.audioCtx;
      }
    } catch (e) {
      console.warn("SoundService: Web Audio API not supported", e);
    }
    return null;
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
  }

  public playSuccess(packId: string) {
    const ctx = this.initCtx();
    if (!ctx) return;
    
    // Resume context if suspended (browser security blocks autoplay)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;

    if (packId.includes('retro-arcade')) {
      // Classic 8-bit Coin Sound: short note at B5 (988Hz) then a longer note at E6 (1318Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc1.frequency.setValueAtTime(987.77, t);
      osc1.frequency.setValueAtTime(1318.51, t + 0.08);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(this.masterVolume * 0.4, t + 0.01);
      gain.gain.setValueAtTime(this.masterVolume * 0.4, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc1.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t);
      osc1.stop(t + 0.36);
    } 
    else if (packId.includes('cyberpunk-hud')) {
      // High-tech Dual Chirp + Confirm Tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      
      osc1.frequency.setValueAtTime(1200, t);
      osc1.frequency.setValueAtTime(1600, t + 0.06);
      osc2.frequency.setValueAtTime(1800, t);
      osc2.frequency.setValueAtTime(2400, t + 0.06);

      // Chirp twice
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(this.masterVolume * 0.35, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      gain.gain.linearRampToValueAtTime(this.masterVolume * 0.35, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.16);
      osc2.stop(t + 0.16);
    } 
    else if (packId.includes('anime-meme')) {
      // Magic Upward Twinkle / Arpeggio Chime
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);

        gain.gain.setValueAtTime(0, t + idx * 0.05);
        gain.gain.linearRampToValueAtTime(this.masterVolume * 0.3, t + idx * 0.05 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.26);
      });
    }
  }

  public playError(packId: string) {
    const ctx = this.initCtx();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;

    if (packId.includes('retro-arcade')) {
      // Retro 8-bit Explosion/Downward slide
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.4);

      // Low pass filter to make it crunchier and less harsh
      const biquad = ctx.createBiquadFilter();
      biquad.type = 'lowpass';
      biquad.frequency.setValueAtTime(600, t);

      gain.gain.setValueAtTime(this.masterVolume * 0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

      osc.connect(biquad);
      biquad.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.43);
    } 
    else if (packId.includes('cyberpunk-hud')) {
      // Tactical glitch static crackle
      const osc = ctx.createOscillator();
      const mod = ctx.createOscillator();
      const modGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      
      mod.type = 'square';
      mod.frequency.setValueAtTime(65, t); // rapid modulation
      modGain.gain.setValueAtTime(150, t);

      gain.gain.setValueAtTime(this.masterVolume * 0.45, t);
      gain.gain.linearRampToValueAtTime(this.masterVolume * 0.45, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      mod.connect(modGain);
      modGain.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(ctx.destination);

      mod.start(t);
      osc.start(t);
      mod.stop(t + 0.31);
      osc.stop(t + 0.31);
    } 
    else if (packId.includes('anime-meme')) {
      // Humorous slide-down spring / sigh slide ("boeeeeng")
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.5);

      // Subtle vibrato (wobble)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(14, t);
      lfoGain.gain.setValueAtTime(15, t);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(this.masterVolume * 0.5, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.52);

      osc.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(t);
      osc.start(t);
      lfo.stop(t + 0.53);
      osc.stop(t + 0.53);
    }
  }

  public playMenuSelect() {
    const ctx = this.initCtx();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(1800, t + 0.04);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.12, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  /**
   * Schedules continuing background beats programmatically for ultimate neon ambiance
   */
  public startAmbientTracks(packId: string) {
    const ctx = this.initCtx();
    if (!ctx) return;

    this.stopAmbientTracks();
    this.isAmbencePlaying = true;
    this.currentAmbientPack = packId;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    let beatCounter = 0;
    const bpm = 110;
    const intervalMs = (60 / bpm) * 500; // half-beat scheduling intervals (~272ms)

    const scheduleNextBeat = () => {
      if (!this.isAmbencePlaying) return;
      const t = ctx.currentTime;

      try {
        if (packId.includes('retro-arcade')) {
          // Retro 8-bit chip-tune chord/bassline loop
          // Patterns: A2 (110Hz), C3 (130.81Hz), E3 (164.81Hz), G3 (196Hz)
          const baseIdx = Math.floor(beatCounter / 4) % 4;
          const rootNotes = [110.00, 130.81, 146.83, 196.00]; // A2, C3, D3, G3
          const frequency = rootNotes[baseIdx];

          // Bass voice on beat 1 and 3
          if (beatCounter % 2 === 0) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(frequency, t);
            
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.15, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(t);
            osc.stop(t + 0.24);
          }

          // Arpeggio beep on every step
          const arpNotes = [frequency, frequency * 1.25, frequency * 1.5, frequency * 1.875];
          const arpFreq = arpNotes[beatCounter % 4];

          const arpOsc = ctx.createOscillator();
          const arpGain = ctx.createGain();

          arpOsc.type = 'square';
          arpOsc.frequency.setValueAtTime(arpFreq, t);

          arpGain.gain.setValueAtTime(0, t);
          arpGain.gain.linearRampToValueAtTime(this.masterVolume * 0.022, t + 0.01);
          arpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

          arpOsc.connect(arpGain);
          arpGain.connect(ctx.destination);

          arpOsc.start(t);
          arpOsc.stop(t + 0.1);
        } 
        else if (packId.includes('cyberpunk-hud')) {
          // Deep immersive pulsing industrial sub-bass + noise hiss marker
          const notes = [55.00, 55.00, 65.41, 73.42]; // A1, A1, C2, D2
          const frequency = notes[Math.floor(beatCounter / 4) % 4];

          // Pulsing Sub bass
          if (beatCounter % 2 === 0) {
            const bosc = ctx.createOscillator();
            const bgain = ctx.createGain();

            bosc.type = 'sawtooth';
            bosc.frequency.setValueAtTime(frequency, t);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(140, t);

            bgain.gain.setValueAtTime(0, t);
            bgain.gain.linearRampToValueAtTime(this.masterVolume * 0.28, t + 0.04);
            bgain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

            bosc.connect(filter);
            filter.connect(bgain);
            bgain.connect(ctx.destination);

            bosc.start(t);
            bosc.stop(t + 0.26);
          }

          // Cyberpunk sweep static hihat marker on offbeats
          if (beatCounter % 2 === 1) {
            // Synthesize pseudo-white noise using a high-frequency FM carrier or highpass filtered saw wave
            const hn = ctx.createOscillator();
            const hgain = ctx.createGain();
            const hfilter = ctx.createBiquadFilter();

            hn.type = 'sawtooth';
            hn.frequency.setValueAtTime(8000, t); // high frequency screech

            hfilter.type = 'bandpass';
            hfilter.frequency.setValueAtTime(12000, t);
            hfilter.Q.setValueAtTime(4, t);

            hgain.gain.setValueAtTime(0, t);
            hgain.gain.linearRampToValueAtTime(this.masterVolume * 0.015, t + 0.01);
            hgain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

            hn.connect(hfilter);
            hfilter.connect(hgain);
            hgain.connect(ctx.destination);

            hn.start(t);
            hn.stop(t + 0.06);
          }
        } 
        else if (packId.includes('anime-meme')) {
          // Upbeat Chibi Playful Jazz Lofi Pad
          // 4/4 clean lofi arpeggiating chord progressions
          // AMaj7 (110, 138, 164, 207), DMaj7 (146, 185, 220, 277)
          const progression = [
            [220.00, 277.18, 329.63, 415.30], // AMaj7
            [293.66, 369.99, 440.00, 554.37], // DMaj7
            [261.63, 329.63, 392.00, 493.88], // CMaj7
            [196.00, 246.94, 293.66, 392.00]  // GMaj7
          ];

          const chordIdx = Math.floor(beatCounter / 4) % 4;
          const chord = progression[chordIdx];
          const noteIndex = beatCounter % 4;
          const freq = chord[noteIndex];

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(this.masterVolume * 0.15, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 0.24);

          // Add a cute little triangle chirp on step 0
          if (noteIndex === 0) {
            const cuteC = ctx.createOscillator();
            const cuteG = ctx.createGain();

            cuteC.type = 'triangle';
            cuteC.frequency.setValueAtTime(freq * 2, t);

            cuteG.gain.setValueAtTime(0, t);
            cuteG.gain.linearRampToValueAtTime(this.masterVolume * 0.08, t + 0.02);
            cuteG.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

            cuteC.connect(cuteG);
            cuteG.connect(ctx.destination);
            
            cuteC.start(t);
            cuteC.stop(t + 0.11);
          }
        }
      } catch (err) {
        console.warn("Scheduler audio err:", err);
      }

      beatCounter++;
      this.ambientTimer = setTimeout(scheduleNextBeat, intervalMs);
    };

    scheduleNextBeat();
  }

  public stopAmbientTracks() {
    this.isAmbencePlaying = false;
    this.currentAmbientPack = null;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isAmbencePlaying;
  }

  public getPlayingPackId(): string | null {
    return this.currentAmbientPack;
  }
}

export const soundService = new SoundService();
