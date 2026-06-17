import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, FileText, ChevronDown, Package, Wrench, ArrowRight } from 'lucide-react'

const menuProduits = [
  {
    titre: '🔥 Incendie',
    items: ['Extincteur', 'RIA', 'PIA', 'Lance incendie', 'Poteaux incendie'],
    slug: 'securite-incendie',
  },
  {
    titre: '💨 Détection gaz',
    items: ['Détecteur portable', 'Détecteur fixe', 'Balise de détection', 'Éthylotest'],
    slug: 'detection-de-gaz',
  },
  {
    titre: '🦺 EPI',
    items: ['Chaussures de sécurité', 'Casque', 'Protection auditive', 'Vêtements de travail'],
    slug: 'epi',
  },
  {
    titre: '🚧 Signalisation',
    items: ['Cônes', 'Ruban de signalisation', 'Panneaux', 'Traçeur de chantier'],
    slug: 'signalisation',
  },
]

const menuServices = [
  {
    titre: '🎓 Formation',
    items: ['Sécurité incendie', 'Premiers secours', 'Utilisation EPI'],
  },
  {
    titre: '🔧 Maintenance',
    items: ['Extincteurs', 'Détecteurs de gaz', 'Vérification EPI'],
  },
  {
    titre: '📋 Conseil & Audit',
    items: ['Audit sécurité site', 'Plan de prévention', 'Étude des risques'],
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggleDropdown(name) {
    setDropdown(prev => prev === name ? null : name)
  }

  return (
    <header ref={navRef} className="sticky top-0 z-50 shadow-lg" style={{ background: '#1C1C1E' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" onClick={() => setDropdown(null)}>
            <img
              src="/logo.png"
              alt="TecSecur"
              className="h-14 w-auto object-contain"
              style={{ maxWidth: "220px" }}
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">

            {/* PRODUITS */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('produits')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: dropdown === 'produits' ? '#fff' : '#aaa',
                  background: dropdown === 'produits' ? 'rgba(255,255,255,0.06)' : 'transparent',
                }}
              >
                <Package size={15} />
                Produits
                <ChevronDown size={14} style={{ transform: dropdown === 'produits' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>

              <div
                className="absolute top-full mt-2 left-0 rounded-2xl border p-5"
                style={{
                  background: '#2c2c2e',
                  borderColor: '#3a3a3c',
                  width: '520px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  opacity: dropdown === 'produits' ? 1 : 0,
                  pointerEvents: dropdown === 'produits' ? 'all' : 'none',
                  transform: dropdown === 'produits' ? 'translateY(0)' : 'translateY(-8px)',
                  transition: 'opacity 0.18s, transform 0.18s',
                }}
              >
                <div className="h-0.5 rounded-full mb-4" style={{ background: '#C0392B' }} />
                <div className="grid grid-cols-4 gap-4">
                  {menuProduits.map((col) => (
                    <div key={col.titre}>
                      <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: '#C0392B' }}>
                        {col.titre}
                      </p>
                      <ul className="space-y-1.5">
                        {col.items.map((item) => (
                          <li key={item}>
                            <Link
                              to={`/boutique?cat=${col.slug}`}
                              onClick={() => setDropdown(null)}
                              className="flex items-center gap-1.5 text-xs transition-colors group"
                              style={{ color: '#888' }}
                              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                              onMouseLeave={e => e.currentTarget.style.color = '#888'}
                            >
                              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#444' }} />
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t" style={{ borderColor: '#3a3a3c' }}>
                  <Link
                    to="/boutique"
                    onClick={() => setDropdown(null)}
                    className="flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5"
                    style={{ color: '#C0392B' }}
                  >
                    Voir tous les produits <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: dropdown === 'services' ? '#fff' : '#aaa',
                  background: dropdown === 'services' ? 'rgba(255,255,255,0.06)' : 'transparent',
                }}
              >
                <Wrench size={15} />
                Services
                <ChevronDown size={14} style={{ transform: dropdown === 'services' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>

              <div
                className="absolute top-full mt-2 left-0 rounded-2xl border p-5"
                style={{
                  background: '#2c2c2e',
                  borderColor: '#3a3a3c',
                  width: '480px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  opacity: dropdown === 'services' ? 1 : 0,
                  pointerEvents: dropdown === 'services' ? 'all' : 'none',
                  transform: dropdown === 'services' ? 'translateY(0)' : 'translateY(-8px)',
                  transition: 'opacity 0.18s, transform 0.18s',
                }}
              >
                <div className="h-0.5 rounded-full mb-4" style={{ background: '#C0392B' }} />
                <div className="grid grid-cols-3 gap-4">
                  {menuServices.map((col) => (
                    <div key={col.titre}>
                      <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: '#C0392B' }}>
                        {col.titre}
                      </p>
                      <ul className="space-y-1.5">
                        {col.items.map((item) => (
                          <li key={item}>
                            <Link
                              to="/contact"
                              onClick={() => setDropdown(null)}
                              className="flex items-center gap-1.5 text-xs transition-colors"
                              style={{ color: '#888' }}
                              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                              onMouseLeave={e => e.currentTarget.style.color = '#888'}
                            >
                              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#444' }} />
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t" style={{ borderColor: '#3a3a3c' }}>
                  <Link
                    to="/contact"
                    onClick={() => setDropdown(null)}
                    className="flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5"
                    style={{ color: '#C0392B' }}
                  >
                    Demander un devis service <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            <NavLink
              to="/realisations"
              onClick={() => setDropdown(null)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
              }
            >
              Réalisations
            </NavLink>

            <NavLink
              to="/boutique"
              onClick={() => setDropdown(null)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
              }
            >
              Boutique
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setDropdown(null)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
              }
            >
              À propos
            </NavLink>
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              onClick={() => setDropdown(null)}
              className="hidden md:flex items-center gap-2 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all active:scale-95"
              style={{ background: '#C0392B' }}
              onMouseEnter={e => e.currentTarget.style.background = '#922B21'}
              onMouseLeave={e => e.currentTarget.style.background = '#C0392B'}
            >
              <FileText size={15} />
              Je veux un devis
            </Link>

            <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 border-t overflow-y-auto max-h-[80vh]" style={{ background: '#2c2c2e', borderColor: '#3a3a3c' }}>
          <p className="text-xs font-bold uppercase tracking-widest py-2" style={{ color: '#C0392B' }}>Produits</p>
          {menuProduits.map(col => (
            <div key={col.titre} className="mb-3">
              <p className="text-xs font-semibold mb-1" style={{ color: '#666' }}>{col.titre}</p>
              {col.items.map(item => (
                <Link key={item} to={`/boutique?cat=${col.slug}`} className="block text-sm py-1.5 pl-3 transition-colors" style={{ color: '#aaa' }} onClick={() => setMenuOpen(false)}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}

          <p className="text-xs font-bold uppercase tracking-widest py-2 mt-2" style={{ color: '#C0392B' }}>Services</p>
          {menuServices.map(col => (
            <div key={col.titre} className="mb-3">
              <p className="text-xs font-semibold mb-1" style={{ color: '#666' }}>{col.titre}</p>
              {col.items.map(item => (
                <Link key={item} to="/contact" className="block text-sm py-1.5 pl-3 transition-colors" style={{ color: '#aaa' }} onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              ))}
            </div>
          ))}

          <div className="pt-4 mt-2 border-t space-y-2" style={{ borderColor: '#3a3a3c' }}>
            <Link to="/realisations" className="block text-sm font-medium py-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Réalisations</Link>
            <Link to="/boutique" className="block text-sm font-medium py-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Boutique</Link>
            <Link to="/contact" className="block text-sm font-medium py-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>À propos</Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 text-white font-bold px-4 py-3 rounded-lg text-sm w-full mt-2"
              style={{ background: '#C0392B' }}
              onClick={() => setMenuOpen(false)}
            >
              <FileText size={15} /> Je veux un devis
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}