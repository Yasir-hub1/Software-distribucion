<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\VehicleDriver;
use App\Models\OrderDriver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
            'latitud' => 'required|string',
            'longitud' => 'required|string',
            'customer_id' => 'required|integer',
        ]);
    
        try {
            // Crear la orden
            $order = Order::create([
                'date' => $request->date,
                'state' => $request->state,
                'latitud' => $request->latitud,
                'longitud' => $request->longitud,
                'customer_id' => $request->customer_id,
                'total' => 0, // Inicialmente, el total es 0
            ]);
            
            return response()->json([
                'message' => 'Orden creada correctamente',
                'order' => $order
            ], 201);
    
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error al crear la orden', 'details' => $th->getMessage()], 500);
        }
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
  /*   public function show(Order $order)
    {
        try {
            // Obtener todos los productos con sus categorías
            $orders = $order::all();

            return response()->json([
                'message' => 'Lista de ordenes',
                'orders' => $orders
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudieron listar los datos.',
                'error' => $th->getMessage()
            ], 500);
        }
    } */

 
// OrderController.php
public function showOrder()
{
    try {
        // Obtener todas las órdenes con sus clientes, ordenadas por fecha de creación en orden descendente
        $orders = Order::with('customer')->orderBy('id', 'desc')->get();

        // Transformar las órdenes en un array simple
        $ordersArray = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'date' => $order->date,
                'state' => $order->state,
                'total' => $order->total,
                'customer_id' => $order->customer_id,
                'customer_name' => $order->customer->nombre // Incluir el nombre del cliente
            ];
        });

        return response()->json([
            'message' => 'Lista de órdenes',
            'orders' => $ordersArray
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error fetching orders', 'message' => $e->getMessage()], 500);
    }
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
            //'total' => 'required|string',
            'latitud' => 'required|string',
            'longitud' => 'required|string',
            'customer_id' => 'required|integer',
        ]);

        
        try {
            $order = Order::findOrFail($id);  // Buscar la orden
            $order->update($request->only(['date', 'state', 'total','latitud','longitud','customer_id'])); // Actualizar la orden

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

 /**
 * Asignar chofer y vehículo disponible a una orden y registrar en las tablas intermedias.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \App\Models\Order  $order
 * @return \Illuminate\Http\Response
 */
public function assignDriverAndVehicle(Request $request, Order $order)
{
    try {
        // Obtener el vehículo y verificar si está disponible
        $vehicle = Vehicle::findOrFail($request->vehicle_id);

        if ($vehicle->state !== 'disponible') {
            return response()->json([
                'error' => 'El vehículo seleccionado no está disponible para su asignación'
            ], 400);
        }

        // Obtener el chofer
        $driver = Driver::findOrFail($request->driver_id);

        // Verificar la cantidad de órdenes asignadas al chofer
        $assignedOrdersCount = OrderDriver::where('driver_id', $driver->id)->count();
        //dd($assignedOrdersCount);

        if ($assignedOrdersCount >= 5) {
            return response()->json([
                'error' => 'El chofer seleccionado ya tiene 5 órdenes asignadas'
            ], 400);
        }
        // Crear o actualizar la entrada en la tabla intermedia order_driver
        $orderDriverAssignment = OrderDriver::create(
            ['order_id' => $order->id, 'driver_id' => $driver->id],
        );

        //dd($orderDriverAssignment);

        return response()->json([
            'message' => 'Chofer y vehículo asignados correctamente a la orden',
            'orderDriverAssignment' => $orderDriverAssignment,
        ], 200);

          //dd(response()->json('el json',[$orderDriverAssignment]));

    } catch (ModelNotFoundException $e) {
        return response()->json([
            'error' => 'Error al asignar chofer y vehículo a la orden',
            'details' => 'El vehículo o chofer no se encontró en la base de datos'
        ], 404);
    } catch (\Throwable $th) {
        return response()->json([
            'error' => 'Error al asignar chofer y vehículo a la orden',
            'details' => $th->getMessage()
        ], 500);
    }
}



}
