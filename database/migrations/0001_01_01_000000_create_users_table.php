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
    // Create users table
    Schema::create('users', function (Blueprint $table) {
      $table->ulid('id')->primary(); // Primary key using ULID for better scalability and randomness
      $table->string('name')->index(); // Indexed name for faster search
      $table->enum('role', ['Admin', 'Cabang', 'Kurir'])->default('Cabang')->index(); // Role with default and index
      $table->string('phone_number')->unique()->nullable(); // Unique phone number (nullable)
      $table->text('address')->nullable(); // Optional address field
      $table->string('email')->unique(); // Unique email for login
      $table->timestamp('email_verified_at')->nullable(); // Email verification timestamp
      $table->string('password'); // Store hashed passwords
      $table->rememberToken(); // Token for "remember me" functionality
      $table->timestamps(); // Automatically manage created_at and updated_at fields
    });

    // Create password_reset_tokens table
    Schema::create('password_reset_tokens', function (Blueprint $table) {
      $table->string('email')->index(); // Index for fast lookup
      $table->string('token'); // Reset token
      $table->timestamp('created_at')->nullable(); // Timestamp for expiration tracking
    });

    // Create sessions table
    Schema::create('sessions', function (Blueprint $table) {
      $table->string('id')->primary(); // Session ID as primary key
      $table->foreignUlid('user_id')->nullable() // Foreign key to users table
      ->constrained('users')
        ->cascadeOnDelete(); // Cascade delete sessions when user is deleted
      $table->string('ip_address', 45)->nullable(); // Support for IPv4 and IPv6
      $table->text('user_agent')->nullable(); // Browser/agent information
      $table->longText('payload'); // Store session data
      $table->integer('last_activity')->index(); // Index for fast cleanup of old sessions
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    // Drop tables in reverse order to maintain referential integrity
    Schema::dropIfExists('sessions');
    Schema::dropIfExists('password_reset_tokens');
    Schema::dropIfExists('users');
  }
};
