"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"
import { EmptyState } from "./empty-state"

interface OrganizationSectionProps {
  posts?: Post[]
}

export function OrganizationSection({ posts = [] }: OrganizationSectionProps) {
  return (
    <section className="py-12 bg-muted/30">
      <div className="px-6 mb-6 flex justify-between items-end max-w-5xl mx-auto">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Sistemas de Organizacion
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            SOPs para optimizar cada rincon
          </p>
        </div>
        <Link href="/espacios/sistemas-de-organizacion" className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap">
          Ver todo
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="max-w-5xl mx-auto">
          <EmptyState 
            categoryName="Sistemas de Organización" 
            categorySlug="sistemas-de-organizacion"
          />
        </div>
      ) : (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 no-scrollbar max-w-5xl mx-auto">
          {posts.map((post, index) => {
            const image = post.mainImage ? urlFor(post.mainImage).width(600).url() : null

            return (
              <Link
                key={post._id}
                href={`/espacios/sistemas-de-organizacion/${post.slug.current}`}
                className="snap-center shrink-0 w-[280px] flex flex-col bg-card rounded border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {image ? (
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="280px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
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
