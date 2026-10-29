import Link from 'next/link'
import { getMediaUrl } from '@/lib/client'
import type { SiteSettings } from '@/lib/utils'

export default function Footer({ settings }: { settings: SiteSettings }) {
  const storeName = settings.storeName || 'Luneto'
  const footerText = settings.footerText
  const social = settings.social

  return (
    <footer className="border-t border-sage/30 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-xl font-bold text-olive-dark">{storeName}</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              {footerText || 'Ropa y accesorios con personalidad, comodidad y estilo para tu perro.'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-olive">Navegación</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/" className="text-charcoal/80 hover:text-olive">Inicio</Link></li>
              <li><Link href="/productos" className="text-charcoal/80 hover:text-olive">Catálogo</Link></li>
              <li><Link href="/nosotros" className="text-charcoal/80 hover:text-olive">Nosotros</Link></li>
              <li><Link href="/contacto" className="text-charcoal/80 hover:text-olive">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-olive">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-charcoal/80">
              {settings.whatsappNumber && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-olive"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {settings.contactEmail && (
                <li>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-olive">
                    {settings.contactEmail}
                  </a>
                </li>
              )}
              {social?.instagram && (
                <li>
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-olive">
                    Instagram
                  </a>
                </li>
              )}
              {social?.facebook && (
                <li>
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-olive">
                    Facebook
                  </a>
                </li>
              )}
              {social?.tiktok && (
                <li>
                  <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-olive">
                    TikTok
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-sage/30 pt-6 text-center text-xs text-charcoal/60">
          © {new Date().getFullYear()} {storeName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}