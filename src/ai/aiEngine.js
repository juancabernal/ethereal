import { knowledgeBase } from '../data/knowledgeBase';
import { baseResponses } from '../data/chatResponses';

const WEBLLM_MODELS = [
  { id: 'Phi-3-mini-4k-instruct-q4f16_1-MLC', label: 'Phi-3-mini-instruct' },
  { id: 'Phi-2-q4f16_1-MLC', label: 'Phi-2' },
];

let enginePromise;
let activeModelLabel = null;

const hasWebGPU = typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator?.gpu;

const normalize = (text = '') =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const tokenize = (text = '') => normalize(text).split(/\s+/).filter(Boolean);

const whatsappFallback = 'Puedo ayudarte directamente por WhatsApp 👉 https://wa.me/573226374266';

async function loadWebLLM() {
  if (!hasWebGPU) {
    throw new Error('WebGPU no disponible en este dispositivo');
  }

  const { CreateMLCEngine, prebuiltAppConfig } = await import('@mlc-ai/web-llm');

  for (const model of WEBLLM_MODELS) {
    try {
      const engine = await CreateMLCEngine(model.id, {
        appConfig: prebuiltAppConfig,
        initProgressCallback: () => {},
      });
      activeModelLabel = model.label;
      return engine;
    } catch (error) {
      console.warn(`[WebLLM] Falló la carga de ${model.label}:`, error);
    }
  }

  throw new Error('No se pudo cargar WebLLM');
}

async function getEngine() {
  if (!enginePromise) {
    enginePromise = loadWebLLM();
  }
  return enginePromise;
}

export function detectIntent(userMessage, kb = knowledgeBase) {
  const tokens = tokenize(userMessage);
  const scores = Object.entries(kb.intents).map(([intentId, keywords]) => {
    if (!keywords.length) return { intentId, score: 0 };
    const normalizedKeywords = keywords.map(normalize);
    const hitCount = normalizedKeywords.filter((kw) =>
      tokens.some((token) => token === kw || token.startsWith(kw.slice(0, 4))) || normalize(userMessage).includes(kw),
    ).length;
    return { intentId, score: hitCount / Math.max(1, normalizedKeywords.length) };
  });

  const best = scores.sort((a, b) => b.score - a.score)[0];
  return best?.score > 0 ? best.intentId : 'desconocido';
}

function matchProduct(userMessage) {
  const query = normalize(userMessage);
  return knowledgeBase.products.find((product) =>
    product.aliases.some((alias) => query.includes(normalize(alias))) || query.includes(normalize(product.name)),
  );
}

function matchRecipe(userMessage) {
  const query = normalize(userMessage);
  return knowledgeBase.recipes.find((recipe) => recipe.tags.some((tag) => query.includes(normalize(tag))));
}

function matchFAQ(userMessage) {
  const scores = knowledgeBase.faqs.map((faq) => ({
    faq,
    score: tokenize(faq.question).filter((kw) => normalize(userMessage).includes(kw)).length,
  }));
  const best = scores.sort((a, b) => b.score - a.score)[0];
  return best?.score ? best.faq : null;
}

function baseContextSummary() {
  return [
    `${knowledgeBase.company.name} opera en ${knowledgeBase.company.location} con atención humana y trazabilidad local.`,
    `Pagos aceptados: ${knowledgeBase.payments.accepted.join(', ')}. Envíos: ${knowledgeBase.shipping.sameDay} ${knowledgeBase.shipping.nearby}`,
    `Beneficios de berries: ${knowledgeBase.nutritionHighlights.join(' ')} `,
  ].join('\n');
}

