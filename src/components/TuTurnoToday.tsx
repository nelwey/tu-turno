import type { Cleaner } from '#/lib/schedule'
import {
  getCleanerForDate,
  getNextCleaningSaturday,
  isCleaningSaturday,
} from '#/lib/schedule'

function CleanerVideo({ cleaner }: { cleaner: Cleaner }) {
  return (
    <div className="rise-in mx-auto mt-6 flex w-full justify-center px-2 sm:mt-8 sm:px-0">
      <div className="relative w-full max-w-[min(100%,min(85vw,280px))] overflow-hidden rounded-2xl border-2 border-[var(--neon)] shadow-[0_0_40px_rgba(0,255,209,0.25)] sm:max-w-[min(100%,320px)] md:max-w-[360px]">
        <div
          className="relative w-full overflow-hidden rounded-[inherit]"
          style={{ aspectRatio: '9 / 16' }}
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={cleaner.videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
          <p className="font-display absolute bottom-2 left-1/2 z-20 w-[calc(100%-1rem)] -translate-x-1/2 text-center text-2xl leading-tight tracking-[0.12em] text-white uppercase drop-shadow-[0_0_12px_rgba(0,255,209,0.9)] sm:bottom-3 sm:text-3xl md:text-4xl">
            {cleaner.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TuTurnoToday() {
  const today = new Date()
  let mode: 'turn' | 'chill' = 'chill'
  let cleaner: Cleaner | null = null
  let nextVictim = null as ReturnType<typeof getCleanerForDate>

  if (isCleaningSaturday(today)) {
    const c = getCleanerForDate(today)
    if (c) {
      mode = 'turn'
      cleaner = c
    }
  }
  if (mode === 'chill') {
    const nextSat = getNextCleaningSaturday(today)
    nextVictim = getCleanerForDate(nextSat)
  }

  return (
    <div className="rise-in px-1 text-center sm:px-0">
      {mode === 'turn' && cleaner ? (
        <>
          <p className="font-display mb-3 max-w-[22rem] text-3xl leading-[0.95] text-[var(--neon)] sm:max-w-none sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl">
            ¡HOY TE TOCA LIMPIAR!
            <br />
            <span className="text-[color:var(--tu-text)]">SÍ, TÚ</span>
          </p>
          <p className="font-body px-2 text-base text-[color:var(--tu-text-muted)] sm:text-lg md:text-xl">
            Turno de{' '}
            <span className="font-semibold text-[var(--neon2)]">{cleaner.name}</span>
          </p>
          <CleanerVideo cleaner={cleaner} />
        </>
      ) : (
        <>
          <p className="font-display mb-3 px-2 text-3xl leading-tight text-[color:var(--tu-text)] sm:text-5xl md:text-6xl">
            Tranqui. Hoy no toca limpiar{' '}
            <span className="inline-block animate-[wiggle_2.5s_ease-in-out_infinite]">
              😎
            </span>
          </p>
          <p className="font-body px-2 text-lg text-[color:var(--tu-text-muted)] sm:text-xl md:text-2xl">
            Próxima víctima:{' '}
            <span className="font-semibold text-[var(--neon)]">
              {nextVictim?.name ?? '—'}
            </span>
          </p>
        </>
      )}
    </div>
  )
}
