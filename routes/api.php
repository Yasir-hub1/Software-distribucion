<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DriverController;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//TODO: ADMIN

Route::post('/login-admin', [AuthController::class, 'loginAdmin']); //iniciar session
Route::post("/signup-admin", [AuthController::class, "signupAdmin"]); // crear usuario


//TODO:DRIVER
Route::post('/login-driver', [AuthController::class, 'loginDriver']); //iniciar session
Route::post("/signup-driver", [AuthController::class, "signupDriver"]); // crear usuario



//TODO:CUSTOMER
Route::post('/login-customer', [AuthController::class, 'loginCustomer']); //iniciar session
Route::post("/signup-customer", [AuthController::class, "signupCustomer"]); // crear usuario y al cliente sin ubicacion


//TODO: CERRAR SESSION PARA TODOS LOS ROLES
Route::post("/logout", [AuthController::class, "logout"]); // crear usuario




//TODO:PREFIJOS
Route::group(['middleware' => ["auth:sanctum"]], function () {

    Route::prefix('admin')->group(function () {
        Route::get("/show-cities", [CityController::class, "show"]);

        //CRUD:: TRANPORTISTAS
        Route::get("/show-drivers", [DriverController::class, "show"]);
        Route::post("/store-drivers", [DriverController::class, "store"]);
        Route::post("/update-drivers", [DriverController::class, "update"]);
        Route::get("/delete-drivers/{driver}", [DriverController::class, "destroy"]);

        //CRUD :: CLIENTE
        Route::get("/show-customer", [CustomerController::class, "show"]);
        Route::post("/store-customer", [CustomerController::class, "store"]);  /// probicional crea cliente y ubicacion
        Route::post("/update-customer/{customer}", [CustomerController::class, "update"]);
        Route::get("/delete-customer/{customer}", [CustomerController::class, "destroy"]);

        //CREACION DE UBICACIONES DEL CLIENTE
        Route::get("/show-address-by-idcustomer/{id_customer}", [AddressController::class, "showAddressByCustomer"]);// t
        Route::post("/store-address", [AddressController::class, "store"]);  /// probicional crea cliente y ubicacion
        Route::post("/update-address/{id_customer}", [AddressController::class, "update"]);
        Route::get("/delete-address/{id_customer}", [AddressController::class, "destroy"]);


    });



    Route::prefix('driver')->group(function () {
    });




    Route::prefix('customer')->group(function () {
    });
});
