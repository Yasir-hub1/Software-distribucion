@component('mail::message')
# {{ $subject }}

{{ $messageContent }}

Gracias,<br>
{{ config('app.name') }}
@endcomponent
