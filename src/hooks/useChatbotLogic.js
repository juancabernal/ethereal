import { useMemo, useState } from 'react';
import { products, activeProducts } from '../data/products';
import { globalConfig } from '../config/globalConfig';
import { baseResponses } from '../data/chatResponses';
import { knowledgeBase } from '../data/knowledgeBase';

const normalize = (text = '') =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const tokenize = (text = '') => normalize(text).split(/\s+/).filter(Boolean);

const fuzzyIncludes = (question, keyword) => {
  const q = normalize(question);
  const k = normalize(keyword);
  return q.includes(k) || k.includes(q) || q.split(' ').some((word) => word.startsWith(k.slice(0, 4)));
};

const scoreKeywords = (question, keywords = []) => {
  const tokens = tokenize(question);
  const normalizedKeywords = keywords.map(normalize);
  const hits = normalizedKeywords.filter((kw) => tokens.some((token) => token.startsWith(kw.slice(0, 4)) || token === kw)).length;
  const fuzzyHits = normalizedKeywords.filter((kw) => fuzzyIncludes(question, kw)).length;
  return (hits * 2 + fuzzyHits) / Math.max(1, normalizedKeywords.length * 2);
};

const productMatches = (question) => {
  const q = normalize(question);
  const tokens = tokenize(question);
  return products.find((product) =>
    q.includes(normalize(product.name)) ||
    normalize(product.name).includes(q) ||
    q.includes(product.id.toLowerCase()) ||
    tokens.some((token) => product.keywords?.some((keyword) => normalize(keyword).startsWith(token.slice(0, 4)))) ||
    (product.shortDescription && q.includes(normalize(product.shortDescription))) ||
    (product.keywords && product.keywords.some((keyword) => q.includes(normalize(keyword)))),
  );
};

