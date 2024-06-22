<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;
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


Route::get("/show-cities", [CityController::class, "show"]);

//CRUD:: TRANPORTISTAS
Route::post("/store-drivers", [DriverController::class, "store"]);
Route::get("/show-drivers", [DriverController::class, "show"]);
Route::post("/update-drivers", [DriverController::class, "update"]);
Route::get("/delete-drivers/{driver}", [DriverController::class, "destroy"]);

//CRUD :: CLIENTE
Route::post("/store-customer", [CustomerController::class, "store"]);  /// probicional crea cliente y ubicacion
Route::get("/show-customer", [CustomerController::class, "show"]);
Route::post("/update-customer/{customer}", [CustomerController::class, "update"]);
Route::get("/delete-customer/{customer}", [CustomerController::class, "destroy"]);

//CREACION DE UBICACIONES DEL CLIENTE
Route::post("/store-address", [AddressController::class, "store"]);  /// probicional crea cliente y ubicacion
Route::get("/show-address-by-idcustomer/{id_customer}", [AddressController::class, "showAddressByCustomer"]);// t
Route::post("/update-address/{id_customer}", [AddressController::class, "update"]);
Route::get("/delete-address/{id_customer}", [AddressController::class, "destroy"]);

//CRUD DE VEHÍCULOS
Route::post("/store-vehicles", [VehicleController::class, "store"]);
Route::get("/show-vehicles", [VehicleController::class, "show"]);  
Route::post("/update-vehicles/{vehicle}", [VehicleController::class, "update"]);
Route::get("/delete-vehicles/{vehicle}", [VehicleController::class, "destroy"]); 

// CRUD DE PRODUCTOS
Route::post("/store-product", [ProductController::class, "store"]);
Route::get("/show-product/{product}", [ProductController::class, "show"]);
Route::post("/update-product/{product}", [ProductController::class, "update"]);
Route::get("/delete-product/{product}", [ProductController::class, "destroy"]);
Route::get("/index-product", [ProductController::class, "index"]);  //lista de todos los productos creados con su categoria

//para las categorias
Route::get("/show-categories", [CategoryController::class, "show"]);

//para los detalles de la orden
Route::get("/show-details/{id}", [OrderDetailController::class, "show"]);

//para las ordenes
Route::get("/show-order", [OrderController::class, "show"]);
Route::post("/store-order", [OrderController::class, "store"]);
Route::post("/update-order/{id}", [OrderController::class, "update"]);
Route::get("/delete-order/{id}", [OrderController::class, "destroy"]);

//para los detalles
Route::post('/show-orders-details', [OrderDetailController::class, 'store']);
Route::get("/show-orders-details/{orderDetail}", [ProductController::class, "show"]);

/*Route::group(['middleware' => ["auth:sanctum"]], function () {

    Route::prefix('admin')->group(function () {
        Route::get("/show-cities", [CityController::class, "show"]);

        //CRUD:: TRANPORTISTAS
        Route::post("/store-drivers", [DriverController::class, "store"]);
        Route::get("/show-drivers", [DriverController::class, "show"]);
        Route::post("/update-drivers", [DriverController::class, "update"]);
        Route::get("/delete-drivers/{driver}", [DriverController::class, "destroy"]);

        //CRUD :: CLIENTE
        Route::post("/store-customer", [CustomerController::class, "store"]);  /// probicional crea cliente y ubicacion
        Route::get("/show-customer", [CustomerController::class, "show"]);
        Route::post("/update-customer/{customer}", [CustomerController::class, "update"]);
        Route::get("/delete-customer/{customer}", [CustomerController::class, "destroy"]);

        //CREACION DE UBICACIONES DEL CLIENTE
        Route::post("/store-address", [AddressController::class, "store"]);  /// probicional crea cliente y ubicacion
        Route::get("/show-address-by-idcustomer/{id_customer}", [AddressController::class, "showAddressByCustomer"]);// t
        Route::post("/update-address/{id_customer}", [AddressController::class, "update"]);
        Route::get("/delete-address/{id_customer}", [AddressController::class, "destroy"]);

        //CRUD DE VEHÍCULOS
        Route::post("/store-vehicles", [VehicleController::class, "store"]);
        Route::get("/show-vehicles", [VehicleController::class, "show"]);  
        Route::post("/update-vehicles/{vehicle}", [VehicleController::class, "update"]);
        Route::get("/delete-vehicles/{vehicle}", [VehicleController::class, "destroy"]); 
        
        // CRUD DE PRODUCTOS
        Route::post("/store-product", [ProductController::class, "store"]);
        Route::get("/show-product", [ProductController::class, "show"]);
        Route::post("/update-product/{product}", [ProductController::class, "update"]);
        Route::get("/delete-product/{product}", [ProductController::class, "destroy"]);

        //para las categorias
        Route::get("/show-categories", [CategoryController::class, "show"]);

        //para los detalles de la orden
        Route::get("/show-details/{id}", [OrderDetailController::class, "show"]);

        //para las ordenes
        Route::get("/show-order", [OrderController::class, "show"]);
        Route::post("/store-order", [OrderController::class, "store"]);
        Route::post("/update-order/{id}", [OrderController::class, "update"]);
        Route::get("/delete-order/{id}", [OrderController::class, "destroy"]);
    });

    Route::prefix('driver')->group(function () {
    });


    Route::prefix('customer')->group(function () {
    });
});*/
