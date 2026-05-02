<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $catBreeds = ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx', 'Ragdoll', 'Abyssinian', 'Birman', 'Russian Blue', 'Burmese', 'Domestic Shorthair', 'Domestic Longhair'];
        $catNames = ['Luna', 'Oliver', 'Milo', 'Leo', 'Bella', 'Charlie', 'Chloe', 'Max', 'Lucy', 'Lily', 'Simba', 'Nala', 'Misty', 'Jasper', 'Oscar', 'Coco'];
        $vets = ['Dr. Sarah Tan', 'Dr. Michael Chen', 'Dr. Elena Rossi', 'Dr. James Wilson', 'Dr. Maria Garcia'];
        $branches = ['Downtown', 'North Side', 'BGC', 'Quezon City', 'Cebu Main'];

        return [
            'name' => $this->faker->randomElement($catNames),
            'breed' => $this->faker->randomElement($catBreeds),
            'age_years' => $this->faker->numberBetween(1, 18),
            'weight_kg' => $this->faker->randomFloat(2, 2, 8),
            'owner_first_name' => $this->faker->firstName(),
            'owner_last_name' => $this->faker->lastName(),
            'owner_email' => $this->faker->unique()->safeEmail(),
            'owner_phone' => $this->faker->phoneNumber(),
            'assigned_veterinarian' => $this->faker->randomElement($vets),
            'medical_history' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['Active', 'Inactive', 'Critical']),
            'branch' => $this->faker->randomElement($branches),
            'health_score' => $this->faker->numberBetween(30, 100),
            'first_visit_at' => $this->faker->dateTimeBetween('-3 years', '-1 year'),
            'last_visit_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'last_vaccination_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
