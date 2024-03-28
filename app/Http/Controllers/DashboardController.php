<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {      
        return inertia('Dashboard', [
            'message' => 'Hello to the dashboard page from laravel'
        ]);
    }
}
