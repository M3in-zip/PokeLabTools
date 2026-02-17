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

/* TODO check neutralizing-gas before using this vector, check air-lock, aura-break dark-aura fairy-aura, battery, beads-of-ruin, cloud-nine */
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
          },
          userAbilityModifier: 1.2,
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
    ability: "aura-break",
    apply: (context) => {
      return { ...context, "aura-break": true };
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
  {
    ability: "clorophyll",
    apply: (context) => {
      if (
        context.user.ability === "clorophyll" &&
        context.target.ability === "clorophyll" &&
        context.weather === "sun"
      )
        return context; /* tecnically not correct but it doesn't influence calc and avoid double call problem */
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
  {
    ability: "comatose",
    apply: (context) => {
      let newContext = context;
      if (context.user.ability === "comatose" && context.target.ability === "comatose") {
        newContext = {
          ...newContext,
          user: { ...newContext.user, status: "sleep" },
          target: { ...newContext.target, status: "sleep" },
        };
      }
      if (context.user.ability === "comatose") {
        newContext = {
          ...newContext,
          user: { ...newContext.user, status: "sleep" },
        };
      }
      if (context.target.ability === "comatose") {
        newContext = {
          ...newContext,
          target: { ...newContext.target, status: "sleep" },
        };
      }
      return newContext;
    },
  },
  {
    ability: "dark-aura",
    apply: (context) => {
      return { ...context, "dark-aura": true };
    },
  },
  {
    ability: "dazzling",
    apply: (context) => {
      if (context.target.ability === "dazzling")
        return {
          ...context,
          notes: [
            ...context.notes,
            "Moves with priority are uneffective",
          ],
        };
      return context;
    },
  },
  /* {
    ability: "delta-stream",
    apply: (context) => {
      if (context.weather !== "desolate-land" && context.weather !== "primordial-sea")
        return { ...context, weather: "delta-stream" };
      return context;
    },
  },
  {
    ability: "desolate-land",
    apply: (context) => {
      if (context.weather !== "delta-stream" && context.weather !== "primordial-sea")
        return { ...context, weather: "desolate-land" };
      return context;
    },
  }, */
  {
    ability: "dragons-maw",
    apply: (context) => {
      if (
        context.user.ability === "dragons-maw" &&
        context.move.type === "dragon"
      )
        return {
          ...context,
          userAbilityModifier: 1.5,
        };
      return context;
    },
  },
  {
    ability: "earth-eater",
    apply: (context) => {
      if (
        context.target.ability === "earth-eater" &&
        context.move.type === "ground"
      )
        return {
          ...context,
          pureDamage: 0,
          notes: [...context.notes, "Opponent immune to ground type moves"],
        };
      return context;
    },
  },
  {
    ability: "electromorphosis",
    apply: (context) => {
      if (context.target.ability === "electromorphosis")
        return {
          ...context,
          notes: [
            ...context.notes,
            "If hit next electric type move has double power",
          ],
        };
      return context;
    },
  },
  {
    ability: "fairy-aura",
    apply: (context) => {
      return { ...context, "fairy-aura": true };
    },
  },
  {
    ability: "filter",
    apply: (context) => {
      if (context.target.ability === "filter" && context.effectiveness > 1)
        return {
          ...context,
          effectiveness: Math.max(1, context.effectiveness * (3072 / 4096)),
        };
      return context;
    },
  },
  {
    ability: "flare-boost",
    apply: (context) => {
      if (context.user.ability === "flare-boost" && context.user.status === "burn" && context.move.category === "special") return {...context, move:{...context.move, power:Math.floor(context.move.power!*1.5)}};
      return context;
    },
  },
  {
    ability: "fluffy",
    apply: (context) => {
      let multiplier = 1;
      if (context.move.type === "fire") multiplier = multiplier*2;
      if (context.move.category === "physical") multiplier = multiplier * 0.5;
      if (context.target.ability === "fluffy" && multiplier !== 1) return {...context, targetAbilityModifier:multiplier};
      return context;
    },
  },
];
