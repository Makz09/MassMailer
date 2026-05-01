<?php

namespace App\Http\Controllers;

use App\Models\ClinicSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings', [
            'clinic' => ClinicSetting::first(),
            'users' => User::latest()->get(),
        ]);
    }

    public function updateClinic(Request $request)
    {
        $clinic = ClinicSetting::first();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'nullable|string',
            'sender_name' => 'required|string|max:255',
            'reply_to_email' => 'required|email|max:255',
        ]);

        $clinic->update($validated);

        return back()->with('success', 'Clinic profile updated successfully!');
    }

    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => \Hash::make($validated['password']),
        ]);

        return back()->with('success', 'User added to team successfully!');
    }

    public function deleteUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['user' => 'You cannot delete your own account.']);
        }
        
        $user->delete();
        return back()->with('success', 'User removed from team.');
    }
}
