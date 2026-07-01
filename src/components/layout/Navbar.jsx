import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Menu, X, FileText, ChevronDown, Package, Wrench, ArrowRight,
  Flame, Wind, HardHat, TrafficCone, GraduationCap, Settings, ClipboardCheck,
  Image, ShoppingBag, Info,
} from 'lucide-react'

const menuProduits = [
  { titre: 'Incendie',       icon: Flame,       items: ['Extincteur', 'RIA', 'PIA', 'Lance incendie', 'Poteaux incendie'], slug: 'securite-incendie' },
  { titre: 'Détection gaz',  icon: Wind,        items: ['Détecteur portable', 'Détecteur fixe', 'Balise de détection', 'Éthylotest'], slug: 'detection-de-gaz' },
  { titre: 'EPI',            icon: HardHat,     items: ['Chaussures de sécurité', 'Casque', 'Protection auditive', 'Vêtements de travail'], slug: 'epi' },
  { titre: 'Signalisation',  icon: TrafficCone, items: ['Cônes', 'Ruban de signalisation', 'Panneaux', 'Traçeur de chantier'], slug: 'signalisation' },
]

const menuServices = [
  { titre: 'Formation',      icon: GraduationCap, items: ['Sécurité incendie', 'Premiers secours', 'Utilisation EPI'] },
  { titre: 'Maintenance',    icon: Settings,      items: ['Extincteurs', 'Détecteurs de gaz', 'Vérification EPI'] },
  { titre: 'Conseil & Audit',icon: ClipboardCheck,items: ['Audit sécurité site', 'Plan de prévention', 'Étude des risques'] },
]

