<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's admin user using credentials from the .env file.
     */
    public function run(): void
    {
        $name = env('ADMIN_NAME', 'Administrador');
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (! $email || ! $password) {
            $this->command->warn('ADMIN_EMAIL o ADMIN_PASSWORD no están definidos en el .env. No se creó el usuario admin.');

            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => 'admin',
            ]
        );

        $this->command->info("Usuario admin '{$email}' creado/actualizado correctamente.");
    }
}