import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Accueil from './pages/Accueil'
import Boutique from './pages/Boutique'
import Produit from './pages/Produit'
import Contact from './pages/Contact'
import Realisations from './pages/Realisations'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="boutique" element={<Boutique />} />
          <Route path="boutique/:slug" element={<Produit />} />
          <Route path="contact" element={<Contact />} />
          <Route path="realisations" element={<Realisations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Admin hors layout principal */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}