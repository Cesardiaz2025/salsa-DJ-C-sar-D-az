import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity,
  Play,
  Square,
  Sparkles,
  Volume2,
  Timer,
  RotateCcw,
} from 'lucide-react';
import { percussionEngine } from '../utils/audioSynth';
import { SalsaStyleCategory } from '../types';

export const DjCabinaSynth: React.FC = () => {
  // Estado de pads de percusión
  const [activePad, setActivePad] = useState<string | null>(null);

  // Estado del Metrónomo / Tap Tempo
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number>(105);
  const [isMetronomePlaying, setIsMetronomePlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [tapRipple, setTapRipple] = useState<boolean>(false);

  const metronomeIntervalRef = useRef<number | null>(null);

  // Determinar la categoría salsera según el BPM
  const getSalsaCategory = (val: number): { title: SalsaStyleCategory; color: string; desc: string } => {
    if (val < 85) {
      return {
        title: 'Tiempo Lento (Bolero / Cha-cha)',
        color: '#94A3B8',
        desc: 'Cadencia pausada ideal para bolero son, cha-cha-chá y figuras lentas.',
      };
    } else if (val <= 98) {
      return {
        title: 'Salsa Romántica',
        color: '#FFC107',
        desc: 'Tempo sensual y balanceado característico de la salsa de alcoba.',
      };
    } else if (val <= 108) {
      return {
        title: 'Salsa Clásica / Guaguancó',
        color: '#00E5FF',
        desc: 'El golpe rítmico dorado de Nueva York, Puerto Rico y Cali.',
      };
    } else if (val <= 122) {
      return {
        title: 'Salsa Brava / Dura 🔥',
        color: '#E91E63',
        desc: 'Descargas pesadas de trompeta y timbal para el bailador bravo.',
      };
    } else {
      return {
        title: 'Timba / Descarga Rápida ⚡',
        color: '#FF5722',
        desc: 'Velocidad máxima cubana, cortes sincopados y pura dinamita en la pista.',
      };
    }
  };

  const currentCategory = getSalsaCategory(bpm);

  // Manejador del botón TAP TEMPO
  const handleTap = useCallback(() => {
    const now = Date.now();
    setTapRipple(true);
    setTimeout(() => setTapRipple(false), 180);

    // Sonido sutil de clave al tocar tap
    percussionEngine.playClave(true);

    setTapTimes((prev) => {
      // Si el último tap fue hace más de 2.8 segundos, reiniciar la medición
      const recentTaps = prev.length > 0 && now - prev[prev.length - 1] > 2800 ? [now] : [...prev, now];

      // Mantener los últimos 6 taps para mayor precisión
      const sliceTaps = recentTaps.slice(-6);

      if (sliceTaps.length >= 2) {
        const intervals: number[] = [];
        for (let i = 1; i < sliceTaps.length; i++) {
          intervals.push(sliceTaps[i] - sliceTaps[i - 1]);
        }
        const avgInterval = intervals.reduce((acc, curr) => acc + curr, 0) / intervals.length;
        if (avgInterval > 0) {
          const calculatedBpm = Math.round(60000 / avgInterval);
          // Limitar a rango musical sensato (60 a 160 BPM)
          const clampedBpm = Math.max(60, Math.min(160, calculatedBpm));
          setBpm(clampedBpm);
        }
      }
      return sliceTaps;
    });
  }, []);

  // Metrónomo audible al tempo
  useEffect(() => {
    if (isMetronomePlaying) {
      const intervalMs = (60 / bpm) * 1000;
      let beat = 1;

      metronomeIntervalRef.current = window.setInterval(() => {
        setCurrentBeat(beat);
        // En salsa se cuenta en 8 tiempos (1-2-3-4, 5-6-7-8)
        // En los tiempos 1 y 5 acentuamos la campana alta; en los demás, campana baja o clave
        if (beat === 1 || beat === 5) {
          percussionEngine.playCampana(true);
        } else if (beat === 4 || beat === 8) {
          // Tiempo de pausa o paso sutil
          percussionEngine.playClave(true);
        } else {
          percussionEngine.playCampana(false);
        }

        beat = beat >= 8 ? 1 : beat + 1;
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      setCurrentBeat(1);
    }

    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, [isMetronomePlaying, bpm]);

  // Ejecución de percusiones
  const triggerInstrument = (id: string) => {
    setActivePad(id);
    setTimeout(() => setActivePad(null), 200);

    switch (id) {
      case 'clave':
        percussionEngine.playClave(false); // Reproduce el patrón 3-2 completo
        break;
      case 'campana':
        percussionEngine.playCampana(false);
        break;
      case 'guiro':
        percussionEngine.playGuiro('long');
        break;
      case 'airhorn':
        percussionEngine.playAirHorn();
        break;
      case 'azucar':
        percussionEngine.playAzucar();
        break;
      case 'conga':
        percussionEngine.playCongaSlap();
        break;
      default:
        break;
    }
  };

  const pads = [
    {
      id: 'clave',
      name: 'Clave 3-2',
      tag: 'Madera Tradicional',
      color: '#FFC107',
      desc: 'Patrón rítmico afrocaribeño 3-2',
    },
    {
      id: 'campana',
      name: 'Campana / Cencerro',
      tag: 'Armónico Metálico',
      color: '#E91E63',
      desc: 'Golpe mambo de bongosero',
    },
    {
      id: 'guiro',
      name: 'Güiro Raspado',
      tag: 'Textura Típica',
      color: '#00E5FF',
      desc: 'Calabaza ranurada al compás',
    },
    {
      id: 'conga',
      name: 'Conga Slap',
      tag: 'Tumbao Percusivo',
      color: '#25D366',
      desc: 'Chasquido seco de mano en parche',
    },
    {
      id: 'airhorn',
      name: 'DJ Air Horn',
      tag: 'Drop de Club',
      color: '#FF3D00',
      desc: 'Bocina clásica de discoteca',
    },
    {
      id: 'azucar',
      name: '¡Azúcar!',
      tag: 'Grito Salsero',
      color: '#D500F9',
      desc: 'Vocalización y energía en la pista',
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2">
      {/* Encabezado de la Cabina DJ */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <span>Cabina DJ & Sintetizador</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E91E63]/20 text-[#E91E63] border border-[#E91E63]/30 font-mono font-bold">
              AUDIO PCM DIRECTO
            </span>
          </h3>
          <p className="text-xs text-slate-300">
            Sintetizador en tiempo real sin archivos pesados externos
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FFC107]">
          <Sparkles className="w-4 h-4" />
          <span>Salsa Live Kit</span>
        </div>
      </div>

      {/* Grid de Pads Percusivos (6 pads táctiles con retroalimentación) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {pads.map((pad) => {
          const isActive = activePad === pad.id;
          return (
            <button
              key={pad.id}
              onClick={() => triggerInstrument(pad.id)}
              className={`relative p-4 rounded-2xl border text-left transition-all duration-150 transform select-none cursor-pointer overflow-hidden ${
                isActive
                  ? 'scale-95 shadow-[0_0_25px_rgba(255,255,255,0.4)]'
                  : 'hover:scale-[1.02] shadow-md'
              }`}
              style={{
                backgroundColor: isActive ? `${pad.color}35` : '#170C24',
                borderColor: isActive ? pad.color : 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Barra de acento superior */}
              <div
                className="w-8 h-1 rounded-full mb-3"
                style={{ backgroundColor: pad.color }}
              />

              <div className="font-bold text-sm text-white tracking-tight leading-snug">
                {pad.name}
              </div>
              <div
                className="text-[10px] font-mono font-semibold mt-0.5"
                style={{ color: pad.color }}
              >
                {pad.tag}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                {pad.desc}
              </div>

              {/* Indicador de golpe activo */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: pad.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Módulo de Metrónomo / Tap Tempo de Salsa */}
      <div className="rounded-3xl bg-gradient-to-b from-[#180D26] to-[#12071E] border border-white/10 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-[#FFC107]" />
            <h4 className="text-sm font-bold text-white tracking-wide">
              Metrónomo & Tap Tempo de Salsa
            </h4>
          </div>

          <button
            onClick={() => {
              setTapTimes([]);
              setBpm(105);
            }}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>

        {/* Display Central de BPM y Categoría Salsera */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 border-y border-white/10">
          
          {/* Display Numérico */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
              {bpm}
            </span>
            <span className="text-sm font-bold text-slate-400 font-mono">BPM</span>
          </div>

          {/* Categoría automática de Salsa */}
          <div className="flex-1 text-center sm:text-right">
            <div
              className="text-xs sm:text-sm font-extrabold tracking-wide uppercase px-3 py-1 rounded-lg inline-block"
              style={{
                backgroundColor: `${currentCategory.color}20`,
                color: currentCategory.color,
                border: `1px solid ${currentCategory.color}40`,
              }}
            >
              {currentCategory.title}
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              {currentCategory.desc}
            </p>
          </div>
        </div>

        {/* Visualizador de tiempos de salsa (1 al 8) */}
        <div className="my-4">
          <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex justify-between">
            <span>PASO SALSERO (TIEMPOS 1 AL 8)</span>
            <span>{isMetronomePlaying ? 'METRÓNOMO ACTIVO' : 'PAUSADO'}</span>
          </div>
          <div className="grid grid-cols-8 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => {
              const isCurrent = isMetronomePlaying && currentBeat === t;
              const isPauseBeat = t === 4 || t === 8; // En salsa, 4 y 8 son pausas de paso
              return (
                <div
                  key={t}
                  className={`h-9 rounded-lg flex flex-col items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#E91E63] text-white shadow-[0_0_12px_#E91E63] scale-105'
                      : isPauseBeat
                      ? 'bg-white/5 text-slate-500 border border-white/5'
                      : 'bg-[#1E1030] text-slate-300 border border-white/10'
                  }`}
                >
                  <span>{t}</span>
                  <span className="text-[8px] opacity-70">
                    {isPauseBeat ? 'PAUSA' : 'PASO'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botones de acción: TAP TEMPO gigante + Metrónomo Play/Stop */}
        <div className="flex items-center gap-3 mt-4">
          {/* Botón TAP TEMPO con retroalimentación háptica visual */}
          <button
            onClick={handleTap}
            className={`flex-1 h-14 rounded-2xl font-black text-base tracking-wider uppercase flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer shadow-lg select-none ${
              tapRipple
                ? 'bg-[#FFC107] text-[#0A0510] shadow-[0_0_25px_#FFC107]'
                : 'bg-gradient-to-r from-[#E91E63] to-[#D81B60] text-white hover:brightness-110 shadow-[0_4px_15px_rgba(233,30,99,0.4)]'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span>TOCAR TAP TEMPO</span>
          </button>

          {/* Botón Reproducir / Detener Metrónomo en Vivo */}
          <button
            onClick={() => setIsMetronomePlaying(!isMetronomePlaying)}
            className={`h-14 px-5 rounded-2xl font-bold text-xs tracking-wide flex items-center gap-2 border transition-all active:scale-95 ${
              isMetronomePlaying
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                : 'bg-[#1E1030] text-slate-200 border-white/15 hover:border-white/30'
            }`}
          >
            {isMetronomePlaying ? (
              <>
                <Square className="w-4 h-4 fill-current text-rose-400" />
                <span>PARAR CLICK</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-[#00E5FF]" />
                <span>SONAR CLICK</span>
              </>
            )}
          </button>
        </div>

        {/* Slider manual para ajustar BPM rápido */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[11px] text-slate-400 font-mono">60</span>
          <input
            type="range"
            min="70"
            max="140"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value, 10))}
            className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FFC107]"
          />
          <span className="text-[11px] text-slate-400 font-mono">140</span>
        </div>

      </div>
    </div>
  );
};
