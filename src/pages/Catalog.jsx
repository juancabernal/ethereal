import { useEffect } from 'react';
import AOS from 'aos';
import { products } from '../data/products';
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
          Cada lote está diseñado para experiencias sensoriales: textura satinada, aroma floral y dulzor luminoso. Selecciona tu ritual.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6" data-aos="fade-up">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
