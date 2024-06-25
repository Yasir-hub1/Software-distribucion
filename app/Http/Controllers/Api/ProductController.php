<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            // Obtener todos los productos con sus categorías
            $products = Product::with('category')->get();

            return response()->json([
                'message' => 'Lista de productos',
                'products' => $products
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudieron listar los datos.',
                'error' => $th->getMessage()
            ], 500);
        }
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
            'code' => 'required|string',
            'name' => 'required|string',
            'price' => 'required|string',
            'date' => 'required|string',
            'id_category' => 'required|integer|exists:categories,id',
        ]);
    
        try {
            // Crear un nuevo producto con los datos recibidos
            $product = new Product([
                'code' => $request->input('code'),
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'date' => $request->input('date'),
                'id_category' => $request->input('id_category'),
            ]);
    
            // Guardar el producto en la base de datos
            $product->save();
    
            // Cargar la relación category
            $product->load('category');
    
            // Retornar una respuesta con el producto creado y un código de estado 201 (creado)
            return response()->json([
                'message' => 'Producto creado correctamente',
                'product' => $product
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudo crear el producto.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
    

   /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        try {
            $product->load('category');
    
            return response()->json([
                'message' => 'Producto encontrado',
                'product' => $product
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'No se pudo encontrar el producto.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
        	

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
            // Validar la solicitud
            $request->validate([
            'code' => 'string',
            'name' => 'string',
            'price' => 'string',
            'date' => 'string',
            'id_category' => 'integer|exists:categories,id', // Verifica que la categoría exista
        ]);

        try {
        // Actualizar el producto con los datos recibidos
        $product->update($request->all());

        // Retornar una respuesta con el producto actualizado
        return response()->json([
            'message' => 'Producto actualizado correctamente',
            'product' => $product
        ]);

        } catch (\Throwable $th) {
             return response()->json([
                'message' => 'No se pudo encontrar el producto.',
                'error' => $th->getMessage()
            ], 500); // Puedes ajustar el código de estado HTTP según sea necesario
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        // Retornar una respuesta con el mensaje de eliminación
        return response()->json([
            'message' => 'Producto eliminado correctamente'
        ]);
    }
}
