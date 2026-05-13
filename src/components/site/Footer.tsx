import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const { t, lang } = useT();
  return (
    <footer className="mt-16 border-t border-border bg-contrast text-contrast-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl">
            {lang === "fa" ? "مریم البلوشی" : "مريم البلوشي"}
          </div>
          <p className="mt-3 max-w-md text-sm leading-7 text-contrast-foreground/70">
            {t.footer.tagline}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-contrast-foreground/20 px-3 py-1 text-xs text-contrast-foreground/80">
            RERA BRN: {CONTACT.brn}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-contrast-foreground">
            {t.footer.sections.links}
          </h3>
          <ul className="space-y-2 text-sm text-contrast-foreground/70">
            <li><Link to={`/${lang}/projects`} className="hover:text-gold">{t.nav.projects}</Link></li>
            <li><Link to={`/${lang}/dubai-residency-property`} className="hover:text-gold">{t.nav.residency}</Link></li>
            <li><Link to={`/${lang}/about`} className="hover:text-gold">{t.nav.about}</Link></li>
            <li><Link to={`/${lang}/faq`} className="hover:text-gold">{t.nav.faq}</Link></li>
            <li><Link to={`/${lang}/contact`} className="hover:text-gold">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-contrast-foreground">
            {t.footer.sections.contact}
          </h3>
          <ul className="space-y-2 text-sm text-contrast-foreground/70">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />{CONTACT.city}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{CONTACT.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{CONTACT.email}</li>
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-gold">
                <Instagram className="h-4 w-4" /> @albluchi.maryam
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-contrast-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-contrast-foreground/60 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{t.footer.legal}</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
