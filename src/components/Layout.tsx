import { Link, Outlet } from "react-router-dom";
import { useMemo } from "react";
import { usePlayerProfile } from "@/context/PlayerProfileContext";
import { CLASS_OPTIONS, getClassById } from "@/data/specProfiles";

export function Layout() {
  const { selectedClassId, selectedSpecId, setSelectedClassId, setSelectedSpecId } = usePlayerProfile();
  const selectedClass = useMemo(() => getClassById(selectedClassId), [selectedClassId]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-gold-500/15 bg-void-900/85 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-3 outline-none ring-gold-500/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-md border border-gold-500/35 bg-gradient-to-br from-void-800 to-void-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition group-hover:border-gold-400/50"
              aria-hidden
            >
              <span className="text-lg text-gold-400">◇</span>
            </span>
            <div className="leading-tight">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-500/90"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                Keystone
              </p>
              <p className="text-sm font-semibold text-parchment">Compendium</p>
            </div>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <nav className="flex items-center gap-1 text-sm">
              <Link
                to="/"
                className="rounded-md px-3 py-2 text-parchment-dim transition hover:bg-void-800 hover:text-parchment"
              >
                Dungeons
              </Link>
              <Link
                to="/rewards"
                className="rounded-md px-3 py-2 text-parchment-dim transition hover:bg-void-800 hover:text-parchment"
              >
                Keys &amp; loot
              </Link>
            </nav>

            <div className="flex items-center gap-2 rounded-md border border-gold-500/15 bg-void-950/50 px-2 py-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-parchment-dim">
                Class
                <select
                  className="ml-1 rounded border border-gold-500/25 bg-void-900 px-2 py-1 text-xs text-parchment outline-none focus:border-gold-500/55"
                  value={selectedClassId ?? ""}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                >
                  {CLASS_OPTIONS.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-parchment-dim">
                Spec
                <select
                  className="ml-1 rounded border border-gold-500/25 bg-void-900 px-2 py-1 text-xs text-parchment outline-none focus:border-gold-500/55"
                  value={selectedSpecId ?? ""}
                  onChange={(e) => setSelectedSpecId(e.target.value)}
                >
                  {(selectedClass?.specs ?? []).map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gold-500/10 py-8 text-center text-xs text-parchment-dim">
        Fan-made reference — not affiliated with Blizzard. Replace strategies with your own notes.
      </footer>
    </div>
  );
}
