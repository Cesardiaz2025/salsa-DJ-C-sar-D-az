import React from 'react';
import {
  Radio,
  Sliders,
  Tv,
  Calendar,
  Smartphone,
} from 'lucide-react';
import { AppTab } from './TopAppBar';

interface BottomNavBarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onOpenAndroidCode: () => void;
  isPlayingRadio: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onTabChange,
  onOpenAndroidCode,
  isPlayingRadio,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0517]/95 backdrop-blur-lg border-t border-white/10 pb-safe select-none">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
        
        {/* Tab 1: Radio 24/7 */}
        <button
          onClick={() => onTabChange('radio')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all ${
            currentTab === 'radio' ? 'text-[#E91E63]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Radio className="w-5 h-5" />
            {isPlayingRadio && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E91E63] animate-ping" />
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1">Radio 24/7</span>
        </button>

        {/* Tab 2: Cabina DJ */}
        <button
          onClick={() => onTabChange('cabina')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all ${
            currentTab === 'cabina' ? 'text-[#FFC107]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight mt-1">Cabina DJ</span>
        </button>

        {/* Tab 3: 18 Mezclas */}
        <button
          onClick={() => onTabChange('videos')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all ${
            currentTab === 'videos' ? 'text-[#00E5FF]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Tv className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight mt-1">Mezclas (18)</span>
        </button>

        {/* Tab 4: Contrataciones */}
        <button
          onClick={() => onTabChange('contratos')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all ${
            currentTab === 'contratos' ? 'text-[#25D366]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight mt-1">Contratos</span>
        </button>

        {/* Tab 5: Código Android */}
        <button
          onClick={onOpenAndroidCode}
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-slate-400 hover:text-white transition-all"
        >
          <Smartphone className="w-5 h-5 text-indigo-400" />
          <span className="text-[10px] font-bold tracking-tight mt-1">Android</span>
        </button>

      </div>
    </nav>
  );
};
