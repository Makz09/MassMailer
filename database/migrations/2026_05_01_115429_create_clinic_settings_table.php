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
        Schema::create('clinic_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('The Cat Clinic');
            $table->string('email')->default('hello@catclinic.ph');
            $table->string('phone')->default('+63 917 123 4567');
            $table->text('address')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('sender_name')->default('The Cat Clinic Care Team');
            $table->string('reply_to_email')->default('support@catclinic.ph');
            $table->json('preferences')->nullable();
            $table->timestamps();
        });

        // Insert initial record
        \DB::table('clinic_settings')->insert([
            'name' => 'The Cat Clinic',
            'email' => 'hello@catclinic.ph',
            'phone' => '+63 917 123 4567',
            'address' => 'Quezon City, Philippines',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinic_settings');
    }
};
