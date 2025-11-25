import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-night text-blush">
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
