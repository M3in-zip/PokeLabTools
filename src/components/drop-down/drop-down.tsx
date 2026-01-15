import { useState } from "react";

interface itemData {
  value:string,
  item:React.ReactNode
}

interface DropDownProps {
  onSelect: (onSelect: string) => void;
  value?: string;
  dataSource: itemData[];
  defaultValue?: string;
}

export const DropDown = ({ onSelect, value, dataSource }: DropDownProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className="relative w-full">
      {/* Input di ricerca */}
      <div className="relative flex items-center">
        <i className="fa-solid fa-search absolute left-3 text-slate-400"></i>{" "}
        {/* gray icon lens */}
        <input
          type="text"
          value={value??"--"}
          placeholder="Search Pokémon..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none bg-white"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (!dataSource.length) return;

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedIndex((prev) => (prev + 1) % dataSource.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedIndex((prev) =>
                prev <= 0 ? dataSource.length - 1 : prev - 1
              );
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (selectedIndex >= 0 && selectedIndex < dataSource.length) {
                const selectedValue = dataSource[selectedIndex].value;
                onSelect?.(selectedValue);
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
          className="absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-lg shadow-xl
             max-h-44 overflow-auto whitespace-nowrap z-10 w-auto"
        >
          {dataSource.length > 0 ? (
            dataSource.map((item, index) => (
              <li
                key={item.value}
                className={`px-4 py-3 cursor-pointer flex items-center border-b border-slate-50 last:border-none transition-colors ${index === selectedIndex ? "bg-blue-200" : "hover:bg-blue-200"}`}
                onMouseDown={() => {
                  onSelect(item.value);
                  setIsFocused(false);
                }}
              >
                <span>
                  {item.item}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-slate-400 text-sm">
              No elements found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
