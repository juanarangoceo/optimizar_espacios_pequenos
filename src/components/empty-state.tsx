"use client"

import { FileQuestion, Sparkles } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  categoryName: string
  categorySlug?: string
  message?: string
}

export function EmptyState({ categoryName, categorySlug, message }: EmptyStateProps) {
  const defaultMessage = message || `Próximamente contenido sobre ${categoryName}`
  
  return (
    <div className="py-16 px-6 text-center">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center">
              <FileQuestion className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">
          {defaultMessage}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Estamos trabajando en traerte el mejor contenido sobre {categoryName.toLowerCase()}. 
          Mientras tanto, explora otras secciones.
        </p>

        {/* CTA */}
        {categorySlug && (
          <Link
            href={`/espacios/${categorySlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Ver categoría completa
          </Link>
        )}
      </div>
    </div>
  )
}
