import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchPokemonBaseList } from "@/api/pokemon.ts";
import { usePokemonStore } from "@/stores/pokemonStore";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonBaseList(),
  });

  useEffect(() => {
    console.log("useEffect data api: ", data);
    if (data) setPokemonList(data);
  }, [data]);

  if (isLoading) return <div className="p-2">Loading...</div>;
  if (error) return <div className="p-2">Errore nel caricamento</div>;

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold mb-2">Pokémon</h1>
      {/* <img src={data.sprites.front_default} alt={data.name} className="w-48 h-48 pixel-art" /> */}
    </div>
  );
}
