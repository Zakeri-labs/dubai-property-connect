import { useT } from "@/lib/i18n";
import { Award, MapPin, Home, Wallet, KeyRound, Languages } from "lucide-react";

const ICONS = [Award, MapPin, Home, Wallet, KeyRound, Languages];

export function TrustBar() {
  const { t } = useT();
  return (
    <section className="mx-auto mt-5 max-w-6xl px-3 sm:px-6">
      <div className="rounded-3xl border border-border bg-surface px-4 py-5 shadow-soft">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {t.trust.items.map((label, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                <span className="leading-tight">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
