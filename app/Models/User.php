<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
  use HasFactory, Notifiable, HasUlids;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'phone_number',
    'address',
    'role',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  /**
   * Automatically hash the password when set.
   *
   * @param string $value
   * @return void
   */
  public function setPasswordAttribute(string $value): void
  {
    if (!empty($value)) {
      $this->attributes['password'] = Hash::make($value);
    }
  }

  /**
   * Capitalize the user's name when retrieved.
   *
   * @return string
   */
  public function getNameAttribute(): string
  {
    return ucwords($this->attributes['name']);
  }

  public function items(): BelongsToMany
  {
    return $this->belongsToMany(Item::class, 'user_items') // Relasi ke tabel pivot
    ->withPivot('quantity') // Menyertakan data tambahan
    ->withTimestamps(); // Menyimpan waktu pembuatan/pembaruan
  }

  public function orders(): HasMany
  {
    return $this->hasMany(Order::class, 'branch_id', 'id');
  }
}
