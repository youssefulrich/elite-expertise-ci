import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, Tag, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = ['Tous', 'Installation', 'Maintenance', 'Formation', "Plan d'évacuation", 'Signalisation sécurité']

const realisations = [
  {
    id: 1,
    titre: "Plan d'évacuation — Site tertiaire",
    categorie: "Plan d'évacuation",
    client: 'Client confidentiel',
    date: '2025',
    lieu: "Abidjan, Côte d'Ivoire",
    description: "Conception et installation d'un plan d'évacuation complet avec consignes de sécurité, zones de rassemblement et contacts d'urgence (Sapeurs Pompiers, SAMU).",
    images: ['/real-issue-secours-2.jpg', '/real-detecteur.jpg'],
    tags: ["Plan évacuation", 'Sécurité incendie', 'Signalétique'],
  },
  {
    id: 2,
    titre: 'Installation extincteurs — Immeuble de bureaux',
    categorie: 'Installation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: "Abidjan, Côte d'Ivoire",
    description: 'Installation et numérotation de 7 extincteurs de différentes classes (A, B, CO₂, Poudre ABC) sur plusieurs étages avec pose de signalétique réglementaire.',
    images: ['/real-extincteur-1.jpg', '/real-extincteur-2.jpg', '/real-extincteur-3.jpg', '/real-extincteur-4.jpg', '/real-extincteur-5.jpg', '/real-extincteur-6.jpg', '/real-plan-evac-2.jpg'],
    tags: ['Extincteurs', 'Sécurité incendie', 'Installation'],
  },
  {
    id: 3,
    titre: 'Installation issues de secours lumineux',
    categorie: 'Installation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: "Abidjan, Côte d'Ivoire",
    description: 'Pose et mise en service de blocs de balisage lumineux pour issues de secours. Conformité aux normes incendie en vigueur.',
    images: ['/real-extincteur-7.jpg', '/real-plan-evac-1.jpg'],
    tags: ['Issues de secours', 'Balisage', 'Conformité'],
  },
  {
    id: 4,
    titre: 'Installation détecteur de fumée',
    categorie: 'Installation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: "Abidjan, Côte d'Ivoire",
    description: 'Pose et test de détecteur de fumée au plafond. Vérification du bon fonctionnement et formation des utilisateurs.',
    images: ['/real-issue-secours-1.jpg'],
    tags: ['Détection', 'Fumée', 'Installation'],
  },
  {
    id: 5,
    titre: 'Maintenance & recharge extincteurs — Site résidentiel',
    categorie: 'Maintenance',
    client: 'Client confidentiel',
    date: '2025',
    lieu: "Abidjan, Côte d'Ivoire",
    description: "Opération complète de maintenance : collecte des extincteurs, démontage, vérification des pièces, remplacement de la cartouche CO₂, recharge, remontage et pesée de contrôle. 5 extincteurs traités en une intervention.",
    images: ['/maint-exterieurs.jpg', '/maint-pesee-1.jpg', '/maint-demontage.jpg', '/maint-recharge-1.jpg', '/maint-outils.jpg', '/maint-remontage.jpg', '/maint-recharge-2.jpg', '/maint-pesee-2.jpg'],
    tags: ['Maintenance', 'Recharge', 'Extincteurs', 'Pesée'],
  },
  {
    id: 7,
    titre: 'Formation sécurité incendie — Entreprise privée',
    categorie: 'Formation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: "Abidjan, Côte d'Ivoire",
    description: "Session de formation théorique et pratique à la sécurité incendie. Présentation des consignes, types d'extincteurs, classes de feux et gestes à adopter en cas d'incendie. Formation dispensée en salle avec support visuel et démonstration sur extincteurs réels.",
    images: ['/formation-2.jpg', '/formation-1.jpg'],
    tags: ['Formation', 'Incendie', 'Extincteurs', 'Sensibilisation'],
  },
]

