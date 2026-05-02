<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Patient;
use App\Models\Template;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function query(Request $request)
    {
        $q = $request->query('q');
        
        if (empty($q) || strlen($q) < 2) {
            return response()->json(['results' => []]);
        }

        $patients = Patient::where('name', 'like', "%{$q}%")
            ->orWhere('owner_name', 'like', "%{$q}%")
            ->limit(5)
            ->get()
            ->map(fn($p) => [
                'type' => 'Patient',
                'icon' => 'pets',
                'title' => $p->name,
                'subtitle' => "Owner: {$p->owner_name}",
                'link' => route('clients'),
                'id' => $p->id
            ]);

        $campaigns = Campaign::where('name', 'like', "%{$q}%")
            ->limit(5)
            ->get()
            ->map(fn($c) => [
                'type' => 'Campaign',
                'icon' => 'rocket_launch',
                'title' => $c->name,
                'subtitle' => "Status: {$c->status}",
                'link' => route('campaigns'),
                'id' => $c->id
            ]);

        $templates = Template::where('name', 'like', "%{$q}%")
            ->limit(5)
            ->get()
            ->map(fn($t) => [
                'type' => 'Template',
                'icon' => 'mail',
                'title' => $t->name,
                'subtitle' => "Category: {$t->category}",
                'link' => route('templates'),
                'id' => $t->id
            ]);

        $results = $patients->concat($campaigns)->concat($templates);

        return response()->json([
            'results' => $results
        ]);
    }
}
