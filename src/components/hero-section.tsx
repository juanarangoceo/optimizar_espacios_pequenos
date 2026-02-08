
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"

interface HeroSectionProps {
  post?: Post | null
}

export function HeroSection({ post }: HeroSectionProps) {
  // Fallback content when no posts exist
  if (!post) {
    return (
      <section className="flex flex-col px-6 pt-8 pb-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/15 text-primary rounded-sm">
            Bienvenido
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6 text-balance">
          {"Optimización de "}
          <strong className="font-bold block mt-1">
            Espacios Pequeños
          </strong>
        </h1>

        <div className="relative w-full aspect-[4/5] md:aspect-[16/10] rounded overflow-hidden shadow-sm mb-6 bg-muted">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <span className="font-medium">Próximamente contenido destacado</span>
          </div>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
          Descubre estrategias innovadoras para maximizar tu espacio vital con soluciones inteligentes de diseño y organización.
        </p>
      </section>
    )
  }

  const image = post.mainImage ? urlFor(post.mainImage).width(1200).url() : null
  const categorySlug = post.category?.slug || 'espacios'
  const categoryTitle = post.category?.title || 'Artículo'

  return (
    <section className="flex flex-col px-6 pt-8 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/15 text-primary rounded-sm">
          Destacado
        </span>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {categoryTitle}
        </span>
      </div>

      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6 text-balance">
        {post.title}
      </h1>

      <Link href={`/espacios/${categorySlug}/${post.slug.current}`} className="block group">
        <div className="relative w-full aspect-[4/5] md:aspect-[16/10] rounded overflow-hidden shadow-sm mb-6 cursor-pointer bg-muted">
          {image ? (
            <Image
              src={image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <span className="font-medium">Hero Image Placeholder</span>
            </div>
          )}
          <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-bold text-foreground shadow-sm">
            5 min lectura
          </div>
        </div>
      </Link>

      <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
        {post.description}
      </p>

      <Link
        href={`/espacios/${categorySlug}/${post.slug.current}`}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded font-semibold tracking-wide transition-all shadow-sm hover:shadow active:scale-[0.98]"
      >
        <span>Leer Artículo</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
