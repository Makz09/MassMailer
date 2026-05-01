<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        return Inertia::render('Clients', [
            'patients' => Patient::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'breed' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'owner_email' => 'required|email|max:255',
            'owner_phone' => 'nullable|string|max:20',
            'status' => 'required|string|in:Active,Inactive,Critical',
            'health_score' => 'required|integer|min:0|max:100',
        ]);

        Patient::create($validated);

        return back()->with('success', 'Patient created successfully!');
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'breed' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'owner_email' => 'required|email|max:255',
            'owner_phone' => 'nullable|string|max:20',
            'status' => 'required|string|in:Active,Inactive,Critical',
            'health_score' => 'required|integer|min:0|max:100',
        ]);

        $patient->update($validated);

        return back()->with('success', 'Patient updated successfully!');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();

        return back()->with('success', 'Patient deleted successfully!');
    }
}
