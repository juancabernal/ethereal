import { useMemo, useState } from 'react';
import { products, activeProducts } from '../data/products';
import { globalConfig } from '../config/globalConfig';
import { baseResponses } from '../data/chatResponses';

const normalize = (text = '') => text.toLowerCase();

const productMatches = (question) => {
  const q = normalize(question);
  return products.find((product) =>
    q.includes(normalize(product.name)) ||
    normalize(product.name).includes(q) ||
    q.includes(product.id.toLowerCase()) ||
    (product.shortDescription && q.includes(normalize(product.shortDescription))) ||
    (product.keywords && product.keywords.some((keyword) => q.includes(normalize(keyword)))),
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
    const q = normalize(question);
    const matched = productMatches(q);

    if (matched) {
      if (!matched.isActive) {
        return `${matched.name} está temporalmente fuera del catálogo activo. Podemos revisar disponibilidad o recomendar un reemplazo si nos escribes a WhatsApp: ${globalConfig.whatsapp}.`;
      }
      if (q.includes('recet')) {
        return `Para ${matched.name}, sugerimos: ${summarizeRecipes(matched)}.`;
      }
      if (q.includes('nutri') || q.includes('vit')) {
        return `Info nutricional de ${matched.name}: ${summarizeNutrition(matched)}.`;
      }
      if (q.includes('benef')) {
        return `Beneficios de ${matched.name}: ${matched.benefits.join(' · ')}.`;
      }
      if (q.includes('precio') || q.includes('vale') || q.includes('cost')) {
        return `${matched.name} está en $${matched.price} COP (pesos colombianos). Podemos ajustar según cantidad o personalización.`;
      }
      return `${matched.name}: ${matched.shortDescription}. Precio referencial: $${matched.price} COP. Son productos orgánicos de berries con foco en fresas, elaborados localmente (sin certificación aún). Podemos coordinar envío y ajustar el pedido por WhatsApp.`;
    }

    if (q.includes('ubic') || q.includes('donde') || q.includes('loca') || q.includes('la union')) {
      return `Estamos en ${globalConfig.ubicacion}. Somos dos jóvenes de 20 años y coordinamos todo desde aquí; podemos entregar el mismo día en el municipio y alrededores y cubrir el resto del país en menos de una semana.`;
    }

    if (q.includes('envio') || q.includes('entrega') || q.includes('domicilio') || q.includes('cobertura')) {
      return `${globalConfig.textos.envio} En zonas lejanas puede haber mínimos, negociables por WhatsApp. Hay cobertura nacional.`;
    }

    if (q.includes('pago') || q.includes('tarjeta') || q.includes('transfer') || q.includes('nequi') || q.includes('pse')) {
      return globalConfig.textos.pagos;
    }

      if (q.includes('pedido') || q.includes('comprar') || q.includes('whatsapp')) {
        return `${globalConfig.textos.whatsappCTA} ${globalConfig.whatsapp}. Cuéntanos cantidades, si necesitas cajas personalizadas o si quieres revisar si se puede añadir un producto no listado.`;
      }

    if (q.includes('producto') || q.includes('catálogo') || q.includes('catalogo')) {
      const top = activeProducts
        .slice(0, 3)
        .map((p) => `${p.name} ($${p.price} COP)`) // catálogo no definitivo
        .join(' · ');
      return `Nuestro catálogo de productos orgánicos de berries no es definitivo; algunos destacados son: ${top}. Si buscas algo fuera de la lista, podemos revisar si es posible añadirlo.`;
    }

    if (q.includes('cop') || q.includes('peso') || q.includes('colomb')) {
      return 'Todos los valores están expresados en pesos colombianos (COP). Si necesitas cotización para otro país, lo coordinamos por WhatsApp.';
    }

    if (q.includes('personaliz') || q.includes('regalo') || q.includes('mayor') || q.includes('caja') || q.includes('especial')) {
      return 'Aceptamos cajas personalizadas, empaques de regalo, cantidades grandes y descuentos por compras al por mayor (negociados por WhatsApp). Dinos qué tienes en mente y lo revisamos.';
    }

    if (q.includes('horario') || q.includes('hora')) {
      return globalConfig.horarios;
    }

    if (q.includes('receta') || q.includes('parfait') || q.includes('smoothie') || q.includes('mermelada') || q.includes('batido')) {
      return 'Ideas rápidas: Parfait de yogurt y granola con fresas; Smoothie cremoso con fresa y banano; Mermelada casera a fuego bajo; Batido ligero con leche de almendra; Fresas con crema; Postres simples como tartaletas; Torta sencilla con relleno de fresa. Puedo darte más detalles si me dices cuál te gusta.';
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
//.