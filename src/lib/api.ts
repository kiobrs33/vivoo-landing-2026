/**
 * Cliente de la API del backend (Coolify). La URL base viene de VITE_API_URL,
 * por ejemplo https://api.vivoo.net.pe; en desarrollo, http://localhost:4000.
 */
const BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errores: Record<string, string> = {},
  ) {
    super(message)
  }
}

export async function api<T>(ruta: string, opciones: RequestInit & { token?: string | null } = {}): Promise<T> {
  const { token, headers, ...resto } = opciones
  if (!BASE) {
    // Sin VITE_API_URL, /api/... caería en el propio sitio (Vercel devuelve index.html).
    console.error('VITE_API_URL no está configurada: el frontend no sabe dónde está el backend.')
    throw new ApiError(0, 'Este servicio no está disponible en este momento. Escríbenos por WhatsApp y te ayudamos.')
  }
  let respuesta: Response
  try {
    respuesta = await fetch(`${BASE}/api${ruta}`, {
      ...resto,
      headers: {
        ...(resto.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    })
  } catch {
    throw new ApiError(0, 'No pudimos conectarnos. Revisa tu conexión a internet e inténtalo de nuevo.')
  }

  // Una respuesta que no es JSON (por ejemplo, una página HTML de error del proxy) no es de la API.
  const esJson = respuesta.headers.get('content-type')?.includes('application/json')
  const cuerpo = esJson ? await respuesta.json().catch(() => null) : null
  if (!esJson) console.error(`Respuesta inesperada de ${BASE}/api${ruta}: ${respuesta.status} ${respuesta.headers.get('content-type')}`)
  if (!respuesta.ok || !cuerpo?.success) {
    throw new ApiError(
      respuesta.status,
      cuerpo?.message ?? 'Ocurrió un error inesperado. Inténtalo de nuevo.',
      cuerpo?.errors ?? {},
    )
  }
  return cuerpo.data as T
}

