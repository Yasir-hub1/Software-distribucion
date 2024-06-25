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
use PHPUnit\Framework\Constraint\IsEmpty;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;

class AuthController extends Controller
{
    use ApiResponder;

    ///AUTENTICACION PARA ADMIN
    public function loginAdmin(): JsonResponse
    {
        request()->validate([
            "username" => "required",
            "password" => "required|min:6|max:20",
            "device_name" => "required"

        ]);


        $admin = User::select(["id", "username", "password", "type_user"])
            ->where("username", request("username"))
            ->where("type_user", request("type_user"))
            ->first();

        if (empty($admin)) {
            return $this->error(
                __("El usuario no existe"),

            );
        }

        /* Verificacion si el admin existe */
        if (!$admin || !Hash::check(request("password"), $admin->password)) {
            throw ValidationException::withMessages([
                "name" => [__("Credenciales incorrectas")]
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
            "username" => "required",
            "password" => "required|min:6|max:20",
            "device_name" => "required"

        ]);


        $user = User::select(["id", "username", "password", "type_user"])
            ->where("username", request("username"))
            ->where("type_user", "driver")
            ->first();

        if (empty($user)) {
            return $this->error(
                __("El usuario no existe"),

            );
        }

        /* Verificacion si el user existe */
        if (!$user || !Hash::check(request("password"), $user->password)) {
            throw ValidationException::withMessages([
                "name" => [__("Credenciales incorrectas")]
            ]);
        }

        $token = $user->createToken(request("device_name"))->plainTextToken;

        $driver=Driver::where("id_user",$user->id)->first();

        return $this->success(
            __("Bienvenid@"),
            [
                "user" => $user->toArray(),
                "driver"=>$driver->toArray(),

                "userToken" => $token,
            ]
        );
    }


    //TODO: AUTENTICACION PARA EL CLIENTE
    public function loginCustomer(): JsonResponse
    {
        request()->validate([
            "username" => "required",
            "password" => "required|min:6|max:20",
            "device_name" => "required"

        ]);


        $user = User::select(["id", "username", "password", "type_user"])
            ->where("username", request("username"))
            ->where("type_user", "customer")
            ->first();

        if (empty($user)) {
            return $this->error(
                __("El usuario no existe"),

            );
        }

        /* Verificacion si el user existe */
        if (!$user || !Hash::check(request("password"), $user->password)) {
            throw ValidationException::withMessages([
                "username" => [__("Credenciales incorrectas")]
            ]);
        }

        $token = $user->createToken(request("device_name"))->plainTextToken;
        $customer=Customer::where("id_user",$user->id)->first();

        return $this->success(
            __("Bienvenid@"),
            [
                "user" => $user->toArray(),
                "customer" => $customer->toArray(),

                "userToken" => $token,
            ]
        );
    }
    //TODO: PARA EL REGISTRO DEL ADMIN
    public function signupAdmin(): JsonResponse
    {
        request()->validate([
            "username" => "required|min:2|max:60",
            "password" => "required|min:8|max:20",
        ]);

        //: registrar el tipo de usuario
        $admin = User::create([
            "username" => request("username"),
            "password" => bcrypt(request("password")),
            "type_user" => "admin",
            "created_at" => now(),
        ]);

        return $this->success(
            __("Cuenta creada"),
            [
                "admin" => $admin->toArray(),

            ]
        );
    }

    //TODO: PARA EL REGISTRO DEL CLIENTE
    public function signupCustomer(): JsonResponse
    {
        request()->validate([
            "username" => "required|min:2|max:60",
            "password" => "required|min:8|max:20",
        ]);
        //: registrar datos del cliente

        //: registrar el tipo de usuario
     $user= User::create([
            "username" => request("username"),
            "password" => bcrypt(request("password")),
            "type_user" => "customer",
            "created_at" => now(),
        ]);

        $customer= Customer::create([
            "nombre" => request("username"),
            "phone" => request("phone"),
            "email" => request("email"),

            "id_cities"=>request("id_cities") ? request("id_cities") : 1,
            "id_user" => $user->id,


        ]);
        $token = $user->createToken(request("device_name"))->plainTextToken;

        return $this->success(
            __("Bienvenid@"),
            [
                "user" => $user->toArray(),
                "customer" => $customer->toArray(),

                "userToken" => $token,
            ]
        );
    }


    //TODO: PARA EL REGISTRO DEL CONDUCTOR
    public function signupDriver(): JsonResponse
    {
        request()->validate([
            "username" => "required|min:2|max:60",
        ]);

        //: registrar el tipo de usuario
        $user = User::create([
            "username" => request("username"),
            "password" => bcrypt(request("ci")),
            "type_user" => "driver",
            "created_at" => now(),
        ]);


        //: registrar datos del cliente
        /*Driver::create([
            "name" => request("name"),
            "ci" => request("ci"),
            "phone" => request("phone"),
            "address" => request("address"),

            // "photo" => request("photo"),
            "id_cities" => request("id_cities"),
            "id_user" => $user->id,

        ]);*/
        $driver = new Driver();

        $driver->name = request("name");
        $driver->ci = request("ci");
        $driver->phone = request("phone");
        $driver->address = request("address");
        $driver->id_cities = request("id_cities");
        $driver->id_user = $user->id;
        $user->save();
        $driver->save();

        return $this->success(
            __("Cuenta creada")
        );

        // $driver =
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
