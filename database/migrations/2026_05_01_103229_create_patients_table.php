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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('breed');
            $table->string('owner_name');
            $table->string('owner_email');
            $table->string('owner_phone')->nullable();
            $table->json('medical_history')->nullable(); // Store tags like ["Diabetes", "Asthma"]
            $table->string('status')->default('Active'); // Active, Recovering, Critical
            $table->timestamp('last_visit_at')->nullable();
            $table->integer('health_score')->default(100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
