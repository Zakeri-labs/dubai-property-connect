import { useT } from "@/lib/i18n";
import { KeyRound, TrendingUp, Home, Building, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const ICONS = [KeyRound, TrendingUp, Home, Building, MapPin];

export function GoalCards() {
  const { t, lang } = useT();
  return (
    <section className="mx-auto mt-20 max-w-6xl px-3 sm:px-6">
      <SectionTitle eyebrow={t.nav.projects} title={t.goals.title} subtitle={t.goals.subtitle} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.goals.cards.map((c, i) => {
          const Icon = ICONS[i] ?? Home;
          return (
            <Link
              key={i}
              to={`/${lang}/projects`}
              className="group flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">{c.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {t.cta.details} <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, subtitle, center }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-7 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
