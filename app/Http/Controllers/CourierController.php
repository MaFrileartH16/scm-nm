<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourierRequest;
use App\Http\Requests\UpdateCourierRequest;
use App\Models\Courier;
use Inertia\Inertia;

class CourierController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Courier/Index', [
      'page_title' => 'Daftar Kurir',
      'response' => session()->pull('response'),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCourierRequest $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Courier $courier)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Courier $courier)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCourierRequest $request, Courier $courier)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Courier $courier)
  {
    //
  }
}
