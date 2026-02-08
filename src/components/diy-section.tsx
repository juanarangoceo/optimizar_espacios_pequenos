"use client"

import Image from "next/image"
import { ArrowLeftRight, ArrowRight } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"

const defaultDiy = {
    title: "Renovacion del Balcon",
    description: "Convertimos un trastero caotico en un oasis de lectura utilizando materiales reciclados.",
    imageBefore: "/images/diy-before.jpg",
    imageAfter: "/images/diy-after.jpg",
    slug: "#"
}

interface DiySectionProps {
  posts?: Post[]
}

export function DiySection({ posts = [] }: DiySectionProps) {
  const hasPosts = posts.length > 0;
  const post = hasPosts ? posts[0] : null;
  
  const title = post ? post.title : defaultDiy.title;
  const description = post ? post.description : defaultDiy.description;
  const link = post ? `/espacios/proyectos-diy/${post.slug.current}` : defaultDiy.slug;
  const image = post?.mainImage ? urlFor(post.mainImage).width(800).url() : null;

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Proyectos DIY
        </h2>
        <Link href="/espacios/proyectos-diy" className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todos
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="bg-card rounded overflow-hidden shadow-sm border border-border group">
        {/* Before/After Split Image or Single Image for Post */}
        <Link href={link} className="relative h-64 md:h-80 w-full flex bg-muted overflow-hidden">
           {hasPosts && image ? (
               <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 960px"
               />
           ) : !hasPosts ? (
                <>
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span>Before / After Image Comparison</span>
                   </div>
                    <div className="absolute top-4 left-4 bg-foreground/70 text-card text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider z-10">
                      Antes
                    </div>
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider z-10">
                      Despues
                    </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-full p-1.5 shadow-lg z-10">
                    <ArrowLeftRight className="h-5 w-5 text-primary" />
                  </div>
                </>
           ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <span>No Image Available</span>
                </div>
           )}
        </Link>

        <div className="p-5 md:p-6">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-xl font-bold text-foreground">
              {title}
            </h3>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded">
              Nivel: Medio
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>
          <Link href={link} className="text-sm font-bold text-foreground underline decoration-2 decoration-primary underline-offset-4 hover:text-primary transition-colors">
            Ver paso a paso
          </Link>
        </div>
      </div>
    </section>
  )
}
