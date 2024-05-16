<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenNotifications extends Model
{
    use HasFactory;
    protected $fillable = [
        'token',
        'device',

    ];

      // relacion de un conductor tiene muchos token
      public function driver()
      {
          return $this->belongsTo(Driver::class,'id_driver');
      }
}
