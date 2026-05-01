<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/campaigns', [\App\Http\Controllers\CampaignController::class, 'index'])->middleware(['auth', 'verified'])->name('campaigns');
Route::post('/campaigns/send', [\App\Http\Controllers\CampaignController::class, 'send'])->middleware(['auth', 'verified'])->name('campaigns.send');

Route::get('/clients', [\App\Http\Controllers\PatientController::class, 'index'])->middleware(['auth', 'verified'])->name('clients');
Route::post('/clients', [\App\Http\Controllers\PatientController::class, 'store'])->middleware(['auth', 'verified'])->name('clients.store');
Route::put('/clients/{patient}', [\App\Http\Controllers\PatientController::class, 'update'])->middleware(['auth', 'verified'])->name('clients.update');
Route::delete('/clients/{patient}', [\App\Http\Controllers\PatientController::class, 'destroy'])->middleware(['auth', 'verified'])->name('clients.destroy');

Route::get('/calendar', [\App\Http\Controllers\AppointmentController::class, 'index'])->middleware(['auth', 'verified'])->name('calendar');

Route::get('/templates', [\App\Http\Controllers\TemplateController::class, 'index'])->middleware(['auth', 'verified'])->name('templates');
Route::post('/templates', [\App\Http\Controllers\TemplateController::class, 'store'])->middleware(['auth', 'verified'])->name('templates.store');
Route::patch('/templates/{template}', [\App\Http\Controllers\TemplateController::class, 'update'])->middleware(['auth', 'verified'])->name('templates.update');
Route::delete('/templates/{template}', [\App\Http\Controllers\TemplateController::class, 'destroy'])->middleware(['auth', 'verified'])->name('templates.destroy');

Route::get('/analytics', function () {
    return Inertia::render('Analytics');
})->middleware(['auth', 'verified'])->name('analytics');

Route::get('/reports', function () {
    return Inertia::render('Reports');
})->middleware(['auth', 'verified'])->name('reports');

Route::get('/settings', [\App\Http\Controllers\SettingsController::class, 'index'])->middleware(['auth', 'verified'])->name('settings');
Route::put('/settings/clinic', [\App\Http\Controllers\SettingsController::class, 'updateClinic'])->middleware(['auth', 'verified'])->name('settings.clinic.update');
Route::post('/settings/users', [\App\Http\Controllers\SettingsController::class, 'addUser'])->middleware(['auth', 'verified'])->name('settings.users.store');
Route::delete('/settings/users/{user}', [\App\Http\Controllers\SettingsController::class, 'deleteUser'])->middleware(['auth', 'verified'])->name('settings.users.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
