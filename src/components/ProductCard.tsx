import Link from 'next/link'
import { formatPrice, getImageUrl, getMediaAlt } from '@/lib/client'
import type { Product } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = getImageUrl(product.mainImage, 'card')
  const alt = getMediaAlt(product.mainImage)
  const isOutOfStock = product.availability === 'out_of_stock'
  const hasSale = product.salePrice != null && product.salePrice < product.price

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sage/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-ivory">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={alt || product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ivory text-charcoal/40">
            <span className="font-display text-lg">{product.name}</span>
          </div>
        )}

        {hasSale && (
          <span className="absolute left-3 top-3 rounded-full bg-terracotta px-3 py-1 text-xs font-bold text-white">
            Oferta
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-lg font-semibold text-charcoal group-hover:text-olive">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="line-clamp-2 text-sm text-charcoal/70">{product.shortDescription}</p>
        )}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          {hasSale ? (
            <>
              <span className="text-lg font-bold text-olive-dark">{formatPrice(product.salePrice!, product.currency)}</span>
              <span className="text-sm text-charcoal/50 line-through">{formatPrice(product.price, product.currency)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-olive-dark">{formatPrice(product.price, product.currency)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}