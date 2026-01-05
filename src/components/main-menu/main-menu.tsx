import { useNavigate } from "@tanstack/react-router";
import { ImageButton } from "@components/image-button";

export const MainMenu = () => {
  const navigate = useNavigate();
  {/* <NavigationMenuLink onClick={() => navigate({ to: "/" })}>Home</NavigationMenuLink> */}
  return (
    <div className="flex flex-row w-full">
      <ImageButton
        buttonImgSrc="/images/hamburger-menu.png"
        onClick={() => console.log("Menu clicked")}
      />
      <ImageButton
        buttonImgSrc="/images/home-icon.png"
        onClick={() => navigate({ to: "/" })}
        className="ml-4"
      />
      <ImageButton
        buttonImgSrc="/images/profile-icon.png"
        onClick={() => console.log("Profile clicked")}
        className="ml-auto"
      />
    </div>
  );
};


