import { useState, useMemo } from "react";
import { usePokemonStore } from "@/stores/pokemonStore";

interface pokemonSearchInputProps {
  onClick?: (pokemonName: string) => void;
  defaultValue?: string;
}

export const PokemonSearchInput = ({
  onClick,
  defaultValue,
}: pokemonSearchInputProps) => {
  const [search, setSearch] = useState(defaultValue || "");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const pokemonList = usePokemonStore((state) => state.pokemonList);

  const displayList = useMemo(() => {
    if (search.length === 0) return pokemonList;
    const lowerSearch = search.toLowerCase();
    return pokemonList.filter((p) =>
      p.name.toLowerCase().startsWith(lowerSearch)
    );
  }, [search, pokemonList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const sanitized = e.target.value.replace(/[^a-zA-Z]/g, "");
  setSearch(sanitized);
};

  return (
    <div className="relative w-48 max-w-sm">
      {/* Input di ricerca */}
      <div className="relative flex items-center">
        <i className="fa-solid fa-search absolute left-3 text-slate-400"></i>{" "}
        {/* gray icon lens */}
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search Pokémon..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-t-lg focus:outline-none bg-white"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (!displayList.length) return;

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedIndex((prev) => (prev + 1) % displayList.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedIndex((prev) =>
                prev <= 0 ? displayList.length - 1 : prev - 1
              );
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (selectedIndex >= 0 && selectedIndex < displayList.length) {
                const selectedPokemon = displayList[selectedIndex];
                setSearch(selectedPokemon.name);
                onClick?.(selectedPokemon.name);
                setSelectedIndex(-1);
                setIsFocused(false);
                (
                  e.target as HTMLInputElement
                ).blur(); /* rimuovi la barra lampeggiante */
              }
            }
          }}
        />
      </div>

      {/* autocomplete list */}
      {isFocused && (
        <ul
          className="absolute z-10 w-full bg-white border-x border-b border-slate-200 rounded-b-lg shadow-xl 
                     max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300"
        >
          {displayList.length > 0 ? (
            displayList.map((pokemon, index) => (
              <li
                key={pokemon.id}
                className={`px-4 py-3 cursor-pointer flex items-center border-b border-slate-50 last:border-none transition-colors ${index === selectedIndex ? "bg-blue-200" : "hover:bg-blue-200"}`}
                onMouseDown={() => {
                  setSearch(pokemon.name);
                  if (onClick) onClick(pokemon.name);
                  setIsFocused(false);
                }}
              >
                <span className="text-[10px] font-bold text-slate-400 w-8">
                  #{pokemon.id}
                </span>
                <span className="capitalize text-slate-700 font-medium">
                  {pokemon.name}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-slate-400 text-sm">
              Nessun Pokémon trovato
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
