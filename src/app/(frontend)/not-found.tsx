import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl">🐶</span>
      <h1 className="mt-6 font-display text-4xl font-bold text-charcoal">Página no encontrada</h1>
      <p className="mt-3 max-w-md text-charcoal/70">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-olive px-8 py-3 text-sm font-semibold text-white transition hover:bg-olive-dark"
      >
        Volver al inicio
      </Link>
    </div>
  )
}