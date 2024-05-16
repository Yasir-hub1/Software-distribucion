<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'name',
        // 'ability',// capacidad
        'price',
        'date'
    ];

      // relacion de una ciudad a muchos vehiculos
      public function category()
      {
          return $this->belongsTo(Category::class,'id_category');
      }
}
