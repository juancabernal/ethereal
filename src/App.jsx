import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
import AOS from 'aos';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Loader } from './components/Loader';
import { useUiStore } from './store/uiStore';
import { globalConfig } from './config/globalConfig';

function PageTransition({ children, keyName }) {
  return (
    <motion.div
      key={keyName}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const isLoading = useUiStore((state) => state.isLoading);
  const setLoading = useUiStore((state) => state.setLoading);
  const setPageKey = useUiStore((state) => state.setPageKey);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    const container = document.querySelector('.smooth-container');
    if (!container) return undefined;
    try {
      const loco = new LocomotiveScroll({
        el: container,
        smooth: true,
        lerp: 0.08,
        multiplier: 1.05,
      });
      return () => loco.destroy();
    } catch (error) {
      console.warn('Locomotive no disponible', error);
      return undefined;
    }
  }, []);

  useEffect(() => {
    setPageKey(location.pathname);
  }, [location, setPageKey]);

  useEffect(() => {
    const handler = () => {
      document.title = document.hidden
        ? `Vuelve a ${globalConfig.nombre_empresa} – productos orgánicos de berries desde ${globalConfig.ubicacion}`
        : `${globalConfig.nombre_empresa} | ${globalConfig.slogan}`;
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  return (
    <div className="smooth-container">
      {isLoading && <Loader />}
      <Layout>
        <AnimatePresence mode="wait">
          <PageTransition keyName={location.pathname}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/producto/:id" element={<Product />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </Layout>
    </div>
  );
}
