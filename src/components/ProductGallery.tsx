'use client'

import { useState } from 'react'
import { getImageUrl, getMediaAlt, type Media } from '@/lib/client'

type GalleryImage = {
  url: string
  alt: string
}

export default function ProductGallery({ mainImage, gallery }: { mainImage: Media | number | null | undefined; gallery?: { image: Media | number; alt?: string | null }[] | null }) {
  const images: GalleryImage[] = []

  const mainUrl = getImageUrl(mainImage, 'feature')
  if (mainUrl) {
    images.push({ url: mainUrl, alt: getMediaAlt(mainImage) })
  }

  gallery?.forEach((item) => {
    const url = getImageUrl(item.image, 'feature')
    if (url) {
      images.push({ url, alt: item.alt || getMediaAlt(item.image) })
    }
  })

  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-3xl bg-ivory">
        <span className="font-display text-2xl text-charcoal/40">Sin imagen</span>
      </div>
    )
  }

  const current = images[active]

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-ivory">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.alt}
          className="h-full w-full object-cover"
        />
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            <button
              onClick={() => setActive((active - 1 + images.length) % images.length)}
              aria-label="Imagen anterior"
              className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-charcoal shadow backdrop-blur transition hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={() => setActive((active + 1) % images.length)}
              aria-label="Imagen siguiente"
              className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-charcoal shadow backdrop-blur transition hover:bg-white"
            >
              →
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                i === active ? 'border-olive' : 'border-transparent hover:border-sage'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}