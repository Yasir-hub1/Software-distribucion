<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDriver extends Model
{
    use HasFactory;
    protected $table = 'order_driver'; 
    protected $fillable = [
        'order_id',
        'driver_id'

    ];

     public function order()
     {
        return $this->belongsTo(Order::class);
     }

     public function driver()
     {
        return $this->belongsTo(Driver::class);
     }
}
