import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPokemonBaseList } from "@/api/pokemon.ts";
import { usePokemonStore } from "@/stores/pokemonStore";
import { PokemonBuild } from "@/components/pokemon-build";
import { ModifiersCard } from "@/components/modifiers-card";
import moves from "@/data/moves.json";

export const Route = createFileRoute("/calculator")({
  component: PokemonCalculator,
});

function PokemonCalculator() {
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);
  const [dataPokemon1, setDataPokemon1] = useState<any>({stats: [1,1,1,1,1,1], move: {name:"origin-pulse"}, type: ["water"]});
  const [dataPokemon2, setDataPokemon2] = useState<any>({stats: [1,1,1,1,1,1], move: {name:"precipice-blades"}, type: ["ground"]});
  const [modifiers, setModifiers] = useState({weather: "sun", terrain: "grassy"});

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
  }, [pokemonList, setPokemonList]);

  if (errorPokemonList) return <div className="p-2">Errore nel caricamento</div>;

  const handlePokemonDataChange = (data: {stats: number[], move: string}) => {
    const movePokemon1 = moves.find(m => m.name === data.move);
    setDataPokemon1({...data, move: movePokemon1});
  }

  const handlePokemon2DataChange = (data: {stats: number[], move: string}) => {
    const movePokemon2 = moves.find(m => m.name === data.move);
    setDataPokemon2({...data, move: movePokemon2});
  }

  return (
    <div className="relative p-2 w-full flex flex-row gap-2 justify-between">
      <div className="">
        <PokemonBuild pokemon="kyogre" move="origin-pulse" setPokemonData={handlePokemonDataChange}/>
      </div>
      <ModifiersCard modifiers={modifiers} setModifiers={setModifiers}/>
      <div className="">
        <PokemonBuild pokemon="groudon" move="precipice-blades" setPokemonData={handlePokemon2DataChange}/>
      </div>
    </div>
  );
}
