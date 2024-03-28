<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Tibbles Porter',
            'email' => 'tibbles@test.com',
            'password' => 'Star123456!'           
        ]);

        User::factory()->create([
            'name' => 'Olly Porter',
            'email' => 'olly@test.com',
            'password' => 'Star123456!'           
        ]);

        // other seeders
        $this->call([
            TodoListSeeder::class,
        ]);
    }
}
