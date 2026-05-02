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
            $table->string('owner_first_name')->nullable()->after('owner_name');
            $table->string('owner_last_name')->nullable()->after('owner_first_name');
            $table->string('contact_owner')->nullable()->after('owner_phone');
            $table->timestamp('first_visit_at')->nullable()->after('last_visit_at');
            $table->string('branch')->nullable()->after('first_visit_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn(['owner_first_name', 'owner_last_name', 'contact_owner', 'first_visit_at', 'branch']);
        });
    }
};
