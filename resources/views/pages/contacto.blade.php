@extends('layouts.app')

@section('title', 'Contacto')
@section('description', 'Contacta con Luneto por WhatsApp o correo. Estamos para ayudarte.')

@section('content')
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
            <h1 class="font-display text-4xl font-bold text-charcoal">Contacto</h1>
            <p class="mt-4 text-lg text-charcoal/70">
                ¿Tienes dudas sobre nuestros productos? Escríbenos y te ayudamos a encontrar lo perfecto para tu perro.
            </p>
        </div>

        <div class="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div class="flex flex-col items-center justify-center gap-4 rounded-3xl border border-sage/30 bg-white p-8 text-center shadow-sm">
                <span class="text-4xl">💬</span>
                <h2 class="font-display text-xl font-bold text-charcoal">WhatsApp</h2>
                <p class="text-sm text-charcoal/70">Respuesta rápida en horario de atención</p>
                <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $siteSettings->whatsapp) }}?text={{ urlencode('Hola Luneto 🐶, quiero hacer una consulta.') }}" target="_blank" class="rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-dark">
                    Escribir por WhatsApp
                </a>
            </div>

            <div class="flex flex-col items-center justify-center gap-4 rounded-3xl border border-sage/30 bg-white p-8 text-center shadow-sm">
                <span class="text-4xl">📧</span>
                <h2 class="font-display text-xl font-bold text-charcoal">Correo</h2>
                <p class="text-sm text-charcoal/70">Para consultas y colaboraciones</p>
                <a href="mailto:{{ $siteSettings->email }}" class="rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-dark">
                    {{ $siteSettings->email }}
                </a>
            </div>
        </div>
    </div>
@endsection