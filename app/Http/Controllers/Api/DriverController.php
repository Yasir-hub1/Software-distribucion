<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Traits\ApiResponder;
use Illuminate\Http\JsonResponse;
class DriverController extends Controller
{
    use ApiResponder;

    public function store(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'name' => 'required|string',
            'ci' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            // 'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Validación para la imagen
        ]);

        // Guardar la imagen
        $photoPath = $request->file('photoDriver')->store('driver'); // Almacenar la imagen en la carpeta 'photos'

        // Crear un nuevo usuario con los datos recibidos
        $driver = new Driver([
            'name' => $request->input('name'),
            'ci' => $request->input('ci'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'photo' => $photoPath, // Guardar la ruta de la imagen en la base de datos
        ]);

        // Guardar el usuario en la base de datos
        $driver->save();

        // Retornar una respuesta con el usuario creado y un código de estado 201 (creado)
        return $this->success(
            __("Se regístro correctamente"),
            [
                "driver" => $driver->toArray(),

            ]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function show(Driver $driver): JsonResponse
    {
        try {
            $drivers = $driver::with('city','user')->get();
            return response()->json([
                'message' => 'Lista de ciudades',
                'drivers' => $drivers
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Error al obtener la lista de choferes',
                'details' => $th->getMessage(),
            ], 500);
        }
    }


    public function update(Request $request)
    {
        try {
          /*   if ($request->hasFile('photoDriver')) {
                Storage::disk('driver')->delete($driver->photo);
                $fileImage = $request->file('driver')->store('driver');
                $driver->update($request->all() + [
                    'photo' => Storage::disk('driver')->url($fileImage)
                ]);
                return $this->success(
                    'Datos y logo de empresa actualizados',
                    ["driver" => $driver]
                );
            } else { */
                $user=User::find($request->id_user);
                $user->username = $request->username;
                $user->password = bcrypt( $request->ci);
                $user->type_user = "driver";
                $user->update();

                $driver=Driver::find($request->id_driver);
                $driver->name=$request->name;
                $driver->ci=$request->ci;
                $driver->phone=$request->phone;
                $driver->address=$request->address;
                $driver->id_cities=$request->id_cities;
                $driver->update();

                return $this->success('Datos de transportista actualizados.', [
                    "driver" => $driver,

                ]);
            // }
        } catch (\Throwable $th) {
            return $this->error('No se pudieron actualizar los datos.', $th);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
        return $this->success(
            __("Se eliminó correctamente"),
        );
    }

    ////choferes disponibles
    public function getAvailableDrivers(): JsonResponse
    {
        try {
            // Obtener los choferes con menos de 5 órdenes asignadas
            $drivers = Driver::whereDoesntHave('orderDrivers', function($query) {
                $query->select('driver_id')
                      ->groupBy('driver_id')
                      ->havingRaw('COUNT(*) >= 5');
            })->get();
    
            // Convertir los resultados a un array simple con los nombres de los choferes
            $driverNames = $drivers->toArray();
    
            return response()->json([
                'message' => 'Lista de choferes con menos de 5 órdenes asignadas',
                'drivers' => $driverNames,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Error al obtener la lista de choferes',
                'details' => $th->getMessage(),
            ], 500);
        }
    }
    
}
