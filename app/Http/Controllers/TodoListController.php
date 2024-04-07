<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
     
        $list = TodoList::create([
            'name' => $request->name,
            'user_id' => $request->user()->id            
        ]);

        $list->load('todos');

        return response()->json([
            'message' => 'List successfully added!',
            'addedTodoList' => $list,
        ]);
    }
}
