<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('Calendar', [
            'appointments' => \App\Models\Appointment::with('patient')->latest()->get(),
        ]);
    }

    public function destroy(\App\Models\Appointment $appointment)
    {
        $appointment->delete();
        return back()->with('success', 'Appointment cancelled and record archived.');
    }
}
