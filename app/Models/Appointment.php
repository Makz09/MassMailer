<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'title', 'type', 'patient_id', 'start_time', 'end_time',
        'description', 'status'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
