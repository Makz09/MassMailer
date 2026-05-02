<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $now = now();
        $startOfMonth = $now->copy()->startOfMonth();

        // Monthly Success Rate (Avg Open Rate of campaigns this month vs 50% goal)
        $monthlyOpens = \App\Models\Campaign::where('status', 'Completed')
            ->whereBetween('sent_at', [$startOfMonth, $now])
            ->avg('opens') ?: 0;
        
        $monthlyRecipients = \App\Models\Campaign::where('status', 'Completed')
            ->whereBetween('sent_at', [$startOfMonth, $now])
            ->avg('total_recipients') ?: 0;

        $successRate = $monthlyRecipients > 0 ? ($monthlyOpens / $monthlyRecipients) * 100 : 0;

        return \Inertia\Inertia::render('Dashboard', [
            'stats' => [
                'total_clients' => \App\Models\Patient::distinct('owner_email')->count('owner_email'),
                'total_cats' => \App\Models\Patient::count(),
                'campaigns_sent' => \App\Models\Campaign::where('status', 'Completed')->count(),
                'emails_delivered' => \App\Models\Campaign::sum('total_recipients'),
                'monthly_success_rate' => round($successRate, 1),
            ],
            'recent_patients' => \App\Models\Patient::latest()->take(5)->get(),
            'upcoming_campaigns' => \App\Models\Campaign::whereIn('status', ['Scheduled', 'Draft'])
                ->whereNotNull('scheduled_at')
                ->where('scheduled_at', '>=', now())
                ->orderBy('scheduled_at', 'asc')
                ->take(2)
                ->get()
                ->map(function($c) {
                    return [
                        'id' => $c->id,
                        'name' => $c->name,
                        'type' => $c->type,
                        'recipients' => $c->total_recipients,
                        'day' => $c->scheduled_at->format('d'),
                        'month' => strtoupper($c->scheduled_at->format('M')),
                    ];
                }),
        ]);
    }
}
