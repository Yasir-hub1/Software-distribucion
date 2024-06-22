<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\VehicleDriver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
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
            'date' => 'required|string',
            'state' => 'required|string',
            'total' => 'required|string',
            'customer_id' => 'required|integer',
        ]);

        try {
            // Crear la orden
            $order = Order::create([
                'date' => $request->date,
                'state' => $request->state,
                'total' => $request->total,
                'customer_id' => $request->customer_id,
            ]);
             $order->save();
    
             return response()->json([
                 'message' => 'Orden creado correctamente',
                 'order' => $order
             ], 201);
           
    
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => 'Error al crear la orden', 'details' => $th->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
       return $order::all();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|string',
            'state' => 'required|string',
            'total' => 'required|string',
            'customer_id' => 'required|integer',
        ]);

        
        try {
            $order = Order::findOrFail($id);  // Buscar la orden
            $order->update($request->only(['date', 'state', 'total','customer_id'])); // Actualizar la orden

        // Retornar una respuesta con el producto actualizado
        return response()->json([
            'message' => 'Producto actualizado correctamente',
            'order' => $order
        ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al actualizar la orden'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        try {
            $order = Order::findOrFail($id);
            $order->delete(); // Eliminar la orden
            return response()->json(['message' => 'Orden eliminada correctamente'], 200);

        } catch (\Exception $e) {
          
            return response()->json(['error' => 'Error al eliminar la orden'], 500);
        }
    }

    //para la asiganacion de vehiculo y chofer
    /**
     * Asignar chofer y vehículo disponible a una orden y registrar en la tabla intermedia.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function assignDriverAndVehicle(Request $request, Order $order)
    {
        // Validar la solicitud
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'driver_id' => 'required|exists:drivers,id',
        ]);

        try {
            // Obtener el vehículo y verificar si está disponible
            $vehicle = Vehicle::findOrFail($request->vehicle_id);

            if ($vehicle->state !== 'disponible') {
                return response()->json([
                    'error' => 'El vehículo seleccionado no está disponible para asignación'
                ], 400);
            }

            // Obtener el chofer
            $driver = Driver::findOrFail($request->driver_id);

            // Crear una entrada en la tabla intermedia vehicle_driver
            $assignment = VehicleDriver::create([
                'order_id' => $order->id,
                'vehicle_id' => $vehicle->id,
                'driver_id' => $driver->id,
                'date_assignment' => now(), // Fecha de asignación
            ]);

            return response()->json([
                'message' => 'Chofer y vehículo asignados correctamente a la orden',
                'assignment' => $assignment,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Error al asignar chofer y vehículo a la orden',
                'details' => $th->getMessage()
            ], 500);
        }
    }
}
