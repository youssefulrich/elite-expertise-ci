import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, FileText, ChevronDown, Package, Wrench, ArrowRight } from 'lucide-react'

const menuProduits = [
  { titre: ' Incendie', items: ['Extincteur', 'RIA', 'PIA', 'Lance incendie', 'Poteaux incendie'], slug: 'securite-incendie' },
  { titre: ' Détection gaz', items: ['Détecteur portable', 'Détecteur fixe', 'Balise de détection', 'Éthylotest'], slug: 'detection-de-gaz' },
  { titre: ' EPI', items: ['Chaussures de sécurité', 'Casque', 'Protection auditive', 'Vêtements de travail'], slug: 'epi' },
  { titre: ' Signalisation', items: ['Cônes', 'Ruban de signalisation', 'Panneaux', 'Traçeur de chantier'], slug: 'signalisation' },
]

const menuServices = [
  { titre: ' Formation', items: ['Sécurité incendie', 'Premiers secours', 'Utilisation EPI'] },
  { titre: ' Maintenance', items: ['Extincteurs', 'Détecteurs de gaz', 'Vérification EPI'] },
  { titre: ' Conseil & Audit', items: ['Audit sécurité site', 'Plan de prévention', 'Étude des risques'] },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  // Ferme le menu au changement de page
  useEffect(() => {
    setMenuOpen(false)
    setDropdown(null)
  }, [location])

  // Effet scroll — navbar devient plus compacte
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ferme dropdown au clic extérieur
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setDropdown(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggleDropdown(name) {
    setDropdown(prev => prev === name ? null : name)
  }

  return (
    <>
      <style>{`
        @keyframes navFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 600px; } }
        .nav-link-underline { position: relative; }
        .nav-link-underline::after {
          content: ''; position: absolute; bottom: -2px; left: 50%; right: 50%;
          height: 2px; background: #C0392B; border-radius: 2px;
          transition: left 0.2s ease, right 0.2s ease;
        }
        .nav-link-underline:hover::after, .nav-link-underline.active::after { left: 8px; right: 8px; }
        .dropdown-item { position: relative; padding-left: 12px; }
        .dropdown-item::before {
          content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 4px; height: 4px; border-radius: 50%; background: #444;
          transition: background 0.15s, transform 0.15s;
        }
        .dropdown-item:hover::before { background: #C0392B; transform: translateY(-50%) scale(1.5); }
      `}</style>

      <header
        ref={navRef}
        className="sticky top-0 z-50"
        style={{
          background: scrolled ? 'rgba(28,28,30,0.97)' : '#1C1C1E',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : '0 1px 0 rgba(255,255,255,0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: scrolled ? '56px' : '64px', transition: 'height 0.3s ease' }}>

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0" style={{ transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <img src="/logo.png" alt="TecSecur" className="w-auto object-contain"
                style={{ height: scrolled ? '40px' : '48px', maxWidth: '200px', transition: 'height 0.3s ease' }} />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1">

              {/* PRODUITS */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('produits')}
                  className="nav-link-underline flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ color: dropdown === 'produits' ? '#fff' : '#aaa', background: dropdown === 'produits' ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                >
                  <Package size={15} />
                  Produits
                  <ChevronDown size={14} style={{ transform: dropdown === 'produits' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }} />
                </button>

                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  background: '#2c2c2e', border: '1px solid #3a3a3c',
                  borderRadius: '16px', padding: '20px', width: '520px',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
                  opacity: dropdown === 'produits' ? 1 : 0,
                  pointerEvents: dropdown === 'produits' ? 'all' : 'none',
                  transform: dropdown === 'produits' ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.98)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  transformOrigin: 'top left',
                }}>
                  {/* Trait rouge top */}
                  <div style={{ height: '2px', background: 'linear-gradient(90deg, #C0392B, transparent)', borderRadius: '2px', marginBottom: '16px' }} />
                  <div className="grid grid-cols-4 gap-4">
                    {menuProduits.map((col) => (
                      <div key={col.titre}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: '#C0392B' }}>{col.titre}</p>
                        <ul className="space-y-1.5">
                          {col.items.map((item) => (
                            <li key={item}>
                              <Link to={`/boutique?cat=${col.slug}`} onClick={() => setDropdown(null)}
                                className="dropdown-item block text-xs transition-colors"
                                style={{ color: '#888' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#3a3a3c' }}>
                    <Link to="/boutique" onClick={() => setDropdown(null)}
                      className="flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-3"
                      style={{ color: '#C0392B' }}>
                      Voir tous les produits <ArrowRight size={13} />
                    </Link>
                    <span className="text-xs text-gray-600">100+ produits disponibles</span>
                  </div>
                </div>
              </div>

              {/* SERVICES */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('services')}
                  className="nav-link-underline flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ color: dropdown === 'services' ? '#fff' : '#aaa', background: dropdown === 'services' ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                >
                  <Wrench size={15} />
                  Services
                  <ChevronDown size={14} style={{ transform: dropdown === 'services' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }} />
                </button>

                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  background: '#2c2c2e', border: '1px solid #3a3a3c',
                  borderRadius: '16px', padding: '20px', width: '480px',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
                  opacity: dropdown === 'services' ? 1 : 0,
                  pointerEvents: dropdown === 'services' ? 'all' : 'none',
                  transform: dropdown === 'services' ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.98)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  transformOrigin: 'top left',
                }}>
                  <div style={{ height: '2px', background: 'linear-gradient(90deg, #C0392B, transparent)', borderRadius: '2px', marginBottom: '16px' }} />
                  <div className="grid grid-cols-3 gap-4">
                    {menuServices.map((col) => (
                      <div key={col.titre}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: '#C0392B' }}>{col.titre}</p>
                        <ul className="space-y-1.5">
                          {col.items.map((item) => (
                            <li key={item}>
                              <Link to="/contact" onClick={() => setDropdown(null)}
                                className="dropdown-item block text-xs transition-colors"
                                style={{ color: '#888' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t" style={{ borderColor: '#3a3a3c' }}>
                    <Link to="/contact" onClick={() => setDropdown(null)}
                      className="flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-3"
                      style={{ color: '#C0392B' }}>
                      Demander un devis service <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {[
                { to: '/realisations', label: 'Réalisations' },
                { to: '/boutique', label: 'Boutique' },
                { to: '/contact', label: 'À propos' },
              ].map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={() => setDropdown(null)}
                  className={({ isActive }) =>
                    `nav-link-underline${isActive ? ' active' : ''} px-3 py-2 rounded-lg text-sm font-medium transition-all`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#aaa',
                    background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* CTA + burger */}
            <div className="flex items-center gap-3">
              <Link to="/contact" onClick={() => setDropdown(null)}
                className="hidden md:flex items-center gap-2 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all active:scale-95 hover:shadow-lg hover:shadow-red-900/40"
                style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.background = 'linear-gradient(135deg, #e74c3c, #C0392B)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #C0392B, #922B21)' }}
              >
                <FileText size={15} />
                Je veux un devis
              </Link>

              <button
                className="md:hidden text-white p-2 rounded-lg transition-all"
                style={{ background: menuOpen ? 'rgba(192,57,43,0.2)' : 'transparent' }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div style={{ transition: 'transform 0.3s ease', transform: menuOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Barre rouge bottom au scroll */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #C0392B, transparent)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }} />

        {/* Menu mobile */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '80vh' : '0',
          transition: 'max-height 0.35s ease',
          background: '#2c2c2e',
          borderTop: menuOpen ? '1px solid #3a3a3c' : 'none',
        }}>
          <div className="md:hidden px-4 py-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
            <p className="text-xs font-bold uppercase tracking-widest py-2" style={{ color: '#C0392B' }}>Produits</p>
            {menuProduits.map(col => (
              <div key={col.titre} className="mb-3">
                <p className="text-xs font-semibold mb-1.5 px-1" style={{ color: '#555' }}>{col.titre}</p>
                {col.items.map(item => (
                  <Link key={item} to={`/boutique?cat=${col.slug}`}
                    className="block text-sm py-1.5 pl-3 rounded-lg transition-colors hover:bg-white/5"
                    style={{ color: '#aaa' }} onClick={() => setMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </div>
            ))}

            <p className="text-xs font-bold uppercase tracking-widest py-2 mt-3" style={{ color: '#C0392B' }}>Services</p>
            {menuServices.map(col => (
              <div key={col.titre} className="mb-3">
                <p className="text-xs font-semibold mb-1.5 px-1" style={{ color: '#555' }}>{col.titre}</p>
                {col.items.map(item => (
                  <Link key={item} to="/contact"
                    className="block text-sm py-1.5 pl-3 rounded-lg transition-colors hover:bg-white/5"
                    style={{ color: '#aaa' }} onClick={() => setMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </div>
            ))}

            <div className="pt-4 mt-3 border-t space-y-1" style={{ borderColor: '#3a3a3c' }}>
              {[
                { to: '/realisations', label: 'Réalisations' },
                { to: '/boutique', label: 'Boutique' },
                { to: '/contact', label: 'À propos' },
              ].map(({ to, label }) => (
                <Link key={to} to={to}
                  className="flex items-center py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                  style={{ color: '#bbb' }} onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              <Link to="/contact"
                className="flex items-center justify-center gap-2 text-white font-bold px-4 py-3 rounded-xl text-sm w-full mt-3"
                style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}
                onClick={() => setMenuOpen(false)}>
                <FileText size={15} /> Je veux un devis
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}