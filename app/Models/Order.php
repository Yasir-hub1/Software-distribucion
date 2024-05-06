<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'id_customer',
        'state',



    ];

    public function assignment()
    {
        return $this->hasMany(VehicleDriver::class);
    }

}
