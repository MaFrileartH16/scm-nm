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
    Schema::create('order_items', function (Blueprint $table) {
      $table->foreignUlid('order_id')
        ->constrained()
        ->onUpdate('cascade') // Cascade on update
        ->onDelete('cascade'); // Cascade on delete

      $table->foreignUlid('item_id')
        ->constrained()
        ->onUpdate('cascade') // Cascade on update
        ->onDelete('cascade'); // Cascade on delete
      $table->integer('quantity');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('order_items');
  }
};
