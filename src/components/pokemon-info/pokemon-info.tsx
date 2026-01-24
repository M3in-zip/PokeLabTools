import { Fragment } from "react";

interface stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface SpriteStatsProps {
  sprite: string;
  stats: stat[];
  type?: string[];
}

export const PokemonInfo = ({ sprite, stats, type }: SpriteStatsProps) => {
  const statNameMap: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  const getStatColor = (value: number) => {
    if (value >= 180) return "bg-[#02ffaa]"; // blu per stat ottime
    if (value >= 150) return "bg-[#02ff2a]"; // verde pieno
    if (value >= 120) return "bg-[#9aff00]"; // verde chiaro
    if (value >= 90) return "bg-[#ffe400]"; // giallo
    if (value >= 60) return "bg-[#ff4c00]"; // arancione
    return "bg-[#e01804]"; // rosso per basso
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full p-2 justify-between">
      <div className="flex flex-col items-center">
      <img
        src={sprite}
        alt="Pokemon sprite"
        className="pixel-art"
      />
      {type && (
        <div className="mt-2 flex gap-2">
          {type.map((t) => (
            <span
              key={t}
              className={`px-2 py-1 ${t} text-white rounded-full border-2 border-white text-xs font-semibold`}
            >
              {t}
            </span>
          ))}
        </div>
      )}
      </div>
      <div className="grid grid-cols-[auto_auto_1fr] w-full gap-2 items-center">
        {stats.map((stat) => {
          const percentage = (stat.base_stat / 255) * 100;
          const barColor = getStatColor(stat.base_stat);

          return (
            <Fragment key={stat.stat.name}
            >
              <div className="text-right breaking-words text-nowrap">
                {statNameMap[stat.stat.name] || stat.stat.name}
              </div>

              <div className="text-left text-nowrap">{stat.base_stat}</div>

              <div className="w-full rounded h-[clamp(0.2rem,0.5vw,4rem)]">
                <div
                  className={`${barColor} h-full rounded`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
