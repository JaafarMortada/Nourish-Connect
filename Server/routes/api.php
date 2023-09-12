<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\CharityController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::group(["middleware" => "manager", "prefix" => "/manager"], function () {
    Route::get('get_cashiers', [CashierController::class, 'getCashiers']);
    Route::get("get_charities", [CharityController::class, "getCharities"]);
    Route::post('add_cashier', [AuthController::class, 'addCashier']);

});

Route::group(["middleware" => "charity", "prefix" => "/charity"], function () {
    Route::post('request_donation', [CharityController::class, 'requestDonation']);
    Route::get('get_requests', [CharityController::class, 'getRequestsData']);

});

Route::get('get_profile', [ProfileController::class, 'getProfile']);
Route::post('edit_profile', [ProfileController::class, 'editProfile']);

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