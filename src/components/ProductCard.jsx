import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MousePointerClick } from 'lucide-react';
import { globalConfig } from '../config/globalConfig';

export function ProductCard({ product }) {
  const cardRef = useRef(null);
  const whatsappNumber = (globalConfig.whatsapp || '').replace(/[^\d]/g, '');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="gradient-border glass-panel p-4 md:p-5 flex flex-col gap-4"
    >
      <div className="relative overflow-hidden rounded-2xl group">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-56 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-blush/80">
          <MousePointerClick className="w-4 h-4 text-neon" />
          Hover depth
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-blush">{product.name}</h3>
          <p className="text-sm text-blush/60">{product.shortDescription}</p>
        </div>
        <span className="text-neon font-semibold">${product.price} COP</span>
      </div>
      <div className="flex gap-3">
        <Link
          to={`/producto/${product.id}`}
          className="neon-button flex-1 text-center"
        >
          Ver más
        </Link>
        {globalConfig.whatsapp && (
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20comprar%201%20unidad%20de%20${encodeURIComponent(product.name)}%20en%20${encodeURIComponent(globalConfig.nombre_empresa)}.`}
            target="_blank"
            rel="noreferrer"
            className="glass-panel border-white/10 px-4 py-3 rounded-2xl text-sm text-blush/80"
          >
            WhatsApp
          </a>
        )}
      </div>
    </motion.div>
  );
}
