import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCopy,
  FileText,
  Info,
  Mail,
  MapPin,
  MessageSquareWarning,
  Phone,
  Send,
  Smartphone,
  UserRound,
  IdCard,
  Headset,
  Scale,
} from 'lucide-react'
import { site, waLink } from '../config/site'
import { Pendiente, WhatsAppIcon } from '../components/ui'
import ConsultaReclamo from '../components/ConsultaReclamo'
import { api, ApiError } from '../lib/api'

/** Lo que conviene saber antes de reclamar, con la norma que lo respalda. */
const consideraciones: { texto: string; norma?: string }[] = [
  {
    texto: 'Responderemos tu reclamo en un plazo máximo de 15 días hábiles.',
    norma: 'D.S. N° 011-2011-PCM, modificado por D.S. N° 101-2022-PCM',
  },
  {
    texto:
      'La velocidad mínima garantizada es el 70% de la contratada. Mídela conectado por cable: el WiFi y los equipos pueden reducirla.',
    norma: 'Ley N° 31207',
  },
  {
    texto:
      'Completa todos los datos obligatorios y describe hechos concretos: fecha, servicio afectado y lo que ocurrió. Sin esos datos no podemos ubicar tu servicio.',
  },
  {
    texto: 'La información que registres debe ser veraz.',
    norma: 'Ley N° 29571, Código de Protección y Defensa del Consumidor',
  },
]

type ComplaintForm = {
  tipo: 'RECLAMO' | 'QUEJA'
  nombres: string
  apellidos: string
  tipoDocumento: string
  documento: string
  celular: string
  correo: string
  direccion: string
  codigoCliente: string
  servicio: string
  montoReclamado: string
  detalle: string
  pedido: string
  aceptaTerminos: boolean
}

type Errores = Partial<Record<keyof ComplaintForm, string>>

const documentTypes = ['DNI', 'CE', 'Pasaporte', 'RUC']

const servicios = [
  'Internet fibra óptica',
  'TV digital',
  'Cámaras de seguridad IP',
  'Instalación o activación',
  'Facturación o cobro',
  'Otro',
]

const initialForm: ComplaintForm = {
  tipo: 'RECLAMO',
  nombres: '',
  apellidos: '',
  tipoDocumento: '',
  documento: '',
  celular: '',
  correo: '',
  direccion: '',
  codigoCliente: '',
  servicio: '',
  montoReclamado: '',
  detalle: '',
  pedido: '',
  aceptaTerminos: false,
}

const tiposReclamo = [
  {
    valor: 'RECLAMO' as const,
    titulo: 'Reclamo',
    descripcion: 'Disconformidad con el servicio contratado o con un cobro.',
  },
  {
    valor: 'QUEJA' as const,
    titulo: 'Queja',
    descripcion: 'Malestar por la atención recibida, no vinculado al servicio en sí.',
  },
]

/**
 * Valida el formulario en el cliente.
 *
 * Es la única validación existente por ahora: esta vista todavía no
 * envía nada al backend, así que las reglas deberán replicarse en el
 * servidor cuando se conecte el endpoint.
 */
function validar(form: ComplaintForm): Errores {
  const errores: Errores = {}

  if (form.nombres.trim().length < 2) errores.nombres = 'Ingresa tus nombres.'
  if (form.apellidos.trim().length < 2) errores.apellidos = 'Ingresa tus apellidos.'
  if (!form.tipoDocumento) errores.tipoDocumento = 'Selecciona el tipo de documento.'

  if (!form.documento.trim()) {
    errores.documento = 'Ingresa el número de documento.'
  } else if (form.tipoDocumento === 'DNI' && !/^\d{8}$/.test(form.documento.trim())) {
    errores.documento = 'El DNI debe tener 8 dígitos.'
  } else if (form.tipoDocumento === 'RUC' && !/^\d{11}$/.test(form.documento.trim())) {
    errores.documento = 'El RUC debe tener 11 dígitos.'
  } else if (
    (form.tipoDocumento === 'CE' || form.tipoDocumento === 'Pasaporte') &&
    !/^[A-Za-z0-9-]{6,20}$/.test(form.documento.trim())
  ) {
    errores.documento = 'El documento ingresado es muy corto.'
  }

  if (!/^9\d{8}$/.test(form.celular.trim())) {
    errores.celular = 'Ingresa un celular de 9 dígitos que empiece en 9.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.correo.trim())) {
    errores.correo = 'Ingresa un correo electrónico válido.'
  }
  if (form.direccion.trim().length < 5) {
    errores.direccion = 'Ingresa la dirección donde recibes el servicio.'
  }
  if (!form.servicio) errores.servicio = 'Selecciona el servicio afectado.'

  if (form.montoReclamado && !/^\d+(\.\d{1,2})?$/.test(form.montoReclamado.trim())) {
    errores.montoReclamado = 'Ingresa un monto válido, por ejemplo 59.90'
  }

  if (form.detalle.trim().length < 20) {
    errores.detalle = 'Describe el problema con al menos 20 caracteres.'
  }
  if (form.pedido.trim().length < 10) {
    errores.pedido = 'Indica qué solución esperas de nosotros.'
  }
  if (!form.aceptaTerminos) {
    errores.aceptaTerminos = 'Debes confirmar que la información es veraz.'
  }

  return errores
}

