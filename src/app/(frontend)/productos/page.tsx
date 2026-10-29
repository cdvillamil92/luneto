import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/utils'

export const metadata = {
  title: 'Catálogo de productos',
  description: 'Explora el catálogo de Luneto: ropa y accesorios con personalidad para tu perro.',
}

const PAGE_SIZE = 12

type Props = {
  searchParams: Promise<{
    categoria?: string
    q?: string
    pagina?: string
  }>
}

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams
  const categorySlug = params.categoria || ''
  const query = params.q || ''
  const page = Math.max(1, parseInt(params.pagina || '1', 10) || 1)

  const payload = await getPayload({ config })

  const [categories, products] = await Promise.all([
    payload.find({
      collection: 'categories',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 100,
      depth: 0,
    }),
    payload.find({
      collection: 'products',
      where: {
        status: { equals: 'published' },
        ...(categorySlug
          ? { 'category.slug': { equals: categorySlug } }
          : {}),
        ...(query
          ? { name: { contains: query } }
          : {}),
      },
      sort: 'order',
      limit: PAGE_SIZE,
      page,
      depth: 1,
    }),
  ])

  const totalPages = products.totalPages || 1
  const currentPage = products.page || 1

  const buildHref = (overrides: Record<string, string>) => {
    const sp = new URLSearchParams()
    if (categorySlug) sp.set('categoria', categorySlug)
    if (query) sp.set('q', query)
    Object.entries(overrides).forEach(([k, v]) => sp.set(k, v))
    const qs = sp.toString()
    return `/productos${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-charcoal">Catálogo</h1>
        <p className="mt-2 text-charcoal/70">
          Ropa y accesorios con personalidad, comodidad y estilo para tu perro.
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form method="get" action="/productos" className="flex flex-1 gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Buscar por nombre..."
            className="w-full max-w-sm rounded-full border border-sage/40 bg-white px-5 py-2.5 text-sm focus:border-olive focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-olive px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-olive-dark"
          >
            Buscar
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/productos"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !categorySlug ? 'bg-olive text-white' : 'bg-white text-charcoal hover:bg-ivory'
            }`}
          >
            Todos
          </Link>
          {categories.docs.map((cat) => (
            <Link
              key={cat.id}
              href={buildHref({ categoria: cat.slug })}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                categorySlug === cat.slug ? 'bg-olive text-white' : 'bg-white text-charcoal hover:bg-ivory'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Resultados */}
      {products.docs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sage/50 bg-ivory/50 py-24 text-center">
          <span className="text-5xl">🐶</span>
          <h2 className="mt-4 font-display text-2xl font-bold text-charcoal">No encontramos productos</h2>
          <p className="mt-2 max-w-md text-charcoal/70">
            No hay productos que coincidan con tu búsqueda. Intenta con otros términos o revisa todas las categorías.
          </p>
          <Link
            href="/productos"
            className="mt-6 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-dark"
          >
            Ver todo el catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.docs.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginación">
          {currentPage > 1 && (
            <Link
              href={buildHref({ pagina: String(currentPage - 1) })}
              className="rounded-full border border-sage/40 bg-white px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-ivory"
            >
              ← Anterior
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildHref({ pagina: String(p) })}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                p === currentPage ? 'bg-olive text-white' : 'bg-white text-charcoal hover:bg-ivory'
              }`}
            >
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={buildHref({ pagina: String(currentPage + 1) })}
              className="rounded-full border border-sage/40 bg-white px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-ivory"
            >
              Siguiente →
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}