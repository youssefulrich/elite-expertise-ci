import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, Tag, X, ZoomIn } from 'lucide-react'

const categories = ['Tous', 'Installation', 'Maintenance', 'Formation', 'Plan d\'évacuation', 'Signalisation sécurité']

const realisations = [
  {
    id: 1,
    titre: 'Plan d\'évacuation — Site tertiaire',
    categorie: 'Plan d\'évacuation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: 'Abidjan, Côte d\'Ivoire',
    description: 'Conception et installation d\'un plan d\'évacuation complet avec consignes de sécurité, zones de rassemblement et contacts d\'urgence (Sapeurs Pompiers, SAMU).',
    images: ['/real-issue-secours-2.jpg', '/real-detecteur.jpg'],
    tags: ['Plan évacuation', 'Sécurité incendie', 'Signalétique'],
  },
  {
    id: 2,
    titre: 'Installation extincteurs — Immeuble de bureaux',
    categorie: 'Installation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: 'Abidjan, Côte d\'Ivoire',
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
    lieu: 'Abidjan, Côte d\'Ivoire',
    description: 'Pose et mise en service de blocs de balisage lumineux pour issues de secours. Conformité aux normes incendie en vigueur.',
    images: ['/real-extincteur-7.jpg','/real-plan-evac-1.jpg'],
    tags: ['Issues de secours', 'Balisage', 'Conformité'],
  },
  {
    id: 4,
    titre: 'Installation détecteur de fumée',
    categorie: 'Installation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: 'Abidjan, Côte d\'Ivoire',
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
    lieu: 'Abidjan, Côte d\'Ivoire',
    description: 'Opération complète de maintenance : collecte des extincteurs, démontage, vérification des pièces, remplacement de la cartouche CO₂, recharge, remontage et pesée de contrôle. 5 extincteurs traités en une intervention.',
    images: ['/maint-exterieurs.jpg', '/maint-pesee-1.jpg', '/maint-demontage.jpg', '/maint-recharge-1.jpg', '/maint-outils.jpg', '/maint-remontage.jpg', '/maint-recharge-2.jpg', '/maint-pesee-2.jpg'],
    tags: ['Maintenance', 'Recharge', 'Extincteurs', 'Pesée'],
  },
  {
    id: 7,
    titre: 'Formation sécurité incendie — Entreprise privée',
    categorie: 'Formation',
    client: 'Client confidentiel',
    date: '2025',
    lieu: 'Abidjan, Côte d\'Ivoire',
    description: 'Session de formation théorique et pratique à la sécurité incendie. Présentation des consignes, types d\'extincteurs, classes de feux et gestes à adopter en cas d\'incendie. Formation dispensée en salle avec support visuel et démonstration sur extincteurs réels.',
    images: ['/formation-2.jpg', '/formation-1.jpg'],
    tags: ['Formation', 'Incendie', 'Extincteurs', 'Sensibilisation'],
  },

]

