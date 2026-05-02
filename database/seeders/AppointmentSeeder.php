<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\Patient;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        Appointment::truncate();
        
        $patients = Patient::all();
        if ($patients->isEmpty()) return;

        $types = ['surgery', 'checkup', 'event', 'grooming'];
        $titles = [
            'surgery' => ['Dental Surgery', 'Neutering', 'Tumor Removal'],
            'checkup' => ['Annual Vaccination', 'Senior Wellness Check', 'Follow-up Consultation'],
            'event' => ['Clinic Open House', 'Cat Adoption Day', 'Nutrition Workshop'],
            'grooming' => ['Spa Day', 'Lion Cut', 'Nail Trim & Ear Cleaning']
        ];

        // Seed 30 random appointments across current and next month
        for ($i = 0; $i < 30; $i++) {
            $type = $types[array_rand($types)];
            $title = $titles[$type][array_rand($titles[$type])];
            $patient = $patients->random();
            
            // Focus on May 2026 to ensure visibility
            $date = Carbon::create(2026, 5, rand(1, 28))->setHour(rand(8, 17))->setMinute(0);

            Appointment::create([
                'title' => $title,
                'type' => $type,
                'patient_id' => $patient->id,
                'start_time' => $date,
                'end_time' => (clone $date)->addHour(),
                'status' => 'Scheduled',
                'description' => 'Automatically generated demo appointment.'
            ]);
        }
    }
}
