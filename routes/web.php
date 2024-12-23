<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');
Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
      'page_title' => 'Dasbor',
      'response' => session()->pull('response'),
    ]);
  })->name('dashboard');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/courier.php';
require __DIR__ . '/item.php';
require __DIR__ . '/branch.php';
