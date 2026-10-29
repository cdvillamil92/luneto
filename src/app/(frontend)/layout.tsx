import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Luneto — Ropa y accesorios para perros',
    template: '%s | Luneto',
  },
  description: 'Ropa y accesorios con personalidad, comodidad y estilo para tu perro.',
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })

  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header settings={settings} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <WhatsAppFloat phone={settings.whatsappNumber} />
        </div>
      </body>
    </html>
  )
}