import type { ReactNode } from 'react'

type Tono = 'claro' | 'oscuro'

/**
 * Encabezado de sección de DESIGN.md: etiqueta, titular con un único acento
 * (degradado o recuadro azul) y párrafo de apoyo.
 */
export function Encabezado({
  etiqueta,
  titulo,
  acento,
  estiloAcento = 'degradado',
  children,
  tono = 'claro',
  centrado = false,
  className = '',
}: {
  etiqueta: string
  titulo: string
  acento?: string
  estiloAcento?: 'degradado' | 'recuadro'
  children?: ReactNode
  tono?: Tono
  centrado?: boolean
  className?: string
}) {
  const oscuro = tono === 'oscuro'
  return (
    <div className={`max-w-2xl ${centrado ? 'mx-auto text-center' : ''} ${className}`}>
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
          oscuro ? 'text-vivoo-signal-dim' : 'text-vivoo-blue'
        }`}
      >
        {etiqueta}
      </p>
      <h2
        className={`text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl text-balance ${
          oscuro ? 'text-white' : 'text-vivoo-ink'
        }`}
      >
        {estiloAcento === 'recuadro' && acento ? (
          <>
            <span className="rounded-lg bg-vivoo-blue px-2 text-white [box-decoration-break:clone]">
              {acento}
            </span>{' '}
            {titulo}
          </>
        ) : (
          <>
            {titulo}
            {acento && (
              <>
                {' '}
                <span className={oscuro ? 'text-gradient-hero' : 'text-acento'}>{acento}</span>
              </>
            )}
          </>
        )}
      </h2>
      {children && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            oscuro ? 'text-white/70' : 'text-vivoo-ink/65'
          }`}
        >
          {children}
        </p>
      )}
    </div>
  )
}

/**
 * Espacio reservado para información que Vivoo todavía debe entregar.
 * Solo se ve en desarrollo: en producción no se publica nada inventado.
 */
export function Pendiente({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return (
    <div
      role="note"
      className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
    >
      <strong className="font-semibold">Pendiente antes de publicar:</strong> {children}
    </div>
  )
}

export const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.892 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)

/** Clases de campo de formulario sobre fondo claro (DESIGN.md: Inputs). */
export const campoClaro =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-vivoo-ink placeholder:text-vivoo-ink/40 outline-none transition-[border-color,box-shadow] duration-200 focus:border-vivoo-blue focus:shadow-[0_0_0_3px_rgba(0,102,255,0.12)]'

export const etiquetaCampo =
  'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-vivoo-ink/55'
