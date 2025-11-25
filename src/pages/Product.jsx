import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AOS from 'aos';
import { products } from '../data/products';
import { siteConfig } from '../config/siteConfig';
import { ProductCard } from '../components/ProductCard';
import { parallaxImage } from '../animations/massByteAnimations';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Product() {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => item.id === id), [id]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  useEffect(() => {
    const image = document.querySelector('.product-hero-image');
    if (image) parallaxImage(image, { start: 'top bottom' });
  }, [product]);

  if (!product) {
    return (
      <div className="section-padding">
        <p className="text-blush">Producto no encontrado.</p>
        <Link to="/catalogo" className="text-neon mt-4 inline-block">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const total = product.price * quantity;
  const whatsappMessage = encodeURIComponent(
    `Hola, quiero comprar ${quantity} unidades de ${product.name} en ETHEREAL.`,
  );

  const recommended = products.filter((item) => item.id !== product.id).slice(0, 2);

  return (
    <div className="section-padding space-y-12">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="relative parallax-container" data-aos="fade-right">
          <motion.div
            className="glass-panel overflow-hidden rounded-3xl product-hero-image"
            whileHover={{ scale: 1.02, rotateY: 4, rotateX: -4 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          >
            <img src={product.images[0]} alt={product.name} className="w-full h-[520px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/15 text-sm">
              <Sparkles className="w-4 h-4 text-neon" />
              Cosecha viva
            </div>
          </motion.div>
        </div>

        <div className="space-y-6" data-aos="fade-left">
          <div className="space-y-2">
            <p className="uppercase tracking-[0.3em] text-xs text-blush/60">Colección ETHEREAL</p>
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <p className="text-blush/70">{product.longDescription}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
              <button
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <div className="text-right">
              <p className="text-blush/60 text-sm">Precio</p>
              <p className="text-3xl font-semibold text-neon">${total} MXN</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^\d]/g, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="neon-button inline-flex items-center justify-center gap-3"
          >
            Comprar vía WhatsApp
          </a>
          <div>
            <h3 className="text-xl font-semibold mb-3">Información nutricional</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {product.nutritionalInfo.map((info) => (
                <div key={info.label} className="glass-panel p-4 rounded-2xl border border-white/10">
                  <p className="text-sm text-blush/60">{info.label}</p>
                  <p className="text-blush font-semibold">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Recetas sugeridas</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.recipes.map((recipe) => (
                <div key={recipe.name} className="glass-panel p-4 rounded-2xl border border-white/10">
                  <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                  <p className="font-semibold">{recipe.name}</p>
                  <p className="text-sm text-blush/70">{recipe.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4" data-aos="fade-up">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Productos recomendados</h3>
          <Link to="/catalogo" className="text-neon text-sm">Ver catálogo completo</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {recommended.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
