export interface MoveRule {type: "standard" | "custom", moves: string[]; apply: (context: any) => any;}

export const moveRules: MoveRule[] = [
  {
    type: "standard",
    moves: ["Double hit", "Double iron bash", "Double kick", "Dragon darts", "Dual chop", "Dual wingbeat", "Gear grind"],
    apply: (context) => {
      return ({...context, hits: {min: 2, max: 2}});
    },
  },
  {
    type: "standard",
    moves: ["Arm thrust", "Barrage", "Bone rush", "Bullet seed", "Comet punch", "Double slap"],
    apply: (context) => {
      return ({ ...context, hits: { min: 2, max: 5 }});
    },
  }
  /* {
    type: "custom",
    moves: ["ice ball"],
    apply: (context) => {handleIceBall(context);},
  }, */
]