<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       Vehicle::create([
        'plate' => 'XYZ456',
        'model' => 'Civic',
        'brand' => 'Honda',
        'ability' => 4,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate' => 'DEF789',
        'model' => 'Focus',
        'brand' => 'Ford',
        'ability' => 5,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate' => 'GHI012',
        'model' => 'A4',
        'brand' => 'Audi',
        'ability' => 5,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate' => 'JKL345',
        'model' => 'Cruze',
        'brand' => 'Chevrolet',
        'ability' => 4,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate'=>"4223AFA", //placa
        'model'=>'Corolla',
        'brand'=>'Toyota', //marca
        'ability'=>5, //capacidad
        'state'=>'disponible',
       ]);
       Vehicle::create([
        'plate' => 'PQR901',
        'model' => 'Fiesta',
        'brand' => 'Ford',
        'ability' => 4,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate' => 'STU234',
        'model' => 'Mazda3',
        'brand' => 'Mazda',
        'ability' => 5,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate' => 'VWX567',
        'model' => 'Camry',
        'brand' => 'Toyota',
        'ability' => 5,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate' => 'YZA890',
        'model' => 'Sentra',
        'brand' => 'Nissan',
        'ability' => 5,
        'state' => 'disponible',
       ]);
       Vehicle::create([
        'plate' => 'ABC123',
        'model' => 'Corolla',
        'brand' => 'Toyota',
        'ability' => 5,
        'state' => 'disponible',
       ]);
    }
}
