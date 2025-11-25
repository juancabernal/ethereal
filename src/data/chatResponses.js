import { globalConfig } from '../config/globalConfig';

export const baseResponses = {
  fallback: [
    `Somos ${globalConfig.nombre_empresa}, nacimos en 2024 en ${globalConfig.ubicacion}. Pregunta por envíos, pagos o recetas y te ayudo.`,
    'Puedo contarte sobre nuestros productos orgánicos de berries (fresas, arándanos, zarzamoras), métodos de pago y tiempos de entrega.',
    'Dime el producto o receta que buscas; el catálogo no es definitivo y podemos revisar si es posible añadirlo o personalizarlo.',
  ],
};
