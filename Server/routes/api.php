<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;



Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});