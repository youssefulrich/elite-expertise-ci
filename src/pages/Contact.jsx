import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  Send, Phone, Mail, MapPin, Clock, User, Building2,
  MessageSquare, Loader2, AlertCircle, RotateCcw,
} from 'lucide-react'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const produitParam = searchParams.get('produit') || ''

  const initialForm = {
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    message: produitParam ? `Bonjour, je souhaite obtenir un devis pour : ${produitParam}` : '',
  }

  const [form, setForm] = useState(initialForm)
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

  function handleReset() {
    setForm(initialForm)
    setSuccess(false)
    setError(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">

      {/* Animations locales à la page */}
      <style>{`
        @keyframes contactFadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes contactFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes contactShake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        @keyframes contactDrawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes contactDrawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes contactRingPulse {
          0%   { transform: scale(0.85); opacity: 0.5; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { opacity: 0; }
        }
        .anim-fade-in-up { animation: contactFadeInUp 0.6s ease both; }
        .anim-fade-in { animation: contactFadeIn 0.5s ease both; }
        .anim-shake { animation: contactShake 0.45s ease; }
        .check-circle {
          stroke-dasharray: 252;
          stroke-dashoffset: 252;
          animation: contactDrawCircle 0.7s ease forwards;
        }
        .check-mark {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: contactDrawCheck 0.4s ease forwards 0.6s;
        }
        .check-ring {
          animation: contactRingPulse 1.6s ease-out 0.7s;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-fade-in-up, .anim-fade-in, .anim-shake, .check-circle, .check-mark, .check-ring {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <div className="text-center mb-12 anim-fade-in-up">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-400 mb-3">
          <Clock size={14} /> Réponse sous 24h
        </span>
        <h1 className="font-display text-4xl font-bold text-primary-900 mb-3">Demander un devis</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Remplissez le formulaire ci-dessous et notre équipe vous recontacte sous 24h avec une offre personnalisée.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Infos contact */}
        <div className="space-y-6">
          <div
            className="bg-dark-900 text-white rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 anim-fade-in-up"
            style={{ animationDelay: '80ms' }}
          >
            <h2 className="font-semibold text-lg mb-4">Contactez-nous</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 group">
                <MapPin size={18} className="text-accent-400 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                <span className="text-primary-100">Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone size={18} className="text-accent-400 shrink-0 transition-transform group-hover:scale-110" />
                <a href="tel:+2250000000000" className="text-primary-100 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all hover:after:w-full">
                  +225 00 00 00 00 00
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail size={18} className="text-accent-400 shrink-0 transition-transform group-hover:scale-110" />
                <a href="mailto:contact@eliteexpertiseci.com" className="text-primary-100 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all hover:after:w-full">
                  contact@eliteexpertiseci.com
                </a>
              </div>
            </div>
          </div>

          <div
            className="bg-accent-400 text-white rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 anim-fade-in-up"
            style={{ animationDelay: '160ms' }}
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Clock size={16} /> Horaires d'ouverture</h3>
            <p className="text-sm opacity-90">Lun – Ven : 08h00 – 17h30</p>
            <p className="text-sm opacity-90">Samedi : 08h00 – 13h00</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="md:col-span-2">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 anim-fade-in">
              <div className="relative mb-4 w-20 h-20 flex items-center justify-center">
                <span className="check-ring absolute inset-0 rounded-full border-2 border-green-400" />
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle
                    className="check-circle"
                    cx="40" cy="40" r="36"
                    stroke="#22c55e" strokeWidth="4" strokeLinecap="round"
                  />
                  <path
                    className="check-mark"
                    d="M24 41 L35 52 L57 28"
                    stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-primary-900 mb-2">Demande envoyée !</h2>
              <p className="text-gray-500 mb-6">Notre équipe vous recontacte très rapidement.</p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-900 transition-colors"
              >
                <RotateCcw size={15} /> Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="anim-fade-in-up" style={{ animationDelay: '60ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <div className="relative group">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-500" />
                    <input
                      type="text"
                      name="nom"
                      required
                      value={form.nom}
                      onChange={handleChange}
                      className="w-full pl-10 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                      placeholder="Jean Kouassi"
                    />
                  </div>
                </div>
                <div className="anim-fade-in-up" style={{ animationDelay: '110ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <div className="relative group">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-500" />
                    <input
                      type="text"
                      name="entreprise"
                      value={form.entreprise}
                      onChange={handleChange}
                      className="w-full pl-10 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                      placeholder="Nom de votre société"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="anim-fade-in-up" style={{ animationDelay: '160ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                      placeholder="jean@entreprise.ci"
                    />
                  </div>
                </div>
                <div className="anim-fade-in-up" style={{ animationDelay: '210ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <div className="relative group">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-500" />
                    <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      className="w-full pl-10 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                      placeholder="+225 00 00 00 00 00"
                    />
                  </div>
                </div>
              </div>

              <div className="anim-fade-in-up" style={{ animationDelay: '260ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <div className="relative group">
                  <MessageSquare size={16} className="absolute left-3.5 top-3 text-gray-400 transition-colors group-focus-within:text-primary-500" />
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full pl-10 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-shadow"
                    placeholder="Décrivez vos besoins en équipements..."
                  />
                </div>
              </div>

              {error && (
                <p className="anim-shake flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                  <AlertCircle size={16} className="shrink-0" /> {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 transition-transform hover:scale-[1.01] active:scale-[0.99] anim-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                {loading
                  ? (<><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>)
                  : (<><Send size={18} /> Envoyer ma demande</>)
                }
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}