<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FruitApiController;

Route::prefix('fruits')->group(function () {
    Route::get('/', [FruitApiController::class, 'index']);
    Route::get('/{id}', [FruitApiController::class, 'show']);
    Route::post('/', [FruitApiController::class, 'store']);
    Route::put('/{id}', [FruitApiController::class, 'update']);
    Route::delete('/{id}', [FruitApiController::class, 'destroy']);
});
