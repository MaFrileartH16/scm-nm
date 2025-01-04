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
    Schema::create('order_status_proofs', function (Blueprint $table) {
      $table->foreignUlid('order_id')
        ->constrained('orders')
        ->cascadeOnDelete(); // Foreign key relationship with cascade delete
      $table->string('status'); // Order status
      $table->string('proof_image_path')->nullable(); // Path to the proof image (optional)
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('order_status_proofs');
  }
};
