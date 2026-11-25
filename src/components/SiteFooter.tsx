import Link from "next/link";
import { getPerson } from "@/lib/person";

export function SiteFooter() {
  const { legal } = getPerson();
  return (
    <footer className="text-on-dark-soft">
      <div className="mx-auto w-full max-w-[58rem] px-4 pb-12 md:px-6">
        <p className="max-w-3xl text-sm leading-relaxed">{legal.disclaimer}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 text-sm">
          <span>{legal.copyright}</span>
          <Link href="/yasal-uyari" className="on-desk underline underline-offset-4 hover:text-white">
            Yasal uyarı
          </Link>
        </div>
      </div>
    </footer>
  );
}
