<?php

namespace Database\Seeders;

use App\Models\Driver;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Driver::create([
            'name'=>'Elena Ramirez',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Las Palmas',
            'id_cities'=>1,
            'id_user'=>11
        ]);
        Driver::create([
            'name'=>'Martín Sánchez',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Las Palmas',
            'id_cities'=>1,
            'id_user'=>12
        ]);
        Driver::create([
            'name'=>'Lucía Gutiérrez',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Av. Mutualista',
            'id_cities'=>1,
            'id_user'=>13
        ]);
        Driver::create([
            'name'=>'Adrián Hernández',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Av. Alemana',
            'id_cities'=>1,
            'id_user'=>14
        ]);
        Driver::create([
            'name'=>'Valentina Martínez',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Las Cucequis',
            'id_cities'=>1,
            'id_user'=>15
        ]);
        Driver::create([
            'name'=>'Emilio Gómez',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'La Campana',
            'id_cities'=>1,
            'id_user'=>16
        ]);
        Driver::create([
            'name'=>'Renata Pérez',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Los Lotes',
            'id_cities'=>1,
            'id_user'=>17
        ]);
        Driver::create([
            'name'=>'Hugo Torres',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Uv Palma Dorada',
            'id_cities'=>1,
            'id_user'=>18
        ]);
        Driver::create([
            'name'=>'Camila Flores',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'Uv. Las Palmas',
            'id_cities'=>1,
            'id_user'=>19
        ]);
        Driver::create([
            'name'=>'Felipe Díaz',
            'ci'=>'5324524',
            'phone'=>'63443463',
            'address'=>'B/ Fortaleza',
            'id_cities'=>1,
            'id_user'=>20
        ]);

    }
}
