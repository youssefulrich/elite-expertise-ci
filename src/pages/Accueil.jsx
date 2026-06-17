import { Link } from 'react-router-dom'
import { Shield, ArrowRight, Phone, CheckCircle, Truck, Headphones, Star, Quote, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const categories = [
  {
    nom: 'Sécurité incendie',
    slug: 'securite-incendie',
    emoji: '',
    desc: 'Extincteurs · RIA · Lances',
    img: '/img-incendie.webp',
  },
  {
    nom: 'Détection de gaz',
    slug: 'detection-de-gaz',
    emoji: '',
    desc: 'Fixes · Portables · Balises',
    img: '/img-epi2.jpg',
  },
  {
    nom: 'EPI',
    slug: 'epi',
    emoji: '',
    desc: 'Casques · Chaussures · Gilets',
    img: '/img-epi.jpg',
  },
  {
    nom: 'Signalisation',
    slug: 'signalisation',
    emoji: '',
    desc: 'Cônes · Rubans · Panneaux',
    img: '/img-signalisation.jpg',
  },
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

// Images pour la galerie terrain
const imagesGalerie = [
  { url: '/img-epi.jpg', caption: 'Équipements de protection' },
  { url: '/img-epi2.jpg', caption: 'EPI professionnels' },
  { url: '/img-incendie.webp', caption: 'Protection incendie' },
  { url: '/img-signalisation.jpg', caption: 'Signalisation chantier' },
  { url: '/img-epi.jpg', caption: 'Équipements EPI' },
  { url: '/img-signalisation.jpg', caption: 'Balisage de chantier' },
]

export default function Accueil() {
  const [produitsVedette, setProduitsVedette] = useState([])
  const [loadingProduits, setLoadingProduits] = useState(true)

  useEffect(() => {
    async function fetchVedettes() {
      const { data } = await supabase
        .from('produits')
        .select('*, marques(nom), categories(nom, slug)')
        .eq('est_vedette', true)
        .limit(4)
      setProduitsVedette(data || [])
      setLoadingProduits(false)
    }
    fetchVedettes()
  }, [])

  return (
    <div>

      {/* ===== HERO ===== */}
      <section
        className="relative text-white flex items-center min-h-[620px]"
        style={{
          backgroundImage: 'url("/img-epi.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.3) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 border border-red-700 text-red-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(120,0,0,0.4)' }}>
              <Shield size={12} /> Spécialiste sécurité industrielle — Côte d'Ivoire
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Protégez vos équipes.<br />
              <span style={{ color: '#C0392B' }}>Sécurisez</span> vos sites.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Équipements de sécurité certifiés pour les entreprises et industries de Côte d'Ivoire. Détection de gaz, EPI, protection incendie.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/boutique" className="flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-white transition-colors" style={{ background: '#C0392B' }}>
                Voir nos produits <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="flex items-center gap-2 font-bold px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-gray-900 transition-colors">
                <Phone size={18} /> Demander un devis
              </Link>
            </div>
            <div className="flex flex-wrap gap-5">
              {['Produits certifiés', 'Livraison Abidjan', 'SAV inclus'].map(t => (
                <span key={t} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle size={15} style={{ color: '#C0392B' }} /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:grid absolute right-16 top-1/2 -translate-y-1/2 grid-cols-2 gap-3 z-10">
          {categories.map(({ nom, emoji, desc, slug }) => (
            <Link key={nom} to={`/boutique?cat=${slug}`}
              className="flex flex-col items-center text-center p-4 rounded-xl border border-white border-opacity-10 hover:border-red-500 transition-all"
              style={{ background: 'rgba(0,0,0,0.55)', minWidth: '130px', backdropFilter: 'blur(6px)' }}>
              <span className="text-3xl mb-2">{emoji}</span>
              <p className="text-white text-xs font-bold mb-1">{nom}</p>
              <p className="text-gray-400 text-xs">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== BARRE MARQUES ===== */}
      <section className="py-4 px-6" style={{ background: '#111' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <span className="text-gray-600 text-xs font-bold uppercase tracking-widest mr-4">Marques distribuées</span>
          {marques.map(m => (
            <span key={m} className="text-gray-400 text-xs font-bold px-3 py-1 rounded-full border border-gray-800">{m}</span>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-8 px-6" style={{ background: '#C0392B' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-display font-extrabold text-3xl text-white">{s.val}</p>
              <p className="text-red-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATÉGORIES AVEC IMAGES ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Nos domaines</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-2">Une protection complète pour votre activité</h2>
            <p className="text-gray-500">Des équipements adaptés à chaque secteur industriel</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map(({ nom, desc, slug, img }) => (
              <Link key={slug} to={`/boutique?cat=${slug}`}
                className="relative rounded-2xl overflow-hidden group h-52 flex items-end shadow-md hover:shadow-xl transition-all">
                <img src={img} alt={nom} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.1) 100%)' }} />
                <div className="relative z-10 p-4 w-full">
                  <h3 className="font-bold text-white text-sm mb-0.5">{nom}</h3>
                  <p className="text-gray-300 text-xs">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C0392B' }}>
                    Voir les produits <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUITS VEDETTES ===== */}
      {(loadingProduits || produitsVedette.length > 0) && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Sélection</span>
                <h2 className="font-display text-3xl font-extrabold text-gray-900">Produits phares</h2>
              </div>
              <Link to="/boutique" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-3 transition-all" style={{ color: '#C0392B' }}>
                Voir tout <ArrowRight size={16} />
              </Link>
            </div>
            {loadingProduits ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {produitsVedette.map(p => (
                  <Link key={p.id} to={`/boutique/${p.slug}`}
                    className="bg-white rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all group overflow-hidden">
                    <div className="relative bg-gray-50 h-44 flex items-center justify-center p-4">
                      {p.image_url ? <img src={p.image_url} alt={p.nom} className="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                        : <span className="text-5xl">📦</span>}
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
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== GALERIE TERRAIN ===== */}
      <section className="py-16 px-6" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(192,57,43,0.2)', color: '#e87060' }}>Sur le terrain</span>
            <h2 className="font-display text-3xl font-extrabold text-white mb-2">Nos équipements en action</h2>
            <p className="text-gray-500">Des solutions déployées dans les plus grandes entreprises de Côte d'Ivoire</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagesGalerie.map((img, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'md:row-span-2' : ''}`}
                style={{ height: i === 0 ? '100%' : '200px', minHeight: '200px' }}>
                <img src={img.url} alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                  <span className="text-white text-xs font-semibold px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ===== APERÇU RÉALISATIONS ===== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Portfolio</span>
              <h2 className="font-display text-3xl font-extrabold text-gray-900">Nos réalisations</h2>
              <p className="text-gray-500 mt-1">Interventions terrain pour les grandes entreprises de CI</p>
            </div>
            <Link to="/realisations" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-3 transition-all" style={{ color: '#C0392B' }}>
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { titre: 'Installation détection gaz — PETROCI', cat: 'Installation', img: '/img-epi2.jpg', lieu: 'Zone industrielle, Abidjan' },
              { titre: 'Maintenance extincteurs — SODECI', cat: 'Maintenance', img: '/img-incendie.webp', lieu: 'Plusieurs sites, Abidjan' },
              { titre: 'Formation sécurité — Orange CI', cat: 'Formation', img: '/img-epi.jpg', lieu: 'Plateau, Abidjan' },
            ].map(r => (
              <Link key={r.titre} to="/realisations"
                className="relative rounded-2xl overflow-hidden group h-56 flex items-end shadow-md hover:shadow-xl transition-all">
                <img src={r.img} alt={r.titre} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.1) 100%)' }} />
                <div className="relative z-10 p-4 w-full">
                  <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: '#C0392B' }}>{r.cat}</span>
                  <h3 className="font-bold text-white text-sm leading-snug mb-1">{r.titre}</h3>
                  <p className="text-gray-400 text-xs">{r.lieu}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/realisations" className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-white" style={{ background: '#C0392B' }}>
              Voir toutes nos réalisations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ILS NOUS FONT CONFIANCE ===== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Références</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-2">Ils nous font confiance</h2>
            <p className="text-gray-500">Des entreprises de premier plan en Côte d'Ivoire</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partenaires.map(p => (
              <div key={p.nom} className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-sm transition-all bg-gray-50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-white text-lg shadow-sm" style={{ background: '#C0392B' }}>
                  {p.nom[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{p.nom}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{p.secteur}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGES ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">Avis clients</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-2">Ce que disent nos clients</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temoignages.map(t => (
              <div key={t.nom} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative">
                <Quote size={32} className="absolute top-4 right-4 text-gray-100" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.note)].map((_, i) => <Star key={i} size={14} fill="#C0392B" style={{ color: '#C0392B' }} />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.texte}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: '#C0392B' }}>
                    {t.nom[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.nom}</p>
                    <p className="text-gray-400 text-xs">{t.poste}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-10 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Normes & certifications respectées</p>

          {/* Agrément officiel ONPC */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 px-6 py-4 rounded-xl border-2" style={{ borderColor: '#C0392B', background: 'rgba(192,57,43,0.04)' }}>
              <img src="/logo-onpc.png" alt="Office National de la Protection Civile" className="h-16 w-16 object-contain shrink-0" />
              <div className="text-left">
                <p className="font-extrabold text-gray-900 text-sm">Agréé par l'ONPC</p>
                <p className="text-gray-500 text-xs">Office National de la Protection Civile — Côte d'Ivoire</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map(c => (
              <div key={c.code} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-100 bg-gray-50">
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
        </div>
      </section>

      {/* ===== POURQUOI NOUS ===== */}
      <section className="py-16 px-6" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(192,57,43,0.2)', color: '#e87060' }}>Pourquoi nous choisir</span>
            <h2 className="font-display text-3xl font-extrabold text-white mb-2">La confiance de vos équipes commence ici</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pourquoiNous.map(({ icon: Icon, titre, desc }) => (
              <div key={titre} className="p-6 rounded-xl border-l-4" style={{ background: '#2c2c2e', borderLeftColor: '#C0392B' }}>
                <Icon size={28} className="mb-4" style={{ color: '#C0392B' }} />
                <h3 className="font-bold text-white text-base mb-2">{titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL avec image de fond ===== */}
      <section className="relative py-20 px-6 text-center text-white overflow-hidden"
        style={{
          backgroundImage: 'url("/img-epi2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="absolute inset-0" style={{ background: 'rgba(192,57,43,0.88)' }} />
        <div className="relative z-10">
          <h2 className="font-display text-4xl font-extrabold mb-3">Besoin d'un équipement ou d'un devis ?</h2>
          <p className="text-red-200 mb-8 max-w-xl mx-auto text-lg">Notre équipe vous répond sous 24h avec une offre personnalisée</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="font-bold px-8 py-4 rounded-lg bg-white text-red-700 hover:bg-gray-100 transition-colors text-base">
              Demander un devis gratuit
            </Link>
            <Link to="/boutique" className="font-bold px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white hover:text-red-700 transition-colors text-base">
              Voir la boutique
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}