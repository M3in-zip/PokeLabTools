import { useNavigate } from "@tanstack/react-router";
import { ImageButton } from "@components/image-button";
import { useSidebarStore } from "@/stores/sidebar-store";

export const MainMenu = () => {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <div className="flex flex-row flex-wrap w-full gap-2 p-2 bg-[#aba59d]">
      <ImageButton
        background="/images/bg-button.png"
        onClick={toggleSidebar}
        icon="fa-solid fa-bars"
      />
      <ImageButton
        background="/images/bg-button.png"
        onClick={() => navigate({ to: "/" })}
        text="Home"
        icon="fa-solid fa-house"
      />
      <ImageButton
        background="/images/bg-button.png"
        onClick={() => navigate({ to: "/calculator" })}
        text="Calculator"
        icon="fa-solid fa-calculator"
      />
      <ImageButton
        background="/images/bg-button.png"
        onClick={() => navigate({ to: "/leaderboard" })}
        text="Leaderboard"
        icon="fa-solid fa-trophy"
      />

      {/* profile button */}
      <ImageButton
        background="/images/bg-button.png"
        onClick={() => console.log("Profile clicked")}
        className="ml-auto"
        icon="fa-solid fa-user"
      />
    </div>
  );
};
