<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('Dashboard', [
            'stats' => [
                'total_patients' => \App\Models\Patient::count(),
                'active_campaigns' => \App\Models\Campaign::where('status', 'Sent')->count(),
                'avg_open_rate' => \App\Models\Campaign::avg('opens') ?: 0,
                'conversion' => \App\Models\Campaign::avg('bookings') ?: 0,
            ],
            'recent_patients' => \App\Models\Patient::latest()->take(5)->get(),
        ]);
    }
}
