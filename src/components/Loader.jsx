import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-night">
      <motion.div
        className="relative w-32 h-32 rounded-[28px] bg-gradient-to-br from-berry to-lilac shadow-glow flex items-center justify-center overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
        <motion.div
          className="relative rounded-2xl bg-black/40 px-5 py-3 text-blush font-semibold tracking-[0.2em] flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', repeatType: 'reverse' }}
        >
          <Sparkles className="w-5 h-5 text-neon" />
          ETHEREAL
        </motion.div>
      </motion.div>
    </div>
  );
}
