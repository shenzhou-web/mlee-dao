import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Coins, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const coinHighlights = [
  { icon: BadgeDollarSign, label: "COIN VALUE", value: "$99", detail: "Announced value per featured MDAO coin package." },
  { icon: Coins, label: "COIN AMOUNT", value: "999", detail: "MDAO Coin included in the announcement bundle." },
  { icon: Sparkles, label: "STATUS", value: "LIVE", detail: "Proudly introduced to the MLEE DAO community." },
];

const productImages = [
  {
    src: "/mdao_coin.jpeg",
    alt: "MDAO coin product preview",
    label: "MDAO COIN",
  },
  {
    src: "/mdao_coin_cover.jpeg",
    alt: "MDAO coin transparent product preview",
    label: "999 MDAO",
  },
];

export function MdaoCoin() {
  return (
    <section id="mdao-coin" className="relative overflow-hidden bg-[#0A0A0A] px-5 py-16 md:px-10 md:py-24">
      <div className="landing-grid-motion absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[#FFD600]/40" />

      <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="ANNOUNCEMENT // MDAO COIN"
            title="We are proudly announcing MDAO Coin."
            description="A premium MDAO Coin showcase built for the community, featuring a $99 value and 999 MDAO Coin in the announcement bundle."
          />

          <div data-reveal="up" data-reveal-delay="120" className="mt-8 grid gap-4 sm:grid-cols-3">
            {coinHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className={`border-2 border-[#2D2D2D] bg-[#0F0F0F] p-5 transition-colors hover:border-[#FFD600] ${
                    index === 0 ? "sm:col-span-1" : ""
                  }`}
                >
                  <Icon className="h-7 w-7 text-[#FFD600]" />
                  <div className="mt-5 font-grotesk text-[38px] font-bold leading-none text-[#F5F5F0]">
                    {item.value}
                  </div>
                  <div className="mt-3 font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#FFD600]">
                    {item.label}
                  </div>
                  <p className="mt-3 font-ibm-mono text-[11px] leading-5 text-[#777777]">
                    {item.detail}
                  </p>
                </article>
              );
            })}
          </div>

          <div data-reveal="up" data-reveal-delay="220" className="mt-8 border-2 border-[#2D2D2D] bg-[#0F0F0F] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#FFD600]">
                  LIMITED COMMUNITY FEATURE
                </p>
                <p className="mt-2 font-ibm-mono text-[12px] leading-6 text-[#888888]">
                  The MDAO Coin announcement brings together premium value, product identity, and community ownership in one bold release.
                </p>
              </div>
              <a
                href="#tokenomics"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-3 bg-[#FFD600] px-5 font-grotesk text-[12px] font-bold tracking-[2px] text-[#0A0A0A] transition-colors hover:bg-[#F5F5F0]"
              >
                VIEW TOKENOMICS
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div data-reveal="right" data-reveal-delay="180" className="relative">
          <div className="absolute inset-8 border-2 border-[#FFD600]/25" />
          <div className="relative grid gap-5 sm:grid-cols-2">
            {productImages.map((image, index) => (
              <figure
                key={image.src}
                className={`relative overflow-hidden border-2 border-[#2D2D2D] bg-[#0F0F0F] p-4 ${
                  index === 1 ? "sm:mt-16" : ""
                }`}
              >
                <div className="landing-scanline pointer-events-none absolute left-0 right-0 top-0 h-8 bg-[#FFD600]/5" />
                <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 330px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-[#2D2D2D] pt-4">
                  <span className="font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#FFD600]">
                    {image.label}
                  </span>
                  <span className="font-grotesk text-[28px] font-bold leading-none text-[#F5F5F0]">
                    {index === 0 ? "$99" : "999"}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
