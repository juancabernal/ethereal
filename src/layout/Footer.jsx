import { siteConfig } from '../config/siteConfig';
import { Instagram, Facebook, MapPin, Mail } from 'lucide-react';

const socials = [
  { icon: Instagram, href: siteConfig.socials.instagram, label: 'Instagram' },
  { icon: Facebook, href: siteConfig.socials.facebook, label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="section-padding pt-20 pb-16 glass-panel relative overflow-hidden">
      <div className="glare" />
      <div className="grid md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-blush">{siteConfig.brandName}</h3>
          <p className="text-sm text-blush/70">{siteConfig.slogan}</p>
        </div>

        <div className="space-y-3">
          <h4 className="uppercase tracking-[0.2em] text-xs text-blush/70">Contacto</h4>
          <div className="flex items-center gap-3 text-sm text-blush/80">
            <MapPin className="w-5 h-5 text-neon" />
            <span>{siteConfig.company.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-blush/80">
            <Mail className="w-5 h-5 text-neon" />
            <span>{siteConfig.company.email}</span>
          </div>
          <div className="text-sm text-blush/80">WhatsApp: 322 637 4266</div>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="neon-button inline-flex items-center gap-2"
          >
            WhatsApp
          </a>
        </div>

        <div className="space-y-4">
          <h4 className="uppercase tracking-[0.2em] text-xs text-blush/70">Redes</h4>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-neon/50 transition"
              >
                <Icon className="w-5 h-5 text-blush" />
              </a>
            ))}
          </div>
          <div className="w-full h-32 rounded-2xl overflow-hidden border border-white/10">
            <iframe
              title="Mapa"
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps?q=La%20Uni%C3%B3n%2C%20Antioquia%2C%20Colombia&output=embed"
              style={{ border: 0 }}
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="pt-10 text-sm text-blush/50">© {new Date().getFullYear()} {siteConfig.brandName}. Destilamos frescura orgánica.</div>
    </footer>
  );
}