const findFruitProfile = (question) => {
  const q = normalize(question);
  return knowledgeBase.products.find((item) =>
    item.aliases.some((alias) => q.includes(normalize(alias))) || normalize(item.name).includes(q),
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

const matchFAQ = (question) => {
  const scores = knowledgeBase.faqs.map((faq) => ({
    faq,
    score: scoreKeywords(question, tokenize(faq.question)),
  }));
  return scores.sort((a, b) => b.score - a.score)[0];
};

const matchIntent = (question) => {
  const scored = knowledgeBase.intents.map((intent) => ({
    intent,
    score: scoreKeywords(question, intent.keywords),
  }));
  const best = scored.sort((a, b) => b.score - a.score)[0];
  return best && best.score >= 0.2 ? best.intent : null;
};

export function useChatbotLogic() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text:
        `Hola, soy el asistente de ${globalConfig.nombre_empresa} en ${globalConfig.ubicacion}. Pregúntame sobre nuestros productos orgánicos de berries (fresas, arándanos, zarzamoras), envíos, pagos, recetas o cómo pedir por WhatsApp.`,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const priceRange = useMemo(() => {
    const sorted = [...activeProducts].map((p) => p.price).sort((a, b) => a - b);
    return { min: sorted[0], max: sorted[sorted.length - 1] };
  }, []);

  const generateResponse = (question) => {
    const matchedProduct = productMatches(question);
    const fruitProfile = findFruitProfile(question);
    const faqMatch = matchFAQ(question);
    const intent = matchIntent(question);
    const lowerQuestion = normalize(question);

    if (matchedProduct) {
      if (!matchedProduct.isActive) {
        return `${matchedProduct.name} está temporalmente fuera del catálogo activo. Podemos revisar disponibilidad o recomendar un reemplazo si nos escribes a WhatsApp: ${globalConfig.whatsapp}.`;
      }

      if (lowerQuestion.includes('recet') || lowerQuestion.includes('idea')) {
        return `Para ${matchedProduct.name}, sugerimos: ${summarizeRecipes(matchedProduct)}. ¿Quieres detalles paso a paso?`;
      }

      if (lowerQuestion.includes('nutri') || lowerQuestion.includes('vit')) {
        return `Info nutricional de ${matchedProduct.name}: ${summarizeNutrition(matchedProduct)}. Puedo contarte más vitaminas o minerales si lo necesitas.`;
      }

      if (lowerQuestion.includes('benef')) {
        return `Beneficios de ${matchedProduct.name}: ${matchedProduct.benefits.join(' · ')}.`;
      }

      if (lowerQuestion.includes('precio') || lowerQuestion.includes('vale') || lowerQuestion.includes('cost')) {
        return `${matchedProduct.name} está en $${matchedProduct.price} COP (pesos colombianos). Podemos ajustar según cantidad, personalización o combo con otros berries.`;
      }

      return `${matchedProduct.name}: ${matchedProduct.shortDescription}. Precio referencial: $${matchedProduct.price} COP. Coordinamos envío y personalización directo en WhatsApp (${knowledgeBase.company.contact.whatsappLink}).`;
    }

    if (fruitProfile) {
      if (lowerQuestion.includes('benef')) {
        return `${fruitProfile.name} · Beneficios: ${fruitProfile.benefits.join(' | ')}. Son ideales para planes saludables y snacks diarios.`;
      }
      if (lowerQuestion.includes('nutri') || lowerQuestion.includes('vit') || lowerQuestion.includes('miner')) {
        const { nutrition } = fruitProfile;
        const vitaminList = nutrition.vitamins?.join(', ');
        const mineralList = nutrition.minerals ? nutrition.minerals.join(', ') : undefined;
        return `${fruitProfile.name} (por ${nutrition.serving || '100 g'}): ${nutrition.energy || ''}${nutrition.energy ? ' · ' : ''}${nutrition.carbs || ''}${nutrition.carbs ? ' · ' : ''}${nutrition.fiber || ''}${nutrition.fiber ? ' · ' : ''}${nutrition.sugars || ''}${nutrition.sugars ? ' · ' : ''}${nutrition.protein || ''}${nutrition.protein ? ' · ' : ''}${nutrition.fat || ''}${nutrition.fat ? ' · ' : ''}${vitaminList ? `Vitaminas: ${vitaminList}` : ''}${mineralList ? ` · Minerales: ${mineralList}` : ''}`.replace(/ · $/, '');
      }
      return `${fruitProfile.name}: ${fruitProfile.description} Beneficios destacados: ${fruitProfile.benefits.slice(0, 2).join(' · ')}.`;
    }

    if (intent) {
      switch (intent.responseKey) {
        case 'shipping':
          return `${knowledgeBase.shipping.sameDay} ${knowledgeBase.shipping.nearby} ${knowledgeBase.shipping.national} ${knowledgeBase.shipping.notes}`;
        case 'payments':
          return `Pagos aceptados: ${knowledgeBase.payments.accepted.join(', ')}. No aceptamos por ahora: ${knowledgeBase.payments.notAccepted.join(', ')}. ${knowledgeBase.payments.conditional}`;
        case 'orders':
          return `${globalConfig.textos.whatsappCTA} ${knowledgeBase.company.contact.whatsappLink}. Cuéntanos cantidades, destino y si quieres cajas personalizadas.`;
        case 'pricing':
          return `Nuestros precios referenciales van de $${priceRange.min} a $${priceRange.max} COP en productos activos. Dime qué formato necesitas y ajustamos.`;
        case 'origin':
          return `${knowledgeBase.company.location}; somos ${knowledgeBase.company.founders}. ${knowledgeBase.company.sourcing}`;
        case 'philosophy':
          return `${knowledgeBase.company.name} significa lo etéreo: ${knowledgeBase.company.philosophy}`;
        case 'benefits':
          return 'Nuestros berries son ricos en antioxidantes, vitamina C y fibra. Dime cuál te interesa (fresa, arándano, zarzamora) y te cuento beneficios detallados.';
        case 'recipes': {
          const recipe = knowledgeBase.recipes.find((item) => item.tags.some((tag) => lowerQuestion.includes(normalize(tag))));
          if (recipe) {
            return `${recipe.name} (${recipe.time}, ${recipe.servings}): Ingredientes: ${recipe.ingredients.join(', ')}. Preparación: ${recipe.preparation}`;
          }
          const list = knowledgeBase.recipes.slice(0, 3).map((r) => r.name).join(' · ');
          return `Tenemos recetas con berries como: ${list}. Dime cuál te comparto paso a paso.`;
        }
        default:
          break;
      }
    }

    if (faqMatch?.score >= 0.35) {
      return faqMatch.faq.answer;
    }

    if (lowerQuestion.includes('producto') || lowerQuestion.includes('catalogo') || lowerQuestion.includes('catálogo')) {
      const top = activeProducts
        .slice(0, 3)
        .map((p) => `${p.name} ($${p.price} COP)`) // catálogo no definitivo
        .join(' · ');
      return `Catálogo orgánico en evolución: ${top}. Si buscas algo fuera de la lista, podemos añadirlo o armar combos.`;
    }

    if (lowerQuestion.includes('cop') || lowerQuestion.includes('peso') || lowerQuestion.includes('colomb')) {
      return 'Todos los valores están en pesos colombianos (COP). Si necesitas cotización internacional, la calculamos por WhatsApp.';
    }

    if (lowerQuestion.includes('personaliz') || lowerQuestion.includes('regalo') || lowerQuestion.includes('mayor') || lowerQuestion.includes('caja') || lowerQuestion.includes('especial')) {
      return 'Preparamos cajas personalizadas, opciones para regalo y descuentos por volumen. Escríbenos tu idea y la armamos juntos.';
    }

    if (lowerQuestion.includes('horario') || lowerQuestion.includes('hora')) {
      return knowledgeBase.company.contact.availability;
    }

    if (lowerQuestion.includes('recom') || lowerQuestion.includes('suger') || lowerQuestion.includes('que me recomiendas')) {
      const suggestion = knowledgeBase.suggestions.openers[Math.floor(Math.random() * knowledgeBase.suggestions.openers.length)];
      const prompt = knowledgeBase.suggestions.prompts[Math.floor(Math.random() * knowledgeBase.suggestions.prompts.length)];
      return `${suggestion} ${prompt}`;
    }

    if (lowerQuestion.includes('receta') || lowerQuestion.includes('parfait') || lowerQuestion.includes('smoothie') || lowerQuestion.includes('mermelada') || lowerQuestion.includes('batido')) {
      const recipe = knowledgeBase.recipes.find((item) => item.tags.some((tag) => lowerQuestion.includes(normalize(tag))));
      if (recipe) {
        return `${recipe.name} (${recipe.time}, ${recipe.servings}): ${recipe.preparation}`;
      }
      return 'Tengo recetas como parfait de fresa, batido antioxidante, smoothie bowl y más. Dime cuál quieres y te la envío completa.';
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
