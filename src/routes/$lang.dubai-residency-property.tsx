import { createFileRoute } from "@tanstack/react-router";
import { ResidencySteps, HowItWorks } from "@/components/site/Steps";
import { LeadMagnet } from "@/components/site/LeadMagnet";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { dictionaries, isLang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/dubai-residency-property")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "fa";
    const t = dictionaries[lang];
    return {
      meta: [
        { title: t.meta.residency.title },
        { name: "description", content: t.meta.residency.description },
        { property: "og:title", content: t.meta.residency.title },
        { property: "og:description", content: t.meta.residency.description },
      ],
    };
  },
  component: () => (
    <div className="pt-6">
      <ResidencySteps />
      <HowItWorks />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
    </div>
  ),
});
