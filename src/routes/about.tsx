import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const Route = createFileRoute('/about')({
  component: About,
})

// funzione di fetch
const fetchPokemon = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
  if (!res.ok) {
    throw new Error('Errore nel fetch')
  }
  return res.json()
}

const fetchPokemonByName = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (!res.ok) {
    throw new Error('Pokémon non trovato')
  }
  return res.json()
}


function About() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => /* fetchPokemonByName("regice") */fetchPokemon(),
  })
  
  useEffect(() => {console.log("api v2/pokemon",data)}, [data])

  if (isLoading) return <div className="p-2">Loading...</div>
  if (error) return <div className="p-2">Errore nel caricamento</div>

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold mb-2">Pokémon</h1>
      {/* <img src={data.sprites.front_default} alt={data.name} className="w-48 h-48 pixel-art" /> */}
    </div>
  )
}
