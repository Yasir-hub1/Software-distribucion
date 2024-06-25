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
         'latitud',
        'longitud', 
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
     public function order_driver()
     {
         return $this->belongsTo(OrderDriver::class);
     }

     public function customer()
     {
         return $this->belongsTo(Customer::class);
     }

}
