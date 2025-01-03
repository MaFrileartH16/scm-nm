<?php

use App\Http\Controllers\BranchController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');

Route::middleware('auth')->group(function () {
//  Route::get('/dashboard', fn() => Inertia::render('Dashboard', [
//    'page_title' => 'Dasbor',
//    'notification' => session()->pull('notification')
//  ]))->name('dashboard');

  require __DIR__ . '/profile.php';
//  Route::get('items', ItemController::class)->name('items');
  Route::resource('items', ItemController::class);
  Route::resource('branches', BranchController::class);
});

require __DIR__ . '/auth.php';
