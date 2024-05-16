<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'count',//placa
        'unit_price',
        'oigin',
        'destination',
        'total'
    ];

     // relacion de una ciudad a muchos vehiculos
     public function order()
     {
         return $this->belongsTo(Order::class,'id_order');
     }
}
