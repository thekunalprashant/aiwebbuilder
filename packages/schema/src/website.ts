import { z } from "zod";

export const SectionType = z.enum(["hero", "features", "cta", "testimonials", "faq", "contact"]);

export const ThemeSchema = z.object({
  colors: z.object({
    primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    background: z.string(),
    text: z.string()
  }),
  fonts: z.object({
    heading: z.string().min(1),
    body: z.string().min(1)
  })
});

export const SectionSchema = z.object({
  id: z.string().min(1),
  type: SectionType,
  inputs: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]))
});

export const WebsiteSchema = z.object({
  metadata: z.object({
    title: z.string().min(1).max(80),
    description: z.string().max(200).default("")
  }),
  theme: ThemeSchema,
  sections: z.array(SectionSchema).min(1),
  security: z.object({
    allowExternalScripts: z.literal(false).default(false),
    csp: z.string().min(10)
  })
});

export type WebsiteSchemaType = z.infer<typeof WebsiteSchema>;
