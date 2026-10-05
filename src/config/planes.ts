/**
 * Planes residenciales vigentes de Vivoo. Es la única fuente de planes
 * del sitio: portada, formulario de contacto y servicios leen de aquí.
 *
 * Precios mensuales en soles, con IGV incluido.
 */

/** Tipo de beneficio: decide el icono que lo acompaña en la tarjeta. */
export type TipoBeneficio = 'fibra' | 'tv' | 'peliculas' | 'repetidor' | 'camara'

export type Plan = {
  id: string
  nombre: string
  velocidad: number
  precio: number
  /** Lo que el plan suma al internet de fibra (que va en todos). */
  incluye: { tipo: TipoBeneficio; texto: string }[]
  /** Color identificador del plan (DESIGN.md: colores de plan). Solo para el punto y los iconos. */
  color: string
  /** El plan que Vivoo presenta como el más elegido. */
  popular?: boolean
  tv?: boolean
  repetidor?: boolean
  camara?: boolean
}

export const planes: Plan[] = [
  {
    id: 'basico',
    nombre: 'Básico',
    velocidad: 500,
    precio: 59,
    color: '#16a34a',
    incluye: [{ tipo: 'fibra', texto: 'Internet de fibra óptica' }],
  },
  {
    id: 'standard',
    nombre: 'Standard',
    velocidad: 800,
    precio: 69,
    color: '#0066ff',
    incluye: [{ tipo: 'tv', texto: '50 canales de TV digital' }],
    tv: true,
  },
  {
    id: 'premium',
    nombre: 'Premium',
    velocidad: 1000,
    precio: 99,
    color: '#8b5cf6',
    incluye: [
      { tipo: 'tv', texto: '+150 canales de TV digital' },
      { tipo: 'peliculas', texto: 'Películas y series' },
    ],
    popular: true,
    tv: true,
  },
  {
    id: 'pro',
    nombre: 'Pro',
    velocidad: 1000,
    precio: 139,
    color: '#f59e0b',
    incluye: [
      { tipo: 'tv', texto: '+150 canales de TV digital' },
      { tipo: 'peliculas', texto: 'Películas y series' },
      { tipo: 'repetidor', texto: 'Repetidor WiFi incluido' },
      { tipo: 'camara', texto: 'Cámara IP incluida' },
    ],
    tv: true,
    repetidor: true,
    camara: true,
  },
]

export const precioDesde = Math.min(...planes.map(p => p.precio))

export function nombreCompleto(plan: Plan): string {
  return `Plan Vivoo ${plan.nombre} ${plan.velocidad} Mbps`
}
