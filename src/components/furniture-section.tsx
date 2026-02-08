
"use client"

import Image from "next/image"
import { Star, ArrowRight, BadgeCheck, Clock } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"
import { EmptyState } from "./empty-state"

interface FurnitureSectionProps {
  posts?: Post[]
}

export function FurnitureSection({ posts = [] }: FurnitureSectionProps) {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Ingenieria y diseno
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mt-1">
            Mobiliario Inteligente
          </h2>
        </div>
        <Link href="/espacios/mobiliario-inteligente" className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Resenas de muebles modulares, camas ocultas y piezas multifuncionales
        que transforman tu espacio.
      </p>

      {posts.length === 0 ? (
        <EmptyState 
          categoryName="Mobiliario Inteligente" 
          categorySlug="mobiliario-inteligente"
        />
      ) : (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
          {posts.map((post, index) => {
            const image = post.mainImage ? urlFor(post.mainImage).width(600).url() : null
            const tag = index === 0 ? "Nuevo" : "Artículo"
            
            return (
              <Link
                key={post._id}
                href={`/espacios/mobiliario-inteligente/${post.slug.current}`}
                className="snap-center shrink-0 w-[280px] md:w-auto flex flex-col bg-card rounded border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {image ? (
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 z-10 bg-primary text-primary-foreground">
                    {tag === "Nuevo" && <BadgeCheck className="h-3 w-3" />}
                    {tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Articulo
                  </p>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Read Time */}
                  <div className="flex items-center gap-1.5 mt-auto">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
