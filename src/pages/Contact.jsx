import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Send, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const produitParam = searchParams.get('produit') || ''

  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    message: produitParam ? `Bonjour, je souhaite obtenir un devis pour : ${produitParam}` : '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('devis').insert([{
      nom: form.nom,
      email: form.email,
      telephone: form.telephone,
      entreprise: form.entreprise,
      message: form.message,
    }])

    if (error) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-primary-900 mb-3">Demander un devis</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Remplissez le formulaire ci-dessous et notre équipe vous recontacte sous 24h avec une offre personnalisée.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Infos contact */}
        <div className="space-y-6">
          <div className="bg-dark-900 text-white rounded-2xl p-6">
            <h2 className="font-semibold text-lg mb-4">Contactez-nous</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-400 shrink-0 mt-0.5" />
                <span className="text-primary-100">Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent-400 shrink-0" />
                <a href="tel:+2250000000000" className="text-primary-100 hover:text-white">
                  +225 00 00 00 00 00
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent-400 shrink-0" />
                <a href="mailto:contact@eliteexpertiseci.com" className="text-primary-100 hover:text-white">
                  contact@eliteexpertiseci.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-accent-400 text-white rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Horaires d'ouverture</h3>
            <p className="text-sm opacity-90">Lun – Ven : 08h00 – 17h30</p>
            <p className="text-sm opacity-90">Samedi : 08h00 – 13h00</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="md:col-span-2">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h2 className="font-display text-2xl font-bold text-primary-900 mb-2">Demande envoyée !</h2>
              <p className="text-gray-500">Notre équipe vous recontacte très rapidement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input
                    type="text"
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Jean Kouassi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input
                    type="text"
                    name="entreprise"
                    value={form.entreprise}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Nom de votre société"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="jean@entreprise.ci"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+225 00 00 00 00 00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Décrivez vos besoins en équipements..."
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Envoi en cours...' : (<><Send size={18} /> Envoyer ma demande</>)}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
