import { useMemo, useState } from 'react';
import { products } from '../data/products';
import { siteConfig } from '../config/siteConfig';
import { baseResponses } from '../data/chatResponses';

const normalize = (text = '') => text.toLowerCase();

const productMatches = (question) => {
  const q = normalize(question);
  return products.find((product) =>
    q.includes(normalize(product.name)) ||
    normalize(product.name).includes(q) ||
    q.includes(product.id.toLowerCase()) ||
    (product.shortDescription && q.includes(normalize(product.shortDescription))),
  );
};

const summarizeNutrition = (product) =>
  product.nutritionalInfo
    .slice(0, 3)
    .map((info) => `${info.label}: ${info.value}`)
    .join(' · ');

const summarizeRecipes = (product) =>
  product.recipes
    .slice(0, 2)
    .map((recipe) => `${recipe.name} (${recipe.description})`)
    .join(' | ');

export function useChatbotLogic() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hola, soy el asistente de ETHEREAL. Pregúntame sobre productos, precios, recetas o cómo pedir por WhatsApp.",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const priceRange = useMemo(() => {
    const sorted = [...products].map((p) => p.price).sort((a, b) => a - b);
    return { min: sorted[0], max: sorted[sorted.length - 1] };
  }, []);

  const generateResponse = (question) => {
    const q = normalize(question);
    const matched = productMatches(q);

    if (matched) {
      if (q.includes('recet')) {
        return `Para ${matched.name}, sugerimos: ${summarizeRecipes(matched)}.`;
      }
      if (q.includes('nutri') || q.includes('vit')) {
        return `Info nutricional de ${matched.name}: ${summarizeNutrition(matched)}.`;
      }
      return `${matched.name}: ${matched.shortDescription}. Precio: $${matched.price} MXN. Podemos enviar ${matched.name} en ${matched.images.length} presentaciones. Escríbenos por WhatsApp para pedir.`;
    }

    if (q.includes('precio') || q.includes('cuánto') || q.includes('cost')) {
      return `Nuestros precios van de $${priceRange.min} a $${priceRange.max} MXN dependiendo del producto y cantidad.`;
    }

    if (q.includes('pedido') || q.includes('comprar') || q.includes('whatsapp')) {
      return `Haz tu pedido directo en WhatsApp: ${siteConfig.whatsappNumber}. Enviaremos un mensaje prellenado para ti.`;
    }

    if (q.includes('producto') || q.includes('catálogo') || q.includes('catalogo')) {
      const top = products
        .slice(0, 3)
        .map((p) => `${p.name} ($${p.price} MXN)`) 
        .join(' · ');
      return `Algunos destacados: ${top}. También puedes ver recetas y nutrición dentro de cada ficha.`;
    }

    return baseResponses.fallback[Math.floor(Math.random() * baseResponses.fallback.length)];
  };

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setIsThinking(true);

    setTimeout(() => {
      const reply = generateResponse(trimmed);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setIsThinking(false);
    }, 420);
  };

  return {
    messages,
    isOpen,
    isThinking,
    toggleOpen: () => setIsOpen((prev) => !prev),
    sendMessage,
  };
}
