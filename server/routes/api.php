<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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


Route::middleware(["auth:sanctum"])->group(function () {
    Route::apiResource("users", UserController::class);
    Route::get("roles", [RoleController::class, "index"]);
    Route::get("/profile", [UserController::class, "profile"]);
    Route::post("/logout", [UserController::class, "logout"]);
});

Route::post("/auth", [UserController::class, "auth"]);
Route::post("/register", [UserController::class, "register"]);
