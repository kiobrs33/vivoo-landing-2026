import { useEffect, useRef } from 'react'

/**
 * Marca un bloque con `data-visible` la primera vez que entra en pantalla.
 * El CSS (`[data-senal]` en index.css) usa esa marca para que la señal
 * recorra las hebras de fibra del bloque. Sin JavaScript, todo se ve completo.
 */
export function useSenal<T extends HTMLElement>(umbral = 0.35) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.dataset.visible = ''
      return
    }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        el.dataset.visible = ''
        observador.disconnect()
      },
      { threshold: umbral },
    )
    observador.observe(el)
    return () => observador.disconnect()
  }, [umbral])

  return ref
}
