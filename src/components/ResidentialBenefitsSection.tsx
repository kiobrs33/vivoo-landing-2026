import { Gauge, HandCoins, MapPin, Network, Unlock, Wrench } from 'lucide-react'
import { Encabezado } from './ui'

/** Solo beneficios confirmados en PRODUCT.md. */
const beneficios = [
  {
    Icon: Gauge,
    title: 'Velocidad simétrica',
    description:
      'Subes y bajas a la misma velocidad. Videollamadas, clases y archivos pesados no se traban cuando toda la casa está conectada.',
  },
  {
    Icon: Unlock,
    title: 'Sin permanencia',
    description:
      'No te amarramos con cláusulas de permanencia. Si algún día decides irte, puedes pedir la baja sin penalidades.',
  },
  {
    Icon: Network,
    title: 'Red de fibra propia',
    description:
      'Operamos nuestra propia fibra en Arequipa, así que podemos intervenir la red directamente, sin depender de otra empresa.',
  },
  {
    Icon: MapPin,
    title: 'Soporte 24/7 en tu ciudad',
    description:
      'Soporte técnico las 24 horas, todos los días. Te atiende gente de Arequipa que conoce tu distrito, con visita a domicilio cuando el problema lo requiere.',
  },
  {
    Icon: Wrench,
    title: 'Instalación gratuita en 24 a 48 horas',
    description:
      'Un técnico de Vivoo instala el servicio y el router WiFi sin costo, entre 24 y 48 horas después de confirmar tu plan.',
  },
  {
    Icon: HandCoins,
    title: 'Precio claro, con IGV incluido',
    description: 'Lo que ves en el plan es lo que pagas al mes, sin cargos escondidos.',
  },
]

export default function ResidentialBenefitsSection() {
  return (
    <section id="beneficios" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Encabezado
            etiqueta="Beneficios"
            acento="Por qué cambiarte"
            estiloAcento="recuadro"
            titulo="a Vivoo."
          >
            Más de 3,000 hogares en Arequipa ya se conectan con nosotros. Esto es lo que
            encuentran.
          </Encabezado>
        </div>

        <ul className="divide-y divide-vivoo-mist border-y border-vivoo-mist">
          {beneficios.map(({ Icon, title, description }) => (
            <li key={title} className="flex gap-5 py-6 sm:py-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vivoo-menta">
                <Icon size={19} className="text-vivoo-blue" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-vivoo-ink">{title}</h3>
                <p className="mt-1.5 max-w-prose text-base leading-relaxed text-vivoo-ink/65">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
