<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        \App\Models\Template::where('status', 'Active')
            ->orWhere('status', 'active')
            ->update(['status' => 'Live']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No easy way to revert as we don't know which ones were 'Active' vs 'Live'
        // But for consistency:
        \App\Models\Template::where('status', 'Live')
            ->update(['status' => 'Active']);
    }
};
