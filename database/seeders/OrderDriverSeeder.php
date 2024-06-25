<?php

namespace Database\Seeders;

use App\Models\OrderDriver;
use Illuminate\Database\Seeder;

class OrderDriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderDriver::create([
            'order_id'=>1,
            'driver_id'=>1
        ]);
        OrderDriver::create([
            'order_id'=>2,
            'driver_id'=>1
        ]);
        OrderDriver::create([
            'order_id'=>3,
            'driver_id'=>1
        ]);
        OrderDriver::create([
            'order_id'=>4,
            'driver_id'=>1
        ]);
        OrderDriver::create([
            'order_id'=>5,
            'driver_id'=>1
        ]);
        OrderDriver::create([
            'order_id'=>6,
            'driver_id'=>1
        ]);
        OrderDriver::create([
            'order_id'=>7,
            'driver_id'=>2
        ]);
        OrderDriver::create([
            'order_id'=>8,
            'driver_id'=>2
        ]);
        OrderDriver::create([
            'order_id'=>9,
            'driver_id'=>2
        ]);
        OrderDriver::create([
            'order_id'=>10,
            'driver_id'=>1
        ]);
    }
}
