import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpenText,
  Building2,
  ExternalLink,
  FileWarning,
  Gauge,
  Globe,
  Info,
  Landmark,
  Phone,
  Receipt,
  ScrollText,
  ShieldCheck,
  Signature,
  Smartphone,
  Timer,
  UserCheck,
  XCircle,
} from 'lucide-react'
import { osiptel, site } from '../config/site'

const derechos = [
  {
    Icon: Gauge,
    title: 'Velocidad mínima garantizada',
    description:
      'La Ley N° 31207 obliga a las operadoras a entregar como mínimo el 70% de la velocidad de descarga y subida contratada. Si recibes menos de forma sostenida, puedes reclamar.',
  },
  {
    Icon: ScrollText,
    title: 'Información clara antes de contratar',
    description:
      'Antes de firmar debes conocer el precio total con IGV, la velocidad contratada, la duración del contrato y cualquier condición de la promoción. Nada puede quedar en letra chica.',
  },
  {
    Icon: Receipt,
    title: 'Recibo detallado y a tiempo',
    description:
      'Tienes derecho a recibir tu recibo con el desglose de los conceptos cobrados, con una anticipación razonable a la fecha de vencimiento.',
  },
  {
    Icon: XCircle,
    title: 'No pagar lo que no contrataste',
    description:
      'Ningún servicio adicional puede cobrarse sin tu consentimiento previo y expreso. Si aparece un cargo que no autorizaste, puedes reclamarlo y suspender su pago.',
  },
  {
    Icon: FileWarning,
    title: 'Reclamar y recibir un código',
    description:
      'La empresa está obligada a recibir tu reclamo y entregarte un código para hacerle seguimiento. Mientras se resuelve, no puede exigirte el pago del monto reclamado.',
  },
  {
    Icon: Signature,
    title: 'Dar de baja el servicio',
    description:
      'Puedes solicitar la baja en cualquier momento por el mismo canal donde contrataste. La empresa debe procesarla y no puede exigirte trámites presenciales innecesarios.',
  },
  {
    Icon: Smartphone,
    title: 'Portabilidad numérica',
    description:
      'La Ley N° 28999 te permite cambiar de operador conservando tu número telefónico, sin que la empresa que dejas pueda impedirlo ni demorarlo.',
  },
  {
    Icon: ShieldCheck,
    title: 'Protección de tus datos personales',
    description:
      'La Ley N° 29733 protege la información que entregas al contratar. Tus datos solo pueden usarse para los fines que autorizaste.',
  },
]

const normas = [
  {
    codigo: 'Ley N° 31207',
    titulo: 'Velocidad mínima de conexión a Internet',
    detalle:
      'Garantiza el 70% de la velocidad contratada como mínimo y obliga a monitorear la prestación del servicio a favor del usuario.',
  },
  {
    codigo: 'Ley N° 29571',
    titulo: 'Código de Protección y Defensa del Consumidor',
    detalle:
      'Establece la obligación de contar con un Libro de Reclamaciones a disposición del consumidor, en local físico y en canal virtual.',
  },
  {
    codigo: 'Ley N° 27336',
    titulo: 'Funciones y facultades de OSIPTEL',
    detalle:
      'Define las competencias del organismo regulador para supervisar, fiscalizar y sancionar a las empresas de telecomunicaciones.',
  },
  {
    codigo: 'Ley N° 28999',
    titulo: 'Portabilidad numérica',
    detalle: 'Reconoce el derecho del usuario a conservar su número al cambiar de operador.',
  },
  {
    codigo: 'Res. N° 099-2022-CD/OSIPTEL',
    titulo: 'Texto Único Ordenado del Reglamento para la Atención de Gestiones y Reclamos de Usuarios',
    detalle:
      'Regula el procedimiento de reclamos: materias reclamables, plazos para resolver, medios de presentación y la apelación ante el TRASU.',
  },
  {
    codigo: 'Res. N° 132-2025-CD/OSIPTEL',
    titulo: 'Norma de las Condiciones de Uso de los Servicios Públicos de Telecomunicaciones',
    detalle:
      'Fija las reglas de contratación, suspensión, baja y atención al usuario que toda operadora debe cumplir. Vigente desde el 26 de marzo de 2026.',
  },
  {
    codigo: 'Res. N° 214-2024-CD/OSIPTEL',
    titulo: 'Reglamento General de Calidad de los Servicios Públicos de Telecomunicaciones',
    detalle:
      'Establece los indicadores de calidad que las empresas deben cumplir, como la velocidad mínima en el internet fijo.',
  },
  {
    codigo: 'Ley N° 29733',
    titulo: 'Protección de Datos Personales',
    detalle:
      'Regula el tratamiento de los datos personales que el usuario entrega al contratar el servicio.',
  },
]

