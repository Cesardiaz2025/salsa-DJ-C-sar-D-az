import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Music,
  Send,
  User,
} from 'lucide-react';

export const ContractSection: React.FC = () => {
  const [eventType, setEventType] = useState<string>('Boda / Fiesta Privada');
  const [city, setCity] = useState<string>('Ibagué');
  const [date, setDate] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const phoneNumber = '+573165275176';
  const phoneDisplay = '+57 316 527 5176';

  const generateWhatsAppUrl = () => {
    let msg = `¡Hola DJ César Díaz! Quiero cotizar tus servicios de show salsero y animación:\n`;
    if (clientName) msg += `· Nombre: ${clientName}\n`;
    msg += `· Tipo de evento: ${eventType}\n`;
    msg += `· Ciudad/Lugar: ${city}\n`;
    if (date) msg += `· Fecha estimada: ${date}\n`;
    if (notes) msg += `· Detalles adicionales: ${notes}\n`;
    msg += `\n¡Todo el poder de la salsa para mi evento!`;
    return `https://wa.me/573165275176?text=${encodeURIComponent(msg)}`;
  };

  const services = [
    'Bodas y Matrimonios Salseros',
    'Cumpleaños & Fiestas Temáticas de los 70s/80s',
    'Eventos Corporativos y Empresariales',
    'Festivales, Discotecas & Clubes Nocturnos',
    'Sonido Profesional, Iluminación & Tornamesas Reales',
    'Hora Loca Salsera con Campana, Güiro y Animación',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Tarjeta Principal de Contrataciones */}
      <div className="rounded-3xl bg-gradient-to-b from-[#1C0E2D] via-[#150924] to-[#0D0516] border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow decorativo de fondo */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E91E63]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#FFC107] uppercase px-3 py-1 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30">
              CONTRATACIONES & FECHAS DISPONIBLES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
              Lleva "Todo el Poder de la Salsa" a tu Evento
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Disponible en <strong className="text-white">Ibagué, Tolima</strong> y para toda Colombia.
              Garantía de sabor, técnica de mezcla en vivo y animación inolvidable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Columna Izquierda: Servicios y Contacto Directo */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Music className="w-4 h-4 text-[#E91E63]" />
                <span>Formatos de Show Salsero</span>
              </h4>

              <div className="space-y-2.5 mb-6">
                {services.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Botones de Contacto Inmediato */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <a
                  href={`tel:${phoneNumber}`}
                  className="w-full h-12 rounded-2xl bg-[#1E1030] hover:bg-[#281540] border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98"
                >
                  <Phone className="w-4 h-4 text-[#00E5FF]" />
                  <span>Llamar Directo: {phoneDisplay}</span>
                </a>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-2xl bg-[#25D366] hover:bg-[#22bf5b] text-white font-black text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.4)] active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chatear por WhatsApp Ahora</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Cotizador Rápido para WhatsApp */}
            <div className="rounded-2xl bg-[#12071E] border border-white/10 p-5 shadow-inner">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFC107]" />
                <span>Generar Cotización Rápida</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Tu Nombre o Empresa</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Ej. Carlos Mendoza"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1C0E2D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E91E63]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Tipo de Evento</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#1C0E2D] border border-white/10 text-white focus:outline-none focus:border-[#E91E63]"
                    >
                      <option value="Boda / Matrimonio">Boda / Matrimonio</option>
                      <option value="Cumpleaños / Fiesta Privada">Cumpleaños / Fiesta</option>
                      <option value="Evento Corporativo">Evento Corporativo</option>
                      <option value="Discoteca / Festival">Discoteca / Festival</option>
                      <option value="Show de Salsa y Vinilo">Show de Salsa y Vinilo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Ciudad</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Ibagué, Bogotá, Cali..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1C0E2D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E91E63]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Fecha Estimada</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1C0E2D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E91E63]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Mensaje o Requerimientos</label>
                  <textarea
                    rows={2}
                    placeholder="Número de personas, hora aproximada..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1C0E2D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E91E63] resize-none"
                  />
                </div>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Cotización a WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
