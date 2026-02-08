
"use client"

import Image from "next/image"
import { ChefHat, Shirt, Bath, LayoutGrid } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"

const defaultCategories = [
  {
    title: "Cocinas Ocultas",
    description: "Tecnicas para esconder electrodomesticos.",
    image: "/images/kitchen-org.jpg", // Needs placeholder
    icon: ChefHat,
  },
  {
    title: "Armarios Capsula",
    description: "Maximiza el espacio vertical en tu closet.",
    image: "/images/wardrobe-org.jpg", // Needs placeholder
    icon: Shirt,
  },
  {
    title: "Banos Minis",
    description: "Diseno inteligente para 3 metros cuadrados.",
    image: "/images/bathroom-org.jpg", // Needs placeholder
    icon: Bath,
  },
]

interface OrganizationSectionProps {
  posts?: Post[]
}

export function OrganizationSection({ posts = [] }: OrganizationSectionProps) {
  const displayItems = posts.length > 0 ? posts : defaultCategories

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

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 no-scrollbar max-w-5xl mx-auto">
        {displayItems.map((item: any, index: number) => {
          const isPost = 'slug' in item;
          const title = isPost ? item.title : item.title;
          const description = isPost ? item.description : item.description;
          const image = isPost ? (item.mainImage ? urlFor(item.mainImage).width(600).url() : null) : item.image;
          const link = isPost ? `/espacios/sistemas-de-organizacion/${item.slug.current}` : "#";
          
          // Legacy icon handling or default for posts
          const Icon = !isPost ? item.icon : LayoutGrid;

          return (
            <Link
              key={isPost ? item._id : item.title}
              href={link}
              className="snap-center shrink-0 w-[220px] md:w-[280px] flex flex-col group cursor-pointer"
            >
              <div className="aspect-[3/4] w-full rounded overflow-hidden relative mb-3 bg-secondary">
                {image ? (
                   <Image
                     src={image}
                     alt={title}
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-500"
                     sizes="280px"
                   />
                ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">No Image</span>
                   </div>
                )}
                
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm p-2 rounded-full z-10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
