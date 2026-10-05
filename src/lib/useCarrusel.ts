import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Carrusel con scroll nativo y snap (deslizable con el dedo o el trackpad).
 * Expone la pista, el elemento activo, la porción visible para la hebra de
 * avance y la navegación. `irA` no da la vuelta: quien quiera volver al inicio
 * (por ejemplo, el avance automático) llama a irA(0) cuando `alFinal` es true.
 */
export function useCarrusel<T extends HTMLElement = HTMLUListElement>() {
  const pista = useRef<T>(null)
  const [activo, setActivo] = useState(0)
  const [avance, setAvance] = useState({ inicio: 0, ancho: 100 })
  /** Qué elementos se ven completos en la pista ahora mismo. */
  const [visibles, setVisibles] = useState<boolean[]>([])
  const [bordes, setBordes] = useState({ alInicio: true, alFinal: false })
  const [reducido, setReducido] = useState(false)

  const medir = useCallback(() => {
    const el = pista.current
    if (!el) return
    const items = Array.from(el.children) as HTMLElement[]
    if (items.length === 0) return
    const max = el.scrollWidth - el.clientWidth
    const ancho = Math.min(100, (el.clientWidth / el.scrollWidth) * 100)
    setAvance({ inicio: max > 0 ? (el.scrollLeft / max) * (100 - ancho) : 0, ancho })
    // El activo es el elemento más cercano al borde izquierdo de la pista.
    let cercano = 0
    items.forEach((item, i) => {
      if (Math.abs(item.offsetLeft - el.scrollLeft) < Math.abs(items[cercano].offsetLeft - el.scrollLeft)) cercano = i
    })
    setActivo(cercano)
    setVisibles(
      items.map(item => item.offsetLeft >= el.scrollLeft - 8 && item.offsetLeft + item.offsetWidth <= el.scrollLeft + el.clientWidth + 8),
    )
    setBordes({ alInicio: el.scrollLeft <= 4, alFinal: el.scrollLeft >= max - 4 })
  }, [])

  const irA = useCallback(
    (i: number) => {
      const el = pista.current
      if (!el || el.children.length === 0) return
      const indice = Math.max(0, Math.min(i, el.children.length - 1))
      // El navegador limita el scroll al máximo: al final, los últimos quedan a la vista.
      el.scrollTo({ left: (el.children[indice] as HTMLElement).offsetLeft, behavior: reducido ? 'auto' : 'smooth' })
    },
    [reducido],
  )

  useEffect(() => {
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [medir])

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducido(consulta.matches)
    const cambio = (e: MediaQueryListEvent) => setReducido(e.matches)
    consulta.addEventListener('change', cambio)
    return () => consulta.removeEventListener('change', cambio)
  }, [])

  /** true cuando todo cabe y no hace falta navegar. */
  const completo = avance.ancho >= 99.5

  return { pista, activo, avance, visibles, ...bordes, irA, medir, reducido, completo }
}
