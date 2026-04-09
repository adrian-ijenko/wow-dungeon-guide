export interface SpecOption {
  id: string;
  name: string;
}

export interface ClassOption {
  id: string;
  name: string;
  specs: SpecOption[];
}

export interface SpecDungeonGuide {
  recommendedBuild: string[];
  keyButtons: string[];
  dungeonTech: string[];
}
