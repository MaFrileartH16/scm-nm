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
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'full_name' => 'required|string|max:255',
      'phone_number' => 'required|string|max:15',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|string|min:8',
    ]);

    User::create(array_merge($validated, ['role' => 'Branch']));

    return redirect()->route('branches.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Cabang berhasil ditambahkan',
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
    $validated = $request->validate([
      'full_name' => 'required|string|max:255',
      'phone_number' => 'required|string|max:15',
      'email' => 'required|email|unique:users,email,' . $branch->id,
      'password' => 'nullable|string|min:8',
    ]);

    if ($request->filled('password')) {
      $validated['password'] = $request->input('password');
    } else {
      unset($validated['password']);
    }

    $branch->update($validated);

    return redirect()->route('branches.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Cabang berhasil diperbarui',
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
        'title' => 'Cabang berhasil dihapus',
        'message' => 'Data cabang telah dihapus.',
      ]);
  }
}
