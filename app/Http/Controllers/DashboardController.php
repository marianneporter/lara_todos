<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {           
       
        $user = auth()->user();
        $todoLists = $user->todo_lists()->with('todos')->get();
        
        return inertia('Dashboard', [
            'message' => 'Hello to the dashboard page from laravel',
            'todoLists' => $todoLists
        ]);
    }
}
