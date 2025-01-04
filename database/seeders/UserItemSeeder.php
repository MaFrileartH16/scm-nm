<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use App\Models\UserItem;
use Illuminate\Database\Seeder;

class UserItemSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Get users with 'Admin' or 'Cabang' roles
    $users = User::whereIn('role', ['Admin', 'Cabang'])->get();
    $items = Item::all();

    // Exit if no users or items are available
    if ($users->isEmpty() || $items->isEmpty()) {
      return;
    }

    // Assign unique items to each user
    $users->each(function ($user) use ($items) {
      // Get a random subset of unique items
      $userItems = $items->random(rand(1, min(16, $items->count())));

      $userItems->each(function ($item) use ($user) {
        // Create or update the UserItem relationship
        UserItem::updateOrCreate(
          [
            'user_id' => $user->id,
            'item_id' => $item->id,
          ],
          [
            'quantity' => rand(1, 100), // Random quantity between 1 and 100
          ]
        );
      });
    });
  }
}
