import { useT } from "@/lib/i18n";
import { SectionTitle } from "./GoalCards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const { t } = useT();
  return (
    <section className="mx-auto mt-24 max-w-3xl px-3 sm:px-6">
      <SectionTitle title={t.faq.title} center />
      <Accordion type="single" collapsible className="mt-10 rounded-3xl border border-border bg-surface px-2 shadow-soft">
        {t.faq.items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="px-4 text-start text-base font-medium text-foreground">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm leading-7 text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
