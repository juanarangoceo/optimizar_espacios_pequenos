"use client"

import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"
import { EmptyState } from "./empty-state"

interface DiySectionProps {
  posts?: Post[]
}

export function DiySection({ posts = [] }: DiySectionProps) {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Proyectos paso a paso
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mt-1">
            Proyectos DIY
          </h2>
        </div>
        <Link href="/espacios/proyectos-diy" className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Tutoriales detallados para construir tus propios muebles multifuncionales.
      </p>

      {posts.length === 0 ? (
        <EmptyState 
          categoryName="Proyectos DIY" 
          categorySlug="proyectos-diy"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post) => {
            const image = post.mainImage ? urlFor(post.mainImage).width(800).url() : null

            return (
              <Link
                key={post._id}
                href={`/espacios/proyectos-diy/${post.slug.current}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video w-full rounded overflow-hidden bg-muted mb-4">
                  {image ? (
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground rounded text-[10px] font-bold">
                    Proyecto DIY
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
