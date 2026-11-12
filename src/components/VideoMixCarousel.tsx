import React, { useState } from 'react';
import {
  Play,
  ExternalLink,
  X,
  Tv,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { VideoMix } from '../types';

export const DJ_MIXES: VideoMix[] = [
  {
    id: 'mix-1',
    youtubeId: 'of6SQmMulCQ',
    title: 'Salsa Brava & Vinilo Live Session',
    category: 'Salsa Brava',
    duration: '42:15',
    description: 'Sesión en vivo de salsa pesada, trombones y solos de timbal en tornamesas clásicas.',
  },
  {
    id: 'mix-2',
    youtubeId: '1ocFlSOJeiw',
    title: 'Tumbao Callejero & Guaguancó',
    category: 'Guaguancó',
    duration: '38:50',
    description: 'Ritmo auténtico de las calles latinas con los mejores coros y pregones.',
  },
  {
    id: 'mix-3',
    youtubeId: '9_MFJjenEjI',
    title: 'Románticos Inmortales Vol. 1',
    category: 'Salsa Romántica',
    duration: '50:20',
    description: 'Selección exclusiva de baladas salseras de los 80s y 90s para dedicar y bailar pegado.',
  },
  {
    id: 'mix-4',
    youtubeId: 'pVlOZlmwJhY',
    title: 'Descarga Pesada en Ibagué',
    category: 'Descargas',
    duration: '35:40',
    description: 'En directo desde la Capital Musical de Colombia, pura candela en la pista de baile.',
  },
  {
    id: 'mix-5',
    youtubeId: 'rA5yWBADVpU',
    title: 'Clásicos de Oro del Fania Sound',
    category: 'Clásicos',
    duration: '48:12',
    description: 'Tributo a las grandes leyendas del género con mezcla armónica impecable.',
  },
  {
    id: 'mix-6',
    youtubeId: 'fK0AfjfBdUk',
    title: 'Salsa de Alcoba & Pasión Nocturna',
    category: 'Salsa Romántica',
    duration: '44:30',
    description: 'Poesía hecha salsa con arreglos de viento suaves y bajos profundos.',
  },
  {
    id: 'mix-7',
    youtubeId: 'eR-JIsXzrmE',
    title: 'Campana y Timbal al Máximo Poder',
    category: 'Salsa Dura',
    duration: '40:15',
    description: 'Cencerro encendido y cortes percusivos diseñados para el bailador más exigente.',
  },
  {
    id: 'mix-8',
    youtubeId: 'Xy0h3643kpk',
    title: 'La Gozadera Salsera - Club Mix',
    category: 'Fiesta',
    duration: '52:05',
    description: 'Energía total para discotecas y celebraciones privadas con transiciones fluidas.',
  },
  {
    id: 'mix-9',
    youtubeId: '2fFfyVu9CFY',
    title: 'Descarga Cubana & Timba Furiosa',
    category: 'Timba',
    duration: '36:18',
    description: 'Síncopa y virtuosismo con el sabor antillano que no da tregua en el suelo.',
  },
  {
    id: 'mix-10',
    youtubeId: 'SQqpOx_gXTk',
    title: 'Salsa Retro 70s Original Vinyl',
    category: 'Clásicos',
    duration: '46:40',
    description: 'El sonido cálido y orgánico extraído directamente de vinilos de 33 RPM.',
  },
  {
    id: 'mix-11',
    youtubeId: 'FkpKdGwSVqc',
    title: 'Noche Brava de Trombones',
    category: 'Salsa Brava',
    duration: '39:25',
    description: 'Fuerza orquestal y arreglos contundentes para gozar sin parar.',
  },
  {
    id: 'mix-12',
    youtubeId: 't93w770FZo0',
    title: 'Salsa Pa’l Barrio - Especial Tolima',
    category: 'En Vivo',
    duration: '45:10',
    description: 'Edición conmemorativa con dedicatoria a los salseros de Ibagué y Colombia.',
  },
  {
    id: 'mix-13',
    youtubeId: '-_G3xNG7pZk',
    title: 'Amor y Melodía: Lo Mejor de Alcoba',
    category: 'Salsa Romántica',
    duration: '55:30',
    description: 'Las voces más aclamadas de la salsa rosa en una mezcla continua.',
  },
  {
    id: 'mix-14',
    youtubeId: 'KwMKN8zHOMo',
    title: 'Mambo & Golpe de Percusión',
    category: 'Salsa Dura',
    duration: '37:45',
    description: 'Polirritmia latina acelerada con bongo y conga en primer plano.',
  },
  {
    id: 'mix-15',
    youtubeId: 'y_4r8BtPTlk',
    title: 'Fiebre de Sábado Salsero',
    category: 'Fiesta',
    duration: '49:15',
    description: 'El repertorio garantizado para prender cualquier pista de eventos.',
  },
  {
    id: 'mix-16',
    youtubeId: 'EzAxuazHaAI',
    title: 'Salsa de Colección & Joyas Ocultas',
    category: 'Colección',
    duration: '43:50',
    description: 'Temas inéditos y rarezas orquestales rescatados para verdaderos melómanos.',
  },
  {
    id: 'mix-17',
    youtubeId: 'UbExOtljack',
    title: 'Gozando en la Tornamesa Live Set',
    category: 'En Vivo',
    duration: '41:10',
    description: 'Técnica de DJ con cortes en tiempo real, efectos y dinamismo puro.',
  },
  {
    id: 'mix-18',
    youtubeId: 'hpz_3nsYDJE',
    title: 'Todo el Poder de la Salsa - Gran Final',
    category: 'Salsa Dura',
    duration: '58:00',
    description: 'El set definitivo que resume la esencia y trayectoria de DJ César Díaz.',
  },
];

interface VideoMixCarouselProps {
  onVideoPlay: () => void;
}

export const VideoMixCarousel: React.FC<VideoMixCarouselProps> = ({ onVideoPlay }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoMix | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Salsa Brava', 'Salsa Romántica', 'Salsa Dura', 'Clásicos', 'En Vivo'];

  const filteredMixes =
    filterCategory === 'Todas'
      ? DJ_MIXES
      : DJ_MIXES.filter((m) => m.category === filterCategory || m.title.toLowerCase().includes(filterCategory.toLowerCase()));

  const handleOpenVideo = (video: VideoMix) => {
    // Al reproducir un video, se pausa la radio en vivo según requerimiento
    onVideoPlay();
    setSelectedVideo(video);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      {/* Encabezado de la Sección de Videos */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#E91E63]" />
            <h3 className="text-xl font-black text-white tracking-tight">
              Catálogo de Mezclas Exclusivas
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#E91E63]/20 text-[#E91E63] border border-[#E91E63]/30 font-bold">
              18 SETS
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Grabaciones en vivo y sesiones de estudio de DJ César Díaz
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#E91E63] text-white shadow-[0_2px_10px_rgba(233,30,99,0.4)]'
                  : 'bg-[#1E1030] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMixes.map((mix) => {
          const thumbUrl = `https://img.youtube.com/vi/${mix.youtubeId}/hqdefault.jpg`;

          return (
            <div
              key={mix.id}
              className="group rounded-2xl bg-gradient-to-b from-[#180D26] to-[#10071C] border border-white/10 hover:border-pink-500/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_8px_30px_rgba(233,30,99,0.25)]"
            >
              {/* Contenedor del Póster de Video Interactivo */}
              <div
                className="relative aspect-video w-full bg-[#0A0510] overflow-hidden cursor-pointer"
                onClick={() => handleOpenVideo(mix)}
              >
                <img
                  src={thumbUrl}
                  alt={mix.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback visual estilizado si el CDN tarda
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Scrim degradado para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0510] via-transparent to-black/30" />

                {/* Botón Play central con brillo neón */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#E91E63]/90 text-white flex items-center justify-center shadow-[0_0_20px_#E91E63] group-hover:scale-115 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Insignia de duración */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] font-bold border border-white/20">
                  {mix.duration}
                </div>

                {/* Insignia de categoría */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#E91E63]/80 text-white text-[10px] font-bold tracking-wider uppercase">
                  {mix.category}
                </div>
              </div>

              {/* Información del Video */}
              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-[#FFC107] transition-colors line-clamp-1">
                    {mix.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {mix.description}
                  </p>
                </div>

                {/* Acciones del Video */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenVideo(mix)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#E91E63] hover:text-pink-300 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Ver en la App</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${mix.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                    title="Abrir en YouTube oficial"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Reproducción Segura con Pausa Automática de Radio */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#140A20] rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            {/* Barra superior del modal */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#1B0F2C] border-b border-white/10">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#E91E63]" />
                <span className="font-bold text-sm text-white truncate max-w-xs sm:max-w-md">
                  {selectedVideo.title}
                </span>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Cerrar video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Iframe de YouTube con modo seguro por software */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Pie del modal con detalles y enlace a YouTube */}
            <div className="p-4 bg-[#140A20] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-300">
                <span className="text-[#FFC107] font-semibold">Radio en pausa</span> para evitar
                solapamiento de audio mientras ves la mezcla.
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors w-fit"
              >
                <span>Ver directo en YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
