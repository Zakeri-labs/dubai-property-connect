import { useT } from "@/lib/i18n";
import { SectionTitle } from "./GoalCards";
import { Quote } from "lucide-react";

export function Testimonials() {
  const { t } = useT();
  return (
    <section className="mx-auto mt-24 max-w-6xl px-3 sm:px-6">
      <SectionTitle title={t.testimonials.title} />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.testimonials.items.map((q, i) => (
          <figure key={i} className="flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft">
            <Quote className="h-6 w-6 text-gold" />
            <blockquote className="mt-3 flex-1 text-sm leading-7 text-foreground">
              {q.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4 text-xs">
              <div className="font-semibold text-foreground">{q.name}</div>
              <div className="text-muted-foreground">{q.country} — {q.property}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
