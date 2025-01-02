<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create('vehicles', function (Blueprint $table) {
      $table->ulid('id')->primary();
      $table->string('plate_number');
      $table->integer('engine_capacity');
      $table->year('manufacture_year');
      $table->string('engine_number');
      $table->string('vehicle_id');
      $table->string('category');
      $table->integer('gross_vehicle_weight');
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('vehicles');
  }
};
