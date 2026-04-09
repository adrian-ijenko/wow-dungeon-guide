import { useLayoutEffect, useMemo, type ReactNode } from "react";
import type { LootEntry } from "@/types/dungeon";
import { resolveItemId } from "@/data/resolveItemId";
import { slotFallbackIcon } from "@/lib/slotFallbackIcon";

function refreshWowheadLinks() {
  window.$WowheadPower?.refreshLinks?.();
}

function JournalStatTooltip({
  name,
  slot,
  stats,
  children,
}: {
  name: string;
  slot: string;
  stats: string;
  children: ReactNode;
}) {
  return (
    <span className="group/tooltip relative inline-flex cursor-help items-center gap-2">
      {children}
      <span
        className="pointer-events-none invisible absolute bottom-[calc(100%+10px)] left-0 z-[100] w-[min(20rem,calc(100vw-2rem))] rounded-sm border border-[#c8a034] bg-[#0b0907]/[0.97] px-3 py-2 text-left text-xs leading-snug text-[#ececec] opacity-0 shadow-[0_0_0_1px_#1a1510,0_10px_28px_rgba(0,0,0,0.75)] transition-opacity duration-150 group-hover/tooltip:visible group-hover/tooltip:opacity-100"
        role="tooltip"
      >
        <span className="block font-semibold tracking-wide text-[#ffd529]">{name}</span>
        <span className="block text-[#c8b87a]">{slot}</span>
        <span className="mt-1 block border-t border-[#3d3428] pt-1.5 text-[#b8c4a8]">{stats}</span>
      </span>
    </span>
  );
}

function LootItemCell({ row }: { row: LootEntry }) {
  const id = resolveItemId(row);

  if (id != null) {
    return (
      <a
        href={`https://www.wowhead.com/item=${id}`}
        data-wowhead={`item=${id}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="font-medium text-parchment decoration-gold-500/30 underline-offset-2 hover:text-gold-200 hover:decoration-gold-400/60"
      >
        {row.name}
      </a>
    );
  }

  const icon = slotFallbackIcon(row.slot);
  return (
    <JournalStatTooltip name={row.name} slot={row.slot} stats={row.stats}>
      <img src={icon} width={20} height={20} alt="" className="shrink-0 rounded border border-gold-500/25" loading="lazy" />
      <span className="font-medium text-parchment">{row.name}</span>
    </JournalStatTooltip>
  );
}

export function LootTable({ items, title }: { items: LootEntry[]; title?: string }) {
  const refreshKey = useMemo(() => items.map((r) => `${r.name}\0${r.slot}`).join("\n"), [items]);

  useLayoutEffect(() => {
    refreshWowheadLinks();
    const id = requestAnimationFrame(() => refreshWowheadLinks());
    return () => cancelAnimationFrame(id);
  }, [refreshKey]);

  if (!items.length) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-gold-500/15 bg-void-950/40">
      {title && (
        <p className="border-b border-gold-500/10 bg-void-900/50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gold-500/90">
          {title}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-gold-500/10 text-[10px] uppercase tracking-wider text-parchment-dim">
              <th className="px-3 py-2 font-semibold">Slot</th>
              <th className="px-3 py-2 font-semibold">Item</th>
              <th className="px-3 py-2 font-semibold">Stats</th>
            </tr>
          </thead>
          <tbody className="text-parchment-dim">
            {items.map((row) => (
              <tr
                key={`${row.name}-${row.slot}`}
                className="border-b border-gold-500/5 last:border-0 hover:bg-void-800/30"
              >
                <td className="whitespace-nowrap px-3 py-2 text-xs text-parchment">{row.slot}</td>
                <td className="px-3 py-2 align-middle">
                  <LootItemCell row={row} />
                </td>
                <td className="px-3 py-2 text-xs">{row.stats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
