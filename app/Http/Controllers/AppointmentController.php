<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        $now = \Carbon\Carbon::now();
        
        return \Inertia\Inertia::render('Calendar', [
            'appointments' => \App\Models\Appointment::with('patient')->latest()->get(),
            'patients' => \App\Models\Patient::select('id', 'name', 'owner_first_name', 'owner_last_name')->get(),
            'appointmentTypes' => \App\Models\Appointment::distinct()->pluck('type'),
            'monthAppointments' => \App\Models\Appointment::whereMonth('start_time', $now->month)->whereYear('start_time', $now->year)->count(),
            'totalCampaigns' => \App\Models\Campaign::count(),
            'totalPatients' => \App\Models\Patient::count(),
            'todayAppointments' => \App\Models\Appointment::whereDate('start_time', $now->toDateString())->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'patient_id' => 'required|exists:patients,id',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after:start_time',
            'description' => 'nullable|string',
        ]);

        \App\Models\Appointment::create($validated);

        return back()->with('success', 'Appointment scheduled successfully.');
    }

    public function destroy(\App\Models\Appointment $appointment)
    {
        $appointment->delete();
        return back()->with('success', 'Appointment cancelled and record archived.');
    }
}
