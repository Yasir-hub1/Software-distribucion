<?php

use App\Http\Controllers\Api\AuthController;
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
Route::post("/signup-customer", [AuthController::class, "signupCustomer"]); // crear usuario


Route::group(['middleware' => ["auth:sanctum"]], function () {

    Route::prefix('admin')->group(function () {


    });
    Route::prefix('driver')->group(function () {


    });

    Route::prefix('customer')->group(function () {


    });



});
