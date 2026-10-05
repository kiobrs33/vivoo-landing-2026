import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, ApiError } from '../lib/api'

export type Usuario = { id: number; email: string; name: string | null; role: 'ADMIN' | 'SUPERVISOR' | 'OPERATOR' }

type Sesion = {
  usuario: Usuario | null
  cargando: boolean
  ingresar: (correo: string, contrasena: string) => Promise<void>
  salir: () => void
  /** Llama a la API con el token; si la sesión expiró, la cierra. */
  pedir: <T>(ruta: string, opciones?: RequestInit) => Promise<T>
}

const CLAVE = 'vivoo-admin-token'
const Contexto = createContext<Sesion | null>(null)

const leerToken = () => {
  try {
    return sessionStorage.getItem(CLAVE)
  } catch {
    return null
  }
}

export function ProveedorSesion({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(leerToken)
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(Boolean(token))

  const guardar = (nuevo: string | null) => {
    setToken(nuevo)
    try {
      if (nuevo) sessionStorage.setItem(CLAVE, nuevo)
      else sessionStorage.removeItem(CLAVE)
    } catch {
      // Sin almacenamiento la sesión dura lo que la pestaña.
    }
  }

  const salir = useCallback(() => {
    guardar(null)
    setUsuario(null)
  }, [])

  const pedir = useCallback(
    async <T,>(ruta: string, opciones: RequestInit = {}) => {
      try {
        return await api<T>(ruta, { ...opciones, token })
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) salir()
        throw error
      }
    },
    [token, salir],
  )

  useEffect(() => {
    if (!token || usuario) return
    api<Usuario>('/auth/me', { token })
      .then(setUsuario)
      .catch(salir)
      .finally(() => setCargando(false))
  }, [token, usuario, salir])

  const ingresar = async (correo: string, contrasena: string) => {
    const data = await api<{ token: string; usuario: Usuario }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, contrasena }),
    })
    guardar(data.token)
    setUsuario(data.usuario)
  }

  return <Contexto.Provider value={{ usuario, cargando, ingresar, salir, pedir }}>{children}</Contexto.Provider>
}

export function useSesion() {
  const sesion = useContext(Contexto)
  if (!sesion) throw new Error('useSesion debe usarse dentro de ProveedorSesion')
  return sesion
}
