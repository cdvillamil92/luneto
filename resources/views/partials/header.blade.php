<header class="border-b border-sage/30 bg-ivory">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="{{ route('home') }}" class="flex items-center gap-2">
            <span class="font-display text-2xl font-bold text-olive-dark">Luneto</span>
            @if ($siteSettings->logo_url)
                <img src="{{ $siteSettings->logo_url }}" alt="Luneto" class="h-8 w-auto">
            @else
                <span class="text-lg">🐶</span>
            @endif
        </a>
        <nav class="flex items-center gap-6 text-sm font-medium">
            <a href="{{ route('home') }}" class="text-charcoal/80 transition hover:text-olive">Inicio</a>
            <a href="{{ route('products.index') }}" class="text-charcoal/80 transition hover:text-olive">Catálogo</a>
            <a href="{{ route('nosotros') }}" class="text-charcoal/80 transition hover:text-olive">Nosotros</a>
            <a href="{{ route('contacto') }}" class="text-charcoal/80 transition hover:text-olive">Contacto</a>
        </nav>
    </div>
</header>