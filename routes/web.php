<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PatientController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/search', [\App\Http\Controllers\SearchController::class, 'query'])->middleware(['auth', 'verified'])->name('search');

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard/audit', [\App\Http\Controllers\DashboardController::class, 'generateAudit'])->middleware(['auth', 'verified'])->name('dashboard.audit');

Route::get('/campaigns', [\App\Http\Controllers\CampaignController::class, 'index'])->middleware(['auth', 'verified'])->name('campaigns');
Route::post('/campaigns/preview', [\App\Http\Controllers\CampaignController::class, 'preview'])->middleware(['auth', 'verified'])->name('campaigns.preview');
Route::post('/campaigns/send', [\App\Http\Controllers\CampaignController::class, 'send'])->middleware(['auth', 'verified'])->name('campaigns.send');

Route::get('/segments/values', [\App\Http\Controllers\SegmentController::class, 'getValues'])->middleware(['auth', 'verified'])->name('segments.values');
Route::get('/segments', [\App\Http\Controllers\SegmentController::class, 'index'])->middleware(['auth', 'verified'])->name('segments.index');
Route::post('/segments', [\App\Http\Controllers\SegmentController::class, 'store'])->middleware(['auth', 'verified'])->name('segments.store');
Route::put('/segments/{segment}', [\App\Http\Controllers\SegmentController::class, 'update'])->middleware(['auth', 'verified'])->name('segments.update');
Route::post('/segments/{segment}/duplicate', [\App\Http\Controllers\SegmentController::class, 'duplicate'])->middleware(['auth', 'verified'])->name('segments.duplicate');
Route::delete('/segments/{segment}', [\App\Http\Controllers\SegmentController::class, 'destroy'])->middleware(['auth', 'verified'])->name('segments.destroy');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/clients', [PatientController::class, 'index'])->name('clients');
    Route::post('/clients', [PatientController::class, 'store'])->name('clients.store');
    Route::put('/clients/{patient}', [PatientController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{patient}', [PatientController::class, 'destroy'])->name('clients.destroy');
    Route::post('/clients/add-column', [PatientController::class, 'addColumn'])->name('clients.add-column');
    Route::post('/clients/rename-column', [PatientController::class, 'renameColumn'])->name('clients.rename-column');
    Route::post('/clients/drop-column', [PatientController::class, 'dropColumn'])->name('clients.drop-column');
    Route::patch('/clients/{patient}/inline', [PatientController::class, 'inlineUpdate'])->name('clients.inline-update');
    Route::get('/clients/download-template', [PatientController::class, 'downloadTemplate'])->name('clients.download-template');
    Route::post('/clients/import', [PatientController::class, 'import'])->name('clients.import');
});

Route::get('/calendar', [\App\Http\Controllers\AppointmentController::class, 'index'])->middleware(['auth', 'verified'])->name('calendar');
Route::post('/calendar/appointments', [\App\Http\Controllers\AppointmentController::class, 'store'])->middleware(['auth', 'verified'])->name('calendar.appointments.store');

Route::get('/templates', [\App\Http\Controllers\TemplateController::class, 'index'])->middleware(['auth', 'verified'])->name('templates');
Route::post('/templates', [\App\Http\Controllers\TemplateController::class, 'store'])->middleware(['auth', 'verified'])->name('templates.store');
Route::patch('/templates/{template}', [\App\Http\Controllers\TemplateController::class, 'update'])->middleware(['auth', 'verified'])->name('templates.update');
Route::delete('/templates/{template}', [\App\Http\Controllers\TemplateController::class, 'destroy'])->middleware(['auth', 'verified'])->name('templates.destroy');

Route::get('/analytics', [\App\Http\Controllers\AnalyticsController::class, 'index'])->middleware(['auth', 'verified'])->name('analytics');

Route::get('/reports', [\App\Http\Controllers\ReportsController::class, 'index'])->middleware(['auth', 'verified'])->name('reports');
Route::get('/reports/download/master', [\App\Http\Controllers\ReportsController::class, 'downloadMasterLog'])->middleware(['auth', 'verified'])->name('reports.download.master');
Route::get('/reports/download/campaigns', [\App\Http\Controllers\ReportsController::class, 'downloadCampaignReport'])->middleware(['auth', 'verified'])->name('reports.download.campaigns');
Route::get('/reports/download/growth', [\App\Http\Controllers\ReportsController::class, 'downloadGrowthReport'])->middleware(['auth', 'verified'])->name('reports.download.growth');

Route::get('/settings', [\App\Http\Controllers\SettingsController::class, 'index'])->middleware(['auth', 'verified'])->name('settings');
Route::post('/settings/clinic', [\App\Http\Controllers\SettingsController::class, 'updateClinic'])->middleware(['auth', 'verified'])->name('settings.clinic.update');
Route::post('/settings/users', [\App\Http\Controllers\SettingsController::class, 'addUser'])->middleware(['auth', 'verified'])->name('settings.users.store');
Route::put('/settings/users/{user}', [\App\Http\Controllers\SettingsController::class, 'updateUser'])->middleware(['auth', 'verified'])->name('settings.users.update');
Route::delete('/settings/users/{user}', [\App\Http\Controllers\SettingsController::class, 'deleteUser'])->middleware(['auth', 'verified'])->name('settings.users.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
