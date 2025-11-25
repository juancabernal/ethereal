import { useEffect } from 'react';
import AOS from 'aos';
import { activeProducts } from '../data/products';
import { globalConfig } from '../config/globalConfig';
import { ProductCard } from '../components/ProductCard';

export function Catalog() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="section-padding space-y-10">
      <div className="space-y-3">
        <p className="uppercase tracking-[0.3em] text-xs text-blush/60">Colección</p>
        <h1 className="text-4xl font-semibold text-blush">Catálogo celestial</h1>
        <p className="text-blush/70 max-w-2xl">
          {globalConfig.textos.catalogo} {globalConfig.ubicacion}. Productos orgánicos de berries (fresas como base, sumando arándanos y zarzamoras aún sin certificación) cultivados con aliados locales; podemos revisar si es posible añadir productos o personalizar presentaciones.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6" data-aos="fade-up">
        {activeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
