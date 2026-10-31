<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categorySlug = $request->query('categoria');
        $query = $request->query('q');

        $categories = Category::where('status', 'published')
            ->orderBy('order')
            ->get();

        $products = Product::with(['category', 'mainImage'])
            ->published()
            ->when($categorySlug, function ($q) use ($categorySlug) {
                $q->whereHas('category', fn ($c) => $c->where('slug', $categorySlug));
            })
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
            ->orderBy('order')
            ->paginate(12)
            ->withQueryString();

        return view('products.index', compact('categories', 'products'));
    }

    public function show(string $slug)
    {
        $product = Product::with(['category', 'mainImage'])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        $related = collect();
        if ($product->category) {
            $related = Product::with(['category', 'mainImage'])
                ->published()
                ->where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->limit(4)
                ->get();
        }

        return view('products.show', compact('product', 'related'));
    }
}
