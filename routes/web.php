<?php

use App\Http\Controllers\BranchController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
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
  Route::get('warehouse_items', [BranchController::class, 'warehouse_items_index'])->name('warehouse_items.index');
  Route::get('requests', [OrderController::class, 'index'])->name('requests');
  Route::get('delivieries', [OrderController::class, 'index'])->name('deliveries.index');
  Route::get('surat-jalan', [OrderController::class, 'suratJalan'])->name('surat-jalan');
  Route::get('deliveries', [OrderController::class, 'deliveries'])->name('deliveries');

  Route::resource('couriers', CourierController::class);
  Route::resource('orders', OrderController::class);
  Route::post('/orders/{order}/status', [OrderController::class, 'changeStatus'])->name('orders.changeStatus');

});

require __DIR__ . '/auth.php';
