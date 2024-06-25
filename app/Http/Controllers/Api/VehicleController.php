<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'plate' => 'required|string',
            'model' => 'required|string',
            'brand' => 'required|string',
            'ability' => 'required|string',
           // 'photo' => 'required|string',
            'state' => 'required|string'
        ]);
    
        /*    $photoPath = null;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('images', 'public');
            } */
        try {
            $vehicle = new Vehicle([
                'plate' => $request->input('plate'),
                'model' => $request->input('model'),
                'brand' => $request->input('brand'),
                'ability' => $request->input('ability'),
               // 'photo' => $request->input('photo'),
                'state' => $request->input('state'),
            ]);
    
            $vehicle->save();
    
            return response()->json([
                'message' => 'Se registró correctamente',
                'vehicle' => $vehicle->toArray(),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudo crear el vehículo',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
    
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        // Obtener todos los vehículos registrados
        try {
            // Obtener todos los productos con sus categorías
            $vehicles = $vehicle::all();

           /*  $vehicles->each(function($vehicle) {
                $vehicle->photo = $vehicle->photo ? asset('storage/' . $vehicle->photo) : null;
            }); */

            return response()->json([
                'message' => 'Lista de vehiculos',
                'vehicles' => $vehicles
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudieron listar los datos.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
    

    //para que me devuelva los vehiculos disponibles
    public function getVehiculosDisponibles(Vehicle $vehicle)
{
    try {
        // Obtener todos los vehículos con estado 'disponible'
        $vehicles = $vehicle::where('state', 'disponible')->get();

        return response()->json([
            'message' => 'Lista de vehículos disponibles',
            'vehicles' => $vehicles
        ]);
    } catch (\Throwable $th) {
        return response()->json([
            'message' => 'No se pudieron listar los datos.',
            'error' => $th->getMessage()
        ], 500);
    }
}


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        try {
            $vehicle->plate=$request->plate;
            $vehicle->model=$request->model;
            $vehicle->brand=$request->brand;
            $vehicle->ability=$request->ability;
            //$vehicle->photo =$request->photo;
            $vehicle->state =$request->state;
            $vehicle->update();

             return response()->json([
                 'message' => 'Datos del cliente actualizados',
                 'vehicle' => $vehicle
             ]);
         } catch (\Throwable $th) {
             return response()->json([
                 'message' => 'No se pudieron actualizar los datos.',
                 'error' => $th->getMessage()
             ], 500); // Puedes ajustar el código de estado HTTP según sea necesario
         }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();
        return $this->success(
            __("Se eliminó correctamente"),
        );
    }
}
