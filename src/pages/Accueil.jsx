import { Link } from 'react-router-dom'
import { Shield, ArrowRight, Phone, CheckCircle, Truck, Headphones, Star, Quote, ChevronDown } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

const categories = [
  { nom: 'Sécurité incendie', slug: 'securite-incendie', emoji: '', desc: 'Extincteurs · RIA · Lances', img: '/img-incendie.webp' },
  { nom: 'Détection de gaz', slug: 'detection-de-gaz', emoji: '', desc: 'Fixes · Portables · Balises', img: '/img-epi2.jpg' },
  { nom: 'EPI', slug: 'epi', emoji: '', desc: 'Casques · Chaussures · Gilets', img: '/img-epi.jpg' },
  { nom: 'Signalisation', slug: 'signalisation', emoji: '', desc: 'Cônes · Rubans · Panneaux', img: '/img-signalisation.jpg' },
]

const marques = ['Dräger', 'MSA', 'Portwest', 'Sentech', 'Zoll', 'AIRBEL']

const stats = [
  { val: '10+', label: 'Marques mondiales' },
  { val: '100+', label: 'Produits en stock' },
  { val: '500+', label: 'Clients satisfaits' },
  { val: '5 ans', label: "D'expertise CI" },
]

const pourquoiNous = [
  { icon: Shield, titre: 'Produits certifiés', desc: 'Tous nos équipements respectent les normes internationales EN, ISO et NFPA en vigueur.' },
  { icon: Truck, titre: 'Livraison rapide', desc: 'Stock disponible à Abidjan pour une livraison express sur tout le territoire ivoirien.' },
  { icon: Headphones, titre: 'Expertise & conseil', desc: 'Notre équipe vous accompagne dans le choix des équipements adaptés à votre secteur.' },
]

const temoignages = [
  { nom: 'Kouassi Fernand', poste: 'Responsable HSE — SODECI', texte: 'Elite Expertise CI nous a fourni des détecteurs de gaz MSA de haute qualité. Livraison rapide et équipe très professionnelle.', note: 5 },
  { nom: 'Aminata Diallo', poste: 'Directrice Sécurité — Orange CI', texte: 'Partenaire fiable depuis 3 ans. Leurs équipements EPI sont conformes aux normes et leur service après-vente est irréprochable.', note: 5 },
  { nom: 'Jean-Marc Brou', poste: 'Chef de chantier — Bouygues CI', texte: 'Excellente réactivité pour nos commandes urgentes. Prix compétitifs et produits de qualité. Je recommande vivement.', note: 5 },
]

const partenaires = [
  { nom: 'SODECI', secteur: 'Eau & assainissement' },
  { nom: 'Orange CI', secteur: 'Télécommunications' },
  { nom: 'Bouygues CI', secteur: 'BTP & Construction' },
  { nom: 'PETROCI', secteur: 'Pétrole & Énergie' },
  { nom: 'SUCAF CI', secteur: 'Agroalimentaire' },
  { nom: "Port d'Abidjan", secteur: 'Logistique & Transport' },
]

const certifications = [
  { code: 'EN 13501', label: 'Résistance au feu' },
  { code: 'ISO 45001', label: 'Santé & Sécurité' },
  { code: 'NFPA 10', label: 'Extincteurs' },
  { code: 'EN 397', label: 'Casques de sécurité' },
]

const imagesGalerie = [
  { url: '/real-extincteur-6.jpg', caption: 'Installation extincteur' },
  { url: '/maint-exterieurs.jpg', caption: 'Maintenance terrain' },
  { url: '/img-incendie.webp', caption: 'Protection incendie' },
  { url: '/formation-1.jpg', caption: 'Formation sécurité' },
  { url: '/real-plan-evac-1.jpg', caption: "Plan d'évacuation" },
  { url: '/img-signalisation.jpg', caption: 'Signalisation chantier' },
]

