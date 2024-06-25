<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{



    public function show(City $city)
    {
        try {
            // Obtener todos los productos con sus categorías
            $cities = $city::all();

            return response()->json([
                'message' => 'Lista de ciudades',
                'cities' => $cities
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudieron listar los datos.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
