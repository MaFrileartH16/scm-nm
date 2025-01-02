<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'code' => strtoupper(Str::random(8)),
      'name' => $this->faker->word,
      'quantity' => $this->faker->numberBetween(1, 100),
      'unit' => $this->faker->randomElement(['pcs', 'kg', 'ltr']),
    ];
  }
}
