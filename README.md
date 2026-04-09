# wow-dungeon-guide

Fan-made World of Warcraft Mythic+ companion app focused on **Midnight Season 1** dungeon routing context:
- boss mechanics and handling notes
- dangerous pulls in route order
- per-boss loot with Wowhead tooltips/icons
- rewards tables (keys, ilevel, crests)
- class/spec profile context (currently fully filled for Restoration Shaman)

This project is built as a Vite + React + TypeScript SPA and is intended to evolve into both a web journal and potential addon data source.

## Current state

- Season data: Midnight S1 dungeon pool is loaded.
- Loot UX: Wowhead hover tooltips and iconized links are enabled.
- Dangerous pulls: displayed at dungeon start and between bosses where tagged.
- Profile tailoring: class/spec selector in header; dungeon guidance panel reacts to selection.
- Spec coverage: Restoration Shaman has dungeon-specific guidance, others are scaffolded and ready to fill.

## Tech stack

- React 19
- React Router 7
- TypeScript 5
- Vite 6
- Tailwind CSS 4

See `package.json` for exact versions and scripts.

## Quick start

### 1) Install

```bash
npm install
```

### 2) Run dev server

```bash
npm run dev
```

### 3) Build production bundle

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Project structure

```text
.
├─ src/
│  ├─ components/         # UI components (layout, loot table, badges, cards)
│  ├─ context/            # App-level state (player class/spec profile)
│  ├─ data/
│  │  ├─ dungeons/        # Dungeon JSON files (bosses, pulls, loot)
│  │  ├─ *.json           # Rewards + item-id mapping
│  │  └─ *.ts             # Data loaders/resolvers
│  ├─ pages/              # Route pages
│  ├─ lib/                # Utility helpers
│  └─ types/              # Shared TS interfaces
├─ scripts/
│  └─ build-item-ids.mjs  # Generates Wowhead item-id mapping by loot name
├─ docs/                  # Handoff and planning docs for future sessions
├─ public/
└─ README.md
```

## Routing

- `/` - Dungeon index
- `/dungeon/:slug` - Dungeon journal page
- `/rewards` - Keys, ilevel, and crests page

## Data model notes

### Dungeon data

Each dungeon JSON includes:
- metadata (`slug`, `name`, `expansion`, etc.)
- `bosses[]` with ordered mechanics, tips, and loot
- `dangerousPacks[]` with route placement fields:
  - `beforeBossId: "start" | string`
  - `pullOrder?: number`

This allows pull sections to render at entrance and between specific boss encounters.

### Loot entries

`LootEntry` supports:
- `slot`
- `name`
- `stats`
- optional `itemId` override

If `itemId` is missing, the app resolves it from `src/data/item-ids-by-name.json`.

## Wowhead integration

The app loads Wowhead `power.js` in `index.html` with tooltip settings:
- colorized links
- iconized links

`LootTable` refreshes Wowhead links after React render to ensure dynamic content gets tooltip behavior.

## Class/spec profile system

Header dropdowns store selected class/spec in localStorage via `PlayerProfileContext`.

Spec-driven dungeon advice comes from:
- `src/data/specProfiles.ts` (available classes/specs)
- `src/data/specDungeonGuides.ts` (per-spec, per-dungeon guide blocks)

Current implementation:
- full data for **Restoration Shaman**
- placeholder behavior for other specs (UI ready; data to be populated)

## Content maintenance workflows

### Update dungeon pool

1. Edit/add JSON files in `src/data/dungeons/`.
2. Ensure each boss has unique `id` and correct `order`.
3. Tag dangerous pulls with `beforeBossId`.

### Update loot item IDs

```bash
node scripts/build-item-ids.mjs
```

Notes:
- script scrapes first Wowhead search item hit by loot name
- one-off manual verification is recommended for ambiguous names
- use `itemId` overrides on specific loot entries when needed

### Update seasonal rewards

Edit:
- `src/data/season-rewards.json`

Then validate in UI at `/rewards`.

## Quality checks

- Build check:
  ```bash
  npm run build
  ```
- Keep TypeScript strictness intact.
- When adding new spec content, keep language concise and utility-focused.

## Known limitations

- Not an official Blizzard source; verify values after major patches/hotfixes.
- Most non-Resto specs still need full authored guidance.
- Wowhead first-hit mapping can occasionally choose wrong item for ambiguous names.

## Next steps (recommended)

- Fill top-priority specs (Prot Paladin, Aug Evoker, etc.).
- Add affix-aware notes and weekly modifiers.
- Add encounter spell links/IDs where available.
- Add test coverage for data shape and route ordering logic.

## Handoff docs

Use these when resuming work:
- `docs/NEXT-SESSION.md` - immediate restart checklist
- `docs/ROADMAP.md` - staged delivery plan
- `docs/DATA-MAINTENANCE.md` - repeatable content update playbook

## Disclaimer

Fan-made project. Not affiliated with Blizzard Entertainment.