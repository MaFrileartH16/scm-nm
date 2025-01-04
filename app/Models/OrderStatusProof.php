<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderStatusProof extends Model
{
  use HasFactory;

  public $primaryKey = null;
  public $incrementing = false;
  public $timestamps = false;

  protected $fillable = [
    'order_id',
    'status',
    'proof_image_path',
  ];

  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }
}
