<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $now = now();
        $startOfMonth = $now->copy()->startOfMonth();

        // 1. Calculate Monthly Reach (Emails Sent This Month / Total Patients)
        $totalPatients = \App\Models\Patient::count();
        $monthlyRecipients = \App\Models\Campaign::where('status', 'Completed')
            ->whereBetween('sent_at', [$startOfMonth, $now])
            ->sum('total_recipients') ?: 0;

        $successRate = $totalPatients > 0 ? ($monthlyRecipients / $totalPatients) * 100 : 0;

        // 2. Health Metrics
        $vaccinatedCount = \App\Models\Patient::whereNotNull('last_vaccination_at')->count();
        $vaccinationCoverage = $totalPatients > 0 ? ($vaccinatedCount / $totalPatients) * 100 : 0;

        $seniorCount = \App\Models\Patient::where('age_years', '>=', 10)->count();
        $seniorCheckedCount = \App\Models\Patient::where('age_years', '>=', 10)
            ->where('last_visit_at', '>=', now()->subMonths(6))
            ->count();
        $seniorWellnessChecks = $seniorCount > 0 ? ($seniorCheckedCount / $seniorCount) * 100 : 0;

        $newRegistrations = \App\Models\Patient::where('created_at', '>=', now()->startOfWeek())->count();

        // 3. Combine Upcoming Campaigns and Appointments
        $upcomingCampaigns = \App\Models\Campaign::whereIn('status', ['Scheduled', 'Draft'])
            ->whereNotNull('scheduled_at')
            ->where('scheduled_at', '>=', $now)
            ->orderBy('scheduled_at', 'asc')
            ->take(3)
            ->get()
            ->map(function($c) {
                return [
                    'id' => 'camp-' . $c->id,
                    'name' => $c->name,
                    'type' => 'Campaign',
                    'desc' => $c->type . " • " . ($c->total_recipients ?: 0) . " rec.",
                    'day' => $c->scheduled_at->format('d'),
                    'month' => strtoupper($c->scheduled_at->format('M')),
                    'date' => $c->scheduled_at,
                ];
            });

        // 3. Fetch Upcoming Appointments
        $upcomingAppointments = \App\Models\Appointment::with('patient')
            ->where('start_time', '>=', $now)
            ->orderBy('start_time', 'asc')
            ->take(3)
            ->get()
            ->map(function($a) {
                return [
                    'id' => 'apt-' . $a->id,
                    'name' => $a->title,
                    'type' => 'Appointment',
                    'desc' => "{$a->type} • " . ($a->patient->name ?? 'Guest'),
                    'day' => $a->start_time->format('d'),
                    'month' => strtoupper($a->start_time->format('M')),
                    'date' => $a->start_time,
                ];
            });

        // 4. Merge and Sort by Date
        $combinedSchedule = $upcomingCampaigns->concat($upcomingAppointments)
            ->sortBy('date')
            ->take(4)
            ->values();

        return \Inertia\Inertia::render('Dashboard', [
            'stats' => [
                'total_clients' => \App\Models\Patient::distinct('owner_email')->count('owner_email'),
                'total_cats' => $totalPatients,
                'campaigns_sent' => \App\Models\Campaign::where('status', 'Completed')->count(),
                'emails_delivered' => \App\Models\Campaign::sum('total_recipients'),
                'monthly_success_rate' => round($successRate, 1),
                'vaccination_coverage' => round($vaccinationCoverage, 1),
                'senior_wellness_checks' => round($seniorWellnessChecks, 1),  
                'new_registrations' => $newRegistrations,
            ],
            'recent_patients' => \App\Models\Patient::latest()->take(5)->get(),
            'upcoming_campaigns' => $combinedSchedule,
        ]);
    }

    public function generateAudit()
    {
        $fileName = 'Diabetic_Patient_Audit_' . now()->format('Y-m-d_His') . '.csv';
        
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $patients = \App\Models\Patient::whereJsonContains('medical_history', 'Diabetes')
            ->orWhereJsonContains('medical_history', 'Diabetic')
            ->orWhere('medical_history', 'LIKE', '%Diabetes%')
            ->orWhere('medical_history', 'LIKE', '%Diabetic%')
            ->get();

        $callback = function() use($patients) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Name', 'Breed', 'Age', 'Weight (kg)', 'Owner Email', 'Assigned Vet', 'Last Visit', 'Medical History']);

            foreach ($patients as $p) {
                fputcsv($file, [
                    $p->id,
                    $p->name,
                    $p->breed,
                    $p->age_years,
                    $p->weight_kg,
                    $p->owner_email,
                    $p->assigned_veterinarian,
                    $p->last_visit_at ? (\Illuminate\Support\Carbon::parse($p->last_visit_at)->format('Y-m-d')) : 'N/A',
                    is_array($p->medical_history) ? implode(', ', $p->medical_history) : $p->medical_history
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
