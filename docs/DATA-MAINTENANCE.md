# Data Maintenance Playbook

This file documents the repeatable process for keeping dungeon content current.

## Dungeon JSON updates

Location: `src/data/dungeons/*.json`

Checklist:
- Boss `id` values are unique per dungeon.
- Boss `order` values are consecutive and accurate.
- `dangerousPacks[].beforeBossId` is either `"start"` or a valid boss `id`.
- `pullOrder` is set when multiple packs share one route anchor.
- Loot entries have accurate names/slots/stats.

## Item ID mapping refresh

Run:

```bash
node scripts/build-item-ids.mjs
```

Output:
- `src/data/item-ids-by-name.json`

Important notes:
- Script uses first Wowhead item hit for each loot name.
- Manually verify unclear or suspicious results.
- If a specific item resolves incorrectly, set `itemId` directly on that loot row.

## Rewards refresh

File:
- `src/data/season-rewards.json`

When updating:
- key brackets
- end-of-run ilvl + track
- great vault ilvl + track
- crest amounts and notes

Then verify in app:
- `/rewards` table formatting
- Notes and source links

## Spec guidance refresh

Files:
- `src/data/specProfiles.ts`
- `src/data/specDungeonGuides.ts`

Pattern:
- Add class/spec option metadata first.
- Populate per-dungeon recommendation blocks:
  - `recommendedBuild`
  - `keyButtons`
  - `dungeonTech`

## Final verification before commit

```bash
npm run build
```

Then spot-check:
- one dungeon with many pull blocks (e.g. Skyreach)
- one dungeon with start-only pull section
- spec selector behavior and persistence
