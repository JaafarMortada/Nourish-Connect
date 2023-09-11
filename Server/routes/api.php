<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\ItemsController;
use Illuminate\Support\Facades\Route;


Route::group(["middleware" => "manager", "prefix" => "/manager"], function () {
    Route::get('get_cashiers', [CashierController::class, 'getCashiers']);
    Route::post('add_cashier', [AuthController::class, 'addCashier']);

});


Route::group(["middleware" => "cashier", "prefix" => "/cashier"], function () {
    Route::prefix('/items')->group(function () {
        Route::get("/get_items/{search?}", [ItemsController::class, "getItems"]);
        Route::post("/add_item", [ItemsController::class, "addItem"]);
        Route::post("/checkout", [ItemsController::class, "checkoutReceipt"]);
        Route::get("/get_receipts/{search?}", [ItemsController::class, "getReceipt"]);
    });
});


Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});