import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { globalConfig } from '../config/globalConfig';

export function FloatingWhatsApp() {
  if (!globalConfig.toggles.mostrarWhatsAppFlotante || !globalConfig.whatsapp) return null;

  const whatsappNumber = (globalConfig.whatsapp || '').replace(/[^\d]/g, '');

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-6 z-40"
      title="Abrir WhatsApp"
      initial={{ scale: 0, opacity: 0, rotate: -12 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full whatsapp-pulse" />
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-400 shadow-lg text-white relative overflow-hidden">
          <Phone className="w-7 h-7" />
          <span className="glare" />
        </div>
      </div>
    </motion.a>
  );
}
