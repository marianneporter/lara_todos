<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\TodoList;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TodoListSeeder extends Seeder
{
    private $listNames = ["Holiday", "Studying", "Housework",
                           "Social", "Home Accounts", "Professional",
                           "Exercise", "Christmas"];
    /**
     * Run the database seeder
     */
    public function run(): void
    {
        $users = User::whereIn('id', [1, 2])->get();

        foreach ($users as $user) {
            $listNamesForUser = $this->getRandomListNames();

            // create a todolist for the randomly chosen todolists
            foreach ($listNamesForUser as $listName) {
                $todoList = TodoList::factory()->create([
                    'user_id' => $user->id, //  overrides
                    'name' => $listName,    //  factory defaults
                ]);

                // create the todos for the todo list
                \App\Models\Todo::factory()->count(10)->create([
                    'todo_list_id' => $todoList->id,
                ]);
            }
        }
    }      

    private function getRandomListNames() {
        shuffle($this->listNames);
        return array_slice($this->listNames, 0, 5);
    }
}