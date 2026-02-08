'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }
    
    startTransition(() => {
      router.replace(`/blog?${params.toString()}`)
    })
  }

  return (
    <div className="relative max-w-lg mx-auto mb-12">
      <label htmlFor="search" className="sr-only">Buscar artículos</label>
      <div className="flex items-center border-b border-muted-foreground/30 focus-within:border-foreground transition-colors py-2">
        <Search className="w-5 h-5 text-muted-foreground mr-3" />
        <input
          id="search"
          type="text"
          placeholder="Buscar artículos..."
          className="bg-transparent border-none outline-none w-full text-lg placeholder:text-muted-foreground/70"
          defaultValue={searchParams.get('q')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {isPending && <span className="animate-spin ml-2 text-muted-foreground">⟳</span>}
      </div>
    </div>
  )
}
