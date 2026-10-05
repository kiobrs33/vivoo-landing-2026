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

  /** Atención comercial (confirmado por Vivoo). El soporte técnico es 24/7. */
  horarioAtencion: 'De 8 a. m. a 8 p. m.',

  facebook: 'https://www.facebook.com/share/18bz8UDubi/',
  tiktok: 'https://www.tiktok.com/@vivoo.net.pe',
} as const

/** Construye un enlace de WhatsApp con el mensaje ya codificado. */
export function waLink(mensaje?: string): string {
  const base = `https://wa.me/${site.whatsapp}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}
