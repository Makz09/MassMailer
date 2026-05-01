<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        // Patients
        $p1 = \App\Models\Patient::create([
            'name' => 'Luna',
            'breed' => 'Domestic Short Hair',
            'owner_name' => 'Elena Jenkins',
            'owner_email' => 'elena.j@example.com',
            'medical_history' => ['Diabetes'],
            'status' => 'Critical',
            'last_visit_at' => now()->subDays(2),
            'health_score' => 45
        ]);

        $p2 = \App\Models\Patient::create([
            'name' => 'Oliver',
            'breed' => 'Maine Coon',
            'owner_name' => 'Marcus Reed',
            'owner_email' => 'm.reed@vetmail.org',
            'medical_history' => ['Asthma'],
            'status' => 'Recovering',
            'last_visit_at' => now()->subDays(10),
            'health_score' => 82
        ]);

        // Campaigns
        \App\Models\Campaign::create([
            'name' => 'Autumn Dental Health Week',
            'type' => 'Email',
            'status' => 'Completed',
            'sent_at' => now()->subDays(5),
            'opens' => 421,
            'clicks' => 158,
            'bookings' => 84
        ]);

        \App\Models\Campaign::create([
            'name' => 'Flea & Tick Prevention Reminder',
            'type' => 'Email',
            'status' => 'Completed',
            'sent_at' => now()->subDays(12),
            'opens' => 385,
            'clicks' => 122,
            'bookings' => 126
        ]);

        // Templates
        \App\Models\Template::create([
            'name' => 'Annual FVRCP Booster Reminder',
            'category' => 'Vaccination Reminders',
            'status' => 'Live',
            'preview_image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt61jurxZzneV0MRdZRBByoh9IKeuGPydb9h8BTbX4PwWOCgUsi2Hp7hT2rDV4WhyZ0l6KVw1x-nzchB7IbUnjPv9rCyUZ0DbKGTlVeQ_JWkqRni_YQRPkdsFtcivuT3AXAlUQVbAeJ8hNC7uss4XJE384EmyJ3HXZ9jJMzT_49geAzn8tjRuO9m87JxOMCbb4fMu_W2FWnWOM86SVrKd1EvTrZ0bXsEnja_PHjvfF05_bVcMRApthBXsgkBMeF3KfmixfRY_lLuk_'
        ]);

        // Appointments
        \App\Models\Appointment::create([
            'title' => 'Surgery: Luna (9AM)',
            'type' => 'surgery',
            'patient_id' => $p1->id,
            'start_time' => now()->addDays(2)->setHour(9)->setMinute(0),
            'status' => 'Scheduled'
        ]);
    }
}
