/**
 * Motor de síntesis de percusión latina por software con Web Audio API.
 * Emula de forma nativa los instrumentos de salsa sin archivos de audio externos pesados.
 */

class LatinPercussionEngine {
  private ctx: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Clave Cubana (3-2) - Sonido de madera resonante
   */
  playClave(single = true) {
    const ctx = this.getAudioContext();

    const triggerWoodClick = (time: number, pitch = 2450) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(pitch, time);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(pitch * 1.18, time);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(pitch, time);
      filter.Q.setValueAtTime(8, time);

      gain.gain.setValueAtTime(1.0, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + 0.06);
      osc2.stop(time + 0.06);
    };

    const now = ctx.currentTime;
    if (single) {
      triggerWoodClick(now);
    } else {
      // Clave 3-2 tradicional (tresillo + dos)
      const beat = 0.28;
      // Compás 1 (Tresillo: 1, 1.5, 2.5)
      triggerWoodClick(now);
      triggerWoodClick(now + beat * 1.5);
      triggerWoodClick(now + beat * 3.0);
      // Compás 2 (Dos: 5, 6)
      triggerWoodClick(now + beat * 4.5);
      triggerWoodClick(now + beat * 6.0);
    }
  }

  /**
   * Campana / Cencerro (Bongo Bell / Mambo Bell)
   * Doble armónico metálico (587Hz y 845Hz)
   */
  playCampana(isHigh = false) {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    const baseFreq1 = isHigh ? 780 : 587;
    const baseFreq2 = isHigh ? 1120 : 845;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const bandpass = ctx.createBiquadFilter();

    osc1.type = 'square';
    osc1.frequency.setValueAtTime(baseFreq1, now);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(baseFreq2, now);

    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(baseFreq1 * 2.05, now);

    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(baseFreq2, now);
    bandpass.Q.setValueAtTime(10, now);

    gainNode.gain.setValueAtTime(0.85, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + (isHigh ? 0.12 : 0.25));

    osc1.connect(bandpass);
    osc2.connect(bandpass);
    osc3.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + 0.26);
    osc2.stop(now + 0.26);
    osc3.stop(now + 0.26);
  }

  /**
   * Güiro - Raspado rítmico característico
   */
  playGuiro(pattern = 'short') {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;
    const duration = pattern === 'long' ? 0.25 : 0.12;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Ruido blanco modulado para emular las ranuras de la calabaza
    const ridges = pattern === 'long' ? 8 : 4;
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const ridgeModulation = Math.sin(progress * Math.PI * ridges * 2);
      const noise = Math.random() * 2 - 1;
      data[i] = noise * Math.abs(ridgeModulation) * (1 - progress * 0.7);
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(4.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(now);
  }

  /**
   * DJ Air Horn - Drop de fiesta salsera
   */
  playAirHorn() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    // Tres frecuencias del acorde clásico de bocina: F5 (698.46Hz), G#5 (830.61Hz), C6 (1046.5Hz)
    const pitches = [698, 830, 1046];
    const bursts = [0, 0.12, 0.24, 0.45]; // Repetición rítmica estilo DJ

    bursts.forEach((offset, idx) => {
      const startTime = now + offset;
      const burstDuration = idx === 3 ? 0.55 : 0.09;

      pitches.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        // Pitch scoop hacia abajo al inicio
        osc.frequency.setValueAtTime(freq * 1.05, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq, startTime + 0.03);

        gain.gain.setValueAtTime(0.35, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + burstDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + burstDuration + 0.05);
      });
    });
  }

  /**
   * Grito ¡Azúcar! - Exclamación salsera
   */
  playAzucar() {
    // 1. Efecto sintetizado con modulación de formantes
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    // Acorde alegre de timbal / campana de celebración
    const chords = [523.25, 659.25, 783.99, 1046.5];
    chords.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    });

    // 2. Voz sintetizada en español con Web Speech API
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('¡Azúcar!');
      utterance.lang = 'es-CO';
      utterance.pitch = 1.6;
      utterance.rate = 1.35;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  /**
   * Conga Slap - Tumbao con decay rápido y chasquido de mano
   */
  playCongaSlap() {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    // Membrana del parche: barrido rápido de frecuencia
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.07);

    oscGain.gain.setValueAtTime(1.0, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);

    // Chasquido de la palma contra el cuero (slap)
    const bufferSize = ctx.sampleRate * 0.05;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1800, now);
    noiseFilter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.65, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
  }
}

export const percussionEngine = new LatinPercussionEngine();
