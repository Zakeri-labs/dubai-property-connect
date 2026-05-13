import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { dictionaries, isLang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/faq")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "fa";
    const t = dictionaries[lang];
    return {
      meta: [
        { title: t.meta.faq.title },
        { name: "description", content: t.meta.faq.description },
        { property: "og:title", content: t.meta.faq.title },
        { property: "og:description", content: t.meta.faq.description },
      ],
    };
  },
  component: () => (
    <div className="pt-6">
      <FAQ />
      <FinalCTA />
    </div>
  ),
});
