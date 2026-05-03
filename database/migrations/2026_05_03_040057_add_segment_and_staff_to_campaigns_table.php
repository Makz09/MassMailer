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
        Schema::table('campaigns', function (Blueprint $table) {
            $table->foreignId('segment_id')->nullable()->constrained()->onDelete('set null')->after('template_id');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null')->after('segment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropForeign(['segment_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn(['segment_id', 'user_id']);
        });
    }
};
