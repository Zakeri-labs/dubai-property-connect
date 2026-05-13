import { createFileRoute } from "@tanstack/react-router";
import { useT, dictionaries, isLang } from "@/lib/i18n";
import { SectionTitle } from "@/components/site/GoalCards";
import { Play } from "lucide-react";
import villaThumb from "@/assets/2.jpg";
import apartmentThumb from "@/assets/3.jpg";
import oneThumb from "@/assets/1.jpg";

const BLOG_REEL_URLS = [
  "https://www.instagram.com/reel/DYMXYNPsiSo/",
  "https://www.instagram.com/reel/DYIIa63scTH/",
  "https://www.instagram.com/reel/DYO3nlZMSmF/",
] as const;

const BLOG_THUMBNAILS = [oneThumb, villaThumb, apartmentThumb] as const;

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
  const { t, lang } = useT();
  const videoLabel = lang === "fa" ? "ویدیو" : "فيديو";
  const watchCta = lang === "fa" ? "مشاهده ویدیو" : "مشاهدة الفيديو";
  const posts = t.blog.posts.slice(0, 3);

  return (
    <div className="px-3 pt-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.nav.blog} title={t.blog.title} />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {posts.map((p, i) => {
            const reelUrl = BLOG_REEL_URLS[i];
            const thumbSrc = BLOG_THUMBNAILS[i];
            const thumbAlt =
              lang === "fa"
                ? `پیش‌نمایش ویدیو: ${p.title}`
                : `معاينة الفيديو: ${p.title}`;

            return (
              <article
                key={p.slug}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/90 bg-card shadow-soft"
              >
                <a
                  href={reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${watchCta}: ${p.title}`}
                  className="group/thumb relative aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <img
                    src={thumbSrc}
                    alt={thumbAlt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    width={800}
                    height={450}
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10"
                    aria-hidden
                  />
                  <span
                    className="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-[2px]"
                    aria-hidden
                  >
                    <Play className="h-3.5 w-3.5 fill-white text-white" />
                    {videoLabel}
                  </span>
                  <span
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 text-primary shadow-lg ring-2 ring-white/50 transition-transform duration-300 group-hover/thumb:scale-110">
                      <Play className="ms-0.5 h-6 w-6 fill-primary text-primary" />
                    </span>
                  </span>
                </a>
                <div className="flex flex-1 flex-col bg-surface p-5 sm:p-6">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground">{videoLabel}</p>
                  <h3 className="mt-2 font-serif text-xl leading-snug text-foreground">{p.title}</h3>
                  <p className="mt-2 min-h-[4.5rem] flex-1 text-start text-sm leading-7 text-muted-foreground line-clamp-3">
                    {p.excerpt}
                  </p>
                  <a
                    href={reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
                  >
                    {watchCta}
                    <Play className="h-4 w-4 fill-primary opacity-90" aria-hidden />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
