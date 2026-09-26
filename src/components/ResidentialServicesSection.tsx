import type { LucideIcon } from 'lucide-react'
import { Camera, Router, Tv, Wifi } from 'lucide-react'
import { planes, type Plan } from '../config/planes'
import { Encabezado } from './ui'

type Servicio = {
  Icon: LucideIcon
  title: string
  que: string
  para: string
  /** Planes que incluyen el servicio; se calcula de config/planes. */
  enPlan: (plan: Plan) => boolean
}

const servicios: Servicio[] = [
  {
    Icon: Wifi,
    title: 'Internet de fibra óptica',
    que: 'Fibra hasta tu casa, con la misma velocidad de subida y de bajada.',
    para: 'Hogares que trabajan, estudian y ven series al mismo tiempo.',
    enPlan: () => true,
  },
  {
    Icon: Tv,
    title: 'TV digital',
    que: 'Canales de TV digital junto con tu internet; en algunos planes, también películas y series.',
    para: 'Familias que quieren TV e internet en un solo servicio.',
    enPlan: p => Boolean(p.tv),
  },
  {
    Icon: Router,
    title: 'WiFi en toda la casa',
    que: 'Repetidores WiFi que llevan la señal a los ambientes donde antes no llegaba.',
    para: 'Casas de varios pisos o con muchos ambientes.',
    enPlan: p => Boolean(p.repetidor),
  },
  {
    Icon: Camera,
    title: 'Cámara de seguridad',
    que: 'Una cámara conectada a tu internet para ver tu casa desde el celular.',
    para: 'Quien quiere cuidar su casa cuando no está.',
    enPlan: p => Boolean(p.camara),
  },
]

export default function ResidentialServicesSection() {
  return (
    <section id="servicios" className="bg-vivoo-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          etiqueta="Servicios para tu hogar"
          titulo="Todo lo que necesitas"
          acento="en una sola conexión"
        >
          Cada servicio viene dentro de un plan. Así sabes exactamente qué contratar.
        </Encabezado>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {servicios.map(({ Icon, title, que, para, enPlan }) => {
            const incluidos = planes.filter(enPlan)
            const todos = incluidos.length === planes.length
            return (
              <article key={title} className="flex flex-col rounded-3xl border border-vivoo-mist bg-white p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vivoo-menta">
                    <Icon size={19} className="text-vivoo-blue" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-vivoo-ink">{title}</h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-vivoo-ink/75">{que}</p>
                <p className="mt-2 text-sm text-vivoo-ink/60">
                  <span className="font-semibold text-vivoo-ink/75">Ideal para: </span>
                  {para}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-vivoo-mist pt-4">
                  <span className="mr-1 text-xs font-semibold text-vivoo-ink/55">
                    {todos ? 'Incluido en' : 'Viene en'}
                  </span>
                  {todos ? (
                    <span className="rounded-full border border-vivoo-mist bg-vivoo-cloud px-2.5 py-1 text-[11px] font-semibold text-vivoo-ink/70">
                      Todos los planes
                    </span>
                  ) : (
                    incluidos.map(p => (
                      <span
                        key={p.id}
                        className="rounded-full border border-vivoo-mist bg-vivoo-cloud px-2.5 py-1 text-[11px] font-semibold text-vivoo-ink/70"
                      >
                        {p.nombre}
                      </span>
                    ))
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
