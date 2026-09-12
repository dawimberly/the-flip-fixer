import { Link, useRouterState } from "@tanstack/react-router";
import { COMPANY } from "@/lib/estimator";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Job" },
  { to: "/interior", label: "Interior" },
  { to: "/exterior", label: "Exterior" },
] as const;

export function AppNav({ end }: { end?: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-ink font-display text-sm font-medium text-ink-foreground">
            {COMPANY.mark}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-base font-medium tracking-tight sm:text-lg">{COMPANY.name}</p>
            <p className="truncate text-xs text-muted">{COMPANY.tagline}</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 rounded-full bg-surface p-1">
          {LINKS.map((link) => {
            const on = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "h-8 rounded-full px-3 text-xs transition-colors duration-150 sm:px-4 sm:text-sm",
                  on ? "bg-ink text-ink-foreground" : "text-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        {end}
      </div>
    </header>
  );
}
