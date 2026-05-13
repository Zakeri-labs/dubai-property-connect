import { createFileRoute } from "@tanstack/react-router";
import { useT, dictionaries, isLang } from "@/lib/i18n";
import { SectionTitle } from "@/components/site/GoalCards";
import { LeadForm } from "@/components/site/LeadForm";
import { CONTACT } from "@/lib/contact";
import { waLink } from "@/lib/whatsapp";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "fa";
    const t = dictionaries[lang];
    return {
      meta: [
        { title: t.meta.contact.title },
        { name: "description", content: t.meta.contact.description },
        { property: "og:title", content: t.meta.contact.title },
        { property: "og:description", content: t.meta.contact.description },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { t } = useT();
  return (
    <div className="px-3 pt-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionTitle eyebrow={t.nav.contact} title={t.cta.consultation} subtitle={t.leadMagnet.subtitle} />
          <ul className="mt-8 space-y-3 text-sm">
            <Item icon={MessageCircle} label={t.cta.whatsapp} href={waLink(t.hero.waMessage)} />
            <Item icon={Phone} label={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} />
            <Item icon={Mail} label={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            <Item icon={Instagram} label="@albluchi.maryam" href={CONTACT.instagram} />
            <li className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{CONTACT.city}</li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <LeadForm />
        </div>
      </div>
    </div>
  );
}

function Item({ icon: Icon, label, href }: { icon: React.ComponentType<{ className?: string }>; label: string; href: string }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-foreground hover:bg-accent">
        <Icon className="h-4 w-4 text-primary" /> {label}
      </a>
    </li>
  );
}
