<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
  public function index(): Response
  {
    $items = Cache::remember('all_items', 60, function () {
      return Item::all(); // Fetch all items without pagination
    });

    return Inertia::render('Items/Index', [
      'page_title' => 'Daftar Barang',
      'items' => $items,
      'notification' => session()->pull('notification'),
    ]);
  }

  public function store(Request $request): RedirectResponse
  {
    try {
      $validated = $request->validate([
        'code' => 'required|unique:items,code|max:255',
        'name' => 'required|max:255',
        'quantity' => 'required|integer',
        'unit' => 'required|max:50',
      ]);

      Item::create($validated);

      Cache::forget('all_items');

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

  public function create(): Response
  {
    return Inertia::render('Items/Create', [
      'page_title' => 'Tambah Barang',
    ]);
  }

  public function show(Item $item): Response
  {
    return Inertia::render('Items/Show', [
      'page_title' => 'Detail Barang',
      'item' => $item,
    ]);
  }

  public function edit(Item $item): Response
  {
    return Inertia::render('Items/Edit', [
      'page_title' => 'Ubah Barang',
      'item' => $item,
    ]);
  }

  public function update(Request $request, Item $item): RedirectResponse
  {
    try {
      $validated = $request->validate([
        'code' => 'required|unique:items,code,' . $item->id . '|max:255',
        'name' => 'required|max:255',
        'quantity' => 'required|integer',
        'unit' => 'required|max:50',
      ]);

      $item->update($validated);

      Cache::forget('all_items');

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

  public function destroy(Item $item): RedirectResponse
  {
    try {
      $item->delete();

      Cache::forget('all_items');

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
