# ETHEREAL — Experiencia web premium para fresas orgánicas

Sitio SPA animado con React + Vite, TailwindCSS, Framer Motion, GSAP, AOS y Locomotive Scroll. Tema oscuro de lujo inspirado en Apple/Tesla con efectos 3D y microinteracciones.

## Características clave
- Animaciones avanzadas: Framer Motion para microinteracciones, GSAP + ScrollTrigger para parallax y depth, AOS para reveals, Locomotive Scroll para scroll suave, efectos hover 3D y transiciones entre páginas.
- Arquitectura modular con datos centralizados en `src/data/products.js` y configuración editable en `src/config/siteConfig.js`.
- Componentes reutilizables: loader animado, navbar sticky, cards de producto con profundidad, hero con parallax y botón flotante de WhatsApp.
- Preparado para Vercel con `vercel.json` y scripts de build.

## Scripts
- `npm install` — instala dependencias.
- `npm run dev` — servidor de desarrollo (Vite).
- `npm run build` — build de producción.
- `npm run preview` — vista previa del build.

## GUÍA PARA USUARIOS SIN EXPERIENCIA (EXPLICACIÓN PASO A PASO)

### 1. Cómo descargar el proyecto
1. Haz clic en el botón "Code" en GitHub y selecciona "Download ZIP".
2. Descomprime la carpeta en tu computadora (por ejemplo en `Documentos/ethereal`).

### 2. Cómo instalar Node.js
1. Entra a [https://nodejs.org](https://nodejs.org) y descarga la versión LTS.
2. Instala siguiendo el asistente (siguiente, siguiente, finalizar).
3. Abre una terminal (PowerShell en Windows o Terminal en macOS) y escribe `node -v`; si ves un número, ya quedó.

### 3. Cómo abrir VS Code
1. Descarga VS Code desde [https://code.visualstudio.com](https://code.visualstudio.com) e instálalo.
2. Abre VS Code, ve a **File > Open Folder** y selecciona la carpeta del proyecto `ethereal`.

### 4. Cómo instalar dependencias y ejecutar
1. En la terminal integrada de VS Code, ejecuta:
   ```bash
   npm install
   npm run dev
   ```
2. Copia la URL que aparece (ej. `http://localhost:5173`) y ábrela en tu navegador.

### 5. Cómo editar imágenes
- Las imágenes se cargan desde URLs en `src/data/products.js`. Sustituye las URLs por las tuyas (pueden ser de tu CDN o de servicios como Cloudinary/Unsplash).
- Para imágenes globales (favicon), reemplaza `public/favicon.svg`.

### 6. Cómo editar productos
1. Abre `src/data/products.js`.
2. Cada producto es un objeto dentro del arreglo `products` con campos: `id`, `name`, `price`, `images`, `shortDescription`, `longDescription`, `nutritionalInfo`, `recipes`.
3. Cambia textos, precios e imágenes respetando el formato.

### 7. Cómo cambiar precios
- En `src/data/products.js`, actualiza el número del campo `price` de cada producto. Se mostrará automáticamente en todas las vistas.

### 8. Cómo agregar productos
1. Copia uno de los objetos del arreglo `products` en `src/data/products.js`.
2. Cambia `id` (sin espacios), `name`, `price` y los demás campos según tu nuevo producto.
3. Guarda el archivo; el nuevo producto aparecerá en el catálogo.

### 9. Cómo modificar animaciones
- Framer Motion: revisa animaciones en componentes como `src/pages/Home.jsx` o `src/components/ProductCard.jsx` (propiedades `whileHover`, `initial`, `animate`).
- GSAP: funciones reutilizables en `src/animations/massByteAnimations.js` (parallax, stagger). Ajusta valores como `duration`, `stagger` o `yPercent`.
- AOS: data-attributes `data-aos="fade-up"` en secciones; cambia el efecto en esos atributos.
- Locomotive Scroll: opciones de suavidad en `src/App.jsx` (`multiplier`, `lerp`).

### 10. Cómo cambiar su número de WhatsApp
- Abre `src/config/siteConfig.js` y actualiza `whatsappNumber` con tu número en formato internacional (ej. `+521234567890`).

### 11. Cómo hacer deploy en Vercel paso a paso
1. Crea una cuenta en [https://vercel.com](https://vercel.com) (gratis).
2. Instala Vercel CLI: `npm i -g vercel`.
3. En la carpeta del proyecto, ejecuta `vercel` y sigue el asistente (elige framework Vite si lo pregunta).
4. Para deploys posteriores usa `vercel --prod`.
5. El archivo `vercel.json` ya está configurado para que todas las rutas apunten a `index.html`.

### 12. Dónde se guarda cada cosa y por qué
- `src/data/products.js`: catálogo editable centralizado.
- `src/config/siteConfig.js`: datos globales (WhatsApp, colores, redes, empresa).
- `src/pages/*`: páginas principales (Home, Catálogo, Producto individual).
- `src/components/*`: piezas reutilizables (loader, cards, botón flotante).
- `src/layout/*`: estructura general con navbar y footer.
- `src/animations/massByteAnimations.js`: efectos GSAP listos para reusar.
- `public/`: archivos estáticos como el favicon.
- `index.html`: plantilla base con meta tags y punto de montaje React.

### 13. Qué archivos NO tocar
- `package.json` y `vite.config.js`: sólo modificar si sabes de dependencias/build.
- `tailwind.config.cjs` y `postcss.config.cjs`: mantienen estilos; tocar solo si dominas Tailwind.
- `vercel.json`: configurado para deploy estático; cambiarlo puede romper el enrutado.

Con estos pasos puedes personalizar ETHEREAL sin conocimientos previos y lanzarlo en minutos.
