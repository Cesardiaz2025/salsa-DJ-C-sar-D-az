import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

export const FloatingWhatsAppFab: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const phone = '573165275176';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    '¡Hola DJ César Díaz! Quiero información y cotización para un evento salsero.'
  )}`;

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* Tooltip flotante con aviso */}
      {showTooltip && (
        <div className="relative bg-[#1C0E2D] text-white border border-[#25D366]/40 px-3 py-1.5 rounded-xl shadow-xl text-xs flex items-center gap-2 max-w-xs animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="font-semibold text-slate-100">
            ¡Escríbele directo a DJ César!
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Cerrar aviso"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Botón Flotante con pulso verde WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-200 group"
        aria-label="Contactar a DJ César Díaz por WhatsApp"
      >
        {/* Anillo de pulso sutil */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35 pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 fill-current transition-transform group-hover:rotate-12" />
      </a>
    </div>
  );
};
