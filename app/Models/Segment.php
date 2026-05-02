<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Segment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'description', 'rules', 'recipient_count'
    ];

    protected $casts = [
        'rules' => 'array',
    ];
}
