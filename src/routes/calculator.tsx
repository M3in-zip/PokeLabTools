import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPokemonBaseList } from "@/api/pokemon.ts";
import { usePokemonStore } from "@/stores/pokemonStore";
import { FullPageSpinner } from "@/components/full-page-spinner";
import { PokemonBuild } from "@/components/pokemon-build";
import { ModifiersCard } from "@/components/modifiers-card";

export const Route = createFileRoute("/calculator")({
  component: PokemonCalculator,
});

function PokemonCalculator() {
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);
  const [dataPokemon1, setDataPokemon1] = useState({stats: [1,1,1,1,1,1], move: ""});
  const [dataPokemon2, setDataPokemon2] = useState({stats: [1,1,1,1,1,1], move: ""});

  useEffect(() => {
    console.log("Pokemon 1 data changed: ", dataPokemon1, "Pokemon 2 data: ", dataPokemon2);
  }, [dataPokemon1, dataPokemon2]);

  const { data:pokemonList, isLoading:loadingPokemonList, error:errorPokemonList } = useQuery({
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
    if (pokemonList) setPokemonList(pokemonList);
    if (pokemonList) console.log(usePokemonStore.getState().pokemonList);
  }, [pokemonList, setPokemonList]);

  if (errorPokemonList) return <div className="p-2">Errore nel caricamento</div>;

  return (
    <div className="p-2 w-full flex flex-row gap-2 justify-between">
      {loadingPokemonList && <FullPageSpinner />}
      <div className="lg:w-[30%]">
        <PokemonBuild setPokemonData={setDataPokemon1}/>
      </div>
      <ModifiersCard />
      <div className="lg:w-[30%]">
        <PokemonBuild setPokemonData={setDataPokemon2}/>
      </div>
    </div>
  );
}
