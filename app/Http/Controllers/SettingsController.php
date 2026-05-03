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
        $onlineThreshold = now()->subMinutes(5);
        $users = User::latest()->get();
        
        $onlineUsers = $users->filter(function($user) use ($onlineThreshold) {
            return $user->last_active_at && $user->last_active_at >= $onlineThreshold;
        });

        return Inertia::render('Settings', [
            'clinic' => ClinicSetting::first(),
            'users' => $users,
            'branches' => User::whereNotNull('branch')->distinct()->pluck('branch'),
            'online_stats' => [
                'count' => $onlineUsers->count(),
                'list' => $onlineUsers->values(), // Reset keys for JSON
            ]
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
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = 'clinic_logo_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $validated['logo_path'] = '/images/' . $filename;
        }

        unset($validated['logo']);
        $clinic->update($validated);

        return back()->with('success', 'Clinic profile updated successfully!');
    }

    public function addUser(Request $request)
    {
        if (auth()->user()->role !== User::ROLE_SUPER_ADMIN) {
            return back()->withErrors(['role' => 'Only Super Admins can add new users.']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => \Hash::make($validated['password']),
            'role' => $validated['role'],
            'branch' => $validated['branch'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
        ]);

        return back()->with('success', 'User added to team successfully!');
    }

    public function updateUser(Request $request, User $user)
    {
        if (auth()->user()->role !== User::ROLE_SUPER_ADMIN) {
            return back()->withErrors(['role' => 'Only Super Admins can modify users.']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'password' => 'nullable|string|min:8',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = \Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return back()->with('success', "User '{$user->name}' updated successfully!");
    }

    public function deleteUser(User $user)
    {
        if (auth()->user()->role !== User::ROLE_SUPER_ADMIN) {
            return back()->withErrors(['role' => 'Only Super Admins can delete users.']);
        }

        if ($user->id === auth()->id()) {
            return back()->withErrors(['user' => 'You cannot delete your own account.']);
        }
        
        $user->delete();
        return back()->with('success', 'User removed from team.');
    }
}
