<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderDetailController extends Controller
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
            'count' => 'required|integer',
            'unit_price' => 'required|string',   
            'origin' => 'required|string',
            'destination' => 'required|string', 
            'total' => 'required|string', 
            'product_id' => 'required|integer',
            'order_id' => 'required|integer',
        ]);
    
        try {
            // Crear el detalle de orden
            $orderDetail = new OrderDetail([
                'count' => $request->count,
                'unit_price' => $request->unit_price,
                'origin' => $request->origin,
                'destination' => $request->destination,
                'total' => $request->total,
                'product_id' => $request->product_id,
                'order_id' => $request->order_id,
            ]);
    
            // Guardar el detalle de orden
            $orderDetail->save();
    
            return response()->json([
                'message' => 'Detalle de orden creado correctamente',
                'order_detail' => $orderDetail
            ], 201);
    
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Error al crear el detalle de orden', 'details' => $th->getMessage()], 500);
        }
    }
    

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OrderDetail  $orderDetail
     * @return \Illuminate\Http\Response
     */
    public function show(OrderDetail $orderDetail)
    {
        try {
            $orderDetail->load('order');
    
            return response()->json([
                'message' => 'Orden encontrado',
                'orderDetail' => $orderDetail
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudo encontrar la orden.',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OrderDetail  $orderDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(OrderDetail $orderDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OrderDetail  $orderDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderDetail $orderDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrderDetail  $orderDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderDetail $orderDetail)
    {
        //
    }
}
