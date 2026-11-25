import { z } from "zod";
import personJson from "@/person.json";

/* person.json — TEK veri kaynağı. Zod ile valide edilir; bileşenler
   person.json'ı doğrudan import etmez, yalnızca getPerson() kullanır. */

const personSchema = z.object({
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    title: z.string(),
    subtitle: z.string(),
    shortBio: z.string(),
    birthPlace: z.string(),
    location: z.string(),
    photos: z.object({
      portrait: z.object({
        src: z.string(),
        w: z.number(),
        h: z.number(),
        alt: z.string(),
      }),
    }),
    knowsAbout: z.array(z.string()).default([]),
  }),
  seo: z.object({
    siteName: z.string(),
    titleDefault: z.string(),
    titleTemplate: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
    alternateNames: z.array(z.string()).default([]),
    url: z.url(),
    locale: z.string().default("tr_TR"),
    twitterHandle: z.string().default(""),
    googleSiteVerification: z.string().default(""),
  }),
  navigation: z.array(z.object({ label: z.string(), href: z.string(), sheet: z.number() })),
  hero: z.object({
    docLabel: z.string(),
    lead: z.string(),
    factsHeading: z.string(),
    facts: z.array(
      z.object({ label: z.string(), value: z.string(), total: z.boolean().default(false) })
    ),
  }),
  about: z.object({ heading: z.string(), body: z.array(z.string()) }),
  career: z.object({
    heading: z.string(),
    role: z.string(),
    lead: z.string(),
    items: z.array(z.string()),
    totalLabel: z.string(),
    totalValue: z.string(),
  }),
  education: z.object({
    heading: z.string(),
    school: z.string(),
    department: z.string(),
    place: z.string(),
    body: z.array(z.string()),
  }),
  skills: z.object({ heading: z.string(), items: z.array(z.string()) }),
  approach: z.object({ heading: z.string(), body: z.array(z.string()) }),
  goal: z.object({ heading: z.string(), body: z.array(z.string()) }),
  personal: z.object({
    heading: z.string(),
    traits: z.array(z.string()),
    body: z.array(z.string()),
  }),
  brokers: z
    .object({
      heading: z.string().default(""),
      description: z.string().default(""),
      note: z.string().default(""),
      items: z
        .array(
          z.object({
            name: z.string(),
            logo: z.string().default(""),
            description: z.string().default(""),
            registerLabel: z.string().default("Hesap Aç"),
            registerHref: z.string().default(""),
            secondaryLabel: z.string().default(""),
            secondaryHref: z.string().default(""),
          })
        )
        .default([]),
    })
    .prefault({}),
  contact: z.object({
    heading: z.string(),
    body: z.string(),
    email: z.string().default(""),
    phone: z.string().default(""),
    whatsapp: z.string().default(""),
    telegram: z.string().default(""),
  }),
  socials: z
    .array(z.object({ platform: z.string(), label: z.string(), url: z.string() }))
    .default([]),
  legal: z.object({
    title: z.string(),
    intro: z.string(),
    disclaimer: z.string(),
    copyright: z.string(),
    sections: z.array(z.object({ title: z.string(), body: z.string() })),
  }),
  pages: z.record(
    z.string(),
    z.object({
      h1: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
  sitemap: z.array(
    z.object({
      path: z.string(),
      changeFrequency: z
        .enum(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"])
        .default("monthly"),
      priority: z.number().min(0).max(1).default(0.5),
    })
  ),
});

export type Person = z.infer<typeof personSchema>;

let cached: Person | null = null;

/** person.json'ı valide ederek döndürür; hatalı veri build'i durdurur. */
export function getPerson(): Person {
  if (cached) return cached;
  const parsed = personSchema.safeParse(personJson);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".") || "(kök)"}: ${i.message}`)
      .join("\n");
    throw new Error(`person.json doğrulanamadı:\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}

/** Sondaki "/" olmadan kanonik site adresi. */
export function siteUrl(): string {
  return getPerson().seo.url.replace(/\/$/, "");
}

export function getPage(slug: string) {
  const page = getPerson().pages[slug];
  if (!page) throw new Error(`person.json > pages içinde "${slug}" yok.`);
  return page;
}

/** Telefon numarasından tel: bağlantısı (boşluksuz). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
