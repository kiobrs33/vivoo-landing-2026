import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { waLink } from '../config/site'
import { colorVelocidad, nombreCompleto, planes, type Plan } from '../config/planes'
import { Encabezado } from './ui'

function TarjetaPlan({ plan }: { plan: Plan }) {
  const color = colorVelocidad(plan.velocidad)
  const mensaje = `Hola Vivoo, me interesa el ${nombreCompleto(plan)} por S/ ${plan.precio} al mes.`

  return (
    <article className="flex flex-col rounded-3xl border border-vivoo-mist bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-18px_rgba(12,14,42,0.25)]">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-vivoo-ink/60">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
            {plan.nombre}
          </h3>
          <p className="mt-1 text-2xl font-bold leading-tight text-vivoo-ink">
            {plan.velocidad} <span className="text-base font-semibold text-vivoo-ink/60">Mbps</span>
          </p>
        </div>
        <p className="text-right leading-none text-vivoo-ink">
          <span className="text-sm font-semibold text-vivoo-ink/55">S/ </span>
          <span className="text-4xl font-extrabold tabular-nums tracking-[-0.02em]">{plan.precio}</span>
          <span className="block pt-1.5 text-xs text-vivoo-ink/55">al mes</span>
        </p>
      </header>

      <p className="mt-3 text-sm text-vivoo-ink/65">{plan.uso}</p>

      <ul className="mt-5 space-y-2 border-t border-vivoo-mist pt-5" aria-label={`Qué incluye el ${nombreCompleto(plan)}`}>
        <li className="flex items-start gap-2.5 text-sm text-vivoo-ink/80">
          <Check size={16} strokeWidth={2.75} className="mt-0.5 shrink-0" style={{ color }} aria-hidden="true" />
          Internet de fibra óptica y router WiFi
        </li>
        {plan.incluye.map(item => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-vivoo-ink/80">
            <Check size={16} strokeWidth={2.75} className="mt-0.5 shrink-0" style={{ color }} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="min-h-6 flex-1" aria-hidden="true" />
      <a
        href={waLink(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-vivoo-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vivoo-blue"
        aria-label={`Contratar el ${nombreCompleto(plan)} por WhatsApp`}
      >
        Contratar
      </a>
    </article>
  )
}

export default function PlansSection() {
  return (
    <section id="planes" className="bg-vivoo-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          etiqueta="Planes para tu hogar"
          acento="Velocidad real,"
          estiloAcento="recuadro"
          titulo="sin letra chica."
        >
          Todos los planes son de fibra óptica simétrica, sin permanencia, con router WiFi e
          instalación gratuita. Los precios son mensuales y ya incluyen IGV.
        </Encabezado>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {planes.map(plan => (
            <TarjetaPlan key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mt-6 text-sm text-vivoo-ink/60">
          Sujeto a disponibilidad de cobertura en tu zona.{' '}
          <Link to="/cobertura" className="font-semibold text-vivoo-blue underline decoration-vivoo-blue/30 underline-offset-4 hover:decoration-vivoo-blue">
            Revisa si llegamos a tu distrito
          </Link>
        </p>
      </div>
    </section>
  )
}
