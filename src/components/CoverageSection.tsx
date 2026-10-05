import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LocateFixed, Maximize2 } from 'lucide-react'
import { zonas } from '../config/cobertura'
import { waLink } from '../config/site'
import { Encabezado, WhatsAppIcon } from './ui'
import type { Vista } from './MapaCobertura'

// Leaflet solo se descarga cuando la sección se acerca a la pantalla.
const MapaCobertura = lazy(() => import('./MapaCobertura'))

const altoMapa = 'h-[24rem] sm:h-[30rem] lg:h-[34rem]'

/** Cobertura en la portada: las dos zonas de la red sobre el mapa real. */
export default function CoverageSection() {
  const seccion = useRef<HTMLElement>(null)
  const [cargarMapa, setCargarMapa] = useState(false)
  // Abre en Arequipa, donde está la mayoría de hogares; El Pedregal queda a un toque.
  const [vista, setVista] = useState<Vista>('arequipa')

  useEffect(() => {
    const el = seccion.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setCargarMapa(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setCargarMapa(true)
        obs.disconnect()
      },
      { rootMargin: '400px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const opciones: { id: Vista; nombre: string; detalle: string; color?: string }[] = [
    ...zonas.map(z => ({ id: z.id, nombre: z.nombre, detalle: z.detalle, color: z.color })),
    { id: 'todas', nombre: 'Ver las dos zonas', detalle: 'Arequipa y El Pedregal' },
  ]

  return (
    <section ref={seccion} id="cobertura" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14 lg:px-8">
        <div>
          <Encabezado etiqueta="Cobertura" titulo="Fibra propia en toda" acento="Arequipa y El Pedregal">
            Nuestra red cubre toda la ciudad de Arequipa y El Pedregal. Toca una zona para verla de
            cerca.
          </Encabezado>

          <ul className="mt-8 space-y-2.5">
            {opciones.map(o => {
              const activa = vista === o.id
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => setVista(o.id)}
                    aria-pressed={activa}
                    className={`presion flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left ${
                      activa ? 'border-vivoo-ink bg-vivoo-ink text-white' : 'border-vivoo-mist bg-white text-vivoo-ink hover:border-vivoo-ink/30'
                    }`}
                  >
                    {o.color ? (
                      <span
                        className="h-5 w-5 shrink-0 rounded-md border-[2.5px]"
                        style={{ borderColor: o.color, background: `${o.color}${activa ? '80' : '3d'}` }}
                        aria-hidden="true"
                      />
                    ) : (
                      <Maximize2 size={18} className={`shrink-0 ${activa ? 'text-white/70' : 'text-vivoo-ink/45'}`} aria-hidden="true" />
                    )}
                    <span className="flex-1">
                      <span className="block font-semibold">{o.nombre}</span>
                      <span className={`block text-sm ${activa ? 'text-white/65' : 'text-vivoo-ink/55'}`}>{o.detalle}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/cobertura"
              className="presion inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-vivoo-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-vivoo-blue"
            >
              <LocateFixed size={16} aria-hidden="true" />
              Comprobar mi dirección
            </Link>
            <a
              href={waLink('Hola Vivoo, quiero saber si tienen cobertura en mi dirección: ')}
              target="_blank"
              rel="noopener noreferrer"
              className="presion inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-vivoo-mist bg-vivoo-cloud px-6 py-3.5 text-sm font-semibold text-vivoo-ink hover:border-vivoo-ink/30"
            >
              <WhatsAppIcon className="h-4 w-4 text-vivoo-blue" />
              Por WhatsApp
            </a>
          </div>
        </div>

        {cargarMapa ? (
          <Suspense fallback={<div className={`${altoMapa} animate-pulse rounded-3xl bg-vivoo-mist`} />}>
            <MapaCobertura vista={vista} onVista={setVista} className={altoMapa} />
          </Suspense>
        ) : (
          <div className={`${altoMapa} rounded-3xl bg-vivoo-mist`} aria-hidden="true" />
        )}
      </div>
    </section>
  )
}
