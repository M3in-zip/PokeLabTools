import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getPokemonBaseList } from "@/api/pokemon.ts";
import { usePokemonStore } from "@/stores/pokemonStore";
import { FullPageSpinner } from "@/components/full-page-spinner";

export const Route = createFileRoute("/calculator")({
  component: PokemonCalculator,
});

function PokemonCalculator() {
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => getPokemonBaseList(),
    select: (data) =>
      data.results.map((pokemon: any) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        return {
          name: pokemon.name,
          id: id,
        };
      }),
  });

  useEffect(() => {
    if (data) setPokemonList(data);
    console.log(usePokemonStore.getState().pokemonList);
  }, [data]);

  if (error) return <div className="p-2">Errore nel caricamento</div>;

  return (
    <div className="p-2">
      {isLoading && <FullPageSpinner />}
      <h1 className="text-xl font-bold mb-2">Pokémon</h1>
      {/* <img src={data.sprites.front_default} alt={data.name} className="w-48 h-48 pixel-art" /> */}
    </div>
  );
}
