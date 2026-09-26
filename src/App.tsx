import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, type ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FAQPage from './pages/FAQPage'
import CoveragePage from './pages/CoveragePage'
import ComplaintBook from './pages/ComplaintBook'
import NotFoundPage from './pages/NotFoundPage'
import Payment from './pages/Payment'
import CorporatePage from './pages/CorporatePage'
import OsiptelPage from './pages/OsiptelPage'
import FloatingActions from './components/FloatingActions'

/** Lleva al inicio al cambiar de página, o a la sección indicada en el hash. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Espera a que la página nueva esté en el DOM antes de buscar la sección.
    const id = decodeURIComponent(hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/empresas" element={<CorporatePage />} />
          <Route path="/libro-de-reclamaciones" element={<ComplaintBook />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cobertura" element={<CoveragePage />} />
          <Route path="/pagos" element={<Payment />} />
          <Route path="/osiptel" element={<OsiptelPage />} />

          {/* Rutas anteriores: se conservan para no romper enlaces guardados */}
          <Route path="/planes" element={<Navigate to={{ pathname: '/', hash: '#planes' }} replace />} />
          <Route path="/contacto" element={<Navigate to={{ pathname: '/', hash: '#contacto' }} replace />} />
          <Route path="/nosotros" element={<Navigate to="/" replace />} />
          <Route path="/terminos" element={<Navigate to="/" replace />} />
          <Route path="/reclamaciones" element={<Navigate to="/libro-de-reclamaciones" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
