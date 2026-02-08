"use client"

import Image from "next/image"
import { Sun, Wind, MonitorSmartphone, ArrowRight, BookOpen } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"

const defaultTopics = [
  {
    icon: Sun,
    label: "Iluminacion Circadiana",
    summary: "Configura tu luz para sincronizar tu reloj biologico y mejorar el sueno.",
    readTime: "4 min",
    slug: "#"
  },
  {
    icon: Wind,
    label: "Calidad del Aire",
    summary: "Las 5 plantas que filtran toxinas y como colocarlas segun los m2.",
    readTime: "3 min",
    slug: "#"
  },
  {
    icon: MonitorSmartphone,
    label: "Ergonomia Remota",
    summary: "Escritorios, sillas y rutinas de movimiento para jornadas de +8h en casa.",
    readTime: "6 min",
    slug: "#"
  },
]

interface BiohackingSectionProps {
  posts?: Post[]
}

export function BiohackingSection({ posts = [] }: BiohackingSectionProps) {
  // Logic: First post is the banner, rest are topics.
  // If no posts, fallback to what exactly? We don't have a default banner in the component code, 
  // it was hardcoded structure.
  // We'll keep the banner structure but fill it with dynamic data if available.
  
  const hasPosts = posts.length > 0;
  const bannerPost = hasPosts ? posts[0] : null;
  const listPosts = hasPosts ? posts.slice(1) : defaultTopics; // If posts, slice 1..end. If no posts, use defaults for list.

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto bg-muted/20">
      <div className="mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
          Bienestar y optimizacion humana
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mt-1">
          Biohacking del Hogar
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Tu espacio afecta tu rendimiento. Optimiza el aire, la luz y la
        ergonomia para vivir y trabajar mejor.
      </p>

      {/* Visual banner */}
      <Link href={bannerPost ? `/espacios/biohacking-del-hogar/${bannerPost.slug.current}` : "/espacios/biohacking-del-hogar"} className="block relative rounded overflow-hidden mb-8 group cursor-pointer bg-muted">
        <div className="grid grid-cols-2 h-56 md:h-72">
          {bannerPost?.mainImage ? (
             <div className="col-span-2 relative">
                <Image
                    src={urlFor(bannerPost.mainImage).width(800).url()}
                    alt={bannerPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
             </div>
          ) : (
            <>
                <div className="relative border-r border-border/50 bg-secondary/50">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-xs">Light Setup</span>
                    </div>
                </div>
                <div className="relative bg-secondary/30">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-xs">Air Quality</span>
                    </div>
                </div>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/80">
            {bannerPost ? "Articulo Destacado" : "Guia completa"}
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-card mt-0.5">
            {bannerPost ? bannerPost.title : "Tu casa como sistema operativo de bienestar"}
          </h3>
        </div>
      </Link>

      {/* Topic cards */}
      <div className="flex flex-col gap-4">
        {listPosts.map((item: any, index: number) => {
          const isPost = 'slug' in item && 'publishedAt' in item;
          const Icon = isPost ? BookOpen : item.icon;
          const label = isPost ? item.title : item.label;
          const summary = isPost ? item.description : item.summary;
          const readTime = isPost ? new Date(item.publishedAt).toLocaleDateString() : item.readTime;
          const link = isPost ? `/espacios/biohacking-del-hogar/${item.slug.current}` : item.slug || "#";

          return (
            <Link
              key={isPost ? item._id : item.label}
              href={link}
              className="flex items-start gap-4 p-4 bg-card rounded border border-border hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </h4>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {readTime}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {summary}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-3" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
