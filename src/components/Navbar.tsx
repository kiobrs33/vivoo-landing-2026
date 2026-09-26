import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building2, House, Menu, Phone, X } from 'lucide-react'
import vivooLogo from '../images/vivoo-logo-white.png'
import { site, waLink } from '../config/site'
import { WhatsAppIcon } from './ui'

type Contexto = 'hogar' | 'empresas'

/**
 * Cada público ve solo su navegación. `seccion` apunta a una sección de su
 * propia página ("" es el inicio); `ruta` lleva a otra vista del sitio.
 */
type Enlace = { label: string; seccion?: string; ruta?: string }

const navegacion: Record<Contexto, { base: string; mensaje: string; links: Enlace[] }> = {
  hogar: {
    base: '/',
    mensaje: 'Hola Vivoo, quiero contratar internet para mi hogar.',
    links: [
      { label: 'Inicio', seccion: '' },
      { label: 'Planes', seccion: 'planes' },
      { label: 'Beneficios', seccion: 'beneficios' },
      { label: 'Servicios', seccion: 'servicios' },
      { label: 'Cobertura', ruta: '/cobertura' },
      { label: 'FAQ', ruta: '/faq' },
      { label: 'Pagos', ruta: '/pagos' },
    ],
  },
  empresas: {
    base: '/empresas',
    mensaje: 'Hola Vivoo, quiero información sobre conectividad para mi empresa.',
    links: [
      { label: 'Inicio', seccion: '' },
      { label: 'Servicios', seccion: 'servicios' },
      { label: 'Beneficios', seccion: 'beneficios' },
      { label: 'Soluciones', seccion: 'soluciones' },
      { label: 'Contacto', seccion: 'contacto' },
    ],
  },
}

/** Marca la sección que ocupa el centro de la pantalla mientras se hace scroll. */
function useSeccionVisible(ids: string[], activo: boolean) {
  const [visible, setVisible] = useState('')

  useEffect(() => {
    if (!activo) {
      setVisible('')
      return
    }
    const elementos = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (elementos.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setVisible(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elementos.forEach(el => observer.observe(el))

    const alInicio = () => {
      if (window.scrollY < 200) setVisible('')
    }
    window.addEventListener('scroll', alInicio, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', alInicio)
    }
  }, [ids.join(','), activo])

  return visible
}

/** Selector de público: una píldora con indicador deslizante. */
function SelectorPublico({ contexto, compacto = false }: { contexto: Contexto; compacto?: boolean }) {
  const opciones = [
    { id: 'hogar' as const, label: 'Hogar', to: '/', Icon: House },
    { id: 'empresas' as const, label: 'Empresas', to: '/empresas', Icon: Building2 },
  ]
  return (
    <div
      className="relative grid shrink-0 grid-cols-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] p-1"
      aria-label="Tipo de cliente"
      role="group"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: contexto === 'empresas' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {opciones.map(({ id, label, to, Icon }) => {
        const activo = contexto === id
        return (
          <Link
            key={id}
            to={to}
            aria-current={activo ? 'page' : undefined}
            className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors duration-300 focus-visible:outline-vivoo-signal ${
              compacto ? 'px-2.5 py-1.5 text-xs' : 'px-4 py-1.5 text-sm'
            } ${activo ? 'text-vivoo-ink' : 'text-white/75 hover:text-white'}`}
          >
            <Icon size={compacto ? 13 : 15} strokeWidth={2.25} aria-hidden="true" />
            {label}
          </Link>
        )
      })}
    </div>
  )
}

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const contexto: Contexto = location.pathname.startsWith('/empresas') ? 'empresas' : 'hogar'
  const { base, mensaje, links } = navegacion[contexto]
  const enSuPagina = location.pathname === base
  const seccionVisible = useSeccionVisible(
    links.map(l => l.seccion).filter((id): id is string => Boolean(id)),
    enSuPagina,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setAbierto(false)
  }, [location.pathname, location.hash])

  // Evita que la página se desplace detrás del menú móvil abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  const destino = (l: Enlace) => l.ruta ?? (l.seccion ? `${base}#${l.seccion}` : base)
  const esActivo = (l: Enlace) =>
    l.ruta
      ? location.pathname === l.ruta
      : enSuPagina && (l.seccion ? l.seccion === seccionVisible : !seccionVisible)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label="Principal"
          className="flex w-full max-w-6xl items-center gap-3 rounded-full border border-white/10 px-3 py-2 backdrop-blur-xl transition-[background-color,box-shadow] duration-300 sm:px-5 lg:grid lg:grid-cols-[auto_1fr_auto] xl:grid-cols-[1fr_auto_1fr]"
          style={{
            background: scrolled || abierto ? 'rgba(12,14,42,0.82)' : 'rgba(12,14,42,0.4)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.25)' : 'none',
          }}
        >
          {/* Izquierda: marca */}
          <Link to={base} className="flex shrink-0 items-center justify-self-start select-none" aria-label="Vivoo, inicio">
            <img src={vivooLogo} alt="Vivoo" className="h-auto w-[76px] sm:w-[92px]" />
          </Link>

          {/* Centro: navegación del público actual */}
          <ul className="hidden items-center justify-self-center lg:flex xl:gap-1">
            {links.map(l => (
              <li key={l.label}>
                <Link
                  to={destino(l)}
                  aria-current={esActivo(l) ? (l.ruta ? 'page' : 'location') : undefined}
                  className={`whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium transition-colors xl:px-3 ${
                    esActivo(l)
                      ? 'text-vivoo-signal'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Derecha: selector de público */}
          <div className="ml-auto flex items-center gap-2 justify-self-end sm:gap-3 lg:ml-0">
            <div className="hidden sm:block">
              <SelectorPublico contexto={contexto} />
            </div>
            <div className="sm:hidden">
              <SelectorPublico contexto={contexto} compacto />
            </div>

            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
              onClick={() => setAbierto(a => !a)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            >
              {abierto ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil: solo la navegación del público actual */}
      <div
        id="menu-movil"
        className="fixed inset-0 z-[65] bg-vivoo-ink transition-opacity duration-200 lg:hidden"
        style={{ opacity: abierto ? 1 : 0, pointerEvents: abierto ? 'auto' : 'none' }}
        aria-hidden={!abierto}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-24">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-vivoo-signal-dim">
            {contexto === 'hogar' ? 'Internet para tu hogar' : 'Soluciones para empresas'}
          </p>
          <ul>
            {links.map(l => (
              <li key={l.label} className="border-b border-white/[0.08]">
                <Link
                  to={destino(l)}
                  tabIndex={abierto ? 0 : -1}
                  className={`block py-4 text-lg font-semibold ${
                    esActivo(l) ? 'text-vivoo-signal' : 'text-white'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 pt-8">
            <a
              href={waLink(mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={abierto ? 0 : -1}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-vivoo-signal py-3.5 text-sm font-bold text-vivoo-ink"
            >
              <WhatsAppIcon width={17} height={17} />
              Escribir por WhatsApp
            </a>
            <a
              href={site.telefonoHref}
              tabIndex={abierto ? 0 : -1}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-sm font-semibold text-white"
            >
              <Phone size={16} className="text-vivoo-signal" />
              Llamar al {site.telefono}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
