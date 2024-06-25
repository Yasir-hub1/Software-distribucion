<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomerController extends Controller
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
            'nombre' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string',

        ]);

        try {

            // Crear un nuevo usuario con los datos recibidos
            $customer = new Customer([
                'nombre' => $request('nombre'),
                'phone' => $request('phone'),
                'email' => $request('email'),

            ]);
            Address::create([
                'description' => $request('description'),
                'latitude' => $request('latitude'),
                'longitude' => $request('longitude'),
                'id_customer' => $customer->id,

            ]);

            // Guardar el usuario en la base de datos
            $customer->save();

            // Retornar una respuesta con el usuario creado y un código de estado 201 (creado)
            return $this->success(
                __("Se regístro correctamente"),
                [
                    "customer" => $customer->toArray(),

                ]
            );
        } catch (\Throwable $th) {
            return $this->error('No se pudiern crear los datos.', $th);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    // CustomerController.php
    public function show(Customer $customer)
    {
        try {
            $customers = $customer::with('city')->get();
            return response()->json([
                'customers' => $customers]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching customers', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */

     public function update(Request $request, Customer $customer)
     {
         try {
            $customer->nombre=$request->nombre;
            $customer->phone=$request->phone;
            $customer->email=$request->email;
            $customer->id_cities=$request->id_cities;
            $customer->id_user=$request->id_user;
            $customer->update();

             return response()->json([
                 'message' => 'Datos del cliente actualizados',
                 'customer' => $customer
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        // dd($customer);
        $customer->delete();
        return $this->success(
            __("Se eliminó correctamente"),
        );
    }
}
