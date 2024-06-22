<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    /**
     * Registrar itinerario para la orden de despacho
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function registerDelivery(Request $request, Order $order)
    {
        // Verifica los datos recibidos
        dd($request->all());

        // Validar la solicitud
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'date' => 'required|string',
            'num_order' => 'required|string',
            'state' => 'required|string',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'description' => 'required|string'
        ]);

        try {
            // Verificar si el ID de la orden coincide con el ID de la orden en el request
            if ($order->id == $request->order_id) {
                // Crear el registro de delivery
                $delivery = Delivery::create([
                    'date' => $request->date, // Fecha de asignación
                    'num_order' => $request->num_order,
                    'state' => $request->state,
                    'latitude' => $request->latitude,
                    'longitude' => $request->longitude,
                    'description' => $request->description,
                    'order_id' => $order->id
                ]);

                return response()->json([
                    'message' => 'Registro de itinerario exitoso',
                    'delivery' => $delivery,
                ], 200);
            } else {
                return response()->json([
                    'error' => 'El ID de la orden no coincide',
                ], 400);
            }

        } catch (\Throwable $th) {  
            return response()->json([
                'error' => 'Error al registrar itinerario',
                'details' => $th->getMessage()
            ], 500);
        }
    }
}
