<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Patient;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $range = $request->query('range', 'Last 30 Days');
        $dateFilter = null;

        switch ($range) {
            case 'Last 7 Days':
                $dateFilter = now()->subDays(7);
                break;
            case 'Last 90 Days':
                $dateFilter = now()->subDays(90);
                break;
            case 'This Year':
                $dateFilter = now()->startOfYear();
                break;
            case 'All Time':
                $dateFilter = null;
                break;
            default: // Last 30 Days
                $dateFilter = now()->subDays(30);
                break;
        }

        $totalRecipients = Campaign::when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))->sum('total_recipients');
        $totalOpens = Campaign::when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))->sum('opens');
        $totalBookings = Campaign::when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))->sum('bookings');

        // Calculate Busiest Day
        $busiestDayData = Appointment::select(DB::raw('DATE(start_time) as date'), DB::raw('count(*) as count'))
            ->when($dateFilter, fn($q) => $q->where('start_time', '>=', $dateFilter))
            ->groupBy('date')
            ->orderBy('count', 'desc')
            ->first();
        
        $busiestDay = $busiestDayData ? \Carbon\Carbon::parse($busiestDayData->date)->format('M d, Y') : 'None';
        $busiestDayCount = $busiestDayData ? $busiestDayData->count : 0;
        
        // Top Type for Busiest Day
        $busiestDayType = 'None';
        if ($busiestDayData) {
            $topType = Appointment::whereDate('start_time', $busiestDayData->date)
                ->select('type', DB::raw('count(*) as count'))
                ->groupBy('type')
                ->orderBy('count', 'desc')
                ->first();
            $busiestDayType = $topType ? $topType->type : 'General';
        }

        // Calculate Busiest Month
        $busiestMonthData = Appointment::select(DB::raw('MONTH(start_time) as month'), DB::raw('YEAR(start_time) as year'), DB::raw('count(*) as count'))
            ->when($dateFilter, fn($q) => $q->where('start_time', '>=', $dateFilter))
            ->groupBy('month', 'year')
            ->orderBy('count', 'desc')
            ->first();
        
        $busiestMonth = $busiestMonthData ? \Carbon\Carbon::create($busiestMonthData->year, $busiestMonthData->month)->format('F Y') : 'None';
        $busiestMonthCount = $busiestMonthData ? $busiestMonthData->count : 0;

        // Top Email Template
        $topTemplateData = Campaign::join('templates', 'campaigns.template_id', '=', 'templates.id')
            ->when($dateFilter, fn($q) => $q->where('campaigns.created_at', '>=', $dateFilter))
            ->select('templates.name', DB::raw('count(*) as count'))
            ->groupBy('templates.id', 'templates.name')
            ->orderBy('count', 'desc')
            ->first();
        
        $topTemplate = $topTemplateData ? $topTemplateData->name : 'None';
        $topTemplateCount = $topTemplateData ? $topTemplateData->count : 0;

        // Top Segment
        $topSegmentData = Campaign::join('segments', 'campaigns.segment_id', '=', 'segments.id')
            ->whereNull('segments.deleted_at')
            ->when($dateFilter, fn($q) => $q->where('campaigns.created_at', '>=', $dateFilter))
            ->select('segments.name', DB::raw('count(*) as count'))
            ->groupBy('segments.id', 'segments.name')
            ->orderBy('count', 'desc')
            ->first();
        
        $topSegment = $topSegmentData ? $topSegmentData->name : 'General Audience';
        $topSegmentCount = $topSegmentData ? $topSegmentData->count : 0;

        // System Metrics
        $totalClients = Patient::when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))
            ->select(DB::raw("CONCAT(owner_first_name, ' ', owner_last_name)"))->distinct()->count();
        $totalCats = Patient::when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))->count();
        $totalCampaignsCount = Campaign::when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))->count();

        $systemMetrics = [
            ['label' => 'Clients', 'value' => $totalClients],
            ['label' => 'Cats', 'value' => $totalCats],
            ['label' => 'Campaigns', 'value' => $totalCampaignsCount],
            ['label' => 'Emails', 'value' => $totalRecipients],
        ];

        // Audience Segmentation by Breed
        $segmentation = Patient::select('breed', DB::raw('count(*) as total'))
            ->when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))
            ->groupBy('breed')
            ->orderBy('total', 'desc')
            ->get()
            ->map(function ($item) use ($totalCats) {
                return [
                    'label' => $item->breed ?? 'Unknown',
                    'value' => number_format($item->total),
                    'percent' => $totalCats > 0 ? round(($item->total / $totalCats) * 100) : 0,
                ];
            });

        $topBreed = $segmentation->first();
        $insight = $topBreed ? "\"{$topBreed['label']}\" are your most frequent patients, making up {$topBreed['percent']}% of your clinic population." : "No patient data available for dynamic insights.";

        // Recent Campaign Stats
        $recentCampaigns = Campaign::with(['template', 'segment', 'staff'])
            ->when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))
            ->latest()
            ->paginate(5)
            ->through(function ($campaign) {
                return [
                    'name' => $campaign->name,
                    'template' => $campaign->template?->name ?? 'Custom Template',
                    'segment' => $campaign->segment?->name ?? 'General Audience',
                    'staff' => [
                        'name' => $campaign->staff?->name ?? 'System',
                        'role' => $campaign->staff?->role ?? 'Staff'
                    ],
                    'recipients' => number_format($campaign->total_recipients),
                    'status' => $campaign->status,
                    'date_sent' => $campaign->sent_at ? $campaign->sent_at->format('M d, Y g:i A') : ($campaign->scheduled_at ? $campaign->scheduled_at->format('M d, Y g:i A') : 'Draft'),
                    'isOngoing' => in_array($campaign->status, ['Sending', 'Ongoing', 'Processing']),
                ];
            });

        // Branch Distribution (Clients & Cats)
        $branchDistribution = Patient::select('branch', DB::raw("COUNT(*) as cat_count"), DB::raw("COUNT(DISTINCT CONCAT(owner_first_name, ' ', owner_last_name)) as client_count"))
            ->when($dateFilter, fn($q) => $q->where('created_at', '>=', $dateFilter))
            ->whereNotNull('branch')
            ->groupBy('branch')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->branch,
                    'cats' => $item->cat_count,
                    'clients' => $item->client_count,
                ];
            });

        return Inertia::render('Analytics', [
            'metrics' => [
                'busiestDay' => $busiestDay,
                'busiestDayCount' => $busiestDayCount,
                'busiestDayType' => $busiestDayType,
                'busiestMonth' => $busiestMonth,
                'busiestMonthCount' => $busiestMonthCount,
                'topTemplate' => $topTemplate,
                'topTemplateCount' => $topTemplateCount,
                'topSegment' => $topSegment,
                'topSegmentCount' => $topSegmentCount,
            ],
            'systemMetrics' => $systemMetrics,
            'branchDistribution' => $branchDistribution,
            'segmentation' => $segmentation,
            'recentCampaigns' => $recentCampaigns,
            'insight' => $insight,
            'totalCats' => $totalCats,
            'currentRange' => $range,
        ]);
    }
}
