<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'ci',
        'phone',
        'address',
        'photo'
    ];
     // relacion de una ciudad a muchos vehiculos
    public function city()
    {
        return $this->belongsTo(City::class,'id_cities');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'id_user');
    }

    // relacion de un conductor a muchos tokens notificaciones

    public function tokenNotification()
    {
        return $this->hasMany(TokenNotifications::class);
    }

    /*relacion muchos a muchos  con vehicle */
    public function vehicle()
    {
        return $this->belongsToMany(Vehicle::class, 'vehicle_driver');
    }

    public function orderDrivers()
    {
        return $this->hasMany(OrderDriver::class);
    }

}
