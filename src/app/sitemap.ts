import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const [products, categories] = await Promise.all([
    payload.find({
      collection: 'products',
      where: { status: { equals: 'published' } },
      limit: 1000,
      depth: 0,
      pagination: false,
    }),
    payload.find({
      collection: 'categories',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 0,
      pagination: false,
    }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/productos`, lastModified: new Date() },
    { url: `${BASE_URL}/nosotros`, lastModified: new Date() },
    { url: `${BASE_URL}/contacto`, lastModified: new Date() },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.docs.map((p) => ({
    url: `${BASE_URL}/productos/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.docs.map((c) => ({
    url: `${BASE_URL}/productos?categoria=${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
  }))

  return [...staticRoutes, ...productRoutes, ...categoryRoutes]
}