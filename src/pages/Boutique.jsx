import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Search, SlidersHorizontal, X, ArrowRight, Tag } from 'lucide-react'

const bgCategories = {
  'securite-incendie': '/img-incendie.webp',
  'detection-de-gaz':  '/img-epi2.jpg',
  'epi':               '/img-epi.jpg',
  'signalisation':     '/img-signalisation.jpg',
}

export default function Boutique() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [produits, setProduits] = useState([])
  const [categories, setCategories] = useState([])
  const [marques, setMarques] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const categorieFiltree = searchParams.get('cat')
  const marqueFiltree = searchParams.get('marque')
  const recherche = searchParams.get('q') || ''

  const categorieActive = categories.find(c => c.slug === categorieFiltree)
  const heroBg = categorieFiltree && bgCategories[categorieFiltree]
    ? bgCategories[categorieFiltree]
    : '/img-epi.jpg'

  useEffect(() => { fetchCategories(); fetchMarques() }, [])
  useEffect(() => { fetchProduits() }, [categorieFiltree, marqueFiltree, recherche, categories, marques])

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('ordre')
    setCategories(data || [])
  }

  async function fetchMarques() {
    const { data } = await supabase.from('marques').select('*').order('nom')
    setMarques(data || [])
  }

  async function fetchProduits() {
    setLoading(true)
    let query = supabase.from('produits').select('*, marques(nom), categories(nom, slug)')

    if (categorieFiltree) {
      const cat = categories.find(c => c.slug === categorieFiltree)
      if (cat) query = query.eq('categorie_id', cat.id)
    }
    if (marqueFiltree) {
      const marque = marques.find(m => m.nom.toLowerCase() === marqueFiltree.toLowerCase())
      if (marque) query = query.eq('marque_id', marque.id)
    }
    if (recherche) query = query.ilike('nom', `%${recherche}%`)

    const { data } = await query.order('created_at', { ascending: false })
    setProduits(data || [])
    setLoading(false)
  }

  function updateFiltre(key, value) {
    const params = new URLSearchParams(searchParams)
    if (value) params.set(key, value)
    else params.delete(key)
    setSearchParams(params)
  }

  function resetFiltres() {
    setSearchParams({})
  }

  const hasFiltres = categorieFiltree || marqueFiltree || recherche

  return (
    <div>

      {/* ===== HERO BOUTIQUE ===== */}
      <section className="relative h-48 md:h-64 flex items-end overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8 w-full">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">
                {categorieActive ? categorieActive.nom : 'Tous les produits'}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white">
                {categorieActive ? categorieActive.nom : 'Notre Boutique'}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Équipements de sécurité industrielle disponibles en Côte d'Ivoire
              </p>
            </div>
            {!loading && (
              <span className="hidden md:block text-white text-sm font-semibold px-4 py-2 rounded-full" style={{ background: 'rgba(192,57,43,0.7)' }}>
                {produits.length} produit{produits.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== FILTRES CATÉGORIES RAPIDES ===== */}
      <section className="border-b border-gray-100 bg-white sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={resetFiltres}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all"
            style={{
              background: !categorieFiltree ? '#C0392B' : '#f5f5f5',
              color: !categorieFiltree ? '#fff' : '#555',
            }}
          >
            Tous
          </button>
          {categories.filter(c => !c.parent_id).map(cat => (
            <button
              key={cat.id}
              onClick={() => updateFiltre('cat', cat.slug)}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap"
              style={{
                background: categorieFiltree === cat.slug ? '#C0392B' : '#f5f5f5',
                color: categorieFiltree === cat.slug ? '#fff' : '#555',
              }}
            >
              {cat.nom}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Barre recherche + filtre mobile */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 text-sm"
              style={{ '--tw-ring-color': '#C0392B' }}
              value={recherche}
              onChange={e => updateFiltre('q', e.target.value)}
            />
            {recherche && (
              <button onClick={() => updateFiltre('q', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={15} />
              </button>
            )}
          </div>
          <button
            className="md:hidden flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <SlidersHorizontal size={16} /> Filtres
          </button>
        </div>

        {/* Filtres actifs */}
        {hasFiltres && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs text-gray-500 font-medium">Filtres actifs :</span>
            {categorieFiltree && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: '#C0392B' }}>
                {categorieActive?.nom || categorieFiltree}
                <button onClick={() => updateFiltre('cat', null)}><X size={11} /></button>
              </span>
            )}
            {marqueFiltree && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: '#1C1C1E' }}>
                {marqueFiltree}
                <button onClick={() => updateFiltre('marque', null)}><X size={11} /></button>
              </span>
            )}
            {recherche && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-200 text-gray-700">
                "{recherche}"
                <button onClick={() => updateFiltre('q', '')}><X size={11} /></button>
              </span>
            )}
            <button onClick={resetFiltres} className="text-xs text-red-500 hover:underline font-medium ml-1">
              Tout effacer
            </button>
          </div>
        )}

        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-56 shrink-0`}>

            {/* Catégories */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase tracking-widest" style={{ color: '#C0392B' }}>Catégories</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    className={`text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${!categorieFiltree ? 'font-bold text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                    style={!categorieFiltree ? { background: '#C0392B' } : {}}
                    onClick={() => updateFiltre('cat', null)}
                  >
                    Toutes les catégories
                  </button>
                </li>
                {categories.filter(c => !c.parent_id).map(cat => (
                  <li key={cat.id}>
                    <button
                      className={`text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${categorieFiltree === cat.slug ? 'font-bold text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                      style={categorieFiltree === cat.slug ? { background: '#C0392B' } : {}}
                      onClick={() => updateFiltre('cat', cat.slug)}
                    >
                      {cat.nom}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Marques */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase tracking-widest" style={{ color: '#C0392B' }}>Marques</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    className={`text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${!marqueFiltree ? 'font-bold text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                    style={!marqueFiltree ? { background: '#C0392B' } : {}}
                    onClick={() => updateFiltre('marque', null)}
                  >
                    Toutes les marques
                  </button>
                </li>
                {marques.map(m => (
                  <li key={m.id}>
                    <button
                      className={`text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${marqueFiltree === m.nom ? 'font-bold text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                      style={marqueFiltree === m.nom ? { background: '#C0392B' } : {}}
                      onClick={() => updateFiltre('marque', m.nom)}
                    >
                      {m.nom}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA sidebar */}
            <div className="mt-8 rounded-xl p-4 text-white text-center" style={{ background: '#1C1C1E' }}>
              <p className="text-xs font-bold mb-1">Besoin d'un conseil ?</p>
              <p className="text-gray-400 text-xs mb-3">Notre équipe vous aide à choisir</p>
              <Link to="/contact" className="inline-block text-xs font-bold px-4 py-2 rounded-lg text-white transition-colors" style={{ background: '#C0392B' }}>
                Nous contacter
              </Link>
            </div>
          </aside>

          {/* Grille produits */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
                ))}
              </div>
            ) : produits.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg font-bold text-gray-700 mb-1">Aucun produit trouvé</p>
                <p className="text-sm text-gray-400 mb-6">Essayez de modifier vos filtres ou votre recherche</p>
                <button onClick={resetFiltres} className="text-white font-bold px-6 py-3 rounded-lg text-sm" style={{ background: '#C0392B' }}>
                  Voir tous les produits
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {produits.map(p => (
                  <Link
                    key={p.id}
                    to={`/boutique/${p.slug}`}
                    className="bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all group overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative bg-gray-50 h-44 flex items-center justify-center p-4 overflow-hidden">
                      <img
                        src={p.image_url || 'https://via.placeholder.com/300x200?text=Produit'}
                        alt={p.nom}
                        className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={e => { e.target.src = 'https://via.placeholder.com/300x200?text=Produit' }}
                      />
                      {p.marques && (
                        <span className="absolute top-2 left-2 text-white text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: '#C0392B' }}>
                          {p.marques.nom}
                        </span>
                      )}
                      {p.statut === 'en_stock' && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          En stock
                        </span>
                      )}
                      {p.statut === 'rupture' && (
                        <span className="absolute top-2 right-2 bg-gray-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          Rupture
                        </span>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="p-4 flex flex-col flex-1">
                      {p.categories && (
                        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#C0392B' }}>
                          {p.categories.nom}
                        </p>
                      )}
                      <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors line-clamp-2 flex-1 mb-3">
                        {p.nom}
                      </h3>
                      <div className="flex items-center justify-between mt-auto">
                        {p.prix
                          ? <p className="font-extrabold text-sm" style={{ color: '#C0392B' }}>{Number(p.prix).toLocaleString('fr-FR')} <span className="text-xs font-normal text-gray-400">FCFA</span></p>
                          : <p className="text-xs text-gray-400 italic">Prix sur devis</p>
                        }
                        <span className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white" style={{ background: '#C0392B' }}>
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== CTA BAS DE PAGE ===== */}
      <section className="py-12 px-6 mt-8" style={{ background: '#1C1C1E' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-extrabold text-white mb-1">Vous ne trouvez pas ce que vous cherchez ?</h3>
            <p className="text-gray-400 text-sm">Contactez-nous, nous pouvons sourcer n'importe quel équipement de sécurité.</p>
          </div>
          <Link to="/contact" className="shrink-0 flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-white transition-colors" style={{ background: '#C0392B' }}>
            Demander un devis <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}