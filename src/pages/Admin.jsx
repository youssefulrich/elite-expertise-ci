import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { LogIn, LogOut, Plus, Trash2, Package, Mail, X, Upload, Edit, Image as ImageIcon } from 'lucide-react'

const STATUTS = ['en_stock', 'en_vente', 'rupture']

// Nom du bucket Supabase Storage utilisé pour les images produits.
// Le bucket doit exister et être configuré en "public".
const BUCKET = 'produits'

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const [activeTab, setActiveTab] = useState('produits')
  const [produits, setProduits] = useState([])
  const [devis, setDevis] = useState([])
  const [categories, setCategories] = useState([])
  const [marques, setMarques] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editProduit, setEditProduit] = useState(null)
  const [saving, setSaving] = useState(false)

  // --- Galerie d'images ---
  const [showGallery, setShowGallery] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])
  const [loadingGallery, setLoadingGallery] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const emptyForm = { nom: '', slug: '', description: '', prix: '', image_url: '', marque_id: '', categorie_id: '', statut: 'en_stock', est_vedette: false }
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    supabase.auth.onAuthStateChange((_e, session) => setSession(session))
  }, [])

  useEffect(() => {
    if (session) { fetchAll() }
  }, [session])

  async function fetchAll() {
    fetchProduits()
    fetchDevis()
    const { data: cats } = await supabase.from('categories').select('*').order('nom')
    const { data: mrqs } = await supabase.from('marques').select('*').order('nom')
    setCategories(cats || [])
    setMarques(mrqs || [])
  }

  async function fetchProduits() {
    const { data } = await supabase.from('produits').select('*, marques(nom), categories(nom)').order('created_at', { ascending: false })
    setProduits(data || [])
  }

  async function fetchDevis() {
    const { data } = await supabase.from('devis').select('*').order('created_at', { ascending: false })
    setDevis(data || [])
  }

  async function login(e) {
    e.preventDefault()
    setLoginError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError("Identifiants incorrects")
  }

  function openAjouter() {
    setEditProduit(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  function openEditer(p) {
    setEditProduit(p)
    setForm({
      nom: p.nom || '',
      slug: p.slug || '',
      description: p.description || '',
      prix: p.prix || '',
      image_url: p.image_url || '',
      marque_id: p.marque_id || '',
      categorie_id: p.categorie_id || '',
      statut: p.statut || 'en_stock',
      est_vedette: p.est_vedette || false,
    })
    setShowModal(true)
  }

  function handleFormChange(e) {
    const { name, value, type, checked } = e.target
    if (name === 'nom' && !editProduit) {
      const slug = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setForm(f => ({ ...f, nom: value, slug }))
    } else {
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }
  }

  async function saveProduit(e) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      nom: form.nom,
      slug: form.slug,
      description: form.description,
      prix: form.prix ? parseFloat(form.prix) : null,
      image_url: form.image_url,
      marque_id: form.marque_id || null,
      categorie_id: form.categorie_id || null,
      statut: form.statut,
      est_vedette: form.est_vedette,
      updated_at: new Date().toISOString(),
    }
    if (editProduit) {
      await supabase.from('produits').update(payload).eq('id', editProduit.id)
    } else {
      await supabase.from('produits').insert([payload])
    }
    setSaving(false)
    setShowModal(false)
    fetchProduits()
  }

  async function deleteProduit(id) {
    if (!confirm('Supprimer ce produit ?')) return
    await supabase.from('produits').delete().eq('id', id)
    fetchProduits()
  }

  async function marquerDevisLu(id) {
    await supabase.from('devis').update({ statut: 'lu' }).eq('id', id)
    fetchDevis()
  }

  // --- Fonctions galerie d'images ---

  async function fetchGalleryImages() {
    setLoadingGallery(true)
    const { data, error } = await supabase.storage.from(BUCKET).list('', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    })
    if (!error && data) {
      const images = data
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => ({
          name: f.name,
          url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
        }))
      setGalleryImages(images)
    }
    setLoadingGallery(false)
  }

  function openGallery() {
    setShowGallery(true)
    fetchGalleryImages()
  }

  function selectGalleryImage(url) {
    setForm(f => ({ ...f, image_url: url }))
    setShowGallery(false)
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file)
    if (error) {
      alert("Erreur lors de l'upload : " + error.message)
    } else {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
      setForm(f => ({ ...f, image_url: data.publicUrl }))
      fetchGalleryImages()
    }
    setUploading(false)
    e.target.value = ''
  }

  async function deleteGalleryImage(name, url) {
    if (!confirm('Supprimer cette image de la galerie ?')) return
    await supabase.storage.from(BUCKET).remove([name])
    if (form.image_url === url) {
      setForm(f => ({ ...f, image_url: '' }))
    }
    fetchGalleryImages()
  }

  if (!session) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#C0392B' }}>
            <Package size={20} color="#fff" />
          </div>
          <h1 className="font-bold text-gray-900 text-xl">Administration</h1>
        </div>
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400" required />
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <button type="submit" className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 rounded-lg transition-colors"
            style={{ background: '#C0392B' }}>
            <LogIn size={18} /> Se connecter
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="text-white px-6 py-4 flex items-center justify-between" style={{ background: '#1C1C1E' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#C0392B' }}>
            <Package size={16} color="#fff" />
          </div>
          <h1 className="font-bold text-lg">Admin — Elite Expertise CI</h1>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
          <LogOut size={16} /> Déconnexion
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Produits', val: produits.length, color: '#C0392B' },
            { label: 'Devis nouveaux', val: devis.filter(d => d.statut === 'nouveau').length, color: '#f97316' },
            { label: 'Total devis', val: devis.length, color: '#1C1C1E' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">{s.label}</p>
              <p className="text-3xl font-extrabold" style={{ color: s.color }}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {[
            { key: 'produits', label: 'Produits', icon: Package },
            { key: 'devis', label: `Devis (${devis.filter(d => d.statut === 'nouveau').length} nouveaux)`, icon: Mail },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === key ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* TAB PRODUITS */}
        {activeTab === 'produits' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">{produits.length} produit{produits.length > 1 ? 's' : ''}</p>
              <button onClick={openAjouter}
                className="flex items-center gap-2 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors"
                style={{ background: '#C0392B' }}
                onMouseEnter={e => e.currentTarget.style.background = '#922B21'}
                onMouseLeave={e => e.currentTarget.style.background = '#C0392B'}>
                <Plus size={16} /> Ajouter un produit
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-4 py-3">Produit</th>
                    <th className="text-left px-4 py-3">Marque</th>
                    <th className="text-left px-4 py-3">Catégorie</th>
                    <th className="text-left px-4 py-3">Prix</th>
                    <th className="text-left px-4 py-3">Statut</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {produits.length === 0 && (
                    <tr><td colSpan={6} className="text-center py-12 text-gray-400">Aucun produit — cliquez sur "Ajouter un produit"</td></tr>
                  )}
                  {produits.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.image_url && <img src={p.image_url} alt="" className="w-10 h-10 object-contain rounded-lg bg-gray-50 border border-gray-100" />}
                          <span className="font-semibold text-gray-800">{p.nom}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.marques?.nom || '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{p.categories?.nom || '—'}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#C0392B' }}>
                        {p.prix ? `${Number(p.prix).toLocaleString('fr-FR')} FCFA` : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.statut === 'en_stock' ? 'bg-green-100 text-green-700' : p.statut === 'rupture' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                          {p.statut.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => openEditer(p)} className="text-gray-400 hover:text-blue-500 transition-colors"><Edit size={15} /></button>
                          <button onClick={() => deleteProduit(p.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB DEVIS */}
        {activeTab === 'devis' && (
          <div className="space-y-4">
            {devis.length === 0 && <p className="text-center py-12 text-gray-400">Aucune demande de devis pour l'instant</p>}
            {devis.map(d => (
              <div key={d.id} className={`bg-white rounded-xl border p-5 ${d.statut === 'nouveau' ? 'shadow-sm' : 'border-gray-100'}`}
                style={{ borderColor: d.statut === 'nouveau' ? '#C0392B' : '' }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800">{d.nom}{d.entreprise && ` — ${d.entreprise}`}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{d.email}{d.telephone && ` · ${d.telephone}`}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {d.statut === 'nouveau' && (
                      <span className="text-xs text-white font-bold px-2.5 py-1 rounded-full" style={{ background: '#C0392B' }}>Nouveau</span>
                    )}
                    <span className="text-xs text-gray-400">{new Date(d.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">{d.message}</p>
                {d.statut === 'nouveau' && (
                  <button onClick={() => marquerDevisLu(d.id)} className="text-xs font-medium mt-2 hover:underline" style={{ color: '#C0392B' }}>
                    Marquer comme lu
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL AJOUT / EDITION */}
      {showModal && (
        <Modal title={editProduit ? 'Modifier le produit' : 'Ajouter un produit'} onClose={() => setShowModal(false)}>
          <form onSubmit={saveProduit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Nom du produit *</label>
                <input name="nom" value={form.nom} onChange={handleFormChange} required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="Ex: Détecteur multigaz MSA ALTAIR 4XR" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Slug (URL)</label>
                <input name="slug" value={form.slug} onChange={handleFormChange} required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 font-mono"
                  placeholder="detecteur-msa-altair-4xr" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Prix (FCFA)</label>
                <input name="prix" type="number" value={form.prix} onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="150000" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Marque</label>
                <select name="marque_id" value={form.marque_id} onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white">
                  <option value="">-- Sélectionner --</option>
                  {marques.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Catégorie</label>
                <select name="categorie_id" value={form.categorie_id} onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white">
                  <option value="">-- Sélectionner --</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Statut</label>
                <select name="statut" value={form.statut} onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white">
                  {STATUTS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>

              {/* --- Image du produit : upload + galerie --- */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Image du produit</label>
                <div className="flex items-start gap-3">
                  {form.image_url ? (
                    <img src={form.image_url} alt="" className="h-20 w-20 object-contain rounded-lg border border-gray-100 bg-gray-50 shrink-0" />
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-gray-300 shrink-0">
                      <ImageIcon size={24} />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={openGallery}
                      className="flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-3 py-2 rounded-lg text-xs hover:bg-gray-50 transition-colors">
                      <ImageIcon size={14} /> Choisir dans la galerie
                    </button>
                    <label className="flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-3 py-2 rounded-lg text-xs hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload size={14} /> {uploading ? 'Envoi...' : 'Uploader une image'}
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                    </label>
                    {form.image_url && (
                      <button type="button" onClick={() => setForm(f => ({ ...f, image_url: '' }))}
                        className="text-xs text-gray-400 hover:text-red-500 text-left">
                        Retirer l'image
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                  placeholder="Description du produit..." />
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <input type="checkbox" id="vedette" name="est_vedette" checked={form.est_vedette} onChange={handleFormChange} className="w-4 h-4 accent-red-600" />
                <label htmlFor="vedette" className="text-sm text-gray-700">Mettre en vedette sur l'accueil</label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button type="submit" disabled={saving}
                className="flex-1 text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
                style={{ background: '#C0392B' }}>
                {saving ? 'Enregistrement...' : editProduit ? 'Modifier' : 'Ajouter le produit'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL GALERIE D'IMAGES */}
      {showGallery && (
        <Modal title="Galerie d'images" onClose={() => setShowGallery(false)}>
          <div className="mb-4">
            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 text-gray-500 font-semibold px-4 py-4 rounded-lg text-sm hover:border-red-300 hover:text-red-500 transition-colors cursor-pointer">
              <Upload size={16} /> {uploading ? 'Envoi en cours...' : 'Uploader une nouvelle image'}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
            </label>
          </div>

          {loadingGallery ? (
            <p className="text-center text-gray-400 py-8 text-sm">Chargement...</p>
          ) : galleryImages.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">Aucune image dans la galerie pour l'instant</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map(img => (
                <div key={img.name} className="relative group">
                  <button type="button" onClick={() => selectGalleryImage(img.url)}
                    className={`w-full aspect-square rounded-lg border-2 overflow-hidden bg-gray-50 transition-colors ${form.image_url === img.url ? 'border-red-500' : 'border-gray-100 hover:border-red-300'}`}>
                    <img src={img.url} alt="" className="w-full h-full object-contain" />
                  </button>
                  <button type="button" onClick={() => deleteGalleryImage(img.name, img.url)}
                    className="absolute top-1 right-1 bg-white/90 text-gray-400 hover:text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}