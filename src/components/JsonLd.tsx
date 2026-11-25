import { getPerson, siteUrl } from "@/lib/person";

/** Ana sayfa: Person + WebSite grafiği (person.json'dan üretilir). */
export function PersonJsonLd() {
  const { profile, seo, contact, socials } = getPerson();
  const base = siteUrl();

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: profile.fullName,
        givenName: profile.firstName,
        familyName: profile.lastName,
        jobTitle: profile.title,
        description: profile.shortBio,
        url: base,
        image: `${base}${profile.photos.portrait.src}`,
        birthPlace: profile.birthPlace,
        homeLocation: { "@type": "Place", name: profile.location },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Marmara Üniversitesi" },
        knowsAbout: profile.knowsAbout,
        email: contact.email || undefined,
        telephone: contact.phone || undefined,
        sameAs: socials.length ? socials.map((s) => s.url) : undefined,
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: seo.siteName,
        inLanguage: "tr-TR",
        publisher: { "@id": `${base}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
