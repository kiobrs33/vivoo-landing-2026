/**
 * Planes residenciales confirmados por Vivoo. Es la única fuente de planes
 * del sitio: portada, formulario de contacto y footer leen de aquí.
 *
 * Precios mensuales en soles, con IGV incluido.
 */

export type Plan = {
  id: string
  nombre: string
  velocidad: number
  precio: number
  /** Para qué hogar encaja, en una línea. */
  uso: string
  /** Lo que el plan suma al internet de fibra (que va en todos). */
  incluye: string[]
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
    uso: 'Para navegar y usar redes sociales',
    incluye: [],
  },
  {
    id: 'estandar',
    nombre: 'Estándar',
    velocidad: 800,
    precio: 69,
    uso: 'Para streaming HD y trabajo remoto',
    incluye: ['50 canales de TV digital'],
    tv: true,
  },
  {
    id: '1000',
    nombre: '1000 Mbps',
    velocidad: 1000,
    precio: 89,
    uso: 'La velocidad más alta, solo internet',
    incluye: [],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    velocidad: 1000,
    precio: 99,
    uso: 'Para familias con muchos dispositivos',
    incluye: ['+150 canales de TV digital', 'Películas y series'],
    tv: true,
  },
  {
    id: '1000-plus',
    nombre: '1000 Mbps Plus',
    velocidad: 1000,
    precio: 139,
    uso: 'Señal en toda la casa y una cámara para cuidarla',
    incluye: ['2 repetidores WiFi', '1 cámara WiFi'],
    repetidor: true,
    camara: true,
  },
  {
    id: 'pro',
    nombre: 'Pro',
    velocidad: 1500,
    precio: 139,
    uso: 'Para gaming, streaming 4K y más',
    incluye: [
      '+150 canales de TV digital',
      'Películas y series',
      'Repetidor WiFi',
      'Cámara IP',
    ],
    tv: true,
    repetidor: true,
    camara: true,
  },
]

/** Color de marca por velocidad (DESIGN.md: colores de plan). */
export function colorVelocidad(velocidad: number): string {
  if (velocidad >= 1500) return '#f59e0b'
  if (velocidad >= 1000) return '#a78bfa'
  if (velocidad >= 800) return '#3b82f6'
  return '#22c55e'
}

export const precioDesde = Math.min(...planes.map(p => p.precio))

export function nombreCompleto(plan: Plan): string {
  return plan.nombre.includes('Mbps') ? `Plan ${plan.nombre}` : `Plan ${plan.nombre} ${plan.velocidad} Mbps`
}
