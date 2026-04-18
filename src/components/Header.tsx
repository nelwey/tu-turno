import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--header-bg)] px-3 backdrop-blur-lg sm:px-4">
      <nav className="page-wrap flex max-w-[1200px] flex-wrap items-center gap-x-2 gap-y-2 py-3 sm:gap-x-3 sm:py-4">
        <h2 className="m-0 min-w-0 flex-shrink-0">
          <Link
            to="/"
            className="font-display inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--neon)]/35 bg-black/40 px-3 py-1.5 text-lg tracking-[0.15em] text-[var(--neon)] no-underline shadow-[0_0_20px_rgba(0,255,209,0.2)] transition hover:-translate-y-0.5 hover:bg-[var(--neon)]/10 sm:px-4 sm:py-2 sm:text-2xl sm:tracking-[0.2em]"
          >
            TU TURNO
          </Link>
        </h2>

        <p className="font-body mb-0 ml-auto max-w-[min(100%,12rem)] text-right text-[11px] leading-tight text-white/55 sm:max-w-none sm:text-sm">
          Habitación 911
        </p>
      </nav>
    </header>
  )
}
