import { Link } from '@tanstack/react-router'

import ThemeToggle from '#/components/ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-3 backdrop-blur-lg sm:px-4">
      <nav className="page-wrap flex max-w-[1200px] flex-wrap items-center gap-x-2 gap-y-2 py-3 sm:gap-x-3 sm:py-4">
        <h2 className="m-0 flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="group inline-flex min-w-0 max-w-full items-center gap-2.5 no-underline sm:gap-3"
          >
            <span className="font-display truncate text-lg tracking-[0.12em] text-[var(--neon)] transition group-hover:text-[var(--neon2)] sm:text-2xl sm:tracking-[0.18em]">
              TU TURNO
            </span>
          </Link>
        </h2>

        <div className="ml-auto flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <p className="font-body m-0 hidden max-w-[10rem] text-right text-[11px] leading-tight text-[color:var(--tu-text-muted)] sm:block sm:max-w-none sm:text-sm">
            Habitación 911
          </p>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
