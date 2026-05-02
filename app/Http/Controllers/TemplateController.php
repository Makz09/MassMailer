<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index(Request $request)
    {
        $query = Template::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('subject', 'like', "%{$request->search}%");
            });
        }

        $templates = $query->latest()->paginate(8)->withQueryString();
        $categories = Template::distinct()->pluck('category')->toArray();

        // Fetch dynamic patient columns for placeholders
        $columns = \Illuminate\Support\Facades\Schema::getColumnListing('patients');
        $exclude = ['id', 'created_at', 'updated_at', 'deleted_at'];
        $availableColumns = array_values(array_filter($columns, fn($col) => !in_array($col, $exclude)));

        return Inertia::render('Templates', [
            'templates' => $templates,
            'filters' => $request->only(['category', 'status', 'search']),
            'categories' => $categories,
            'availableColumns' => $availableColumns,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|string', // Basic check, normalized below
            'preview_image' => 'nullable|string',
        ]);

        // Normalize status to Title Case for consistency
        $validated['status'] = ucfirst(strtolower($validated['status']));
        
        // Final check against allowed values
        if (!in_array($validated['status'], ['Live', 'Inactive', 'Draft', 'Upcoming', 'Archived'])) {
            $validated['status'] = 'Live';
        }

        Template::create($validated);

        return back()->with('success', 'Template created successfully!');
    }

    public function update(Request $request, Template $template)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|string',
            'preview_image' => 'nullable|string',
        ]);

        $validated['status'] = ucfirst(strtolower($validated['status']));
        if (!in_array($validated['status'], ['Live', 'Inactive', 'Draft', 'Upcoming', 'Archived'])) {
            $validated['status'] = 'Live';
        }

        $template->update($validated);

        return back()->with('success', 'Template updated successfully!');
    }

    public function destroy(Template $template)
    {
        $template->delete();

        return back()->with('success', 'Template deleted successfully!');
    }
}
