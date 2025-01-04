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

  protected $fillable = [
    'code',
    'branch_id',
    'status',
    'is_viewed',
  ];

  protected $casts = [
    'is_viewed' => 'boolean',
  ];

  public function branch(): BelongsTo
  {
    return $this->belongsTo(User::class, 'branch_id', 'id');
  }

  public function items(): HasMany
  {
    return $this->hasMany(OrderItem::class, 'order_id')->with('item');
  }

  public function statusProofs(): HasMany
  {
    return $this->hasMany(OrderStatusProof::class, 'order_id');
  }

  public function getCreatedAtAttribute($value)
  {
    return Carbon::parse($value)->format('d M Y H:i');
  }

  public function getUpdatedAtAttribute($value)
  {
    return Carbon::parse($value)->format('d M Y H:i');
  }
}
