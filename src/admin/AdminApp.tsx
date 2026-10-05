import { useEffect, useState, type FormEvent } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import vivooLogo from '../images/vivoo-logo-color.png'
import { ApiError } from '../lib/api'
import { campoClaro, etiquetaCampo } from '../components/ui'
import { ProveedorSesion, useSesion } from './sesion'
import Lista from './Lista'
import Detalle from './Detalle'

/** Panel de administración del Libro de Reclamaciones (/admin). No se indexa. */
export default function AdminApp() {
  useEffect(() => {
    const titulo = document.title
    document.title = 'Panel · Libro de Reclamaciones · Vivoo'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.title = titulo
      meta.remove()
    }
  }, [])

  return (
    <ProveedorSesion>
      <Contenido />
    </ProveedorSesion>
  )
}

function Contenido() {
  const { usuario, cargando, salir } = useSesion()

  if (cargando) return <div className="min-h-screen bg-vivoo-cloud" />
  if (!usuario) return <Ingreso />

  return (
    <div className="min-h-screen bg-vivoo-cloud">
      <header className="sticky top-0 z-30 border-b border-vivoo-mist bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <img src={vivooLogo} alt="Vivoo" className="h-6 w-auto" />
            <span className="hidden h-5 w-px bg-vivoo-mist sm:block" aria-hidden="true" />
            <span className="hidden text-sm font-semibold text-vivoo-ink sm:block">Libro de Reclamaciones</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-right text-xs leading-4 text-vivoo-ink/60 sm:block">
              <span className="block font-semibold text-vivoo-ink">{usuario.name ?? usuario.email}</span>
              {usuario.email}
            </span>
            <button
              type="button"
              onClick={salir}
              className="presion inline-flex items-center gap-2 rounded-full border border-vivoo-mist px-4 py-2 text-sm font-semibold text-vivoo-ink hover:border-vivoo-ink/30"
            >
              <LogOut size={15} aria-hidden="true" />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="entrada-vista mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Routes>
          <Route index element={<Lista />} />
          <Route path=":codigo" element={<Detalle />} />
        </Routes>
      </main>
    </div>
  )
}

function Ingreso() {
  const { ingresar } = useSesion()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enviar = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError(null)
    try {
      await ingresar(correo, contrasena)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos iniciar sesión.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-vivoo-cloud px-4">
      <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,#0066ff_0%,#3540cc_45%,#6a1b9a_100%)]" aria-hidden="true" />
      <form onSubmit={enviar} noValidate className="entrada-vista relative w-full max-w-sm rounded-3xl border border-vivoo-mist bg-white p-7 shadow-[0_30px_60px_-30px_rgba(12,14,42,0.35)] sm:p-8">
        <img src={vivooLogo} alt="Vivoo" className="h-8 w-auto" />
        <h1 className="mt-6 text-2xl font-bold text-vivoo-ink">Panel de reclamos</h1>
        <p className="mt-1 text-sm text-vivoo-ink/60">Ingresa con tu cuenta de Vivoo.</p>

        <div className="mt-6 space-y-4">
          <label className="flex flex-col gap-1.5">
            <span className={etiquetaCampo}>Correo</span>
            <input type="email" autoComplete="username" value={correo} onChange={e => setCorreo(e.target.value)} className={`${campoClaro} border-vivoo-mist`} required />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={etiquetaCampo}>Contraseña</span>
            <input type="password" autoComplete="current-password" value={contrasena} onChange={e => setContrasena(e.target.value)} className={`${campoClaro} border-vivoo-mist`} required />
          </label>
        </div>

        {error && (
          <p role="alert" className="aparece mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="presion mt-6 inline-flex w-full items-center justify-center rounded-full bg-vivoo-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-vivoo-blue disabled:cursor-wait disabled:opacity-60"
        >
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
