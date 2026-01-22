import { usePokemonStore } from "@/stores/pokemonStore";
import { useEffect, useState, useMemo } from "react";
import { DropDown } from "../drop-down";
import type { pokemonNature } from "@/stores/pokemonStore";

export type Stat = "HP" | "Atk" | "Def" | "Sp. Atk" | "Sp. Def" | "Speed";
export type StatValue = number | "";

interface IVEVProps {
  baseStats: number[];
  onChange: (stats: number[]) => void;
}

export const PokemonStats = ({ baseStats, onChange }: IVEVProps) => {
  const [selectedNature, setSelectedNature] = useState<string>("--");
  const [IVs, setIVs] = useState<Record<Stat, StatValue>>({
    HP: 31,
    Atk: 31,
    Def: 31,
    "Sp. Atk": 31,
    "Sp. Def": 31,
    Speed: 31,
  });
  const [EVs, setEVs] = useState<Record<Stat, StatValue>>({
    HP: 0,
    Atk: 0,
    Def: 0,
    "Sp. Atk": 0,
    "Sp. Def": 0,
    Speed: 0,
  });
  const [level, setLevel] = useState<string>("50");

  const nonNeutralNatures: pokemonNature[] = usePokemonStore((state) =>
    state.getNonNeutralNatures(),
  );
  const baseStatsObj: Record<Stat, number> = {
    HP: baseStats[0],
    Atk: baseStats[1],
    Def: baseStats[2],
    "Sp. Atk": baseStats[3],
    "Sp. Def": baseStats[4],
    Speed: baseStats[5],
  };
  const selectedNatureObj: pokemonNature | undefined = nonNeutralNatures.find(
    (nature) => nature.name === selectedNature,
  );

  const finalStats = useMemo<Record<Stat, number>>(() => {
    return {
      HP: Math.floor(
        ((2 * baseStatsObj["HP"] +
          (IVs["HP"] ? (IVs["HP"] as number) : 0) +
          ((EVs["HP"] ? (EVs["HP"] as number) : 0)/4)) *
          parseInt(level)) /
          100 +
          parseInt(level) +
          10,
      ),
      Atk: Math.floor(
        Math.floor(
          ((2 * baseStatsObj["Atk"] +
            (IVs["Atk"] ? (IVs["Atk"] as number) : 0) +
            ((EVs["Atk"] ? (EVs["Atk"] as number) : 0)/4)) *
            parseInt(level)) /
            100 +
            5,
        ) *
          (selectedNatureObj?.increasedStat == "Atk"
            ? 1.1
            : selectedNatureObj?.decreasedStat == "Atk"
              ? 0.9
              : 1),
      ),
      Def: Math.floor(
        Math.floor(
          ((2 * baseStatsObj["Def"] +
            (IVs["Def"] ? (IVs["Def"] as number) : 0) +
            ((EVs["Def"] ? (EVs["Def"] as number) : 0)/4)) *
            parseInt(level)) /
            100 +
            5,
        ) *
          (selectedNatureObj?.increasedStat == "Def"
            ? 1.1
            : selectedNatureObj?.decreasedStat == "Def"
              ? 0.9
              : 1),
      ),
      "Sp. Atk": Math.floor(
        Math.floor(
          ((2 * baseStatsObj["Sp. Atk"] +
            (IVs["Sp. Atk"] ? (IVs["Sp. Atk"] as number) : 0) +
            ((EVs["Sp. Atk"] ? (EVs["Sp. Atk"] as number) : 0)/4)) *
            parseInt(level)) /
            100 +
            5,
        ) *
          (selectedNatureObj?.increasedStat == "Sp. Atk"
            ? 1.1
            : selectedNatureObj?.decreasedStat == "Sp. Atk"
              ? 0.9
              : 1),
      ),
      "Sp. Def": Math.floor(
        Math.floor(
          ((2 * baseStatsObj["Sp. Def"] +
            (IVs["Sp. Def"] ? (IVs["Sp. Def"] as number) : 0) +
            ((EVs["Sp. Def"] ? (EVs["Sp. Def"] as number) : 0)/4)) *
            parseInt(level)) /
            100 +
            5,
        ) *
          (selectedNatureObj?.increasedStat == "Sp. Def"
            ? 1.1
            : selectedNatureObj?.decreasedStat == "Sp. Def"
              ? 0.9
              : 1),
      ),
      Speed: Math.floor(
        Math.floor(
          ((2 * baseStatsObj["Speed"] +
            (IVs["Speed"] ? (IVs["Speed"] as number) : 0) +
            ((EVs["Speed"] ? (EVs["Speed"] as number) : 0)/4)) *
            parseInt(level)) /
            100 +
            5,
        ) *
          (selectedNatureObj?.increasedStat == "Speed"
            ? 1.1
            : selectedNatureObj?.decreasedStat == "Speed"
              ? 0.9
              : 1),
      ),
    };
  }, [baseStats, IVs, EVs, level, selectedNatureObj]);

  useEffect(() => {
    onChange([
      finalStats["HP"],
      finalStats["Atk"],
      finalStats["Def"],
      finalStats["Sp. Atk"],
      finalStats["Sp. Def"],
      finalStats["Speed"],
    ]);
  }, [finalStats]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stat: Stat,
    type: "IV" | "EV",
  ) => {
    var nextValue = e.target.value ? parseInt(e.target.value) : "";
    const numericValue = typeof nextValue === "number" ? nextValue : 0;

    if (type === "IV") {
      if (numericValue > 31) nextValue = 31;
      setIVs({ ...IVs, [stat]: nextValue });
    } else {
      if (numericValue > 252) return;
      const totalEVWithoutCurrent = Object.entries(EVs).reduce(
        (acc, [key, val]) =>
          acc + (key === stat ? 0 : typeof val === "number" ? val : 0),
        0,
      );
      const newTotalEV = totalEVWithoutCurrent + numericValue;
      if (newTotalEV < 509) setEVs({ ...EVs, [stat]: nextValue });
    }
  };

  const handleBlur = (stat: Stat, type: "IV" | "EV") => {
    if (type === "IV") {
      if (IVs[stat] === "") {
        setIVs({ ...IVs, [stat]: 0 });
      }
    } else {
      if (EVs[stat] === "") {
        setEVs({ ...EVs, [stat]: 0 });
      }
    }
  };

  const inputClassName = "border-2 border-white rounded-md";
  const customInput = (
    min: number,
    max: number,
    value: StatValue,
    stat: Stat,
    type: "IV" | "EV",
    step?: number,
  ) => (
    <input
      className={inputClassName}
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => handleChange(e, stat, type)}
      onBlur={() => handleBlur(stat, type)}
      step={step || 1}
    />
  );

  return (
    <div className="p-2">
      <div className="flex flex-row items-center gap-2 mb-2">
        <span className="font-semibold whitespace-nowrap">NATURE : </span>
        <DropDown
          onSelect={setSelectedNature}
          value={selectedNature}
          dataSource={[
            { value: "--", item: <span>--</span> },
            ...nonNeutralNatures.map((n) => ({
              value: n.name,
              item: (
                <span className="flex flex-row gap-2 p-2">
                  <span className="font-semibold">{n.name}</span>
                  <span className="text-[#4AF594] font-semibold">
                    {n.increasedStat}
                  </span>
                  <span className="text-[#F91A34] font-semibold">
                    {n.decreasedStat}
                  </span>
                </span>
              ),
            })),
          ]}
        />
        <span className="font-semibold whitespace-nowrap">LEVEL : </span>
        <DropDown
          onSelect={setLevel}
          value={level}
          dataSource={[
            { value: "50", item: <span>50</span> },
            { value: "100", item: <span>100</span> },
          ]}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <span className="font-semibold">STAT</span>
        <span></span>
        <span className="font-semibold">IV (0-31)</span>
        <span className="font-semibold">EV (0-252)</span>
        <span className="whitespace-nowrap">HP : </span>
        <span>{finalStats["HP"]}</span>
        {customInput(0, 31, IVs.HP, "HP", "IV")}
        {customInput(0, 252, EVs.HP, "HP", "EV", 4)}
        <span className="whitespace-nowrap">Attack : </span>
        <span>{finalStats["Atk"]}</span>
        {customInput(0, 31, IVs.Atk, "Atk", "IV")}
        {customInput(0, 252, EVs.Atk, "Atk", "EV", 4)}
        <span className="whitespace-nowrap">Defense : </span>
        <span>{finalStats["Def"]}</span>
        {customInput(0, 31, IVs.Def, "Def", "IV")}
        {customInput(0, 252, EVs.Def, "Def", "EV", 4)}
        <span className="whitespace-nowrap">Sp. Atk : </span>
        <span>{finalStats["Sp. Atk"]}</span>
        {customInput(0, 31, IVs["Sp. Atk"], "Sp. Atk", "IV")}
        {customInput(0, 252, EVs["Sp. Atk"], "Sp. Atk", "EV", 4)}
        <span className="whitespace-nowrap">Sp. Def : </span>
        <span>{finalStats["Sp. Def"]}</span>
        {customInput(0, 31, IVs["Sp. Def"], "Sp. Def", "IV")}
        {customInput(0, 252, EVs["Sp. Def"], "Sp. Def", "EV", 4)}
        <span className="whitespace-nowrap">Speed : </span>
        <span>{finalStats["Speed"]}</span>
        {customInput(0, 31, IVs.Speed, "Speed", "IV")}
        {customInput(0, 252, EVs.Speed, "Speed", "EV", 4)}
      </div>
    </div>
  );
};
