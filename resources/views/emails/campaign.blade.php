<x-mail::message>
# Hello {{ $patient->owner_name }},

{!! $body !!}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
