import type { Dungeon } from "@/types/dungeon";
import algetharAcademy from "./dungeons/algethar-academy.json";
import magistersTerrace from "./dungeons/magisters-terrace.json";
import maisaraCaverns from "./dungeons/maisara-caverns.json";
import nexusPointXenas from "./dungeons/nexus-point-xenas.json";
import pitOfSaron from "./dungeons/pit-of-saron.json";
import seatOfTheTriumvirate from "./dungeons/seat-of-the-triumvirate.json";
import skyreach from "./dungeons/skyreach.json";
import windrunnerSpire from "./dungeons/windrunner-spire.json";

const all: Dungeon[] = [
  algetharAcademy as Dungeon,
  magistersTerrace as Dungeon,
  maisaraCaverns as Dungeon,
  nexusPointXenas as Dungeon,
  pitOfSaron as Dungeon,
  seatOfTheTriumvirate as Dungeon,
  skyreach as Dungeon,
  windrunnerSpire as Dungeon,
];

export function getAllDungeons(): Dungeon[] {
  return [...all].sort((a, b) => a.name.localeCompare(b.name));
}

export function getDungeonBySlug(slug: string): Dungeon | undefined {
  return all.find((d) => d.slug === slug);
}
