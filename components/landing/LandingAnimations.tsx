"use client";

import { useEffect } from "react";

export function LandingAnimations() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    elements.forEach((element) => {
      const delay = element.dataset.revealDelay;
      if (delay) {
        element.style.setProperty("--reveal-delay", `${delay}ms`);
      }
    });

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.dataset.revealVisible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.revealVisible = "true";
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
