import Link from 'next/link'
import { getImageUrl, getMediaAlt, type Category } from '@/lib/utils'

export default function CategoryCard({ category }: { category: Category }) {
  const imageUrl = getImageUrl(category.image, 'card')
  const alt = getMediaAlt(category.image)

  return (
    <Link
      href={`/productos?categoria=${category.slug}`}
      className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl border border-sage/30 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={alt || category.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-sage/40" />
      )}
      <div className="relative w-full bg-gradient-to-t from-charcoal/70 to-transparent p-4">
        <h3 className="font-display text-lg font-semibold text-white">{category.name}</h3>
        {category.description && (
          <p className="line-clamp-1 text-sm text-white/80">{category.description}</p>
        )}
      </div>
    </Link>
  )
}