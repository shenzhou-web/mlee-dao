import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#1E1E1E] bg-[#0A0A0A] px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/mdao-logo.png"
            alt="MLEE DAO"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <div>
            <div className="font-grotesk text-[14px] font-bold tracking-[2px] text-[#F5F5F0]">
              MLEE DAO
            </div>
            <div className="font-ibm-mono text-[10px] tracking-[1.5px] text-[#666666]">
              BUILT ON BNB SMART CHAIN
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 font-ibm-mono text-[11px] tracking-[1.5px] text-[#666666] md:items-end">
          <p>© {new Date().getFullYear()} MLEE DAO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-5">
            <Link href="/terms" className="transition-colors hover:text-[#FFD600]">
              TERMS
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-[#FFD600]">
              PRIVACY
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
