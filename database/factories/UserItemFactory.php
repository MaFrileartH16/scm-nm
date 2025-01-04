<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\User;
use App\Models\UserItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserItem>
 */
class UserItemFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = UserItem::class;

  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    // Ambil user dengan role yang valid secara acak
    $user = User::whereIn('role', ['Admin', 'Cabang'])->inRandomOrder()->first();

    // Ambil item yang unik untuk user tertentu
    $item = Item::whereDoesntHave('users', function ($query) use ($user) {
      $query->where('user_id', $user->id);
    })->inRandomOrder()->first();

    return [
      'user_id' => $user ? $user->id : null, // Cek jika ada user yang memenuhi syarat
      'item_id' => $item ? $item->id : null, // Cek jika ada item yang memenuhi syarat
      'quantity' => $this->faker->numberBetween(1, 100), // Kuantitas antara 1 hingga 100
    ];
  }
}
