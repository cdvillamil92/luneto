@extends('layouts.app')

@section('title', 'Catálogo de productos')
@section('description', 'Explora el catálogo de Luneto: ropa y accesorios con personalidad para tu perro.')

@section('content')
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="mb-8">
            <h1 class="font-display text-4xl font-bold text-charcoal">Catálogo</h1>
            <p class="mt-2 text-charcoal/70">
                Ropa y accesorios con personalidad, comodidad y estilo para tu perro.
            </p>
        </div>

        <!-- Filtros y búsqueda -->
        <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form method="get" action="{{ route('products.index') }}" class="flex flex-1 gap-3">
                <input
                    type="text"
                    name="q"
                    value="{{ request('q') }}"
                    placeholder="Buscar por nombre..."
                    class="w-full max-w-sm rounded-full border border-sage/40 bg-white px-5 py-2.5 text-sm focus:border-olive focus:outline-none"
                >
                <button type="submit" class="rounded-full bg-olive px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-olive-dark">
                    Buscar
                </button>
            </form>

            <div class="flex flex-wrap gap-2">
                <a href="{{ route('products.index') }}" class="rounded-full px-4 py-2 text-sm font-medium transition {{ !request('categoria') ? 'bg-olive text-white' : 'bg-white text-charcoal hover:bg-ivory' }}">
                    Todos
                </a>
                @foreach ($categories as $cat)
                    <a href="{{ route('products.index', ['categoria' => $cat->slug]) }}" class="rounded-full px-4 py-2 text-sm font-medium transition {{ request('categoria') === $cat->slug ? 'bg-olive text-white' : 'bg-white text-charcoal hover:bg-ivory' }}">
                        {{ $cat->name }}
                    </a>
                @endforeach
            </div>
        </div>

        <!-- Resultados -->
        @if ($products->count() === 0)
            <div class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sage/50 bg-ivory/50 py-24 text-center">
                <span class="text-5xl">🐶</span>
                <h2 class="mt-4 font-display text-2xl font-bold text-charcoal">No encontramos productos</h2>
                <p class="mt-2 max-w-md text-charcoal/70">
                    No hay productos que coincidan con tu búsqueda. Intenta con otros términos o revisa todas las categorías.
                </p>
                <a href="{{ route('products.index') }}" class="mt-6 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-dark">
                    Ver todo el catálogo
                </a>
            </div>
        @else
            <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                @foreach ($products as $product)
                    @include('partials.product-card', ['product' => $product])
                @endforeach
            </div>

            <!-- Paginación -->
            @if ($products->hasPages())
                <nav class="mt-12 flex items-center justify-center gap-2" aria-label="Paginación">
                    {{ $products->links() }}
                </nav>
            @endif
        @endif
    </div>
@endsection