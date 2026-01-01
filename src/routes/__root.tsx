import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { MainMenu } from '@/components/main-menu/main-menu'

const RootLayout = () => {
  const navigate = useNavigate()
  
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