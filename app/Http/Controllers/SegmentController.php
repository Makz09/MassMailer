<?php

namespace App\Http\Controllers;

use App\Models\Segment;
use Illuminate\Http\Request;

class SegmentController extends Controller
{
    public function index()
    {
        $columns = \Illuminate\Support\Facades\Schema::getColumnListing('patients');
        $internalColumns = ['id', 'created_at', 'updated_at', 'deleted_at'];
        
        $columnData = [];
        foreach ($columns as $column) {
            if (in_array($column, $internalColumns)) continue;
            
            $type = \Illuminate\Support\Facades\Schema::getColumnType('patients', $column);
            
            // Normalize types for frontend
            $frontendType = 'string';
            if (in_array($type, ['date', 'datetime', 'timestamp'])) $frontendType = 'date';
            if (in_array($type, ['int', 'integer', 'bigint', 'decimal', 'float'])) $frontendType = 'number';
            if (in_array($type, ['boolean', 'tinyint'])) $frontendType = 'boolean';

            $columnData[] = [
                'name' => $column,
                'label' => collect(explode('_', $column))->map(fn($w) => ucfirst($w))->join(' '),
                'type' => $frontendType
            ];
        }

        return \Inertia\Inertia::render('Segments', [
            'segments' => Segment::latest()->get(),
            'availableColumns' => $columnData,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'rules' => 'required|array',
            'recipient_count' => 'required|integer'
        ]);

        $segment = Segment::create($request->all());

        return back()->with('success', "Segment '{$segment->name}' saved successfully!");
    }

    public function update(Request $request, Segment $segment)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $segment->update($request->only('name'));

        return back()->with('success', "Segment renamed successfully!");
    }

    public function duplicate(Segment $segment)
    {
        $newSegment = $segment->replicate();
        $newSegment->name = $segment->name . ' (Copy)';
        $newSegment->save();

        return back()->with('success', "Segment duplicated successfully!");
    }

    public function destroy(Segment $segment)
    {
        $segment->delete();
        return back()->with('success', "Segment deleted successfully!");
    }

    public function getValues(Request $request)
    {
        $column = $request->query('column');
        if (!$column) return response()->json([]);

        $values = \App\Models\Patient::whereNotNull($column)
            ->where($column, '!=', '')
            ->distinct()
            ->orderBy($column)
            ->limit(20)
            ->pluck($column);

        return response()->json($values);
    }
}
