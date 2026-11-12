import React from 'react';
import {
  Radio,
  Sliders,
  Tv,
  Calendar,
  Smartphone,
  Flame,
} from 'lucide-react';

export type AppTab = 'radio' | 'cabina' | 'videos' | 'contratos';

interface TopAppBarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onOpenAndroidCode: () => void;
  isPlayingRadio: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  onTabChange,
  onOpenAndroidCode,
  isPlayingRadio,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0A0510]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        
        {/* Zone 1: Wordmark Marca Salsera */}
        <div
          onClick={() => onTabChange('radio')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E91E63] via-[#D81B60] to-[#FFC107] p-0.5 shadow-[0_0_15px_rgba(233,30,99,0.5)]">
            <div className="w-full h-full bg-[#0A0510] rounded-[10px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#FFC107] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
              <span>DJ CÉSAR DÍAZ</span>
              {isPlayingRadio && (
                <span className="w-2 h-2 rounded-full bg-[#E91E63] animate-ping" />
              )}
            </div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#FFC107] uppercase -mt-0.5">
              TODO EL PODER DE LA SALSA
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Escritorio / Tablet) */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold tracking-wide">
          <button
            onClick={() => onTabChange('radio')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              currentTab === 'radio'
                ? 'bg-[#1E1030] text-[#E91E63] border border-[#E91E63]/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Radio 24/7</span>
          </button>

          <button
            onClick={() => onTabChange('cabina')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              currentTab === 'cabina'
                ? 'bg-[#1E1030] text-[#FFC107] border border-[#FFC107]/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Cabina DJ & BPM</span>
          </button>

          <button
            onClick={() => onTabChange('videos')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              currentTab === 'videos'
                ? 'bg-[#1E1030] text-[#00E5FF] border border-[#00E5FF]/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>18 Mezclas Exclusivas</span>
          </button>

          <button
            onClick={() => onTabChange('contratos')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              currentTab === 'contratos'
                ? 'bg-[#1E1030] text-[#25D366] border border-[#25D366]/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Contrataciones</span>
          </button>
        </nav>

        {/* Zone 3: Acciones primarias (Código Android Kotlin + WhatsApp) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAndroidCode}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E1030] hover:bg-[#281540] border border-white/15 text-xs font-semibold text-slate-200 transition-all hover:border-[#00E5FF]/50"
            title="Ver código fuente nativo Android en Kotlin Jetpack Compose"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-mono text-[11px]">Kotlin Compose</span>
          </button>

          <a
            href="https://wa.me/573165275176?text=Hola%20DJ%20C%C3%A9sar%20D%C3%ADaz!%20Quiero%20cotizar%20un%20evento%20salsero."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_2px_12px_rgba(37,211,102,0.35)] transition-all active:scale-95"
          >
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </header>
  );
};
