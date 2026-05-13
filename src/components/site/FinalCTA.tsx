import { useT } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { PillButton } from "./PillButton";

export function FinalCTA() {
  const { t, lang } = useT();
  return (
    <section className="mx-auto mt-24 max-w-6xl px-3 sm:px-6">
      <div className="overflow-hidden rounded-[2rem] bg-contrast p-10 text-center text-contrast-foreground sm:p-16">
        <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">{t.finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-contrast-foreground/75">{t.finalCta.subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PillButton href={waLink(t.hero.waMessage)} external variant="gold">{t.cta.whatsapp}</PillButton>
          <PillButton to={`/${lang}/contact`} variant="secondary" className="!bg-transparent !border-contrast-foreground/30 !text-contrast-foreground">
            {t.cta.consultation}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
