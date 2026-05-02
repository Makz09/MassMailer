<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Patient;
use App\Models\Template;
use App\Models\Segment;
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Inertia\Inertia;

class CampaignController extends Controller
{
    public function index()
    {
        return Inertia::render('Campaigns', [
            'campaigns' => Campaign::latest()->get(),
            'templates' => Template::where('status', 'Live')->get(),
            'segments' => Segment::latest()->get(),
        ]);
    }

    protected function applyFilters($query, $groups)
    {
        if (empty($groups)) return $query;

        $query->where(function ($q) use ($groups) {
            foreach ($groups as $groupIndex => $group) {
                // Groups are separated by OR
                $q->orWhere(function ($subQ) use ($group) {
                    foreach ($group['rules'] as $rule) {
                        // Rules within a group are separated by AND
                        $fieldMap = [
                            'Status' => 'status',
                            'Breed' => 'breed',
                            'Cat Name' => 'name',
                            'First Name' => 'owner_first_name',
                            'Last Name' => 'owner_last_name',
                            'Email' => 'owner_email',
                            'Phone' => 'owner_phone',
                            'Assigned Veterinarian' => 'assigned_veterinarian',
                            'Branch' => 'branch',
                            'Health Score' => 'health_score',
                            'First Visit' => 'first_visit_at',
                            'Last Visit' => 'last_visit_at',
                            'Medical History' => 'medical_history',
                        ];

                        $field = $fieldMap[$rule['field']] ?? strtolower(str_replace(' ', '_', $rule['field']));
                        $op = $rule['op'];
                        $val = $rule['val'];

                        $this->applyRule($subQ, $field, $op, $val);
                    }
                });
            }
        });

        return $query;
    }

    protected function applyRule($query, $field, $op, $val)
    {
        // Date Presets Mapping
        if ($op === 'preset') {
            $this->applyDatePreset($query, $field, $val);
            return;
        }

        switch ($op) {
            case 'is':
            case 'is exactly':
            case 'eq':
                $query->where($field, $val);
                break;
            case 'is not':
            case 'not_eq':
                $query->where($field, '!=', $val);
                break;
            case 'today':
                $query->whereDate($field, now()->toDateString());
                break;
            case 'contains':
            case 'includes any of':
                $query->where($field, 'LIKE', "%$val%");
                break;
            case 'does_not_contain':
                $query->where($field, 'NOT LIKE', "%$val%");
                break;
            case 'starts_with':
                $query->where($field, 'LIKE', "$val%");
                break;
            case 'ends_with':
                $query->where($field, 'LIKE', "%$val");
                break;
            case 'is before':
            case 'before':
            case 'less_than':
                $query->where($field, '<', $val);
                break;
            case 'is after':
            case 'after':
            case 'more_than':
            case 'greater than':
                $query->where($field, '>', $val);
                break;
            case 'between':
                $vals = explode(',', $val);
                if (count($vals) === 2) {
                    $query->whereBetween($field, [$vals[0], $vals[1]]);
                }
                break;
            case 'known':
                $query->whereNotNull($field);
                break;
            case 'unknown':
                $query->whereNull($field);
                break;
            case 'is_any_of':
                $vals = is_array($val) ? $val : explode(',', $val);
                $query->whereIn($field, array_map('trim', $vals));
                break;
            case 'is_none_of':
                $vals = is_array($val) ? $val : explode(',', $val);
                $query->whereNotIn($field, array_map('trim', $vals));
                break;
        }
    }

