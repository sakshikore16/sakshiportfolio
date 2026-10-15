// Web Audio API Synthesizer with realistic physical sound effects (Optimized Volume & Clarity)
let audioCtx = null;
let soundEnabled = true;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) playPop();
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;

export const playPop = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
};

export const playClick = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {}
};

// Realistic Lamp Pull-Chain / Switch Click (Punchy)
export const playLampSwitch = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Mechanical click snap
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(1400, now);
    osc1.frequency.exponentialRampToValueAtTime(350, now + 0.04);
    gain1.gain.setValueAtTime(0.22, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    // Resonant ring
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2200, now + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(1400, now + 0.1);
    gain2.gain.setValueAtTime(0.14, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.02);
    osc2.stop(now + 0.1);
  } catch (e) {}
};

// Realistic Wooden Drawer Glide & Opening Slide (Deep, Rich, Smooth Scandinavian Wood on Wood)
export const playDrawerOpen = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Wooden runner friction slide (Distinct warm woody rasp)
    const bufferSize = Math.floor(ctx.sampleRate * 0.26);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const woodFilter = ctx.createBiquadFilter();
    woodFilter.type = 'bandpass';
    woodFilter.frequency.setValueAtTime(550, now);
    woodFilter.frequency.linearRampToValueAtTime(820, now + 0.1);
    woodFilter.frequency.exponentialRampToValueAtTime(400, now + 0.25);
    woodFilter.Q.setValueAtTime(3.2, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, now);
    noiseGain.gain.linearRampToValueAtTime(0.24, now + 0.06);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    noise.connect(woodFilter);
    woodFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.25);

    // 2. Tonal slide glide
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(185, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(85, now + 0.24);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.24);

    // 3. Subtle brass handle clink
    const brassOsc = ctx.createOscillator();
    const brassGain = ctx.createGain();
    brassOsc.type = 'sine';
    brassOsc.frequency.setValueAtTime(1950, now + 0.02);
    brassOsc.frequency.exponentialRampToValueAtTime(1450, now + 0.14);
    brassGain.gain.setValueAtTime(0.07, now + 0.02);
    brassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    brassOsc.connect(brassGain);
    brassGain.connect(ctx.destination);
    brassOsc.start(now + 0.02);
    brassOsc.stop(now + 0.14);

    // 4. Soft drawer catch stop
    const stopOsc = ctx.createOscillator();
    const stopGain = ctx.createGain();
    stopOsc.type = 'sine';
    stopOsc.frequency.setValueAtTime(110, now + 0.18);
    stopOsc.frequency.exponentialRampToValueAtTime(45, now + 0.32);
    stopGain.gain.setValueAtTime(0.22, now + 0.18);
    stopGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    stopOsc.connect(stopGain);
    stopGain.connect(ctx.destination);
    stopOsc.start(now + 0.18);
    stopOsc.stop(now + 0.32);
  } catch (e) {}
};

// Realistic Leather Hardbound Book Opening Sound (Tactile Spine Creak, Paper Flutter & Woody Resonance)
export const playBookOpen = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Spine Leather / Binding Creak
    const spineOsc = ctx.createOscillator();
    const spineGain = ctx.createGain();
    spineOsc.type = 'sawtooth';
    spineOsc.frequency.setValueAtTime(140, now);
    spineOsc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
    spineOsc.frequency.exponentialRampToValueAtTime(110, now + 0.22);
    
    const spineFilter = ctx.createBiquadFilter();
    spineFilter.type = 'lowpass';
    spineFilter.frequency.setValueAtTime(450, now);
    spineFilter.frequency.exponentialRampToValueAtTime(650, now + 0.1);
    spineFilter.frequency.exponentialRampToValueAtTime(300, now + 0.22);

    spineGain.gain.setValueAtTime(0.01, now);
    spineGain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    spineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    spineOsc.connect(spineFilter);
    spineFilter.connect(spineGain);
    spineGain.connect(ctx.destination);
    spineOsc.start(now);
    spineOsc.stop(now + 0.22);

    // 2. Paper leaves parting (Crisp Multi-leaf parchment flutter)
    const bufferSize = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.14));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const paperFilter = ctx.createBiquadFilter();
    paperFilter.type = 'bandpass';
    paperFilter.frequency.setValueAtTime(1800, now + 0.03);
    paperFilter.frequency.exponentialRampToValueAtTime(3400, now + 0.12);
    paperFilter.frequency.exponentialRampToValueAtTime(950, now + 0.32);
    paperFilter.Q.setValueAtTime(2.5, now);

    const paperGain = ctx.createGain();
    paperGain.gain.setValueAtTime(0.01, now + 0.03);
    paperGain.gain.linearRampToValueAtTime(0.35, now + 0.08);
    paperGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(paperFilter);
    paperFilter.connect(paperGain);
    paperGain.connect(ctx.destination);
    noise.start(now + 0.03);
    noise.stop(now + 0.35);

    // 3. Desk wood resonance (Book cover resting on wood desk)
    const deskOsc = ctx.createOscillator();
    const deskGain = ctx.createGain();
    deskOsc.type = 'sine';
    deskOsc.frequency.setValueAtTime(120, now + 0.15);
    deskOsc.frequency.exponentialRampToValueAtTime(45, now + 0.3);
    deskGain.gain.setValueAtTime(0.16, now + 0.15);
    deskGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    deskOsc.connect(deskGain);
    deskGain.connect(ctx.destination);
    deskOsc.start(now + 0.15);
    deskOsc.stop(now + 0.3);
  } catch (e) {}
};

