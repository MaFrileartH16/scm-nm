<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('user_items', function (Blueprint $table) {
      $table->id(); // Primary key untuk tabel
      $table->foreignUlid('user_id') // Relasi ke tabel users
      ->constrained('users')
        ->cascadeOnUpdate()
        ->cascadeOnDelete();
      $table->foreignUlid('item_id') // Relasi ke tabel items
      ->constrained('items')
        ->cascadeOnUpdate()
        ->cascadeOnDelete();
      $table->integer('quantity')->unsigned()->default(0); // Kuantitas harus positif dengan default 0
      $table->timestamps(); // Melacak waktu pembuatan/pembaruan hubungan
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('user_items');
  }
};
