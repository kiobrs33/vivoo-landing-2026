import { useState } from 'react'
import { CheckCircle2, LocateFixed, MapPinOff, Maximize2 } from 'lucide-react'
import { dentroDeZona, zonas } from '../config/cobertura'
import MapaCobertura, { type Vista } from '../components/MapaCobertura'
import { waLink } from '../config/site'
import { WhatsAppIcon } from '../components/ui'

type Ubicacion =
  | { estado: 'inactiva' }
  | { estado: 'buscando' }
  | { estado: 'dentro'; zona: string }
  | { estado: 'fuera' }
  | { estado: 'error'; mensaje: string }

export default function CoveragePage() {
  const [punto, setPunto] = useState<[number, number] | null>(null)
  const [vista, setVista] = useState<Vista>('todas')
  const [ubicacion, setUbicacion] = useState<Ubicacion>({ estado: 'inactiva' })

  const ubicarme = () => {
    if (!('geolocation' in navigator)) {
      setUbicacion({ estado: 'error', mensaje: 'Tu navegador no permite compartir la ubicación.' })
      return
    }
    setUbicacion({ estado: 'buscando' })
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const punto: [number, number] = [coords.latitude, coords.longitude]
        const zona = zonas.find(z => dentroDeZona(punto, z.contorno))
        setUbicacion(zona ? { estado: 'dentro', zona: zona.nombre } : { estado: 'fuera' })
        setPunto(punto)
      },
      error => {
        setUbicacion({
          estado: 'error',
          mensaje:
            error.code === error.PERMISSION_DENIED
              ? 'No diste permiso para usar tu ubicación. Puedes buscar tu casa en el mapa.'
              : 'No pudimos obtener tu ubicación. Inténtalo de nuevo o busca tu casa en el mapa.',
        })
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const opciones: { id: Vista; nombre: string; detalle: string; color?: string }[] = [
    { id: 'todas', nombre: 'Ver todo', detalle: 'Las dos zonas' },
    ...zonas.map(z => ({ id: z.id, nombre: z.nombre, detalle: z.detalle, color: z.color })),
  ]

  return (
    <div className="min-h-screen bg-vivoo-cloud">
      {/* Héroe */}
      <section className="relative overflow-hidden rounded-b-[2rem] px-4 pb-16 pt-32 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0066ff_0%,#3540cc_45%,#6a1b9a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#4d94ff59,transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-vivoo-signal-dim">Cobertura</p>
          <h1 className="text-4xl font-extrabold text-white text-balance sm:text-5xl">¿Llegamos a tu casa?</h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/75">
            Nuestra red de fibra propia cubre la ciudad de Arequipa y El Pedregal. Ubica tu casa en
            el mapa o usa tu ubicación para comprobarlo.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
          {/* Panel de zonas */}
          <aside className="flex flex-col gap-5 rounded-3xl border border-vivoo-mist bg-white p-5 sm:p-6" aria-label="Zonas de cobertura">
            <div>
              <h2 className="text-lg font-bold text-vivoo-ink">Zonas con fibra Vivoo</h2>
              <p className="mt-1 text-sm leading-6 text-vivoo-ink/60">Toca una zona para acercarte.</p>
            </div>

            <ul className="flex flex-col gap-2">
              {opciones.map(o => {
                const activa = vista === o.id
                return (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => setVista(o.id)}
                      aria-pressed={activa}
                      className={`presion flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left ${
                        activa ? 'border-vivoo-blue bg-vivoo-menta' : 'border-vivoo-mist hover:bg-vivoo-cloud'
                      }`}
                    >
                      {o.color ? (
                        <span
                          className="h-4 w-4 shrink-0 rounded-md border-2"
                          style={{ borderColor: o.color, background: `${o.color}38` }}
                          aria-hidden="true"
                        />
                      ) : (
                        <Maximize2 size={16} className="shrink-0 text-vivoo-ink/50" aria-hidden="true" />
                      )}
                      <span>
                        <span className="block text-sm font-semibold text-vivoo-ink">{o.nombre}</span>
                        <span className="block text-xs text-vivoo-ink/55">{o.detalle}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-vivoo-mist pt-5">
              <button
                type="button"
                onClick={ubicarme}
                disabled={ubicacion.estado === 'buscando'}
                className="presion inline-flex w-full items-center justify-center gap-2 rounded-full bg-vivoo-ink px-5 py-3 text-sm font-semibold text-white hover:bg-vivoo-blue disabled:cursor-wait disabled:opacity-60"
              >
                <LocateFixed size={16} aria-hidden="true" />
                {ubicacion.estado === 'buscando' ? 'Buscando tu ubicación…' : 'Usar mi ubicación'}
              </button>

              <div aria-live="polite">
                {ubicacion.estado === 'dentro' && (
                  <p className="aparece mt-3 flex gap-2 rounded-2xl bg-vivoo-menta p-3 text-sm leading-6 text-vivoo-ink/80">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-vivoo-blue" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-vivoo-ink">Estás en la zona {ubicacion.zona}.</strong>{' '}
                      Escríbenos para confirmar tu dirección exacta.
                    </span>
                  </p>
                )}
                {ubicacion.estado === 'fuera' && (
                  <p className="aparece mt-3 flex gap-2 rounded-2xl bg-vivoo-lila p-3 text-sm leading-6 text-vivoo-ink/80">
                    <MapPinOff size={18} className="mt-0.5 shrink-0 text-vivoo-purple" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-vivoo-ink">Tu ubicación está fuera de las zonas marcadas.</strong>{' '}
                      Escríbenos igual: revisamos cada dirección.
                    </span>
                  </p>
                )}
                {ubicacion.estado === 'error' && (
                  <p className="aparece mt-3 text-sm leading-6 text-vivoo-ink/65">{ubicacion.mensaje}</p>
                )}
              </div>
            </div>

            <a
              href={waLink('Hola Vivoo, quiero saber si tienen cobertura en mi dirección: ')}
              target="_blank"
              rel="noopener noreferrer"
              className="presion mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-vivoo-mist bg-vivoo-cloud px-5 py-3 text-sm font-semibold text-vivoo-ink hover:border-vivoo-blue"
            >
              <WhatsAppIcon className="h-4 w-4 text-vivoo-blue" />
              Consultar mi dirección
            </a>
          </aside>

          {/* Mapa */}
          <MapaCobertura vista={vista} onVista={setVista} ubicacion={punto} className="h-[26rem] sm:h-[32rem] lg:h-auto lg:min-h-[36rem]" />
        </div>
      </div>
    </div>
  )
}
