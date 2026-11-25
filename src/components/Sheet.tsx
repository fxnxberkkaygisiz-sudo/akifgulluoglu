import { getPerson } from "@/lib/person";

export const TOTAL_SHEETS = 7;

/** Rapor sayfası: üst bilgi, içerik, alt bilgide sayfa numarası. */
export function Sheet({
  n,
  id,
  className = "",
  children,
}: {
  n: number;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { profile, hero } = getPerson();
  return (
    <section id={id} className={`sheet ${className}`}>
      <div className="folio">
        <span className="font-display font-bold text-ink">{profile.fullName}</span>
        <span>{hero.docLabel}</span>
      </div>
      <div className="sheet-body">{children}</div>
      <div className="folio-foot">
        <span>
          {n} / {TOTAL_SHEETS}
        </span>
      </div>
    </section>
  );
}
