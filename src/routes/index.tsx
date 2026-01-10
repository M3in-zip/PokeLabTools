import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex p-2">
      <img src="/images/player.png" alt="Player Illustration" className="p-2 w-[30%] pixel-art" />
    </div>
  )
}