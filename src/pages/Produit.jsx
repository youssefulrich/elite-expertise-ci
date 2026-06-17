import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ArrowLeft, Phone, FileText, CheckCircle } from 'lucide-react'

export default function Produit() {
  const { slug } = useParams()
  const [produit, setProduit] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('produits')
        .select('*, marques(nom, logo_url), categories(nom, slug)')
        .eq('slug', slug)
        .single()
      setProduit(data)
      setLoading(false)
    }
    fetch()
  }, [slug])

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        <div className="bg-gray-100 rounded-xl h-80" />
        <div className="space-y-4">
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-10 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>
      </div>
    </div>
  )

  if (!produit) return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <p className="text-gray-500">Produit introuvable</p>
      <Link to="/boutique" className="text-primary-500 hover:underline mt-4 inline-block">
        ← Retour à la boutique
      </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/boutique" className="hover:text-primary-500 flex items-center gap-1">
          <ArrowLeft size={14} /> Boutique
        </Link>
        {produit.categories && (
          <>
            <span>/</span>
            <Link to={`/boutique?cat=${produit.categories.slug}`} className="hover:text-primary-500">
              {produit.categories.nom}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-800">{produit.nom}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
          <img
            src={produit.image_url || '/placeholder-produit.png'}
            alt={produit.nom}
            className="max-h-72 object-contain"
          />
        </div>

        {/* Infos */}
        <div>
          {produit.marques && (
            <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded mb-3">
              {produit.marques.nom}
            </span>
          )}
          {produit.categories && (
            <p className="text-primary-500 text-sm uppercase tracking-wide mb-2">{produit.categories.nom}</p>
          )}
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            {produit.nom}
          </h1>

          {produit.statut === 'en_stock' && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-4">
              <CheckCircle size={16} /> En stock
            </div>
          )}

          {produit.prix && (
            <p className="text-3xl font-bold text-accent-400 mb-6">
              {produit.prix.toLocaleString('fr-FR')} <span className="text-base font-normal text-gray-500">FCFA</span>
            </p>
          )}

          {produit.description && (
            <p className="text-gray-600 leading-relaxed mb-8">{produit.description}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/contact?produit=${encodeURIComponent(produit.nom)}`}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <FileText size={18} /> Demander un devis
            </Link>
            <a
              href="tel:+2250000000000"
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Appeler maintenant
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
