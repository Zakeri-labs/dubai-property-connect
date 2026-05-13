import { useT } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/contact";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";

export function StickyMobileBar() {
  const { t, lang } = useT();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={waLink(t.hero.waMessage)}
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-primary py-2 text-[11px] font-medium text-primary-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          {t.cta.whatsapp}
        </a>
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl border border-border bg-background py-2 text-[11px] font-medium text-foreground"
        >
          <Phone className="h-4 w-4" />
          {t.cta.call}
        </a>
        <Link
          to={`/${lang}/contact`}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-foreground py-2 text-[11px] font-medium text-background"
        >
          <CalendarCheck className="h-4 w-4" />
          {t.cta.consultation}
        </Link>
      </div>
    </div>
  );
}
