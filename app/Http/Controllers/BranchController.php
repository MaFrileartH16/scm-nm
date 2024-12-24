<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class BranchController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $branches = User::where('account_type', 'branch')->get();

    return Inertia::render('Branch/Index', [
      'page_title' => 'Daftar Cabang',
      'branches' => $branches,
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
        'account_type' => 'branch',
      ]);

      return redirect()->route('branches.index')->with('response', [
        'status' => 'success',
        'message' => 'Cabang berhasil ditambahkan.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('branches.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat menambahkan cabang: ' . $e->getMessage(),
      ]);
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Branch/Create', [
      'page_title' => 'Tambah Cabang',
      'response' => session()->pull('response'),
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(User $branch)
  {
    return Inertia::render('Branch/Show', [
      'page_title' => 'Detail Cabang',
      'branch' => $branch,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $branch)
  {
    return Inertia::render('Branch/Edit', [
      'page_title' => 'Ubah Cabang',
      'branch' => $branch,
      'response' => session()->pull('response'),
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, User $branch)
  {
    try {
      $branch->update([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => $request->input('password') ? Hash::make($request->input('password')) : $branch->password,
      ]);

      return redirect()->route('branches.index')->with('response', [
        'status' => 'success',
        'message' => 'Cabang berhasil diubah.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('branches.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat mengubah cabang: ' . $e->getMessage(),
      ]);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $branch)
  {
    try {
      $branch->delete();

      return redirect()->route('branches.index')->with('response', [
        'status' => 'success',
        'message' => 'Cabang berhasil dihapus.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('branches.index')->with('response', [
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat menghapus cabang: ' . $e->getMessage(),
      ]);
    }
  }
}
