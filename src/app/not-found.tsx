import Link from "next/link";

export default function NotFound() {
  return (
    <div className="desk min-h-[70vh] content-start">
      <section className="sheet">
        <div className="sheet-body">
          <h1 className="h-section">Sayfa bulunamadı</h1>
          <p className="text-slate mt-4">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
          <Link href="/" className="btn btn-solid mt-8">
            Ana sayfaya dön
          </Link>
        </div>
      </section>
    </div>
  );
}
