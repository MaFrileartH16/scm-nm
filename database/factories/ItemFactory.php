<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

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
      'code' => strtoupper($this->faker->unique()->bothify('ITEM-####')), // Generate unique code in the format ITEM-####
      'name' => $this->faker->sentence(3, false), // Generate a 3-word name without ending punctuation
      'unit' => $this->faker->randomElement(['pcs', 'kg', 'ltr', 'box', 'set']), // Random unit from predefined options
    ];
  }
}
