import type { SpecDungeonGuide } from "@/types/profile";

const RESTO_SHAMAN_GUIDES: Record<string, SpecDungeonGuide> = {
  "windrunner-spire": {
    recommendedBuild: [
      "Pick Cloudburst Totem + Ancestral Guidance for repeated pulse healing windows.",
      "Take Spirit Link Totem for Derelict Duo and Restless Heart overlap damage.",
      "Grab Capacitor Totem / Thunderstorm utility for dangerous caster packs.",
    ],
    keyButtons: ["Spirit Link Totem", "Healing Tide Totem", "Ascendance", "Ancestral Guidance", "Wind Rush Totem"],
    dungeonTech: [
      "Purge support: remove high-value magic buffs from caster packs when interrupts are strained.",
      "Tremor Totem can bail fear-style control moments when overlap gets messy.",
      "Wind Shear has short CD - cover kicks your DPS miss on Spirit Bolt/Shadow casts.",
    ],
  },
  "maisara-caverns": {
    recommendedBuild: [
      "Favor throughput + control: Cloudburst Totem, Spirit Link Totem, and Capacitor Totem.",
      "Take Poison Cleansing Totem if your comp lacks poison dispel depth.",
      "Ancestral Vigor style passives are high value for tank-crush pulls.",
    ],
    keyButtons: ["Spirit Link Totem", "Poison Cleansing Totem", "Capacitor Totem", "Ancestral Guidance"],
    dungeonTech: [
      "Use Thunderstorm/Earthgrab to create space on bear stacks before tank gets overwhelmed.",
      "Pre-stop casting before Juggernaut roar windows and prep instant casts.",
      "Coordinate Link for back-to-back heavy physical tank hits.",
    ],
  },
  "magisters-terrace": {
    recommendedBuild: [
      "Take interrupt/utility-heavy options: Wind Shear support, Capacitor Totem, Hex.",
      "Bring Spirit Link Totem for large arcane burst sets on trash mistakes.",
      "Pick flexible movement support (Wind Rush) for reposition-heavy moments.",
    ],
    keyButtons: ["Wind Shear", "Hex", "Capacitor Totem", "Spirit Link Totem", "Wind Rush Totem"],
    dungeonTech: [
      "Purge and kick support carry these hallway packs; call your kick order.",
      "Hex problematic non-boss humanoid mobs to simplify dangerous pulls.",
      "Drop Link proactively when multiple mobs line up unavoidable party damage.",
    ],
  },
  "nexus-point-xenas": {
    recommendedBuild: [
      "Take burst stabilizers (Ancestral Guidance + Healing Tide Totem).",
      "Capacitor Totem/Earthgrab help control engineer+battery chaos moments.",
      "Spec Spiritwalker's Grace if you feel movement pressure during sustained ramps.",
    ],
    keyButtons: ["Ancestral Guidance", "Healing Tide Totem", "Capacitor Totem", "Spiritwalker's Grace"],
    dungeonTech: [
      "Cover erratic damage with Riptide spread before Arcing Mana ramps.",
      "Wind Shear backup is huge for volatile caster trash.",
      "Thunderstorm can desync dangerous mob overlaps and buy healer globals.",
    ],
  },
  "algethar-academy": {
    recommendedBuild: [
      "Pick poison/curse utility around your group comp gaps (Poison Cleansing, Cleanse Spirit usage).",
      "Bring Link + Tide for Vexamus and Doragosa burst phases.",
      "Capacitor Totem gives reliable stop value in Vexamus wing packs.",
    ],
    keyButtons: ["Spirit Link Totem", "Healing Tide Totem", "Capacitor Totem", "Poison Cleansing Totem"],
    dungeonTech: [
      "Use Wind Shear aggressively on dangerous lecture/caster abilities.",
      "Drop Wind Rush to help fast reposition on swirlies and frontal-heavy pulls.",
      "Purge situational enemy buffs to reduce incoming tank and party pressure.",
    ],
  },
  "pit-of-saron": {
    recommendedBuild: [
      "Prioritize tank support throughput: Earth Shield upkeep and big external cooldown planning.",
      "Take Spirit Link for Tyrannus + high stack trash moments.",
      "Capacitor Totem helps smooth large undead pulls when route gets greedy.",
    ],
    keyButtons: ["Earth Shield", "Spirit Link Totem", "Ancestral Guidance", "Capacitor Totem"],
    dungeonTech: [
      "Kick coverage is critical in Quarry pulls; use Wind Shear off-rotation.",
      "Tremor Totem can rescue panic control overlaps.",
      "Use Ghost Wolf + Wind Rush to keep pace through gauntlet movement sections.",
    ],
  },
  "seat-of-the-triumvirate": {
    recommendedBuild: [
      "Take anti-magic and throughput balance: Link, Tide, and efficient sustained healing talents.",
      "Grab extra stop utility (Capacitor/Thunderstorm) for caster-heavy patrols.",
      "Plan mana with high value Cloudburst cycles for repeated unavoidable group damage.",
    ],
    keyButtons: ["Spirit Link Totem", "Healing Tide Totem", "Cloudburst Totem", "Capacitor Totem"],
    dungeonTech: [
      "Help kick rotations - missing one cast in these packs often snowballs.",
      "Purge enemy magic buffs that amplify incoming party damage.",
      "Use Link early when multiple mechanics overlap instead of reacting late.",
    ],
  },
  skyreach: {
    recommendedBuild: [
      "Take movement + anti-burst tools: Wind Rush Totem, Spirit Link Totem, Ancestral Guidance.",
      "Cloudburst Totem lines up well with repeated group pulses on Araknath/Rukhran.",
      "Capacitor Totem is useful for stabilizing platform trash pulls.",
    ],
    keyButtons: ["Wind Rush Totem", "Spirit Link Totem", "Ancestral Guidance", "Cloudburst Totem"],
    dungeonTech: [
      "Use Wind Rush before knockback-heavy sequences and edge-risk trash.",
      "Coordinate Link for high damage quills/supernova overlaps.",
      "Thunderstorm can peel dangerous mobs off your tank in emergency pulls.",
    ],
  },
};

const SPEC_GUIDES: Record<string, Record<string, SpecDungeonGuide>> = {
  "resto-shaman": RESTO_SHAMAN_GUIDES,
};

export function getSpecDungeonGuide(specId: string | null, dungeonSlug: string): SpecDungeonGuide | undefined {
  if (!specId) return undefined;
  return SPEC_GUIDES[specId]?.[dungeonSlug];
}