const materias = [
  'Facturación: montos que no reconoces en tu recibo',
  'Cobro: pagos ya realizados que se siguen exigiendo',
  'Calidad e idoneidad del servicio',
  'Veracidad de la información brindada por la empresa',
  'Falta de entrega del recibo o de la información de pago',
  'Incumplimiento de ofertas o promociones',
  'Suspensión, corte o baja del servicio',
  'Instalación o activación del servicio',
  'Traslado del servicio a otra dirección',
  'Contratación no solicitada',
]

const pasos = [
  {
    step: '01',
    title: 'Presenta tu reclamo',
    detail:
      'Preséntalo ante la empresa por sus canales de atención: teléfono, WhatsApp o correo. No necesitas pagar el monto reclamado para presentarlo.',
  },
  {
    step: '02',
    title: 'Recibe tu código',
    detail:
      'La empresa está obligada a entregarte un código de reclamo en el mismo momento del registro. Guárdalo: con él haces el seguimiento.',
  },
  {
    step: '03',
    title: 'Espera la respuesta',
    detail:
      'Vivoo resuelve en primera instancia dentro del plazo máximo que fija el reglamento, entre 3 y 20 días hábiles según la materia, y te notifica la decisión.',
  },
  {
    step: '04',
    title: 'Apela ante el TRASU',
    detail:
      'Si no estás conforme, puedes apelar y el expediente pasa al Tribunal Administrativo de Solución de Reclamos de Usuarios de OSIPTEL, que decide en segunda y última instancia.',
  },
]

/** Verificados en el TUO del Reglamento de Reclamos (Res. N° 099-2022-CD/OSIPTEL), art. 58 y 70. */
const plazos = [
  { valor: '3 a 20 días hábiles', label: 'Plazo máximo de la empresa para resolver tu reclamo, según la materia' },
  { valor: '15 días hábiles', label: 'Para apelar desde que te notifican la respuesta de la empresa' },
  { valor: '15 a 25 días hábiles', label: 'Plazo del TRASU para resolver la apelación, según la materia' },
  { valor: '1844', label: 'Fono Ayuda de OSIPTEL, para orientarte sobre tu caso' },
]

