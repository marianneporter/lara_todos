<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TodoListController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:2|max:30',            
        ], [
            'name.required' => 'Please enter your new List Name',
            'name.min' => 'Todo list name must be at least 2 characters',
            'name.max' => 'Todo list name must be less than 30 characters'
        ]);
     
        $list = TodoList::create([
            'name' => $request->name,
            'user_id' => $request->user()->id            
        ]);

        $list->load('todos');

        return response()->json([          
            'addedTodoList' => $list
        ]);
    }

    public function update(Request $request, TodoList $todoList ) {
   
        $validated = $request->validate([
            'name' => 'required|min:3|max:255'           
        ]);

        $todoList->name = $validated['name'];

        $todoList->save();          
     

        return response()->json([
            'updatedTodoList' => $todoList,
            'message' => 'Todo List updated successfully.'
        ]);
    }
}
