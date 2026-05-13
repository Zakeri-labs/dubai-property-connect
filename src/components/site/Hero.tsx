import { useT } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { PillButton } from "./PillButton";
import heroImg from "@/assets/hero-dubai.jpg";
import { ShieldCheck, Building2, Languages, Home } from "lucide-react";

export function Hero() {
  const { t, lang } = useT();
  const badgeIcons = [ShieldCheck, Building2, Languages, Home];

  return (
    <section className="px-3 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-contrast text-contrast-foreground shadow-card">
        <div className="relative">
          <img
            src={heroImg}
            alt="Dubai skyline at golden hour"
            width={1920}
            height={1080}
            className="h-[78vh] min-h-[560px] w-full object-cover opacity-85 transition-transform duration-[2000ms] hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-contrast/30 via-contrast/20 to-contrast/85" />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 py-10 sm:px-12 sm:py-14">
              <div className="mx-auto max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-contrast/40 px-3 py-1 text-xs text-gold backdrop-blur">
                  {t.hero.eyebrow}
                </div>
                <h1 className="text-balance font-serif text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {t.hero.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-contrast-foreground/80 sm:text-lg">
                  {t.hero.subtitle}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <PillButton href={waLink(t.hero.waMessage)} external variant="gold">
                    {t.cta.consultation}
                  </PillButton>
                  <PillButton to={`/${lang}/projects`} variant="secondary" className="!bg-transparent !border-contrast-foreground/30 !text-contrast-foreground hover:!bg-contrast-foreground/10">
                    {t.cta.viewProjects}
                  </PillButton>
                </div>

                <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                  {t.hero.badges.map((b, i) => {
                    const Icon = badgeIcons[i] ?? ShieldCheck;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-2xl border border-contrast-foreground/15 bg-contrast/40 px-3 py-2.5 text-xs text-contrast-foreground/85 backdrop-blur"
                      >
                        <Icon className="h-4 w-4 text-gold" />
                        <span className="leading-tight">{b}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
