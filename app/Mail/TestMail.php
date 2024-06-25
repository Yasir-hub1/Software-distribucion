<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $messageContent;
    public $subject;

    public function __construct($messageContent, $subject)
    {
        $this->messageContent = $messageContent;
        $this->subject = $subject;
    }

    public function build()
    {
        return $this->subject($this->subject)
                    ->markdown('emails.test')
                    ->with('messageContent', $this->messageContent);
    }

    /**
     * Get the message envelope.
     */
/*     public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }
 */
    /**
     * Get the message content definition.
     */
   /*  public function content(): Content
    {
        return new Content(
            view: 'mails.correo',
        );
    } */

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
  /*   public function attachments(): array
    {
        return [];
    } */
}
