import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import RichText from '@/components/RichText'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getImageUrl, getMediaAlt, type Category, type Product } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Luneto — Ropa y accesorios con personalidad para tu perro',
  description:
    'Ropa y accesorios para perros con personalidad, comodidad y mucho estilo. Descubre nuestro catálogo y consulta por WhatsApp.',
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [home, settings, categories, featuredProducts, latestProducts] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }),
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.find({
      collection: 'categories',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 6,
      depth: 1,
    }),
    payload.find({
      collection: 'products',
      where: { status: { equals: 'published' }, featured: { equals: true } },
      sort: 'order',
      limit: 8,
      depth: 1,
    }),
    payload.find({
      collection: 'products',
      where: { status: { equals: 'published' } },
      sort: '-createdAt',
      limit: 4,
      depth: 1,
    }),
  ])

  const hero = home.hero
  const heroImage = getImageUrl(hero?.image, 'feature')
  const heroAlt = getMediaAlt(hero?.image)

  const featuredCats = (home.featuredCategories || [])
    .map((c) => (typeof c === 'object' && c !== null ? (c as Category) : null))
    .filter(Boolean) as Category[]

  const featuredProds = (home.featuredProducts || [])
    .map((p) => (typeof p === 'object' && p !== null ? (p as Product) : null))
    .filter(Boolean) as Product[]

  const promo = home.promo
  const promoImage = getImageUrl(promo?.image, 'card')
  const about = home.about
  const aboutImage = getImageUrl(about?.image, 'card')

  const whatsappPhone = settings.whatsappNumber

  return (
    <>
      {/* Banner principal */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl font-bold leading-tight text-olive-dark sm:text-5xl lg:text-6xl">
              {hero?.title || 'Ropa con personalidad para tu perro'}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-charcoal/80">
              {hero?.subtitle || 'Comodidad, estilo y mucho amor para tu mejor amigo.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={hero?.buttonLink || '/productos'}
                className="rounded-full bg-olive px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-olive-dark"
              >
                {hero?.buttonText || 'Ver catálogo'}
              </Link>
              <WhatsAppButton
                phone={whatsappPhone}
                message="Hola Luneto, quiero información sobre sus productos 🐶"
                label="Escríbenos"
              />
            </div>
          </div>
          <div className="relative">
            {heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt={heroAlt || 'Luneto'}
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-3xl bg-sage/30">
                <span className="font-display text-3xl text-olive-dark">Luneto 🐶</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
      {(featuredCats.length > 0 || categories.docs.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-charcoal">Categorías</h2>
              <p className="mt-1 text-charcoal/70">Explora por tipo de producto</p>
            </div>
            <Link href="/productos" className="text-sm font-semibold text-olive hover:text-olive-dark">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {(featuredCats.length > 0 ? featuredCats : (categories.docs as Category[])).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      )}

      {/* Productos destacados */}
      {(featuredProds.length > 0 || featuredProducts.docs.length > 0) && (
        <section className="bg-ivory/60">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-charcoal">Productos destacados</h2>
                <p className="mt-1 text-charcoal/70">Los favoritos de Luneto</p>
              </div>
              <Link href="/productos" className="text-sm font-semibold text-olive hover:text-olive-dark">
                Ver todo →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {(featuredProds.length > 0 ? featuredProds : (featuredProducts.docs as Product[])).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bloque promocional */}
      {promo?.title && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-sage/30 bg-white shadow-sm lg:grid-cols-2">
            {promoImage && (
              <div className="relative min-h-[240px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={promoImage} alt={promo.title} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            )}
            <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
              <h2 className="font-display text-3xl font-bold text-olive-dark">{promo.title}</h2>
              {promo.description && <p className="leading-relaxed text-charcoal/80">{promo.description}</p>}
              {promo.buttonText && promo.buttonLink && (
                <Link
                  href={promo.buttonLink}
                  className="inline-flex w-fit rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {promo.buttonText}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Novedades */}
      {latestProducts.docs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-charcoal">Novedades</h2>
              <p className="mt-1 text-charcoal/70">Lo último que llegó a Luneto</p>
            </div>
            <Link href="/productos" className="text-sm font-semibold text-olive hover:text-olive-dark">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {latestProducts.docs.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>
        </section>
      )}

      {/* Información sobre Luneto */}
      {about?.title && (
        <section className="bg-olive-dark">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="order-2 lg:order-1">
              {aboutImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={aboutImage}
                  alt={about.title}
                  className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
                />
              )}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-3xl font-bold text-white">{about.title}</h2>
              <div className="mt-4">
                <RichText content={about.content} textColor="text-white/90" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}