import { Link } from "@tanstack/react-router";
import { useT, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "./LangSwitcher";
import { waLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function Header() {
  const { t, lang } = useT();
  const navItems = [
    { to: `/${lang}`, label: t.nav.home, exact: true },
    { to: `/${lang}/projects`, label: t.nav.projects },
    { to: `/${lang}/dubai-residency-property`, label: t.nav.residency },
    { to: `/${lang}/about`, label: t.nav.about },
    { to: `/${lang}/blog`, label: t.nav.blog },
    { to: `/${lang}/faq`, label: t.nav.faq },
    { to: `/${lang}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-3 z-40 mx-auto w-full max-w-6xl px-3 sm:px-6">
      <nav className="flex items-center justify-between gap-2 rounded-full border border-border/60 bg-surface/85 px-3 py-2 shadow-soft backdrop-blur-md">
        <Link
          to={`/${lang as Lang}`}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-foreground"
        >
          <span className="font-serif text-base tracking-tight">
            {lang === "fa" ? "مریم البلوشی" : "مريم البلوشي"}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              activeProps={{ className: "bg-foreground text-background" }}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <a
            href={waLink(t.hero.waMessage)}
            target="_blank"
            rel="noopener"
            aria-label={t.cta.whatsapp}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
