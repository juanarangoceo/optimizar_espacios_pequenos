"use client"

import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"
import { EmptyState } from "./empty-state"

interface CuraduriaSectionProps {
  posts?: Post[]
}

export function CuraduriaSection({ posts = [] }: CuraduriaSectionProps) {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Analisis de espacios
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mt-1">
            Curaduria de Espacios
          </h2>
        </div>
        <Link href="/espacios/curaduria-de-espacios" className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Casos de estudio de micro-apartamentos iconicos alrededor del mundo.
      </p>

      {posts.length === 0 ? (
        <EmptyState 
          categoryName="Curaduría de Espacios" 
          categorySlug="curaduria-de-espacios"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured Post */}
          {posts[0] && (
            <Link
              href={`/espacios/curaduria-de-espacios/${posts[0].slug.current}`}
              className="md:col-span-2 group cursor-pointer"
            >
              <div className="relative aspect-[21/9] w-full rounded overflow-hidden bg-muted">
                {posts[0].mainImage ? (
                  <Image
                    src={urlFor(posts[0].mainImage).width(1200).url()}
                    alt={posts[0].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <span className="text-xs">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-[10px] font-bold">
                      Destacado
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                    {posts[0].title}
                  </h3>
                  <p className="text-sm opacity-90 line-clamp-2">
                    {posts[0].description}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Secondary Posts */}
          {posts.slice(1, 3).map((post) => (
            <Link
              key={post._id}
              href={`/espacios/curaduria-de-espacios/${post.slug.current}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video w-full rounded overflow-hidden bg-muted mb-3">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(600).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <span className="text-xs">No Image</span>
                  </div>
                )}
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {post.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
