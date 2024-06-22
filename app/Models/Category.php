<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'

    ];

    // relacion de una ciudad a muchos coductores
    public function product()
    {
        return $this->hasMany(Product::class, 'id_category');
    }
}
