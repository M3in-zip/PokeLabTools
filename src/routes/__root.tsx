import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { MainMenu } from '@/components/main-menu/main-menu'

const RootLayout = () => {
  
  return(
  <>
    <div className="p-2 flex gap-2">
      <MainMenu />
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)}

export const Route = createRootRoute({ component: RootLayout })