<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'phone',
        'email',
    ];

     // relacion de una ciudad a muchos Clientes
     public function city()
     {
         return $this->belongsTo(City::class);
     }
}
