// Helpers seguros para usar en componentes cliente (sin importar payload).

export type Media = {
  id: number
  url?: string | null
  filename?: string | null
  alt?: string | null
  sizes?: {
    thumbnail?: { url?: string | null }
    card?: { url?: string | null }
    feature?: { url?: string | null }
  }
}

export function formatPrice(value: number, currency: string | null | undefined = 'COP'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency || 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function getMediaUrl(media: Media | number | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  return media.url || null
}

export function getMediaAlt(media: Media | number | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return media.alt || media.filename || ''
}

export function getImageUrl(
  media: Media | number | null | undefined,
  size?: 'thumbnail' | 'card' | 'feature',
): string | null {
  if (!media || typeof media === 'number') return null
  if (size && media.sizes?.[size]?.url) return media.sizes[size].url
  return media.url || null
}

export function buildWhatsAppLink(
  phone: string | null | undefined,
  message: string,
): string {
  const cleanPhone = (phone || '').replace(/[^\d]/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}