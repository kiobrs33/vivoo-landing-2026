import { useState } from 'react'
import { MapPin, CheckCircle, Clock, XCircle, Search } from 'lucide-react'

const zones = [
  { name: 'Cercado', status: 'active', since: '2022' },
  { name: 'Yanahuara', status: 'active', since: '2022' },
  { name: 'Cayma', status: 'active', since: '2022' },
  { name: 'Sachaca', status: 'active', since: '2023' },
  { name: 'Cerro Colorado', status: 'active', since: '2023' },
  { name: 'Paucarpata', status: 'active', since: '2023' },
  { name: 'Miraflores', status: 'active', since: '2023' },
  { name: 'Mariano Melgar', status: 'active', since: '2023' },
  { name: 'Alto Selva Alegre', status: 'active', since: '2024' },
  { name: 'Jacobo Hunter', status: 'active', since: '2024' },
  { name: 'José L. B. y Rivero', status: 'active', since: '2024' },
  { name: 'Socabaya', status: 'active', since: '2024' },
  { name: 'Tiabaya', status: 'coming', since: 'Q3 2025' },
  { name: 'Characato', status: 'coming', since: 'Q4 2025' },
  { name: 'La Joya', status: 'coming', since: '2026' },
  { name: 'Mollebaya', status: 'unavailable', since: '—' },
  { name: 'Pocsi', status: 'unavailable', since: '—' },
  { name: 'Chiguata', status: 'unavailable', since: '—' },
]

const statusConfig = {
  active: { label: 'Disponible', color: '#22c55e', Icon: CheckCircle, bg: '#dcfce7' },
  coming: { label: 'Próximamente', color: '#f59e0b', Icon: Clock, bg: '#fef3c7' },
  unavailable: { label: 'No disponible', color: '#94a3b8', Icon: XCircle, bg: '#f1f5f9' },
}

export default function CoveragePage() {
  const [address, setAddress] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'coming' | 'unavailable'>('all')
  const [checkResult, setCheckResult] = useState<null | 'found' | 'not_found'>(null)

  const filteredZones = zones.filter(z => filter === 'all' || z.status === filter)

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    // Simulate a check — in production this would hit an API
    const hasMatch = zones
      .filter(z => z.status === 'active')
      .some(z => address.toLowerCase().includes(z.name.toLowerCase()))
    setCheckResult(hasMatch ? 'found' : 'not_found')
  }

  return (
    <div style={{ background: '#f5f7fc', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center overflow-hidden rounded-b-[2rem]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a3dff_0%,#3b2fd8_45%,#5c1fb8_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#5b82ff59,transparent_45%)]" />

        <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#a8e6dd' }}>
          Cobertura
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          ¿Llegamos a tu zona?
        </h1>
        <p className="max-w-lg mx-auto text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Verifica si ya tenemos cobertura en tu dirección o cuándo planeamos llegar a tu distrito.
        </p>

        {/* Address check form */}
        <form onSubmit={handleCheck} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              value={address}
              onChange={e => { setAddress(e.target.value); setCheckResult(null) }}
              placeholder="Escribe tu distrito (ej. Yanahuara)"
              className="w-full rounded-full py-3.5 pl-11 pr-5 text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3.5 rounded-full text-sm font-bold transition-transform hover:scale-[1.03] flex-shrink-0"
            style={{ background: '#2ce5c9', color: '#0c0e2a' }}
          >
            Verificar
          </button>
        </form>

        {/* Result */}
        {checkResult === 'found' && (
          <div
            className="max-w-md mx-auto mt-4 px-5 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <CheckCircle size={15} />
            ¡Genial! Ya tenemos cobertura en tu zona. Contrata ahora.
          </div>
        )}
        {checkResult === 'not_found' && (
          <div
            className="max-w-md mx-auto mt-4 px-5 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}
          >
            <Clock size={15} />
            Aún no llegamos a esta zona. Regístrate y te avisamos.
          </div>
        )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { value: '12', label: 'Distritos activos', color: '#22c55e' },
            { value: '3', label: 'Próximamente', color: '#f59e0b' },
            { value: '+3,000', label: 'Hogares conectados', color: '#2563eb' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-6 text-center" style={{ background: 'white', border: '1px solid #e2e8f4' }}>
              <p className="text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-sm" style={{ color: 'rgba(12,14,42,0.55)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'Todos los distritos' },
            { key: 'active', label: 'Disponibles' },
            { key: 'coming', label: 'Próximamente' },
            { key: 'unavailable', label: 'Sin cobertura' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: filter === f.key ? '#0c0e2a' : 'white',
                color: filter === f.key ? 'white' : '#0c0e2a',
                border: '1px solid #e2e8f4',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(statusConfig).map(([key, conf]) => (
            <div key={key} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(12,14,42,0.6)' }}>
              <conf.Icon size={14} style={{ color: conf.color }} />
              {conf.label}
            </div>
          ))}
        </div>

        {/* Zones grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredZones.map(zone => {
            const conf = statusConfig[zone.status as keyof typeof statusConfig]
            return (
              <div
                key={zone.name}
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{ background: 'white', border: '1px solid #e2e8f4' }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{ background: conf.bg }}
                >
                  <conf.Icon size={14} style={{ color: conf.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0c0e2a' }}>{zone.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: conf.color, fontWeight: 600 }}>{conf.label}</p>
                  {zone.status !== 'unavailable' && (
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(12,14,42,0.4)' }}>
                      {zone.status === 'active' ? `Desde ${zone.since}` : zone.status === 'coming' ? 'Fecha por confirmar' : 'Sin fecha'}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Map placeholder */}
        <div
          className="mt-12 rounded-3xl overflow-hidden relative"
          style={{ height: 360, background: '#e2e8f4' }}
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=500&fit=crop&auto=format"
            alt="Mapa de cobertura Arequipa"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MapPin size={40} style={{ color: '#2563eb' }} className="mb-3" />
            <p className="text-lg font-bold" style={{ color: '#0c0e2a' }}>Mapa interactivo</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(12,14,42,0.6)' }}>Próximamente disponible</p>
          </div>
        </div>
      </div>
    </div>
  )
}
