@php
    $imageUrl = $product->mainImage?->url;
    $hasSale = $product->sale_price && $product->sale_price < $product->price;
    $isOutOfStock = $product->availability === 'out_of_stock';
@endphp
<a href="{{ route('products.show', $product->slug) }}" class="group overflow-hidden rounded-3xl border border-sage/30 bg-white shadow-sm transition hover:shadow-md">
    <div class="relative aspect-square overflow-hidden bg-ivory">
        @if ($imageUrl)
            <img src="{{ $imageUrl }}" alt="{{ $product->name }}" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">
        @else
            <div class="flex h-full w-full items-center justify-center">
                <span class="font-display text-3xl text-olive-dark">🐶</span>
            </div>
        @endif
        @if ($hasSale)
            <span class="absolute left-3 top-3 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-white">
                -{{ round((1 - $product->sale_price / $product->price) * 100) }}%
            </span>
        @endif
        @if ($isOutOfStock)
            <div class="pointer-events-none absolute inset-0 bg-charcoal/40"></div>
            <span class="absolute right-3 top-3 rounded-full bg-charcoal px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Agotado
            </span>
            <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span class="bg-charcoal px-3 py-1 font-display text-sm font-bold uppercase tracking-widest text-white shadow-md">Agotado</span>
            </div>
        @endif
    </div>
    <div class="p-4">
        <h3 class="font-display text-lg font-semibold text-charcoal group-hover:text-olive-dark">{{ $product->name }}</h3>
        @if ($product->category)
            <p class="mt-1 text-xs uppercase tracking-wide text-olive">{{ $product->category->name }}</p>
        @endif
        <div class="mt-2 flex items-baseline gap-2">
            @if ($hasSale)
                <span class="font-display text-xl font-bold text-olive-dark">{{ number_format($product->sale_price, 0, ',', '.') }} COP</span>
                <span class="text-sm text-charcoal/50 line-through">{{ number_format($product->price, 0, ',', '.') }}</span>
            @else
                <span class="font-display text-xl font-bold text-olive-dark">{{ number_format($product->price, 0, ',', '.') }} COP</span>
            @endif
        </div>
    </div>
</a>