
"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Grid3X3,
  Menu,
  X,
  Search,
  Bookmark,
  User,
  ChefHat,
  MapPin,
  Sun,
  Zap,
  Armchair,
  Wrench,
  BookOpenText,
} from "lucide-react"

const categories = [
  { label: "Sistemas de Organizacion", icon: ChefHat, href: "/espacios/sistemas-de-organizacion" },
  { label: "Curaduria de Espacios", icon: MapPin, href: "/espacios/curaduria-de-espacios" },
  { label: "Mobiliario Inteligente", icon: Armchair, href: "/espacios/mobiliario-inteligente" },
  { label: "Biohacking del Hogar", icon: Sun, href: "/espacios/biohacking-del-hogar" },
  { label: "Hacks", icon: Zap, href: "/espacios/hacks" },
  { label: "Proyectos DIY", icon: Wrench, href: "/espacios/proyectos-diy" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <Grid3X3 className="h-6 w-6 text-primary transition-transform group-hover:rotate-90 duration-500" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            OPTIMIZACION
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center p-2 rounded hover:bg-foreground/5 transition-colors"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {menuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-2">
          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 px-3">
              Categorias
            </p>
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="flex items-center gap-3 px-3 py-3 rounded text-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {cat.label}
                </Link>
              )
            })}

            <div className="h-px bg-border my-3" />

            {/* Additional Links Placeholder */}
            <Link
              href="/blog"
              className="flex items-center gap-3 px-3 py-3 rounded text-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <BookOpenText className="h-5 w-5" />
              Blog
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-3 px-3 py-3 rounded text-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <Search className="h-5 w-5" />
              Buscar
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
