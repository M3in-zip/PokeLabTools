import { useState } from "react";

interface ModifiersCardProps {
  setModifiers: (modifiers: any) => void;
  modifiers: any;
}

export const ModifiersCard = ({
  setModifiers,
  modifiers,
}: ModifiersCardProps) => {

  const leftButtonClasses = "p-2 border-white border-2 border-r-1 rounded-l-lg";
  const rightButtonClasses = "p-2 border-white border-2 border-l-1 rounded-r-lg";
  const middleButtonClasses = "p-2 border-white border-2 border-l-1 border-r-1";

  const buttonCustom = (className: string, name: string, modifier: string) => {
    return(
      <button
        type="button"
        className={`${className} ${modifiers[modifier] === name ? "bg-yellow-500" : "bg-gray-200"}`}
        onClick={() => {
          setModifiers({ ...modifiers, [modifier]: name });
        }}
      >
        {name.toUpperCase()}
      </button>
    )
  };

  return (
    <div>
      <div className="flex flex-row items-center, justify-content">
        {buttonCustom(leftButtonClasses, "sun", "weather")}
        {buttonCustom(middleButtonClasses, "rain", "weather")}
        {buttonCustom(rightButtonClasses, "sand", "weather")}
      </div>
    </div>
  );
};
