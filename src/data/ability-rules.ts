import type { Context, Pokemon } from "@/types/pokemon";

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

/* TODO check neutralizing-gas before using this vector */
export const abilityRules: AbilityRule[] = [
  {
    ability: "adaptability",
    apply: (context) => {
      const isStab = context.user.type.includes(context.move.type);
      if (context.user.ability === "adaptability" && isStab)
        return { ...context, STAB: 2 };
      return context;
    },
  },
  {
    ability: "air-lock",
    apply: (context) => {
      return { ...context, "air-lock": true };
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
      if (context.target.ability === "armor-tail")
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
    ability: "chlorophyll",
    apply: (context) => {
      if (
        context.user.ability === "chlorophyll" &&
        context.target.ability === "chlorophyll" &&
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
      if (context.user.ability === "chlorophyll" && context.weather === "sun")
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
      if (context.target.ability === "chlorophyll" && context.weather === "sun")
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
    ability: "cloud-nine",
    apply: (context) => {
      return { ...context, "cloud-nine": true };
    },
  },
  {
    ability: "comatose",
    apply: (context) => {
      const applyComatose = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "comatose"
          ? { ...pokemon, status: "sleep" }
          : pokemon;

      return {
        ...context,
        user: applyComatose(context.user),
        target: applyComatose(context.target),
      };
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
          notes: [...context.notes, "Dazzling prevents priority moves"],
        };
      return context;
    },
  },
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
            "If hit get charged, when charged next electric type move has double power and lose the charge",
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
      if (
        context.user.ability === "flare-boost" &&
        context.user.status === "burn" &&
        context.move.category === "special"
      )
        return {
          ...context,
          move: {
            ...context.move,
            power: Math.floor(context.move.power! * 1.5),
          },
        };
      return context;
    },
  },
  {
    ability: "fluffy",
    apply: (context) => {
      let multiplier = 1;
      if (context.move.type === "fire") multiplier = multiplier * 2;
      if (context.move.category === "physical") multiplier = multiplier * 0.5;
      if (context.target.ability === "fluffy" && multiplier !== 1)
        return { ...context, targetAbilityModifier: multiplier };
      return context;
    },
  },
  {
    ability: "forecast",
    apply: (context) => {
      const weatherTypeMap: Record<string, string> = {
        sun: "fire",
        rain: "water",
        snow: "ice",
      };
      const weather = context.weather ? context.weather : undefined;
      const type = weather ? (weatherTypeMap[weather] ?? "normal") : "normal";
      if (
        context.user.ability === "forecast" &&
        context.target.ability === "forecast"
      )
        return {
          ...context,
          user: { ...context.user, type: [type] },
          target: { ...context.target, type: [type] },
        };
      if (context.user.ability === "forecast")
        return { ...context, user: { ...context.user, type: [type] } };
      if (context.target.ability === "forecast")
        return { ...context, target: { ...context.target, type: [type] } };
      return context;
    },
  },
  {
    ability: "fur-coat",
    apply: (context) => {
      if (context.target.ability === "fur-coat")
        return {
          ...context,
          target: {
            ...context.target,
            stats: {
              ...context.target.stats,
              Def: context.target.stats.Def * 2,
            },
          },
        };
      return context;
    },
  },
  {
    ability: "gale-wings",
    apply: (context) => {
      if (
        context.user.ability === "gale-wings" &&
        context.move.type === "flying"
      )
        return {
          ...context,
          move: { ...context.move, priority: context.move.priority + 1 },
        };
      return context;
    },
  },
  {
    ability: "galvanize",
    apply: (context) => {
      if (
        context.user.ability === "galvanize" &&
        context.move.type === "normal"
      )
        return {
          ...context,
          move: {
            ...context.move,
            type: "electric",
            power: Math.floor(context.move.power! * 1.2),
          },
        };
      return context;
    },
  },
  {
    ability: "gorilla-tactics",
    apply: (context) => {
      if (context.user.ability === "gorilla-tactics")
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Atk: Math.floor(context.user.stats.Atk * 1.5),
            },
          },
          notes: [
            ...context.notes,
            "Gorilla tactics boosts attack but locks the pokemon in the first move used",
          ],
        };
      return context;
    },
  },
  {
    ability: "grass-pelt",
    apply: (context) => {
      if (context.terrain !== "grassy") return context;

      const applyGrassPeltDefense = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "grass-pelt"
          ? {
              ...pokemon,
              stats: {
                ...pokemon.stats,
                Def: Math.floor(pokemon.stats.Def * 1.5),
              },
            }
          : pokemon;

      return {
        ...context,
        user: applyGrassPeltDefense(context.user),
        target: applyGrassPeltDefense(context.target),
      };
    },
  },
  {
    ability: "guts",
    apply: (context) => {
      const applyGutsAttack = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "guts" && pokemon.status
          ? {
              ...pokemon,
              stats: {
                ...pokemon.stats,
                Atk: Math.floor(pokemon.stats.Atk * 1.5),
              },
            }
          : pokemon;

      return {
        ...context,
        user: applyGutsAttack(context.user),
        target: applyGutsAttack(context.target),
      };
    },
  },
  {
    ability: "hadron-engine",
    apply: (context) => {
      if (context.user.ability === "hadron-engine" && context.terrain === "electric")
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              "Sp. Atk": Math.floor(context.user.stats["Sp. Atk"] * 5461/4096),
            },
          },
        };
      return context;
    }
  },
  {
    ability: "heat-proof",
    apply: (context) => {
      if (context.target.ability === "heat-proof" && context.move.type === "fire")
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Atk: Math.floor(context.user.stats.Atk * 0.5),
              "Sp. Atk": Math.floor(context.user.stats["Sp. Atk"] * 0.5),
            },
          },
        };
      return context;
    },
  },
];
