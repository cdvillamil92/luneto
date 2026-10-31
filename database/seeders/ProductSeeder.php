<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::pluck('id', 'slug')->toArray();

        $products = [
            [
                'name' => 'Abrigo de Lana Clásico',
                'sku' => 'LUN-ABR-001',
                'short_description' => 'Abrigo de lana suave y abrigado, perfecto para los días fríos.',
                'description' => '<p>Abrigo de lana premium con forro interior suave. Diseñado para mantener a tu perro abrigado y con mucho estilo.</p>',
                'price' => 85000,
                'sale_price' => 72000,
                'category_slug' => 'abrigos-y-chaquetas',
                'availability' => 'in_stock',
                'status' => 'published',
                'featured' => true,
                'order' => 1,
                'variants' => ['sizes' => ['s', 'm', 'l'], 'colors' => ['Gris', 'Camel']],
            ],
            [
                'name' => 'Suéter Rayas Marineras',
                'sku' => 'LUN-SUE-002',
                'short_description' => 'Suéter de rayas marineras, cómodo y con estilo náutico.',
                'description' => '<p>Suéter tejido con rayas marineras clásicas. Algodón suave y elástico para máxima comodidad.</p>',
                'price' => 45000,
                'category_slug' => 'sueres-y-buzos',
                'availability' => 'in_stock',
                'status' => 'published',
                'featured' => true,
                'order' => 2,
                'variants' => ['sizes' => ['xs', 's', 'm'], 'colors' => ['Azul marino', 'Blanco']],
            ],
            [
                'name' => 'Camiseta "Soy el Jefe"',
                'sku' => 'LUN-CAM-003',
                'short_description' => 'Camiseta divertida con la frase "Soy el Jefe".',
                'description' => '<p>Camiseta de algodón 100% con estampado divertido. Fresca y perfecta para el día a día.</p>',
                'price' => 35000,
                'category_slug' => 'camisetas',
                'availability' => 'in_stock',
                'status' => 'published',
                'featured' => false,
                'order' => 3,
                'variants' => ['sizes' => ['s', 'm', 'l', 'xl'], 'colors' => ['Blanco', 'Negro']],
            ],
            [
                'name' => 'Vestido de Princesa',
                'sku' => 'LUN-VES-004',
                'short_description' => 'Vestido elegante con volantes para tu princesa.',
                'description' => '<p>Vestido con volantes y lazo, ideal para ocasiones especiales. Tela suave y cómoda.</p>',
                'price' => 55000,
                'sale_price' => 48000,
                'category_slug' => 'vestidos',
                'availability' => 'on_order',
                'status' => 'published',
                'featured' => true,
                'order' => 4,
                'variants' => ['sizes' => ['xs', 's', 'm'], 'colors' => ['Rosa', 'Lavanda']],
            ],
            [
                'name' => 'Pañuelo Bandana Estampado',
                'sku' => 'LUN-ACC-005',
                'short_description' => 'Pañuelo bandana con estampado moderno.',
                'description' => '<p>Bandana de algodón con estampado exclusivo. Se ajusta fácilmente con botón.</p>',
                'price' => 18000,
                'category_slug' => 'accesorios',
                'availability' => 'in_stock',
                'status' => 'published',
                'featured' => false,
                'order' => 5,
                'variants' => ['sizes' => ['s', 'm'], 'colors' => ['Estampado']],
            ],
            [
                'name' => 'Pijama de Estrellas',
                'sku' => 'LUN-PIJ-006',
                'short_description' => 'Pijama suave con estampado de estrellas.',
                'description' => '<p>Pijama de franela suave con estampado de estrellas. Perfecto para noches frías.</p>',
                'price' => 42000,
                'category_slug' => 'pijamas',
                'availability' => 'in_stock',
                'status' => 'published',
                'featured' => false,
                'order' => 6,
                'variants' => ['sizes' => ['s', 'm', 'l'], 'colors' => ['Azul', 'Gris']],
            ],
        ];

        foreach ($products as $product) {
            $categoryId = $categories[$product['category_slug']] ?? null;
            unset($product['category_slug']);

            $product['slug'] = \Illuminate\Support\Str::slug($product['name']);
            $product['category_id'] = $categoryId;
            $product['currency'] = 'COP';

            Product::updateOrCreate(['sku' => $product['sku']], $product);
        }

        $this->command->info('Productos creados: ' . count($products));
    }
}