const toutesPhotos = [
  { url: '/real-plan-evac-1.jpg', caption: "Plan d'évacuation — Site tertiaire" },
  { url: '/real-plan-evac-2.jpg', caption: 'Plan d\'évacuation bilingue — VR Global' },
  { url: '/real-extincteur-1.jpg', caption: 'Extincteur Eau Additif — Classe A/B' },
  { url: '/real-extincteur-2.jpg', caption: 'Extincteur CO₂ — Classe B' },
  { url: '/real-extincteur-3.jpg', caption: 'Extincteur Eau Additif — Classe A/B' },
  { url: '/real-extincteur-4.jpg', caption: 'Extincteur Poudre ABC' },
  { url: '/real-extincteur-5.jpg', caption: 'Extincteur CO₂ — Immeuble de bureaux' },
  { url: '/real-extincteur-6.jpg', caption: 'Extincteur Eau Additif sur colonne' },
  { url: '/real-extincteur-7.jpg', caption: 'Extincteur Eau Additif — Classe A/B' },
  { url: '/real-detecteur.jpg', caption: 'Installation détecteur de fumée' },
  { url: '/real-issue-secours-1.jpg', caption: 'Bloc issue de secours lumineux' },
  { url: '/real-issue-secours-2.jpg', caption: 'Bloc issue de secours — plafond' },
  { url: '/maint-exterieurs.jpg', caption: 'Maintenance extincteurs extérieurs' },
  { url: '/maint-pesee-1.jpg', caption: 'Pesée de contrôle CO₂ — 6.750 kg' },
  { url: '/maint-demontage.jpg', caption: 'Démontage extincteurs pour révision' },
  { url: '/maint-recharge-1.jpg', caption: 'Recharge extincteur en cours' },
  { url: '/maint-outils.jpg', caption: 'Outillage spécialisé maintenance' },
  { url: '/maint-remontage.jpg', caption: 'Remontage après recharge' },
  { url: '/maint-recharge-2.jpg', caption: 'Insertion cartouche CO₂' },
  { url: '/maint-pesee-2.jpg', caption: 'Pesée finale — 6.275 kg' },
  { url: '/formation-1.jpg', caption: 'Session de formation sécurité incendie' },
  { url: '/formation-2.jpg', caption: 'Démonstration extincteurs en salle' },
]

