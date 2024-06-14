<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;

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
        ////Para validar la solicitud
        $request->validate([
            'plate'=> 'required|string',
            'model'=> 'required|string',
            'brand'=> 'required|string',
            'ability'=> 'required|string',
            'photo'=> 'required|string',
            'state'=> 'required|string'
        ]);

        try {
            $vehicle = new Vehicle([
                'plate' => $request('plate'),
                'model' => $request('model'),
                'brand' => $request('brand'),
                'ability' => $request('ability'),
                'photo' => $request('photo'),
                'state' => $request('state'),
            ]);

            $vehicle->save();
            return $this->success(
                __("Se regístro correctamente"),
                [
                    "vehicle" => $vehicle->toArray(),
                ]
            );
        } catch (\Throwable $th) {
            return $this->error('No se pudiern crear los datos del vehículo.', $th);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        // Obtener todos los vehículos registrados
        $vehicles = Vehicle::all();
    
        // Verificar si hay vehículos
        if ($vehicles->isEmpty()) {
            return $this->error("No hay vehículos registrados.", 404);
        }
    
        return $this->success("Lista de vehículos registrados", ["vehicles" => $vehicles->toArray()]);
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
            $vehicle->update($request->all());
            return $this->success('Datos del cliente  actualizados', ["vehicle" => $vehicle]);
            
        } catch (\Throwable $th) {
            return $this->error('No se pudieron actualizar los datos de los vehículos.', $th);
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
