const baseUrl = "https://pokeapi.co/api/v2";

export const getPokemonBaseList = async () => {
  const res = await fetch(`${baseUrl}/pokemon?limit=2000`);
  if (!res.ok) {
    throw new Error("Errore nel fetch");
  }
  return res.json();
};

export const getPokemonByName = async (name: string) => {
  const res = await fetch(`${baseUrl}/pokemon/${name}`);
  if (!res.ok) {
    throw new Error("Pokémon non trovato");
  }
  return res.json();
};
