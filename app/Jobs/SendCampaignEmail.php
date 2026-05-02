<?php

namespace App\Jobs;

use App\Models\Patient;
use App\Models\Template;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Support\Facades\Log;

class SendCampaignEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $patient;
    protected $template;

    /**
     * Create a new job instance.
     */
    public function __construct(Patient $patient, Template $template)
    {
        $this->patient = $patient;
        $this->template = $template;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $mail = new PHPMailer(true);
        $settings = \App\Models\ClinicSetting::first();

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = config('mail.mailers.smtp.host', env('MAIL_HOST', 'smtp.gmail.com'));
            $mail->SMTPAuth   = true;
            
            // DYNAMIC: Use database settings if available, otherwise fallback to config
            $mail->Username   = $settings->reply_to_email ?? config('mail.mailers.smtp.username');
            $mail->Password   = config('mail.mailers.smtp.password', env('MAIL_PASSWORD'));
            $mail->SMTPSecure = config('mail.mailers.smtp.encryption', env('MAIL_ENCRYPTION', 'tls'));
            $mail->Port       = config('mail.mailers.smtp.port', env('MAIL_PORT', 587));

            // Recipients - DYNAMIC
            $fromAddress = $settings->reply_to_email ?? config('mail.from.address', 'no-reply@catdesk.com');
            $fromName = $settings->sender_name ?? config('mail.from.name', 'Cat Desk CRM');
            
            $mail->setFrom($fromAddress, $fromName);
            $mail->addAddress($this->patient->owner_email, $this->patient->owner_name);

            // Content
            $mail->isHTML(true);
            
            // Build dynamic placeholders from patient attributes
            $placeholders = [];
            foreach ($this->patient->toArray() as $key => $value) {
                if (is_scalar($value)) {
                    $placeholders["{{{$key}}}"] = $value;
                }
            }
            // Add custom aliases for convenience
            $placeholders['{{patient_name}}'] = $this->patient->name;
            $placeholders['{{owner_name}}'] = $this->patient->owner_name;
            $placeholders['{{clinic_name}}'] = $settings->name ?? 'The Cat Clinic';

            // Parse Subject & Body
            $subject = $this->template->subject;
            $body = $this->template->body;
            
            $mail->Subject = str_replace(array_keys($placeholders), array_values($placeholders), $subject);
            $mail->Body = str_replace(array_keys($placeholders), array_values($placeholders), $body);
            
            $mail->send();

        } catch (Exception $e) {
            Log::error("Failed to send campaign email to {$this->patient->owner_email}: {$mail->ErrorInfo}");
            throw $e;
        }
    }
}
