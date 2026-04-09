# Next Session Handoff

Use this checklist to restart quickly after a break.

## 1) Get running

```bash
npm install
npm run dev
```

Open:
- `/` (dungeon index)
- `/dungeon/skyreach` (good full-feature sample page)
- `/rewards`

## 2) Sanity-check core features

- Header class/spec selector updates the dungeon "Your character plan" panel.
- Loot rows show Wowhead iconized links + hover tooltips.
- Dangerous pulls appear:
  - before first boss when tagged with `beforeBossId: "start"`
  - between bosses when tagged with `beforeBossId: "<boss-id>"`

## 3) Priority content to fill

1. Expand class/spec guide coverage beyond Restoration Shaman.
2. Validate any ambiguous item IDs from `item-ids-by-name.json`.
3. Keep rewards table synced with latest season hotfixes.

## 4) Important files to know first

- `src/pages/DungeonPage.tsx`
- `src/context/PlayerProfileContext.tsx`
- `src/data/specProfiles.ts`
- `src/data/specDungeonGuides.ts`
- `src/data/dungeons/*.json`
- `scripts/build-item-ids.mjs`

## 5) Suggested immediate next task

Add one fully authored spec (suggested: **Protection Paladin**) across all 8 dungeons using the same structure as Restoration Shaman.
