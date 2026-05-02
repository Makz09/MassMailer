<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

use App\Models\Template;
use Illuminate\Support\Facades\Schema;

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

Template::all()->each(function($t) {
    // Remove Emojis from Subject
    $t->subject = preg_replace('/[\x{1F600}-\x{1F64F}\x{1F300}-\x{1F5FF}\x{1F680}-\x{1F6FF}\x{1F1E6}-\x{1F1FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{FE0F}]/u', '', $t->subject);

    // Apply Style to Body if not already styled
    $content = $t->body;
    if (strpos($content, '084C4B') === false) {
        $formattedContent = '<p>' . str_replace("\n\n", '</p><p>', $content) . '</p>';
        $formattedContent = str_replace("\n", '<br>', $formattedContent);

        $t->body = '
<div style="font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <div style="background-color: #084C4B; padding: 40px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;">The Cat Clinic</h1>
            <p style="color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Specialized Feline Care</p>
        </div>
        <div style="padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;">
            ' . $formattedContent . '
        </div>
        <div style="padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;">
            <p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">© 2026 The Cat Clinic Philippines</p>
            <p style="margin: 8px 0 0;">This email was sent to you because you are a valued client. <br> <a href="#" style="color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;">Manage Preferences</a> • <a href="#" style="color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;">Privacy Policy</a></p>
        </div>
    </div>
</div>';
    }
    $t->save();
});

echo "Templates updated successfully!\n";
