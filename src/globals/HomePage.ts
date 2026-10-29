import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Página de inicio',
  admin: {
    group: 'Contenido',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banner principal',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Banner principal',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                  required: true,
                  defaultValue: 'Ropa con personalidad para tu perro',
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  label: 'Subtítulo',
                  defaultValue: 'Comodidad, estilo y mucho amor para tu mejor amigo.',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagen de portada',
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'Texto del botón',
                  defaultValue: 'Ver catálogo',
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  label: 'Enlace del botón',
                  defaultValue: '/productos',
                },
              ],
            },
          ],
        },
        {
          label: 'Categorías destacadas',
          fields: [
            {
              name: 'featuredCategories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Categorías destacadas',
            },
          ],
        },
        {
          label: 'Productos destacados',
          fields: [
            {
              name: 'featuredProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Productos destacados',
            },
          ],
        },
        {
          label: 'Bloque promocional',
          fields: [
            {
              name: 'promo',
              type: 'group',
              label: 'Bloque promocional',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descripción',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagen',
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'Texto del botón',
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  label: 'Enlace del botón',
                },
              ],
            },
          ],
        },
        {
          label: 'Información sobre Luneto',
          fields: [
            {
              name: 'about',
              type: 'group',
              label: 'Información',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                },
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Contenido',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Imagen',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}