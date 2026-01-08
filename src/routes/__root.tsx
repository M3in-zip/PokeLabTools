import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { MainMenu } from "@/components/main-menu/main-menu";
import { SidebarMenu } from "@/components/sidebar-menu";
import { useSidebarStore } from "@stores/sidebar-store";

const RootLayout = () => {
  const visible = useSidebarStore((state) => state.visible);

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <SidebarMenu visible={visible} />
      <div className="flex flex-col flex-1 w-full min-h-screen">
        <MainMenu />
        <hr />
        <main className="flex-1 bg-[url('/images/main-menu-bg.png')] bg-cover bg-center">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
