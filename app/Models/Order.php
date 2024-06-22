<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'state',
        'total',
        'customer_id'

    ];

    public function assignment()
    {
        return $this->hasMany(VehicleDriver::class);
    }

     // relacion de un pedido tiene muchos orderDetalles
     public function order_detail()
     {
         return $this->hasMany(OrderDetail::class);
     }

}
