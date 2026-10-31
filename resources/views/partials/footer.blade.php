<footer class="bg-olive-dark">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-8 md:grid-cols-3">
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="font-display text-xl font-bold text-white">Luneto</h3>
                    @if ($siteSettings->logo_url)
                        <img src="{{ $siteSettings->logo_url }}" alt="Luneto" class="h-8 w-auto">
                    @else
                        <span class="text-lg">🐶</span>
                    @endif
                </div>
                <p class="mt-3 text-sm leading-relaxed text-white/80">
                    Ropa y accesorios con personalidad, comodidad y mucho estilo para tu perro.
                </p>
            </div>
            <div>
                <h4 class="text-sm font-semibold uppercase tracking-wide text-white/60">Enlaces</h4>
                <ul class="mt-3 space-y-2 text-sm text-white/80">
                    <li><a href="{{ route('home') }}" class="transition hover:text-white">Inicio</a></li>
                    <li><a href="{{ route('products.index') }}" class="transition hover:text-white">Catálogo</a></li>
                    <li><a href="{{ route('nosotros') }}" class="transition hover:text-white">Nosotros</a></li>
                    <li><a href="{{ route('contacto') }}" class="transition hover:text-white">Contacto</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-sm font-semibold uppercase tracking-wide text-white/60">Contacto</h4>
                <ul class="mt-3 space-y-2 text-sm text-white/80">
                    <li>WhatsApp: <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $siteSettings->whatsapp) }}" class="transition hover:text-white">{{ $siteSettings->whatsapp }}</a></li>
                    <li>Email: <a href="mailto:{{ $siteSettings->email }}" class="transition hover:text-white">{{ $siteSettings->email }}</a></li>
                </ul>
                <h4 class="mt-6 text-sm font-semibold uppercase tracking-wide text-white/60">Síguenos</h4>
                <div class="mt-3 flex gap-3">
                    @if ($siteSettings->social_instagram)
                        <a href="{{ $siteSettings->social_instagram }}" target="_blank" rel="noopener" aria-label="Instagram" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                    @endif
                    @if ($siteSettings->social_facebook)
                        <a href="{{ $siteSettings->social_facebook }}" target="_blank" rel="noopener" aria-label="Facebook" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                    @endif
                    @if ($siteSettings->social_tiktok)
                        <a href="{{ $siteSettings->social_tiktok }}" target="_blank" rel="noopener" aria-label="TikTok" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                        </a>
                    @endif
                    @if ($siteSettings->social_pinterest)
                        <a href="{{ $siteSettings->social_pinterest }}" target="_blank" rel="noopener" aria-label="Pinterest" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                        </a>
                    @endif
                </div>
            </div>
        </div>
        <div class="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
            © {{ date('Y') }} Luneto. Todos los derechos reservados.
        </div>
    </div>
</footer>