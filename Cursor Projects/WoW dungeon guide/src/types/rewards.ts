export interface RewardTrackIlvl {
  track: string;
  itemLevel: number;
}

export interface KeyLevelRewardRow {
  /** Display label, e.g. "+6–7" or "Mythic 0" */
  keyLabel: string;
  endOfRun: RewardTrackIlvl;
  greatVault: RewardTrackIlvl;
  /** Text like "10 Runed Ethereal Crests" — optional for M0 */
  crestsEndOfRun?: string;
}

export interface CrestPerKeyRow {
  keyLevel: number;
  crestType: string;
  amount: number;
}

export interface UpgradeTrackRow {
  trackLevel: string;
  itemLevel: number;
}

export interface SeasonRewards {
  seasonName: string;
  expansion: string;
  notes: string[];
  sources: { label: string; url: string }[];
  keyLevelRewards: KeyLevelRewardRow[];
  crestsPerCompletedKey: CrestPerKeyRow[];
  upgradeTracks: {
    champion: UpgradeTrackRow[];
    hero: UpgradeTrackRow[];
    myth: UpgradeTrackRow[];
  };
}
