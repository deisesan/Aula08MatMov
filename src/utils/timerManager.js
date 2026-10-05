import { sounds } from './audio';

// Persistent timer manager that survives slide changes and tab sync
class TimerManager {
  constructor() {
    this.timers = this.loadTimers();
    this.listeners = new Set();
    this.intervalId = null;
    this.channel = null;

    try {
      this.channel = new BroadcastChannel('timers_sync');
      this.channel.onmessage = (e) => {
        if (e.data?.type === 'TIMERS_UPDATED') {
          this.timers = e.data.timers;
          this.notify();
        }
      };
    } catch {}

    this.startTicker();
  }

  loadTimers() {
    try {
      const data = localStorage.getItem('antigravity_timers');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  saveTimers() {
    try {
      localStorage.setItem('antigravity_timers', JSON.stringify(this.timers));
      if (this.channel) {
        this.channel.postMessage({ type: 'TIMERS_UPDATED', timers: this.timers });
      }
    } catch {}
  }

  startTicker() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      let changed = false;
      const now = Date.now();

      Object.keys(this.timers).forEach((id) => {
        const timer = this.timers[id];
        if (timer.isRunning && timer.targetEndTime) {
          const remaining = Math.max(0, Math.round((timer.targetEndTime - now) / 1000));
          if (remaining !== timer.remainingSeconds) {
            timer.remainingSeconds = remaining;
            changed = true;
          }

          if (remaining <= 0) {
            timer.isRunning = false;
            timer.targetEndTime = null;
            changed = true;
            if (timer.type === 'alarm') {
              sounds.playAlarm();
            } else {
              sounds.playBell();
            }
          }
        }
      });

      if (changed) {
        this.saveTimers();
      }
      this.notify();
    }, 500);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.timers);
      } catch {}
    });
  }

  getTimer(id, defaultSeconds = 300, title = 'Temporizador', type = 'bell') {
    if (!this.timers[id]) {
      this.timers[id] = {
        id,
        title,
        type,
        totalSeconds: defaultSeconds,
        remainingSeconds: defaultSeconds,
        isRunning: false,
        targetEndTime: null,
      };
      this.saveTimers();
    }
    return this.timers[id];
  }

  start(id, defaultSeconds = 300, title = 'Temporizador', type = 'bell') {
    const timer = this.getTimer(id, defaultSeconds, title, type);
    if (!timer.isRunning) {
      const remaining = timer.remainingSeconds > 0 ? timer.remainingSeconds : timer.totalSeconds;
      timer.remainingSeconds = remaining;
      timer.targetEndTime = Date.now() + remaining * 1000;
      timer.isRunning = true;
      sounds.playTone(700, 'sine', 0.15);
      this.saveTimers();
      this.notify();
    }
  }

  pause(id) {
    const timer = this.timers[id];
    if (timer && timer.isRunning) {
      if (timer.targetEndTime) {
        timer.remainingSeconds = Math.max(0, Math.round((timer.targetEndTime - Date.now()) / 1000));
      }
      timer.isRunning = false;
      timer.targetEndTime = null;
      sounds.playTone(400, 'sine', 0.15);
      this.saveTimers();
      this.notify();
    }
  }

  toggle(id, defaultSeconds = 300, title = 'Temporizador', type = 'bell') {
    const timer = this.getTimer(id, defaultSeconds, title, type);
    if (timer.isRunning) {
      this.pause(id);
    } else {
      this.start(id, defaultSeconds, title, type);
    }
  }

  reset(id, defaultSeconds) {
    const timer = this.timers[id];
    const secs = defaultSeconds ?? (timer ? timer.totalSeconds : 300);
    this.timers[id] = {
      ...(timer || {}),
      id,
      totalSeconds: secs,
      remainingSeconds: secs,
      isRunning: false,
      targetEndTime: null,
    };
    sounds.playTone(500, 'sine', 0.15);
    this.saveTimers();
    this.notify();
  }

  addSeconds(id, seconds) {
    const timer = this.timers[id];
    if (timer) {
      timer.remainingSeconds = Math.max(0, timer.remainingSeconds + seconds);
      if (timer.isRunning) {
        timer.targetEndTime = Date.now() + timer.remainingSeconds * 1000;
      }
      sounds.playTone(800, 'sine', 0.1);
      this.saveTimers();
      this.notify();
    }
  }

  getActiveTimer() {
    const ids = Object.keys(this.timers);
    for (const id of ids) {
      if (this.timers[id]?.isRunning) {
        return this.timers[id];
      }
    }
    return null;
  }
}

export const timerManager = new TimerManager();
