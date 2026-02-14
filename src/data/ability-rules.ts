import type { Context } from "@/types/pokemon";

export interface AbilityRule {
  ability: string;
  apply: (context: Context) => Context;
}


/* TODO check neutralizing gas before using this vector, check air lock */
export const abilityRules: AbilityRule[] = [
  {
    ability: "adaptability",
    apply: (context) => {
      const isStab = context.user.type.includes(context.move.type);
      if (isStab)
        return { ...context, STAB: 2 };
      return context;
    },
  },
  {
    ability: "aerilate",
    apply: (context) => {
      if (context.user.ability === "aerilate" && context.move.type === "normal")
        return { ...context, move: { ...context.move, type: "flying", power:Math.floor(context.move.power!*1.2) } };
      return context;
    },
  },
  {
    ability: "analytic",
    apply: (context) => {
      return {...context, notes: [...context.notes, "30% damage boost if moves last"]};
    },
  },
  {
    ability: "armor-tail",
    apply: (context) => {
        return {...context, notes: [...context.notes, "prevents priority moves from opponents"]};
    },
  },
];
