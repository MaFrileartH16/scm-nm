<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'order_id',
    'item_id',
    'quantity',
  ];

  /**
   * Get the order that owns this order item.
   */
  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  /**
   * Get the item for this order item.
   */
  public function item(): BelongsTo
  {
    return $this->belongsTo(Item::class);
  }
}
