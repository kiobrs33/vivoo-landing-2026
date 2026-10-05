import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Camera, ChevronLeft, ChevronRight, Clapperboard, Pause, Play, Repeat2, Sparkles, Tv, Wifi } from 'lucide-react'
import { waLink } from '../config/site'
import { nombreCompleto, planes, type Plan, type TipoBeneficio } from '../config/planes'
import { Encabezado, WhatsAppIcon } from './ui'
import { useSenal } from '../lib/useSenal'
import { useCarrusel } from '../lib/useCarrusel'
import vivooLogo from '../images/vivoo-logo-color.png'

const iconos: Record<TipoBeneficio, LucideIcon> = {
  fibra: Wifi,
  tv: Tv,
  peliculas: Clapperboard,
  repetidor: Repeat2,
  camara: Camera,
}

const velocidadMaxima = Math.max(...planes.map(p => p.velocidad))
const formatoVelocidad = new Intl.NumberFormat('en-US')

function TarjetaPlan({ plan, indice }: { plan: Plan; indice: number }) {
  const color = plan.color
  const destacado = Boolean(plan.popular)
  const mensaje = `Hola Vivoo, me interesa el ${nombreCompleto(plan)} por S/ ${plan.precio} al mes.`
  // La fibra va en todos los planes y ya se dice bajo la velocidad: la lista muestra solo los extras.
  const extras = plan.incluye.filter(b => b.tipo !== 'fibra')
  const beneficios = extras.length > 0 ? extras : [{ tipo: 'fibra' as const, texto: 'Solo internet, sin extras' }]

  return (
    <article
      style={{ '--plan': color } as CSSProperties}
      className={`relative flex h-full flex-col rounded-3xl p-5 transition-[box-shadow,border-color] duration-300 ease-out sm:p-6 ${
        destacado
          ? 'bg-vivoo-ink text-white shadow-[0_24px_60px_-24px_rgba(106,27,154,0.65)] hover:shadow-[0_28px_70px_-22px_rgba(106,27,154,0.95)]'
          : 'border border-vivoo-mist bg-white text-vivoo-ink hover:border-[color-mix(in_srgb,var(--plan)_55%,white)] hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--plan)_14%,transparent),0_22px_44px_-16px_color-mix(in_srgb,var(--plan)_55%,transparent)]'
      }`}
    >
      {destacado && (
        <>
          {/* Luz del logo: azul arriba a la izquierda, morado abajo a la derecha */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_60%_at_0%_0%,rgba(0,102,255,0.35),transparent_60%),radial-gradient(100%_60%_at_100%_100%,rgba(106,27,154,0.55),transparent_60%)]"
            aria-hidden="true"
          />
          <p className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,#0066ff,#6a1b9a)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_8px_20px_-8px_rgba(0,102,255,0.8)] sm:left-7">
            <Sparkles size={13} aria-hidden="true" />
            Más popular
          </p>
        </>
      )}

      <div className="relative flex flex-1 flex-col">
        <h3 className="flex items-center gap-2.5 text-xl font-bold leading-none">
          <img
            src={vivooLogo}
            alt="Vivoo"
            width={70}
            height={22}
            className={`h-[22px] w-auto ${destacado ? 'brightness-0 invert' : ''}`}
          />
          <span className="h-4 w-px bg-current opacity-20" aria-hidden="true" />
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
            {plan.nombre}
          </span>
        </h3>

        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="flex items-baseline gap-1.5 leading-none">
            <span className="text-5xl font-extrabold tabular-nums tracking-[-0.03em]">
              {formatoVelocidad.format(plan.velocidad)}
            </span>
            <span className={`text-lg font-semibold ${destacado ? 'text-white/60' : 'text-vivoo-ink/50'}`}>Mbps</span>
          </p>
          <div className="pb-1 text-right">
            <p className="flex items-baseline justify-end gap-1 leading-none">
              <span className={`text-sm font-semibold ${destacado ? 'text-white/60' : 'text-vivoo-ink/55'}`}>S/</span>
              <span className="text-3xl font-extrabold tabular-nums tracking-[-0.02em]">{plan.precio}</span>
              <span className={`text-sm ${destacado ? 'text-white/60' : 'text-vivoo-ink/55'}`}>/mes</span>
            </p>
            <p className={`mt-1.5 text-xs ${destacado ? 'text-white/45' : 'text-vivoo-ink/45'}`}>IGV incluido</p>
          </div>
        </div>

        {/* Hebra de fibra: el largo compara la velocidad con el plan más rápido */}
        <div className={`mt-4 h-1 rounded-full ${destacado ? 'bg-white/10' : 'bg-vivoo-mist'}`} aria-hidden="true">
          <div
            className="hebra relative h-full overflow-hidden rounded-full bg-[linear-gradient(90deg,#0066ff,#6a1b9a)]"
            style={{ width: `${(plan.velocidad / velocidadMaxima) * 100}%`, '--retraso': `${indice * 140}ms` } as CSSProperties}
          />
        </div>
        <p className={`mt-2 text-xs ${destacado ? 'text-white/60' : 'text-vivoo-ink/55'}`}>
          Fibra óptica simétrica · Router WiFi incluido
        </p>

        <ul
          className={`mt-5 space-y-2.5 border-t pt-5 ${destacado ? 'border-white/10' : 'border-vivoo-mist'}`}
          aria-label={`Qué incluye el ${nombreCompleto(plan)}`}
        >
          {beneficios.map(({ tipo, texto }) => {
            const Icon = iconos[tipo]
            return (
              <li key={texto} className={`flex items-center gap-3 text-sm ${destacado ? 'text-white/85' : 'text-vivoo-ink/80'}`}>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${color}${destacado ? '2e' : '1a'}`, color: destacado ? '#ffffff' : color }}
                  aria-hidden="true"
                >
                  <Icon size={14} strokeWidth={2.25} />
                </span>
                {texto}
              </li>
            )
          })}
        </ul>

        <div className="min-h-5 flex-1" aria-hidden="true" />

        <a
          href={waLink(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className={`presion inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold hover:scale-[1.02] ${
            destacado
              ? 'bg-[linear-gradient(100deg,#0066ff,#6a1b9a)] text-white shadow-[0_10px_24px_-10px_rgba(0,102,255,0.9)] focus-visible:outline-white'
              : 'bg-vivoo-ink text-white hover:bg-vivoo-blue'
          }`}
          aria-label={`Contratar el ${nombreCompleto(plan)} por WhatsApp`}
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          Contratar {plan.nombre}
        </a>
      </div>
    </article>
  )
}

const INTERVALO = 5000
/** Tras tocar el carrusel, el avance automático espera este tiempo antes de seguir. */
const PAUSA_TRAS_INTERACCION = 12000

function Flecha({
  lado,
  onClick,
  deshabilitada,
  className = '',
}: {
  lado: 'izq' | 'der'
  onClick: () => void
  deshabilitada: boolean
  className?: string
}) {
  const Icono = lado === 'izq' ? ChevronLeft : ChevronRight
  const boton = useRef<HTMLButtonElement>(null)
  const conFoco = useRef(false)

  // Si se desactiva mientras tiene el foco, el foco pasa a la otra flecha visible
  // (el navegador lo suelta al desactivarse y quien usa teclado se quedaría sin lugar).
  useEffect(() => {
    const el = boton.current
    if (!deshabilitada || !el || !conFoco.current) return
    conFoco.current = false
    const otra = [...document.querySelectorAll<HTMLButtonElement>('button[aria-controls="planes-pista"]')].find(
      b => b !== el && !b.disabled && b.offsetParent !== null,
    )
    otra?.focus()
  }, [deshabilitada])

  return (
    <button
      ref={boton}
      onFocus={() => (conFoco.current = true)}
      onBlur={() => (conFoco.current = false)}
      type="button"
      onClick={onClick}
      disabled={deshabilitada}
      aria-label={lado === 'izq' ? 'Ver planes anteriores' : 'Ver más planes'}
      aria-controls="planes-pista"
      className={`presion flex shrink-0 items-center justify-center rounded-full bg-white text-vivoo-ink shadow-[0_10px_30px_-8px_rgba(12,14,42,0.35)] ring-1 ring-vivoo-mist enabled:hover:bg-vivoo-ink enabled:hover:text-white disabled:cursor-not-allowed disabled:text-vivoo-ink/25 disabled:shadow-none ${className}`}
    >
      <Icono size={22} strokeWidth={2.25} />
    </button>
  )
}

export default function PlansSection() {
  const senal = useSenal<HTMLDivElement>(0.2)
  const seccion = useRef<HTMLElement>(null)
  const { pista, activo, avance, visibles, alInicio, alFinal, irA, medir, reducido, completo } = useCarrusel()
  const sinAnterior = alInicio || completo
  const sinSiguiente = alFinal || completo
  const [pausado, setPausado] = useState(false)
  const [enEspera, setEnEspera] = useState(false)
  const [enVista, setEnVista] = useState(false)
  const [pausaHasta, setPausaHasta] = useState(0)
  const selector = useRef<HTMLElement>(null)

  // En móvil la fila de planes se desplaza para mostrar siempre la pestaña del plan a la vista.
  const primero = visibles.indexOf(true)
  useEffect(() => {
    const nav = selector.current
    const chip = nav?.children[primero] as HTMLElement | undefined
    if (!nav || !chip || nav.scrollWidth <= nav.clientWidth) return
    nav.scrollTo({ left: chip.offsetLeft - 16, behavior: reducido ? 'auto' : 'smooth' })
  }, [primero, reducido])

  useEffect(() => {
    const el = seccion.current
    if (!el || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), { threshold: 0.45 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Avance automático: solo en pantalla, sin el cursor encima y nunca con movimiento reducido.
  const automatico = !pausado && !enEspera && enVista && !reducido && !completo
  const espera = Math.max(INTERVALO, pausaHasta - Date.now())
  useEffect(() => {
    if (!automatico) return
    // Al llegar al último, el avance automático vuelve al primero.
    const t = window.setTimeout(() => (alFinal ? irA(0) : irA(activo + 1)), espera)
    return () => window.clearTimeout(t)
  }, [automatico, activo, alFinal, espera, irA])

  const tocar = () => setPausaHasta(Date.now() + PAUSA_TRAS_INTERACCION)
  const navegar = (i: number) => {
    tocar()
    irA(i)
  }

  return (
    <section
      ref={seccion}
      id="planes"
      className="bg-vivoo-cloud py-20 sm:py-28"
      onMouseEnter={() => setEnEspera(true)}
      onMouseLeave={() => setEnEspera(false)}
      onFocusCapture={() => setEnEspera(true)}
      onBlurCapture={() => setEnEspera(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          etiqueta="Planes para tu hogar"
          acento="Velocidad real,"
          estiloAcento="recuadro"
          titulo="sin letra chica."
        >
          Todos los planes son de fibra óptica simétrica, sin permanencia, con router WiFi e
          instalación gratuita. Los precios son mensuales y ya incluyen IGV.
        </Encabezado>

        {/* Selector de planes: muestra cuáles están a la vista y lleva a cualquiera */}
        <div className="mt-10 flex items-center gap-3">
            <nav ref={selector} aria-label="Elegir plan" className="relative -ml-4 flex flex-1 gap-2 overflow-x-auto pb-1 pl-4 sm:ml-0 sm:pl-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {planes.map((plan, i) => {
                const aLaVista = visibles[i]
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => navegar(i)}
                    aria-current={aLaVista ? 'true' : undefined}
                    className={`presion inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,color] duration-300 ${
                      aLaVista ? 'border-vivoo-ink bg-vivoo-ink text-white' : 'border-vivoo-mist bg-white text-vivoo-ink/70 hover:border-vivoo-ink/30 hover:text-vivoo-ink'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: plan.color }} aria-hidden="true" />
                    {plan.nombre}
                    <span className={`text-xs font-medium tabular-nums ${aLaVista ? 'text-white/60' : 'text-vivoo-ink/45'}`}>S/ {plan.precio}</span>
                  </button>
                )
              })}
            </nav>

            <div className="flex shrink-0 gap-2 sm:hidden">
              <Flecha lado="izq" onClick={() => navegar(activo - 1)} deshabilitada={sinAnterior} className="h-11 w-11" />
              <Flecha lado="der" onClick={() => navegar(activo + 1)} deshabilitada={sinSiguiente} className="h-11 w-11" />
            </div>

            {!reducido && (
              <button
                type="button"
                onClick={() => {
                  setPausado(p => !p)
                  setPausaHasta(0)
                }}
                aria-label={pausado ? 'Reanudar el avance automático de los planes' : 'Pausar el avance automático de los planes'}
                className="presion relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-vivoo-ink ring-1 ring-vivoo-mist hover:ring-vivoo-ink/30"
              >
                {/* Anillo que se llena hasta el siguiente cambio de plan */}
                {automatico && (
                  <svg key={`${activo}-${pausaHasta}`} viewBox="0 0 44 44" className="absolute inset-0 -rotate-90" aria-hidden="true">
                    <circle
                      cx="22"
                      cy="22"
                      r="20.5"
                      fill="none"
                      stroke="url(#anillo-planes)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      pathLength={1}
                      className="anillo-avance"
                      style={{ animationDuration: `${espera}ms` }}
                    />
                    <defs>
                      <linearGradient id="anillo-planes" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#0066ff" />
                        <stop offset="1" stopColor="#6a1b9a" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
                {pausado ? <Play size={15} /> : <Pause size={15} />}
              </button>
            )}
          </div>

        <div ref={senal} data-senal className="relative">
          {/* Flechas a los costados desde tableta */}
          <Flecha lado="izq" onClick={() => navegar(activo - 1)} deshabilitada={sinAnterior} className="absolute -left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 sm:flex lg:-left-6 xl:-left-16" />
          <Flecha lado="der" onClick={() => navegar(activo + 1)} deshabilitada={sinSiguiente} className="absolute -right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 sm:flex lg:-right-6 xl:-right-16" />

          {/* Relleno vertical: deja ver el distintivo "Más popular" y la sombra al pasar el cursor */}
          <ul
            id="planes-pista"
            ref={pista}
            onScroll={medir}
            onPointerDown={tocar}
            onWheel={e => Math.abs(e.deltaX) > Math.abs(e.deltaY) && tocar()}
            tabIndex={0}
            aria-label="Planes de internet para el hogar. Desliza para ver más."
            className="relative -mx-2 mt-4 flex snap-x snap-mandatory scroll-px-2 gap-6 overflow-x-auto px-2 pb-10 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {planes.map((plan, i) => (
              <li
                key={plan.id}
                aria-label={`${i + 1} de ${planes.length}: ${nombreCompleto(plan)}`}
                className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <TarjetaPlan plan={plan} indice={i} />
              </li>
            ))}
          </ul>
        </div>

        {!completo && (
          <div className="h-[3px] rounded-full bg-vivoo-mist" aria-hidden="true">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#0066ff,#6a1b9a)]"
              style={{ width: `${avance.ancho}%`, marginLeft: `${avance.inicio}%` }}
            />
          </div>
        )}

        <p className="mt-8 text-sm text-vivoo-ink/60">
          Sujeto a disponibilidad de cobertura en tu zona.{' '}
          <Link to="/#cobertura" className="font-semibold text-vivoo-blue underline decoration-vivoo-blue/30 underline-offset-4 hover:decoration-vivoo-blue">
            Mira el mapa de cobertura
          </Link>
        </p>
      </div>
    </section>
  )
}
