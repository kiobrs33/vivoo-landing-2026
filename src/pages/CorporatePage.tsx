import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Cctv,
  Gauge,
  Mail,
  MapPin,
  Network,
  Phone,
  Router,
  Ruler,
  Server,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { site, waLink } from '../config/site'
import { Encabezado, Pendiente, WhatsAppIcon, campoClaro, etiquetaCampo } from '../components/ui'

/**
 * Página corporativa. Los datos comerciales específicos (precios, velocidades,
 * SLA, tiempos de atención, soluciones por tipo de empresa) los entregará
 * Rolando; mientras tanto no se publica ninguna cifra.
 */

const servicios: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Gauge,
    title: 'Internet dedicado simétrico',
    description: 'Ancho de banda dedicado a tu empresa, con la misma velocidad de subida y de bajada.',
  },
  {
    Icon: Network,
    title: 'Enlaces punto a punto',
    description: 'Conecta tus sedes en Arequipa con una red privada de fibra, sin pasar por internet público.',
  },
  {
    Icon: Server,
    title: 'IP fija y rangos públicos',
    description: 'Direcciones IP fijas para publicar servidores, VPN corporativas o sistemas de acceso remoto.',
  },
  {
    Icon: Router,
    title: 'Enlace de respaldo',
    description: 'Una segunda vía de conexión para que tu operación siga funcionando ante una caída.',
  },
  {
    Icon: Cctv,
    title: 'Videovigilancia IP',
    description: 'Cámaras y monitoreo remoto de tus locales sobre el mismo enlace.',
  },
  {
    Icon: ShieldCheck,
    title: 'Seguridad gestionada',
    description: 'Firewall, filtrado de contenido y redes separadas para invitados, administrados por nuestro equipo.',
  },
]

const beneficios: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Network,
    title: 'Red de fibra propia en Arequipa',
    description: 'Operamos nuestra propia fibra: intervenimos la red directamente, sin depender de un tercero.',
  },
  {
    Icon: MapPin,
    title: 'Equipo técnico local',
    description: 'Técnicos en la ciudad que pueden ir a tu local cuando el problema lo requiere.',
  },
  {
    Icon: Ruler,
    title: 'Un servicio a tu medida',
    description: 'No vendemos paquetes cerrados: dimensionamos la capacidad y los equipos según tu operación.',
  },
  {
    Icon: TrendingUp,
    title: 'Crece con tu empresa',
    description: 'Si abres una sede o necesitas más capacidad, ampliamos el servicio contigo.',
  },
]

/** Soluciones por tipo de empresa. Vacío hasta recibir la información de Rolando. */
const solucionesPorTipo: { title: string; description: string }[] = []

const interes = [...servicios.map(s => s.title), 'Aún no lo sé, quiero asesoría']

const inicial = { empresa: '', ruc: '', contacto: '', telefono: '', correo: '', servicio: '', mensaje: '' }
type Campo = keyof typeof inicial

