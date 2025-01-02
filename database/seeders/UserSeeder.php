<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    User::create([
      'full_name' => 'Admin',
      'email' => 'admin@scm.id',
      'password' => 'admin@scm.id',
      'role' => 'Admin',
    ]);

    User::create([
      'full_name' => 'Kurir',
      'email' => 'kurir@scm.id',
      'password' => 'kurir@scm.id',
      'role' => 'Kurir',
    ]);

//    User::create([
//      'full_name' => 'Cabang',
//      'email' => 'cabang@scm.id',
//      'password' => 'cabang@scm.id',
//      'role' => 'Cabang',
//    ]);

    User::create([
      'full_name' => 'AHASS Wahana Motor II',
      'email' => 'awm2@scm.id',
      'password' => 'awm2@scm.id',
      'role' => 'Cabang',
    ]);
  }
}
