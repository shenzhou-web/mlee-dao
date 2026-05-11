"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays, Globe2 } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  fetchPublicPartnershipCompanies,
  type PublicPartnershipCompany,
} from "@/lib/partnership-api";

function formatJoinedDate(value: string | null) {
  if (!value) return "Recently joined";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently joined";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PartnershipCompaniesPage() {
  const [companies, setCompanies] = useState<PublicPartnershipCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchPublicPartnershipCompanies()
      .then((items) => {
        if (!active) return;
        setCompanies(items);
        setError(null);
      })
      .catch(() => {
        if (!active) return;
        setError("Unable to load partner companies right now.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const industries = useMemo(
    () => Array.from(new Set(companies.map((company) => company.industry))).slice(0, 4),
    [companies],
  );

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <section className="border-b border-white/8 bg-[linear-gradient(180deg,#0c1120_0%,#05070a_80%)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/partnership" className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Partnership
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#2ed8a3]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Public Partners
              </p>
              <h1 className="mt-3 text-5xl leading-none text-white sm:text-6xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>
                Companies Joining MDAO
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
                A public view of companies that opted to be shown as MDAO partnership members.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-white/4 p-6">
              <p className="text-sm text-white/45">Public company profiles</p>
              <p className="mt-2 text-4xl font-light text-white">{companies.length}</p>
              {industries.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <span key={industry} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">
                      {industry}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fa] px-4 py-16 text-[#0d1117] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-52 animate-pulse rounded-[24px] border border-black/8 bg-white" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
          ) : companies.length === 0 ? (
            <div className="rounded-[24px] border border-black/8 bg-white p-8 text-center shadow-sm">
              <Building2 className="mx-auto h-8 w-8 text-[#9ca3af]" />
              <h2 className="mt-4 text-2xl font-semibold">No public company profiles yet</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#6b7280]">
                Approved companies appear here only when they choose public visibility.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {companies.map((company) => (
                <article key={company.id} className="rounded-[24px] border border-black/8 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0d1117] text-white">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="break-words text-xl font-semibold text-[#0d1117]">{company.companyName}</h2>
                      <p className="mt-1 text-sm text-[#6b7280]">{company.industry}</p>
                    </div>
                  </div>

                  {company.description && (
                    <p className="mt-5 text-sm leading-7 text-[#4b5563]">{company.description}</p>
                  )}

                  <div className="mt-6 grid gap-3 border-t border-black/6 pt-4 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-[#6b7280]">
                        <Globe2 className="h-4 w-4" />
                        Country
                      </span>
                      <span className="font-medium text-[#0d1117]">{company.country}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-[#6b7280]">
                        <CalendarDays className="h-4 w-4" />
                        Joined
                      </span>
                      <span className="font-medium text-[#0d1117]">{formatJoinedDate(company.joinedAt)}</span>
                    </div>
                    {company.lockPeriod && (
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[#6b7280]">Lock period</span>
                        <span className="font-medium text-[#0d1117]">{company.lockPeriod} months</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
