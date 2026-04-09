import { getSeasonRewards } from "@/data/loadRewards";

export function RewardsPage() {
  const r = getSeasonRewards();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-500/90">
          World of Warcraft: Midnight
        </p>
        <h1
          className="mt-3 text-3xl font-semibold tracking-wide text-parchment sm:text-4xl"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Keys, ilevel &amp; crests
        </h1>
        <p className="mt-4 text-parchment-dim">
          {r.seasonName}. Values match the usual end-of-run chest, Great Vault option, and upgrade-track
          breakpoints — confirm in-game after patches.
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-4xl space-y-4 rounded-xl border border-gold-500/15 bg-void-850/40 p-5 sm:p-6">
        <p className="text-sm font-medium text-parchment">Notes</p>
        <ul className="list-inside list-disc space-y-2 text-sm text-parchment-dim">
          {r.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="text-xs text-parchment-dim/80">Sources:</p>
        <ul className="space-y-1 text-sm">
          {r.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-gold-400 underline decoration-gold-500/30 underline-offset-2 hover:decoration-gold-400"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section className="mx-auto mt-14 max-w-5xl">
        <h2
          className="mb-4 text-xl font-semibold text-parchment"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Keystone level → rewards
        </h2>
        <p className="mb-4 text-sm text-parchment-dim">
          End-of-run is the chest after a timed or untimed completion. Great Vault is the weekly choice from
          the Dungeons row (based on your lowest key in the bracket that unlocked each slot).
        </p>
        <div className="overflow-hidden rounded-xl border border-gold-500/15 bg-void-850/40 shadow-lg shadow-black/30">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-gold-500/15 bg-void-900/80 text-[10px] uppercase tracking-wider text-parchment-dim">
                  <th className="px-4 py-3 font-semibold">Key</th>
                  <th className="px-4 py-3 font-semibold">End chest ilevel</th>
                  <th className="px-4 py-3 font-semibold">End track</th>
                  <th className="px-4 py-3 font-semibold">Vault ilevel</th>
                  <th className="px-4 py-3 font-semibold">Vault track</th>
                  <th className="px-4 py-3 font-semibold">Crests (dungeon completion)</th>
                </tr>
              </thead>
              <tbody className="text-parchment-dim">
                {r.keyLevelRewards.map((row) => (
                  <tr
                    key={row.keyLabel}
                    className="border-b border-gold-500/5 last:border-0 hover:bg-void-800/25"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-parchment">
                      {row.keyLabel}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gold-400/95">
                      {row.endOfRun.itemLevel}
                    </td>
                    <td className="px-4 py-3">{row.endOfRun.track}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gold-400/95">
                      {row.greatVault.itemLevel}
                    </td>
                    <td className="px-4 py-3">{row.greatVault.track}</td>
                    <td className="px-4 py-3 text-xs">{row.crestsEndOfRun ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2">
        <div>
          <h2
            className="mb-4 text-xl font-semibold text-parchment"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Crests per completed key
          </h2>
          <div className="overflow-hidden rounded-xl border border-gold-500/15 bg-void-850/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gold-500/15 bg-void-900/80 text-[10px] uppercase tracking-wider text-parchment-dim">
                    <th className="px-4 py-3 font-semibold">+Level</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-parchment-dim">
                  {r.crestsPerCompletedKey.map((c) => (
                    <tr
                      key={c.keyLevel}
                      className="border-b border-gold-500/5 last:border-0 hover:bg-void-800/25"
                    >
                      <td className="px-4 py-2.5 font-medium text-parchment">+{c.keyLevel}</td>
                      <td className="px-4 py-2.5">{c.crestType}</td>
                      <td className="px-4 py-2.5 text-gold-400/90">{c.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3
              className="mb-3 text-lg font-semibold text-parchment"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Champion track
            </h3>
            <TrackMiniTable rows={r.upgradeTracks.champion} />
          </div>
          <div>
            <h3
              className="mb-3 text-lg font-semibold text-parchment"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Hero track
            </h3>
            <TrackMiniTable rows={r.upgradeTracks.hero} />
          </div>
          <div>
            <h3
              className="mb-3 text-lg font-semibold text-parchment"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Myth track
            </h3>
            <TrackMiniTable rows={r.upgradeTracks.myth} />
          </div>
        </div>
      </section>
    </div>
  );
}

function TrackMiniTable({ rows }: { rows: { trackLevel: string; itemLevel: number }[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gold-500/12 bg-void-950/35">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gold-500/10 text-[10px] uppercase tracking-wider text-parchment-dim">
            <th className="px-3 py-2 text-left font-semibold">Stage</th>
            <th className="px-3 py-2 text-left font-semibold">Item level</th>
          </tr>
        </thead>
        <tbody className="text-parchment-dim">
          {rows.map((x) => (
            <tr key={x.trackLevel} className="border-b border-gold-500/5 last:border-0">
              <td className="px-3 py-1.5 text-parchment">{x.trackLevel}</td>
              <td className="px-3 py-1.5 text-gold-400/90">{x.itemLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
