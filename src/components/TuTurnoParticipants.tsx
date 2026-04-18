import { CLEANERS } from '#/lib/schedule'

function ParticipantVideo({
  src,
  name,
  initial,
}: {
  src: string
  name: string
  initial: string
}) {
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,280px)] sm:max-w-[240px] lg:max-w-[220px] xl:max-w-[200px] 2xl:max-w-[190px]">
      <div
        className="relative w-full overflow-hidden rounded-2xl border-2 border-[var(--neon)]/45 shadow-[0_0_28px_rgba(0,255,209,0.2)]"
        style={{ aspectRatio: '9 / 16' }}
      >
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          aria-label={`Animación de ${name}`}
        />
        <span className="font-display absolute left-2 top-2 z-20 rounded-lg border border-[var(--neon)]/70 bg-black/55 px-2 py-1 text-lg leading-none text-[var(--neon)] shadow-[0_0_12px_rgba(0,255,209,0.4)] sm:left-2.5 sm:top-2.5 sm:text-xl">
          {initial}
        </span>
      </div>
    </div>
  )
}

export default function TuTurnoParticipants() {
  return (
    <div className="rise-in mx-auto w-full max-w-6xl px-0">
      <p className="font-body mb-8 text-center text-sm leading-relaxed text-white/60 sm:mb-10 sm:text-base">
        Estas son las personas en la rotación de los sábados. El orden se repite
        cada cinco semanas — cada una con su animación.
      </p>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-5 xl:gap-4 2xl:gap-6">
        {CLEANERS.map((person, i) => (
          <li
            key={person.id}
            className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/35 p-4 shadow-[0_0_24px_rgba(0,255,209,0.06)] backdrop-blur-sm sm:p-5"
          >
            <ParticipantVideo
              src={person.videoSrc}
              name={person.name}
              initial={person.initial}
            />
            <div className="mt-4 w-full text-center">
              <p className="font-display m-0 text-2xl tracking-wide text-white sm:text-3xl">
                {person.name}
              </p>
              <p className="font-body m-0 mt-1 text-sm text-white/45 sm:text-base">
                #{i + 1} en la rotación
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
