import { useState, type FormEvent } from 'react'
import { CheckCircle2, Clock, Search, XCircle } from 'lucide-react'
import { api, ApiError } from '../lib/api'
import { campoClaro, etiquetaCampo } from './ui'

type Estado = 'PENDING' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED'

type Resultado = {
  codigo: string
  tipo: 'RECLAMO' | 'QUEJA'
  estado: Estado
  servicio: string
  registradoEn: string
  venceEn: string
  respuesta: string | null
  respondidoEn: string | null
}

const estados: Record<Estado, { texto: string; Icon: typeof Clock; clase: string }> = {
  PENDING: { texto: 'Recibido', Icon: Clock, clase: 'bg-vivoo-menta text-vivoo-blue' },
  IN_REVIEW: { texto: 'En revisión', Icon: Clock, clase: 'bg-vivoo-lila text-vivoo-purple' },
  RESOLVED: { texto: 'Respondido', Icon: CheckCircle2, clase: 'bg-green-50 text-green-700' },
  REJECTED: { texto: 'Improcedente', Icon: XCircle, clase: 'bg-red-50 text-red-700' },
}

const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' })

/** Consulta pública del estado de una hoja: código + documento del titular. */
export default function ConsultaReclamo() {
  const [codigo, setCodigo] = useState('')
  const [documento, setDocumento] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resultado, setResultado] = useState<Resultado | null>(null)

  const consultar = async (e: FormEvent) => {
    e.preventDefault()
    if (!codigo.trim() || !documento.trim()) {
      setError('Ingresa el número de hoja y tu documento.')
      return
    }
    setBuscando(true)
    setError(null)
    setResultado(null)
    try {
      setResultado(
        await api<Resultado>('/complaints/consulta', {
          method: 'POST',
          body: JSON.stringify({ codigo: codigo.trim(), documento: documento.trim() }),
        }),
      )
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos hacer la consulta. Inténtalo de nuevo.')
    } finally {
      setBuscando(false)
    }
  }

  const estado = resultado ? estados[resultado.estado] : null

  return (
    <section id="consulta" aria-labelledby="consulta-titulo" className="mt-8 rounded-3xl border border-vivoo-mist bg-white p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <h2 id="consulta-titulo" className="text-xl font-bold text-vivoo-ink">
            ¿Ya registraste una hoja?
          </h2>
          <p className="mt-2 text-sm leading-6 text-vivoo-ink/65">
            Consulta su estado con el número de hoja (por ejemplo, 000123-2026) y el documento del
            titular.
          </p>
          <form onSubmit={consultar} noValidate className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <label className="flex flex-col gap-1.5">
              <span className={etiquetaCampo}>N° de hoja</span>
              <input value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="000123-2026" maxLength={20} className={`${campoClaro} border-vivoo-mist`} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={etiquetaCampo}>Documento</span>
              <input value={documento} onChange={e => setDocumento(e.target.value)} placeholder="DNI, CE o RUC" maxLength={20} className={`${campoClaro} border-vivoo-mist`} />
            </label>
            <button
              type="submit"
              disabled={buscando}
              className="presion inline-flex h-[46px] items-center justify-center gap-2 rounded-full bg-vivoo-ink px-5 text-sm font-semibold text-white hover:bg-vivoo-blue disabled:cursor-wait disabled:opacity-60"
            >
              <Search size={15} aria-hidden="true" />
              {buscando ? 'Buscando…' : 'Consultar'}
            </button>
          </form>
        </div>

        <div aria-live="polite">
          {error && <p className="aparece rounded-2xl bg-vivoo-cloud px-4 py-3 text-sm leading-6 text-vivoo-ink/75">{error}</p>}
          {resultado && estado && (
            <div className="aparece rounded-2xl bg-vivoo-cloud p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-vivoo-ink">
                  {resultado.tipo === 'QUEJA' ? 'Queja' : 'Reclamo'} N° {resultado.codigo}
                </p>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${estado.clase}`}>
                  <estado.Icon size={13} aria-hidden="true" />
                  {estado.texto}
                </span>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-vivoo-ink/50">Registrada</dt>
                  <dd className="font-medium text-vivoo-ink">{fecha(resultado.registradoEn)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-vivoo-ink/50">{resultado.respondidoEn ? 'Respondida' : 'Respuesta a más tardar'}</dt>
                  <dd className="font-medium text-vivoo-ink">{fecha(resultado.respondidoEn ?? resultado.venceEn)}</dd>
                </div>
              </dl>
              {resultado.respuesta && (
                <div className="mt-4 border-t border-vivoo-mist pt-4">
                  <p className="text-xs text-vivoo-ink/50">Nuestra respuesta</p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6 text-vivoo-ink/80">{resultado.respuesta}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
