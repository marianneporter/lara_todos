<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\TodoList;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TodoListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::whereIn('id', [1, 2])->get();

        foreach ($users as $user) {        
       
           $todoLists = TodoList::factory()->count(5)->create([
            'user_id' => $user->id,
           ]);
                   
            foreach ($todoLists as $todoList) {
                \App\Models\Todo::factory()->count(10)->create([
                    'todo_list_id' => $todoList->id, 
                ]);
            }
        }   
    }
}