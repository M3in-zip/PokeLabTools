import { useThemeStore } from "@stores/theme-store";

interface ModifiersCardProps {
  setModifiers: (modifiers: any) => void;
  modifiers: any;
}

export const ModifiersCard = ({
  setModifiers,
  modifiers,
}: ModifiersCardProps) => {
  const theme = useThemeStore((state) => state.theme);

  const leftButtonClasses = "p-2 border-white border-2 border-r-1 rounded-l-lg";
  const rightButtonClasses = "p-2 border-white border-2 border-l-1 rounded-r-lg";
  const middleButtonClasses = "p-2 border-white border-2 border-l-1 border-r-1";
  const baseText = theme === "dark" ? "text-white" : "text-black";

  const buttonCustom = (className: string, name: string, modifier: string) => {
    const active = modifiers[modifier] === name;
    const bgClass =
    theme === "dark"
      ? active
        ? "bg-slate-800"
        : "bg-slate-500"
      : active
        ? "bg-slate-300"
        : "bg-white";

    return(
      <button
        type="button"
        className={`${className} ${baseText} ${bgClass} `}
        onClick={() => {
          setModifiers({ ...modifiers, [modifier]: active? "" : name });
        }}
      >
        {name.toUpperCase()}
      </button>
    )
  };

  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold">Weather</span>
      <div className="flex flex-row items-center, justify-content p-2">
        {buttonCustom(leftButtonClasses, "sun", "weather")}
        {buttonCustom(middleButtonClasses, "rain", "weather")}
        {buttonCustom(middleButtonClasses, "sand", "weather")}
        {buttonCustom(rightButtonClasses, "snow", "weather")}
      </div>
      <div className="flex flex-row items-center, justify-content p-2">
        {buttonCustom(leftButtonClasses, "grassy", "terrain")}
        {buttonCustom(middleButtonClasses, "misty", "terrain")}
        {buttonCustom(middleButtonClasses, "electric", "terrain")}
        {buttonCustom(rightButtonClasses, "psychic", "terrain")}
      </div>
    </div>
  );
};
