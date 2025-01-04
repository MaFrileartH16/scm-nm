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
    Schema::create('items', function (Blueprint $table) {
      $table->ulid('id')->primary(); // Use ULID for primary key for better scalability and sorting
      $table->string('code', 50)->unique()->index(); // Code with a length limit, unique, and indexed for faster lookups
      $table->string('name', 255)->index(); // Name field with a length limit, indexed for searches
      $table->string('unit', 20); // Unit field with a reasonable length limit
      $table->timestamps(); // Default created_at and updated_at timestamps
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('items'); // Cleanly drops the table on rollback
  }
};
