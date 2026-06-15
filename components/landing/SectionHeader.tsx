type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      data-reveal="up"
      className={`flex w-full flex-col gap-4 ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <span className="font-ibm-mono text-[11px] font-bold tracking-[3px] text-[#FFD600]">
        {eyebrow}
      </span>
      <h2 className="max-w-[820px] font-grotesk text-[36px] font-bold leading-[1.05] tracking-normal text-[#F5F5F0] md:text-[56px]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[700px] font-ibm-mono text-[12px] leading-[1.7] tracking-normal text-[#888888] md:text-[13px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
