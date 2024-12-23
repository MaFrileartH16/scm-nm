<?php

use App\Http\Controllers\CourierController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::prefix('couriers')->name('couriers.')->group(function () {
    Route::get('/', [CourierController::class, 'index'])->name('index'); // List all couriers
    Route::get('/create', [CourierController::class, 'create'])->name('create'); // Show create form
    Route::post('/', [CourierController::class, 'store'])->name('store'); // Store new courier
    Route::get('/{courier}', [CourierController::class, 'show'])->name('show'); // Show specific courier
    Route::get('/{courier}/edit', [CourierController::class, 'edit'])->name('edit'); // Show edit form
    Route::put('/{courier}', [CourierController::class, 'update'])->name('update'); // Update courier
    Route::delete('/{courier}', [CourierController::class, 'destroy'])->name('destroy'); // Delete courier
  });
});
