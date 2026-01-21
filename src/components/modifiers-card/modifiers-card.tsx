import { useState } from "react";

interface ModifiersCardProps {
  setModifiers?: (modifiers: any) => void;
  modifiers?: any;
}

export const ModifiersCard = ({
  setModifiers,
  modifiers,
}: ModifiersCardProps) => {
  const [firstButton, setFirstButton] = useState("bg-gray-200");
  return (
    <div>
        <div className="flex flex-row items-center, justify-content">
      <button
        type="button"
        className={`p-2 rounded-l-lg ${firstButton} border-white border-2 border-r-1`}
        onClick={
          () =>
            firstButton === "bg-gray-200"
              ? setFirstButton("bg-gray-500")
              : setFirstButton(
                  "bg-gray-200",
                ) /* setModifiers({...modifiers, example: "value"}) */
        }
      >
        ciaooo
      </button>
      <button className={`p-2 rounded-r-lg ${firstButton} border-white border-2 border-l-1`}>second</button>
        </div>
    </div>
  );
};
