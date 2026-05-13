import { useT } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./GoalCards";

export function BlogPreview() {
  const { t, lang } = useT();
  return (
    <section className="mx-auto mt-24 max-w-6xl px-3 sm:px-6">
      <SectionTitle title={t.blog.title} />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.blog.posts.map((post) => (
          <Link
            key={post.slug}
            to={`/${lang}/blog`}
            className="group flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.nav.blog}</div>
            <h3 className="mt-2 font-serif text-xl text-foreground">{post.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
              {t.cta.details} <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
