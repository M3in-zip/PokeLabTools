import { MoveList } from "../move-list";

interface PokemonMoveSearchProps {
  moves: string[];
}

export const PokemonMoveSearch = ({ moves }: PokemonMoveSearchProps) => {
  return (
    <div className="p-2">
      <MoveList moves={moves} />
    </div>
  );
};
