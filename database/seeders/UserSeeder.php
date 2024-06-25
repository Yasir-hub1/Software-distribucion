<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //TODO:CUSTOMERS
        User::create([
            'username' => 'MariaLopez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'JuanPerez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'AnaGarcia',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'PedroRodriguez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'LuisaMartinez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'JorgeGonzalez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'CarlaSanchez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'DiegoLopez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'SofiaHernandez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'ManuelGomez',
            'type_user' => 'customer',
            'password' => bcrypt('12345678'),
        ]);







        //TODO:DRIVERS
        User::create([
            'username' => 'ElenaRamirez',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'MartínSánchez',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'LucíaGutiérrez',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'AdriánHernández',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'ValentinaMartínez',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'EmilioGómez',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'RenataPérez',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'HugoTorres',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'CamilaFlores',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'FelipeDíaz',
            'type_user' => 'driver',
            'password' => bcrypt('12345678'),
        ]);






        User::create([
            'username' => 'admin',
            'type_user' => 'admin',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'username' => 'all',
            'type_user' => 'admin',
            'password' => bcrypt('12345678'),
        ]);
    }
}
