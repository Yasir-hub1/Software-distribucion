<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Bebidas alcohólicas',
        ]);

        Category::create([
            'name' => 'Bebidas sin alcohol',
        ]);

        Category::create([
            'name' => 'Refrescos',
        ]);

        Category::create([
            'name' => 'Cervezas',
        ]);

        Category::create([
            'name' => 'Vinos',
        ]);

        Category::create([
            'name' => 'Cócteles',
        ]);

        Category::create([
            'name' => 'Jugos naturales',
        ]);

        Category::create([
            'name' => 'Energizantes',
        ]);

        Category::create([
            'name' => 'Agua purificada',
        ]);

        Category::create([
            'name' => 'Botanas',
        ]);

    }
}
