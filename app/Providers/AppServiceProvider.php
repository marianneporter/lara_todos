<?php

namespace App\Providers;

use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
       // Listen for login events
       Event::listen(Login::class, function ($event) {
         Log::info("********!!!!!!!!!!User logged in: ", ['user_id' => $event->user->id]);
        });

    // Listen for logout events
        Event::listen(Logout::class, function ($event) {
            Log::info("********!!!!!!!!!!User logged out: ", ['user_id' => $event->user->id]);
       });
    }
}
