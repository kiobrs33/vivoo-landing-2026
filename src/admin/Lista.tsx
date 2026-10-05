import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Inbox, Search } from 'lucide-react'
import { ApiError } from '../lib/api'
import { useSesion } from './sesion'
import { estados, fecha, plazo, type Estado } from './formato'

type Fila = {
  codigo: string
  tipo: 'RECLAMO' | 'QUEJA'
  nombre: string
  servicio: string
  estado: Estado
  registradoEn: string
  venceEn: string
  respondidoEn: string | null
  vencido: boolean
}

type Respuesta = {
  items: Fila[]
  total: number
  pagina: number
  porPagina: number
  resumen: Record<Estado | 'VENCIDOS', number>
}

const filtros: { valor: string; texto: string; conteo?: (r: Respuesta['resumen']) => number }[] = [
  { valor: '', texto: 'Todos', conteo: r => r.PENDING + r.IN_REVIEW + r.RESOLVED + r.REJECTED },
  { valor: 'PENDING', texto: 'Pendientes', conteo: r => r.PENDING },
  { valor: 'IN_REVIEW', texto: 'En revisión', conteo: r => r.IN_REVIEW },
  { valor: 'VENCIDOS', texto: 'Vencidos', conteo: r => r.VENCIDOS },
  { valor: 'RESOLVED', texto: 'Atendidos', conteo: r => r.RESOLVED },
  { valor: 'REJECTED', texto: 'Improcedentes', conteo: r => r.REJECTED },
]

