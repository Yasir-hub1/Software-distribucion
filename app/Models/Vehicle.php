<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $fillable = [
        'plate', //placa
        'model',
        'brand', //marca
        'ability', //capacidad
        'photo',
        'state',

    ];
    /*relacion muchos a muchos  con driver */
    public function driver()
    {
        return $this->belongsToMany(Driver::class, 'vehicle_driver');
    }
}
