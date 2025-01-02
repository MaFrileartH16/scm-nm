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
      'notification' => session()->pull('notification')
    ]);
  }

  public function store(LoginRequest $request): RedirectResponse
  {
    try {
      $request->authenticate();

      $request->session()->regenerate();

      return redirect()->intended(route('dashboard', absolute: false))
        ->with('notification', [
          'status' => 'success',
          'title' => 'Berhasil masuk akun',
          'message' => 'Selamat datang kembali!',
        ]);
    } catch (Exception $e) {
      return redirect()->route('login')
        ->with('notification', [
          'status' => 'error',
          'title' => 'Gagal masuk akun',
          'message' => 'Silahkan periksa kembali alamat surel dan kata sandi.',
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
          'title' => 'Berhasil keluar akun',
          'message' => 'Sampai jumpa kembali!',
        ]);
    } catch (Exception $e) {
      return redirect()->route('dashboard')
        ->with('notification', [
          'status' => 'error',
          'title' => 'Gagal keluar akun',
          'message' => 'Terjadi kesalahan saat mencoba keluar akun. Silakan coba lagi.',
        ]);
    }
  }
}
