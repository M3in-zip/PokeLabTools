import { useQuery } from "@tanstack/react-query";
import { PokemonSearchInput } from "../pokemon-search-input";
import { useEffect, useState } from "react";
import { SpriteStats } from "../sprite-stats";
import { IV_EV, type Stat, type StatValue } from "@components/iv-ev";

interface PokemonBuildProps {
  title?: string;
}

export const PokemonBuild = ({ title }: PokemonBuildProps) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("rayquaza");
  const [baseStats, setBaseStats] = useState<number[]>([105, 150, 90, 150, 90, 95]);
  const [IVs, setIVs] = useState<Record<Stat, StatValue>>({ HP: 31, Attack: 31, Defense: 31, "Sp. Atk": 31, "Sp. Def": 31, Speed: 31 });
  const [EVs, setEVs] = useState<Record<Stat, StatValue>>({ HP: 0, Attack: 0, Defense: 0, "Sp. Atk": 0, "Sp. Def": 0, Speed: 0 });

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
      setBaseStats(stats);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading pokemon data</div>;
  

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl mb-4">{title}</h2>}
      <PokemonSearchInput
        defaultValue={selectedPokemon}
        onClick={setSelectedPokemon}
      />
      {data && (
        <SpriteStats sprite={data.sprites.front_default} stats={data.stats} />
      )}
      {data && <IV_EV changeIVs={setIVs} changeEVs={setEVs} IVs={IVs} EVs={EVs} />}
    </div>
  );
};
