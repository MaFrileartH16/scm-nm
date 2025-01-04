<?php

namespace App\Models;

use Database\Factories\ItemFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Item extends Model
{
  /** @use HasFactory<ItemFactory> */
  use HasFactory, HasUlids;

  protected $fillable = [
    'code',
    'name',
    'unit',
  ];

  /**
   * Get the UserItems associated with the item.
   */
  public function users(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 'user_items')
      ->withPivot('quantity')
      ->withTimestamps();
  }
}
