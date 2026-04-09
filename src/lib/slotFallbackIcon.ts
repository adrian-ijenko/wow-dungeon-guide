const ZAM = "https://wow.zamimg.com/images/wow/icons/small";

/** Generic icon when we have no Wowhead item id (journal-style placeholder by slot). */
export function slotFallbackIcon(slot: string): string {
  const s = slot.toLowerCase();
  if (s.includes("trinket")) return `${ZAM}/inv_misc_monsterscales_15.jpg`;
  if (s.includes("ring")) return `${ZAM}/inv_jewelry_ring_15.jpg`;
  if (s.includes("neck")) return `${ZAM}/inv_jewelry_necklace_01.jpg`;
  if (s.includes("back") || s.includes("cloak")) return `${ZAM}/inv_misc_cape_06.jpg`;
  if (s.includes("wrist") || s.includes("bracer")) return `${ZAM}/inv_bracer_17.jpg`;
  if (s.includes("waist") || s.includes("belt") || s.includes("girdle") || s.includes("sash") || s.includes("cinch"))
    return `${ZAM}/inv_belt_15.jpg`;
  if (s.includes("feet") || s.includes("boot") || s.includes("sandal") || s.includes("tread") || s.includes("stomper") || s.includes("sabatons"))
    return `${ZAM}/inv_boots_cloth_03.jpg`;
  if (s.includes("leg")) return `${ZAM}/inv_pants_cloth_01.jpg`;
  if (s.includes("hand") || s.includes("glove") || s.includes("grasp") || s.includes("gauntlet") || s.includes("wrap"))
    return `${ZAM}/inv_gauntlets_04.jpg`;
  if (s.includes("chest") || s.includes("robe") || s.includes("vest") || s.includes("cuirass") || s.includes("breastplate") || s.includes("tunic"))
    return `${ZAM}/inv_chest_cloth_05.jpg`;
  if (s.includes("shoulder") || s.includes("spaulder") || s.includes("mantle") || s.includes("pauldron"))
    return `${ZAM}/inv_shoulder_04.jpg`;
  if (s.includes("head") || s.includes("crown") || s.includes("helm") || s.includes("mask") || s.includes("circlet") || s.includes("halo"))
    return `${ZAM}/inv_helmet_06.jpg`;
  if (s.includes("shield")) return `${ZAM}/inv_shield_04.jpg`;
  if (s.includes("off-hand") || s.includes("off hand") || s.includes("held in off-hand")) return `${ZAM}/inv_misc_book_09.jpg`;
  if (s.includes("staff") || s.includes("polearm")) return `${ZAM}/inv_staff_26.jpg`;
  if (s.includes("wand")) return `${ZAM}/inv_wand_02.jpg`;
  if (s.includes("dagger") || s.includes("knife")) return `${ZAM}/inv_weapon_shortblade_15.jpg`;
  if (s.includes("crossbow") || s.includes("gun") || s.includes("bow")) return `${ZAM}/inv_weapon_crossbow_01.jpg`;
  if (s.includes("fist")) return `${ZAM}/inv_gauntlets_11.jpg`;
  if (s.includes("2h") || s.includes("two-hand")) return `${ZAM}/inv_sword_39.jpg`;
  if (s.includes("1h") || s.includes("one-hand") || s.includes("sword") || s.includes("axe") || s.includes("mace") || s.includes("hammer"))
    return `${ZAM}/inv_sword_04.jpg`;
  return `${ZAM}/inv_misc_questionmark.jpg`;
}
