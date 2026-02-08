"use client"

import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"
import { EmptyState } from "./empty-state"

interface HacksSectionProps {
  posts?: Post[]
}

export function HacksSection({ posts = [] }: HacksSectionProps) {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Tips rapidos
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mt-1">
            Hacks
          </h2>
        </div>
        <Link href="/espacios/hacks" className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Trucos instantaneos para ganar espacio sin reformas ni inversion.
      </p>

      {posts.length === 0 ? (
        <EmptyState 
          categoryName="Hacks" 
          categorySlug="hacks"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.slice(0, 4).map((post, index) => {
            const image = post.mainImage ? urlFor(post.mainImage).width(400).url() : null

            return (
              <Link
                key={post._id}
                href={`/espacios/hacks/${post.slug.current}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded overflow-hidden bg-muted mb-3">
                  {image ? (
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
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
