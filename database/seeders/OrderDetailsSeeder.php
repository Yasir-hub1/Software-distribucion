<?php

namespace Database\Seeders;

use App\Models\OrderDetail;
use Illuminate\Database\Seeder;

class OrderDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderDetail::create([
            'count'=>2,
            'unit_price'=>5,
            'total'=>10,
            'product_id'=>1,
            'order_id'=>1
        ]);
    }
}
