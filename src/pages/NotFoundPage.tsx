import { Link } from 'react-router-dom'
import { ArrowLeft, Home, HelpCircle, Wifi } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: '#f5f7fc' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a3dff_0%,#3b2fd8_45%,#5c1fb8_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#5b82ff59,transparent_45%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f5f7fc] to-transparent" />

      {/* Decorative */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(44,229,201,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(44,229,201,0.1)', border: '2px solid rgba(44,229,201,0.2)' }}
        >
          <Wifi size={36} style={{ color: '#2ce5c9' }} />
        </div>

        {/* 404 */}
        <div
          className="text-8xl sm:text-9xl font-extrabold mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(44,229,201,0.3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Página no encontrada
        </h1>
        <p className="max-w-md mx-auto text-base mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
          La página que buscas no existe o fue movida. Pero nuestra señal sigue fuerte — te ayudamos a encontrar lo que necesitas.
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ background: '#2ce5c9', color: '#0c0e2a' }}
          >
            <Home size={15} />
            Ir al inicio
          </Link>
          <Link
            to="/#planes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Ver planes
          </Link>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <HelpCircle size={15} />
            Ayuda
          </Link>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <ArrowLeft size={14} />
          Volver atrás
        </Link>
      </div>
    </div>
  )
}
