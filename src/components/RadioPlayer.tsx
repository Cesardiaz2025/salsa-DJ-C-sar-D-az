import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Flame,
  Heart,
  Zap,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { RadioStation } from '../types';
import { Turntable } from './Turntable';

export const STATIONS: RadioStation[] = [
  {
    id: 'salsa-poder-1',
    name: 'Salsa Poder 1',
    subtitle: 'Salsa Brava, Clásica & Guaguancó',
    description: 'El sonido tradicional del barrio, golpes de campana, trombones pesados y la magia de Fania.',
    streamUrl: 'https://stream.zeno.fm/qmqnw2t6v68uv',
    badge: 'BRAVA & CLÁSICA',
    accentColor: '#E91E63', // Rosa Salsa Neón
  },
  {
    id: 'salsa-poder-2',
    name: 'Salsa Poder 2',
    subtitle: 'Salsa Romántica & de Alcoba',
    description: 'Letras apasionadas, melodías suaves y las mejores baladas salseras de los 80s y 90s.',
    streamUrl: 'https://stream.zeno.fm/xb7ex6ns9k0uv',
    badge: 'ROMÁNTICA',
    accentColor: '#FFC107', // Oro Latino
  },
  {
    id: 'salsa-poder-3',
    name: 'Salsa Poder 3',
    subtitle: 'Salsa Dura & Descargas',
    description: 'Descargas explosivas, solos virtuosos de timbal y piano con la máxima energía para el bailador.',
    streamUrl: 'https://stream.zeno.fm/9asu47reswzuv',
    badge: 'DURA & DESCARGAS',
    accentColor: '#00E5FF', // Cian Eléctrico
  },
];

interface RadioPlayerProps {
  isPlaying: boolean;
  onPlayStateChange: (playing: boolean) => void;
  currentStation: RadioStation;
  onSelectStation: (station: RadioStation) => void;
}