export default function OsiptelPage() {
  return (
    <div style={{ background: '#f5f7fc' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden rounded-b-[2rem]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a3dff_0%,#3b2fd8_45%,#5c1fb8_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#5b82ff59,transparent_45%)]" />

        <div className="relative z-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#a8e6dd' }}
          >
            Información regulatoria
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ lineHeight: 1.05 }}>
            Tus derechos como
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #2ce5c9, #a8e6dd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              usuario en el Perú
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            OSIPTEL es el organismo que regula y supervisa a las empresas de telecomunicaciones en el
            Perú. Aquí resumimos las normas que nos obligan y lo que puedes exigirnos.
          </p>
        </div>
      </section>

      {/* Plazos clave */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {plazos.map(({ valor, label }) => (
            <div
              key={label}
              className="rounded-3xl p-5"
              style={{ background: 'white', border: '1px solid #e2e8f4' }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full mb-3"
                style={{ background: '#f5f7fc' }}
              >
                <Timer size={16} style={{ color: '#2563eb' }} />
              </div>
              <p className="text-2xl font-extrabold" style={{ color: '#0c0e2a' }}>
                {valor}
              </p>
              <p className="text-xs mt-1 leading-5" style={{ color: 'rgba(12,14,42,0.55)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Derechos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#2563eb' }}
          >
            Qué puedes exigir
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0c0e2a' }}>
            Ocho derechos que la ley te reconoce
          </h2>
          <p className="mt-3 text-sm leading-6" style={{ color: 'rgba(12,14,42,0.6)' }}>
            No son beneficios que la empresa te concede: son obligaciones que la normativa peruana
            impone a todo operador de telecomunicaciones, incluida Vivoo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {derechos.map(({ Icon, title, description }) => (
            <article
              key={title}
              className="flex gap-4 rounded-3xl p-6"
              style={{ background: 'white', border: '1px solid #e2e8f4' }}
            >
              <div
                className="flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-full"
                style={{ background: '#e6f8f5' }}
              >
                <Icon size={19} style={{ color: '#2563eb' }} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1.5" style={{ color: '#0c0e2a' }}>
                  {title}
                </h3>
                <p className="text-sm leading-6" style={{ color: 'rgba(12,14,42,0.65)' }}>
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Marco normativo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-2xl mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#2563eb' }}
          >
            Marco normativo
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0c0e2a' }}>
            Las normas que nos obligan
          </h2>
          <p className="mt-3 text-sm leading-6" style={{ color: 'rgba(12,14,42,0.6)' }}>
            Leyes y resoluciones vigentes que regulan la prestación del servicio de internet fijo en
            el Perú.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {normas.map(({ codigo, titulo, detalle }) => (
            <article
              key={codigo}
              className="rounded-3xl p-6"
              style={{ background: 'white', border: '1px solid #e2e8f4' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpenText size={15} style={{ color: '#2ce5c9' }} />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: '#2563eb' }}
                >
                  {codigo}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: '#0c0e2a' }}>
                {titulo}
              </h3>
              <p className="text-sm leading-6" style={{ color: 'rgba(12,14,42,0.65)' }}>
                {detalle}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Cómo reclamar */}
      <section id="reclamo" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="rounded-3xl p-6 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, #f5f7fc 0%, #eef4ff 100%)',
            border: '1px solid #e2e8f4',
          }}
        >
          <div className="max-w-2xl mb-8">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: '#2563eb' }}
            >
              Procedimiento de reclamo
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0c0e2a' }}>
              Cómo presentar un reclamo
            </h2>
            <p className="mt-3 text-sm leading-6" style={{ color: 'rgba(12,14,42,0.6)' }}>
              El procedimiento está regulado por el Texto Único Ordenado del Reglamento para la
              Atención de Gestiones y Reclamos de Usuarios (Res. N° 099-2022-CD/OSIPTEL).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {pasos.map(({ step, title, detail }) => (
              <div
                key={step}
                className="rounded-3xl p-6"
                style={{ background: 'white', border: '1px solid #e2e8f4' }}
              >
                <p className="text-3xl font-extrabold mb-3" style={{ color: '#e2e8f4' }}>
                  {step}
                </p>
                <h3 className="text-base font-bold mb-2" style={{ color: '#0c0e2a' }}>
                  {title}
                </h3>
                <p className="text-sm leading-6" style={{ color: 'rgba(12,14,42,0.65)' }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Materias reclamables */}
            <div className="rounded-3xl p-6" style={{ background: 'white', border: '1px solid #e2e8f4' }}>
              <h3 className="text-base font-bold mb-4" style={{ color: '#0c0e2a' }}>
                Sobre qué puedes reclamar
              </h3>
              <ul className="space-y-2.5">
                {materias.map(m => (
                  <li key={m} className="flex items-start gap-2.5">
                    <div
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: '#2ce5c9' }}
                    />
                    <span className="text-sm leading-6" style={{ color: 'rgba(12,14,42,0.7)' }}>
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Segunda instancia */}
            <div className="space-y-5">
              <div className="rounded-3xl p-6" style={{ background: '#0c0e2a' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: 'rgba(44,229,201,0.15)' }}
                  >
                    <Landmark size={18} style={{ color: '#2ce5c9' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">TRASU</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Segunda y última instancia
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  El Tribunal Administrativo de Solución de Reclamos de Usuarios es un órgano de
                  OSIPTEL independiente de las operadoras. Si apelas nuestra respuesta, es el TRASU
                  quien decide, y su resolución es de cumplimiento obligatorio para Vivoo.
                </p>
              </div>

              <div
                className="flex gap-3 rounded-3xl p-5"
                style={{ background: 'white', border: '1px solid #e2e8f4' }}
              >
                <Info size={17} style={{ color: '#2563eb', flexShrink: 0, marginTop: 2 }} />
                <p className="text-sm leading-6" style={{ color: 'rgba(12,14,42,0.65)' }}>
                  Mientras tu reclamo de facturación esté en trámite,{' '}
                  <strong style={{ color: '#0c0e2a', fontWeight: 600 }}>
                    no estás obligado a pagar el monto reclamado
                  </strong>{' '}
                  y no podemos suspenderte el servicio por esa deuda, salvo las excepciones del
                  reglamento. La parte del recibo que no reclamas sí debe pagarse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto OSIPTEL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* OSIPTEL */}
          <div className="rounded-3xl p-8" style={{ background: 'white', border: '1px solid #e2e8f4' }}>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-full"
                style={{ background: '#e6f8f5' }}
              >
                <Landmark size={19} style={{ color: '#2563eb' }} />
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: '#0c0e2a' }}>
                  Contacta a OSIPTEL
                </h3>
                <p className="text-xs" style={{ color: 'rgba(12,14,42,0.5)' }}>
                  Orientación independiente del operador
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={osiptel.fonoAyudaHref}
                className="flex items-center gap-3 p-4 rounded-2xl transition-colors"
                style={{ background: '#f5f7fc', border: '1px solid #e2e8f4' }}
              >
                <Phone size={16} style={{ color: '#2563eb' }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(12,14,42,0.4)' }}>
                    Fono Ayuda
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#0c0e2a' }}>
                    {osiptel.fonoAyuda}
                  </p>
                </div>
              </a>

              <a
                href={osiptel.web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl transition-colors"
                style={{ background: '#f5f7fc', border: '1px solid #e2e8f4' }}
              >
                <Globe size={16} style={{ color: '#2563eb' }} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(12,14,42,0.4)' }}>
                    Portal oficial
                  </p>
                  <p className="text-sm font-semibold truncate" style={{ color: '#0c0e2a' }}>
                    osiptel.gob.pe
                  </p>
                </div>
                <ExternalLink size={14} style={{ color: 'rgba(12,14,42,0.3)', marginLeft: 'auto' }} />
              </a>
            </div>
          </div>

          {/* Vivoo */}
          <div className="rounded-3xl p-8" style={{ background: 'white', border: '1px solid #e2e8f4' }}>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-full"
                style={{ background: '#e6f8f5' }}
              >
                <Building2 size={19} style={{ color: '#2563eb' }} />
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: '#0c0e2a' }}>
                  Contacta a Vivoo
                </h3>
                <p className="text-xs" style={{ color: 'rgba(12,14,42,0.5)' }}>
                  Empezamos siempre por aquí
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={site.telefonoHref}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: '#f5f7fc', border: '1px solid #e2e8f4' }}
              >
                <Phone size={16} style={{ color: '#2563eb' }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(12,14,42,0.4)' }}>
                    Central de atención
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#0c0e2a' }}>
                    {site.telefono}
                  </p>
                </div>
              </a>

              <Link
                to="/libro-de-reclamaciones"
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: '#f5f7fc', border: '1px solid #e2e8f4' }}
              >
                <UserCheck size={16} style={{ color: '#2563eb' }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(12,14,42,0.4)' }}>
                    Canal formal
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#0c0e2a' }}>
                    Libro de reclamaciones
                  </p>
                </div>
                <ArrowRight size={14} style={{ color: 'rgba(12,14,42,0.3)', marginLeft: 'auto' }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Aviso */}
        <p
          className="text-xs leading-6 text-center mt-8 max-w-3xl mx-auto"
          style={{ color: 'rgba(12,14,42,0.45)' }}
        >
          Esta página es un resumen informativo y no reemplaza el texto oficial de las normas. Ante
          cualquier discrepancia, prevalece lo dispuesto en la legislación vigente. Consulta las{' '}
          <a
            href={osiptel.normativas}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: '#2563eb' }}
          >
            normativas de usuarios de OSIPTEL
          </a>{' '}
          o el portal
          <a
            href={osiptel.web}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: '#2563eb' }}
          >
            osiptel.gob.pe
          </a>
          .
        </p>
      </section>
    </div>
  )
}
