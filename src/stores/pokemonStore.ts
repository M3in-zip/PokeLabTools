import { create } from "zustand";

interface PokemonBase {
  id: number;
  name: string;
}

export interface pokemonNature {
  name: string;
  increasedStat?: string;
  decreasedStat?: string;
}

interface PokemonStore {
  itemList: string[];
  pokemonList: PokemonBase[];
  setPokemonList: (list: PokemonBase[]) => void;
  natureList: pokemonNature[];
  getNonNeutralNatures: () => pokemonNature[];
}

export const usePokemonStore = create<PokemonStore>((set, get) => {
  const itemList: string[] = [
    "adamant-orb",
    "assault-vest",
    "black-belt",
    "black-glasses",
    "charcoal",
    "choice-band",
    "choice-scarf",
    "choice-specs",
    "draco-plate",
    "dragon-fang",
    "dread-plate",
    "earth-plate",
    "eviolite",
    "expert-belt",
    "fist-plate",
    "flame-plate",
    "grigeous-orb",
    "icicle-plate",
    "insect-plate",
    "iron-ball",
    "iron-plate",
    "life-orb",
    "lustrous-orb",
    "magnet",
    "meadow-plate",
    "metal-coat",
    "mind-plate",
    "miracle-seed",
    "mystic-water",
    "never-melt-ice",
    "odd-incense",
    "pixie-plate",
    "poison-barb",
    "sharp-beak",
    "silk-scarf",
    "sky-plate",
    "soft-sand",
    "spell-tag",
    "splash-plate",
    "spooky-plate",
    "stone-plate",
    "thick-club",
    "toxic-plate",
    "twisted-spoon",
    "waves-incense",
    "wise-glasses",
    "zap-plate",
  ];
  const natureList: pokemonNature[] = [
    { name: "Adamant", increasedStat: "Atk", decreasedStat: "Sp. Atk" },
    { name: "Bashful" },
    { name: "Bold", increasedStat: "Def", decreasedStat: "Atk" },
    { name: "Brave", increasedStat: "Atk", decreasedStat: "Speed" },
    { name: "Calm", increasedStat: "Sp. Def", decreasedStat: "Atk" },
    { name: "Careful", increasedStat: "Sp. Def", decreasedStat: "Sp. Atk" },
    { name: "Docile" },
    { name: "Gentle", increasedStat: "Sp. Def", decreasedStat: "Def" },
    { name: "Hardy" },
    { name: "Hasty", increasedStat: "Speed", decreasedStat: "Def" },
    { name: "Impish", increasedStat: "Def", decreasedStat: "Sp. Atk" },
    { name: "Jolly", increasedStat: "Speed", decreasedStat: "Sp. Atk" },
    { name: "Lax", increasedStat: "Def", decreasedStat: "Sp. Def" },
    { name: "Lonely", increasedStat: "Atk", decreasedStat: "Def" },
    { name: "Mild", increasedStat: "Sp. Atk", decreasedStat: "Def" },
    { name: "Modest", increasedStat: "Sp. Atk", decreasedStat: "Atk" },
    { name: "Naive", increasedStat: "Speed", decreasedStat: "Sp. Def" },
    { name: "Naughty", increasedStat: "Atk", decreasedStat: "Sp. Def" },
    { name: "Quiet", increasedStat: "Sp. Atk", decreasedStat: "Speed" },
    { name: "Quirky" },
    { name: "Rash", increasedStat: "Sp. Atk", decreasedStat: "Sp. Def" },
    { name: "Relaxed", increasedStat: "Def", decreasedStat: "Speed" },
    { name: "Sassy", increasedStat: "Sp. Def", decreasedStat: "Speed" },
    { name: "Serious" },
    { name: "Timid", increasedStat: "Speed", decreasedStat: "Atk" },
  ];
  const nonNeutralNatures = natureList.filter((n) => n.increasedStat);

  return {
    pokemonList: [],
    setPokemonList: (list) => set({ pokemonList: list }),
    itemList: itemList,
    natureList: natureList,
    getNonNeutralNatures: () => nonNeutralNatures,
  };
});
