<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CampaignMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public \App\Models\Template $template,
        public \App\Models\Patient $patient
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->template->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.campaign',
            with: [
                'body' => $this->parseBody(),
            ],
        );
    }

    protected function parseBody()
    {
        $body = $this->template->body;
        
        $placeholders = [
            '{{patient_name}}' => $this->patient->name,
            '{{owner_name}}' => $this->patient->owner_name,
            '{{first_name}}' => $this->patient->owner_first_name ?? '',
            '{{last_name}}' => $this->patient->owner_last_name ?? '',
            '{{owner_phone}}' => $this->patient->owner_phone ?? '',
            '{{branch}}' => $this->patient->branch ?? 'Main Clinic',
            '{{contact_owner}}' => $this->patient->contact_owner ?? 'Dr. Whiskers',
            '{{first_visit}}' => $this->patient->first_visit_at ? $this->patient->first_visit_at->format('M d, Y') : '—',
            '{{last_visit}}' => $this->patient->last_visit_at ? $this->patient->last_visit_at->format('M d, Y') : '—',
        ];

        return str_replace(array_keys($placeholders), array_values($placeholders), $body);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
