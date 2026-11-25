import type { Metadata } from "next";
import { getPage, getPerson } from "@/lib/person";
import { SiteFooter } from "@/components/SiteFooter";

const page = getPage("yasal-uyari");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/yasal-uyari" },
};

export default function LegalPage() {
  const { legal, profile, hero } = getPerson();
  return (
    <>
      <div className="desk">
        <section className="sheet">
          <div className="folio">
            <span className="font-display text-ink font-bold">{profile.fullName}</span>
            <span>{hero.docLabel}</span>
          </div>
          <div className="sheet-body">
            <h1 className="h-section">{page.h1}</h1>
            <p className="text-slate mt-4 max-w-2xl">{legal.intro}</p>

            <div className="border-rule mt-8 max-w-2xl rounded-sm border p-6">
              <p>{legal.disclaimer}</p>
            </div>

            <div className="mt-10 max-w-2xl space-y-8">
              {legal.sections.map((s) => (
                <section key={s.title}>
                  <h2 className="h-item">{s.title}</h2>
                  <p className="text-slate mt-2">{s.body}</p>
                </section>
              ))}
            </div>
          </div>
          <div className="folio-foot" />
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
