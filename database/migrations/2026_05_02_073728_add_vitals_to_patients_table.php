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
        Schema::table('patients', function (Blueprint $table) {
            $table->integer('age_years')->nullable()->after('breed');
            $table->decimal('weight_kg', 8, 2)->nullable()->after('age_years');
            $table->date('last_vaccination_at')->nullable()->after('last_visit_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn(['age_years', 'weight_kg', 'last_vaccination_at']);
        });
    }
};
