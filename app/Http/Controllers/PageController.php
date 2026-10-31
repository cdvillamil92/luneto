<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function nosotros()
    {
        return view('pages.nosotros');
    }

    public function contacto()
    {
        return view('pages.contacto');
    }
}
