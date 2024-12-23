<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    User::factory()->create([
      'name' => 'Admin',
      'email' => 'admin@scm.id',
      'password' => Hash::make('Admin@scm.id1'),
      'account_type' => 'admin',
    ]);

    User::factory()->create([
      'name' => 'Kurir',
      'email' => 'kurir@scm.id',
      'password' => Hash::make('Kurir@scm.id1'),
      'account_type' => 'courier',
    ]);

    User::factory()->create([
      'name' => 'Cabang',
      'email' => 'cabang@scm.id',
      'password' => Hash::make('Cabang@scm.id1'),
      'account_type' => 'branch',
    ]);

    User::factory(50)->create();
  }
}
