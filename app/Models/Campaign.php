<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'template_id',
        'segment_id',
        'user_id',
        'type',
        'status',
        'target_audience',
        'scheduled_at',
        'sent_at',
        'total_recipients',
        'opens',
        'clicks',
        'bookings'
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    public function segment()
    {
        return $this->belongsTo(Segment::class);
    }

    public function staff()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
