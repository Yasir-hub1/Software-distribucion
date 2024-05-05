<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ApiResponder;
use Laravel\Sanctum\Sanctum;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use ApiResponder;

    ///AUTENTICACION PARA ADMIN
    public function loginAdmin(): JsonResponse
    {
        request()->validate([
            "email" => "required|email",
            "password" => "required|min:8|max:20",
            "device_name" => "required"

        ]);


        $admin = User::select(["id", "name", "password", "email"])
            ->where("email", request("email"))
            ->first();

        /* Verificacion si el admin existe */
        if (!$admin || !Hash::check(request("password"), $admin->password)) {
            throw ValidationException::withMessages([
                "email" => [__("Credenciales incorrectas")]
            ]);
        }

        $token = $admin->createToken(request("device_name"))->plainTextToken;

        return $this->success(
            __("Bienvenid@"),
            [
                "admin" => $admin->toArray(),

                "token" => $token,
            ]
        );
    }

    //TODO: AUTENTICACION PARA EL CONDUCTOR
    public function loginDriver(): JsonResponse
    {
        request()->validate([
            "name" => "required",
            "password" => "required|min:8|max:20",
            "device_name" => "required"

        ]);


        $driver = User::select(["id", "name", "password", "type_user"])
            ->where("name", request("name"))
            ->where("type_user", "driver")
            ->first();

        /* Verificacion si el driver existe */
        if (!$driver || !Hash::check(request("password"), $driver->password)) {
            throw ValidationException::withMessages([
                "name" => [__("Credenciales incorrectas")]
            ]);
        }

        $token = $driver->createToken(request("device_name"))->plainTextToken;

        return $this->success(
            __("Bienvenid@"),
            [
                "driver" => $driver->toArray(),

                "token" => $token,
            ]
        );
    }


    //TODO: AUTENTICACION PARA EL CLIENTE
    public function loginCustomer(): JsonResponse
    {
        request()->validate([
            "name" => "required",
            "password" => "required|min:8|max:20",
            "device_name" => "required"

        ]);


        $customer = User::select(["id", "name", "password", "type_user"])
            ->where("name", request("name"))
            ->where("type_user", "customer")
            ->first();

        /* Verificacion si el customer existe */
        if (!$customer || !Hash::check(request("password"), $customer->password)) {
            throw ValidationException::withMessages([
                "name" => [__("Credenciales incorrectas")]
            ]);
        }

        $token = $customer->createToken(request("device_name"))->plainTextToken;

        return $this->success(
            __("Bienvenid@"),
            [
                "customer" => $customer->toArray(),

                "token" => $token,
            ]
        );
    }


    //TODO: PARA EL REGISTRO DEL CLIENTE
    public function signupCustomer(): JsonResponse
    {
        request()->validate([
            "name" => "required|min:2|max:60",
            "password" => "required|min:8|max:20",
        ]);
        //: registrar datos del cliente
        Customer::create([
            "name" => request("name"),
            "phone" => request("phone"),
            "email" => request("email"),


        ]);
        //: registrar el tipo de usuario
        User::create([
            "name" => request("name"),
            "password" => bcrypt(request("password")),
            "type_user" => "customer",
            "created_at" => now(),
        ]);

        return $this->success(
            __("Cuenta creada")
        );
    }


    //TODO: PARA EL REGISTRO DEL CONDUCTOR
    public function signupDriver(): JsonResponse
    {
        request()->validate([
            "name" => "required|min:2|max:60",
            "password" => "required|min:8|max:20",

        ]);
        //: registrar datos del cliente
        Driver::create([
            "name" => request("name"),
            "ci" => request("ci"),
            "phone" => request("phone"),
            "address" => request("address"),
            "email" => request("email"),
            // "photo" => request("photo"),


        ]);
        //: registrar el tipo de usuario
        User::create([
            "name" => request("name"),
            "password" => bcrypt(request("password")),
            "type_user" => "driver",
            "created_at" => now(),
        ]);

        return $this->success(
            __("Cuenta creada")
        );
    }



    //TODO: Funcion para cerrar sesion
    public function logout(): JsonResponse
    {
        //Recuperando el token
        $token = request()->bearerToken();

        /** @var PersonalAccessToken $model */

        $model = Sanctum::$personalAccessTokenModel;

        $accessToken = $model::findToken($token);
        /* si existe el token se eliminara */

        $accessToken->delete();


        return $this->success(
            __("Has cerrado sesion con exito!"),
            data: null,
            code: 204,

        );
    }
}
