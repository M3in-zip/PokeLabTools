import { useState } from "react";
import { MoveCard } from "../move-card";

interface MoveListProps {
    moves: string[];
}

export const MoveList = ({ moves }: MoveListProps) => {
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [start, setStart] = useState<string>("");

  const filteredMoves = moves.filter(move => move.startsWith(start));

  return (<div className="p-2">
    <input
      className="border-2 border-white rounded-lg focus:outline-none focus:ring-0 mb-2"
      type="text"
      placeholder="Search move"
      value={start}
      onChange={(e) => setStart(e.target.value)}
      onFocus={()=>setListVisible(true)}
      onBlur={()=>setListVisible(false)}
    />
    {listVisible && filteredMoves.map((move, index) => (
      <MoveCard key={index} move={move} />
    ))}
  </div>
  )
};