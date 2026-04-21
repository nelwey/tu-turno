export type Cleaner = {
  id: string
  name: string
  initial: string
  videoSrc: string
}

/** Order matches rotating Saturdays starting 2026-04-11 (Roberto). */
export const CLEANERS: Cleaner[] = [
  {
    id: 'roberto',
    name: 'Roberto',
    initial: 'R',
    videoSrc: '/videos/roberto.mp4',
  },
  {
    id: 'andres',
    name: 'Andres',
    initial: 'A',
    videoSrc: '/videos/andres.mp4',
  },
  {
    id: 'nicolas',
    name: 'Nicolas',
    initial: 'N',
    videoSrc: '/videos/nicolas.mp4',
  },
  {
    id: 'danilo',
    name: 'Danilo',
    initial: 'D',
    videoSrc: '/videos/danilo.mp4',
  },
  {
    id: 'jafet',
    name: 'Jafet',
    initial: 'J',
    videoSrc: '/videos/jafet.mp4',
  },
]

const ANCHOR = new Date(2026, 3, 11)

function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Cleaning days are weekends (Saturday or Sunday). */
export function isCleaningDay(d: Date): boolean {
  const day = d.getDay()
  return day === 0 || day === 6
}

function weekIndexSinceAnchor(d: Date): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const diff = startOfLocalDay(d).getTime() - startOfLocalDay(ANCHOR).getTime()
  return Math.floor(diff / msPerWeek)
}

/**
 * Returns the assigned cleaner for `date` when it falls on a cleaning weekend day;
 * otherwise `null`.
 */
export function getCleanerForDate(date: Date): Cleaner | null {
  if (!isCleaningDay(date)) return null
  const w = weekIndexSinceAnchor(date)
  const n = CLEANERS.length
  const i = ((w % n) + n) % n
  return CLEANERS[i]!
}

/** Upcoming cleaning day from `from` (same day if weekend). */
export function getNextCleaningDay(from: Date = new Date()): Date {
  const cur = startOfLocalDay(from)
  const dow = cur.getDay()
  if (dow === 6 || dow === 0) return cur
  const daysUntilSat = (6 - dow + 7) % 7
  const next = new Date(cur)
  next.setDate(cur.getDate() + daysUntilSat)
  return next
}
