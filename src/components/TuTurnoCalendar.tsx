import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '#/components/ui/button'
import { getCleanerForDate, isCleaningDay } from '#/lib/schedule'

const WEEKDAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

function isWeekendDay(d: Date): boolean {
  const day = d.getDay()
  return day === 0 || day === 6
}

export default function TuTurnoCalendar() {
  const [cursor, setCursor] = useState(() => {
    const n = new Date()
    return new Date(n.getFullYear(), n.getMonth(), 1)
  })

  const { year, month, weeks } = useMemo(() => {
    const y = cursor.getFullYear()
    const m = cursor.getMonth()
    const first = new Date(y, m, 1)
    const last = new Date(y, m + 1, 0)
    const startPad = first.getDay()
    const daysInMonth = last.getDate()

    const cells: { date: Date | null; inMonth: boolean }[] = []
    for (let i = 0; i < startPad; i++) {
      cells.push({ date: null, inMonth: false })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(y, m, d), inMonth: true })
    }
    while (cells.length % 7 !== 0) {
      cells.push({ date: null, inMonth: false })
    }

    const chunk: (typeof cells)[] = []
    for (let i = 0; i < cells.length; i += 7) {
      chunk.push(cells.slice(i, i + 7))
    }

    return { year: y, month: m, weeks: chunk }
  }, [cursor])

  const title = useMemo(
    () =>
      new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(
        new Date(year, month, 1),
      ),
    [year, month],
  )

  function shiftMonth(delta: number) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1))
  }

  return (
    <div className="rise-in mx-auto w-full max-w-3xl min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-6 sm:gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0 border-[var(--neon)]/40 bg-white/60 text-[var(--neon)] hover:bg-[var(--neon)]/10 dark:bg-black/30"
          onClick={() => shiftMonth(-1)}
          aria-label="Mes anterior"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <h2 className="font-display m-0 min-w-0 flex-1 text-center text-xl capitalize tracking-wide text-[color:var(--tu-text)] sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0 border-[var(--neon)]/40 bg-white/60 text-[var(--neon)] hover:bg-[var(--neon)]/10 dark:bg-black/30"
          onClick={() => shiftMonth(1)}
          aria-label="Mes siguiente"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      <div className="-mx-1 overflow-x-auto pb-1 sm:mx-0">
        <div className="min-w-[320px] overflow-hidden rounded-2xl border border-[var(--line)] bg-white/75 shadow-[0_0_32px_rgba(0,255,209,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-black/40 sm:min-w-0">
          <div className="grid grid-cols-7 gap-px bg-[var(--line)]">
            {WEEKDAYS_ES.map((wd) => (
              <div
                key={wd}
                className="bg-white/90 px-0.5 py-1.5 text-center text-[10px] font-semibold tracking-wide text-[color:var(--tu-text-muted)] uppercase dark:bg-black/60 dark:text-white/50 sm:px-1 sm:py-2 sm:text-xs md:text-sm"
              >
                {wd}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-[var(--line)]">
            {weeks.flatMap((row, ri) =>
              row.map((cell, ci) => {
                const key = `${ri}-${ci}`
                if (!cell.date) {
                  return (
                    <div
                      key={key}
                      className="min-h-[64px] bg-white/50 dark:bg-black/30 sm:min-h-[80px] md:min-h-[88px]"
                    />
                  )
                }
                const d = cell.date
                const weekend = isWeekendDay(d)
                const cleaningDay = isCleaningDay(d)
                const cleaner = cleaningDay ? getCleanerForDate(d) : null

                return (
                  <div
                    key={key}
                    className={[
                      'relative flex min-h-[64px] flex-col items-center justify-start bg-white/80 p-1 dark:bg-black/50 sm:min-h-[80px] sm:p-1.5 md:min-h-[88px] md:p-2',
                      weekend
                        ? 'ring-1 ring-[var(--neon)]/35 ring-inset'
                        : 'opacity-95 dark:opacity-90',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'font-body text-xs font-semibold sm:text-sm md:text-base',
                        weekend
                          ? 'text-[var(--neon2)]'
                          : 'text-[color:var(--tu-text-muted)]',
                      ].join(' ')}
                    >
                      {d.getDate()}
                    </span>
                    {cleaningDay && cleaner ? (
                      <span
                        title={cleaner.name}
                        className="font-display mt-0.5 cursor-help rounded border border-[var(--neon)]/60 bg-[var(--neon)]/15 px-1 py-px text-sm text-[var(--neon)] shadow-[0_0_12px_rgba(0,255,209,0.35)] sm:mt-1 sm:rounded-md sm:px-2 sm:py-0.5 sm:text-lg md:text-xl"
                      >
                        {cleaner.initial}
                      </span>
                    ) : weekend && !cleaningDay ? (
                      <span className="font-body mt-0.5 text-[9px] text-[color:var(--tu-text-faint)] sm:mt-1 sm:text-[10px] md:text-xs">
                        —
                      </span>
                    ) : null}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </div>
      <p className="font-body mt-3 px-1 text-center text-xs text-[color:var(--tu-text-muted)] sm:mt-4 sm:text-sm">
        Fines de semana resaltados; iniciales en días de limpieza (sábado y domingo).
      </p>
    </div>
  )
}
