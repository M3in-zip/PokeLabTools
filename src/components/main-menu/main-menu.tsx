import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "@tanstack/react-router";

export const MainMenu = () => {
  const navigate = useNavigate();
  {/* <NavigationMenuLink onClick={() => navigate({ to: "/" })}>Home</NavigationMenuLink> */}
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink onClick={() => navigate({ to: "/" })}>Home</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink onClick={() => navigate({ to: "/about" })}>
              About
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
};


