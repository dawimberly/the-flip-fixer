import { useState } from "react";
import { AppNav } from "@/components/app-nav";
import { OpeningsTool, type OpeningLine } from "@/components/openings-tool";
import { PRICE_AS_OF } from "@/lib/estimator";

export function InteriorTools() {
  const [openings, setOpenings] = useState<OpeningLine[]>([]);
  return (
    <div className="app-shell min-h-dvh w-full max-w-full overflow-x-clip pb-10">
      <AppNav />
      <main className="mx-auto grid w-full min-w-0 max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="space-y-5">
          <section className="rounded-xl bg-card px-5 py-6 shadow-border sm:px-8 sm:py-8">
            <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
              Interior tool · {PRICE_AS_OF}
            </p>
            <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">Inside the house.</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Doors, windows, casing. The rooms still live on the job page. This floor is for the openings that punch through a wall.
            </p>
          </section>
          <section className="rounded-xl bg-card p-4 shadow-border sm:p-6">
            <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">Windows & doors</p>
            <h2 className="mt-1 font-display text-xl font-medium tracking-tight">What are we replacing?</h2>
            <div className="mt-5">
              <OpeningsTool surface="interior" lines={openings} onChange={setOpenings} />
            </div>
          </section>
        </div>
        <aside className="rounded-xl bg-ink p-5 text-ink-foreground shadow-border sm:p-6 lg:sticky lg:top-24">
          <p className="text-[11px] font-medium tracking-[0.18em] text-ink-foreground/60 uppercase">This walk</p>
          <p className="mt-2 font-display text-4xl font-medium tabular-nums">{openings.length}</p>
          <p className="mt-1 text-sm text-ink-foreground/70">openings counted</p>
          <ul className="mt-5 space-y-2 text-sm text-ink-foreground/80">
            <li>Interior doors and bifolds.</li>
            <li>Window treatments and sizes.</li>
            <li>Same openings can be logged on Exterior if they face the street.</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
