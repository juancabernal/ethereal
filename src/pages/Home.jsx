import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { siteConfig } from '../config/siteConfig';
import { staggerReveal, setupScrollLayers } from '../animations/massByteAnimations';
import { Sparkles, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic' });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      staggerReveal(heroRef.current.querySelectorAll('[data-reveal]'));
      setupScrollLayers(parallaxRef.current);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-20">
      <section ref={heroRef} className="section-padding pt-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5"
            data-reveal
          >
            <Sparkles className="w-4 h-4 text-neon" />
            <span className="text-sm text-blush/80">Fresas orgánicas de lujo</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-semibold leading-tight text-blush"
            data-reveal
          >
            Experiencias gourmet con fresas que brillan como gemas.
          </motion.h1>
          <motion.p className="text-lg text-blush/70 max-w-2xl" data-reveal>
            {siteConfig.slogan}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" data-reveal>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="neon-button"
            >
              Hacer pedido
            </a>
            <Link to="/catalogo" className="glass-panel border-white/10 px-6 py-3 rounded-full text-blush/80">
              Ver catálogo
            </Link>
          </motion.div>
          <motion.div className="flex gap-6" data-reveal>
            {[
              { label: 'Cosecha nocturna', value: '100% orgánica' },
              { label: 'Textura', value: 'Satinada y fresca' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-blush/60">{item.label}</p>
                <p className="text-blush font-semibold">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div ref={parallaxRef} className="relative parallax-container">
          <div className="absolute -inset-10 rounded-[32px] bg-gradient-to-br from-berry/40 via-lilac/30 to-neon/20 blur-3xl" data-depth="1" />
          <motion.div
            className="glass-panel gradient-border overflow-hidden relative hero-image"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            whileHover={{ rotateX: -6, rotateY: 6, scale: 1.02, transition: { type: 'spring', stiffness: 120, damping: 18 } }}
            data-depth="0.6"
          >
            <img
              src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1600&q=80"
              alt="Fresas orgánicas"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 text-blush">
              <p className="uppercase text-xs tracking-[0.3em] text-blush/70">Cosecha 2025</p>
              <p className="text-2xl font-semibold">Glow Crimson</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding grid md:grid-cols-3 gap-6" data-aos="fade-up">
        {[
          'Agricultura regenerativa y cero pesticidas',
          'Cosecha bajo luna para máximo aroma',
          'Empaques fríos con huella mínima',
        ].map((text) => (
          <div key={text} className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/10 mb-4 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-neon" />
            </div>
            <p className="text-blush/80">{text}</p>
          </div>
        ))}
      </section>

      <section className="section-padding space-y-6" data-aos="fade-up">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-blush">Destacados</h2>
          <Link to="/catalogo" className="text-sm text-neon">Ver todo</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-padding" data-aos="fade-up">
        <div className="glass-panel rounded-3xl p-10 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="glare" />
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold">Respira frescura</h3>
            <p className="text-blush/70">Recorre nuestro catálogo y arma tu ritual de fresas perfectas, mermeladas aterciopeladas y elixires botánicos.</p>
            <Link to="/catalogo" className="neon-button inline-flex w-fit">Explorar catálogo</Link>
          </div>
          <div className="relative">
            <motion.div
              className="rounded-3xl overflow-hidden border border-white/10"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 150, damping: 16 }}
            >
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
                alt="Bebida de fresas"
                className="w-full h-72 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
