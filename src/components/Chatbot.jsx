import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useChatbotLogic } from '../hooks/useChatbotLogic';

export function Chatbot() {
  const { messages, isOpen, isThinking, toggleOpen, sendMessage } = useChatbotLogic();
  const [input, setInput] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen, isThinking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-20 md:right-28 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-[320px] sm:w-[360px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-glow bg-black/60 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-berry/70 via-lilac/60 to-neon/60 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blush" />
                </div>
                <div>
                  <p className="text-sm text-blush/70 uppercase tracking-[0.2em]">Asistente</p>
                  <p className="text-blush font-semibold">ETHEREAL Bot</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleOpen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                aria-label="Cerrar chatbot"
              >
                <X className="w-4 h-4 text-blush" />
              </button>
            </div>

            <div ref={messagesRef} className="max-h-80 overflow-y-auto space-y-3 px-4 py-4 text-sm">
              {messages.map((message, idx) => (
                <motion.div
                  key={`${message.role}-${idx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed backdrop-blur-sm border border-white/10 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-neon/80 to-lilac/70 text-night shadow-glow'
                        : 'bg-white/5 text-blush'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-blush/70 text-xs">
                    Escribiendo...
                  </div>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/10 px-4 py-3 bg-black/50">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregúntanos sobre precios, recetas..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-blush placeholder:text-blush/50 focus:outline-none focus:border-neon/50"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.96 }}
                  className="p-3 rounded-full bg-gradient-to-br from-neon to-lilac text-night shadow-glow"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleOpen}
        whileTap={{ scale: 0.95 }}
        whileHover={{ y: -2 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-berry to-neon shadow-glow text-night flex items-center justify-center relative overflow-hidden"
        aria-expanded={isOpen}
        aria-label="Abrir chatbot"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X className="w-6 h-6 text-night" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: -8 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
