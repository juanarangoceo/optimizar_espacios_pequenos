
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="flex flex-col px-6 pt-8 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/15 text-sage-dark rounded-sm">
          Destacado
        </span>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Mobiliario
        </span>
      </div>

      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6 text-balance">
        {"Analisis de Mobiliario: "}
        <strong className="font-bold block mt-1">
          El sofa que esconde una oficina.
        </strong>
      </h1>

      <Link href="/articulo/sofa-oficina" className="block group">
        <div className="relative w-full aspect-[4/5] md:aspect-[16/10] rounded overflow-hidden shadow-sm mb-6 cursor-pointer bg-muted">
           {/* Placeholder Image until assets are available */}
           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
             <span className="font-medium">Hero Image Placeholder</span>
           </div>
           {/* 
           <Image
            src="/images/hero-sofa.jpg"
            alt="Salon moderno minimalista"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
           />
           */}
          <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-bold text-foreground shadow-sm">
            5 min lectura
          </div>
        </div>
      </Link>

      <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
        Descubre como maximizar tu espacio vital con muebles modulares que
        transforman tu salon en un area de trabajo productiva sin sacrificar el
        estilo.
      </p>

      <Link
        href="/articulo/sofa-oficina"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded font-semibold tracking-wide transition-all shadow-sm hover:shadow active:scale-[0.98]"
      >
        <span>Leer Analisis</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
