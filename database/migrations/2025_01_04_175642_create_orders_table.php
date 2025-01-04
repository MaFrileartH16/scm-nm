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
    Schema::create('orders', function (Blueprint $table) {
      $table->ulid('id')->primary();
      $table->string('code')->unique();
      $table->foreignUlid('branch_id')->constrained('users', 'id');
      $table->string('status');
      $table->boolean('is_viewed')->default(false); // Kolom untuk menandai apakah order sudah dilihat
      $table->string('surat_jalan_url')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
