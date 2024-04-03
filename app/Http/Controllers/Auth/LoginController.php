<?php

namespace App\Http\Controllers\Auth;

use Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function create() {
        return Inertia::render('Auth/Login');
    }

    public function authenticate(Request $request)
    {
        
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
  
 
        if (Auth::attempt($credentials)) {
     
           
            $request->session()->regenerate(); 
       
            Log::info('************************User ID after login attempt: ' . auth()->id());    
            Log::info('*************************Is authenticated: ' . Auth::check());    
         //   return redirect()->intended('dashboard');

          return redirect('/');

        }
       
        Log::info('*************************login failed '); 
        return back()->with('message', 'The provided credentials do not match our records.')
                     ->onlyInput('email');      
    }

    
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }
}
