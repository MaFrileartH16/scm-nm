<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
  public function create(): Response
  {
    return Inertia::render('Auth/Login', [
      'page_title' => 'Masuk Akun',
      'notification' => session()->pull('notification'),
    ]);
  }

  public function store(LoginRequest $request): RedirectResponse
  {
    try {
      $request->authenticate();

      $request->session()->regenerate();

      return redirect()->intended(route('items.index'))
        ->with('notification', [
          'status' => 'success',
          'title' => 'Login Berhasil',
          'message' => 'Selamat datang kembali.',
        ]);
    } catch (Exception $e) {
      return redirect()->route('login')
        ->with('notification', [
          'status' => 'error',
          'title' => 'Login Gagal',
          'message' => 'Periksa kembali email dan kata sandi Anda.',
        ]);
    }
  }

  public function destroy(Request $request): RedirectResponse
  {
    try {
      Auth::guard('web')->logout();

      $request->session()->invalidate();
      $request->session()->regenerateToken();

      return redirect()->route('login')
        ->with('notification', [
          'status' => 'success',
          'title' => 'Logout Berhasil',
          'message' => 'Anda telah keluar dari akun.',
        ]);
    } catch (Exception $e) {
      return redirect()->route('items.index')
        ->with('notification', [
          'status' => 'error',
          'title' => 'Logout Gagal',
          'message' => 'Terjadi kesalahan, coba lagi.',
        ]);
    }
  }
}
