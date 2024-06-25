<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',

    ];

    // relacion de una ciudad a muchos coductores
    public function driver()
    {
        return $this->hasMany(Driver::class);
    }
}
