import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, Users, Zap } from 'lucide-react'

import TuTurnoCalendar from '#/components/TuTurnoCalendar'
import TuTurnoParticipants from '#/components/TuTurnoParticipants'
import TuTurnoToday from '#/components/TuTurnoToday'
import VideoCacheWarmup from '#/components/VideoCacheWarmup'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="page-wrap w-full max-w-[1200px] px-3 pb-12 pt-8 sm:px-4 sm:pb-16 sm:pt-10 md:pt-14">
      <VideoCacheWarmup />
      <header className="mb-8 text-center sm:mb-10">
        <p className="font-body mb-2 text-xs font-medium tracking-[0.25em] text-[var(--neon)] uppercase sm:text-sm">
          Habitación 911
        </p>
        <h1 className="font-display text-5xl leading-none tracking-[0.06em] text-[color:var(--tu-text)] sm:text-7xl md:text-8xl">
          TU TURNO
        </h1>
        <p className="font-body mx-auto mt-3 max-w-xl px-2 text-sm leading-snug text-[color:var(--tu-text-muted)] sm:mt-4 sm:text-base md:text-lg">
          Rotación de limpieza los sábados: mismo orden cada cinco semanas. Ojo
          al charco.
        </p>
      </header>

      <Tabs defaultValue="today" className="w-full min-w-0">
        <TabsList
          variant="line"
          className="mx-auto mb-8 grid h-auto min-h-11 w-full max-w-lg grid-cols-3 gap-1 rounded-full border border-[var(--line)] bg-white/75 p-1 shadow-[0_0_24px_rgba(0,255,209,0.12)] dark:border-white/10 dark:bg-black/40 sm:mb-10 sm:min-h-12 sm:max-w-2xl sm:gap-0 sm:p-1"
        >
          <TabsTrigger
            value="today"
            className="flex min-h-10 flex-row items-center justify-center gap-1 rounded-full px-1.5 py-2 font-display text-xs tracking-wide data-[state=active]:bg-[var(--neon)]/15 data-[state=active]:text-[var(--neon)] sm:min-h-11 sm:gap-1.5 sm:px-3 sm:text-base md:text-lg"
          >
            <Zap className="size-3.5 shrink-0 opacity-80 sm:size-4" aria-hidden />
            <span className="max-w-[4.5rem] truncate sm:max-w-none">Hoy</span>
          </TabsTrigger>
          <TabsTrigger
            value="calendar"
            className="flex min-h-10 flex-row items-center justify-center gap-1 rounded-full px-1.5 py-2 font-display text-xs tracking-wide data-[state=active]:bg-[var(--neon)]/15 data-[state=active]:text-[var(--neon)] sm:min-h-11 sm:gap-1.5 sm:px-3 sm:text-base md:text-lg"
          >
            <CalendarDays className="size-3.5 shrink-0 opacity-80 sm:size-4" aria-hidden />
            <span className="max-w-[5rem] truncate sm:max-w-none">Calendario</span>
          </TabsTrigger>
          <TabsTrigger
            value="participants"
            className="flex min-h-10 flex-row items-center justify-center gap-1 rounded-full px-1.5 py-2 font-display text-xs tracking-wide data-[state=active]:bg-[var(--neon)]/15 data-[state=active]:text-[var(--neon)] sm:min-h-11 sm:gap-1.5 sm:px-3 sm:text-base md:text-lg"
          >
            <Users className="size-3.5 shrink-0 opacity-80 sm:size-4" aria-hidden />
            <span className="max-w-[5.5rem] truncate sm:max-w-none">Participantes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="rise-in min-w-0">
          <TuTurnoToday />
        </TabsContent>
        <TabsContent value="calendar" className="rise-in min-w-0">
          <TuTurnoCalendar />
        </TabsContent>
        <TabsContent value="participants" className="rise-in min-w-0">
          <TuTurnoParticipants />
        </TabsContent>
      </Tabs>
    </main>
  )
}
