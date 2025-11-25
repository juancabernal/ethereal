import { useState } from 'react';
import { baseResponses } from '../data/chatResponses';
import { globalConfig } from '../config/globalConfig';
import { knowledgeBase } from '../data/knowledgeBase';

export function useChatbotLogic(respondWith) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hola, soy el asistente de ${globalConfig.nombre_empresa} en ${globalConfig.ubicacion}. Pregúntame sobre nuestros productos orgánicos de berries, envíos, pagos, recetas o cómo pedir por WhatsApp.`,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setIsThinking(true);

    try {
      const reply = respondWith ? await respondWith(trimmed) : baseResponses.fallback[0];
      setMessages((prev) => [...prev, { role: 'bot', text: reply || knowledgeBase.fallback }]);
    } catch (error) {
      console.warn('[Chatbot] No se pudo responder:', error);
      setMessages((prev) => [...prev, { role: 'bot', text: knowledgeBase.fallback }]);
    } finally {
      setIsThinking(false);
    }
  };

  return {
    messages,
    isOpen,
    isThinking,
    toggleOpen: () => setIsOpen((prev) => !prev),
    sendMessage,
  };
}
