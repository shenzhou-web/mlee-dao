type StatTileProps = {
  value: string;
  label: string;
  detail?: string;
};

export function StatTile({ value, label, detail }: StatTileProps) {
  return (
    <div
      data-reveal="up"
      className="border-2 border-[#2D2D2D] bg-[#0F0F0F] p-5 transition-colors hover:border-[#FFD600] md:p-6"
    >
      <div className="font-grotesk text-[34px] font-bold leading-none text-[#FFD600] md:text-[44px]">
        {value}
      </div>
      <div className="mt-3 font-ibm-mono text-[11px] font-bold uppercase tracking-[2px] text-[#F5F5F0]">
        {label}
      </div>
      {detail ? (
        <div className="mt-2 font-ibm-mono text-[11px] leading-5 text-[#666666]">
          {detail}
        </div>
      ) : null}
    </div>
  );
}
