<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FruitController;

Route::get('/', function () {
    return redirect('/fruits');
});

Route::resource('fruits', FruitController::class);