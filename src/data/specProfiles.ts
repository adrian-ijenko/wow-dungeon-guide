import type { ClassOption } from "@/types/profile";

export const CLASS_OPTIONS: ClassOption[] = [
  {
    id: "shaman",
    name: "Shaman",
    specs: [
      { id: "resto-shaman", name: "Restoration" },
      { id: "ele-shaman", name: "Elemental" },
      { id: "enh-shaman", name: "Enhancement" },
    ],
  },
  {
    id: "paladin",
    name: "Paladin",
    specs: [
      { id: "prot-paladin", name: "Protection" },
      { id: "holy-paladin", name: "Holy" },
      { id: "ret-paladin", name: "Retribution" },
    ],
  },
  {
    id: "evoker",
    name: "Evoker",
    specs: [
      { id: "prevoker", name: "Preservation" },
      { id: "dev-evoker", name: "Devastation" },
      { id: "aug-evoker", name: "Augmentation" },
    ],
  },
];

export function getClassById(classId: string | null): ClassOption | undefined {
  if (!classId) return undefined;
  return CLASS_OPTIONS.find((x) => x.id === classId);
}
