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

  const buttonBaseClasses = "p-1 border-white border-2 text-xs rounded-lg";
  const leftButtonClasses = "p-1 border-white border-2 border-r-1 rounded-l-lg";
  const rightButtonClasses =
    "p-1 border-white border-2 border-l-1 rounded-r-lg";
  const middleButtonClasses = "p-1 border-white border-2 border-l-1 border-r-1";
  const baseText = theme === "dark" ? "text-white" : "text-black";

  const buttonCustom = (
    className: string,
    value: string,
    modifier: keyof Modifiers,
    notNullable?: boolean,
  ) => {
    var active = modifiers[modifier] === value;
    const bgClass =
      theme === "dark"
        ? active
          ? "bg-slate-800"
          : "bg-slate-500"
        : active
          ? "bg-slate-300"
          : "bg-white";
    return (
      <button
        type="button"
        className={`${className} ${baseText} ${bgClass} text-xs`}
        onClick={() => {
          setModifiers({
            ...modifiers,
            [modifier]: notNullable ? value : active ? "" : value,
          });
        }}
      >
        {value.toUpperCase()}
      </button>
    );
  };

  const checkBoxButton = (field:keyof Modifiers, onClick?:()=>void) => {
    const active = modifiers[field] === true;
    const bgClass =
      theme === "dark"
        ? active
          ? "bg-slate-800"
          : "bg-slate-500"
        : active
          ? "bg-slate-300"
          : "bg-white";
    return (
      <button
        type="button"
        className={`${buttonBaseClasses} text-white ${bgClass}`}
        onClick={onClick ? onClick : () => setModifiers({ ...modifiers, [field]: modifiers[field] ? !modifiers[field] : true })}
      >{field.toUpperCase()}</button>
    )
  }

  const checkBoxButtonCouple = (field:keyof Modifiers, checked:boolean, onClick?:()=>void) => {
    const active = checked;
    const bgClass =
      theme === "dark"
        ? active
          ? "bg-slate-800"
          : "bg-slate-500"
        : active
          ? "bg-slate-300"
          : "bg-white";
    return (
      <button
        type="button"
        className={`${buttonBaseClasses} text-white ${bgClass}`}
        onClick={onClick ? onClick : () => setModifiers({ ...modifiers, [field]: modifiers[field] ? !modifiers[field] : true })}
      >{field.toUpperCase()}</button>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        {/* Battle */}
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white">Battle</span>
          <div className="flex flex-row items-center justify-content p-2">
            {buttonCustom(leftButtonClasses, "single", "battle", true)}
            {buttonCustom(rightButtonClasses, "double", "battle", true)}
          </div>
        </div>
        {/* Level */}
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white">Level</span>
          <div className="flex flex-row items-center justify-content p-2">
            {buttonCustom(leftButtonClasses, "50", "level", true)}
            {buttonCustom(rightButtonClasses, "100", "level", true)}
          </div>
        </div>
      </div>
      <span className="font-semibold text-white">Field</span>
      <div className="flex flex-row items-center justify-content p-2">
        {buttonCustom(leftButtonClasses, "sun", "weather")}
        {buttonCustom(middleButtonClasses, "rain", "weather")}
        {buttonCustom(middleButtonClasses, "sand", "weather")}
        {buttonCustom(rightButtonClasses, "snow", "weather")}
      </div>
      <div className="flex flex-row items-center justify-content p-2">
        {buttonCustom(leftButtonClasses, "grassy", "terrain")}
        {buttonCustom(middleButtonClasses, "misty", "terrain")}
        {buttonCustom(middleButtonClasses, "electric", "terrain")}
        {buttonCustom(rightButtonClasses, "psychic", "terrain")}
      </div>
      <span className="font-semibold text-white">Abilities</span>
      {checkBoxButton("neutralizing-gas")}
      <div className="flex flex-row items-center justify-content p-2">
        {checkBoxButton("dark-aura")}
        {checkBoxButton("fairy-aura")}
        {checkBoxButton("aura-break")}
      </div>
      {checkBoxButton("air-lock")}
      <span className="font-semibold text-white">Other</span>
      <div className="flex flex-row w-full items-center justify-content p-1 justify-between">
        {checkBoxButtonCouple("aurora-veil", modifiers["aurora-veil"][0], () => setModifiers({...modifiers, "aurora-veil": [(!modifiers["aurora-veil"][0]), modifiers["aurora-veil"][1]] }))}
        {checkBoxButtonCouple("aurora-veil", modifiers["aurora-veil"][1], () => setModifiers({...modifiers, "aurora-veil": [(modifiers["aurora-veil"][0]), !modifiers["aurora-veil"][1]] }))}
      </div>
      <div className="flex flex-row w-full items-center justify-content p-1 justify-between">
        {checkBoxButtonCouple("light-screen", modifiers["light-screen"][0], () => setModifiers({...modifiers, "light-screen": [(!modifiers["light-screen"][0]), modifiers["light-screen"][1]] }))}
        {checkBoxButtonCouple("light-screen", modifiers["light-screen"][1], () => setModifiers({...modifiers, "light-screen": [(modifiers["light-screen"][0]), !modifiers["light-screen"][1]] }))}
      </div>
      <div className="flex flex-row w-full items-center justify-content p-1 justify-between">
        {checkBoxButtonCouple("reflect", modifiers["reflect"][0], () => setModifiers({...modifiers, "reflect": [(!modifiers["reflect"][0]), modifiers["reflect"][1]] }))}
        {checkBoxButtonCouple("reflect", modifiers["reflect"][1], () => setModifiers({...modifiers, "reflect": [(modifiers["reflect"][0]), !modifiers["reflect"][1]] }))}
      </div>
    </div>
  );
};
