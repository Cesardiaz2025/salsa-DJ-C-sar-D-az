/**
 * DJ César Díaz — Todo el Poder de la Salsa
 * Aplicación de Radio en Vivo 24/7, Cabina DJ, Catálogo de 18 Mezclas y Contrataciones
 */

import { useState } from 'react';
import { RadioPlayer, STATIONS } from './components/RadioPlayer';
import { DjCabinaSynth } from './components/DjCabinaSynth';
import { VideoMixCarousel } from './components/VideoMixCarousel';
import { ContractSection } from './components/ContractSection';
import { ColombiaInfoBar } from './components/ColombiaInfoBar';
import { TopAppBar, AppTab } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { FloatingWhatsAppFab } from './components/FloatingWhatsAppFab';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { RadioStation } from './types';
import {
  Radio,
  Sliders,
  Tv,
  Calendar,
  Volume2,
  Pause,
  Play,
  Smartphone,
  Flame,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('radio');
  const [isPlayingRadio, setIsPlayingRadio] = useState<boolean>(false);
  const [currentStation, setCurrentStation] = useState<RadioStation>(STATIONS[0]);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);

  // Pausa automática de la radio cuando se reproduce un video
  const handleVideoPlay = () => {
    setIsPlayingRadio(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0510] text-slate-100 flex flex-col font-sans selection:bg-[#E91E63] selection:text-white pb-20 md:pb-8">
      
      {/* 1. Barra de Clima en Ibagué y Reloj de Colombia en Tiempo Real */}
      <ColombiaInfoBar />

      {/* 2. Top App Bar Material 3 */}
      <TopAppBar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenAndroidCode={() => setIsAndroidModalOpen(true)}
        isPlayingRadio={isPlayingRadio}
      />

      {/* Mini-reproductor persistente si la radio está sonando y el usuario está en otra pestaña */}
      {isPlayingRadio && currentTab !== 'radio' && (
        <div className="sticky top-[57px] z-20 bg-gradient-to-r from-[#E91E63] via-[#D81B60] to-[#880E4F] px-4 py-2 text-white shadow-lg flex items-center justify-between text-xs animate-fadeIn">
          <div
            onClick={() => setCurrentTab('radio')}
            className="flex items-center gap-2 cursor-pointer truncate mr-2"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="font-black tracking-wide">SONANDO EN VIVO:</span>
            <span className="font-medium underline truncate">{currentStation.name}</span>
            <span className="text-pink-200 hidden sm:inline">({currentStation.subtitle})</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlayingRadio(false)}
              className="p-1 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors"
              aria-label="Pausar radio"
            >
              <Pause className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => setCurrentTab('radio')}
              className="text-[11px] font-bold bg-white text-[#880E4F] px-2.5 py-0.5 rounded-full"
            >
              Ver Tornamesa
            </button>
          </div>
        </div>
      )}

      {/* 3. Contenido Principal según Pestaña Activa */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        
        {/* Pestaña: Radio 24/7 */}
        {currentTab === 'radio' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Reproductor de Radio con Tornamesa Animada y 3 Estaciones */}
            <RadioPlayer
              isPlaying={isPlayingRadio}
              onPlayStateChange={setIsPlayingRadio}
              currentStation={currentStation}
              onSelectStation={setCurrentStation}
            />

            {/* Acceso Rápido Integrado a la Cabina DJ para acompañar la música en vivo */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="text-center max-w-md mx-auto mb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFC107] uppercase px-3 py-1 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30">
                  ¡ACOMPAÑA LA RADIO EN VIVO!
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  Toca la Percusión sobre el Golpe
                </h3>
                <p className="text-xs text-slate-300">
                  Usa los pads para añadir clave, campana o air horn mientras suena la transmisión
                </p>
              </div>
              <DjCabinaSynth />
            </div>
          </div>
        )}

        {/* Pestaña: Cabina DJ & Metrónomo */}
        {currentTab === 'cabina' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-lg mx-auto mb-2">
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                <Sliders className="w-6 h-6 text-[#FFC107]" />
                <span>Cabina de DJ & Metrónomo BPM</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Herramientas profesionales para DJs, melómanos y bailadores de salsa
              </p>
            </div>
            <DjCabinaSynth />
          </div>
        )}

        {/* Pestaña: 18 Mezclas Exclusivas */}
        {currentTab === 'videos' && (
          <div className="animate-fadeIn">
            <VideoMixCarousel onVideoPlay={handleVideoPlay} />
          </div>
        )}

        {/* Pestaña: Contrataciones */}
        {currentTab === 'contratos' && (
          <div className="animate-fadeIn">
            <ContractSection />
          </div>
        )}

      </main>

      {/* 4. Banner de Información de DJ César Díaz al pie */}
      <footer className="w-full max-w-5xl mx-auto px-4 mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#E91E63]/20 flex items-center justify-center text-[#E91E63]">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-200">DJ César Díaz</span>
            <span className="mx-1.5 text-slate-600">·</span>
            <span>Ibagué, Tolima, Colombia</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={() => setIsAndroidModalOpen(true)}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Código Nativo Android</span>
          </button>
          <span>·</span>
          <span>Transmisión 24/7 en Zeno.FM</span>
        </div>
      </footer>

      {/* 5. Botón Flotante de WhatsApp (FAB) */}
      <FloatingWhatsAppFab />

      {/* 6. Barra de Navegación Inferior (Móvil) */}
      <BottomNavBar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenAndroidCode={() => setIsAndroidModalOpen(true)}
        isPlayingRadio={isPlayingRadio}
      />

      {/* 7. Modal del Código Fuente Android Jetpack Compose */}
      <AndroidCodeModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />

    </div>
  );
}
