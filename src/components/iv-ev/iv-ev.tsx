import { useState } from "react";

type Stat = "HP" | "Attack" | "Defense" | "Sp. Atk" | "Sp. Def" | "Speed";

export const IV_EV = () => {
  const [HP_IV, setHP_IV] = useState(0);
  const [HP_EV, setHP_EV] = useState(0);
  const [Attack_IV, setAttack_IV] = useState(0);
  const [Attack_EV, setAttack_EV] = useState(0);
  const [Defense_IV, setDefense_IV] = useState(0);
  const [Defense_EV, setDefense_EV] = useState(0);
  const [SpAtk_IV, setSpAtk_IV] = useState(0);
  const [SpAtk_EV, setSpAtk_EV] = useState(0);
  const [SpDef_IV, setSpDef_IV] = useState(0);
  const [SpDef_EV, setSpDef_EV] = useState(0);
  const [Speed_IV, setSpeed_IV] = useState(0);
  const [Speed_EV, setSpeed_EV] = useState(0);
  const totalEV = HP_EV + Attack_EV + Defense_EV + SpAtk_EV + SpDef_EV + Speed_EV;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, stat: Stat, type: "IV" | "EV") => {
    const value = parseInt(e.target.value);

    if (type === "IV") {
      if (stat === "HP") setHP_IV(value);
      if (stat === "Attack") setAttack_IV(value);
      if (stat === "Defense") setDefense_IV(value);
      if (stat === "Sp. Atk") setSpAtk_IV(value);
      if (stat === "Sp. Def") setSpDef_IV(value);
      if (stat === "Speed") setSpeed_IV(value);

    } else {
      if (stat === "HP" && (totalEV < 510 || (value-HP_EV < 0))) setHP_EV(value);
      if (stat === "Attack" && (totalEV < 510 || (value-Attack_EV < 0))) setAttack_EV(value);
      if (stat === "Defense" && (totalEV < 510 || (value-Defense_EV < 0))) setDefense_EV(value);
      if (stat === "Sp. Atk" && (totalEV < 510 || (value-SpAtk_EV < 0))) setSpAtk_EV(value);
      if (stat === "Sp. Def" && (totalEV < 510 || (value-SpDef_EV < 0))) setSpDef_EV(value);
      if (stat === "Speed" && (totalEV < 510 || (value-Speed_EV < 0))) setSpeed_EV(value);
    }
  };

  return (
    <div className="flex flex-row">
        {/* IVs */}
        <div className="grid grid-cols-2 gap-2">
          <label>IV/EV Value (0-31):</label>
          <label></label>
          <label>HP : {HP_IV}</label>
          <input
            type="range"
            min={0}
            max={31}
            value={HP_IV}
            onChange={(e) => handleChange(e, "HP", "IV")}
          />
          <label>Attack : {Attack_IV}</label>
          <input
            type="range"
            min={0}
            max={31}
            value={Attack_IV}
            onChange={(e) => handleChange(e, "Attack", "IV")}
          />
          <label>Defense : {Defense_IV}</label>
          <input
            type="range"
            min={0}
            max={31}
            value={Defense_IV}
            onChange={(e) => handleChange(e, "Defense", "IV")}
          />
          <label>Sp. Atk : {SpAtk_IV}</label>
          <input
            type="range"
            min={0}
            max={31}
            value={SpAtk_IV}
            onChange={(e) => handleChange(e, "Sp. Atk", "IV")}
          />
          <label>Sp. Def : {SpDef_IV}</label>
          <input
            type="range"
            min={0}
            max={31}
            value={SpDef_IV}
            onChange={(e) => handleChange(e, "Sp. Def", "IV")}
          />
          <label>Speed : {Speed_IV}</label>
          <input
            type="range"
            min={0}
            max={31}
            value={Speed_IV}
            onChange={(e) => handleChange(e, "Speed", "IV")}
          />
        </div>
        {/* EVs */}
        <div className="grid grid-cols-2 gap-2">
          <label>EV Value (0-252):</label>
          <label></label>
          <label>HP : {HP_EV}</label>
          <input
            type="range"
            min={0}
            max={252}
            value={HP_EV}
            onChange={(e) => handleChange(e, "HP", "EV")}
          />
          <label>Attack : {Attack_EV}</label>
          <input
            type="range"
            min={0}
            max={252}
            value={Attack_EV}
            onChange={(e) => handleChange(e, "Attack", "EV")}
          />
          <label>Defense : {Defense_EV}</label>
          <input
            type="range"
            min={0}
            max={252}
            value={Defense_EV}
            onChange={(e) => handleChange(e, "Defense", "EV")}
          />
          <label>Sp. Atk : {SpAtk_EV}</label>
          <input
            type="range"
            min={0}
            max={252}
            value={SpAtk_EV}
            onChange={(e) => handleChange(e, "Sp. Atk", "EV")}
          />
          <label>Sp. Def : {SpDef_EV}</label>
          <input
            type="range"
            min={0}
            max={252}
            value={SpDef_EV}
            onChange={(e) => handleChange(e, "Sp. Def", "EV")}
          />
          <label>Speed : {Speed_EV}</label>
          <input
            type="range"
            min={0}
            max={252}
            value={Speed_EV}
            onChange={(e) => handleChange(e, "Speed", "EV")}
          />
        </div>
    </div>
  );
};
