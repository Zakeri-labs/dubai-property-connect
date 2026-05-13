import { useT } from "@/lib/i18n";
import { LeadForm } from "./LeadForm";
import { SectionTitle } from "./GoalCards";
import { FileText } from "lucide-react";

export function LeadMagnet() {
  const { t } = useT();
  return (
    <section className="mx-auto mt-24 max-w-6xl px-3 sm:px-6">
      <div className="grid gap-8 rounded-[2rem] border border-border bg-accent/40 p-6 shadow-soft md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs text-gold-foreground">
            <FileText className="h-3.5 w-3.5" /> PDF
          </div>
          <SectionTitle title={t.leadMagnet.title} subtitle={t.leadMagnet.subtitle} />
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
