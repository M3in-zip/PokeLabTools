import { useQuery } from "@tanstack/react-query";
import { PokemonSearchInput } from "../pokemon-search-input";
import { useEffect, useState } from "react";
import { PokemonInfo } from "../pokemon-info";
import { PokemonStats } from "@/components/pokemon-stats";
import { Spinner } from "../spinner";
import { PokemonMoveSearch } from "../pokemon-move-search";
import { useThemeStore } from "@stores/theme-store";

interface PokemonBuildProps {
  pokemon?: string;
  move?: string;
  setPokemonData: (data: {stats: number[], move: string, type: string[]}) => void;
}

export const PokemonBuild = ({ setPokemonData, pokemon, move }: PokemonBuildProps) => {
  const theme = useThemeStore((state) => state.theme);
  const [selectedPokemon, setSelectedPokemon] = useState<string>(pokemon || "rayquaza");
  const [baseStats, setBaseStats] = useState<number[]>([105, 150, 90, 150, 90, 95]);
  const [pokemonMoves, setPokemonMoves] = useState<string[]>([])
  const [type, setType] = useState<string[]>([]);

  const [stats, setStats] = useState<number[]>([]);
  const [selectedMove, setSelectedMove] = useState<string>(move || "dragon-ascent");

  useEffect(() => {
    setPokemonData({stats:stats, move: selectedMove, type:type});
  }, [stats, selectedMove, type]);

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
      setBaseStats(stats);
      setPokemonMoves(movesNames);
      setType(pokemonTypes);
    }
  }, [data]);

  return (
    <div className={`relative w-full h-full text-xs ${theme === "dark" ? "text-white" : "text-black"}`}>
      <PokemonSearchInput
        defaultValue={selectedPokemon}
        onClick={setSelectedPokemon}
      />
      {data && (
        <PokemonInfo sprite={data.sprites.front_default} stats={data.stats} type={type}/>
      )}
      {data && <PokemonStats baseStats={baseStats} onChange={setStats}/>}
      {data && pokemonMoves.length > 0 && <PokemonMoveSearch moves={pokemonMoves} onClick={setSelectedMove} move={selectedMove}></PokemonMoveSearch>}
      {isLoading && <Spinner />}
    </div>
  );
};
