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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->default('Email'); // Email, SMS
            $table->string('status')->default('Draft'); // Draft, Scheduled, Sent, Ongoing, Completed
            $table->string('target_audience')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->integer('total_recipients')->default(0);
            $table->integer('opens')->default(0);
            $table->integer('clicks')->default(0);
            $table->integer('bookings')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
