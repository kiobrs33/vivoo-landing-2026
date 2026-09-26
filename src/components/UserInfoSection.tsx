import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpenText, FileWarning, Landmark, Scale } from 'lucide-react'
import { osiptel } from '../config/site'

/**
 * Información breve para usuarios. Resume y enlaza; el detalle vive en
 * /osiptel, /libro-de-reclamaciones y en las fuentes oficiales.
 */
const temas = [
  {
    Icon: Scale,
    title: 'Tus derechos como usuario',
    detalle: 'Qué puedes exigir a cualquier operador de telecomunicaciones.',
    to: '/osiptel',
  },
  {
    Icon: FileWarning,
    title: 'Reclamos por el servicio',
    detalle: 'Facturación, calidad o instalación: cómo presentar tu reclamo.',
    to: '/osiptel#reclamo',
  },
  {
    Icon: BookOpenText,
    title: 'Libro de Reclamaciones',
    detalle: 'Deja constancia de un reclamo o una queja como consumidor.',
    to: '/libro-de-reclamaciones',
  },
  {
    Icon: Landmark,
    title: 'OSIPTEL',
    detalle: `Organismo regulador. Fono Ayuda: ${osiptel.fonoAyuda}.`,
    href: osiptel.web,
  },
]

export default function UserInfoSection() {
  return (
    <section id="usuarios" aria-labelledby="usuarios-titulo" className="border-t border-vivoo-mist bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="usuarios-titulo" className="text-xl font-bold text-vivoo-ink">
          Información para usuarios
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {temas.map(({ Icon, title, detalle, to, href }) => {
            const contenido = (
              <>
                <Icon size={18} className="mt-0.5 shrink-0 text-vivoo-blue" aria-hidden="true" />
                <span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-vivoo-ink group-hover:text-vivoo-blue">
                    {title}
                    {href && <ArrowUpRight size={14} aria-label="(sitio externo)" />}
                  </span>
                  <span className="mt-0.5 block text-sm leading-6 text-vivoo-ink/60">{detalle}</span>
                </span>
              </>
            )
            const clase = 'group flex gap-3 rounded-2xl p-3 -mx-3 transition-colors hover:bg-vivoo-cloud'
            return (
              <li key={title}>
                {to ? (
                  <Link to={to} className={clase}>{contenido}</Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={clase}>{contenido}</a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
