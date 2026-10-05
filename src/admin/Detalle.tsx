import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail, RotateCw, Send } from 'lucide-react'
import { ApiError } from '../lib/api'
import { useSesion } from './sesion'
import { estados, fecha, plazo, type Estado } from './formato'

type Hoja = {
  codigo: string
  tipo: 'RECLAMO' | 'QUEJA'
  estado: Estado
  nombres: string
  apellidos: string
  tipoDocumento: string
  documento: string
  celular: string
  correo: string
  direccion: string
  codigoCliente: string | null
  servicio: string
  montoReclamado: string | null
  detalle: string
  pedido: string
  aceptadoEn: string
  registradoEn: string
  venceEn: string
  respuesta: string | null
  respondidoEn: string | null
  respondidoPor: string | null
  constanciaEnviadaEn: string | null
  respuestaEnviadaEn: string | null
}

function Dato({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-vivoo-ink/50">{etiqueta}</dt>
      <dd className="mt-0.5 break-words text-sm font-medium text-vivoo-ink">{children}</dd>
    </div>
  )
}

function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-vivoo-mist bg-white p-6">
      <h2 className="text-sm font-bold text-vivoo-ink">{titulo}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function Detalle() {
  const { codigo = '' } = useParams()
  const { pedir } = useSesion()
  const [hoja, setHoja] = useState<Hoja | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [aviso, setAviso] = useState<{ tono: 'ok' | 'error'; texto: string } | null>(null)
  const [ocupado, setOcupado] = useState(false)
  const [respuesta, setRespuesta] = useState('')
  const [resultado, setResultado] = useState<'RESOLVED' | 'REJECTED'>('RESOLVED')
  const [confirmando, setConfirmando] = useState(false)

  const cargar = useCallback(() => {
    pedir<Hoja>(`/admin/complaints/${codigo}`)
      .then(setHoja)
      .catch(e => setError(e instanceof ApiError ? e.message : 'No se pudo cargar la hoja.'))
  }, [codigo, pedir])

  useEffect(cargar, [cargar])

  const accion = async (fn: () => Promise<void>) => {
    setOcupado(true)
    setAviso(null)
    try {
      await fn()
    } catch (e) {
      const err = e instanceof ApiError ? e : null
      setAviso({ tono: 'error', texto: err ? Object.values(err.errores)[0] ?? err.message : 'Ocurrió un error.' })
    } finally {
      setOcupado(false)
    }
  }

  const marcarEnRevision = () =>
    accion(async () => {
      setHoja(await pedir<Hoja>(`/admin/complaints/${codigo}/estado`, { method: 'PATCH', body: JSON.stringify({ estado: 'IN_REVIEW' }) }))
    })

  const responder = () =>
    accion(async () => {
      const data = await pedir<Hoja & { correoEnviado: boolean }>(`/admin/complaints/${codigo}/respuesta`, {
        method: 'POST',
        body: JSON.stringify({ respuesta, estado: resultado }),
      })
      setHoja(data)
      setConfirmando(false)
      setAviso(
        data.correoEnviado
          ? { tono: 'ok', texto: 'Respuesta registrada y enviada al correo del consumidor.' }
          : { tono: 'error', texto: 'La respuesta quedó registrada, pero el correo no salió. Reintenta el envío.' },
      )
    })

  const reenviar = (tipo: 'respuesta' | 'constancia') =>
    accion(async () => {
      const { enviado } = await pedir<{ enviado: boolean }>(`/admin/complaints/${codigo}/reenviar-${tipo}`, { method: 'POST' })
      setAviso(enviado ? { tono: 'ok', texto: 'Correo enviado.' } : { tono: 'error', texto: 'No se pudo enviar el correo. Revisa la configuración SMTP.' })
      cargar()
    })

  if (error) {
    return (
      <div>
        <Volver />
        <p className="mt-6 rounded-2xl bg-white p-6 text-sm text-red-700">{error}</p>
      </div>
    )
  }
  if (!hoja) return <div className="h-96 animate-pulse rounded-3xl bg-white" />

  const p = hoja.respondidoEn ? null : plazo(hoja.venceEn)
  const largo = respuesta.trim().length

  return (
    <div>
      <Volver />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-vivoo-ink/55">{hoja.tipo === 'QUEJA' ? 'Queja' : 'Reclamo'} · registrada el {fecha(hoja.registradoEn, true)}</p>
          <h1 className="mt-1 text-2xl font-bold tabular-nums text-vivoo-ink sm:text-3xl">Hoja N° {hoja.codigo}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {p && <span className={`text-sm ${p.clase}`}>{p.texto} · {fecha(hoja.venceEn)}</span>}
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${estados[hoja.estado].clase}`}>{estados[hoja.estado].texto}</span>
        </div>
      </div>

      {aviso && (
        <p
          role="status"
          className={`aparece mt-5 rounded-2xl px-4 py-3 text-sm ${aviso.tono === 'ok' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          {aviso.texto}
        </p>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-5">
          <Bloque titulo="Consumidor">
            <dl className="grid gap-4 sm:grid-cols-2">
              <Dato etiqueta="Nombre">{hoja.nombres} {hoja.apellidos}</Dato>
              <Dato etiqueta="Documento">{hoja.tipoDocumento} {hoja.documento}</Dato>
              <Dato etiqueta="Celular">
                <a href={`tel:${hoja.celular}`} className="text-vivoo-blue underline-offset-4 hover:underline">{hoja.celular}</a>
              </Dato>
              <Dato etiqueta="Correo">
                <a href={`mailto:${hoja.correo}`} className="text-vivoo-blue underline-offset-4 hover:underline">{hoja.correo}</a>
              </Dato>
              <Dato etiqueta="Dirección del servicio">{hoja.direccion}</Dato>
              <Dato etiqueta="Código de cliente">{hoja.codigoCliente ?? '—'}</Dato>
            </dl>
          </Bloque>
          <Bloque titulo="Hoja">
            <dl className="grid gap-4 sm:grid-cols-2">
              <Dato etiqueta="Servicio afectado">{hoja.servicio}</Dato>
              <Dato etiqueta="Monto reclamado">{hoja.montoReclamado ? `S/ ${hoja.montoReclamado}` : '—'}</Dato>
            </dl>
            <dl className="mt-5 space-y-4 border-t border-vivoo-mist pt-5">
              <div>
                <dt className="text-xs text-vivoo-ink/50">Detalle</dt>
                <dd className="mt-1 whitespace-pre-line text-sm leading-6 text-vivoo-ink/85">{hoja.detalle}</dd>
              </div>
              <div>
                <dt className="text-xs text-vivoo-ink/50">Pedido del consumidor</dt>
                <dd className="mt-1 whitespace-pre-line text-sm leading-6 text-vivoo-ink/85">{hoja.pedido}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-vivoo-ink/45">Declaró que la información es veraz: {fecha(hoja.aceptadoEn, true)}</p>
          </Bloque>
        </div>

        <div className="space-y-5 lg:sticky lg:top-24">
          {hoja.respondidoEn ? (
            <Bloque titulo="Respuesta">
              <p className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <CheckCircle2 size={16} aria-hidden="true" />
                {estados[hoja.estado].texto} el {fecha(hoja.respondidoEn, true)}
              </p>
              {hoja.respondidoPor && <p className="mt-1 text-xs text-vivoo-ink/50">Por {hoja.respondidoPor}</p>}
              <p className="mt-4 whitespace-pre-line rounded-2xl bg-vivoo-cloud p-4 text-sm leading-6 text-vivoo-ink/85">{hoja.respuesta}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-vivoo-ink/55">
                <span>{hoja.respuestaEnviadaEn ? `Enviada al consumidor el ${fecha(hoja.respuestaEnviadaEn, true)}` : 'Aún no se envió por correo'}</span>
                <button type="button" disabled={ocupado} onClick={() => reenviar('respuesta')} className="presion inline-flex items-center gap-1.5 rounded-full border border-vivoo-mist px-3 py-1.5 font-semibold text-vivoo-ink hover:border-vivoo-ink/30 disabled:opacity-50">
                  <RotateCw size={13} aria-hidden="true" />
                  {hoja.respuestaEnviadaEn ? 'Reenviar' : 'Enviar'}
                </button>
              </div>
            </Bloque>
          ) : (
            <Bloque titulo="Responder">
              {hoja.estado === 'PENDING' && (
                <button
                  type="button"
                  disabled={ocupado}
                  onClick={marcarEnRevision}
                  className="presion mb-5 inline-flex w-full items-center justify-center rounded-full border border-vivoo-mist bg-vivoo-cloud px-5 py-2.5 text-sm font-semibold text-vivoo-ink hover:border-vivoo-ink/30 disabled:opacity-50"
                >
                  Marcar en revisión
                </button>
              )}
              <fieldset className="grid grid-cols-2 gap-2" disabled={confirmando}>
                <legend className="mb-2 text-xs text-vivoo-ink/50">Resultado</legend>
                {(['RESOLVED', 'REJECTED'] as const).map(v => (
                  <label
                    key={v}
                    className={`cursor-pointer rounded-2xl border px-3 py-2.5 text-center text-sm font-semibold transition-colors ${
                      resultado === v ? 'border-vivoo-blue bg-vivoo-menta text-vivoo-ink' : 'border-vivoo-mist text-vivoo-ink/70'
                    }`}
                  >
                    <input type="radio" name="resultado" value={v} checked={resultado === v} onChange={() => setResultado(v)} className="sr-only" />
                    {v === 'RESOLVED' ? 'Atendido' : 'Improcedente'}
                  </label>
                ))}
              </fieldset>
              <label className="mt-4 flex flex-col gap-1.5">
                <span className="text-xs text-vivoo-ink/50">Respuesta al consumidor</span>
                <textarea
                  value={respuesta}
                  onChange={e => setRespuesta(e.target.value)}
                  disabled={confirmando}
                  rows={8}
                  maxLength={5000}
                  placeholder="Explica qué revisaron, qué se hizo y la solución. Este texto le llega tal cual al consumidor."
                  className="w-full resize-y rounded-2xl border border-vivoo-mist bg-white px-4 py-3 text-sm leading-6 text-vivoo-ink outline-none placeholder:text-vivoo-ink/40 focus:border-vivoo-blue disabled:bg-vivoo-cloud"
                />
                <span className={`text-right text-xs ${largo > 0 && largo < 20 ? 'text-amber-700' : 'text-vivoo-ink/40'}`}>
                  {largo < 20 ? `Mínimo 20 caracteres (${largo})` : `${largo}/5000`}
                </span>
              </label>
              {confirmando ? (
                <div className="aparece mt-3 rounded-2xl bg-vivoo-lila p-4">
                  <p className="text-sm text-vivoo-ink">La respuesta se enviará al consumidor y no se podrá modificar.</p>
                  <div className="mt-3 flex gap-2">
                    <button type="button" disabled={ocupado} onClick={responder} className="presion inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-vivoo-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-vivoo-blue disabled:opacity-60">
                      <Send size={14} aria-hidden="true" />
                      {ocupado ? 'Enviando…' : 'Enviar respuesta'}
                    </button>
                    <button type="button" disabled={ocupado} onClick={() => setConfirmando(false)} className="presion rounded-full border border-vivoo-mist bg-white px-4 py-2.5 text-sm font-semibold text-vivoo-ink">
                      Volver
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={largo < 20}
                  onClick={() => setConfirmando(true)}
                  className="presion mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-vivoo-ink px-5 py-3 text-sm font-semibold text-white hover:bg-vivoo-blue disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Revisar y enviar
                </button>
              )}
            </Bloque>
          )}

          <Bloque titulo="Constancia al consumidor">
            <div className="flex items-start justify-between gap-3">
              <p className="flex items-start gap-2 text-sm text-vivoo-ink/70">
                <Mail size={15} className="mt-0.5 shrink-0 text-vivoo-blue" aria-hidden="true" />
                {hoja.constanciaEnviadaEn ? `Enviada el ${fecha(hoja.constanciaEnviadaEn, true)}` : 'No se pudo enviar todavía.'}
              </p>
              <button type="button" disabled={ocupado} onClick={() => reenviar('constancia')} className="presion inline-flex shrink-0 items-center gap-1.5 rounded-full border border-vivoo-mist px-3 py-1.5 text-xs font-semibold text-vivoo-ink hover:border-vivoo-ink/30 disabled:opacity-50">
                <RotateCw size={13} aria-hidden="true" />
                Reenviar
              </button>
            </div>
          </Bloque>
        </div>
      </div>
    </div>
  )
}

function Volver() {
  return (
    <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-vivoo-ink/60 hover:text-vivoo-ink">
      <ArrowLeft size={16} aria-hidden="true" />
      Todas las hojas
    </Link>
  )
}
