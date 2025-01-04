<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
  use HasFactory, HasUlids;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'code',
    'branch_id',
    'status',
    'is_viewed', // Menambahkan is_viewed ke fillable
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
  protected $casts = [
    'is_viewed' => 'boolean', // Cast is_viewed sebagai boolean
  ];

  /**
   * Get the branch (user) that owns the order.
   */
  public function branch(): BelongsTo
  {
    return $this->belongsTo(User::class, 'branch_id', 'id');
  }

  /**
   * Get the items for the order.
   */
  public function items(): HasMany
  {
    // Define the relationship with OrderItem model
    return $this->hasMany(OrderItem::class, 'order_id')
      ->with('item');
  }

  /**
   * Accessor for the created_at timestamp.
   */
  public function getCreatedAtAttribute($value)
  {
    return Carbon::parse($value)->format('d M Y H:i'); // Format the date as needed
  }

  /**
   * Accessor for the updated_at timestamp.
   */
  public function getUpdatedAtAttribute($value)
  {
    return Carbon::parse($value)->format('d M Y H:i'); // Format the date as needed
  }
}
