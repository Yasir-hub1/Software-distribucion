<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        {
            DB::table('cities')->insert([
                'name'=>'Santa Cruz',
            ]);
            DB::table('cities')->insert([
                'name'=>'Cochabamba',
            ]);
            DB::table('cities')->insert([
                'name'=>'La Paz',
            ]);
            DB::table('cities')->insert([
                'name'=>'Oruro',
            ]);
            DB::table('cities')->insert([
                'name'=>'Potosi',
            ]);
            DB::table('cities')->insert([
                'name'=>'Sucre',
            ]);
            DB::table('cities')->insert([
                'name'=>'Beni',
            ]);
            DB::table('cities')->insert([
                'name'=>'Pando',
            ]);
            DB::table('cities')->insert([
                'name'=>'Tarija',
            ]);
        }
    }
}
