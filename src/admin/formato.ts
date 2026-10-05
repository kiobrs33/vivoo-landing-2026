export type Estado = 'PENDING' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED'

export const estados: Record<Estado, { texto: string; clase: string }> = {
  PENDING: { texto: 'Pendiente', clase: 'bg-vivoo-menta text-vivoo-blue' },
  IN_REVIEW: { texto: 'En revisión', clase: 'bg-vivoo-lila text-vivoo-purple' },
  RESOLVED: { texto: 'Atendido', clase: 'bg-green-50 text-green-700' },
  REJECTED: { texto: 'Improcedente', clase: 'bg-red-50 text-red-700' },
}

export const fecha = (iso: string, conHora = false) =>
  new Date(iso).toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(conHora ? { hour: '2-digit', minute: '2-digit' } : {}),
  })

/** Días calendario hasta la fecha límite (negativo si ya venció). */
export function diasRestantes(venceEn: string) {
  return Math.ceil((new Date(venceEn).getTime() - Date.now()) / 86_400_000)
}

/** Texto y tono del plazo para una hoja sin respuesta. */
export function plazo(venceEn: string) {
  const dias = diasRestantes(venceEn)
  if (dias < 0) return { texto: `Vencido hace ${-dias} ${-dias === 1 ? 'día' : 'días'}`, clase: 'text-red-700 font-semibold' }
  if (dias === 0) return { texto: 'Vence hoy', clase: 'text-red-700 font-semibold' }
  if (dias <= 3) return { texto: `Vence en ${dias} ${dias === 1 ? 'día' : 'días'}`, clase: 'text-amber-700 font-semibold' }
  return { texto: `Vence en ${dias} días`, clase: 'text-vivoo-ink/60' }
}
