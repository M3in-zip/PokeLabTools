import type { Context } from "@/types/pokemon";

export interface AbilityRule {
  ability: string;
  apply: (context: Context) => Context;
}

const bulletproofIgnores: string[] = [
  "acid-spray",
  "aura-sphere",
  "barrage",
  "break-blast",
  "bullet-seed",
  "egg-bomb",
  "electro-ball",
  "energy-ball",
  "focus-blast",
  "gyro-ball",
  "ice-ball",
  "magnet-bomb",
  "mist-ball",
  "mud-bomb",
  "octazooka",
  "pollen-puff",
  "pyro-ball",
  "rock-blast",
  "rock-wrecker",
  "searing-shot",
  "seed-bomb",
  "syrup-bomb",
  "shadow-ball",
  "sludge-bomb",
  "weather-ball",
  "zap-cannon",
];

/* TODO check neutralizing-gas before using this vector, check air-lock, aura-break dark-aura fairy-aura, battery, beads-of-ruin */
export const abilityRules: AbilityRule[] = [
  {
    ability: "adaptability",
    apply: (context) => {
      const isStab = context.user.type.includes(context.move.type);
      if (isStab) return { ...context, STAB: 2 };
      return context;
    },
  },
  {
    ability: "aerilate",
    apply: (context) => {
      if (context.user.ability === "aerilate" && context.move.type === "normal")
        return {
          ...context,
          move: {
            ...context.move,
            type: "flying",
            power: Math.floor(context.move.power! * 1.2),
          },
        };
      return context;
    },
  },
  {
    ability: "analytic",
    apply: (context) => {
      if (context.user.ability === "analytic")
        return {
          ...context,
          notes: [...context.notes, "30% damage boost if moves last"],
        };
      return context;
    },
  },
  {
    ability: "armor-tail",
    apply: (context) => {
      if (context.user.ability === "armor-tail")
        return {
          ...context,
          notes: [...context.notes, "Armor tail prevents priority moves"],
        };
      return context;
    },
  },
  {
    ability: "battle-armor",
    apply: (context) => {
      if (context.target.ability === "battle-armor")
        return { ...context, crit: false };
      return context;
    },
  },
  {
    ability: "bulletproof",
    apply: (context) => {
      if (
        context.target.ability === "bulletproof" &&
        bulletproofIgnores.includes(context.move.name)
      )
        return { ...context, pureDamage: 0 };
      return context;
    },
  },
  /* TODO check if both are clorophyll call this only once */
  {
    ability: "clorophyll",
    apply: (context) => {
      if (
        context.user.ability === "clorophyll" &&
        context.target.ability === "clorophyll" &&
        context.weather === "sun"
      )
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Speed: context.user.stats.Speed * 2,
            },
          },
          target: {
            ...context.target,
            stats: {
              ...context.target.stats,
              Speed: context.target.stats.Speed * 2,
            },
          },
        };
      if (context.user.ability === "clorophyll" && context.weather === "sun")
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Speed: context.user.stats.Speed * 2,
            },
          },
        };
      if (context.target.ability === "clorophyll" && context.weather === "sun")
        return {
          ...context,
          target: {
            ...context.target,
            stats: {
              ...context.target.stats,
              Speed: context.target.stats.Speed * 2,
            },
          },
        };
      return context;
    },
  },
];
