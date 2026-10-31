@extends('layouts.app')

@section('title', $product->seo['title'] ?? $product->name)
@section('description', $product->seo['description'] ?? $product->short_description ?? '')

@section('content')
    @php
        $hasSale = $product->sale_price && $product->sale_price < $product->price;
        $isOutOfStock = $product->availability === 'out_of_stock';
        $availabilityLabel = [
            'in_stock' => 'Disponible',
            'out_of_stock' => 'Agotado',
            'on_order' => 'Bajo pedido',
        ][$product->availability] ?? 'Disponible';
        $gallery = $product->gallery_images;
    @endphp

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <!-- Migas de pan -->
        <nav class="mb-8 text-sm text-charcoal/60" aria-label="Migas de pan">
            <a href="{{ route('home') }}" class="hover:text-olive">Inicio</a>
            <span class="mx-2">/</span>
            <a href="{{ route('products.index') }}" class="hover:text-olive">Catálogo</a>
            @if ($product->category)
                <span class="mx-2">/</span>
                <a href="{{ route('products.index', ['categoria' => $product->category->slug]) }}" class="hover:text-olive">
                    {{ $product->category->name }}
                </a>
            @endif
            <span class="mx-2">/</span>
            <span class="text-charcoal">{{ $product->name }}</span>
        </nav>

        <div class="grid gap-10 lg:grid-cols-2">
            <!-- Galería -->
            @php
                $allImages = [];
                if ($product->mainImage) {
                    $allImages[] = ['url' => $product->mainImage->url, 'alt' => $product->name];
                }
                foreach ($gallery as $item) {
                    $allImages[] = ['url' => $item['url'], 'alt' => $item['alt']];
                }
            @endphp
            <div>
                <div id="gallery" class="relative overflow-hidden rounded-3xl border border-sage/30 bg-ivory" data-images='@json($allImages)'>
                    <div id="gallery-main" class="relative aspect-square w-full overflow-hidden">
                        @if (count($allImages) > 0)
                            <img id="gallery-img" src="{{ $allImages[0]['url'] }}" alt="{{ $allImages[0]['alt'] }}" class="h-full w-full object-cover transition-transform duration-200" style="transform-origin: 0 0;">
                        @else
                            <div class="flex aspect-square w-full items-center justify-center">
                                <span class="font-display text-6xl">🐶</span>
                            </div>
                        @endif
                        @if ($isOutOfStock)
                            <div class="pointer-events-none absolute inset-0 bg-charcoal/40"></div>
                            <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <span class="bg-charcoal px-8 py-2 font-display text-3xl font-bold uppercase tracking-widest text-white shadow-lg sm:text-4xl">Agotado</span>
                            </div>
                        @endif
                    </div>

                    @if (count($allImages) > 1)
                        <button id="gallery-prev" type="button" aria-label="Imagen anterior" class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-charcoal shadow-sm backdrop-blur transition hover:bg-white">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <button id="gallery-next" type="button" aria-label="Imagen siguiente" class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-charcoal shadow-sm backdrop-blur transition hover:bg-white">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                        </button>
                        <span id="gallery-counter" class="absolute bottom-3 right-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-semibold text-white"></span>
                    @endif
                </div>

                @if (count($allImages) > 1)
                    <div class="mt-4 grid grid-cols-4 gap-3">
                        @foreach ($allImages as $index => $item)
                            <button type="button" data-thumb="{{ $index }}" class="gallery-thumb relative overflow-hidden rounded-2xl border-2 border-sage/30 bg-ivory transition hover:border-olive {{ $index === 0 ? 'border-olive' : '' }}">
                                <img src="{{ $item['url'] }}" alt="{{ $item['alt'] }}" class="aspect-square w-full object-cover">
                                @if ($isOutOfStock)
                                    <div class="pointer-events-none absolute inset-0 bg-charcoal/40"></div>
                                    <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                                        <span class="bg-charcoal px-2 py-0.5 font-display text-xs font-bold uppercase tracking-widest text-white">Agotado</span>
                                    </div>
                                @endif
                            </button>
                        @endforeach
                    </div>
                @endif
            </div>

            <!-- Información -->
            <div>
                @if ($product->category)
                    <a href="{{ route('products.index', ['categoria' => $product->category->slug]) }}" class="text-sm font-semibold uppercase tracking-wide text-olive hover:text-olive-dark">
                        {{ $product->category->name }}
                    </a>
                @endif
                <h1 class="mt-2 font-display text-4xl font-bold text-charcoal">{{ $product->name }}</h1>

                <div class="mt-4 flex items-center gap-3">
                    <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold {{ $isOutOfStock ? 'bg-charcoal text-white' : 'bg-sage/30 text-olive-dark' }}">
                        <span class="h-2 w-2 rounded-full {{ $isOutOfStock ? 'bg-white' : 'bg-olive' }}"></span>
                        {{ $availabilityLabel }}
                    </span>
                    <span class="text-xs text-charcoal/50">Ref: {{ $product->sku }}</span>
                </div>

                <div class="mt-6 flex items-baseline gap-3">
                    @if ($hasSale)
                        <span class="font-display text-4xl font-bold text-olive-dark">{{ number_format($product->sale_price, 0, ',', '.') }} COP</span>
                        <span class="text-xl text-charcoal/50 line-through">{{ number_format($product->price, 0, ',', '.') }} COP</span>
                    @else
                        <span class="font-display text-4xl font-bold text-olive-dark">{{ number_format($product->price, 0, ',', '.') }} COP</span>
                    @endif
                </div>

                @if ($product->short_description)
                    <p class="mt-6 leading-relaxed text-charcoal/80">{{ $product->short_description }}</p>
                @endif

                <!-- Variantes -->
                @if (!empty($product->variants['sizes']) || !empty($product->variants['colors']))
                    <div class="mt-6 space-y-4">
                        @if (!empty($product->variants['sizes']))
                            <div>
                                <h3 class="text-sm font-semibold text-charcoal">Tallas</h3>
                                <div class="mt-2 flex flex-wrap gap-2">
                                    @foreach ($product->variants['sizes'] as $size)
                                        <span class="rounded-full border border-sage/50 px-4 py-1.5 text-sm font-medium text-charcoal">{{ strtoupper($size) }}</span>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                        @if (!empty($product->variants['colors']))
                            <div>
                                <h3 class="text-sm font-semibold text-charcoal">Colores</h3>
                                <div class="mt-2 flex flex-wrap gap-2">
                                    @foreach ($product->variants['colors'] as $color)
                                        <span class="rounded-full border border-sage/50 px-4 py-1.5 text-sm font-medium text-charcoal">{{ $color }}</span>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                    </div>
                @endif

                <div class="mt-8">
                    @if ($isOutOfStock)
                        <div class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-white shadow-sm sm:w-auto">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M4.929 4.929c3.905-3.905 10.237-3.905 14.142 0m0 0l-2.828 2.829m2.828-2.829L3 3m3.519 14.764a9 9 0 010-12.728m0 0l2.829 2.829m-2.829-2.829L3 3" /></svg>
                            Producto agotado
                        </div>
                        <p class="mt-3 text-sm text-charcoal/60">Este producto no está disponible actualmente. Vuelve pronto o contáctanos para saber cuándo estará de nuevo.</p>
                    @else
                        <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $siteSettings->whatsapp) }}?text={{ urlencode('Hola Luneto 🐶, me interesa el producto *' . $product->name . '* (Ref: ' . $product->sku . '). ¿Me das más información?') }}" target="_blank" class="inline-flex w-full items-center justify-center rounded-full bg-olive px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-olive-dark sm:w-auto">
                            Consultar por WhatsApp
                        </a>
                    @endif
                </div>

                <!-- Descripción completa -->
                @if ($product->description)
                    <div class="mt-10 border-t border-sage/30 pt-8">
                        <h2 class="font-display text-2xl font-bold text-charcoal">Descripción</h2>
                        <div class="prose mt-4 max-w-none text-charcoal/80">
                            {!! $product->description !!}
                        </div>
                    </div>
                @endif
            </div>
        </div>

        <!-- Productos relacionados -->
        @if ($related->count() > 0)
            <section class="mt-20">
                <h2 class="mb-8 font-display text-3xl font-bold text-charcoal">También te puede gustar</h2>
                <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    @foreach ($related as $p)
                        @include('partials.product-card', ['product' => $p])
                    @endforeach
                </div>
            </section>
        @endif
    </div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    const images = JSON.parse(gallery.dataset.images || '[]');
    const mainImg = document.getElementById('gallery-img');
    const mainWrap = document.getElementById('gallery-main');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const counter = document.getElementById('gallery-counter');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    let current = 0;

    function update() {
        if (!mainImg || images.length === 0) return;
        mainImg.src = images[current].url;
        mainImg.alt = images[current].alt;
        if (counter) counter.textContent = (current + 1) + ' / ' + images.length;
        thumbs.forEach((t, i) => {
            t.classList.toggle('border-olive', i === current);
            t.classList.toggle('border-sage/30', i !== current);
        });
        // Reset zoom
        mainImg.style.transform = 'scale(1)';
        mainImg.style.transformOrigin = '0 0';
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        update();
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        current = (current + 1) % images.length;
        update();
    });
    thumbs.forEach((t) => {
        t.addEventListener('click', () => {
            current = parseInt(t.dataset.thumb, 10);
            update();
        });
    });

    // Zoom al pasar el mouse
    if (mainImg && mainWrap) {
        const ZOOM = 2.5;
        mainWrap.addEventListener('mousemove', (e) => {
            const rect = mainWrap.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            mainImg.style.transformOrigin = (x * 100) + '% ' + (y * 100) + '%';
            mainImg.style.transform = 'scale(' + ZOOM + ')';
        });
        mainWrap.addEventListener('mouseleave', () => {
            mainImg.style.transform = 'scale(1)';
        });
    }

    update();
});
</script>
@endpush