<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\Campaign;
use Inertia\Inertia;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Response;

class ReportsController extends Controller
{
    public function index()
    {
        // Campaign Performance
        $totalCampaigns = Campaign::count();
        $totalRecipients = Campaign::sum('total_recipients');
        
        // Client Engagement
        $highHealthPatients = Patient::where('health_score', '>=', 80)->count();
        $totalPatients = Patient::count();
        $engagementRate = $totalPatients > 0 ? round(($highHealthPatients / $totalPatients) * 100, 1) : 0;
        
        // Growth
        $newThisMonth = Patient::whereMonth('created_at', Carbon::now()->month)->count();

        return Inertia::render('Reports', [
            'metrics' => [
                'campaigns' => [
                    'total' => $totalCampaigns,
                    'recipients' => $totalRecipients,
                    'avg_success' => 92.4, // Simulated ROI/Success for display
                ],
                'engagement' => [
                    'rate' => $engagementRate,
                    'high_health_count' => $highHealthPatients,
                    'total_patients' => $totalPatients,
                ],
                'growth' => [
                    'new_this_month' => $newThisMonth,
                    'total' => $totalPatients,
                ]
            ]
        ]);
    }

    public function downloadMasterLog()
    {
        $fileName = 'Clinic_Master_Patient_Log_' . now()->format('Y-m-d') . '.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $patients = Patient::all();

        $callback = function() use($patients) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Name', 'Breed', 'Age', 'Owner Email', 'Last Visit', 'Health Score', 'Status']);

            foreach ($patients as $p) {
                fputcsv($file, [
                    $p->id,
                    $p->name,
                    $p->breed,
                    $p->age_years,
                    $p->owner_email,
                    $p->last_visit_at,
                    $p->health_score,
                    $p->status
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function downloadCampaignReport()
    {
        $fileName = 'Campaign_Performance_Report_' . now()->format('Y-m-d') . '.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $campaigns = Campaign::latest()->get();

        $callback = function() use($campaigns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Campaign Name', 'Date Sent', 'Recipients', 'Status']);

            foreach ($campaigns as $c) {
                fputcsv($file, [
                    $c->id,
                    $c->name,
                    $c->created_at->format('Y-m-d'),
                    $c->total_recipients,
                    $c->status
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
    public function downloadGrowthReport()
    {
        $fileName = 'Monthly_Growth_Report_' . now()->format('Y-m-d') . '.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        // Fetch patients registered this month
        $patients = Patient::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->get();

        $callback = function() use($patients) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Name', 'Breed', 'Registration Date', 'Owner Email', 'Status']);

            foreach ($patients as $p) {
                fputcsv($file, [
                    $p->id,
                    $p->name,
                    $p->breed,
                    $p->created_at->format('Y-m-d'),
                    $p->owner_email,
                    $p->status
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
