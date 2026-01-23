import { useNavigate } from "@tanstack/react-router";
import { ImageButton } from "@components/image-button";
import { useSidebarStore } from "@stores/sidebar-store";
import { useThemeStore } from "@stores/theme-store";

export const MainMenu = () => {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`w-full ${theme === "dark" ? "bg-slate-600" : "bg-slate-300" } shadow-md`}>
      <div className="flex flex-row flex-wrap w-full max-w-[200rem] mx-auto p-[clamp(0.5rem,2vw,1rem)] gap-[clamp(0.25rem,1.5vw,0.75rem)]">
        <ImageButton
          background="/images/bg-grass.png"
          onClick={toggleSidebar}
          icon="fa-solid fa-bars"
        />
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => navigate({ to: "/" })}
          text="Home"
          icon="fa-solid fa-house"
        />
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => navigate({ to: "/calculator" })}
          text="Calculator"
          icon="fa-solid fa-calculator"
        />
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => navigate({ to: "/leaderboard" })}
          text="Leaderboard"
          icon="fa-solid fa-trophy"
        />

        {/* profilg-button */}
        <ImageButton
          background="/images/bg-grass.png"
          onClick={() => null}
          className="ml-auto"
          icon="fa-solid fa-user"
        />
      </div>
    </div>
  );
};
