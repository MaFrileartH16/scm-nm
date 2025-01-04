<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderStatusProof extends Model
{
  use HasFactory;

  /**
   * The primary key type.
   *
   * @var string|null
   */
  public $primaryKey = null;

  /**
   * Indicates if the IDs are auto-incrementing.
   *
   * @var bool
   */
  public $incrementing = false;

  /**
   * Indicates if the model should be timestamped.
   *
   * @var bool
   */
  public $timestamps = false;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<string>
   */
  protected $fillable = [
    'order_id',
    'status',
    'proof_image_path',
  ];

  /**
   * Get the order associated with this proof.
   *
   * @return BelongsTo
   */
  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }
}
