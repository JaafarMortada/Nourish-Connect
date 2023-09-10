<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ItemsController;
use Illuminate\Support\Facades\Route;

Route::group(["middleware" => "cashier", "prefix" => "/cashier"], function () {
    Route::prefix('/items')->group(function () {
        Route::get("/{search?}", [ItemsController::class, "getItems"]);
        Route::post("/add_item", [ItemsController::class, "addItem"]);
    });
});


Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('add_cashier', [AuthController::class, 'addCashier']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});