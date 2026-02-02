export interface MoveRule {
  type: "standard" | "custom";
  moves: string[];
  apply: (context: any) => any;
}

export const moveRules: MoveRule[] = [
  {
    type: "standard",
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
    type: "standard",
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
    type: "standard",
    moves: [
      "arm thrust",
      "barrage",
      "bone rush",
      "bullet seed",
      "comet punch",
      "double slap",
      "fury attack",
      "fury swipes",
      "pin missile",
      "rock blast",
      "scale shot",
      "spike cannon",
      "tail slap",
      "water shuriken",
    ],
    apply: (context) => {
      return { ...context, hits: { min: 2, max: 5 } };
    },
  },
  {
    type: "standard",
    moves: ["population bomb"],
    apply: (context) => {
      return { ...context, hits: { min: 1, max: 10 } };
    },
  }
  {
    type: "standard",
    moves: ["dragon rage", "sonic boom", "seismic toss", "night shade"],
    apply: (context:any) => {
      var damage:number = 0;
      if (context.move.name === "dragon rage") damage=40;
      else if (context.move.name === "sonic boom") damage=20;
      else damage=context.user.stats.level;
      return { ...context, pureDamage: damage };
    },
  }
  /* {
    type: "custom",
    moves: ["ice ball"],
    apply: (context) => {handleIceBall(context);},
  }, */
];
