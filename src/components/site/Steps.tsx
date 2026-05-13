import { useT } from "@/lib/i18n";
import { SectionTitle } from "./GoalCards";
import { Info } from "lucide-react";

export function ResidencySteps() {
  const { t } = useT();
  return (
    <section className="mx-auto mt-20 max-w-6xl px-3 sm:px-6">
      <SectionTitle eyebrow={t.nav.residency} title={t.residency.title} subtitle={t.residency.subtitle} />
      <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {t.residency.steps.map((s, i) => (
          <li key={i} className="flex flex-col rounded-3xl border border-border bg-surface p-5 shadow-soft">
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-serif text-sm text-background">
              {i + 1}
            </span>
            <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-start gap-2 rounded-2xl border border-border bg-accent/40 p-4 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>{t.residency.disclaimer}</p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useT();
  return (
    <section className="mx-auto mt-20 max-w-6xl px-3 sm:px-6">
      <SectionTitle eyebrow="" title={t.how.title} />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.how.steps.map((s, i) => (
          <div key={i} className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
            <div className="font-serif text-3xl text-gold">0{i + 1}</div>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
