// Tiny sound engine built on the Web Audio API — no audio files to load.
// The AudioContext is created lazily on the first call, since browsers
// block audio until a user gesture has happened.

let ctx = null;
const getCtx = () => (ctx ??= new (window.AudioContext || window.webkitAudioContext)());

function tone(freq, start, dur, type = "sine", gain = 0.18) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + start);
  g.gain.setValueAtTime(0, c.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + dur + 0.05);
}

export const sound = {
  click: () => tone(520, 0, 0.08, "triangle", 0.12),
  correct: () => { tone(523, 0, 0.12, "sine"); tone(659, 0.1, 0.12, "sine"); tone(784, 0.2, 0.22, "sine"); },
  wrong: () => { tone(220, 0, 0.18, "sawtooth", 0.1); tone(180, 0.12, 0.22, "sawtooth", 0.1); },
  hint: () => { tone(660, 0, 0.08, "sine", 0.1); tone(880, 0.09, 0.1, "sine", 0.1); },
  unlock: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.2, "triangle", 0.14)); },
  fail: () => { tone(392, 0, 0.2, "sawtooth", 0.1); tone(330, 0.15, 0.2, "sawtooth", 0.1); tone(262, 0.3, 0.3, "sawtooth", 0.1); },
};
