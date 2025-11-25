import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^\d]/g, '')}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-40"
      initial={{ scale: 0, opacity: 0, rotate: -12 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1 }}
    >
      <div className="relative">
        <div className="animate-pulseGlow absolute inset-0 rounded-full bg-neon/30" />
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-berry to-neon shadow-glow text-white relative overflow-hidden">
          <MessageCircle className="w-7 h-7" />
          <span className="glare" />
        </div>
      </div>
    </motion.a>
  );
}
