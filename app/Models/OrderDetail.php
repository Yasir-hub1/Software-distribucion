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
        'total',
        'product_id',
        'order_id'
    ];

     // relacion de una ciudad a muchos ordenes
     public function order()
     {
         return $this->belongsTo(Order::class,'order_id');
     }

     public function product()
     {
        return $this->belongsTo(Product::class,'product_id');
     }
}
