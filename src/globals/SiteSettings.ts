import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del sitio',
  admin: {
    group: 'Configuración',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logotipo',
      admin: {
        description: 'Logotipo de Luneto. Se muestra en el encabezado.',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'storeName',
      type: 'text',
      label: 'Nombre de la tienda',
      required: true,
      defaultValue: 'Luneto',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Eslogan',
      defaultValue: 'Ropa y accesorios con personalidad para tu perro',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción general',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'Número de WhatsApp',
      admin: {
        description: 'Formato internacional sin espacios ni símbolos. Ej: 573001234567',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Correo de contacto',
    },
    {
      name: 'social',
      type: 'group',
      label: 'Redes sociales',
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'facebook', type: 'text', label: 'Facebook' },
        { name: 'tiktok', type: 'text', label: 'TikTok' },
      ],
    },
    {
      name: 'footerText',
      type: 'textarea',
      label: 'Textos del pie de página',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO predeterminado',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'description', type: 'textarea', label: 'Descripción' },
      ],
    },
  ],
}