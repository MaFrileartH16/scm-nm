<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    $name = $this->faker->name(); // Generate a random name
    $email = strtolower(Str::slug($name, '_')) . '@ahass.id'; // Generate email in a slug format

    return [
      'name' => $name,
      'phone_number' => $this->faker->unique()->numerify('08##########'), // Simulate an Indonesian phone number
      'address' => $this->faker->address(),
      'role' => $this->faker->randomElement(['Cabang', 'Kurir']), // Random role
      'email' => $email,
      'email_verified_at' => now(),
      'password' => 'password', // Default password; bcrypt hashed automatically by User model
      'remember_token' => Str::random(10),
    ];
  }

  /**
   * State to indicate that the model's email address is unverified.
   */
  public function unverified(): static
  {
    return $this->state(fn(array $attributes) => [
      'email_verified_at' => null,
    ]);
  }
}
