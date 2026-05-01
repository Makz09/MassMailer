<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('Campaigns', [
            'campaigns' => \App\Models\Campaign::latest()->get(),
            'templates' => \App\Models\Template::where('status', 'Live')->get(),
        ]);
    }

    public function send(Request $request)
    {
        $request->validate([
            'template_id' => 'required|exists:templates,id',
            'campaign_name' => 'required|string',
            'filters' => 'nullable|array',
        ]);

        $template = \App\Models\Template::findOrFail($request->template_id);
        
        $query = \App\Models\Patient::query();
        
        if ($request->has('filters')) {
            foreach ($request->filters as $filter) {
                // Map frontend labels to database columns
                $fieldMap = [
                    'Status' => 'status',
                    'Breed' => 'breed',
                    'Name' => 'name',
                    'Health Score' => 'health_score',
                    'Last Visit' => 'last_visit',
                ];
                
                $field = $fieldMap[$filter['field']] ?? strtolower(str_replace(' ', '_', $filter['field']));
                $op = $filter['op'];
                $val = $filter['val'];
                
                switch ($op) {
                    case 'is':
                        $query->where($field, $val);
                        break;
                    case 'is not':
                        $query->where($field, '!=', $val);
                        break;
                    case 'contains':
                        $query->where($field, 'LIKE', "%$val%");
                        break;
                    case 'is before':
                        $query->where($field, '<', $val);
                        break;
                    case 'is after':
                        $query->where($field, '>', $val);
                        break;
                    case 'greater than':
                        $query->where($field, '>', $val);
                        break;
                    case 'less than':
                        $query->where($field, '<', $val);
                        break;
                }
            }
        }

        $patients = $query->get();

        if ($patients->isEmpty()) {
            return back()->withErrors(['filters' => 'No patients match these criteria.']);
        }

        $campaign = \App\Models\Campaign::create([
            'name' => $request->campaign_name,
            'type' => 'Email',
            'status' => 'Sending',
            'total_recipients' => $patients->count(),
            'scheduled_at' => now(),
        ]);

        foreach ($patients as $patient) {
            \Illuminate\Support\Facades\Mail::to($patient->owner_email)
                ->send(new \App\Mail\CampaignMail($template, $patient));
        }

        $campaign->update([
            'status' => 'Completed',
            'sent_at' => now(),
            'opens' => 0, // Reset for new campaign
            'clicks' => 0,
        ]);

        return back()->with('success', "Campaign '{$campaign->name}' sent to {$patients->count()} recipients!");
    }

    public function destroy(\App\Models\Campaign $campaign)
    {
        $campaign->delete();
        return back()->with('success', 'Campaign record deleted successfully!');
    }
}
