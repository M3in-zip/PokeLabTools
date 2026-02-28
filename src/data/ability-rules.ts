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

const ironFistMoves: string[] = [
  "bullet-punch",
  "comet-punch",
  "dizzy-punch",
  "double-iron-bash",
  "drain-punch",
  "dynamic-punch",
  "fire-punch",
  "focus-punch",
  "hammer-arm",
  "ice-hammer",
  "ice-punch",
  "mach-punch",
  "mega-punch",
  "power-up-punch",
  "shadow-punch",
  "sky-uppercut",
  "thunder-punch",
];

const liquidationMoves: string[] = [
  "snore",
  "uproar",
  "hyper-voice",
  "bug-buzz",
  "chatter",
  "round",
  "echoed-voice",
  "relic-song",
  "snarl",
  "disarming-voice",
  "boomburst",
  "sparkling-aria",
  "clanging-scales",
  "clangorous-soulblaze",
  "clangorous-soul",
  "overdrive",
  "eerie-spell",
  "torch-song",
  "alluring-voice",
  "psychic-noise",
];

const megaLauncherMoves: string[] = [
  "aura-sphere",
  "dark-pulse",
  "dragon-pulse",
  "heal-pulse",
  "terrain-pulse",
  "water-pulse",
];

const moldBreakerIgnores: string[] = [
  "Aroma-Veil",
  "Battle-Armor",
  "Big-Pecks",
  "Bulletproof",
  "Clear-Body",
  "Contrary",
  "Damp",
  "Dazzling",
  "Disguise",
  "Dry-Skin",
  "Filter",
  "Flash-Fire",
  "Flower-Gift",
  "Flower-Veil",
  "Fluffy",
  "Friend-Guard" /* TODO handle */,
  "Fur-Coat",
  "Heatproof",
  "Heavy-Metal",
  "Hyper-Cutter",
  "Immunity",
  "Inner-Focus",
  "Insomnia",
  "Keen-Eye",
  "Leaf-Guard",
  "Levitate",
  "Light-Metal",
  "Lightning-rod",
  "Limber",
  "Magic-Bounce",
  "Magma-Armor",
  "Marvel-Scale",
  "Motor-Drive",
  "Multiscale",
  "Oblivious",
  "Overcoat",
  "Own-Tempo",
  "Queenly-Majesty",
  "Sand-Veil",
  "Sap-Sipper",
  "Shell-Armor",
  "Shield-Dust",
  "Simple",
  "Snow-Cloak",
  "Solid-Rock",
  "Soundproof",
  "Sticky-Hold",
  "Storm-Drain",
  "Sturdy",
  "Suction-Cups",
  "Sweet-Veil",
  "Tangled-Feet",
  "Telepathy",
  "Thick-Fat",
  "Unaware",
  "Vital-Spirit",
  "Volt-Absorb",
  "Water-Absorb",
  "Water-Bubble",
  "Water-Veil",
  "White-Smoke",
  "Wonder-Guard",
  "Wonder-Skin",
];

const punkRockAffects: string[] = [
  "boomburst",
  "hyper-voice",
  "overdrive",
  "psychic-noise",
  "round",
  "snarl",
  "snore",
  "uproar",
  "alluring-voice",
  "bug-buzz",
  "clanging-scales",
  "disarming-voice",
  "echoed-voice",
  "relic-song",
  "eerie-spell",
  "sparkling-aria",
  "torch-song",
];

const sharpnessBoosts: string[] = [
  "aerial-ace",
  "air-cutter",
  "air-slash",
  "aqua-cutter",
  "ceaseless-edge",
  "fury-cutter",
  "leaf-blade",
  "night-slash",
  "psycho-cut",
  "razor-shell",
  "sacred-sword",
  "slash",
  "solar-blade",
  "stone-axe",
  "x-scissor",
];

const strongJawBoosts: string[] = [
  "bite",
  "crunch",
  "fire-fang",
  "fishious-rend",
  "hyper-fang",
  "ice-fang",
  "jaw-lock",
  "poison-fang",
  "psychic-fang",
  "thunder-fang",
];

