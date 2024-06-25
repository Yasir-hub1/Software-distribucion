<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleDriver extends Model
{
    use HasFactory;

    protected $table = 'vehicle_driver'; 

    protected $fillable = [
        'order_id',
        'vehicle_id',
        'driver_id',
        'date_assigment',//fecha de asignacion
        'date_deallocation'// fecha de desasignación

    ];

    public function order()
    {
        return $this->belongsTo(Order::class,'order_id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }
}
