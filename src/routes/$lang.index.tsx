import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { GoalCards } from "@/components/site/GoalCards";
import { FeaturedProjects } from "@/components/site/Projects";
import { ResidencySteps, HowItWorks } from "@/components/site/Steps";
import { AboutMaryam } from "@/components/site/AboutMaryam";
import { Testimonials } from "@/components/site/Testimonials";
import { LeadMagnet } from "@/components/site/LeadMagnet";
import { FAQ } from "@/components/site/FAQ";
import { BlogPreview } from "@/components/site/BlogPreview";
import { FinalCTA } from "@/components/site/FinalCTA";
import { dictionaries, isLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "fa";
    const t = dictionaries[lang];
    return {
      meta: [
        { title: t.meta.home.title },
        { name: "description", content: t.meta.home.description },
        { property: "og:title", content: t.meta.home.title },
        { property: "og:description", content: t.meta.home.description },
        { property: "og:locale", content: lang === "fa" ? "fa_IR" : "ar_AE" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Maryam Alblushi",
            description: t.meta.home.description,
            areaServed: ["Dubai", "United Arab Emirates"],
            knowsLanguage: ["fa", "ar"],
            telephone: CONTACT.phone,
            email: CONTACT.email,
            sameAs: [CONTACT.instagram],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
            identifier: { "@type": "PropertyValue", name: "RERA BRN", value: CONTACT.brn },
          }),
        },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <GoalCards />
      <FeaturedProjects />
      <ResidencySteps />
      <HowItWorks />
      <AboutMaryam />
      <Testimonials />
      <LeadMagnet />
      <FAQ />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
