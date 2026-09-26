import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { site, waLink } from '../config/site'
import { WhatsAppIcon } from './ui'

/**
 * Acciones flotantes en la esquina inferior derecha: volver al inicio
 * (solo cuando ya se bajó lo suficiente) y contacto directo por WhatsApp.
 * El mensaje inicial de WhatsApp cambia según el público que está navegando.
 */
export default function FloatingActions() {
  const { pathname } = useLocation()
  const [mostrarSubir, setMostrarSubir] = useState(false)

  useEffect(() => {
    const onScroll = () => setMostrarSubir(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mensaje = pathname.startsWith('/empresas')
    ? 'Hola Vivoo, quiero información sobre conectividad para mi empresa.'
    : 'Hola Vivoo, quiero información sobre sus planes de internet.'

  const subir = () => {
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducido ? 'auto' : 'smooth' })
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={subir}
        aria-label="Volver al inicio de la página"
        title="Volver arriba"
        tabIndex={mostrarSubir ? 0 : -1}
        aria-hidden={!mostrarSubir}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-vivoo-ink/90 text-white shadow-[0_8px_24px_rgba(12,14,42,0.25)] backdrop-blur-sm transition-[opacity,transform] duration-300 hover:bg-vivoo-ink focus-visible:outline-vivoo-signal motion-reduce:transition-none ${
          mostrarSubir ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp size={19} strokeWidth={2.5} aria-hidden="true" />
      </button>

      <a
        href={waLink(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Escribir por WhatsApp al ${site.whatsappVisible}`}
        title="Escríbenos por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-105 focus-visible:outline-vivoo-ink"
      >
        <WhatsAppIcon width={27} height={27} />
      </a>
    </div>
  )
}
