import { useQuery } from "@tanstack/react-query";
import { PokemonSearchInput } from "../pokemon-search-input";
import { useEffect, useState } from "react";
import { PokemonInfo } from "../pokemon-info";
import { PokemonStats } from "@/components/pokemon-stats";
import { Spinner } from "../spinner";
import { PokemonMoveSearch } from "../pokemon-move-search";
import { useThemeStore } from "@stores/theme-store";
import type { Stats, Pokemon } from "@/types/pokemon";
import { DropDown } from "@components/drop-down";

interface PokemonBuildProps {
  pokemon?: string;
  setPokemonData: (pokemonData: Pokemon, move: string) => void;
}

export const PokemonBuild = ({
  setPokemonData,
  pokemon,
}: PokemonBuildProps) => {

  /* STATE */
  const theme = useThemeStore((state) => state.theme);
  const [selectedPokemon, setSelectedPokemon] = useState<string>(pokemon || "rayquaza");
  const [baseStats, setBaseStats] = useState<Stats>({
    HP: 105,
    Atk: 150,
    Def: 90,
    "Sp. Atk": 150,
    "Sp. Def": 90,
    Speed: 95,
  });
  const [pokemonMoves, setPokemonMoves] = useState<string[]>([]);
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>({
    name: selectedPokemon,
    stats: {
      HP: 105,
      Atk: 150,
      Def: 90,
      "Sp. Atk": 150,
      "Sp. Def": 90,
      Speed: 95,
    },
    type: [],
    ability: "",
    weight: 0,
  });
  const [move, setMove] = useState<string>("dragon-ascent");
  const [abilities, setAbilities] = useState<string[]>([]);
  /* END STATE */

  useEffect(() => {
    setPokemonData(pokemonInfo, move);
  }, [pokemonInfo, move]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonData", selectedPokemon],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`).then(
        (res) => res.json(),
      ),
  });

  useEffect(() => {
    if (data) {
      const stats = data.stats.map((stat: any) => stat.base_stat);
      const statsObj = {
        HP: stats[0],
        Atk: stats[1],
        Def: stats[2],
        "Sp. Atk": stats[3],
        "Sp. Def": stats[4],
        Speed: stats[5],
      };
      const movesNames = data.moves.map(
        (move: { move: { name: string } }) => move.move.name,
      );
      const pokemonTypes = data.types.map(
        (type: { type: { name: string } }) => type.type.name,
      );
      const abilities = data.abilities.map((a:{ability:{name:string}})=> a.ability.name);
      setBaseStats(statsObj);
      setPokemonMoves(movesNames);
      setPokemonInfo((curr) => ({
        ...curr,
        name: selectedPokemon,
        type: pokemonTypes,
        ability: abilities[0],
        weight: data.weight,
      }));
      setMove(data.moves[0]?.move.name || "",)
      setAbilities(abilities);
      /* console.log("Fetched data for ", selectedPokemon, data); */
    }
  }, [data]);

  const handleStatsChange = (newStats: Stats) => {
    setPokemonInfo((curr) => ({ ...curr, stats: newStats }));
  };

  return (
    <div
      className={`relative w-full min-w-[240px] h-full text-xs ${theme === "dark" ? "text-white" : "text-black"}`}
    >
      <PokemonSearchInput
        defaultValue={selectedPokemon}
        onClick={setSelectedPokemon}
      />
      {data && (
        <PokemonInfo
          sprite={data.sprites.front_default}
          stats={data.stats}
          type={pokemonInfo.type}
        />
      )}
      {data && (
              <div className="flex flex-row items-center gap-2 px-2">
                <span className="font-semibold whitespace-nowrap">ABILITY : </span>
                <DropDown
                  value={pokemonInfo.ability}
                  onSelect={(val) => setPokemonInfo((curr)=> {return {...curr, ability:(val as string)}})}
                  dataSource={[
                    ...abilities.map((ab) => ({
                      value: ab,
                      item: <span className="font-semibold">{ab}</span>,
                    })),
                  ]}
                />
              </div>
      )
      }
      {data && (
        <PokemonStats baseStats={baseStats} onChange={handleStatsChange} />
      )}
      {data && pokemonMoves.length > 0 && (
        <PokemonMoveSearch
          moves={pokemonMoves}
          onClick={setMove}
          move={move}
        ></PokemonMoveSearch>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};