export const neutralizingGasCheck = (
  userAbility: string,
  targetAbility: string,
) => {
  if (
    userAbility !== "neutralizing-gas" &&
    targetAbility !== "neutralizing-gas"
  )
    return false;
  return true;
};

export const moldBreakerCheck = (
  userAbility: string,
  targetAbility: string,
) => {
  if (userAbility !== "mold-breaker") return false;
  return moldBreakerIgnores.includes(targetAbility);
};

export const abilityRulesInfluenceMoveType: AbilityRule[] = [
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
    ability: "liquid-voice",
    apply: (context) => {
      if (
        context.user.ability === "liquid-voice" &&
        liquidationMoves.includes(context.move.name)
      )
        return {
          ...context,
          move: {
            ...context.move,
            type: "water",
          },
        };
      return context;
    },
  },
  {
    ability: "normalize",
    apply: (context) => {
      if (context.user.ability === "normalize")
        return { ...context, move: { ...context.move, type: "normal" } };
      return context;
    },
  },
  {
    ability: "pixilate",
    apply: (context) => {
      if (context.user.ability === "pixilate" && context.move.type === "normal")
        return { ...context, move: { ...context.move, type: "fairy" } };
      return context;
    },
  },
  {
    ability: "refrigerate",
    apply: (context) => {
      if (
        context.user.ability === "refrigerate" &&
        context.move.type === "normal"
      )
        return { ...context, move: { ...context.move, type: "ice" } };
      return context;
    },
  },
];

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
      if (context.weather !== "sun") return context;

      const applyChlorophyll = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "chlorophyll"
          ? {
              ...pokemon,
              stats: {
                ...pokemon.stats,
                Speed: pokemon.stats.Speed * 2,
              },
            }
          : pokemon;

      return {
        ...context,
        user: applyChlorophyll(context.user),
        target: applyChlorophyll(context.target),
      };
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
          effectiveness: context.effectiveness * (3072 / 4096),
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
      if (
        context.user.ability === "hadron-engine" &&
        context.terrain === "electric"
      )
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              "Sp. Atk": Math.floor(
                (context.user.stats["Sp. Atk"] * 5461) / 4096,
              ),
            },
          },
        };
      return context;
    },
  },
  {
    ability: "heatproof",
    apply: (context) => {
      if (
        context.target.ability === "heatproof" &&
        context.move.type === "fire"
      )
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
  {
    ability: "heavy-metal",
    apply: (context) => {
      const applyHeavyMetal = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "heavy-metal"
          ? {
              ...pokemon,
              weight: pokemon.weight * 2,
            }
          : pokemon;

      return {
        ...context,
        user: applyHeavyMetal(context.user),
        target: applyHeavyMetal(context.target),
      };
    },
  },
  {
    ability: "huge-power",
    apply: (context) => {
      if (context.user.ability === "huge-power")
        return {
          ...context,
          user: {
            ...context.user,
            stats: { ...context.user.stats, Atk: context.user.stats.Atk * 2 },
          },
        };
      return context;
    },
  },
  {
    ability: "hustle",
    apply: (context) => {
      if (context.user.ability === "hustle")
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Atk: Math.floor(context.user.stats.Atk * 1.5),
            },
          },
        };
      return context;
    },
  },
  {
    ability: "ice-scales",
    apply: (context) => {
      if (context.target.ability === "ice-scales")
        return {
          ...context,
          targetAbilityModifier: 0.5,
        };
      return context;
    },
  },
  {
    ability: "infiltrator",
    apply: (context) => {
      if (context.user.ability === "infiltrator")
        return {
          ...context,
          infiltrator: true,
        };
      return context;
    },
  },
  {
    ability: "insomnia",
    apply: (context) => {
      const applyInsomnia = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "insomnia" && pokemon.status === "sleep"
          ? { ...pokemon, status: undefined }
          : pokemon;

      return {
        ...context,
        user: applyInsomnia(context.user),
        target: applyInsomnia(context.target),
      };
    },
  },
  {
    ability: "iron-fist",
    apply: (context) => {
      if (
        context.user.ability === "iron-fist" &&
        ironFistMoves.includes(context.move.name)
      )
        return {
          ...context,
          move: {
            ...context.move,
            power: Math.floor(context.move.power! * 1.2),
          },
        };
      return context;
    },
  },
  {
    ability: "klutz",
    apply: (context) => {
      return {
        ...context,
        userIgnoresItem: context.user.ability === "klutz",
        targetIgnoresItem: context.target.ability === "klutz",
      };
    },
  },
  {
    ability: "levitate",
    apply: (context) => {
      if (
        context.target.ability === "levitate" &&
        context.move.type === "ground"
      )
        return { ...context, pureDamage: 0 };
      return context;
    },
  },
  {
    ability: "light-metal",
    apply: (context) => {
      const applyLightMetal = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "light-metal"
          ? {
              ...pokemon,
              weight: Math.floor(pokemon.weight * 0.5),
            }
          : pokemon;

      return {
        ...context,
        user: applyLightMetal(context.user),
        target: applyLightMetal(context.target),
      };
    },
  },
  {
    ability: "lightning-rod",
    apply: (context) => {
      if (
        context.target.ability === "lightning-rod" &&
        context.move.type === "electric"
      )
        return {
          ...context,
          pureDamage: 0,
          notes: [...context.notes, "Opponent immune to electric type moves"],
        };
      return context;
    },
  },
  {
    ability: "limber",
    apply: (context) => {
      const applyLimber = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "limber" && pokemon.status === "paralysis"
          ? { ...pokemon, status: undefined }
          : pokemon;

      return {
        ...context,
        user: applyLimber(context.user),
        target: applyLimber(context.target),
      };
    },
  },
  {
    ability: "mega-launcher",
    apply: (context) => {
      if (
        context.user.ability === "mega-launcher" &&
        megaLauncherMoves.includes(context.move.name)
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
    ability: "merciless",
    apply: (context) => {
      if (
        context.user.ability === "merciless" &&
        context.target.status === "poison"
      )
        return { ...context, crit: true };
      return context;
    },
  },
  {
    ability: "mimicry",
    apply: (context) => {
      const types: Record<string, string> = {
        electric: "electric",
        grassy: "grass",
        misty: "fairy",
        psychic: "psychic",
      };

      const type = types[context.terrain ?? ""] ?? "normal";
      const applyMimicry = (pokemon: Pokemon): Pokemon => {
        if (pokemon.ability === "mimicry") {
          return { ...pokemon, type: [type] };
        }
        return pokemon;
      };
      return {
        ...context,
        user: applyMimicry(context.user),
        target: applyMimicry(context.target),
      };
    },
  },
  {
    ability: "minds-eye",
    apply: (context) => {
      if (context.user.ability === "minds-eye")
        return { ...context, "minds-eye": true };
      return context;
    },
  },
  {
    ability: "multiscale",
    apply: (context) => {
      if (context.user.ability === "multiscale")
        return {
          ...context,
          notes: [
            ...context.notes,
            "Multiscale reduces damage by half if at full HP",
          ],
        };
      return context;
    },
  },
  {
    ability: "neuroforce",
    apply: (context) => {
      if (context.user.ability === "neuroforce" && context.effectiveness > 1)
        return { ...context, userAbilityModifier: 1.25 };
      return context;
    },
  },
  {
    ability: "orichalcum-pulse",
    apply: (context) => {
      if (
        context.user.ability === "orichalcum-pulse" &&
        context.weather === "sun"
      )
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Atk: Math.floor((context.user.stats.Atk * 5461) / 4096),
            },
          },
        };
      return context;
    },
  },
  {
    ability: "parental-bond",
    apply: (context) => {
      if (context.user.ability === "parental-bond" && context.effectiveness > 1)
        return { ...context, userAbilityModifier: 1.25 };
      return context;
    },
  },
  {
    ability: "prism-armor",
    apply: (context) => {
      if (context.user.ability === "prism-armor" && context.effectiveness > 1)
        return {
          ...context,
          notes: [...context.notes, "Prism Armor reduces damage by 25%"],
        };
      return context;
    },
  },
  {
    ability: "punk-rock",
    apply: (context) => {
      const isSoundMove = punkRockAffects.includes(context.move.name);
      if (!isSoundMove) return context;

      const userHasPunkRock = context.user.ability === "punk-rock";
      const targetHasPunkRock = context.target.ability === "punk-rock";
      let newContext = { ...context };

      if (userHasPunkRock)
        newContext = {
          ...newContext,
          move: {
            ...context.move,
            power: Math.floor(context.move.power! * 1.3),
          },
        };
      if (targetHasPunkRock)
        newContext = { ...newContext, targetAbilityModifier: 0.5 };
      return newContext;
    },
  },
  {
    ability: "pure-power",
    apply: (context) => {
      if (context.user.ability === "pure-power")
        return {
          ...context,
          user: {
            ...context.user,
            stats: { ...context.user.stats, Atk: context.user.stats.Atk * 2 },
          },
        };
      return context;
    },
  },
  {
    ability: "purifying-salt",
    apply: (context) => {
      if (
        context.target.ability === "purifying-salt" &&
        context.move.type === "ghost"
      )
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
  {
    ability: "queenly-majesty",
    apply: (context) => {
      if (context.target.ability === "queenly-majesty")
        return {
          ...context,
          notes: [...context.notes, "Queenly Majesty prevents priority moves"],
        };
      return context;
    },
  },
  {
    ability: "quick-feet",
    apply: (context) => {
      const applyQuickFeet = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "quick-feet" && pokemon.status
          ? {
              ...pokemon,
              stats: {
                ...pokemon.stats,
                Speed: Math.floor(pokemon.stats.Speed * 1.5),
              },
            }
          : pokemon;

      return {
        ...context,
        user: applyQuickFeet(context.user),
        target: applyQuickFeet(context.target),
      };
    },
  },
  {
    ability: "reckless",
    apply: (context) => {
      if (context.user.ability === "reckless")
        return {
          ...context,
          notes: [...context.notes, "Boosts power of recoil moves by 20%"],
        };
      return context;
    },
  },
  {
    ability: "rocky-payload",
    apply: (context) => {
      if (
        context.user.ability === "rocky-payload" &&
        context.move.type === "rock"
      )
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Atk: Math.floor(context.user.stats.Atk * 1.5),
              "Sp. Atk": Math.floor(context.user.stats["Sp. Atk"] * 1.5),
            },
          },
        };
      return context;
    },
  },
  {
    ability: "sand-force",
    apply: (context) => {
      if (context.user.ability !== "sand-force" || context.weather !== "sand")
        return context;

      const boostedTypes = ["ground", "rock", "steel"];
      if (!boostedTypes.includes(context.move.type)) return context;

      return {
        ...context,
        move: {
          ...context.move,
          power: Math.floor(context.move.power! * 1.3),
        },
      };
    },
  },
  {
    ability: "sand-rush",
    apply: (context) => {
      const applySandRush = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "sand-rush" && context.weather === "sand"
          ? {
              ...pokemon,
              stats: {
                ...pokemon.stats,
                Speed: Math.floor(pokemon.stats.Speed * 2),
              },
            }
          : pokemon;

      return {
        ...context,
        user: applySandRush(context.user),
        target: applySandRush(context.target),
      };
    },
  },
  {
    ability: "sap-sipper",
    apply: (context) => {
      if (
        context.target.ability === "sap-sipper" &&
        context.move.type === "grass"
      )
        return {
          ...context,
          pureDamage: 0,
          notes: [...context.notes, "Opponent immune to grass type moves"],
        };
      return context;
    },
  },
  {
    ability: "scrappy",
    apply: (context) => {
      if (
        context.user.ability === "scrappy" &&
        context.target.type.includes("ghost") &&
        (context.move.type === "normal" || context.move.type === "fighting")
      )
        return {
          ...context,
          effectiveness: 1,
        };
      return context;
    },
  },
  {
    ability: "screeen-cleaner",
    apply: (context) => {
      if (context.user.ability === "screen-cleaner")
        return {
          ...context,
          "light-screen": false,
          reflect: false,
          "aurora-veil": false,
        };
      return context;
    },
  },
  {
    ability: "shadow-shield",
    apply: (context) => {
      if (context.target.ability === "shadow-shield")
        return {
          ...context,
          notes: [
            ...context.notes,
            "(shadow-shield) If enemy is at full HP, reduce damage by 50%",
          ],
        };
      return context;
    },
  },
  {
    ability: "sharpness",
    apply: (context) => {
      if (
        sharpnessBoosts.includes(context.move.name.toLowerCase()) &&
        context.user.ability === "sharpness"
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
    ability: "sheer-force",
    apply: (context) => {
      if (context.user.ability === "sheer-force")
        return {
          ...context,
          notes: [
            ...context.notes,
            "(sheer-force) Boosts power of moves with secondary effects by 30%, but removes those effects",
          ],
        };
      return context;
    },
  },
  {
    ability: "shell-armor",
    apply: (context) => {
      if (context.target.ability === "shell-armor")
        return {
          ...context,
          crit: false,
        };
      return context;
    },
  },
  {
    ability: "slush-rush",
    apply: (context) => {
      const applySlushRush = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "slush-rush" && context.weather === "snow"
          ? {
              ...pokemon,
              stats: {
                ...pokemon.stats,
                Speed: Math.floor(pokemon.stats.Speed * 2),
              },
            }
          : pokemon;

      return {
        ...context,
        user: applySlushRush(context.user),
        target: applySlushRush(context.target),
      };
    },
  },
  {
    ability: "solar-power",
    apply: (context) => {
      if (context.user.ability === "solar-power" && context.weather === "sun")
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              "Sp. Atk": Math.floor(context.user.stats["Sp. Atk"] * 1.5),
            },
          },
        };
      return context;
    },
  },
  {
    ability: "solid-rock",
    apply: (context) => {
      if (context.target.ability === "solid-rock" && context.effectiveness > 1)
        return {
          ...context,
          effectiveness: context.effectiveness * 0.75,
          notes: [...context.notes, "(solid-rock) Reduces super-effective damage by 25%"],
        };
      return context;
    },
  },
  {
    ability: "soundproof",
    apply: (context) => {
      if (context.target.ability === "soundproof" && punkRockAffects.includes(context.move.name))
        return {
          ...context,
          pureDamage: 0,
          notes: [...context.notes, "(soundproof) Immune to sound-based moves"],
        };
      return context;
    },
  },
  {
    ability: "steel-worker",
    apply: (context) => {
      if (context.user.ability === "steel-worker" && context.move.type === "steel")
        return {
          ...context,
          user: {
            ...context.user,
            stats: {
              ...context.user.stats,
              Atk: Math.floor(context.user.stats.Atk * 1.5),
            },
          },
        };
      return context;
    },
  },
  {
    ability: "storm-drain",
    apply: (context) => {
      if (context.target.ability === "storm-drain" && context.move.type === "water")
        return {
          ...context,
          pureDamage: 0,
          notes: [...context.notes, "(storm-drain) Immune to water moves"],
        };
      return context;
    },
  },
  {
    ability: "strong-jaw",
    apply: (context) => {
      if (strongJawBoosts.includes(context.move.name) && context.user.ability === "strong-jaw")
        return {
          ...context,
          move: {
            ...context.move,
            power: Math.floor(context.move.power! * 1.5),
          },
          notes: [...context.notes, "(strong-jaw) Boosts power of biting moves by 50%"],
        };
      return context;
    },
  },
  {
    ability: "surge-surfer",
    apply: (context) => {
      const applySurgeSurfer = (pokemon: Pokemon): Pokemon =>
        pokemon.ability === "surge-surfer" && context.terrain === "electric"
          ? {
              ...pokemon,
              stats: {
                ...pokemon.stats,
                Speed: Math.floor(pokemon.stats.Speed * 2),
              },
            }
          : pokemon;

      return {
        ...context,
        user: applySurgeSurfer(context.user),
        target: applySurgeSurfer(context.target),
      };
    },
  },
];
