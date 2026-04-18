import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export type ThemeChoice = 'light' | 'dark'

export function applyTheme(theme: ThemeChoice) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(theme)
  document.documentElement.style.colorScheme = theme
  document.documentElement.setAttribute('data-theme', theme)
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeChoice>('dark')

  useEffect(() => {
    const s =
      typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial =
      s === 'light' || s === 'dark' ? s : prefersDark ? 'dark' : 'light'
    setTheme(initial)
    applyTheme(initial)
  }, [])

  function toggle() {
    const next: ThemeChoice = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    window.localStorage.setItem('theme', next)
  }

  const label =
    theme === 'dark'
      ? 'Tema oscuro activo. Cambiar a claro.'
      : 'Tema claro activo. Cambiar a oscuro.'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-black/35 dark:text-[var(--tu-text)] dark:shadow-[0_8px_22px_rgba(0,0,0,0.35)]"
    >
      {theme === 'dark' ? (
        <Sun className="size-4 shrink-0 text-[var(--neon)]" aria-hidden />
      ) : (
        <Moon className="size-4 shrink-0 text-[var(--neon)]" aria-hidden />
      )}
      <span className="hidden sm:inline">
        {theme === 'dark' ? 'Claro' : 'Oscuro'}
      </span>
    </button>
  )
}
