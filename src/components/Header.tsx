import Link from "next/link";
import { Menu } from "lucide-react";
import { getPerson } from "@/lib/person";

export function Header() {
  const { profile, navigation } = getPerson();

  return (
    <header className="bg-desk-deep sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto flex h-14 w-full max-w-[58rem] items-center justify-between gap-6 px-4 md:px-6">
        <Link href="/" className="font-display text-lg leading-none font-extrabold tracking-tight text-white">
          {profile.fullName}
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-6 lg:flex">
          {navigation.map((n) => (
            <Link key={n.href} href={n.href} className="navlink">
              {n.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary
            aria-label="Menü"
            className="on-desk grid h-10 w-10 cursor-pointer list-none place-items-center rounded-md border border-white/30 text-white"
          >
            <Menu size={20} />
          </summary>
          <nav
            aria-label="Mobil menü"
            className="bg-desk-deep absolute right-0 mt-2 w-64 rounded-md border border-white/20 p-2 shadow-lg"
          >
            {navigation.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block rounded px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/yasal-uyari" className="text-on-dark-soft block rounded px-3 py-2.5 text-sm hover:bg-white/10">
              Yasal uyarı
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
