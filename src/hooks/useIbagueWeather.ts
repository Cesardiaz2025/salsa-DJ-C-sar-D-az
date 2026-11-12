import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types';

export function useIbagueWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mapWmoCodeToSpanish = (code: number): string => {
    switch (code) {
      case 0:
        return 'Cielo despejado';
      case 1:
        return 'Mayormente despejado';
      case 2:
        return 'Parcialmente nublado';
      case 3:
        return 'Nublado';
      case 45:
      case 48:
        return 'Neblina en la cordillera';
      case 51:
      case 53:
      case 55:
        return 'Llovizna suave';
      case 61:
      case 63:
      case 65:
        return 'Lluvia moderada';
      case 80:
      case 81:
      case 82:
        return 'Chubascos tropicales';
      case 95:
      case 96:
      case 99:
        return 'Tormenta eléctrica';
      default:
        return 'Clima cálido agradable';
    }
  };

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=4.4389&longitude=-75.2322&current_weather=true'
      );
      if (!res.ok) {
        throw new Error(`Error en API: ${res.status}`);
      }
      const data = await res.json();
      const current = data.current_weather;

      if (current) {
        setWeather({
          temperature: Math.round(current.temperature),
          weatherCode: current.weathercode,
          weatherDescription: mapWmoCodeToSpanish(current.weathercode),
          windSpeed: current.windspeed,
          isDay: current.is_day === 1,
          city: 'Ibagué',
          region: 'Tolima, Colombia',
        });
      }
    } catch (err) {
      console.warn('Weather fetch error, using typical Ibague climate:', err);
      // Fallback a clima representativo de la Capital Musical de Colombia (Ibagué)
      setWeather({
        temperature: 24,
        weatherCode: 2,
        weatherDescription: 'Parcialmente nublado',
        windSpeed: 9.5,
        isDay: true,
        city: 'Ibagué',
        region: 'Tolima, Colombia',
      });
      setError(err instanceof Error ? err.message : 'Error al obtener clima');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60 * 1000); // Actualizar cada 15 min
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return { weather, loading, error, refresh: fetchWeather };
}
