import { About } from "@/components/landing/About";
import { CommunityContact } from "@/components/landing/CommunityContact";
import { ContractProof } from "@/components/landing/ContractProof";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingAnimations } from "@/components/landing/LandingAnimations";
import { MdaoCoin } from "@/components/landing/MdaoCoin";
import { Navbar } from "@/components/landing/Navbar";
import { PixelDivider } from "@/components/landing/PixelDivider";
import { Roadmap } from "@/components/landing/Roadmap";
import { Stats } from "@/components/landing/Stats";
import { Tokenomics } from "@/components/landing/Tokenomics";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0A] text-[#F5F5F0]">
      <LandingAnimations />
      <Navbar />
      <Hero />
      <PixelDivider />
      <ContractProof />
      <MdaoCoin />
      <About />
      <HowItWorks />
      <Stats />
      <Tokenomics />
      <Roadmap />
      <CommunityContact />
      <Footer />
    </main>
  );
}
