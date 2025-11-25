import { globalConfig } from './globalConfig';

export const siteConfig = {
  whatsappNumber: globalConfig.whatsapp,
  brandName: globalConfig.nombre_empresa,
  slogan: globalConfig.slogan,
  colors: {
    primary: globalConfig.colores.primario,
    secondary: globalConfig.colores.secundario,
    background: globalConfig.colores.fondo,
    accent: globalConfig.colores.acento,
  },
  logoText: globalConfig.nombre_empresa,
  socials: {
    instagram: globalConfig.instagram,
    facebook: globalConfig.facebook,
    tiktok: globalConfig.tiktok,
  },
  company: {
    name: globalConfig.nombre_empresa,
    address: globalConfig.ubicacion,
    email: globalConfig.correo,
  },
};
