<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query();

        // Server-side search
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('owner_first_name', 'like', "%{$request->search}%")
                  ->orWhere('owner_last_name', 'like', "%{$request->search}%")
                  ->orWhere('owner_email', 'like', "%{$request->search}%");
            });
        }

        // Server-side filtering
        if ($request->status && $request->status !== 'All') {
            $query->where('status', $request->status);
        }

        // Server-side sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        // Ensure sort column exists
        $columns = Schema::getColumnListing('patients');
        if (in_array($sortBy, $columns)) {
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Filter out internal columns for display
        $internalColumns = ['id', 'created_at', 'updated_at', 'deleted_at'];
        $displayColumns = array_values(array_diff($columns, $internalColumns));

        // Fetch recommendations/suggestions
        $suggestions = [
            'breeds' => Patient::whereNotNull('breed')->distinct()->pluck('breed')->toArray(),
            'veterinarians' => Patient::whereNotNull('assigned_veterinarian')->distinct()->pluck('assigned_veterinarian')->toArray(),
            'branches' => Patient::whereNotNull('branch')->distinct()->pluck('branch')->toArray(),
            'statuses' => Patient::whereNotNull('status')->distinct()->pluck('status')->toArray(),
        ];

        return Inertia::render('Clients', [
            'patients' => $query->paginate(15)->withQueryString(),
            'availableColumns' => $displayColumns,
            'queryParams' => $request->all(),
            'suggestions' => $suggestions,
        ]);
    }

    public function addColumn(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'type' => 'required|string|in:string,text,integer,date,boolean',
        ]);

        // Convert spaces/hyphens to underscores and lowercase for database safety
        $columnName = strtolower(str_replace([' ', '-'], '_', $request->name));

        if (Schema::hasColumn('patients', $columnName)) {
            return back()->withErrors(['name' => 'This column already exists.']);
        }

        Schema::table('patients', function (Blueprint $table) use ($columnName, $request) {
            $type = $request->type;
            $table->$type($columnName)->nullable();
        });

        return back()->with('success', "Column '{$columnName}' added successfully!");
    }

    public function renameColumn(Request $request)
    {
        $request->validate([
            'old_name' => 'required|string',
            'new_name' => 'required|string|max:50',
        ]);

        $oldName = strtolower($request->old_name);
        // Convert spaces/hyphens to underscores and lowercase for database safety
        $newName = strtolower(str_replace([' ', '-'], '_', $request->new_name));

        if (!Schema::hasColumn('patients', $oldName)) {
            return back()->withErrors(['old_name' => 'Column does not exist.']);
        }

        if (Schema::hasColumn('patients', $newName)) {
            return back()->withErrors(['new_name' => 'The new column name already exists.']);
        }

        Schema::table('patients', function (Blueprint $table) use ($oldName, $newName) {
            $table->renameColumn($oldName, $newName);
        });

        return back()->with('success', "Column renamed to '{$newName}' successfully!");
    }

    public function dropColumn(Request $request)
    {
        $request->validate([
            'column_name' => 'required|string',
        ]);

        $columnName = strtolower($request->column_name);

        // Protected columns that should never be deleted
        $protectedColumns = [
            'id', 'name', 'breed', 'owner_first_name', 'owner_last_name', 'owner_email', 
            'owner_phone', 'assigned_veterinarian', 'medical_history', 'status', 
            'last_visit_at', 'first_visit_at', 'branch', 'health_score', 
            'created_at', 'updated_at', 'deleted_at'
        ];

        if (in_array($columnName, $protectedColumns)) {
            return back()->withErrors(['column_name' => 'This is a default column and cannot be removed.']);
        }

        if (!Schema::hasColumn('patients', $columnName)) {
            return back()->withErrors(['column_name' => 'Column does not exist.']);
        }

        Schema::table('patients', function (Blueprint $table) use ($columnName) {
            $table->dropColumn($columnName);
        });

        return back()->with('success', "Column '{$columnName}' has been removed successfully.");
    }

    public function inlineUpdate(Request $request, Patient $patient)
    {
        $field = $request->field;
        $value = $request->value;

        // Basic safety check: ensure the column exists
        if (!Schema::hasColumn('patients', $field)) {
            return response()->json(['error' => 'Invalid field'], 422);
        }

        $patient->update([$field => $value]);

        return response()->json([
            'success' => true,
            'patient' => $patient->fresh()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'breed' => 'required|string|max:255',
            'owner_first_name' => 'required|string|max:255',
            'owner_last_name' => 'required|string|max:255',
            'owner_email' => 'required|email|max:255',
            'owner_phone' => 'nullable|string|max:255',
            'age_years' => 'nullable|integer|min:0|max:50',
            'weight_kg' => 'nullable|numeric|min:0|max:99.99',
            'status' => 'required|string|max:255',
            'assigned_veterinarian' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
        ]);

        // Convert empty strings to null to avoid SQL errors on date/numeric columns
        $data = array_map(function($value) {
            return $value === '' ? null : $value;
        }, $request->all());

        Patient::create($data);
        return back()->with('success', 'Patient created successfully!');
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'breed' => 'required|string|max:255',
            'owner_first_name' => 'required|string|max:255',
            'owner_last_name' => 'required|string|max:255',
            'owner_email' => 'required|email|max:255',
            'owner_phone' => 'nullable|string|max:255',
            'age_years' => 'nullable|integer|min:0|max:50',
            'weight_kg' => 'nullable|numeric|min:0|max:99.99',
            'status' => 'required|string|max:255',
            'assigned_veterinarian' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
        ]);

        // Convert empty strings to null to avoid SQL errors on date/numeric columns
        $data = array_map(function($value) {
            return $value === '' ? null : $value;
        }, $request->all());

        $patient->update($data);
        return back()->with('success', 'Patient updated successfully!');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        return back()->with('success', 'Patient deleted successfully!');
    }

    public function downloadTemplate()
    {
        $columns = Schema::getColumnListing('patients');
        $excluded = ['id', 'created_at', 'updated_at', 'deleted_at'];
        $headers = array_values(array_diff($columns, $excluded));

        $callback = function() use ($headers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $headers);
            // Add a sample row
            $sample = array_fill(0, count($headers), '');
            // Fill some sample data for guidance
            $nameIdx = array_search('name', $headers);
            if ($nameIdx !== false) $sample[$nameIdx] = 'Luna';
            $breedIdx = array_search('breed', $headers);
            if ($breedIdx !== false) $sample[$breedIdx] = 'Siamese';
            $emailIdx = array_search('owner_email', $headers);
            if ($emailIdx !== false) $sample[$emailIdx] = 'sample@example.com';
            $statusIdx = array_search('status', $headers);
            if ($statusIdx !== false) $sample[$statusIdx] = 'Active';
            
            fputcsv($file, $sample);
            fclose($file);
        };

        return response()->stream($callback, 200, [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=patient_import_template.csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt'
        ]);

        $file = $request->file('file');
        $handle = fopen($file->getRealPath(), 'r');
        $header = fgetcsv($handle);

        $count = 0;
        while (($row = fgetcsv($handle)) !== false) {
            $data = array_combine($header, $row);
            if ($data) {
                // Sanitize empty strings to null
                $sanitized = array_map(function($value) {
                    return $value === '' ? null : $value;
                }, $data);
                
                Patient::create($sanitized);
                $count++;
            }
        }
        fclose($handle);

        return back()->with('success', "Successfully imported {$count} patients!");
    }
}
