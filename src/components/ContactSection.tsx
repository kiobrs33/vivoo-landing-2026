import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Clock, Mail, Phone } from 'lucide-react'
import { site, waLink } from '../config/site'
import { distritos } from '../config/distritos'
import { nombreCompleto, planes } from '../config/planes'
import { FacebookIcon, TikTokIcon, WhatsAppIcon } from './ui'

const serviciosDeInteres = [
  ...planes.map(p => `${nombreCompleto(p)} (S/ ${p.precio})`),
  'Aún no sé qué plan elegir',
  'Otra consulta',
]

const inicial = {
  nombres: '',
  apellidos: '',
  telefono: '',
  correo: '',
  distrito: '',
  servicio: '',
  mensaje: '',
}

type Campo = keyof typeof inicial
type Errores = Partial<Record<Campo, string>>

function validar(f: typeof inicial): Errores {
  const e: Errores = {}
  if (f.nombres.trim().length < 2) e.nombres = 'Escribe tu nombre.'
  if (!/^\+?[\d\s]{6,15}$/.test(f.telefono.trim())) e.telefono = 'Escribe un número de teléfono válido.'
  if (f.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.correo.trim())) {
    e.correo = 'Revisa el correo: parece incompleto.'
  }
  return e
}

const campo =
  'w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition-[border-color,box-shadow] duration-200 focus:border-vivoo-signal focus:shadow-[0_0_0_3px_rgba(77,148,255,0.2)] aria-[invalid=true]:border-red-300'
const etiqueta = 'text-xs font-semibold uppercase tracking-wide text-white/70'

export default function ContactSection() {
  const [form, setForm] = useState(inicial)
  const [errores, setErrores] = useState<Errores>({})

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrores(prev => (prev[name as Campo] ? { ...prev, [name]: undefined } : prev))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nuevos = validar(form)
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    const lineas = [
      `Nombre: ${`${form.nombres} ${form.apellidos}`.trim()}`,
      `Teléfono: ${form.telefono}`,
      form.correo && `Correo: ${form.correo}`,
      form.distrito && `Distrito: ${form.distrito}`,
      form.servicio && `Me interesa: ${form.servicio}`,
      form.mensaje && `Mensaje: ${form.mensaje}`,
    ].filter(Boolean)
    const texto = `Hola Vivoo, quiero información para contratar internet en mi hogar.\n\n${lineas.join('\n')}`
    window.open(waLink(texto), '_blank', 'noopener,noreferrer')
  }

  const MensajeError = ({ c }: { c: Campo }) =>
    errores[c] ? (
      <p id={`contacto-${c}-error`} className="text-xs font-medium text-red-200" role="alert">
        {errores[c]}
      </p>
    ) : null

  const canales = [
    { Icon: Phone, label: 'Teléfono', value: site.telefono, href: site.telefonoHref, externo: false },
    { Icon: WhatsAppIcon, label: 'WhatsApp', value: site.whatsappVisible, href: waLink(), externo: true },
    { Icon: Mail, label: 'Correo', value: site.correo, href: site.correoHref, externo: false },
    { Icon: FacebookIcon, label: 'Facebook', value: 'Vivoo Telecom', href: site.facebook, externo: true },
    { Icon: TikTokIcon, label: 'TikTok', value: '@vivoo.net.pe', href: site.tiktok, externo: true },
    { Icon: Clock, label: 'Horario de atención', value: `${site.horarioAtencion} · Soporte 24/7`, href: undefined, externo: false },
  ]

  return (
    <section id="contacto" className="bg-vivoo-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0066ff_0%,#3540cc_45%,#6a1b9a_100%)] px-5 py-10 sm:px-10 sm:py-14">
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-vivoo-signal-dim">
                Contacto
              </p>
              <h2 className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl">
                Hablemos de tu conexión
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75">
                Escríbenos por el canal que prefieras, o déjanos tus datos y te respondemos por
                WhatsApp.
              </p>

              <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
                {canales.map(({ Icon, label, value, href, externo }) => {
                  const contenido = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                        <Icon width={17} height={17} className="text-white" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs text-white/60">{label}</span>
                        <span className="block text-sm font-semibold text-white">{value}</span>
                      </span>
                    </>
                  )
                  const clase = 'group flex items-center gap-4 py-3.5 focus-visible:outline-white'
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={clase}>
                          {contenido}
                        </a>
                      ) : (
                        <div className={clase}>{contenido}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl bg-vivoo-ink/30 p-5 sm:p-7"
              aria-labelledby="contacto-form-titulo"
            >
              <h3 id="contacto-form-titulo" className="text-lg font-bold text-white">
                Déjanos tus datos
              </h3>
              <p className="mt-1 text-sm text-white/65">
                Solo el nombre y el teléfono son obligatorios.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-nombres" className={etiqueta}>Nombres *</label>
                  <input id="contacto-nombres" name="nombres" autoComplete="given-name" value={form.nombres} onChange={onChange}
                    maxLength={60} className={campo} aria-invalid={Boolean(errores.nombres)}
                    aria-describedby={errores.nombres ? 'contacto-nombres-error' : undefined} />
                  <MensajeError c="nombres" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-apellidos" className={etiqueta}>Apellidos</label>
                  <input id="contacto-apellidos" name="apellidos" autoComplete="family-name" value={form.apellidos} onChange={onChange}
                    maxLength={60} className={campo} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-telefono" className={etiqueta}>Teléfono *</label>
                  <input id="contacto-telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" value={form.telefono}
                    onChange={onChange} maxLength={15} placeholder="9XX XXX XXX" className={campo}
                    aria-invalid={Boolean(errores.telefono)}
                    aria-describedby={errores.telefono ? 'contacto-telefono-error' : undefined} />
                  <MensajeError c="telefono" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-correo" className={etiqueta}>Correo</label>
                  <input id="contacto-correo" name="correo" type="email" autoComplete="email" value={form.correo} onChange={onChange}
                    maxLength={120} placeholder="tu@correo.com" className={campo} aria-invalid={Boolean(errores.correo)}
                    aria-describedby={errores.correo ? 'contacto-correo-error' : undefined} />
                  <MensajeError c="correo" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-distrito" className={etiqueta}>Distrito</label>
                  <select id="contacto-distrito" name="distrito" value={form.distrito} onChange={onChange} className={`${campo} cursor-pointer`}>
                    <option value="" className="text-vivoo-ink">Selecciona tu distrito</option>
                    {distritos.map(d => <option key={d} value={d} className="text-vivoo-ink">{d}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-servicio" className={etiqueta}>Servicio de interés</label>
                  <select id="contacto-servicio" name="servicio" value={form.servicio} onChange={onChange} className={`${campo} cursor-pointer`}>
                    <option value="" className="text-vivoo-ink">Selecciona una opción</option>
                    {serviciosDeInteres.map(s => <option key={s} value={s} className="text-vivoo-ink">{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="contacto-mensaje" className={etiqueta}>Mensaje</label>
                  <textarea id="contacto-mensaje" name="mensaje" value={form.mensaje} onChange={onChange} rows={3} maxLength={500}
                    placeholder="Cuéntanos qué necesitas" className={`${campo} resize-y`} />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-vivoo-signal py-3.5 text-sm font-bold text-vivoo-ink transition-colors hover:bg-vivoo-signal-dim focus-visible:outline-white"
              >
                <WhatsAppIcon width={17} height={17} />
                Enviar por WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-white/60">
                Se abrirá WhatsApp con tus datos para que envíes el mensaje.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
