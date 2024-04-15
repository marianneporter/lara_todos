<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    
    public function update(Request $request, Todo $todo ) {   
      
        $validated = $request->validate([
            'task' => 'required|min:2|max:30'           
        ], [
            'task.required' => 'Please enter a new task name',
            'task.min' => 'Task must be at least 2 characters',
            'task.max' => 'Task must be a maximum of 30 characters'
        ]);

        $todo->task = $validated['task'];

        $todo->save();     

        return response()->json([
            'updatedTodo' => $todo,
            'message' => 'Todo updated successfully.'
        ]);
    }
}
