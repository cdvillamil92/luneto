@php
    $imageUrl = $category->image?->url;
@endphp
<a href="{{ route('products.index', ['categoria' => $category->slug]) }}" class="group overflow-hidden rounded-3xl border border-sage/30 bg-white shadow-sm transition hover:shadow-md">
    <div class="relative aspect-square overflow-hidden bg-ivory">
        @if ($imageUrl)
            <img src="{{ $imageUrl }}" alt="{{ $category->name }}" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">
        @else
            <div class="flex h-full w-full items-center justify-center bg-sage/20">
                @if ($siteSettings->logo_url)
                    <img src="{{ $siteSettings->logo_url }}" alt="{{ $category->name }}" class="h-16 w-16 object-contain opacity-70">
                @else
                    <span class="font-display text-3xl text-olive-dark">🐶</span>
                @endif
            </div>
        @endif
    </div>
    <div class="p-4 text-center">
        <h3 class="font-display text-lg font-semibold text-charcoal group-hover:text-olive-dark">{{ $category->name }}</h3>
        <p class="mt-1 text-xs text-charcoal/60">{{ $category->products_count }} productos</p>
    </div>
</a>