<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserItem extends Model
{
  use HasFactory;

  // Non-incrementing, karena tabel pivot biasanya tidak memiliki ID auto-increment
  public $incrementing = false;

  // Jika menggunakan composite key, laravel tidak mendukung langsung primary key array.
  public $timestamps = true;

  // Tabel ini memiliki timestamps
  protected $primaryKey = null;
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'user_id',
    'item_id',
    'quantity',
  ];

  /**
   * Define the relationship with the User model.
   */
  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  /**
   * Define the relationship with the Item model.
   */
  public function item(): BelongsTo
  {
    return $this->belongsTo(Item::class);
  }
}
