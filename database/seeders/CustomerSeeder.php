<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::create([
            'nombre' => 'María López',
            'phone' => '78404899',
            'email' => 'María@gmail.com',
            'id_cities'=> 1,
            'id_user'=>1
        ]);
        Customer::create([
            'nombre' => 'Juan Perez',
            'phone' => '78404529',
            'email' => 'Juan@gmail.com',
            'id_cities'=> 1,
            'id_user'=>2
        ]);
        Customer::create([
            'nombre' => 'Ana Garcia',
            'phone' => '71032899',
            'email' => 'Ana@gmail.com',
            'id_cities'=> 1,
            'id_user'=>3
        ]);
        Customer::create([
            'nombre' => 'Pedro Rodriguez',
            'phone' => '68504839',
            'email' => 'Pedro@gmail.com',
            'id_cities'=> 1,
            'id_user'=>4
        ]);
        Customer::create([
            'nombre' => 'Luisa Martinez',
            'phone' => '68504839',
            'email' => 'Luisa@gmail.com',
            'id_cities'=> 1,
            'id_user'=>5
        ]);
        Customer::create([
            'nombre' => 'Jorge Gonzalez',
            'phone' => '68504839',
            'email' => 'Jorge@gmail.com',
            'id_cities'=> 1,
            'id_user'=>6
        ]);
        Customer::create([
            'nombre' => 'Carla Sanchez',
            'phone' => '68504839',
            'email' => 'Carla@gmail.com',
            'id_cities'=> 1,
            'id_user'=>7
        ]);
        Customer::create([
            'nombre' => 'Diego Lopez',
            'phone' => '68504839',
            'email' => 'Diego@gmail.com',
            'id_cities'=> 1,
            'id_user'=>8
        ]);
        Customer::create([
            'nombre' => 'Sofia Hernandez',
            'phone' => '68504839',
            'email' => 'Sofia@gmail.com',
            'id_cities'=> 1,
            'id_user'=>9
        ]);
        Customer::create([
            'nombre' => 'Manue lGomez',
            'phone' => '68504839',
            'email' => 'Manue@gmail.com',
            'id_cities'=> 1,
            'id_user'=>10
        ]);
    }
}
