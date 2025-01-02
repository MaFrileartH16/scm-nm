<?php

namespace App\Models;

use Database\Factories\ItemFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
  /** @use HasFactory<ItemFactory> */
  use HasFactory, HasUlids;

  protected $fillable = [
    'code',
    'name',
    'quantity',
    'unit',
  ];
}
