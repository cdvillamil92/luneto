/* eslint-disable no-console */
import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const payload = await getPayload({ config })

console.log('🌱 Sembrando datos de demostración para Luneto...')

  // 1. Usuario administrador
  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@luneto.co' } },
    limit: 1,
  })

  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@luneto.co',
        password: 'LunetoAdmin2024!',
        name: 'Administrador Luneto',
        role: 'admin',
      },
    })
    console.log('✅ Usuario administrador creado: admin@luneto.co')
  } else {
    console.log('ℹ️  Usuario administrador ya existe')
  }

  // 2. Categorías
  const categoriesData = [
    { name: 'Abrigos', description: 'Abrigos y chaquetas para mantener a tu perro abrigado y con estilo.' },
    { name: 'Sudaderas', description: 'Sudaderas cómodas y cálidas para el día a día.' },
    { name: 'Camisetas', description: 'Camisetas frescas y con personalidad.' },
    { name: 'Accesorios', description: 'Correas, collares y accesorios con estilo.' },
    { name: 'Pijamas', description: 'Pijamas suaves para dormir cómodo.' },
  ]

  const categoryIds: Record<string, number> = {}
  for (const cat of categoriesData) {
    const existing = await payload.find({
      collection: 'categories',
      where: { name: { equals: cat.name } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'categories',
        data: {
          name: cat.name,
          description: cat.description,
          status: 'published',
          order: Object.keys(categoryIds).length,
        },
      })
      categoryIds[cat.name] = created.id
      console.log(`✅ Categoría creada: ${cat.name}`)
    } else {
      categoryIds[cat.name] = existing.docs[0].id
      console.log(`ℹ️  Categoría ya existe: ${cat.name}`)
    }
  }

  // 3. Productos de ejemplo
  const productsData = [
    {
      name: 'Abrigo de lana salvia',
      sku: 'LUN-ABR-001',
      shortDescription: 'Abrigo de lana suave en tono salvia, perfecto para días fríos.',
      price: 85000,
      salePrice: 72000,
      category: 'Abrigos',
      availability: 'in_stock',
      featured: true,
      order: 1,
      variants: { sizes: ['s', 'm', 'l'], colors: ['Salvia', 'Crema'] },
    },
    {
      name: 'Sudadera oliva con capucha',
      sku: 'LUN-SUD-002',
      shortDescription: 'Sudadera con capucha en tono oliva, cómoda y abrigada.',
      price: 65000,
      category: 'Sudaderas',
      availability: 'in_stock',
      featured: true,
      order: 2,
      variants: { sizes: ['xs', 's', 'm'], colors: ['Oliva', 'Marfil'] },
    },
    {
      name: 'Camiseta "Soy el jefe"',
      sku: 'LUN-CAM-003',
      shortDescription: 'Camiseta de algodón con estampado divertido.',
      price: 45000,
      salePrice: 38000,
      category: 'Camisetas',
      availability: 'in_stock',
      featured: true,
      order: 3,
      variants: { sizes: ['s', 'm', 'l', 'xl'], colors: ['Blanco', 'Crema'] },
    },
    {
      name: 'Correa de cuero marrón',
      sku: 'LUN-ACC-004',
      shortDescription: 'Correa resistente de cuero con herrajes de acero.',
      price: 55000,
      category: 'Accesorios',
      availability: 'in_stock',
      order: 4,
      variants: { colors: ['Marrón', 'Negro'] },
    },
    {
      name: 'Pijama de franela crema',
      sku: 'LUN-PIJ-005',
      shortDescription: 'Pijama de franela suave para noches cómodas.',
      price: 60000,
      category: 'Pijamas',
      availability: 'on_order',
      order: 5,
      variants: { sizes: ['s', 'm'], colors: ['Crema', 'Gris'] },
    },
    {
      name: 'Abrigo impermeable forest',
      sku: 'LUN-ABR-006',
      shortDescription: 'Abrigo impermeable para días de lluvia.',
      price: 95000,
      category: 'Abrigos',
      availability: 'in_stock',
      featured: true,
      order: 6,
      variants: { sizes: ['m', 'l', 'xl'], colors: ['Forest', 'Oliva'] },
    },
  ]

  for (const p of productsData) {
    const existing = await payload.find({
      collection: 'products',
      where: { sku: { equals: p.sku } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'products',
        data: {
          name: p.name,
          sku: p.sku,
          shortDescription: p.shortDescription,
          price: p.price,
          salePrice: p.salePrice,
          category: categoryIds[p.category],
          availability: p.availability as 'in_stock' | 'out_of_stock' | 'on_order',
          status: 'published',
          featured: p.featured,
          order: p.order,
          variants: p.variants,
        },
      })
      console.log(`✅ Producto creado: ${p.name}`)
    } else {
      console.log(`ℹ️  Producto ya existe: ${p.name}`)
    }
  }

  // 4. Configuración del sitio
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      storeName: 'Luneto',
      tagline: 'Ropa y accesorios con personalidad para tu perro',
      description: 'Diseñamos confecciones para tu mascota con personalidad, comodidad y mucho estilo.',
      whatsappNumber: '573001234567',
      contactEmail: 'hola@luneto.co',
      footerText: 'Luneto — Ropa y accesorios con personalidad, comodidad y estilo para tu perro.',
      seo: {
        title: 'Luneto — Ropa y accesorios para perros',
        description: 'Ropa y accesorios con personalidad, comodidad y estilo para tu perro.',
      },
    },
  })
  console.log('✅ Configuración del sitio actualizada')

  // 5. Página de inicio
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        title: 'Ropa con personalidad para tu perro',
        subtitle: 'Comodidad, estilo y mucho amor para tu mejor amigo.',
        buttonText: 'Ver catálogo',
        buttonLink: '/productos',
      },
      promo: {
        title: 'Nueva colección de abrigos',
        description: 'Descubre nuestros abrigos de lana y prendas impermeables para los días fríos.',
        buttonText: 'Ver abrigos',
        buttonLink: '/productos?categoria=abrigos',
      },
      about: {
        title: 'Sobre Luneto',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'En Luneto diseñamos confecciones para tu mascota con personalidad, comodidad y mucho estilo. Cada prenda está pensada para que tu perro se sienta cómodo y se vea increíble.',
                  },
                ],
              },
            ],
          },
        },
      },
    },
  })
  console.log('✅ Página de inicio configurada')

  console.log('🎉 ¡Datos de demostración listos!')
console.log('   Admin: https://luneto.ddev.site/admin')
console.log('   Usuario: admin@luneto.co')
console.log('   Contraseña: LunetoAdmin2024!')

process.exit(0)