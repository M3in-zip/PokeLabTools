import type { PokemonMove, Pokemon } from "@/types/pokemon";

export interface MoveRule {
  moves: string[];
  apply: (context: Context) => any;
}

interface Context {
  level: number;
  move: PokemonMove;
  user: Pokemon;
  target: Pokemon;
  weather: string;
  terrain: string;
  notes: string;
  disabled?: boolean;
  hits?: { min: number; max: number };
  pureDamage?: number;
  superEffectiveMultiplier?: number;
}

export const moveRules: MoveRule[] = [
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
  {
    moves: ["dragon-rage", "sonic-boom", "seismic-toss", "night-shade", "final-gambit"],
    apply: (context) => {
      const name = context.move.name;
      var damage: number = 0;
      if (name === "dragon-rage") damage = 40;
      else if (name === "sonic-boom") damage = 20;
      else if (name === "final-gambit") damage=context.user.stats.HP;
      else damage = context.level;
      return { ...context, pureDamage: damage };
    },
  },
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
        stats: { ...context.user.stats, [1]: context.user.stats.Atk },
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
      const ratio = context.target.stats.Speed / context.user.stats.Speed;
      var pow = 40;
      if (ratio < 0.25) pow = 150;
      else if (ratio < 0.33) pow = 120;
      else if (ratio < 0.5) pow = 80;
      else if (ratio < 1) pow = 60;
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
      if (context.terrain === "psychic") {
        return {
          ...context,
          move: {
            ...context.move,
            power: Math.floor(context.move.power! * 1.5),
            target: "all-opponents",
          },
        };
      }
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
  }
];
