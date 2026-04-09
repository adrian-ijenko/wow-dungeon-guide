import { Link } from "react-router-dom";
import { DungeonCard } from "@/components/DungeonCard";
import { getAllDungeons } from "@/data/loadDungeons";

export function HomePage() {
  const dungeons = getAllDungeons();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-500/90">
          Midnight · Mythic+ Season 1
        </p>
        <h1
          className="mt-3 text-4xl font-semibold tracking-[0.02em] text-parchment sm:text-5xl"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Dungeon journal
        </h1>
        <p className="mt-4 text-base text-parchment-dim sm:text-lg">
          Boss breakdowns, per-boss loot tables, and dangerous packs for the Season 1 eight-dungeon
          pool — plus{" "}
          <Link to="/rewards" className="text-gold-400 underline decoration-gold-500/30 underline-offset-2">
            key level → ilevel &amp; crest rewards
          </Link>
          .
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:gap-6">
        {dungeons.map((d, i) => (
          <DungeonCard key={d.slug} dungeon={d} index={i} />
        ))}
      </div>
    </div>
  );
}
