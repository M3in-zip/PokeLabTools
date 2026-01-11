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
}

export const SpriteStats = ({ sprite, stats }: SpriteStatsProps) => {
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
    <div className="flex flex-row items-center gap-4 w-[clamp(15rem,50vw,40rem)]">
      <img
        src={sprite}
        alt="Pokemon sprite"
        className="h-[clamp(5rem,16vw,15rem)] pixel-art"
      />
      <div className="flex flex-col w-full gap-2">
        {stats.map((stat) => {
          const percentage = (stat.base_stat / 255) * 100;
          const barColor = getStatColor(stat.base_stat);

          return (
            <div
              key={stat.stat.name}
              className="flex items-center gap-2 w-full"
            >
              {/* Colonna 1: nome */}
              <div className="w-[30%] text-right">
                {statNameMap[stat.stat.name] || stat.stat.name}:
              </div>

              {/* Colonna 2: valore */}
              <div className="w-[10%] text-left">{stat.base_stat}</div>

              {/* Colonna 3: barra */}
              <div className="w-[60%] rounded h-[clamp(0.2rem,0.5vw,4rem)]">
                <div
                  className={`${barColor} h-full rounded`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
