import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FAQPage from './pages/FAQPage'
import ComplaintBook from './pages/ComplaintBook'
import NotFoundPage from './pages/NotFoundPage'
import Payment from './pages/Payment'
import CorporatePage from './pages/CorporatePage'
import FloatingActions from './components/FloatingActions'

// El mapa (Leaflet) solo se descarga al abrir la vista de cobertura.
const CoveragePage = lazy(() => import('./pages/CoveragePage'))
// El panel de administración vive aparte del sitio público y solo se descarga al entrar.
const AdminApp = lazy(() => import('./admin/AdminApp'))

/**
 * Lleva al inicio al navegar, o a la sección indicada en el hash.
 * Depende de `key` (única por navegación) y no solo de la URL: así el logo,
 * "Inicio" o "Planes" también funcionan cuando ya estás en esa misma URL pero
 * bajaste con la rueda del mouse.
 */
function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
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
  }, [pathname, hash, key])
  return null
}

function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <>
      <Navbar />
      <main key={pathname} className="entrada-vista">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  )
}

function SitioPublico() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/empresas" element={<CorporatePage />} />
        <Route path="/libro-de-reclamaciones" element={<ComplaintBook />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/cobertura"
          element={
            <Suspense fallback={<div className="min-h-screen bg-vivoo-cloud" />}>
              <CoveragePage />
            </Suspense>
          }
        />
        <Route path="/pagos" element={<Payment />} />

        {/* Rutas anteriores: se conservan para no romper enlaces guardados */}
        <Route path="/planes" element={<Navigate to={{ pathname: '/', hash: '#planes' }} replace />} />
        <Route path="/contacto" element={<Navigate to={{ pathname: '/', hash: '#contacto' }} replace />} />
        <Route path="/nosotros" element={<Navigate to="/" replace />} />
        <Route path="/terminos" element={<Navigate to="/" replace />} />
        <Route path="/osiptel" element={<Navigate to="/" replace />} />
        <Route path="/reclamaciones" element={<Navigate to="/libro-de-reclamaciones" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen bg-vivoo-cloud" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<SitioPublico />} />
      </Routes>
    </BrowserRouter>
  )
}