// Realistic Book Closing Sound (Soft Hardcover Clasp & Paper Air Hush)
export const playBookClose = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Hardcover impact
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.14);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);

    // Air hush
    const bufferSize = Math.floor(ctx.sampleRate * 0.18);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.07));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(250, now + 0.18);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.18);
  } catch (e) {}
};

// Realistic Page Turn / Book Flip Sound (Audible Paper Rustle, Friction & Whoosh)
export const playPageFlipSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Physical paper friction noise burst
    const bufferSize = Math.floor(ctx.sampleRate * 0.28);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter to sculpt tactile paper texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(2800, now + 0.08);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.26);
    filter.Q.setValueAtTime(2.2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.32, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.26);

    // 2. Paper arch whoosh resonance
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.07);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.22);
    oscGain.gain.setValueAtTime(0.08, now);
    oscGain.gain.linearRampToValueAtTime(0.14, now + 0.05);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {}
};

export const playBookFlip = playPageFlipSound;

// Crisp Stem Pluck Snap & Bell Resonance
export const playPluck = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Crisp stem pluck snap
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.09);
    gain1.gain.setValueAtTime(0.26, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.09);

    // Harmonic chime note
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.5, now + 0.04); // C6
    gain2.gain.setValueAtTime(0.16, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.32);
  } catch (e) {}
};

// Chime for Flower Bloom & Particle Sparks
export const playBloomChime = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const start = now + idx * 0.05;
      osc.frequency.setValueAtTime(f, start);
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.4);
    });
  } catch (e) {}
};

// Fruit Dropping Plop / Bounce Sound
export const playFruitDrop = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(650, now);
    osc1.frequency.exponentialRampToValueAtTime(220, now + 0.12);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);
  } catch (e) {}
};

// Realistic Vintage Mailbox Drop (Paper Letter Slot Slip + Metallic Flap Clatter + Flag Click)
export const playMailboxDrop = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Postcard sliding through metal slot (Paper whoosh)
    const bufferSize = Math.floor(ctx.sampleRate * 0.16);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const slotFilter = ctx.createBiquadFilter();
    slotFilter.type = 'bandpass';
    slotFilter.frequency.setValueAtTime(2200, now);
    slotFilter.frequency.exponentialRampToValueAtTime(1100, now + 0.14);
    slotFilter.Q.setValueAtTime(2.8, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.linearRampToValueAtTime(0.28, now + 0.03);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    noise.connect(slotFilter);
    slotFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.14);

    // 2. Metal letterbox flap clink (Realistic spring flap sound)
    const flapOsc1 = ctx.createOscillator();
    const flapGain1 = ctx.createGain();
    flapOsc1.type = 'square';
    flapOsc1.frequency.setValueAtTime(1800, now + 0.06);
    flapOsc1.frequency.exponentialRampToValueAtTime(520, now + 0.18);
    flapGain1.gain.setValueAtTime(0.18, now + 0.06);
    flapGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    flapOsc1.connect(flapGain1);
    flapGain1.connect(ctx.destination);
    flapOsc1.start(now + 0.06);
    flapOsc1.stop(now + 0.18);

    // 3. Mailbox interior metallic thud (letter landing inside box)
    const boxOsc = ctx.createOscillator();
    const boxGain = ctx.createGain();
    boxOsc.type = 'triangle';
    boxOsc.frequency.setValueAtTime(240, now + 0.1);
    boxOsc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
    boxGain.gain.setValueAtTime(0.25, now + 0.1);
    boxGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    boxOsc.connect(boxGain);
    boxGain.connect(ctx.destination);
    boxOsc.start(now + 0.1);
    boxOsc.stop(now + 0.25);

    // 4. Red mail flag spring flip-up tick
    const flagOsc = ctx.createOscillator();
    const flagGain = ctx.createGain();
    flagOsc.type = 'sine';
    flagOsc.frequency.setValueAtTime(1450, now + 0.16);
    flagOsc.frequency.exponentialRampToValueAtTime(900, now + 0.24);
    flagGain.gain.setValueAtTime(0.15, now + 0.16);
    flagGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    flagOsc.connect(flagGain);
    flagGain.connect(ctx.destination);
    flagOsc.start(now + 0.16);
    flagOsc.stop(now + 0.24);
  } catch (e) {}
};

export const playSticker = () => {
  playPop();
};

export const playSuccess = () => {
  playBloomChime();
};

// Realistic High-Five Hand Slap Sound (Crisp physical clap with resonance)
export const playHighFiveSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Quick hand skin impact (mid snap)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(650, now);
    osc1.frequency.exponentialRampToValueAtTime(140, now + 0.07);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.07);

    // High crisp clap snap
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1400, now);
    osc2.frequency.exponentialRampToValueAtTime(320, now + 0.04);
    gain2.gain.setValueAtTime(0.22, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.04);

    // Warm palm thud
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(240, now + 0.01);
    osc3.frequency.exponentialRampToValueAtTime(70, now + 0.14);
    gain3.gain.setValueAtTime(0.25, now + 0.01);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(now + 0.01);
    osc3.stop(now + 0.14);
  } catch (e) {}
};

// Uplifting cheering fanfare chord for Cheer Work
export const playCheerSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Celebratory ascending fanfare chord: C5, E5, G5, C6 with warm bloom
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const start = now + idx * 0.05;
      osc.frequency.setValueAtTime(f, start);
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.42);
    });
  } catch (e) {}
};
