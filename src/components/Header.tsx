import Link from 'next/link'
import { getMediaUrl } from '@/lib/client'
import type { SiteSettings } from '@/lib/utils'

export default function Header({ settings }: { settings: SiteSettings }) {
  const logoUrl = getMediaUrl(settings.logo)
  const storeName = settings.storeName || 'Luneto'

  return (
    <header className="sticky top-0 z-50 border-b border-sage/30 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={storeName} className="h-10 w-auto" />
          ) : (
            <span className="font-display text-2xl font-bold text-olive-dark">
              {storeName}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-charcoal hover:text-olive">
            Inicio
          </Link>
          <Link href="/productos" className="text-sm font-medium text-charcoal hover:text-olive">
            Catálogo
          </Link>
          <Link href="/nosotros" className="text-sm font-medium text-charcoal hover:text-olive">
            Nosotros
          </Link>
          <Link href="/contacto" className="text-sm font-medium text-charcoal hover:text-olive">
            Contacto
          </Link>
        </nav>

        <Link
          href="/productos"
          className="rounded-full bg-olive px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-olive-dark"
        >
          Ver catálogo
        </Link>
      </div>

      {/* Navegación móvil */}
      <nav className="flex justify-center gap-6 border-t border-sage/30 py-3 md:hidden">
        <Link href="/" className="text-sm font-medium text-charcoal hover:text-olive">
          Inicio
        </Link>
        <Link href="/productos" className="text-sm font-medium text-charcoal hover:text-olive">
          Catálogo
        </Link>
        <Link href="/nosotros" className="text-sm font-medium text-charcoal hover:text-olive">
          Nosotros
        </Link>
        <Link href="/contacto" className="text-sm font-medium text-charcoal hover:text-olive">
          Contacto
        </Link>
      </nav>
    </header>
  )
}