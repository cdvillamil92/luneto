import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductGallery from '@/components/ProductGallery'
import ProductCard from '@/components/ProductCard'
import RichText from '@/components/RichText'
import WhatsAppButton from '@/components/WhatsAppButton'
import { formatPrice, type Category, type Product } from '@/lib/utils'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })

  const product = result.docs[0] as Product | undefined
  if (!product) return {}

  const title = product.seo?.title || product.name
  const description = product.seo?.description || product.shortDescription || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: typeof product.mainImage === 'object' && product.mainImage?.url
        ? [{ url: product.mainImage.url }]
        : undefined,
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  })

  const product = result.docs[0] as Product | undefined
  if (!product) notFound()

  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })

  const category = typeof product.category === 'object' && product.category !== null
    ? (product.category as Category)
    : null

  const isOutOfStock = product.availability === 'out_of_stock'
  const hasSale = product.salePrice != null && product.salePrice < product.price

  // Productos relacionados (misma categoría)
  let related: Product[] = []
  if (category) {
    const relatedResult = await payload.find({
      collection: 'products',
      where: {
        status: { equals: 'published' },
        'category.slug': { equals: category.slug },
        id: { not_equals: product.id },
      },
      limit: 4,
      depth: 1,
    })
    related = relatedResult.docs as Product[]
  }

  const whatsappMessage = `Hola Luneto 🐶, me interesa el producto *${product.name}* (Ref: ${product.sku}). ¿Me das más información?`

  const availabilityLabel = {
    in_stock: 'Disponible',
    out_of_stock: 'Agotado',
    on_order: 'Bajo pedido',
  }[product.availability || 'in_stock']

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Migas de pan */}
      <nav className="mb-8 text-sm text-charcoal/60" aria-label="Migas de pan">
        <Link href="/" className="hover:text-olive">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/productos" className="hover:text-olive">Catálogo</Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/productos?categoria=${category.slug}`} className="hover:text-olive">
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Galería */}
        <ProductGallery mainImage={product.mainImage} gallery={product.gallery} />

        {/* Información */}
        <div>
          {category && (
            <Link
              href={`/productos?categoria=${category.slug}`}
              className="text-sm font-semibold uppercase tracking-wide text-olive hover:text-olive-dark"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 font-display text-4xl font-bold text-charcoal">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                isOutOfStock ? 'bg-charcoal/10 text-charcoal/70' : 'bg-sage/30 text-olive-dark'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isOutOfStock ? 'bg-charcoal/50' : 'bg-olive'}`} />
              {availabilityLabel}
            </span>
            <span className="text-xs text-charcoal/50">Ref: {product.sku}</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            {hasSale ? (
              <>
                <span className="font-display text-4xl font-bold text-olive-dark">
                  {formatPrice(product.salePrice!, product.currency)}
                </span>
                <span className="text-xl text-charcoal/50 line-through">
                  {formatPrice(product.price, product.currency)}
                </span>
              </>
            ) : (
              <span className="font-display text-4xl font-bold text-olive-dark">
                {formatPrice(product.price, product.currency)}
              </span>
            )}
          </div>

          {product.shortDescription && (
            <p className="mt-6 leading-relaxed text-charcoal/80">{product.shortDescription}</p>
          )}

          {/* Variantes */}
          {product.variants && (product.variants.sizes?.length || product.variants.colors?.length) ? (
            <div className="mt-6 space-y-4">
              {product.variants.sizes?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-charcoal">Tallas</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.sizes.map((size) => (
                      <span key={size} className="rounded-full border border-sage/50 px-4 py-1.5 text-sm font-medium text-charcoal">
                        {size.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {product.variants.colors?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-charcoal">Colores</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.colors.map((color) => (
                      <span key={color} className="rounded-full border border-sage/50 px-4 py-1.5 text-sm font-medium text-charcoal">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8">
            <WhatsAppButton
              phone={settings.whatsappNumber}
              message={whatsappMessage}
              label="Consultar por WhatsApp"
              className="w-full sm:w-auto"
            />
          </div>

          {/* Descripción completa */}
          {product.description ? (
            <div className="mt-10 border-t border-sage/30 pt-8">
              <h2 className="font-display text-2xl font-bold text-charcoal">Descripción</h2>
              <div className="mt-4">
                <RichText content={product.description} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Productos relacionados */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-3xl font-bold text-charcoal">También te puede gustar</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}