import type { DungeonAbility } from "@/types/dungeon";

const styles: Record<NonNullable<DungeonAbility["role"]>, string> = {
  tank: "border-ember/40 bg-ember/15 text-[#f0b8a8]",
  healer: "border-frost/35 bg-frost/10 text-[#b8e4f4]",
  dps: "border-arcane/35 bg-arcane/12 text-[#d4c4fc]",
  all: "border-gold-500/35 bg-gold-500/10 text-gold-400",
};

export function RoleBadge({ role }: { role: DungeonAbility["role"] }) {
  if (!role) return null;
  const label = role === "all" ? "Group" : role.charAt(0).toUpperCase() + role.slice(1);
  return (
    <span
      className={`inline-flex shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[role]}`}
    >
      {label}
    </span>
  );
}
