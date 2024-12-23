<?php

use App\Http\Controllers\BranchController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::prefix('branches')->name('branches.')->group(function () {
    Route::get('/', [BranchController::class, 'index'])->name('index'); // List all branches
    Route::get('/create', [BranchController::class, 'create'])->name('create'); // Show create form
    Route::post('/', [BranchController::class, 'store'])->name('store'); // Store new branch
    Route::get('/{branch}', [BranchController::class, 'show'])->name('show'); // Show specific branch
    Route::get('/{branch}/edit', [BranchController::class, 'edit'])->name('edit'); // Show edit form
    Route::put('/{branch}', [BranchController::class, 'update'])->name('update'); // Update branch
    Route::delete('/{branch}', [BranchController::class, 'destroy'])->name('destroy'); // Delete branch
  });
});
