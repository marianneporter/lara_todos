<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TodoList extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    } 
        
    public function todos(): HasMany
    {
        return $this->hasMany(\App\Models\Todo::class);
    }
}