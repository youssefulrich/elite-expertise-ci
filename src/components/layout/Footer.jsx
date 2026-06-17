import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react'

// Lucide n'a pas d'icône TikTok native, on la dessine en SVG inline
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

export default function Footer() {
  return (
    <footer style={{ background: '#1C1C1E' }} className="text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo + description */}
          <div className="md:col-span-1">
            <img
              src="/logo.png"
              alt="TecSecur"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed">
              Équipements de sécurité industrielle performants pour les entreprises et industries de Côte d'Ivoire.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3 mt-5">
              {reseauxSociaux.map(({ nom, url, icon: Icon }) => (
                <a
                  key={nom}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={nom}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:text-white"
                  style={{ background: '#2c2c2e' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#C0392B'}
                  onMouseLeave={e => e.currentTarget.style.background = '#2c2c2e'}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Produits */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#C0392B' }}>Produits</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: '🔥 Sécurité incendie', to: '/boutique?cat=securite-incendie' },
                { label: '💨 Détection de gaz', to: '/boutique?cat=detection-de-gaz' },
                { label: '🦺 EPI', to: '/boutique?cat=epi' },
                { label: '🚧 Signalisation', to: '/boutique?cat=signalisation' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#C0392B' }}>Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Accueil', to: '/' },
                { label: 'Réalisations', to: '/realisations' },
                { label: 'Boutique', to: '/boutique' },
                { label: 'À propos', to: '/contact' },
                { label: 'Demander un devis', to: '/contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: '#C0392B' }}>Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#C0392B' }} />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0" style={{ color: '#C0392B' }} />
                <a href="tel:+2250000000000" className="hover:text-white transition-colors">+225 00 00 00 00 00</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0" style={{ color: '#C0392B' }} />
                <a href="mailto:contact@tecsecur.ci" className="hover:text-white transition-colors">contact@tecsecur.ci</a>
              </li>
            </ul>

            {/* CTA devis */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-5 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
              style={{ background: '#C0392B' }}
              onMouseEnter={e => e.currentTarget.style.background = '#922B21'}
              onMouseLeave={e => e.currentTarget.style.background = '#C0392B'}
            >
              Je veux un devis →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: '#2c2c2e', color: '#555' }}>
          <span>© {new Date().getFullYear()} TecSecur CI. Tous droits réservés.</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span>Site sécurisé SSL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}