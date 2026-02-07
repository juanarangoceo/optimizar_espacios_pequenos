
"use client"

import Image from "next/image"
import { Star, ArrowRight, BadgeCheck } from "lucide-react"

const furniture = [
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

export function FurnitureSection() {
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
        <button className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todo
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Resenas de muebles modulares, camas ocultas y piezas multifuncionales
        que transforman tu espacio.
      </p>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
        {furniture.map((item) => (
          <div
            key={item.name}
            className="snap-center shrink-0 w-[280px] md:w-auto flex flex-col bg-card rounded border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                 <span className="text-xs">Furniture Image</span>
               </div>
              {/*
              <Image
                src={item.image || "/placeholder.svg"}
                alt={`${item.name} de ${item.brand} - ${item.description}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 320px"
              />
              */}
              <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-foreground flex items-center gap-1 z-10">
                {item.tag === "Editor's Pick" && (
                  <BadgeCheck className="h-3 w-3 text-primary" />
                )}
                {item.tag}
              </div>
              <div className="absolute bottom-3 right-3 bg-foreground/80 text-card text-[10px] font-bold px-2 py-1 rounded z-10">
                {item.feature}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                {item.brand}
              </p>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                {item.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-auto">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
