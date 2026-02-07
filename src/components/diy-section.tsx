
import Image from "next/image"
import { ArrowLeftRight } from "lucide-react"

export function DiySection() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
        Proyectos DIY
      </h2>

      <div className="bg-card rounded overflow-hidden shadow-sm border border-border">
        {/* Before/After Split Image */}
        <div className="relative h-64 md:h-80 w-full flex bg-muted">
           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <span>Before / After Image Comparison</span>
           </div>
          {/*
          <div className="w-1/2 relative border-r-2 border-card">
            <Image
              src="/images/diy-before.jpg"
              alt="Rincon desordenado"
              fill
              className="object-cover grayscale opacity-80"
              sizes="50vw"
            />
            <div className="absolute top-4 left-4 bg-foreground/70 text-card text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
              Antes
            </div>
          </div>
          <div className="w-1/2 relative">
            <Image
              src="/images/diy-after.jpg"
              alt="Rincon renovado"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
              Despues
            </div>
          </div>
          */}
           {/* Placeholder Labels for valid visual structure without images */}
            <div className="absolute top-4 left-4 bg-foreground/70 text-card text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider z-10">
              Antes
            </div>
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider z-10">
              Despues
            </div>


          {/* Center comparison icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-full p-1.5 shadow-lg z-10">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Renovacion del Balcon
            </h3>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded">
              Nivel: Medio
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Convertimos un trastero caotico en un oasis de lectura utilizando
            materiales reciclados.
          </p>
          <button className="text-sm font-bold text-foreground underline decoration-2 decoration-primary underline-offset-4 hover:text-primary transition-colors">
            Ver paso a paso
          </button>
        </div>
      </div>
    </section>
  )
}
