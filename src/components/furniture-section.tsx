
"use client"

import Image from "next/image"
import { Star, ArrowRight, BadgeCheck, Clock } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"

const defaultFurniture = [
  {
    name: "Cama Murphy Studio",
    brand: "NordicWall",
    image: "/images/furniture-bed.jpg",
    rating: 4.8,
    reviews: 124,
    tag: "Editor's Pick",
    description:
      "Cama abatible que se transforma en escritorio de trabajo. Mecanismo hidraulico silencioso.",
    feature: "Cama + escritorio",
  },
  {
    name: "Sofa Modular Flex",
    brand: "OmniLiving",
    image: "/images/furniture-modular.jpg",
    rating: 4.6,
    reviews: 89,
    tag: "Mas vendido",
    description:
      "6 configuraciones posibles con almacenaje oculto bajo cada modulo. Tapizado antimanchas.",
    feature: "6 en 1",
  },
  {
    name: "Mesa Extensible Orbit",
    brand: "CompactHome",
    image: "/images/furniture-table.jpg",
    rating: 4.7,
    reviews: 67,
    tag: "Nuevo",
    description:
      "De mesa para 2 a mesa para 6 en un giro. Mecanismo patentado sin herramientas.",
    feature: "2 a 6 personas",
  },
]

interface FurnitureSectionProps {
  posts?: Post[]
}

export function FurnitureSection({ posts = [] }: FurnitureSectionProps) {
  // Use posts if available, otherwise use defaultFurniture (only if NO posts)
  // Actually, user wants to fill slots. If we have 1 post, we might want to show it + 2 defaults?
  // User said: "Si la sección tiene 3 espacios, se mostrarán los 3 más recientes, desplazando a los antiguos."
  // This implies we replace defaults with posts.
  
  const displayItems = posts.length > 0 ? posts : defaultFurniture

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

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
        {displayItems.map((item: any, index: number) => {
           // Type guard or rough check
           const isPost = 'slug' in item;
           const title = isPost ? item.title : item.name;
           const description = isPost ? item.description : item.description;
           const image = isPost ? (item.mainImage ? urlFor(item.mainImage).width(600).url() : null) : item.image;
           const tag = isPost ? (index === 0 ? "Nuevo" : "Artículo") : item.tag;
           const badgeColor = isPost ? "bg-primary text-primary-foreground" : "bg-card/90 backdrop-blur-sm text-foreground";
           const link = isPost ? `/espacios/mobiliario-inteligente/${item.slug.current}` : "#";

           return (
            <Link
              key={isPost ? item._id : item.name}
              href={link}
              className="snap-center shrink-0 w-[280px] md:w-auto flex flex-col bg-card rounded border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {image ? (
                   <Image
                     src={image}
                     alt={title}
                     fill
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                     sizes="(max-width: 768px) 280px, 320px"
                   />
                ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                     <span className="text-xs">No Image</span>
                   </div>
                )}
                
                {tag && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 z-10 ${badgeColor}`}>
                    {tag === "Editor's Pick" && (
                      <BadgeCheck className="h-3 w-3" />
                    )}
                    {tag}
                  </div>
                )}
                
                {!isPost && item.feature && (
                  <div className="absolute bottom-3 right-3 bg-foreground/80 text-card text-[10px] font-bold px-2 py-1 rounded z-10">
                    {item.feature}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  {isPost ? "Articulo" : item.brand}
                </p>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {description}
                </p>

                {/* Rating or Read Time */}
                <div className="flex items-center gap-1.5 mt-auto">
                   {isPost ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      </div>
                   ) : (
                      <>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={`star-${item.name}-${i}`}
                              className={`h-3 w-3 ${
                                i < Math.floor(item.rating)
                                  ? "fill-primary text-primary"
                                  : "text-border"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-foreground">
                          {item.rating}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          ({item.reviews})
                        </span>
                      </>
                   )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
