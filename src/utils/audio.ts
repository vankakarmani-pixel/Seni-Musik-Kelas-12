class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private bgmInterval: number | null = null;
  public isBgmPlaying: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 8-bit Select/Blip sound
  public playSelect() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted before user interaction
    }
  }

  // Pokémon Super Effective / Attack Slash Hit
  public playAttackHit() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Square wave zap
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);

      // Noise burst for physical impact crunch
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.18);
    } catch {
      // ignore
    }
  }

  // Wrong answer buzzer
  public playWrongBuzzer() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.setValueAtTime(110, now + 0.15);

      osc2.frequency.setValueAtTime(146, now); // dissonance
      osc2.frequency.setValueAtTime(116, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch {
      // ignore
    }
  }

  // Victory Fanfare
  public playVictoryFanfare() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 523.25, 659.25];
      const durations = [0.12, 0.12, 0.12, 0.25, 0.12, 0.15, 0.45];
      let t = this.ctx.currentTime + 0.05;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const dur = durations[idx];

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + dur);

        t += dur + 0.02;
      });
    } catch {
      // ignore
    }
  }

  // Battle start fanfare
  public playBattleIntro() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [196, 261.63, 329.63, 392, 523.25];
      let t = this.ctx.currentTime;
      notes.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
        t += 0.08;
      });
    } catch {
      // ignore
    }
  }

  public currentRegionId: number = 1;

  // 8-bit ambient chiptune battle music with 4 unique region themes
  public startBattleBgm(regionId: number = 1) {
    if (this.isMuted) return;
    
    // If already playing the exact same region, return
    if (this.isBgmPlaying && this.currentRegionId === regionId && this.bgmInterval !== null) {
      return;
    }

    this.stopBattleBgm();
    this.currentRegionId = regionId;
    this.isBgmPlaying = true;
    this.init();

    // Define 4 completely distinct musical themes
    let tempoMs = 175;
    let bassLine: number[] = [];
    let melodyLine: number[] = [];
    let bassWave: OscillatorType = 'triangle';
    let leadWave: OscillatorType = 'square';
    let bassGain = 0.04;
    let leadGain = 0.025;
    let noteDuration = 0.16;

    if (regionId === 1) {
      // REGION 1: Lembah Anatomi Musik (Sonovorus)
      // Upbeat classic 8-bit adventure in C Major with bouncy walking bass
      tempoMs = 165;
      bassWave = 'triangle';
      leadWave = 'square';
      bassGain = 0.045;
      leadGain = 0.025;
      noteDuration = 0.15;
      bassLine = [130.81, 130.81, 98.00, 130.81, 164.81, 196.00, 174.61, 196.00, 130.81, 164.81, 196.00, 261.63, 246.94, 220.00, 196.00, 98.00];
      melodyLine = [523.25, 659.25, 783.99, 659.25, 698.46, 587.33, 659.25, 523.25, 440.00, 523.25, 587.33, 392.00, 659.25, 587.33, 523.25, 0];
    } else if (regionId === 2) {
      // REGION 2: Kota Mosaik Nusantara (Gamelagont)
      // Majestic Gamelan Slendro/Pelog chime aesthetic with deep bronze gong resonance
      tempoMs = 210;
      bassWave = 'sine';
      leadWave = 'triangle';
      bassGain = 0.06;
      leadGain = 0.04;
      noteDuration = 0.24;
      bassLine = [73.42, 0, 110.00, 0, 87.31, 0, 98.00, 73.42, 73.42, 0, 110.00, 0, 87.31, 0, 98.00, 146.83];
      melodyLine = [293.66, 349.23, 392.00, 440.00, 523.25, 440.00, 392.00, 349.23, 587.33, 523.25, 440.00, 349.23, 392.00, 440.00, 293.66, 0];
    } else if (regionId === 3) {
      // REGION 3: Hutan Eksplorasi Bunyi (Hornbostilion)
      // Swift acoustic nature wood-marimba arpeggios & staccato clicks
      tempoMs = 135;
      bassWave = 'triangle';
      leadWave = 'triangle';
      bassGain = 0.04;
      leadGain = 0.035;
      noteDuration = 0.11;
      bassLine = [98.00, 146.83, 98.00, 123.47, 130.81, 98.00, 146.83, 98.00, 110.00, 146.83, 110.00, 130.81, 146.83, 110.00, 98.00, 146.83];
      melodyLine = [392.00, 493.88, 587.33, 783.99, 739.99, 587.33, 659.25, 523.25, 587.33, 493.88, 523.25, 440.00, 493.88, 392.00, 440.00, 293.66];
    } else {
      // REGION 4: Studio Akustik & Teknik (Cajonirath)
      // Driving rock/funk syncopated rhythm, sharp sawtooth groove, high energy
      tempoMs = 130;
      bassWave = 'sawtooth';
      leadWave = 'square';
      bassGain = 0.035;
      leadGain = 0.025;
      noteDuration = 0.12;
      bassLine = [82.41, 82.41, 98.00, 110.00, 123.47, 146.83, 123.47, 110.00, 82.41, 82.41, 110.00, 123.47, 146.83, 164.81, 146.83, 110.00];
      melodyLine = [329.63, 392.00, 440.00, 466.16, 493.88, 587.33, 659.25, 0, 587.33, 493.88, 440.00, 392.00, 329.63, 0, 392.00, 440.00];
    }

    let step = 0;

    this.bgmInterval = window.setInterval(() => {
      if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const bFreq = bassLine[step % bassLine.length];
        const mFreq = melodyLine[step % melodyLine.length];

        // 1. Play Bass Note
        if (bFreq > 0) {
          const oscBass = this.ctx.createOscillator();
          const gainBass = this.ctx.createGain();

          oscBass.type = bassWave;
          oscBass.frequency.setValueAtTime(bFreq, now);

          gainBass.gain.setValueAtTime(bassGain, now);
          gainBass.gain.exponentialRampToValueAtTime(0.001, now + noteDuration);

          oscBass.connect(gainBass);
          gainBass.connect(this.ctx.destination);

          oscBass.start(now);
          oscBass.stop(now + noteDuration);
        }

        // 2. Play Lead Melody Note
        if (mFreq > 0) {
          const oscLead = this.ctx.createOscillator();
          const gainLead = this.ctx.createGain();

          oscLead.type = leadWave;
          oscLead.frequency.setValueAtTime(mFreq, now);

          gainLead.gain.setValueAtTime(leadGain, now);
          gainLead.gain.exponentialRampToValueAtTime(0.001, now + (noteDuration * 0.9));

          oscLead.connect(gainLead);
          gainLead.connect(this.ctx.destination);

          oscLead.start(now);
          oscLead.stop(now + noteDuration);
        }

        // 3. Region 4 Snare / Cajon click on 4th beat
        if (regionId === 4 && (step % 4 === 2)) {
          const oscClick = this.ctx.createOscillator();
          const gainClick = this.ctx.createGain();
          oscClick.type = 'sawtooth';
          oscClick.frequency.setValueAtTime(220, now);
          oscClick.frequency.exponentialRampToValueAtTime(40, now + 0.06);
          gainClick.gain.setValueAtTime(0.04, now);
          gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          oscClick.connect(gainClick);
          gainClick.connect(this.ctx.destination);
          oscClick.start(now);
          oscClick.stop(now + 0.06);
        }

        step++;
      } catch {
        // ignore
      }
    }, tempoMs);
  }

  public stopBattleBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBattleBgm();
    }
    return this.isMuted;
  }
}

export const sound = new RetroAudioEngine();
