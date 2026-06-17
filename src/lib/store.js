import { create } from 'zustand'

export const useStore = create((set) => ({
  // Produits
  produits: [],
  categories: [],
  marques: [],
  loading: false,
  error: null,

  setProduits: (produits) => set({ produits }),
  setCategories: (categories) => set({ categories }),
  setMarques: (marques) => set({ marques }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Filtres boutique
  filtres: {
    categorie: null,
    marque: null,
    statut: null,
    recherche: '',
  },
  setFiltres: (filtres) => set((state) => ({
    filtres: { ...state.filtres, ...filtres }
  })),
  resetFiltres: () => set({
    filtres: { categorie: null, marque: null, statut: null, recherche: '' }
  }),
}))
