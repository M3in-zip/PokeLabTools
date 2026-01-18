import { useQuery } from "@tanstack/react-query";
import { PokemonSearchInput } from "../pokemon-search-input";
import { useEffect, useState } from "react";
import { PokemonInfo } from "../pokemon-info";
import { PokemonStats } from "@/components/pokemon-stats";
import { FullPageSpinner } from "../full-page-spinner";
import { MoveList } from "../move-list";
import { PokemonMoveSearch } from "../pokemon-move-search";

interface PokemonBuildProps {
  title?: string;
}

export const PokemonBuild = ({ title }: PokemonBuildProps) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("rayquaza");
  const [baseStats, setBaseStats] = useState<number[]>([105, 150, 90, 150, 90, 95]);
  const [moves, setMoves] = useState<string[]>([])
  const [selectedMove, setSelectedMove] = useState<string>("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonData", selectedPokemon],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`).then(
        (res) => res.json()
      ),
  });

  useEffect(() => {
    if (data) {
      const stats = data.stats.map((stat: any) => stat.base_stat);
      const movesNames = data.moves.map((move:{move:{name:string}}) => move.move.name);
      setBaseStats(stats);
      setMoves(movesNames)
      if(data) console.log("pokemon data: ", data)
    }
  }, [data]);

  return (
    <div className="xl:w-[30%]">
      {title && <h2 className="text-2xl mb-4">{title}</h2>}
      <PokemonSearchInput
        defaultValue={selectedPokemon}
        onClick={setSelectedPokemon}
      />
      {data && (
        <PokemonInfo sprite={data.sprites.front_default} stats={data.stats} />
      )}
      {data && <PokemonStats baseStats={baseStats}/>}
      {data && moves.length > 0 && <PokemonMoveSearch moves={moves}></PokemonMoveSearch>}
      {isLoading && <FullPageSpinner />}
    </div>
  );
};
