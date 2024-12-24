<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Item/Index', [
      'page_title' => 'Daftar Barang',
      'response' => session()->pull('response'),
      'items' => Item::all(),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    try {
      Item::create($request->only(['code', 'name', 'quantity', 'unit']));

      return redirect()->route('items.index')->with('response', [
        'status' => 'success',
        'message' => 'Barang berhasil ditambahkan.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('items.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat menambahkan barang: ' . $e->getMessage(),
      ]);
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Item/Create', [
      'page_title' => 'Tambah Barang',
      'response' => session()->pull('response'),
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(Item $item)
  {
    // Implementasi jika diperlukan
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Item $item)
  {
    return Inertia::render('Item/Edit', [
      'page_title' => 'Ubah Barang',
      'response' => session()->pull('response'),
      'item' => $item,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Item $item)
  {
    try {
      $item->update($request->only(['code', 'name', 'quantity', 'unit']));

      return redirect()->route('items.index')->with('response', [
        'status' => 'success',
        'message' => 'Barang berhasil diubah.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('items.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat mengubah barang: ' . $e->getMessage(),
      ]);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Item $item)
  {
    try {
      $item->delete();

      return redirect()->route('items.index')->with('response', [
        'status' => 'success',
        'message' => 'Barang berhasil dihapus.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('items.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat menghapus barang: ' . $e->getMessage(),
      ]);
    }
  }
}
