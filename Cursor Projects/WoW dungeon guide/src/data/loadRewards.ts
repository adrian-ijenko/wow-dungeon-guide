import raw from "./season-rewards.json";
import type { SeasonRewards } from "@/types/rewards";

export function getSeasonRewards(): SeasonRewards {
  return raw as SeasonRewards;
}
