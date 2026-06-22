"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, PAGE_LINKS, TOKEN_CONTRACT_ADDRESS } from "./constants";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ section }) => {
      const element = document.getElementById(section);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section);
        },
        { rootMargin: "-35% 0px -60% 0px" },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        // Solid dark panel at all times (not just on scroll) so the nav
        // never sits directly on the page's black background with nothing
        // behind it for contrast.
        background: scrolled ? "#0A0A0A" : "rgba(10,10,10,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #1E1E1E",
      }}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:h-[86px] md:px-10 lg:px-12">
        <Link
          href="/"
          aria-label="MLEE DAO — Home"
          className="flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600]"
        >
          <Image
            src="/mdao-logo-removebg.png"
            alt="MLEE DAO"
            width={112}
            height={112}
            className="h-16 w-16 object-contain md:h-20 md:w-20 lg:h-24 lg:w-24"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {PAGE_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="relative rounded-sm font-ibm-mono text-[11px] font-bold tracking-[1.5px] text-[#D8D8D0] transition-colors hover:text-[#FFD600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600]"
            >
              {label}
            </Link>
          ))}
          {NAV_LINKS.map(({ label, section }) => {
            const isActive = active === section;
            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative bg-transparent font-ibm-mono text-[11px] font-bold tracking-[1.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600] ${
                  isActive ? "text-[#FFD600]" : "text-[#D8D8D0] hover:text-[#FFD600]"
                }`}
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#FFD600] transition-all duration-300"
                  style={{ width: isActive ? "100%" : "0%" }}
                />
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/dashboard"
            className="rounded-sm font-ibm-mono text-[11px] font-bold tracking-[1.5px] text-[#D8D8D0] transition-colors hover:text-[#FFD600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600]"
          >
            DASHBOARD
          </Link>
          <a
            href={`https://bscscan.com/token/${TOKEN_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 bg-[#FFD600] px-4 font-grotesk text-[11px] font-bold tracking-[1.5px] text-[#0A0A0A] transition-colors hover:bg-[#F5F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600]"
          >
            BSCSCAN
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          className="relative z-50 flex flex-col gap-[5px] rounded-sm p-2.5 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD600]"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block h-[2px] w-6 bg-[#F5F5F0] transition-transform"
            style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-[2px] w-6 bg-[#F5F5F0] transition-opacity"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-[2px] w-6 bg-[#F5F5F0] transition-transform"
            style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="overflow-y-auto border-[#1E1E1E] bg-[#0A0A0A]/98 transition-all duration-300 md:hidden"
        style={{
          maxHeight: menuOpen ? "calc(100vh - 76px)" : "0px",
          borderBottomWidth: menuOpen ? 1 : 0,
        }}
      >
        <nav className="flex flex-col px-5 py-4">
          {PAGE_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 border-b border-[#141414] py-4 text-left font-ibm-mono text-[12px] font-bold tracking-[2px] text-[#D8D8D0] transition-colors hover:text-[#FFD600]"
            >
              <span className="h-1.5 w-1.5 shrink-0 bg-[#FFD600]" />
              {label}
            </Link>
          ))}
          {NAV_LINKS.map(({ label, section }) => (
            <button
              key={section}
              onClick={() => {
                scrollToSection(section);
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 border-b border-[#141414] py-4 text-left font-ibm-mono text-[12px] font-bold tracking-[2px] text-[#D8D8D0] transition-colors hover:text-[#FFD600]"
            >
              <span className="h-1.5 w-1.5 shrink-0 bg-[#FFD600]" />
              {label}
            </button>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-5 pb-2">
            <Link
              href="/presale"
              onClick={() => setMenuOpen(false)}
              className="bg-[#FFD600] px-4 py-3 text-center font-grotesk text-[11px] font-bold tracking-[1.5px] text-[#0A0A0A]"
            >
              PRESALE
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="border-2 border-[#2D2D2D] px-4 py-3 text-center font-ibm-mono text-[11px] tracking-[1.5px] text-[#F5F5F0]"
            >
              DASHBOARD
            </Link>
          </div>
          <a
            href={`https://bscscan.com/token/${TOKEN_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 border-2 border-[#2D2D2D] px-4 py-3 font-ibm-mono text-[11px] tracking-[1.5px] text-[#F5F5F0]"
          >
            VIEW ON BSCSCAN
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
