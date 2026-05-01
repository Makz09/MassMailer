<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicSetting extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'address', 'logo_path',
        'sender_name', 'reply_to_email', 'preferences'
    ];

    protected $casts = [
        'preferences' => 'array',
    ];
}
