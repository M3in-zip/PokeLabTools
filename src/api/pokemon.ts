const baseUrl = "https://pokeapi.co/api/v2";

export const fetchPokemonBaseList = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
  if (!res.ok) {
    throw new Error("Errore nel fetch");
  }
  return res.json();
};

export const fetchPokemonByName = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    throw new Error("Pokémon non trovato");
  }
  return res.json();
};
