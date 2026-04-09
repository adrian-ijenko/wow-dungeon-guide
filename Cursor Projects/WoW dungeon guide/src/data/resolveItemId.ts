import itemIdsFile from "./item-ids-by-name.json";
import type { LootEntry } from "@/types/dungeon";

const ITEM_MAP = itemIdsFile.items as Record<string, number>;

export function resolveItemId(row: LootEntry): number | undefined {
  if (row.itemId != null) return row.itemId;
  return ITEM_MAP[row.name];
}
