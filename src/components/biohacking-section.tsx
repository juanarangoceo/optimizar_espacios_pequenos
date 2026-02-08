"use client"

import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"
import { EmptyState } from "./empty-state"

interface BiohackingSectionProps {
  posts?: Post[]
}

export function BiohackingSection({ posts = [] }: BiohackingSectionProps) {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Optimizacion del entorno
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mt-1">
            Biohacking del Hogar
          </h2>
        </div>
        <Link href="/espacios/biohacking-del-hogar" className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Iluminacion circadiana, calidad del aire, acustica y temperatura: ciencia aplicada al micro-living.
      </p>

      {posts.length === 0 ? (
        <EmptyState 
          categoryName="Biohacking del Hogar" 
          categorySlug="biohacking-del-hogar"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner Post */}
          {posts[0] && (
            <Link
              href={`/espacios/biohacking-del-hogar/${posts[0].slug.current}`}
              className="md:col-span-2 relative aspect-[21/9] rounded overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-muted">
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
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-2 py-1 bg-primary text-primary-foreground rounded text-[10px] font-bold mb-2">
                  Destacado
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                  {posts[0].title}
                </h3>
                <p className="text-sm opacity-90 line-clamp-2">
                  {posts[0].description}
                </p>
              </div>
            </Link>
          )}

          {/* List Posts */}
          <div className="md:col-span-2 space-y-4">
            {posts.slice(1, 4).map((post) => (
              <Link
                key={post._id}
                href={`/espacios/biohacking-del-hogar/${post.slug.current}`}
                className="flex gap-4 group cursor-pointer"
              >
                <div className="relative w-24 h-24 shrink-0 rounded overflow-hidden bg-muted">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(200).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="96px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-[10px]">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
