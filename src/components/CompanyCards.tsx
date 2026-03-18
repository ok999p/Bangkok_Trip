import { ExternalLink, Building2 } from "lucide-react";
import { tripLocations } from "@/data/tripData";

export function CompanyCards() {
  return (
    <section id="companies" className="scroll-mt-24">
      <header className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
          <Building2 className="h-4 w-4" />
          บริษัทที่เข้าศึกษาดูงาน
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-100">
          ไฮไลต์บริษัท
        </h2>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {tripLocations.map((company) => (
          <article
            key={company.name}
            className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-cyan-950/10 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-3 text-3xl" aria-hidden>
              {company.icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{company.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {company.description}
            </p>

            <a
              href={company.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors group-hover:text-cyan-200"
            >
              ดูใน Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
