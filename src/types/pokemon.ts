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
  ignoreWeather?: boolean;  /* just ignores effects on move (multipliers on offence) */
  ignoresAbility?: boolean;  /* TODO verify which ability to ignore (moongeist-beam) */
  moveMultiplier?: number;
  maxPower?:number; /* for moves with multiple damage possibilities like flail, min is move.power, max is maxpow */
  notes: string[];
  disabled?: boolean; /* if disable ignores calc and print move not available*/
  crit?: boolean;

  "neutralizing-gas"?: boolean;
  "air-lock"?: boolean;
  "cloud-nine"?: boolean;
  "dark-aura"?: boolean;
  "fairy-aura"?: boolean;
  "aura-break"?: boolean;
  
  /* abilities to check on both */
  battery?: boolean;
  "beads-of-ruin"?: boolean;
  "friend-guard"?: boolean;
  infiltrator?: boolean;
  "minds-eye"?: boolean;
  "power-spot"?: boolean; //checkbox
  "steely-spirit"?: boolean;
  
  userIgnoresItem?: boolean;
  targetIgnoresItem?: boolean;

  userAbilityModifier?: number;
  targetAbilityModifier?: number;

  /* Generic modifiers, chose by you */
  weather?: string;
  terrain?: string;

  /* screens */
  "reflect"?: boolean;
  "light-screen"?: boolean;
  "aurora-veil"?: boolean;

  STAB?: number;
  effectiveness:number;
}

/* TODO flower gift, booosts atk and sp. def of user and allies in sun */