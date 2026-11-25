import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { getPerson, telHref } from "@/lib/person";
import { PersonJsonLd } from "@/components/JsonLd";
import { Sheet } from "@/components/Sheet";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  const p = getPerson();
  const { profile, hero, contact, navigation } = p;

  return (
    <>
      <PersonJsonLd />

      <div className="desk">
        {/* 1 · Kapak */}
        <Sheet n={1}>
          <div className="rise grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-12">
            <div>
              <h1 className="h-hero">{profile.fullName}</h1>
              <p className="font-display text-ledger mt-5 text-2xl leading-tight font-bold md:text-3xl">
                {profile.title}
              </p>
              <p className="text-slate mt-5 max-w-md">{hero.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="btn btn-solid">
                    <Mail size={17} />
                    E-posta gönder
                  </a>
                ) : null}
                <Link href="/#kariyer" className="btn btn-line">
                  Kariyeri gör
                </Link>
              </div>
            </div>
            <Image
              src={profile.photos.portrait.src}
              alt={profile.photos.portrait.alt}
              width={profile.photos.portrait.w}
              height={profile.photos.portrait.h}
              priority
              sizes="224px"
              className="border-ink aspect-[3/4] w-full max-w-[14rem] rounded-sm border object-cover object-top md:max-w-none"
            />
          </div>

          <nav aria-label="İçindekiler" className="rise rise-2 mt-12">
            <h2 className="font-display text-ink text-sm font-bold">İçindekiler</h2>
            <ul className="toc border-ink mt-2 border-t">
              {navigation.map((n) => (
                <li key={n.href} className="border-rule border-b">
                  <Link href={n.href} data-page={n.sheet}>
                    {n.label}
                    <i aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Sheet>

        {/* 2 · Hakkımda + özet */}
        <Sheet n={2} id="hakkimda">
          <h2 className="h-section">{p.about.heading}</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-12">
            <div className="space-y-5">
              {p.about.body.map((t, i) => (
                <p key={i} className={i === 0 ? "font-display text-2xl leading-snug font-semibold" : "text-slate"}>
                  {t}
                </p>
              ))}
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">{hero.factsHeading}</h3>
              <dl className="mt-2">
                {hero.facts.map((f) => (
                  <div
                    key={f.label}
                    className={
                      f.total
                        ? "total mt-1 py-3.5"
                        : "border-rule border-t py-3 first:border-ink"
                    }
                  >
                    <dt className="text-slate text-sm">{f.label}</dt>
                    <dd className={f.total ? "font-display mt-0.5 text-lg font-bold" : "mt-0.5 font-semibold"}>
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Sheet>

        {/* 3 · Kariyer */}
        <Sheet n={3} id="kariyer">
          <h2 className="h-section">{p.career.heading}</h2>
          <p className="text-ledger mt-2 font-bold">{p.career.role}</p>
          <p className="text-slate mt-5 max-w-2xl">{p.career.lead}</p>
          <ul className="ledger mt-8">
            {p.career.items.map((item) => (
              <li key={item} className="flex gap-4 py-3.5">
                <span aria-hidden="true" className="border-ledger mt-[0.55rem] h-2.5 w-2.5 shrink-0 border-2" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <div className="total mt-3 flex items-baseline justify-between gap-4 py-5">
            <span className="font-semibold">{p.career.totalLabel}</span>
            <span className="font-display text-ledger text-4xl leading-none font-extrabold md:text-5xl">
              {p.career.totalValue}
            </span>
          </div>
        </Sheet>

        {/* 4 · Eğitim ve yetkinlikler */}
        <Sheet n={4}>
          <div id="egitim">
            <h2 className="h-section">{p.education.heading}</h2>
            <p className="font-display mt-6 text-3xl leading-tight font-extrabold">{p.education.school}</p>
            <p className="text-ledger mt-2 text-lg font-bold">{p.education.department}</p>
            <p className="text-slate mt-1 text-sm">{p.education.place}</p>
            <div className="text-slate mt-6 max-w-2xl space-y-4">
              {p.education.body.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>

          <div id="yetkinlikler" className="mt-14">
            <h2 className="h-section">{p.skills.heading}</h2>
            <ul className="ledger mt-6 md:columns-2 md:gap-10">
              {p.skills.items.map((s) => (
                <li key={s} className="border-rule break-inside-avoid border-b py-3 font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Sheet>

        {/* 5 · Yaklaşım, hedef, kişisel profil */}
        <Sheet n={5}>
          <div className="bg-ink text-on-dark -mx-1 grid gap-10 rounded-sm p-6 md:grid-cols-2 md:gap-12 md:p-9">
            {[p.approach, p.goal].map((b) => (
              <div key={b.heading}>
                <h2 className="font-display text-2xl leading-tight font-extrabold text-white">{b.heading}</h2>
                <div className="text-on-dark-soft mt-5 space-y-4 text-[0.98rem]">
                  {b.body.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="h-section mt-14">{p.personal.heading}</h2>
          <ul className="font-display mt-6 flex flex-wrap gap-y-2 text-xl font-bold">
            {p.personal.traits.map((t) => (
              <li key={t} className="border-ink mr-5 border-r pr-5 last:mr-0 last:border-r-0 last:pr-0">
                {t}
              </li>
            ))}
          </ul>
          <div className="text-slate mt-6 max-w-2xl space-y-4">
            {p.personal.body.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </Sheet>

        {/* 6 · Aracı kurumlar */}
        {p.brokers.items.length ? (
          <Sheet n={6} id="araci-kurumlar">
            <h2 className="h-section">{p.brokers.heading}</h2>
            <p className="text-slate mt-4 max-w-2xl">{p.brokers.description}</p>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {p.brokers.items.map((b) => (
                <li key={b.name} className="border-rule flex flex-col rounded-sm border p-6">
                  {b.logo ? (
                    <Image
                      src={b.logo}
                      alt={b.name}
                      width={512}
                      height={168}
                      className="h-14 w-auto max-w-[14rem] object-contain object-left"
                    />
                  ) : (
                    <h3 className="h-item">{b.name}</h3>
                  )}
                  <p className="text-slate mt-5 flex-1 text-[0.95rem]">{b.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={b.registerHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn btn-solid"
                    >
                      {b.registerLabel}
                      <ArrowUpRight size={16} />
                    </a>
                    {b.secondaryHref ? (
                      <a href={b.secondaryHref} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                        {b.secondaryLabel}
                        <ArrowUpRight size={16} />
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            {p.brokers.note ? <p className="text-slate mt-6 max-w-2xl text-sm">{p.brokers.note}</p> : null}
          </Sheet>
        ) : null}

        {/* 7 · İletişim */}
        <Sheet n={7} id="iletisim">
          <h2 className="h-section">{contact.heading}</h2>
          <p className="text-slate mt-4 max-w-2xl">{contact.body}</p>
          <dl className="ledger mt-8">
            <div className="border-rule grid gap-1 border-b py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="text-slate">Konum</dt>
              <dd className="font-semibold">{profile.location}</dd>
            </div>
            {contact.email ? (
              <div className="border-rule grid gap-1 border-b py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-slate">E-posta</dt>
                <dd className="font-semibold break-all">
                  <a href={`mailto:${contact.email}`} className="hover:text-ledger underline underline-offset-4">
                    {contact.email}
                  </a>
                </dd>
              </div>
            ) : null}
            {contact.phone ? (
              <div className="border-rule grid gap-1 border-b py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-slate">Telefon</dt>
                <dd className="font-semibold">
                  <a href={telHref(contact.phone)} className="hover:text-ledger underline underline-offset-4">
                    {contact.phone}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="btn btn-solid">
                <Mail size={17} />
                E-posta gönder
              </a>
            ) : null}
            {contact.phone ? (
              <a href={telHref(contact.phone)} className="btn btn-line">
                <Phone size={17} />
                Ara
              </a>
            ) : null}
            {contact.whatsapp ? (
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                <MessageCircle size={17} />
                WhatsApp
              </a>
            ) : null}
          </div>
        </Sheet>
      </div>

      <SiteFooter />
    </>
  );
}
