import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin } from 'lucide-react'
import { zonas, type Zona } from '../config/cobertura'

export type Vista = 'todas' | Zona['id']

const todasLasZonas = L.latLngBounds(zonas.flatMap(z => z.contorno))

function limitesDe(vista: Vista): L.LatLngBounds {
  const zona = zonas.find(z => z.id === vista)
  return zona ? L.latLngBounds(zona.contorno) : todasLasZonas
}

/**
 * Mapa de cobertura (Leaflet + OpenStreetMap) con las zonas de la red.
 * Se usa en la portada y en /cobertura; se carga con lazy() para que Leaflet
 * no entre en el bundle principal.
 */
export default function MapaCobertura({
  vista,
  onVista,
  ubicacion = null,
  className = '',
  etiqueta = 'Zonas de cobertura',
}: {
  vista: Vista
  onVista?: (vista: Vista) => void
  ubicacion?: [number, number] | null
  className?: string
  etiqueta?: string
}) {
  const contenedor = useRef<HTMLDivElement>(null)
  const mapa = useRef<L.Map | null>(null)
  const marcador = useRef<L.CircleMarker | null>(null)
  const alElegir = useRef(onVista)
  alElegir.current = onVista

  useEffect(() => {
    if (!contenedor.current) return
    const instancia = L.map(contenedor.current, { scrollWheelZoom: false, zoomControl: false })
    L.control.zoom({ position: 'bottomright' }).addTo(instancia)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(instancia)

    for (const zona of zonas) {
      const capa = L.polygon(zona.contorno, {
        color: zona.color,
        weight: 3,
        opacity: 0.95,
        fillColor: zona.color,
        fillOpacity: 0.24,
        lineJoin: 'round',
        smoothFactor: 1.2,
      })
        .bindTooltip(zona.nombre, { permanent: true, direction: 'center', className: 'zona-etiqueta' })
        .on('click', () => alElegir.current?.(zona.id))
        .on('mouseover', () => capa.setStyle({ fillOpacity: 0.36, weight: 4 }))
        .on('mouseout', () => capa.setStyle({ fillOpacity: 0.24, weight: 3 }))
        .addTo(instancia)
    }

    instancia.fitBounds(limitesDe(vista), { padding: [36, 36] })
    // La rueda del mouse solo hace zoom después de que la persona elige usar el mapa.
    instancia.on('click focus', () => instancia.scrollWheelZoom.enable())
    instancia.on('mouseout blur', () => instancia.scrollWheelZoom.disable())

    mapa.current = instancia
    return () => {
      instancia.remove()
      mapa.current = null
      marcador.current = null
    }
    // El encuadre inicial solo se calcula al montar; los cambios de vista vuelan con el efecto siguiente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    mapa.current?.flyToBounds(limitesDe(vista), { padding: [36, 36], duration: 0.8 })
  }, [vista])

  useEffect(() => {
    const instancia = mapa.current
    if (!instancia || !ubicacion) return
    marcador.current?.remove()
    marcador.current = L.circleMarker(ubicacion, { radius: 9, color: '#ffffff', weight: 3, fillColor: '#0c0e2a', fillOpacity: 1 })
      .bindTooltip('Tu ubicación', { direction: 'top', offset: [0, -10] })
      .addTo(instancia)
    instancia.flyTo(ubicacion, 14, { duration: 0.8 })
  }, [ubicacion])

  return (
    <div className={`relative isolate overflow-hidden rounded-3xl border border-vivoo-mist bg-vivoo-mist shadow-[0_24px_50px_-30px_rgba(12,14,42,0.35)] ${className}`}>
      <div ref={contenedor} className="h-full w-full" role="region" aria-label="Mapa de cobertura de Vivoo en Arequipa y El Pedregal" />
      <p className="pointer-events-none absolute left-4 top-4 z-[500] inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-vivoo-ink shadow-[0_6px_16px_-6px_rgba(12,14,42,0.35)]">
        <MapPin size={14} className="text-vivoo-purple" aria-hidden="true" />
        {etiqueta}
      </p>
    </div>
  )
}
