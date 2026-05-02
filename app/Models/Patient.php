<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($patient) {
            if (!$patient->date_created) {
                $patient->date_created = now()->toDateString();
            }
        });
    }

    protected $casts = [
        'medical_history' => 'array',
        'first_visit_at' => 'datetime',
        'last_visit_at' => 'datetime',
    ];

    protected $appends = ['owner_name'];

    public function getOwnerNameAttribute()
    {
        return trim("{$this->owner_first_name} {$this->owner_last_name}");
    }
}
