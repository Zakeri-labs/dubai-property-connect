import { createFileRoute } from "@tanstack/react-router";
import { useT, dictionaries, isLang } from "@/lib/i18n";
import { SectionTitle } from "@/components/site/GoalCards";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/$lang/blog")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "fa";
    const t = dictionaries[lang];
    return {
      meta: [
        { title: t.meta.blog.title },
        { name: "description", content: t.meta.blog.description },
        { property: "og:title", content: t.meta.blog.title },
        { property: "og:description", content: t.meta.blog.description },
      ],
    };
  },
  component: BlogPage,
});

function BlogPage() {
  const { t } = useT();
  return (
    <div className="px-3 pt-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.nav.blog} title={t.blog.title} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.blog.posts.map((p) => (
            <article key={p.slug} className="flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.nav.blog}</div>
              <h2 className="mt-2 font-serif text-xl text-foreground">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                {t.cta.details} <ArrowUpRight className="h-4 w-4" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
