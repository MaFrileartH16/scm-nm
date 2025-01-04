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
    // Define default user data
    $users = [
      [
        'name' => 'Admin',
        'email' => 'admin@ahass.id',
        'password' => 'admin@ahass.id', // Plain password
        'role' => 'Admin',
        'phone_number' => '081234567890',
        'address' => 'Jl. Admin No. 1',
      ],
      [
        'name' => 'Kurir',
        'email' => 'kurir@ahass.id',
        'password' => 'kurir@ahass.id', // Plain password
        'role' => 'Kurir',
        'phone_number' => '081234567891',
        'address' => 'Jl. Kurir No. 2',
      ],
      [
        'name' => 'Cabang',
        'email' => 'cabang@ahass.id',
        'password' => 'cabang@ahass.id', // Plain password
        'role' => 'Cabang',
        'phone_number' => '081234567892',
        'address' => 'Jl. Cabang No. 3',
      ],
    ];

    // Loop through the users and create or update them
    foreach ($users as $user) {
      User::updateOrCreate(
        ['email' => $user['email']], // Check uniqueness by email
        $user // Data to create or update
      );
    }
  }
}
