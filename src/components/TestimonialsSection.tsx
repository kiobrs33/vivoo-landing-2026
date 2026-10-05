import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Pause, Play, Quote, Star } from 'lucide-react'
import { Encabezado } from './ui'
import { useCarrusel } from '../lib/useCarrusel'

const testimonios = [
  {
    nombre: 'María Fernández',
    distrito: 'Yanahuara',
    texto:
      'Contraté Vivoo hace 6 meses y nunca tuve problemas. La velocidad es real, no como otras empresas que te prometen 100 Mbps y te dan 20. El equipo de instalación fue súper profesional y rápido.',
  },
  {
    nombre: 'Carlos Quispe',
    distrito: 'Cayma',
    texto:
      'Trabajo desde casa haciendo videollamadas todo el día y necesitaba una conexión estable. Con Vivoo no he tenido ni un solo corte en 4 meses. El soporte por WhatsApp responde rapidísimo.',
  },
  {
    nombre: 'Lucía Mamani',
    distrito: 'Cerro Colorado',
    texto:
      'El precio es justo y el servicio cumple todo lo que promete. La instalación fue al día siguiente de contratar. Muy satisfecha con Vivoo, lo recomiendo a todos mis vecinos.',
  },
  {
    nombre: 'Roberto Salinas',
    distrito: 'Miraflores',
    texto:
      'Tengo 4 hijos y todos usamos internet al mismo tiempo: streaming, gaming, clases virtuales... con el plan Pro todo va perfecto. Antes con otras empresas era un caos. Vivoo es otra cosa.',
  },
  {
    nombre: 'Ana Torres',
    distrito: 'Sachaca',
    texto:
      'Lo que más valoro es que son locales y tienen soporte real. Cuando tuve un problema a las 10pm, me llamaron en 20 minutos y lo resolvieron remotamente. Eso no lo hace ninguna empresa grande.',
  },
]

const INTERVALO = 6000

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('')
}

export default function TestimonialsSection() {
  const seccion = useRef<HTMLElement>(null)
  const { pista, activo, avance, alFinal, irA, medir, reducido } = useCarrusel()
  const siguiente = () => (alFinal ? irA(0) : irA(activo + 1))
  // Pausa elegida por la persona; la pausa por hover, foco o fuera de pantalla es temporal.
  const [pausado, setPausado] = useState(false)
  const [enEspera, setEnEspera] = useState(false)
  const [enVista, setEnVista] = useState(false)

  useEffect(() => {
    const el = seccion.current
    if (!el || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Avance automático: solo en pantalla, sin hover ni foco, y nunca con movimiento reducido.
  const automatico = !pausado && !enEspera && enVista && !reducido
  useEffect(() => {
    if (!automatico) return
    const t = window.setTimeout(siguiente, INTERVALO)
    return () => window.clearTimeout(t)
  }, [automatico, activo, alFinal, irA])

  return (
    <section
      ref={seccion}
      aria-roledescription="carrusel"
      aria-label="Testimonios de clientes"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0066ff_0%,#3540cc_45%,#6a1b9a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#4d94ff59,transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_90%,#6a1b9a99,transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Encabezado etiqueta="Testimonios" titulo="Lo que dicen nuestros" acento="vecinos" tono="oscuro">
            Hogares de Arequipa que ya navegan con Vivoo.
          </Encabezado>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setPausado(p => !p)}
              aria-label={pausado ? 'Reanudar el avance automático' : 'Pausar el avance automático'}
              className="presion flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-white"
              hidden={reducido}
            >
              {pausado ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              type="button"
              onClick={() => irA(activo - 1)}
              aria-label="Testimonio anterior"
              className="presion flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Siguiente testimonio"
              className="presion flex h-11 w-11 items-center justify-center rounded-full bg-white text-vivoo-ink hover:bg-vivoo-signal-dim focus-visible:outline-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <ul
          ref={pista}
          onScroll={medir}
          onMouseEnter={() => setEnEspera(true)}
          onMouseLeave={() => setEnEspera(false)}
          onFocus={() => setEnEspera(true)}
          onBlur={() => setEnEspera(false)}
          tabIndex={0}
          aria-label="Desliza para ver más testimonios"
          className="relative mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] focus-visible:outline-white [&::-webkit-scrollbar]:hidden"
        >
          {testimonios.map((t, i) => (
            <li
              key={t.nombre}
              role="group"
              aria-roledescription="testimonio"
              aria-label={`${i + 1} de ${testimonios.length}`}
              className="flex w-[86%] shrink-0 snap-start flex-col rounded-3xl bg-white p-6 sm:w-[calc((100%-1.25rem)/2)] sm:p-7 lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="flex items-center justify-between">
                <Quote size={30} className="text-vivoo-purple/25" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                <span className="flex gap-0.5" role="img" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} className="text-amber-400" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  ))}
                </span>
              </div>

              <blockquote className="mt-4 flex-1 text-[15px] leading-7 text-vivoo-ink/80">{t.texto}</blockquote>

              <footer className="mt-6 flex items-center gap-3 border-t border-vivoo-mist pt-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0066ff,#6a1b9a)] text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {iniciales(t.nombre)}
                </span>
                <span>
                  <span className="block font-semibold text-vivoo-ink">{t.nombre}</span>
                  <span className="flex items-center gap-1 text-sm text-vivoo-ink/55">
                    <MapPin size={13} aria-hidden="true" />
                    {t.distrito}, Arequipa
                  </span>
                </span>
              </footer>
            </li>
          ))}
        </ul>

        {/* Hebra de avance: muestra qué parte de los testimonios estás viendo */}
        <div className="mt-8 h-[3px] rounded-full bg-white/15" aria-hidden="true">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${avance.ancho}%`, marginLeft: `${avance.inicio}%` }}
          />
        </div>
        <p className="sr-only" aria-live={automatico ? 'off' : 'polite'}>
          Testimonio {activo + 1} de {testimonios.length}
        </p>
      </div>
    </section>
  )
}
