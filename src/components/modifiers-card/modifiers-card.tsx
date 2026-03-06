import { useThemeStore } from "@stores/theme-store";
import type { Modifiers } from "@/types/pokemon";

interface ModifiersCardProps {
  setModifiers: (modifiers: Modifiers) => void;
  modifiers: Modifiers;
}

export const ModifiersCard = ({
  setModifiers,
  modifiers,
}: ModifiersCardProps) => {
  const theme = useThemeStore((state) => state.theme);

  const leftButtonClasses = "p-1 border-white border-2 border-r-1 rounded-l-lg";
  const rightButtonClasses = "p-1 border-white border-2 border-l-1 rounded-r-lg";
  const middleButtonClasses = "p-1 border-white border-2 border-l-1 border-r-1";
  const baseText = theme === "dark" ? "text-white" : "text-black";

  const buttonCustom = (className: string, value: string, modifier: keyof Modifiers, notNullable?:boolean) => {
    var active = (modifiers[modifier] === value);
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
        className={`${className} ${baseText} ${bgClass} text-xs`}
        onClick={() => {
          setModifiers({ ...modifiers, [modifier]: notNullable? value : active? "" : value });
        }}
      >
        {value.toUpperCase()}
      </button>
    )
  };

  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-white">Level</span>
      <div className="flex flex-row items-center, justify-content p-2">
        {buttonCustom(leftButtonClasses, "50", "level", true)}
        {buttonCustom(rightButtonClasses, "100", "level", true)}
      </div>
      <span className="font-semibold text-white">Battle</span>
      <div className="flex flex-row items-center, justify-content p-2">
        {buttonCustom(leftButtonClasses, "single", "battle", true)}
        {buttonCustom(rightButtonClasses, "double", "battle", true)}
      </div>
      <span className="font-semibold text-white">Field</span>
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
