export interface RadioStation {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  streamUrl: string;
  badge: string;
  accentColor: string;
}

export interface VideoMix {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  description: string;
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  weatherDescription: string;
  windSpeed: number;
  humidity?: number;
  isDay: boolean;
  city: string;
  region: string;
}

export type SalsaStyleCategory =
  | 'Tiempo Lento (Bolero / Cha-cha)'
  | 'Salsa Romántica'
  | 'Salsa Clásica / Guaguancó'
  | 'Salsa Brava / Dura 🔥'
  | 'Timba / Descarga Rápida ⚡';

export interface PercussionPad {
  id: string;
  name: string;
  instrument: string;
  color: string;
  shortcut: string;
  description: string;
}
