
"use client"

import { useState } from "react"
import { Home, Search, Bookmark, User } from "lucide-react"

const navItems = [
  { label: "Inicio", icon: Home, href: "/" },
  { label: "Buscar", icon: Search, href: "/" },
  { label: "Guardados", icon: Bookmark, href: "/" },
  { label: "Perfil", icon: User, href: "/" },
]

export function BottomNav() {
  const [active, setActive] = useState("Inicio")

  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-card/95 backdrop-blur-lg border-t border-border z-50 md:hidden"
      role="navigation"
      aria-label="Navegacion principal"
    >
      <div className="flex justify-between items-center max-w-md mx-auto h-16 px-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex flex-col items-center gap-1 transition-colors group ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`h-5 w-5 transition-transform group-hover:-translate-y-0.5 ${isActive ? "fill-primary" : ""}`}
              />
              <span
                className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      {/* Safe area spacer for iOS */}
      <div className="h-5 w-full" />
    </nav>
  )
}
