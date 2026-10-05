import { Link } from 'react-router-dom'
import { PartyPopper } from 'lucide-react'
import { waLink } from '../config/site'
import { Encabezado } from './ui'
import { useSenal } from '../lib/useSenal'

const pasos = [
  {
    titulo: 'Elige tu plan',
    detalle: 'Compara los planes y quédate con el que va con tu casa.',
  },
  {
    titulo: 'Escríbenos',
    detalle: 'Por WhatsApp, por teléfono o con el formulario de contacto.',
  },
  {
    titulo: 'Verificamos la cobertura',
    detalle: 'Revisamos que nuestra red de fibra llegue a tu dirección.',
  },
  {
    titulo: 'Coordinamos la instalación',
    detalle: 'Un técnico de Vivoo instala el servicio sin costo, entre 24 y 48 horas después de confirmar tu plan.',
  },
]

export default function InstallSection() {
  const linea = useSenal<HTMLOListElement>()
  return (
    <section id="instalacion" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Encabezado etiqueta="Cómo contratar" titulo="Así llega Vivoo" acento="a tu casa">
          Cuatro pasos y listo. En cada uno sabes qué sigue.
        </Encabezado>

        {/* La hebra de fibra une los pasos: horizontal en escritorio, vertical en móvil */}
        <ol ref={linea} data-senal className="relative mt-12 grid gap-8 lg:grid-cols-5 lg:gap-6">
          <span
            aria-hidden="true"
            className="hebra-paso absolute bottom-6 left-[1.3rem] top-6 w-[3px] overflow-hidden rounded-full bg-gradient-to-b from-vivoo-blue to-vivoo-purple lg:bottom-auto lg:left-6 lg:right-6 lg:top-[1.3rem] lg:h-[3px] lg:w-auto lg:bg-gradient-to-r"
          />
          {pasos.map((paso, i) => (
            <li key={paso.titulo} className="relative flex gap-5 lg:flex-col lg:gap-5">
              <span
                className="nodo relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-vivoo-ink text-sm font-bold text-white shadow-[0_0_0_1px_#e2e8f4]"
                style={{ '--retraso': `${i * 220}ms` } as React.CSSProperties}
              >
                {i + 1}
              </span>
              <div className="pt-1.5 lg:pt-0">
                <h3 className="text-lg font-bold text-vivoo-ink">{paso.titulo}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-vivoo-ink/65 lg:text-sm lg:leading-6">
                  {paso.detalle}
                </p>
              </div>
            </li>
          ))}
          <li className="relative flex gap-5 lg:flex-col lg:gap-5">
            <span
              className="nodo nodo-final relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-vivoo-signal text-vivoo-ink shadow-[0_0_0_1px_#e2e8f4]"
              style={{ '--retraso': `${pasos.length * 220}ms` } as React.CSSProperties}
            >
              <PartyPopper size={18} strokeWidth={2.25} aria-hidden="true" />
            </span>
            <div className="pt-1.5 lg:pt-0">
              <h3 className="text-lg font-bold text-vivoo-ink">¡Listo!</h3>
              <p className="mt-1.5 text-base leading-relaxed text-vivoo-ink/65 lg:text-sm lg:leading-6">
                Disfruta tu internet de fibra.
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/#planes"
            className="presion inline-flex items-center justify-center rounded-full bg-vivoo-ink px-7 py-3.5 text-sm font-semibold text-white hover:bg-vivoo-blue"
          >
            Elegir mi plan
          </Link>
          <a
            href={waLink('Hola Vivoo, quiero saber si hay cobertura en mi dirección.')}
            target="_blank"
            rel="noopener noreferrer"
            className="presion inline-flex items-center justify-center rounded-full border border-vivoo-mist bg-vivoo-cloud px-7 py-3.5 text-sm font-semibold text-vivoo-ink hover:border-vivoo-ink/30"
          >
            Consultar cobertura por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
