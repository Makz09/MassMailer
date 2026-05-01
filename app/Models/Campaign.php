<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name', 'type', 'status', 'target_audience', 'scheduled_at',
        'sent_at', 'total_recipients', 'opens', 'clicks', 'bookings'
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];
}