const mainLinks = [
  { to: '/realisations', label: 'Réalisations', icon: Image },
  { to: '/boutique',     label: 'Boutique',     icon: ShoppingBag },
  { to: '/contact',      label: 'À propos',     icon: Info },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [openSeq, setOpenSeq] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false); setDropdown(null) }, [location])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setDropdown(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggleDropdown(name) {
    setDropdown(prev => {
      const next = prev === name ? null : name
      if (next) setOpenSeq(s => s + 1)
      return next
    })
  }

  const navBg = scrolled
    ? 'rgba(180,20,20,0.97)'
    : 'linear-gradient(135deg, #e74c3c, #C0392B)'

  return (
    <>
      <style>{`
        @keyframes navFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .nav-link-underline { position: relative; }
        .nav-link-underline::after {
          content: ''; position: absolute; bottom: -2px; left: 50%; right: 50%;
          height: 2px; background: #fff; border-radius: 2px;
          transition: left 0.2s ease, right 0.2s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after { left: 8px; right: 8px; }
        .dropdown-item { position: relative; padding-left: 12px; }
        .dropdown-item::before {
          content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 4px; height: 4px; border-radius: 50%; background: #ccc;
          transition: background 0.15s, transform 0.15s;
        }
        .dropdown-item:hover::before { background: #e74c3c; transform: translateY(-50%) scale(1.5); }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <header
        ref={navRef}
        className="sticky top-0 z-50"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 32px rgba(180,0,0,0.35)' : '0 2px 12px rgba(180,0,0,0.25)',
          transition: 'all 0.3s ease',
          animation: 'navFadeIn 0.45s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between"
            style={{ height: scrolled ? '56px' : '64px', transition: 'height 0.3s ease' }}>

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0"
              style={{ transition: 'transform 0.2s' }}
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
                  className="nav-link-underline flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all text-white"
                  style={{ background: dropdown === 'produits' ? 'rgba(255,255,255,0.18)' : 'transparent' }}
                >
                  <Package size={15} style={{ transform: dropdown === 'produits' ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.2s ease' }} />
                  Produits
                  <ChevronDown size={14} style={{ transform: dropdown === 'produits' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }} />
                </button>

                {/* Dropdown produits */}
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', left: 0,
                  background: '#fff',
                  border: '2px solid #fca5a5',
                  borderRadius: '16px', padding: '20px', width: '520px',
                  boxShadow: '0 24px 48px rgba(180,0,0,0.18)',
                  opacity: dropdown === 'produits' ? 1 : 0,
                  pointerEvents: dropdown === 'produits' ? 'all' : 'none',
                  transform: dropdown === 'produits' ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.98)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  transformOrigin: 'top left',
                }}>
                  <div style={{ height: '3px', background: 'linear-gradient(90deg, #e74c3c, #fca5a5, transparent)', borderRadius: '3px', marginBottom: '16px' }} />
                  <div key={`pg-${openSeq}`} className="grid grid-cols-4 gap-4">
                    {menuProduits.map((col, i) => (
                      <div key={col.titre} style={{ animation: 'navFadeIn 0.35s ease both', animationDelay: `${i * 50}ms` }}>
                        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2.5 text-red-600">
                          <col.icon size={13} /> {col.titre}
                        </p>
                        <ul className="space-y-1.5">
                          {col.items.map(item => (
                            <li key={item}>
                              <Link to={`/boutique?cat=${col.slug}`} onClick={() => setDropdown(null)}
                                className="dropdown-item block text-xs text-gray-500 transition-colors hover:text-red-600">
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-red-100 flex items-center justify-between">
                    <Link to="/boutique" onClick={() => setDropdown(null)}
                      className="flex items-center gap-1.5 text-xs font-bold text-red-600 transition-all hover:gap-3">
                      Voir tous les produits <ArrowRight size={13} />
                    </Link>
                    <span className="text-xs text-gray-400">100+ produits disponibles</span>
                  </div>
                </div>
              </div>

              {/* SERVICES */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('services')}
                  className="nav-link-underline flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all text-white"
                  style={{ background: dropdown === 'services' ? 'rgba(255,255,255,0.18)' : 'transparent' }}
                >
                  <Wrench size={15} style={{ transform: dropdown === 'services' ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.2s ease' }} />
                  Services
                  <ChevronDown size={14} style={{ transform: dropdown === 'services' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }} />
                </button>

                {/* Dropdown services */}
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', left: 0,
                  background: '#fff',
                  border: '2px solid #fca5a5',
                  borderRadius: '16px', padding: '20px', width: '480px',
                  boxShadow: '0 24px 48px rgba(180,0,0,0.18)',
                  opacity: dropdown === 'services' ? 1 : 0,
                  pointerEvents: dropdown === 'services' ? 'all' : 'none',
                  transform: dropdown === 'services' ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.98)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  transformOrigin: 'top left',
                }}>
                  <div style={{ height: '3px', background: 'linear-gradient(90deg, #e74c3c, #fca5a5, transparent)', borderRadius: '3px', marginBottom: '16px' }} />
                  <div key={`sg-${openSeq}`} className="grid grid-cols-3 gap-4">
                    {menuServices.map((col, i) => (
                      <div key={col.titre} style={{ animation: 'navFadeIn 0.35s ease both', animationDelay: `${i * 50}ms` }}>
                        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2.5 text-red-600">
                          <col.icon size={13} /> {col.titre}
                        </p>
                        <ul className="space-y-1.5">
                          {col.items.map(item => (
                            <li key={item}>
                              <Link to="/contact" onClick={() => setDropdown(null)}
                                className="dropdown-item block text-xs text-gray-500 transition-colors hover:text-red-600">
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-red-100">
                    <Link to="/contact" onClick={() => setDropdown(null)}
                      className="flex items-center gap-1.5 text-xs font-bold text-red-600 transition-all hover:gap-3">
                      Demander un devis service <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {mainLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={() => setDropdown(null)}
                  className={({ isActive }) =>
                    `nav-link-underline${isActive ? ' active' : ''} px-3 py-2 rounded-lg text-sm font-semibold transition-all text-white`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* CTA + burger */}
            <div className="flex items-center gap-3">
              <Link to="/contact" onClick={() => setDropdown(null)}
                className="hidden md:flex items-center gap-2 font-bold px-4 py-2 rounded-lg text-sm transition-all active:scale-95"
                style={{ background: '#fff', color: '#e74c3c' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,255,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <FileText size={15} />
                Je veux un devis
              </Link>

              <button
                className="md:hidden p-2 rounded-lg transition-all text-white"
                style={{ background: menuOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div style={{ transition: 'transform 0.3s ease', transform: menuOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Barre blanche bottom au scroll */}
        <div style={{
          height: '2px',
          background: 'rgba(255,255,255,0.25)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }} />

        {/* Menu mobile */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '80vh' : '0',
          transition: 'max-height 0.35s ease',
          background: '#fff',
          borderTop: menuOpen ? '2px solid #fca5a5' : 'none',
        }}>
          <div key={menuOpen} className="md:hidden px-4 py-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>

            <div style={{ animation: 'navFadeIn 0.35s ease both' }}>
              <p className="text-xs font-bold uppercase tracking-widest py-2 text-red-600">Produits</p>
              {menuProduits.map(col => (
                <div key={col.titre} className="mb-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 px-1 text-red-400">
                    <col.icon size={13} /> {col.titre}
                  </p>
                  {col.items.map(item => (
                    <Link key={item} to={`/boutique?cat=${col.slug}`}
                      className="block text-sm py-1.5 pl-3 rounded-lg transition-colors text-gray-600 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setMenuOpen(false)}>
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ animation: 'navFadeIn 0.35s ease both', animationDelay: '70ms' }}>
              <p className="text-xs font-bold uppercase tracking-widest py-2 mt-3 text-red-600">Services</p>
              {menuServices.map(col => (
                <div key={col.titre} className="mb-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 px-1 text-red-400">
                    <col.icon size={13} /> {col.titre}
                  </p>
                  {col.items.map(item => (
                    <Link key={item} to="/contact"
                      className="block text-sm py-1.5 pl-3 rounded-lg transition-colors text-gray-600 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setMenuOpen(false)}>
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div className="pt-4 mt-3 border-t-2 border-red-100 space-y-1"
              style={{ animation: 'navFadeIn 0.35s ease both', animationDelay: '140ms' }}>
              {mainLinks.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}
                  className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors text-gray-700 hover:text-red-600 hover:bg-red-50"
                  onClick={() => setMenuOpen(false)}>
                  <Icon size={15} className="text-red-400" /> {label}
                </Link>
              ))}
              <Link to="/contact"
                className="flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-xl text-sm w-full mt-3 text-white transition-transform active:scale-95"
                style={{ background: 'linear-gradient(135deg, #ff6b6b, #e74c3c, #C0392B)' }}
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