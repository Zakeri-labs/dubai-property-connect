import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  whatsapp: z.string().trim().min(5).max(30).regex(/^[+\d\s\-()]+$/),
  country: z.string().trim().min(1).max(60),
  budget: z.string().trim().min(1).max(60),
  goal: z.string().trim().min(1).max(60),
  language: z.enum(["fa", "ar"]),
  message: z.string().trim().max(1000).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // v1: no persistence. Log only; future: store in DB / send email.
    console.log("[lead]", { ...data, ts: new Date().toISOString() });
    return { ok: true as const, receivedAt: new Date().toISOString() };
  });
