import { getPayload } from 'payload'
import config from '@/payload.config'
import WhatsAppButton from '@/components/WhatsAppButton'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Contacto',
  description: 'Contacta con Luneto por WhatsApp o correo. Estamos para ayudarte.',
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })

  const social = settings.social

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold text-charcoal">Contacto</h1>
        <p className="mt-4 text-lg text-charcoal/70">
          ¿Tienes dudas sobre nuestros productos? Escríbenos y te ayudamos a encontrar lo perfecto para tu perro.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {settings.whatsappNumber && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-sage/30 bg-white p-8 text-center shadow-sm">
            <span className="text-4xl">💬</span>
            <h2 className="font-display text-xl font-bold text-charcoal">WhatsApp</h2>
            <p className="text-sm text-charcoal/70">Respuesta rápida en horario de atención</p>
            <WhatsAppButton
              phone={settings.whatsappNumber}
              message="Hola Luneto 🐶, quiero hacer una consulta."
              label="Escribir por WhatsApp"
            />
          </div>
        )}

        {settings.contactEmail && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-sage/30 bg-white p-8 text-center shadow-sm">
            <span className="text-4xl">📧</span>
            <h2 className="font-display text-xl font-bold text-charcoal">Correo</h2>
            <p className="text-sm text-charcoal/70">Para consultas y colaboraciones</p>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-dark"
            >
              {settings.contactEmail}
            </a>
          </div>
        )}

        {social?.instagram && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-sage/30 bg-white p-8 text-center shadow-sm">
            <span className="text-4xl">📸</span>
            <h2 className="font-display text-xl font-bold text-charcoal">Instagram</h2>
            <p className="text-sm text-charcoal/70">Síguenos para ver novedades</p>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              @luneto
            </a>
          </div>
        )}

        {social?.facebook && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-sage/30 bg-white p-8 text-center shadow-sm">
            <span className="text-4xl">👍</span>
            <h2 className="font-display text-xl font-bold text-charcoal">Facebook</h2>
            <p className="text-sm text-charcoal/70">Únete a nuestra comunidad</p>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-dark"
            >
              Luneto
            </a>
          </div>
        )}
      </div>
    </div>
  )
}