function localAnswer(userMessage, intent) {
  const product = matchProduct(userMessage);
  const recipe = matchRecipe(userMessage);
  const faq = matchFAQ(userMessage);
  const lower = normalize(userMessage);
  const responses = [];

  if (product) {
    responses.push(
      `${product.name}: ${product.description} ${product.highlights.join(' · ')}. ${product.priceNotes} Beneficios clave: ${
        product.benefits.slice(0, 2).join(' | ')
      }.`,
    );

    if (lower.includes('nutri') || lower.includes('vit')) {
      const nutrition = product.nutrition;
      const vitaminList = nutrition.vitamins ? `Vitaminas: ${nutrition.vitamins.join(', ')}.` : '';
      const mineralList = nutrition.minerals ? ` Minerales: ${nutrition.minerals.join(', ')}.` : '';
      responses.push(
        `Perfil nutricional (${nutrition.serving || '100 g'}): ${nutrition.energy || ''} ${nutrition.carbs || ''} ${
          nutrition.fiber || ''
        } ${nutrition.protein || ''} ${nutrition.sugars || ''} ${vitaminList}${mineralList}`.trim(),
      );
    }
  }

  if (intent === 'envios') {
    responses.push(
      `${knowledgeBase.shipping.sameDay} ${knowledgeBase.shipping.nearby} ${knowledgeBase.shipping.national} Empaque: ${knowledgeBase.shipping.packaging}. ${knowledgeBase.shipping.notes}`,
    );
  }

  if (intent === 'pagos') {
    responses.push(
      `Pagos aceptados: ${knowledgeBase.payments.accepted.join(', ')}. No aceptamos: ${knowledgeBase.payments.notAccepted.join(
        ', ',
      )}. ${knowledgeBase.payments.conditional}`,
    );
  }

  if (intent === 'ubicacion' || intent === 'empresa') {
    responses.push(
      `${knowledgeBase.company.name} nació en ${knowledgeBase.company.location}. ${knowledgeBase.company.philosophy} Somos ${
        knowledgeBase.company.founders
      } y coordinamos de forma personalizada.`,
    );
  }

  if (intent === 'precios' && !product) {
    responses.push(
      'Nuestros precios son referenciales y se ajustan por volumen. La caja premium de fresas de 1 kg está en $24.000 COP y los demás formatos los confirmamos en el chat.',
    );
  }

  if (intent === 'promociones') {
    responses.push(
      `${knowledgeBase.promotions.bundles} ${knowledgeBase.promotions.gifts} ${knowledgeBase.promotions.loyalty}`,
    );
  }

  if (intent === 'catalogo') {
    responses.push(
      `Catálogo actual: ${knowledgeBase.products.map((p) => p.name).join(' · ')}. Pregunta por disponibilidad puntual y opciones personalizadas.`,
    );
  }

  if (intent === 'beneficios') {
    responses.push(
      `Beneficios destacados: berries ricas en vitamina C, polifenoles y fibra que apoyan corazón, cerebro y piel. ${
        knowledgeBase.nutritionHighlights[0]
      }`,
    );
  }

  if (intent === 'nutricion' && !product) {
    responses.push('Cuéntame la fruta que te interesa (fresas, arándanos o zarzamoras) y te comparto macros y vitaminas.');
  }

  if (intent === 'politicas') {
    responses.push(
      `${knowledgeBase.policies.freshness} ${knowledgeBase.policies.returns} ${knowledgeBase.policies.sustainability} ${knowledgeBase.policies.privacy}`,
    );
  }

  if (intent === 'disponibilidad') {
    responses.push('Trabajamos con cosecha fresca diaria; confirmo stock y tiempos al instante por WhatsApp.');
  }

  if (intent === 'contacto') {
    responses.push(
      `WhatsApp: ${knowledgeBase.company.contact.whatsappLink} | Tel: ${knowledgeBase.company.contact.phone} | Instagram: ${knowledgeBase.company.contact.instagram}.`,
    );
  }

  if (intent === 'sustituciones') {
    responses.push('Si algún berry no está disponible, proponemos combos mixtos o ajustes en mermeladas bajas en azúcar.');
  }

  if (intent === 'recetas' && recipe) {
    responses.push(
      `${recipe.name} (${recipe.time}, ${recipe.servings}). Ingredientes: ${recipe.ingredients.join(', ')}. Preparación: ${
        recipe.preparation
      }`,
    );
  }

  if (intent === 'faq' && faq) {
    responses.push(faq.answer);
  }

  if (!responses.length && faq) {
    responses.push(faq.answer);
  }

  if (!responses.length && recipe) {
    responses.push(
      `${recipe.name} (${recipe.time}). Ingredientes clave: ${recipe.ingredients.slice(0, 4).join(', ')}. Te comparto el paso a paso si quieres.`,
    );
  }

  return responses.join('\n\n');
}

function buildPrompt(userMessage, context) {
  return [
    'Actúa como un asistente de ETHEREAL: cercano, profesional y juvenil. Habla en español neutro con calidez y sin tono robótico.',
    'Usa la información de contexto local si está disponible y responde de forma breve, natural y útil. No inventes datos de la empresa.',
    context ? `Contexto local:\n${context}` : `Contexto base:\n${baseContextSummary()}`,
    `Consulta de la persona: ${userMessage}`,
    'Responde con máximo 2 párrafos cortos y, si aplica, tips rápidos o pasos enumerados.',
  ].join('\n');
}

export async function askAI(prompt) {
  try {
    const engine = await getEngine();
    const completion = await engine.chat.completions.create({
      messages: [
        { role: 'system', content: 'Eres un asistente de ventas y nutrición para ETHEREAL en Colombia.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      stream: false,
    });

    return completion?.choices?.[0]?.message?.content?.trim();
  } catch (error) {
    console.warn('[WebLLM] No se pudo generar la respuesta:', error);
    return null;
  }
}

export async function hybridResponse(userMessage) {
  const intent = detectIntent(userMessage);
  const local = localAnswer(userMessage, intent);
  const requiresAI = intent === 'recetas' || intent === 'nutricion' || !local || userMessage.length > 180;

  if (requiresAI) {
    const prompt = buildPrompt(userMessage, local);
    const aiReply = await askAI(prompt);

    if (aiReply && local) {
      return `${local}\n\nIdea extra IA (${activeModelLabel || 'WebLLM'}): ${aiReply}`;
    }

    if (aiReply) {
      return aiReply;
    }

    if (local) {
      return `${local}\n\n${whatsappFallback}`;
    }

    return whatsappFallback;
  }

  if (local) return local;

  const fallback = baseResponses.fallback[Math.floor(Math.random() * baseResponses.fallback.length)];
  return `${fallback}\n\n${knowledgeBase.fallback}`;
}

export async function generateResponse(userMessage) {
  const trimmed = userMessage?.trim();
  if (!trimmed) return baseResponses.fallback[0];

  try {
    return await hybridResponse(trimmed);
  } catch (error) {
    console.warn('[Chatbot] Respuesta híbrida falló:', error);
    return whatsappFallback;
  }
}

export function getActiveModelLabel() {
  return activeModelLabel || 'Sin modelo (fallback local)';
}
