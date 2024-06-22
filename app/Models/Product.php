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
        'price',
        'date',
        'id_category'
    ];

      // relacion de una ciudad a muchas categorias
      public function category()
      {
          return $this->belongsTo(Category::class,'id_category');
      }
}
