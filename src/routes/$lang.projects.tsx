import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useT, dictionaries, isLang } from "@/lib/i18n";
import { ProjectCard } from "@/components/site/Projects";
import { SectionTitle } from "@/components/site/GoalCards";

export const Route = createFileRoute("/$lang/projects")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "fa";
    const t = dictionaries[lang];
    return {
      meta: [
        { title: t.meta.projects.title },
        { name: "description", content: t.meta.projects.description },
        { property: "og:title", content: t.meta.projects.title },
        { property: "og:description", content: t.meta.projects.description },
      ],
    };
  },
  component: ProjectsPage,
});

const TYPES = ["all", "villa", "apartment", "townhouse", "land"] as const;
const CITIES = ["all", "dubai", "sharjah"] as const;

function ProjectsPage() {
  const { t } = useT();
  const [type, setType] = useState<(typeof TYPES)[number]>("all");
  const [city, setCity] = useState<(typeof CITIES)[number]>("all");

  const items = t.projects.list.filter(
    (p) => (type === "all" || p.type === type) && (city === "all" || p.city === city),
  );

  return (
    <div className="px-3 pt-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.nav.projects} title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.projects.filtersLabel}:</span>
          {TYPES.map((v) => (
            <Pill key={v} active={type === v} onClick={() => setType(v)}>
              {v === "all" ? t.projects.filters.all : (t.projects.filters as Record<string, string>)[v]}
            </Pill>
          ))}
          <span className="mx-2 h-4 w-px bg-border" />
          {CITIES.map((v) => (
            <Pill key={v} active={city === v} onClick={() => setCity(v)}>
              {v === "all" ? t.projects.filters.all : (t.projects.filters as Record<string, string>)[v]}
            </Pill>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
        {items.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">—</p>
        )}
      </div>
    </div>
  );
}

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors " +
        (active ? "bg-foreground text-background" : "border border-border bg-surface text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
