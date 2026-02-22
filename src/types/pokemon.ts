export type Stat = "HP" | "Atk" | "Def" | "Sp. Atk" | "Sp. Def" | "Speed";

export interface Stats {
  HP:number;
  Atk:number;
  Def:number;
  "Sp. Atk":number;
  "Sp. Def":number;
  Speed:number;
}

/* TODO add base stats, ability */
export interface Pokemon {
  name:string;
  stats: Stats;
  type: string[];
  weight: number;
  ability: string;
  status?: "burn" | "freeze" | "paralysis" | "poison" | "sleep" | undefined;
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
  ignoresAbility?: boolean;  /* TODO verify which ability to ignore */
  moveMultiplier?: number;
  maxPower?:number;
  notes: string[];
  disabled?: boolean;
  crit?: boolean;

  /* TODO consider these in the formula, to decide how to apply to user, target or both (ex friend guard) probably make
   a double check and pass to context a boolean only for the user or target, based on the ability (ex. friend guard target)*/
  "neutralizing-gas"?: boolean;
  "air-lock"?: boolean;
  "cloud-nine"?: boolean;
  battery?: boolean;
  "beads-of-ruin"?: boolean;
  infiltrator?: boolean;
  "dark-aura"?: boolean;
  "fairy-aura"?: boolean;
  "aura-break"?: boolean;
  "friend-guard"?: boolean;
  "minds-eye"?: boolean;

  userIgnoresItem?: boolean;
  targetIgnoresItem?: boolean;

  userAbilityModifier?: number;
  targetAbilityModifier?: number;

  /* TODO desolate-land, delta-stream, primordial-sea in weather */
  weather?: string;
  terrain?: string;

  STAB?: number;
  effectiveness:number;
}

/* TODO flower gift, booosts atk and sp. def of user and allies in sun */