
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Migas de pan"
      className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto no-scrollbar"
    >
      <Link
        href="/"
        className="shrink-0 flex items-center gap-1 hover:text-primary transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Inicio</span>
      </Link>

      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5 shrink-0">
          <ChevronRight className="h-3 w-3 text-border" />
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium whitespace-nowrap" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
