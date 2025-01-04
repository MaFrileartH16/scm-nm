<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourierController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $couriers = User::where('role', 'Kurir')->get();

    return Inertia::render('Couriers/Index', [
      'page_title' => 'Daftar Kurir',
      'couriers' => $couriers,
      'notification' => session()->pull('notification'),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    $data = $request->all();
    $data['role'] = 'Kurir';

    User::create($data);

    return redirect()->route('couriers.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Kurir Berhasil Ditambahkan',
        'message' => 'Kurir baru berhasil ditambahkan.',
      ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(): Response
  {
    return Inertia::render('Couriers/Create', [
      'page_title' => 'Tambah Kurir',
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(User $courier): Response
  {
    return Inertia::render('Couriers/Show', [
      'page_title' => 'Detail Kurir',
      'courier' => $courier,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $courier): Response
  {
    return Inertia::render('Couriers/Edit', [
      'page_title' => 'Edit Kurir',
      'courier' => $courier,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, User $courier): RedirectResponse
  {
    $data = $request->all();

    if (!$request->filled('password')) {
      unset($data['password']);
    }

    $courier->update($data);

    return redirect()->route('couriers.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Kurir Berhasil Diperbarui',
        'message' => 'Data kurir berhasil diperbarui.',
      ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $courier): RedirectResponse
  {
    $courier->delete();

    return redirect()->route('couriers.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Kurir Berhasil Dihapus',
        'message' => 'Data kurir telah dihapus.',
      ]);
  }
}
