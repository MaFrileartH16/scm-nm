<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::middleware('auth')->group(function () {
  Route::get('/dashboard', fn() => Inertia::render('Dashboard', [
    'page_title' => 'Dasbor',
    'notification' => session()->pull('notification')
  ]))->name('dashboard');

  require __DIR__ . '/profile.php';
});

require __DIR__ . '/auth.php';
