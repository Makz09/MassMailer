<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        return Inertia::render('Templates', [
            'templates' => Template::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|string|in:Live,Draft,Archived',
            'preview_image' => 'nullable|string',
        ]);

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
            'status' => 'required|string|in:Live,Draft,Archived',
            'preview_image' => 'nullable|string',
        ]);

        $template->update($validated);

        return back()->with('success', 'Template updated successfully!');
    }

    public function destroy(Template $template)
    {
        $template->delete();

        return back()->with('success', 'Template deleted successfully!');
    }
}