export const RadioPlayer: React.FC<RadioPlayerProps> = ({
  isPlaying,
  onPlayStateChange,
  currentStation,
  onSelectStation,
}) => {
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [reconnectCount, setReconnectCount] = useState<number>(0);
  const [spectrumHeights, setSpectrumHeights] = useState<number[]>(
    Array.from({ length: 24 }, () => 15)
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Inicializar elemento de audio
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'none';
      audio.crossOrigin = 'anonymous';
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      onPlayStateChange(true);
    };
    const handlePause = () => {
      setIsBuffering(false);
      onPlayStateChange(false);
    };
    const handleError = () => {
      console.warn('Radio stream error, intentando reconexión automática...');
      setIsBuffering(true);
      // Reconexión automática con timestamp para evitar cache
      setTimeout(() => {
        if (audioRef.current && isPlaying) {
          audioRef.current.src = `${currentStation.streamUrl}?nocache=${Date.now()}`;
          audioRef.current.play().catch((e) => console.log('Auto-reconnect wait:', e));
          setReconnectCount((prev) => prev + 1);
        }
      }, 2500);
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [currentStation.streamUrl, isPlaying, onPlayStateChange]);

  // Manejar cambio de estación o play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsBuffering(true);
      const targetSrc = `${currentStation.streamUrl}?nocache=${Date.now()}`;
      if (audio.src !== targetSrc) {
        audio.src = targetSrc;
      }
      audio
        .play()
        .then(() => {
          setIsBuffering(false);
        })
        .catch((err) => {
          console.warn('Playback initiation note:', err);
          setIsBuffering(false);
        });
    } else {
      audio.pause();
      setIsBuffering(false);
    }
  }, [isPlaying, currentStation]);

  // Control de volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Animación del espectro de audio rítmico salsero
  useEffect(() => {
    let phase = 0;
    const updateSpectrum = () => {
      if (isPlaying && !isBuffering) {
        phase += 0.12;
        const newHeights = Array.from({ length: 24 }, (_, i) => {
          // Curva rítmica con picos de percusión y campana
          const wave1 = Math.sin(phase * 1.8 + i * 0.45);
          const wave2 = Math.cos(phase * 0.9 + i * 0.25);
          const noise = Math.random() * 0.35;
          const combined = Math.abs(wave1 * 0.6 + wave2 * 0.4 + noise);
          // Altura entre 18% y 95%
          return Math.max(18, Math.min(95, Math.floor(combined * 100)));
        });
        setSpectrumHeights(newHeights);
      } else {
        setSpectrumHeights(Array.from({ length: 24 }, () => 10));
      }
      animFrameRef.current = requestAnimationFrame(updateSpectrum);
    };

    animFrameRef.current = requestAnimationFrame(updateSpectrum);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, isBuffering]);

  const togglePlay = useCallback(() => {
    onPlayStateChange(!isPlaying);
  }, [isPlaying, onPlayStateChange]);

  const handleStationClick = (station: RadioStation) => {
    if (currentStation.id === station.id) {
      togglePlay();
    } else {
      onSelectStation(station);
      onPlayStateChange(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tornamesa animada */}
      <Turntable
        isPlaying={isPlaying && !isBuffering}
        stationName={currentStation.name}
        accentColor={currentStation.accentColor}
        onTogglePlay={togglePlay}
      />

      {/* Píldora de estado en vivo 24/7 (según especificación del usuario) */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-md ${
            isBuffering
              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
              : isPlaying
              ? 'bg-[#E91E63]/20 text-[#E91E63] border border-[#E91E63]/50 shadow-[0_0_15px_rgba(233,30,99,0.3)]'
              : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isBuffering
                ? 'bg-amber-400 animate-ping'
                : isPlaying
                ? 'bg-[#E91E63] animate-pulse'
                : 'bg-slate-500'
            }`}
          />
          <span className="font-mono">
            {isBuffering
              ? 'CONECTANDO...'
              : isPlaying
              ? '🔴 24/7 EN VIVO'
              : 'PAUSADO · TOCA PLAY'}
          </span>
        </div>

        {reconnectCount > 0 && (
          <div className="flex items-center gap-1 text-[11px] text-slate-300">
            <RotateCcw className="w-3 h-3 text-emerald-400" />
            <span>Reconectado</span>
          </div>
        )}
      </div>

      {/* Título de la emisora activa y descripción */}
      <div className="text-center mt-3 px-4 max-w-md">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
          <span>{currentStation.name}</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${currentStation.accentColor}25`,
              color: currentStation.accentColor,
              border: `1px solid ${currentStation.accentColor}50`,
            }}
          >
            {currentStation.badge}
          </span>
        </h2>
        <p className="text-sm font-medium text-pink-200/80 mt-0.5">
          {currentStation.subtitle}
        </p>
        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
          {currentStation.description}
        </p>
      </div>

      {/* Visualizador de espectro de audio con degradados Rosa / Oro / Cian */}
      <div className="w-full max-w-md px-6 my-4">
        <div className="flex items-end justify-between h-14 bg-[#140A20]/80 rounded-2xl p-2.5 border border-white/10 backdrop-blur-sm">
          {spectrumHeights.map((height, idx) => {
            // Asignar colores vibrantes de salsa a lo largo de las 24 barras
            let barBg = 'linear-gradient(to top, #E91E63, #FFC107)';
            if (idx > 15) {
              barBg = 'linear-gradient(to top, #FFC107, #00E5FF)';
            } else if (idx < 7) {
              barBg = 'linear-gradient(to top, #880E4F, #E91E63)';
            }
            return (
              <div
                key={idx}
                className="w-1.5 sm:w-2 rounded-t-full transition-all duration-75"
                style={{
                  height: `${height}%`,
                  background: isPlaying ? barBg : '#261838',
                  boxShadow: isPlaying && height > 60 ? '0 0 8px rgba(233,30,99,0.5)' : 'none',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Botones de Control Principal (Play/Pause Grande, Volumen) */}
      <div className="flex items-center justify-center gap-6 my-2">
        {/* Botón Mute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-11 h-11 rounded-full bg-[#1E1030] border border-white/10 hover:border-pink-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-5 h-5 text-rose-400" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>

        {/* Botón Principal Play / Pause Estilo Material 3 Floating Action */}
        <button
          onClick={togglePlay}
          className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold transition-all transform active:scale-90 hover:scale-105 shadow-[0_10px_30px_rgba(233,30,99,0.5)] cursor-pointer"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #E91E63 0%, #D81B60 100%)'
              : 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)',
            color: isPlaying ? '#FFF' : '#0A0510',
          }}
          aria-label={isPlaying ? 'Pausar transmisión en vivo' : 'Iniciar radio salsera en vivo'}
        >
          {/* Ondas expansivas si está reproduciendo */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[#E91E63] animate-ping opacity-25 pointer-events-none" />
          )}
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-9 h-9 fill-current ml-1" />
          )}
        </button>

        {/* Control deslizante de volumen tipo Material 3 */}
        <div className="flex items-center gap-2 bg-[#1E1030] px-3 py-2 rounded-full border border-white/10">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 sm:w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#E91E63]"
            aria-label="Volumen de radio"
          />
          <span className="text-[11px] font-mono text-slate-300 w-7 text-right">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      </div>

      {/* Selector de las 3 Estaciones de Salsa Poder */}
      <div className="w-full max-w-lg px-4 mt-5">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Radio className="w-3.5 h-3.5 text-[#E91E63]" />
            <span>ESTACIONES DISPONIBLES</span>
          </div>
          <span className="text-[11px] text-slate-400">Stream Oficial Zeno.FM</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {STATIONS.map((station, idx) => {
            const isSelected = currentStation.id === station.id;
            const Icon = idx === 0 ? Flame : idx === 1 ? Heart : Zap;

            return (
              <button
                key={station.id}
                onClick={() => handleStationClick(station)}
                className={`relative p-3 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1E1030] border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] scale-[1.02]'
                    : 'bg-[#140A20]/70 border-white/5 hover:border-white/20 hover:bg-[#1A0E2A]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${station.accentColor}25`,
                      color: station.accentColor,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && isPlaying && (
                    <span className="flex h-2 w-2 relative">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: station.accentColor }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ backgroundColor: station.accentColor }}
                      />
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{station.name}</h4>
                  <p className="text-[11px] text-slate-300 truncate mt-0.5">{station.subtitle}</p>
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span
                    className="text-[9px] font-mono font-bold"
                    style={{ color: station.accentColor }}
                  >
                    {station.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isSelected && isPlaying ? 'Sonando' : 'Sintonizar'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
