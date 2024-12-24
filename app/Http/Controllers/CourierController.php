<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CourierController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $couriers = User::where('account_type', 'courier')->get();

    return Inertia::render('Courier/Index', [
      'page_title' => 'Daftar Kurir',
      'couriers' => $couriers,
      'response' => session()->pull('response'),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    try {
      User::create([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
        'account_type' => 'courier',
      ]);

      return redirect()->route('couriers.index')->with('response', [
        'status' => 'success',
        'message' => 'Kurir berhasil ditambahkan.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('couriers.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat menambahkan kurir: ' . $e->getMessage(),
      ]);
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Courier/Create', [
      'page_title' => 'Tambah Kurir',
      'response' => session()->pull('response'),
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(User $courier)
  {
    return Inertia::render('Courier/Show', [
      'page_title' => 'Detail Kurir',
      'courier' => $courier,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $courier)
  {
    return Inertia::render('Courier/Edit', [
      'page_title' => 'Ubah Kurir',
      'courier' => $courier,
      'response' => session()->pull('response'),
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, User $courier)
  {
    try {
      $courier->update([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => $request->input('password') ? Hash::make($request->input('password')) : $courier->password,
      ]);

      return redirect()->route('couriers.index')->with('response', [
        'status' => 'success',
        'message' => 'Kurir berhasil diubah.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('couriers.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat mengubah kurir: ' . $e->getMessage(),
      ]);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $courier)
  {
    try {
      $courier->delete();

      return redirect()->route('couriers.index')->with('response', [
        'status' => 'success',
        'message' => 'Kurir berhasil dihapus.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('couriers.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat menghapus kurir: ' . $e->getMessage(),
      ]);
    }
  }
}
