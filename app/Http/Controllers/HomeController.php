<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        $categories = Category::withCount('products')
            ->where('status', 'published')
            ->orderBy('order')
            ->limit(6)
            ->get();

        $featuredProducts = Product::with(['category', 'mainImage'])
            ->published()
            ->where('featured', true)
            ->orderBy('order')
            ->limit(8)
            ->get();

        $latestProducts = Product::with(['category', 'mainImage'])
            ->published()
            ->latest()
            ->limit(4)
            ->get();

        $settings = SiteSetting::get();

        return view('home', compact('categories', 'featuredProducts', 'latestProducts', 'settings'));
    }
}
