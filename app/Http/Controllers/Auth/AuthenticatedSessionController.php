<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AuthenticatedSessionController extends Controller
{
  public function create(): Response
  {
    return Inertia::render('Auth/LogIn', [
      'page_title' => 'Masuk Akun',
      'response' => session()->pull('response'), // Mengambil data dan menghapusnya dari session
    ]);
  }


  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request): RedirectResponse
  {
    try {
      $request->authenticate();
      $user = $request->user(); // Ambil user dari request setelah authenticate

      $request->session()->regenerate();

      return redirect()
        ->intended(route('dashboard', absolute: false))
        ->with('response', [
          'title' => 'Berhasil Masuk Akun',
          'message' => "Selamat datang, {$user->name}!",
          'status' => true,
        ]);
    } catch (Throwable $e) {
      return redirect()
        ->back()
        ->with('response', [
          'title' => 'Gagal Masuk Akun',
          'message' => 'Harap cek kembali alamat surel dan kata sandi.',
          'status' => false,
        ]);
    }
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): RedirectResponse
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
  }
}
