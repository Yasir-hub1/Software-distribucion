<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Product;
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

    public function store(Request $request)
    {
        try {
            $total = 0;
    
            foreach ($request->products as $product) {
                // Obtener el precio del producto desde la base de datos
                $productModel = Product::findOrFail($product['product_id']);
                $unitPrice = $productModel->price;
        
                $subtotal = $unitPrice * $product['count']; // Calcular el subtotal correctamente
    
                // Crear el detalle de orden
                $orderDetail = new OrderDetail([
                    'count' => $product['count'],
                    'unit_price' => $unitPrice,
                    'total' => $subtotal,
                    'product_id' => $product['product_id'],
                    'order_id' => $request->order_id,
                ]);
    
                // Guardar el detalle de orden
                $orderDetail->save();
    
                // Sumar al total de la orden
                $total += $subtotal;
            }

             // Actualizar el total de la orden
            $order = Order::findOrFail($request->order_id);
            $order->total = $total;
            $order->save();
    
            return response()->json([
                'message' => 'Detalle de orden creado correctamente',
                'total' => $total,
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
    public function showOrderDetails($order_id)
    {
        try {
            
            // Obtener la orden junto con todos sus detalles y los nombres de los productos
            $orderDetails = OrderDetail::where('order_id', $order_id)
                                      ->with(['product' => function ($query) {
                                          $query->select('id', 'name'); // Seleccionar solo el id y el name del producto
                                      }])
                                      ->get(['id', 'count', 'unit_price', 'total', 'product_id', 'order_id']);
    
            
            // Verificar si se encontraron detalles
            if ($orderDetails->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron detalles para la orden especificada.',
                ], 404);
            }
    
            return response()->json([
                'message' => 'Detalles de la orden encontrados correctamente.',
                'orderDetails' => $orderDetails,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al encontrar detalles de la orden.',
                'error' => $th->getMessage(),
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
