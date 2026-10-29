import { getPayload } from 'payload'
import config from '@/payload.config'

import type { Media } from './client'
export type { Media } from './client'
export {
  formatPrice,
  getMediaUrl,
  getMediaAlt,
  getImageUrl,
  buildWhatsAppLink,
  slugify,
} from './client'

export type Category = {
  id: number
  name: string
  slug: string
  description?: string | null
  image?: Media | number | null
  status?: 'published' | 'draft' | null
  order?: number
}

export type Product = {
  id: number
  name: string
  slug: string
  sku: string
  shortDescription?: string | null
  description?: unknown
  price: number
  salePrice?: number | null
  currency?: string | null
  category?: Category | number | null
  mainImage?: Media | number | null
  gallery?: { image: Media | number; alt?: string | null }[] | null
  variants?: {
    sizes?: string[] | null
    colors?: string[] | null
  } | null
  availability?: 'in_stock' | 'out_of_stock' | 'on_order' | null
  status?: 'draft' | 'published' | null
  featured?: boolean
  order?: number
  seo?: {
    title?: string | null
    description?: string | null
  } | null
}

export type SiteSettings = {
  logo?: Media | number | null
  favicon?: Media | number | null
  storeName?: string | null
  tagline?: string | null
  description?: string | null
  whatsappNumber?: string | null
  contactEmail?: string | null
  social?: {
    instagram?: string | null
    facebook?: string | null
    tiktok?: string | null
  } | null
  footerText?: string | null
  seo?: {
    title?: string | null
    description?: string | null
  } | null
}

export type HomePage = {
  hero?: {
    title?: string
    subtitle?: string
    image?: Media | number | null
    buttonText?: string
    buttonLink?: string
  } | null
  featuredCategories?: (Category | number)[] | null
  featuredProducts?: (Product | number)[] | null
  promo?: {
    title?: string | null
    description?: string | null
    image?: Media | number | null
    buttonText?: string | null
    buttonLink?: string | null
  } | null
  about?: {
    title?: string | null
    content?: unknown
    image?: Media | number | null
  } | null
}

export async function getPayloadClient() {
  return getPayload({ config })
}