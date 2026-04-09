import { Fragment, useMemo, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { LootTable } from "@/components/LootTable";
import { RoleBadge } from "@/components/RoleBadge";
import { usePlayerProfile } from "@/context/PlayerProfileContext";
import { getDungeonBySlug } from "@/data/loadDungeons";
import { getClassById } from "@/data/specProfiles";
import { getSpecDungeonGuide } from "@/data/specDungeonGuides";
import type { DangerPack, Dungeon, DungeonBoss } from "@/types/dungeon";

function SectionTitle({ children, id }: { children: ReactNode; id: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-lg font-semibold tracking-wide text-parchment sm:text-xl"
      style={{ fontFamily: "var(--font-family-display)" }}
    >
      {children}
    </h2>
  );
}

type PageBlock =
  | { kind: "pulls"; segmentKey: string; domId: string; subtitle: string; packs: DangerPack[] }
  | { kind: "boss"; boss: DungeonBoss; bossIndex: number };

function sortPulls(packs: DangerPack[]): DangerPack[] {
  return [...packs].sort((a, b) => (a.pullOrder ?? 0) - (b.pullOrder ?? 0));
}

function buildPageBlocks(dungeon: Dungeon): PageBlock[] {
  const bosses = [...dungeon.bosses].sort((a, b) => a.order - b.order);
  const bossIds = new Set(bosses.map((b) => b.id));

  const pullsFor = (beforeId: string): DangerPack[] =>
    sortPulls(
      dungeon.dangerousPacks.filter((p) => {
        if (p.beforeBossId !== beforeId) return false;
        if (beforeId === "start") return true;
        return bossIds.has(beforeId);
      }),
    );

  const blocks: PageBlock[] = [];
  let firstPullsSection = true;

  const nextPullDomId = (segmentKey: string) => {
    if (firstPullsSection) {
      firstPullsSection = false;
      return "dangerous-pulls";
    }
    return `pulls-before-${segmentKey}`;
  };

  const startPulls = pullsFor("start");
  if (startPulls.length > 0) {
    blocks.push({
      kind: "pulls",
      segmentKey: "start",
      domId: nextPullDomId("start"),
      subtitle: "Before the first boss",
      packs: startPulls,
    });
  }

  for (let i = 0; i < bosses.length; i++) {
    blocks.push({ kind: "boss", boss: bosses[i], bossIndex: i });
    const next = bosses[i + 1];
    if (next) {
      const mid = pullsFor(next.id);
      if (mid.length > 0) {
        blocks.push({
          kind: "pulls",
          segmentKey: next.id,
          domId: nextPullDomId(next.id),
          subtitle: `Before ${next.name}`,
          packs: mid,
        });
      }
    }
  }

  return blocks;
}

function DangerPullsSection({
  domId,
  subtitle,
  packs,
}: {
  domId: string;
  subtitle: string;
  packs: DangerPack[];
}) {
  return (
    <section id={domId} className="scroll-mt-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-gold-500/15 pb-4">
        <div>
          <SectionTitle id={`${domId}-heading`}>Dangerous pulls</SectionTitle>
          <p className="mt-1 text-xs text-parchment-dim">{subtitle}</p>
        </div>
        <span className="text-xs text-parchment-dim">{packs.length} highlighted</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {packs.map((pack) => (
          <article
            key={pack.id}
            className="flex flex-col rounded-xl border border-ember/25 bg-gradient-to-b from-void-850/80 to-void-900/90 p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <h3
                className="text-lg font-semibold text-parchment"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                {pack.name}
              </h3>
            </div>
            {pack.area && (
              <p className="mt-1 text-xs uppercase tracking-wider text-parchment-dim">{pack.area}</p>
            )}
            <p className="mt-4 text-sm text-parchment-dim">{pack.why}</p>
            <div className="mt-4 flex-1 border-t border-ember/15 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ember/90">How to handle</p>
              <ul className="mt-2 space-y-2 text-sm text-parchment-dim">
                {pack.handling.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember/70" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SpecGuideSection({
  specLabel,
  hasGuide,
  recommendedBuild,
  keyButtons,
  dungeonTech,
}: {
  specLabel: string;
  hasGuide: boolean;
  recommendedBuild: string[];
  keyButtons: string[];
  dungeonTech: string[];
}) {
  return (
    <section className="mt-6 rounded-xl border border-gold-500/20 bg-gradient-to-b from-void-850/60 to-void-900/70 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-gold-500/10 pb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500/85">Your character plan</p>
          <h2
            className="mt-1 text-xl font-semibold text-parchment"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            {specLabel} dungeon setup
          </h2>
        </div>
      </div>

      {!hasGuide ? (
        <p className="text-sm text-parchment-dim">
          Spec-specific recommendations for this class/spec are not filled in yet. Switch to Restoration
          Shaman to see full per-dungeon talent and utility tech right now.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-gold-500/12 bg-void-950/35 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500/85">Spec for</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-parchment-dim">
              {recommendedBuild.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-gold-500/12 bg-void-950/35 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500/85">Priority buttons</p>
            <ul className="mt-2 space-y-1 text-sm text-parchment-dim">
              {keyButtons.map((x) => (
                <li key={x} className="inline-flex items-center rounded border border-gold-500/20 px-2 py-0.5 mr-1 mb-1 text-xs text-parchment">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-gold-500/12 bg-void-950/35 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500/85">Dungeon tech</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-parchment-dim">
              {dungeonTech.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export function DungeonPage() {
  const { slug } = useParams<{ slug: string }>();
  const { selectedClassId, selectedSpecId } = usePlayerProfile();
  const dungeon = slug ? getDungeonBySlug(slug) : undefined;

  const bossNav = useMemo(
    () => (dungeon ? [...dungeon.bosses].sort((a, b) => a.order - b.order) : []),
    [dungeon],
  );

  const pageBlocks = useMemo(() => (dungeon ? buildPageBlocks(dungeon) : []), [dungeon]);
  const selectedClass = useMemo(() => getClassById(selectedClassId), [selectedClassId]);
  const selectedSpecName = useMemo(
    () => selectedClass?.specs.find((s) => s.id === selectedSpecId)?.name ?? "Spec",
    [selectedClass, selectedSpecId],
  );
  const specGuide = useMemo(
    () => (dungeon ? getSpecDungeonGuide(selectedSpecId, dungeon.slug) : undefined),
    [dungeon, selectedSpecId],
  );

  if (!dungeon) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-parchment-dim">That dungeon is not in the journal yet.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md border border-gold-500/30 px-4 py-2 text-sm font-medium text-gold-400 transition hover:bg-void-800"
        >
          ← Back to all dungeons
        </Link>
      </div>
    );
  }

  const firstBossBlockIndex = pageBlocks.findIndex((b) => b.kind === "boss");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
      <nav className="mb-8 text-sm text-parchment-dim">
        <Link to="/" className="transition hover:text-gold-400">
          Dungeons
        </Link>
        <span className="mx-2 text-gold-500/30">/</span>
        <span className="text-parchment">{dungeon.name}</span>
      </nav>

      <header className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-br from-void-800/90 via-void-850/95 to-void-950 p-6 shadow-xl shadow-black/50 sm:p-10">
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500/85">
            {dungeon.expansion}
            {dungeon.season ? ` · ${dungeon.season}` : ""}
          </p>
          <h1
            className="mt-2 text-3xl font-semibold tracking-wide text-parchment sm:text-4xl"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            {dungeon.name}
          </h1>
          {dungeon.location && <p className="mt-2 text-sm text-gold-500/80">{dungeon.location}</p>}
          <p className="mt-4 max-w-2xl text-base text-parchment-dim">{dungeon.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#dangerous-pulls"
              className="rounded-md border border-gold-500/25 bg-void-950/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 transition hover:border-gold-400/40"
            >
              Dangerous pulls
            </a>
            <a
              href="#bosses"
              className="rounded-md border border-gold-500/25 bg-void-950/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-parchment-dim transition hover:border-gold-400/40 hover:text-gold-400"
            >
              Bosses
            </a>
          </div>
        </div>
      </header>

      <SpecGuideSection
        specLabel={`${selectedSpecName} ${selectedClass?.name ?? ""}`.trim()}
        hasGuide={!!specGuide}
        recommendedBuild={specGuide?.recommendedBuild ?? []}
        keyButtons={specGuide?.keyButtons ?? []}
        dungeonTech={specGuide?.dungeonTech ?? []}
      />

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        <a
          href="#dangerous-pulls"
          className="shrink-0 rounded-full border border-gold-500/25 bg-void-850/80 px-3 py-1.5 text-xs font-medium text-gold-400"
        >
          Pulls
        </a>
        <a
          href="#bosses"
          className="shrink-0 rounded-full border border-gold-500/15 bg-void-850/60 px-3 py-1.5 text-xs text-parchment-dim"
        >
          Bosses
        </a>
        {bossNav.map((b) => (
          <a
            key={b.id}
            href={`#boss-${b.id}`}
            className="shrink-0 rounded-full border border-gold-500/15 bg-void-850/60 px-3 py-1.5 text-xs text-parchment-dim"
          >
            {b.name}
          </a>
        ))}
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        <aside className="mb-10 hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-parchment-dim">On this page</p>
              <ul className="space-y-1 border-l border-gold-500/15 pl-3 text-sm">
                <li>
                  <a href="#dangerous-pulls" className="text-gold-400/90 hover:text-gold-400">
                    Dangerous pulls
                  </a>
                </li>
                <li>
                  <a href="#bosses" className="text-parchment-dim hover:text-parchment">
                    Bosses
                  </a>
                </li>
                {bossNav.map((b) => (
                  <li key={b.id}>
                    <a href={`#boss-${b.id}`} className="text-parchment-dim hover:text-parchment">
                      {b.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="space-y-16">
          {pageBlocks.map((block, i) => {
            if (block.kind === "pulls") {
              return (
                <DangerPullsSection
                  key={`pulls-${block.segmentKey}`}
                  domId={block.domId}
                  subtitle={block.subtitle}
                  packs={block.packs}
                />
              );
            }

            const showBossesHeading = i === firstBossBlockIndex;

            return (
              <Fragment key={block.boss.id}>
                {showBossesHeading && (
                  <div
                    id="bosses"
                    className="scroll-mt-24 mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-gold-500/15 pb-4"
                  >
                    <SectionTitle id="bosses-heading">Bosses</SectionTitle>
                    <span className="text-xs text-parchment-dim">{bossNav.length} entries</span>
                  </div>
                )}
                <article
                  id={`boss-${block.boss.id}`}
                  className="scroll-mt-28 rounded-xl border border-gold-500/12 bg-void-850/40 p-5 sm:p-7"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-xs text-gold-500/60">
                      {(block.bossIndex + 1).toString().padStart(2, "0")}
                    </span>
                    <h3
                      className="text-xl font-semibold text-parchment"
                      style={{ fontFamily: "var(--font-family-display)" }}
                    >
                      {block.boss.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-parchment-dim sm:text-base">{block.boss.summary}</p>

                  <div className="mt-6">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-parchment-dim">
                      Abilities &amp; handling
                    </p>
                    <ul className="space-y-3">
                      {block.boss.abilities.map((ab) => (
                        <li
                          key={ab.name}
                          className="flex gap-3 rounded-lg border border-gold-500/10 bg-void-950/35 p-3 sm:p-4"
                        >
                          <RoleBadge role={ab.role} />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-parchment">
                              {ab.name}
                              {ab.spellId != null && (
                                <span className="ml-2 font-mono text-xs font-normal text-parchment-dim">
                                  #{ab.spellId}
                                </span>
                              )}
                            </p>
                            <p className="mt-1 text-sm text-parchment-dim">{ab.note}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {block.boss.tips && block.boss.tips.length > 0 && (
                    <div className="mt-6 rounded-lg border border-frost/20 bg-frost/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-frost">Tips</p>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-parchment-dim">
                        {block.boss.tips.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {block.boss.loot && block.boss.loot.length > 0 && (
                    <LootTable items={block.boss.loot} title="Loot table" />
                  )}
                </article>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
