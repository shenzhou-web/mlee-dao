import { StatTile } from "./StatTile";

export function Stats() {
  return (
    <section className="border-y-2 border-[#1E1E1E] bg-[#0F0F0F] px-5 py-12 md:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile value="18B" label="Fixed Supply" detail="No hidden minting in the public token file." />
        <StatTile value="0%" label="Tax" detail="No buy or sell tax structure for MDAO transfers." />
        <StatTile value="56" label="Chain ID" detail="BNB Smart Chain mainnet deployment target." />
        <StatTile value="DAO" label="Governance" detail="On-chain voting mechanisms planned in roadmap." />
      </div>
    </section>
  );
}
