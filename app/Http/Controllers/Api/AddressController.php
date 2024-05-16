<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\Customer;

class AddressController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $address
     * @return \Illuminate\Http\Response
     */
    public function showAddressByCustomer($id_customer)
    {
        $address = Address::where('id_customer', $id_customer)->get();
        return $this->success(

            [
                "address" => $address->toArray(),

            ]
        );
    }




    public function update(Request $request, $id_customer)
    {
        try {


            // Obtener todas las direcciones asociadas al cliente
            $address = Address::where('customer_id', $id_customer)->get();


            // Actualizar los datos de cada dirección asociada
            // foreach ($address as $address) {
                $address->update($request->all());
            // }
                
            return $this->success(
                ' direcciones actualizados correctamente',
                ["address" => $address]
            );
        } catch (\Throwable $th) {
            return $this->error('No se pudieron actualizar los datos.', $th);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        $address->delete();
        return $this->success(
            ' direcciones eliminados correctamente',
            ["address" => $address]
        );
    }
}
