<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        $totalRecipients = Campaign::sum('total_recipients');
        $totalOpens = Campaign::sum('opens');
        $totalClicks = Campaign::sum('clicks');
        $totalBookings = Campaign::sum('bookings');

        $avgOpenRate = $totalRecipients > 0 ? ($totalOpens / $totalRecipients) * 100 : 0;
        $avgClickRate = $totalRecipients > 0 ? ($totalClicks / $totalRecipients) * 100 : 0;

        // Engagement Trends (Last 7 Campaigns)
        $engagementTrends = Campaign::whereNotNull('sent_at')
            ->latest('sent_at')
            ->limit(7)
            ->get(['name', 'sent_at', 'opens', 'clicks', 'total_recipients'])
            ->map(function($campaign) {
                return [
                    'date' => $campaign->sent_at ? $campaign->sent_at->format('M d') : 'N/A',
                    'open_rate' => $campaign->total_recipients > 0 ? round(($campaign->opens / $campaign->total_recipients) * 100, 1) : 0,
                    'click_rate' => $campaign->total_recipients > 0 ? round(($campaign->clicks / $campaign->total_recipients) * 100, 1) : 0,
                ];
            })
            ->reverse()
            ->values();

        // Audience Segmentation by Breed
        $totalPatients = Patient::count();
        $segmentation = Patient::select('breed', DB::raw('count(*) as total'))
            ->groupBy('breed')
            ->orderBy('total', 'desc')
            ->limit(4)
            ->get()
            ->map(function($item) use ($totalPatients) {
                return [
                    'label' => $item->breed ?? 'Unknown',
                    'value' => number_format($item->total),
                    'percent' => $totalPatients > 0 ? round(($item->total / $totalPatients) * 100, 1) : 0,
                ];
            });

        // Recent Campaign Stats
        $recentCampaigns = Campaign::latest()
            ->limit(5)
            ->get()
            ->map(function($campaign) {
                return [
                    'name' => $campaign->name,
                    'target' => $campaign->target_audience ?? 'General Audience',
                    'status' => $campaign->status,
                    'date' => $campaign->sent_at ? $campaign->sent_at->format('M d, Y') : ($campaign->scheduled_at ? $campaign->scheduled_at->format('M d, Y') : 'Draft'),
                    'opens' => $campaign->total_recipients > 0 ? round(($campaign->opens / $campaign->total_recipients) * 100, 1) . '%' : '0%',
                    'clicks' => $campaign->total_recipients > 0 ? round(($campaign->clicks / $campaign->total_recipients) * 100, 1) . '%' : '0%',
                    'bookings' => $campaign->bookings,
                    'isOngoing' => in_array($campaign->status, ['Sending', 'Ongoing']),
                ];
            });

        return Inertia::render('Analytics', [
            'metrics' => [
                'avgOpenRate' => round($avgOpenRate, 1),
                'avgClickRate' => round($avgClickRate, 1),
                'totalBookings' => $totalBookings,
                'totalPatients' => number_format($totalPatients),
            ],
            'engagementTrends' => $engagementTrends,
            'segmentation' => $segmentation,
            'recentCampaigns' => $recentCampaigns,
        ]);
    }
}
