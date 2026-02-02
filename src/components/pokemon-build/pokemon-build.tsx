import { useQuery } from "@tanstack/react-query";
import { PokemonSearchInput } from "../pokemon-search-input";
import { useEffect, useState } from "react";
import { PokemonInfo } from "../pokemon-info";
import { PokemonStats } from "@/components/pokemon-stats";
import { Spinner } from "../spinner";
import { PokemonMoveSearch } from "../pokemon-move-search";
import { useThemeStore } from "@stores/theme-store";

export interface pokemonInfo {
  stats: number[];
  type: string[];
  weight: number;
  move: string;
}

interface PokemonBuildProps {
  pokemon?: string;
  setPokemonData: (data: pokemonInfo) => void;
}

export const PokemonBuild = ({ setPokemonData, pokemon, move }: PokemonBuildProps) => {
  const theme = useThemeStore((state) => state.theme);
  const [selectedPokemon, setSelectedPokemon] = useState<string>(pokemon || "rayquaza");
  const [baseStats, setBaseStats] = useState<number[]>([105, 150, 90, 150, 90, 95]);
  const [pokemonMoves, setPokemonMoves] = useState<string[]>([])
  const [pokemonInfo, setPokemonInfo] = useState<pokemonInfo>({stats: [], type: [], weight: 0, move: move || "dragon-ascent"});

  useEffect(() => {
    setPokemonData(pokemonInfo);
  }, [pokemonInfo]);

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
      const pokemonTypes = data.types.map((type:{type:{name:string}}) => type.type.name);
      console.log("Moves names: ", data.moves);
      setBaseStats(stats);
      setPokemonMoves(movesNames);
      setPokemonInfo((curr:any) => ({...curr, type: pokemonTypes, weight: data.weight, move: data.moves[0]?.move.name || ""}));
      /* console.log("Fetched data for ", selectedPokemon, data); */
    }
  }, [data]);

  const handleStatsChange = (newStats: number[]) => {
    setPokemonInfo((curr:any) => ({...curr, stats: newStats}));
  }

  const handleMoveChange = (newMove: string) => {
    setPokemonInfo((curr) => ({...curr, move: newMove}));
  }

  return (
    <div className={`relative w-full min-w-[240px] h-full text-xs ${theme === "dark" ? "text-white" : "text-black"}`}>
      <PokemonSearchInput
        defaultValue={selectedPokemon}
        onClick={setSelectedPokemon}
      />
      {data && (
        <PokemonInfo sprite={data.sprites.front_default} stats={data.stats} type={pokemonInfo.type}/>
      )}
      {data && <PokemonStats baseStats={baseStats} onChange={handleStatsChange}/>}
      {data && pokemonMoves.length > 0 && <PokemonMoveSearch moves={pokemonMoves} onClick={handleMoveChange} move={pokemonInfo.move}></PokemonMoveSearch>}
      {isLoading && <Spinner />}
    </div>
  );
};
