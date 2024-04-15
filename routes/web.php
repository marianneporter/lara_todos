<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\TodoListController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', [DashboardController::class, 'index'])
        ->name('dashboard')
        ->middleware('auth');

// Routes for TodoListController
Route::post('/todo-lists', [TodoListController::class, 'store'])
             ->name('todo-lists.store');
Route::patch('/todo-lists/{todoList}', [TodoListController::class, 'update'])
             ->name('todo-lists.update');
Route::delete('/todo-lists/{todoList}', [TodoListController::class, 'destroy'])
             ->name('todo-lists.delete');  
  
// Routes for Todos Controller             
Route::patch('/todos/{todo}', [TodoController::class, 'update'])
            ->name('todos.update');

// Auth Routes
Route::get('login', [LoginController::class, 'create'])->name('login');
Route::post('login', [LoginController::class, 'authenticate'])->name('authenticate');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


