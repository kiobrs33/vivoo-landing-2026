import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import volcan from '../images/volcan.png'
import { waLink } from '../config/site'
import { precioDesde } from '../config/planes'

const hechos = [`Planes desde S/ ${precioDesde} al mes`, 'Instalación gratuita', 'Sin permanencia']

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-vivoo-ink"
    >
      {/* Cielo eléctrico */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#0066ff_0%,#3540cc_45%,#6a1b9a_100%)]" />

      {/* El Misti, centrado en su mitad y dentro de su propio cielo eléctrico */}
      <div className="pointer-events-none absolute left-1/2 top-14 -z-10 -translate-x-1/2 sm:left-auto sm:right-[-5rem] sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 lg:right-[-3rem] xl:right-[4%]">
        <div aria-hidden="true" className="misti-cielo" />
        <img
          src={volcan}
          alt=""
          className="relative h-auto w-[14rem] object-contain animate-volcan-float sm:w-[34rem] xl:w-[42rem]"
        />
      </div>

      {/* Fundido hacia la sección siguiente */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-vivoo-cloud to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-[19.5rem] sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-vivoo-signal-dim animate-fade-up">
            Fibra óptica en Arequipa
          </p>

          <h1
            className="font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white animate-fade-up-delay-1"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.75rem)' }}
          >
            Internet para
            <br />
            <span className="text-gradient-hero">tu hogar</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg animate-fade-up-delay-2">
            Fibra óptica simétrica, con red propia y un equipo que está en Arequipa. Más de 3,000
            hogares ya navegan con Vivoo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-3">
            <Link
              to="/#planes"
              className="presion inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-vivoo-ink hover:scale-[1.03] focus-visible:outline-white"
            >
              Ver planes
            </Link>
            <a
              href={waLink('Hola Vivoo, quiero contratar internet para mi hogar.')}
              target="_blank"
              rel="noopener noreferrer"
              className="presion inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white hover:border-white hover:bg-white/10 focus-visible:outline-white"
            >
              Quiero contratar
            </a>
          </div>

          <ul className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 animate-fade-up-delay-4">
            {hechos.map(h => (
              <li key={h} className="flex items-center gap-2 text-sm font-medium text-white/85">
                <Check size={16} strokeWidth={2.75} className="shrink-0 text-vivoo-signal" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
