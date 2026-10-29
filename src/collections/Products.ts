import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sku', 'price', 'category', 'status', 'updatedAt'],
    group: 'Catálogo',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL amigable del producto. Se genera automáticamente desde el nombre.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.name) {
              return data.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            }
            return undefined
          },
        ],
      },
    },
    {
      name: 'sku',
      type: 'text',
      label: 'SKU / Referencia',
      required: true,
      unique: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Descripción corta',
      admin: {
        description: 'Resumen breve que aparece en las tarjetas del catálogo.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descripción completa',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Precio',
      required: true,
      min: 0,
      admin: {
        description: 'Precio en pesos colombianos (COP).',
      },
    },
    {
      name: 'salePrice',
      type: 'number',
      label: 'Precio promocional',
      min: 0,
      admin: {
        description: 'Precio con descuento (opcional).',
      },
    },
    {
      name: 'currency',
      type: 'text',
      label: 'Moneda',
      defaultValue: 'COP',
      admin: {
        readOnly: true,
        description: 'Moneda por defecto: COP.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categoría',
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen principal',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galería de fotografías',
      admin: {
        description: 'Fotografías adicionales del producto. Puedes ordenarlas arrastrando.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Fotografía',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Texto alternativo',
        },
      ],
    },
    {
      name: 'variants',
      type: 'group',
      label: 'Variantes',
      admin: {
        description: 'Variantes opcionales como tallas y colores.',
      },
      fields: [
        {
          name: 'sizes',
          type: 'select',
          label: 'Tallas',
          hasMany: true,
          options: [
            { label: 'XS', value: 'xs' },
            { label: 'S', value: 's' },
            { label: 'M', value: 'm' },
            { label: 'L', value: 'l' },
            { label: 'XL', value: 'xl' },
          ],
        },
        {
          name: 'colors',
          type: 'text',
          label: 'Colores',
          hasMany: true,
        },
      ],
    },
    {
      name: 'availability',
      type: 'select',
      label: 'Disponibilidad',
      defaultValue: 'in_stock',
      options: [
        { label: 'Disponible', value: 'in_stock' },
        { label: 'Agotado', value: 'out_of_stock' },
        { label: 'Bajo pedido', value: 'on_order' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado de publicación',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Producto destacado',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de presentación',
      defaultValue: 0,
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título SEO',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción SEO',
        },
      ],
    },
  ],
}