function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden rounded-b-[2rem] bg-vivoo-ink pb-20 pt-32 sm:pb-24 sm:pt-36">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#1a3dff_0%,#3b2fd8_45%,#5c1fb8_100%)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-vivoo-signal-dim">
            Vivoo Empresas
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl text-balance">
            Conectividad para empresas en Arequipa
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Fibra óptica, enlaces entre sedes y soporte local. Armamos cada propuesta según cómo
            opera tu empresa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-vivoo-ink transition-transform hover:scale-[1.03] focus-visible:outline-white"
            >
              Solicitar información
            </a>
            <a
              href={waLink('Hola Vivoo, quiero información sobre conectividad para mi empresa.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-white"
            >
              <WhatsAppIcon width={16} height={16} />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contacto() {
  const [form, setForm] = useState(inicial)
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({})

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrores(prev => (prev[name as Campo] ? { ...prev, [name]: undefined } : prev))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nuevos: Partial<Record<Campo, string>> = {}
    if (form.empresa.trim().length < 2) nuevos.empresa = 'Escribe el nombre de tu empresa.'
    if (form.contacto.trim().length < 2) nuevos.contacto = 'Escribe el nombre de la persona de contacto.'
    if (!/^\+?[\d\s]{6,15}$/.test(form.telefono.trim())) nuevos.telefono = 'Escribe un teléfono válido.'
    if (form.ruc.trim() && !/^\d{11}$/.test(form.ruc.trim())) nuevos.ruc = 'El RUC tiene 11 dígitos.'
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    const lineas = [
      `Empresa: ${form.empresa}`,
      form.ruc && `RUC: ${form.ruc}`,
      `Contacto: ${form.contacto}`,
      `Teléfono: ${form.telefono}`,
      form.correo && `Correo: ${form.correo}`,
      form.servicio && `Servicio de interés: ${form.servicio}`,
      form.mensaje && `Necesidad: ${form.mensaje}`,
    ].filter(Boolean)
    const texto = `Hola Vivoo, quiero información para mi empresa.\n\n${lineas.join('\n')}`
    window.open(waLink(texto), '_blank', 'noopener,noreferrer')
  }

  const MensajeError = ({ c }: { c: Campo }) =>
    errores[c] ? (
      <p id={`emp-${c}-error`} role="alert" className="text-xs font-medium text-red-600">
        {errores[c]}
      </p>
    ) : null

  const props = (c: Campo) => ({
    id: `emp-${c}`,
    name: c,
    value: form[c],
    onChange,
    'aria-invalid': Boolean(errores[c]),
    'aria-describedby': errores[c] ? `emp-${c}-error` : undefined,
    className: `${campoClaro} ${errores[c] ? 'border-red-400' : 'border-vivoo-mist'}`,
  })

  return (
    <section id="contacto" className="bg-vivoo-cloud py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14 lg:px-8">
        <div>
          <Encabezado etiqueta="Contacto" titulo="Cuéntanos qué necesita" acento="tu empresa">
            Te contactamos para entender tu operación y preparar una propuesta.
          </Encabezado>
          <ul className="mt-8 space-y-3">
            {[
              { Icon: Phone, label: 'Teléfono', value: site.telefono, href: site.telefonoHref },
              { Icon: WhatsAppIcon, label: 'WhatsApp', value: site.whatsappVisible, href: waLink('Hola Vivoo, quiero información para mi empresa.') },
              { Icon: Mail, label: 'Correo', value: site.correo, href: site.correoHref },
            ].map(({ Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 rounded-2xl border border-vivoo-mist bg-white px-4 py-3.5 transition-colors hover:border-vivoo-blue/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vivoo-menta">
                    <Icon width={17} height={17} className="text-vivoo-blue" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-vivoo-ink/55">{label}</span>
                    <span className="block text-sm font-semibold text-vivoo-ink">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-vivoo-mist bg-white p-6 sm:p-8" aria-labelledby="emp-form-titulo">
          <h3 id="emp-form-titulo" className="text-xl font-bold text-vivoo-ink">Solicitar información</h3>
          <p className="mt-1 text-sm text-vivoo-ink/60">Los campos con * son obligatorios.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emp-empresa" className={etiquetaCampo}>Empresa *</label>
              <input {...props('empresa')} autoComplete="organization" maxLength={120} />
              <MensajeError c="empresa" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emp-ruc" className={etiquetaCampo}>RUC</label>
              <input {...props('ruc')} inputMode="numeric" maxLength={11} />
              <MensajeError c="ruc" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emp-contacto" className={etiquetaCampo}>Nombre de contacto *</label>
              <input {...props('contacto')} autoComplete="name" maxLength={80} />
              <MensajeError c="contacto" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emp-telefono" className={etiquetaCampo}>Teléfono *</label>
              <input {...props('telefono')} type="tel" inputMode="tel" autoComplete="tel" maxLength={15} />
              <MensajeError c="telefono" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emp-correo" className={etiquetaCampo}>Correo</label>
              <input {...props('correo')} type="email" autoComplete="email" maxLength={120} placeholder="nombre@empresa.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emp-servicio" className={etiquetaCampo}>Servicio de interés</label>
              <select {...props('servicio')} className={`${props('servicio').className} cursor-pointer`}>
                <option value="">Selecciona una opción</option>
                {interes.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="emp-mensaje" className={etiquetaCampo}>¿Qué necesitas?</label>
              <textarea {...props('mensaje')} rows={4} maxLength={800} className={`${props('mensaje').className} resize-y`}
                placeholder="Sedes a conectar, capacidad estimada, servicios que usas hoy…" />
            </div>
          </div>

          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-vivoo-ink py-3.5 text-sm font-bold text-white transition-colors hover:bg-vivoo-blue">
            <WhatsAppIcon width={17} height={17} />
            Enviar por WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-vivoo-ink/55">
            Se abrirá WhatsApp con los datos de tu empresa para que envíes el mensaje.
          </p>
        </form>
      </div>
    </section>
  )
}

export default function CorporatePage() {
  return (
    <>
      <Hero />

      {/* Servicios */}
      <section id="servicios" className="bg-vivoo-cloud py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Encabezado etiqueta="Servicios" titulo="Conectividad para cada" acento="parte de tu operación">
            Los combinamos según lo que necesitas, desde una oficina hasta varias sedes.
          </Encabezado>
          <ul className="mt-10 grid border-t border-vivoo-mist sm:grid-cols-2 sm:gap-x-12">
            {servicios.map(({ Icon, title, description }) => (
              <li key={title} className="flex gap-5 border-b border-vivoo-mist py-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vivoo-menta">
                  <Icon size={19} className="text-vivoo-blue" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-vivoo-ink">{title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-vivoo-ink/65">{description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Pendiente>
              velocidades, precios, SLA, direcciones IP y condiciones de cada servicio corporativo
              (los proporcionará Rolando).
            </Pendiente>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Encabezado etiqueta="Beneficios" acento="Por qué" estiloAcento="recuadro" titulo="trabajar con un operador local" />
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {beneficios.map(({ Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vivoo-menta">
                  <Icon size={19} className="text-vivoo-blue" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-vivoo-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-vivoo-ink/65">{description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Pendiente>
              condiciones de soporte (tiempos de atención, monitoreo, ejecutivo asignado, SLA) y
              facturación electrónica a nombre de la empresa. No publicar hasta que Rolando las
              confirme.
            </Pendiente>
          </div>
        </div>
      </section>

      {/* Soluciones */}
      <section id="soluciones" className="bg-vivoo-cloud py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-vivoo-ink p-7 shadow-[0_0_24px_4px_rgba(44,229,201,0.14)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center">
              <Encabezado tono="oscuro" etiqueta="Soluciones" titulo="Sin planes cerrados:" acento="una propuesta para tu empresa">
                Dos empresas del mismo tamaño pueden necesitar enlaces muy distintos. Por eso
                primero entendemos tu operación y después te proponemos la solución.
              </Encabezado>
              <div className="grid gap-3">
                {[
                  { label: 'Nos cuentas', items: ['Cómo opera tu empresa', 'Qué sedes quieres conectar'] },
                  { label: 'Definimos contigo', items: ['Capacidad', 'Enlaces entre locales', 'Equipos'] },
                  { label: 'Te proponemos', items: ['La combinación de servicios que tu operación necesita'] },
                ].map(({ label, items }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-sm font-semibold text-vivoo-signal">{label}</p>
                    <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                      {items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/85">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {solucionesPorTipo.length > 0 && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-vivoo-ink">Soluciones por tipo de empresa</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {solucionesPorTipo.map(s => (
                  <article key={s.title} className="rounded-3xl border border-vivoo-mist bg-white p-6">
                    <h4 className="text-base font-bold text-vivoo-ink">{s.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-vivoo-ink/65">{s.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6">
            <Pendiente>
              soluciones por tipo de empresa (por ejemplo: pequeñas empresas, comercios, oficinas,
              empresas con varias sedes). Completar <code>solucionesPorTipo</code> en
              CorporatePage.tsx con la información de Rolando; la sección aparece sola.
            </Pendiente>
          </div>
        </div>
      </section>

      <Contacto />
    </>
  )
}
