import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpenText, Mail, MapPin, Phone } from 'lucide-react'
import vivooLogo from '../images/vivoo-logo-white.png'
import { osiptel, site, waLink } from '../config/site'
import { FacebookIcon } from './ui'

type Enlace = { label: string; to?: string; href?: string }

const columnas: { titulo: string; enlaces: Enlace[] }[] = [
  {
    titulo: 'Hogar',
    enlaces: [
      { label: 'Planes', to: '/#planes' },
      { label: 'Beneficios', to: '/#beneficios' },
      { label: 'Servicios', to: '/#servicios' },
      { label: 'Cobertura', to: '/cobertura' },
      { label: 'Contacto', to: '/#contacto' },
    ],
  },
  {
    titulo: 'Empresas',
    enlaces: [
      { label: 'Servicios', to: '/empresas#servicios' },
      { label: 'Soluciones', to: '/empresas#soluciones' },
      { label: 'Contacto', to: '/empresas#contacto' },
    ],
  },
  {
    titulo: 'Ayuda',
    enlaces: [
      { label: 'Preguntas frecuentes', to: '/faq' },
      { label: 'Formas de pago', to: '/pagos' },
      { label: 'Soporte por WhatsApp', href: waLink('Hola Vivoo, necesito soporte técnico.') },
      { label: 'Reclamos por el servicio', to: '/osiptel#reclamo' },
    ],
  },
  {
    titulo: 'Legal',
    enlaces: [
      { label: 'Derechos del usuario', to: '/osiptel' },
      { label: 'OSIPTEL', href: osiptel.web },
    ],
  },
]

const claseEnlace = 'inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white'

export default function Footer() {
  return (
    <footer className="bg-vivoo-ink text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block select-none" aria-label="Vivoo, inicio">
              <img src={vivooLogo} alt="Vivoo" width={100} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Siempre conectados contigo. Internet de fibra óptica en Arequipa.
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href={site.telefonoHref} className="flex items-center gap-2 hover:text-white">
                  <Phone size={14} className="text-vivoo-signal" aria-hidden="true" />
                  {site.telefono}
                </a>
              </li>
              <li>
                <a href={site.correoHref} className="flex items-center gap-2 hover:text-white">
                  <Mail size={14} className="text-vivoo-signal" aria-hidden="true" />
                  {site.correo}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-vivoo-signal" aria-hidden="true" />
                {site.ciudad}
              </li>
            </ul>

            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vivoo en Facebook"
              className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
            >
              <FacebookIcon width={15} height={15} />
            </a>
          </div>

          {columnas.map(col => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <p className="mb-4 text-sm font-semibold text-white">{col.titulo}</p>
              <ul className="space-y-2.5">
                {col.enlaces.map(e => (
                  <li key={e.label}>
                    {e.to ? (
                      <Link to={e.to} className={claseEnlace}>{e.label}</Link>
                    ) : (
                      <a href={e.href} target="_blank" rel="noopener noreferrer" className={claseEnlace}>
                        {e.label}
                        <ArrowUpRight size={13} aria-label="(sitio externo)" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Libro de Reclamaciones: acceso visible desde cualquier página */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/libro-de-reclamaciones"
            className="inline-flex items-center gap-3 self-start rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-vivoo-signal hover:bg-white/5"
          >
            <BookOpenText size={20} className="text-vivoo-signal" aria-hidden="true" />
            Libro de Reclamaciones
          </Link>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {site.nombreLegal}
            {site.ruc && <> · RUC {site.ruc}</>} · {site.ciudad}
          </p>
        </div>
      </div>
    </footer>
  )
}
