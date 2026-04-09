export interface DungeonAbility {
  name: string;
  spellId?: number;
  note: string;
  /** tank | healer | dps | all */
  role?: "tank" | "healer" | "dps" | "all";
}

/** Boss loot entry (dungeon journal style). */
export interface LootEntry {
  slot: string;
  name: string;
  stats: string;
  /** Overrides name lookup in item-ids-by-name.json when set. */
  itemId?: number;
}

export interface DungeonBoss {
  id: string;
  name: string;
  order: number;
  encounterId?: number;
  summary: string;
  abilities: DungeonAbility[];
  tips?: string[];
  loot?: LootEntry[];
}

export interface DangerPack {
  id: string;
  name: string;
  area?: string;
  npcIds?: number[];
  why: string;
  handling: string[];
  /**
   * Route placement: `"start"` = entrance / before boss 1; otherwise the boss `id` this pull sits
   * immediately before (after the prior boss on the page).
   */
  beforeBossId: "start" | string;
  /** Sort order when multiple packs share the same `beforeBossId` (lower first). */
  pullOrder?: number;
}

export interface Dungeon {
  slug: string;
  name: string;
  expansion: string;
  season?: string;
  /** Zone / continent hint for journal header */
  location?: string;
  mapId?: number;
  tagline: string;
  bosses: DungeonBoss[];
  dangerousPacks: DangerPack[];
}

export interface DungeonIndex {
  dungeons: Dungeon[];
}
