<?php

use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::prefix('items')->name('items.')->group(function () {
    Route::get('/', [ItemController::class, 'index'])->name('index'); // List all items
    Route::get('/create', [ItemController::class, 'create'])->name('create'); // Show create form
    Route::post('/', [ItemController::class, 'store'])->name('store'); // Store new item
    Route::get('/{item}', [ItemController::class, 'show'])->name('show'); // Show specific item
    Route::get('/{item}/edit', [ItemController::class, 'edit'])->name('edit'); // Show edit form
    Route::put('/{item}', [ItemController::class, 'update'])->name('update'); // Update item
    Route::delete('/{item}', [ItemController::class, 'destroy'])->name('destroy'); // Delete item
  });
}); 
