<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
  /**
   * Display a listing of the items owned by the authenticated user.
   */
  public function index(Request $request): Response
  {
    // Ambil data user yang sedang login dan relasi items
    $user = User::with('items')->find(Auth::id());

    // Pastikan user ditemukan
    if (!$user) {
      abort(404, 'User not found');
    }

    // Format data items dengan menambahkan 'quantity' dari pivot
    $items = $user->items->map(function ($item) {
      $item->quantity = $item->pivot->quantity; // Tambahkan quantity dari pivot
      unset($item->pivot); // Hapus data pivot jika tidak diperlukan
      return $item;
    });

    // Kirim data ke Inertia
    return Inertia::render('Items/Index', [
      'page_title' => 'Daftar Barang',
      'items' => $items,
      'notification' => session()->pull('notification'),
    ]);
  }


  /**
   * Store a newly created item and associate it with the authenticated user.
   */
  public function store(Request $request): RedirectResponse
  {
    try {
      // Create the item
      $item = Item::create($request->only(['code', 'name', 'unit']));

      // Associate the item with the authenticated user (no pivot table involved here)
      $item->users()->attach(Auth::id(), [
        'quantity' => $request->input('quantity', 0), // Store quantity as pivot data
      ]);

      // Clear cache
      Cache::forget('user_' . Auth::id() . '_items');

      return redirect()->route('items.index')
        ->with('notification', [
          'status' => 'success',
          'title' => 'Barang berhasil dibuat',
          'message' => 'Barang baru berhasil ditambahkan.',
        ]);
    } catch (Exception $e) {
      return redirect()->route('items.index')
        ->with('notification', [
          'status' => 'error',
          'title' => 'Gagal menambah barang',
          'message' => 'Terjadi kesalahan, coba lagi.',
        ]);
    }
  }

  /**
   * Show the form for creating a new item.
   */
  public function create(): Response
  {
    return Inertia::render('Items/Create', [
      'page_title' => 'Tambah Barang',
    ]);
  }

  /**
   * Show the details of a specific item.
   */
  public function show(Item $item): Response
  {
    // Load the item with the users (pivot data)
    $item->load('users');

    // Fetch the quantity for the authenticated user
    $userItem = $item->users->firstWhere('id', Auth::id());
    $item->quantity = $userItem ? $userItem->pivot->quantity : 0;

    return Inertia::render('Items/Show', [
      'page_title' => 'Detail Barang',
      'item' => $item,
    ]);
  }

  /**
   * Show the form for editing a specific item.
   */
  public function edit(Item $item): Response
  {
    // Load the item and its associated users (pivot data)
    $item->load('users');

    // Fetch the quantity for the authenticated user
    $userItem = $item->users->firstWhere('id', Auth::id());
    $item->quantity = $userItem ? $userItem->pivot->quantity : 0;

    return Inertia::render('Items/Edit', [
      'page_title' => 'Ubah Barang',
      'item' => $item,
    ]);
  }

  /**
   * Update the details of a specific item.
   */
  public function update(Request $request, Item $item): RedirectResponse
  {
    try {
      // Update the item (code, name, unit)
      $item->update($request->only(['code', 'name', 'unit']));

      // Update the quantity for the authenticated user in the pivot table
      $item->users()->updateExistingPivot(Auth::id(), [
        'quantity' => $request->input('quantity', 0), // Update quantity in the pivot table
      ]);

      // Clear cache
      Cache::forget('user_' . Auth::id() . '_items');

      return redirect()->route('items.index')
        ->with('notification', [
          'status' => 'success',
          'title' => 'Barang berhasil diperbarui',
          'message' => 'Barang telah diperbarui.',
        ]);
    } catch (Exception $e) {
      return redirect()->route('items.index')
        ->with('notification', [
          'status' => 'error',
          'title' => 'Gagal memperbarui barang',
          'message' => 'Terjadi kesalahan, coba lagi.',
        ]);
    }
  }

  /**
   * Remove a specific item from the authenticated user's inventory.
   */
  public function destroy(Item $item): RedirectResponse
  {

    try {
      // Remove the item for the authenticated user from the pivot table
      $item->users()->detach(Auth::id());

      // Clear cache
      Cache::forget('user_' . Auth::id() . '_items');

      return redirect()->route('items.index')
        ->with('notification', [
          'status' => 'success',
          'title' => 'Barang berhasil dihapus',
          'message' => 'Barang telah dihapus.',
        ]);
    } catch (Exception $e) {
      return redirect()->route('items.index')
        ->with('notification', [
          'status' => 'error',
          'title' => 'Gagal menghapus barang',
          'message' => 'Terjadi kesalahan, coba lagi.',
        ]);
    }
  }
}
