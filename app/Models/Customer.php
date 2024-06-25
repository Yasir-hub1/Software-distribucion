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
        'id_cities',
        'id_user'
    ];

     // relacion de una ciudad a muchos Clientes
     public function city()
     {
         return $this->belongsTo(City::class,'id_cities');
     }

     public function user()
    {
        return $this->belongsTo(User::class,'id_user');
    }
}
