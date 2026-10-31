@extends('layouts.app')

@section('title', 'Luneto — Ropa y accesorios con personalidad para tu perro')
@section('description', 'Ropa y accesorios para perros con personalidad, comodidad y mucho estilo. Descubre nuestro catálogo.')

@section('content')
    <!-- Hero -->
    <section class="relative overflow-hidden bg-ivory">
        <div class="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
            <div>
                <h1 class="font-display text-4xl font-bold leading-tight text-olive-dark sm:text-5xl lg:text-6xl">
                    {{ $settings->hero_title }}
                </h1>
                <p class="mt-4 max-w-xl text-lg leading-relaxed text-charcoal/80">
                    {{ $settings->hero_subtitle }}
                </p>
                <div class="mt-8 flex flex-wrap gap-4">
                    <a href="{{ route('products.index') }}" class="rounded-full bg-olive px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-olive-dark">
                        Ver catálogo
                    </a>
                    <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $settings->whatsapp) }}?text={{ urlencode('Hola Luneto, quiero información sobre sus productos 🐶') }}" target="_blank" class="rounded-full border border-olive px-8 py-3 text-sm font-semibold text-olive transition hover:bg-olive hover:text-white">
                        Escríbenos
                    </a>
                </div>
            </div>
            <div class="relative">
                @if ($settings->heroImage)
                    <img src="{{ $settings->heroImage->url }}" alt="{{ $settings->hero_title }}" class="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg">
                @else
                    <div class="flex aspect-[4/3] w-full items-center justify-center rounded-3xl bg-sage/30">
                        <span class="font-display text-6xl">🐶</span>
                    </div>
                @endif
            </div>
        </div>
    </section>

    <!-- Categorías -->
    @if ($categories->count() > 0)
        <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mb-8 flex items-end justify-between">
                <div>
                    <h2 class="font-display text-3xl font-bold text-charcoal">Categorías</h2>
                    <p class="mt-1 text-charcoal/70">Explora por tipo de producto</p>
                </div>
                <a href="{{ route('products.index') }}" class="text-sm font-semibold text-olive hover:text-olive-dark">Ver todo →</a>
            </div>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                @foreach ($categories as $category)
                    @include('partials.category-card', ['category' => $category])
                @endforeach
            </div>
        </section>
    @endif

    <!-- Productos destacados -->
    @if ($featuredProducts->count() > 0)
        <section class="bg-ivory/60">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="mb-8 flex items-end justify-between">
                    <div>
                        <h2 class="font-display text-3xl font-bold text-charcoal">Productos destacados</h2>
                        <p class="mt-1 text-charcoal/70">Los favoritos de Luneto</p>
                    </div>
                    <a href="{{ route('products.index') }}" class="text-sm font-semibold text-olive hover:text-olive-dark">Ver todo →</a>
                </div>
                <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    @foreach ($featuredProducts as $product)
                        @include('partials.product-card', ['product' => $product])
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    <!-- Novedades -->
    @if ($latestProducts->count() > 0)
        <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mb-8 flex items-end justify-between">
                <div>
                    <h2 class="font-display text-3xl font-bold text-charcoal">Novedades</h2>
                    <p class="mt-1 text-charcoal/70">Lo último que llegó a Luneto</p>
                </div>
                <a href="{{ route('products.index') }}" class="text-sm font-semibold text-olive hover:text-olive-dark">Ver todo →</a>
            </div>
            <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                @foreach ($latestProducts as $product)
                    @include('partials.product-card', ['product' => $product])
                @endforeach
            </div>
        </section>
    @endif

    <!-- Nosotros -->
    <section class="bg-olive-dark">
        <div class="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
                <h2 class="font-display text-3xl font-bold text-white">{{ $settings->about_title }}</h2>
                <p class="mt-4 leading-relaxed text-white/90">
                    {{ $settings->about_text }}
                </p>
                <a href="{{ route('nosotros') }}" class="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                    Conócenos
                </a>
            </div>
        </div>
    </section>
@endsection