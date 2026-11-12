import { useState, useEffect } from 'react';

export interface ColombiaTimeInfo {
  timeStr: string;
  dateStr: string;
  hour: number;
  minute: number;
  second: number;
  period: string;
}

export function useColombiaTime(): ColombiaTimeInfo {
  const [timeInfo, setTimeInfo] = useState<ColombiaTimeInfo>(() => getBogotaTime());

  function getBogotaTime(): ColombiaTimeInfo {
    const now = new Date();
    // Obtener la hora en la zona de Bogotá (UTC-5 sin horario de verano)
    const formatterTime = new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const formatterParts = new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    }).formatToParts(now);

    const formatterDate = new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const timeStr = formatterTime.format(now);
    let dateStr = formatterDate.format(now);
    // Capitalizar primera letra del día
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    const hour = parseInt(formatterParts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(formatterParts.find((p) => p.type === 'minute')?.value || '0', 10);
    const second = parseInt(formatterParts.find((p) => p.type === 'second')?.value || '0', 10);
    const period = hour >= 12 ? 'PM' : 'AM';

    return {
      timeStr,
      dateStr,
      hour,
      minute,
      second,
      period,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(getBogotaTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeInfo;
}