const fechaLarga = (iso: string) =>
  new Date(iso).toLocaleDateString('es-PE', {
    timeZone: 'America/Lima',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

export default function ComplaintBook() {
  const [form, setForm] = useState<ComplaintForm>(initialForm)
  const [errores, setErrores] = useState<Errores>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [registro, setRegistro] = useState<{ codigo: string; fecha: string; vence: string } | null>(null)
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null)
  // Campo trampa para bots: invisible para las personas, siempre vacío.
  const [sitioWeb, setSitioWeb] = useState('')
  const [copiado, setCopiado] = useState(false)

  const fechaHoy = useMemo(
    () =>
      new Date().toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    [],
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Limpia el error del campo apenas el usuario lo corrige.
    setErrores(prev => (prev[name as keyof ComplaintForm] ? { ...prev, [name]: undefined } : prev))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (enviando) return

    const nuevosErrores = validar(form)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      document.querySelector('[data-error="true"]')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      return
    }

    setEnviando(true)
    setErrorEnvio(null)

    try {
      const data = await api<{ codigo: string; registradoEn: string; venceEn: string }>('/complaints', {
        method: 'POST',
        body: JSON.stringify({ ...form, sitioWeb }),
      })
      setRegistro({ codigo: data.codigo, fecha: fechaLarga(data.registradoEn), vence: fechaLarga(data.venceEn) })
      setForm(initialForm)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      const e = error instanceof ApiError ? error : new ApiError(0, 'Ocurrió un error inesperado. Inténtalo de nuevo.')
      if (Object.keys(e.errores).length > 0) {
        setErrores(e.errores as Errores)
        window.requestAnimationFrame(() =>
          document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        )
      }
      setErrorEnvio(e.message)
    } finally {
      setEnviando(false)
    }
  }

  const copiarCodigo = async () => {
    if (!registro) return
    try {
      await navigator.clipboard.writeText(registro.codigo)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 2000)
    } catch {
      // El navegador puede bloquear el portapapeles; el código sigue visible en pantalla.
    }
  }

  const inputStyle = (name: string): React.CSSProperties => {
    const tieneError = Boolean(errores[name as keyof ComplaintForm])
    const activo = focused === name

    return {
      width: '100%',
      background: 'white',
      border: `1px solid ${tieneError ? '#ef4444' : activo ? '#0066ff' : '#e2e8f4'}`,
      borderRadius: '0.75rem',
      padding: '12px 16px',
      color: '#0c0e2a',
      fontSize: 14,
      outline: 'none',
      boxShadow: tieneError
        ? '0 0 0 3px rgba(239,68,68,0.1)'
        : activo
          ? '0 0 0 3px rgba(0,102,255,0.12)'
          : 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }
  }

  const labelClass = 'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide'
  const labelStyle: React.CSSProperties = { color: 'rgba(12,14,42,0.5)' }

  const MensajeError = ({ campo }: { campo: keyof ComplaintForm }) =>
    errores[campo] ? (
      <p className="text-xs" style={{ color: '#ef4444' }} role="alert">
        {errores[campo]}
      </p>
    ) : null

  return (
    <div style={{ background: '#f5f7fc', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden rounded-b-[2rem]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0066ff_0%,#3540cc_45%,#6a1b9a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#4d94ff59,transparent_45%)]" />

        <div className="relative z-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#c9dcff' }}
          >
            {site.nombreLegal}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Libro de Reclamaciones
          </h1>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Registra aquí tu reclamo o queja como consumidor, según el Código de Protección y
            Defensa del Consumidor (Ley N° 29571).
          </p>

          {/* Sello de hoja */}
          <div
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            <CalendarDays size={13} style={{ color: '#c9dcff' }} />
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Hoja de reclamación · {fechaHoy}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Comprobante de registro */}
        {registro && (
          <div
            className="animate-fade-up rounded-3xl p-6 sm:p-8 mb-8"
            style={{ background: '#0c0e2a', boxShadow: '0 0 24px 4px rgba(77,148,255,0.18)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div
                className="flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-full"
                style={{ background: 'rgba(77,148,255,0.15)' }}
              >
                <CheckCircle2 size={26} style={{ color: '#4d94ff' }} />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1.5">
                  Tu hoja de reclamación quedó registrada
                </h2>
                <p className="text-sm leading-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Registrada el {registro.fecha}. Te responderemos a más tardar el{' '}
                  <strong className="font-semibold text-white">{registro.vence}</strong>. Guarda el
                  número de hoja para consultar su estado.
                </p>
              </div>

              <div
                className="flex items-center gap-3 rounded-2xl px-5 py-4"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    Código
                  </p>
                  <p className="text-lg font-extrabold text-white tracking-wide">{registro.codigo}</p>
                </div>
                <button
                  type="button"
                  onClick={copiarCodigo}
                  aria-label="Copiar código de seguimiento"
                  className="flex items-center justify-center rounded-full transition-colors"
                  style={{
                    width: 36,
                    height: 36,
                    background: copiado ? '#4d94ff' : 'rgba(255,255,255,0.1)',
                    color: copiado ? '#0c0e2a' : 'white',
                  }}
                >
                  {copiado ? <BadgeCheck size={16} /> : <ClipboardCopy size={15} />}
                </button>
              </div>
            </div>

            <div
              className="flex items-start gap-2.5 mt-6 pt-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Info size={15} style={{ color: '#c9dcff', flexShrink: 0, marginTop: 2 }} />
              <p className="text-xs leading-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Te enviamos una copia de la hoja a tu correo. Si no la ves en unos minutos, revisa la
                carpeta de spam o escríbenos al {site.telefono} citando el número de hoja.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-3xl p-6 sm:p-8 space-y-6"
            style={{ background: 'white', border: '1px solid #e2e8f4' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ background: '#f5f7fc' }}
              >
                <MessageSquareWarning size={18} style={{ color: '#0066ff' }} />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: '#0c0e2a' }}>
                  Registrar hoja de reclamación
                </h2>
                <p className="text-sm" style={{ color: 'rgba(12,14,42,0.55)' }}>
                  Los campos marcados con{' '}
                  <span style={{ color: '#ef4444' }}>*</span> son obligatorios.
                </p>
              </div>
            </div>

            {/* Datos del proveedor: los exige la hoja de reclamación */}
            <p className="rounded-2xl bg-vivoo-cloud px-4 py-3 text-sm text-vivoo-ink/70">
              Proveedor: <strong className="font-semibold text-vivoo-ink">{site.nombreLegal}</strong>
              {site.ruc && <> · RUC {site.ruc}</>} · {site.ciudad}
            </p>
            {!site.ruc && (
              <Pendiente>
                el RUC de la empresa, que la hoja de reclamación debe mostrar. Agrégalo en
                <code> config/site.ts</code>.
              </Pendiente>
            )}

            {/* Tipo de solicitud */}
            <fieldset className="space-y-2.5">
              <legend className={labelClass} style={labelStyle}>
                <FileText size={12} />
                Tipo de solicitud <span style={{ color: '#ef4444' }}>*</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tiposReclamo.map(({ valor, titulo, descripcion }) => {
                  const seleccionado = form.tipo === valor
                  return (
                    <label
                      key={valor}
                      className="cursor-pointer rounded-2xl p-4 transition-all"
                      style={{
                        border: `1px solid ${seleccionado ? '#0066ff' : '#e2e8f4'}`,
                        background: seleccionado ? '#f5f9ff' : 'white',
                        boxShadow: seleccionado ? '0 0 0 3px rgba(0,102,255,0.1)' : 'none',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="tipo"
                          value={valor}
                          checked={seleccionado}
                          onChange={handleChange}
                          className="accent-[#0066ff]"
                        />
                        <span className="text-sm font-bold" style={{ color: '#0c0e2a' }}>
                          {titulo}
                        </span>
                      </div>
                      <p className="text-xs leading-5 pl-6" style={{ color: 'rgba(12,14,42,0.55)' }}>
                        {descripcion}
                      </p>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            {/* Datos del consumidor */}
            <div className="space-y-4">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.15em] pb-2"
                style={{ color: '#0066ff', borderBottom: '1px solid #e2e8f4' }}
              >
                1. Datos del consumidor
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5" data-error={Boolean(errores.nombres)}>
                  <label className={labelClass} style={labelStyle}>
                    <UserRound size={12} />Nombres <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    name="nombres" value={form.nombres} onChange={handleChange}
                    onFocus={() => setFocused('nombres')} onBlur={() => setFocused(null)}
                    placeholder="Tus nombres" maxLength={60} style={inputStyle('nombres')}
                    aria-invalid={Boolean(errores.nombres)}
                  />
                  <MensajeError campo="nombres" />
                </div>

                <div className="flex flex-col gap-1.5" data-error={Boolean(errores.apellidos)}>
                  <label className={labelClass} style={labelStyle}>
                    <UserRound size={12} />Apellidos <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    name="apellidos" value={form.apellidos} onChange={handleChange}
                    onFocus={() => setFocused('apellidos')} onBlur={() => setFocused(null)}
                    placeholder="Tus apellidos" maxLength={60} style={inputStyle('apellidos')}
                    aria-invalid={Boolean(errores.apellidos)}
                  />
                  <MensajeError campo="apellidos" />
                </div>

                <div className="flex flex-col gap-1.5" data-error={Boolean(errores.tipoDocumento)}>
                  <label className={labelClass} style={labelStyle}>
                    <IdCard size={12} />Tipo de documento <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}
                    onFocus={() => setFocused('tipoDocumento')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('tipoDocumento'), cursor: 'pointer' }}
                    aria-invalid={Boolean(errores.tipoDocumento)}
                  >
                    <option value="">Selecciona una opción</option>
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <MensajeError campo="tipoDocumento" />
                </div>

                <div className="flex flex-col gap-1.5" data-error={Boolean(errores.documento)}>
                  <label className={labelClass} style={labelStyle}>
                    <FileText size={12} />N° de documento <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    name="documento" value={form.documento} onChange={handleChange}
                    onFocus={() => setFocused('documento')} onBlur={() => setFocused(null)}
                    placeholder="Número del documento" maxLength={20} inputMode="numeric"
                    style={inputStyle('documento')} aria-invalid={Boolean(errores.documento)}
                  />
                  <MensajeError campo="documento" />
                </div>

                <div className="flex flex-col gap-1.5" data-error={Boolean(errores.celular)}>
                  <label className={labelClass} style={labelStyle}>
                    <Smartphone size={12} />Celular <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    name="celular" type="tel" value={form.celular} onChange={handleChange}
                    onFocus={() => setFocused('celular')} onBlur={() => setFocused(null)}
                    placeholder="9XXXXXXXX" maxLength={9} inputMode="numeric"
                    style={inputStyle('celular')} aria-invalid={Boolean(errores.celular)}
                  />
                  <MensajeError campo="celular" />
                </div>

                <div className="flex flex-col gap-1.5" data-error={Boolean(errores.correo)}>
                  <label className={labelClass} style={labelStyle}>
                    <Mail size={12} />Correo electrónico <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    name="correo" type="email" value={form.correo} onChange={handleChange}
                    onFocus={() => setFocused('correo')} onBlur={() => setFocused(null)}
                    placeholder="tu@email.com" maxLength={120}
                    style={inputStyle('correo')} aria-invalid={Boolean(errores.correo)}
                  />
                  <MensajeError campo="correo" />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2" data-error={Boolean(errores.direccion)}>
                  <label className={labelClass} style={labelStyle}>
                    <MapPin size={12} />Dirección del servicio <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    name="direccion" value={form.direccion} onChange={handleChange}
                    onFocus={() => setFocused('direccion')} onBlur={() => setFocused(null)}
                    placeholder="Calle, número, distrito" maxLength={160}
                    style={inputStyle('direccion')} aria-invalid={Boolean(errores.direccion)}
                  />
                  <MensajeError campo="direccion" />
                </div>
              </div>
            </div>

            {/* Identificación del servicio */}
            <div className="space-y-4">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.15em] pb-2"
                style={{ color: '#0066ff', borderBottom: '1px solid #e2e8f4' }}
              >
                2. Servicio contratado
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5" data-error={Boolean(errores.servicio)}>
                  <label className={labelClass} style={labelStyle}>
                    <Building2 size={12} />Servicio afectado <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="servicio" value={form.servicio} onChange={handleChange}
                    onFocus={() => setFocused('servicio')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('servicio'), cursor: 'pointer' }}
                    aria-invalid={Boolean(errores.servicio)}
                  >
                    <option value="">Selecciona el servicio</option>
                    {servicios.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <MensajeError campo="servicio" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass} style={labelStyle}>
                    <IdCard size={12} />Código de cliente
                    <span
                      className="ml-auto text-xs font-normal normal-case tracking-normal"
                      style={{ color: 'rgba(12,14,42,0.35)' }}
                    >
                      Opcional
                    </span>
                  </label>
                  <input
                    name="codigoCliente" value={form.codigoCliente} onChange={handleChange}
                    onFocus={() => setFocused('codigoCliente')} onBlur={() => setFocused(null)}
                    placeholder="Aparece en tu recibo" maxLength={30}
                    style={inputStyle('codigoCliente')}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2" data-error={Boolean(errores.montoReclamado)}>
                  <label className={labelClass} style={labelStyle}>
                    <FileText size={12} />Monto reclamado (S/)
                    <span
                      className="ml-auto text-xs font-normal normal-case tracking-normal"
                      style={{ color: 'rgba(12,14,42,0.35)' }}
                    >
                      Solo si tu reclamo es por un cobro
                    </span>
                  </label>
                  <input
                    name="montoReclamado" value={form.montoReclamado} onChange={handleChange}
                    onFocus={() => setFocused('montoReclamado')} onBlur={() => setFocused(null)}
                    placeholder="0.00" maxLength={10} inputMode="decimal"
                    style={inputStyle('montoReclamado')} aria-invalid={Boolean(errores.montoReclamado)}
                  />
                  <MensajeError campo="montoReclamado" />
                </div>
              </div>
            </div>

            {/* Detalle */}
            <div className="space-y-4">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.15em] pb-2"
                style={{ color: '#0066ff', borderBottom: '1px solid #e2e8f4' }}
              >
                3. Detalle y pedido
              </p>

              <div className="flex flex-col gap-1.5" data-error={Boolean(errores.detalle)}>
                <label className={labelClass} style={labelStyle}>
                  <FileText size={12} />
                  Detalle del {form.tipo === 'QUEJA' ? 'malestar' : 'reclamo'}{' '}
                  <span style={{ color: '#ef4444' }}>*</span>
                  <span
                    className="ml-auto text-xs font-normal normal-case tracking-normal tabular-nums"
                    style={{ color: 'rgba(12,14,42,0.35)' }}
                  >
                    {form.detalle.length}/2000
                  </span>
                </label>
                <textarea
                  name="detalle" value={form.detalle}
                  onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                  onFocus={() => setFocused('detalle')} onBlur={() => setFocused(null)}
                  placeholder="Describe qué pasó, desde cuándo, y cómo te afectó."
                  rows={5} maxLength={2000}
                  style={{ ...inputStyle('detalle'), resize: 'vertical' }}
                  aria-invalid={Boolean(errores.detalle)}
                />
                <MensajeError campo="detalle" />
              </div>

              <div className="flex flex-col gap-1.5" data-error={Boolean(errores.pedido)}>
                <label className={labelClass} style={labelStyle}>
                  <Send size={12} />Pedido del consumidor <span style={{ color: '#ef4444' }}>*</span>
                  <span
                    className="ml-auto text-xs font-normal normal-case tracking-normal tabular-nums"
                    style={{ color: 'rgba(12,14,42,0.35)' }}
                  >
                    {form.pedido.length}/500
                  </span>
                </label>
                <textarea
                  name="pedido" value={form.pedido}
                  onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                  onFocus={() => setFocused('pedido')} onBlur={() => setFocused(null)}
                  placeholder="Ej. que se corrija el cobro del recibo de marzo y se restablezca la velocidad contratada."
                  rows={3} maxLength={500}
                  style={{ ...inputStyle('pedido'), resize: 'vertical' }}
                  aria-invalid={Boolean(errores.pedido)}
                />
                <MensajeError campo="pedido" />
              </div>
            </div>

            {/* Declaración */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: '#f5f7fc',
                border: `1px solid ${errores.aceptaTerminos ? '#ef4444' : '#e2e8f4'}`,
              }}
              data-error={Boolean(errores.aceptaTerminos)}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.aceptaTerminos}
                  onChange={e => {
                    setForm(prev => ({ ...prev, aceptaTerminos: e.target.checked }))
                    setErrores(prev => ({ ...prev, aceptaTerminos: undefined }))
                  }}
                  className="mt-0.5 accent-[#0066ff]"
                  style={{ width: 16, height: 16, flexShrink: 0 }}
                />
                <span className="text-xs leading-6" style={{ color: 'rgba(12,14,42,0.7)' }}>
                  Declaro que la información proporcionada es veraz y autorizo a {site.nombreLegal} a
                  usar mis datos personales únicamente para atender esta solicitud, conforme a la Ley
                  N° 29733 de Protección de Datos Personales.
                </span>
              </label>
              <MensajeError campo="aceptaTerminos" />
            </div>

            {/* Campo trampa para bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Sitio web
                <input tabIndex={-1} autoComplete="off" value={sitioWeb} onChange={e => setSitioWeb(e.target.value)} />
              </label>
            </div>

            {errorEnvio && (
              <p role="alert" className="aparece rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
                {errorEnvio}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="presion inline-flex w-full items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold"
              style={{
                background: enviando ? 'rgba(12,14,42,0.35)' : '#0c0e2a',
                color: 'white',
                cursor: enviando ? 'not-allowed' : 'pointer',
                transform: enviando ? 'none' : undefined,
              }}
            >
              <Send size={16} />
              {enviando ? 'Registrando…' : 'Registrar reclamo'}
            </button>

            <p className="text-xs text-center leading-6" style={{ color: 'rgba(12,14,42,0.45)' }}>
              La formulación del reclamo no impide acudir a otras vías de solución de controversias
              ni es requisito previo para interponer una denuncia ante el INDECOPI. Si tu reclamo es
              por el servicio de telecomunicaciones y no estás conforme con nuestra respuesta, puedes
              apelarla ante el TRASU.
            </p>
          </form>

          {/* Antes de reclamar: soporte primero y marco legal breve */}
          <aside className="order-first space-y-4 lg:order-none lg:sticky lg:top-28 lg:self-start" aria-label="Antes de registrar tu reclamo">
            <div className="relative overflow-hidden rounded-3xl bg-vivoo-ink p-6">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_0%,rgba(106,27,154,0.5),transparent_60%)]"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                  <Headset size={20} aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-white">¿Tu internet o TV falla?</h2>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Escribe primero a soporte técnico, disponible 24/7. La mayoría de fallas se resuelven
                  en la misma conversación, sin trámites.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={waLink('Hola Vivoo, tengo una falla con mi servicio.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="presion inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-vivoo-ink hover:bg-vivoo-signal-dim focus-visible:outline-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-vivoo-blue" />
                    Escribir a soporte
                  </a>
                  <a
                    href={site.telefonoHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-white"
                  >
                    <Phone size={15} aria-hidden="true" />
                    Llamar al {site.telefono}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-vivoo-mist bg-white p-6">
              <h2 className="text-base font-bold text-vivoo-ink">Antes de registrar</h2>
              <ul className="mt-4 space-y-3.5 text-sm leading-6 text-vivoo-ink/70">
                {consideraciones.map(({ texto, norma }) => (
                  <li key={texto} className="flex gap-2.5">
                    <Scale size={15} className="mt-1 shrink-0 text-vivoo-purple" aria-hidden="true" />
                    <span>
                      {texto}
                      {norma && <span className="mt-0.5 block text-xs text-vivoo-ink/45">{norma}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <ConsultaReclamo />
      </div>
    </div>
  )
}
