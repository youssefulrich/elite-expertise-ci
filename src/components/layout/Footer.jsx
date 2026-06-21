import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Flame, Wind, HardHat, Triangle, ArrowRight, Shield } from 'lucide-react'

function TikTokIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.05-1.26 4.28 4.28 0 0 1-1.26-3.06H9.1v13.8a2.6 2.6 0 1 1-1.8-2.46V9.4a5.99 5.99 0 0 0-.8-.05 5.85 5.85 0 1 0 5.85 5.85V9.07a7.66 7.66 0 0 0 4.25 1.29V7.18a4.27 4.27 0 0 1-1-1.36z" />
    </svg>
  )
}

const reseauxSociaux = [
  { nom: 'Instagram', url: 'https://www.instagram.com/tecsecur.ci', icon: Instagram },
  { nom: 'Facebook', url: 'https://www.facebook.com/share/1BSBj3MxAp/', icon: Facebook },
  { nom: 'TikTok', url: 'https://www.tiktok.com/@tecsecur0', icon: TikTokIcon },
  { nom: 'LinkedIn', url: 'https://www.linkedin.com/in/tecsecur-ci-81ba11416', icon: Linkedin },
]

const produits = [
  { label: 'Sécurité incendie', to: '/boutique?cat=securite-incendie', icon: Flame },
  { label: 'Détection de gaz', to: '/boutique?cat=detection-de-gaz', icon: Wind },
  { label: 'EPI', to: '/boutique?cat=epi', icon: HardHat },
  { label: 'Signalisation', to: '/boutique?cat=signalisation', icon: Triangle },
]

const navigation = [
  { label: 'Accueil', to: '/' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Boutique', to: '/boutique' },
  { label: 'À propos', to: '/contact' },
  { label: 'Demander un devis', to: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1C1C1E' }} className="text-gray-400">

      <style>{`
        @keyframes footerPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .footer-link { position: relative; display: inline-block; }
        .footer-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0; width: 0;
          height: 1px; background: #C0392B;
          transition: width 0.25s ease;
        }
        .footer-link:hover::after { width: 100%; }
        .footer-link:hover { color: #fff !important; }
        .social-btn { transition: background 0.2s, transform 0.2s; }
        .social-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* Bande supérieure rouge */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #C0392B 30%, #C0392B 70%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Logo + description + réseaux */}
          <div className="md:col-span-1">
            <Link to="/">
              <img src="/logo.png" alt="TecSecur" className="h-10 w-auto object-contain mb-5"
                style={{ filter: 'drop-shadow(0 0 8px rgba(192,57,43,0.3))' }} />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Spécialiste en équipements de sécurité industrielle pour les entreprises et industries de Côte d'Ivoire.
            </p>

            {/* Badge ONPC */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg mb-5" style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)' }}>
              <img src="/logo-onpc.png" alt="ONPC" className="h-7 w-7 object-contain shrink-0" />
              <div>
                <p className="text-white text-xs font-bold leading-tight">Agréé ONPC</p>
                <p className="text-gray-500 text-xs">Protection Civile CI</p>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-2">
              {reseauxSociaux.map(({ nom, url, icon: Icon }) => (
                <a key={nom} href={url} target="_blank" rel="noopener noreferrer" aria-label={nom}
                  className="social-btn w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: '#2c2c2e' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#C0392B'}
                  onMouseLeave={e => e.currentTarget.style.background = '#2c2c2e'}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Produits */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-0.5 h-4 rounded-full" style={{ background: '#C0392B' }} />
              <h4 className="font-bold text-xs uppercase tracking-widest text-white">Produits</h4>
            </div>
            <ul className="space-y-3">
              {produits.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className="footer-link flex items-center gap-2.5 text-sm transition-colors" style={{ color: '#888' }}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: 'rgba(192,57,43,0.12)' }}>
                      <Icon size={12} style={{ color: '#C0392B' }} />
                    </div>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-0.5 h-4 rounded-full" style={{ background: '#C0392B' }} />
              <h4 className="font-bold text-xs uppercase tracking-widest text-white">Navigation</h4>
            </div>
            <ul className="space-y-3">
              {navigation.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="footer-link text-sm" style={{ color: '#888' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-0.5 h-4 rounded-full" style={{ background: '#C0392B' }} />
              <h4 className="font-bold text-xs uppercase tracking-widest text-white">Contact</h4>
            </div>
            <ul className="space-y-3.5 text-sm mb-6">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(192,57,43,0.12)' }}>
                  <MapPin size={13} style={{ color: '#C0392B' }} />
                </div>
                <span className="leading-snug text-gray-400">Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(192,57,43,0.12)' }}>
                  <Phone size={13} style={{ color: '#C0392B' }} />
                </div>
                <a href="tel:+2250709501262" className="footer-link text-gray-400" style={{ color: '#888' }}>
                  +225 07 09 50 12 62
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(192,57,43,0.12)' }}>
                  <Mail size={13} style={{ color: '#C0392B' }} />
                </div>
                <a href="mailto:tecsecur88@gmail.com" className="footer-link text-gray-400" style={{ color: '#888' }}>
                  tecsecur88@gmail.com
                </a>
              </li>
            </ul>

            <Link to="/contact"
              className="inline-flex items-center gap-2 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all hover:gap-3 hover:shadow-lg hover:shadow-red-900/30"
              style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Demander un devis <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: '#2c2c2e' }}>
          <span style={{ color: '#444' }}>© {new Date().getFullYear()} TecSecur CI — Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" style={{ animation: 'footerPulse 2s ease-in-out infinite' }} />
              <span style={{ color: '#444' }}>Site sécurisé SSL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={11} style={{ color: '#C0392B' }} />
              <span style={{ color: '#444' }}>Agréé ONPC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}