// Web Audio API sound generator - 100% self-contained, no external mp3s needed

class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Audio might be blocked by browser policy until user interaction
    }
  }

  playSuccess() {
    this.playTone(523.25, 'triangle', 0.15, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.2, 0.2), 120); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.35, 0.25), 240); // G5
  }

  playChime() {
    this.playTone(880, 'sine', 0.4, 0.18);
    setTimeout(() => this.playTone(1174.66, 'sine', 0.6, 0.2), 150);
  }

  playBell() {
    this.playTone(440, 'sine', 0.8, 0.25);
    setTimeout(() => this.playTone(880, 'sine', 1.0, 0.2), 100);
  }

  playAlarm() {
    // 3 short pulsing beeps
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.playTone(800, 'square', 0.15, 0.1), i * 250);
    }
  }
}

export const sounds = new SoundEffects();
