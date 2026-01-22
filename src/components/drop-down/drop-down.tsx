import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "@stores/theme-store";

interface itemData {
  value: string | number;
  item: React.ReactNode;
}

interface DropDownProps {
  onSelect: (onSelect: string | number) => void;
  value?: string | number;
  dataSource: itemData[];
  defaultValue?: string | number;
  bgRemove?: boolean;
}

export const DropDown = ({
  onSelect,
  value,
  dataSource,
  bgRemove,
}: DropDownProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const list = listRef.current;
      const selectedItem = list.children[selectedIndex] as HTMLElement;

      if (selectedItem) {
        // Calcoliamo la posizione dell'item RELATIVA alla lista
        const relativeItemTop = selectedItem.offsetTop - list.offsetTop;

        // Se l'elemento è sotto
        if (
          relativeItemTop + selectedItem.offsetHeight >
          list.scrollTop + list.clientHeight
        ) {
          list.scrollTop =
            relativeItemTop + selectedItem.offsetHeight - list.clientHeight;
        }
        // Se l'elemento è sopra
        else if (relativeItemTop < list.scrollTop) {
          list.scrollTop = relativeItemTop;
        }
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full">
      {/* Input di ricerca */}
      <div className="relative flex items-center">
        <button
          type="button"
          className={`flex text-left border-2 border-white rounded-lg focus:outline-none px-1 text-nowrap truncate ${
            bgRemove
              ? "bg-transparent"
              : theme === "dark"
                ? "bg-slate-500 text-white"
                : "bg-white text-black"
          }`}
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
                prev <= 0 ? dataSource.length - 1 : prev - 1,
              );
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (selectedIndex >= 0 && selectedIndex < dataSource.length) {
                const selectedValue = dataSource[selectedIndex].value;
                onSelect?.(selectedValue);
                setSelectedIndex(-1);
                setIsFocused(false);
                (e.target as HTMLInputElement).blur();
              }
            }
          }}
        >
          {value ?? "--"}
        </button>
      </div>

      {/* autocomplete list */}
      {isFocused && (
        <ul
          ref={listRef}
          className={`absolute top-full border border-slate-200 rounded-lg shadow-xl
             max-h-[20vh] overflow-auto whitespace-nowrap z-10 w-auto ${
               bgRemove
                 ? "bg-white"
                 : theme === "dark"
                   ? "bg-slate-500 text-white"
                   : "bg-white text-black"
             }`}
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
                <span>{item.item}</span>
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
