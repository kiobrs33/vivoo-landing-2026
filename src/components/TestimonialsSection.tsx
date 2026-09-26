import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'María Fernández',
    district: 'Yanahuara',
    rating: 5,
    text: 'Contraté Vivoo hace 6 meses y nunca tuve problemas. La velocidad es real, no como otras empresas que te prometen 100 Mbps y te dan 20. El equipo de instalación fue súper profesional y rápido.',
    avatar: 'MF',
    color: '#a78bfa',
  },
  {
    name: 'Carlos Quispe',
    district: 'Cayma',
    rating: 5,
    text: 'Trabajo desde casa haciendo videollamadas todo el día y necesitaba una conexión estable. Con Vivoo no he tenido ni un solo corte en 4 meses. El soporte por WhatsApp responde rapidísimo.',
    avatar: 'CQ',
    color: '#3b82f6',
  },
  {
    name: 'Lucía Mamani',
    district: 'Cerro Colorado',
    rating: 5,
    text: 'El precio es justo y el servicio cumple todo lo que promete. La instalación fue al día siguiente de contratar. Muy satisfecha con Vivoo, lo recomiendo a todos mis vecinos.',
    avatar: 'LM',
    color: '#22c55e',
  },
  {
    name: 'Roberto Salinas',
    district: 'Miraflores',
    rating: 5,
    text: 'Tengo 4 hijos y todos usamos internet al mismo tiempo: streaming, gaming, clases virtuales... con el plan Pro todo va perfecto. Antes con otras empresas era un caos. Vivoo es otra cosa.',
    avatar: 'RS',
    color: '#f59e0b',
  },
  {
    name: 'Ana Torres',
    district: 'Sachaca',
    rating: 5,
    text: 'Lo que más valoro es que son locales y tienen soporte real. Cuando tuve un problema a las 10pm, me llamaron en 20 minutos y lo resolvieron remotamente. Eso no lo hace ninguna empresa grande.',
    avatar: 'AT',
    color: '#a78bfa',
  },
]

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)

  const t = testimonials[idx]

  return (
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#5c1fb8]">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a3dff_0%,#3b2fd8_45%,#5c1fb8_100%)]" />

        {/* Blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#5b82ff59,transparent_45%)]" />

        {/* Cyan glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,#2ee5ca2e,transparent_40%)]" />

        {/* Extra purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_90%,#5c1fb866)]" />

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#a8e6dd' }}
          >
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Card */}
        <div
          className="rounded-3xl p-8 sm:p-12 text-center relative"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>

          {/* Quote */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            "{t.text}"
          </p>

          {/* Author */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: t.color }}
            >
              {t.avatar}
            </div>
            <div>
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t.district}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="flex items-center justify-center w-10 h-10 rounded-full border transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? 24 : 8,
                  height: 8,
                  background: i === idx ? '#2ce5c9' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex items-center justify-center w-10 h-10 rounded-full border transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
