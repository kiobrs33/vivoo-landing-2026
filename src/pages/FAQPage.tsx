import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { site, waLink } from '../config/site'

type Pregunta = {
  q: string
  a: string
  /** Sin confirmar por Vivoo: solo se muestra en desarrollo, marcada como pendiente. */
  pendiente?: boolean
}

const faqs: { category: string; items: Pregunta[] }[] = [
  {
    category: 'General',
    items: [
      { q: '¿Qué tipo de internet ofrece Vivoo?', a: 'Vivoo ofrece internet de fibra óptica simétrica: la velocidad de subida es igual a la de bajada. Es ideal para videollamadas, trabajo remoto y streaming.' },
      { q: '¿Vivoo tiene contratos de permanencia?', a: 'No. Todos nuestros planes son sin permanencia. Puedes cancelar en cualquier momento sin penalidades.' },
      { q: '¿En qué distritos de Arequipa tienen cobertura?', a: 'Tenemos cobertura en Cercado, Yanahuara, Cayma, Sachaca, Cerro Colorado, Paucarpata, Miraflores, Mariano Melgar, Alto Selva Alegre, Jacobo Hunter, José Luis Bustamante y Rivero y Socabaya. Consulta la página de cobertura para verificar tu distrito.' },
      { q: '¿Cuánto tiempo tarda la instalación?', a: 'La instalación se realiza entre 24 y 48 horas después de confirmar tu plan.' },
    ],
  },
  {
    category: 'Planes y precios',
    items: [
      { q: '¿Los precios incluyen IGV?', a: 'Sí, todos los precios mostrados en nuestro sitio incluyen IGV. No hay costos ocultos.' },
      { q: '¿El router está incluido?', a: 'Sí, todos los planes incluyen el router WiFi.' },
      { q: '¿Hay costo de instalación?', a: 'No. La instalación es gratuita en todos los planes.' },
      { q: '¿Puedo cambiar de plan después de contratar?', a: 'Sí, puedes cambiar de plan en cualquier momento. El cambio se aplica al siguiente ciclo de facturación. Contáctanos por WhatsApp para gestionarlo.', pendiente: true },
    ],
  },
  {
    category: 'Técnico',
    items: [
      { q: '¿Qué tan estable es la conexión de fibra óptica?', a: 'La fibra óptica transmite la señal con luz, por eso no se ve afectada por las interferencias eléctricas que sí afectan a los cables de cobre.' },
      { q: '¿Qué hago si tengo problemas de conexión?', a: `Escríbenos por WhatsApp al ${site.whatsappVisible} o llámanos al ${site.telefono}. Nuestro soporte técnico atiende las 24 horas, todos los días.` },
      { q: '¿Cuántos dispositivos puedo conectar?', a: 'Depende del plan. El plan Básico soporta cómodamente 1-3 dispositivos, el Estándar 3-6, el Premium 6-10 y el Pro más de 10 dispositivos simultáneos.', pendiente: true },
      { q: '¿Ofrecen IP estática?', a: 'Sí. Los planes Estándar, Premium y Pro incluyen una o más direcciones IP estáticas sin costo adicional.', pendiente: true },
    ],
  },
  {
    category: 'Pagos',
    items: [
      { q: '¿Cómo puedo pagar mi recibo?', a: 'Puedes pagar con Yape (Yape Servicios), BCP Banca Móvil o en agentes y ventanillas BCP. En la página Formas de pago tienes los pasos de cada uno.' },
      { q: '¿Cuándo se emite el recibo?', a: 'El recibo se emite el primer día de cada mes y se envía a tu correo electrónico. El pago debe realizarse dentro de los 5 primeros días del mes.', pendiente: true },
      { q: '¿Puedo activar el pago automático?', a: 'Sí, ofrecemos débito automático a tarjeta de crédito o cuenta bancaria. Contáctanos para configurarlo.', pendiente: true },
      { q: '¿Emiten boleta y factura?', a: 'Sí, emitimos tanto boleta como factura electrónica con validez ante SUNAT. Indícanos tu preferencia al contratar.', pendiente: true },
    ],
  },
]
  .map(grupo => ({ ...grupo, items: grupo.items.filter(i => import.meta.env.DEV || !i.pendiente) }))
  .filter(grupo => grupo.items.length > 0)

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

  const categories = ['Todos', ...faqs.map(f => f.category)]

  const filtered = faqs
    .map(group => ({
      ...group,
      items: group.items.filter(
        item =>
          (activeCategory === 'Todos' || activeCategory === group.category) &&
          (search === '' ||
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div style={{ background: '#f5f7fc', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center overflow-hidden rounded-b-[2rem]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a3dff_0%,#3b2fd8_45%,#5c1fb8_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#5b82ff59,transparent_45%)]" />

        <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#a8e6dd' }}>
          Preguntas frecuentes
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          ¿Tienes alguna duda?
        </h1>
        <p className="max-w-lg mx-auto text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Aquí encontrarás respuesta a las preguntas más comunes sobre nuestros servicios, planes y soporte técnico.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar pregunta..."
            aria-label="Buscar en preguntas frecuentes"
            className="w-full rounded-full py-3.5 pl-11 pr-5 text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
            }}
          />
        </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: activeCategory === cat ? '#0c0e2a' : 'white',
                color: activeCategory === cat ? 'white' : '#0c0e2a',
                border: '1px solid #e2e8f4',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ groups */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold" style={{ color: '#0c0e2a' }}>No se encontraron resultados</p>
            <p className="text-sm mt-2" style={{ color: 'rgba(12,14,42,0.5)' }}>Intenta con otras palabras clave</p>
          </div>
        )}

        {filtered.map(group => (
          <div key={group.category} className="mb-10">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0c0e2a' }}>{group.category}</h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e2e8f4' }}>
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`
                const isOpen = openItem === key
                return (
                  <div
                    key={key}
                    style={{ borderTop: i > 0 ? '1px solid #e2e8f4' : undefined }}
                  >
                    <button
                      onClick={() => setOpenItem(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
                      style={{ background: isOpen ? '#f5f7fc' : 'white' }}
                    >
                      <span className="text-sm font-semibold" style={{ color: '#0c0e2a' }}>
                        {item.q}
                        {item.pendiente && (
                          <span className="ml-2 rounded-full border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
                            Pendiente: sin confirmar
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        size={16}
                        style={{
                          color: 'rgba(12,14,42,0.4)',
                          flexShrink: 0,
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5" style={{ background: '#f5f7fc' }}>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,14,42,0.7)' }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center mt-8"
          style={{ background: '#0c0e2a' }}
        >
          <p className="text-white font-semibold mb-2">¿No encontraste lo que buscabas?</p>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Nuestro equipo está disponible para ayudarte por WhatsApp, teléfono o correo.
          </p>
          <a
            href={waLink('Hola Vivoo, tengo una consulta.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-transform hover:scale-[1.03]"
            style={{ background: '#2ce5c9', color: '#0c0e2a' }}
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
