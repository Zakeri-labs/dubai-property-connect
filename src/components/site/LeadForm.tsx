import { useT, type Lang } from "@/lib/i18n";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/lead.functions";
import { waLink } from "@/lib/whatsapp";
import { PillButton } from "./PillButton";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  whatsapp: z.string().trim().min(5).max(30).regex(/^[+\d\s\-()]+$/),
  country: z.string().trim().min(1).max(60),
  budget: z.string().min(1),
  goal: z.string().min(1),
  language: z.enum(["fa", "ar"]),
  message: z.string().trim().max(1000).optional(),
});
type FormValues = z.infer<typeof schema>;

export function LeadForm({ variant = "card" }: { variant?: "card" | "inline" }) {
  const { t, lang } = useT();
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const submit = useServerFn(submitLead);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { language: lang as Lang, budget: t.form.budgets[0], goal: t.form.goals[0] },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submit({ data: values });
      const msg = t.form.waMessage(values.name, values.country, values.budget, values.goal);
      setWaUrl(waLink(msg));
    } catch {
      setError(t.form.error);
    }
  }

  if (waUrl) {
    return (
      <div className={containerClass(variant)}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-base text-foreground">{t.form.success}</p>
          <PillButton href={waUrl} external variant="gold">
            {t.cta.continueWa}
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={containerClass(variant)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={t.form.name} {...register("name")} error={errors.name?.message} />
        <Input label={t.form.whatsapp} {...register("whatsapp")} error={errors.whatsapp?.message} dir="ltr" />
        <Input label={t.form.country} {...register("country")} error={errors.country?.message} />
        <Select label={t.form.budget} options={t.form.budgets} {...register("budget")} />
        <Select label={t.form.goal} options={t.form.goals} {...register("goal")} />
        <Select label={t.form.language} options={[{ label: t.form.languages[0], value: "fa" as const }, { label: t.form.languages[1], value: "ar" as const }]} {...register("language")} />
      </div>
      <Textarea label={t.form.message} {...register("message")} />
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      <div className="mt-5">
        <PillButton variant="primary" className="w-full justify-center sm:w-auto">
          {isSubmitting ? "…" : t.cta.submit}
        </PillButton>
      </div>
    </form>
  );
}

function containerClass(v: "card" | "inline") {
  return v === "card"
    ? "rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8"
    : "";
}

const fieldClass = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const Input = ({ label, error, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
    <input className={fieldClass} {...rest} />
    {error ? <span className="mt-1 block text-[11px] text-destructive">{error}</span> : null}
  </label>
);

const Textarea = ({ label, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <label className="mt-4 block">
    <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
    <textarea rows={3} className={fieldClass} {...rest} />
  </label>
);

type Opt = string | { label: string; value: string };
const Select = ({ label, options, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: readonly Opt[] }) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
    <select className={fieldClass} {...rest}>
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return <option key={v} value={v}>{l}</option>;
      })}
    </select>
  </label>
);
