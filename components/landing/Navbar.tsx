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

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #1E1E1E" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/mdao-logo.png"
            alt="MLEE DAO"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-grotesk text-[13px] font-bold tracking-[2.5px] text-[#F5F5F0]">
            MLEE DAO
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {PAGE_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="relative font-ibm-mono text-[10px] tracking-[1.5px] text-[#666666] transition-colors hover:text-[#F5F5F0]"
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
                className="relative bg-transparent font-ibm-mono text-[10px] tracking-[1.5px] transition-colors"
                style={{ color: isActive ? "#FFD600" : "#666666" }}
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

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/dashboard"
            className="font-ibm-mono text-[10px] tracking-[1.5px] text-[#666666] transition-colors hover:text-[#F5F5F0]"
          >
            DASHBOARD
          </Link>
          <a
            href={`https://bscscan.com/token/${TOKEN_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 bg-[#FFD600] px-4 font-grotesk text-[11px] font-bold tracking-[1.5px] text-[#0A0A0A] transition-colors hover:bg-[#F5F5F0]"
          >
            BSCSCAN
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          className="flex flex-col gap-[5px] p-2 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
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

      <div
        className="overflow-hidden border-[#1E1E1E] bg-[#0A0A0A]/95 transition-all duration-300 md:hidden"
        style={{ maxHeight: menuOpen ? "520px" : "0px", borderBottomWidth: menuOpen ? 1 : 0 }}
      >
        <nav className="flex flex-col px-5 py-4">
          {PAGE_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 border-b border-[#141414] py-4 text-left font-ibm-mono text-[12px] tracking-[2px] text-[#777777]"
            >
              <span className="h-1.5 w-1.5 bg-[#FFD600]" />
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
              className="flex items-center gap-3 border-b border-[#141414] py-4 text-left font-ibm-mono text-[12px] tracking-[2px] text-[#777777]"
            >
              <span className="h-1.5 w-1.5 bg-[#FFD600]" />
              {label}
            </button>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-5">
            <Link
              href="/presale"
              className="bg-[#FFD600] px-4 py-3 text-center font-grotesk text-[11px] font-bold tracking-[1.5px] text-[#0A0A0A]"
            >
              PRESALE
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-[#2D2D2D] px-4 py-3 text-center font-ibm-mono text-[11px] tracking-[1.5px] text-[#F5F5F0]"
            >
              DASHBOARD
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
