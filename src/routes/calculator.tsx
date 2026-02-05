import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPokemonBaseList } from "@/api/pokemon.ts";
import { usePokemonStore } from "@/stores/pokemonStore";
import { PokemonBuild } from "@/components/pokemon-build";
import { ModifiersCard } from "@/components/modifiers-card";
import moves from "@/data/moves.json";
import type { Stats, PokemonMove, PokemonData } from "@/types/pokemon";

export const Route = createFileRoute("/calculator")({
  component: PokemonCalculator,
});

function PokemonCalculator() {
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);
  const [dataPokemon1, setDataPokemon1] = useState<PokemonData>({
    name: "kyogre",
    stats: { HP: 1, Atk: 1, Def: 1, "Sp. Atk": 1, "Sp. Def": 1, Speed: 1 },
    weight: 0,
    type: ["water"],
  });
  const [move1, setMove1] = useState<PokemonMove>(
    moves.find((m) => m.name === "origin-pulse") as PokemonMove,
  );
  const [dataPokemon2, setDataPokemon2] = useState<PokemonData>({
    name: "groudon",
    stats: { HP: 1, Atk: 1, Def: 1, "Sp. Atk": 1, "Sp. Def": 1, Speed: 1 },
    weight: 0,
    type: ["ground"],
  });
  const [move2, setMove2] = useState<PokemonMove>(
    moves.find((m) => m.name === "precipice-blades") as PokemonMove,
  );
  const [modifiers, setModifiers] = useState({
    battle: "double",
    weather: "sun",
    terrain: "grassy",
  });

  useEffect(() => {
    console.log(
      "Pokemon 1 data changed: ",
      dataPokemon1,
      "move1: ",
      move1,
      "Pokemon 2 data: ",
      dataPokemon2,
      "move2: ",
      move2,
    );
  }, [dataPokemon1, dataPokemon2, move1, move2]);

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

  const handlePokemonDataChange = (pokemonData: PokemonData, move:string) => {
    const movePokemon1 = moves.find((m) => m.name === move) as PokemonMove;
    if (movePokemon1) {
      setDataPokemon1(pokemonData);
      setMove1(movePokemon1);
    } else console.log("Move not found: ", move);
  };

  const handlePokemon2DataChange = (pokemonData: PokemonData, move:string) => {
    const movePokemon2 = moves.find((m) => m.name === move) as PokemonMove;
    if (movePokemon2) {
      setDataPokemon2(pokemonData);
      setMove2(movePokemon2);
    } else console.log("Move not found: ", move);
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
