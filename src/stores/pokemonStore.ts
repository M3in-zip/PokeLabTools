import { create } from 'zustand'

interface PokemonBase {
  id: number
  name: string
}

interface PokemonStore {
  pokemonList: PokemonBase[]
  setPokemonList: (list: PokemonBase[]) => void
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemonList: [],
  setPokemonList: (list) => set({ pokemonList: list }),
}))
