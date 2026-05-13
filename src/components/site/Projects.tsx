import { useT } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { ArrowUpRight, MapPin, Tag, ShieldCheck } from "lucide-react";
import { SectionTitle } from "./GoalCards";

type Project = {
  slug: string;
  name: string;
  type: string;
  city: string;
  location: string;
  startingPrice: string;
  downPayment: string;
  paymentPlan: string;
  handover: string;
  developer: string;
  residencyEligible: boolean;
  image: string;
  badges: string[];
};

export function ProjectCard({ p, compact = false }: { p: Project; compact?: boolean }) {
  const { t } = useT();
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
          {p.badges.slice(0, 3).map((b) => (
            <span key={b} className="rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />{p.location}
        </div>

        {!compact && (
          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            <Field label={t.projects.fields.startingPrice} value={p.startingPrice} />
            <Field label={t.projects.fields.downPayment} value={p.downPayment} />
            <Field label={t.projects.fields.paymentPlan} value={p.paymentPlan} />
            <Field label={t.projects.fields.handover} value={p.handover} />
          </dl>
        )}

        {p.residencyEligible && (
          <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-primary">
            <ShieldCheck className="h-3 w-3" /> {t.projects.fields.residency}
          </div>
        )}

        <a
          href={waLink(t.projects.waMessage(p.name))}
          target="_blank"
          rel="noopener"
          className="mt-5 inline-flex items-center justify-between gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.01]"
        >
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            {t.cta.getPrice}
          </span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function FeaturedProjects() {
  const { t, lang } = useT();
  const featured = t.projects.list.slice(0, 3);
  return (
    <section className="mx-auto mt-20 max-w-6xl px-3 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle eyebrow={t.nav.projects} title={t.projects.title} subtitle={t.projects.subtitle} />
        <a
          href={`/${lang}/projects`}
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          {t.cta.viewProjects} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}
