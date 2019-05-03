<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    // Attribute Casting
    protected $casts = [
        'choices' => 'array', 
        'id' => 'string'      
    ];
}
