import { Link, useLocation } from "@tanstack/react-router";
import { useLang, LANGS } from "@/lib/i18n";

export function LangSwitcher() {
  const current = useLang();
  const location = useLocation();
  // path looks like /fa/... swap leading segment
  const rest = location.pathname.replace(/^\/(fa|ar)/, "") || "";

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/50 p-0.5 text-xs">
      {LANGS.map((l) => {
        const target = `/${l}${rest}`;
        const active = current === l;
        return (
          <Link
            key={l}
            to={target}
            className={
              "rounded-full px-2.5 py-1 font-medium uppercase tracking-wider transition-colors " +
              (active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
