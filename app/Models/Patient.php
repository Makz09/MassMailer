<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'breed', 'owner_name', 'owner_email', 'owner_phone',
        'medical_history', 'status', 'last_visit_at', 'health_score'
    ];

    protected $casts = [
        'medical_history' => 'array',
        'last_visit_at' => 'datetime',
    ];
}
