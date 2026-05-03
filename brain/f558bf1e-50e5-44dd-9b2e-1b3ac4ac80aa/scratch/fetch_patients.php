<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$patients = \App\Models\Patient::latest()->take(5)->get();
echo "NEWEST 5 PATIENTS:\n";
foreach ($patients as $p) {
    echo "- ID: {$p->id}, Name: {$p->name}, Owner: {$p->owner_name}, Created: {$p->created_at}\n";
}
