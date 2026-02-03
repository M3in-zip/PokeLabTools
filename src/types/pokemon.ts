export interface Pokemon {
  stats: Stats;
  type: string[];
  weight: number;
}

export type Stat = "HP" | "Atk" | "Def" | "Sp. Atk" | "Sp. Def" | "Speed";

export interface Stats {
  HP:number;
  Atk:number;
  Def:number;
  "Sp. Atk":number;
  "Sp. Def":number;
  Speed:number;
}

export interface PokemonMove {
  id: number;
  name: string;
  type: string;
  power: number | null;
  description: string;
  category: "physical" | "special" | "status" | string;
  accuracy: number | null;
  pp: number;
  priority: number;
  stat_changes: any[] | null;
  target: string;
}