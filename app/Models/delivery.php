<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class delivery extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',//placa
        'num_order',
        'state',//marca
        'latitude',
        'logitude',
        'description',// opcional
    ];
}
