<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fruit extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields
    protected $fillable = ['name', 'price', 'quantity'];
}
