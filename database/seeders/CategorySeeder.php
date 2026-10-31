<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Abrigos y Chaquetas', 'description' => 'Abrigos y chaquetas para mantener a tu perro abrigado y con estilo.', 'status' => 'published', 'order' => 1],
            ['name' => 'Suéteres y Buzos', 'description' => 'Suéteres y buzos cómodos y con personalidad.', 'status' => 'published', 'order' => 2],
            ['name' => 'Camisetas', 'description' => 'Camisetas frescas y divertidas para el día a día.', 'status' => 'published', 'order' => 3],
            ['name' => 'Vestidos', 'description' => 'Vestidos elegantes para ocasiones especiales.', 'status' => 'published', 'order' => 4],
            ['name' => 'Accesorios', 'description' => 'Correas, collares, pañuelos y más accesorios con estilo.', 'status' => 'published', 'order' => 5],
            ['name' => 'Pijamas', 'description' => 'Pijamas suaves y cómodos para dormir feliz.', 'status' => 'published', 'order' => 6],
        ];

        foreach ($categories as $category) {
            $category['slug'] = \Illuminate\Support\Str::slug($category['name']);
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }

        $this->command->info('Categorías creadas: ' . count($categories));
    }
}
