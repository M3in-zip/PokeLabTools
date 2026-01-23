import { useEffect, useState } from "react";
import { MoveList } from "../move-list";
import totalMoves from "@/data/moves.json";

interface PokemonMoveSearchProps {
  moves: string[];
  onClick?: (move: string) => void;
  move?: string;
}

export const PokemonMoveSearch = ({
  moves,
  onClick,
  move,
}: PokemonMoveSearchProps) => {
  const [selectedMove, setSelectedMove] = useState<any>(undefined);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [start, setStart] = useState<string>("");

  useEffect(() => {
    const foundMove = totalMoves.find((m) => m.name === move);
    setSelectedMove(foundMove);
  }, [move]);

  const filteredMoves = moves.filter((move) => move.startsWith(start));

  return (
    <div className="p-2">
      <div className="flex flex-row items-center gap-2">
        <input
          className="border-2 border-white rounded-lg focus:outline-none focus:ring-0 p-1"
          type="text"
          placeholder="Search move"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          onFocus={() => setListVisible(true)}
          onBlur={() => setListVisible(false)}
        />
        {selectedMove && <div className="font-semibold">Selected move: </div>}
        <div
          className={`border-primary text-primary font-semibold rounded-lg p-1 ${selectedMove?.type.toLowerCase()}-card`}
        >
          {selectedMove?.name}
        </div>
      </div>
      {listVisible && <MoveList moves={filteredMoves} onClick={onClick} />}
    </div>
  );
};
