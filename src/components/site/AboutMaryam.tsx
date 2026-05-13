import { useT } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { PillButton } from "./PillButton";
import portrait from "@/assets/maryam-portrait.jpg";
import { CONTACT } from "@/lib/contact";

export function AboutMaryam() {
  const { t } = useT();
  return (
    <section className="mt-24 bg-contrast py-20 text-contrast-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-contrast-foreground/10">
            <img
              src={portrait}
              alt="Maryam Alblushi portrait"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
            {t.about.eyebrow}
          </div>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">{t.about.title}</h2>
          {t.about.body.map((p, i) => (
            <p key={i} className="mt-4 max-w-2xl text-base leading-8 text-contrast-foreground/80">{p}</p>
          ))}

          <ul className="mt-6 space-y-2">
            {t.about.values.map((v, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-contrast-foreground/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {v}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {t.about.stats.map((s, i) => (
              <div key={i} className="rounded-2xl border border-contrast-foreground/15 bg-contrast/40 p-4">
                <div className="text-xs text-contrast-foreground/60">{s.label}</div>
                <div className="mt-1 font-serif text-lg text-gold">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton href={waLink(t.hero.waMessage)} external variant="gold">
              {t.cta.consultation}
            </PillButton>
            <PillButton href={CONTACT.instagram} external variant="secondary" className="!bg-transparent !border-contrast-foreground/30 !text-contrast-foreground">
              @albluchi.maryam
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
