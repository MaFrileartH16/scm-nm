<?php

namespace App\Http\Controllers;

use App\Models\UserItem;
use App\Http\Requests\StoreUserItemRequest;
use App\Http\Requests\UpdateUserItemRequest;

class UserItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreUserItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserItem $userItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserItem $userItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserItemRequest $request, UserItem $userItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserItem $userItem)
    {
        //
    }
}
