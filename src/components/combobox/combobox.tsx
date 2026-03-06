import { useThemeStore } from "@stores/theme-store";
import React, { useState } from "react";

interface itemData {
  value: string;
  item: React.ReactNode;
}

interface ComboboxProps {
  onSelect: (onSelect: string | number) => void;
  dataSource: itemData[];
  defaultValue?: string;
}

export const Combobox = ({
  onSelect,
  dataSource,
  defaultValue,
}: ComboboxProps) => {
  const theme = useThemeStore((state) => state.theme);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [start, setStart] = useState<string>(defaultValue || "");
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const filtered = dataSource.filter((d) =>
    d.value.toLowerCase().startsWith(start.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        const selected = filtered[highlightIndex];
        setStart(selected.value);
        onSelect(selected.value);
        setListVisible(false);
      }
    }
  };

  const selectItem = (item: itemData) => {
    setStart(item.value);
    onSelect(item.value);
    setListVisible(false);
  };

  return (
    <div className="flex flex-col p-2 relative">
      <input
        className="border-2 border-white rounded-lg p-1 focus:outline-none"
        type="text"
        placeholder="Search item"
        value={start}
        onChange={(e) => {
          setStart(e.target.value);
          setHighlightIndex(-1);
        }}
        onFocus={() => setListVisible(true)}
        onBlur={() => setTimeout(() => setListVisible(false), 150)}
        onKeyDown={handleKeyDown}
      />

      {listVisible && (
        <ul
          className={`absolute top-12 left-0 w-full max-h-[20vh] overflow-y-auto border rounded shadow z-50 ${
            theme === "dark" ? "bg-slate-500 text-white" : "bg-white text-black"
          }`}
        >
          {filtered.length === 0 && (
            <li className="p-2 text-gray-400">No results</li>
          )}

          {filtered.map((d, i) => (
            <li
              key={d.value}
              onMouseDown={() => selectItem(d)}
              className={`p-2 cursor-pointer ${
                i === highlightIndex
                  ? theme === "dark" ? "bg-blue-300 text-white" : "bg-blue-300 text-black"
                  : "hover:bg-blue-300"
              }`}
            >
              {d.item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
