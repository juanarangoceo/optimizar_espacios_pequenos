
import Image from "next/image"
import { Sun, Wind, MonitorSmartphone, ArrowRight } from "lucide-react"

const topics = [
  {
    icon: Sun,
    label: "Iluminacion Circadiana",
    summary: "Configura tu luz para sincronizar tu reloj biologico y mejorar el sueno.",
    readTime: "4 min",
  },
  {
    icon: Wind,
    label: "Calidad del Aire",
    summary: "Las 5 plantas que filtran toxinas y como colocarlas segun los m2.",
    readTime: "3 min",
  },
  {
    icon: MonitorSmartphone,
    label: "Ergonomia Remota",
    summary: "Escritorios, sillas y rutinas de movimiento para jornadas de +8h en casa.",
    readTime: "6 min",
  },
]

export function BiohackingSection() {
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
      <div className="relative rounded overflow-hidden mb-8 group cursor-pointer bg-muted">
        <div className="grid grid-cols-2 h-56 md:h-72">
          <div className="relative border-r border-border/50">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="text-xs">Light Setup</span>
             </div>
            {/*
            <Image
              src="/images/biohacking-light.jpg"
              alt="Oficina en casa con sistema de iluminacion circadiana"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            */}
          </div>
          <div className="relative">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="text-xs">Air Quality</span>
             </div>
            {/*
            <Image
              src="/images/biohacking-air.jpg"
              alt="Rincon con plantas purificadoras"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            */}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/80">
            Guia completa
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-card mt-0.5">
            Tu casa como sistema operativo de bienestar
          </h3>
        </div>
      </div>

      {/* Topic cards */}
      <div className="flex flex-col gap-4">
        {topics.map((topic) => {
          const Icon = topic.icon
          return (
            <div
              key={topic.label}
              className="flex items-start gap-4 p-4 bg-card rounded border border-border hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {topic.label}
                  </h4>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {topic.readTime}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {topic.summary}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-3" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
