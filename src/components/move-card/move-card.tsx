import moves from "@/data/moves.json";

export interface move {}

interface MoveCardProps {
  move: string;
  onClick?: (move: string) => void;
}

export const MoveCard = ({ move, onClick }: MoveCardProps) => {
  const selectedMove = moves.find((current) => current.name === move);
  const moveIconSrc = (category: string) => {
  switch (category.toLowerCase()) {
    case "physical":
      return "https://img.pokemondb.net/images/icons/move-physical.png";
    case "special":
      return "https://img.pokemondb.net/images/icons/move-special.png";
    case "status":
      return "https://img.pokemondb.net/images/icons/move-status.png";
    default:
      return null;
  }
};

  return (
    <div className={`border-primary rounded-xl p-1 flex flex-row items-center gap-4 ${
              selectedMove?.type.toLowerCase()}-card cursor-pointer`}
              onMouseDown={onClick ? () => onClick(move) : undefined}>

      {/* first block */}
      <div className="flex flex-col">

        {/* name + type + damage class */}
        <div className="flex flex-row items-center gap-2">
          {/* name */}
          <span className="font-semibold text-lg">
            {selectedMove?.name
              ? selectedMove.name
              : "name not found"}
          </span>
          {/* type badge */}
          <div
            className={`border-primary text-primary font-semibold rounded-full py-1 px-2 flex ${
              selectedMove?.type.toLowerCase()}`}
          >
            {selectedMove?.type.toUpperCase() || "???"}
          </div>
          {/* damage class icon */}
          <div className="border-2 border-white rounded-lg bg-gray-300 w-6 h-6 items-center flex justify-center">
            {selectedMove?.category && (
              <img
                src={moveIconSrc(selectedMove.category) || ""}
                alt={selectedMove.category}
              />
            )}
          </div>
        </div>

        {/* power, accuracy, pp */}
        <div className="flex flex-row p-2 gap-2 font-semibold justify-between">
            <div className="flex flex-col items-center">
              <p>Power</p>
              <p>{selectedMove?.power || "--"}</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Accuracy</p>
              <p>{selectedMove?.accuracy || "--"}</p>
            </div>
            <div className="flex flex-col items-center">
              <p>PP</p>
              <p>{selectedMove?.pp || "--"}</p>
            </div>
        </div>
      </div>

      {/* description */}
      <div className="break-words max-w-[100px]">{selectedMove?.description}</div>
    </div>
  );
};
