<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',//placa
        'num_order',
        'state',//marca
        'latitude',
        'logitude',
        'description',// opcional
        'order_id'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class,'order_id');
    }
}