export default function Lista() {
  const { pedir } = useSesion()
  const [params, setParams] = useSearchParams()
  const estado = params.get('estado') ?? ''
  const q = params.get('q') ?? ''
  const pagina = Number(params.get('pagina') ?? 1)
  const [busqueda, setBusqueda] = useState(q)
  const [datos, setDatos] = useState<Respuesta | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const consulta = new URLSearchParams({ pagina: String(pagina), porPagina: '20' })
    if (estado) consulta.set('estado', estado)
    if (q) consulta.set('q', q)
    setCargando(true)
    pedir<Respuesta>(`/admin/complaints?${consulta}`)
      .then(d => {
        setDatos(d)
        setError(null)
      })
      .catch(e => setError(e instanceof ApiError ? e.message : 'No se pudo cargar la lista.'))
      .finally(() => setCargando(false))
  }, [estado, q, pagina, pedir])

  const cambiar = (cambios: Record<string, string>) => {
    const siguiente = new URLSearchParams(params)
    for (const [k, v] of Object.entries(cambios)) {
      if (v) siguiente.set(k, v)
      else siguiente.delete(k)
    }
    if (!('pagina' in cambios)) siguiente.delete('pagina')
    setParams(siguiente)
  }

  const buscar = (e: FormEvent) => {
    e.preventDefault()
    cambiar({ q: busqueda.trim() })
  }

  const paginas = datos ? Math.max(1, Math.ceil(datos.total / datos.porPagina)) : 1

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vivoo-ink sm:text-3xl">Hojas de reclamación</h1>
          <p className="mt-1 text-sm text-vivoo-ink/60">Responde cada hoja dentro de los 15 días hábiles.</p>
        </div>
        <form onSubmit={buscar} className="relative w-full sm:w-80" role="search">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-vivoo-ink/40" aria-hidden="true" />
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="N° de hoja, nombre, documento o correo"
            aria-label="Buscar hojas"
            className="w-full rounded-full border border-vivoo-mist bg-white py-2.5 pl-11 pr-4 text-sm text-vivoo-ink outline-none placeholder:text-vivoo-ink/40 focus:border-vivoo-blue"
          />
        </form>
      </div>

      <nav aria-label="Filtrar por estado" className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {filtros.map(f => {
          const activo = estado === f.valor
          const conteo = datos && f.conteo ? f.conteo(datos.resumen) : null
          const alerta = f.valor === 'VENCIDOS' && (conteo ?? 0) > 0
          return (
            <button
              key={f.valor}
              type="button"
              onClick={() => cambiar({ estado: f.valor })}
              aria-pressed={activo}
              className={`presion inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                activo ? 'border-vivoo-ink bg-vivoo-ink text-white' : 'border-vivoo-mist bg-white text-vivoo-ink hover:border-vivoo-ink/30'
              }`}
            >
              {f.texto}
              {conteo !== null && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                    alerta ? 'bg-red-600 text-white' : activo ? 'bg-white/15' : 'bg-vivoo-cloud text-vivoo-ink/60'
                  }`}
                >
                  {conteo}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="mt-5 overflow-hidden rounded-3xl border border-vivoo-mist bg-white">
        {error && <p className="p-6 text-sm text-red-700">{error}</p>}
        {!error && datos && datos.items.length === 0 && (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <Inbox size={28} className="text-vivoo-ink/30" aria-hidden="true" />
            <p className="mt-3 font-semibold text-vivoo-ink">No hay hojas con este filtro</p>
            <p className="mt-1 text-sm text-vivoo-ink/55">{q ? 'Prueba con otra búsqueda.' : 'Cuando lleguen nuevas hojas aparecerán aquí.'}</p>
          </div>
        )}
        {!error && datos && datos.items.length > 0 && (
          <ul className={`divide-y divide-vivoo-mist transition-opacity ${cargando ? 'opacity-50' : ''}`}>
            <li className="hidden grid-cols-[8rem_minmax(0,1.4fr)_minmax(0,1fr)_9rem_8rem] gap-4 bg-vivoo-cloud px-6 py-3 text-xs font-semibold uppercase tracking-wide text-vivoo-ink/50 md:grid">
              <span>N° de hoja</span>
              <span>Consumidor</span>
              <span>Servicio</span>
              <span>Plazo</span>
              <span>Estado</span>
            </li>
            {datos.items.map(f => {
              const p = f.respondidoEn ? { texto: `Respondido ${fecha(f.respondidoEn)}`, clase: 'text-vivoo-ink/50' } : plazo(f.venceEn)
              return (
                <li key={f.codigo}>
                  <Link
                    to={`/admin/${f.codigo}`}
                    className="grid gap-1 px-5 py-4 transition-colors hover:bg-vivoo-cloud md:grid-cols-[8rem_minmax(0,1.4fr)_minmax(0,1fr)_9rem_8rem] md:items-center md:gap-4 md:px-6"
                  >
                    <span className="flex items-center justify-between md:block">
                      <span className="font-semibold tabular-nums text-vivoo-ink">{f.codigo}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold md:hidden ${estados[f.estado].clase}`}>{estados[f.estado].texto}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-vivoo-ink">{f.nombre}</span>
                      <span className="block text-xs text-vivoo-ink/50">
                        {f.tipo === 'QUEJA' ? 'Queja' : 'Reclamo'} · {fecha(f.registradoEn)}
                      </span>
                    </span>
                    <span className="truncate text-sm text-vivoo-ink/70">{f.servicio}</span>
                    <span className={`text-sm ${p.clase}`}>{p.texto}</span>
                    <span className="hidden md:block">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${estados[f.estado].clase}`}>{estados[f.estado].texto}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
        {!error && !datos && <div className="h-64 animate-pulse bg-vivoo-cloud/60" />}
      </div>

      {datos && datos.total > datos.porPagina && (
        <div className="mt-5 flex items-center justify-between text-sm text-vivoo-ink/60">
          <span>
            {datos.total} hojas · página {pagina} de {paginas}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagina <= 1}
              onClick={() => cambiar({ pagina: String(pagina - 1) })}
              aria-label="Página anterior"
              className="presion flex h-10 w-10 items-center justify-center rounded-full border border-vivoo-mist bg-white text-vivoo-ink disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              disabled={pagina >= paginas}
              onClick={() => cambiar({ pagina: String(pagina + 1) })}
              aria-label="Página siguiente"
              className="presion flex h-10 w-10 items-center justify-center rounded-full border border-vivoo-mist bg-white text-vivoo-ink disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
