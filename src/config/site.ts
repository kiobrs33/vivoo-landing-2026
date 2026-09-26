/**
 * Datos de contacto y enlaces de la empresa.
 *
 * Centralizados aquí porque antes vivían duplicados (y desincronizados)
 * en cada página: había tres números de WhatsApp distintos y uno de ellos
 * con un espacio que rompía el enlace.
 */

export const site = {
  nombreLegal: 'Vivoo Telecom S.A.C.',
  nombreComercial: 'Vivoo',
  ruc: '20615713164',
  ciudad: 'Arequipa, Perú',

  telefono: '054 350040',
  telefonoHref: 'tel:+5154350040',

  correo: 'team@vivoo.net.pe',
  correoHref: 'mailto:team@vivoo.net.pe',

  /** Mismo número que el fijo. Formato internacional sin el 0 del código de ciudad, como lo exige wa.me. */
  whatsapp: '5154350040',
  whatsappVisible: '+51 54 350040',

  /** Sin confirmar: no se publica hasta que Vivoo lo confirme. */
  horarioAtencion: 'Lun–Sáb 8am–8pm',

  facebook: 'https://www.facebook.com/p/Vivoo-Telecom-61592327309011/',
} as const

/** Construye un enlace de WhatsApp con el mensaje ya codificado. */
export function waLink(mensaje?: string): string {
  const base = `https://wa.me/${site.whatsapp}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}

/**
 * Entidad reguladora de telecomunicaciones en Perú y fuentes oficiales.
 * Verificado en osiptel.gob.pe: el Fono Ayuda para usuarios es el 1844.
 */
export const osiptel = {
  fonoAyuda: '1844',
  fonoAyudaHref: 'tel:1844',
  web: 'https://www.osiptel.gob.pe',
  gobPe: 'https://www.gob.pe/osiptel',
  normativas: 'https://www.osiptel.gob.pe/portal-del-usuario/lo-que-debes-saber/normativas-de-usuarios/',
} as const

/** Fuentes oficiales de protección al consumidor. */
export const consumidor = {
  indecopi: 'https://www.gob.pe/indecopi',
  portal: 'https://consumidor.gob.pe',
} as const