// Hook pour animer au scroll
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// Composant section animée
function AnimSection({ children, className, style, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
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
    const duration = 1500
    const step = num / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, num])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function Accueil() {
  const [produitsVedette, setProduitsVedette] = useState([])
  const [loadingProduits, setLoadingProduits] = useState(true)
  const [heroVisible, setHeroVisible] = useState(false)
  const [marquesOffset, setMarquesOffset] = useState(0)

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)
    async function fetchVedettes() {
      const { data } = await supabase.from('produits').select('*, marques(nom), categories(nom, slug)').eq('est_vedette', true).limit(4)
      setProduitsVedette(data || [])
      setLoadingProduits(false)
    }
    fetchVedettes()
    // Défilement marques
    const interval = setInterval(() => {
      setMarquesOffset(prev => (prev + 1) % (marques.length * 120))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ===== HERO ===== */}
      <section className="relative text-white flex items-center min-h-[620px]" style={{ backgroundImage: 'url("/img-epi.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 45%, rgba(0,0,0,0.2) 100%)' }} />

        {/* Particules rouges décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: `${40 + i * 20}px`, height: `${40 + i * 20}px`,
              background: 'rgba(192,57,43,0.08)',
              left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%`,
              animation: `pulse ${2 + i * 0.5}s ease-in-out infinite alternate`,
            }} />
          ))}
        </div>

        <style>{`
          @keyframes pulse { from { transform: scale(1); opacity: 0.3; } to { transform: scale(1.3); opacity: 0.7; } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideIn { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
              <span className="inline-flex items-center gap-2 border border-red-700 text-red-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(120,0,0,0.4)' }}>
                <Shield size={12} /> Spécialiste sécurité industrielle — Côte d'Ivoire
              </span>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.3s' }}>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Protégez vos équipes.<br />
                <span style={{
                  color: '#C0392B',
                  backgroundImage: 'linear-gradient(90deg, #C0392B, #e74c3c, #C0392B)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}>Sécurisez</span> vos sites.
              </h1>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.7s ease 0.5s' }}>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                Équipements de sécurité certifiés pour les entreprises et industries de Côte d'Ivoire.
              </p>
            </div>

            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.7s' }}>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/boutique" className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-900/40"
                  style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}>
                  Voir nos produits <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all hover:scale-105">
                  <Phone size={18} /> Demander un devis
                </Link>
              </div>
              <div className="flex flex-wrap gap-5">
                {['Produits certifiés', 'Livraison Abidjan', 'SAV inclus'].map((t, i) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-gray-300" style={{ animation: `slideIn 0.5s ease ${0.8 + i * 0.15}s both` }}>
                    <CheckCircle size={15} style={{ color: '#C0392B' }} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards catégories flottantes */}
        <div className="hidden lg:grid absolute right-12 top-1/2 -translate-y-1/2 grid-cols-2 gap-3 z-10">
          {categories.map(({ nom, emoji, desc, slug }, i) => (
            <Link key={nom} to={`/boutique?cat=${slug}`}
              className="flex flex-col items-center text-center p-4 rounded-xl border border-white border-opacity-10 hover:border-red-500 hover:scale-105 transition-all"
              style={{ background: 'rgba(0,0,0,0.6)', minWidth: '130px', backdropFilter: 'blur(8px)', animation: `fadeUp 0.6s ease ${0.4 + i * 0.15}s both` }}>
              <span className="text-3xl mb-2">{emoji}</span>
              <p className="text-white text-xs font-bold mb-1">{nom}</p>
              <p className="text-gray-400 text-xs">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Flèche scroll */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10" style={{ animation: 'bounce 2s ease-in-out infinite' }}>
          <ChevronDown size={28} className="text-white opacity-50" />
        </div>
      </section>

      {/* ===== BARRE MARQUES DÉFILANTE ===== */}
      <section className="py-4 overflow-hidden" style={{ background: '#111' }}>
        <div className="flex items-center gap-4 px-6">
          <span className="text-gray-600 text-xs font-bold uppercase tracking-widest shrink-0 mr-4">Marques</span>
          <div className="flex gap-6 overflow-hidden">
            {[...marques, ...marques].map((m, i) => (
              <span key={i} className="text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full border border-gray-800 shrink-0 hover:border-red-800 hover:text-red-400 transition-colors cursor-default">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ANIMÉES ===== */}
      <section className="py-10 px-6" style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <AnimSection key={s.label} delay={i * 100}>
              <p className="font-display font-extrabold text-4xl text-white">
                <Counter target={parseInt(s.val)} suffix={s.val.includes('+') ? '+' : ''} />
                {s.val.includes('ans') ? ' ans' : ''}
              </p>
              <p className="text-red-200 text-sm mt-1">{s.label}</p>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* ===== CATÉGORIES ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimSection className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Nos domaines</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-2">Une protection complète pour votre activité</h2>
            <p className="text-gray-500">Des équipements adaptés à chaque secteur industriel</p>
          </AnimSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map(({ nom, desc, slug, img }, i) => (
              <AnimSection key={slug} delay={i * 120}>
                <Link to={`/boutique?cat=${slug}`}
                  className="relative rounded-2xl overflow-hidden group h-52 flex items-end shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 block">
                  <img src={img} alt={nom} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.05) 100%)' }} />
                  <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: '#C0392B' }} />
                  <div className="relative z-10 p-4 w-full">
                    <h3 className="font-bold text-white text-sm mb-0.5">{nom}</h3>
                    <p className="text-gray-300 text-xs">{desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#e87060' }}>
                      Voir les produits <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUITS VEDETTES ===== */}
      {(loadingProduits || produitsVedette.length > 0) && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimSection className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Sélection</span>
                <h2 className="font-display text-3xl font-extrabold text-gray-900">Produits phares</h2>
              </div>
              <Link to="/boutique" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-3 transition-all" style={{ color: '#C0392B' }}>
                Voir tout <ArrowRight size={16} />
              </Link>
            </AnimSection>
            {loadingProduits ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {produitsVedette.map((p, i) => (
                  <AnimSection key={p.id} delay={i * 100}>
                    <Link to={`/boutique/${p.slug}`}
                      className="bg-white rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all group overflow-hidden hover:-translate-y-1 block">
                      <div className="relative bg-gray-50 h-44 flex items-center justify-center p-4 overflow-hidden">
                        {p.image_url ? <img src={p.image_url} alt={p.nom} className="h-full object-contain group-hover:scale-110 transition-transform duration-500" /> : <span className="text-5xl">📦</span>}
                        {p.marques && <span className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#C0392B' }}>{p.marques.nom}</span>}
                        {p.statut === 'en_stock' && <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">En stock</span>}
                      </div>
                      <div className="p-4">
                        {p.categories && <p className="text-xs uppercase tracking-wide mb-1 font-semibold" style={{ color: '#C0392B' }}>{p.categories.nom}</p>}
                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors line-clamp-2 mb-2">{p.nom}</h3>
                        {p.prix ? <p className="font-extrabold text-base" style={{ color: '#C0392B' }}>{Number(p.prix).toLocaleString('fr-FR')} <span className="text-xs font-normal text-gray-400">FCFA</span></p>
                          : <p className="text-xs text-gray-400 italic">Prix sur devis</p>}
                      </div>
                    </Link>
                  </AnimSection>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== GALERIE TERRAIN ===== */}
      <section className="py-16 px-6" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto">
          <AnimSection className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(192,57,43,0.2)', color: '#e87060' }}>Sur le terrain</span>
            <h2 className="font-display text-3xl font-extrabold text-white mb-2">Nos équipements en action</h2>
            <p className="text-gray-500">Des solutions déployées dans les plus grandes entreprises de Côte d'Ivoire</p>
          </AnimSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagesGalerie.map((img, i) => (
              <AnimSection key={i} delay={i * 80} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'md:row-span-2' : ''}`} style={{ height: i === 0 ? '100%' : '200px', minHeight: '200px' }}>
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 transition-all duration-300" style={{ background: 'rgba(0,0,0,0)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(192,57,43,0.3)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'} />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                  <span className="text-white text-xs font-semibold">{img.caption}</span>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APERÇU RÉALISATIONS ===== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimSection className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Portfolio</span>
              <h2 className="font-display text-3xl font-extrabold text-gray-900">Nos réalisations</h2>
              <p className="text-gray-500 mt-1">Interventions terrain pour les grandes entreprises de CI</p>
            </div>
            <Link to="/realisations" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-3 transition-all" style={{ color: '#C0392B' }}>
              Voir tout <ArrowRight size={16} />
            </Link>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { titre: 'Installation extincteurs', cat: 'Installation', img: '/real-extincteur-6.jpg' },
              { titre: 'Maintenance extincteurs', cat: 'Maintenance', img: '/maint-exterieurs.jpg' },
              { titre: 'Formation sécurité incendie', cat: 'Formation', img: '/formation-1.jpg' },
            ].map((r, i) => (
              <AnimSection key={r.titre} delay={i * 120}>
                <Link to="/realisations"
                  className="relative rounded-2xl overflow-hidden group h-56 flex items-end shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 block">
                  <img src={r.img} alt={r.titre} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 40%, rgba(0,0,0,0.05) 100%)' }} />
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#C0392B' }} />
                  <div className="relative z-10 p-4 w-full">
                    <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: '#C0392B' }}>{r.cat}</span>
                    <h3 className="font-bold text-white text-sm leading-snug">{r.titre}</h3>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ILS NOUS FONT CONFIANCE ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimSection className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Références</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-2">Ils nous font confiance</h2>
            <p className="text-gray-500">Des entreprises de premier plan en Côte d'Ivoire</p>
          </AnimSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partenaires.map((p, i) => (
              <AnimSection key={p.nom} delay={i * 80}>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-white group hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-white text-lg shadow-sm group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}>
                    {p.nom[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{p.nom}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{p.secteur}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGES ===== */}
      <section className="py-16 px-6" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto">
          <AnimSection className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(192,57,43,0.2)', color: '#e87060' }}>Avis clients</span>
            <h2 className="font-display text-3xl font-extrabold text-white mb-2">Ce que disent nos clients</h2>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temoignages.map((t, i) => (
              <AnimSection key={t.nom} delay={i * 120}>
                <div className="rounded-xl p-6 border border-gray-800 relative hover:border-red-900 transition-all group" style={{ background: '#2c2c2e' }}>
                  <Quote size={32} className="absolute top-4 right-4" style={{ color: 'rgba(192,57,43,0.2)' }} />
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.note)].map((_, i) => <Star key={i} size={14} fill="#C0392B" style={{ color: '#C0392B' }} />)}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 italic">"{t.texte}"</p>
                  <div className="flex items-center gap-3 border-t border-gray-700 pt-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: '#C0392B' }}>{t.nom[0]}</div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.nom}</p>
                      <p className="text-gray-500 text-xs">{t.poste}</p>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <AnimSection>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Agréments & normes respectées</p>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-5 px-8 py-5 rounded-2xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#C0392B', background: 'rgba(192,57,43,0.03)' }}>
                <img src="/logo-onpc.png" alt="ONPC" className="h-16 w-auto object-contain hover:scale-110 transition-transform" />
                <div>
                  <p className="font-extrabold text-gray-900 text-sm">Agréé O.N.P.C</p>
                  <p className="text-gray-500 text-xs mt-0.5">Office National de la Protection Civile</p>
                  <p className="text-xs font-bold mt-1" style={{ color: '#C0392B' }}>Côte d'Ivoire ✓</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((c, i) => (
                <div key={c.code} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-red-200 hover:shadow-sm transition-all hover:-translate-y-0.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#C0392B' }}>
                    <Shield size={14} color="#fff" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-xs">{c.code}</p>
                    <p className="text-gray-400 text-xs">{c.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ===== POURQUOI NOUS ===== */}
      <section className="py-16 px-6" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto">
          <AnimSection className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(192,57,43,0.2)', color: '#e87060' }}>Pourquoi nous choisir</span>
            <h2 className="font-display text-3xl font-extrabold text-white mb-2">La confiance de vos équipes commence ici</h2>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pourquoiNous.map(({ icon: Icon, titre, desc }, i) => (
              <AnimSection key={titre} delay={i * 120}>
                <div className="p-6 rounded-xl border-l-4 hover:shadow-lg transition-all group hover:-translate-y-1" style={{ background: '#2c2c2e', borderLeftColor: '#C0392B' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: 'rgba(192,57,43,0.15)' }}>
                    <Icon size={24} style={{ color: '#C0392B' }} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{titre}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative py-24 px-6 text-center text-white overflow-hidden"
        style={{ backgroundImage: 'url("/img-epi2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0" style={{ background: 'rgba(192,57,43,0.92)' }} />
        {/* Cercles décoratifs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full border border-white border-opacity-10 -top-20 -left-20" />
          <div className="absolute w-64 h-64 rounded-full border border-white border-opacity-10 -bottom-10 -right-10" />
        </div>
        <AnimSection className="relative z-10">
          <h2 className="font-display text-4xl font-extrabold mb-3">Besoin d'un équipement ou d'un devis ?</h2>
          <p className="text-red-200 mb-10 max-w-xl mx-auto text-lg">Notre équipe vous répond sous 24h avec une offre personnalisée</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="font-bold px-8 py-4 rounded-xl bg-white text-red-700 hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-xl text-base">
              Demander un devis gratuit
            </Link>
            <Link to="/boutique" className="font-bold px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-white hover:text-red-700 transition-all hover:scale-105 text-base">
              Voir la boutique
            </Link>
          </div>
        </AnimSection>
      </section>

    </div>
  )
}