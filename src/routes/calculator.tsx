import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPokemonBaseList } from "@/api/pokemon.ts";
import { usePokemonStore } from "@/stores/pokemonStore";
import { PokemonBuild, type PokemonInfo } from "@/components/pokemon-build";
import { ModifiersCard } from "@/components/modifiers-card";
import moves from "@/data/moves.json";
import type { Stats, PokemonMove } from "@/types/pokemon";

//equal to PokemonInfo but move is PokemonMove type
interface pokemonData {
  stats: Stats;
  type: string[];
  weight: number;
  move: PokemonMove;
}

export const Route = createFileRoute("/calculator")({
  component: PokemonCalculator,
});

function PokemonCalculator() {
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);
  const [dataPokemon1, setDataPokemon1] = useState<pokemonData>({
    stats: { HP: 1, Atk: 1, Def: 1, "Sp. Atk": 1, "Sp. Def": 1, Speed: 1 },
    weight: 0,
    move: moves.find((m) => m.name === "origin-pulse") as PokemonMove,
    type: ["water"],
  });
  const [dataPokemon2, setDataPokemon2] = useState<pokemonData>({
    stats: { HP: 1, Atk: 1, Def: 1, "Sp. Atk": 1, "Sp. Def": 1, Speed: 1 },
    weight: 0,
    move: moves.find((m) => m.name === "precipice-blades") as PokemonMove,
    type: ["ground"],
  });
  const [modifiers, setModifiers] = useState({
    battle:"double",
    weather: "sun",
    terrain: "grassy",
  });

  useEffect(() => {
    console.log(
      "Pokemon 1 data changed: ",
      dataPokemon1,
      "Pokemon 2 data: ",
      dataPokemon2,
    );
  }, [dataPokemon1, dataPokemon2]);

  const {
    data: pokemonList,
    isLoading: loadingPokemonList,
    error: errorPokemonList,
  } = useQuery({
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

  if (errorPokemonList)
    return <div className="p-2">Errore nel caricamento</div>;

  const handlePokemonDataChange = (data: PokemonInfo) => {
    const movePokemon1 = moves.find((m) => m.name === data.move);
    if (movePokemon1)
      setDataPokemon1({ ...data, move: movePokemon1 as PokemonMove });
    else console.log("Move not found: ", data.move);
  };

  const handlePokemon2DataChange = (data: PokemonInfo) => {
    const movePokemon2 = moves.find((m) => m.name === data.move);
    if (movePokemon2)
      setDataPokemon2({ ...data, move: movePokemon2 as PokemonMove });
    else console.log("Move not found: ", data.move);
  };

  return (
    <div className="relative p-2 w-full flex flex-row gap-2">
      <div className="">
        <PokemonBuild
          pokemon="kyogre"
          setPokemonData={handlePokemonDataChange}
        />
      </div>
      <ModifiersCard modifiers={modifiers} setModifiers={setModifiers} />
      <div className="">
        <PokemonBuild
          pokemon="groudon"
          setPokemonData={handlePokemon2DataChange}
        />
      </div>
    </div>
  );
}
