<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\CharityController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DiscountsController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromptDataController;
use Illuminate\Support\Facades\Route;


Route::group(["middleware" => "manager", "prefix" => "/manager"], function () {
    Route::get("get_cashiers", [CashierController::class, 'getCashiers']);
    Route::get("get_charities", [CharityController::class, "getCharities"]);
    Route::get("get_discounts_data", [DiscountsController::class, "getDiscountsData"]);
    Route::get("get_donations_data", [DonationController::class, "getDonationsData"]);
    Route::get("get_donations_stats", [DonationController::class, "getDonationsStats"]);
    Route::post("add_cashier", [AuthController::class, 'addCashier']);
    Route::get("get_suggestions", [PromptDataController::class, "getAiSuggestions"]);

});

Route::group(["middleware" => "charity", "prefix" => "/charity"], function () {
    Route::post('request_donation', [CharityController::class, 'requestDonation']);
    Route::get('get_requests', [CharityController::class, 'getRequestsData']);

});

Route::group(["middleware" => "manager.or.charity", "prefix" => "/manager_charity"], function () {
    Route::prefix('/profile')->group(function () {
        Route::get('/get_profile', [ProfileController::class, 'getProfile']);
        Route::post('/edit_profile', [ProfileController::class, 'editProfile']);
    });
    Route::prefix('/chat')->group(function () {
        Route::get('/search_users/{search?}', [ChatController::class, 'searchUsers']);
        Route::post('/new_message', [ChatController::class, 'saveNewMessage']);

    });

});

Route::group(["middleware" => "cashier", "prefix" => "/cashier"], function () {
    Route::prefix('/items')->group(function () {
        Route::get("/get_items/{search?}", [ItemsController::class, "getItems"]);
        Route::post("/add_item", [ItemsController::class, "addItem"]);
        Route::post("/checkout", [ItemsController::class, "checkoutReceipt"]);
        Route::get("/get_receipts/{search?}", [ItemsController::class, "getReceipt"]);
        Route::post('/import_file/{for}', [ExcelController::class, 'uploadExcelOrCSV']);

    });
});


Route::prefix('auth')->group(function () {
    Route::post('login/{refresh?}', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('register', [AuthController::class, 'register']);
});