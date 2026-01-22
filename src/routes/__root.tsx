import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { MainMenu } from "@/components/main-menu/main-menu";
import { useSidebarStore } from "@stores/sidebar-store";
import { useThemeStore } from "@stores/theme-store";
import { useEffect } from "react";

const RootLayout = () => {
  const visible = useSidebarStore((state) => state.visible);
  const detectTheme = useThemeStore((state) => state.detectTheme);
  useEffect(() => {
    detectTheme();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-auto">
      <div className="flex flex-col flex-1 w-full min-w-[360px] min-h-screen">
        <MainMenu />
        <hr />
        <main className="flex-1 bg-[#aba59d] w-full">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