    protected function applyDatePreset($query, $field, $preset)
    {
        $now = now();

        switch ($preset) {
            case 'today':
                $query->whereDate($field, $now->toDateString());
                break;
            case 'yesterday':
                $query->whereDate($field, $now->subDay()->toDateString());
                break;
            case 'tomorrow':
                $query->whereDate($field, $now->addDay()->toDateString());
                break;
            
            case 'this_week':
                $query->whereBetween($field, [$now->startOfWeek()->toDateString(), $now->endOfWeek()->toDateString()]);
                break;
            case 'this_week_so_far':
                $query->whereBetween($field, [$now->startOfWeek()->toDateString(), now()->toDateString()]);
                break;
            case 'last_week':
                $query->whereBetween($field, [now()->subWeek()->startOfWeek()->toDateString(), now()->subWeek()->endOfWeek()->toDateString()]);
                break;
            case 'next_week':
                $query->whereBetween($field, [now()->addWeek()->startOfWeek()->toDateString(), now()->addWeek()->endOfWeek()->toDateString()]);
                break;

            case 'this_month':
                $query->whereBetween($field, [$now->startOfMonth()->toDateString(), $now->endOfMonth()->toDateString()]);
                break;
            case 'this_month_so_far':
                $query->whereBetween($field, [$now->startOfMonth()->toDateString(), now()->toDateString()]);
                break;
            case 'last_month':
                $query->whereBetween($field, [now()->subMonth()->startOfMonth()->toDateString(), now()->subMonth()->endOfMonth()->toDateString()]);
                break;
            case 'next_month':
                $query->whereBetween($field, [now()->addMonth()->startOfMonth()->toDateString(), now()->addMonth()->endOfMonth()->toDateString()]);
                break;

            case 'this_quarter':
                $query->whereBetween($field, [$now->startOfQuarter()->toDateString(), $now->endOfQuarter()->toDateString()]);
                break;
            case 'this_quarter_so_far':
                $query->whereBetween($field, [$now->startOfQuarter()->toDateString(), now()->toDateString()]);
                break;
            case 'last_quarter':
                $query->whereBetween($field, [now()->subQuarter()->startOfQuarter()->toDateString(), now()->subQuarter()->endOfQuarter()->toDateString()]);
                break;
            case 'next_quarter':
                $query->whereBetween($field, [now()->addQuarter()->startOfQuarter()->toDateString(), now()->addQuarter()->endOfQuarter()->toDateString()]);
                break;

            case 'this_year':
                $query->whereBetween($field, [$now->startOfYear()->toDateString(), $now->endOfYear()->toDateString()]);
                break;
            case 'this_year_so_far':
                $query->whereBetween($field, [$now->startOfYear()->toDateString(), now()->toDateString()]);
                break;
            case 'last_year':
                $query->whereBetween($field, [now()->subYear()->startOfYear()->toDateString(), now()->subYear()->endOfYear()->toDateString()]);
                break;
            case 'next_year':
                $query->whereBetween($field, [now()->addYear()->startOfYear()->toDateString(), now()->addYear()->endOfYear()->toDateString()]);
                break;

            case 'last_7_days':
                $query->whereBetween($field, [now()->subDays(7)->toDateString(), now()->toDateString()]);
                break;
            case 'last_14_days':
                $query->whereBetween($field, [now()->subDays(14)->toDateString(), now()->toDateString()]);
                break;
            case 'last_30_days':
                $query->whereBetween($field, [now()->subDays(30)->toDateString(), now()->toDateString()]);
                break;
            case 'last_60_days':
                $query->whereBetween($field, [now()->subDays(60)->toDateString(), now()->toDateString()]);
                break;
            case 'last_90_days':
                $query->whereBetween($field, [now()->subDays(90)->toDateString(), now()->toDateString()]);
                break;
            case 'last_180_days':
                $query->whereBetween($field, [now()->subDays(180)->toDateString(), now()->toDateString()]);
                break;
            case 'last_360_days':
                $query->whereBetween($field, [now()->subDays(360)->toDateString(), now()->toDateString()]);
                break;
        }
    }

    public function preview(Request $request)
    {
        $query = Patient::query();
        $this->applyFilters($query, $request->groups);
        
        $total = $query->count();
        $patients = (clone $query)->limit(10)->get();

        // Calculate Breakdown Stats
        $stats = [
            'total_database' => Patient::count(),
            'branches' => (clone $query)->select('branch', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
                ->groupBy('branch')
                ->get(),
            'status' => (clone $query)->select('status', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
                ->groupBy('status')
                ->get(),
            'due_vaccination' => (clone $query)->where('last_vaccination_at', '<', now()->subYear())->count(),
        ];

        return response()->json([
            'patients' => $patients,
            'total' => $total,
            'stats' => $stats
        ]);
    }

    public function send(Request $request)
    {
        $request->validate([
            'template_id' => 'required|exists:templates,id',
            'campaign_name' => 'required|string',
            'segment_id' => 'required|exists:segments,id',
        ]);

        $segment = Segment::findOrFail($request->segment_id);
        $template = Template::findOrFail($request->template_id);
        
        $query = Patient::query();
        $this->applyFilters($query, $segment->rules);
        $patients = $query->get();

        if ($patients->isEmpty()) {
            return back()->withErrors(['segment_id' => 'No recipients match the selected segment filters.']);
        }

        $campaign = Campaign::create([
            'name' => $request->campaign_name,
            'type' => 'Email (Queued SMTP)',
            'status' => 'Processing',
            'total_recipients' => $patients->count(),
            'scheduled_at' => now(),
        ]);

        foreach ($patients as $patient) {
            \App\Jobs\SendCampaignEmail::dispatch($patient, $template);
        }

        $campaign->update([
            'status' => 'Completed', // Status means jobs are dispatched
            'sent_at' => now(),
        ]);

        return back()->with('success', "Campaign '{$campaign->name}' launched! {$patients->count()} emails are being processed in the background.");
    }

    public function destroy(Campaign $campaign)
    {
        $campaign->delete();
        return back()->with('success', 'Campaign record deleted successfully!');
    }
}
