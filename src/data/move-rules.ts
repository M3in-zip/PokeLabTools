import type { Context } from "@/types/pokemon";

export interface MoveRule {
  moves: string[];
  apply: (context: Context) => Context;
}

/* export interface Context {
  level:number;
  move: PokemonMove;
  user: Pokemon;
  target: Pokemon;
  weather: string;
  terrain: string;
  notes: string;
  disabled?: boolean;
  hits?: {min:number, max:number};
  pureDamage?: number;
  superEffectiveMultiplier?: number;
  crit?:boolean;
  additionalType?: string;
  ignoreWeather?: boolean;
  ignoresAbility?: boolean;
  additionalMultiplier?: number;
} */

export const moveRules: MoveRule[] = [
  /* Disabled moves */
  {
    moves: [
      "bolt beak",
      "chip away",
      "fishious rend",
      "flame burst",
      "frustration",
      "fury cutter",
      "glitzy glow",
      "hidden power",
      "multi attack",
      "natural gift",
      "nature power",
      "pika papow",
      "power trip",
      "psywave",
      "punishment",
      "return",
      "revelation dance",
      "sacred sword",
      "secret power",
      "secret sword",
      "shell trap",
      "spectral thief",
      "synchronoise",
      "terrain pulse",
      "thousand arrows",
      "veevee volley",
      "wring out",
    ],
    apply: (context) => {
      return { ...context, disabled: true };
    },
  },

  /* Multi hits moves */
  {
    moves: [
      "double hit",
      "double iron bash",
      "double kick",
      "dragon darts",
      "dual chop",
      "dual wingbeat",
      "gear grind",
      "twin beam",
      "twineedle",
    ],
    apply: (context) => {
      return { ...context, hits: { min: 2, max: 2 } };
    },
  },
  {
    moves: [
      "arm-thrust",
      "barrage",
      "bone-rush",
      "bullet-seed",
      "comet-punch",
      "double-slap",
      "fury-attack",
      "fury-swipes",
      "pin-missile",
      "rock-blast",
      "scale-shot",
      "spike-cannon",
      "tail-slap",
      "water-shuriken",
    ],
    apply: (context) => {
      return { ...context, hits: { min: 2, max: 5 } };
    },
  },
  {
    moves: ["population-bomb"],
    apply: (context) => {
      return { ...context, hits: { min: 1, max: 10 } };
    },
  },

  /* Fixed damaged moves */
  {
    moves: [
      "dragon-rage",
      "sonic-boom",
      "seismic-toss",
      "night-shade",
      "final-gambit",
    ],
    apply: (context) => {
      const name = context.move.name;
      var damage: number = 0;
      if (name === "dragon-rage") damage = 40;
      else if (name === "sonic-boom") damage = 20;
      else if (name === "final-gambit") damage = context.user.stats.HP;
      else damage = context.level;
      return { ...context, pureDamage: damage };
    },
  },

  /* Particular moves */
  {
    moves: ["assurance"],
    apply: (context) => {
      return {
        ...context,
        notes:
          "Assurance's damage is doubled if the target has already taken damage this turn.",
      };
    },
  },
  {
    moves: ["avalanche"],
    apply: (context) => {
      return {
        ...context,
        notes:
          "Avalanche's damage is doubled if the target has already damaged the user this turn.",
      };
    },
  },
  {
    moves: ["barb-barrage"],
    apply: (context) => {
      return {
        ...context,
        notes: "Barb Barrage's damage is doubled if the target is poisoned.",
      };
    },
  },
  {
    moves: ["body-press"],
    apply: (context) => {
      return {
        ...context,
        user: {
          ...context.user,
          stats: { ...context.user.stats, Atk: context.user.stats.Def },
        },
      };
    },
  },
  {
    moves: ["brine"],
    apply: (context) => {
      return {
        ...context,
        notes:
          "Brine's damage is doubled if the target has less than half of its max HP remaining.",
      };
    },
  },
  {
    moves: ["collision-course", "electro-drift"],
    apply: (context) => {
      return { ...context, superEffectiveMultiplier: 5461 / 4096 };
    },
  },
  {
    moves: ["dragon-energy", "eruption", "water-spout"],
    apply: (context) => {
      return {
        ...context,
        notes: "Dragon Energy's power decreases as the user's HP decreases.",
      };
    },
  },
  {
    moves: ["electro-ball"],
    apply: (context) => {
      const ratio = context.user.stats.Speed / context.target.stats.Speed;
      let pow = 40;
      if (ratio >= 4) pow = 150;
      else if (ratio >= 3) pow = 120;
      else if (ratio >= 2) pow = 80;
      else if (ratio >= 1) pow = 60;
      return {
        ...context,
        move: { ...context.move, power: pow },
        notes:
          "Electro Ball's power is affected by the user's and target's speeds.",
      };
    },
  },
  {
    moves: ["expanding-force"],
    apply: (context) => {
      if (context.terrain === "psychic")
        return {
          ...context,
          move: {
            ...context.move,
            power: Math.floor(context.move.power! * 1.5),
            target: "all-opponents",
          },
        };
      else return context;
    },
  },
  {
    moves: ["facade"],
    apply: (context) => {
      const power = context.move.power as number;
      if (
        context.user.status &&
        context.move.power &&
        ["poison", "burn", "paralysis"].includes(context.user.status)
      )
        return { ...context, move: { ...context.move, power: power * 2 } };
      else return context;
    },
  },
  {
    moves: ["false-swipe"],
    apply: (context) => {
      return {
        ...context,
        notes: "This move cannot KO the opponent pokemon.",
      };
    },
  },
  {
    moves: ["flail"],
    apply: (context) => {
      return {
        ...context,
        move: { ...context.move, power: 20 },
        hits: { min: 1, max: 10 },
        notes: "This move deals more damage with lower HP.",
      };
    },
  },
  {
    moves: ["flower-trick", "frost-breath"],
    apply: (context) => {
      return {
        ...context,
        crit: true,
      };
    },
  },
  {
    moves: ["flying-press"],
    apply: (context) => {
      return {
        ...context,
        additionalType: "flying",
      };
    },
  },
  {
    moves: ["foul-play"],
    apply: (context) => {
      return {
        ...context,
        user: {
          ...context.user,
          stats: { ...context.user.stats, Atk: context.target.stats.Atk },
        },
      };
    },
  },
  {
    moves: ["grass-knot", "low-kick"],
    apply: (context) => {
      var pow = 20;
      if (context.target.weight / 10 >= 10 && context.target.weight / 10 < 25)
        pow = 40;
      else if (
        context.target.weight / 10 >= 25 &&
        context.target.weight / 10 < 50
      )
        pow = 60;
      else if (
        context.target.weight / 10 >= 50 &&
        context.target.weight / 10 < 100
      )
        pow = 80;
      else if (
        context.target.weight / 10 >= 100 &&
        context.target.weight / 10 < 200
      )
        pow = 100;
      else if (context.target.weight / 10 >= 200) pow = 120;
      return {
        ...context,
        move: { ...context.move, power: pow },
        notes: "Power based on target weight",
      };
    },
  },
  {
    moves: ["gyro-ball"],
    apply: (context) => {
      return {
        ...context,
        move: {
          ...context.move,
          power: Math.min(
            150,
            Math.floor(
              (25 * context.target.stats.Speed) / context.user.stats.Speed,
            ),
          ),
        },
      };
    },
  },
  {
    moves: ["hydro-steam"],
    apply: (context) => {
      if (context.weather === "sun")
        return {
          ...context,
          move: { ...context.move, power: 120 },
          ignoreWeather: true,
        };
      else return context;
    },
  },
  {
    moves: ["infernal-parade"],
    apply: (context) => {
      if (context.target.status)
        return {
          ...context,
          move: { ...context.move, power: context.move.power! * 2 },
        };
      else return context;
    },
  },
  {
    moves: ["ivy-cudgel"],
    apply: (context) => {
      const types = context.user.type;
      const type = types.find((t) => t !== "grass") ?? "grass";
      return {
        ...context,
        move: { ...context.move, type: type },
      };
    },
  },
  {
    moves: ["lash-out"],
    apply: (context) => {
      return {
        ...context,
        notes: "Damage doubled if any user stat lowered during this turn",
      };
    },
  },
  {
    moves: ["last-respects"],
    apply: (context) => {
      return {
        ...context,
        notes: "Deal 100% more for each team member knocked out",
      };
    },
  },
  {
    moves: ["magnitude"],
    apply: (context) => {
      return {
        ...context,
        move: { ...context.move, power: 10 },
        hits: { min: 1, max: 15 },
      };
    },
  },
  {
    moves: ["moongeist-beam"],
    apply: (context) => {
      return { ...context, ignoresAbility: true };
    },
  },
  {
    moves: ["payback"],
    apply: (context) => {
      return {
        ...context,
        notes:
          "Double damage if target attacks first, switches out or uses an item",
      };
    },
  },
  {
    moves: ["photon-geyser"],
    apply: (context) => {
      if (context.user.stats.Atk > context.user.stats["Sp. Atk"])
        return { ...context, move: { ...context.move, category: "physical" } };
      else return context;
    },
  },
  {
    moves: ["psyblade"],
    apply: (context) => ({
      ...context,
      additionalMultiplier:
        context.terrain === "electric"
          ? (context.additionalMultiplier ?? 1) * 1.3
          : context.additionalMultiplier,
    }),
  },
  {
    moves: ["psyshock", "psystrike"],
    apply: (context) => {
      return {
        ...context,
        target: {
          ...context.target,
          stats: {
            ...context.target.stats,
            "Sp. Def": context.target.stats.Def,
          },
        },
      };
    },
  },
  {
    moves: ["pursuit"],
    apply: (context) => {
      return { ...context, notes: "Double damage if target is switching out" };
    },
  },
  {
    moves: ["rage-fist"],
    apply: (context) => {
      return {
        ...context,
        notes:"Base power 50 (+50 per hit taken).",
      };
    },
  },
];
