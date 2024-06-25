<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'code' => 'PROD001',
            'name' => 'Cerveza Corona',
            'price' => 2.50,
            'date' => now(),
            'id_category' => 1,
        ]);
        Product::create([
            'code' => 'PROD002',
            'name' => 'Vodka Absolut',
            'price' => 15.99,
            'date' => now(),
            'id_category' => 1,
        ]);
        Product::create([
            'code' => 'PROD003',
            'name' => 'Ron Barceló Añejo',
            'price' => 25.75,
            'date' => now(),
            'id_category' => 1,
        ]);
        Product::create([
            'code' => 'PROD004',
            'name' => 'Vino Tinto Reserva',
            'price' => 12.99,
            'date' => now(),
            'id_category' => 2,
        ]);
        Product::create([
            'code' => 'PROD005',
            'name' => 'Ginebra Bombay Sapphire',
            'price' => 18.50,
            'date' => now(),
            'id_category' => 1,
        ]);
        Product::create([
            'code' => 'PROD006',
            'name' => 'Whisky Johnnie Walker Black Label',
            'price' => 30.25,
            'date' => now(),
            'id_category' => 1,
        ]);
        Product::create([
            'code' => 'PROD007',
            'name' => 'Agua Mineral Sin Gas',
            'price' => 1.00,
            'date' => now(),
            'id_category' => 3,
        ]);
        Product::create([
            'code' => 'PROD008',
            'name' => 'Coca-Cola',
            'price' => 1.50,
            'date' => now(),
            'id_category' => 3,
        ]);
        Product::create([
            'code' => 'PROD009',
            'name' => 'Fanta Naranja',
            'price' => 1.25,
            'date' => now(),
            'id_category' => 3,
        ]);


        Product::create([
            'code' => 'SNK001',
            'name' => 'Papas Fritas',
            'price' => 1.99,
            'date' => now(),
            'id_category' => 10,
        ]);
        Product::create([
            'code' => 'SNK002',
            'name' => 'Doritos Nacho',
            'price' => 2.49,
            'date' => now(),
            'id_category' => 10,
        ]);
        Product::create([
            'code' => 'SNK003',
            'name' => 'Cacahuates Salados',
            'price' => 0.99,
            'date' => now(),
            'id_category' => 10,
        ]);
        Product::create([
            'code' => 'SNK004',
            'name' => 'Galletas Saladas',
            'price' => 1.25,
            'date' => now(),
            'id_category' => 10,
        ]);
        Product::create([
            'code' => 'SNK005',
            'name' => 'Mix de Frutos Secos',
            'price' => 3.99,
            'date' => now(),
            'id_category' => 10,
        ]);
    }
}
