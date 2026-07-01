import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  ArrowLeft, Phone, FileText, CheckCircle2, XCircle,
  Tag, Award, PackageSearch, ZoomIn, ChevronRight,
  ShieldCheck, Truck, Headphones,
} from 'lucide-react'

const garanties = [
  { icon: ShieldCheck, label: 'Produits certifiés' },
  { icon: Truck,       label: 'Livraison Abidjan' },
  { icon: Headphones,  label: 'SAV inclus' },
]

export default function Produit() {
  const { slug } = useParams()
  const [produit, setProduit]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [zoomed, setZoomed]     = useState(false)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    async function fetchProduit() {
      const { data } = await supabase
        .from('produits')
        .select('*, marques(nom, logo_url), categories(nom, slug)')
        .eq('slug', slug)
        .single()
      setProduit(data)
      setLoading(false)
      setTimeout(() => setVisible(true), 60)
    }
    fetchProduit()
  }, [slug])

  /* ── Skeleton ── */
  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <style>{`
        @keyframes prodShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .prod-shimmer {
          background: linear-gradient(90deg, #eee 25%, #f6f6f6 50%, #eee 75%);
          background-size: 200% 100%;
          animation: prodShimmer 1.4s infinite;
          border-radius: 12px;
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="prod-shimmer h-80" />
        <div className="space-y-4 pt-2">
          <div className="prod-shimmer h-5 w-24" />
          <div className="prod-shimmer h-8 w-3/4" />
          <div className="prod-shimmer h-4 w-full" />
          <div className="prod-shimmer h-4 w-5/6" />
          <div className="prod-shimmer h-4 w-2/3" />
          <div className="flex gap-3 pt-4">
            <div className="prod-shimmer h-12 w-40" />
            <div className="prod-shimmer h-12 w-40" />
          </div>
        </div>
      </div>
    </div>
  )

  /* ── 404 ── */
  if (!produit) return (
    <div className="max-w-5xl mx-auto px-4 py-24 text-center">
      <PackageSearch size={56} strokeWidth={1.4} className="mx-auto mb-4 text-gray-300" />
      <h2 className="font-display text-xl font-bold text-gray-700 mb-2">Produit introuvable</h2>
      <p className="text-gray-400 text-sm mb-6">Ce produit n'existe pas ou a été retiré du catalogue.</p>
      <Link to="/boutique"
        className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl text-white transition-transform hover:scale-105"
        style={{ background: '#C0392B' }}>
        <ArrowLeft size={15} /> Retour à la boutique
      </Link>
    </div>
  )

  return (
    <div style={{ overflowX: 'hidden' }}>
      <style>{`
        @keyframes prodFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes prodScaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        .prod-anim-left {
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .prod-anim-right {
          opacity: 0; transform: translateX(24px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .prod-visible .prod-anim-left,
        .prod-visible .prod-anim-right { opacity: 1; transform: translateX(0); }
        .prod-badge { animation: prodScaleIn 0.35s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .prod-anim-left, .prod-anim-right { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-10 ${visible ? 'prod-visible' : ''}`}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8 prod-anim-left flex-wrap">
          <Link to="/boutique" className="hover:text-red-600 transition-colors flex items-center gap-1 font-medium">
            <ArrowLeft size={13} /> Boutique
          </Link>
          {produit.categories && (
            <>
              <ChevronRight size={12} className="text-gray-300" />
              <Link to={`/boutique?cat=${produit.categories.slug}`} className="hover:text-red-600 transition-colors font-medium">
                {produit.categories.nom}
              </Link>
            </>
          )}
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-600 font-semibold truncate max-w-[200px]">{produit.nom}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ── Visuel ── */}
          <div className="prod-anim-left">
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center cursor-zoom-in group"
              style={{ background: '#f8f8f8', minHeight: '320px' }}
              onClick={() => setZoomed(true)}
            >
              <img
                src={produit.image_url || '/placeholder-produit.png'}
                alt={produit.nom}
                className="max-h-72 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-semibold text-white px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(0,0,0,0.55)' }}>
                <ZoomIn size={13} /> Agrandir
              </div>
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#C0392B' }} />
            </div>

            {/* Garanties */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {garanties.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl border border-gray-100 bg-white hover:border-red-200 hover:shadow-sm transition-all">
                  <Icon size={16} style={{ color: '#C0392B' }} />
                  <span className="text-xs text-gray-500 font-medium leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Infos ── */}
          <div className="prod-anim-right">

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {produit.marques && (
                <span className="prod-badge inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                  style={{ background: '#C0392B' }}>
                  <Award size={12} /> {produit.marques.nom}
                </span>
              )}
              {produit.categories && (
                <span className="prod-badge inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">
                  <Tag size={11} /> {produit.categories.nom}
                </span>
              )}
              {produit.statut === 'en_stock' && (
                <span className="prod-badge inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200">
                  <CheckCircle2 size={12} /> En stock
                </span>
              )}
              {produit.statut === 'rupture' && (
                <span className="prod-badge inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 border border-gray-200">
                  <XCircle size={12} /> Rupture de stock
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
              {produit.nom}
            </h1>

            {/* Séparateur rouge */}
            <div className="w-12 h-1 rounded-full mb-5" style={{ background: '#C0392B' }} />

            {produit.description && (
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">{produit.description}</p>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/contact?produit=${encodeURIComponent(produit.nom)}`}
                className="flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-white text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-900/30"
                style={{ background: 'linear-gradient(135deg, #C0392B, #922B21)' }}
              >
                <FileText size={17} /> Demander un devis
              </Link>
              <a
                href="tel:+2250000000000"
                className="flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-sm border-2 transition-all hover:scale-105"
                style={{ borderColor: '#C0392B', color: '#C0392B' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#C0392B'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C0392B' }}
              >
                <Phone size={17} /> Appeler maintenant
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-green-500" />
              Réponse sous 24h — devis gratuit et sans engagement
            </p>
          </div>
        </div>
      </div>

      {/* ── Lightbox zoom ── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)', animation: 'prodFadeIn 0.2s ease' }}
          onClick={() => setZoomed(false)}
        >
          <img
            src={produit.image_url || '/placeholder-produit.png'}
            alt={produit.nom}
            className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
            style={{ animation: 'prodScaleIn 0.25s ease' }}
          />
          <button
            className="absolute top-5 right-5 text-white font-bold text-2xl w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onClick={() => setZoomed(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* ── CTA sticky mobile ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 flex gap-3"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #eee' }}>
        <Link
          to={`/contact?produit=${encodeURIComponent(produit.nom)}`}
          className="flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-white text-sm"
          style={{ background: '#C0392B' }}
        >
          <FileText size={16} /> Devis gratuit
        </Link>
        <a
          href="tel:+2250000000000"
          className="flex items-center justify-center px-5 py-3 rounded-xl border-2 transition-colors"
          style={{ borderColor: '#C0392B', color: '#C0392B' }}
        >
          <Phone size={16} />
        </a>
      </div>

      <div className="md:hidden h-24" />
    </div>
  )
}