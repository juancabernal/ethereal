import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Chatbot } from '../components/Chatbot';
import { globalConfig } from '../config/globalConfig';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-night text-blush">
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      {globalConfig.toggles.mostrarChatbot && <Chatbot />}
      <FloatingWhatsApp />
    </div>
  );
}
