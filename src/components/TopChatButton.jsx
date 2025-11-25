import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useUiStore } from '../store/uiStore';

export function TopChatButton() {
  const toggleOpen = useUiStore((s) => s.toggleChat);

  return (
    <motion.button
      type="button"
      onClick={() => { toggleOpen(); }}
      whileTap={{ scale: 0.96 }}
      className="hidden md:flex items-center gap-3 py-3 px-4 rounded-full shadow-glow bg-gradient-to-r from-berry to-lilac text-white font-semibold absolute md:top-36 lg:top-40 right-32 z-40 border border-white/10"
      aria-label="Abrir chat"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
        <Bot className="w-5 h-5 text-blush" />
      </div>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-xs text-white/70 uppercase tracking-[0.12em]">Asistente</span>
        <span className="text-sm font-semibold">Chatea con nosotros</span>
      </div>
    </motion.button>
  );
}
