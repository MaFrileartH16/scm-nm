<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $branches = User::where('role', 'Cabang')->get();

    return Inertia::render('Branches/Index', [
      'page_title' => 'Daftar Cabang',
      'branches' => $branches,
      'notification' => session()->pull('notification'),
    ]);
  }

  public function warehouse_items_index(): Response
  {
    // Ambil user dengan role "Admin" dan relasi items
    $admin = User::where('role', 'Admin')
      ->with('items')
      ->first();

    // Pastikan user ditemukan
    if (!$admin) {
      abort(404, 'Admin not found');
    }

    // Format data items dengan menambahkan 'quantity' dari pivot
    $items = $admin->items->map(function ($item) {
      $item->quantity = $item->pivot->quantity; // Tambahkan quantity dari pivot
      unset($item->pivot); // Hapus data pivot jika tidak diperlukan
      return $item;
    });

    // Return the data to the Inertia view
    return Inertia::render('Branches/WarehouseItemsIndex', [
      'page_title' => 'Daftar Barang Warehouse',
      'items' => $items,
      'notification' => session()->pull('notification'),
    ]);
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    $data = $request->all();
    $data['role'] = 'Cabang';

    User::create($data);

    return redirect()->route('branches.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Cabang Berhasil Ditambahkan',
        'message' => 'Cabang baru berhasil ditambahkan.',
      ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(): Response
  {
    return Inertia::render('Branches/Create', [
      'page_title' => 'Tambah Cabang',
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(User $branch): Response
  {
    return Inertia::render('Branches/Show', [
      'page_title' => 'Detail Cabang',
      'branch' => $branch,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $branch): Response
  {
    return Inertia::render('Branches/Edit', [
      'page_title' => 'Edit Cabang',
      'branch' => $branch,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, User $branch): RedirectResponse
  {
    $data = $request->all();

    if (!$request->filled('password')) {
      unset($data['password']);
    }

    $branch->update($data);

    return redirect()->route('branches.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Cabang Berhasil Diperbarui',
        'message' => 'Data cabang berhasil diperbarui.',
      ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $branch): RedirectResponse
  {
    $branch->delete();

    return redirect()->route('branches.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Cabang Berhasil Dihapus',
        'message' => 'Data cabang telah dihapus.',
      ]);
  }
}
