<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'task' => 'required|string|min:2|max:40',            
        ], [
            'task.required' => 'Please enter your new Task Name',
            'task.min' => 'Task name must be at least 2 characters',
            'task.max' => 'Task name must be less than 40 characters'
        ]);

        $todo = Todo::create([
            'task' => $request->task,
            'todo_list_id' => $request->todo_list_id            
        ]); 

        return response()->json(['addedTodo' => $todo], 200);
    }
    
    public function update(Request $request, Todo $todo ) {   
        
        $validated = $request->validate([
            'task' => 'required|min:2|max:40'           
        ], [
            'task.required' => 'Please enter a new task name',
            'task.min' => 'Task must be at least 2 characters',
            'task.max' => 'Task must be a maximum of 40 characters'
        ]);
       
        $todo->task = $validated['task'];
        $todo->completed = $request['completed'];
        $todo->save();     

        return response()->json([
            'updatedTodo' => $todo,
            'message' => 'Todo updated successfully.'
        ]);
    }
    
    public function destroy(Request $request, Todo $todo) {        
        $todo->delete();
        return response()->json(['message' => 'Todo deleted Successfully' ]);      
    }

    public function toggleCompletion(Request $request, Todo $todo) {                
      
        $todo->completed = $request->input('completed');
        $todo->save();
    
        return response()->json([
            'updatedTodo' => $todo,
            'message' => 'Todo completion status updated successfully.'
        ]);
    }
}