const toutesPhotos = [
  { url: '/real-plan-evac-1.jpg', caption: 'Plan d\'évacuation — Site tertiaire' },
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

export default function Realisations() {
  const [filtre, setFiltre] = useState('Tous')
  const [selected, setSelected] = useState(null)
  const [photoZoom, setPhotoZoom] = useState(null)
  const [activeImg, setActiveImg] = useState(0)

  const filtrees = filtre === 'Tous'
    ? realisations
    : realisations.filter(r => r.categorie === filtre)

  function openRealisation(r) {
    setSelected(r)
    setActiveImg(0)
  }

  return (
    <div>

      {/* ===== HERO ===== */}
      <section className="relative py-20 px-6 text-white overflow-hidden" style={{ background: '#1C1C1E' }}>
        <img src="/real-extincteur-6.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,28,30,0.7), rgba(28,28,30,0.95))' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(192,57,43,0.3)', color: '#e87060' }}>
            Portfolio terrain
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
            Nos <span style={{ color: '#C0392B' }}>Réalisations</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Découvrez nos interventions réelles — extincteurs, plans d'évacuation, issues de secours et détection installés par nos équipes en Côte d'Ivoire.
          </p>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '50+', label: 'Projets réalisés' },
            { val: '24', label: 'Photos terrain' },
            { val: '5 ans', label: "D'expérience" },
            { val: '100%', label: 'Satisfaction client' },
          ].map(s => (
            <div key={s.label} className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <p className="font-extrabold text-2xl text-white">{s.val}</p>
              <p className="text-gray-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FILTRES ===== */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFiltre(cat)}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap"
              style={{ background: filtre === cat ? '#C0392B' : '#f5f5f5', color: filtre === cat ? '#fff' : '#555' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== RÉALISATIONS ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtrees.map(r => (
              <div key={r.id} onClick={() => openRealisation(r)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all cursor-pointer group">

                <div className="relative h-64 overflow-hidden">
                  <img src={r.images[0]} alt={r.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 30%, transparent)' }} />

                  {r.images.length > 1 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black bg-opacity-60 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      <ZoomIn size={12} /> {r.images.length} photos
                    </div>
                  )}

                  {r.images.length > 1 && (
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {r.images.slice(0, 4).map((img, i) => (
                        <div key={i} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white border-opacity-60">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {r.images.length > 4 && (
                        <div className="w-10 h-10 rounded-lg bg-black bg-opacity-60 border-2 border-white border-opacity-60 flex items-center justify-center text-white text-xs font-bold">
                          +{r.images.length - 4}
                        </div>
                      )}
                    </div>
                  )}

                  <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#C0392B' }}>
                    {r.categorie}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><MapPin size={11} style={{ color: '#C0392B' }} />{r.lieu}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} style={{ color: '#C0392B' }} />{r.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-red-600 transition-colors">{r.titre}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{r.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {r.tags.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">{t}</span>
                      ))}
                    </div>
                    <span className="text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C0392B' }}>
                      Voir photos <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIE COMPLÈTE ===== */}
      <section className="py-16 px-6" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(192,57,43,0.2)', color: '#e87060' }}>
              Galerie
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white">Toutes nos photos terrain</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {toutesPhotos.map((p, i) => (
              <div key={i} onClick={() => setPhotoZoom(p)}
                className="relative rounded-xl overflow-hidden group cursor-pointer"
                style={{ height: '180px' }}>
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <p className="text-white text-xs font-medium">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 px-6 text-center text-white" style={{ background: '#C0392B' }}>
        <h2 className="font-display text-3xl font-extrabold mb-3">Votre projet, notre expertise</h2>
        <p className="text-red-200 mb-8 max-w-xl mx-auto">
          Besoin d'une installation, maintenance ou audit ? Contactez-nous pour une intervention rapide.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-lg bg-white text-red-700 hover:bg-gray-100 transition-colors">
          Demander un devis <ArrowRight size={16} />
        </Link>
      </section>

      {/* ===== MODAL RÉALISATION ===== */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

            <div className="relative h-72">
              <img src={selected.images[activeImg]} alt={selected.titre} className="w-full h-full object-cover" />
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white hover:bg-opacity-90">
                <X size={16} />
              </button>
              <span className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#C0392B' }}>
                {selected.categorie}
              </span>
              {selected.images.length > 1 && (
                <span className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                  {activeImg + 1} / {selected.images.length}
                </span>
              )}
            </div>

            {selected.images.length > 1 && (
              <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
                {selected.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all"
                    style={{ borderColor: activeImg === i ? '#C0392B' : 'transparent' }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6">
              <h2 className="font-display text-xl font-extrabold text-gray-900 mb-3">{selected.titre}</h2>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><Tag size={13} style={{ color: '#C0392B' }} />{selected.client}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} style={{ color: '#C0392B' }} />{selected.lieu}</span>
                <span className="flex items-center gap-1.5"><Calendar size={13} style={{ color: '#C0392B' }} />{selected.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-5">{selected.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tags.map(t => (
                  <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ borderColor: '#C0392B', color: '#C0392B' }}>{t}</span>
                ))}
              </div>
              <Link to="/contact" onClick={() => setSelected(null)}
                className="flex items-center justify-center gap-2 w-full font-bold py-3 rounded-xl text-white"
                style={{ background: '#C0392B' }}>
                Demander un projet similaire <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== ZOOM PHOTO ===== */}
      {photoZoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.92)' }} onClick={() => setPhotoZoom(null)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPhotoZoom(null)}
              className="absolute -top-10 right-0 text-white text-sm flex items-center gap-1 hover:text-red-400">
              <X size={18} /> Fermer
            </button>
            <img src={photoZoom.url} alt={photoZoom.caption} className="w-full rounded-2xl shadow-2xl" />
            <p className="text-gray-400 text-sm text-center mt-3">{photoZoom.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}