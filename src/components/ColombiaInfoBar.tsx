import React from 'react';
import {
  Clock,
  CloudSun,
  Sun,
  CloudRain,
  Cloud,
  CloudLightning,
  Wind,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { useColombiaTime } from '../hooks/useColombiaTime';
import { useIbagueWeather } from '../hooks/useIbagueWeather';

export const ColombiaInfoBar: React.FC = () => {
  const timeInfo = useColombiaTime();
  const { weather, loading, refresh } = useIbagueWeather();

  const getWeatherIcon = (code: number, isDay: boolean) => {
    if (code === 0 || code === 1) {
      return <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />;
    }
    if (code === 2 || code === 3) {
      return <CloudSun className="w-4 h-4 text-amber-300" />;
    }
    if (code >= 51 && code <= 67) {
      return <CloudRain className="w-4 h-4 text-cyan-400" />;
    }
    if (code >= 95) {
      return <CloudLightning className="w-4 h-4 text-yellow-400" />;
    }
    return <Cloud className="w-4 h-4 text-slate-300" />;
  };

  return (
    <div className="w-full bg-[#12071E]/90 border-b border-white/10 backdrop-blur-md px-4 py-2 select-none">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Reloj Oficial de Colombia (America/Bogota) */}
        <div className="flex items-center gap-2 text-slate-200">
          <div className="w-6 h-6 rounded-full bg-[#E91E63]/20 flex items-center justify-center text-[#E91E63]">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono font-bold text-sm text-white tracking-wider tabular-nums">
              {timeInfo.timeStr}
            </span>
            <span className="text-[10px] font-mono text-[#FFC107] font-semibold">
              (BOGOTÁ UTC-5)
            </span>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className="text-slate-300 hidden sm:inline capitalize">
              {timeInfo.dateStr}
            </span>
          </div>
        </div>

        {/* Clima en Tiempo Real en Ibagué, Tolima */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3 h-3 text-[#E91E63]" />
            <span className="font-medium text-[11px] text-white">Ibagué, Tolima:</span>
          </div>

          {weather ? (
            <div className="flex items-center gap-2 bg-[#1A0E2A] px-2.5 py-1 rounded-full border border-white/10">
              {getWeatherIcon(weather.weatherCode, weather.isDay)}
              <span className="font-bold text-white font-mono">{weather.temperature}°C</span>
              <span className="text-slate-400 hidden md:inline truncate max-w-[130px]">
                {weather.weatherDescription}
              </span>
              <button
                onClick={() => refresh()}
                className="text-slate-400 hover:text-white transition-colors ml-1"
                title="Actualizar clima de Ibagué"
                disabled={loading}
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          ) : (
            <span className="text-slate-400 animate-pulse text-[11px]">Cargando clima...</span>
          )}
        </div>

      </div>
    </div>
  );
};
