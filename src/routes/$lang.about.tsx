import { createFileRoute } from "@tanstack/react-router";
import { AboutMaryam } from "@/components/site/AboutMaryam";
import { Testimonials } from "@/components/site/Testimonials";
import { FinalCTA } from "@/components/site/FinalCTA";
import { dictionaries, isLang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "fa";
    const t = dictionaries[lang];
    return {
      meta: [
        { title: t.meta.about.title },
        { name: "description", content: t.meta.about.description },
        { property: "og:title", content: t.meta.about.title },
        { property: "og:description", content: t.meta.about.description },
      ],
    };
  },
  component: () => (
    <div className="pt-6">
      <AboutMaryam />
      <Testimonials />
      <FinalCTA />
    </div>
  ),
});
