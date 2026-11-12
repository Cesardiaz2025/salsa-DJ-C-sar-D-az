import React from 'react';
import { Disc3, Sparkles } from 'lucide-react';

interface TurntableProps {
  isPlaying: boolean;
  stationName: string;
  accentColor?: string;
  onTogglePlay?: () => void;
}

export const Turntable: React.FC<TurntableProps> = ({
  isPlaying,
  stationName,
  accentColor = '#E91E63',
  onTogglePlay,
}) => {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square mx-auto flex items-center justify-center p-3 select-none">
      {/* Base de la Tornamesa (Plinto estilo Technics SL-1200 modernizado en Material 3) */}
      <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-[#180D26] to-[#0E0617] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center p-4">
        
        {/* Luces y detalles estéticos del chasis de la tornamesa */}
        <div className="absolute top-3 left-4 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E91E63] shadow-[0_0_8px_#E91E63]" />
          <span className="text-[10px] font-bold tracking-wider text-slate-300 font-mono">
            DIRECT DRIVE · 33 ⅓
          </span>
        </div>

        <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[#FFC107]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold tracking-widest font-mono">PITCH ±0%</span>
        </div>

        {/* Plato giratorio exterior de aluminio pulido con puntos estroboscópicos */}
        <div className="relative w-[88%] h-[88%] rounded-full bg-gradient-to-tr from-[#1f192b] via-[#2a223a] to-[#120a1c] border-2 border-white/15 p-2 shadow-inner flex items-center justify-center">
          
          {/* Anillo estroboscópico de puntos perimetrales */}
          <div className="absolute inset-1 rounded-full border border-dashed border-white/20 pointer-events-none" />

          {/* Disco de Vinilo que gira al reproducir */}
          <div
            onClick={onTogglePlay}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? "Pausar tornamesa" : "Reproducir tornamesa"}
            className={`relative w-full h-full rounded-full cursor-pointer transition-shadow duration-300 ${
              isPlaying
                ? 'animate-vinyl-spin shadow-[0_0_35px_rgba(233,30,99,0.45)]'
                : 'shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            }`}
            style={{
              background: 'radial-gradient(circle, #0e0e12 0%, #050508 100%)',
            }}
          >
            {/* Surcos de vinilo concéntricos (Textura Hi-Fi) */}
            <div className="absolute inset-[6%] rounded-full border border-white/10" />
            <div className="absolute inset-[12%] rounded-full border border-white/5" />
            <div className="absolute inset-[18%] rounded-full border border-white/10" />
            <div className="absolute inset-[24%] rounded-full border border-white/5" />
            <div className="absolute inset-[30%] rounded-full border border-white/10" />
            <div className="absolute inset-[35%] rounded-full border border-white/5" />

            {/* Brillo especular y reflejo de luz salsera en diagonal */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background:
                  'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.25) 45deg, transparent 90deg, rgba(233,30,99,0.2) 135deg, transparent 180deg, rgba(255,255,255,0.25) 225deg, transparent 270deg, rgba(0,229,255,0.2) 315deg, transparent 360deg)',
              }}
            />

            {/* Etiqueta Central del Vinilo (Label central 'SALSA') */}
            <div className="absolute inset-[37%] rounded-full bg-gradient-to-br from-[#E91E63] via-[#D81B60] to-[#880E4F] border-2 border-[#FFC107] shadow-lg flex flex-col items-center justify-center text-center p-1 overflow-hidden">
              <span className="text-[7px] font-bold text-[#FFC107] uppercase tracking-widest leading-none">
                DJ CÉSAR DÍAZ
              </span>
              <span className="text-[13px] sm:text-[15px] font-black text-white tracking-wider my-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                SALSA
              </span>
              <span className="text-[6.5px] font-semibold text-pink-100 uppercase tracking-tight truncate max-w-[85%]">
                {stationName.split('(')[0] || 'TODO EL PODER'}
              </span>
            </div>

            {/* Husillo central de latón/aluminio */}
            <div className="absolute inset-[47.5%] rounded-full bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-600 shadow-md flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0A0510]" />
            </div>
          </div>
        </div>

        {/* Brazo fonocaptor / Tonearm con aguja y contrapeso */}
        <div
          className="absolute top-2 right-2 w-28 h-40 pointer-events-none origin-[85%_12%] transition-transform duration-700 ease-out z-20"
          style={{
            transform: isPlaying ? 'rotate(27deg)' : 'rotate(0deg)',
          }}
        >
          {/* Base del pivote y contrapeso trasero */}
          <div className="absolute top-1 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900 border border-white/30 shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#FFC107] shadow-[0_0_6px_#FFC107]" />
          </div>

          {/* Brazo metálico curvo en S estilizado */}
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 160">
            <path
              d="M 72 20 Q 70 65 48 95 T 32 142"
              fill="none"
              stroke="url(#armGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Cabezal portacápsula y aguja con luz guía */}
            <rect
              x="24"
              y="136"
              width="14"
              height="20"
              rx="2"
              transform="rotate(-15 31 146)"
              fill="#E91E63"
              stroke="#FFF"
              strokeWidth="0.8"
            />
            <circle cx="28" cy="154" r="2" fill="#00E5FF" />
            <defs>
              <linearGradient id="armGradient" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Soporte de descanso del brazo (Arm Rest) */}
        <div className="absolute top-24 right-5 w-2 h-4 bg-slate-700 rounded-sm border border-slate-500 pointer-events-none" />

        {/* Indicador inferior de control de volumen/estado */}
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <Disc3
              className={`w-4 h-4 ${isPlaying ? 'text-[#E91E63] animate-spin' : 'text-slate-400'}`}
              style={{ animationDuration: '3s' }}
            />
            <span className="font-medium tracking-tight">
              {isPlaying ? 'Girando a 33 RPM' : 'Toca el disco para sonar'}
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isPlaying ? accentColor : '#64748B' }}
            />
            <span>{isPlaying ? 'ON AIR' : 'READY'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
