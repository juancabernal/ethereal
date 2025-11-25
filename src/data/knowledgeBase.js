export const knowledgeBase = {
  company: {
    name: 'ETHEREAL',
    founded: 2024,
    founders: 'Emprendimiento de dos jóvenes de 20 años',
    location: 'La Unión, Antioquia – Colombia',
    philosophy:
      'Inspirados en lo etéreo: delicado, natural y casi celestial. Productos orgánicos reales con prácticas saludables y calidad superior.',
    sourcing:
      'Fresas orgánicas adquiridas a emprendedores locales aliados, aún sin certificaciones pero con trazabilidad y trabajo responsable.',
    contact: {
      phone: '+57 3226374266',
      whatsappLink: 'https://wa.me/573226374266',
      availability: 'Atención 24/7; respuestas pueden tardar un poco pero siempre te acompañamos.'
    },
    highlights: [
      'Catálogo en evolución centrado en fresas como eje principal.',
      'Productos orgánicos reales sin certificaciones aún, priorizando calidad y prácticas saludables.',
      'Coordinación cercana y humana: todo se negocia directamente por WhatsApp para personalizar el pedido.'
    ]
  },
  shipping: {
    sameDay: 'En La Unión entregamos el mismo día.',
    nearby: 'Municipios cercanos reciben entregas rápidas coordinadas en el día.',
    national: 'Otras zonas de Colombia: menos de una semana según ruta y clima.',
    notes:
      'Para envíos lejanos puede aplicarse un pedido mínimo; siempre se confirma y negocia por WhatsApp.',
    flexibility: 'Cobertura nacional con ajustes según disponibilidad y logística local.'
  },
  payments: {
    accepted: ['Efectivo', 'Transferencia', 'Nequi'],
    notAccepted: ['Tarjetas', 'PSE', 'Daviplata', 'Pagos digitales integrados'],
    conditional:
      'Pago contraentrega solo es posible si se acuerda previamente por WhatsApp. No hay cobro con datáfono/terminal por ahora.'
  },
  products: [
    {
      id: 'fresas',
      name: 'Fresas orgánicas',
      aliases: ['fresa', 'fresas', 'frutilla', 'frutillas', 'berry roja', 'berries rojas'],
      description:
        'Fresas orgánicas locales como producto insignia: dulces, frescas y con aroma floral. Base de smoothies, bowls, postres y cajas de regalo.',
      nutrition: {
        serving: '100 g',
        energy: '32 kcal',
        water: '90% agua',
        carbs: '7.7 g de carbohidratos',
        sugars: '4.9 g de azúcares naturales',
        fiber: '2 g de fibra',
        protein: '0.7 g de proteína',
        fat: '0.3 g de grasa total',
        vitamins: ['Vitamina C: 58.8 mg (98% VD)', 'Folato (B9): 24 mcg'],
        minerals: ['Potasio: 153 mg', 'Manganeso: 0.386 mg'],
        antioxidants: ['Antocianinas', 'Quercetina', 'Ácido elágico']
      },
      benefits: [
        'Mejoran la salud cardiovascular y reducen marcadores de inflamación.',
        'Apoyan el control de azúcar en sangre por su fibra y bajo índice glicémico.',
        'Favorecen la síntesis de colágeno y la luminosidad de la piel gracias a su vitamina C y antioxidantes.',
        'Refuerzan el sistema inmune y la digestión liviana.'
      ]
    },
    {
      id: 'arandanos',
      name: 'Arándanos orgánicos',
      aliases: ['arándano', 'arándanos', 'blueberries', 'moras azules', 'berry azul'],
      description:
        'Arándanos orgánicos con alto poder antioxidante y perfil dulce-ácido, ideales para snacks, bowls y repostería ligera.',
      nutrition: {
        serving: '100 g',
        energy: '57 kcal',
        carbs: '14.5 g de carbohidratos',
        sugars: '10 g de azúcares',
        fiber: '2.4 g de fibra',
        protein: '0.7 g de proteína',
        fat: '0.3 g de grasa total',
        vitamins: ['Vitamina C: 9.7 mg', 'Vitamina K: 19.3 mcg'],
        antioxidants: ['Antocianinas (muy altas)', 'Resveratrol']
      },
      benefits: [
        'Protección neuronal y soporte de memoria.',
        'Control antioxidante frente a radicales libres.',
        'Aporte para salud ocular y cardiovascular.',
        'Ayuda en regulación de glucosa con fibra moderada.'
      ]
    },
    {
      id: 'zarzamoras',
      name: 'Zarzamoras orgánicas',
      aliases: ['zarzamora', 'mora', 'moras', 'blackberries', 'berries negras'],
      description:
        'Zarzamoras orgánicas de sabor intenso y notas florales. Excelentes para bowls, salsas, mermeladas y toppings.',
      nutrition: {
        serving: '100 g',
        energy: '43 kcal',
        fiber: '5.3 g de fibra',
        sugars: '4.9 g de azúcares',
        vitamins: ['Vitamina C: 21 mg', 'Vitamina K: 19.8 mcg'],
        minerals: ['Manganeso elevado'],
        antioxidants: ['Antocianinas', 'Polifenoles antiinflamatorios']
      },
      benefits: [
        'Salud digestiva gracias a su alta fibra.',
        'Soporte a la salud ósea y metabolismo por su manganeso.',
        'Efecto antiinflamatorio y regulación de azúcar en sangre.',
        'Aportan saciedad con pocas calorías.'
      ]
    }
  ],
  recipes: [
    {
      name: 'Parfait de fresa',
      time: '10 minutos',
      servings: '2 porciones',
      ingredients: ['1 taza de fresas en láminas', '1 taza de yogurt natural', '1/2 taza de granola', '1 cda de miel', 'Hojas de menta'],
      preparation:
        'Alterna capas de yogurt, fresas y granola en vasos fríos. Termina con miel y menta. Servir de inmediato.',
      tags: ['parfait', 'postre', 'rápido']
    },
    {
      name: 'Batido antioxidante',
      time: '7 minutos',
      servings: '2 porciones',
      ingredients: ['1/2 taza de fresas', '1/2 taza de arándanos', '1/2 banano', '1 taza de leche vegetal', 'Hielo al gusto'],
      preparation:
        'Lleva todos los ingredientes a la licuadora y procesa hasta obtener textura cremosa. Endulza al gusto.',
      tags: ['batido', 'antioxidante', 'bebida']
    },
    {
      name: 'Smoothie bowl de frutos rojos',
      time: '8 minutos',
      servings: '1 porción grande',
      ingredients: ['3/4 taza de fresas congeladas', '1/2 taza de zarzamoras', '1/2 banano', '1/2 taza de yogurt griego', 'Toppings: granola, coco, semillas'],
      preparation:
        'Licúa las frutas con el yogurt hasta lograr un helado espeso. Sirve en bowl y añade toppings.',
      tags: ['smoothie bowl', 'desayuno']
    },
    {
      name: 'Mermelada casera de fresa',
      time: '40 minutos',
      servings: '1 frasco (250g)',
      ingredients: ['500 g de fresas picadas', '150 g de azúcar o panela', '1 cda de jugo de limón'],
      preparation:
        'Cocina las fresas con el azúcar a fuego medio, removiendo. Añade limón y cocina hasta espesar. Envasar en frasco esterilizado.',
      tags: ['mermelada', 'untables']
    },
    {
      name: 'Salsa de frutos rojos para postres',
      time: '15 minutos',
      servings: '200 ml',
      ingredients: ['1 taza de fresas', '1/2 taza de arándanos', '2 cdas de azúcar', '1 cda de limón'],
      preparation:
        'Cocina las frutas con el azúcar por 10 minutos, presionando suavemente. Finaliza con limón y deja entibiar antes de usar.',
      tags: ['salsa', 'postres']
    },
    {
      name: 'Tarta rústica de frutos rojos',
      time: '1 hora',
      servings: '6 porciones',
      ingredients: ['1 lámina de masa quebrada', '2 tazas de fresas en mitades', '1 taza de zarzamoras', '3 cdas de azúcar', '1 cda de maicena'],
      preparation:
        'Mezcla frutas con azúcar y maicena. Coloca en el centro de la masa, dobla bordes y hornea a 190°C por 35-40 minutos.',
      tags: ['tarta', 'horneado']
    },
    {
      name: 'Avena fría con frutas orgánicas',
      time: '5 minutos + reposo',
      servings: '2 porciones',
      ingredients: ['1 taza de avena en hojuelas', '1.5 tazas de leche o bebida vegetal', '1 taza de fresas picadas', '1/2 taza de arándanos', '1 cda de chía'],
      preparation:
        'Mezcla avena, leche y chía. Reposa en nevera 4 horas. Añade las frutas al servir.',
      tags: ['avena', 'desayuno']
    },
    {
      name: 'Ensalada dulce de frutos rojos',
      time: '12 minutos',
      servings: '3 porciones',
      ingredients: ['1 taza de fresas', '1 taza de zarzamoras', '1/2 taza de uvas verdes', 'Hojas de hierbabuena', 'Miel o limón al gusto'],
      preparation:
        'Combina las frutas en un bowl, añade hierbabuena y un toque de miel o limón. Servir fría.',
      tags: ['ensalada', 'ligero']
    },
    {
      name: 'Helado casero de frutos orgánicos',
      time: '15 minutos + congelación',
      servings: '4 porciones',
      ingredients: ['2 tazas de fresas congeladas', '1 taza de arándanos congelados', '3 cdas de yogurt griego', '2 cdas de miel'],
      preparation:
        'Procesa las frutas congeladas con yogurt y miel hasta textura de helado suave. Congela 1 hora para mayor firmeza.',
      tags: ['helado', 'postre']
    },
    {
      name: 'Agua infusionada detox',
      time: '5 minutos + reposo',
      servings: '1 jarra (1 litro)',
      ingredients: ['6 fresas en láminas', '1/4 taza de arándanos', 'Rodajas de limón', 'Hojas de menta', 'Agua fría'],
      preparation:
        'Agrega frutas y menta a una jarra con agua fría. Reposa en nevera 1 hora para infusionar.',
      tags: ['infusion', 'hidratación']
    }
  ],
  faqs: [
    { question: '¿Qué productos venden?', answer: 'Fresas orgánicas como base, más arándanos y zarzamoras según disponibilidad, además de mermeladas y postres con berries.' },
    { question: '¿Qué beneficios tiene la fresa?', answer: 'Rica en vitamina C, antioxidantes y fibra: apoya la salud cardiovascular, la piel y el sistema inmune con pocas calorías.' },
    { question: '¿Cuánto cuesta la caja premium?', answer: 'La caja premium de 1 kg de fresas orgánicas está en $24.000 COP; podemos ajustar por volumen y personalización.' },
    { question: '¿Cómo hago un pedido?', answer: 'Escríbenos por WhatsApp al +57 3226374266 o en el link https://wa.me/573226374266, cuéntanos cantidades y destino, y coordinamos envío y pago.' },
    { question: '¿Hacen envíos nacionales?', answer: 'Sí, entregamos el mismo día en La Unión y rápido en municipios cercanos; el resto de Colombia llega en menos de una semana.' },
    { question: '¿Aceptan pago contraentrega?', answer: 'Solo si se negocia por WhatsApp previamente; no tenemos datáfono ni PSE por ahora.' },
    { question: '¿De dónde provienen las fresas?', answer: 'Trabajamos con emprendedores locales de La Unión, Antioquia, con foco en trazabilidad y frescura.' },
    { question: '¿Qué significa Ethereal?', answer: 'Remite a lo etéreo: delicado, ligero y natural. Así buscamos que sean nuestros productos orgánicos.' },
    { question: '¿Tienen promociones?', answer: 'Podemos manejar bundles o descuentos por volumen; pregunta en WhatsApp y te contamos las vigentes.' },
    { question: '¿Tienen productos sin azúcar?', answer: 'Las frutas y preparaciones base no llevan azúcar añadida, salvo mermelada; podemos sugerir opciones naturales.' },
    { question: '¿Cómo conservo mejor las fresas?', answer: 'Mantén en refrigeración en contenedor ventilado, sin lavar hasta consumir. Para más días, congela en una sola capa.' },
    { question: '¿Es saludable comer fresas todos los días?', answer: 'Sí en porciones moderadas: 1 taza aporta antioxidantes, fibra y vitamina C con pocas calorías, salvo restricciones médicas.' }
  ],
  suggestions: {
    openers: [
      'Puedo recomendarte combos de fresas con arándanos para bowls antioxidantes.',
      'Si buscas algo ligero, prueba la avena fría con frutas orgánicas y topping de zarzamoras.',
      'Para un regalo, arma una caja premium personalizada y la entregamos el mismo día en La Unión.'
    ],
    prompts: ['¿Quieres recetas rápidas?', '¿Prefieres opciones sin azúcar añadida?', '¿Buscas envío express o nacional?']
  },
  intents: [
    { id: 'shipping', keywords: ['envio', 'entrega', 'domicilio', 'cobertura', 'llega'], responseKey: 'shipping' },
    { id: 'payments', keywords: ['pago', 'pagos', 'tarjeta', 'nequi', 'transferencia', 'pse', 'daviplata', 'contraentrega'], responseKey: 'payments' },
    { id: 'orders', keywords: ['pedido', 'comprar', 'whatsapp', 'ordenar', 'hacer pedido'], responseKey: 'orders' },
    { id: 'pricing', keywords: ['precio', 'vale', 'cuesta', 'costo', 'cop'], responseKey: 'pricing' },
    { id: 'origin', keywords: ['origen', 'provienen', 'donde cultivan', 'la union'], responseKey: 'origin' },
    { id: 'philosophy', keywords: ['ethereal', 'filosofia', 'significa', 'marca'], responseKey: 'philosophy' },
    { id: 'benefits', keywords: ['beneficio', 'beneficios', 'salud', 'nutricion'], responseKey: 'benefits' },
    { id: 'recipes', keywords: ['receta', 'parfait', 'smoothie', 'mermelada', 'batido', 'tarta', 'helado'], responseKey: 'recipes' }
  ],
  fallback:
    'Aún no tengo toda esa información, pero puedo ayudarte por WhatsApp 👉 https://wa.me/573226374266'
};
