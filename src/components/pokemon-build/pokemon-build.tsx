import { useQuery } from "@tanstack/react-query";
import { PokemonSearchInput } from "../pokemon-search-input";
import { useState } from "react";
import { SpriteStats } from "../sprite-stats";
import { IV_EV } from "@components/iv-ev";

interface PokemonBuildProps {
  title?: string;
}

export const PokemonBuild = ({ title }: PokemonBuildProps) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("groudon");

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonData", selectedPokemon],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`).then(
        (res) => res.json()
      ),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading pokemon data</div>;
  console.log("data:", data);

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
      {data && <IV_EV />}
    </div>
  );
};