// Hook animation scroll
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function AnimSection({ children, className, style, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// Compteur animé
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView()
  const num = parseInt(target)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = num / (1200 / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, num])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function Realisations() {
  const [filtre, setFiltre] = useState('Tous')
  const [selected, setSelected] = useState(null)
  const [photoZoom, setPhotoZoom] = useState(null)
  const [zoomIndex, setZoomIndex] = useState(0)
  const [activeImg, setActiveImg] = useState(0)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100) }, [])

  const filtrees = filtre === 'Tous' ? realisations : realisations.filter(r => r.categorie === filtre)

  function openRealisation(r) { setSelected(r); setActiveImg(0) }

  function openZoom(photo, index) { setPhotoZoom(photo); setZoomIndex(index) }
  function prevZoom() { const i = (zoomIndex - 1 + toutesPhotos.length) % toutesPhotos.length; setZoomIndex(i); setPhotoZoom(toutesPhotos[i]) }
  function nextZoom() { const i = (zoomIndex + 1) % toutesPhotos.length; setZoomIndex(i); setPhotoZoom(toutesPhotos[i]) }

  function prevImg() { setActiveImg(i => (i - 1 + selected.images.length) % selected.images.length) }
  function nextImg() { setActiveImg(i => (i + 1) % selected.images.length) }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.4);opacity:.9} }
        .filter-btn { transition: all 0.2s ease; }
        .filter-btn:hover { transform: translateY(-1px); }
        .real-card { transition: all 0.3s ease; }
        .real-card:hover { transform: translateY(-4px); }
        .gallery-item { transition: transform 0.4s ease; }
        .gallery-item:hover { transform: scale(1.03); }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="relative py-24 px-6 text-white overflow-hidden" style={{ background: '#1C1C1E', minHeight: '420px' }}>
        <img src="/real-extincteur-6.jpg" alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.12, filter: 'blur(2px)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(28,28,30,0.95) 40%, rgba(192,57,43,0.15) 100%)' }} />

        {/* Cercles décoratifs */}
        <div className="absolute top-8 right-12 w-32 h-32 rounded-full border border-red-900 border-opacity-30" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border border-red-900 border-opacity-20" style={{ animation: 'pulse 3s ease-in-out infinite 1s' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5"
              style={{ background: 'rgba(192,57,43,0.25)', color: '#e87060', border: '1px solid rgba(192,57,43,0.3)' }}>
              Portfolio terrain
            </span>
          </div>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease 0.25s' }}>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-5">
              Nos{' '}
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #C0392B, #e74c3c, #C0392B)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
              }}>Réalisations</span>
            </h1>
          </div>
          <div style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.7s ease 0.4s' }}>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Extincteurs, plans d'évacuation, maintenance et formation — nos interventions réelles en Côte d'Ivoire.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 max-w-3xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: 50, suffix: '+', label: 'Projets réalisés' },
            { val: 22, suffix: '', label: 'Photos terrain' },
            { val: 5, suffix: ' ans', label: "D'expérience" },
            { val: 100, suffix: '%', label: 'Satisfaction client' },
          ].map((s, i) => (
            <div key={s.label} className="text-center p-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${0.5 + i * 0.1}s` }}>
              <p className="font-extrabold text-2xl text-white">
                <Counter target={s.val} suffix={s.suffix} />
              </p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FILTRES ===== */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFiltre(cat)}
              className="filter-btn shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
              style={{
                background: filtre === cat ? 'linear-gradient(135deg, #C0392B, #922B21)' : '#f5f5f5',
                color: filtre === cat ? '#fff' : '#666',
                boxShadow: filtre === cat ? '0 4px 12px rgba(192,57,43,0.3)' : 'none',
              }}>
              {cat}
              {cat !== 'Tous' && (
                <span className="ml-1.5 opacity-60">({realisations.filter(r => r.categorie === cat).length})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ===== RÉALISATIONS ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtrees.map((r, i) => (
              <AnimSection key={r.id} delay={i * 80}>
                <div onClick={() => openRealisation(r)}
                  className="real-card bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-2xl cursor-pointer group">

                  <div className="relative h-64 overflow-hidden">
                    <img src={r.images[0]} alt={r.titre}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      style={{ '--tw-scale-x': 1.08, '--tw-scale-y': 1.08 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.05) 100%)' }} />

                    {/* Overlay rouge au hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(192,57,43,0.08)' }} />

                    {r.images.length > 1 && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black bg-opacity-70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <ZoomIn size={11} /> {r.images.length} photos
                      </div>
                    )}

                    {r.images.length > 1 && (
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {r.images.slice(0, 4).map((img, idx) => (
                          <div key={idx} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white border-opacity-70 shadow-md">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {r.images.length > 4 && (
                          <div className="w-10 h-10 rounded-lg bg-black bg-opacity-70 border-2 border-white border-opacity-70 flex items-center justify-center text-white text-xs font-bold">
                            +{r.images.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                      style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}>
                      {r.categorie}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2.5">
                      <span className="flex items-center gap-1"><MapPin size={10} style={{ color: '#C0392B' }} />{r.lieu}</span>
                      <span className="flex items-center gap-1"><Calendar size={10} style={{ color: '#C0392B' }} />{r.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-red-600 transition-colors">{r.titre}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{r.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {r.tags.map(t => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
                            style={{ background: '#f5f5f5', color: '#666' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,57,43,0.08)'; e.currentTarget.style.color = '#C0392B' }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#666' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all group-hover:gap-2" style={{ color: '#C0392B' }}>
                        Voir photos <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIE ===== */}
      <section className="py-16 px-6" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto">
          <AnimSection className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3"
              style={{ background: 'rgba(192,57,43,0.2)', color: '#e87060' }}>Galerie</span>
            <h2 className="font-display text-3xl font-extrabold text-white">Toutes nos photos terrain</h2>
          </AnimSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {toutesPhotos.map((p, i) => (
              <AnimSection key={i} delay={i * 30}>
                <div onClick={() => openZoom(p, i)}
                  className="gallery-item relative rounded-xl overflow-hidden cursor-pointer group"
                  style={{ height: '180px' }}>
                  <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-45 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                    <p className="text-white text-xs font-medium">{p.caption}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 px-6 text-center text-white overflow-hidden" style={{ background: '#C0392B' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-80 h-80 rounded-full border border-white border-opacity-10 -top-16 -left-16" />
          <div className="absolute w-56 h-56 rounded-full border border-white border-opacity-10 -bottom-8 -right-8" />
        </div>
        <AnimSection className="relative z-10">
          <h2 className="font-display text-3xl font-extrabold mb-3">Votre projet, notre expertise</h2>
          <p className="text-red-200 mb-8 max-w-xl mx-auto">
            Besoin d'une installation, maintenance ou audit ? Contactez-nous pour une intervention rapide.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl bg-white text-red-700 hover:bg-gray-50 transition-all hover:scale-105 hover:shadow-xl">
            Demander un devis <ArrowRight size={16} />
          </Link>
        </AnimSection>
      </section>

      {/* ===== MODAL RÉALISATION ===== */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ animation: 'fadeUp 0.3s ease' }}
            onClick={e => e.stopPropagation()}>

            <div className="relative h-72 overflow-hidden rounded-t-2xl">
              <img src={selected.images[activeImg]} alt={selected.titre} className="w-full h-full object-cover transition-all duration-300" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 20%, transparent)' }} />

              <button onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <X size={15} />
              </button>
              <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}>
                {selected.categorie}
              </span>

              {selected.images.length > 1 && (
                <>
                  <button onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                  <span className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                    {activeImg + 1} / {selected.images.length}
                  </span>
                </>
              )}
            </div>

            {selected.images.length > 1 && (
              <div className="flex gap-2 p-3 bg-gray-50 overflow-x-auto">
                {selected.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className="shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all hover:scale-105"
                    style={{ border: `2px solid ${activeImg === i ? '#C0392B' : 'transparent'}`, opacity: activeImg === i ? 1 : 0.6 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6">
              <h2 className="font-display text-xl font-extrabold text-gray-900 mb-3">{selected.titre}</h2>
              <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                  <Tag size={11} style={{ color: '#C0392B' }} />{selected.client}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                  <MapPin size={11} style={{ color: '#C0392B' }} />{selected.lieu}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                  <Calendar size={11} style={{ color: '#C0392B' }} />{selected.date}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">{selected.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tags.map(t => (
                  <span key={t} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{ borderColor: '#C0392B', color: '#C0392B', background: 'rgba(192,57,43,0.05)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link to="/contact" onClick={() => setSelected(null)}
                className="flex items-center justify-center gap-2 w-full font-bold py-3.5 rounded-xl text-white transition-all hover:gap-3"
                style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}>
                Demander un projet similaire <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== ZOOM PHOTO avec navigation ===== */}
      {photoZoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => setPhotoZoom(null)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPhotoZoom(null)}
              className="absolute -top-10 right-0 text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors">
              <X size={17} /> Fermer
            </button>

            {/* Navigation */}
            <button onClick={prevZoom}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-9 h-9 rounded-full bg-white bg-opacity-10 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextZoom}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-9 h-9 rounded-full bg-white bg-opacity-10 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
              <ChevronRight size={18} />
            </button>

            <img src={photoZoom.url} alt={photoZoom.caption} className="w-full rounded-2xl shadow-2xl" style={{ animation: 'fadeUp 0.25s ease' }} />
            <div className="flex items-center justify-between mt-3">
              <p className="text-gray-400 text-sm">{photoZoom.caption}</p>
              <p className="text-gray-600 text-xs">{zoomIndex + 1} / {toutesPhotos.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}