# Project Roadmap

## Phase 1 - Content depth (current priority)

- Fill class/spec dungeon guidance for top played M+ specs.
- Add "confidence notes" for each recommendation (why this talent/utility is chosen).
- Ensure each dungeon has complete dangerous-pull annotations with consistent `beforeBossId`.

## Phase 2 - UX improvements

- Add profile quick presets (main + off-spec).
- Add filter chips for role (tank/healer/dps) on dungeon mechanics.
- Add compact/mobile mode for in-run usage.

## Phase 3 - Data reliability

- Add JSON schema validation for dungeon and rewards files.
- Add pre-commit data checks (duplicate boss IDs, missing route anchors, bad loot entries).
- Add script output verification for item ID mapping (flag suspicious matches).

## Phase 4 - Seasonal operations

- Build a season switch mechanism instead of hard-overwriting JSON.
- Keep prior season archives for reference.
- Add release notes per content update.

## Phase 5 - Optional addon bridge

- Export normalized JSON for addon-side consumption.
- Define stable field contract for encounter/pull/utility structures.
- Implement lightweight generator script for packaged data snapshots.
