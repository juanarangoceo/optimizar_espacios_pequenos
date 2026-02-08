"use client"

import Image from "next/image"
import { MapPin, ArrowRight, TrendingUp } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"

const defaultSpaces = [
  {
    city: "Tokio",
    title: "22m2 que parecen 60",
    description:
      "Particiones deslizantes, tatami elevado con almacenaje y la filosofia Ma aplicada al micro-living.",
    image: "/images/curaduria-tokyo.jpg",
    tag: "Iconico",
    slug: "#"
  },
  {
    city: "Paris",
    title: "El estudio con altillo",
    description:
      "Como un altillo de 6m2 transforma un monoambiente parisino en un duplex funcional.",
    image: "/images/curaduria-paris.jpg",
    tag: "Tendencia 2026",
    slug: "#"
  },
  {
    city: "Nueva York",
    title: "Loft industrial en 28m2",
    description:
      "Ladrillo visto, muebles convertibles y estanteria industrial: el micro-loft que se viralizo.",
    image: "/images/curaduria-nyc.jpg",
    tag: "Viral",
    slug: "#"
  },
]

interface CuraduriaSectionProps {
  posts?: Post[]
}

export function CuraduriaSection({ posts = [] }: CuraduriaSectionProps) {
  const displayItems = posts.length > 0 ? posts : defaultSpaces

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Inspiracion visual y analisis
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
        Apartamentos iconicos del mundo y las tendencias de diseno que los hacen
        funcionar.
      </p>

      {/* Featured card - First item */}
      {displayItems.length > 0 && (() => {
          const item = displayItems[0];
          const isPost = 'slug' in item && 'publishedAt' in item; // robust check
          const title = item.title;
          const description = item.description;
          // For sanity posts
          const image = isPost ? (item.mainImage ? urlFor(item.mainImage).width(960).url() : null) : (item as any).image;
          const link = isPost ? `/espacios/curaduria-de-espacios/${item.slug.current}` : (item as any).slug || "#";
          const city = isPost ? "Mundo" : (item as any).city; // Default 'Mundo' or could be a category field if we had it
          const tag = isPost ? "Destacado" : (item as any).tag;

          return (
            <Link href={link} className="group cursor-pointer mb-6 block">
                <div className="relative aspect-[16/10] w-full rounded overflow-hidden mb-4 bg-muted">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 960px"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-sm">Featured Space Image</span>
                    </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-foreground z-10">
                    <MapPin className="h-3 w-3 text-primary" />
                    {city}
                </div>
                
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider z-10">
                    {tag}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-card leading-tight">
                    {title}
                    </h3>
                    <p className="text-sm text-card/80 mt-1 line-clamp-2">
                    {description}
                    </p>
                </div>
                </div>
            </Link>
          )
      })()}

      {/* Secondary cards row */}
      <div className="grid grid-cols-2 gap-4">
        {displayItems.slice(1).map((item: any) => {
           const isPost = 'slug' in item && 'publishedAt' in item;
           const title = item.title;
           const description = item.description;
           const image = isPost ? (item.mainImage ? urlFor(item.mainImage).width(460).url() : null) : item.image;
           const link = isPost ? `/espacios/curaduria-de-espacios/${item.slug.current}` : item.slug || "#";
           const city = isPost ? "Global" : item.city;
           const tag = isPost ? null : item.tag; // Ensure we handle missing tag for default
           
           return (
            <Link key={isPost ? item._id : item.city} href={link} className="group cursor-pointer block">
                <div className="relative aspect-[3/4] w-full rounded overflow-hidden mb-3 bg-muted">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 460px"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <span className="text-xs">Image</span>
                        </div>
                    )}

                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-foreground z-10">
                        <MapPin className="h-3 w-3 text-primary" />
                        {city}
                    </div>
                    
                    {tag === "Tendencia 2026" && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded z-10">
                        <TrendingUp className="h-3 w-3" />
                        {tag}
                        </div>
                    )}
                </div>
                <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {description}
                </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
