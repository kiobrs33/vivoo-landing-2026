import type { LucideIcon } from 'lucide-react'
import { Building2, Landmark, PlayCircle, Smartphone } from 'lucide-react'
import { waLink } from '../config/site'
import { WhatsAppIcon } from '../components/ui'
import { useSenal } from '../lib/useSenal'

/** Video tutorial de pago con Yape (Cloudinary, versión optimizada a 720 px). */
const videoBase = 'https://res.cloudinary.com/dks25ivcf/video/upload'
const videoId = 'v1791568571/vivoo-telecom/vivoo-metodo-pago-v2_lw9by1'
const videoYape = `${videoBase}/q_auto,w_720/${videoId}.mp4`
const posterYape = `${videoBase}/so_0,q_auto,w_720/${videoId}.jpg`

type Paso = { texto: string; dato?: string }

type Medio = {
  id: string
  titulo: string
  descripcion: string
  Icon: LucideIcon
  pasos: Paso[]
}

const yape: Medio = {
  id: 'yape',
  titulo: 'Paga con Yape',
  descripcion: 'Desde la app de Yape en tu celular.',
  Icon: Smartphone,
  pasos: [
    { texto: 'Entra a', dato: 'Yape Servicios' },
    { texto: 'Busca', dato: 'VIVOO' },
    { texto: 'Ingresa el DNI, CE o RUC del titular' },
    { texto: 'Revisa el monto y paga' },
  ],
}

const otrosMedios: Medio[] = [
  {
    id: 'bcp-movil',
    titulo: 'BCP Banca Móvil',
    descripcion: 'Desde la app del BCP, sin salir de casa.',
    Icon: Landmark,
    pasos: [
      { texto: 'Entra a', dato: 'Pagar servicios' },
      { texto: 'Busca', dato: 'VIVOO' },
      { texto: 'Ingresa el DNI, CE o RUC del titular' },
      { texto: 'Confirma el pago' },
    ],
  },
  {
    id: 'bcp-agente',
    titulo: 'Agentes y ventanillas BCP',
    descripcion: 'En efectivo, en cualquier agente o agencia BCP.',
    Icon: Building2,
    pasos: [
      { texto: 'Acércate a un agente o ventanilla BCP' },
      { texto: 'Indica que pagarás a', dato: 'VIVOO' },
      { texto: 'Brinda el DNI, CE o RUC del titular' },
      { texto: 'Paga y guarda tu comprobante' },
    ],
  },
]

/** Pasos numerados unidos por la hebra de fibra (DESIGN.md: Línea de instalación). */
function Pasos({ pasos, tono = 'claro' }: { pasos: Paso[]; tono?: 'claro' | 'oscuro' }) {
  const oscuro = tono === 'oscuro'
  const lista = useSenal<HTMLOListElement>()
  return (
    <ol ref={lista} data-senal className="relative space-y-4">
      <span
        className="hebra-v absolute bottom-4 left-[15px] top-4 w-[3px] overflow-hidden rounded-full bg-[linear-gradient(180deg,#0066ff,#6a1b9a)]"
        aria-hidden="true"
      />
      {pasos.map(({ texto, dato }, i) => (
        <li key={texto + (dato ?? '')} className="relative flex items-center gap-3.5">
          <span
            style={{ '--retraso': `${i * 200}ms` } as React.CSSProperties}
            className={`nodo flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums ring-4 ${
              oscuro ? 'bg-white text-vivoo-ink ring-vivoo-ink' : 'bg-vivoo-ink text-white ring-white'
            }`}
          >
            {i + 1}
          </span>
          <span className={`text-[15px] leading-6 ${oscuro ? 'text-white/85' : 'text-vivoo-ink/80'}`}>
            {texto}
            {dato && (
              <>
                {' '}
                <strong
                  className={`rounded-md px-1.5 py-0.5 font-semibold ${
                    oscuro ? 'bg-white/10 text-white' : 'bg-vivoo-menta text-vivoo-blue'
                  }`}
                >
                  {dato}
                </strong>
              </>
            )}
          </span>
        </li>
      ))}
    </ol>
  )
}

export default function Payment() {
  return (
    <div className="min-h-screen bg-vivoo-cloud">
      {/* Héroe */}
      <section className="relative overflow-hidden rounded-b-[2rem] px-4 pb-16 pt-32 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0066ff_0%,#3540cc_45%,#6a1b9a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#4d94ff59,transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-vivoo-signal-dim">Medios de pago</p>
          <h1 className="text-4xl font-extrabold text-white text-balance sm:text-5xl">¿Cómo pagar tu recibo?</h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/75">
            Paga con Yape o en el BCP. En todos los casos solo necesitas el DNI, CE o RUC del titular
            del servicio.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Yape con video */}
        <section
          aria-labelledby="pago-yape"
          className="relative overflow-hidden rounded-3xl bg-vivoo-ink p-6 sm:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_0%_0%,rgba(0,102,255,0.35),transparent_60%),radial-gradient(60%_70%_at_100%_100%,rgba(106,27,154,0.55),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_17rem] lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <yape.Icon size={24} aria-hidden="true" />
              </span>
              <h2 id="pago-yape" className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                {yape.titulo}
              </h2>
              <p className="mt-2 text-base text-white/70">{yape.descripcion}</p>
              <div className="mt-8 max-w-md">
                <Pasos pasos={yape.pasos} tono="oscuro" />
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/60">
                <PlayCircle size={16} className="text-vivoo-signal" aria-hidden="true" />
                Mira el video con el paso a paso.
              </p>
            </div>

            <figure className="mx-auto w-full max-w-[17rem] lg:max-w-[19rem]">
              <div className="overflow-hidden rounded-[2rem] bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
                <video
                  className="aspect-[9/16] w-full object-cover"
                  src={videoYape}
                  poster={posterYape}
                  controls
                  playsInline
                  preload="none"
                  aria-label="Video: cómo pagar tu recibo Vivoo con Yape"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs text-white/50">
                Cómo pagar con Yape · 40 s
              </figcaption>
            </figure>
          </div>
        </section>

        {/* BCP */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {otrosMedios.map(({ id, titulo, descripcion, Icon, pasos }) => (
            <section
              key={id}
              aria-labelledby={`pago-${id}`}
              className="rounded-3xl border border-vivoo-mist bg-white p-6 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-vivoo-menta text-vivoo-blue">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h2 id={`pago-${id}`} className="text-xl font-bold text-vivoo-ink">
                    {titulo}
                  </h2>
                  <p className="text-sm text-vivoo-ink/60">{descripcion}</p>
                </div>
              </div>
              <div className="mt-7 border-t border-vivoo-mist pt-7">
                <Pasos pasos={pasos} />
              </div>
            </section>
          ))}
        </div>

        {/* Ayuda */}
        <div className="mt-5 flex flex-col items-start gap-4 rounded-3xl border border-vivoo-mist bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-lg font-bold text-vivoo-ink">¿No encuentras tu recibo o tienes dudas con el pago?</h2>
            <p className="mt-1 text-sm text-vivoo-ink/60">Escríbenos con el DNI, CE o RUC del titular y te ayudamos.</p>
          </div>
          <a
            href={waLink('Hola Vivoo, tengo una consulta sobre el pago de mi recibo.')}
            target="_blank"
            rel="noopener noreferrer"
            className="presion inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-vivoo-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-vivoo-blue sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
