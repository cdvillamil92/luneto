import { getPayload } from 'payload'
import config from '@/payload.config'
import RichText from '@/components/RichText'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getImageUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia de Luneto: ropa y accesorios con personalidad para tu perro.',
}

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const [settings, home] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.findGlobal({ slug: 'home-page', depth: 2 }),
  ])

  const about = home.about
  const aboutImage = getImageUrl(about?.image, 'card')

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold text-charcoal">Nosotros</h1>
        <p className="mt-4 text-lg text-charcoal/70">
          {settings.tagline || 'Ropa y accesorios con personalidad, comodidad y estilo para tu perro.'}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        {aboutImage && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aboutImage}
              alt={about?.title || 'Luneto'}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        )}
        <div>
          {about?.title && (
            <h2 className="font-display text-3xl font-bold text-olive-dark">{about.title}</h2>
          )}
          <div className="mt-4">
            <RichText content={about?.content} />
          </div>
          <div className="mt-8">
            <WhatsAppButton
              phone={settings.whatsappNumber}
              message="Hola Luneto 🐶, quiero conocer más sobre ustedes."
              label="Hablemos"
            />
          </div>
        </div>
      </div>
    </div>
  )
}