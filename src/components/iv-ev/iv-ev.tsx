import { useState } from "react";

export type Stat = "HP" | "Attack" | "Defense" | "Sp. Atk" | "Sp. Def" | "Speed";
export type StatValue = number | "";

interface IVEVProps {
  changeIVs: (ivs: Record<Stat, StatValue>) => void;
  changeEVs: (evs: Record<Stat, StatValue>) => void;
  IVs: Record<Stat, StatValue>;
  EVs: Record<Stat, StatValue>;
  onBlur?: () => void;
}

export const IV_EV = ({ changeIVs, changeEVs, IVs, EVs }: IVEVProps) => {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stat: Stat,
    type: "IV" | "EV"
  ) => {
    var nextValue = e.target.value ? parseInt(e.target.value) : "";
    const numericValue = typeof nextValue === "number" ? nextValue : 0;
    
    if (type === "IV") {
      if (numericValue > 31) nextValue = 31;
      changeIVs({ ...IVs, [stat]: nextValue });
    } else {
      if (numericValue > 252) return;
      const totalEVWithoutCurrent = Object.entries(EVs).reduce(
        (acc, [key, val]) =>
          acc + (key === stat ? 0 : typeof val === "number" ? val : 0),
        0
      );
      const newTotalEV = totalEVWithoutCurrent + numericValue;
      if (newTotalEV < 509) changeEVs({ ...EVs, [stat]: nextValue });
    }
  };

  const handleBlur = (stat: Stat, type: "IV" | "EV") => {
    if (type === "IV") {
      if (IVs[stat] === "") {
        changeIVs({ ...IVs, [stat]: 0 });
      }
    } else {
      if (EVs[stat] === "") {
        changeEVs({ ...EVs, [stat]: 0 });
      }
    }
  };

  const inputClassName = "border-2 w-[clamp(3rem,6vw,8rem)] rounded-md";

  return (
    <div className="flex flex-row p-2 gap-2">
      {/* IVs */}
      <div className="grid grid-cols-2 gap-2">
        <label>IV (0-31):</label>
        <label></label>
        <label>HP : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={31}
          value={IVs.HP}
          onChange={(e) => handleChange(e, "HP", "IV")}
          onBlur={() => handleBlur("HP", "IV")}
        />
        <label>Attack : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={31}
          value={IVs.Attack}
          onChange={(e) => handleChange(e, "Attack", "IV")}
          onBlur={() => handleBlur("Attack", "IV")}
        />
        <label>Defense : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={31}
          value={IVs.Defense}
          onChange={(e) => handleChange(e, "Defense", "IV")}
          onBlur={() => handleBlur("Defense", "IV")}
        />
        <label>Sp. Atk : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={31}
          value={IVs["Sp. Atk"]}
          onChange={(e) => handleChange(e, "Sp. Atk", "IV")}
          onBlur={() => handleBlur("Sp. Atk", "IV")}
        />
        <label>Sp. Def : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={31}
          value={IVs["Sp. Def"]}
          onChange={(e) => handleChange(e, "Sp. Def", "IV")}
          onBlur={() => handleBlur("Sp. Def", "IV")}
        />
        <label>Speed : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={31}
          value={IVs.Speed}
          onChange={(e) => handleChange(e, "Speed", "IV")}
          onBlur={() => handleBlur("Speed", "IV")}
        />
      </div>
      {/* EVs */}
      <div className="grid grid-cols-2 gap-2">
        <label>EV (0-252):</label>
        <label></label>
        <label>HP : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={252}
          value={EVs.HP}
          onChange={(e) => handleChange(e, "HP", "EV")}
          onBlur={() => handleBlur("HP", "EV")}
        />
        <label>Attack : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={252}
          value={EVs.Attack}
          onChange={(e) => handleChange(e, "Attack", "EV")}
          onBlur={() => handleBlur("Attack", "EV")}
        />
        <label>Defense : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={252}
          value={EVs.Defense}
          onChange={(e) => handleChange(e, "Defense", "EV")}
          onBlur={() => handleBlur("Defense", "EV")}
        />
        <label>Sp. Atk : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={252}
          value={EVs["Sp. Atk"]}
          onChange={(e) => handleChange(e, "Sp. Atk", "EV")}
          onBlur={() => handleBlur("Sp. Atk", "EV")}
        />
        <label>Sp. Def : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={252}
          value={EVs["Sp. Def"]}
          onChange={(e) => handleChange(e, "Sp. Def", "EV")}
          onBlur={() => handleBlur("Sp. Def", "EV")}
        />
        <label>Speed : </label>
        <input
          className={inputClassName}
          type="number"
          min={0}
          max={252}
          value={EVs.Speed}
          onChange={(e) => handleChange(e, "Speed", "EV")}
          onBlur={() => handleBlur("Speed", "EV")}
        />
      </div>
    </div>
  );
};
