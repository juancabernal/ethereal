import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { globalConfig } from '../config/globalConfig';
import { Menu, X, Sparkles } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
];

const ActiveIndicator = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      <motion.span
        layoutId="activeNav"
        className="absolute inset-0 rounded-full bg-white/10"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    )}
  </AnimatePresence>
);

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const whatsappNumber = (globalConfig.whatsapp || '').replace(/[^\d]/g, '');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'backdrop-blur-xl bg-black/30 sticky-glow' : ''}`}>
      <div className="section-padding py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-[0.18em] uppercase">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-berry to-lilac shadow-glow flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blush" />
            <span className="glare" />
          </div>
          <span className="text-blush">{globalConfig.nombre_empresa}</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-blush/80 hover:text-blush transition">
              {({ isActive }) => (
                <>
                  <ActiveIndicator isActive={isActive} />
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
          {globalConfig.whatsapp && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="neon-button text-sm"
            >
              Pedir ahora
            </a>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6 text-blush" /> : <Menu className="w-6 h-6 text-blush" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-6 space-y-3"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 ${isActive ? 'text-neon' : 'text-blush/80'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {globalConfig.whatsapp && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="neon-button inline-flex w-full justify-center"
              >
                Pedir ahora
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
