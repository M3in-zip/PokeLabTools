export type Stat = "HP" | "Atk" | "Def" | "Sp. Atk" | "Sp. Def" | "Speed";

export interface Stats {
  HP:number;
  Atk:number;
  Def:number;
  "Sp. Atk":number;
  "Sp. Def":number;
  Speed:number;
}

export interface PokemonData {
  name: string;
  stats: Stats;
  type: string[];
  weight: number;
}

export interface Pokemon {
  name:string;
  stats: Stats;
  type: string[];
  weight: number;
  status?: "burn" | "freeze" | "paralysis" | "poison" | "sleep";
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

export interface Modifiers {
  battle: "single" | "double"
  weather: "sun" | "rain" | "sand" | "snow" | "",
  terrain: "electric" | "grassy" | "psychic" | "misty" | "",
}

/* All you need to calc damage */
export interface Context {
  level:number;
  user: Pokemon;
  target: Pokemon;

  move: PokemonMove;
  hits?: {min:number, max:number};
  pureDamage?: number;
  additionalType?: string;
  ignoreWeather?: boolean;
  ignoresAbility?: boolean;
  moveMultiplier?: number;
  maxPower?:number;
  notes: string;
  disabled?: boolean;
  crit?:boolean;

  weather: string;
  terrain: string;
}