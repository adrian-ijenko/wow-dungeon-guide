import { Link } from "react-router-dom";
import type { Dungeon } from "@/types/dungeon";

const accentFor = (i: number) => {
  const accents = ["from-gold-500/25", "from-frost/20", "from-ember/20", "from-arcane/20"] as const;
  return accents[i % accents.length];
};

export function DungeonCard({ dungeon, index }: { dungeon: Dungeon; index: number }) {
  return (
    <Link
      to={`/dungeon/${dungeon.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-gold-500/15 bg-void-850/60 p-px shadow-lg shadow-black/40 outline-none transition duration-300 hover:border-gold-500/35 hover:shadow-black/60 focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full bg-gradient-to-br ${accentFor(index)} to-transparent opacity-70 blur-2xl transition duration-500 group-hover:opacity-100`}
      />
      <div className="relative flex h-full flex-col rounded-[11px] bg-gradient-to-b from-void-800/90 to-void-900/95 p-5 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-500/80">
              {dungeon.expansion}
            </p>
            <h2
              className="mt-1 text-xl font-semibold tracking-wide text-parchment sm:text-2xl"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              {dungeon.name}
            </h2>
          </div>
          <span className="shrink-0 rounded border border-gold-500/20 bg-void-950/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-parchment-dim">
            M+
          </span>
        </div>
        <p className="mb-5 flex-1 text-sm text-parchment-dim">{dungeon.tagline}</p>
        <div className="flex items-center justify-between border-t border-gold-500/10 pt-4 text-sm">
          <span className="text-parchment-dim">
            {dungeon.bosses.length} boss{dungeon.bosses.length === 1 ? "" : "es"}
            <span className="mx-2 text-gold-500/30">·</span>
            {dungeon.dangerousPacks.length} pull{dungeon.dangerousPacks.length === 1 ? "" : "s"}
          </span>
          <span className="font-medium text-gold-400 transition group-hover:translate-x-0.5">
            Open journal →
          </span>
        </div>
      </div>
    </Link>
  );
}
